// // employeeApiFunctions.jsx
// import axios from 'axios';

// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL_SERVER || 'http://127.0.0.1:8000';
// const API_TIMEOUT = parseInt(import.meta.env.VITE_API_TIMEOUT) || 10000;

// // Create axios instance with default config
// const api = axios.create({
//   baseURL: API_BASE_URL,
//   timeout: API_TIMEOUT,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// // Request interceptor to add auth token
// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// // Response interceptor for error handling
// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401) {
//       // Handle unauthorized - redirect to login
//       window.location.href = '/login';
//     }
//     return Promise.reject(error);
//   }
// );

// // Employee API functions
// export const employeeApi = {
//   // Fetch all employees
//   getAllEmployees: async (params = {}) => {
//     try {
//       const response = await api.get('/api/company/employees', { params });
//       return response.data;
//     } catch (error) {
//       console.error('Error fetching employees:', error);
//       throw error;
//     }
//   },

//   // Fetch employee by ID
//   getEmployeeById: async (id) => {
//     try {
//       const response = await api.get(`/api/company/employees/${id}`);
//       return response.data;
//     } catch (error) {
//       console.error(`Error fetching employee ${id}:`, error);
//       throw error;
//     }
//   },

//   // Create new employee (direct create as shown in your image)
//   createEmployee: async (employeeData) => {
//     try {
//       const response = await api.post('/api/company/employees/direct-create', employeeData);
//       return response.data;
//     } catch (error) {
//       console.error('Error creating employee:', error);
//       throw error;
//     }
//   },

//   // Update employee
//   updateEmployee: async (id, employeeData) => {
//     try {
//       const response = await api.put(`/api/company/employees/${id}`, employeeData);
//       return response.data;
//     } catch (error) {
//       console.error(`Error updating employee ${id}:`, error);
//       throw error;
//     }
//   },

//   // Delete single employee
//   deleteEmployee: async (id) => {
//     try {
//       const response = await api.delete(`/api/company/employees/${id}`);
//       return response.data;
//     } catch (error) {
//       console.error(`Error deleting employee ${id}:`, error);
//       throw error;
//     }
//   },

//   // Delete multiple employees
//   deleteMultipleEmployees: async (ids) => {
//     try {
//       const response = await api.post('/api/company/employees/bulk-delete', { employee_ids: ids });
//       return response.data;
//     } catch (error) {
//       console.error('Error deleting multiple employees:', error);
//       throw error;
//     }
//   },

//   // Filter employees with advanced filtering
//   filterEmployees: async (filters = {}) => {
//     try {
//       const response = await api.post('/api/company/employees/filter', filters);
//       return response.data;
//     } catch (error) {
//       console.error('Error filtering employees:', error);
//       throw error;
//     }
//   },

//   // Search employees
//   searchEmployees: async (searchTerm, filters = {}) => {
//     try {
//       const params = {
//         search: searchTerm,
//         ...filters
//       };
//       const response = await api.get('/api/company/employees/search', { params });
//       return response.data;
//     } catch (error) {
//       console.error('Error searching employees:', error);
//       throw error;
//     }
//   },

//   // Get employee statistics
//   getEmployeeStats: async () => {
//     try {
//       const response = await api.get('/api/company/employees/stats');
//       return response.data;
//     } catch (error) {
//       console.error('Error fetching employee stats:', error);
//       throw error;
//     }
//   },

//   // Export employees to CSV/Excel
//   exportEmployees: async (filters = {}) => {
//     try {
//       const response = await api.post('/api/company/employees/export', filters, {
//         responseType: 'blob'
//       });
//       return response.data;
//     } catch (error) {
//       console.error('Error exporting employees:', error);
//       throw error;
//     }
//   }
// };

