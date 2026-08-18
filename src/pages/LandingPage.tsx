import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Play, CheckCircle, Sparkles, Target, Video, Users, Award, Database } from 'lucide-react';
import { useCampaign } from '../context/CampaignContext';

export const LandingPage: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const { submissions, isSupabaseActive } = useCampaign();

  return (
    <div className="page-wrapper" style={{ backgroundColor: '#F4F7FE', color: '#1C2434', fontFamily: 'var(--sans)' }}>
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
              background: '#FFFFFF',
              borderRadius: '24px',
              padding: '56px 48px',
              border: 'none',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: '0 10px 40px rgba(0,0,0,0.03)',
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
                background: 'transparent',
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
                    fontSize: '13px',
                    fontWeight: 600,
                    color: '#FFFFFF',
                    backgroundColor: '#1C2434',
                    padding: '8px 20px',
                    borderRadius: '24px',
                  }}
                >
                  <Sparkles size={16} />
                  World Entrepreneurship Day
                </div>

                {isSupabaseActive && (
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontSize: '13px',
                      fontWeight: 600,
                      color: '#1C2434',
                      backgroundColor: '#FFFFFF',
                      boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
                      padding: '8px 20px',
                      borderRadius: '24px',
                    }}
                  >
                    <Database size={16} />
                    Supabase Connected
                  </div>
                )}
              </div>

              <h1
                style={{
                  fontSize: 'clamp(32px, 8vw, 64px)',
                  fontWeight: 500,
                  lineHeight: 1.1,
                  letterSpacing: '-1px',
                  marginBottom: '24px',
                  color: '#1C2434',
                  wordWrap: 'break-word',
                  overflowWrap: 'anywhere',
                  hyphens: 'auto',
                }}
              >
                Happy World <br />
                Entrepreneurship Day
              </h1>

              <p
                style={{
                  fontSize: '17px',
                  fontWeight: 400,
                  color: '#4A4A4A',
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
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    backgroundColor: '#1C2434',
                    color: '#FFFFFF',
                    textDecoration: 'none',
                    borderRadius: '32px',
                    padding: '0 36px',
                    height: '56px',
                    fontSize: '17px',
                    fontWeight: 500,
                    width: '100%',
                    maxWidth: '320px',
                    boxShadow: '0 4px 14px rgba(0,0,0,0.1)',
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
                    fontWeight: 500,
                    color: '#4A4A4A',
                    backgroundColor: '#FFFFFF',
                    padding: '8px 16px',
                    borderRadius: '24px',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
                    maxWidth: '100%',
                    wordWrap: 'break-word',
                  }}
                >
                  <CheckCircle size={18} color="#1C2434" style={{ flexShrink: 0 }} />
                  <span style={{ overflowWrap: 'anywhere' }}>Over {135 + submissions.length} pledges recorded this year</span>
                </div>
              </div>
            </div>

            {/* Right Graphic Preview Card */}
            <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
              <div
                style={{
                  width: '100%',
                  minHeight: '380px',
                  backgroundColor: '#BFE6D0',
                  borderRadius: '32px',
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.05)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  padding: '32px',
                  color: '#1C2434',
                  position: 'relative',
                  overflow: 'hidden',
                  border: 'none',
                }}
              >
                {/* Header inside card */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                    <img src="/logos/janai-logo.png" alt="Janai" style={{ height: '32px', width: 'auto', filter: 'brightness(0)' }} />
                    <span style={{ fontSize: '12px', color: 'rgba(0,0,0,0.2)' }}>|</span>
                    <img
                      src="/logos/inunity-logo.png"
                      alt="inUnity"
                      style={{ height: '14px', width: 'auto', filter: 'brightness(0)' }}
                    />
                  </div>
                  <div
                    style={{
                      padding: '6px 14px',
                      borderRadius: '24px',
                      backgroundColor: '#FFFFFF',
                      fontSize: '12px',
                      fontWeight: 600,
                      color: '#1C2434',
                    }}
                  >
                    Campaign Live
                  </div>
                </div>

                <div style={{ margin: '20px 0' }}>
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      backgroundColor: '#FFFFFF',
                      padding: '6px 14px',
                      borderRadius: '20px',
                      fontSize: '12px',
                      fontWeight: 600,
                      color: '#1C2434',
                      marginBottom: '16px',
                    }}
                  >
                    <Target size={14} style={{ marginRight: '6px' }} />
                    01 • Take the Pledge
                  </div>
                  <h3 style={{ fontSize: '28px', fontWeight: 500, lineHeight: 1.25, color: '#1C2434' }}>
                    Share Your Big Idea & Record Statement
                  </h3>
                </div>

                {/* Footer inside card */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '12px',
                    paddingTop: '16px',
                    borderTop: '1px solid rgba(0,0,0,0.08)',
                  }}
                >
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontSize: '14px', fontWeight: 600, color: '#1C2434' }}>
                      World Entrepreneurship Day
                    </span>
                    <span style={{ fontSize: '12px', color: 'rgba(0,0,0,0.5)' }}>
                      inUnity × Janai Pledge Movement
                    </span>
                  </div>
                  <div
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '50%',
                      backgroundColor: '#1C2434',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 600,
                      fontSize: '14px',
                      color: '#FFFFFF',
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
                background: '#6A5BFF',
                padding: '32px',
                borderRadius: '24px',
                border: 'none',
                color: '#FFFFFF'
              }}
            >
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  backgroundColor: '#FFFFFF',
                  color: '#1C2434',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '20px',
                }}
              >
                <Target size={24} />
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: 500, marginBottom: '12px', color: '#FFFFFF' }}>
                Declare Your Idea
              </h3>
              <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.9)', lineHeight: 1.5 }}>
                Answer 4 structured questions detailing your vision, target audience, and immediate execution steps.
              </p>
            </div>

            <div
              style={{
                background: '#EF4444',
                padding: '32px',
                borderRadius: '24px',
                border: 'none',
                color: '#FFFFFF'
              }}
            >
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  backgroundColor: '#FFFFFF',
                  color: '#1C2434',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '20px',
                }}
              >
                <Video size={24} />
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: 500, marginBottom: '12px', color: '#FFFFFF' }}>
                Record Video Pledge
              </h3>
              <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.9)', lineHeight: 1.5 }}>
                Record a short video statement directly in your browser using your device's camera.
              </p>
            </div>

            <div
              style={{
                background: '#10C871',
                padding: '32px',
                borderRadius: '24px',
                border: 'none',
                color: '#FFFFFF'
              }}
            >
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  backgroundColor: '#FFFFFF',
                  color: '#1C2434',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '20px',
                }}
              >
                <Users size={24} />
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: 500, marginBottom: '12px', color: '#FFFFFF' }}>
                Join Public Wall
              </h3>
              <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.9)', lineHeight: 1.5 }}>
                Your pledge is logged on the public entrepreneur wall, inspiring fellow founders across the country.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Keynote Video Message Section */}
      <section style={{ padding: '48px 0 80px', backgroundColor: '#F4F7FE', borderTop: 'none' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '13px',
                fontWeight: 600,
                color: '#1C2434',
                backgroundColor: '#FFFFFF',
                padding: '8px 20px',
                borderRadius: '24px',
                marginBottom: '16px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
              }}
            >
              <Award size={16} />
              Special Address
            </div>
            <h2 style={{ fontSize: '36px', fontWeight: 500, marginBottom: '12px', color: '#1C2434' }}>
              A Message For Future Founders
            </h2>
            <p style={{ color: '#4A4A4A', fontSize: '17px', fontWeight: 400, maxWidth: '540px', margin: '0 auto' }}>
              Listen to leadership share why taking the first step matters today.
            </p>
          </div>

          <div
            style={{
              maxWidth: '840px',
              margin: '0 auto',
              background: '#FFFFFF',
              borderRadius: '32px',
              overflow: 'hidden',
              boxShadow: '0 10px 40px rgba(0,0,0,0.05)',
              border: 'none',
              padding: '12px',
            }}
          >
            <div style={{ position: 'relative', paddingTop: '56.25%', width: '100%', borderRadius: '24px', overflow: 'hidden' }}>
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
                    backgroundImage: 'linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.6) 100%), url(https://img.youtube.com/vi/VS1o71thIw4/maxresdefault.jpg)',
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
                      backgroundColor: '#FFFFFF',
                      color: '#1C2434',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '16px',
                      boxShadow: '0 8px 28px rgba(0,0,0,0.15)',
                      transition: 'transform 0.2s ease',
                    }}
                  >
                    <Play size={34} style={{ marginLeft: '4px' }} />
                  </div>
                  <h3 style={{ fontSize: '24px', fontWeight: 500 }}>Play Official Campaign Keynote</h3>
                  <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.9)', marginTop: '8px' }}>
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
