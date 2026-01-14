



// // 'use client';

// // import React, { useState, useEffect } from 'react';
// // import {
// //   Search,
// //   Filter,
// //   MoreVertical,
// //   Plus,
// //   X,
// //   ChevronLeft,
// //   ChevronRight,
// //   Check,
// //   XCircle,
// //   AlertCircle,
// //   Download,
// //   Settings,
// //   Bell,
// //   Users,
// //   Clock,
// //   TrendingUp,
// //   TrendingDown,
// //   ArrowRight,
// //   Eye,
// //   Edit2,
// //   Trash2,
// //   RefreshCw,
// //   Building,
// //   Shield,
// //   Lock,
// //   Globe,
// //   Palette,
// //   Key,
// //   User,
// //   Calendar,
// //   FileText,
// //   BarChart3,
// //   CreditCard,
// //   Mail,
// //   Phone,
// //   MapPin,
// //   CheckCircle,
// //   XCircle as XCircleIcon,
// //   MoreHorizontal,
// //   Copy,
// //   QrCode,
// //   ShieldCheck,
// //   UserPlus,
// //   Users as UsersIcon,
// //   Star,
// //   Crown,
// //   Zap,
// //   ChevronDown,
// //   ChevronUp
// // } from 'lucide-react';
// // import { useTheme } from './ThemeContext';
// // import { THEMES } from './ThemeContext';
// // import { MODULES, SUB_PERMISSIONS } from './data/navdata';

// // export default function Company() {
// //   const { theme: appTheme } = useTheme();
// //   const [companies, setCompanies] = useState([]);
// //   const [isModalOpen, setIsModalOpen] = useState(false);
// //   const [editingCompany, setEditingCompany] = useState(null);
// //   const [showPassword, setShowPassword] = useState(false);
// //   const [openModule, setOpenModule] = useState(null);
  
// //   // Loading & Feedback
// //   const [isLoading, setIsLoading] = useState(false);
// //   const [isDeleting, setIsDeleting] = useState(null);
// //   const [showSuccess, setShowSuccess] = useState(false);
// //   const [successMessage, setSuccessMessage] = useState('');
// //   const [searchQuery, setSearchQuery] = useState('');
// //   const [activeFilter, setActiveFilter] = useState('all');
// //   const [viewMode, setViewMode] = useState('table');
// //   const [page, setPage] = useState(1);
// //   const totalPages = 2;

// //   // API Base URLs
// //   const API_BASE_URL = 'https://hr.hinzah.com';
  
// //   // Theme helper functions that return actual color values
// //   const getAccentColor = () => appTheme?.accentColor || '#ea580c';
// //   const getBorderColor = () => appTheme?.borderColor || '#ea580c';
// //   const getTextAccent = () => appTheme?.accentColor || '#ea580c';
// //   const getButtonGradient = () => {
// //     if (appTheme?.buttonGradient) {
// //       return `bg-gradient-to-r ${appTheme.buttonGradient}`;
// //     }
// //     return 'bg-gradient-to-r from-orange-500 to-orange-600';
// //   };
// //   const getButtonHover = () => appTheme?.buttonHover || 'hover:from-orange-600 hover:to-orange-700';
// //   const getLightBg = () => appTheme?.lightBg || 'bg-orange-50';
// //   const getRingColor = () => appTheme?.ringColor || 'ring-orange-500';
  
// //   // Helper to get text color class based on theme
// //   const getTextColorClass = () => {
// //     if (appTheme?.textAccent) {
// //       return appTheme.textAccent;
// //     }
// //     return 'text-orange-600';
// //   };

// //   // Default permissions based on role
// //   const generateDefaultPermissions = (role = 'employee') => {
// //     const perms = {};
// //     MODULES.forEach(mod => {
// //       perms[mod.name] = {};
// //       (SUB_PERMISSIONS[mod.name] || []).forEach(sub => {
// //         perms[mod.name][sub.name] = {
// //           view: role === 'superadmin', // true for superadmin, false for others
// //           create: false,
// //           edit: false,
// //           delete: false,
// //         };
// //       });
// //     });
// //     return perms;
// //   };

// //   // Auto-set permissions when role changes to superadmin
// //   const autoSetSuperAdminPermissions = () => {
// //     const newPermissions = {};
// //     MODULES.forEach(mod => {
// //       newPermissions[mod.name] = {};
// //       (SUB_PERMISSIONS[mod.name] || []).forEach(sub => {
// //         newPermissions[mod.name][sub.name] = {
// //           view: true,     // Always true for superadmin
// //           create: false,  // Always false for base submenu
// //           edit: false,    // Always false for base submenu
// //           delete: false,  // Always false for base submenu
// //         };
// //       });
// //     });
// //     return newPermissions;
// //   };

// //   const [formData, setFormData] = useState({
// //     username: '',
// //     password: '',
// //     confirmPassword: '',
// //     companyId: '',
// //     companyName: '',
// //     role: 'employee',
// //     email: '',
// //     phone: '',
// //     address: '',
// //     logo: '',
// //     theme: Object.values(THEMES)[0],
// //     permissions: generateDefaultPermissions('employee'),
// //     status: 'active',
// //     employees: 0,
// //     subscription: 'free',
// //   });

// //   // Handle role change
// //   const handleRoleChange = (role) => {
// //     setFormData(prev => {
// //       // If role is superadmin, set all view permissions to true and others to false
// //       const newPermissions = role === 'superadmin' 
// //         ? autoSetSuperAdminPermissions()
// //         : generateDefaultPermissions(role);
      
// //       return {
// //         ...prev,
// //         role,
// //         permissions: newPermissions
// //       };
// //     });
// //   };

// //   // Load companies from API
// //   useEffect(() => {
// //     fetchCompanies();
// //   }, []);

// //  const fetchCompanies = async () => {
// //   setIsLoading(true);
// //   try {
// //     // Get token from localStorage
// //     const token = localStorage.getItem('authToken') || localStorage.getItem('token');
    
// //     const headers = {
// //       'Content-Type': 'application/json',
// //     };
    
// //     // Add authorization header if token exists
// //     if (token) {
// //       headers['Authorization'] = `Bearer ${token}`;
// //     }

// //     const response = await fetch(`${API_BASE_URL}/api/admin/companies`, {
// //       method: 'GET',
// //       headers: headers,
// //     });

// //     console.log("API Response status:", response.status);
    
// //     if (response.ok) {
// //       const result = await response.json();
// //       console.log("API Response data:", result);
      
// //       // Transform API response to match your frontend structure
// //       const companiesData = result.data || result || [];
// //       console.log("Companies data:", companiesData);
      
// //       const transformedCompanies = companiesData.map(company => ({
// //         id: company.id || company.company_code || Date.now(),
// //         username: company.username || '',
// //         companyId: company.company_code || '',
// //         companyName: company.company_name || company.username || '',
// //         role: company.role || 'employee',
// //         email: company.email || '',
// //         phone: company.phone || '',
// //         address: company.address || '',
// //         logo: company.logo || '',
// //         theme: company.theme || Object.values(THEMES)[0],
// //         permissions: company.permissions || generateDefaultPermissions(company.role || 'employee'),
// //         status: company.status || 'active',
// //         employees: company.employees || 0,
// //         subscription: company.subscription || 'free',
// //         createdAt: company.created_at || new Date().toISOString(),
// //       }));
      
// //       console.log("Transformed companies:", transformedCompanies);
// //       setCompanies(transformedCompanies);
// //     } else {
// //       const errorText = await response.text();
// //       console.error('Failed to fetch companies:', response.status, errorText);
      
// //       // Check if unauthorized
// //       if (response.status === 401 || response.status === 403) {
// //         console.log('Authentication failed, token might be invalid or expired');
// //         // Optionally: redirect to login or show error message
// //       }
      
// //       // Fallback to empty array if API fails
// //       setCompanies([]);
// //     }
// //   } catch (error) {
// //     console.error('Error fetching companies:', error);
// //     setCompanies([]);
// //   } finally {
// //     setIsLoading(false);
// //   }
// // };

// //   const triggerSuccess = (msg) => {
// //     setSuccessMessage(msg);
// //     setShowSuccess(true);
// //     setTimeout(() => setShowSuccess(false), 3000);
// //   };

// //   const openModal = (company = null) => {
// //     setIsLoading(true);
// //     if (company) {
// //       setEditingCompany(company);
// //       setFormData({
// //         username: company.username || '',
// //         password: '',
// //         confirmPassword: '',
// //         companyId: company.companyId || '',
// //         companyName: company.companyName || company.username || '',
// //         role: company.role || 'employee',
// //         email: company.email || '',
// //         phone: company.phone || '',
// //         address: company.address || '',
// //         logo: company.logo || '',
// //         theme: company.theme || Object.values(THEMES)[0],
// //         permissions: company.permissions || generateDefaultPermissions(company.role || 'employee'),
// //         status: company.status || 'active',
// //         employees: company.employees || 0,
// //         subscription: company.subscription || 'free',
// //       });
// //     } else {
// //       setEditingCompany(null);
// //       setFormData({
// //         username: '',
// //         password: '',
// //         confirmPassword: '',
// //         companyId: '',
// //         companyName: '',
// //         role: 'employee',
// //         email: '',
// //         phone: '',
// //         address: '',
// //         logo: '',
// //         theme: Object.values(THEMES)[0],
// //         permissions: generateDefaultPermissions('employee'),
// //         status: 'active',
// //         employees: 0,
// //         subscription: 'free',
// //       });
// //     }
// //     setOpenModule(null);
// //     setShowPassword(false);
// //     setTimeout(() => {
// //       setIsModalOpen(true);
// //       setIsLoading(false);
// //     }, 300);
// //   };

// //   const closeModal = () => {
// //     setIsModalOpen(false);
// //     setEditingCompany(null);
// //     setIsLoading(false);
// //   };

// //   const togglePermission = (moduleName, permissionName, type) => {
// //     setFormData(prev => ({
// //       ...prev,
// //       permissions: {
// //         ...prev.permissions,
// //         [moduleName]: {
// //           ...prev.permissions[moduleName],
// //           [permissionName]: {
// //             ...prev.permissions[moduleName][permissionName],
// //             [type]: !prev.permissions[moduleName][permissionName][type],
// //           },
// //         },
// //       },
// //     }));
// //   };

// //   const getPerm = (moduleName, permissionName, type) => {
// //     return formData.permissions?.[moduleName]?.[permissionName]?.[type] ?? false;
// //   };




// // const handleSubmit = async (e) => {
// //   e.preventDefault();

// //   if (!formData.username.trim() || !formData.companyId.trim()) {
// //     return alert('Username and Company ID are required!');
// //   }
// //   if (!editingCompany && formData.password !== formData.confirmPassword) {
// //     return alert('Passwords do not match!');
// //   }
// //   if (!editingCompany && !formData.password) {
// //     return alert('Password is required for new company!');
// //   }

// //   setIsLoading(true);

// //   try {
// //     // Get token from localStorage - try different common token keys
// //     const token = localStorage.getItem('authToken') || 
// //                   localStorage.getItem('token') || 
// //                   localStorage.getItem('access_token') ||
// //                   localStorage.getItem('jwtToken') ||
// //                   localStorage.getItem('userToken');

// //     // Prepare headers
// //     const headers = {
// //       'Content-Type': 'application/json',
// //     };
    
// //     // Add token only if it exists
 
   

// //     // Prepare company data for API
// //     const companyPayload = {
// //       username: formData.username.trim(),
// //       company_name: formData.companyName.trim(),
// //       role: formData.role,
// //       theme: formData.theme?.name || formData.theme || 'black',
// //       address: formData.address.trim(),
// //       phone: formData.phone.trim(),
// //       ...(formData.email && { email: formData.email.trim() }),
// //       ...(formData.password && { password: formData.password }),
// //     };

// //     // API 1: Create Company
// //     const companyUrl = `https://hr.hinzah.com/api/admin/companies/create`;
// //     console.log('Creating company at:', companyUrl);
// //     console.log('Company payload:', companyPayload);
    
// //     const companyResponse = await fetch(companyUrl, {
// //       method: 'POST',
// //       headers: headers,
// //       body: JSON.stringify(companyPayload),
// //     });

// //     console.log('Company response status:', companyResponse.status);
    
// //     if (!companyResponse.ok) {
// //       const errorData = await companyResponse.json().catch(() => ({}));
// //       console.error('Company API error:', errorData);
// //       throw new Error(`Company API failed: ${errorData.message || companyResponse.statusText || 'Unknown error'}`);
// //     }

// //     const companyResult = await companyResponse.json();
// //     console.log('Create API response:', companyResult);

// //     // Extract company code from response - IMPORTANT: Use the response companyCode!
// //     const companyCode = companyResult.data?.companyCode || companyResult.companyCode;
    
// //     if (!companyCode) {
// //       throw new Error('No company code returned from API');
// //     }

// //     console.log('Using company code from API response:', companyCode);
    
// //     // API 2: Set Permissions - Use the companyCode from API response
// //     const permissionsPayload = {
// //       company_code: companyCode, // Use the actual companyCode from response
// //       permissions: formData.permissions
// //     };

// //     console.log('Sending permissions data:', permissionsPayload);
    
// //     // Check what token is available for permissions API
// //     console.log('Current token for permissions API:', token);
    
// //     // For permissions API, you might need a different token or no token
// //     // Based on your error, it seems permissions API doesn't need token
// //     // Let's try without Authorization header first
// //        const tokens = localStorage.getItem('authToken');
// //         if (!token) {
// //           console.log('No auth token found');
// //           setApiError(true);
// //           setApiErrorMessage('No authentication token');
// //           setIsLoading(false);
// //           return;
// //         }
    
// //     const permissionsResponse = await fetch(`https://hr.hinzah.com/api/company/permissions`, {
// //       method: 'POST',
// //        headers: {
              
// //               'Content-Type': 'application/json',
// //               'Accept': 'application/json',
// //             },
// //       body: JSON.stringify(permissionsPayload),
// //     });

// //     console.log('Permissions response status:', permissionsResponse.status);
    
// //     if (!permissionsResponse.ok) {
// //       // If 401 with token, try without token
// //       if (permissionsResponse.status === 401 && token) {
// //         console.log('Permissions API failed with token, trying without token...');
        
// //         // Try again without authorization header
// //         const retryHeaders = {
// //           'Content-Type': 'application/json',
// //         };
        
// //         const retryResponse = await fetch(`https://hr.hinzah.com/api/company/permissions`, {
// //           method: 'POST',
// //           headers: retryHeaders,
// //           body: JSON.stringify(permissionsPayload),
// //         });
        
// //         if (!retryResponse.ok) {
// //           const errorData = await retryResponse.json().catch(() => ({}));
// //           console.warn('Permissions API failed even without token:', errorData);
// //           // Don't throw error - just log warning since company was created successfully
// //           console.warn('Permissions could not be set, but company was created successfully');
// //         } else {
// //           const retryResult = await retryResponse.json();
// //           console.log('Permissions API success without token:', retryResult);
// //         }
// //       } else {
// //         const errorData = await permissionsResponse.json().catch(() => ({}));
// //         console.warn('Permissions API failed:', errorData);
// //         // Don't throw error - just log warning since company was created successfully
// //         console.warn('Permissions could not be set, but company was created successfully');
// //       }
// //     } else {
// //       const permissionsResult = await permissionsResponse.json();
// //       console.log('Permissions API response:', permissionsResult);
// //     }

// //     // Refresh the companies list from API
// //     await fetchCompanies();

// //     closeModal();
// //     triggerSuccess('Company created successfully!');
    
// //   } catch (error) {
// //     console.error('API Error:', error);
// //     alert(`Failed to save company: ${error.message}`);
// //   } finally {
// //     setIsLoading(false);
// //   }
// // };



// //   const handleDelete = async (id) => {
// //     if (!confirm('Are you sure you want to delete this company permanently?')) return;

// //     setIsDeleting(id);
// //     try {
// //       // API call to delete company
// //       // Note: You might need to adjust the endpoint based on your API
// //       const response = await fetch(`${API_BASE_URL}/api/admin/companies/${id}`, {
// //         method: 'DELETE',
// //         headers: {
// //           'Content-Type': 'application/json',
// //           // Add authorization header if needed
// //           // 'Authorization': `Bearer ${token}`,
// //         },
// //       });

// //       if (response.ok) {
// //         // Remove from local state
// //         setCompanies(prev => prev.filter(c => c.id !== id));
// //         triggerSuccess('Company deleted successfully!');
// //       } else {
// //         alert('Failed to delete company from API');
// //       }
// //     } catch (error) {
// //       console.error('Delete error:', error);
// //       alert('Error deleting company');
// //     } finally {
// //       setIsDeleting(null);
// //     }
// //   };

// //   // Filter companies
// //   const filteredCompanies = companies.filter(company => {
// //     const matchesSearch = 
// //       company.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
// //       company.companyId.toLowerCase().includes(searchQuery.toLowerCase()) ||
// //       company.email.toLowerCase().includes(searchQuery.toLowerCase());
    
// //     if (activeFilter === 'all') return matchesSearch;
// //     if (activeFilter === 'active') return matchesSearch && company.status === 'active';
// //     if (activeFilter === 'inactive') return matchesSearch && company.status === 'inactive';
// //     if (activeFilter === 'admin') return matchesSearch && company.role === 'admin';
// //     if (activeFilter === 'superadmin') return matchesSearch && company.role === 'superadmin';
// //     return matchesSearch;
// //   });

// //   // Summary data
// //   const summaryData = {
// //     total: companies.length,
// //     active: companies.filter(c => c.status === 'active').length,
// //     admins: companies.filter(c => c.role === 'admin' || c.role === 'superadmin').length,
// //     employees: companies.reduce((sum, c) => sum + (c.employees || 0), 0),
// //   };

// //   return (
// //     <div className="min-h-screen lg:max-w-5xl w-full  ">
// //       {/* HEADER */}
// //       <div className="mb-6 lg:mb-8">
// //         <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
// //           <div>
// //             <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Company Management</h1>
// //             <p className="text-gray-600 mt-1">Manage all companies and their permissions</p>
// //           </div>
          
// //           <div className="flex items-center gap-3">
// //             <div className="relative">
// //               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
// //               <input
// //                 type="text"
// //                 placeholder="Search companies..."
// //                 value={searchQuery}
// //                 onChange={(e) => setSearchQuery(e.target.value)}
// //                 className={`pl-10 pr-4 py-2 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 ${getRingColor()} focus:border-transparent w-full lg:w-64`}
// //               />
// //             </div>
            
// //             <button 
// //               className="p-2 rounded-xl hover:opacity-90"
// //               style={{ 
// //                 backgroundColor: getTextAccent() === '#ea580c' ? '#fff7ed' : getLightBg().includes('bg-') ? undefined : getLightBg(),
// //                 color: getTextAccent()
// //               }}
// //             >
// //               <Filter className="h-5 w-5" />
// //             </button>
            
// //             <button className="relative p-2 hover:bg-gray-100 rounded-xl">
// //               <Bell className="h-5 w-5 text-gray-600" />
// //               <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
// //             </button>
            
// //             <button className="hidden lg:flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-xl text-sm hover:bg-gray-50">
// //               <Settings className="h-4 w-4" /> Settings
// //             </button>
// //           </div>
// //         </div>

// //         {/* Filter Bar */}
// //         <div className="flex items-center gap-2 mt-6 overflow-x-auto scrollbar-hide">
// //           <div className="flex items-center gap-2 p-1 bg-gray-100 rounded-xl">
// //             <button
// //               onClick={() => setViewMode('table')}
// //               className={`px-3 py-1.5 text-sm rounded-lg flex items-center gap-2 ${
// //                 viewMode === 'table' ? 'bg-white shadow-sm' : ''
// //               }`}
// //             >
// //               <BarChart3 className="h-4 w-4" /> Table
// //             </button>
// //             <button
// //               onClick={() => setViewMode('card')}
// //               className={`px-3 py-1.5 text-sm rounded-lg flex items-center gap-2 ${
// //                 viewMode === 'card' ? 'bg-white shadow-sm' : ''
// //               }`}
// //             >
// //               <Building className="h-4 w-4" /> Cards
// //             </button>
// //           </div>
          
// //           {['all', 'active', 'inactive', 'admin', 'superadmin'].map((filter) => (
// //             <button
// //               key={filter}
// //               onClick={() => setActiveFilter(filter)}
// //               className={`px-4 py-2 rounded-xl text-sm font-medium capitalize whitespace-nowrap ${
// //                 activeFilter === filter
// //                   ? `${getButtonGradient()} ${getButtonHover()} text-white`
// //                   : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-300'
// //               }`}
// //             >
// //               {filter}
// //             </button>
// //           ))}
// //         </div>
// //       </div>

// //       {/* SUMMARY CARDS */}
// //       <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6 lg:mb-8">
// //         <div className="bg-white rounded-2xl p-5 lg:p-6 shadow-lg border border-gray-200/50 hover:shadow-xl transition-shadow">
// //           <div className="flex items-center justify-between mb-4">
// //             <div className="p-3 bg-blue-50 rounded-xl">
// //               <Building className="h-6 w-6 text-blue-600" />
// //             </div>
// //             <div className="flex items-center text-sm text-blue-600 font-medium">
// //               <TrendingUp className="h-4 w-4 mr-1" />
// //               +{Math.floor(summaryData.total * 0.2)}
// //             </div>
// //           </div>
// //           <h3 className="text-sm font-medium text-gray-500 mb-1">Total Companies</h3>
// //           <div className="flex items-baseline gap-2">
// //             <p className="text-2xl lg:text-3xl font-bold text-gray-900">{summaryData.total}</p>
// //             <span className="text-sm text-gray-500">registered</span>
// //           </div>
// //           <div className="mt-4 pt-4 border-t border-gray-100">
// //             <div className="flex items-center text-xs text-gray-500">
// //               <Clock className="h-3 w-3 mr-1" /> This month
// //             </div>
// //           </div>
// //         </div>

// //         <div className="bg-white rounded-2xl p-5 lg:p-6 shadow-lg border border-gray-200/50 hover:shadow-xl transition-shadow">
// //           <div className="flex items-center justify-between mb-4">
// //             <div className="p-3 bg-green-50 rounded-xl">
// //               <CheckCircle className="h-6 w-6 text-green-600" />
// //             </div>
// //             <div className="flex items-center text-sm text-green-600 font-medium">
// //               <TrendingUp className="h-4 w-4 mr-1" />
// //               +{Math.floor(summaryData.active * 0.15)}
// //             </div>
// //           </div>
// //           <h3 className="text-sm font-medium text-gray-500 mb-1">Active Companies</h3>
// //           <div className="flex items-baseline gap-2">
// //             <p className="text-2xl lg:text-3xl font-bold text-green-600">{summaryData.active}</p>
// //             <span className="text-sm text-gray-500">operating</span>
// //           </div>
// //           <div className="mt-4 pt-4 border-t border-gray-100">
// //             <div className="text-xs text-gray-500">
// //               {Math.round((summaryData.active / summaryData.total) * 100)}% of total
// //             </div>
// //           </div>
// //         </div>

// //         <div className="bg-white rounded-2xl p-5 lg:p-6 shadow-lg border border-gray-200/50 hover:shadow-xl transition-shadow">
// //           <div className="flex items-center justify-between mb-4">
// //             <div className="p-3 bg-purple-50 rounded-xl">
// //               <ShieldCheck className="h-6 w-6 text-purple-600" />
// //             </div>
// //             <div className="flex items-center text-sm text-purple-600 font-medium">
// //               <TrendingUp className="h-4 w-4 mr-1" />
// //               +{Math.floor(summaryData.admins * 0.1)}
// //             </div>
// //           </div>
// //           <h3 className="text-sm font-medium text-gray-500 mb-1">Administrators</h3>
// //           <div className="flex items-baseline gap-2">
// //             <p className="text-2xl lg:text-3xl font-bold text-purple-600">{summaryData.admins}</p>
// //             <span className="text-sm text-gray-500">admins</span>
// //           </div>
// //           <div className="mt-4 pt-4 border-t border-gray-100">
// //             <div className="flex items-center text-xs text-gray-500">
// //               <Crown className="h-3 w-3 mr-1" /> Super users
// //             </div>
// //           </div>
// //         </div>

// //         <div className="bg-white rounded-2xl p-5 lg:p-6 shadow-lg border border-gray-200/50 hover:shadow-xl transition-shadow">
// //           <div className="flex items-center justify-between mb-4">
// //             <div 
// //               className="p-3 rounded-xl"
// //               style={{ 
// //                 backgroundColor: getTextAccent() === '#ea580c' ? '#fff7ed' : 
// //                                getLightBg().includes('bg-') ? undefined : getLightBg()
// //               }}
// //             >
// //               <UsersIcon 
// //                 className="h-6 w-6"
// //                 style={{ color: getTextAccent() }}
// //               />
// //             </div>
// //             <button className="p-1 hover:bg-gray-100 rounded-lg">
// //               <RefreshCw className="h-5 w-5 text-gray-600" />
// //             </button>
// //           </div>
// //           <h3 className="text-sm font-medium text-gray-500 mb-1">Total Employees</h3>
// //           <div className="flex items-baseline gap-2">
// //             <p className="text-2xl lg:text-3xl font-bold text-gray-900">{summaryData.employees.toLocaleString()}</p>
// //             <span className="text-sm text-gray-500">users</span>
// //           </div>
// //           <div className="mt-4 pt-4 border-t border-gray-100">
// //             <button className="text-sm font-medium text-gray-600 hover:text-gray-900 flex items-center">
// //               View analytics <ArrowRight className="h-4 w-4 ml-1" />
// //             </button>
// //           </div>
// //         </div>
// //       </div>

// //       {/* TABLE VIEW */}
// //       {viewMode === 'table' && (
// //         <div className="bg-white rounded-2xl shadow-lg border border-gray-200/50 overflow-hidden">
// //           {/* Table Header */}
// //           <div 
// //             className="border-b border-gray-200"
// //             style={{ 
// //               backgroundColor: getTextAccent() === '#ea580c' ? '#fff7ed' : 
// //                              getLightBg().includes('bg-') ? undefined : getLightBg()
// //             }}
// //           >
// //             <div className="flex items-center justify-between p-6">
// //               <div>
// //                 <h3 className="text-lg font-bold text-gray-900">Companies</h3>
// //                 <p className="text-sm text-gray-500 mt-1">{filteredCompanies.length} companies found</p>
// //               </div>
              
// //               <div className="flex items-center gap-3">
// //                 <button className="p-2 hover:bg-gray-100 rounded-xl">
// //                   <Download className="h-5 w-5 text-gray-600" />
// //                 </button>
// //                 <button className="p-2 hover:bg-gray-100 rounded-xl">
// //                   <MoreVertical className="h-5 w-5 text-gray-600" />
// //                 </button>
// //                 <button
// //                   onClick={() => openModal()}
// //                   className={`px-4 py-2 ${getButtonGradient()} ${getButtonHover()} text-white text-sm font-medium rounded-xl flex items-center gap-2`}
// //                 >
// //                   <Plus className="h-4 w-4" /> Create Company
// //                 </button>
// //               </div>
// //             </div>
// //           </div>