// // Helper function to transform API data to frontend format
// export const transformEmployeeData = (apiData) => {
//   return {
//     id: apiData.id || apiData._id || apiData.employee_id,
//     name: apiData.candidate_name || apiData.name || apiData.employee_name,
//     email: apiData.email,
//     phone: apiData.phone || apiData.contact_number,
//     position: apiData.job_position || apiData.position,
//     department: apiData.department,
//     status: apiData.status || 'offline', // Default to offline if not provided
//     workType: apiData.employee_type || apiData.work_type,
//     joinDate: apiData.joining_date || apiData.created_at,
//     badgeId: apiData.badge_id || apiData.employee_code,
//     code: apiData.employee_code || apiData.code,
//     salary: apiData.salary,
//     address: apiData.address,
//     country: apiData.country,
//     state: apiData.state,
//     city: apiData.city,
//     bankName: apiData.bank_name,
//     accountNumber: apiData.account_number,
//     workLocation: apiData.work_location,
//     highlight: apiData.highlight || false,
//     star: apiData.starred || false
//   };
// };

// // Helper function to transform frontend data to API format
// export const prepareEmployeeDataForAPI = (frontendData) => {
//   return {
//     candidate_name: frontendData.name,
//     email: frontendData.email,
//     job_position: frontendData.position,
//     password: frontendData.password || 'defaultPassword123', // Default password if not provided
//     gender: frontendData.gender || 'Male',
//     department: frontendData.department,
//     salary: frontendData.salary?.toString() || '0',
//     joining_date: frontendData.joinDate || new Date().toISOString().split('T')[0],
//     address: frontendData.address || '',
//     country: frontendData.country || 'India',
//     state: frontendData.state || '',
//     city: frontendData.city || '',
//     employee_type: frontendData.workType || 'Permanent',
//     work_location: frontendData.workLocation || 'Office',
//     bank_name: frontendData.bankName || '',
//     account_number: frontendData.accountNumber || '',
//     phone: frontendData.phone || '',
//     // Additional fields if needed
//     ...(frontendData.employee_code && { employee_code: frontendData.employee_code }),
//     ...(frontendData.status && { status: frontendData.status })
//   };
// };

// employeeApiFunctions.jsx


import axios from 'axios';

// Get API base URL from environment variables
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000';
const API_BASE_URL_SERVER = import.meta.env.VITE_API_BASE_URL_SERVER || "https://hr.hinzah.com"  ;
const API_TIMEOUT = parseInt(import.meta.env.VITE_API_TIMEOUT) || 10000;
const IS_DEVELOPMENT = import.meta.env.VITE_APP_ENVIRONMENT === 'development';

console.log('🚀 API Configuration:', {
  VITE_API_BASE_URL: import.meta.env.VITE_API_BASE_URL,
  VITE_API_BASE_URL_SERVER: import.meta.env.VITE_API_BASE_URL_SERVER,
  API_BASE_URL,
  API_BASE_URL_SERVER,
  API_TIMEOUT,
  IS_DEVELOPMENT
});

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL_SERVER,
  timeout: API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Development mode only - log all requests
if (IS_DEVELOPMENT) {
  api.interceptors.request.use(
    (config) => {
      console.log(`🌐 ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`, {
        data: config.data,
        params: config.params
      });
      return config;
    },
    (error) => {
      console.error('❌ Request Error:', error);
      return Promise.reject(error);
    }
  );

  api.interceptors.response.use(
    (response) => {
      console.log(`✅ ${response.status} ${response.config.url}`, response.data);
      return response;
    },
    (error) => {
      console.error(`❌ ${error.response?.status || 'Network'} Error:`, {
        url: error.config?.url,
        message: error.message,
        response: error.response?.data,
        code: error.code
      });
      return Promise.reject(error);
    }
  );
}

// Add auth token interceptor
api.interceptors.request.use(
  (config) => {
    // Get token from various possible storage locations
    const token = localStorage.getItem('authToken') || 
                  sessionStorage.getItem('authToken') ||
                  localStorage.getItem('token') ||
                  sessionStorage.getItem('token');
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // If using the server URL, adjust the baseURL
    if (config.url?.includes('/api/') && window.location.hostname !== 'localhost' && !IS_DEVELOPMENT) {
      config.baseURL = API_BASE_URL_SERVER;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Network error (server not reachable)
    if (error.code === 'ERR_NETWORK') {
      console.error('🌐 Network Error - Possible causes:');
      console.error(`1. Server not running at: ${API_BASE_URL}`);
      console.error('2. Wrong IP address or port');
      console.error('3. Firewall blocking the connection');
      console.error('4. CORS issue - check backend CORS settings');
      
      // Try fallback to server URL if local fails
      if (API_BASE_URL_SERVER && API_BASE_URL_SERVER !== API_BASE_URL) {
        console.warn(`🔄 Trying fallback to: ${API_BASE_URL_SERVER}`);
      }
    }
    
    // Authentication error
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      localStorage.removeItem('token');
      sessionStorage.removeItem('authToken');
      sessionStorage.removeItem('token');
      
      // Redirect to login page
      if (typeof window !== 'undefined' && !window.location.pathname.includes('/login')) {
        window.location.href = '/login';
      }
    }
    
    return Promise.reject(error);
  }
);

