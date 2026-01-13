

// 'use client';

// import React, { createContext, useContext, useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import toast from 'react-hot-toast';

// const AuthContext = createContext();

// export function AuthProvider({ children }) {
//   const [user, setUser] = useState(null);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [sessionTimer, setSessionTimer] = useState(null);
//   const navigate = useNavigate();

//   // Check if user is already logged in
//   useEffect(() => {
//     checkAndRestoreSession();
//   }, []);

//   // Auto-logout timer
//   useEffect(() => {
//     if (!isAuthenticated || !user) return;

//     if (sessionTimer) {
//       clearTimeout(sessionTimer);
//     }

//     const timer = setTimeout(() => {
//       // toast.error('Session expired due to inactivity');
//       logout();
//     }, 30 * 60 * 1000);

//     setSessionTimer(timer);

//     const resetTimer = () => {
//       if (sessionTimer) {
//         clearTimeout(sessionTimer);
//       }
//       const newTimer = setTimeout(() => {
//         // toast.error('Session expired due to inactivity');
//         logout();
//       }, 30 * 60 * 1000);
//       setSessionTimer(newTimer);
//     };

//     window.addEventListener('mousemove', resetTimer);
//     window.addEventListener('keypress', resetTimer);
//     window.addEventListener('click', resetTimer);

//     return () => {
//       if (sessionTimer) {
//         clearTimeout(sessionTimer);
//       }
//       window.removeEventListener('mousemove', resetTimer);
//       window.removeEventListener('keypress', resetTimer);
//       window.removeEventListener('click', resetTimer);
//     };
//   }, [isAuthenticated, user]);

//   const checkAndRestoreSession = async () => {
//     try {
//       setLoading(true);
//       const currentUser = localStorage.getItem('currentUser');
//       const authToken = localStorage.getItem('authToken');
//       const tokenExpiry = localStorage.getItem('tokenExpiry');

//       if (!currentUser || !authToken || !tokenExpiry) {
//         clearAuthData();
//         return;
//       }

//       const now = Date.now();
//       if (now > parseInt(tokenExpiry)) {
//         toast.error('Session expired. Please login again.');
//         clearAuthData();
//         return;
//       }

//       try {
//         const parsedUser = JSON.parse(currentUser);
//         setUser(parsedUser);
//         setIsAuthenticated(true);

