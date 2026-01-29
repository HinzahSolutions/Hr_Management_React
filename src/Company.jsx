

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
//   Navigation,
//   Target,
//   Sun,
//   Moon,
//   Briefcase,
//   Watch,
//   LogOut,
//   AlertTriangle,
//   ExternalLink
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
  
//   // Popup states
//   const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
//   const [companyToDelete, setCompanyToDelete] = useState(null);
//   const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
//   const [showTokenManager, setShowTokenManager] = useState(false);
//   const [tokens, setTokens] = useState([]);
//   const [newTokenName, setNewTokenName] = useState('');
//   const [generatedToken, setGeneratedToken] = useState('');
//   const [showTokenGenerated, setShowTokenGenerated] = useState(false);
  
//   const [searchQuery, setSearchQuery] = useState('');
//   const [activeFilter, setActiveFilter] = useState('all');
//   const [viewMode, setViewMode] = useState('table');
//   const [page, setPage] = useState(1);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const totalPages = 2;

//   // API Base URLs
//   const API_BASE_URL = 'https://hr.hinzah.com';
  
//   // Theme helper functions with better fallbacks
//   const getAccentColor = () => {
//     if (appTheme?.accentColor) {
//       if (appTheme.accentColor.startsWith('#')) {
//         return appTheme.accentColor;
//       }
//       return `var(--${appTheme.accentColor})` || '#ea580c';
//     }
//     return '#ea580c';
//   };
  
//   const getAccentColorClass = () => {
//     if (!appTheme?.accentColor) return 'orange-600';
//     if (appTheme.accentColor.startsWith('#')) return 'orange-600';
//     const color = appTheme.accentColor.replace('-600', '').replace('-500', '').replace('-700', '');
//     return `${color}-600`;
//   };
  
//   const getBorderColor = () => appTheme?.borderColor || '#ea580c';
//   const getTextAccent = () => appTheme?.accentColor || '#ea580c';
  
//   const getButtonGradient = () => {
//     if (appTheme?.buttonGradient) {
//       if (appTheme.buttonGradient.includes('gradient-to')) {
//         return appTheme.buttonGradient;
//       }
//     }
//     const accentClass = getAccentColorClass().replace('-600', '');
//     return `bg-gradient-to-r from-${accentClass}-500 to-${accentClass}-600`;
//   };
  
//   const getButtonHover = () => {
//     const accentClass = getAccentColorClass().replace('-600', '');
//     return `hover:from-${accentClass}-600 hover:to-${accentClass}-700`;
//   };
  
//   const getLightBg = () => {
//     const accentClass = getAccentColorClass().replace('-600', '');
//     return `bg-${accentClass}-50`;
//   };
  
//   const getRingColor = () => {
//     const accentClass = getAccentColorClass().replace('-600', '');
//     return `ring-${accentClass}-500`;
//   };
  
//   const getAlertBg = () => appTheme?.alertBg || 'bg-red-50';
//   const getAlertText = () => appTheme?.alertText || 'text-red-800';
//   const getAlertBorder = () => appTheme?.alertBorder || 'border-red-200';
  
//   // Helper to get text color class based on theme
//   const getTextColorClass = () => {
//     const accentClass = getAccentColorClass();
//     return `text-${accentClass}`;
//   };

//   // Get theme preview color for table display
//   const getThemePreviewColor = (theme) => {
//     if (theme?.sidebarBg) return theme.sidebarBg;
//     if (theme?.accentColor) {
//       if (theme.accentColor.includes('-')) {
//         const color = theme.accentColor.split('-')[0];
//         return `linear-gradient(135deg, var(--${color}-500), var(--${color}-600))`;
//       }
//       return theme.accentColor;
//     }
//     if (theme?.gradient) {
//       const colors = theme.gradient.match(/(from|to|via)-([a-z]+)-(\d+)/g);
//       if (colors && colors.length >= 2) {
//         const fromColor = colors[0].replace('from-', '');
//         const toColor = colors[1].replace('to-', '');
//         return `linear-gradient(135deg, var(--${fromColor}), var(--${toColor}))`;
//       }
//     }
//     return 'linear-gradient(135deg, #f97316, #ec4899)';
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
    
//     // Office Timings
//     office_check_in: '09:00',
//     office_check_out: '17:00',
    
//     // Location fields
//     latitude: '',
//     longitude: '',
//     location_name: '',
//     office_address: '',
//     work_location_type: '',
//     radius: '',
//     branch: ''
//   });

//   // Load tokens from localStorage
//   useEffect(() => {
//     loadTokens();
//     fetchCompanies();
//   }, []);

//   const loadTokens = () => {
//     try {
//       const savedTokens = localStorage.getItem('companyTokens');
//       if (savedTokens) {
//         setTokens(JSON.parse(savedTokens));
//       }
//     } catch (error) {
//       console.error('Error loading tokens:', error);
//     }
//   };

//   const saveTokens = (newTokens) => {
//     localStorage.setItem('companyTokens', JSON.stringify(newTokens));
//     setTokens(newTokens);
//   };

//   // Generate a new token
//   const generateToken = () => {
//     if (!newTokenName.trim()) {
//       alert('Please enter a token name');
//       return;
//     }

//     const token = `cmp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
//     const newToken = {
//       id: Date.now(),
//       name: newTokenName,
//       token: token,
//       company: editingCompany?.companyName || 'All Companies',
//       createdAt: new Date().toISOString(),
//       lastUsed: null
//     };

//     const updatedTokens = [...tokens, newToken];
//     saveTokens(updatedTokens);
    
//     setGeneratedToken(token);
//     setNewTokenName('');
//     setShowTokenGenerated(true);
    
//     // Hide after 5 seconds
//     setTimeout(() => setShowTokenGenerated(false), 5000);
//   };

//   // Delete a token
//   const deleteToken = (tokenId) => {
//     if (confirm('Are you sure you want to delete this token?')) {
//       const updatedTokens = tokens.filter(t => t.id !== tokenId);
//       saveTokens(updatedTokens);
//       triggerSuccess('Token deleted successfully!');
//     }
//   };

//   // Copy token to clipboard
//   const copyToken = (token) => {
//     navigator.clipboard.writeText(token).then(() => {
//       triggerSuccess('Token copied to clipboard!');
//     });
//   };

//   // Revoke all tokens
//   const revokeAllTokens = () => {
//     if (confirm('Are you sure you want to revoke ALL tokens? This action cannot be undone.')) {
//       saveTokens([]);
//       triggerSuccess('All tokens have been revoked!');
//     }
//   };

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
//   const fetchCompanies = async () => {
//     setIsLoading(true);
//     try {
//        const token = localStorage.getItem('authToken') || 
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
//           // Office timings
//           office_check_in: company.office_check_in || '09:00',
//           office_check_out: company.office_check_out || '17:00',
//           // Location fields
//           latitude: company.latitude || '',
//           longitude: company.longitude || '',
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
//         // Office timings
//         office_check_in: company.office_check_in || '09:00',
//         office_check_out: company.office_check_out || '17:00',
//         // Location fields
//         latitude: company.latitude || '',
//         longitude: company.longitude || '',
//         location_name: company.location_name || '',
//         office_address: company.office_address || company.address || '',
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
//         // Office timings
//         office_check_in: '09:00',
//         office_check_out: '17:00',
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

//   // Delete company confirmation
//   const confirmDelete = (company) => {
//     setCompanyToDelete(company);
//     setShowDeleteConfirm(true);
//   };

//   // Actual delete function
//   const handleDelete = async () => {
//     if (!companyToDelete) return;

//     setIsDeleting(companyToDelete.id);
//     try {
//       const token = localStorage.getItem('authToken') || 
//                    localStorage.getItem('token') || 
//                    localStorage.getItem('access_token') ||
//                    localStorage.getItem('jwtToken') ||
//                    localStorage.getItem('userToken');
      
//       const headers = {
//         'Content-Type': 'application/json',
//       };
      
//       if (token) {
//         headers['Authorization'] = `Bearer ${token}`;
//       }

//       const response = await fetch(`${API_BASE_URL}/api/admin/companies/delete/${companyToDelete.id}`, {
//         method: 'DELETE',
//         headers: headers,
//       });

//       if (response.ok) {
//         setCompanies(prev => prev.filter(c => c.id !== companyToDelete.id));
//         triggerSuccess('Company deleted successfully!');
        
//         // Also remove associated tokens
//         const updatedTokens = tokens.filter(t => t.company !== companyToDelete.companyName);
//         saveTokens(updatedTokens);
//       } else {
//         const errorText = await response.text();
//         throw new Error(`Failed to delete: ${errorText}`);
//       }
//     } catch (error) {
//       console.error('Delete error:', error);
//       alert(`Error deleting company: ${error.message}`);
//     } finally {
//       setIsDeleting(null);
//       setCompanyToDelete(null);
//       setShowDeleteConfirm(false);
//     }
//   };

//   // Logout function
//   const handleLogout = () => {
//     // Clear all tokens and auth data
//     localStorage.removeItem('authToken');
//     localStorage.removeItem('token');
//     localStorage.removeItem('access_token');
//     localStorage.removeItem('jwtToken');
//     localStorage.removeItem('userToken');
//     localStorage.removeItem('companyTokens');
    
//     // Redirect to login
//     window.location.href = '/login';
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
//       // Get token from localStorage
//       const token = localStorage.getItem('authToken');
      
//       if (!token) {
//         throw new Error('No authentication token found. Please login again.');
//       }

//       console.log('Using token:', token.substring(0, 20) + '...');

//       // Prepare headers
//       const headers = {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${token}`,
//         'Accept': 'application/json'
//       };

//       // Prepare company data for API
//       const companyPayload = {
//         username: formData.username.trim(),
//         company_name: formData.companyName.trim(),
//         company_code: formData.companyId.trim(), // Make sure this is included
//         role: formData.role,
//         theme: formData.theme?.name || formData.theme || 'black',
//         address: formData.address.trim(),
//         phone: formData.phone.trim(),
//         ...(formData.email && { email: formData.email.trim() }),
//         ...(formData.password && { password: formData.password }),
//         // Office timings - convert to proper format
//         office_check_in: formData.office_check_in || '09:00:00',
//         office_check_out: formData.office_check_out || '17:00:00',
//         // Location fields
//         ...(formData.latitude && { latitude: formData.latitude }),
//         ...(formData.longitude && { longitude: formData.longitude })
//       };

//       // Log the payload for debugging
//       console.log('Company payload:', companyPayload);

//       // API 1: Create Company
//       const companyUrl = `https://hr.hinzah.com/api/admin/companies/create`;
      
//       console.log('Sending request to:', companyUrl);
      
//       const companyResponse = await fetch(companyUrl, {
//         method: 'POST',
//         headers: headers,
//         body: JSON.stringify(companyPayload),
//         mode: 'cors',
//         credentials: 'include'
//       });

//       console.log('Company response status:', companyResponse.status);
      
//       // Check for redirect
//       if (companyResponse.redirected) {
//         console.warn('Request was redirected to:', companyResponse.url);
//         // Try to follow the redirect with proper headers
//         const redirectedResponse = await fetch(companyResponse.url, {
//           method: 'POST',
//           headers: headers,
//           body: JSON.stringify(companyPayload),
//           mode: 'cors',
//           credentials: 'include'
//         });
        
//         const redirectedResult = await redirectedResponse.json();
//         console.log('Redirected response:', redirectedResult);
        
//         if (!redirectedResponse.ok) {
//           throw new Error(`Redirected request failed: ${redirectedResult.message || redirectedResponse.statusText}`);
//         }
        
//         await handleCompanyCreationSuccess(redirectedResult.data || redirectedResult, headers);
//         return;
//       }
      
