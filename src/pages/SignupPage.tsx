import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProgressBar } from '../components/ProgressBar';
import { useCampaign } from '../context/CampaignContext';
import { ArrowRight } from 'lucide-react';

export const SignupPage: React.FC = () => {
  const navigate = useNavigate();
  const { userDetails, setUserDetails } = useCampaign();

  const [formData, setFormData] = useState(userDetails);
  const [errors, setErrors] = useState<{ fullName?: string; email?: string; phone?: string }>({});

  const validate = () => {
    const newErrors: { fullName?: string; email?: string; phone?: string } = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email Address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone Number is required';
    } else if (!/^[+\d\s\-()]{7,20}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setUserDetails(formData);
      navigate('/questions');
    }
  };

  return (
    <div className="page-wrapper" style={{ backgroundColor: 'var(--bg-offwhite)' }}>
      <ProgressBar currentStep={1} />

      <div className="container" style={{ padding: '40px 24px 80px' }}>
        <form className="modern-card" style={{ maxWidth: '560px', margin: '0 auto', backgroundColor: '#FFFFFF', border: 'none' }} onSubmit={handleSubmit}>
          <div style={{ marginBottom: '32px' }}>
            <span style={{ 
              display: 'inline-flex',
              alignItems: 'center',
              backgroundColor: '#1C2434',
              padding: '6px 14px',
              borderRadius: '20px',
              fontSize: '12px',
              fontWeight: 600,
              color: '#FFFFFF',
              letterSpacing: '1px',
              textTransform: 'uppercase',
              marginBottom: '12px'
             }}>
              01 • SIGN UP
            </span>
            <h2 style={{ fontSize: '36px', fontWeight: 800, marginTop: '6px', lineHeight: '1.15', textTransform: 'uppercase' }}>
              Let’s Start With <span style={{ color: '#1C2434' }}>You.</span>
            </h2>
            <p style={{ color: '#1C2434', fontSize: '16px', fontWeight: 500, marginTop: '8px' }}>
              Tell us who’s behind the big idea.
            </p>
          </div>

          <div className="form-group" style={{ marginBottom: '22px' }}>
            <label className="form-label">Full Name *</label>
            <input
              type="text"
              className="form-input"
              placeholder="e.g. Sarah Jenkins"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            />
            {errors.fullName && <div className="form-error">{errors.fullName}</div>}
          </div>

          <div className="form-group" style={{ marginBottom: '22px' }}>
            <label className="form-label">Email Address *</label>
            <input
              type="email"
              className="form-input"
              placeholder="e.g. sarah@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
            {errors.email && <div className="form-error">{errors.email}</div>}
          </div>

          <div className="form-group" style={{ marginBottom: '32px' }}>
            <label className="form-label">Phone Number *</label>
            <input
              type="tel"
              className="form-input"
              placeholder="e.g. +1 (555) 019-2834"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
            {errors.phone && <div className="form-error">{errors.phone}</div>}
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
            Continue To Questions
            <ArrowRight size={18} />
          </button>
        </form>
      </div>
    </div>
  );
};
