import React from 'react';

interface ProgressBarProps {
  currentStep: 1 | 2 | 3;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep }) => {
  const steps = [
    { num: 1, label: 'Your Details' },
    { num: 2, label: 'Your Big Idea' },
    { num: 3, label: 'Video Pledge' },
  ];

  const fillPercentage = ((currentStep - 1) / (steps.length - 1)) * 100;

  return (
    <div className="progress-wrapper">
      <div className="progress-inner">
        <div className="progress-header">
          <span className="progress-label">Step {currentStep} of 3</span>
          <span className="progress-step-text">{steps[currentStep - 1].label}</span>
        </div>
        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${fillPercentage}%` }} />
        </div>
      </div>
    </div>
  );
};
