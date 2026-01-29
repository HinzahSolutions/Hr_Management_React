// // src/components/ProtectedRoute.jsx
// // import { useAuth } from './AuthContext';
// // import { Navigate } from 'react-router-dom';

// // export default function ProtectedRoute({ children }) {
// //   const { isAuthenticated } = useAuth();
// //   return isAuthenticated ? children : <Navigate to="/login" replace />;
// // }


// // src/components/ProtectedRoute.jsx
// // import { useAuth } from './AuthContext';
// // import { Navigate } from 'react-router-dom';

// // export default function ProtectedRoute({ children, allowedRoles = ['admin', 'superadmin'] }) {
// //   const { isAuthenticated, user } = useAuth();
  
// //   if (!isAuthenticated) {
// //     return <Navigate to="/admin/login" replace />;
// //   }
  
// //   // Check if user has allowed role
// //   if (allowedRoles && !allowedRoles.includes(user?.user_type)) {
// //     return <Navigate to="/dashboard" replace />; // Or to unauthorized page
// //   }
  
// //   return children;
// // }

// import { useAuth } from './AuthContext';
// import { Navigate, useLocation } from 'react-router-dom';
// import { useEffect, useState } from 'react';
// import toast, { Toaster } from 'react-hot-toast';

// export default function ProtectedRoute({ children, requireAuth = true }) {
//   const { isAuthenticated, loading, logout } = useAuth();
//   const location = useLocation();
//   const [checking, setChecking] = useState(true);

//   useEffect(() => {
//     const checkSession = () => {
//       const token = localStorage.getItem('authToken');
//       const expiry = localStorage.getItem('tokenExpiry');
      
//       if (!token || !expiry) {
//         logout(false);
//         return;
//       }
      
//       if (Date.now() > parseInt(expiry)) {
//         toast.error('Session expired');
//         logout();
//         return;
//       }
      
//       setChecking(false);
//     };

//     checkSession();
//   }, [location, logout]);

//   if (loading || checking) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
//           <p className="text-gray-600">Verifying your session...</p>
//         </div>
//       </div>
//     );
//   }

//   if (!requireAuth) {
//     return children;
//   }

//   if (!isAuthenticated) {
//     // Save attempted URL
//     if (location.pathname !== '/login') {
//       sessionStorage.setItem('redirectPath', location.pathname);
//     }
//     return <Navigate to="/login" replace state={{ from: location }} />;
//   }

//   return children;
// }
import { useAuth } from './AuthContext';
import { Navigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export default function ProtectedRoute({ children, requireAuth = true }) {
  const { isAuthenticated, loading, logout, canAccessRoute } = useAuth();
  const location = useLocation();
  const [checking, setChecking] = useState(true);
  const [hasPermission, setHasPermission] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      const token = localStorage.getItem('authToken');
      const expiry = localStorage.getItem('tokenExpiry');
      const currentUser = localStorage.getItem('currentUser');
      
      console.log('ProtectedRoute checking session:', { 
        token: !!token, 
        expiry: !!expiry,
        currentUser: !!currentUser,
        isAuthenticated 
      });
      
      // If no auth data exists, redirect to login
      if (!token || !expiry || !currentUser) {
        console.log('Missing auth data');
        if (requireAuth) {
          toast.error('Please login to continue');
          sessionStorage.setItem('redirectPath', location.pathname);
          navigate('/login');
        }
        setChecking(false);
        return;
      }
      
      // Check token expiry
      const now = Date.now();
      if (now > parseInt(expiry)) {
        console.log('Token expired');
        toast.error('Session expired. Please login again.');
        logout();
        setChecking(false);
        return;
      }
      
      console.log('Session is valid');
      setChecking(false);
    };

    checkSession();
  }, [location.pathname, isAuthenticated]);

  // Check permissions AFTER auth state is confirmed
  useEffect(() => {
    if (isAuthenticated && !loading && !checking) {
      const hasAccess = canAccessRoute(location.pathname);
      console.log(`Route ${location.pathname} - Has access: ${hasAccess}`);
      setHasPermission(hasAccess);
      
      if (!hasAccess && location.pathname !== '/login') {
        toast.error('You do not have permission to access this page');
      }
    }
  }, [isAuthenticated, loading, checking, location.pathname, canAccessRoute]);

  if (loading || checking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading session...</p>
        </div>
      </div>
    );
  }

  if (!requireAuth) {
    return children;
  }

  if (!isAuthenticated) {
    console.log('Not authenticated, redirecting to login');
    // Save attempted URL
    if (location.pathname !== '/login') {
      sessionStorage.setItem('redirectPath', location.pathname);
    }
    return <Navigate to="/login" replace />;
  }

  // Check if user has permission for this route
  if (!hasPermission) {
    console.log('No permission for route:', location.pathname);
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h1>
          <p className="text-gray-600 mb-6">
            You don't have permission to access this page.
          </p>
          <div className="flex gap-4 justify-center">
            <button 
              onClick={() => window.location.href = '/dashboard'}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Go to Dashboard
            </button>
            <button 
              onClick={() => window.history.back()}
              className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  return children;
}