// //           {/* Table */}
// //           <div className="overflow-x-auto">
// //             <table className="w-full">
// //               <thead className="border-b border-gray-200">
// //                 <tr>
// //                   <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Company</th>
// //                   <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">ID</th>
// //                   <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Contact</th>
// //                   <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Role</th>
// //                   <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
// //                   <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Employees</th>
// //                   <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Theme</th>
// //                   <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
// //                 </tr>
// //               </thead>
// //               <tbody className="divide-y divide-gray-200">
// //                 {filteredCompanies.map((company) => (
// //                   <tr key={company.id} className="hover:bg-gray-50/50 transition-colors">
// //                     <td className="px-6 py-4">
// //                       <div className="flex items-center gap-3">
// //                         <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
// //                           {company.logo ? (
// //                             <img src={company.logo} alt="logo" className="w-10 h-10 rounded-lg object-cover" />
// //                           ) : (
// //                             <Building className="h-6 w-6 text-white" />
// //                           )}
// //                         </div>
// //                         <div className="text-left">
// //                           <p className="font-medium text-gray-900">{company.companyName}</p>
// //                           <p className="text-sm text-gray-500">{company.username}</p>
// //                         </div>
// //                       </div>
// //                     </td>
// //                     <td className="px-6 py-4">
// //                       <div className="flex items-center gap-2">
// //                         <code className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">
// //                           {company.companyId}
// //                         </code>
// //                         <button className="p-1 hover:bg-gray-100 rounded">
// //                           <Copy className="h-3 w-3 text-gray-500" />
// //                         </button>
// //                       </div>
// //                     </td>
// //                     <td className="px-6 py-4">
// //                       <div className="space-y-1">
// //                         <div className="flex items-center gap-1 text-sm text-gray-600">
// //                           <Mail className="h-3 w-3" />
// //                           <span className="truncate max-w-[180px]">{company.email || 'No email'}</span>
// //                         </div>
// //                         <div className="flex items-center gap-1 text-sm text-gray-600">
// //                           <Phone className="h-3 w-3" />
// //                           <span>{company.phone || 'No phone'}</span>
// //                         </div>
// //                       </div>
// //                     </td>
// //                     <td className="px-6 py-4">
// //                       <span className={`inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium ${
// //                         company.role === 'superadmin' ? 'bg-purple-100 text-purple-800' :
// //                         company.role === 'admin' ? 'bg-blue-100 text-blue-800' :
// //                         company.role === 'companyleader' ? 'bg-green-100 text-green-800' :
// //                         'bg-gray-100 text-gray-800'
// //                       }`}>
// //                         <Shield className="h-3 w-3 mr-1" />
// //                         {company.role.charAt(0).toUpperCase() + company.role.slice(1)}
// //                       </span>
// //                     </td>
// //                     <td className="px-6 py-4">
// //                       <span className={`inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium ${
// //                         company.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
// //                       }`}>
// //                         <div className={`w-2 h-2 rounded-full mr-2 ${company.status === 'active' ? 'bg-green-500' : 'bg-red-500'}`} />
// //                         {company.status.charAt(0).toUpperCase() + company.status.slice(1)}
// //                       </span>
// //                     </td>
// //                     <td className="px-6 py-4">
// //                       <div className="flex items-center gap-2">
// //                         <Users className="h-4 w-4 text-gray-400" />
// //                         <span className="font-medium">{company.employees || 0}</span>
// //                         <span className="text-sm text-gray-500">employees</span>
// //                       </div>
// //                     </td>
// //                     <td className="px-6 py-4">
// //                       <div className="flex items-center gap-2">
// //                         <div 
// //                           className="w-8 h-8 rounded-lg shadow-sm"
// //                           style={{ 
// //                             background: company.theme.sidebarBg || 
// //                             `linear-gradient(135deg, ${company.theme.gradient?.split(' ')[1] || '#f97316'}, ${company.theme.gradient?.split(' ')[3] || '#ec4899'})`
// //                           }}
// //                         />
// //                         <span className="text-sm text-gray-700">{company.theme.name}</span>
// //                       </div>
// //                     </td>
// //                     <td className="px-6 py-4">
// //                       <div className="flex items-center gap-2">
// //                         <button
// //                           onClick={() => openModal(company)}
// //                           className="p-2 hover:bg-blue-50 rounded-lg text-blue-600"
// //                           title="Edit"
// //                         >
// //                           <Edit2 className="h-4 w-4" />
// //                         </button>
// //                         <button
// //                           onClick={() => window.open(`/dashboard?company=${company.id}`, '_blank')}
// //                           className="p-2 hover:bg-green-50 rounded-lg text-green-600"
// //                           title="View Dashboard"
// //                         >
// //                           <Eye className="h-4 w-4" />
// //                         </button>
// //                         <button
// //                           onClick={() => handleDelete(company.id)}
// //                           disabled={isDeleting === company.id}
// //                           className="p-2 hover:bg-red-50 rounded-lg text-red-600 disabled:opacity-50"
// //                           title="Delete"
// //                         >
// //                           {isDeleting === company.id ? (
// //                             <RefreshCw className="h-4 w-4 animate-spin" />
// //                           ) : (
// //                             <Trash2 className="h-4 w-4" />
// //                           )}
// //                         </button>
// //                         <button className="p-2 hover:bg-gray-100 rounded-lg">
// //                           <MoreHorizontal className="h-4 w-4 text-gray-600" />
// //                         </button>
// //                       </div>
// //                     </td>
// //                   </tr>
// //                 ))}
// //               </tbody>
// //             </table>
// //           </div>

// //           {/* Pagination */}
// //           <div className="border-t border-gray-200 px-6 py-4">
// //             <div className="flex items-center justify-between">
// //               <div className="text-sm text-gray-600">
// //                 Showing <span className="font-medium">{filteredCompanies.length}</span> of{' '}
// //                 <span className="font-medium">{companies.length}</span> companies
// //               </div>
              
// //               <div className="flex items-center gap-4">
// //                 <div className="flex items-center gap-2">
// //                   <button
// //                     onClick={() => setPage(Math.max(1, page - 1))}
// //                     disabled={page === 1}
// //                     className="p-2 hover:bg-gray-100 rounded-xl disabled:opacity-50"
// //                   >
// //                     <ChevronLeft className="h-4 w-4" />
// //                   </button>
                  
// //                   <div className="flex items-center gap-2">
// //                     {[1, 2].map(p => (
// //                       <button
// //                         key={p}
// //                         onClick={() => setPage(p)}
// //                         className={`w-10 h-10 rounded-lg font-medium ${
// //                           page === p
// //                             ? `${getButtonGradient()} text-white`
// //                             : 'text-gray-600 hover:bg-gray-100'
// //                         }`}
// //                       >
// //                         {p}
// //                       </button>
// //                     ))}
// //                   </div>
                  
// //                   <button
// //                     onClick={() => setPage(Math.min(totalPages, page + 1))}
// //                     disabled={page === totalPages}
// //                     className="p-2 hover:bg-gray-100 rounded-xl disabled:opacity-50"
// //                   >
// //                     <ChevronRight className="h-4 w-4" />
// //                   </button>
// //                 </div>
                
// //                 <div className="text-sm text-gray-600">
// //                   Page <span className="font-medium">{page}</span> of <span className="font-medium">{totalPages}</span>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       )}

// //       {/* CARD VIEW */}
// //       {viewMode === 'card' && (
// //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// //           {filteredCompanies.map((company) => (
// //             <div key={company.id} className="bg-white rounded-2xl shadow-lg border border-gray-200/50 p-6">
// //               <div className="flex items-start justify-between mb-4">
// //                 <div className="flex items-center gap-3">
// //                   <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
// //                     {company.logo ? (
// //                       <img src={company.logo} alt="logo" className="w-10 h-10 rounded-lg object-cover" />
// //                     ) : (
// //                       <Building className="h-6 w-6 text-white" />
// //                     )}
// //                   </div>
// //                   <div>
// //                     <h3 className="font-bold text-gray-900">{company.companyName}</h3>
// //                     <div className="flex items-center gap-2 mt-1">
// //                       <code className="text-xs font-mono bg-gray-100 px-2 py-0.5 rounded">
// //                         {company.companyId}
// //                       </code>
// //                       <span className={`w-2 h-2 rounded-full ${
// //                         company.status === 'active' ? 'bg-green-500' : 'bg-red-500'
// //                       }`} />
// //                     </div>
// //                   </div>
// //                 </div>
// //                 <button className="p-2 hover:bg-gray-100 rounded-xl">
// //                   <MoreVertical className="h-5 w-5 text-gray-600" />
// //                 </button>
// //               </div>
              
// //               <div className="space-y-4 mb-6">
// //                 <div className="flex items-center justify-between">
// //                   <span className="text-sm text-gray-500">Role</span>
// //                   <span className={`px-3 py-1 rounded-lg text-sm font-medium ${
// //                     company.role === 'superadmin' ? 'bg-purple-100 text-purple-800' :
// //                     company.role === 'admin' ? 'bg-blue-100 text-blue-800' :
// //                     'bg-gray-100 text-gray-800'
// //                   }`}>
// //                     {company.role}
// //                   </span>
// //                 </div>
// //                 <div className="flex items-center justify-between">
// //                   <span className="text-sm text-gray-500">Employees</span>
// //                   <span className="inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium bg-blue-100 text-blue-700">
// //                     <Users className="h-4 w-4 mr-1" /> {company.employees || 0}
// //                   </span>
// //                 </div>
// //                 <div className="flex items-center justify-between">
// //                   <span className="text-sm text-gray-500">Email</span>
// //                   <span className="font-medium text-gray-900 text-sm truncate max-w-[150px]">
// //                     {company.email || 'No email'}
// //                   </span>
// //                 </div>
// //                 <div className="flex items-center justify-between">
// //                   <span className="text-sm text-gray-500">Theme</span>
// //                   <div className="flex items-center gap-2">
// //                     <div 
// //                       className="w-6 h-6 rounded-lg"
// //                       style={{ 
// //                         background: company.theme.sidebarBg || 
// //                         `linear-gradient(135deg, ${company.theme.gradient?.split(' ')[1] || '#f97316'}, ${company.theme.gradient?.split(' ')[3] || '#ec4899'})`
// //                       }}
// //                     />
// //                     <span className="text-sm text-gray-700">{company.theme.name}</span>
// //                   </div>
// //                 </div>
// //               </div>
              
// //               <div className="flex items-center justify-between pt-4 border-t border-gray-200">
// //                 <button
// //                   onClick={() => openModal(company)}
// //                   className="text-sm font-medium text-gray-600 hover:text-gray-900 flex items-center"
// //                 >
// //                   <Edit2 className="h-4 w-4 mr-1" /> Edit
// //                 </button>
                
// //                 <div className="flex items-center gap-2">
// //                   <button
// //                     onClick={() => window.open(`/dashboard?company=${company.id}`, '_blank')}
// //                     className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-200 flex items-center gap-1"
// //                   >
// //                     <Eye className="h-3 w-3" /> View
// //                   </button>
// //                   <button
// //                     onClick={() => handleDelete(company.id)}
// //                     className="px-3 py-1.5 bg-red-100 text-red-700 rounded-lg text-sm font-medium hover:bg-red-200 flex items-center gap-1"
// //                   >
// //                     <Trash2 className="h-3 w-3" />
// //                   </button>
// //                 </div>
// //               </div>
// //             </div>
// //           ))}
// //         </div>
// //       )}

// //       {/* CREATE/EDIT MODAL */}
// //       {isModalOpen && (
// //         <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm">
// //           <div className="bg-white rounded-2xl shadow-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
// //             <div className="sticky top-0 bg-white border-b border-gray-200 z-10">
// //               <div className="flex items-center justify-between p-6">
// //                 <div>
// //                   <h2 className="text-2xl font-bold text-gray-900">
// //                     {editingCompany ? 'Edit Company' : 'Create New Company'}
// //                   </h2>
// //                   <p className="text-gray-600 mt-1">Manage company details and permissions</p>
// //                 </div>
// //                 <button
// //                   onClick={closeModal}
// //                   className="p-2 hover:bg-gray-100 rounded-xl"
// //                 >
// //                   <X className="h-5 w-5 text-gray-500" />
// //                 </button>
// //               </div>
// //             </div>

// //             <div className="p-6">
// //               {isLoading ? (
// //                 <div className="flex items-center justify-center py-20">
// //                   <div className="text-center">
// //                     <RefreshCw 
// //                       className="h-12 w-12 animate-spin mx-auto mb-4"
// //                       style={{ color: getAccentColor() }}
// //                     />
// //                     <p className="text-gray-600">Loading company data...</p>
// //                   </div>
// //                 </div>
// //               ) : (
// //                 <form onSubmit={handleSubmit}>
// //                   {/* Company Details Section */}
// //                   <div className="mb-8">
// //                     <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
// //                       <Building className="h-5 w-5" /> Company Details
// //                     </h3>
// //                     <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
// //                       <div className="space-y-4">
// //                         <div>
// //                           <label className="block text-sm font-medium text-gray-700 mb-1">
// //                             Company Name <span className="text-red-600">*</span>
// //                           </label>
// //                           <input
// //                             type="text"
// //                             required
// //                             placeholder="Enter company name"
// //                             value={formData.companyName}
// //                             onChange={e => setFormData(prev => ({ ...prev, companyName: e.target.value }))}
// //                             className={`w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 ${getRingColor()} focus:border-transparent`}
// //                           />
// //                         </div>
// //                         <div>
// //                           <label className="block text-sm font-medium text-gray-700 mb-1">
// //                             Username <span className="text-red-600">*</span>
// //                           </label>
// //                           <input
// //                             type="text"
// //                             required
// //                             placeholder="Enter username"
// //                             value={formData.username}
// //                             onChange={e => setFormData(prev => ({ ...prev, username: e.target.value }))}
// //                             className={`w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 ${getRingColor()} focus:border-transparent`}
// //                           />
// //                         </div>
// //                         <div>
// //                           <label className="block text-sm font-medium text-gray-700 mb-1">
// //                             Company ID <span className="text-red-600">*</span>
// //                           </label>
// //                           <div className="flex gap-2">
// //                             <input
// //                               type="text"
// //                               required
// //                               placeholder="Enter company ID"
// //                               value={formData.companyId}
// //                               onChange={e => setFormData(prev => ({ ...prev, companyId: e.target.value }))}
// //                               className={`flex-1 px-4 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 ${getRingColor()} focus:border-transparent`}
// //                             />
// //                             <button
// //                               type="button"
// //                               onClick={() => setFormData(prev => ({ ...prev, companyId: `COMP-${Date.now().toString().slice(-6)}` }))}
// //                               className="px-4 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 text-sm font-medium"
// //                             >
// //                               Generate
// //                             </button>
// //                           </div>
// //                         </div>
// //                       </div>
                      
// //                       <div className="space-y-4">
// //                         <div>
// //                           <label className="block text-sm font-medium text-gray-700 mb-1">
// //                             Email Address
// //                           </label>
// //                           <div className="relative">
// //                             <Mail className="absolute left-3 top-3.5 h-4 w-4 text-gray-400" />
// //                             <input
// //                               type="email"
// //                               placeholder="company@email.com"
// //                               value={formData.email}
// //                               onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
// //                               className={`w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 ${getRingColor()} focus:border-transparent`}
// //                             />
// //                           </div>
// //                         </div>
// //                         <div>
// //                           <label className="block text-sm font-medium text-gray-700 mb-1">
// //                             Phone Number
// //                           </label>
// //                           <div className="relative">
// //                             <Phone className="absolute left-3 top-3.5 h-4 w-4 text-gray-400" />
// //                             <input
// //                               type="tel"
// //                               placeholder="+1 (555) 123-4567"
// //                               value={formData.phone}
// //                               onChange={e => setFormData(prev => ({ ...prev, phone: e.target.value }))}
// //                               className={`w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 ${getRingColor()} focus:border-transparent`}
// //                             />
// //                           </div>
// //                         </div>
// //                         <div>
// //                           <label className="block text-sm font-medium text-gray-700 mb-1">
// //                             Address
// //                           </label>
// //                           <div className="relative">
// //                             <MapPin className="absolute left-3 top-3.5 h-4 w-4 text-gray-400" />
// //                             <input
// //                               type="text"
// //                               placeholder="Company address"
// //                               value={formData.address}
// //                               onChange={e => setFormData(prev => ({ ...prev, address: e.target.value }))}
// //                               className={`w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 ${getRingColor()} focus:border-transparent`}
// //                             />
// //                           </div>
// //                         </div>
// //                       </div>
// //                     </div>
// //                   </div>

// //                   {/* Security & Role Section */}
// //                   <div className="mb-8">
// //                     <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
// //                       <Shield className="h-5 w-5" /> Security & Role
// //                     </h3>
// //                     <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
// //                       <div>
// //                         <label className="block text-sm font-medium text-gray-700 mb-1">
// //                           Role <span className="text-red-600">*</span>
// //                         </label>
// //                         <select
// //                           value={formData.role}
// //                           onChange={(e) => handleRoleChange(e.target.value)}
// //                           className={`w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 ${getRingColor()} focus:border-transparent`}
// //                         >
// //                           <option value="employee">Employee</option>
// //                           <option value="companyleader">Company Leader</option>
// //                           <option value="admin">Admin</option>
// //                           <option value="superadmin">Super Admin</option>
// //                         </select>
// //                         {formData.role === 'superadmin' && (
// //                           <p className="text-xs text-purple-600 mt-2 flex items-center gap-1">
// //                             <ShieldCheck className="h-3 w-3" />
// //                             Super Admin: All view permissions are automatically enabled
// //                           </p>
// //                         )}
// //                       </div>
                      
// //                       <div>
// //                         <label className="block text-sm font-medium text-gray-700 mb-1">
// //                           Password {!editingCompany && <span className="text-red-600">*</span>}
// //                         </label>
// //                         <div className="relative">
// //                           <Key className="absolute left-3 top-3.5 h-4 w-4 text-gray-400" />
// //                           <input
// //                             type={showPassword ? 'text' : 'password'}
// //                             placeholder={editingCompany ? 'New password (optional)' : 'Enter password'}
// //                             value={formData.password}
// //                             onChange={e => setFormData(prev => ({ ...prev, password: e.target.value }))}
// //                             className={`w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 ${getRingColor()} focus:border-transparent`}
// //                             required={!editingCompany}
// //                           />
// //                           <button
// //                             type="button"
// //                             onClick={() => setShowPassword(!showPassword)}
// //                             className="absolute right-3 top-3.5 text-gray-500"
// //                           >
// //                             {showPassword ? <Eye className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
// //                           </button>
// //                         </div>
// //                       </div>
                      
// //                       {!editingCompany && (
// //                         <div>
// //                           <label className="block text-sm font-medium text-gray-700 mb-1">
// //                             Confirm Password <span className="text-red-600">*</span>
// //                           </label>
// //                           <div className="relative">
// //                             <Key className="absolute left-3 top-3.5 h-4 w-4 text-gray-400" />
// //                             <input
// //                               type={showPassword ? 'text' : 'password'}
// //                               placeholder="Confirm password"
// //                               value={formData.confirmPassword}
// //                               onChange={e => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
// //                               className={`w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 ${getRingColor()} focus:border-transparent`}
// //                               required
// //                             />
// //                           </div>
// //                         </div>
// //                       )}
// //                     </div>
// //                   </div>

// //                   {/* Theme Selection */}
// //                   <div className="mb-8">
// //                     <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
// //                       <Palette className="h-5 w-5" /> Theme Selection
// //                     </h3>
// //                     <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
// //   {Object.values(THEMES).map(t => {
// //     // Create color array from theme using Tailwind classes
// //     const getThemeColorClasses = () => {
// //       const colorClasses = [];
      
// //       // Extract colors from gradient if exists (e.g., "from-red-500 to-rose-600")
// //       if (t.gradient) {
// //         // Extract color names from gradient string
// //         const gradientMatch = t.gradient.match(/(from|to)-([a-z]+-\d+)/g);
// //         if (gradientMatch) {
// //           gradientMatch.forEach(g => {
// //             // Extract just the color part (e.g., "red-500" from "from-red-500")
// //             const colorPart = g.split('-').slice(1).join('-');
// //             colorClasses.push(colorPart);
// //           });
// //         }
// //       }
      
// //       // Add accent color (e.g., "red-600")
// //       if (t.accent) colorClasses.push(t.accent);
      
// //       // Add sidebar color if it's a solid color (not gradient)
// //       if (t.sidebarBg && !t.sidebarBg.includes('gradient')) {
// //         // Extract color from Tailwind class like "bg-red-700" -> "red-700"
// //         const sidebarColor = t.sidebarBg.replace('bg-', '');
// //         colorClasses.push(sidebarColor);
// //       }
      
// //       // Get unique colors
// //       return [...new Set(colorClasses)].slice(0, 3);
// //     };
    
// //     const colorClasses = getThemeColorClasses();
    
// //     // Helper to get gradient style if needed
// //     const getGradientStyle = () => {
// //       if (t.gradient) {
// //         const [fromColor, toColor] = t.gradient.split(' ');
// //         return `bg-gradient-to-r ${fromColor} ${toColor}`;
// //       }
// //       return `bg-gradient-to-r from-orange-500 to-orange-600`;
// //     };
    
// //     return (
// //       <button
// //         key={t.id}
// //         type="button"
// //         onClick={() => setFormData(prev => ({ ...prev, theme: t }))}
// //         className={`relative p-3 rounded-xl border-2 transition-all hover:scale-105 ${
// //           formData.theme.id === t.id 
// //             ? 'shadow-lg ring-2 ring-offset-2' 
// //             : 'border-gray-200 hover:border-gray-300'
// //         } ${formData.theme.id === t.id ? `ring-${t.accent?.replace('600', '500') || 'orange-500'}` : ''}`}
// //       >
// //         {/* Color Preview Stripes */}
// //         <div className="h-12 rounded-lg overflow-hidden flex mb-2">
// //           {colorClasses.length > 0 ? (
// //             colorClasses.map((colorClass, idx) => (
// //               <div 
// //                 key={idx}
// //                 className={`flex-1 bg-${colorClass}`}
// //               />
// //             ))
// //           ) : (
// //             <div className={`w-full h-full ${getGradientStyle()}`} />
// //           )}
// //         </div>
        
// //         {/* Theme Name */}
// //         <div className="text-center">
// //           <div className="font-medium text-xs text-gray-900 truncate">
// //             {t.name}
// //           </div>
// //           <div className="text-[10px] text-gray-500 mt-0.5 truncate">
// //             {t.accent?.replace('-600', '') || 'Multi'}
// //           </div>
// //         </div>
        
// //         {/* Selection Check */}
// //         {formData.theme.id === t.id && (
// //           <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
// //             <Check className="h-3 w-3 text-white" />
// //           </div>
// //         )}
// //       </button>
// //     );
// //   })}
// // </div>
// //                   </div>

// //                   {/* Permissions Section */}
// //                   <div className="mb-8">
// //                     <div className="flex items-center justify-between mb-4">
// //                       <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
// //                         <Lock className="h-5 w-5" /> Module Permissions
// //                       </h3>
// //                       <div className="flex items-center gap-4 text-sm">
// //                         <div className="flex items-center gap-2">
// //                           <div className="w-3 h-3 bg-green-500 rounded-full"></div>
// //                           <span>Enabled</span>
// //                         </div>
// //                         <div className="flex items-center gap-2">
// //                           <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
// //                           <span>Disabled</span>
// //                         </div>
// //                       </div>
// //                     </div>
                    
// //                     <div className="space-y-3">
// //                       {MODULES.map(mod => (
// //                         <div key={mod.name} className="bg-gray-50 rounded-xl border overflow-hidden">
// //                           <button
// //                             type="button"
// //                             onClick={() => setOpenModule(openModule === mod.name ? null : mod.name)}
// //                             className="w-full flex justify-between items-center p-4 hover:bg-gray-100 transition-colors"
// //                           >
// //                             <div className="flex items-center gap-3">
// //                               <div className="p-2 bg-white rounded-lg">
// //                                 <mod.icon className="h-5 w-5 text-gray-700" />
// //                               </div>
// //                               <div className="text-left">
// //                                 <h4 className="font-semibold text-gray-900">{mod.name}</h4>
// //                                 <p className="text-sm text-gray-500">{(SUB_PERMISSIONS[mod.name] || []).length} permissions</p>
// //                               </div>
// //                             </div>
// //                             {openModule === mod.name ? (
// //                               <ChevronUp className="h-5 w-5 text-gray-500" />
// //                             ) : (
// //                               <ChevronDown className="h-5 w-5 text-gray-500" />
// //                             )}
// //                           </button>
                          
// //                           {openModule === mod.name && (
// //                             <div className="border-t border-gray-200 p-4 bg-white">
// //                               <div className="mb-2">
// //                                 {formData.role === 'superadmin' && (
// //                                   <div className="bg-purple-50 border border-purple-200 rounded-lg p-3 mb-4">
// //                                     <p className="text-sm text-purple-800 flex items-center gap-2">
// //                                       <ShieldCheck className="h-4 w-4" />
// //                                       Super Admin: All view permissions are enabled. Other permissions can be manually adjusted.
// //                                     </p>
// //                                   </div>
// //                                 )}
// //                               </div>
// //                               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
// //                                 {(SUB_PERMISSIONS[mod.name] || []).map(perm => (
// //                                   <div key={perm.name} className="bg-gray-50 rounded-lg p-4">
// //                                     <h5 className="font-medium text-gray-900 mb-3">{perm.name}</h5>
// //                                     <div className="grid grid-cols-2 gap-2">
// //                                       {['view', 'create', 'edit', 'delete'].map(type => {
// //                                         const checked = getPerm(mod.name, perm.name, type);
// //                                         return (
// //                                           <label key={type} className="flex items-center gap-2 cursor-pointer">
// //                                             <div className="relative">
// //                                               <input
// //                                                 type="checkbox"
// //                                                 checked={checked}
// //                                                 onChange={() => togglePermission(mod.name, perm.name, type)}
// //                                                 className="sr-only"
// //                                               />
// //                                               <div className={`w-8 h-5 rounded-full transition-colors ${
// //                                                 checked ? 'bg-green-500' : 'bg-gray-300'
// //                                               }`}>
// //                                                 <div className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transform transition-transform ${
// //                                                   checked ? 'translate-x-3' : ''
// //                                                 }`} />
// //                                               </div>
// //                                             </div>
// //                                             <span className="text-xs text-gray-700 capitalize">{type}</span>
// //                                           </label>
// //                                         );
// //                                       })}
// //                                     </div>
// //                                   </div>
// //                                 ))}
// //                               </div>
// //                             </div>
// //                           )}
// //                         </div>
// //                       ))}
// //                     </div>
// //                   </div>

// //                   {/* Form Actions */}
// //                   <div className="flex items-center justify-end gap-3 pt-6 border-t border-gray-200">
// //                     <button
// //                       type="button"
// //                       onClick={closeModal}
// //                       className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-50"
// //                     >
// //                       Cancel
// //                     </button>
// //                     <button
// //                       type="submit"
// //                       disabled={isLoading}
// //                       className={`px-8 py-3 ${getButtonGradient()} ${getButtonHover()} text-white text-sm font-medium rounded-xl flex items-center gap-2 disabled:opacity-70`}
// //                     >
// //                       {isLoading ? (
// //                         <>
// //                           <RefreshCw className="h-4 w-4 animate-spin" />
// //                           {editingCompany ? 'Updating...' : 'Creating...'}
// //                         </>
// //                       ) : editingCompany ? (
// //                         <>
// //                           <Check className="h-4 w-4" /> Update Company
// //                         </>
// //                       ) : (
// //                         <>
// //                           <Plus className="h-4 w-4" /> Create Company
// //                         </>
// //                       )}
// //                     </button>
// //                   </div>
// //                 </form>
// //               )}
// //             </div>
// //           </div>
// //         </div>
// //       )}

// //       {/* Success Toast */}
// //       {showSuccess && (
// //         <div className="fixed top-6 right-6 z-50 bg-green-500 text-white px-6 py-4 rounded-xl shadow-xl flex items-center gap-3 animate-fade-in">
// //           <CheckCircle className="h-5 w-5" />
// //           <span className="font-medium">{successMessage}</span>
// //           <button
// //             onClick={() => setShowSuccess(false)}
// //             className="ml-4 p-1 hover:bg-green-600 rounded"
// //           >
// //             <X className="h-4 w-4" />
// //           </button>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }


// // 'use client';

