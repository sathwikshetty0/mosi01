import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Question, UserDetails, PledgeSubmission } from '../types';
import { loadQuestions, saveQuestions } from '../data/questionsConfig';
import { INITIAL_SUBMISSIONS } from '../data/mockSubmissions';
import { saveVideoBlob, getVideoBlob } from '../utils/db';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

interface CampaignContextType {
  // Public Pledge Flow state
  userDetails: UserDetails;
  setUserDetails: (details: UserDetails) => void;
  answers: Record<string, string>;
  setAnswer: (questionId: string, answerText: string) => void;
  currentSubmissionId: string | null;

  // Question editing
  questions: Question[];
  updateQuestions: (newQuestions: Question[]) => Promise<void>;

  // Submissions
  submissions: PledgeSubmission[];
  addSubmission: (videoBlob?: Blob) => Promise<string>;
  getSubmissionVideoUrl: (id: string) => Promise<string | null>;

  // Admin Auth
  isAdminLoggedIn: boolean;
  adminLogin: (email: string, pass: string) => boolean;
  adminLogout: () => void;
  
  // Reset
  resetPledgeFlow: () => void;

  // Supabase Status
  isSupabaseActive: boolean;
}

const CampaignContext = createContext<CampaignContextType | undefined>(undefined);

const SUBMISSIONS_KEY = 'wed_campaign_submissions';

export const CampaignProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userDetails, setUserDetails] = useState<UserDetails>({
    fullName: '',
    email: '',
    phone: '',
  });
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [currentSubmissionId, setCurrentSubmissionId] = useState<string | null>(null);

  const [questions, setQuestions] = useState<Question[]>(loadQuestions());
  const [submissions, setSubmissions] = useState<PledgeSubmission[]>(() => {
    try {
      const saved = localStorage.getItem(SUBMISSIONS_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_SUBMISSIONS;
  });

  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem('wed_admin_logged_in') === 'true';
  });

  // Fetch Questions & Submissions from Supabase if configured
  useEffect(() => {
    if (isSupabaseConfigured && supabase) {
      // Fetch Questions
      supabase
        .from('questions')
        .select('*')
        .order('display_order', { ascending: true })
        .then(({ data, error }) => {
          if (!error && data && data.length > 0) {
            const formatted: Question[] = data.map((q) => ({
              id: q.id,
              text: q.text,
              placeholder: q.placeholder,
              required: q.required,
            }));
            setQuestions(formatted);
          }
        });

      // Fetch Submissions
      supabase
        .from('pledge_submissions')
        .select('*')
        .order('created_at', { ascending: false })
        .then(({ data, error }) => {
          if (!error && data) {
            const formatted: PledgeSubmission[] = data.map((s) => ({
              id: s.id,
              createdAt: s.created_at,
              user: {
                fullName: s.full_name,
                email: s.email,
                phone: s.phone,
              },
              answers: s.answers || {},
              videoUrl: s.video_url,
              status: s.status || 'Pledge Taken',
            }));
            setSubmissions(formatted);
          }
        });
    }
  }, []);

  useEffect(() => {
    if (!isSupabaseConfigured) {
      localStorage.setItem(SUBMISSIONS_KEY, JSON.stringify(submissions));
    }
  }, [submissions]);

  const setAnswer = (questionId: string, answerText: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answerText }));
  };

  const updateQuestions = async (newQuestions: Question[]): Promise<void> => {
    setQuestions(newQuestions);
    saveQuestions(newQuestions);

    if (isSupabaseConfigured && supabase) {
      try {
        for (let i = 0; i < newQuestions.length; i++) {
          const q = newQuestions[i];
          await supabase.from('questions').upsert({
            id: q.id,
            text: q.text,
            placeholder: q.placeholder,
            required: q.required ?? true,
            display_order: i + 1,
          });
        }
      } catch (err) {
        console.error('Error syncing questions to Supabase:', err);
      }
    }
  };

  const addSubmission = async (videoBlob?: Blob): Promise<string> => {
    const id = `sub-${Date.now()}`;
    let publicVideoUrl: string | undefined = undefined;

    // 1. Save video locally to IndexedDB
    if (videoBlob) {
      await saveVideoBlob(id, videoBlob);
    }

    // 2. Upload video to Supabase Storage if configured
    if (videoBlob && isSupabaseConfigured && supabase) {
      try {
        const fileName = `${id}.webm`;
        const { error: uploadError } = await supabase.storage
          .from('pledge-videos')
          .upload(fileName, videoBlob, {
            contentType: 'video/webm',
            upsert: true,
          });

        if (!uploadError) {
          const { data: urlData } = supabase.storage
            .from('pledge-videos')
            .getPublicUrl(fileName);
          publicVideoUrl = urlData?.publicUrl;
        }
      } catch (err) {
        console.error('Error uploading video to Supabase storage:', err);
      }
    }

    const newSub: PledgeSubmission = {
      id,
      createdAt: new Date().toISOString(),
      user: { ...userDetails },
      answers: { ...answers },
      videoUrl: publicVideoUrl,
      status: 'Pledge Taken',
    };

    // 3. Insert into Supabase table if configured
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('pledge_submissions').insert({
          id,
          full_name: userDetails.fullName,
          email: userDetails.email,
          phone: userDetails.phone,
          answers: answers,
          video_url: publicVideoUrl,
          status: 'Pledge Taken',
        });
      } catch (err) {
        console.error('Error inserting submission to Supabase:', err);
      }
    }

    setSubmissions((prev) => [newSub, ...prev]);
    setCurrentSubmissionId(id);
    return id;
  };

  const getSubmissionVideoUrl = async (id: string): Promise<string | null> => {
    // Check if submission already has a public video URL (from Supabase Storage)
    const sub = submissions.find((s) => s.id === id);
    if (sub?.videoUrl) {
      return sub.videoUrl;
    }

    // Otherwise check IndexedDB local blob
    const blob = await getVideoBlob(id);
    if (blob) {
      return URL.createObjectURL(blob);
    }
    return null;
  };

  const adminLogin = (email: string, pass: string): boolean => {
    if (email === 'admin@wed.org' && pass === 'admin123') {
      setIsAdminLoggedIn(true);
      localStorage.setItem('wed_admin_logged_in', 'true');
      return true;
    }
    return false;
  };

  const adminLogout = () => {
    setIsAdminLoggedIn(false);
    localStorage.removeItem('wed_admin_logged_in');
  };

  const resetPledgeFlow = () => {
    setUserDetails({ fullName: '', email: '', phone: '' });
    setAnswers({});
    setCurrentSubmissionId(null);
  };

  return (
    <CampaignContext.Provider
      value={{
        userDetails,
        setUserDetails,
        answers,
        setAnswer,
        currentSubmissionId,
        questions,
        updateQuestions,
        submissions,
        addSubmission,
        getSubmissionVideoUrl,
        isAdminLoggedIn,
        adminLogin,
        adminLogout,
        resetPledgeFlow,
        isSupabaseActive: isSupabaseConfigured,
      }}
    >
      {children}
    </CampaignContext.Provider>
  );
};

export const useCampaign = () => {
  const ctx = useContext(CampaignContext);
  if (!ctx) throw new Error('useCampaign must be used within CampaignProvider');
  return ctx;
};
