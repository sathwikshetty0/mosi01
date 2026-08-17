import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { CampaignProvider } from './context/CampaignContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

import { LandingPage } from './pages/LandingPage';
import { SignupPage } from './pages/SignupPage';
import { QuestionsPage } from './pages/QuestionsPage';
import { VideoRecordPage } from './pages/VideoRecordPage';
import { ThankYouPage } from './pages/ThankYouPage';
import { AdminPage } from './pages/AdminPage';

const AppLayout: React.FC = () => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/questions" element={<QuestionsPage />} />
        <Route path="/record" element={<VideoRecordPage />} />
        <Route path="/thank-you" element={<ThankYouPage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
      {!isAdmin && <Footer />}
    </>
  );
};

export const App: React.FC = () => {
  return (
    <CampaignProvider>
      <Router>
        <AppLayout />
      </Router>
    </CampaignProvider>
  );
};

export default App;