// // import React, { useState, useEffect } from 'react';
// // import {
// //   Search,
// //   Filter,
// //   MoreVertical,
// //   Plus,
// //   X,
// //   ChevronLeft,
// //   ChevronRight,
// //   Check,
// //   XCircle,
// //   AlertCircle,
// //   Download,
// //   Settings,
// //   Bell,
// //   Users,
// //   Clock,
// //   TrendingUp,
// //   TrendingDown,
// //   ArrowRight,
// //   Eye,
// //   Edit2,
// //   Trash2,
// //   RefreshCw,
// //   Building,
// //   Shield,
// //   Lock,
// //   Globe,
// //   Palette,
// //   Key,
// //   User,
// //   Calendar,
// //   FileText,
// //   BarChart3,
// //   CreditCard,
// //   Mail,
// //   Phone,
// //   MapPin,
// //   CheckCircle,
// //   XCircle as XCircleIcon,
// //   MoreHorizontal,
// //   Copy,
// //   QrCode,
// //   ShieldCheck,
// //   UserPlus,
// //   Users as UsersIcon,
// //   Star,
// //   Crown,
// //   Zap,
// //   ChevronDown,
// //   ChevronUp,
// //   Menu,
// //   Grid,
// //   List
// // } from 'lucide-react';
// // import { useTheme } from './ThemeContext';
// // import { THEMES } from './ThemeContext';
// // import { MODULES, SUB_PERMISSIONS } from './data/navdata';

// // export default function Company() {
// //   const { theme: appTheme } = useTheme();
// //   const [companies, setCompanies] = useState([]);
// //   const [isModalOpen, setIsModalOpen] = useState(false);
// //   const [editingCompany, setEditingCompany] = useState(null);
// //   const [showPassword, setShowPassword] = useState(false);
// //   const [openModule, setOpenModule] = useState(null);
  
// //   // Loading & Feedback
// //   const [isLoading, setIsLoading] = useState(false);
// //   const [isDeleting, setIsDeleting] = useState(null);
// //   const [showSuccess, setShowSuccess] = useState(false);
// //   const [successMessage, setSuccessMessage] = useState('');
// //   const [searchQuery, setSearchQuery] = useState('');
// //   const [activeFilter, setActiveFilter] = useState('all');
// //   const [viewMode, setViewMode] = useState('table');
// //   const [page, setPage] = useState(1);
// //   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
// //   const totalPages = 2;

// //   // API Base URLs
// //   const API_BASE_URL = 'https://hr.hinzah.com';
  
// //   // Theme helper functions that return actual color values
// //   const getAccentColor = () => appTheme?.accentColor || '#ea580c';
// //   const getBorderColor = () => appTheme?.borderColor || '#ea580c';
// //   const getTextAccent = () => appTheme?.accentColor || '#ea580c';
// //   const getButtonGradient = () => {
// //     if (appTheme?.buttonGradient) {
// //       return `bg-gradient-to-r ${appTheme.buttonGradient}`;
// //     }
// //     return 'bg-gradient-to-r from-orange-500 to-orange-600';
// //   };
// //   const getButtonHover = () => appTheme?.buttonHover || 'hover:from-orange-600 hover:to-orange-700';
// //   const getLightBg = () => appTheme?.lightBg || 'bg-orange-50';
// //   const getRingColor = () => appTheme?.ringColor || 'ring-orange-500';
  
// //   // Helper to get text color class based on theme
// //   const getTextColorClass = () => {
// //     if (appTheme?.textAccent) {
// //       return appTheme.textAccent;
// //     }
// //     return 'text-orange-600';
// //   };

// //   // Default permissions based on role
// //   const generateDefaultPermissions = (role = 'employee') => {
// //     const perms = {};
// //     MODULES.forEach(mod => {
// //       perms[mod.name] = {};
// //       (SUB_PERMISSIONS[mod.name] || []).forEach(sub => {
// //         perms[mod.name][sub.name] = {
// //           view: role === 'superadmin', // true for superadmin, false for others
// //           create: false,
// //           edit: false,
// //           delete: false,
// //         };
// //       });
// //     });
// //     return perms;
// //   };

// //   // Auto-set permissions when role changes to superadmin
// //   const autoSetSuperAdminPermissions = () => {
// //     const newPermissions = {};
// //     MODULES.forEach(mod => {
// //       newPermissions[mod.name] = {};
// //       (SUB_PERMISSIONS[mod.name] || []).forEach(sub => {
// //         newPermissions[mod.name][sub.name] = {
// //           view: true,     // Always true for superadmin
// //           create: false,  // Always false for base submenu
// //           edit: false,    // Always false for base submenu
// //           delete: false,  // Always false for base submenu
// //         };
// //       });
// //     });
// //     return newPermissions;
// //   };

// //   const [formData, setFormData] = useState({
// //     username: '',
// //     password: '',
// //     confirmPassword: '',
// //     companyId: '',
// //     companyName: '',
// //     role: 'employee',
// //     email: '',
// //     phone: '',
// //     address: '',
// //     logo: '',
// //     theme: Object.values(THEMES)[0],
// //     permissions: generateDefaultPermissions('employee'),
// //     status: 'active',
// //     employees: 0,
// //     subscription: 'free',
// //   });

// //   // Handle role change
// //   const handleRoleChange = (role) => {
// //     setFormData(prev => {
// //       // If role is superadmin, set all view permissions to true and others to false
// //       const newPermissions = role === 'superadmin' 
// //         ? autoSetSuperAdminPermissions()
// //         : generateDefaultPermissions(role);
      
// //       return {
// //         ...prev,
// //         role,
// //         permissions: newPermissions
// //       };
// //     });
// //   };

// //   // Load companies from API
// //   useEffect(() => {
// //     fetchCompanies();
// //   }, []);

// //   const fetchCompanies = async () => {
// //     setIsLoading(true);
// //     try {
// //       // Get token from localStorage
// //       const token = localStorage.getItem('authToken') || localStorage.getItem('token');
      
// //       const headers = {
// //         'Content-Type': 'application/json',
// //       };
      
// //       // Add authorization header if token exists
// //       if (token) {
// //         headers['Authorization'] = `Bearer ${token}`;
// //       }

// //       const response = await fetch(`${API_BASE_URL}/api/admin/companies`, {
// //         method: 'GET',
// //         headers: headers,
// //       });

// //       console.log("API Response status:", response.status);
      
// //       if (response.ok) {
// //         const result = await response.json();
// //         console.log("API Response data:", result);
        
// //         // Transform API response to match your frontend structure
// //         const companiesData = result.data || result || [];
// //         console.log("Companies data:", companiesData);
        
// //         const transformedCompanies = companiesData.map(company => ({
// //           id: company.id || company.company_code || Date.now(),
// //           username: company.username || '',
// //           companyId: company.company_code || '',
// //           companyName: company.company_name || company.username || '',
// //           role: company.role || 'employee',
// //           email: company.email || '',
// //           phone: company.phone || '',
// //           address: company.address || '',
// //           logo: company.logo || '',
// //           theme: company.theme || Object.values(THEMES)[0],
// //           permissions: company.permissions || generateDefaultPermissions(company.role || 'employee'),
// //           status: company.status || 'active',
// //           employees: company.employees || 0,
// //           subscription: company.subscription || 'free',
// //           createdAt: company.created_at || new Date().toISOString(),
// //         }));
        
// //         console.log("Transformed companies:", transformedCompanies);
// //         setCompanies(transformedCompanies);
// //       } else {
// //         const errorText = await response.text();
// //         console.error('Failed to fetch companies:', response.status, errorText);
        
// //         // Check if unauthorized
// //         if (response.status === 401 || response.status === 403) {
// //           console.log('Authentication failed, token might be invalid or expired');
// //         }
        
