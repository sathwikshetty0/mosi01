import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, Home, Share2 } from 'lucide-react';
import { useCampaign } from '../context/CampaignContext';

export const ThankYouPage: React.FC = () => {
  const { userDetails, resetPledgeFlow } = useCampaign();

  return (
    <div className="page-wrapper" style={{ backgroundColor: 'var(--bg-offwhite)' }}>
      <div className="container" style={{ padding: '80px 24px' }}>
        <div
          className="form-card"
          style={{
            maxWidth: '560px',
            textAlign: 'center',
            padding: '50px 36px',
            margin: '0 auto',
          }}
        >
          <div
            style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              backgroundColor: 'var(--accent-light)',
              color: 'var(--accent-color)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 24px',
            }}
          >
            <CheckCircle2 size={48} />
          </div>

          <h1 style={{ fontSize: '28px', fontWeight: 800, marginBottom: '12px' }}>
            Pledge Successfully Recorded!
          </h1>

          <p style={{ color: 'var(--text-secondary)', fontSize: '16px', lineHeight: 1.6, marginBottom: '24px' }}>
            Thank you {userDetails.fullName || 'Innovator'} for being a part of World Entrepreneurship Day.
            Your pledge to pursue your big idea has been registered.
          </p>

          <div
            style={{
              background: 'var(--bg-subtle)',
              padding: '16px 20px',
              borderRadius: '12px',
              fontSize: '14px',
              color: 'var(--text-muted)',
              marginBottom: '32px',
            }}
          >
            "The best way to predict the future is to create it."
          </div>

          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link
              to="/"
              onClick={() => resetPledgeFlow()}
              className="btn btn-primary"
            >
              <Home size={18} />
              Return to Home
            </Link>

            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: 'World Entrepreneurship Day Pledge',
                    text: 'I just pledged to pursue my big idea for World Entrepreneurship Day! Take the pledge today.',
                    url: window.location.origin,
                  }).catch(() => {});
                } else {
                  alert('Copied campaign link to clipboard!');
                  navigator.clipboard.writeText(window.location.origin);
                }
              }}
              className="btn btn-secondary"
            >
              <Share2 size={18} />
              Share Campaign
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