//       if (!companyResponse.ok) {
//         // Try to get error message
//         let errorMessage = 'Unknown error';
//         try {
//           const errorData = await companyResponse.json();
//           errorMessage = errorData.message || errorData.error || companyResponse.statusText;
//         } catch (jsonError) {
//           const text = await companyResponse.text();
//           errorMessage = text || companyResponse.statusText;
//         }
        
//         throw new Error(`Company API failed: ${errorMessage} (Status: ${companyResponse.status})`);
//       }

//       const companyResult = await companyResponse.json();
//       console.log('Create API response:', companyResult);

//       await handleCompanyCreationSuccess(companyResult.data || companyResult, headers);
      
//     } catch (error) {
//       console.error('API Error:', error);
      
//       // More user-friendly error messages
//       if (error.message.includes('CORS') || error.message.includes('Failed to fetch')) {
//         alert('Network error. Please check if you are logged in and try again.');
//       } else if (error.message.includes('No authentication token')) {
//         alert('Your session has expired. Please login again.');
//         // Optionally redirect to login
//         window.location.href = '/login';
//       } else {
//         alert(`Failed to save company: ${error.message}`);
//       }
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Helper function to handle successful company creation
//   const handleCompanyCreationSuccess = async (companyData, headers) => {
//     const companyCode = companyData.company_code || companyData.companyCode || formData.companyId.trim();
    
//     if (!companyCode) {
//       throw new Error('No company code returned from API');
//     }

//     console.log('Using company code:', companyCode);
    
//     // API 2: Set Location (if location data exists)
//     if (formData.latitude && formData.longitude) {
//       const locationPayload = {
//         company_code: companyCode,
//         latitude: formData.latitude,
//         longitude: formData.longitude,
//         location_name: formData.location_name || formData.office_address || formData.address,
//         office_address: formData.office_address || formData.address,
//         work_location_type: formData.work_location_type || 'head_office',
//         ...(formData.radius && { radius: parseFloat(formData.radius) }),
//         ...(formData.branch && { branch: formData.branch })
//       };

//       console.log('Sending location data:', locationPayload);
      
//       try {
//         const locationResponse = await fetch(`https://hr.hinzah.com/api/company/location`, {
//           method: 'POST',
//           headers: headers,
//           body: JSON.stringify(locationPayload),
//         });

//         console.log('Location response status:', locationResponse.status);
        
//         if (!locationResponse.ok) {
//           const errorData = await locationResponse.json().catch(() => ({}));
//           console.warn('Location API failed:', errorData);
//           console.warn('Company created but location could not be set');
//         } else {
//           const locationResult = await locationResponse.json();
//           console.log('Location API response:', locationResult);
//         }
//       } catch (locationError) {
//         console.warn('Location API error:', locationError);
//         // Don't fail the whole process if location fails
//       }
//     }

//     // API 3: Set Permissions
//     const permissionsPayload = {
//       company_code: companyCode,
//       permissions: formData.permissions
//     };

//     console.log('Sending permissions data:', permissionsPayload);
    
//     try {
//       const permissionsResponse = await fetch(`https://hr.hinzah.com/api/company/permissions`, {
//         method: 'POST',
//         headers: headers,
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
//     } catch (permissionsError) {
//       console.warn('Permissions API error:', permissionsError);
//       // Don't fail the whole process if permissions fails
//     }

//     // Refresh companies list
//     await fetchCompanies();
    
//     // Close modal and show success
//     closeModal();
//     triggerSuccess('Company created successfully!');
//   };

//   // Filter companies
//   const filteredCompanies = companies.filter(company => {
//     const matchesSearch = 
//       (company.username?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
//       (company.companyId?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
//       (company.email?.toLowerCase() || '').includes(searchQuery.toLowerCase());
    
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
//     <div className="min-h-screen p-2 sm:p-4 md:p-6 overflow-x-hidden">
//       {/* Success Toast */}
//       {showSuccess && (
//         <div className="fixed top-4 right-4 z-50 animate-slide-in">
//           <div className={`p-4 rounded-xl shadow-lg border ${getAlertBorder()} ${getAlertBg()} max-w-sm`}>
//             <div className="flex items-center gap-3">
//               <CheckCircle className="h-5 w-5 text-green-500" />
//               <div className="flex-1">
//                 <p className="font-medium text-gray-900">Success!</p>
//                 <p className="text-sm text-gray-600">{successMessage}</p>
//               </div>
//               <button 
//                 onClick={() => setShowSuccess(false)}
//                 className="p-1 hover:bg-gray-100 rounded-lg"
//               >
//                 <X className="h-4 w-4 text-gray-500" />
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Generated Token Toast */}
//       {showTokenGenerated && generatedToken && (
//         <div className="fixed top-20 right-4 z-50 animate-slide-in">
//           <div className="p-4 rounded-xl shadow-lg border border-green-200 bg-green-50 max-w-sm">
//             <div className="flex items-center gap-3">
//               <Key className="h-5 w-5 text-green-500" />
//               <div className="flex-1">
//                 <p className="font-medium text-green-900">Token Generated!</p>
//                 <p className="text-sm text-green-700 truncate">{generatedToken}</p>
//                 <p className="text-xs text-green-600 mt-1">Copy and save this token securely</p>
//               </div>
//               <div className="flex gap-2">
//                 <button 
//                   onClick={() => copyToken(generatedToken)}
//                   className="p-1 hover:bg-green-100 rounded-lg"
//                   title="Copy Token"
//                 >
//                   <Copy className="h-4 w-4 text-green-600" />
//                 </button>
//                 <button 
//                   onClick={() => setShowTokenGenerated(false)}
//                   className="p-1 hover:bg-green-100 rounded-lg"
//                 >
//                   <X className="h-4 w-4 text-green-600" />
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Delete Confirmation Popup */}
//       {showDeleteConfirm && companyToDelete && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm">
//           <div className="bg-white rounded-2xl shadow-xl w-full max-w-md">
//             <div className="p-6">
//               <div className="flex items-center gap-3 mb-4">
//                 <div className="p-2 rounded-full bg-red-100">
//                   <AlertTriangle className="h-6 w-6 text-red-600" />
//                 </div>
//                 <h3 className="text-lg font-bold text-gray-900">Delete Company</h3>
//               </div>
              
//               <div className="mb-6">
//                 <p className="text-gray-600 mb-2">
//                   Are you sure you want to delete <span className="font-semibold text-gray-900">{companyToDelete.companyName}</span>?
//                 </p>
//                 <div className="bg-red-50 border border-red-200 rounded-lg p-3">
//                   <p className="text-sm text-red-800">
//                     <span className="font-semibold">Warning:</span> This action cannot be undone. All company data, including tokens, will be permanently deleted.
//                   </p>
//                 </div>
//               </div>

//               <div className="flex flex-col sm:flex-row gap-3">
//                 <button
//                   onClick={() => setShowDeleteConfirm(false)}
//                   className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={handleDelete}
//                   disabled={isDeleting}
//                   className={`flex-1 px-4 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl font-medium hover:from-red-600 hover:to-red-700 transition-colors disabled:opacity-70 flex items-center justify-center gap-2`}
//                 >
//                   {isDeleting ? (
//                     <>
//                       <RefreshCw className="h-4 w-4 animate-spin" />
//                       Deleting...
//                     </>
//                   ) : (
//                     <>
//                       <Trash2 className="h-4 w-4" />
//                       Delete Company
//                     </>
//                   )}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Logout Confirmation Popup */}
//       {showLogoutConfirm && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm">
//           <div className="bg-white rounded-2xl shadow-xl w-full max-w-md">
//             <div className="p-6">
//               <div className="flex items-center gap-3 mb-4">
//                 <div className="p-2 rounded-full bg-yellow-100">
//                   <LogOut className="h-6 w-6 text-yellow-600" />
//                 </div>
//                 <h3 className="text-lg font-bold text-gray-900">Logout</h3>
//               </div>
              
//               <div className="mb-6">
//                 <p className="text-gray-600 mb-2">
//                   Are you sure you want to logout? All authentication tokens will be cleared.
//                 </p>
//                 <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
//                   <p className="text-sm text-yellow-800">
//                     This will revoke all active tokens and you will need to login again.
//                   </p>
//                 </div>
//               </div>

//               <div className="flex flex-col sm:flex-row gap-3">
//                 <button
//                   onClick={() => setShowLogoutConfirm(false)}
//                   className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={handleLogout}
//                   className={`flex-1 px-4 py-3 ${getButtonGradient()} ${getButtonHover()} text-white rounded-xl font-medium transition-colors flex items-center justify-center gap-2`}
//                 >
//                   <LogOut className="h-4 w-4" />
//                   Yes, Logout
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Token Manager Popup */}
//       {showTokenManager && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm overflow-y-auto">
//           <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
//             <div className="sticky top-0 bg-white border-b border-gray-200 z-10">
//               <div className="flex items-center justify-between p-6">
//                 <div>
//                   <h2 className="text-xl font-bold text-gray-900">Token Manager</h2>
//                   <p className="text-gray-600 mt-1">Manage authentication tokens for companies</p>
//                 </div>
//                 <button
//                   onClick={() => setShowTokenManager(false)}
//                   className="p-2 hover:bg-gray-100 rounded-xl"
//                 >
//                   <X className="h-5 w-5 text-gray-500" />
//                 </button>
//               </div>
//             </div>

//             <div className="p-6">
//               {/* Generate New Token */}
//               <div className="mb-6">
//                 <h3 className="text-lg font-semibold text-gray-900 mb-4">Generate New Token</h3>
//                 <div className="flex flex-col sm:flex-row gap-3">
//                   <input
//                     type="text"
//                     placeholder="Enter token name (e.g., Production API)"
//                     value={newTokenName}
//                     onChange={(e) => setNewTokenName(e.target.value)}
//                     className={`flex-1 px-4 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 ${getRingColor()} focus:border-transparent`}
//                   />
//                   <button
//                     onClick={generateToken}
//                     className={`px-6 py-3 ${getButtonGradient()} ${getButtonHover()} text-white font-medium rounded-xl flex items-center gap-2 justify-center`}
//                   >
//                     <Key className="h-4 w-4" />
//                     Generate
//                   </button>
//                 </div>
//               </div>

//               {/* Existing Tokens */}
//               <div>
//                 <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
//                   <h3 className="text-lg font-semibold text-gray-900">Existing Tokens</h3>
//                   {tokens.length > 0 && (
//                     <button
//                       onClick={revokeAllTokens}
//                       className="px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-xl transition-colors self-end sm:self-auto"
//                     >
//                       Revoke All
//                     </button>
//                   )}
//                 </div>

//                 {tokens.length === 0 ? (
//                   <div className="text-center py-12">
//                     <Key className="h-12 w-12 text-gray-300 mx-auto mb-4" />
//                     <p className="text-gray-500">No tokens generated yet</p>
//                   </div>
//                 ) : (
//                   <div className="grid gap-3">
//                     {tokens.map((token) => (
//                       <div key={token.id} className="border border-gray-200 rounded-xl p-4 hover:bg-gray-50 transition-colors">
//                         <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
//                           <div className="flex-1 min-w-0">
//                             <h4 className="font-medium text-gray-900 truncate">{token.name}</h4>
//                             <p className="text-sm text-gray-500 truncate">{token.company}</p>
//                             <p className="text-xs text-gray-400 mt-1">
//                               Created: {new Date(token.createdAt).toLocaleDateString()}
//                             </p>
//                           </div>
//                           <div className="flex items-center gap-2 self-end sm:self-auto">
//                             <button
//                               onClick={() => copyToken(token.token)}
//                               className="p-2 hover:bg-gray-100 rounded-lg"
//                               title="Copy Token"
//                             >
//                               <Copy className="h-4 w-4 text-gray-600" />
//                             </button>
//                             <button
//                               onClick={() => deleteToken(token.id)}
//                               className="p-2 hover:bg-red-50 rounded-lg"
//                               title="Delete Token"
//                             >
//                               <Trash2 className="h-4 w-4 text-red-600" />
//                             </button>
//                           </div>
//                         </div>
//                         <div className="mt-2">
//                           <code className="text-xs bg-gray-100 px-3 py-2 rounded-lg block truncate">
//                             {token.token}
//                           </code>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* HEADER */}
//       <div className="mb-6">
//         <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
//           <div>
//             <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Company Management</h1>
//             <p className="text-gray-600 mt-1 text-sm sm:text-base">Manage all companies and their permissions</p>
//           </div>
          