// //         // Fallback to empty array if API fails
// //         setCompanies([]);
// //       }
// //     } catch (error) {
// //       console.error('Error fetching companies:', error);
// //       setCompanies([]);
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   const triggerSuccess = (msg) => {
// //     setSuccessMessage(msg);
// //     setShowSuccess(true);
// //     setTimeout(() => setShowSuccess(false), 3000);
// //   };

// //   const openModal = (company = null) => {
// //     setIsLoading(true);
// //     if (company) {
// //       setEditingCompany(company);
// //       setFormData({
// //         username: company.username || '',
// //         password: '',
// //         confirmPassword: '',
// //         companyId: company.companyId || '',
// //         companyName: company.companyName || company.username || '',
// //         role: company.role || 'employee',
// //         email: company.email || '',
// //         phone: company.phone || '',
// //         address: company.address || '',
// //         logo: company.logo || '',
// //         theme: company.theme || Object.values(THEMES)[0],
// //         permissions: company.permissions || generateDefaultPermissions(company.role || 'employee'),
// //         status: company.status || 'active',
// //         employees: company.employees || 0,
// //         subscription: company.subscription || 'free',
// //       });
// //     } else {
// //       setEditingCompany(null);
// //       setFormData({
// //         username: '',
// //         password: '',
// //         confirmPassword: '',
// //         companyId: '',
// //         companyName: '',
// //         role: 'employee',
// //         email: '',
// //         phone: '',
// //         address: '',
// //         logo: '',
// //         theme: Object.values(THEMES)[0],
// //         permissions: generateDefaultPermissions('employee'),
// //         status: 'active',
// //         employees: 0,
// //         subscription: 'free',
// //       });
// //     }
// //     setOpenModule(null);
// //     setShowPassword(false);
// //     setTimeout(() => {
// //       setIsModalOpen(true);
// //       setIsLoading(false);
// //     }, 300);
// //   };

// //   const closeModal = () => {
// //     setIsModalOpen(false);
// //     setEditingCompany(null);
// //     setIsLoading(false);
// //   };

// //   const togglePermission = (moduleName, permissionName, type) => {
// //     setFormData(prev => ({
// //       ...prev,
// //       permissions: {
// //         ...prev.permissions,
// //         [moduleName]: {
// //           ...prev.permissions[moduleName],
// //           [permissionName]: {
// //             ...prev.permissions[moduleName][permissionName],
// //             [type]: !prev.permissions[moduleName][permissionName][type],
// //           },
// //         },
// //       },
// //     }));
// //   };

// //   const getPerm = (moduleName, permissionName, type) => {
// //     return formData.permissions?.[moduleName]?.[permissionName]?.[type] ?? false;
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();

// //     if (!formData.username.trim() || !formData.companyId.trim()) {
// //       return alert('Username and Company ID are required!');
// //     }
// //     if (!editingCompany && formData.password !== formData.confirmPassword) {
// //       return alert('Passwords do not match!');
// //     }
// //     if (!editingCompany && !formData.password) {
// //       return alert('Password is required for new company!');
// //     }

// //     setIsLoading(true);

// //     try {
// //       // Get token from localStorage - try different common token keys
// //       const token = localStorage.getItem('authToken') || 
// //                     localStorage.getItem('token') || 
// //                     localStorage.getItem('access_token') ||
// //                     localStorage.getItem('jwtToken') ||
// //                     localStorage.getItem('userToken');

// //       // Prepare headers
// //       const headers = {
// //         'Content-Type': 'application/json',
// //       };
      
// //       // Add token only if it exists
// //       if (token) {
// //         headers['Authorization'] = `Bearer ${token}`;
// //       }

// //       // Prepare company data for API
// //       const companyPayload = {
// //         username: formData.username.trim(),
// //         company_name: formData.companyName.trim(),
// //         role: formData.role,
// //         theme: formData.theme?.name || formData.theme || 'black',
// //         address: formData.address.trim(),
// //         phone: formData.phone.trim(),
// //         ...(formData.email && { email: formData.email.trim() }),
// //         ...(formData.password && { password: formData.password }),
// //       };

// //       // API 1: Create Company
// //       const companyUrl = `https://hr.hinzah.com/api/admin/companies/create`;
// //       console.log('Creating company at:', companyUrl);
// //       console.log('Company payload:', companyPayload);
      
// //       const companyResponse = await fetch(companyUrl, {
// //         method: 'POST',
// //         headers: headers,
// //         body: JSON.stringify(companyPayload),
// //       });

// //       console.log('Company response status:', companyResponse.status);
      
// //       if (!companyResponse.ok) {
// //         const errorData = await companyResponse.json().catch(() => ({}));
// //         console.error('Company API error:', errorData);
// //         throw new Error(`Company API failed: ${errorData.message || companyResponse.statusText || 'Unknown error'}`);
// //       }

// //       const companyResult = await companyResponse.json();
// //       console.log('Create API response:', companyResult);

// //       // Extract company code from response - IMPORTANT: Use the response companyCode!
// //       const companyCode = companyResult.data?.companyCode || companyResult.companyCode;
      
// //       if (!companyCode) {
// //         throw new Error('No company code returned from API');
// //       }

// //       console.log('Using company code from API response:', companyCode);
      
// //       // API 2: Set Permissions - Use the companyCode from API response
// //       const permissionsPayload = {
// //         company_code: companyCode, // Use the actual companyCode from response
// //         permissions: formData.permissions
// //       };

// //       console.log('Sending permissions data:', permissionsPayload);
      
// //       // For permissions API
// //       const permissionsResponse = await fetch(`https://hr.hinzah.com/api/company/permissions`, {
// //         method: 'POST',
// //         headers: {
// //           'Content-Type': 'application/json',
// //           'Accept': 'application/json',
// //         },
// //         body: JSON.stringify(permissionsPayload),
// //       });

// //       console.log('Permissions response status:', permissionsResponse.status);
      
// //       if (!permissionsResponse.ok) {
// //         const errorData = await permissionsResponse.json().catch(() => ({}));
// //         console.warn('Permissions API failed:', errorData);
// //         console.warn('Permissions could not be set, but company was created successfully');
// //       } else {
// //         const permissionsResult = await permissionsResponse.json();
// //         console.log('Permissions API response:', permissionsResult);
// //       }

// //       // Refresh the companies list from API
// //       await fetchCompanies();

// //       closeModal();
// //       triggerSuccess('Company created successfully!');
      
// //     } catch (error) {
// //       console.error('API Error:', error);
// //       alert(`Failed to save company: ${error.message}`);
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   const handleDelete = async (id) => {
// //     if (!confirm('Are you sure you want to delete this company permanently?')) return;

// //     setIsDeleting(id);
// //     try {
// //       // API call to delete company
// //       // Note: You might need to adjust the endpoint based on your API
// //       const response = await fetch(`${API_BASE_URL}/api/admin/companies/${id}`, {
// //         method: 'DELETE',
// //         headers: {
// //           'Content-Type': 'application/json',
// //         },
// //       });

// //       if (response.ok) {
// //         // Remove from local state
// //         setCompanies(prev => prev.filter(c => c.id !== id));
// //         triggerSuccess('Company deleted successfully!');
// //       } else {
// //         alert('Failed to delete company from API');
// //       }
// //     } catch (error) {
// //       console.error('Delete error:', error);
// //       alert('Error deleting company');
// //     } finally {
// //       setIsDeleting(null);
// //     }
// //   };

// //   // Filter companies
// //   const filteredCompanies = companies.filter(company => {
// //     const matchesSearch = 
// //       company.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
// //       company.companyId.toLowerCase().includes(searchQuery.toLowerCase()) ||
// //       company.email.toLowerCase().includes(searchQuery.toLowerCase());
    
// //     if (activeFilter === 'all') return matchesSearch;
// //     if (activeFilter === 'active') return matchesSearch && company.status === 'active';
// //     if (activeFilter === 'inactive') return matchesSearch && company.status === 'inactive';
// //     if (activeFilter === 'admin') return matchesSearch && company.role === 'admin';
// //     if (activeFilter === 'superadmin') return matchesSearch && company.role === 'superadmin';
// //     return matchesSearch;
// //   });

// //   // Summary data
// //   const summaryData = {
// //     total: companies.length,
// //     active: companies.filter(c => c.status === 'active').length,
// //     admins: companies.filter(c => c.role === 'admin' || c.role === 'superadmin').length,
// //     employees: companies.reduce((sum, c) => sum + (c.employees || 0), 0),
// //   };

// //   return (
// //     <div className="min-h-screen p-4 md:p-6 lg:p-8 lg:max-w-7xl">
// //       {/* MOBILE HEADER TOGGLE */}
// //       <div className="lg:hidden mb-4">
// //         <button
// //           onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
// //           className="p-2 rounded-lg bg-gray-100"
// //         >
// //           <Menu className="h-5 w-5" />
// //         </button>
// //       </div>

// //       {/* HEADER */}
// //       <div className="mb-6 lg:mb-8">
// //         <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
// //           <div>
// //             <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Company Management</h1>
// //             <p className="text-gray-600 mt-1">Manage all companies and their permissions</p>
// //           </div>
          
// //           <div className="flex items-center gap-3">
// //             <div className="relative flex-1 lg:flex-none">
// //               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
// //               <input
// //                 type="text"
// //                 placeholder="Search companies..."
// //                 value={searchQuery}
// //                 onChange={(e) => setSearchQuery(e.target.value)}
// //                 className={`pl-10 pr-4 py-2 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 ${getRingColor()} focus:border-transparent w-full lg:w-64`}
// //               />
// //             </div>
            
// //             <button 
// //               className="p-2 rounded-xl hover:opacity-90 hidden md:inline-flex"
// //               style={{ 
// //                 backgroundColor: getTextAccent() === '#ea580c' ? '#fff7ed' : getLightBg().includes('bg-') ? undefined : getLightBg(),
// //                 color: getTextAccent()
// //               }}
// //             >
// //               <Filter className="h-5 w-5" />
// //             </button>
            
// //             <button className="relative p-2 hover:bg-gray-100 rounded-xl">
// //               <Bell className="h-5 w-5 text-gray-600" />
// //               <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
// //             </button>
            
// //             <button className="hidden lg:flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-xl text-sm hover:bg-gray-50">
// //               <Settings className="h-4 w-4" /> Settings
// //             </button>
// //           </div>
// //         </div>

// //         {/* Filter Bar */}
// //         <div className={`flex flex-wrap items-center gap-2 mt-6 ${isMobileMenuOpen ? 'block' : 'hidden lg:flex'}`}>
// //           {/* View Toggle - Mobile Only */}
// //           <div className="flex items-center gap-2 p-1 bg-gray-100 rounded-xl lg:hidden">
// //             <button
// //               onClick={() => setViewMode('table')}
// //               className={`px-3 py-1.5 text-sm rounded-lg flex items-center gap-2 ${
// //                 viewMode === 'table' ? 'bg-white shadow-sm' : ''
// //               }`}
// //             >
// //               <List className="h-4 w-4" /> Table
// //             </button>
// //             <button
// //               onClick={() => setViewMode('card')}
// //               className={`px-3 py-1.5 text-sm rounded-lg flex items-center gap-2 ${
// //                 viewMode === 'card' ? 'bg-white shadow-sm' : ''
// //               }`}
// //             >
// //               <Grid className="h-4 w-4" /> Cards
// //             </button>
// //           </div>
          
// //           {/* View Toggle - Desktop Only */}
// //           <div className="hidden lg:flex items-center gap-2 p-1 bg-gray-100 rounded-xl">
// //             <button
// //               onClick={() => setViewMode('table')}
// //               className={`px-3 py-1.5 text-sm rounded-lg flex items-center gap-2 ${
// //                 viewMode === 'table' ? 'bg-white shadow-sm' : ''
// //               }`}
// //             >
// //               <BarChart3 className="h-4 w-4" /> Table
// //             </button>
// //             <button
// //               onClick={() => setViewMode('card')}
// //               className={`px-3 py-1.5 text-sm rounded-lg flex items-center gap-2 ${
// //                 viewMode === 'card' ? 'bg-white shadow-sm' : ''
// //               }`}
// //             >
// //               <Building className="h-4 w-4" /> Cards
// //             </button>
// //           </div>
          
// //           {/* Filter Buttons */}
// //           <div className="flex flex-wrap gap-2">
// //             {['all', 'active', 'inactive', 'admin', 'superadmin'].map((filter) => (
// //               <button
// //                 key={filter}
// //                 onClick={() => setActiveFilter(filter)}
// //                 className={`px-3 py-2 rounded-xl text-sm font-medium capitalize whitespace-nowrap ${
// //                   activeFilter === filter
// //                     ? `${getButtonGradient()} ${getButtonHover()} text-white`
// //                     : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-300'
// //                 }`}
// //               >
// //                 {filter}
// //               </button>
// //             ))}
// //           </div>
// //         </div>
// //       </div>

// //       {/* SUMMARY CARDS - Responsive Grid */}
// //       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6 lg:mb-8">
// //         <div className="bg-white rounded-2xl p-5 lg:p-6 shadow-lg border border-gray-200/50 hover:shadow-xl transition-shadow">
// //           <div className="flex items-center justify-between mb-4">
// //             <div className="p-3 bg-blue-50 rounded-xl">
// //               <Building className="h-6 w-6 text-blue-600" />
// //             </div>
// //             <div className="flex items-center text-sm text-blue-600 font-medium">
// //               <TrendingUp className="h-4 w-4 mr-1" />
// //               +{Math.floor(summaryData.total * 0.2)}
// //             </div>
// //           </div>
// //           <h3 className="text-sm font-medium text-gray-500 mb-1">Total Companies</h3>
// //           <div className="flex items-baseline gap-2">
// //             <p className="text-2xl lg:text-3xl font-bold text-gray-900">{summaryData.total}</p>
// //             <span className="text-sm text-gray-500">registered</span>
// //           </div>
// //           <div className="mt-4 pt-4 border-t border-gray-100">
// //             <div className="flex items-center text-xs text-gray-500">
// //               <Clock className="h-3 w-3 mr-1" /> This month
// //             </div>
// //           </div>
// //         </div>

// //         <div className="bg-white rounded-2xl p-5 lg:p-6 shadow-lg border border-gray-200/50 hover:shadow-xl transition-shadow">
// //           <div className="flex items-center justify-between mb-4">
// //             <div className="p-3 bg-green-50 rounded-xl">
// //               <CheckCircle className="h-6 w-6 text-green-600" />
// //             </div>
// //             <div className="flex items-center text-sm text-green-600 font-medium">
// //               <TrendingUp className="h-4 w-4 mr-1" />
// //               +{Math.floor(summaryData.active * 0.15)}
// //             </div>
// //           </div>
// //           <h3 className="text-sm font-medium text-gray-500 mb-1">Active Companies</h3>
// //           <div className="flex items-baseline gap-2">
// //             <p className="text-2xl lg:text-3xl font-bold text-green-600">{summaryData.active}</p>
// //             <span className="text-sm text-gray-500">operating</span>
// //           </div>
// //           <div className="mt-4 pt-4 border-t border-gray-100">
// //             <div className="text-xs text-gray-500">
// //               {Math.round((summaryData.active / summaryData.total) * 100)}% of total
// //             </div>
// //           </div>
// //         </div>

// //         <div className="bg-white rounded-2xl p-5 lg:p-6 shadow-lg border border-gray-200/50 hover:shadow-xl transition-shadow">
// //           <div className="flex items-center justify-between mb-4">
// //             <div className="p-3 bg-purple-50 rounded-xl">
// //               <ShieldCheck className="h-6 w-6 text-purple-600" />
// //             </div>
// //             <div className="flex items-center text-sm text-purple-600 font-medium">
// //               <TrendingUp className="h-4 w-4 mr-1" />
// //               +{Math.floor(summaryData.admins * 0.1)}
// //             </div>
// //           </div>
// //           <h3 className="text-sm font-medium text-gray-500 mb-1">Administrators</h3>
// //           <div className="flex items-baseline gap-2">
// //             <p className="text-2xl lg:text-3xl font-bold text-purple-600">{summaryData.admins}</p>
// //             <span className="text-sm text-gray-500">admins</span>
// //           </div>
// //           <div className="mt-4 pt-4 border-t border-gray-100">
// //             <div className="flex items-center text-xs text-gray-500">
// //               <Crown className="h-3 w-3 mr-1" /> Super users
// //             </div>
// //           </div>
// //         </div>

// //         <div className="bg-white rounded-2xl p-5 lg:p-6 shadow-lg border border-gray-200/50 hover:shadow-xl transition-shadow">
// //           <div className="flex items-center justify-between mb-4">
// //             <div 
// //               className="p-3 rounded-xl"
// //               style={{ 
// //                 backgroundColor: getTextAccent() === '#ea580c' ? '#fff7ed' : 
// //                                getLightBg().includes('bg-') ? undefined : getLightBg()
// //               }}
// //             >
// //               <UsersIcon 
// //                 className="h-6 w-6"
// //                 style={{ color: getTextAccent() }}
// //               />
// //             </div>
// //             <button className="p-1 hover:bg-gray-100 rounded-lg">
// //               <RefreshCw className="h-5 w-5 text-gray-600" />
// //             </button>
// //           </div>
// //           <h3 className="text-sm font-medium text-gray-500 mb-1">Total Employees</h3>
// //           <div className="flex items-baseline gap-2">
// //             <p className="text-2xl lg:text-3xl font-bold text-gray-900">{summaryData.employees.toLocaleString()}</p>
// //             <span className="text-sm text-gray-500">users</span>
// //           </div>
// //           <div className="mt-4 pt-4 border-t border-gray-100">
// //             <button className="text-sm font-medium text-gray-600 hover:text-gray-900 flex items-center">
// //               View analytics <ArrowRight className="h-4 w-4 ml-1" />
// //             </button>
// //           </div>
// //         </div>
// //       </div>

// //       {/* CREATE COMPANY BUTTON - Mobile Floating */}
// //       <div className="fixed bottom-6 right-6 z-40 lg:hidden">
// //         <button
// //           onClick={() => openModal()}
// //           className={`p-4 ${getButtonGradient()} ${getButtonHover()} text-white rounded-full shadow-xl flex items-center justify-center`}
// //         >
// //           <Plus className="h-6 w-6" />
// //         </button>
// //       </div>

// //       {/* TABLE VIEW */}
// //       {viewMode === 'table' && (
// //         <div className="bg-white lg:max-w-[66rem] rounded-2xl shadow-lg border border-gray-200/50 overflow-hidden">
// //           {/* Table Header */}
// //           <div 
// //             className="border-b border-gray-200"
// //             style={{ 
// //               backgroundColor: getTextAccent() === '#ea580c' ? '#fff7ed' : 
// //                              getLightBg().includes('bg-') ? undefined : getLightBg()
// //             }}
// //           >
// //             <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 sm:p-6 gap-4">
// //               <div>
// //                 <h3 className="text-lg font-bold text-gray-900">Companies</h3>
// //                 <p className="text-sm text-gray-500 mt-1">{filteredCompanies.length} companies found</p>
// //               </div>
              
// //               <div className="flex items-center gap-3">
// //                 <button className="p-2 hover:bg-gray-100 rounded-xl hidden sm:inline-flex">
// //                   <Download className="h-5 w-5 text-gray-600" />
// //                 </button>
// //                 <button className="p-2 hover:bg-gray-100 rounded-xl hidden sm:inline-flex">
// //                   <MoreVertical className="h-5 w-5 text-gray-600" />
// //                 </button>
// //                 <button
// //                   onClick={() => openModal()}
// //                   className={`px-4 py-2 ${getButtonGradient()} ${getButtonHover()} text-white text-sm font-medium rounded-xl flex items-center gap-2 w-full sm:w-auto justify-center`}
// //                 >
// //                   <Plus className="h-4 w-4" /> Create Company
// //                 </button>
// //               </div>
// //             </div>
// //           </div>

// //           {/* Table - Responsive */}
// //           <div className="overflow-x-auto">
// //             <table className="w-full min-w-[850px]">
// //               <thead className="border-b border-gray-200">
// //                 <tr>
// //                   <th className="px-4 sm:px-6 py-4 text-left text-sm font-semibold text-gray-900">Company</th>
// //                   <th className="px-4 sm:px-6 py-4 text-left text-sm font-semibold text-gray-900">ID</th>
// //                   <th className="px-4 sm:px-6 py-4 text-left text-sm font-semibold text-gray-900">Contact</th>
// //                   <th className="px-4 sm:px-6 py-4 text-left text-sm font-semibold text-gray-900">Role</th>
// //                   <th className="px-4 sm:px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
// //                   <th className="px-4 sm:px-6 py-4 text-left text-sm font-semibold text-gray-900">Theme</th>
// //                   <th className="px-4 sm:px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
// //                 </tr>
// //               </thead>
// //               <tbody className="divide-y divide-gray-200">
// //                 {filteredCompanies.map((company) => (
// //                   <tr key={company.id} className="hover:bg-gray-50/50 transition-colors">
// //                     <td className="px-4 sm:px-6 py-4">
// //                       <div className="flex items-center gap-3">
// //                         <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
// //                           {company.logo ? (
// //                             <img src={company.logo} alt="logo" className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg object-cover" />
// //                           ) : (
// //                             <Building className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
// //                           )}
// //                         </div>
// //                         <div className="text-left min-w-0">
// //                           <p className="font-medium text-gray-900 truncate">{company.companyName}</p>
// //                           <p className="text-sm text-gray-500 truncate">{company.username}</p>
// //                         </div>
// //                       </div>
// //                     </td>
// //                     <td className="px-4 sm:px-6 py-4">
// //                       <div className="flex items-center gap-2">
// //                         <code className="text-xs sm:text-sm font-mono bg-gray-100 px-2 py-1 rounded truncate max-w-[80px] sm:max-w-none">
// //                           {company.companyId}
// //                         </code>
// //                         <button className="p-1 hover:bg-gray-100 rounded hidden sm:inline-flex">
// //                           <Copy className="h-3 w-3 text-gray-500" />
// //                         </button>
// //                       </div>
// //                     </td>
// //                     <td className="px-4 sm:px-6 py-4">
// //                       <div className="space-y-1">
// //                         <div className="flex items-center gap-1 text-xs sm:text-sm text-gray-600">
// //                           <Mail className="h-3 w-3 flex-shrink-0" />
// //                           <span className="truncate max-w-[120px] sm:max-w-[180px]">{company.email || 'No email'}</span>
// //                         </div>
// //                         <div className="flex items-center gap-1 text-xs sm:text-sm text-gray-600">
// //                           <Phone className="h-3 w-3 flex-shrink-0" />
// //                           <span className="truncate max-w-[120px] sm:max-w-none">{company.phone || 'No phone'}</span>
// //                         </div>
// //                       </div>
// //                     </td>
// //                     <td className="px-4 sm:px-6 py-4">
// //                       <span className={`inline-flex items-center px-2 sm:px-3 py-1 rounded-lg text-xs sm:text-sm font-medium ${
// //                         company.role === 'superadmin' ? 'bg-purple-100 text-purple-800' :
// //                         company.role === 'admin' ? 'bg-blue-100 text-blue-800' :
// //                         company.role === 'companyleader' ? 'bg-green-100 text-green-800' :
// //                         'bg-gray-100 text-gray-800'
// //                       }`}>
// //                         <Shield className="h-3 w-3 mr-1" />
// //                         <span className="truncate max-w-[60px] sm:max-w-none">
// //                           {company.role.charAt(0).toUpperCase() + company.role.slice(1)}
// //                         </span>
// //                       </span>
// //                     </td>
// //                     <td className="px-4 sm:px-6 py-4">
// //                       <span className={`inline-flex items-center px-2 sm:px-3 py-1 rounded-lg text-xs sm:text-sm font-medium ${
// //                         company.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
// //                       }`}>
// //                         <div className={`w-2 h-2 rounded-full mr-2 ${company.status === 'active' ? 'bg-green-500' : 'bg-red-500'}`} />
// //                         <span className="truncate">
// //                           {company.status.charAt(0).toUpperCase() + company.status.slice(1)}
// //                         </span>
// //                       </span>
// //                     </td>
// //                     <td className="px-4 sm:px-6 py-4">
// //                       <div className="flex items-center gap-2">
// //                         <div 
// //                           className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg shadow-sm flex-shrink-0"
// //                           style={{ 
// //                             background: company.theme.sidebarBg || 
// //                             `linear-gradient(135deg, ${company.theme.gradient?.split(' ')[1] || '#f97316'}, ${company.theme.gradient?.split(' ')[3] || '#ec4899'})`
// //                           }}
// //                         />
// //                         <span className="text-xs sm:text-sm text-gray-700 truncate max-w-[50px] sm:max-w-none">
// //                           {company.theme.name}
// //                         </span>
// //                       </div>
// //                     </td>
// //                     <td className="px-4 sm:px-6 py-4">
// //                       <div className="flex items-center gap-2">
// //                         <button
// //                           onClick={() => openModal(company)}
// //                           className="p-1.5 sm:p-2 hover:bg-blue-50 rounded-lg text-blue-600"
// //                           title="Edit"
// //                         >
// //                           <Edit2 className="h-4 w-4" />
// //                         </button>
// //                         <button
// //                           onClick={() => window.open(`/dashboard?company=${company.id}`, '_blank')}
// //                           className="p-1.5 sm:p-2 hover:bg-green-50 rounded-lg text-green-600"
// //                           title="View Dashboard"
// //                         >
// //                           <Eye className="h-4 w-4" />
// //                         </button>
// //                         <button
// //                           onClick={() => handleDelete(company.id)}
// //                           disabled={isDeleting === company.id}
// //                           className="p-1.5 sm:p-2 hover:bg-red-50 rounded-lg text-red-600 disabled:opacity-50"
// //                           title="Delete"
// //                         >
// //                           {isDeleting === company.id ? (
// //                             <RefreshCw className="h-4 w-4 animate-spin" />
// //                           ) : (
// //                             <Trash2 className="h-4 w-4" />
// //                           )}
// //                         </button>
// //                       </div>
// //                     </td>
// //                   </tr>
// //                 ))}
// //               </tbody>
// //             </table>
// //           </div>

// //           {/* Pagination - Responsive */}
// //           <div className="border-t border-gray-200 px-4 sm:px-6 py-4">
// //             <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
// //               <div className="text-sm text-gray-600">
// //                 Showing <span className="font-medium">{filteredCompanies.length}</span> of{' '}
// //                 <span className="font-medium">{companies.length}</span> companies
// //               </div>
              
// //               <div className="flex items-center justify-between sm:justify-end gap-4">
// //                 <div className="flex items-center gap-2">
// //                   <button
// //                     onClick={() => setPage(Math.max(1, page - 1))}
// //                     disabled={page === 1}
// //                     className="p-2 hover:bg-gray-100 rounded-xl disabled:opacity-50"
// //                   >
// //                     <ChevronLeft className="h-4 w-4" />
// //                   </button>
                  
// //                   <div className="flex items-center gap-2">
// //                     {[1, 2].map(p => (
// //                       <button
// //                         key={p}
// //                         onClick={() => setPage(p)}
// //                         className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg font-medium ${
// //                           page === p
// //                             ? `${getButtonGradient()} text-white`
// //                             : 'text-gray-600 hover:bg-gray-100'
// //                         }`}
// //                       >
// //                         {p}
// //                       </button>
// //                     ))}
// //                   </div>
                  
// //                   <button
// //                     onClick={() => setPage(Math.min(totalPages, page + 1))}
// //                     disabled={page === totalPages}
// //                     className="p-2 hover:bg-gray-100 rounded-xl disabled:opacity-50"
// //                   >
// //                     <ChevronRight className="h-4 w-4" />
// //                   </button>
// //                 </div>
                
// //                 <div className="text-sm text-gray-600 hidden sm:block">
// //                   Page <span className="font-medium">{page}</span> of <span className="font-medium">{totalPages}</span>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       )}

// //       {/* CARD VIEW - Responsive Grid */}
// //       {viewMode === 'card' && (
// //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
// //           {filteredCompanies.map((company) => (
// //             <div key={company.id} className="bg-white rounded-2xl shadow-lg border border-gray-200/50 p-4 lg:p-6">
// //               <div className="flex items-start justify-between mb-4">
// //                 <div className="flex items-center gap-3">
// //                   <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
// //                     {company.logo ? (
// //                       <img src={company.logo} alt="logo" className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg object-cover" />
// //                     ) : (
// //                       <Building className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
// //                     )}
// //                   </div>
// //                   <div className="min-w-0">
// //                     <h3 className="font-bold text-gray-900 truncate">{company.companyName}</h3>
// //                     <div className="flex items-center gap-2 mt-1">
// //                       <code className="text-xs font-mono bg-gray-100 px-2 py-0.5 rounded truncate max-w-[80px]">
// //                         {company.companyId}
// //                       </code>
// //                       <span className={`w-2 h-2 rounded-full ${
// //                         company.status === 'active' ? 'bg-green-500' : 'bg-red-500'
// //                       }`} />
// //                     </div>
// //                   </div>
// //                 </div>
// //                 <button className="p-2 hover:bg-gray-100 rounded-xl">
// //                   <MoreVertical className="h-5 w-5 text-gray-600" />
// //                 </button>
// //               </div>
              
// //               <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
// //                 <div className="flex items-center justify-between">
// //                   <span className="text-sm text-gray-500">Role</span>
// //                   <span className={`px-2 sm:px-3 py-1 rounded-lg text-xs sm:text-sm font-medium truncate max-w-[100px] ${
// //                     company.role === 'superadmin' ? 'bg-purple-100 text-purple-800' :
// //                     company.role === 'admin' ? 'bg-blue-100 text-blue-800' :
// //                     'bg-gray-100 text-gray-800'
// //                   }`}>
// //                     {company.role}
// //                   </span>
// //                 </div>
// //                 <div className="flex items-center justify-between">
// //                   <span className="text-sm text-gray-500">Employees</span>
// //                   <span className="inline-flex items-center px-2 sm:px-3 py-1 rounded-lg text-xs sm:text-sm font-medium bg-blue-100 text-blue-700">
// //                     <Users className="h-3 w-3 sm:h-4 sm:w-4 mr-1" /> {company.employees || 0}
// //                   </span>
// //                 </div>
// //                 <div className="flex items-center justify-between">
// //                   <span className="text-sm text-gray-500">Email</span>
// //                   <span className="font-medium text-gray-900 text-xs sm:text-sm truncate max-w-[120px] sm:max-w-[150px]">
// //                     {company.email || 'No email'}
// //                   </span>
// //                 </div>
// //                 <div className="flex items-center justify-between">
// //                   <span className="text-sm text-gray-500">Theme</span>
// //                   <div className="flex items-center gap-2">
// //                     <div 
// //                       className="w-5 h-5 sm:w-6 sm:h-6 rounded-lg"
// //                       style={{ 
// //                         background: company.theme.sidebarBg || 
// //                         `linear-gradient(135deg, ${company.theme.gradient?.split(' ')[1] || '#f97316'}, ${company.theme.gradient?.split(' ')[3] || '#ec4899'})`
// //                       }}
// //                     />
// //                     <span className="text-xs sm:text-sm text-gray-700 truncate max-w-[50px]">
// //                       {company.theme.name}
// //                     </span>
// //                   </div>
// //                 </div>
// //               </div>
              
// //               <div className="flex items-center justify-between pt-4 border-t border-gray-200">
// //                 <button
// //                   onClick={() => openModal(company)}
// //                   className="text-xs sm:text-sm font-medium text-gray-600 hover:text-gray-900 flex items-center"
// //                 >
// //                   <Edit2 className="h-3 w-3 sm:h-4 sm:w-4 mr-1" /> Edit
// //                 </button>
                
// //                 <div className="flex items-center gap-2">
// //                   <button
// //                     onClick={() => window.open(`/dashboard?company=${company.id}`, '_blank')}
// //                     className="px-2 sm:px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-xs sm:text-sm font-medium hover:bg-blue-200 flex items-center gap-1"
// //                   >
// //                     <Eye className="h-3 w-3" /> View
// //                   </button>
// //                   <button
// //                     onClick={() => handleDelete(company.id)}
// //                     className="px-2 sm:px-3 py-1 bg-red-100 text-red-700 rounded-lg text-xs sm:text-sm font-medium hover:bg-red-200 flex items-center gap-1"
// //                   >
// //                     <Trash2 className="h-3 w-3" />
// //                   </button>
// //                 </div>
// //               </div>
// //             </div>
// //           ))}
// //         </div>
// //       )}

// //       {/* CREATE/EDIT MODAL - Responsive */}
// //       {isModalOpen && (
// //         <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-gray-900/60 backdrop-blur-sm">
// //           <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl w-full max-w-6xl max-h-[90vh] sm:max-h-[95vh] overflow-y-auto">
// //             <div className="sticky top-0 bg-white border-b border-gray-200 z-10">
// //               <div className="flex items-center justify-between p-4 sm:p-6">
// //                 <div>
// //                   <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
// //                     {editingCompany ? 'Edit Company' : 'Create New Company'}
// //                   </h2>
// //                   <p className="text-gray-600 mt-1 text-sm sm:text-base">Manage company details and permissions</p>
// //                 </div>
// //                 <button
// //                   onClick={closeModal}
// //                   className="p-2 hover:bg-gray-100 rounded-xl"
// //                 >
// //                   <X className="h-5 w-5 text-gray-500" />
// //                 </button>
// //               </div>
// //             </div>

// //             <div className="p-4 sm:p-6">
// //               {isLoading ? (
// //                 <div className="flex items-center justify-center py-10 sm:py-20">
// //                   <div className="text-center">
// //                     <RefreshCw 
// //                       className="h-10 w-10 sm:h-12 sm:w-12 animate-spin mx-auto mb-4"
// //                       style={{ color: getAccentColor() }}
// //                     />
// //                     <p className="text-gray-600 text-sm sm:text-base">Loading company data...</p>
// //                   </div>
// //                 </div>
// //               ) : (
// //                 <form onSubmit={handleSubmit}>
// //                   {/* Company Details Section */}
// //                   <div className="mb-6 sm:mb-8">
// //                     <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
// //                       <Building className="h-4 w-4 sm:h-5 sm:w-5" /> Company Details
// //                     </h3>
// //                     <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
// //                       <div className="space-y-4">
// //                         <div>
// //                           <label className="block text-sm font-medium text-gray-700 mb-1">
// //                             Company Name <span className="text-red-600">*</span>
// //                           </label>
// //                           <input
// //                             type="text"
// //                             required
// //                             placeholder="Enter company name"
// //                             value={formData.companyName}
// //                             onChange={e => setFormData(prev => ({ ...prev, companyName: e.target.value }))}
// //                             className={`w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl text-sm focus:outline-none focus:ring-2 ${getRingColor()} focus:border-transparent`}
// //                           />
// //                         </div>
// //                         <div>
// //                           <label className="block text-sm font-medium text-gray-700 mb-1">
// //                             Username <span className="text-red-600">*</span>
// //                           </label>
// //                           <input
// //                             type="text"
// //                             required
// //                             placeholder="Enter username"
// //                             value={formData.username}
// //                             onChange={e => setFormData(prev => ({ ...prev, username: e.target.value }))}
// //                             className={`w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl text-sm focus:outline-none focus:ring-2 ${getRingColor()} focus:border-transparent`}
// //                           />
// //                         </div>
// //                         <div>
// //                           <label className="block text-sm font-medium text-gray-700 mb-1">
// //                             Company ID <span className="text-red-600">*</span>
// //                           </label>
// //                           <div className="flex flex-col sm:flex-row gap-2">
// //                             <input
// //                               type="text"
// //                               required
// //                               placeholder="Enter company ID"
// //                               value={formData.companyId}
// //                               onChange={e => setFormData(prev => ({ ...prev, companyId: e.target.value }))}
// //                               className={`flex-1 px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl text-sm focus:outline-none focus:ring-2 ${getRingColor()} focus:border-transparent`}
// //                             />
// //                             <button
// //                               type="button"
// //                               onClick={() => setFormData(prev => ({ ...prev, companyId: `COMP-${Date.now().toString().slice(-6)}` }))}
// //                               className="px-3 sm:px-4 py-2 sm:py-3 bg-gray-100 text-gray-700 rounded-lg sm:rounded-xl hover:bg-gray-200 text-sm font-medium whitespace-nowrap"
// //                             >
// //                               Generate
// //                             </button>
// //                           </div>
// //                         </div>
// //                       </div>
                      
// //                       <div className="space-y-4">
// //                         <div>
// //                           <label className="block text-sm font-medium text-gray-700 mb-1">
// //                             Email Address
// //                           </label>
// //                           <div className="relative">
// //                             <Mail className="absolute left-3 top-2.5 sm:top-3.5 h-4 w-4 text-gray-400" />
// //                             <input
// //                               type="email"
// //                               placeholder="company@email.com"
// //                               value={formData.email}
// //                               onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
// //                               className={`w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl text-sm focus:outline-none focus:ring-2 ${getRingColor()} focus:border-transparent`}
// //                             />
// //                           </div>
// //                         </div>
// //                         <div>
// //                           <label className="block text-sm font-medium text-gray-700 mb-1">
// //                             Phone Number
// //                           </label>
// //                           <div className="relative">
// //                             <Phone className="absolute left-3 top-2.5 sm:top-3.5 h-4 w-4 text-gray-400" />
// //                             <input
// //                               type="tel"
// //                               placeholder="+1 (555) 123-4567"
// //                               value={formData.phone}
// //                               onChange={e => setFormData(prev => ({ ...prev, phone: e.target.value }))}
// //                               className={`w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl text-sm focus:outline-none focus:ring-2 ${getRingColor()} focus:border-transparent`}
// //                             />
// //                           </div>
// //                         </div>
// //                         <div>
// //                           <label className="block text-sm font-medium text-gray-700 mb-1">
// //                             Address
// //                           </label>
// //                           <div className="relative">
// //                             <MapPin className="absolute left-3 top-2.5 sm:top-3.5 h-4 w-4 text-gray-400" />
// //                             <input
// //                               type="text"
// //                               placeholder="Company address"
// //                               value={formData.address}
// //                               onChange={e => setFormData(prev => ({ ...prev, address: e.target.value }))}
// //                               className={`w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl text-sm focus:outline-none focus:ring-2 ${getRingColor()} focus:border-transparent`}
// //                             />
// //                           </div>
// //                         </div>
// //                       </div>
// //                     </div>
// //                   </div>

// //                   {/* Security & Role Section */}
// //                   <div className="mb-6 sm:mb-8">
// //                     <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
// //                       <Shield className="h-4 w-4 sm:h-5 sm:w-5" /> Security & Role
// //                     </h3>
// //                     <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
// //                       <div>
// //                         <label className="block text-sm font-medium text-gray-700 mb-1">
// //                           Role <span className="text-red-600">*</span>
// //                         </label>
// //                         <select
// //                           value={formData.role}
// //                           onChange={(e) => handleRoleChange(e.target.value)}
// //                           className={`w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl text-sm focus:outline-none focus:ring-2 ${getRingColor()} focus:border-transparent`}
// //                         >
// //                           <option value="employee">Employee</option>
// //                           <option value="companyleader">Company Leader</option>
// //                           <option value="admin">Admin</option>
// //                           <option value="superadmin">Super Admin</option>
// //                         </select>
// //                         {formData.role === 'superadmin' && (
// //                           <p className="text-xs text-purple-600 mt-2 flex items-center gap-1">
// //                             <ShieldCheck className="h-3 w-3" />
// //                             Super Admin: All view permissions are automatically enabled
// //                           </p>
// //                         )}
// //                       </div>
                      
// //                       <div>
// //                         <label className="block text-sm font-medium text-gray-700 mb-1">
// //                           Password {!editingCompany && <span className="text-red-600">*</span>}
// //                         </label>
// //                         <div className="relative">
// //                           <Key className="absolute left-3 top-2.5 sm:top-3.5 h-4 w-4 text-gray-400" />
// //                           <input
// //                             type={showPassword ? 'text' : 'password'}
// //                             placeholder={editingCompany ? 'New password (optional)' : 'Enter password'}
// //                             value={formData.password}
// //                             onChange={e => setFormData(prev => ({ ...prev, password: e.target.value }))}
// //                             className={`w-full pl-9 sm:pl-10 pr-10 sm:pr-12 py-2 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl text-sm focus:outline-none focus:ring-2 ${getRingColor()} focus:border-transparent`}
// //                             required={!editingCompany}
// //                           />
// //                           <button
// //                             type="button"
// //                             onClick={() => setShowPassword(!showPassword)}
// //                             className="absolute right-3 top-2.5 sm:top-3.5 text-gray-500"
// //                           >
// //                             {showPassword ? <Eye className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
// //                           </button>
// //                         </div>
// //                       </div>
                      
// //                       {!editingCompany && (
// //                         <div>
// //                           <label className="block text-sm font-medium text-gray-700 mb-1">
// //                             Confirm Password <span className="text-red-600">*</span>
// //                           </label>
// //                           <div className="relative">
// //                             <Key className="absolute left-3 top-2.5 sm:top-3.5 h-4 w-4 text-gray-400" />
// //                             <input
// //                               type={showPassword ? 'text' : 'password'}
// //                               placeholder="Confirm password"
// //                               value={formData.confirmPassword}
// //                               onChange={e => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
// //                               className={`w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl text-sm focus:outline-none focus:ring-2 ${getRingColor()} focus:border-transparent`}
// //                               required
// //                             />
// //                           </div>
// //                         </div>
// //                       )}
// //                     </div>
// //                   </div>

// //                   {/* Theme Selection */}
// //                   <div className="mb-6 sm:mb-8">
// //                     <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
// //                       <Palette className="h-4 w-4 sm:h-5 sm:w-5" /> Theme Selection
// //                     </h3>
// //                     <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2 sm:gap-3">
// //                       {Object.values(THEMES).map(t => (
// //                         <button
// //                           key={t.id}
// //                           type="button"
// //                           onClick={() => setFormData(prev => ({ ...prev, theme: t }))}
// //                           className={`relative p-2 sm:p-3 rounded-lg sm:rounded-xl border transition-all hover:scale-105 ${
// //                             formData.theme.id === t.id 
// //                               ? 'shadow-lg ring-2 ring-offset-1 sm:ring-offset-2' 
// //                               : 'border-gray-200 hover:border-gray-300'
// //                           } ${formData.theme.id === t.id ? `ring-${t.accent?.replace('600', '500') || 'orange-500'}` : ''}`}
// //                         >
// //                           <div className="h-8 sm:h-12 rounded-lg overflow-hidden flex mb-1 sm:mb-2">
// //                             {t.gradient ? (
// //                               <div className={`w-full h-full ${t.gradient}`} />
// //                             ) : (
// //                               <div className="w-full h-full bg-gradient-to-r from-orange-500 to-orange-600" />
// //                             )}
// //                           </div>
                          
// //                           <div className="text-center">
// //                             <div className="font-medium text-xs text-gray-900 truncate">
// //                               {t.name}
// //                             </div>
// //                             <div className="text-[10px] text-gray-500 truncate">
// //                               {t.accent?.replace('-600', '') || 'Multi'}
// //                             </div>
// //                           </div>
                          
// //                           {formData.theme.id === t.id && (
// //                             <div className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-green-500 rounded-full flex items-center justify-center">
// //                               <Check className="h-2 w-2 sm:h-3 sm:w-3 text-white" />
// //                             </div>
// //                           )}
// //                         </button>
// //                       ))}
// //                     </div>
// //                   </div>

// //                   {/* Permissions Section */}
// //                   <div className="mb-6 sm:mb-8">
// //                     <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
// //                       <h3 className="text-base sm:text-lg font-semibold text-gray-900 flex items-center gap-2">
// //                         <Lock className="h-4 w-4 sm:h-5 sm:w-5" /> Module Permissions
// //                       </h3>
// //                       <div className="flex items-center gap-4 text-xs sm:text-sm">
// //                         <div className="flex items-center gap-2">
// //                           <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full"></div>
// //                           <span>Enabled</span>
// //                         </div>
// //                         <div className="flex items-center gap-2">
// //                           <div className="w-2 h-2 sm:w-3 sm:h-3 bg-gray-300 rounded-full"></div>
// //                           <span>Disabled</span>
// //                         </div>
// //                       </div>
// //                     </div>
                    
// //                     <div className="space-y-3">
// //                       {MODULES.map(mod => (
// //                         <div key={mod.name} className="bg-gray-50 rounded-lg sm:rounded-xl border overflow-hidden">
// //                           <button
// //                             type="button"
// //                             onClick={() => setOpenModule(openModule === mod.name ? null : mod.name)}
// //                             className="w-full flex justify-between items-center p-3 sm:p-4 hover:bg-gray-100 transition-colors"
// //                           >
// //                             <div className="flex items-center gap-3">
// //                               <div className="p-1.5 sm:p-2 bg-white rounded-lg">
// //                                 <mod.icon className="h-4 w-4 sm:h-5 sm:w-5 text-gray-700" />
// //                               </div>
// //                               <div className="text-left">
// //                                 <h4 className="font-semibold text-gray-900 text-sm sm:text-base">{mod.name}</h4>
// //                                 <p className="text-xs sm:text-sm text-gray-500">{(SUB_PERMISSIONS[mod.name] || []).length} permissions</p>
// //                               </div>
// //                             </div>
// //                             {openModule === mod.name ? (
// //                               <ChevronUp className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500" />
// //                             ) : (
// //                               <ChevronDown className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500" />
// //                             )}
// //                           </button>
                          
// //                           {openModule === mod.name && (
// //                             <div className="border-t border-gray-200 p-3 sm:p-4 bg-white">
// //                               <div className="mb-2">
// //                                 {formData.role === 'superadmin' && (
// //                                   <div className="bg-purple-50 border border-purple-200 rounded-lg p-2 sm:p-3 mb-3 sm:mb-4">
// //                                     <p className="text-xs sm:text-sm text-purple-800 flex items-center gap-2">
// //                                       <ShieldCheck className="h-3 w-3 sm:h-4 sm:w-4" />
// //                                       Super Admin: All view permissions are enabled. Other permissions can be manually adjusted.
// //                                     </p>
// //                                   </div>
// //                                 )}
// //                               </div>
// //                               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
// //                                 {(SUB_PERMISSIONS[mod.name] || []).map(perm => (
// //                                   <div key={perm.name} className="bg-gray-50 rounded-lg p-3 sm:p-4">
// //                                     <h5 className="font-medium text-gray-900 mb-2 sm:mb-3 text-sm sm:text-base">{perm.name}</h5>
// //                                     <div className="grid grid-cols-2 gap-1 sm:gap-2">
// //                                       {['view', 'create', 'edit', 'delete'].map(type => {
// //                                         const checked = getPerm(mod.name, perm.name, type);
// //                                         return (
// //                                           <label key={type} className="flex items-center gap-2 cursor-pointer">
// //                                             <div className="relative">
// //                                               <input
// //                                                 type="checkbox"
// //                                                 checked={checked}
// //                                                 onChange={() => togglePermission(mod.name, perm.name, type)}
// //                                                 className="sr-only"
// //                                               />
// //                                               <div className={`w-7 h-4 sm:w-8 sm:h-5 rounded-full transition-colors ${
// //                                                 checked ? 'bg-green-500' : 'bg-gray-300'
// //                                               }`}>
// //                                                 <div className={`absolute top-0.5 left-0.5 w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-white transform transition-transform ${
// //                                                   checked ? 'translate-x-3 sm:translate-x-4' : ''
// //                                                 }`} />
// //                                               </div>
// //                                             </div>
// //                                             <span className="text-xs text-gray-700 capitalize">{type}</span>
// //                                           </label>
// //                                         );
// //                                       })}
// //                                     </div>
// //                                   </div>
// //                                 ))}
// //                               </div>
// //                             </div>
// //                           )}
// //                         </div>
// //                       ))}
// //                     </div>
// //                   </div>

// //                   {/* Form Actions */}
// //                   <div className="flex flex-col sm:flex-row sm:items-center justify-end gap-3 pt-4 sm:pt-6 border-t border-gray-200">
// //                     <button
// //                       type="button"
// //                       onClick={closeModal}
// //                       className="px-4 sm:px-6 py-2 sm:py-3 border border-gray-300 text-gray-700 rounded-lg sm:rounded-xl text-sm font-medium hover:bg-gray-50 order-2 sm:order-1"
// //                     >
// //                       Cancel
// //                     </button>
// //                     <button
// //                       type="submit"
// //                       disabled={isLoading}
// //                       className={`px-6 sm:px-8 py-2 sm:py-3 ${getButtonGradient()} ${getButtonHover()} text-white text-sm font-medium rounded-lg sm:rounded-xl flex items-center justify-center gap-2 disabled:opacity-70 order-1 sm:order-2`}
// //                     >
// //                       {isLoading ? (
// //                         <>
// //                           <RefreshCw className="h-4 w-4 animate-spin" />
// //                           {editingCompany ? 'Updating...' : 'Creating...'}
// //                         </>
// //                       ) : editingCompany ? (
// //                         <>
// //                           <Check className="h-4 w-4" /> Update Company
// //                         </>
// //                       ) : (
// //                         <>
// //                           <Plus className="h-4 w-4" /> Create Company
// //                         </>
// //                       )}
// //                     </button>
// //                   </div>
// //                 </form>
// //               )}
// //             </div>
// //           </div>
// //         </div>
// //       )}

// //       {/* Success Toast */}
// //       {showSuccess && (
// //         <div className="fixed top-4 sm:top-6 right-4 sm:right-6 z-50 bg-green-500 text-white px-4 sm:px-6 py-3 sm:py-4 rounded-xl shadow-xl flex items-center gap-3 animate-fade-in max-w-[90vw] sm:max-w-none">
// //           <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
// //           <span className="font-medium text-sm sm:text-base truncate">{successMessage}</span>
// //           <button
// //             onClick={() => setShowSuccess(false)}
// //             className="ml-2 p-1 hover:bg-green-600 rounded"
// //           >
// //             <X className="h-4 w-4" />
// //           </button>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }


// 'use client';

// import React, { useState, useEffect } from 'react';
// import {
//   Search,
//   Filter,
//   MoreVertical,
//   Plus,
//   X,
//   ChevronLeft,
//   ChevronRight,
//   Check,
//   XCircle,
//   AlertCircle,
//   Download,
//   Settings,
//   Bell,
//   Users,
//   Clock,
//   TrendingUp,
//   TrendingDown,
//   ArrowRight,
//   Eye,
//   Edit2,
//   Trash2,
//   RefreshCw,
//   Building,
//   Shield,
//   Lock,
//   Globe,
//   Palette,
//   Key,
//   User,
//   Calendar,
//   FileText,
//   BarChart3,
//   CreditCard,
//   Mail,
//   Phone,
//   MapPin,
//   CheckCircle,
//   XCircle as XCircleIcon,
//   MoreHorizontal,
//   Copy,
//   QrCode,
//   ShieldCheck,
//   UserPlus,
//   Users as UsersIcon,
//   Star,
//   Crown,
//   Zap,
//   ChevronDown,
//   ChevronUp,
//   Menu,
//   Grid,
//   List,
//   Navigation, // Added for location icon
//   Target // Added for location icon
// } from 'lucide-react';
// import { useTheme } from './ThemeContext';
// import { THEMES } from './ThemeContext';
// import { MODULES, SUB_PERMISSIONS } from './data/navdata';

// export default function Company() {
//   const { theme: appTheme } = useTheme();
//   const [companies, setCompanies] = useState([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [editingCompany, setEditingCompany] = useState(null);
//   const [showPassword, setShowPassword] = useState(false);
//   const [openModule, setOpenModule] = useState(null);
  
//   // Location state
//   const [isGettingLocation, setIsGettingLocation] = useState(false);
  
//   // Loading & Feedback
//   const [isLoading, setIsLoading] = useState(false);
//   const [isDeleting, setIsDeleting] = useState(null);
//   const [showSuccess, setShowSuccess] = useState(false);
//   const [successMessage, setSuccessMessage] = useState('');
//   const [searchQuery, setSearchQuery] = useState('');
//   const [activeFilter, setActiveFilter] = useState('all');
//   const [viewMode, setViewMode] = useState('table');
//   const [page, setPage] = useState(1);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const totalPages = 2;

//   // API Base URLs
//   const API_BASE_URL = 'https://hr.hinzah.com';
  
//   // Theme helper functions
//   const getAccentColor = () => appTheme?.accentColor || '#ea580c';
//   const getBorderColor = () => appTheme?.borderColor || '#ea580c';
//   const getTextAccent = () => appTheme?.accentColor || '#ea580c';
//   const getButtonGradient = () => {
//     if (appTheme?.buttonGradient) {
//       return `bg-gradient-to-r ${appTheme.buttonGradient}`;
//     }
//     return 'bg-gradient-to-r from-orange-500 to-orange-600';
//   };
//   const getButtonHover = () => appTheme?.buttonHover || 'hover:from-orange-600 hover:to-orange-700';
//   const getLightBg = () => appTheme?.lightBg || 'bg-orange-50';
//   const getRingColor = () => appTheme?.ringColor || 'ring-orange-500';
  
//   // Helper to get text color class based on theme
//   const getTextColorClass = () => {
//     if (appTheme?.textAccent) {
//       return appTheme.textAccent;
//     }
//     return 'text-orange-600';
//   };

//   // Default permissions based on role
//   const generateDefaultPermissions = (role = 'employee') => {
//     const perms = {};
//     MODULES.forEach(mod => {
//       perms[mod.name] = {};
//       (SUB_PERMISSIONS[mod.name] || []).forEach(sub => {
//         perms[mod.name][sub.name] = {
//           view: role === 'superadmin', // true for superadmin, false for others
//           create: false,
//           edit: false,
//           delete: false,
//         };
//       });
//     });
//     return perms;
//   };

//   // Auto-set permissions when role changes to superadmin
//   const autoSetSuperAdminPermissions = () => {
//     const newPermissions = {};
//     MODULES.forEach(mod => {
//       newPermissions[mod.name] = {};
//       (SUB_PERMISSIONS[mod.name] || []).forEach(sub => {
//         newPermissions[mod.name][sub.name] = {
//           view: true,     // Always true for superadmin
//           create: false,  // Always false for base submenu
//           edit: false,    // Always false for base submenu
//           delete: false,  // Always false for base submenu
//         };
//       });
//     });
//     return newPermissions;
//   };

//   const [formData, setFormData] = useState({
//     username: '',
//     password: '',
//     confirmPassword: '',
//     companyId: '',
//     companyName: '',
//     role: 'employee',
//     email: '',
//     phone: '',
//     address: '',
//     logo: '',
//     theme: Object.values(THEMES)[0],
//     permissions: generateDefaultPermissions('employee'),
//     status: 'active',
//     employees: 0,
//     subscription: 'free',
//     // Location fields
//     latitude: '',
//     longitude: '',
//     location_name: '',
//     office_address: '',
//     work_location_type: '',
//     radius: '',
//     branch: ''
//   });

//   // Handle role change
//   const handleRoleChange = (role) => {
//     setFormData(prev => {
//       const newPermissions = role === 'superadmin' 
//         ? autoSetSuperAdminPermissions()
//         : generateDefaultPermissions(role);
      
//       return {
//         ...prev,
//         role,
//         permissions: newPermissions
//       };
//     });
//   };

//   // Function to get current location
//   const getCurrentLocation = () => {
//     if (!navigator.geolocation) {
//       alert('Geolocation is not supported by your browser');
//       return;
//     }

//     setIsGettingLocation(true);
    
//     navigator.geolocation.getCurrentPosition(
//       (position) => {
//         const { latitude, longitude } = position.coords;
//         setFormData(prev => ({
//           ...prev,
//           latitude: latitude.toString(),
//           longitude: longitude.toString()
//         }));
//         setIsGettingLocation(false);
        
//         // Reverse geocode to get location name
//         fetchLocationName(latitude, longitude);
//       },
//       (error) => {
//         console.error('Error getting location:', error);
//         setIsGettingLocation(false);
//         alert(`Unable to get your location: ${error.message}`);
//       },
//       {
//         enableHighAccuracy: true,
//         timeout: 5000,
//         maximumAge: 0
//       }
//     );
//   };

//   // Function to fetch location name from coordinates
//   const fetchLocationName = async (lat, lng) => {
//     try {
//       const response = await fetch(
//         `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`
//       );
//       const data = await response.json();
      
//       if (data.display_name) {
//         setFormData(prev => ({
//           ...prev,
//           location_name: data.display_name,
//           office_address: data.display_name
//         }));
//       }
//     } catch (error) {
//       console.error('Error fetching location name:', error);
//     }
//   };

//   // Function to fetch coordinates from location name
//   const fetchCoordinatesFromAddress = async () => {
//     if (!formData.office_address) return;
    
//     try {
//       setIsGettingLocation(true);
//       const response = await fetch(
//         `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(formData.office_address)}`
//       );
//       const data = await response.json();
      
//       if (data && data.length > 0) {
//         setFormData(prev => ({
//           ...prev,
//           latitude: data[0].lat,
//           longitude: data[0].lon,
//           location_name: data[0].display_name
//         }));
//       }
//       setIsGettingLocation(false);
//     } catch (error) {
//       console.error('Error fetching coordinates:', error);
//       setIsGettingLocation(false);
//     }
//   };

//   // Load companies from API
//   useEffect(() => {
//     fetchCompanies();
//   }, []);

//   const fetchCompanies = async () => {
//     setIsLoading(true);
//     try {
//       const token = localStorage.getItem('authToken') || localStorage.getItem('token');
      
//       const headers = {
//         'Content-Type': 'application/json',
//       };
      
//       if (token) {
//         headers['Authorization'] = `Bearer ${token}`;
//       }

//       const response = await fetch(`${API_BASE_URL}/api/admin/companies`, {
//         method: 'GET',
//         headers: headers,
//       });

//       console.log("API Response status:", response.status);
      
//       if (response.ok) {
//         const result = await response.json();
//         console.log("API Response data:", result);
        
//         const companiesData = result.data || result || [];
//         console.log("Companies data:", companiesData);
        
//         const transformedCompanies = companiesData.map(company => ({
//           id: company.id || company.company_code || Date.now(),
//           username: company.username || '',
//           companyId: company.company_code || '',
//           companyName: company.company_name || company.username || '',
//           role: company.role || 'employee',
//           email: company.email || '',
//           phone: company.phone || '',
//           address: company.address || '',
//           logo: company.logo || '',
//           theme: company.theme || Object.values(THEMES)[0],
//           permissions: company.permissions || generateDefaultPermissions(company.role || 'employee'),
//           status: company.status || 'active',
//           employees: company.employees || 0,
//           subscription: company.subscription || 'free',
//           createdAt: company.created_at || new Date().toISOString(),
//           // Location fields
//           latitude: company.latitude || '',
//           longitude: company.longitude || '',
//           location_name: company.location_name || '',
//           office_address: company.office_address || '',
//           work_location_type: company.work_location_type || '',
//           radius: company.radius || '',
//           branch: company.branch || ''
//         }));
        
//         console.log("Transformed companies:", transformedCompanies);
//         setCompanies(transformedCompanies);
//       } else {
//         const errorText = await response.text();
//         console.error('Failed to fetch companies:', response.status, errorText);
//         setCompanies([]);
//       }
//     } catch (error) {
//       console.error('Error fetching companies:', error);
//       setCompanies([]);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const triggerSuccess = (msg) => {
//     setSuccessMessage(msg);
//     setShowSuccess(true);
//     setTimeout(() => setShowSuccess(false), 3000);
//   };

//   const openModal = (company = null) => {
//     setIsLoading(true);
//     if (company) {
//       setEditingCompany(company);
//       setFormData({
//         username: company.username || '',
//         password: '',
//         confirmPassword: '',
//         companyId: company.companyId || '',
//         companyName: company.companyName || company.username || '',
//         role: company.role || 'employee',
//         email: company.email || '',
//         phone: company.phone || '',
//         address: company.address || '',
//         logo: company.logo || '',
//         theme: company.theme || Object.values(THEMES)[0],
//         permissions: company.permissions || generateDefaultPermissions(company.role || 'employee'),
//         status: company.status || 'active',
//         employees: company.employees || 0,
//         subscription: company.subscription || 'free',
//         // Location fields
//         latitude: company.latitude || '',
//         longitude: company.longitude || '',
//         location_name: company.location_name || '',
//         office_address: company.office_address || company.address || '',
//         work_location_type: company.work_location_type || '',
//         radius: company.radius || '',
//         branch: company.branch || ''
//       });
//     } else {
//       setEditingCompany(null);
//       setFormData({
//         username: '',
//         password: '',
//         confirmPassword: '',
//         companyId: '',
//         companyName: '',
//         role: 'employee',
//         email: '',
//         phone: '',
//         address: '',
//         logo: '',
//         theme: Object.values(THEMES)[0],
//         permissions: generateDefaultPermissions('employee'),
//         status: 'active',
//         employees: 0,
//         subscription: 'free',
//         // Location fields
//         latitude: '',
//         longitude: '',
//         location_name: '',
//         office_address: '',
//         work_location_type: '',
//         radius: '',
//         branch: ''
//       });
//     }
//     setOpenModule(null);
//     setShowPassword(false);
//     setIsGettingLocation(false);
//     setTimeout(() => {
//       setIsModalOpen(true);
//       setIsLoading(false);
//     }, 300);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//     setEditingCompany(null);
//     setIsLoading(false);
//     setIsGettingLocation(false);
//   };

//   const togglePermission = (moduleName, permissionName, type) => {
//     setFormData(prev => ({
//       ...prev,
//       permissions: {
//         ...prev.permissions,
//         [moduleName]: {
//           ...prev.permissions[moduleName],
//           [permissionName]: {
//             ...prev.permissions[moduleName][permissionName],
//             [type]: !prev.permissions[moduleName][permissionName][type],
//           },
//         },
//       },
//     }));
//   };

//   const getPerm = (moduleName, permissionName, type) => {
//     return formData.permissions?.[moduleName]?.[permissionName]?.[type] ?? false;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!formData.username.trim() || !formData.companyId.trim()) {
//       return alert('Username and Company ID are required!');
//     }
//     if (!editingCompany && formData.password !== formData.confirmPassword) {
//       return alert('Passwords do not match!');
//     }
//     if (!editingCompany && !formData.password) {
//       return alert('Password is required for new company!');
//     }

//     setIsLoading(true);

//     try {
//       const token = localStorage.getItem('authToken') || 
//                     localStorage.getItem('token') || 
//                     localStorage.getItem('access_token') ||
//                     localStorage.getItem('jwtToken') ||
//                     localStorage.getItem('userToken');

//       const headers = {
//         'Content-Type': 'application/json',
//       };
      
//       if (token) {
//         headers['Authorization'] = `Bearer ${token}`;
//       }

//       // Prepare company data for API - INCLUDING LOCATION FIELDS
//       const companyPayload = {
//         username: formData.username.trim(),
//         company_name: formData.companyName.trim(),
//         role: formData.role,
//         theme: formData.theme?.name || formData.theme || 'black',
//         address: formData.address.trim(),
//         phone: formData.phone.trim(),
//         ...(formData.email && { email: formData.email.trim() }),
//         ...(formData.password && { password: formData.password }),
//         // Location fields
//         latitude: formData.latitude || null,
//         longitude: formData.longitude || null,
//         // location_name: formData.location_name || '',
//         // office_address: formData.office_address || '',
//         // work_location_type: formData.work_location_type || '',
//         // radius: formData.radius || null,
//         // branch: formData.branch || ''
//       };

//       // API 1: Create Company
//       const companyUrl = `https://hr.hinzah.com/api/admin/companies/create`;
//       console.log('Creating company at:', companyUrl);
//       console.log('Company payload with location:', companyPayload);
      
//       const companyResponse = await fetch(companyUrl, {
//         method: 'POST',
//         headers: headers,
//         body: JSON.stringify(companyPayload),
//       });

//       console.log('Company response status:', companyResponse.status);
      
//       if (!companyResponse.ok) {
//         const errorData = await companyResponse.json().catch(() => ({}));
//         console.error('Company API error:', errorData);
//         throw new Error(`Company API failed: ${errorData.message || companyResponse.statusText || 'Unknown error'}`);
//       }

//       const companyResult = await companyResponse.json();
//       console.log('Create API response:', companyResult);

//       const companyCode = companyResult.data?.companyCode || companyResult.companyCode;
      
//       if (!companyCode) {
//         throw new Error('No company code returned from API');
//       }

//       console.log('Using company code from API response:', companyCode);
      
//       // API 2: Set Permissions
//       const permissionsPayload = {
//         company_code: companyCode,
//         permissions: formData.permissions
//       };

//       console.log('Sending permissions data:', permissionsPayload);
      
//       const permissionsResponse = await fetch(`https://hr.hinzah.com/api/company/permissions`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Accept': 'application/json',
//         },
//         body: JSON.stringify(permissionsPayload),
//       });

//       console.log('Permissions response status:', permissionsResponse.status);
      
//       if (!permissionsResponse.ok) {
//         const errorData = await permissionsResponse.json().catch(() => ({}));
//         console.warn('Permissions API failed:', errorData);
//         console.warn('Permissions could not be set, but company was created successfully');
//       } else {
//         const permissionsResult = await permissionsResponse.json();
//         console.log('Permissions API response:', permissionsResult);
//       }

//       await fetchCompanies();
//       closeModal();
//       triggerSuccess('Company created successfully!');
      
//     } catch (error) {
//       console.error('API Error:', error);
//       alert(`Failed to save company: ${error.message}`);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!confirm('Are you sure you want to delete this company permanently?')) return;

//     setIsDeleting(id);
//     try {
//       const response = await fetch(`${API_BASE_URL}/api/admin/companies/${id}`, {
//         method: 'DELETE',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });

//       if (response.ok) {
//         setCompanies(prev => prev.filter(c => c.id !== id));
//         triggerSuccess('Company deleted successfully!');
//       } else {
//         alert('Failed to delete company from API');
//       }
//     } catch (error) {
//       console.error('Delete error:', error);
//       alert('Error deleting company');
//     } finally {
//       setIsDeleting(null);
//     }
//   };

//   // Filter companies
//   const filteredCompanies = companies.filter(company => {
//     const matchesSearch = 
//       company.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       company.companyId.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       company.email.toLowerCase().includes(searchQuery.toLowerCase());
    
//     if (activeFilter === 'all') return matchesSearch;
//     if (activeFilter === 'active') return matchesSearch && company.status === 'active';
//     if (activeFilter === 'inactive') return matchesSearch && company.status === 'inactive';
//     if (activeFilter === 'admin') return matchesSearch && company.role === 'admin';
//     if (activeFilter === 'superadmin') return matchesSearch && company.role === 'superadmin';
//     return matchesSearch;
//   });

//   // Summary data
//   const summaryData = {
//     total: companies.length,
//     active: companies.filter(c => c.status === 'active').length,
//     admins: companies.filter(c => c.role === 'admin' || c.role === 'superadmin').length,
//     employees: companies.reduce((sum, c) => sum + (c.employees || 0), 0),
//   };

//   return (
//     <div className="min-h-screen p-4 md:p-6 lg:p-8 lg:max-w-7xl">
//       {/* MOBILE HEADER TOGGLE */}
//       <div className="lg:hidden mb-4">
//         <button
//           onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//           className="p-2 rounded-lg bg-gray-100"
//         >
//           <Menu className="h-5 w-5" />
//         </button>
//       </div>

//       {/* HEADER */}
//       <div className="mb-6 lg:mb-8">
//         <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
//           <div>
//             <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Company Management</h1>
//             <p className="text-gray-600 mt-1">Manage all companies and their permissions</p>
//           </div>
          
//           <div className="flex items-center gap-3">
//             <div className="relative flex-1 lg:flex-none">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
//               <input
//                 type="text"
//                 placeholder="Search companies..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className={`pl-10 pr-4 py-2 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 ${getRingColor()} focus:border-transparent w-full lg:w-64`}
//               />
//             </div>
            
//             <button 
//               className="p-2 rounded-xl hover:opacity-90 hidden md:inline-flex"
//               style={{ 
//                 backgroundColor: getTextAccent() === '#ea580c' ? '#fff7ed' : getLightBg().includes('bg-') ? undefined : getLightBg(),
//                 color: getTextAccent()
//               }}
//             >
//               <Filter className="h-5 w-5" />
//             </button>
            
//             <button className="relative p-2 hover:bg-gray-100 rounded-xl">
//               <Bell className="h-5 w-5 text-gray-600" />
//               <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
//             </button>
            
//             <button className="hidden lg:flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-xl text-sm hover:bg-gray-50">
//               <Settings className="h-4 w-4" /> Settings
//             </button>
//           </div>
//         </div>

//         {/* Filter Bar */}
//         <div className={`flex flex-wrap items-center gap-2 mt-6 ${isMobileMenuOpen ? 'block' : 'hidden lg:flex'}`}>
//           {/* View Toggle - Mobile Only */}
//           <div className="flex items-center gap-2 p-1 bg-gray-100 rounded-xl lg:hidden">
//             <button
//               onClick={() => setViewMode('table')}
//               className={`px-3 py-1.5 text-sm rounded-lg flex items-center gap-2 ${
//                 viewMode === 'table' ? 'bg-white shadow-sm' : ''
//               }`}
//             >
//               <List className="h-4 w-4" /> Table
//             </button>
//             <button
//               onClick={() => setViewMode('card')}
//               className={`px-3 py-1.5 text-sm rounded-lg flex items-center gap-2 ${
//                 viewMode === 'card' ? 'bg-white shadow-sm' : ''
//               }`}
//             >
//               <Grid className="h-4 w-4" /> Cards
//             </button>
//           </div>
          
//           {/* View Toggle - Desktop Only */}
//           <div className="hidden lg:flex items-center gap-2 p-1 bg-gray-100 rounded-xl">
//             <button
//               onClick={() => setViewMode('table')}
//               className={`px-3 py-1.5 text-sm rounded-lg flex items-center gap-2 ${
//                 viewMode === 'table' ? 'bg-white shadow-sm' : ''
//               }`}
//             >
//               <BarChart3 className="h-4 w-4" /> Table
//             </button>
//             <button
//               onClick={() => setViewMode('card')}
//               className={`px-3 py-1.5 text-sm rounded-lg flex items-center gap-2 ${
//                 viewMode === 'card' ? 'bg-white shadow-sm' : ''
//               }`}
//             >
//               <Building className="h-4 w-4" /> Cards
//             </button>
//           </div>
          
//           {/* Filter Buttons */}
//           <div className="flex flex-wrap gap-2">
//             {['all', 'active', 'inactive', 'admin', 'superadmin'].map((filter) => (
//               <button
//                 key={filter}
//                 onClick={() => setActiveFilter(filter)}
//                 className={`px-3 py-2 rounded-xl text-sm font-medium capitalize whitespace-nowrap ${
//                   activeFilter === filter
//                     ? `${getButtonGradient()} ${getButtonHover()} text-white`
//                     : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-300'
//                 }`}
//               >
//                 {filter}
//               </button>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* SUMMARY CARDS */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6 lg:mb-8">
//         {/* ... (Summary cards remain the same) ... */}
//       </div>

//       {/* CREATE COMPANY BUTTON - Mobile Floating */}
//       <div className="fixed bottom-6 right-6 z-40 lg:hidden">
//         <button
//           onClick={() => openModal()}
//           className={`p-4 ${getButtonGradient()} ${getButtonHover()} text-white rounded-full shadow-xl flex items-center justify-center`}
//         >
//           <Plus className="h-6 w-6" />
//         </button>
//       </div>

//       {/* TABLE VIEW */}
//       {viewMode === 'table' && (
//         <div className="bg-white lg:max-w-[66rem] rounded-2xl shadow-lg border border-gray-200/50 overflow-hidden">
//           {/* Table Header */}
//           <div 
//             className="border-b border-gray-200"
//             style={{ 
//               backgroundColor: getTextAccent() === '#ea580c' ? '#fff7ed' : 
//                              getLightBg().includes('bg-') ? undefined : getLightBg()
//             }}
//           >
//             <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 sm:p-6 gap-4">
//               <div>
//                 <h3 className="text-lg font-bold text-gray-900">Companies</h3>
//                 <p className="text-sm text-gray-500 mt-1">{filteredCompanies.length} companies found</p>
//               </div>
              
//               <div className="flex items-center gap-3">
//                 <button className="p-2 hover:bg-gray-100 rounded-xl hidden sm:inline-flex">
//                   <Download className="h-5 w-5 text-gray-600" />
//                 </button>
//                 <button className="p-2 hover:bg-gray-100 rounded-xl hidden sm:inline-flex">
//                   <MoreVertical className="h-5 w-5 text-gray-600" />
//                 </button>
//                 <button
//                   onClick={() => openModal()}
//                   className={`px-4 py-2 ${getButtonGradient()} ${getButtonHover()} text-white text-sm font-medium rounded-xl flex items-center gap-2 w-full sm:w-auto justify-center`}
//                 >
//                   <Plus className="h-4 w-4" /> Create Company
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* Table - Responsive */}
//           <div className="overflow-x-auto">
//             <table className="w-full min-w-[850px]">
//               <thead className="border-b border-gray-200">
//                 <tr>
//                   <th className="px-4 sm:px-6 py-4 text-left text-sm font-semibold text-gray-900">Company</th>
//                   <th className="px-4 sm:px-6 py-4 text-left text-sm font-semibold text-gray-900">ID</th>
//                   <th className="px-4 sm:px-6 py-4 text-left text-sm font-semibold text-gray-900">Contact</th>
//                   <th className="px-4 sm:px-6 py-4 text-left text-sm font-semibold text-gray-900">Location</th>
//                   <th className="px-4 sm:px-6 py-4 text-left text-sm font-semibold text-gray-900">Role</th>
//                   <th className="px-4 sm:px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
//                   <th className="px-4 sm:px-6 py-4 text-left text-sm font-semibold text-gray-900">Theme</th>
//                   <th className="px-4 sm:px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-200">
//                 {filteredCompanies.map((company) => (
//                   <tr key={company.id} className="hover:bg-gray-50/50 transition-colors">
//                     <td className="px-4 sm:px-6 py-4">
//                       <div className="flex items-center gap-3">
//                         <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
//                           {company.logo ? (
//                             <img src={company.logo} alt="logo" className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg object-cover" />
//                           ) : (
//                             <Building className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
//                           )}
//                         </div>
//                         <div className="text-left min-w-0">
//                           <p className="font-medium text-gray-900 truncate">{company.companyName}</p>
//                           <p className="text-sm text-gray-500 truncate">{company.username}</p>
//                         </div>
//                       </div>
//                     </td>
//                     <td className="px-4 sm:px-6 py-4">
//                       <div className="flex items-center gap-2">
//                         <code className="text-xs sm:text-sm font-mono bg-gray-100 px-2 py-1 rounded truncate max-w-[80px] sm:max-w-none">
//                           {company.companyId}
//                         </code>
//                         <button className="p-1 hover:bg-gray-100 rounded hidden sm:inline-flex">
//                           <Copy className="h-3 w-3 text-gray-500" />
//                         </button>
//                       </div>
//                     </td>
//                     <td className="px-4 sm:px-6 py-4">
//                       <div className="space-y-1">
//                         <div className="flex items-center gap-1 text-xs sm:text-sm text-gray-600">
//                           <Mail className="h-3 w-3 flex-shrink-0" />
//                           <span className="truncate max-w-[120px] sm:max-w-[180px]">{company.email || 'No email'}</span>
//                         </div>
//                         <div className="flex items-center gap-1 text-xs sm:text-sm text-gray-600">
//                           <Phone className="h-3 w-3 flex-shrink-0" />
//                           <span className="truncate max-w-[120px] sm:max-w-none">{company.phone || 'No phone'}</span>
//                         </div>
//                       </div>
//                     </td>
//                     <td className="px-4 sm:px-6 py-4">
//                       <div className="space-y-1">
//                         {company.latitude && company.longitude ? (
//                           <>
//                             <div className="flex items-center gap-1 text-xs sm:text-sm text-gray-600">
//                               <Target className="h-3 w-3 flex-shrink-0 text-blue-500" />
//                               <span className="truncate max-w-[100px] sm:max-w-[150px]">
//                                 {company.latitude.slice(0, 8)}, {company.longitude.slice(0, 8)}
//                               </span>
//                             </div>
//                             {company.location_name && (
//                               <div className="text-xs text-gray-500 truncate max-w-[100px] sm:max-w-[150px]">
//                                 {company.location_name}
//                               </div>
//                             )}
//                           </>
//                         ) : (
//                           <div className="flex items-center gap-1 text-xs sm:text-sm text-gray-400">
//                             <MapPin className="h-3 w-3 flex-shrink-0" />
//                             <span>No location set</span>
//                           </div>
//                         )}
//                       </div>
//                     </td>
//                     <td className="px-4 sm:px-6 py-4">
//                       <span className={`inline-flex items-center px-2 sm:px-3 py-1 rounded-lg text-xs sm:text-sm font-medium ${
//                         company.role === 'superadmin' ? 'bg-purple-100 text-purple-800' :
//                         company.role === 'admin' ? 'bg-blue-100 text-blue-800' :
//                         company.role === 'companyleader' ? 'bg-green-100 text-green-800' :
//                         'bg-gray-100 text-gray-800'
//                       }`}>
//                         <Shield className="h-3 w-3 mr-1" />
//                         <span className="truncate max-w-[60px] sm:max-w-none">
//                           {company.role.charAt(0).toUpperCase() + company.role.slice(1)}
//                         </span>
//                       </span>
//                     </td>
//                     <td className="px-4 sm:px-6 py-4">
//                       <span className={`inline-flex items-center px-2 sm:px-3 py-1 rounded-lg text-xs sm:text-sm font-medium ${
//                         company.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
//                       }`}>
//                         <div className={`w-2 h-2 rounded-full mr-2 ${company.status === 'active' ? 'bg-green-500' : 'bg-red-500'}`} />
//                         <span className="truncate">
//                           {company.status.charAt(0).toUpperCase() + company.status.slice(1)}
//                         </span>
//                       </span>
//                     </td>
//                     <td className="px-4 sm:px-6 py-4">
//                       <div className="flex items-center gap-2">
//                         <div 
//                           className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg shadow-sm flex-shrink-0"
//                           style={{ 
//                             background: company.theme.sidebarBg || 
//                             `linear-gradient(135deg, ${company.theme.gradient?.split(' ')[1] || '#f97316'}, ${company.theme.gradient?.split(' ')[3] || '#ec4899'})`
//                           }}
//                         />
//                         <span className="text-xs sm:text-sm text-gray-700 truncate max-w-[50px] sm:max-w-none">
//                           {company.theme.name}
//                         </span>
//                       </div>
//                     </td>
//                     <td className="px-4 sm:px-6 py-4">
//                       <div className="flex items-center gap-2">
//                         <button
//                           onClick={() => openModal(company)}
//                           className="p-1.5 sm:p-2 hover:bg-blue-50 rounded-lg text-blue-600"
//                           title="Edit"
//                         >
//                           <Edit2 className="h-4 w-4" />
//                         </button>
//                         <button
//                           onClick={() => window.open(`/dashboard?company=${company.id}`, '_blank')}
//                           className="p-1.5 sm:p-2 hover:bg-green-50 rounded-lg text-green-600"
//                           title="View Dashboard"
//                         >
//                           <Eye className="h-4 w-4" />
//                         </button>
//                         <button
//                           onClick={() => handleDelete(company.id)}
//                           disabled={isDeleting === company.id}
//                           className="p-1.5 sm:p-2 hover:bg-red-50 rounded-lg text-red-600 disabled:opacity-50"
//                           title="Delete"
//                         >
//                           {isDeleting === company.id ? (
//                             <RefreshCw className="h-4 w-4 animate-spin" />
//                           ) : (
//                             <Trash2 className="h-4 w-4" />
//                           )}
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           {/* Pagination */}
//           <div className="border-t border-gray-200 px-4 sm:px-6 py-4">
//             <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
//               <div className="text-sm text-gray-600">
//                 Showing <span className="font-medium">{filteredCompanies.length}</span> of{' '}
//                 <span className="font-medium">{companies.length}</span> companies
//               </div>
              
//               <div className="flex items-center justify-between sm:justify-end gap-4">
//                 <div className="flex items-center gap-2">
//                   <button
//                     onClick={() => setPage(Math.max(1, page - 1))}
//                     disabled={page === 1}
//                     className="p-2 hover:bg-gray-100 rounded-xl disabled:opacity-50"
//                   >
//                     <ChevronLeft className="h-4 w-4" />
//                   </button>
                  
//                   <div className="flex items-center gap-2">
//                     {[1, 2].map(p => (
//                       <button
//                         key={p}
//                         onClick={() => setPage(p)}
//                         className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg font-medium ${
//                           page === p
//                             ? `${getButtonGradient()} text-white`
//                             : 'text-gray-600 hover:bg-gray-100'
//                         }`}
//                       >
//                         {p}
//                       </button>
//                     ))}
//                   </div>
                  
//                   <button
//                     onClick={() => setPage(Math.min(totalPages, page + 1))}
//                     disabled={page === totalPages}
//                     className="p-2 hover:bg-gray-100 rounded-xl disabled:opacity-50"
//                   >
//                     <ChevronRight className="h-4 w-4" />
//                   </button>
//                 </div>
                
//                 <div className="text-sm text-gray-600 hidden sm:block">
//                   Page <span className="font-medium">{page}</span> of <span className="font-medium">{totalPages}</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* CARD VIEW */}
//       {viewMode === 'card' && (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
//           {filteredCompanies.map((company) => (
//             <div key={company.id} className="bg-white rounded-2xl shadow-lg border border-gray-200/50 p-4 lg:p-6">
//               <div className="flex items-start justify-between mb-4">
//                 <div className="flex items-center gap-3">
//                   <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
//                     {company.logo ? (
//                       <img src={company.logo} alt="logo" className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg object-cover" />
//                     ) : (
//                       <Building className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
//                     )}
//                   </div>
//                   <div className="min-w-0">
//                     <h3 className="font-bold text-gray-900 truncate">{company.companyName}</h3>
//                     <div className="flex items-center gap-2 mt-1">
//                       <code className="text-xs font-mono bg-gray-100 px-2 py-0.5 rounded truncate max-w-[80px]">
//                         {company.companyId}
//                       </code>
//                       <span className={`w-2 h-2 rounded-full ${
//                         company.status === 'active' ? 'bg-green-500' : 'bg-red-500'
//                       }`} />
//                     </div>
//                   </div>
//                 </div>
//                 <button className="p-2 hover:bg-gray-100 rounded-xl">
//                   <MoreVertical className="h-5 w-5 text-gray-600" />
//                 </button>
//               </div>
              
//               <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
//                 <div className="flex items-center justify-between">
//                   <span className="text-sm text-gray-500">Role</span>
//                   <span className={`px-2 sm:px-3 py-1 rounded-lg text-xs sm:text-sm font-medium truncate max-w-[100px] ${
//                     company.role === 'superadmin' ? 'bg-purple-100 text-purple-800' :
//                     company.role === 'admin' ? 'bg-blue-100 text-blue-800' :
//                     'bg-gray-100 text-gray-800'
//                   }`}>
//                     {company.role}
//                   </span>
//                 </div>
//                 <div className="flex items-center justify-between">
//                   <span className="text-sm text-gray-500">Employees</span>
//                   <span className="inline-flex items-center px-2 sm:px-3 py-1 rounded-lg text-xs sm:text-sm font-medium bg-blue-100 text-blue-700">
//                     <Users className="h-3 w-3 sm:h-4 sm:w-4 mr-1" /> {company.employees || 0}
//                   </span>
//                 </div>
//                 <div className="flex items-center justify-between">
//                   <span className="text-sm text-gray-500">Location</span>
//                   <span className="font-medium text-gray-900 text-xs sm:text-sm truncate max-w-[120px] sm:max-w-[150px]">
//                     {company.latitude && company.longitude 
//                       ? `${company.latitude.slice(0, 7)}, ${company.longitude.slice(0, 7)}`
//                       : 'No location'}
//                   </span>
//                 </div>
//                 <div className="flex items-center justify-between">
//                   <span className="text-sm text-gray-500">Theme</span>
//                   <div className="flex items-center gap-2">
//                     <div 
//                       className="w-5 h-5 sm:w-6 sm:h-6 rounded-lg"
//                       style={{ 
//                         background: company.theme.sidebarBg || 
//                         `linear-gradient(135deg, ${company.theme.gradient?.split(' ')[1] || '#f97316'}, ${company.theme.gradient?.split(' ')[3] || '#ec4899'})`
//                       }}
//                     />
//                     <span className="text-xs sm:text-sm text-gray-700 truncate max-w-[50px]">
//                       {company.theme.name}
//                     </span>
//                   </div>
//                 </div>
//               </div>
              
//               <div className="flex items-center justify-between pt-4 border-t border-gray-200">
//                 <button
//                   onClick={() => openModal(company)}
//                   className="text-xs sm:text-sm font-medium text-gray-600 hover:text-gray-900 flex items-center"
//                 >
//                   <Edit2 className="h-3 w-3 sm:h-4 sm:w-4 mr-1" /> Edit
//                 </button>
                
//                 <div className="flex items-center gap-2">
//                   <button
//                     onClick={() => window.open(`/dashboard?company=${company.id}`, '_blank')}
//                     className="px-2 sm:px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-xs sm:text-sm font-medium hover:bg-blue-200 flex items-center gap-1"
//                   >
//                     <Eye className="h-3 w-3" /> View
//                   </button>
//                   <button
//                     onClick={() => handleDelete(company.id)}
//                     className="px-2 sm:px-3 py-1 bg-red-100 text-red-700 rounded-lg text-xs sm:text-sm font-medium hover:bg-red-200 flex items-center gap-1"
//                   >
//                     <Trash2 className="h-3 w-3" />
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* CREATE/EDIT MODAL */}
//       {isModalOpen && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-gray-900/60 backdrop-blur-sm">
//           <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl w-full max-w-6xl max-h-[90vh] sm:max-h-[95vh] overflow-y-auto">
//             <div className="sticky top-0 bg-white border-b border-gray-200 z-10">
//               <div className="flex items-center justify-between p-4 sm:p-6">
//                 <div>
//                   <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
//                     {editingCompany ? 'Edit Company' : 'Create New Company'}
//                   </h2>
//                   <p className="text-gray-600 mt-1 text-sm sm:text-base">Manage company details and permissions</p>
//                 </div>
//                 <button
//                   onClick={closeModal}
//                   className="p-2 hover:bg-gray-100 rounded-xl"
//                 >
//                   <X className="h-5 w-5 text-gray-500" />
//                 </button>
//               </div>
//             </div>

