// Vite uses import.meta.env
const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'https://hr.hinzah.com',
  TIMEOUT: parseInt(import.meta.env.VITE_API_TIMEOUT || '10000'),
  ENVIRONMENT: import.meta.env.VITE_APP_ENVIRONMENT || 'development',
  
  ENDPOINTS: {
    SUPER_ADMIN: {
      LOGIN: '/api/admin/login',
      LOGOUT: '/admin/logout',
      PROFILE: '/admin/profile',
      CREATE: '/admin/create',
      DELETE: '/admin/delete',
      UPDATE: '/admin/update'
    },
    ADMIN: {
      LOGIN: '/admin/login',
      LOGOUT: '/admin/logout',
      PROFILE: '/admin/profile',
    },
    EMPLOYEE: {
      LOGIN: '/employee/login',
      LOGOUT: '/employee/logout',
      PROFILE: '/employee/profile',
      MY_ATTENDANCE: '/employee/my-attendance',
      MY_LEAVES: '/employee/my-leaves',
      APPLY_LEAVE: '/employee/apply-leave'
    }
  }
};

// Log for debugging in development
if (import.meta.env.DEV) {
  console.log('Vite Environment Variables:', {
    apiBaseUrl: import.meta.env.VITE_API_BASE_URL,
    environment: import.meta.env.VITE_APP_ENVIRONMENT,
    mode: import.meta.env.MODE,
    baseUrl: import.meta.env.BASE_URL
  });
  
  console.log('API Configuration:', {
    BASE_URL: API_CONFIG.BASE_URL,
    TIMEOUT: API_CONFIG.TIMEOUT,
    ENVIRONMENT: API_CONFIG.ENVIRONMENT
  });
}

export default API_CONFIG;