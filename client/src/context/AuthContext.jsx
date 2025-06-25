import React, { createContext, useState, useEffect } from 'react';

// Create context
export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(null);

  // Check for existing session on app load
  useEffect(() => {
    checkAuthStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkAuthStatus = async () => {
    try {
      const token = localStorage.getItem('trailblix_token');
      if (!token) {
        setUser(null);
        setLoading(false);
        return;
      }

      // For development/testing - you can replace this with a mock response
      try {
        const response = await fetch('/api/auth/verify', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          const userData = await response.json();
          setUser(userData.user);
        } else {
          // Clear invalid token
          console.warn('Invalid token detected, clearing auth state');
          await logout();
        }
      } catch (apiError) {
        // If the API call fails (like in dev environment without a backend)
        console.warn('Auth verification failed, assuming development mode', apiError);
        // For development - retrieve stored user from localStorage as fallback
        const storedUser = localStorage.getItem('trailblix_user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        } else {
          await logout();
        }
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      await logout();
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password, rememberMe = false) => {
    setLoading(true);
    setAuthError(null);
    
    try {
      // Clear any existing session first
      await logout(false); // false means don't update loading state
      
      // For development/testing - you can use a mock response
      try {
        const response = await fetch('/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email, password, rememberMe })
        });

        const data = await response.json();

        if (response.ok) {
          // Store auth data
          localStorage.setItem('trailblix_token', data.token);
          localStorage.setItem('trailblix_user', JSON.stringify(data.user));
          setUser(data.user);
          return { success: true, user: data.user };
        } else {
          setAuthError(data.error);
          return { success: false, error: data.error };
        }
      } catch (apiError) {
        // Mock response for development
        console.warn('Login API failed, using mock data for development', apiError);
        
        // This is just for development without a backend
        // REMOVE THIS IN PRODUCTION
        if (email === 'test@example.com' && password === 'password') {
          const mockUser = {
            id: '123',
            name: 'Test User',
            email: 'test@example.com',
            onboardingCompleted: false
          };
          
          localStorage.setItem('trailblix_token', 'mock-jwt-token');
          localStorage.setItem('trailblix_user', JSON.stringify(mockUser));
          setUser(mockUser);
          return { success: true, user: mockUser };
        } else if (email === 'complete@example.com' && password === 'password') {
          const mockUser = {
            id: '456',
            name: 'Complete User',
            email: 'complete@example.com',
            onboardingCompleted: true
          };
          
          localStorage.setItem('trailblix_token', 'mock-jwt-token-complete');
          localStorage.setItem('trailblix_user', JSON.stringify(mockUser));
          setUser(mockUser);
          return { success: true, user: mockUser };
        } else {
          const errorMsg = 'Invalid email or password';
          setAuthError(errorMsg);
          return { success: false, error: errorMsg };
        }
      }
    } catch (loginError) {
      console.error('Login error:', loginError);
      const errorMsg = 'Login failed. Please try again.';
      setAuthError(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  };

  const register = async (name, email, password) => {
    setLoading(true);
    setAuthError(null);
    
    try {
      // Clear any existing session first
      await logout(false); // false means don't update loading state
      
      // For development/testing - you can use a mock response
      try {
        const response = await fetch('/api/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ name, email, password })
        });

        const data = await response.json();

        if (response.ok) {
          localStorage.setItem('trailblix_token', data.token);
          localStorage.setItem('trailblix_user', JSON.stringify(data.user));
          setUser(data.user);
          return { success: true, user: data.user };
        } else {
          setAuthError(data.error);
          return { success: false, error: data.error };
        }
      } catch (apiError) {
        // Mock response for development
        console.warn('Register API failed, using mock data for development', apiError);
        
        // This is just for development without a backend
        // REMOVE THIS IN PRODUCTION
        const mockUser = {
          id: Date.now().toString(),
          name: name,
          email: email,
          onboardingCompleted: false
        };
        
        localStorage.setItem('trailblix_token', 'mock-jwt-token-' + mockUser.id);
        localStorage.setItem('trailblix_user', JSON.stringify(mockUser));
        setUser(mockUser);
        return { success: true, user: mockUser };
      }
    } catch (registerError) {
      console.error('Registration error:', registerError);
      const errorMsg = 'Registration failed. Please try again.';
      setAuthError(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  };

  const logout = async (updateLoadingState = true) => {
    if (updateLoadingState) setLoading(true);
    
    // Clear all auth data
    localStorage.removeItem('trailblix_token');
    localStorage.removeItem('trailblix_user');
    setUser(null);
    setAuthError(null);
    
    if (updateLoadingState) setLoading(false);
  };

  const updateUser = (userData) => {
    // Update both state and localStorage
    const updatedUser = { ...user, ...userData };
    setUser(updatedUser);
    localStorage.setItem('trailblix_user', JSON.stringify(updatedUser));
  };

  const completeOnboarding = () => {
    updateUser({ onboardingCompleted: true });
  };

  const value = {
    user,
    loading,
    error: authError,
    login,
    register,
    logout,
    updateUser,
    completeOnboarding
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};