//         const timeLeft = parseInt(tokenExpiry) - now;
//         if (timeLeft < 5 * 60 * 1000) {
//           await refreshAuthToken();
//         }
//       } catch (error) {
//         console.error('Failed to restore session:', error);
//         clearAuthData();
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   const refreshAuthToken = async () => {
//     try {
//       const currentToken = localStorage.getItem('authToken');
//       if (!currentToken) return false;

//       const response = await fetch('https://hr.hinzah.com/api/refresh-token', {
//         method: 'POST',
//         headers: {
//           'Authorization': `Bearer ${currentToken}`,
//           'Content-Type': 'application/json',
//         },
//       });

//       if (response.ok) {
//         const data = await response.json();
//         if (data.token) {
//           localStorage.setItem('authToken', data.token);
//           const newExpiry = Date.now() + 30 * 60 * 1000;
//           localStorage.setItem('tokenExpiry', newExpiry.toString());
//           return true;
//         }
//       }
//     } catch (error) {
//       console.error('Token refresh failed:', error);
//     }
//     return false;
//   };

//   const clearAuthData = () => {
//     localStorage.removeItem('currentUser');
//     localStorage.removeItem('authToken');
//     localStorage.removeItem('tokenExpiry');
//     setUser(null);
//     setIsAuthenticated(false);
//   };

//   const login = (companyData, token) => {
//     // Transform API response to match your expected format
//     const userData = {
//       id: companyData.id,
//       username: companyData.username || companyData.company_name,
//       companyId: companyData.company_code || `COMP${String(companyData.id).padStart(4, '0')}`,
//       company_name: companyData.company_name,
//       company_code: companyData.company_code,
//       company_permissions: companyData.company_permissions,
//       logo: companyData.logo || null,
//       email: companyData.email || null,
//       phone: companyData.phone || null,
//       address: companyData.address || null,
//       ...companyData // Include any other fields
//     };

//     // Store transformed data
//     localStorage.setItem('currentUser', JSON.stringify(userData));
    
//     if (token) {
//       localStorage.setItem('authToken', token);
//     }
    
//     const expiryTime = Date.now() + 30 * 60 * 1000;
//     localStorage.setItem('tokenExpiry', expiryTime.toString());
    
//     setUser(userData);
//     setIsAuthenticated(true);
    
//     console.log(`User ${userData.username} logged in from ${userData.company_name}`);
//   };

//   const logout = (showToast = true) => {
//     const username = user?.username;
    
//     clearAuthData();
    
//     if (sessionTimer) {
//       clearTimeout(sessionTimer);
//       setSessionTimer(null);
//     }
    
//     if (showToast) {
//       toast.success(`Logged out successfully${username ? ` (${username})` : ''}`);
//     }
    
//     navigate('/login', { replace: true });
//   };

//   const getAuthHeaders = () => {
//     const token = localStorage.getItem('authToken');
//     return {
//       'Authorization': `Bearer ${token}`,
//       'Content-Type': 'application/json',
//     };
//   };

//   const getCompanyId = () => {
//     return user?.company_code || user?.companyId;
//   };

// const hasPermission = (moduleName, subItemName) => {
//   // Check permissions from API response
//   if (!user?.permissions?.[moduleName]) return false;
  
//   const modulePermissions = user.permissions[moduleName];
  
//   // Search through the nested structure
//   for (const [category, items] of Object.entries(modulePermissions)) {
//     if (items && items[subItemName]) {
//       return items[subItemName].view === true || items[subItemName]['/dev'] === true;
//     }
//   }
  
//   return false;
// };


//   return (
//     <AuthContext.Provider value={{
//       user,
//       isAuthenticated,
//       loading,
//       login,
//       logout,
//       getAuthHeaders,
//       getCompanyId,
//       hasPermission,
//     }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };

'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [permissions, setPermissions] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [sessionTimer, setSessionTimer] = useState(null);
  const navigate = useNavigate();

  // Check if user is already logged in
  useEffect(() => {
    checkAndRestoreSession();
  }, []);

 const fetchPermissions = async (companyId, token) => {
  try {
    console.log('Fetching permissions for company:', companyId);
    const response = await fetch(`https://hr.hinzah.com/api/company/permissions`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    console.log('Permissions API response status:', response.status);
    
    if (response.ok) {
      const data = await response.json();
      console.log('Permissions API data:', data);
      
      // FIXED: Check for the actual response structure
      if (data && data.permissions) {
        console.log('Permissions loaded successfully:', data.permissions);
        return data.permissions; // Return the permissions object
      } else if (data && data.data) {
        // Alternative: check for data.data if that's also possible
        console.log('Permissions loaded successfully from data.data:', data.data);
        return data.data;
      } else {
        console.error('API did not return permissions in expected format:', data);
        return null;
      }
    } else {
      const errorText = await response.text();
      console.error('Permissions API error:', response.status, errorText);
      return null;
    }
  } catch (error) {
    console.error('Error fetching permissions:', error);
    return null;
  }
};

  const checkAndRestoreSession = async () => {
    try {
      setLoading(true);
      const currentUser = localStorage.getItem('currentUser');
      const authToken = localStorage.getItem('authToken');
      const tokenExpiry = localStorage.getItem('tokenExpiry');
      const storedPermissions = localStorage.getItem('permissions');

      console.log('Restoring session:', { currentUser, authToken, tokenExpiry, storedPermissions });

      if (!currentUser || !authToken || !tokenExpiry) {
        console.log('No session data found');
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
        console.log('Parsed user:', parsedUser);
        
        setUser(parsedUser);
        setIsAuthenticated(true);

        if (storedPermissions) {
          console.log('Using stored permissions');
          setPermissions(JSON.parse(storedPermissions));
        } else {
          console.log('No stored permissions, fetching from API');
          // Try to fetch permissions, but don't block login if it fails
          try {
            const perms = await fetchPermissions(parsedUser.company_code || parsedUser.companyId, authToken);
            if (perms) {
              setPermissions(perms);
              localStorage.setItem('permissions', JSON.stringify(perms));
              console.log('Permissions fetched and stored');
            } else {
              console.warn('Could not fetch permissions, continuing without them');
            }
          } catch (permError) {
            console.warn('Permission fetch failed, continuing:', permError);
          }
        }
      } catch (error) {
        console.error('Failed to restore session:', error);
        clearAuthData();
      }
    } finally {
      setLoading(false);
    }
  };

  const clearAuthData = () => {
    console.log('Clearing auth data');
    localStorage.removeItem('currentUser');
    localStorage.removeItem('authToken');
    localStorage.removeItem('tokenExpiry');
    localStorage.removeItem('permissions');
    setUser(null);
    setPermissions(null);
    setIsAuthenticated(false);
  };

  const login = async (companyData, token) => {
    try {
      console.log('Starting login process with:', companyData);
      
      // First, try to fetch permissions
      console.log('Attempting to fetch permissions...');
      const perms = await fetchPermissions(companyData.company_code, token);
      
      if (!perms) {
        console.error('Failed to fetch permissions from API');
        // Don't show toast here, let the login component handle it
        return false;
      }

      console.log('Permissions fetched successfully');

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
        ...companyData
      };

      console.log('User data prepared:', userData);

      // Store transformed data
      localStorage.setItem('currentUser', JSON.stringify(userData));
      localStorage.setItem('authToken', token);
      localStorage.setItem('permissions', JSON.stringify(perms));
      
      const expiryTime = Date.now() + 30 * 60 * 1000;
      localStorage.setItem('tokenExpiry', expiryTime.toString());
      
      setUser(userData);
      setPermissions(perms);
      setIsAuthenticated(true);
      
      console.log(`User ${userData.username} logged in from ${userData.company_name}`);
      console.log('Final localStorage state:', {
        currentUser: localStorage.getItem('currentUser'),
        authToken: localStorage.getItem('authToken'),
        tokenExpiry: localStorage.getItem('tokenExpiry'),
        permissions: localStorage.getItem('permissions')
      });
      
      return true;
    } catch (error) {
      console.error('Login error:', error);
      // Don't show toast here
      return false;
    }
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

const hasPermission = (moduleName, subItemName = null, action = 'view') => {
  if (!permissions || !permissions[moduleName]) {
    console.log(`No permissions found for module: ${moduleName}`);
    return false;
  }

  const modulePermissions = permissions[moduleName];
  console.log(`Checking permissions for ${moduleName}.${subItemName}.${action}:`, modulePermissions);

  if (subItemName) {
    // First, check exact match for subItemName
    if (modulePermissions[subItemName]) {
      const hasPerm = modulePermissions[subItemName][action] === true;
      console.log(`Exact match found: ${moduleName}.${subItemName}.${action} = ${hasPerm}`);
      return hasPerm;
    }
    
    // Check if subItemName exists in nested structure
    for (const [key, value] of Object.entries(modulePermissions)) {
      if (value && typeof value === 'object' && value[subItemName]) {
        const hasPerm = value[subItemName][action] === true;
        console.log(`Nested match found: ${moduleName}.${key}.${subItemName}.${action} = ${hasPerm}`);
        return hasPerm;
      }
    }
    
    // Try with different variations (remove spaces, lowercase, etc.)
    const variations = [
      subItemName,
      subItemName.toLowerCase(),
      subItemName.replace(/\s+/g, ''),
      subItemName.replace(/\s+/g, '').toLowerCase(),
    ];
    
    for (const variation of variations) {
      if (modulePermissions[variation]) {
        const hasPerm = modulePermissions[variation][action] === true;
        console.log(`Variation match: ${moduleName}.${variation}.${action} = ${hasPerm}`);
        return hasPerm;
      }
    }
    
    console.log(`Sub-item "${subItemName}" not found in module "${moduleName}"`);
    return false;
  } else {
    // Check if any view permission exists in the module
    const hasAnyPermission = Object.values(modulePermissions).some(item => {
      if (item && typeof item === 'object') {
        return item[action] === true;
      }
      return false;
    });
    console.log(`General permission check for ${moduleName}: ${hasAnyPermission}`);
    return hasAnyPermission;
  }
};

  // Check if route is accessible
// Check if route is accessible
const canAccessRoute = (path) => {
  if (!isAuthenticated) {
    return false;
  }

  // If no permissions loaded, allow access to dashboard only
  if (!permissions) {
    console.log('No permissions loaded, allowing access to dashboard only');
    return path === '/dashboard';
  }

  console.log('Checking route permissions for path:', path);

  // Create a mapping of routes to permission checks based on your nav data
  const routePermissionMap = {
    // Dashboard - always accessible if authenticated
    '/dashboard': () => true,
    
    // Base/Company routes
    '/company': () => hasPermission('Base', 'Company') ||  hasPermission('company', 'Company'),
    '/company/permission-assign': () => hasPermission('Base', 'Permission Assign'),
    '/company/admin': () => hasPermission('Base', 'Admin Profile'),
    
    // Recruitment routes
    '/recruitment': () => hasPermission('Recruitment', 'Recruitment') || 
                        hasPermission('Recruitment', 'Recruitment Dashboard'),
    '/recruitment/recruitment': () => hasPermission('Recruitment', 'Recruitment'),
    '/recruitment/dash': () => hasPermission('Recruitment', 'Recruitment Dashboard'),
    '/recruitment/dashboard': () => hasPermission('Recruitment', 'Recruitment Dashboard'),
    
    // Onboarding routes
    '/onboarding': () => hasPermission('Onboarding', 'Onboarding') || 
                        hasPermission('Onboarding', 'Candidates'),
    '/onboarding/process': () => hasPermission('Onboarding', 'Onboarding'),
    '/onboarding/candidates': () => hasPermission('Onboarding', 'Candidates'),
    
    // Employee routes
    '/employee': () => hasPermission('Employee', 'Employee') || 
                      hasPermission('Employee', 'Employee Profile'),
    '/employee/list': () => hasPermission('Employee', 'Employee'),
    '/employee/profile': () => hasPermission('Employee', 'Employee Profile'),
    '/employee/documents': () => hasPermission('Employee', 'Document Requests'),
    '/employee/shift': () => hasPermission('Employee', 'Shift Requests'),
    '/employee/worktype': () => hasPermission('Employee', 'Work Type Requests'),
    '/employee/rotating-shift': () => hasPermission('Employee', 'Rotating Shift Assign'),
    
    // Attendance routes
    '/attendance': () => hasPermission('Attendance', 'Attendance Dashboard') || 
                        hasPermission('Attendance', 'Attendances'),
    '/attendance/dashboard': () => hasPermission('Attendance', 'Attendance Dashboard'),
    '/attendance/devices': () => hasPermission('Attendance', 'Biometric Devices'),
    '/attendance/list': () => hasPermission('Attendance', 'Attendances'),
    '/attendance/work-records': () => hasPermission('Attendance', 'Work Records'),
    '/attendance/shift-requests': () => hasPermission('Attendance', 'Shift Requests'),
    '/attendance/worktype-requests': () => hasPermission('Attendance', 'Work Type Requests'),
    '/attendance/rotating-shift': () => hasPermission('Attendance', 'Rotating Shift Assign'),
    
    // Leave routes
    '/leave': () => hasPermission('Leave', 'Leave Dashboard'),
    '/leave/dashboard': () => hasPermission('Leave', 'Leave Dashboard'),
    '/leave/my-requests': () => hasPermission('Leave', 'My Leave Requests'),
    '/leave/requests': () => hasPermission('Leave', 'Leave Requests'),
    '/leave/types': () => hasPermission('Leave', 'Leave Types'),
    '/leave/assigned': () => hasPermission('Leave', 'All Assigned Leaves'),
    
    // Payroll routes
    '/payroll': () => hasPermission('Payroll', 'Payroll Dashboard'),
    '/payroll/dashboard': () => hasPermission('Payroll', 'Payroll Dashboard'),
    '/payroll/contract': () => hasPermission('Payroll', 'Payroll Contract'),
    '/payroll/payslips': () => hasPermission('Payroll', 'Payroll Payslip'),
    '/payroll/loan': () => hasPermission('Payroll', 'Payroll Loan / Advance'),
    
    // Offboarding routes
    '/offboarding': () => hasPermission('Offboarding', 'Offboarding Dashboard'),
    '/offboarding/dashboard': () => hasPermission('Offboarding', 'Offboarding Dashboard'),
    '/offboard/offboarding': () => hasPermission('Offboarding', 'Offboardings'),
  };

  // Clean up path (remove trailing slash if exists)
  const cleanPath = path.endsWith('/') && path !== '/' ? path.slice(0, -1) : path;

  // Check exact match first
  if (routePermissionMap[cleanPath]) {
    const result = routePermissionMap[cleanPath]();
    console.log(`Exact route check for ${cleanPath}: ${result}`);
    return result;
  }

  // Check for path prefixes (for nested routes)
  for (const [route, checkFn] of Object.entries(routePermissionMap)) {
    if (cleanPath.startsWith(route) && cleanPath !== '/') {
      const result = checkFn();
      console.log(`Prefix match ${cleanPath} starts with ${route}: ${result}`);
      return result;
    }
  }

  // For routes not in the map, check if they start with known module paths
  const modulePaths = [
    '/company', '/recruitment', '/onboarding', '/employee', 
    '/attendance', '/leave', '/payroll', '/offboarding'
  ];
  
  for (const modulePath of modulePaths) {
    if (cleanPath.startsWith(modulePath)) {
      // Check general module permission
      const moduleName = modulePath.replace('/', '');
      const hasModuleAccess = hasPermission(
        moduleName.charAt(0).toUpperCase() + moduleName.slice(1)
      );
      console.log(`Module path check for ${cleanPath} (module: ${moduleName}): ${hasModuleAccess}`);
      return hasModuleAccess;
    }
  }

  // Default: allow if authenticated
  console.log(`No permission check for ${cleanPath}, allowing access by default`);
  return true;
};

  return (
    <AuthContext.Provider value={{
      user,
      permissions,
      isAuthenticated,
      loading,
      login,
      logout,
      getAuthHeaders,
      getCompanyId,
      hasPermission,
      canAccessRoute,
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