// Employee API functions
export const employeeApi = {
  // Test connection to API
  testConnection: async () => {
    try {
      console.log(`🔍 Testing connection to: ${API_BASE_URL}`);
      const response = await api.get('/api/health');
      console.log('✅ Connection successful:', response.data);
      return { success: true, data: response.data };
    } catch (error) {
      console.error('❌ Connection failed:', error.message);
      
      // Try server URL as fallback
      if (API_BASE_URL_SERVER && API_BASE_URL_SERVER !== API_BASE_URL) {
        console.log(`🔄 Trying server URL: ${API_BASE_URL_SERVER}`);
        try {
          const serverApi = axios.create({
            baseURL: API_BASE_URL_SERVER,
            timeout: 5000
          });
          const serverResponse = await serverApi.get('/api/health');
          console.log('✅ Server connection successful');
          return { success: true, data: serverResponse.data, isServer: true };
        } catch (serverError) {
          console.error('❌ Server connection also failed');
        }
      }
      
      return { 
        success: false, 
        error: error.message,
        message: `Cannot connect to ${API_BASE_URL}. Make sure the backend server is running.`
      };
    }
  },

  // Fetch all employees
// getAllEmployees: async (params = {}) => {
//   try {
//     // Get current user from localStorage
//     let currentUser = null;
//     try {
//       const userData = localStorage.getItem('currentUser');
//       if (userData) {
//         currentUser = JSON.parse(userData);
//       }
//     } catch (error) {
//       console.error('Error parsing currentUser from localStorage:', error);
//     }

//     // Prepare params with company information if available
//     const requestParams = {
//       ...params,
//       ...(currentUser?.company_code && { company_code: currentUser.company_code }),
//       ...(currentUser?.company_name && { company_name: currentUser.company_name })
//     };

//     const response = await api.get('/api/company/get/employees', { 
//       params: requestParams 
//     });
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching employees:', error);
//     throw new Error(`Failed to fetch employees: ${error.message}`);
//   }
// },  

getAllEmployees: async (params = {}) => {
  try {
    let currentUser = null;
    try {
      const userData = localStorage.getItem('currentUser');
      if (userData) {
        currentUser = JSON.parse(userData);
      }
    } catch (error) {
      console.error('Error parsing currentUser from localStorage:', error);
    }

    const requestParams = {
      ...params,
      ...(currentUser?.company_code && { company_code: currentUser.company_code }),
      ...(currentUser?.company_name && { company_name: currentUser.company_name })
    };

    const response = await api.get('/api/company/employees', { 
      params: requestParams 
    });
    
    console.log("API Response data:", response.data);
    
    // Check if the response has the expected structure
    if (response.data && response.data.status === true && Array.isArray(response.data.employees)) {
      // Transform the API data to frontend format
      const transformedEmployees = response.data.employees.map(emp => transformEmployeeData(emp));
      console.log("Transformed employees:", transformedEmployees);
      return { status: true, employees: transformedEmployees };
    } else {
      console.warn("Unexpected API response structure:", response.data);
      return { status: false, employees: [] };
    }
  } catch (error) {
    console.error('Error fetching employees:', error);
    throw new Error(`Failed to fetch employees: ${error.message}`);
  }
},
  // Fetch employee by ID
  getEmployeeById: async (id) => {
    try {
      const response = await api.get(`/api/company/employees/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching employee ${id}:`, error);
      throw new Error(`Failed to fetch employee: ${error.message}`);
    }
  },

  // Create new employee
createEmployee: async (employeeData) => {
  let currentUser = null;
  try {
    const userData = localStorage.getItem('currentUser');
    if (userData) {
      currentUser = JSON.parse(userData);
    }
  } catch (error) {
    console.error('Error parsing currentUser from localStorage:', error);
  }

  try {
    console.log('Creating employee:', employeeData);
    console.log('Current User:', currentUser); // Debug log
    
    // Make sure currentUser has company_code
    if (!currentUser || !currentUser.company_code) {
      throw new Error('Company code not found. Please login again.');
    }

    // Prepare the payload - FIXED VERSION
    const payload = {
      candidate_name: employeeData.candidate_name || employeeData.name || '',
      email: employeeData.email || '',
      job_position: employeeData.job_position || employeeData.position || '',
      password: employeeData.password || 'defaultPassword123', // Make sure password is not empty
      gender: employeeData.gender || 'male', // Default value
      department: employeeData.department || '',
      salary: employeeData.salary?.toString() || '0',
      joining_date: employeeData.joining_date || employeeData.joinDate || new Date().toISOString().split('T')[0],
      address: employeeData.address || '',
      country: employeeData.country || '',
      state: employeeData.state || '',
      city: employeeData.city || '',
      employee_type: employeeData.employee_type || employeeData.workType || 'full_time',
      work_location: employeeData.work_location || employeeData.workLocation || 'office',
      bank_name: employeeData.bank_name || employeeData.bankName || '',
      account_number: employeeData.account_number || employeeData.accountNumber || '',
      phone: employeeData.phone || '',
      company_code: currentUser.company_code // MAKE SURE THIS IS INCLUDED
    };

    // VALIDATE REQUIRED FIELDS
    const requiredFields = ['candidate_name', 'email', 'job_position', 'department', 'phone', 'company_code'];
    const missingFields = requiredFields.filter(field => !payload[field] || payload[field].trim() === '');
    
    if (missingFields.length > 0) {
      throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
    }

    console.log('Sending payload to API:', JSON.stringify(payload, null, 2));
    
    const response = await api.post('/api/company/employees/direct-create', payload);
    console.log('Employee created successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error creating employee:', error);
    
    // Check for 422 specifically
    if (error.response?.status === 422) {
      console.error('422 Validation Errors:', error.response.data);
      
      // Extract validation errors from response
      const validationErrors = error.response.data.errors || error.response.data.message;
      let errorMessage = 'Validation Failed: ';
      
      if (typeof validationErrors === 'object') {
        // Format object errors
        errorMessage += Object.entries(validationErrors)
          .map(([field, messages]) => `${field}: ${Array.isArray(messages) ? messages.join(', ') : messages}`)
          .join('; ');
      } else if (validationErrors) {
        errorMessage += validationErrors;
      } else {
        errorMessage = 'Server validation failed. Please check all input fields.';
      }
      
      throw new Error(errorMessage);
    }
    
    // Other error handling remains...
    let errorMessage = 'Failed to create employee';
    
    if (error.code === 'ERR_NETWORK') {
      errorMessage = `Cannot connect to server`;
    } else if (error.response?.status === 400) {
      errorMessage = 'Invalid data. Please check all required fields.';
    } else if (error.response?.status === 401) {
      errorMessage = 'Unauthorized. Please login again.';
    } else if (error.response?.data) {
      errorMessage = error.response.data.message || error.response.data.error || errorMessage;
    } else if (error.message) {
      errorMessage = error.message;
    }
    
    throw new Error(errorMessage);
  }
},


  // Update employee
  updateEmployee: async (id, employeeData) => {
    try {
      const response = await api.put(`/api/company/employees/${id}`, employeeData);
      return response.data;
    } catch (error) {
      console.error(`Error updating employee ${id}:`, error);
      throw new Error(`Failed to update employee: ${error.message}`);
    }
  },

  // Delete single employee
  deleteEmployee: async (id) => {
    try {
      const response = await api.delete(`/api/company/employees/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting employee ${id}:`, error);
      throw new Error(`Failed to delete employee: ${error.message}`);
    }
  },

  // Delete multiple employees
  deleteMultipleEmployees: async (ids) => {
    try {
      const response = await api.post('/api/company/employees/bulk-delete', { employee_ids: ids });
      return response.data;
    } catch (error) {
      console.error('Error deleting multiple employees:', error);
      throw new Error(`Failed to delete employees: ${error.message}`);
    }
  },

  // Filter employees
  filterEmployees: async (filters = {}) => {
    try {
      const response = await api.post('/api/company/employees/filter', filters);
      return response.data;
    } catch (error) {
      console.error('Error filtering employees:', error);
      throw new Error(`Failed to filter employees: ${error.message}`);
    }
  },

  // Search employees
  searchEmployees: async (searchTerm, filters = {}) => {
    try {
      const params = {
        search: searchTerm,
        ...filters
      };
      const response = await api.get('/api/company/employees/search', { params });
      return response.data;
    } catch (error) {
      console.error('Error searching employees:', error);
      throw new Error(`Failed to search employees: ${error.message}`);
    }
  },

  // Get employee statistics
  getEmployeeStats: async () => {
    try {
      const response = await api.get('/api/company/employees/stats');
      return response.data;
    } catch (error) {
      console.error('Error fetching employee stats:', error);
      throw new Error(`Failed to fetch employee stats: ${error.message}`);
    }
  },

  // Export employees
  exportEmployees: async (filters = {}) => {
    try {
      const response = await api.post('/api/company/employees/export', filters, {
        responseType: 'blob'
      });
      return response.data;
    } catch (error) {
      console.error('Error exporting employees:', error);
      throw new Error(`Failed to export employees: ${error.message}`);
    }
  }
};