//             <div className="p-4 sm:p-6">
//               {isLoading ? (
//                 <div className="flex items-center justify-center py-10 sm:py-20">
//                   <div className="text-center">
//                     <RefreshCw 
//                       className="h-10 w-10 sm:h-12 sm:w-12 animate-spin mx-auto mb-4"
//                       style={{ color: getAccentColor() }}
//                     />
//                     <p className="text-gray-600 text-sm sm:text-base">Loading company data...</p>
//                   </div>
//                 </div>
//               ) : (
//                 <form onSubmit={handleSubmit}>
//                   {/* Company Details Section */}
//                   <div className="mb-6 sm:mb-8">
//                     <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
//                       <Building className="h-4 w-4 sm:h-5 sm:w-5" /> Company Details
//                     </h3>
//                     <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
//                       <div className="space-y-4">
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-1">
//                             Company Name <span className="text-red-600">*</span>
//                           </label>
//                           <input
//                             type="text"
//                             required
//                             placeholder="Enter company name"
//                             value={formData.companyName}
//                             onChange={e => setFormData(prev => ({ ...prev, companyName: e.target.value }))}
//                             className={`w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl text-sm focus:outline-none focus:ring-2 ${getRingColor()} focus:border-transparent`}
//                           />
//                         </div>
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-1">
//                             Username <span className="text-red-600">*</span>
//                           </label>
//                           <input
//                             type="text"
//                             required
//                             placeholder="Enter username"
//                             value={formData.username}
//                             onChange={e => setFormData(prev => ({ ...prev, username: e.target.value }))}
//                             className={`w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl text-sm focus:outline-none focus:ring-2 ${getRingColor()} focus:border-transparent`}
//                           />
//                         </div>
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-1">
//                             Company ID <span className="text-red-600">*</span>
//                           </label>
//                           <div className="flex flex-col sm:flex-row gap-2">
//                             <input
//                               type="text"
//                               required
//                               placeholder="Enter company ID"
//                               value={formData.companyId}
//                               onChange={e => setFormData(prev => ({ ...prev, companyId: e.target.value }))}
//                               className={`flex-1 px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl text-sm focus:outline-none focus:ring-2 ${getRingColor()} focus:border-transparent`}
//                             />
//                             <button
//                               type="button"
//                               onClick={() => setFormData(prev => ({ ...prev, companyId: `COMP-${Date.now().toString().slice(-6)}` }))}
//                               className="px-3 sm:px-4 py-2 sm:py-3 bg-gray-100 text-gray-700 rounded-lg sm:rounded-xl hover:bg-gray-200 text-sm font-medium whitespace-nowrap"
//                             >
//                               Generate
//                             </button>
//                           </div>
//                         </div>
//                       </div>
                      
