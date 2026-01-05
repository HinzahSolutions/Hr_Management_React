// src/components/ProtectedRoute.jsx
// import { useAuth } from './AuthContext';
// import { Navigate } from 'react-router-dom';

// export default function ProtectedRoute({ children }) {
//   const { isAuthenticated } = useAuth();
//   return isAuthenticated ? children : <Navigate to="/login" replace />;
// }


// src/components/ProtectedRoute.jsx
// import { useAuth } from './AuthContext';
// import { Navigate } from 'react-router-dom';

// export default function ProtectedRoute({ children, allowedRoles = ['admin', 'superadmin'] }) {
//   const { isAuthenticated, user } = useAuth();
  
//   if (!isAuthenticated) {
//     return <Navigate to="/admin/login" replace />;
//   }
  
//   // Check if user has allowed role
//   if (allowedRoles && !allowedRoles.includes(user?.user_type)) {
//     return <Navigate to="/dashboard" replace />; // Or to unauthorized page
//   }
  
//   return children;
// }

import { useAuth } from './AuthContext';
import { Navigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

export default function ProtectedRoute({ children, requireAuth = true }) {
  const { isAuthenticated, loading, logout } = useAuth();
  const location = useLocation();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const checkSession = () => {
      const token = localStorage.getItem('authToken');
      const expiry = localStorage.getItem('tokenExpiry');
      
      if (!token || !expiry) {
        logout(false);
        return;
      }
      
      if (Date.now() > parseInt(expiry)) {
        toast.error('Session expired');
        logout();
        return;
      }
      
      setChecking(false);
    };

    checkSession();
  }, [location, logout]);

  if (loading || checking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Verifying your session...</p>
        </div>
      </div>
    );
  }

  if (!requireAuth) {
    return children;
  }

  if (!isAuthenticated) {
    // Save attempted URL
    if (location.pathname !== '/login') {
      sessionStorage.setItem('redirectPath', location.pathname);
    }
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
}