// Helper function to transform API data to frontend format
export const transformEmployeeData = (apiData) => {
  return {
    id: apiData.id || apiData._id || apiData.employee_id,
    name: apiData.candidate_name || apiData.name || apiData.employee_name,
    email: apiData.email,
    phone: apiData.phone || apiData.contact_number,
    position: apiData.job_position || apiData.position,
    department: apiData.department,
    status: apiData.status || 'offline',
    workType: apiData.employee_type || apiData.work_type,
    joinDate: apiData.joining_date || apiData.created_at,
    badgeId: apiData.badge_id || apiData.employee_code,
    code: apiData.employee_code || apiData.code,
    salary: apiData.salary,
    address: apiData.address,
    country: apiData.country,
    state: apiData.state,
    city: apiData.city,
    bankName: apiData.bank_name,
    accountNumber: apiData.account_number,
    workLocation: apiData.work_location,
    highlight: apiData.highlight || false,
    star: apiData.starred || false
  };
};

// Helper function to transform frontend data to API format
export const prepareEmployeeDataForAPI = (frontendData) => {
  return {
    candidate_name: frontendData.name,
    email: frontendData.email,
    job_position: frontendData.position,
    password: frontendData.password || 'employee@123',
    gender: frontendData.gender || 'Male',
    department: frontendData.department,
    salary: frontendData.salary?.toString() || '0',
    joining_date: frontendData.joinDate || new Date().toISOString().split('T')[0],
    address: frontendData.address || '',
    country: frontendData.country || 'India',
    state: frontendData.state || '',
    city: frontendData.city || '',
    employee_type: frontendData.workType || 'Permanent',
    work_location: frontendData.workLocation || 'Office',
    bank_name: frontendData.bankName || '',
    account_number: frontendData.accountNumber || '',
    phone: frontendData.phone || ''
  };
};

// Auto-test connection when module loads (development only)
if (IS_DEVELOPMENT && typeof window !== 'undefined') {
  setTimeout(() => {
    console.log('🔍 Auto-testing API connection...');
    employeeApi.testConnection().then(result => {
      if (!result.success) {
        console.warn('⚠️ Backend server not detected. Frontend will work in demo mode.');
        console.warn('💡 To enable full functionality:');
        console.warn(`   1. Start backend server at ${API_BASE_URL}`);
        console.warn('   2. Make sure you\'re on the same network (192.168.0.x)');
        console.warn('   3. Check if port 8000 is open');
      }
    });
  }, 1000);
}