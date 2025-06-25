import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { useAuth } from './context/useAuth';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import AdvancedOnboarding from './pages/Onboarding/AdvancedOnboarding';
import Dashboard from './pages/Dashboard/Dashboard';
import LoadingScreen from './components/LoadingScreen/LoadingScreen';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) return <LoadingScreen />;
  if (!user) return <Navigate to="/login" replace />;
  if (user && !user.onboardingCompleted) return <Navigate to="/onboarding" replace />;
  
  return children;
};

// Auth Route Component (redirect if already logged in)
const AuthRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) return <LoadingScreen />;
  if (user && user.onboardingCompleted) return <Navigate to="/dashboard" replace />;
  if (user && !user.onboardingCompleted) return <Navigate to="/onboarding" replace />;
  
  return children;
};

// Onboarding Route Component
const OnboardingRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) return <LoadingScreen />;
  if (!user) return <Navigate to="/login" replace />;
  if (user && user.onboardingCompleted) return <Navigate to="/dashboard" replace />;
  
  return children;
};

// Add a LogoutRoute component
const LogoutRoute = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    const performLogout = async () => {
      await logout();
      navigate('/');
    };
    
    performLogout();
  }, [logout, navigate]);
  
  return <LoadingScreen />;
};

const AppContent = () => {
  const { user } = useAuth();
  
  return (
    <div className="page-container">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={
            <AuthRoute>
              <Login />
            </AuthRoute>
          }
        />
        <Route
          path="/register"
          element={
            <AuthRoute>
              <Register />
            </AuthRoute>
          }
        />
        <Route
          path="/onboarding"
          element={
            <OnboardingRoute>
              <AdvancedOnboarding />
            </OnboardingRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/logout" element={<LogoutRoute />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
};

export default App;