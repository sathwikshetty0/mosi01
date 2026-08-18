import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export const Header: React.FC = () => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link to="/" className="header-logo-group" style={{ display: 'flex', alignItems: 'center', flexShrink: 1, minWidth: 0, overflow: 'hidden' }}>
          {/* Janai Logo Big */}
          <img
            src="/logos/janai-logo.png"
            alt="Janai"
            className="logo-janai"
          />
          <div className="logo-divider" />
          {/* inUnity Logo at End */}
          <img
            src="/logos/inunity-logo.png"
            alt="inUnity"
            className="logo-inunity"
          />
        </Link>

        <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexShrink: 0 }}>
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
              <span className="hide-mobile">Back to&nbsp;</span>Public Site
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};
