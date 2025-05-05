import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import Layout from './components/Layout';
import LoadingScreen from './components/LoadingScreen';
import PageTransition from './components/PageTransition';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import FacultyPage from './pages/FacultyPage';
import AcademicsPage from './pages/AcademicsPage';
import GalleryPage from './pages/GalleryPage';
import NewsPage from './pages/NewsPage';
import ContactPage from './pages/ContactPage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import AdmissionPage from './pages/AdmissionPage';
import BeyondAcademicsPage from './pages/BeyondAcademicsPage';
import FacilitiesPage from './pages/FacilitiesPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsPage from './pages/TermsPage';
import CookiePolicyPage from './pages/CookiePolicyPage';
import DisclaimerPage from './pages/DisclaimerPage';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';

// Protected Route Components
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  
  if (loading) {
    return <LoadingScreen />;
  }
  
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  return <>{children}</>;
};

const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  
  if (loading) {
    return <LoadingScreen />;
  }
  
  if (!user || user.role !== 'admin') {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  return <>{children}</>;
};

// Create a Routes component to access the location
const AppRoutes = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route path="/login" element={<LoginPage />} />
        
        {/* Protected Dashboard Route */}
        <Route 
          path="/dashboard/*" 
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          } 
        />
        
        <Route path="/" element={<Layout />}>
          <Route index element={<PageTransition><HomePage /></PageTransition>} />
          <Route path="about" element={<AboutPage />} />
          <Route path="faculty" element={<PageTransition><FacultyPage /></PageTransition>} />
          <Route path="academics" element={<PageTransition><AcademicsPage /></PageTransition>} />
          <Route path="beyond-academics" element={<PageTransition><BeyondAcademicsPage /></PageTransition>} />
          <Route path="facilities" element={<PageTransition><FacilitiesPage /></PageTransition>} />
          <Route path="gallery" element={<PageTransition><GalleryPage /></PageTransition>} />
          <Route path="news" element={<PageTransition><NewsPage /></PageTransition>} />
          <Route path="contact" element={<PageTransition><ContactPage /></PageTransition>} />
          <Route path="admission" element={<PageTransition><AdmissionPage /></PageTransition>} />
          
          {/* Legal Pages */}
          <Route path="privacy-policy" element={<PageTransition><PrivacyPolicyPage /></PageTransition>} />
          <Route path="terms" element={<PageTransition><TermsPage /></PageTransition>} />
          <Route path="cookie-policy" element={<PageTransition><CookiePolicyPage /></PageTransition>} />
          <Route path="disclaimer" element={<PageTransition><DisclaimerPage /></PageTransition>} />
        </Route>
        
        {/* Catch-all route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  return (
    <AuthProvider>
      <ThemeProvider>
        <Router>
          {isLoading ? (
            <LoadingScreen />
          ) : (
            <>
              <AppRoutes />
              <Toaster position="top-right" />
            </>
          )}
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;