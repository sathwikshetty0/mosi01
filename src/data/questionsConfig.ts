import type { Question } from '../types';

export const DEFAULT_QUESTIONS: Question[] = [
  {
    id: 'q1',
    text: 'What is your big idea?',
    placeholder: 'Describe your vision or product in a few sentences...',
    required: true,
  },
  {
    id: 'q2',
    text: 'What problem does it solve?',
    placeholder: 'Explain the core pain point your idea addresses...',
    required: true,
  },
  {
    id: 'q3',
    text: 'Who is it for?',
    placeholder: 'Describe your primary audience or customer segment...',
    required: true,
  },
  {
    id: 'q4',
    text: "What's your first step to start?",
    placeholder: 'What immediate action will you take to begin execution?',
    required: true,
  },
];

const QUESTIONS_STORAGE_KEY = 'wed_campaign_questions';

export const loadQuestions = (): Question[] => {
  try {
    const saved = localStorage.getItem(QUESTIONS_STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (err) {
    console.error('Error loading questions from localStorage:', err);
  }
  return DEFAULT_QUESTIONS;
};

export const saveQuestions = (questions: Question[]): void => {
  try {
    localStorage.setItem(QUESTIONS_STORAGE_KEY, JSON.stringify(questions));
  } catch (err) {
    console.error('Error saving questions to localStorage:', err);
  }
};
