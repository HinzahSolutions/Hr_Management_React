// src/context/AuthContext.jsx
// src/AuthContext.jsx


// 'use client';

// import React, { createContext, useContext, useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

// const AuthContext = createContext();

// export function AuthProvider({ children }) {
//   const [user, setUser] = useState(null);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const navigate = useNavigate();

//   // Check if user is already logged in (on app load or refresh)
//   useEffect(() => {
//     const currentUser = localStorage.getItem('currentUser');
//     if (currentUser) {
//       try {
//         const parsedUser = JSON.parse(currentUser);
//         setUser(parsedUser);
//         setIsAuthenticated(true);
//       } catch (error) {
//         console.error('Failed to parse currentUser:', error);
//         localStorage.removeItem('currentUser');
//       }
//     }
//   }, []);

//   const login = (companyData) => {
//     // This is now called from Login.jsx after successful validation
//     localStorage.setItem('currentUser', JSON.stringify(companyData));
//     setUser(companyData);
//     setIsAuthenticated(true);
//   };

//   const logout = () => {
//     localStorage.removeItem('currentUser');
//     setUser(null);
//     setIsAuthenticated(false);
//     navigate('/login', { replace: true });
//   };

//   return (
//     <AuthContext.Provider value={{
//       user,
//       isAuthenticated,
//       login,
//       logout,
//     }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export const useAuth = () => useContext(AuthContext);


'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [sessionTimer, setSessionTimer] = useState(null);
  const navigate = useNavigate();

  // Check if user is already logged in
  useEffect(() => {
    checkAndRestoreSession();
  }, []);

  // Auto-logout timer
  useEffect(() => {
    if (!isAuthenticated || !user) return;

    if (sessionTimer) {
      clearTimeout(sessionTimer);
    }

    const timer = setTimeout(() => {
      toast.error('Session expired due to inactivity');
      logout();
    }, 30 * 60 * 1000);

    setSessionTimer(timer);

    const resetTimer = () => {
      if (sessionTimer) {
        clearTimeout(sessionTimer);
      }
      const newTimer = setTimeout(() => {
        toast.error('Session expired due to inactivity');
        logout();
      }, 30 * 60 * 1000);
      setSessionTimer(newTimer);
    };

    window.addEventListener('mousemove', resetTimer);
    window.addEventListener('keypress', resetTimer);
    window.addEventListener('click', resetTimer);

    return () => {
      if (sessionTimer) {
        clearTimeout(sessionTimer);
      }
      window.removeEventListener('mousemove', resetTimer);
      window.removeEventListener('keypress', resetTimer);
      window.removeEventListener('click', resetTimer);
    };
  }, [isAuthenticated, user]);

  const checkAndRestoreSession = async () => {
    try {
      setLoading(true);
      const currentUser = localStorage.getItem('currentUser');
      const authToken = localStorage.getItem('authToken');
      const tokenExpiry = localStorage.getItem('tokenExpiry');

      if (!currentUser || !authToken || !tokenExpiry) {
        clearAuthData();
        return;
      }

      const now = Date.now();
      if (now > parseInt(tokenExpiry)) {
        toast.error('Session expired. Please login again.');
        clearAuthData();
        return;
      }

      try {
        const parsedUser = JSON.parse(currentUser);
        setUser(parsedUser);
        setIsAuthenticated(true);

        const timeLeft = parseInt(tokenExpiry) - now;
        if (timeLeft < 5 * 60 * 1000) {
          await refreshAuthToken();
        }
      } catch (error) {
        console.error('Failed to restore session:', error);
        clearAuthData();
      }
    } finally {
      setLoading(false);
    }
  };

  const refreshAuthToken = async () => {
    try {
      const currentToken = localStorage.getItem('authToken');
      if (!currentToken) return false;

      const response = await fetch('https://hr.hinzah.com/api/refresh-token', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${currentToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        if (data.token) {
          localStorage.setItem('authToken', data.token);
          const newExpiry = Date.now() + 30 * 60 * 1000;
          localStorage.setItem('tokenExpiry', newExpiry.toString());
          return true;
        }
      }
    } catch (error) {
      console.error('Token refresh failed:', error);
    }
    return false;
  };

  const clearAuthData = () => {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('authToken');
    localStorage.removeItem('tokenExpiry');
    setUser(null);
    setIsAuthenticated(false);
  };

  const login = (companyData, token) => {
    // Transform API response to match your expected format
    const userData = {
      id: companyData.id,
      username: companyData.username || companyData.company_name,
      companyId: companyData.company_code || `COMP${String(companyData.id).padStart(4, '0')}`,
      company_name: companyData.company_name,
      company_code: companyData.company_code,
      company_permissions: companyData.company_permissions,
      logo: companyData.logo || null,
      email: companyData.email || null,
      phone: companyData.phone || null,
      address: companyData.address || null,
      ...companyData // Include any other fields
    };

    // Store transformed data
    localStorage.setItem('currentUser', JSON.stringify(userData));
    
    if (token) {
      localStorage.setItem('authToken', token);
    }
    
    const expiryTime = Date.now() + 30 * 60 * 1000;
    localStorage.setItem('tokenExpiry', expiryTime.toString());
    
    setUser(userData);
    setIsAuthenticated(true);
    
    console.log(`User ${userData.username} logged in from ${userData.company_name}`);
  };

  const logout = (showToast = true) => {
    const username = user?.username;
    
    clearAuthData();
    
    if (sessionTimer) {
      clearTimeout(sessionTimer);
      setSessionTimer(null);
    }
    
    if (showToast) {
      toast.success(`Logged out successfully${username ? ` (${username})` : ''}`);
    }
    
    navigate('/login', { replace: true });
  };

  const getAuthHeaders = () => {
    const token = localStorage.getItem('authToken');
    return {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
  };

  const getCompanyId = () => {
    return user?.company_code || user?.companyId;
  };

  const hasPermission = (permission) => {
    if (!user?.company_permissions) return false;
    
    const permissions = user.company_permissions;
    if (Array.isArray(permissions)) {
      return permissions.includes(permission);
    } else if (typeof permissions === 'object') {
      return permissions[permission] === true;
    }
    return false;
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      loading,
      login,
      logout,
      getAuthHeaders,
      getCompanyId,
      hasPermission,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};