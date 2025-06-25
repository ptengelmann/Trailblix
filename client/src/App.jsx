// App.jsx
import React, { useState, useEffect } from 'react';
import AdvancedOnboarding from './pages/Onboarding/AdvancedOnboarding';
import Dashboard from './pages/Dashboard/Dashboard';

const App = () => {
  const [currentView, setCurrentView] = useState('loading');
  const [user, setUser] = useState(null);

  // Check if user exists on app load
  useEffect(() => {
    checkExistingUser();
  }, []);

  const checkExistingUser = async () => {
    try {
      const response = await fetch('/api/users');
      const users = await response.json();
      
      if (Array.isArray(users) && users.length > 0) {
        // Find the most recent user with completed onboarding
        const completedUser = users.find(user => user.onboardingCompleted);
        
        if (completedUser) {
          setUser(completedUser);
          setCurrentView('dashboard');
        } else {
          // User exists but hasn't completed onboarding
          setCurrentView('onboarding');
        }
      } else {
        // No users found, start onboarding
        setCurrentView('onboarding');
      }
    } catch (error) {
      console.error('Error checking for existing user:', error);
      // Default to onboarding if there's an error
      setCurrentView('onboarding');
    }
  };

  const handleOnboardingComplete = (userData) => {
    console.log('Onboarding completed for:', userData);
    setUser(userData.user || userData);
    setCurrentView('dashboard');
  };

  const handleReturnToOnboarding = () => {
    setUser(null);
    setCurrentView('onboarding');
  };

  // Loading state
  if (currentView === 'loading') {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        fontFamily: 'system-ui, sans-serif'
      }}>
        <div style={{
          width: '40px',
          height: '40px',
          border: '4px solid rgba(255,255,255,0.3)',
          borderTop: '4px solid white',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
          marginBottom: '1rem'
        }} />
        <p>Loading Trailblix...</p>
        <style jsx>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <main>
      {currentView === 'onboarding' ? (
        <AdvancedOnboarding onComplete={handleOnboardingComplete} />
      ) : (
        <Dashboard 
          user={user} 
          onReturnToOnboarding={handleReturnToOnboarding}
        />
      )}
    </main>
  );
};

export default App;