//           <div className="flex items-center gap-3">
//             <div className="relative flex-1 sm:flex-none min-w-0">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
//               <input
//                 type="text"
//                 placeholder="Search companies..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className={`pl-10 pr-4 py-2 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 ${getRingColor()} focus:border-transparent w-full sm:w-64`}
//               />
//             </div>
            
//             {/* Token Manager Button */}
//             <button
//               onClick={() => setShowTokenManager(true)}
//               className="p-2 rounded-xl hover:bg-gray-100 hidden sm:inline-flex"
//               title="Token Manager"
//             >
//               <Key className="h-5 w-5 text-gray-600" />
//             </button>
            
//             <button 
//               className={`p-2 rounded-xl hover:opacity-90 hidden sm:inline-flex ${getLightBg()} ${getTextColorClass()}`}
//             >
//               <Filter className="h-5 w-5" />
//             </button>
            
//             <button className="relative p-2 hover:bg-gray-100 rounded-xl">
//               <Bell className="h-5 w-5 text-gray-600" />
//               <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
//             </button>
            
//             <button 
//               onClick={() => setShowLogoutConfirm(true)}
//               className="hidden sm:flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-xl text-sm hover:bg-gray-50"
//             >
//               <LogOut className="h-4 w-4" /> Logout
//             </button>
//           </div>
//         </div>

//         {/* Filter Bar with View Mode Toggle */}
//         <div className="flex flex-wrap items-center gap-2 mt-6">
//           {/* View Mode Toggle - Always Visible */}
//           <div className="flex items-center gap-2 p-1 bg-gray-100 rounded-xl">
//             <button
//               onClick={() => setViewMode('table')}
//               className={`px-3 py-1.5 text-sm rounded-lg flex items-center gap-2 transition-all ${
//                 viewMode === 'table' 
//                   ? `${getButtonGradient()} ${getButtonHover()} text-white shadow-sm` 
//                   : 'hover:bg-gray-200'
//               }`}
//             >
//               <List className="h-4 w-4" /> Table
//             </button>
//             <button
//               onClick={() => setViewMode('card')}
//               className={`px-3 py-1.5 text-sm rounded-lg flex items-center gap-2 transition-all ${
//                 viewMode === 'card' 
//                   ? `${getButtonGradient()} ${getButtonHover()} text-white shadow-sm` 
//                   : 'hover:bg-gray-200'
//               }`}
//             >
//               <Grid className="h-4 w-4" /> Cards
//             </button>
//           </div>
          
//           {/* Filter Buttons */}
//           <div className="flex flex-wrap gap-2">
//             {['all', 'active', 'inactive', 'admin', 'superadmin'].map((filter) => (
//               <button
//                 key={filter}
//                 onClick={() => setActiveFilter(filter)}
//                 className={`px-3 py-2 rounded-xl text-sm font-medium capitalize whitespace-nowrap transition-all ${
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
//       <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
//         <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl sm:rounded-2xl p-4 sm:p-6 text-white shadow-lg">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-blue-100 text-sm">Total Companies</p>
//               <p className="text-2xl sm:text-3xl font-bold mt-2">{summaryData.total}</p>
//             </div>
//             <Building className="h-8 w-8 sm:h-10 sm:w-10 opacity-80" />
//           </div>
//           <div className="flex items-center gap-1 mt-4">
//             <TrendingUp className="h-4 w-4" />
//             <span className="text-sm">All registered companies</span>
//           </div>
//         </div>

//         <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl sm:rounded-2xl p-4 sm:p-6 text-white shadow-lg">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-green-100 text-sm">Active Companies</p>
//               <p className="text-2xl sm:text-3xl font-bold mt-2">{summaryData.active}</p>
//             </div>
//             <UsersIcon className="h-8 w-8 sm:h-10 sm:w-10 opacity-80" />
//           </div>
//           <div className="flex items-center gap-1 mt-4">
//             <CheckCircle className="h-4 w-4" />
//             <span className="text-sm">Currently active</span>
//           </div>
//         </div>

//         <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl sm:rounded-2xl p-4 sm:p-6 text-white shadow-lg">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-purple-100 text-sm">Admin Users</p>
//               <p className="text-2xl sm:text-3xl font-bold mt-2">{summaryData.admins}</p>
//             </div>
//             <ShieldCheck className="h-8 w-8 sm:h-10 sm:w-10 opacity-80" />
//           </div>
//           <div className="flex items-center gap-1 mt-4">
//             <Crown className="h-4 w-4" />
//             <span className="text-sm">Admin & Super Admin</span>
//           </div>
//         </div>

//         <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl sm:rounded-2xl p-4 sm:p-6 text-white shadow-lg">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-orange-100 text-sm">Total Employees</p>
//               <p className="text-2xl sm:text-3xl font-bold mt-2">{summaryData.employees}</p>
//             </div>
//             <Users className="h-8 w-8 sm:h-10 sm:w-10 opacity-80" />
//           </div>
//           <div className="flex items-center gap-1 mt-4">
//             <TrendingUp className="h-4 w-4" />
//             <span className="text-sm">Across all companies</span>
//           </div>
//         </div>
//       </div>

//       {/* CREATE COMPANY BUTTON - Mobile Floating */}
//       <div className="fixed bottom-6 right-6 z-40 sm:hidden">
//         <button
//           onClick={() => openModal()}
//           className={`p-4 ${getButtonGradient()} ${getButtonHover()} text-white rounded-full shadow-xl flex items-center justify-center`}
//         >
//           <Plus className="h-6 w-6" />
//         </button>
//       </div>

//       {/* Token Manager Button - Mobile */}
//       <div className="fixed bottom-6 left-6 z-40 sm:hidden">
//         <button
//           onClick={() => setShowTokenManager(true)}
//           className="p-4 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-full shadow-xl flex items-center justify-center"
//         >
//           <Key className="h-5 w-5" />
//         </button>
//       </div>

//       {/* TABLE VIEW */}
//       {viewMode === 'table' && (
//         <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-gray-200/50 overflow-hidden">
//           {/* Table Header */}
//           <div className={`border-b border-gray-200 ${getLightBg()}`}>
//             <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 sm:p-6 gap-4">
//               <div>
//                 <h3 className="text-lg font-bold text-gray-900">Companies</h3>
//                 <p className="text-sm text-gray-500 mt-1">{filteredCompanies.length} companies found</p>
//               </div>
              
//               <div className="flex items-center gap-3">
//                 <button 
//                   onClick={() => setShowTokenManager(true)}
//                   className="p-2 hover:bg-gray-100 rounded-xl hidden sm:inline-flex"
//                   title="Token Manager"
//                 >
//                   <Key className="h-5 w-5 text-gray-600" />
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
//             <table className="w-full min-w-[1000px]">
//               <thead className="border-b border-gray-200">
//                 <tr className={`${getLightBg()}`}>
//                   <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Company</th>
//                   <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">ID</th>
//                   <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Contact</th>
//                   <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Office Hours</th>
//                   <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Location</th>
//                   <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Role</th>
//                   <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Status</th>
//                   <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Theme</th>
//                   <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Actions</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-200">
//                 {filteredCompanies.length === 0 ? (
//                   <tr>
//                     <td colSpan="9" className="px-4 py-8 text-center text-gray-500">
//                       No companies found. {searchQuery && 'Try a different search term.'}
//                     </td>
//                   </tr>
//                 ) : (
//                   filteredCompanies.map((company) => (
//                     <tr key={company.id} className="hover:bg-gray-50/50 transition-colors">
//                       <td className="px-4 py-3">
//                         <div className="flex items-center gap-3">
//                           <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center flex-shrink-0">
//                             {company.logo ? (
//                               <img src={company.logo} alt="logo" className="w-8 h-8 rounded-lg object-cover" />
//                             ) : (
//                               <Building className="h-5 w-5 text-white" />
//                             )}
//                           </div>
//                           <div className="text-left min-w-0">
//                             <p className="font-medium text-gray-900 truncate">{company.companyName}</p>
//                             <p className="text-sm text-gray-500 truncate">{company.username}</p>
//                           </div>
//                         </div>
//                       </td>
//                       <td className="px-4 py-3">
//                         <div className="flex items-center gap-2">
//                           <code className="text-xs font-mono bg-gray-100 px-2 py-1 rounded truncate max-w-[80px]">
//                             {company.companyId}
//                           </code>
//                           <button 
//                             onClick={() => copyToken(company.companyId)}
//                             className="p-1 hover:bg-gray-100 rounded hidden sm:inline-flex"
//                             title="Copy ID"
//                           >
//                             <Copy className="h-3 w-3 text-gray-500" />
//                           </button>
//                         </div>
//                       </td>
//                       <td className="px-4 py-3">
//                         <div className="space-y-1">
//                           <div className="flex items-center gap-1 text-sm text-gray-600">
//                             <Mail className="h-3 w-3 flex-shrink-0" />
//                             <span className="truncate max-w-[120px]">{company.email || 'No email'}</span>
//                           </div>
//                           <div className="flex items-center gap-1 text-sm text-gray-600">
//                             <Phone className="h-3 w-3 flex-shrink-0" />
//                             <span className="truncate max-w-[120px]">{company.phone || 'No phone'}</span>
//                           </div>
//                         </div>
//                       </td>
//                       <td className="px-4 py-3">
//                         <div className="space-y-1">
//                           <div className="flex items-center gap-1 text-sm text-gray-700">
//                             <Sun className="h-3 w-3 flex-shrink-0 text-yellow-500" />
//                             <span className="font-medium">In: {company.office_check_in || '09:00'}</span>
//                           </div>
//                           <div className="flex items-center gap-1 text-sm text-gray-700">
//                             <Moon className="h-3 w-3 flex-shrink-0 text-blue-500" />
//                             <span className="font-medium">Out: {company.office_check_out || '17:00'}</span>
//                           </div>
//                         </div>
//                       </td>
//                       <td className="px-4 py-3">
//                         <div className="space-y-1">
//                           {company.latitude && company.longitude ? (
//                             <>
//                               <div className="flex items-center gap-1 text-sm text-gray-600">
//                                 <Target className="h-3 w-3 flex-shrink-0 text-blue-500" />
//                                 <span className="truncate max-w-[100px]">
//                                   {company.latitude.slice(0, 8)}, {company.longitude.slice(0, 8)}
//                                 </span>
//                               </div>
//                               {company.location_name && (
//                                 <div className="text-xs text-gray-500 truncate max-w-[100px]">
//                                   {company.location_name}
//                                 </div>
//                               )}
//                             </>
//                           ) : (
//                             <div className="flex items-center gap-1 text-sm text-gray-400">
//                               <MapPin className="h-3 w-3 flex-shrink-0" />
//                               <span>No location set</span>
//                             </div>
//                           )}
//                         </div>
//                       </td>
//                       <td className="px-4 py-3">
//                         <span className={`inline-flex items-center px-2 py-1 rounded-lg text-xs font-medium ${
//                           company.role === 'superadmin' ? 'bg-purple-100 text-purple-800' :
//                           company.role === 'admin' ? 'bg-blue-100 text-blue-800' :
//                           company.role === 'companyleader' ? 'bg-green-100 text-green-800' :
//                           'bg-gray-100 text-gray-800'
//                         }`}>
//                           <Shield className="h-3 w-3 mr-1" />
//                           <span className="truncate max-w-[60px]">
//                             {company.role.charAt(0).toUpperCase() + company.role.slice(1)}
//                           </span>
//                         </span>
//                       </td>
//                       <td className="px-4 py-3">
//                         <span className={`inline-flex items-center px-2 py-1 rounded-lg text-xs font-medium ${
//                           company.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
//                         }`}>
//                           <div className={`w-2 h-2 rounded-full mr-2 ${company.status === 'active' ? 'bg-green-500' : 'bg-red-500'}`} />
//                           <span className="truncate">
//                             {company.status.charAt(0).toUpperCase() + company.status.slice(1)}
//                           </span>
//                         </span>
//                       </td>
//                       <td className="px-4 py-3">
//                         <div className="flex items-center gap-2">
//                           <div 
//                             className="w-6 h-6 rounded-lg shadow-sm flex-shrink-0"
//                             style={{ 
//                               background: getThemePreviewColor(company.theme)
//                             }}
//                           />
//                           <span className="text-sm text-gray-700 truncate max-w-[50px]">
//                             {company.theme?.name || 'Default'}
//                           </span>
//                         </div>
//                       </td>
//                       <td className="px-4 py-3">
//                         <div className="flex items-center gap-2">
//                           <button
//                             onClick={() => openModal(company)}
//                             className="p-2 hover:bg-blue-50 rounded-lg text-blue-600"
//                             title="Edit"
//                           >
//                             <Edit2 className="h-4 w-4" />
//                           </button>
//                           <button
//                             onClick={() => window.open(`/dashboard?company=${company.id}`, '_blank')}
//                             className="p-2 hover:bg-green-50 rounded-lg text-green-600"
//                             title="View Dashboard"
//                           >
//                             <ExternalLink className="h-4 w-4" />
//                           </button>
//                           <button
//                             onClick={() => confirmDelete(company)}
//                             disabled={isDeleting === company.id}
//                             className="p-2 hover:bg-red-50 rounded-lg text-red-600 disabled:opacity-50"
//                             title="Delete"
//                           >
//                             {isDeleting === company.id ? (
//                               <RefreshCw className="h-4 w-4 animate-spin" />
//                             ) : (
//                               <Trash2 className="h-4 w-4" />
//                             )}
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//           </div>