//                       <div className="space-y-4">
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-1">
//                             Email Address
//                           </label>
//                           <div className="relative">
//                             <Mail className="absolute left-3 top-2.5 sm:top-3.5 h-4 w-4 text-gray-400" />
//                             <input
//                               type="email"
//                               placeholder="company@email.com"
//                               value={formData.email}
//                               onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
//                               className={`w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl text-sm focus:outline-none focus:ring-2 ${getRingColor()} focus:border-transparent`}
//                             />
//                           </div>
//                         </div>
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-1">
//                             Phone Number
//                           </label>
//                           <div className="relative">
//                             <Phone className="absolute left-3 top-2.5 sm:top-3.5 h-4 w-4 text-gray-400" />
//                             <input
//                               type="tel"
//                               placeholder="+1 (555) 123-4567"
//                               value={formData.phone}
//                               onChange={e => setFormData(prev => ({ ...prev, phone: e.target.value }))}
//                               className={`w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl text-sm focus:outline-none focus:ring-2 ${getRingColor()} focus:border-transparent`}
//                             />
//                           </div>
//                         </div>
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-1">
//                             Address
//                           </label>
//                           <div className="relative">
//                             <MapPin className="absolute left-3 top-2.5 sm:top-3.5 h-4 w-4 text-gray-400" />
//                             <input
//                               type="text"
//                               placeholder="Company address"
//                               value={formData.address}
//                               onChange={e => setFormData(prev => ({ ...prev, address: e.target.value }))}
//                               className={`w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl text-sm focus:outline-none focus:ring-2 ${getRingColor()} focus:border-transparent`}
//                             />
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Location Information Section */}
//                   <div className="mb-6 sm:mb-8">
//                     <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
//                       <MapPin className="h-4 w-4 sm:h-5 sm:w-5" /> Location Information
//                     </h3>
//                     <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
//                       <div className="space-y-4">
//                         {/* <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-1">
//                             Office Address
//                           </label>
//                           <div className="flex gap-2">
//                             <div className="relative flex-1">
//                               <MapPin className="absolute left-3 top-2.5 sm:top-3.5 h-4 w-4 text-gray-400" />
//                               <input
//                                 type="text"
//                                 placeholder="Full office address"
//                                 value={formData.office_address}
//                                 onChange={e => setFormData(prev => ({ ...prev, office_address: e.target.value }))}
//                                 className={`w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl text-sm focus:outline-none focus:ring-2 ${getRingColor()} focus:border-transparent`}
//                               />
//                             </div>
//                             <button
//                               type="button"
//                               onClick={fetchCoordinatesFromAddress}
//                               disabled={!formData.office_address || isGettingLocation}
//                               className="px-3 sm:px-4 py-2 sm:py-3 bg-blue-100 text-blue-700 rounded-lg sm:rounded-xl hover:bg-blue-200 text-sm font-medium whitespace-nowrap disabled:opacity-50"
//                             >
//                               {isGettingLocation ? 'Getting...' : 'Get Coords'}
//                             </button>
//                           </div>
//                         </div> */}
                        
                        
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-1">
//                             Latitude
//                           </label>
//                           <div className="relative">
//                             <input
//                               type="text"
//                               placeholder="e.g., 12.9716"
//                               value={formData.latitude}
//                               onChange={e => setFormData(prev => ({ ...prev, latitude: e.target.value }))}
//                               className={`w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl text-sm focus:outline-none focus:ring-2 ${getRingColor()} focus:border-transparent`}
//                             />
//                           </div>
//                         </div>
                        
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-1">
//                             Longitude
//                           </label>
//                           <div className="relative">
//                             <input
//                               type="text"
//                               placeholder="e.g., 77.5946"
//                               value={formData.longitude}
//                               onChange={e => setFormData(prev => ({ ...prev, longitude: e.target.value }))}
//                               className={`w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl text-sm focus:outline-none focus:ring-2 ${getRingColor()} focus:border-transparent`}
//                             />
//                           </div>
//                         </div>
//                       </div>
                      
//                       <div className="space-y-4">
//                         {/* <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-1">
//                             Location Name
//                           </label>
//                           <input
//                             type="text"
//                             placeholder="e.g., Main Office, Bangalore"
//                             value={formData.location_name}
//                             onChange={e => setFormData(prev => ({ ...prev, location_name: e.target.value }))}
//                             className={`w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl text-sm focus:outline-none focus:ring-2 ${getRingColor()} focus:border-transparent`}
//                           />
//                         </div> */}
                        
//                         {/* <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-1">
//                             Work Location Type
//                           </label>
//                           <select
//                             value={formData.work_location_type}
//                             onChange={e => setFormData(prev => ({ ...prev, work_location_type: e.target.value }))}
//                             className={`w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl text-sm focus:outline-none focus:ring-2 ${getRingColor()} focus:border-transparent`}
//                           >
//                             <option value="">Select Type</option>
//                             <option value="head_office">Head Office</option>
//                             <option value="branch_office">Branch Office</option>
//                             <option value="client_site">Client Site</option>
//                             <option value="home">Home</option>
//                             <option value="co_working">Co-working Space</option>
//                           </select>
//                         </div> */}
                        
//                         {/* <div className="grid grid-cols-2 gap-4">
//                           <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-1">
//                               Radius (meters)
//                             </label>
//                             <input
//                               type="number"
//                               placeholder="e.g., 100"
//                               value={formData.radius}
//                               onChange={e => setFormData(prev => ({ ...prev, radius: e.target.value }))}
//                               className={`w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl text-sm focus:outline-none focus:ring-2 ${getRingColor()} focus:border-transparent`}
//                               min="0"
//                             />
//                           </div>
                          
//                           <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-1">
//                               Branch
//                             </label>
//                             <input
//                               type="text"
//                               placeholder="e.g., North Branch"
//                               value={formData.branch}
//                               onChange={e => setFormData(prev => ({ ...prev, branch: e.target.value }))}
//                               className={`w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl text-sm focus:outline-none focus:ring-2 ${getRingColor()} focus:border-transparent`}
//                             />
//                           </div>
//                         </div> */}
// {/*                         
//                         <div>
//                           <button
//                             type="button"
//                             onClick={getCurrentLocation}
//                             disabled={isGettingLocation}
//                             className={`w-full px-4 sm:px-6 py-2 sm:py-3 ${getButtonGradient()} ${getButtonHover()} text-white text-sm font-medium rounded-lg sm:rounded-xl flex items-center justify-center gap-2 disabled:opacity-70`}
//                           >
//                             {isGettingLocation ? (
//                               <>
//                                 <RefreshCw className="h-4 w-4 animate-spin" />
//                                 Getting Location...
//                               </>
//                             ) : (
//                               <>
//                                 <Navigation className="h-4 w-4" />
//                                 Use Current Location
//                               </>
//                             )}
//                           </button>
//                         </div> */}
//                       </div>
//                     </div>
//                   </div>

//                   {/* Security & Role Section */}
//                   <div className="mb-6 sm:mb-8">
//                     <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
//                       <Shield className="h-4 w-4 sm:h-5 sm:w-5" /> Security & Role
//                     </h3>
//                     <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                           Role <span className="text-red-600">*</span>
//                         </label>
//                         <select
//                           value={formData.role}
//                           onChange={(e) => handleRoleChange(e.target.value)}
//                           className={`w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl text-sm focus:outline-none focus:ring-2 ${getRingColor()} focus:border-transparent`}
//                         >
//                           <option value="employee">Employee</option>
//                           <option value="companyleader">Company Leader</option>
//                           <option value="admin">Admin</option>
//                           <option value="superadmin">Super Admin</option>
//                         </select>
//                         {formData.role === 'superadmin' && (
//                           <p className="text-xs text-purple-600 mt-2 flex items-center gap-1">
//                             <ShieldCheck className="h-3 w-3" />
//                             Super Admin: All view permissions are automatically enabled
//                           </p>
//                         )}
//                       </div>
                      
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                           Password {!editingCompany && <span className="text-red-600">*</span>}
//                         </label>
//                         <div className="relative">
//                           <Key className="absolute left-3 top-2.5 sm:top-3.5 h-4 w-4 text-gray-400" />
//                           <input
//                             type={showPassword ? 'text' : 'password'}
//                             placeholder={editingCompany ? 'New password (optional)' : 'Enter password'}
//                             value={formData.password}
//                             onChange={e => setFormData(prev => ({ ...prev, password: e.target.value }))}
//                             className={`w-full pl-9 sm:pl-10 pr-10 sm:pr-12 py-2 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl text-sm focus:outline-none focus:ring-2 ${getRingColor()} focus:border-transparent`}
//                             required={!editingCompany}
//                           />
//                           <button
//                             type="button"
//                             onClick={() => setShowPassword(!showPassword)}
//                             className="absolute right-3 top-2.5 sm:top-3.5 text-gray-500"
//                           >
//                             {showPassword ? <Eye className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
//                           </button>
//                         </div>
//                       </div>
                      
//                       {!editingCompany && (
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-1">
//                             Confirm Password <span className="text-red-600">*</span>
//                           </label>
//                           <div className="relative">
//                             <Key className="absolute left-3 top-2.5 sm:top-3.5 h-4 w-4 text-gray-400" />
//                             <input
//                               type={showPassword ? 'text' : 'password'}
//                               placeholder="Confirm password"
//                               value={formData.confirmPassword}
//                               onChange={e => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
//                               className={`w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl text-sm focus:outline-none focus:ring-2 ${getRingColor()} focus:border-transparent`}
//                               required
//                             />
//                           </div>
//                         </div>
//                       )}
//                     </div>
//                   </div>

//                   {/* Theme Selection */}
//                   <div className="mb-6 sm:mb-8">
//                     <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
//                       <Palette className="h-4 w-4 sm:h-5 sm:w-5" /> Theme Selection
//                     </h3>
//                     <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2 sm:gap-3">
//                       {Object.values(THEMES).map(t => (
//                         <button
//                           key={t.id}
//                           type="button"
//                           onClick={() => setFormData(prev => ({ ...prev, theme: t }))}
//                           className={`relative p-2 sm:p-3 rounded-lg sm:rounded-xl border transition-all hover:scale-105 ${
//                             formData.theme.id === t.id 
//                               ? 'shadow-lg ring-2 ring-offset-1 sm:ring-offset-2' 
//                               : 'border-gray-200 hover:border-gray-300'
//                           } ${formData.theme.id === t.id ? `ring-${t.accent?.replace('600', '500') || 'orange-500'}` : ''}`}
//                         >
//                           <div className="h-8 sm:h-12 rounded-lg overflow-hidden flex mb-1 sm:mb-2">
//                             {t.gradient ? (
//                               <div className={`w-full h-full ${t.gradient}`} />
//                             ) : (
//                               <div className="w-full h-full bg-gradient-to-r from-orange-500 to-orange-600" />
//                             )}
//                           </div>
                          
//                           <div className="text-center">
//                             <div className="font-medium text-xs text-gray-900 truncate">
//                               {t.name}
//                             </div>
//                             <div className="text-[10px] text-gray-500 truncate">
//                               {t.accent?.replace('-600', '') || 'Multi'}
//                             </div>
//                           </div>
                          
//                           {formData.theme.id === t.id && (
//                             <div className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-green-500 rounded-full flex items-center justify-center">
//                               <Check className="h-2 w-2 sm:h-3 sm:w-3 text-white" />
//                             </div>
//                           )}
//                         </button>
//                       ))}
//                     </div>
//                   </div>

//                   {/* Permissions Section */}
//                   <div className="mb-6 sm:mb-8">
//                     <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
//                       <h3 className="text-base sm:text-lg font-semibold text-gray-900 flex items-center gap-2">
//                         <Lock className="h-4 w-4 sm:h-5 sm:w-5" /> Module Permissions
//                       </h3>
//                       <div className="flex items-center gap-4 text-xs sm:text-sm">
//                         <div className="flex items-center gap-2">
//                           <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full"></div>
//                           <span>Enabled</span>
//                         </div>
//                         <div className="flex items-center gap-2">
//                           <div className="w-2 h-2 sm:w-3 sm:h-3 bg-gray-300 rounded-full"></div>
//                           <span>Disabled</span>
//                         </div>
//                       </div>
//                     </div>
                    
//                     <div className="space-y-3">
//                       {MODULES.map(mod => (
//                         <div key={mod.name} className="bg-gray-50 rounded-lg sm:rounded-xl border overflow-hidden">
//                           <button
//                             type="button"
//                             onClick={() => setOpenModule(openModule === mod.name ? null : mod.name)}
//                             className="w-full flex justify-between items-center p-3 sm:p-4 hover:bg-gray-100 transition-colors"
//                           >
//                             <div className="flex items-center gap-3">
//                               <div className="p-1.5 sm:p-2 bg-white rounded-lg">
//                                 <mod.icon className="h-4 w-4 sm:h-5 sm:w-5 text-gray-700" />
//                               </div>
//                               <div className="text-left">
//                                 <h4 className="font-semibold text-gray-900 text-sm sm:text-base">{mod.name}</h4>
//                                 <p className="text-xs sm:text-sm text-gray-500">{(SUB_PERMISSIONS[mod.name] || []).length} permissions</p>
//                               </div>
//                             </div>
//                             {openModule === mod.name ? (
//                               <ChevronUp className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500" />
//                             ) : (
//                               <ChevronDown className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500" />
//                             )}
//                           </button>
                          
//                           {openModule === mod.name && (
//                             <div className="border-t border-gray-200 p-3 sm:p-4 bg-white">
//                               <div className="mb-2">
//                                 {formData.role === 'superadmin' && (
//                                   <div className="bg-purple-50 border border-purple-200 rounded-lg p-2 sm:p-3 mb-3 sm:mb-4">
//                                     <p className="text-xs sm:text-sm text-purple-800 flex items-center gap-2">
//                                       <ShieldCheck className="h-3 w-3 sm:h-4 sm:w-4" />
//                                       Super Admin: All view permissions are enabled. Other permissions can be manually adjusted.
//                                     </p>
//                                   </div>
//                                 )}
//                               </div>
//                               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
//                                 {(SUB_PERMISSIONS[mod.name] || []).map(perm => (
//                                   <div key={perm.name} className="bg-gray-50 rounded-lg p-3 sm:p-4">
//                                     <h5 className="font-medium text-gray-900 mb-2 sm:mb-3 text-sm sm:text-base">{perm.name}</h5>
//                                     <div className="grid grid-cols-2 gap-1 sm:gap-2">
//                                       {['view', 'create', 'edit', 'delete'].map(type => {
//                                         const checked = getPerm(mod.name, perm.name, type);
//                                         return (
//                                           <label key={type} className="flex items-center gap-2 cursor-pointer">
//                                             <div className="relative">
//                                               <input
//                                                 type="checkbox"
//                                                 checked={checked}
//                                                 onChange={() => togglePermission(mod.name, perm.name, type)}
//                                                 className="sr-only"
//                                               />
//                                               <div className={`w-7 h-4 sm:w-8 sm:h-5 rounded-full transition-colors ${
//                                                 checked ? 'bg-green-500' : 'bg-gray-300'
//                                               }`}>
//                                                 <div className={`absolute top-0.5 left-0.5 w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-white transform transition-transform ${
//                                                   checked ? 'translate-x-3 sm:translate-x-4' : ''
//                                                 }`} />
//                                               </div>
//                                             </div>
//                                             <span className="text-xs text-gray-700 capitalize">{type}</span>
//                                           </label>
//                                         );
//                                       })}
//                                     </div>
//                                   </div>
//                                 ))}
//                               </div>
//                             </div>
//                           )}
//                         </div>
//                       ))}
//                     </div>
//                   </div>

