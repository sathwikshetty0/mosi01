import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div className="footer-logos">
          {/* Janai Logo Big */}
          <img
            src="/logos/janai-logo.png"
            alt="Janai"
            style={{ height: '36px', width: 'auto', objectFit: 'contain' }}
          />
          <div className="footer-logo-divider" />
          {/* inUnity Logo at end */}
          <img
            src="/logos/inunity-logo.png"
            alt="inUnity"
            style={{ height: '18px', width: 'auto', objectFit: 'contain', filter: 'brightness(0) invert(1)' }}
          />
        </div>
        <p className="footer-text">
          © {new Date().getFullYear()} World Entrepreneurship Day Campaign. Empowering innovators globally.
        </p>
      </div>
    </footer>
  );
};
