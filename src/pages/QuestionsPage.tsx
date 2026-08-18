import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProgressBar } from '../components/ProgressBar';
import { useCampaign } from '../context/CampaignContext';
import { ArrowRight, ArrowLeft } from 'lucide-react';

export const QuestionsPage: React.FC = () => {
  const navigate = useNavigate();
  const { questions, answers, setAnswer } = useCampaign();
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [errorMsg, setErrorMsg] = useState('');

  const currentQuestion = questions[currentQIndex] || questions[0];
  const currentVal = answers[currentQuestion?.id] || '';

  const colors = ['#FCE1C3', '#D1E8FB', '#CFCCFF', '#BFE6D0'];
  const bgColor = colors[currentQIndex % colors.length];

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentQuestion?.required && !currentVal.trim()) {
      setErrorMsg('Please answer this question before continuing.');
      return;
    }
    setErrorMsg('');

    if (currentQIndex < questions.length - 1) {
      setCurrentQIndex(currentQIndex + 1);
    } else {
      navigate('/record');
    }
  };

  const handlePrev = () => {
    setErrorMsg('');
    if (currentQIndex > 0) {
      setCurrentQIndex(currentQIndex - 1);
    } else {
      navigate('/signup');
    }
  };

  if (!currentQuestion) {
    return (
      <div className="page-wrapper">
        <div className="container" style={{ padding: '60px', textAlign: 'center' }}>
          <p>No questions configured. Please check admin settings.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-wrapper" style={{ backgroundColor: 'var(--bg-offwhite)' }}>
      <ProgressBar currentStep={2} />

      <div className="container" style={{ padding: '40px 24px 80px' }}>
        <form className="modern-card" style={{ maxWidth: '680px', margin: '0 auto', backgroundColor: bgColor, border: 'none' }} onSubmit={handleNext}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <span style={{ 
              display: 'inline-flex',
              alignItems: 'center',
              backgroundColor: '#232528',
              padding: '6px 14px',
              borderRadius: '20px',
              fontSize: '12px',
              fontWeight: 600,
              color: '#FFFFFF',
              letterSpacing: '1px',
              textTransform: 'uppercase'
             }}>
              02 • QUESTION {currentQIndex + 1} OF {questions.length}
            </span>
            <span style={{ fontSize: '14px', fontWeight: 700, color: '#232528' }}>
              Step 2 of 3
            </span>
          </div>

          <div style={{ marginBottom: '32px' }}>
            <h2 style={{ fontSize: '28px', fontWeight: 800, lineHeight: 1.25, color: 'var(--text-primary)', marginBottom: '16px' }}>
              {currentQuestion.text}
            </h2>
            <textarea
              className="form-textarea"
              placeholder={currentQuestion.placeholder || 'Type your answer here...'}
              value={currentVal}
              onChange={(e) => {
                setErrorMsg('');
                setAnswer(currentQuestion.id, e.target.value);
              }}
            />
            {errorMsg && <div className="form-error" style={{ marginTop: '8px' }}>{errorMsg}</div>}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px' }}>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handlePrev}
            >
              <ArrowLeft size={18} />
              Back
            </button>

            <button type="submit" className="btn btn-primary">
              {currentQIndex < questions.length - 1 ? 'Next Question' : 'Continue to Video'}
              <ArrowRight size={18} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