//           {/* Pagination */}
//           <div className="border-t border-gray-200 px-4 py-4">
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
//                         className={`w-8 h-8 rounded-lg font-medium ${
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
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//           {filteredCompanies.length === 0 ? (
//             <div className="col-span-3 text-center py-12 text-gray-500">
//               No companies found. {searchQuery && 'Try a different search term.'}
//             </div>
//           ) : (
//             filteredCompanies.map((company) => (
//               <div key={company.id} className="bg-white rounded-xl shadow-lg border border-gray-200/50 p-4 hover:shadow-xl transition-shadow">
//                 <div className="flex items-start justify-between mb-4">
//                   <div className="flex items-center gap-3">
//                     <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
//                       {company.logo ? (
//                         <img src={company.logo} alt="logo" className="w-8 h-8 rounded-lg object-cover" />
//                       ) : (
//                         <Building className="h-5 w-5 text-white" />
//                       )}
//                     </div>
//                     <div className="min-w-0">
//                       <h3 className="font-bold text-gray-900 truncate">{company.companyName}</h3>
//                       <p className="text-sm text-gray-500 truncate">{company.username}</p>
//                     </div>
//                   </div>
//                   <span className={`px-2 py-1 rounded-lg text-xs font-medium ${
//                     company.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
//                   }`}>
//                     {company.status}
//                   </span>
//                 </div>
                
//                 <div className="space-y-3 mb-4">
//                   <div className="flex items-center gap-2 text-sm text-gray-600">
//                     <Mail className="h-4 w-4 flex-shrink-0" />
//                     <span className="truncate">{company.email || 'No email'}</span>
//                   </div>
//                   <div className="flex items-center gap-2 text-sm text-gray-600">
//                     <Phone className="h-4 w-4 flex-shrink-0" />
//                     <span className="truncate">{company.phone || 'No phone'}</span>
//                   </div>
//                   <div className="flex items-center gap-2 text-sm text-gray-600">
//                     <Clock className="h-4 w-4 flex-shrink-0" />
//                     <span className="truncate">{company.office_check_in} - {company.office_check_out}</span>
//                   </div>
//                   <div className="flex items-center gap-2 text-sm text-gray-600">
//                     <MapPin className="h-4 w-4 flex-shrink-0" />
//                     <span className="truncate">
//                       {company.latitude && company.longitude 
//                         ? `${company.latitude.slice(0, 8)}, ${company.longitude.slice(0, 8)}`
//                         : 'No location set'
//                       }
//                     </span>
//                   </div>
//                 </div>
                
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center gap-3">
//                     <span className={`px-3 py-1 rounded-lg text-xs font-medium ${
//                       company.role === 'superadmin' ? 'bg-purple-100 text-purple-800' :
//                       company.role === 'admin' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
//                     }`}>
//                       {company.role}
//                     </span>
//                     <div 
//                       className="w-5 h-5 rounded-lg shadow-sm"
//                       style={{ 
//                         background: getThemePreviewColor(company.theme)
//                       }}
//                       title={company.theme?.name || 'Default Theme'}
//                     />
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <button
//                       onClick={() => openModal(company)}
//                       className="p-2 hover:bg-blue-50 rounded-lg text-blue-600"
//                       title="Edit"
//                     >
//                       <Edit2 className="h-4 w-4" />
//                     </button>
//                     <button
//                       onClick={() => confirmDelete(company)}
//                       className="p-2 hover:bg-red-50 rounded-lg text-red-600"
//                       title="Delete"
//                     >
//                       <Trash2 className="h-4 w-4" />
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))
//           )}
//         </div>
//       )}

//       {/* CREATE/EDIT MODAL */}
//       {isModalOpen && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-gray-900/60 backdrop-blur-sm overflow-y-auto">
//           <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl w-full max-w-6xl my-4 sm:my-8 mx-auto max-h-[90vh] sm:max-h-[95vh] overflow-y-auto">
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

//                   {/* Office Timings Section */}
//                   <div className="mb-6 sm:mb-8">
//                     <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
//                       <Clock className="h-4 w-4 sm:h-5 sm:w-5" /> Office Timings
//                     </h3>
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                           Office Check-in Time <span className="text-red-600">*</span>
//                         </label>
//                         <div className="relative">
//                           <Sun className="absolute left-3 top-2.5 sm:top-3.5 h-4 w-4 text-yellow-500" />
//                           <input
//                             type="time"
//                             required
//                             value={formData.office_check_in}
//                             onChange={e => setFormData(prev => ({ ...prev, office_check_in: e.target.value }))}
//                             className={`w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl text-sm focus:outline-none focus:ring-2 ${getRingColor()} focus:border-transparent`}
//                           />
//                         </div>
//                         <p className="text-xs text-gray-500 mt-1">Default office start time</p>
//                       </div>
                      
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                           Office Check-out Time <span className="text-red-600">*</span>
//                         </label>
//                         <div className="relative">
//                           <Moon className="absolute left-3 top-2.5 sm:top-3.5 h-4 w-4 text-blue-500" />
//                           <input
//                             type="time"
//                             required
//                             value={formData.office_check_out}
//                             onChange={e => setFormData(prev => ({ ...prev, office_check_out: e.target.value }))}
//                             className={`w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl text-sm focus:outline-none focus:ring-2 ${getRingColor()} focus:border-transparent`}
//                           />
//                         </div>
//                         <p className="text-xs text-gray-500 mt-1">Default office end time</p>
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
//                         </div>
//                       </div>
                      
//                       <div className="space-y-4">
//                         <div>
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
//                         </div>
                        
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-1">
//                             Office Address
//                           </label>
//                           <div className="flex flex-col sm:flex-row gap-2">
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
//                         </div>
                        
//                         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                           <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-1">
//                               Work Location Type
//                             </label>
//                             <select
//                               value={formData.work_location_type}
//                               onChange={e => setFormData(prev => ({ ...prev, work_location_type: e.target.value }))}
//                               className={`w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl text-sm focus:outline-none focus:ring-2 ${getRingColor()} focus:border-transparent`}
//                             >
//                               <option value="">Select Type</option>
//                               <option value="head_office">Head Office</option>
//                               <option value="branch_office">Branch Office</option>
//                               <option value="client_site">Client Site</option>
//                               <option value="home">Home</option>
//                               <option value="co_working">Co-working Space</option>
//                             </select>
//                           </div>
                          
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
//                         </div>
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
//                       {Object.values(THEMES).map(t => {
//                         const isSelected = formData.theme.id === t.id;
//                         const accentColor = t.accent?.replace('-600', '').replace('-500', '') || 'orange';
//                         const ringColorClass = `ring-${accentColor}-500`;
                        
//                         return (
//                           <button
//                             key={t.id}
//                             type="button"
//                             onClick={() => setFormData(prev => ({ ...prev, theme: t }))}
//                             className={`relative p-2 sm:p-3 rounded-lg sm:rounded-xl border transition-all hover:scale-105 ${
//                               isSelected 
//                                 ? `shadow-lg ring-2 ring-offset-1 sm:ring-offset-2 ${ringColorClass}` 
//                                 : 'border-gray-200 hover:border-gray-300'
//                             }`}
//                           >
//                             <div className="h-8 sm:h-12 rounded-lg overflow-hidden flex mb-1 sm:mb-2">
//                               {t.gradient ? (
//                                 <div 
//                                   className={`w-full h-full ${t.gradient}`}
//                                   style={t.customGradient ? {
//                                     background: t.customGradient
//                                   } : {}}
//                                 />
//                               ) : t.accent ? (
//                                 <div 
//                                   className="w-full h-full"
//                                   style={{
//                                     background: `linear-gradient(135deg, var(--${accentColor}-500), var(--${accentColor}-600))`
//                                   }}
//                                 />
//                               ) : (
//                                 <div className="w-full h-full bg-gradient-to-r from-orange-500 to-orange-600" />
//                               )}
//                             </div>
                            
//                             <div className="text-center">
//                               <div className="font-medium text-xs text-gray-900 truncate">
//                                 {t.name}
//                               </div>
//                               <div className="text-[10px] text-gray-500 truncate">
//                                 {accentColor.charAt(0).toUpperCase() + accentColor.slice(1)}
//                               </div>
//                             </div>
                            