//                   {/* Form Actions */}
//                   <div className="flex flex-col sm:flex-row sm:items-center justify-end gap-3 pt-4 sm:pt-6 border-t border-gray-200">
//                     <button
//                       type="button"
//                       onClick={closeModal}
//                       className="px-4 sm:px-6 py-2 sm:py-3 border border-gray-300 text-gray-700 rounded-lg sm:rounded-xl text-sm font-medium hover:bg-gray-50 order-2 sm:order-1"
//                     >
//                       Cancel
//                     </button>
//                     <button
//                       type="submit"
//                       disabled={isLoading}
//                       className={`px-6 sm:px-8 py-2 sm:py-3 ${getButtonGradient()} ${getButtonHover()} text-white text-sm font-medium rounded-lg sm:rounded-xl flex items-center justify-center gap-2 disabled:opacity-70 order-1 sm:order-2`}
//                     >
//                       {isLoading ? (
//                         <>
//                           <RefreshCw className="h-4 w-4 animate-spin" />
//                           {editingCompany ? 'Updating...' : 'Creating...'}
//                         </>
//                       ) : editingCompany ? (
//                         <>
//                           <Check className="h-4 w-4" /> Update Company
//                         </>
//                       ) : (
//                         <>
//                           <Plus className="h-4 w-4" /> Create Company
//                         </>
//                       )}
//                     </button>
//                   </div>
//                 </form>
//               )}
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Success Toast */}
//       {showSuccess && (
//         <div className="fixed top-4 sm:top-6 right-4 sm:right-6 z-50 bg-green-500 text-white px-4 sm:px-6 py-3 sm:py-4 rounded-xl shadow-xl flex items-center gap-3 animate-fade-in max-w-[90vw] sm:max-w-none">
//           <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
//           <span className="font-medium text-sm sm:text-base truncate">{successMessage}</span>
//           <button
//             onClick={() => setShowSuccess(false)}
//             className="ml-2 p-1 hover:bg-green-600 rounded"
//           >
//             <X className="h-4 w-4" />
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }

'use client';

import React, { useState, useEffect } from 'react';
import {
  Search,
  Filter,
  MoreVertical,
  Plus,
  X,
  ChevronLeft,
  ChevronRight,
  Check,
  XCircle,
  AlertCircle,
  Download,
  Settings,
  Bell,
  Users,
  Clock,
  TrendingUp,
  TrendingDown,
  ArrowRight,
  Eye,
  Edit2,
  Trash2,
  RefreshCw,
  Building,
  Shield,
  Lock,
  Globe,
  Palette,
  Key,
  User,
  Calendar,
  FileText,
  BarChart3,
  CreditCard,
  Mail,
  Phone,
  MapPin,
  CheckCircle,
  XCircle as XCircleIcon,
  MoreHorizontal,
  Copy,
  QrCode,
  ShieldCheck,
  UserPlus,
  Users as UsersIcon,
  Star,
  Crown,
  Zap,
  ChevronDown,
  ChevronUp,
  Menu,
  Grid,
  List,
  Navigation,
  Target,
  Sun,
  Moon,
  Briefcase,
  Watch
} from 'lucide-react';
import { useTheme } from './ThemeContext';
import { THEMES } from './ThemeContext';
import { MODULES, SUB_PERMISSIONS } from './data/navdata';

