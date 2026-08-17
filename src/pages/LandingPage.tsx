import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Play, CheckCircle, Sparkles, Target, Video, Users, Award, Database } from 'lucide-react';
import { useCampaign } from '../context/CampaignContext';

export const LandingPage: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const { submissions, isSupabaseActive } = useCampaign();

  return (
    <div className="page-wrapper" style={{ backgroundColor: '#ffffff' }}>
      {/* Hero Section */}
      <section style={{ padding: '36px 0 60px' }}>
        <div className="container">
          <div
            className="hero-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: '1.1fr 0.9fr',
              gap: '40px',
              alignItems: 'center',
              background: 'linear-gradient(135deg, #f9f9fb 0%, #f0effe 100%)',
              borderRadius: 'var(--border-radius-card)',
              padding: '56px 48px',
              border: '1px solid #e4e4e7',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-card)',
            }}
          >
            {/* Ambient Background Glow */}
            <div
              style={{
                position: 'absolute',
                top: '-80px',
                right: '-80px',
                width: '320px',
                height: '320px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(147, 137, 250, 0.25) 0%, rgba(255,255,255,0) 70%)',
                pointerEvents: 'none',
              }}
            />

            {/* Left Content Column */}
            <div style={{ position: 'relative', zIndex: 2 }}>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap', marginBottom: '24px' }}>
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '12px',
                    fontWeight: 800,
                    letterSpacing: '1.5px',
                    textTransform: 'uppercase',
                    color: 'var(--accent-color)',
                    backgroundColor: '#ffffff',
                    boxShadow: '0 2px 10px rgba(96, 86, 199, 0.1)',
                    padding: '8px 16px',
                    borderRadius: '20px',
                    border: '1px solid rgba(96, 86, 199, 0.2)',
                  }}
                >
                  <Sparkles size={14} />
                  WORLD ENTREPRENEURSHIP DAY 2026
                </div>

                {isSupabaseActive && (
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontSize: '11px',
                      fontWeight: 700,
                      color: '#065f46',
                      backgroundColor: '#ecfdf5',
                      border: '1px solid #a7f3d0',
                      padding: '6px 12px',
                      borderRadius: '20px',
                    }}
                  >
                    <Database size={12} />
                    SUPABASE CONNECTED
                  </div>
                )}
              </div>

              <h1
                style={{
                  fontSize: 'clamp(32px, 4vw, 50px)',
                  fontWeight: 800,
                  lineHeight: 1.1,
                  letterSpacing: '-1px',
                  textTransform: 'uppercase',
                  marginBottom: '20px',
                  color: 'var(--text-primary)',
                }}
              >
                Happy World <br />
                <span
                  style={{
                    background: 'linear-gradient(135deg, #6056c7 0%, #786bf9 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  Entrepreneurship
                </span> Day
              </h1>

              <p
                style={{
                  fontSize: '17px',
                  fontWeight: 500,
                  color: 'var(--text-secondary)',
                  marginBottom: '32px',
                  maxWidth: '480px',
                  lineHeight: 1.6,
                }}
              >
                Take a pledge to bring life to your big idea and join thousands of innovators shaping the future.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '16px' }}>
                <Link
                  to="/signup"
                  className="btn btn-primary"
                  style={{
                    padding: '0 36px',
                    height: '56px',
                    fontSize: '17px',
                    boxShadow: '0 10px 28px rgba(96, 86, 199, 0.35)',
                    width: '100%',
                    maxWidth: '320px',
                  }}
                >
                  Click Here to Pledge
                  <ArrowRight size={20} />
                </Link>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    fontSize: '14px',
                    fontWeight: 600,
                    color: 'var(--text-secondary)',
                    backgroundColor: 'rgba(255,255,255,0.8)',
                    padding: '6px 14px',
                    borderRadius: '12px',
                    border: '1px solid rgba(0,0,0,0.05)',
                  }}
                >
                  <CheckCircle size={18} color="var(--accent-color)" />
                  <span>Over {135 + submissions.length} pledges recorded this year</span>
                </div>
              </div>
            </div>

            {/* Right Graphic Preview Card */}
            <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
              <div
                style={{
                  width: '100%',
                  minHeight: '380px',
                  backgroundColor: '#000000',
                  borderRadius: 'var(--border-radius-inner)',
                  boxShadow: '0 20px 50px rgba(0, 0, 0, 0.25)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  padding: '32px',
                  color: '#ffffff',
                  position: 'relative',
                  overflow: 'hidden',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                }}
              >
                {/* Header inside card */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <img src="/logos/janai-logo.png" alt="Janai" style={{ height: '32px', width: 'auto' }} />
                    <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.3)' }}>|</span>
                    <img
                      src="/logos/inunity-logo.png"
                      alt="inUnity"
                      style={{ height: '14px', width: 'auto', filter: 'brightness(0) invert(1)' }}
                    />
                  </div>
                  <div
                    style={{
                      padding: '4px 10px',
                      borderRadius: '20px',
                      backgroundColor: 'rgba(147, 137, 250, 0.2)',
                      border: '1px solid rgba(147, 137, 250, 0.4)',
                      fontSize: '11px',
                      fontWeight: 700,
                      color: 'var(--accent-purple-light)',
                    }}
                  >
                    CAMPAIGN LIVE
                  </div>
                </div>

                <div style={{ margin: '20px 0' }}>
                  <div
                    style={{
                      fontSize: '12px',
                      fontWeight: 800,
                      letterSpacing: '1.5px',
                      textTransform: 'uppercase',
                      color: 'var(--accent-purple-light)',
                      marginBottom: '10px',
                    }}
                  >
                    01 • TAKE THE PLEDGE
                  </div>
                  <h3 style={{ fontSize: '26px', fontWeight: 800, lineHeight: 1.25, color: '#ffffff' }}>
                    Share Your Big Idea & Record Statement
                  </h3>
                </div>

                {/* Footer inside card */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingTop: '16px',
                    borderTop: '1px solid rgba(255,255,255,0.12)',
                  }}
                >
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontSize: '14px', fontWeight: 700, color: '#ffffff' }}>
                      World Entrepreneurship Day
                    </span>
                    <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)' }}>
                      inUnity × Janai Pledge Movement
                    </span>
                  </div>
                  <div
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '10px',
                      backgroundColor: 'var(--accent-color)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 800,
                      fontSize: '14px',
                      color: '#ffffff',
                    }}
                  >
                    WED
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Highlights Section */}
      <section style={{ padding: '0 0 60px' }}>
        <div className="container">
          <div
            className="features-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '24px',
            }}
          >
            <div
              style={{
                background: 'var(--bg-offwhite)',
                padding: '28px',
                borderRadius: 'var(--border-radius-inner)',
                border: '1px solid var(--border-color)',
              }}
            >
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  backgroundColor: 'var(--accent-light)',
                  color: 'var(--accent-color)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '16px',
                }}
              >
                <Target size={24} />
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '8px', textTransform: 'uppercase' }}>
                1. Declare Your Idea
              </h3>
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                Answer 4 structured questions detailing your vision, target audience, and immediate execution steps.
              </p>
            </div>

            <div
              style={{
                background: 'var(--bg-offwhite)',
                padding: '28px',
                borderRadius: 'var(--border-radius-inner)',
                border: '1px solid var(--border-color)',
              }}
            >
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  backgroundColor: 'rgba(147, 137, 250, 0.15)',
                  color: 'var(--accent-purple-dark)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '16px',
                }}
              >
                <Video size={24} />
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '8px', textTransform: 'uppercase' }}>
                2. Record Video Pledge
              </h3>
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                Record a short video statement directly in your browser using your device's camera.
              </p>
            </div>

            <div
              style={{
                background: 'var(--bg-offwhite)',
                padding: '28px',
                borderRadius: 'var(--border-radius-inner)',
                border: '1px solid var(--border-color)',
              }}
            >
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  backgroundColor: 'rgba(220, 20, 60, 0.1)',
                  color: 'var(--accent-crimson)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '16px',
                }}
              >
                <Users size={24} />
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '8px', textTransform: 'uppercase' }}>
                3. Join Public Wall
              </h3>
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                Your pledge is logged on the public entrepreneur wall, inspiring fellow founders across the country.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Keynote Video Message Section */}
      <section style={{ padding: '48px 0 80px', backgroundColor: '#fafafa', borderTop: '1px solid var(--border-color)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '12px',
                fontWeight: 800,
                letterSpacing: '1.5px',
                textTransform: 'uppercase',
                color: 'var(--accent-color)',
                marginBottom: '10px',
              }}
            >
              <Award size={16} />
              SPECIAL ADDRESS
            </div>
            <h2 style={{ fontSize: '32px', fontWeight: 800, textTransform: 'uppercase', marginBottom: '8px' }}>
              A Message For Future Founders
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '16px', fontWeight: 500, maxWidth: '540px', margin: '0 auto' }}>
              Listen to leadership share why taking the first step matters today.
            </p>
          </div>

          <div
            style={{
              maxWidth: '840px',
              margin: '0 auto',
              background: '#000000',
              borderRadius: 'var(--border-radius-card)',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-elevated)',
              border: '1px solid rgba(255,255,255,0.1)',
            }}
          >
            <div style={{ position: 'relative', paddingTop: '56.25%', width: '100%' }}>
              {!isPlaying ? (
                <div
                  onClick={() => setIsPlaying(true)}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    color: '#ffffff',
                    backgroundImage: 'linear-gradient(180deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.85) 100%), url(https://img.youtube.com/vi/VS1o71thIw4/maxresdefault.jpg)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    padding: '20px',
                    textAlign: 'center',
                  }}
                >
                  <div
                    style={{
                      width: '76px',
                      height: '76px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--accent-color)',
                      color: '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '16px',
                      boxShadow: '0 8px 28px rgba(96, 86, 199, 0.5)',
                      transition: 'transform 0.2s ease',
                    }}
                  >
                    <Play size={34} style={{ marginLeft: '4px' }} />
                  </div>
                  <h3 style={{ fontSize: '22px', fontWeight: 800 }}>Play Official Campaign Keynote</h3>
                  <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.8)', marginTop: '4px' }}>
                    Click to watch keynote video greeting
                  </p>
                </div>
              ) : (
                <iframe
                  src="https://www.youtube.com/embed/VS1o71thIw4?autoplay=1"
                  title="World Entrepreneurship Day Keynote Message"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    border: 'none',
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
