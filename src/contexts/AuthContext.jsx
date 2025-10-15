import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
 const [loading, setLoading] = useState(true);

  // Check if user is logged in on initial load
  useEffect(() => {
    const token = localStorage.getItem('blogAuthToken');
    const userData = localStorage.getItem('blogUserData');
    
    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData);
        // Check if token is still valid (not expired)
        if (parsedUser.expiry > Date.now()) {
          setCurrentUser(parsedUser);
        } else {
          // Token expired, remove from localStorage
          localStorage.removeItem('blogAuthToken');
          localStorage.removeItem('blogUserData');
        }
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    // In a real app, this would be an API call to validate credentials
    // For this implementation, we'll use hardcoded credentials
    if (email === 'admin@allishospital.com' && password === 'admin123') {
      const userData = {
        id: 1,
        email: email,
        name: 'Admin User',
        expiry: Date.now() + 24 * 60 * 60 * 1000 // 24 hours from now
      };
      
      localStorage.setItem('blogAuthToken', 'valid_token');
      localStorage.setItem('blogUserData', JSON.stringify(userData));
      setCurrentUser(userData);
      return { success: true, user: userData };
    } else {
      return { success: false, error: 'Invalid credentials' };
    }
  };

  const logout = () => {
    localStorage.removeItem('blogAuthToken');
    localStorage.removeItem('blogUserData');
    setCurrentUser(null);
  };

  const value = {
    currentUser,
    login,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