export default function Company() {
  const { theme: appTheme } = useTheme();
  const [companies, setCompanies] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCompany, setEditingCompany] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [openModule, setOpenModule] = useState(null);
  
  // Location state
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  
  // Loading & Feedback
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [viewMode, setViewMode] = useState('table');
  const [page, setPage] = useState(1);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const totalPages = 2;

  // API Base URLs
  const API_BASE_URL = 'https://hr.hinzah.com';
  
  // Theme helper functions
  const getAccentColor = () => appTheme?.accentColor || '#ea580c';
  const getBorderColor = () => appTheme?.borderColor || '#ea580c';
  const getTextAccent = () => appTheme?.accentColor || '#ea580c';
  const getButtonGradient = () => {
    if (appTheme?.buttonGradient) {
      return `bg-gradient-to-r ${appTheme.buttonGradient}`;
    }
    return 'bg-gradient-to-r from-orange-500 to-orange-600';
  };
  const getButtonHover = () => appTheme?.buttonHover || 'hover:from-orange-600 hover:to-orange-700';
  const getLightBg = () => appTheme?.lightBg || 'bg-orange-50';
  const getRingColor = () => appTheme?.ringColor || 'ring-orange-500';
  
  // Helper to get text color class based on theme
  const getTextColorClass = () => {
    if (appTheme?.textAccent) {
      return appTheme.textAccent;
    }
    return 'text-orange-600';
  };

  // Default permissions based on role
  const generateDefaultPermissions = (role = 'employee') => {
    const perms = {};
    MODULES.forEach(mod => {
      perms[mod.name] = {};
      (SUB_PERMISSIONS[mod.name] || []).forEach(sub => {
        perms[mod.name][sub.name] = {
          view: role === 'superadmin', // true for superadmin, false for others
          create: false,
          edit: false,
          delete: false,
        };
      });
    });
    return perms;
  };

  // Auto-set permissions when role changes to superadmin
  const autoSetSuperAdminPermissions = () => {
    const newPermissions = {};
    MODULES.forEach(mod => {
      newPermissions[mod.name] = {};
      (SUB_PERMISSIONS[mod.name] || []).forEach(sub => {
        newPermissions[mod.name][sub.name] = {
          view: true,     // Always true for superadmin
          create: false,  // Always false for base submenu
          edit: false,    // Always false for base submenu
          delete: false,  // Always false for base submenu
        };
      });
    });
    return newPermissions;
  };

  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    companyId: '',
    companyName: '',
    role: 'employee',
    email: '',
    phone: '',
    address: '',
    logo: '',
    theme: Object.values(THEMES)[0],
    permissions: generateDefaultPermissions('employee'),
    status: 'active',
    employees: 0,
    subscription: 'free',
    
    // Office Timings
    office_check_in: '09:00',
    office_check_out: '17:00',
    
    // Location fields
    latitude: '',
    longitude: '',
    location_name: '',
    office_address: '',
    work_location_type: '',
    radius: '',
    branch: ''
  });

  // Handle role change
  const handleRoleChange = (role) => {
    setFormData(prev => {
      const newPermissions = role === 'superadmin' 
        ? autoSetSuperAdminPermissions()
        : generateDefaultPermissions(role);
      
      return {
        ...prev,
        role,
        permissions: newPermissions
      };
    });
  };

  // Function to get current location
  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser');
      return;
    }

    setIsGettingLocation(true);
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setFormData(prev => ({
          ...prev,
          latitude: latitude.toString(),
          longitude: longitude.toString()
        }));
        setIsGettingLocation(false);
        
        // Reverse geocode to get location name
        fetchLocationName(latitude, longitude);
      },
      (error) => {
        console.error('Error getting location:', error);
        setIsGettingLocation(false);
        alert(`Unable to get your location: ${error.message}`);
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      }
    );
  };

  // Function to fetch location name from coordinates
  const fetchLocationName = async (lat, lng) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`
      );
      const data = await response.json();
      
      if (data.display_name) {
        setFormData(prev => ({
          ...prev,
          location_name: data.display_name,
          office_address: data.display_name
        }));
      }
    } catch (error) {
      console.error('Error fetching location name:', error);
    }
  };

  // Function to fetch coordinates from location name
  const fetchCoordinatesFromAddress = async () => {
    if (!formData.office_address) return;
    
    try {
      setIsGettingLocation(true);
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(formData.office_address)}`
      );
      const data = await response.json();
      
      if (data && data.length > 0) {
        setFormData(prev => ({
          ...prev,
          latitude: data[0].lat,
          longitude: data[0].lon,
          location_name: data[0].display_name
        }));
      }
      setIsGettingLocation(false);
    } catch (error) {
      console.error('Error fetching coordinates:', error);
      setIsGettingLocation(false);
    }
  };

  // Load companies from API
  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    setIsLoading(true);
    try {
       const token = localStorage.getItem('authToken') || 
                    localStorage.getItem('token') || 
                    localStorage.getItem('access_token') ||
                    localStorage.getItem('jwtToken') ||
                    localStorage.getItem('userToken');
      
      const headers = {
        'Content-Type': 'application/json',
      };
      
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await fetch(`${API_BASE_URL}/api/admin/companies`, {
        method: 'GET',
        headers: headers,
      });

      console.log("API Response status:", response.status);
      
      if (response.ok) {
        const result = await response.json();
        console.log("API Response data:", result);
        
        const companiesData = result.data || result || [];
        console.log("Companies data:", companiesData);
        
        const transformedCompanies = companiesData.map(company => ({
          id: company.id || company.company_code || Date.now(),
          username: company.username || '',
          companyId: company.company_code || '',
          companyName: company.company_name || company.username || '',
          role: company.role || 'employee',
          email: company.email || '',
          phone: company.phone || '',
          address: company.address || '',
          logo: company.logo || '',
          theme: company.theme || Object.values(THEMES)[0],
          permissions: company.permissions || generateDefaultPermissions(company.role || 'employee'),
          status: company.status || 'active',
          employees: company.employees || 0,
          subscription: company.subscription || 'free',
          // Office timings
          office_check_in: company.office_check_in || '09:00',
          office_check_out: company.office_check_out || '17:00',
          // createdAt: company.created_at || new Date().toISOString(),
          // Location fields
          latitude: company.latitude || '',
          longitude: company.longitude || '',
          // location_name: company.location_name || '',
          // office_address: company.office_address || '',
          // work_location_type: company.work_location_type || '',
          // radius: company.radius || '',
          // branch: company.branch || ''
        }));
        
        console.log("Transformed companies:", transformedCompanies);
        setCompanies(transformedCompanies);
      } else {
        const errorText = await response.text();
        console.error('Failed to fetch companies:', response.status, errorText);
        setCompanies([]);
      }
    } catch (error) {
      console.error('Error fetching companies:', error);
      setCompanies([]);
    } finally {
      setIsLoading(false);
    }
  };

  const triggerSuccess = (msg) => {
    setSuccessMessage(msg);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const openModal = (company = null) => {
    setIsLoading(true);
    if (company) {
      setEditingCompany(company);
      setFormData({
        username: company.username || '',
        password: '',
        confirmPassword: '',
        companyId: company.companyId || '',
        companyName: company.companyName || company.username || '',
        role: company.role || 'employee',
        email: company.email || '',
        phone: company.phone || '',
        address: company.address || '',
        logo: company.logo || '',
        theme: company.theme || Object.values(THEMES)[0],
        permissions: company.permissions || generateDefaultPermissions(company.role || 'employee'),
        status: company.status || 'active',
        employees: company.employees || 0,
        subscription: company.subscription || 'free',
        // Office timings
        office_check_in: company.office_check_in || '09:00',
        office_check_out: company.office_check_out || '17:00',
        // Location fields
        latitude: company.latitude || '',
        longitude: company.longitude || '',
        location_name: company.location_name || '',
        office_address: company.office_address || company.address || '',
        work_location_type: company.work_location_type || '',
        radius: company.radius || '',
        branch: company.branch || ''
      });
    } else {
      setEditingCompany(null);
      setFormData({
        username: '',
        password: '',
        confirmPassword: '',
        companyId: '',
        companyName: '',
        role: 'employee',
        email: '',
        phone: '',
        address: '',
        logo: '',
        theme: Object.values(THEMES)[0],
        permissions: generateDefaultPermissions('employee'),
        status: 'active',
        employees: 0,
        subscription: 'free',
        // Office timings
        office_check_in: '09:00',
        office_check_out: '17:00',
        // Location fields
        latitude: '',
        longitude: '',
        location_name: '',
        office_address: '',
        work_location_type: '',
        radius: '',
        branch: ''
      });
    }
    setOpenModule(null);
    setShowPassword(false);
    setIsGettingLocation(false);
    setTimeout(() => {
      setIsModalOpen(true);
      setIsLoading(false);
    }, 300);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingCompany(null);
    setIsLoading(false);
    setIsGettingLocation(false);
  };

  const togglePermission = (moduleName, permissionName, type) => {
    setFormData(prev => ({
      ...prev,
      permissions: {
        ...prev.permissions,
        [moduleName]: {
          ...prev.permissions[moduleName],
          [permissionName]: {
            ...prev.permissions[moduleName][permissionName],
            [type]: !prev.permissions[moduleName][permissionName][type],
          },
        },
      },
    }));
  };

  const getPerm = (moduleName, permissionName, type) => {
    return formData.permissions?.[moduleName]?.[permissionName]?.[type] ?? false;
  };

const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.username.trim() || !formData.companyId.trim()) {
      return alert('Username and Company ID are required!');
    }
    if (!editingCompany && formData.password !== formData.confirmPassword) {
      return alert('Passwords do not match!');
    }
    if (!editingCompany && !formData.password) {
      return alert('Password is required for new company!');
    }

    setIsLoading(true);

    try {
      // Get token from localStorage
      const token = localStorage.getItem('authToken');
      
      if (!token) {
        throw new Error('No authentication token found. Please login again.');
      }

      console.log('Using token:', token.substring(0, 20) + '...');

      // Prepare headers
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json'
      };

      // Prepare company data for API
      const companyPayload = {
        username: formData.username.trim(),
        company_name: formData.companyName.trim(),
        company_code: formData.companyId.trim(), // Make sure this is included
        role: formData.role,
        theme: formData.theme?.name || formData.theme || 'black',
        address: formData.address.trim(),
        phone: formData.phone.trim(),
        ...(formData.email && { email: formData.email.trim() }),
        ...(formData.password && { password: formData.password }),
        // Office timings - convert to proper format
        office_check_in: formData.office_check_in || '09:00:00',
        office_check_out: formData.office_check_out || '17:00:00',
        // Location fields
        ...(formData.latitude && { latitude: formData.latitude }),
        ...(formData.longitude && { longitude: formData.longitude })
      };

      // Log the payload for debugging
      console.log('Company payload:', companyPayload);
      console.log('Request headers:', headers);

      // API 1: Create Company
      const companyUrl = `https://hr.hinzah.com/api/admin/companies/create`;
      
      console.log('Sending request to:', companyUrl);
      
      const companyResponse = await fetch(companyUrl, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(companyPayload),
        mode: 'cors', // Explicitly set cors mode
        credentials: 'include' // Include credentials if needed
      });

      console.log('Company response status:', companyResponse.status);
      console.log('Company response headers:', companyResponse.headers);
      
      // Check for redirect
      if (companyResponse.redirected) {
        console.warn('Request was redirected to:', companyResponse.url);
        // Try to follow the redirect with proper headers
        const redirectedResponse = await fetch(companyResponse.url, {
          method: 'POST',
          headers: headers,
          body: JSON.stringify(companyPayload),
          mode: 'cors',
          credentials: 'include'
        });
        
        const redirectedResult = await redirectedResponse.json();
        console.log('Redirected response:', redirectedResult);
        
        if (!redirectedResponse.ok) {
          throw new Error(`Redirected request failed: ${redirectedResult.message || redirectedResponse.statusText}`);
        }
        
        await handleCompanyCreationSuccess(redirectedResult.data || redirectedResult, headers);
        return;
      }
      
      if (!companyResponse.ok) {
        // Try to get error message
        let errorMessage = 'Unknown error';
        try {
          const errorData = await companyResponse.json();
          errorMessage = errorData.message || errorData.error || companyResponse.statusText;
        } catch (jsonError) {
          const text = await companyResponse.text();
          errorMessage = text || companyResponse.statusText;
        }
        
        throw new Error(`Company API failed: ${errorMessage} (Status: ${companyResponse.status})`);
      }

      const companyResult = await companyResponse.json();
      console.log('Create API response:', companyResult);

      await handleCompanyCreationSuccess(companyResult.data || companyResult, headers);
      
    } catch (error) {
      console.error('API Error:', error);
      
      // More user-friendly error messages
      if (error.message.includes('CORS') || error.message.includes('Failed to fetch')) {
        alert('Network error. Please check if you are logged in and try again.');
      } else if (error.message.includes('No authentication token')) {
        alert('Your session has expired. Please login again.');
        // Optionally redirect to login
        window.location.href = '/login';
      } else {
        alert(`Failed to save company: ${error.message}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Helper function to handle successful company creation
  const handleCompanyCreationSuccess = async (companyData, headers) => {
    const companyCode = companyData.company_code || companyData.companyCode || formData.companyId.trim();
    
    if (!companyCode) {
      throw new Error('No company code returned from API');
    }

    console.log('Using company code:', companyCode);
    
    // API 2: Set Location (if location data exists)
    if (formData.latitude && formData.longitude) {
      const locationPayload = {
        company_code: companyCode,
        latitude: formData.latitude,
        longitude: formData.longitude,
        location_name: formData.location_name || formData.office_address || formData.address,
        office_address: formData.office_address || formData.address,
        work_location_type: formData.work_location_type || 'head_office',
        ...(formData.radius && { radius: parseFloat(formData.radius) }),
        ...(formData.branch && { branch: formData.branch })
      };

      console.log('Sending location data:', locationPayload);
      
      try {
        const locationResponse = await fetch(`https://hr.hinzah.com/api/company/location`, {
          method: 'POST',
          headers: headers,
          body: JSON.stringify(locationPayload),
        });

        console.log('Location response status:', locationResponse.status);
        
        if (!locationResponse.ok) {
          const errorData = await locationResponse.json().catch(() => ({}));
          console.warn('Location API failed:', errorData);
          console.warn('Company created but location could not be set');
        } else {
          const locationResult = await locationResponse.json();
          console.log('Location API response:', locationResult);
        }
      } catch (locationError) {
        console.warn('Location API error:', locationError);
        // Don't fail the whole process if location fails
      }
    }

    // API 3: Set Permissions
    const permissionsPayload = {
      company_code: companyCode,
      permissions: formData.permissions
    };

    console.log('Sending permissions data:', permissionsPayload);
    
    try {
      const permissionsResponse = await fetch(`https://hr.hinzah.com/api/company/permissions`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(permissionsPayload),
      });

      console.log('Permissions response status:', permissionsResponse.status);
      
      if (!permissionsResponse.ok) {
        const errorData = await permissionsResponse.json().catch(() => ({}));
        console.warn('Permissions API failed:', errorData);
        console.warn('Permissions could not be set, but company was created successfully');
      } else {
        const permissionsResult = await permissionsResponse.json();
        console.log('Permissions API response:', permissionsResult);
      }
    } catch (permissionsError) {
      console.warn('Permissions API error:', permissionsError);
      // Don't fail the whole process if permissions fails
    }

    // Refresh companies list
    await fetchCompanies();
    
    // Close modal and show success
    closeModal();
    triggerSuccess('Company created successfully!');
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this company permanently?')) return;

    setIsDeleting(id);
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/companies/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        setCompanies(prev => prev.filter(c => c.id !== id));
        triggerSuccess('Company deleted successfully!');
      } else {
        alert('Failed to delete company from API');
      }
    } catch (error) {
      console.error('Delete error:', error);
      alert('Error deleting company');
    } finally {
      setIsDeleting(null);
    }
  };

  // Filter companies
  const filteredCompanies = companies.filter(company => {
    const matchesSearch = 
      company.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      company.companyId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      company.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeFilter === 'all') return matchesSearch;
    if (activeFilter === 'active') return matchesSearch && company.status === 'active';
    if (activeFilter === 'inactive') return matchesSearch && company.status === 'inactive';
    if (activeFilter === 'admin') return matchesSearch && company.role === 'admin';
    if (activeFilter === 'superadmin') return matchesSearch && company.role === 'superadmin';
    return matchesSearch;
  });

  // Summary data
  const summaryData = {
    total: companies.length,
    active: companies.filter(c => c.status === 'active').length,
    admins: companies.filter(c => c.role === 'admin' || c.role === 'superadmin').length,
    employees: companies.reduce((sum, c) => sum + (c.employees || 0), 0),
  };

  // In the table view section, add office timings column
  // Update the table header and body to include office timings

  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8  lg:max-w-7xl">
      {/* ... (Previous code remains the same until the table) ... */}
          <div className="lg:hidden mb-4">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 rounded-lg bg-gray-100"
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>

      {/* HEADER */}
      <div className="mb-6 lg:mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Company Management</h1>
            <p className="text-gray-600 mt-1">Manage all companies and their permissions</p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative flex-1 lg:flex-none">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search companies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`pl-10 pr-4 py-2 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 ${getRingColor()} focus:border-transparent w-full lg:w-64`}
              />
            </div>
            
            <button 
              className="p-2 rounded-xl hover:opacity-90 hidden md:inline-flex"
              style={{ 
                backgroundColor: getTextAccent() === '#ea580c' ? '#fff7ed' : getLightBg().includes('bg-') ? undefined : getLightBg(),
                color: getTextAccent()
              }}
            >
              <Filter className="h-5 w-5" />
            </button>
            
            <button className="relative p-2 hover:bg-gray-100 rounded-xl">
              <Bell className="h-5 w-5 text-gray-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            
            <button className="hidden lg:flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-xl text-sm hover:bg-gray-50">
              <Settings className="h-4 w-4" /> Settings
            </button>
          </div>
        </div>

        {/* Filter Bar */}
        <div className={`flex flex-wrap items-center gap-2 mt-6 ${isMobileMenuOpen ? 'block' : 'hidden lg:flex'}`}>
          {/* View Toggle - Mobile Only */}
          <div className="flex items-center gap-2 p-1 bg-gray-100 rounded-xl lg:hidden">
            <button
              onClick={() => setViewMode('table')}
              className={`px-3 py-1.5 text-sm rounded-lg flex items-center gap-2 ${
                viewMode === 'table' ? 'bg-white shadow-sm' : ''
              }`}
            >
              <List className="h-4 w-4" /> Table
            </button>
            <button
              onClick={() => setViewMode('card')}
              className={`px-3 py-1.5 text-sm rounded-lg flex items-center gap-2 ${
                viewMode === 'card' ? 'bg-white shadow-sm' : ''
              }`}
            >
              <Grid className="h-4 w-4" /> Cards
            </button>
          </div>
          
          {/* View Toggle - Desktop Only */}
          <div className="hidden lg:flex items-center gap-2 p-1 bg-gray-100 rounded-xl">
            <button
              onClick={() => setViewMode('table')}
              className={`px-3 py-1.5 text-sm rounded-lg flex items-center gap-2 ${
                viewMode === 'table' ? 'bg-white shadow-sm' : ''
              }`}
            >
              <BarChart3 className="h-4 w-4" /> Table
            </button>
            <button
              onClick={() => setViewMode('card')}
              className={`px-3 py-1.5 text-sm rounded-lg flex items-center gap-2 ${
                viewMode === 'card' ? 'bg-white shadow-sm' : ''
              }`}
            >
              <Building className="h-4 w-4" /> Cards
            </button>
          </div>
          
          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-2">
            {['all', 'active', 'inactive', 'admin', 'superadmin'].map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-3 py-2 rounded-xl text-sm font-medium capitalize whitespace-nowrap ${
                  activeFilter === filter
                    ? `${getButtonGradient()} ${getButtonHover()} text-white`
                    : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-300'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6 lg:mb-8">
        {/* ... (Summary cards remain the same) ... */}
      </div>

      {/* CREATE COMPANY BUTTON - Mobile Floating */}
      <div className="fixed bottom-6 right-6 z-40 lg:hidden">
        <button
          onClick={() => openModal()}
          className={`p-4 ${getButtonGradient()} ${getButtonHover()} text-white rounded-full shadow-xl flex items-center justify-center`}
        >
          <Plus className="h-6 w-6" />
        </button>
      </div>
      {/* TABLE VIEW */}
      {viewMode === 'table' && (
        <div className="bg-white  lg:max-w-7xl rounded-2xl shadow-lg border border-gray-200/50 overflow-hidden">
          {/* Table Header */}
          <div 
            className="border-b border-gray-200"
            style={{ 
              backgroundColor: getTextAccent() === '#ea580c' ? '#fff7ed' : 
                             getLightBg().includes('bg-') ? undefined : getLightBg()
            }}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 sm:p-6 gap-4">
              <div>
                <h3 className="text-lg font-bold text-gray-900">Companies</h3>
                <p className="text-sm text-gray-500 mt-1">{filteredCompanies.length} companies found</p>
              </div>
              
              <div className="flex items-center gap-3">
                <button className="p-2 hover:bg-gray-100 rounded-xl hidden sm:inline-flex">
                  <Download className="h-5 w-5 text-gray-600" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-xl hidden sm:inline-flex">
                  <MoreVertical className="h-5 w-5 text-gray-600" />
                </button>
                <button
                  onClick={() => openModal()}
                  className={`px-4 py-2 ${getButtonGradient()} ${getButtonHover()} text-white text-sm font-medium rounded-xl flex items-center gap-2 w-full sm:w-auto justify-center`}
                >
                  <Plus className="h-4 w-4" /> Create Company
                </button>
              </div>
            </div>
          </div>

          {/* Table - Responsive */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[950px]">
              <thead className="border-b border-gray-200">
                <tr>
                  <th className="px-4 sm:px-6 py-4 text-left text-sm font-semibold text-gray-900">Company</th>
                  <th className="px-4 sm:px-6 py-4 text-left text-sm font-semibold text-gray-900">ID</th>
                  <th className="px-4 sm:px-6 py-4 text-left text-sm font-semibold text-gray-900">Contact</th>
                  <th className="px-4 sm:px-6 py-4 text-left text-sm font-semibold text-gray-900">Office Hours</th>
                  <th className="px-4 sm:px-6 py-4 text-left text-sm font-semibold text-gray-900">Location</th>
                  <th className="px-4 sm:px-6 py-4 text-left text-sm font-semibold text-gray-900">Role</th>
                  <th className="px-4 sm:px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
                  <th className="px-4 sm:px-6 py-4 text-left text-sm font-semibold text-gray-900">Theme</th>
                  <th className="px-4 sm:px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredCompanies.map((company) => (
                  <tr key={company.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-4 sm:px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                          {company.logo ? (
                            <img src={company.logo} alt="logo" className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg object-cover" />
                          ) : (
                            <Building className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                          )}
                        </div>
                        <div className="text-left min-w-0">
                          <p className="font-medium text-gray-900 truncate">{company.companyName}</p>
                          <p className="text-sm text-gray-500 truncate">{company.username}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 sm:px-6 py-4">
                      <div className="flex items-center gap-2">
                        <code className="text-xs sm:text-sm font-mono bg-gray-100 px-2 py-1 rounded truncate max-w-[80px] sm:max-w-none">
                          {company.companyId}
                        </code>
                        <button className="p-1 hover:bg-gray-100 rounded hidden sm:inline-flex">
                          <Copy className="h-3 w-3 text-gray-500" />
                        </button>
                      </div>
                    </td>
                    <td className="px-4 sm:px-6 py-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-1 text-xs sm:text-sm text-gray-600">
                          <Mail className="h-3 w-3 flex-shrink-0" />
                          <span className="truncate max-w-[120px] sm:max-w-[180px]">{company.email || 'No email'}</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs sm:text-sm text-gray-600">
                          <Phone className="h-3 w-3 flex-shrink-0" />
                          <span className="truncate max-w-[120px] sm:max-w-none">{company.phone || 'No phone'}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 sm:px-6 py-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-1 text-xs sm:text-sm text-gray-700">
                          <Sun className="h-3 w-3 flex-shrink-0 text-yellow-500" />
                          <span className="font-medium">In: {company.office_check_in || '09:00'}</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs sm:text-sm text-gray-700">
                          <Moon className="h-3 w-3 flex-shrink-0 text-blue-500" />
                          <span className="font-medium">Out: {company.office_check_out || '17:00'}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 sm:px-6 py-4">
                      <div className="space-y-1">
                        {company.latitude && company.longitude ? (
                          <>
                            <div className="flex items-center gap-1 text-xs sm:text-sm text-gray-600">
                              <Target className="h-3 w-3 flex-shrink-0 text-blue-500" />
                              <span className="truncate max-w-[100px] sm:max-w-[150px]">
                                {company.latitude.slice(0, 8)}, {company.longitude.slice(0, 8)}
                              </span>
                            </div>
                            {company.location_name && (
                              <div className="text-xs text-gray-500 truncate max-w-[100px] sm:max-w-[150px]">
                                {company.location_name}
                              </div>
                            )}
                          </>
                        ) : (
                          <div className="flex items-center gap-1 text-xs sm:text-sm text-gray-400">
                            <MapPin className="h-3 w-3 flex-shrink-0" />
                            <span>No location set</span>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-4 sm:px-6 py-4">
                      <span className={`inline-flex items-center px-2 sm:px-3 py-1 rounded-lg text-xs sm:text-sm font-medium ${
                        company.role === 'superadmin' ? 'bg-purple-100 text-purple-800' :
                        company.role === 'admin' ? 'bg-blue-100 text-blue-800' :
                        company.role === 'companyleader' ? 'bg-green-100 text-green-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        <Shield className="h-3 w-3 mr-1" />
                        <span className="truncate max-w-[60px] sm:max-w-none">
                          {company.role.charAt(0).toUpperCase() + company.role.slice(1)}
                        </span>
                      </span>
                    </td>
                    <td className="px-4 sm:px-6 py-4">
                      <span className={`inline-flex items-center px-2 sm:px-3 py-1 rounded-lg text-xs sm:text-sm font-medium ${
                        company.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        <div className={`w-2 h-2 rounded-full mr-2 ${company.status === 'active' ? 'bg-green-500' : 'bg-red-500'}`} />
                        <span className="truncate">
                          {company.status.charAt(0).toUpperCase() + company.status.slice(1)}
                        </span>
                      </span>
                    </td>
                    <td className="px-4 sm:px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg shadow-sm flex-shrink-0"
                          style={{ 
                            background: company.theme.sidebarBg || 
                            `linear-gradient(135deg, ${company.theme.gradient?.split(' ')[1] || '#f97316'}, ${company.theme.gradient?.split(' ')[3] || '#ec4899'})`
                          }}
                        />
                        <span className="text-xs sm:text-sm text-gray-700 truncate max-w-[50px] sm:max-w-none">
                          {company.theme.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 sm:px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openModal(company)}
                          className="p-1.5 sm:p-2 hover:bg-blue-50 rounded-lg text-blue-600"
                          title="Edit"
                        >
                          <Edit2 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => window.open(`/dashboard?company=${company.id}`, '_blank')}
                          className="p-1.5 sm:p-2 hover:bg-green-50 rounded-lg text-green-600"
                          title="View Dashboard"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(company.id)}
                          disabled={isDeleting === company.id}
                          className="p-1.5 sm:p-2 hover:bg-red-50 rounded-lg text-red-600 disabled:opacity-50"
                          title="Delete"
                        >
                          {isDeleting === company.id ? (
                            <RefreshCw className="h-4 w-4 animate-spin" />
                          ) : (
                            <Trash2 className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="border-t border-gray-200 px-4 sm:px-6 py-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="text-sm text-gray-600">
                Showing <span className="font-medium">{filteredCompanies.length}</span> of{' '}
                <span className="font-medium">{companies.length}</span> companies
              </div>
              
              <div className="flex items-center justify-between sm:justify-end gap-4">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setPage(Math.max(1, page - 1))}
                    disabled={page === 1}
                    className="p-2 hover:bg-gray-100 rounded-xl disabled:opacity-50"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  
                  <div className="flex items-center gap-2">
                    {[1, 2].map(p => (
                      <button
                        key={p}
                        onClick={() => setPage(p)}
                        className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg font-medium ${
                          page === p
                            ? `${getButtonGradient()} text-white`
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                  
                  <button
                    onClick={() => setPage(Math.min(totalPages, page + 1))}
                    disabled={page === totalPages}
                    className="p-2 hover:bg-gray-100 rounded-xl disabled:opacity-50"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
                
                <div className="text-sm text-gray-600 hidden sm:block">
                  Page <span className="font-medium">{page}</span> of <span className="font-medium">{totalPages}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* In the modal form, add Office Timings section after Company Details */}
      {/* CREATE/EDIT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-gray-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl w-full max-w-6xl max-h-[90vh] sm:max-h-[95vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 z-10">
              <div className="flex items-center justify-between p-4 sm:p-6">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                    {editingCompany ? 'Edit Company' : 'Create New Company'}
                  </h2>
                  <p className="text-gray-600 mt-1 text-sm sm:text-base">Manage company details and permissions</p>
                </div>
                <button
                  onClick={closeModal}
                  className="p-2 hover:bg-gray-100 rounded-xl"
                >
                  <X className="h-5 w-5 text-gray-500" />
                </button>
              </div>
            </div>

            <div className="p-4 sm:p-6">
              {isLoading ? (
                <div className="flex items-center justify-center py-10 sm:py-20">
                  <div className="text-center">
                    <RefreshCw 
                      className="h-10 w-10 sm:h-12 sm:w-12 animate-spin mx-auto mb-4"
                      style={{ color: getAccentColor() }}
                    />
                    <p className="text-gray-600 text-sm sm:text-base">Loading company data...</p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  {/* Company Details Section */}
                  <div className="mb-6 sm:mb-8">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <Building className="h-4 w-4 sm:h-5 sm:w-5" /> Company Details
                    </h3>
                 


                        
                  {/* Company Details Section */}
                  <div className="mb-6 sm:mb-8">
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Company Name <span className="text-red-600">*</span>
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="Enter company name"
                            value={formData.companyName}
                            onChange={e => setFormData(prev => ({ ...prev, companyName: e.target.value }))}
                            className={`w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl text-sm focus:outline-none focus:ring-2 ${getRingColor()} focus:border-transparent`}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Username <span className="text-red-600">*</span>
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="Enter username"
                            value={formData.username}
                            onChange={e => setFormData(prev => ({ ...prev, username: e.target.value }))}
                            className={`w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl text-sm focus:outline-none focus:ring-2 ${getRingColor()} focus:border-transparent`}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Company ID <span className="text-red-600">*</span>
                          </label>
                          <div className="flex flex-col sm:flex-row gap-2">
                            <input
                              type="text"
                              required
                              placeholder="Enter company ID"
                              value={formData.companyId}
                              onChange={e => setFormData(prev => ({ ...prev, companyId: e.target.value }))}
                              className={`flex-1 px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl text-sm focus:outline-none focus:ring-2 ${getRingColor()} focus:border-transparent`}
                            />
                            <button
                              type="button"
                              onClick={() => setFormData(prev => ({ ...prev, companyId: `COMP-${Date.now().toString().slice(-6)}` }))}
                              className="px-3 sm:px-4 py-2 sm:py-3 bg-gray-100 text-gray-700 rounded-lg sm:rounded-xl hover:bg-gray-200 text-sm font-medium whitespace-nowrap"
                            >
                              Generate
                            </button>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email Address
                          </label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-2.5 sm:top-3.5 h-4 w-4 text-gray-400" />
                            <input
                              type="email"
                              placeholder="company@email.com"
                              value={formData.email}
                              onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
                              className={`w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl text-sm focus:outline-none focus:ring-2 ${getRingColor()} focus:border-transparent`}
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Phone Number
                          </label>
                          <div className="relative">
                            <Phone className="absolute left-3 top-2.5 sm:top-3.5 h-4 w-4 text-gray-400" />
                            <input
                              type="tel"
                              placeholder="+1 (555) 123-4567"
                              value={formData.phone}
                              onChange={e => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                              className={`w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl text-sm focus:outline-none focus:ring-2 ${getRingColor()} focus:border-transparent`}
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Address
                          </label>
                          <div className="relative">
                            <MapPin className="absolute left-3 top-2.5 sm:top-3.5 h-4 w-4 text-gray-400" />
                            <input
                              type="text"
                              placeholder="Company address"
                              value={formData.address}
                              onChange={e => setFormData(prev => ({ ...prev, address: e.target.value }))}
                              className={`w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl text-sm focus:outline-none focus:ring-2 ${getRingColor()} focus:border-transparent`}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Location Information Section */}
                  {/* <div className="mb-6 sm:mb-8">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <MapPin className="h-4 w-4 sm:h-5 sm:w-5" /> Location Information
                    </h3>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                      <div className="space-y-4"> */}
                        {/* <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Office Address
                          </label>
                          <div className="flex gap-2">
                            <div className="relative flex-1">
                              <MapPin className="absolute left-3 top-2.5 sm:top-3.5 h-4 w-4 text-gray-400" />
                              <input
                                type="text"
                                placeholder="Full office address"
                                value={formData.office_address}
                                onChange={e => setFormData(prev => ({ ...prev, office_address: e.target.value }))}
                                className={`w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl text-sm focus:outline-none focus:ring-2 ${getRingColor()} focus:border-transparent`}
                              />
                            </div>
                            <button
                              type="button"
                              onClick={fetchCoordinatesFromAddress}
                              disabled={!formData.office_address || isGettingLocation}
                              className="px-3 sm:px-4 py-2 sm:py-3 bg-blue-100 text-blue-700 rounded-lg sm:rounded-xl hover:bg-blue-200 text-sm font-medium whitespace-nowrap disabled:opacity-50"
                            >
                              {isGettingLocation ? 'Getting...' : 'Get Coords'}
                            </button>
                          </div>
                        </div> */}
                        
                        
                        {/* <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Latitude
                          </label>
                          <div className="relative">
                            <input
                              type="text"
                              placeholder="e.g., 12.9716"
                              value={formData.latitude}
                              onChange={e => setFormData(prev => ({ ...prev, latitude: e.target.value }))}
                              className={`w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl text-sm focus:outline-none focus:ring-2 ${getRingColor()} focus:border-transparent`}
                            />
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Longitude
                          </label>
                          <div className="relative">
                            <input
                              type="text"
                              placeholder="e.g., 77.5946"
                              value={formData.longitude}
                              onChange={e => setFormData(prev => ({ ...prev, longitude: e.target.value }))}
                              className={`w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl text-sm focus:outline-none focus:ring-2 ${getRingColor()} focus:border-transparent`}
                            />
                          </div>
                        </div> */}
                      {/* </div>
                      
                      <div className="space-y-4"> */}
                        {/* <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Location Name
                          </label>
                          <input
                            type="text"
                            placeholder="e.g., Main Office, Bangalore"
                            value={formData.location_name}
                            onChange={e => setFormData(prev => ({ ...prev, location_name: e.target.value }))}
                            className={`w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl text-sm focus:outline-none focus:ring-2 ${getRingColor()} focus:border-transparent`}
                          />
                        </div> */}
                        
                        {/* <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Work Location Type
                          </label>
                          <select
                            value={formData.work_location_type}
                            onChange={e => setFormData(prev => ({ ...prev, work_location_type: e.target.value }))}
                            className={`w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl text-sm focus:outline-none focus:ring-2 ${getRingColor()} focus:border-transparent`}
                          >
                            <option value="">Select Type</option>
                            <option value="head_office">Head Office</option>
                            <option value="branch_office">Branch Office</option>
                            <option value="client_site">Client Site</option>
                            <option value="home">Home</option>
                            <option value="co_working">Co-working Space</option>
                          </select>
                        </div> */}
                        
                        {/* <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Radius (meters)
                            </label>
                            <input
                              type="number"
                              placeholder="e.g., 100"
                              value={formData.radius}
                              onChange={e => setFormData(prev => ({ ...prev, radius: e.target.value }))}
                              className={`w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl text-sm focus:outline-none focus:ring-2 ${getRingColor()} focus:border-transparent`}
                              min="0"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Branch
                            </label>
                            <input
                              type="text"
                              placeholder="e.g., North Branch"
                              value={formData.branch}
                              onChange={e => setFormData(prev => ({ ...prev, branch: e.target.value }))}
                              className={`w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl text-sm focus:outline-none focus:ring-2 ${getRingColor()} focus:border-transparent`}
                            />
                          </div>
                        </div> */}
{/*                         
                        <div>
                          <button
                            type="button"
                            onClick={getCurrentLocation}
                            disabled={isGettingLocation}
                            className={`w-full px-4 sm:px-6 py-2 sm:py-3 ${getButtonGradient()} ${getButtonHover()} text-white text-sm font-medium rounded-lg sm:rounded-xl flex items-center justify-center gap-2 disabled:opacity-70`}
                          >
                            {isGettingLocation ? (
                              <>
                                <RefreshCw className="h-4 w-4 animate-spin" />
                                Getting Location...
                              </>
                            ) : (
                              <>
                                <Navigation className="h-4 w-4" />
                                Use Current Location
                              </>
                            )}
                          </button>
                        </div> */}
                      {/* </div>
                    </div>
                  </div> */}

                  {/* Security & Role Section */}
                  <div className="mb-6 sm:mb-8">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <Shield className="h-4 w-4 sm:h-5 sm:w-5" /> Security & Role
                    </h3>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Role <span className="text-red-600">*</span>
                        </label>
                        <select
                          value={formData.role}
                          onChange={(e) => handleRoleChange(e.target.value)}
                          className={`w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl text-sm focus:outline-none focus:ring-2 ${getRingColor()} focus:border-transparent`}
                        >
                          <option value="employee">Employee</option>
                          <option value="companyleader">Company Leader</option>
                          <option value="admin">Admin</option>
                          <option value="superadmin">Super Admin</option>
                        </select>
                        {formData.role === 'superadmin' && (
                          <p className="text-xs text-purple-600 mt-2 flex items-center gap-1">
                            <ShieldCheck className="h-3 w-3" />
                            Super Admin: All view permissions are automatically enabled
                          </p>
                        )}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Password {!editingCompany && <span className="text-red-600">*</span>}
                        </label>
                        <div className="relative">
                          <Key className="absolute left-3 top-2.5 sm:top-3.5 h-4 w-4 text-gray-400" />
                          <input
                            type={showPassword ? 'text' : 'password'}
                            placeholder={editingCompany ? 'New password (optional)' : 'Enter password'}
                            value={formData.password}
                            onChange={e => setFormData(prev => ({ ...prev, password: e.target.value }))}
                            className={`w-full pl-9 sm:pl-10 pr-10 sm:pr-12 py-2 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl text-sm focus:outline-none focus:ring-2 ${getRingColor()} focus:border-transparent`}
                            required={!editingCompany}
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-2.5 sm:top-3.5 text-gray-500"
                          >
                            {showPassword ? <Eye className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </button>
                        </div>
                      </div>
                      
                      {!editingCompany && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Confirm Password <span className="text-red-600">*</span>
                          </label>
                          <div className="relative">
                            <Key className="absolute left-3 top-2.5 sm:top-3.5 h-4 w-4 text-gray-400" />
                            <input
                              type={showPassword ? 'text' : 'password'}
                              placeholder="Confirm password"
                              value={formData.confirmPassword}
                              onChange={e => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                              className={`w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl text-sm focus:outline-none focus:ring-2 ${getRingColor()} focus:border-transparent`}
                              required
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Theme Selection */}
                  <div className="mb-6 sm:mb-8">
  <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
    <Palette className="h-4 w-4 sm:h-5 sm:w-5" /> Theme Selection
  </h3>
  <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2 sm:gap-3">
    {Object.values(THEMES).map(t => {
      // Helper to get accent color class
      const getAccentRingColor = (accent) => {
        if (!accent) return 'ring-orange-500';
        const baseColor = accent.includes('-') ? accent.split('-')[0] : accent;
        return `ring-${baseColor}-500`;
      };

      const isSelected = formData.theme.id === t.id;
      const ringColorClass = getAccentRingColor(t.accent);
      
      return (
        <button
          key={t.id}
          type="button"
          onClick={() => setFormData(prev => ({ ...prev, theme: t }))}
          className={`relative p-2 sm:p-3 rounded-lg sm:rounded-xl border transition-all hover:scale-105 ${
            isSelected 
              ? `shadow-lg ring-2 ring-offset-1 sm:ring-offset-2 ${ringColorClass}` 
              : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          <div className="h-8 sm:h-12 rounded-lg overflow-hidden flex mb-1 sm:mb-2">
            {t.gradient ? (
              <div 
                className={`w-full h-full ${t.gradient}`}
                style={t.customGradient ? {
                  background: t.customGradient
                } : {}}
              />
            ) : t.accent ? (
              <div 
                className="w-full h-full"
                style={{
                  background: `linear-gradient(135deg, var(--${t.accent}-500), var(--${t.accent}-600))`
                }}
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-r from-orange-500 to-orange-600" />
            )}
          </div>
          
          <div className="text-center">
            <div className="font-medium text-xs text-gray-900 truncate">
              {t.name}
            </div>
            <div className="text-[10px] text-gray-500 truncate">
              {t.accent?.replace('-600', '') || 'Multi'}
            </div>
          </div>
          
          {isSelected && (
            <div className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-green-500 rounded-full flex items-center justify-center">
              <Check className="h-2 w-2 sm:h-3 sm:w-3 text-white" />
            </div>
          )}
        </button>
      );
    })}
  </div>
</div>

                  {/* Permissions Section */}
                  <div className="mb-6 sm:mb-8">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
                      <h3 className="text-base sm:text-lg font-semibold text-gray-900 flex items-center gap-2">
                        <Lock className="h-4 w-4 sm:h-5 sm:w-5" /> Module Permissions
                      </h3>
                      <div className="flex items-center gap-4 text-xs sm:text-sm">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full"></div>
                          <span>Enabled</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 sm:w-3 sm:h-3 bg-gray-300 rounded-full"></div>
                          <span>Disabled</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      {MODULES.map(mod => (
                        <div key={mod.name} className="bg-gray-50 rounded-lg sm:rounded-xl border overflow-hidden">
                          <button
                            type="button"
                            onClick={() => setOpenModule(openModule === mod.name ? null : mod.name)}
                            className="w-full flex justify-between items-center p-3 sm:p-4 hover:bg-gray-100 transition-colors"
                          >
                            <div className="flex items-center gap-3">
                              <div className="p-1.5 sm:p-2 bg-white rounded-lg">
                                <mod.icon className="h-4 w-4 sm:h-5 sm:w-5 text-gray-700" />
                              </div>
                              <div className="text-left">
                                <h4 className="font-semibold text-gray-900 text-sm sm:text-base">{mod.name}</h4>
                                <p className="text-xs sm:text-sm text-gray-500">{(SUB_PERMISSIONS[mod.name] || []).length} permissions</p>
                              </div>
                            </div>
                            {openModule === mod.name ? (
                              <ChevronUp className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500" />
                            ) : (
                              <ChevronDown className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500" />
                            )}
                          </button>
                          
                          {openModule === mod.name && (
                            <div className="border-t border-gray-200 p-3 sm:p-4 bg-white">
                              <div className="mb-2">
                                {formData.role === 'superadmin' && (
                                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-2 sm:p-3 mb-3 sm:mb-4">
                                    <p className="text-xs sm:text-sm text-purple-800 flex items-center gap-2">
                                      <ShieldCheck className="h-3 w-3 sm:h-4 sm:w-4" />
                                      Super Admin: All view permissions are enabled. Other permissions can be manually adjusted.
                                    </p>
                                  </div>
                                )}
                              </div>
                              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
                                {(SUB_PERMISSIONS[mod.name] || []).map(perm => (
                                  <div key={perm.name} className="bg-gray-50 rounded-lg p-3 sm:p-4">
                                    <h5 className="font-medium text-gray-900 mb-2 sm:mb-3 text-sm sm:text-base">{perm.name}</h5>
                                    <div className="grid grid-cols-2 gap-1 sm:gap-2">
                                      {['view', 'create', 'edit', 'delete'].map(type => {
                                        const checked = getPerm(mod.name, perm.name, type);
                                        return (
                                          <label key={type} className="flex items-center gap-2 cursor-pointer">
                                            <div className="relative">
                                              <input
                                                type="checkbox"
                                                checked={checked}
                                                onChange={() => togglePermission(mod.name, perm.name, type)}
                                                className="sr-only"
                                              />
                                              <div className={`w-7 h-4 sm:w-8 sm:h-5 rounded-full transition-colors ${
                                                checked ? 'bg-green-500' : 'bg-gray-300'
                                              }`}>
                                                <div className={`absolute top-0.5 left-0.5 w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-white transform transition-transform ${
                                                  checked ? 'translate-x-3 sm:translate-x-4' : ''
                                                }`} />
                                              </div>
                                            </div>
                                            <span className="text-xs text-gray-700 capitalize">{type}</span>
                                          </label>
                                        );
                                      })}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Form Actions */}
                 
               

                      {/* ... (Company Details fields remain the same) ... */}
                    </div>
                  

                  {/* Office Timings Section - ADD THIS NEW SECTION */}
                  <div className="mb-6 sm:mb-8">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <Clock className="h-4 w-4 sm:h-5 sm:w-5" /> Office Timings
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Office Check-in Time <span className="text-red-600">*</span>
                        </label>
                        <div className="relative">
                          <Sun className="absolute left-3 top-2.5 sm:top-3.5 h-4 w-4 text-yellow-500" />
                          <input
                            type="time"
                            required
                            value={formData.office_check_in}
                            onChange={e => setFormData(prev => ({ ...prev, office_check_in: e.target.value }))}
                            className={`w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl text-sm focus:outline-none focus:ring-2 ${getRingColor()} focus:border-transparent`}
                          />
                        </div>
                        <p className="text-xs text-gray-500 mt-1">Default office start time</p>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Office Check-out Time <span className="text-red-600">*</span>
                        </label>
                        <div className="relative">
                          <Moon className="absolute left-3 top-2.5 sm:top-3.5 h-4 w-4 text-blue-500" />
                          <input
                            type="time"
                            required
                            value={formData.office_check_out}
                            onChange={e => setFormData(prev => ({ ...prev, office_check_out: e.target.value }))}
                            className={`w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl text-sm focus:outline-none focus:ring-2 ${getRingColor()} focus:border-transparent`}
                          />
                        </div>
                        <p className="text-xs text-gray-500 mt-1">Default office end time</p>
                      </div>
                    </div>
                  </div>

                  {/* Location Information Section */}
                  <div className="mb-6 sm:mb-8">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <MapPin className="h-4 w-4 sm:h-5 sm:w-5" /> Location Information
                    </h3>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Latitude
                          </label>
                          <div className="relative">
                            <input
                              type="text"
                              placeholder="e.g., 12.9716"
                              value={formData.latitude}
                              onChange={e => setFormData(prev => ({ ...prev, latitude: e.target.value }))}
                              className={`w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl text-sm focus:outline-none focus:ring-2 ${getRingColor()} focus:border-transparent`}
                            />
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Longitude
                          </label>
                          <div className="relative">
                            <input
                              type="text"
                              placeholder="e.g., 77.5946"
                              value={formData.longitude}
                              onChange={e => setFormData(prev => ({ ...prev, longitude: e.target.value }))}
                              className={`w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl text-sm focus:outline-none focus:ring-2 ${getRingColor()} focus:border-transparent`}
                            />
                          </div>
                        </div>
                        
                        <div>
                          <button
                            type="button"
                            onClick={getCurrentLocation}
                            disabled={isGettingLocation}
                            className={`w-full px-4 sm:px-6 py-2 sm:py-3 ${getButtonGradient()} ${getButtonHover()} text-white text-sm font-medium rounded-lg sm:rounded-xl flex items-center justify-center gap-2 disabled:opacity-70`}
                          >
                            {isGettingLocation ? (
                              <>
                                <RefreshCw className="h-4 w-4 animate-spin" />
                                Getting Location...
                              </>
                            ) : (
                              <>
                                <Navigation className="h-4 w-4" />
                                Use Current Location
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Location Name
                          </label>
                          <input
                            type="text"
                            placeholder="e.g., Main Office, Bangalore"
                            value={formData.location_name}
                            onChange={e => setFormData(prev => ({ ...prev, location_name: e.target.value }))}
                            className={`w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl text-sm focus:outline-none focus:ring-2 ${getRingColor()} focus:border-transparent`}
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Office Address
                          </label>
                          <div className="flex gap-2">
                            <div className="relative flex-1">
                              <MapPin className="absolute left-3 top-2.5 sm:top-3.5 h-4 w-4 text-gray-400" />
                              <input
                                type="text"
                                placeholder="Full office address"
                                value={formData.office_address}
                                onChange={e => setFormData(prev => ({ ...prev, office_address: e.target.value }))}
                                className={`w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl text-sm focus:outline-none focus:ring-2 ${getRingColor()} focus:border-transparent`}
                              />
                            </div>
                            <button
                              type="button"
                              onClick={fetchCoordinatesFromAddress}
                              disabled={!formData.office_address || isGettingLocation}
                              className="px-3 sm:px-4 py-2 sm:py-3 bg-blue-100 text-blue-700 rounded-lg sm:rounded-xl hover:bg-blue-200 text-sm font-medium whitespace-nowrap disabled:opacity-50"
                            >
                              {isGettingLocation ? 'Getting...' : 'Get Coords'}
                            </button>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Work Location Type
                            </label>
                            <select
                              value={formData.work_location_type}
                              onChange={e => setFormData(prev => ({ ...prev, work_location_type: e.target.value }))}
                              className={`w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl text-sm focus:outline-none focus:ring-2 ${getRingColor()} focus:border-transparent`}
                            >
                              <option value="">Select Type</option>
                              <option value="head_office">Head Office</option>
                              <option value="branch_office">Branch Office</option>
                              <option value="client_site">Client Site</option>
                              <option value="home">Home</option>
                              <option value="co_working">Co-working Space</option>
                            </select>
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Radius (meters)
                            </label>
                            <input
                              type="number"
                              placeholder="e.g., 100"
                              value={formData.radius}
                              onChange={e => setFormData(prev => ({ ...prev, radius: e.target.value }))}
                              className={`w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl text-sm focus:outline-none focus:ring-2 ${getRingColor()} focus:border-transparent`}
                              min="0"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>


                   <div className="flex flex-col sm:flex-row sm:items-center justify-end gap-3 pt-4 sm:pt-6 border-t border-gray-200">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="px-4 sm:px-6 py-2 sm:py-3 border border-gray-300 text-gray-700 rounded-lg sm:rounded-xl text-sm font-medium hover:bg-gray-50 order-2 sm:order-1"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isLoading}
                      className={`px-6 sm:px-8 py-2 sm:py-3 ${getButtonGradient()} ${getButtonHover()} text-white text-sm font-medium rounded-lg sm:rounded-xl flex items-center justify-center gap-2 disabled:opacity-70 order-1 sm:order-2`}
                    >
                      {isLoading ? (
                        <>
                          <RefreshCw className="h-4 w-4 animate-spin" />
                          {editingCompany ? 'Updating...' : 'Creating...'}
                        </>
                      ) : editingCompany ? (
                        <>
                          <Check className="h-4 w-4" /> Update Company
                        </>
                      ) : (
                        <>
                          <Plus className="h-4 w-4" /> Create Company
                        </>
                      )}
                    </button>
                  </div>

                  {/* ... (Rest of the modal remains the same: Security & Role, Theme, Permissions, Form Actions) ... */}
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}