import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export const Header: React.FC = () => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {/* Janai Logo Big */}
          <img
            src="/logos/janai-logo.png"
            alt="Janai"
            style={{ height: '44px', width: 'auto', objectFit: 'contain' }}
          />
          <div style={{ width: '1px', height: '24px', backgroundColor: 'rgba(255, 255, 255, 0.2)' }} />
          {/* inUnity Logo at End */}
          <img
            src="/logos/inunity-logo.png"
            alt="inUnity"
            style={{ height: '22px', width: 'auto', objectFit: 'contain', filter: 'brightness(0) invert(1)' }}
          />
        </Link>

        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          {!isAdmin ? (
            <>
              <Link to="/admin" className="header-link">
                Admin Dashboard
              </Link>
              <Link to="/signup" className="btn btn-primary btn-sm">
                Take the Pledge
              </Link>
            </>
          ) : (
            <Link to="/" className="btn btn-white btn-sm">
              Back to Public Site
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};
