import React, { useState, useEffect } from 'react';
import { useCampaign } from '../context/CampaignContext';
import type { Question, PledgeSubmission } from '../types';
import {
  Users,
  HelpCircle,
  Grid,
  Search,
  LogOut,
  ChevronDown,
  ChevronUp,
  Play,
  Save,
  Check,
  X,
  Lock,
  Mail,
  Key,
} from 'lucide-react';

export const AdminPage: React.FC = () => {
  const {
    isAdminLoggedIn,
    adminLogin,
    adminLogout,
    submissions,
    questions,
    updateQuestions,
    getSubmissionVideoUrl,
    deleteSubmission,
  } = useCampaign();

  // Login form state
  const [emailInput, setEmailInput] = useState('admin@wed.org');
  const [passInput, setPassInput] = useState('admin123');
  const [loginError, setLoginError] = useState('');

  // Dashboard active tab
  const [activeTab, setActiveTab] = useState<'submissions' | 'questions' | 'explore'>('submissions');

  // Submissions Tab state
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedSubId, setExpandedSubId] = useState<string | null>(null);

  // Question Editor state
  const [editableQuestions, setEditableQuestions] = useState<Question[]>(questions);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Explore Tab Modal state
  const [activeModalSub, setActiveModalSub] = useState<PledgeSubmission | null>(null);
  const [modalVideoUrl, setModalVideoUrl] = useState<string | null>(null);

  // Video URLs map for expanded rows & explore grid
  const [videoUrls, setVideoUrls] = useState<Record<string, string>>({});

  useEffect(() => {
    setEditableQuestions(questions);
  }, [questions]);

  // Load video URLs asynchronously from IndexedDB
  useEffect(() => {
    const loadUrls = async () => {
      const map: Record<string, string> = {};
      for (const sub of submissions) {
        const url = await getSubmissionVideoUrl(sub.id);
        if (url) {
          map[sub.id] = url;
        } else {
          // Default fallback sample video for preview
          map[sub.id] = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4';
        }
      }
      setVideoUrls(map);
    };
    if (isAdminLoggedIn) {
      loadUrls();
    }
  }, [submissions, isAdminLoggedIn, getSubmissionVideoUrl]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminLogin(emailInput, passInput)) {
      setLoginError('Invalid admin credentials. (Hint: admin@wed.org / admin123)');
    } else {
      setLoginError('');
    }
  };

  const handleSaveQuestions = (e: React.FormEvent) => {
    e.preventDefault();
    updateQuestions(editableQuestions);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const openExploreModal = async (sub: PledgeSubmission) => {
    setActiveModalSub(sub);
    const url = videoUrls[sub.id] || (await getSubmissionVideoUrl(sub.id)) || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4';
    setModalVideoUrl(url);
  };

  if (!isAdminLoggedIn) {
    return (
      <div className="page-wrapper" style={{ backgroundColor: 'var(--bg-offwhite)', justifyContent: 'center' }}>
        <div className="container">
          <form onSubmit={handleLogin} style={{ maxWidth: '420px', margin: '60px auto', backgroundColor: '#FCE1C3', border: 'none', borderRadius: '32px', padding: '44px', boxShadow: '0 8px 32px rgba(0,0,0,0.04)' }}>
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <div
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%',
                  backgroundColor: '#232528',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px',
                }}
              >
                <Lock size={28} />
              </div>
              <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#232528' }}>Admin Portal</h2>
              <p style={{ color: '#232528', fontSize: '14px', marginTop: '4px', fontWeight: 500 }}>
                Sign in to manage pledge campaign data
              </p>
            </div>

            {loginError && <div className="form-error" style={{ marginBottom: '16px' }}>{loginError}</div>}

            <div className="form-group">
              <label className="form-label">Admin Email</label>
              <div style={{ position: 'relative' }}>
                <input
                  type="email"
                  className="form-input"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  style={{ paddingLeft: '40px' }}
                />
                <Mail size={18} style={{ position: 'absolute', left: '12px', top: '15px', color: 'var(--text-muted)' }} />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <div style={{ position: 'relative' }}>
                <input
                  type="password"
                  className="form-input"
                  value={passInput}
                  onChange={(e) => setPassInput(e.target.value)}
                  style={{ paddingLeft: '40px' }}
                />
                <Key size={18} style={{ position: 'absolute', left: '12px', top: '15px', color: 'var(--text-muted)' }} />
              </div>
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '8px' }}>
              Access Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Filter Submissions
  const filteredSubmissions = submissions.filter((sub) => {
    const q = searchQuery.toLowerCase();
    return (
      sub.user.fullName.toLowerCase().includes(q) ||
      sub.user.email.toLowerCase().includes(q) ||
      sub.user.phone.includes(q)
    );
  });

  return (
    <div className="page-wrapper" style={{ flexDirection: 'row', minHeight: 'calc(100vh - 72px)' }}>
      {/* Sidebar */}
      <aside
        style={{
          width: '260px',
          borderRight: 'none',
          backgroundColor: '#FCE1C3',
          padding: '24px 16px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <div style={{ fontSize: '12px', fontWeight: 800, color: '#232528', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '16px', paddingLeft: '12px' }}>
            Campaign Management
          </div>

          <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <button
              onClick={() => setActiveTab('submissions')}
              className={`btn ${activeTab === 'submissions' ? 'btn-primary' : 'btn-secondary'}`}
              style={{ justifyContent: 'flex-start', borderRadius: 'var(--radius-sm)', border: activeTab === 'submissions' ? 'none' : 'none' }}
            >
              <Users size={18} />
              Submissions ({submissions.length})
            </button>

            <button
              onClick={() => setActiveTab('questions')}
              className={`btn ${activeTab === 'questions' ? 'btn-primary' : 'btn-secondary'}`}
              style={{ justifyContent: 'flex-start', borderRadius: 'var(--radius-sm)', border: activeTab === 'questions' ? 'none' : 'none' }}
            >
              <HelpCircle size={18} />
              Question Editor
            </button>

            <button
              onClick={() => setActiveTab('explore')}
              className={`btn ${activeTab === 'explore' ? 'btn-primary' : 'btn-secondary'}`}
              style={{ justifyContent: 'flex-start', borderRadius: 'var(--radius-sm)', border: activeTab === 'explore' ? 'none' : 'none' }}
            >
              <Grid size={18} />
              Explore Gallery
            </button>
          </nav>
        </div>

        <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '16px' }}>
          <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '2px', paddingLeft: '12px' }}>
            Admin User
          </div>
          <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '12px', paddingLeft: '12px' }}>
            admin@wed.org
          </div>
          <button
            onClick={adminLogout}
            className="btn btn-secondary"
            style={{ width: '100%', justifyContent: 'flex-start', height: '38px', fontSize: '13px' }}
          >
            <LogOut size={16} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main style={{ flex: 1, backgroundColor: 'var(--bg-offwhite)', padding: '32px 40px', overflowY: 'auto' }}>
        {/* TAB 1: SUBMISSIONS TABLE */}
        {activeTab === 'submissions' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <div>
                <h1 style={{ fontSize: '26px', fontWeight: 800 }}>Pledge Submissions</h1>
                <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
                  View user registrations, pledge answers, and recorded video statements.
                </p>
              </div>

              {/* Search Bar */}
              <div style={{ position: 'relative', width: '280px' }}>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Search by name or email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{ paddingLeft: '36px', height: '40px', fontSize: '14px' }}
                />
                <Search size={16} style={{ position: 'absolute', left: '12px', top: '12px', color: 'var(--text-muted)' }} />
              </div>
            </div>

            {/* Submissions Table */}
            <div style={{ background: '#CFCCFF', borderRadius: '32px', border: 'none', overflow: 'hidden', boxShadow: 'var(--shadow-card)', padding: '12px' }}>
              <div style={{ borderRadius: '24px', overflow: 'hidden', background: '#FFFFFF' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
                <thead>
                  <tr style={{ background: 'rgba(0,0,0,0.02)', borderBottom: '1px solid rgba(0,0,0,0.05)', color: '#232528', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 800 }}>
                    <th style={{ padding: '14px 20px' }}>User / Contact</th>
                    <th style={{ padding: '14px 20px' }}>Phone</th>
                    <th style={{ padding: '14px 20px' }}>Date Submitted</th>
                    <th style={{ padding: '14px 20px' }}>Status</th>
                    <th style={{ padding: '14px 20px', textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSubmissions.length > 0 ? (
                    filteredSubmissions.map((sub) => {
                      const isExpanded = expandedSubId === sub.id;
                      return (
                        <React.Fragment key={sub.id}>
                          <tr
                            style={{ borderBottom: '1px solid var(--border-color)', cursor: 'pointer' }}
                            onClick={() => setExpandedSubId(isExpanded ? null : sub.id)}
                          >
                            <td style={{ padding: '16px 20px' }}>
                              <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{sub.user.fullName}</div>
                              <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>{sub.user.email}</div>
                            </td>
                            <td style={{ padding: '16px 20px', color: 'var(--text-secondary)' }}>{sub.user.phone}</td>
                            <td style={{ padding: '16px 20px', color: '#232528' }}>
                              {new Date(sub.createdAt).toLocaleDateString()} {new Date(sub.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </td>
                            <td style={{ padding: '16px 20px' }}>
                              <span style={{ padding: '4px 10px', borderRadius: '20px', backgroundColor: '#232528', color: '#FFFFFF', fontWeight: 600, fontSize: '12px' }}>
                                {sub.status}
                              </span>
                            </td>
                            <td style={{ padding: '16px 20px', textAlign: 'right' }}>
                              <button className="btn btn-secondary" style={{ height: '32px', fontSize: '12px', padding: '0 12px' }}>
                                {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                                {isExpanded ? 'Collapse' : 'View Details'}
                              </button>
                            </td>
                          </tr>

                          {/* Expanded Detail Row */}
                          {isExpanded && (
                            <tr style={{ background: 'var(--bg-subtle)' }}>
                              <td colSpan={5} style={{ padding: '24px 28px' }}>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '28px' }}>
                                  <div>
                                    <h4 style={{ fontSize: '15px', fontWeight: 700, marginBottom: '16px' }}>Pledge Answers</h4>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                                      {questions.map((q) => (
                                        <div key={q.id} style={{ background: '#fff', padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                                          <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--accent-color)', marginBottom: '4px' }}>
                                            {q.text}
                                          </div>
                                          <div style={{ fontSize: '14px', color: 'var(--text-primary)' }}>
                                            {sub.answers[q.id] || <span style={{ color: 'var(--text-muted)', italic: 'true' }}>No answer provided</span>}
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  </div>

                                  <div>
                                    <h4 style={{ fontSize: '15px', fontWeight: 700, marginBottom: '16px' }}>Video Statement</h4>
                                    <div style={{ background: '#000', borderRadius: '12px', overflow: 'hidden', height: '200px' }}>
                                      <video
                                        src={videoUrls[sub.id] || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4'}
                                        controls
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                      />
                                    </div>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          )}
                        </React.Fragment>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan={5} style={{ padding: '40px', textAlign: 'center', color: '#232528', fontWeight: 600 }}>
                        No pledge submissions found matching search query.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: QUESTION EDITOR */}
        {activeTab === 'questions' && (
          <div style={{ maxWidth: '720px' }}>
            <div style={{ marginBottom: '24px' }}>
              <h1 style={{ fontSize: '26px', fontWeight: 800 }}>Question Config Editor</h1>
              <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
                Edit the pledge questions dynamically. Changes saved here will immediately reflect on the public site.
              </p>
            </div>

            {savedSuccess && (
              <div style={{ padding: '12px 16px', backgroundColor: '#ecfdf5', border: '1px solid #a7f3d0', color: '#065f46', borderRadius: '8px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: 600 }}>
                <Check size={18} />
                Questions updated successfully! Public form is now live with changes.
              </div>
            )}

            <form onSubmit={handleSaveQuestions}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '24px' }}>
                {editableQuestions.map((q, idx) => {
                  const colors = ['#FCE1C3', '#D1E8FB', '#CFCCFF', '#BFE6D0'];
                  const bgColor = colors[idx % colors.length];
                  return (
                  <div key={q.id} style={{ margin: 0, padding: '24px', backgroundColor: bgColor, borderRadius: '32px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                      <span style={{ fontWeight: 800, fontSize: '14px', color: '#232528' }}>
                        Question #{idx + 1}
                      </span>
                      <span style={{ fontSize: '12px', color: '#232528', opacity: 0.6 }}>ID: {q.id}</span>
                    </div>

                    <div className="form-group" style={{ marginBottom: '16px' }}>
                      <label className="form-label">Question Text</label>
                      <input
                        type="text"
                        className="form-input"
                        value={q.text}
                        onChange={(e) => {
                          const updated = [...editableQuestions];
                          updated[idx].text = e.target.value;
                          setEditableQuestions(updated);
                        }}
                      />
                    </div>

                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="form-label">Placeholder Hint</label>
                      <input
                        type="text"
                        className="form-input"
                        value={q.placeholder || ''}
                        onChange={(e) => {
                          const updated = [...editableQuestions];
                          updated[idx].placeholder = e.target.value;
                          setEditableQuestions(updated);
                        }}
                      />
                    </div>
                  </div>
                )})}
              </div>

              <button type="submit" className="btn btn-primary" style={{ padding: '0 32px' }}>
                <Save size={18} />
                Save Changes Live
              </button>
            </form>
          </div>
        )}

        {/* TAB 3: EXPLORE / GALLERY GRID */}
        {activeTab === 'explore' && (
          <div>
            <div style={{ marginBottom: '24px' }}>
              <h1 style={{ fontSize: '26px', fontWeight: 800 }}>Explore Pledge Gallery</h1>
              <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
                Instagram-style video showcase of public entrepreneurship pledges.
              </p>
            </div>

            {/* Grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
                gap: '20px',
              }}
            >
              {submissions.map((sub) => (
                <div
                  key={sub.id}
                  onClick={() => openExploreModal(sub)}
                  style={{
                    position: 'relative',
                    aspectRatio: '9/16',
                    maxHeight: '400px',
                    borderRadius: 'var(--radius-md)',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    background: '#18181b',
                    boxShadow: 'var(--shadow-md)',
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.02)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                >
                  <video
                    src={videoUrls[sub.id] || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4'}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    muted
                  />

                  {/* Gradient Scrim & Overlay */}
                  <div
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0) 100%)',
                      padding: '20px 16px 16px',
                      color: '#ffffff',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '4px',
                    }}
                  >
                    <div style={{ fontSize: '15px', fontWeight: 700 }}>{sub.user.fullName}</div>
                    <div style={{ fontSize: '12px', opacity: 0.8, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      "{sub.answers['q1'] || 'Big Idea Pledge'}"
                    </div>
                  </div>

                  {/* Hover Play Icon */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      width: '48px',
                      height: '48px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--accent-color)',
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: 'var(--shadow-md)',
                    }}
                  >
                    <Play size={22} style={{ marginLeft: '2px' }} />
                  </div>
                </div>
              ))}
            </div>

            {/* Lightbox Modal Player */}
            {activeModalSub && modalVideoUrl && (
              <div
                style={{
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: 'rgba(0,0,0,0.8)',
                  backdropFilter: 'blur(4px)',
                  zIndex: 100,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '20px',
                }}
                onClick={() => setActiveModalSub(null)}
              >
                <div
                  style={{
                    background: '#fff',
                    borderRadius: 'var(--radius-lg)',
                    maxWidth: '800px',
                    width: '100%',
                    display: 'grid',
                    gridTemplateColumns: '1fr 340px',
                    overflow: 'hidden',
                    boxShadow: 'var(--shadow-lg)',
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div style={{ background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <video
                      src={modalVideoUrl}
                      controls
                      autoPlay
                      style={{ width: '100%', maxHeight: '500px', objectFit: 'contain' }}
                    />
                  </div>

                  <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                        <div>
                          <h3 style={{ fontSize: '20px', fontWeight: 800 }}>{activeModalSub.user.fullName}</h3>
                          <div style={{ fontSize: '13px', color: 'var(--accent-color)', fontWeight: 600 }}>
                            World Entrepreneurship Day Pledge
                          </div>
                        </div>
                        <button
                          onClick={() => setActiveModalSub(null)}
                          style={{ color: 'var(--text-muted)', padding: '4px' }}
                        >
                          <X size={20} />
                        </button>
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {questions.slice(0, 2).map((q) => (
                          <div key={q.id} style={{ background: 'var(--bg-offwhite)', padding: '10px 12px', borderRadius: '6px' }}>
                            <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                              {q.text}
                            </div>
                            <div style={{ fontSize: '13px', color: 'var(--text-primary)', marginTop: '2px' }}>
                              {activeModalSub.answers[q.id] || 'N/A'}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div style={{ fontSize: '12px', color: 'var(--text-muted)', paddingTop: '16px', borderTop: '1px solid var(--border-color)' }}>
                      Submitted on {new Date(activeModalSub.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};