//                             {isSelected && (
//                               <div className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-green-500 rounded-full flex items-center justify-center">
//                                 <Check className="h-2 w-2 sm:h-3 sm:w-3 text-white" />
//                               </div>
//                             )}
//                           </button>
//                         );
//                       })}
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
  Watch,
  LogOut,
  AlertTriangle,
  ExternalLink,
  Image,
  File,
  Eye as EyeIcon,
  Download as DownloadIcon,
  Upload,
  Camera,
  Link,
  FolderOpen,
  FileCheck,
  FileImage,
  FileText as FileTextIcon,
  FileUp,
  FileDown,
  FileX,
  FilePlus,
  FileMinus
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
  
  // Popup states
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [companyToDelete, setCompanyToDelete] = useState(null);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [showTokenManager, setShowTokenManager] = useState(false);
  const [tokens, setTokens] = useState([]);
  const [newTokenName, setNewTokenName] = useState('');
  const [generatedToken, setGeneratedToken] = useState('');
  const [showTokenGenerated, setShowTokenGenerated] = useState(false);
  
  // New state for company view modal
  const [showCompanyView, setShowCompanyView] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);
  
  // File states
  const [companyImage, setCompanyImage] = useState(null);
  const [companyDocuments, setCompanyDocuments] = useState([]);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [viewMode, setViewMode] = useState('table');
  const [page, setPage] = useState(1);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const totalPages = 2;

  // API Base URLs
  const API_BASE_URL = 'https://hr.hinzah.com';
  
  // Theme helper functions
  const getAccentColor = () => {
    if (appTheme?.accentColor) {
      if (appTheme.accentColor.startsWith('#')) {
        return appTheme.accentColor;
      }
      return `var(--${appTheme.accentColor})` || '#ea580c';
    }
    return '#ea580c';
  };
  
  const getAccentColorClass = () => {
    if (!appTheme?.accentColor) return 'orange-600';
    if (appTheme.accentColor.startsWith('#')) return 'orange-600';
    const color = appTheme.accentColor.replace('-600', '').replace('-500', '').replace('-700', '');
    return `${color}-600`;
  };
  
  const getBorderColor = () => appTheme?.borderColor || '#ea580c';
  const getTextAccent = () => appTheme?.accentColor || '#ea580c';
  
  const getButtonGradient = () => {
    if (appTheme?.buttonGradient) {
      if (appTheme.buttonGradient.includes('gradient-to')) {
        return appTheme.buttonGradient;
      }
    }
    const accentClass = getAccentColorClass().replace('-600', '');
    return `bg-gradient-to-r from-${accentClass}-500 to-${accentClass}-600`;
  };
  
  const getButtonHover = () => {
    const accentClass = getAccentColorClass().replace('-600', '');
    return `hover:from-${accentClass}-600 hover:to-${accentClass}-700`;
  };
  
  const getLightBg = () => {
    const accentClass = getAccentColorClass().replace('-600', '');
    return `bg-${accentClass}-50`;
  };
  
  const getRingColor = () => {
    const accentClass = getAccentColorClass().replace('-600', '');
    return `ring-${accentClass}-500`;
  };
  
  const getAlertBg = () => appTheme?.alertBg || 'bg-red-50';
  const getAlertText = () => appTheme?.alertText || 'text-red-800';
  const getAlertBorder = () => appTheme?.alertBorder || 'border-red-200';
  
  const getTextColorClass = () => {
    const accentClass = getAccentColorClass();
    return `text-${accentClass}`;
  };

  // Get theme preview color
 const getThemePreviewColor = (theme) => {
  if (!theme) return 'from-orange-500 to-orange-600';
  
  let themeId;
  
  // Get theme ID from various formats
  if (typeof theme === 'string') {
    themeId = theme;
  } else if (theme?.id) {
    themeId = theme.id;
  } else if (theme?.name) {
    // Find theme by name in THEMES
    const found = Object.values(THEMES).find(t => t.name === theme.name);
    if (found) {
      return found.gradient || 'from-orange-500 to-orange-600';
    }
  }
  
  // Get theme from THEMES by ID
  if (themeId && THEMES[themeId]) {
    return THEMES[themeId].gradient || 'from-orange-500 to-orange-600';
  }
  
  // Default fallback
  return 'from-orange-500 to-orange-600';
};

  // File handling functions
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        alert('Image size should be less than 5MB');
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        setCompanyImage(event.target.result);
        setFormData(prev => ({ ...prev, logo: event.target.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDocumentUpload = (e) => {
    const files = Array.from(e.target.files);
    const validFiles = files.filter(file => {
      const validTypes = ['application/pdf', 'image/jpeg', 'image/png', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!validTypes.includes(file.type)) {
        alert(`${file.name} is not a supported file type`);
        return false;
      }
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        alert(`${file.name} is too large (max 10MB)`);
        return false;
      }
      return true;
    });

    validFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const newDoc = {
          id: Date.now() + Math.random(),
          name: file.name,
          type: file.type,
          size: file.size,
          data: event.target.result,
          uploadedAt: new Date().toISOString()
        };
        setCompanyDocuments(prev => [...prev, newDoc]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeDocument = (id) => {
    setCompanyDocuments(prev => prev.filter(doc => doc.id !== id));
  };

  const downloadDocument = (doc) => {
    const link = document.createElement('a');
    link.href = doc.data;
    link.download = doc.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Default permissions
  const generateDefaultPermissions = (role = 'employee') => {
    const perms = {};
    MODULES.forEach(mod => {
      perms[mod.name] = {};
      (SUB_PERMISSIONS[mod.name] || []).forEach(sub => {
        perms[mod.name][sub.name] = {
          view: role === 'superadmin',
          create: false,
          edit: false,
          delete: false,
        };
      });
    });
    return perms;
  };

  const autoSetSuperAdminPermissions = () => {
    const newPermissions = {};
    MODULES.forEach(mod => {
      newPermissions[mod.name] = {};
      (SUB_PERMISSIONS[mod.name] || []).forEach(sub => {
        newPermissions[mod.name][sub.name] = {
          view: true,
          create: false,
          edit: false,
          delete: false,
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
    office_check_in: '09:00',
    office_check_out: '17:00',
    latitude: '',
    longitude: '',
    location_name: '',
    office_address: '',
    work_location_type: '',
    radius: '',
    branch: ''
  });

  // Load data on mount
  useEffect(() => {
    loadTokens();
    fetchCompanies();
  }, []);

  const loadTokens = () => {
    try {
      const savedTokens = localStorage.getItem('companyTokens');
      if (savedTokens) {
        setTokens(JSON.parse(savedTokens));
      }
    } catch (error) {
      console.error('Error loading tokens:', error);
    }
  };

  const saveTokens = (newTokens) => {
    localStorage.setItem('companyTokens', JSON.stringify(newTokens));
    setTokens(newTokens);
  };

  // Generate token
  const generateToken = () => {
    if (!newTokenName.trim()) {
      alert('Please enter a token name');
      return;
    }

    const token = `cmp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const newToken = {
      id: Date.now(),
      name: newTokenName,
      token: token,
      company: editingCompany?.companyName || 'All Companies',
      createdAt: new Date().toISOString(),
      lastUsed: null
    };

    const updatedTokens = [...tokens, newToken];
    saveTokens(updatedTokens);
    
    setGeneratedToken(token);
    setNewTokenName('');
    setShowTokenGenerated(true);
    
    setTimeout(() => setShowTokenGenerated(false), 5000);
  };

  const deleteToken = (tokenId) => {
    if (confirm('Are you sure you want to delete this token?')) {
      const updatedTokens = tokens.filter(t => t.id !== tokenId);
      saveTokens(updatedTokens);
      triggerSuccess('Token deleted successfully!');
    }
  };

  const copyToken = (token) => {
    navigator.clipboard.writeText(token).then(() => {
      triggerSuccess('Token copied to clipboard!');
    });
  };

  const revokeAllTokens = () => {
    if (confirm('Are you sure you want to revoke ALL tokens? This action cannot be undone.')) {
      saveTokens([]);
      triggerSuccess('All tokens have been revoked!');
    }
  };

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

  // Location functions
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

  // Fetch companies
  const fetchCompanies = async () => {
    setIsLoading(true);
    try {
       const token = localStorage.getItem('authToken') || 
                    localStorage.getItem('token') || 
                    localStorage.getItem('access_token') ||
                    localStorage.getItem('jwtToken') ||
                    localStorage.getItem('userToken');

                       if (!token) {
      // No token found, redirect to login
      window.location.href = '/admin/login';
      return;
    }
      
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
          documents: company.documents || [],
          office_check_in: company.office_check_in || '09:00',
          office_check_out: company.office_check_out || '17:00',
          latitude: company.latitude || '',
          longitude: company.longitude || '',
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

  // Open view modal for a company
  const openCompanyView = (company) => {
    setSelectedCompany(company);
    setShowCompanyView(true);
  };

  // Toggle company status
  const toggleCompanyStatus = async (company) => {
    const newStatus = company.status === 'active' ? 'inactive' : 'active';
    
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

      const response = await fetch(`${API_BASE_URL}/api/admin/companies/status/${company.id}`, {
        method: 'PUT',
        headers: headers,
        body: JSON.stringify({ status: newStatus })
      });

      if (response.ok) {
        // Update local state
        setCompanies(prev => prev.map(c => 
          c.id === company.id ? { ...c, status: newStatus } : c
        ));
        
        if (selectedCompany?.id === company.id) {
          setSelectedCompany(prev => ({ ...prev, status: newStatus }));
        }
        
        triggerSuccess(`Company ${newStatus === 'active' ? 'activated' : 'deactivated'} successfully!`);
      } else {
        throw new Error('Failed to update status');
      }
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Failed to update company status');
    }
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
        office_check_in: company.office_check_in || '09:00',
        office_check_out: company.office_check_out || '17:00',
        latitude: company.latitude || '',
        longitude: company.longitude || '',
        location_name: company.location_name || '',
        office_address: company.office_address || company.address || '',
      });
      setCompanyImage(company.logo || null);
      setCompanyDocuments(company.documents || []);
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
        office_check_in: '09:00',
        office_check_out: '17:00',
        latitude: '',
        longitude: '',
        location_name: '',
        office_address: '',
        work_location_type: '',
        radius: '',
        branch: ''
      });
      setCompanyImage(null);
      setCompanyDocuments([]);
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
    setCompanyImage(null);
    setCompanyDocuments([]);
    setIsLoading(false);
    setIsGettingLocation(false);
  };

  const closeCompanyView = () => {
    setShowCompanyView(false);
    setSelectedCompany(null);
  };

  // Delete company
  const confirmDelete = (company) => {
    setCompanyToDelete(company);
    setShowDeleteConfirm(true);
  };

  const handleDelete = async () => {
    if (!companyToDelete) return;

    setIsDeleting(companyToDelete.id);
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

      const response = await fetch(`${API_BASE_URL}/api/admin/companies/delete/${companyToDelete.id}`, {
        method: 'DELETE',
        headers: headers,
      });

      if (response.ok) {
        setCompanies(prev => prev.filter(c => c.id !== companyToDelete.id));
        triggerSuccess('Company deleted successfully!');
        
        const updatedTokens = tokens.filter(t => t.company !== companyToDelete.companyName);
        saveTokens(updatedTokens);
        
        if (showCompanyView && selectedCompany?.id === companyToDelete.id) {
          closeCompanyView();
        }
      } else {
        const errorText = await response.text();
        throw new Error(`Failed to delete: ${errorText}`);
      }
    } catch (error) {
      console.error('Delete error:', error);
      alert(`Error deleting company: ${error.message}`);
    } finally {
      setIsDeleting(null);
      setCompanyToDelete(null);
      setShowDeleteConfirm(false);
    }
  };

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('token');
    localStorage.removeItem('access_token');
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('userToken');
    localStorage.removeItem('companyTokens');
    window.location.href = '/login';
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
      const token = localStorage.getItem('authToken');
      
      if (!token) {
        throw new Error('No authentication token found. Please login again.');
      }

      console.log('Using token:', token.substring(0, 20) + '...');

      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json'
      };

      const companyPayload = {
        username: formData.username.trim(),
        company_name: formData.companyName.trim(),
        company_code: formData.companyId.trim(),
        role: formData.role,
        theme: formData.theme?.id || formData.theme?.name || formData.theme || 'default',
        address: formData.address.trim(),
        phone: formData.phone.trim(),
        logo: formData.logo,
        documents: companyDocuments,
        status: formData.status,
        ...(formData.email && { email: formData.email.trim() }),
        ...(formData.password && { password: formData.password }),
        office_check_in: formData.office_check_in || '09:00:00',
        office_check_out: formData.office_check_out || '17:00:00',
        ...(formData.latitude && { latitude: formData.latitude }),
        ...(formData.longitude && { longitude: formData.longitude })
      };

      console.log('Company payload:', companyPayload);

      const companyUrl = `https://hr.hinzah.com/api/admin/companies/create`;
      
      console.log('Sending request to:', companyUrl);
      
      const companyResponse = await fetch(companyUrl, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(companyPayload),
        mode: 'cors',
        credentials: 'include'
      });

      console.log('Company response status:', companyResponse.status);
      
      if (companyResponse.redirected) {
        console.warn('Request was redirected to:', companyResponse.url);
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
      
      if (error.message.includes('CORS') || error.message.includes('Failed to fetch')) {
        alert('Network error. Please check if you are logged in and try again.');
      } else if (error.message.includes('No authentication token')) {
        alert('Your session has expired. Please login again.');
        window.location.href = '/login';
      } else {
        alert(`Failed to save company: ${error.message}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleCompanyCreationSuccess = async (companyData, headers) => {
    const companyCode = companyData.company_code || companyData.companyCode || formData.companyId.trim();
    
    if (!companyCode) {
      throw new Error('No company code returned from API');
    }

    console.log('Using company code:', companyCode);
    
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
        }
      } catch (locationError) {
        console.warn('Location API error:', locationError);
      }
    }

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
      }
    } catch (permissionsError) {
      console.warn('Permissions API error:', permissionsError);
    }

    await fetchCompanies();
    closeModal();
    triggerSuccess('Company created successfully!');
  };

  // Filter companies
  const filteredCompanies = companies.filter(company => {
    const matchesSearch = 
      (company.username?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
      (company.companyId?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
      (company.email?.toLowerCase() || '').includes(searchQuery.toLowerCase());
    
    if (activeFilter === 'all') return matchesSearch;
    if (activeFilter === 'active') return matchesSearch && company.status === 'active';
    if (activeFilter === 'inactive') return matchesSearch && company.status === 'inactive';
    if (activeFilter === 'admin') return matchesSearch && company.role === 'admin';
    if (activeFilter === 'superadmin') return matchesSearch && company.role === 'superadmin';
    return matchesSearch;
  });

  const summaryData = {
    total: companies.length,
    active: companies.filter(c => c.status === 'active').length,
    admins: companies.filter(c => c.role === 'admin' || c.role === 'superadmin').length,
    employees: companies.reduce((sum, c) => sum + (c.employees || 0), 0),
  };

  return (
    <div className="min-h-screen p-2 sm:p-4 md:p-6 overflow-x-hidden">
      {/* Success Toast */}
      {showSuccess && (
        <div className="fixed top-4 right-4 z-50 animate-slide-in">
          <div className={`p-4 rounded-xl shadow-lg border ${getAlertBorder()} ${getAlertBg()} max-w-sm`}>
            <div className="flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <div className="flex-1">
                <p className="font-medium text-gray-900">Success!</p>
                <p className="text-sm text-gray-600">{successMessage}</p>
              </div>
              <button 
                onClick={() => setShowSuccess(false)}
                className="p-1 hover:bg-gray-100 rounded-lg"
              >
                <X className="h-4 w-4 text-gray-500" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Generated Token Toast */}
      {showTokenGenerated && generatedToken && (
        <div className="fixed top-20 right-4 z-50 animate-slide-in">
          <div className="p-4 rounded-xl shadow-lg border border-green-200 bg-green-50 max-w-sm">
            <div className="flex items-center gap-3">
              <Key className="h-5 w-5 text-green-500" />
              <div className="flex-1">
                <p className="font-medium text-green-900">Token Generated!</p>
                <p className="text-sm text-green-700 truncate">{generatedToken}</p>
                <p className="text-xs text-green-600 mt-1">Copy and save this token securely</p>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => copyToken(generatedToken)}
                  className="p-1 hover:bg-green-100 rounded-lg"
                  title="Copy Token"
                >
                  <Copy className="h-4 w-4 text-green-600" />
                </button>
                <button 
                  onClick={() => setShowTokenGenerated(false)}
                  className="p-1 hover:bg-green-100 rounded-lg"
                >
                  <X className="h-4 w-4 text-green-600" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Popup */}
      {showDeleteConfirm && companyToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-full bg-red-100">
                  <AlertTriangle className="h-6 w-6 text-red-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">Delete Company</h3>
              </div>
              
              <div className="mb-6">
                <p className="text-gray-600 mb-2">
                  Are you sure you want to delete <span className="font-semibold text-gray-900">{companyToDelete.companyName}</span>?
                </p>
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <p className="text-sm text-red-800">
                    <span className="font-semibold">Warning:</span> This action cannot be undone. All company data, including tokens, will be permanently deleted.
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className={`flex-1 px-4 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl font-medium hover:from-red-600 hover:to-red-700 transition-colors disabled:opacity-70 flex items-center justify-center gap-2`}
                >
                  {isDeleting ? (
                    <>
                      <RefreshCw className="h-4 w-4 animate-spin" />
                      Deleting...
                    </>
                  ) : (
                    <>
                      <Trash2 className="h-4 w-4" />
                      Delete Company
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Company View Modal */}
      {showCompanyView && selectedCompany && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 z-10">
              <div className="flex items-center justify-between p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                    {selectedCompany.logo ? (
                      <img src={selectedCompany.logo} alt="logo" className="w-10 h-10 rounded-lg object-cover" />
                    ) : (
                      <Building className="h-6 w-6 text-white" />
                    )}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">{selectedCompany.companyName}</h2>
                    <p className="text-gray-600 mt-1">{selectedCompany.username}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => toggleCompanyStatus(selectedCompany)}
                    className={`px-4 py-2 rounded-xl font-medium ${
                      selectedCompany.status === 'active'
                        ? 'bg-red-100 text-red-700 hover:bg-red-200'
                        : 'bg-green-100 text-green-700 hover:bg-green-200'
                    }`}
                  >
                    {selectedCompany.status === 'active' ? 'Deactivate' : 'Activate'}
                  </button>
                  <button
                    onClick={() => openModal(selectedCompany)}
                    className="px-4 py-2 bg-blue-100 text-blue-700 rounded-xl font-medium hover:bg-blue-200"
                  >
                    Edit
                  </button>
                  <button
                    onClick={closeCompanyView}
                    className="p-2 hover:bg-gray-100 rounded-xl"
                  >
                    <X className="h-5 w-5 text-gray-500" />
                  </button>
                </div>
              </div>
            </div>

            <div className="p-6">
              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Mail className="h-4 w-4 text-gray-500" />
                    <h4 className="font-semibold text-gray-900">Email</h4>
                  </div>
                  <p className="text-gray-700">{selectedCompany.email || 'Not provided'}</p>
                </div>
                
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Phone className="h-4 w-4 text-gray-500" />
                    <h4 className="font-semibold text-gray-900">Phone</h4>
                  </div>
                  <p className="text-gray-700">{selectedCompany.phone || 'Not provided'}</p>
                </div>
                
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <h4 className="font-semibold text-gray-900">Office Hours</h4>
                  </div>
                  <p className="text-gray-700">{selectedCompany.office_check_in} - {selectedCompany.office_check_out}</p>
                </div>
                
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="h-4 w-4 text-gray-500" />
                    <h4 className="font-semibold text-gray-900">Role</h4>
                  </div>
                  <span className={`px-2 py-1 rounded-lg text-xs font-medium ${
                    selectedCompany.role === 'superadmin' ? 'bg-purple-100 text-purple-800' :
                    selectedCompany.role === 'admin' ? 'bg-blue-100 text-blue-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {selectedCompany.role}
                  </span>
                </div>
                
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`w-2 h-2 rounded-full ${selectedCompany.status === 'active' ? 'bg-green-500' : 'bg-red-500'}`} />
                    <h4 className="font-semibold text-gray-900">Status</h4>
                  </div>
                  <span className={`px-2 py-1 rounded-lg text-xs font-medium ${
                    selectedCompany.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {selectedCompany.status}
                  </span>
                </div>
                
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Palette className="h-4 w-4 text-gray-500" />
                    <h4 className="font-semibold text-gray-900">Theme</h4>
                  </div>
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-5 h-5 rounded-lg shadow-sm"
                      style={{ 
                        background: getThemePreviewColor(selectedCompany.theme)
                      }}
                    />
                    <span className="text-gray-700">{selectedCompany.theme?.name || 'Default'}</span>
                  </div>
                </div>
              </div>

              {/* Documents Section */}
              {selectedCompany.documents && selectedCompany.documents.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <FileTextIcon className="h-5 w-5" /> Company Documents
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedCompany.documents.map((doc, index) => (
                      <div key={index} className="border border-gray-200 rounded-xl p-4 hover:bg-gray-50 transition-colors">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-100 rounded-lg">
                              <FileTextIcon className="h-5 w-5 text-blue-600" />
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900 truncate">{doc.name}</h4>
                              <p className="text-sm text-gray-500">
                                {(doc.size / 1024).toFixed(1)} KB
                              </p>
                            </div>
                          </div>
                          <button
                            onClick={() => window.open(doc.data, '_blank')}
                            className="p-2 hover:bg-gray-100 rounded-lg"
                            title="View Document"
                          >
                            <EyeIcon className="h-4 w-4 text-gray-600" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Location Information */}
              {(selectedCompany.latitude || selectedCompany.address) && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <MapPin className="h-5 w-5" /> Location
                  </h3>
                  <div className="bg-gray-50 rounded-xl p-4">
                    {selectedCompany.address && (
                      <div className="mb-3">
                        <p className="text-sm text-gray-600 mb-1">Address:</p>
                        <p className="text-gray-900">{selectedCompany.address}</p>
                      </div>
                    )}
                    {selectedCompany.latitude && selectedCompany.longitude && (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Target className="h-4 w-4" />
                        <span>Coordinates: {selectedCompany.latitude.slice(0, 8)}, {selectedCompany.longitude.slice(0, 8)}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Logout Confirmation Popup */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-full bg-yellow-100">
                  <LogOut className="h-6 w-6 text-yellow-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">Logout</h3>
              </div>
              
              <div className="mb-6">
                <p className="text-gray-600 mb-2">
                  Are you sure you want to logout? All authentication tokens will be cleared.
                </p>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                  <p className="text-sm text-yellow-800">
                    This will revoke all active tokens and you will need to login again.
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => setShowLogoutConfirm(false)}
                  className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleLogout}
                  className={`flex-1 px-4 py-3 ${getButtonGradient()} ${getButtonHover()} text-white rounded-xl font-medium transition-colors flex items-center justify-center gap-2`}
                >
                  <LogOut className="h-4 w-4" />
                  Yes, Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Token Manager Popup */}
      {showTokenManager && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 z-10">
              <div className="flex items-center justify-between p-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Token Manager</h2>
                  <p className="text-gray-600 mt-1">Manage authentication tokens for companies</p>
                </div>
                <button
                  onClick={() => setShowTokenManager(false)}
                  className="p-2 hover:bg-gray-100 rounded-xl"
                >
                  <X className="h-5 w-5 text-gray-500" />
                </button>
              </div>
            </div>

            <div className="p-6">
              {/* Generate New Token */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Generate New Token</h3>
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="text"
                    placeholder="Enter token name (e.g., Production API)"
                    value={newTokenName}
                    onChange={(e) => setNewTokenName(e.target.value)}
                    className={`flex-1 px-4 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 ${getRingColor()} focus:border-transparent`}
                  />
                  <button
                    onClick={generateToken}
                    className={`px-6 py-3 ${getButtonGradient()} ${getButtonHover()} text-white font-medium rounded-xl flex items-center gap-2 justify-center`}
                  >
                    <Key className="h-4 w-4" />
                    Generate
                  </button>
                </div>
              </div>

              {/* Existing Tokens */}
              <div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
                  <h3 className="text-lg font-semibold text-gray-900">Existing Tokens</h3>
                  {tokens.length > 0 && (
                    <button
                      onClick={revokeAllTokens}
                      className="px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-xl transition-colors self-end sm:self-auto"
                    >
                      Revoke All
                    </button>
                  )}
                </div>

                {tokens.length === 0 ? (
                  <div className="text-center py-12">
                    <Key className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">No tokens generated yet</p>
                  </div>
                ) : (
                  <div className="grid gap-3">
                    {tokens.map((token) => (
                      <div key={token.id} className="border border-gray-200 rounded-xl p-4 hover:bg-gray-50 transition-colors">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-gray-900 truncate">{token.name}</h4>
                            <p className="text-sm text-gray-500 truncate">{token.company}</p>
                            <p className="text-xs text-gray-400 mt-1">
                              Created: {new Date(token.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="flex items-center gap-2 self-end sm:self-auto">
                            <button
                              onClick={() => copyToken(token.token)}
                              className="p-2 hover:bg-gray-100 rounded-lg"
                              title="Copy Token"
                            >
                              <Copy className="h-4 w-4 text-gray-600" />
                            </button>
                            <button
                              onClick={() => deleteToken(token.id)}
                              className="p-2 hover:bg-red-50 rounded-lg"
                              title="Delete Token"
                            >
                              <Trash2 className="h-4 w-4 text-red-600" />
                            </button>
                          </div>
                        </div>
                        <div className="mt-2">
                          <code className="text-xs bg-gray-100 px-3 py-2 rounded-lg block truncate">
                            {token.token}
                          </code>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* HEADER */}
      <div className="mb-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Company Management</h1>
            <p className="text-gray-600 mt-1 text-sm sm:text-base">Manage all companies and their permissions</p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative flex-1 sm:flex-none min-w-0">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search companies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`pl-10 pr-4 py-2 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 ${getRingColor()} focus:border-transparent w-full sm:w-64`}
              />
            </div>
            
            {/* Token Manager Button */}
            <button
              onClick={() => setShowTokenManager(true)}
              className="p-2 rounded-xl hover:bg-gray-100 hidden sm:inline-flex"
              title="Token Manager"
            >
              <Key className="h-5 w-5 text-gray-600" />
            </button>
            
            <button 
              className={`p-2 rounded-xl hover:opacity-90 hidden sm:inline-flex ${getLightBg()} ${getTextColorClass()}`}
            >
              <Filter className="h-5 w-5" />
            </button>
            
            <button className="relative p-2 hover:bg-gray-100 rounded-xl">
              <Bell className="h-5 w-5 text-gray-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            
            <button 
              onClick={() => setShowLogoutConfirm(true)}
              className="hidden sm:flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-xl text-sm hover:bg-gray-50"
            >
              <LogOut className="h-4 w-4" /> Logout
            </button>
          </div>
        </div>

        {/* Filter Bar with View Mode Toggle */}
        <div className="flex flex-wrap items-center gap-2 mt-6">
          {/* View Mode Toggle */}
          <div className="flex items-center gap-2 p-1 bg-gray-100 rounded-xl">
            <button
              onClick={() => setViewMode('table')}
              className={`px-3 py-1.5 text-sm rounded-lg flex items-center gap-2 transition-all ${
                viewMode === 'table' 
                  ? `${getButtonGradient()} ${getButtonHover()} text-white shadow-sm` 
                  : 'hover:bg-gray-200'
              }`}
            >
              <List className="h-4 w-4" /> Table
            </button>
            <button
              onClick={() => setViewMode('card')}
              className={`px-3 py-1.5 text-sm rounded-lg flex items-center gap-2 transition-all ${
                viewMode === 'card' 
                  ? `${getButtonGradient()} ${getButtonHover()} text-white shadow-sm` 
                  : 'hover:bg-gray-200'
              }`}
            >
              <Grid className="h-4 w-4" /> Cards
            </button>
          </div>
          
          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-2">
            {['all', 'active', 'inactive', 'admin', 'superadmin'].map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-3 py-2 rounded-xl text-sm font-medium capitalize whitespace-nowrap transition-all ${
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
      <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl sm:rounded-2xl p-4 sm:p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm">Total Companies</p>
              <p className="text-2xl sm:text-3xl font-bold mt-2">{summaryData.total}</p>
            </div>
            <Building className="h-8 w-8 sm:h-10 sm:w-10 opacity-80" />
          </div>
          <div className="flex items-center gap-1 mt-4">
            <TrendingUp className="h-4 w-4" />
            <span className="text-sm">All registered companies</span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl sm:rounded-2xl p-4 sm:p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm">Active Companies</p>
              <p className="text-2xl sm:text-3xl font-bold mt-2">{summaryData.active}</p>
            </div>
            <UsersIcon className="h-8 w-8 sm:h-10 sm:w-10 opacity-80" />
          </div>
          <div className="flex items-center gap-1 mt-4">
            <CheckCircle className="h-4 w-4" />
            <span className="text-sm">Currently active</span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl sm:rounded-2xl p-4 sm:p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm">Admin Users</p>
              <p className="text-2xl sm:text-3xl font-bold mt-2">{summaryData.admins}</p>
            </div>
            <ShieldCheck className="h-8 w-8 sm:h-10 sm:w-10 opacity-80" />
          </div>
          <div className="flex items-center gap-1 mt-4">
            <Crown className="h-4 w-4" />
            <span className="text-sm">Admin & Super Admin</span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl sm:rounded-2xl p-4 sm:p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-sm">Total Employees</p>
              <p className="text-2xl sm:text-3xl font-bold mt-2">{summaryData.employees}</p>
            </div>
            <Users className="h-8 w-8 sm:h-10 sm:w-10 opacity-80" />
          </div>
          <div className="flex items-center gap-1 mt-4">
            <TrendingUp className="h-4 w-4" />
            <span className="text-sm">Across all companies</span>
          </div>
        </div>
      </div>

      {/* CREATE COMPANY BUTTON - Mobile Floating */}
      <div className="fixed bottom-6 right-6 z-40 sm:hidden">
        <button
          onClick={() => openModal()}
          className={`p-4 ${getButtonGradient()} ${getButtonHover()} text-white rounded-full shadow-xl flex items-center justify-center`}
        >
          <Plus className="h-6 w-6" />
        </button>
      </div>

      {/* Token Manager Button - Mobile */}
      <div className="fixed bottom-6 left-6 z-40 sm:hidden">
        <button
          onClick={() => setShowTokenManager(true)}
          className="p-4 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-full shadow-xl flex items-center justify-center"
        >
          <Key className="h-5 w-5" />
        </button>
      </div>

      {/* TABLE VIEW */}
      {viewMode === 'table' && (
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-gray-200/50 overflow-hidden">
          {/* Table Header */}
          <div className={`border-b border-gray-200 ${getLightBg()}`}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 sm:p-6 gap-4">
              <div>
                <h3 className="text-lg font-bold text-gray-900">Companies</h3>
                <p className="text-sm text-gray-500 mt-1">{filteredCompanies.length} companies found</p>
              </div>
              
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setShowTokenManager(true)}
                  className="p-2 hover:bg-gray-100 rounded-xl hidden sm:inline-flex"
                  title="Token Manager"
                >
                  <Key className="h-5 w-5 text-gray-600" />
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
            <table className="w-full min-w-[1000px]">
              <thead className="border-b border-gray-200">
                <tr className={`${getLightBg()}`}>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Company</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">ID</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Contact</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Office Hours</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Role</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Status</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Theme</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredCompanies.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="px-4 py-8 text-center text-gray-500">
                      No companies found. {searchQuery && 'Try a different search term.'}
                    </td>
                  </tr>
                ) : (
                  filteredCompanies.map((company) => (
                    <tr key={company.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center flex-shrink-0">
                            {company.logo ? (
                              <img src={company.logo} alt="logo" className="w-8 h-8 rounded-lg object-cover" />
                            ) : (
                              <Building className="h-5 w-5 text-white" />
                            )}
                          </div>
                          <div className="text-left min-w-0">
                            <p className="font-medium text-gray-900 truncate">{company.companyName}</p>
                            <p className="text-sm text-gray-500 truncate">{company.username}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <code className="text-xs font-mono bg-gray-100 px-2 py-1 rounded truncate max-w-[80px]">
                            {company.companyId}
                          </code>
                          <button 
                            onClick={() => copyToken(company.companyId)}
                            className="p-1 hover:bg-gray-100 rounded hidden sm:inline-flex"
                            title="Copy ID"
                          >
                            <Copy className="h-3 w-3 text-gray-500" />
                          </button>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="space-y-1">
                          <div className="flex items-center gap-1 text-sm text-gray-600">
                            <Mail className="h-3 w-3 flex-shrink-0" />
                            <span className="truncate max-w-[120px]">{company.email || 'No email'}</span>
                          </div>
                          <div className="flex items-center gap-1 text-sm text-gray-600">
                            <Phone className="h-3 w-3 flex-shrink-0" />
                            <span className="truncate max-w-[120px]">{company.phone || 'No phone'}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="space-y-1">
                          <div className="flex items-center gap-1 text-sm text-gray-700">
                            <Sun className="h-3 w-3 flex-shrink-0 text-yellow-500" />
                            <span className="font-medium">In: {company.office_check_in || '09:00'}</span>
                          </div>
                          <div className="flex items-center gap-1 text-sm text-gray-700">
                            <Moon className="h-3 w-3 flex-shrink-0 text-blue-500" />
                            <span className="font-medium">Out: {company.office_check_out || '17:00'}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center px-2 py-1 rounded-lg text-xs font-medium ${
                          company.role === 'superadmin' ? 'bg-purple-100 text-purple-800' :
                          company.role === 'admin' ? 'bg-blue-100 text-blue-800' :
                          company.role === 'companyleader' ? 'bg-green-100 text-green-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          <Shield className="h-3 w-3 mr-1" />
                          <span className="truncate max-w-[60px]">
                            {company.role.charAt(0).toUpperCase() + company.role.slice(1)}
                          </span>
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => toggleCompanyStatus(company)}
                            className={`text-xs font-medium px-2 py-1 rounded-lg ${
                              company.status === 'active'
                                ? 'bg-red-100 text-red-700 hover:bg-red-200'
                                : 'bg-green-100 text-green-700 hover:bg-green-200'
                            }`}
                          >
                            {company.status === 'active' ? 'Deactivate' : 'Activate'}
                          </button>
                          <span className={`inline-flex items-center px-2 py-1 rounded-lg text-xs font-medium ${
                            company.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            <div className={`w-2 h-2 rounded-full mr-2 ${company.status === 'active' ? 'bg-green-500' : 'bg-red-500'}`} />
                            <span className="truncate">
                              {company.status.charAt(0).toUpperCase() + company.status.slice(1)}
                            </span>
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div 
                            className="w-6 h-6 rounded-lg shadow-sm flex-shrink-0"
                            style={{ 
                              background: getThemePreviewColor(company.theme)
                            }}
                          />
                          <span className="text-sm text-gray-700 truncate max-w-[50px]">
                            {company.theme?.name || 'Default'}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => openCompanyView(company)}
                            className="p-2 hover:bg-gray-100 rounded-lg text-gray-600"
                            title="View Details"
                          >
                            <EyeIcon className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => openModal(company)}
                            className="p-2 hover:bg-blue-50 rounded-lg text-blue-600"
                            title="Edit"
                          >
                            <Edit2 className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => window.open(`/dashboard?company=${company.id}`, '_blank')}
                            className="p-2 hover:bg-green-50 rounded-lg text-green-600"
                            title="View Dashboard"
                          >
                            <ExternalLink className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => confirmDelete(company)}
                            disabled={isDeleting === company.id}
                            className="p-2 hover:bg-red-50 rounded-lg text-red-600 disabled:opacity-50"
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
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="border-t border-gray-200 px-4 py-4">
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
                        className={`w-8 h-8 rounded-lg font-medium ${
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

      {/* CARD VIEW */}
      {viewMode === 'card' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCompanies.length === 0 ? (
            <div className="col-span-3 text-center py-12 text-gray-500">
              No companies found. {searchQuery && 'Try a different search term.'}
            </div>
          ) : (
            filteredCompanies.map((company) => (
              <div key={company.id} className="bg-white rounded-xl shadow-lg border border-gray-200/50 p-4 hover:shadow-xl transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                      {company.logo ? (
                        <img src={company.logo} alt="logo" className="w-8 h-8 rounded-lg object-cover" />
                      ) : (
                        <Building className="h-5 w-5 text-white" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-bold text-gray-900 truncate">{company.companyName}</h3>
                      <p className="text-sm text-gray-500 truncate">{company.username}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <button
                      onClick={() => toggleCompanyStatus(company)}
                      className={`text-xs font-medium px-2 py-1 rounded-lg ${
                        company.status === 'active'
                          ? 'bg-red-100 text-red-700 hover:bg-red-200'
                          : 'bg-green-100 text-green-700 hover:bg-green-200'
                      }`}
                    >
                      {company.status === 'active' ? 'Deactivate' : 'Activate'}
                    </button>
                    <span className={`px-2 py-1 rounded-lg text-xs font-medium ${
                      company.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {company.status}
                    </span>
                  </div>
                </div>
                
                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Mail className="h-4 w-4 flex-shrink-0" />
                    <span className="truncate">{company.email || 'No email'}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Phone className="h-4 w-4 flex-shrink-0" />
                    <span className="truncate">{company.phone || 'No phone'}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock className="h-4 w-4 flex-shrink-0" />
                    <span className="truncate">{company.office_check_in} - {company.office_check_out}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-lg text-xs font-medium ${
                      company.role === 'superadmin' ? 'bg-purple-100 text-purple-800' :
                      company.role === 'admin' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {company.role}
                    </span>
                    <div 
                      className="w-5 h-5 rounded-lg shadow-sm"
                      style={{ 
                        background: getThemePreviewColor(company.theme)
                      }}
                      title={company.theme?.name || 'Default Theme'}
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => openCompanyView(company)}
                      className="p-2 hover:bg-gray-100 rounded-lg text-gray-600"
                      title="View Details"
                    >
                      <EyeIcon className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => openModal(company)}
                      className="p-2 hover:bg-blue-50 rounded-lg text-blue-600"
                      title="Edit"
                    >
                      <Edit2 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => confirmDelete(company)}
                      className="p-2 hover:bg-red-50 rounded-lg text-red-600"
                      title="Delete"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* CREATE/EDIT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-gray-900/60 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl w-full max-w-6xl my-4 sm:my-8 mx-auto max-h-[90vh] sm:max-h-[95vh] overflow-y-auto">
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
                  {/* Company Image Upload */}
                  <div className="mb-6 sm:mb-8">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <Image className="h-4 w-4 sm:h-5 sm:w-5" /> Company Logo & Image
                    </h3>
                    <div className="flex flex-col sm:flex-row gap-6">
                      {/* Logo Preview */}
                      <div className="flex-shrink-0">
                        <div className="w-32 h-32 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center overflow-hidden mb-3">
                          {companyImage ? (
                            <img src={companyImage} alt="Company logo" className="w-full h-full object-cover" />
                          ) : (
                            <Camera className="h-12 w-12 text-white/80" />
                          )}
                        </div>
                        <p className="text-xs text-gray-500 text-center">Logo Preview</p>
                      </div>
                      
                      {/* Upload Area */}
                      <div className="flex-1">
                        <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-blue-500 transition-colors">
                          <input
                            type="file"
                            id="companyImage"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                          />
                          <label htmlFor="companyImage" className="cursor-pointer">
                            <div className="flex flex-col items-center justify-center">
                              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                                <Upload className="h-6 w-6 text-blue-600" />
                              </div>
                              <p className="font-medium text-gray-900 mb-1">Upload Company Logo</p>
                              <p className="text-sm text-gray-500 mb-4">
                                PNG, JPG or GIF up to 5MB
                              </p>
                              <button
                                type="button"
                                onClick={() => document.getElementById('companyImage').click()}
                                className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 text-sm font-medium"
                              >
                                Choose File
                              </button>
                            </div>
                          </label>
                          {companyImage && (
                            <div className="mt-4 flex items-center justify-center gap-3">
                              <button
                                type="button"
                                onClick={() => {
                                  setCompanyImage(null);
                                  setFormData(prev => ({ ...prev, logo: '' }));
                                }}
                                className="text-sm text-red-600 hover:text-red-700 flex items-center gap-1"
                              >
                                <Trash2 className="h-4 w-4" />
                                Remove Image
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Company Documents Upload */}
                  <div className="mb-6 sm:mb-8">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <FileTextIcon className="h-4 w-4 sm:h-5 sm:w-5" /> Company Documents
                    </h3>
                    
                    {/* Upload Area */}
                    <div className="mb-6">
                      <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-blue-500 transition-colors">
                        <input
                          type="file"
                          id="companyDocuments"
                          multiple
                          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                          onChange={handleDocumentUpload}
                          className="hidden"
                        />
                        <label htmlFor="companyDocuments" className="cursor-pointer">
                          <div className="flex flex-col items-center justify-center">
                            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                              <FileUp className="h-6 w-6 text-blue-600" />
                            </div>
                            <p className="font-medium text-gray-900 mb-1">Upload Company Documents</p>
                            <p className="text-sm text-gray-500 mb-4">
                              PDF, DOC, DOCX, JPG, PNG up to 10MB each
                            </p>
                            <button
                              type="button"
                              onClick={() => document.getElementById('companyDocuments').click()}
                              className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 text-sm font-medium"
                            >
                              Choose Files
                            </button>
                          </div>
                        </label>
                      </div>
                    </div>

                    {/* Documents List */}
                    {companyDocuments.length > 0 && (
                      <div className="space-y-3">
                        <h4 className="font-medium text-gray-900">Uploaded Documents ({companyDocuments.length})</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {companyDocuments.map((doc) => (
                            <div key={doc.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                              <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-3">
                                  <div className="p-2 bg-blue-100 rounded-lg">
                                    <FileTextIcon className="h-5 w-5 text-blue-600" />
                                  </div>
                                  <div className="min-w-0">
                                    <h5 className="font-medium text-gray-900 truncate text-sm">{doc.name}</h5>
                                    <p className="text-xs text-gray-500">
                                      {(doc.size / 1024).toFixed(1)} KB • {new Date(doc.uploadedAt).toLocaleDateString()}
                                    </p>
                                  </div>
                                </div>
                                <div className="flex items-center gap-1">
                                  <button
                                    type="button"
                                    onClick={() => downloadDocument(doc)}
                                    className="p-1 hover:bg-gray-100 rounded"
                                    title="Download"
                                  >
                                    <DownloadIcon className="h-4 w-4 text-gray-600" />
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => removeDocument(doc.id)}
                                    className="p-1 hover:bg-red-50 rounded"
                                    title="Remove"
                                  >
                                    <Trash2 className="h-4 w-4 text-red-600" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Company Details Section */}
                  <div className="mb-6 sm:mb-8">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <Building className="h-4 w-4 sm:h-5 sm:w-5" /> Company Details
                    </h3>
                    
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

                  {/* Office Timings Section */}
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
                          <div className="flex flex-col sm:flex-row gap-2">
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
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

                  {/* Status Selection */}
                  <div className="mb-6 sm:mb-8">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <ShieldCheck className="h-4 w-4 sm:h-5 sm:w-5" /> Company Status
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                          Account Status
                        </label>
                        <div className="flex gap-4">
                          <label className="flex items-center gap-3 cursor-pointer">
                            <div className="relative">
                              <input
                                type="radio"
                                name="status"
                                value="active"
                                checked={formData.status === 'active'}
                                onChange={e => setFormData(prev => ({ ...prev, status: e.target.value }))}
                                className="sr-only"
                              />
                              <div className={`w-5 h-5 rounded-full border-2 ${
                                formData.status === 'active' 
                                  ? `border-${getAccentColorClass().replace('-600', '')}-500 bg-${getAccentColorClass().replace('-600', '')}-500` 
                                  : 'border-gray-300'
                              }`}>
                                {formData.status === 'active' && (
                                  <div className="w-2 h-2 bg-white rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                                )}
                              </div>
                            </div>
                            <div>
                              <span className="font-medium text-gray-900">Active</span>
                              <p className="text-sm text-gray-500">Company can login and use the system</p>
                            </div>
                          </label>
                          
                          <label className="flex items-center gap-3 cursor-pointer">
                            <div className="relative">
                              <input
                                type="radio"
                                name="status"
                                value="inactive"
                                checked={formData.status === 'inactive'}
                                onChange={e => setFormData(prev => ({ ...prev, status: e.target.value }))}
                                className="sr-only"
                              />
                              <div className={`w-5 h-5 rounded-full border-2 ${
                                formData.status === 'inactive' 
                                  ? 'border-red-500 bg-red-500' 
                                  : 'border-gray-300'
                              }`}>
                                {formData.status === 'inactive' && (
                                  <div className="w-2 h-2 bg-white rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                                )}
                              </div>
                            </div>
                            <div>
                              <span className="font-medium text-gray-900">Inactive</span>
                              <p className="text-sm text-gray-500">Company cannot login</p>
                            </div>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Theme Selection - Fixed to show border only */}
                  <div className="mb-6 sm:mb-8">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <Palette className="h-4 w-4 sm:h-5 sm:w-5" /> Theme Selection
                    </h3>
                   <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2 sm:gap-3">
  {Object.values(THEMES).map(t => (
    <button
      key={t.id}
      type="button"
      onClick={() => setFormData(prev => ({ ...prev, theme: t }))}
      className={`relative p-2 sm:p-3 rounded-lg sm:rounded-xl transition-all hover:scale-105 border-2 ${
        formData.theme?.id === t.id 
          ? 'border-orange-500 shadow-lg' 
          : 'border-gray-200 hover:border-gray-300'
      }`}
    >
      <div className={`h-8 sm:h-12 rounded-lg overflow-hidden flex mb-1 sm:mb-2 bg-gradient-to-br ${t.gradient}`} />
      
      <div className="text-center">
        <div className="font-medium text-xs text-gray-900 truncate">
          {t.name}
        </div>
        <div className="text-[10px] text-gray-500 truncate">
          {t.accent?.split('-')[0] || 'Default'}
        </div>
      </div>
      
      {formData.theme?.id === t.id && (
        <div className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-green-500 rounded-full flex items-center justify-center">
          <Check className="h-2 w-2 sm:h-3 sm:w-3 text-white" />
        </div>
      )}
    </button>
  ))}
</div>
                  </div>

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
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}