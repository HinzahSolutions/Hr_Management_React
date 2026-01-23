// 'use client';
// import { motion, AnimatePresence } from 'framer-motion';
// import React, { useState, useEffect } from 'react';
// import { 
//   Plus, 
//   Edit2, 
//   Trash2, 
//   Eye, 
//   Users, 
//   UserCheck, 
//   UserCog, 
//   UserPlus,
//   Shield,
//   Briefcase,
//   Calendar,
//   MapPin,
//   DollarSign,
//   ChevronDown,
//   ChevronUp,
//   ChevronLeft,
//   ChevronRight,
//   Filter,
//   Search,
//   AlertCircle,
//   CheckCircle,
//   XCircle,
//   Building,
//   Users as UsersIcon,
//   Globe,
//   RefreshCw,
//   X,
//   ExternalLink,
//   Mail,
//   Phone,
//   Clock,
//   Star,
//   Award,
//   TrendingUp,
//   TrendingDown,
//   Check,
//   AlertTriangle,
//   MoreVertical,
//   Download,
//   BarChart,
//   PieChart,
//   Target,
//   Lock,
//   Key,
//   Settings,
//   HelpCircle
// } from 'lucide-react';
// import { useTheme } from './ThemeContext';

// // API Configuration
// const API_BASE_URL_SERVER = import.meta.env.VITE_API_BASE_URL_SERVER || "https://hr.hinzah.com";
// const EMPLOYERS_API = `${API_BASE_URL_SERVER}/api/employer`;

// // API Service
// const apiService = {
//   // Fetch all employers
//   async fetchEmployers() {
//     try {

//                 const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
//     const companyId = currentUser.companyId || '';

//       const token = localStorage.getItem('token') || localStorage.getItem('authToken');
//       const response = await fetch(`https://hr.hinzah.com/api/employers/hierarchy/${companyId}`, {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`
//         }
//       });
      
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
      
//       const data = await response.json();
//        console.log("res data",data)
//       return data.data || data || [];
     
//     } catch (error) {
//       console.error('Error fetching employers:', error);
//       throw error;
//     }
//   },

//   // Create employer
//   async createEmployer(employerData) {
//     try {
//       const token = localStorage.getItem('token') || localStorage.getItem('authToken');
//       const response = await fetch(`${API_BASE_URL_SERVER}/api/employers`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`
//         },
//         body: JSON.stringify(employerData)
//       });
      
//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
//       }
      
//       return await response.json();
//     } catch (error) {
//       console.error('Error creating employer:', error);
//       throw error;
//     }
//   },

//   // Update employer
//   async updateEmployer(id, employerData) {
//     try {
//       const token = localStorage.getItem('token') || localStorage.getItem('authToken');
//       const response = await fetch(`${EMPLOYERS_API}/${id}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`
//         },
//         body: JSON.stringify(employerData)
//       });
      
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
      
//       return await response.json();
//     } catch (error) {
//       console.error('Error updating employer:', error);
//       throw error;
//     }
//   },

//   // Delete employer
//   async deleteEmployer(id) {
//     try {
//       const token = localStorage.getItem('token') || localStorage.getItem('authToken');
//       const response = await fetch(`${EMPLOYERS_API}/${id}`, {
//         method: 'DELETE',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`
//         }
//       });
      
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
      
//       return await response.json();
//     } catch (error) {
//       console.error('Error deleting employer:', error);
//       throw error;
//     }
//   }
// };

// function AdminPage() {
//   const { theme, getThemeClasses } = useTheme();
//   const themeClasses = getThemeClasses();
  
//   // States
//   const [employers, setEmployers] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(null);
  
//   // Dialog states
//   const [openCreateModal, setOpenCreateModal] = useState(false);
//   const [openViewModal, setOpenViewModal] = useState(false);
//   const [openEditModal, setOpenEditModal] = useState(false);
//   const [openDeleteModal, setOpenDeleteModal] = useState(false);
  
//   // Selected employer
//   const [selectedEmployer, setSelectedEmployer] = useState(null);
//   const [newEmployer, setNewEmployer] = useState({
//     employer_code: '',
//     password: '',     
//     name: '',
//     slug: '',
//     status: '',
//     email: '',
//     phone: '',
//     latitude: 0.0,
//     longitude: 0.0,
//     custom_data: {
//       industry: '',
//       employees: 0,
//       location: '',
//       founded_year: '',
//       revenue: '',
//       address: '',
//       city: '',
//       country: '',
//     },
//     belongToTheCompanyID: ''
//   });

//   // Filter and search states
//   const [searchTerm, setSearchTerm] = useState('');
//   const [statusFilter, setStatusFilter] = useState('all');
//   const [industryFilter, setIndustryFilter] = useState('all');
//   const [sortBy, setSortBy] = useState('created_at');
//   const [sortOrder, setSortOrder] = useState('desc');
//   const [page, setPage] = useState(1);
//   const [itemsPerPage] = useState(10);
//   const [selectedRows, setSelectedRows] = useState([]);

//   // Initialize - Fetch employers on component mount
//   useEffect(() => {
//     fetchEmployers();
//   }, []);

//   // Fetch employers from API
//   const fetchEmployers = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const data = await apiService.fetchEmployers();
//       setEmployers(data);
//     } catch (err) {
//       setError('Failed to fetch employers. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Filtered employers
//   const filteredEmployers = employers.filter(employer => {
//     const matchesSearch = 
//       (employer.employer_code && employer.employer_code.toLowerCase().includes(searchTerm.toLowerCase())) ||
//       (employer.name && employer.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
//       (employer.email && employer.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
//       (employer.phone && employer.phone.toLowerCase().includes(searchTerm.toLowerCase()));
    
//     const matchesStatus = statusFilter === 'all' || employer.status === statusFilter;
//     const matchesIndustry = industryFilter === 'all' || 
//       (employer.custom_data?.industry && employer.custom_data.industry.toLowerCase().includes(industryFilter.toLowerCase()));
    
//     return matchesSearch && matchesStatus && matchesIndustry;
//   }).sort((a, b) => {
//     if (sortBy === 'name') {
//       return sortOrder === 'asc' 
//         ? (a.name || '').localeCompare(b.name || '')
//         : (b.name || '').localeCompare(a.name || '');
//     } else if (sortBy === 'status') {
//       return sortOrder === 'asc'
//         ? (a.status || '').localeCompare(b.status || '')
//         : (b.status || '').localeCompare(a.status || '');
//     } else if (sortBy === 'employees') {
//       const empA = a.custom_data?.employees || 0;
//       const empB = b.custom_data?.employees || 0;
//       return sortOrder === 'asc' ? empA - empB : empB - empA;
//     } else {
//       const dateA = a.created_at ? new Date(a.created_at).getTime() : 0;
//       const dateB = b.created_at ? new Date(b.created_at).getTime() : 0;
//       return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
//     }
//   });

//   // Pagination
//   const totalPages = Math.ceil(filteredEmployers.length / itemsPerPage);
//   const startIndex = (page - 1) * itemsPerPage;
//   const paginatedEmployers = filteredEmployers.slice(startIndex, startIndex + itemsPerPage);

//   // Handle Create Employer
//   const handleCreateEmployer = async () => {
//     try {
//       setError(null);
      
//       // Validation
//       if (newEmployer.password !== newEmployer.confirmPassword) {
//         throw new Error('Passwords do not match');
//       }

//       if (!newEmployer.employer_code || !newEmployer.name || !newEmployer.password) {
//         throw new Error('Required fields (Employer Code, Name, Password) are missing');
//       }  

//           const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
//     const companyId = currentUser.companyId || '';
    
//     if (!companyId) {
//       throw new Error('Unable to determine company. Please log in again.');
//     }

//       // Prepare API payload
//       const payload = {
//         employer_code: newEmployer.employer_code,
//         password: newEmployer.password,
//         name: newEmployer.name,
//         slug: newEmployer.slug,
//         status: newEmployer.status,
//         email: newEmployer.email,
//         phone: newEmployer.phone,
//         latitude: parseFloat(newEmployer.latitude) || 0.0,
//         longitude: parseFloat(newEmployer.longitude) || 0.0,
//         custom_data: newEmployer.custom_data,
//         belong_to_company_code: companyId
//       };

//       // Call API
//       const response = await apiService.createEmployer(payload);
      
//       // Update local state
//       setEmployers(prev => [...prev, response.data || response]);
//       setSuccess('Employer created successfully!');
//       setOpenCreateModal(false);
//       resetNewEmployerForm();
      
//       setTimeout(() => setSuccess(null), 3000);
//     } catch (err) {
//       setError(err.message || 'Failed to create employer');
//     }
//   };

//   // Handle Update Employer
//   const handleUpdateEmployer = async () => {
//     if (!selectedEmployer) return;

//     try {
//       setError(null);
      
//       // Prepare update payload
//       const payload = {
//         employer_code: selectedEmployer.employer_code,
//         name: selectedEmployer.name,
//         slug: selectedEmployer.slug,
//         status: selectedEmployer.status,
//         email: selectedEmployer.email,
//         phone: selectedEmployer.phone,
//         latitude: parseFloat(selectedEmployer.latitude) || 0.0,
//         longitude: parseFloat(selectedEmployer.longitude) || 0.0,
//         custom_data: selectedEmployer.custom_data
//       };

//       // Update password only if provided
//       if (newEmployer.password) {
//         if (newEmployer.password !== newEmployer.confirmPassword) {
//           throw new Error('Passwords do not match');
//         }
//         payload.password = newEmployer.password;
//       }

//       // Call API
//       const response = await apiService.updateEmployer(selectedEmployer.id, payload);
      
//       // Update local state
//       const updatedEmployers = employers.map(emp => 
//         emp.id === selectedEmployer.id ? { ...emp, ...(response.data || response) } : emp
//       );
      
//       setEmployers(updatedEmployers);
//       setSuccess('Employer updated successfully!');
//       setOpenEditModal(false);
      
//       setTimeout(() => setSuccess(null), 3000);
//     } catch (err) {
//       setError(err.message || 'Failed to update employer');
//     }
//   };

//   // Handle Delete Employer
//   const handleDeleteEmployer = async () => {
//     if (!selectedEmployer) return;

//     try {
//       setError(null);
      
//       // Call API
//       await apiService.deleteEmployer(selectedEmployer.id);
      
//       // Update local state
//       setEmployers(employers.filter(emp => emp.id !== selectedEmployer.id));
//       setSuccess('Employer deleted successfully!');
//       setOpenDeleteModal(false);
      
//       setTimeout(() => setSuccess(null), 3000);
//     } catch (err) {
//       setError(err.message || 'Failed to delete employer');
//     }
//   };

//   const resetNewEmployerForm = () => {
//     setNewEmployer({
//       employer_code: '',
//       password: '',
//       confirmPassword: '',
//       name: '',
//       slug: '',
//       status: 'pending',
//       email: '',
//       phone: '',
//       latitude: 0.0,
//       longitude: 0.0,
//       custom_data: {
//         industry: '',
//         employees: 0,
//         location: '',
//         website: '',
//         description: '',
//         founded_year: '',
//         revenue: '',
//         address: '',
//         city: '',
//         state: '',
//         country: 'India',
//         postal_code: '',
//         bank_name: '',
//         account_number: '',
//         ifsc_code: '',
//         contact_person: '',
//         contact_position: ''
//       },
//     });
//   };

//   // Handle modal opens
//   const handleOpenView = (employer) => {
//     setSelectedEmployer(employer);
//     setOpenViewModal(true);
//   };

//   const handleOpenEdit = (employer) => {
//     setSelectedEmployer({ ...employer });
//     setNewEmployer({
//       password: '',
//       confirmPassword: ''
//     });
//     setOpenEditModal(true);
//   };

//   const handleOpenDelete = (employer) => {
//     setSelectedEmployer(employer);
//     setOpenDeleteModal(true);
//   };

//   // Format date
//   const formatDate = (dateString) => {
//     if (!dateString) return 'N/A';
//     return new Date(dateString).toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit'
//     });
//   };

//   // Get status color
//   const getStatusColor = (status) => {
//     switch (status) {
//       case 'active': 
//         return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
//       case 'pending': 
//         return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
//       case 'inactive': 
//         return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
//       case 'verified': 
//         return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
//       default: 
//         return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
//     }
//   };

//   // Get status icon
//   const getStatusIcon = (status) => {
//     switch (status) {
//       case 'active': return <CheckCircle className="h-4 w-4" />;
//       case 'pending': return <AlertCircle className="h-4 w-4" />;
//       case 'inactive': return <XCircle className="h-4 w-4" />;
//       case 'verified': return <Shield className="h-4 w-4" />;
//       default: return <HelpCircle className="h-4 w-4" />;
//     }
//   };

//   // Stats calculation
//   const totalEmployers = employers.length;
//   const activeEmployers = employers.filter(e => e.status === 'active').length;
//   const pendingEmployers = employers.filter(e => e.status === 'pending').length;
//   const verifiedEmployers = employers.filter(e => e.status === 'verified').length;

//   // Get unique industries for filter
//   const industries = [...new Set(employers
//     .filter(e => e.custom_data?.industry)
//     .map(e => e.custom_data.industry)
//   )];

//   // Handle row selection
//   const toggleRowSelection = (id) => {
//     setSelectedRows(prev => 
//       prev.includes(id) 
//         ? prev.filter(rowId => rowId !== id)
//         : [...prev, id]
//     );
//   };

//   const selectAllRows = () => {
//     if (selectedRows.length === paginatedEmployers.length) {
//       setSelectedRows([]);
//     } else {
//       setSelectedRows(paginatedEmployers.map(emp => emp.id));
//     }
//   };

//   // Bulk actions
//   const handleBulkDelete = async () => {
//     if (selectedRows.length === 0 || !confirm(`Are you sure you want to delete ${selectedRows.length} employers?`)) return;

//     try {
//       setError(null);
//       setLoading(true);
      
//       for (const id of selectedRows) {
//         await apiService.deleteEmployer(id);
//       }
      
//       setEmployers(prev => prev.filter(emp => !selectedRows.includes(emp.id)));
//       setSelectedRows([]);
//       setSuccess(`${selectedRows.length} employers deleted successfully!`);
      
//       setTimeout(() => setSuccess(null), 3000);
//     } catch (err) {
//       setError('Failed to delete selected employers');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleBulkStatusChange = async (newStatus) => {
//     if (selectedRows.length === 0) return;

//     try {
//       setError(null);
//       setLoading(true);
      
//       for (const id of selectedRows) {
//         const employer = employers.find(e => e.id === id);
//         if (employer) {
//           await apiService.updateEmployer(id, { status: newStatus });
//         }
//       }
      
//       // Refresh data
//       fetchEmployers();
//       setSelectedRows([]);
//       setSuccess(`${selectedRows.length} employers updated to ${newStatus} status!`);
      
//       setTimeout(() => setSuccess(null), 3000);
//     } catch (err) {
//       setError('Failed to update selected employers');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // View dashboard
//   const handleViewDashboard = (employerCode) => {
//     window.open(`${API_BASE_URL_SERVER}/dashboard?employer=${employerCode}`, '_blank');
//   };

//   // Get theme colors
//   const getThemeStyle = () => {
//     return {
//       buttonBg: `bg-gradient-to-r from-${theme.accentBase}-500 to-${theme.accentBase}-600`,
//       buttonHover: `hover:from-${theme.accentBase}-600 hover:to-${theme.accentBase}-700`,
//       textColor: `text-${theme.accentBase}-600`,
//       borderColor: `border-${theme.accentBase}-200`,
//       bgColor: `bg-${theme.accentBase}-50`,
//       ringColor: `ring-${theme.accentBase}-500`
//     };
//   };

//   const themeStyle = getThemeStyle();

//   // Update new employer form
//   const updateNewEmployer = (field, value) => {
//     if (field.includes('.')) {
//       const [parent, child] = field.split('.');
//       setNewEmployer(prev => ({
//         ...prev,
//         [parent]: {
//           ...prev[parent],
//           [child]: value
//         }
//       }));
//     } else {
//       setNewEmployer(prev => ({
//         ...prev,
//         [field]: value
//       }));
//     }
//   };

//   // Update selected employer form
//   const updateSelectedEmployer = (field, value) => {
//     if (field.includes('.')) {
//       const [parent, child] = field.split('.');
//       setSelectedEmployer(prev => ({
//         ...prev,
//         [parent]: {
//           ...prev[parent],
//           [child]: value
//         }
//       }));
//     } else {
//       setSelectedEmployer(prev => ({
//         ...prev,
//         [field]: value
//       }));
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-200">
//       {/* Header */}
//       <header className={`bg-white dark:bg-gray-800 shadow-sm transition-colors duration-200 ${themeStyle.borderColor}`}>
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
//           <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
//             <div>
//               <div className="flex items-center gap-3">
//                 <div className={`p-2 rounded-lg ${themeStyle.bgColor}`}>
//                   <Building className={`h-6 w-6 ${themeStyle.textColor}`} />
//                 </div>
//                 <div>
//                   <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
//                     Employers Management
//                   </h1>
//                   <p className="text-gray-600 dark:text-gray-400 mt-1">
//                     Manage and monitor all employer accounts
//                   </p>
//                 </div>
//               </div>
//             </div>
            
//             <div className="flex items-center gap-3">
//               <button
//                 onClick={fetchEmployers}
//                 className="inline-flex items-center px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
//               >
//                 <RefreshCw className="h-4 w-4 mr-2" />
//                 Refresh
//               </button>
//               <button
//                 onClick={() => setOpenCreateModal(true)}
//                 className={`inline-flex items-center px-4 py-2 ${themeStyle.buttonBg} hover:${themeStyle.buttonHover} text-white font-medium rounded-lg transition-all shadow-md hover:shadow-lg`}
//               >
//                 <UserPlus className="h-5 w-5 mr-2" />
//                 Add Employer
//               </button>
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* Main Content */}
//       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* Success/Error Messages */}
//         <AnimatePresence>
//           {error && (
//             <motion.div
//               initial={{ opacity: 0, y: -20 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -20 }}
//               className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl"
//             >
//               <div className="flex items-center">
//                 <XCircle className="h-5 w-5 text-red-400 mr-3 flex-shrink-0" />
//                 <span className="text-red-800 dark:text-red-200 flex-1">{error}</span>
//                 <button
//                   onClick={() => setError(null)}
//                   className="ml-4 text-red-400 hover:text-red-600 dark:hover:text-red-300 transition-colors"
//                 >
//                   <X className="h-5 w-5" />
//                 </button>
//               </div>
//             </motion.div>
//           )}
          
//           {success && (
//             <motion.div
//               initial={{ opacity: 0, y: -20 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -20 }}
//               className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl"
//             >
//               <div className="flex items-center">
//                 <CheckCircle className="h-5 w-5 text-green-400 mr-3 flex-shrink-0" />
//                 <span className="text-green-800 dark:text-green-200 flex-1">{success}</span>
//                 <button
//                   onClick={() => setSuccess(null)}
//                   className="ml-4 text-green-400 hover:text-green-600 dark:hover:text-green-300 transition-colors"
//                 >
//                   <X className="h-5 w-5" />
//                 </button>
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>

//         {/* Stats Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//           <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 transition-all hover:shadow-xl hover:-translate-y-1">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Total Employers</p>
//                 <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{totalEmployers}</p>
//               </div>
//               <div className={`p-3 rounded-full ${themeStyle.bgColor}`}>
//                 <Building className={`h-6 w-6 ${themeStyle.textColor}`} />
//               </div>
//             </div>
//             <div className="flex items-center gap-2 mt-4">
//               <TrendingUp className="h-4 w-4 text-green-500" />
//               <span className="text-sm text-gray-600 dark:text-gray-400">All registered companies</span>
//             </div>
//           </div>

//           <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 transition-all hover:shadow-xl hover:-translate-y-1">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Active</p>
//                 <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{activeEmployers}</p>
//               </div>
//               <div className="p-3 rounded-full bg-green-100 dark:bg-green-900">
//                 <UserCheck className="h-6 w-6 text-green-600 dark:text-green-400" />
//               </div>
//             </div>
//             <div className="flex items-center gap-2 mt-4">
//               <CheckCircle className="h-4 w-4 text-green-500" />
//               <span className="text-sm text-gray-600 dark:text-gray-400">Currently operational</span>
//             </div>
//           </div>

//           <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 transition-all hover:shadow-xl hover:-translate-y-1">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Pending</p>
//                 <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{pendingEmployers}</p>
//               </div>
//               <div className="p-3 rounded-full bg-yellow-100 dark:bg-yellow-900">
//                 <AlertCircle className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
//               </div>
//             </div>
//             <div className="flex items-center gap-2 mt-4">
//               <Clock className="h-4 w-4 text-yellow-500" />
//               <span className="text-sm text-gray-600 dark:text-gray-400">Awaiting approval</span>
//             </div>
//           </div>

//           <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 transition-all hover:shadow-xl hover:-translate-y-1">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Verified</p>
//                 <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{verifiedEmployers}</p>
//               </div>
//               <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900">
//                 <Shield className="h-6 w-6 text-blue-600 dark:text-blue-400" />
//               </div>
//             </div>
//             <div className="flex items-center gap-2 mt-4">
//               <Award className="h-4 w-4 text-blue-500" />
//               <span className="text-sm text-gray-600 dark:text-gray-400">Verified & trusted</span>
//             </div>
//           </div>
//         </div>

//         {/* Filters and Search */}
//         <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-6 transition-colors">
//           <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
//             <div className="relative flex-1">
//               <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
//               <input
//                 type="text"
//                 placeholder="Search employers by code, name, email, or phone..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="pl-12 pr-4 py-3 w-full border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
//               />
//             </div>
            
//             <div className="flex flex-wrap items-center gap-3">
//               <select
//                 value={statusFilter}
//                 onChange={(e) => setStatusFilter(e.target.value)}
//                 className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//               >
//                 <option value="all">All Status</option>
//                 <option value="active">Active</option>
//                 <option value="pending">Pending</option>
//                 <option value="inactive">Inactive</option>
//                 <option value="verified">Verified</option>
//               </select>

//               <select
//                 value={industryFilter}
//                 onChange={(e) => setIndustryFilter(e.target.value)}
//                 className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//               >
//                 <option value="all">All Industries</option>
//                 {industries.map(industry => (
//                   <option key={industry} value={industry}>{industry}</option>
//                 ))}
//               </select>

//               <select
//                 value={sortBy}
//                 onChange={(e) => setSortBy(e.target.value)}
//                 className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//               >
//                 <option value="created_at">Sort by Date</option>
//                 <option value="name">Sort by Name</option>
//                 <option value="status">Sort by Status</option>
//                 <option value="employees">Sort by Employees</option>
//               </select>

//               <button
//                 onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')}
//                 className="p-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
//                 title={sortOrder === 'asc' ? 'Sort descending' : 'Sort ascending'}
//               >
//                 {sortOrder === 'asc' ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
//               </button>

//               <button
//                 onClick={() => setSelectedRows([])}
//                 className={`px-4 py-3 ${selectedRows.length > 0 ? 'bg-red-600 hover:bg-red-700' : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'} text-white dark:text-gray-300 font-medium rounded-xl transition-colors`}
//                 disabled={selectedRows.length === 0}
//               >
//                 Clear Selection ({selectedRows.length})
//               </button>
//             </div>
//           </div>

//           {/* Bulk Actions */}
//           {selectedRows.length > 0 && (
//             <div className="flex flex-wrap items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl mb-4">
//               <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
//                 {selectedRows.length} employer(s) selected
//               </span>
//               <div className="flex flex-wrap gap-2">
//                 <button
//                   onClick={() => handleBulkStatusChange('active')}
//                   className="px-3 py-2 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-sm font-medium rounded-lg hover:bg-green-200 dark:hover:bg-green-800 transition-colors"
//                 >
//                   Mark Active
//                 </button>
//                 <button
//                   onClick={() => handleBulkStatusChange('pending')}
//                   className="px-3 py-2 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 text-sm font-medium rounded-lg hover:bg-yellow-200 dark:hover:bg-yellow-800 transition-colors"
//                 >
//                   Mark Pending
//                 </button>
//                 <button
//                   onClick={() => handleBulkStatusChange('inactive')}
//                   className="px-3 py-2 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 text-sm font-medium rounded-lg hover:bg-red-200 dark:hover:bg-red-800 transition-colors"
//                 >
//                   Mark Inactive
//                 </button>
//                 <button
//                   onClick={handleBulkDelete}
//                   className="px-3 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition-colors"
//                 >
//                   Delete Selected
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Employers Table */}
//         <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden transition-colors">
//           <div className="overflow-x-auto">
//             <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
//               <thead className="bg-gray-50 dark:bg-gray-700">
//                 <tr>
//                   <th className="px-6 py-4 text-left">
//                     <div className="flex items-center">
//                       <input
//                         type="checkbox"
//                         checked={selectedRows.length === paginatedEmployers.length && paginatedEmployers.length > 0}
//                         onChange={selectAllRows}
//                         className="h-4 w-4 rounded border-gray-300 dark:border-gray-600 text-indigo-600 focus:ring-indigo-500"
//                       />
//                     </div>
//                   </th>
//                   <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
//                     Company
//                   </th>
//                   <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
//                     Contact
//                   </th>
//                   <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
//                     Status
//                   </th>
//                   <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
//                     Industry
//                   </th>
//                   <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
//                     Created
//                   </th>
//                   <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
//                     Actions
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
//                 {loading ? (
//                   <tr>
//                     <td colSpan={7} className="px-6 py-12 text-center">
//                       <div className="flex flex-col items-center justify-center">
//                         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500 mb-4"></div>
//                         <p className="text-gray-500 dark:text-gray-400">Loading employers...</p>
//                       </div>
//                     </td>
//                   </tr>
//                 ) : paginatedEmployers.length === 0 ? (
//                   <tr>
//                     <td colSpan={7} className="px-6 py-12 text-center">
//                       <div className="flex flex-col items-center justify-center">
//                         <Building className="h-16 w-16 text-gray-300 dark:text-gray-600 mb-4" />
//                         <p className="text-gray-500 dark:text-gray-400 text-lg font-medium mb-2">No employers found</p>
//                         <p className="text-gray-400 dark:text-gray-500 text-sm mb-4">
//                           {searchTerm || statusFilter !== 'all' || industryFilter !== 'all'
//                             ? 'Try changing your search or filter criteria'
//                             : 'Get started by creating your first employer'}
//                         </p>
//                         {!searchTerm && statusFilter === 'all' && industryFilter === 'all' && (
//                           <button
//                             onClick={() => setOpenCreateModal(true)}
//                             className={`inline-flex items-center px-4 py-2 ${themeStyle.buttonBg} hover:${themeStyle.buttonHover} text-white font-medium rounded-lg transition-colors`}
//                           >
//                             <UserPlus className="h-5 w-5 mr-2" />
//                             Add New Employer
//                           </button>
//                         )}
//                       </div>
//                     </td>
//                   </tr>
//                 ) : (
//                   paginatedEmployers.map((employer) => (
//                     <tr 
//                       key={employer.id} 
//                       className={`hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-150 ${
//                         selectedRows.includes(employer.id) ? 'bg-blue-50 dark:bg-blue-900/20' : ''
//                       }`}
//                     >
//                       <td className="px-6 py-4">
//                         <input
//                           type="checkbox"
//                           checked={selectedRows.includes(employer.id)}
//                           onChange={() => toggleRowSelection(employer.id)}
//                           className="h-4 w-4 rounded border-gray-300 dark:border-gray-600 text-indigo-600 focus:ring-indigo-500"
//                         />
//                       </td>
//                       <td className="px-6 py-4">
//                         <div className="flex items-center gap-3">
//                           <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600">
//                             <Building className="h-5 w-5 text-white" />
//                           </div>
//                           <div>
//                             <div className="font-medium text-gray-900 dark:text-white">
//                               {employer.name}
//                             </div>
//                             <div className="text-sm text-gray-500 dark:text-gray-400">
//                               {employer.employer_code}
//                             </div>
//                           </div>
//                         </div>
//                       </td>
//                       <td className="px-6 py-4">
//                         <div className="space-y-1">
//                           <div className="flex items-center gap-2 text-sm text-gray-900 dark:text-white">
//                             <Mail className="h-4 w-4 text-gray-400" />
//                             {employer.email || 'N/A'}
//                           </div>
//                           <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
//                             <Phone className="h-4 w-4 text-gray-400" />
//                             {employer.phone || 'N/A'}
//                           </div>
//                         </div>
//                       </td>
//                       <td className="px-6 py-4">
//                         <div className="flex items-center gap-2">
//                           {getStatusIcon(employer.status)}
//                           <span className={`px-3 py-1 inline-flex text-xs font-semibold rounded-full ${getStatusColor(employer.status)}`}>
//                             {employer.status.charAt(0).toUpperCase() + employer.status.slice(1)}
//                           </span>
//                         </div>
//                       </td>
//                       <td className="px-6 py-4">
//                         <div className="text-sm text-gray-900 dark:text-white">
//                           {employer.custom_data?.industry || 'N/A'}
//                         </div>
//                         <div className="text-xs text-gray-500 dark:text-gray-400">
//                           {employer.custom_data?.employees ? `${employer.custom_data.employees} employees` : ''}
//                         </div>
//                       </td>
//                       <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
//                         {formatDate(employer.created_at)}
//                       </td>
//                       <td className="px-6 py-4">
//                         <div className="flex items-center gap-2">
//                           <button
//                             onClick={() => handleOpenView(employer)}
//                             className="p-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors"
//                             title="View Details"
//                           >
//                             <Eye className="h-4 w-4" />
//                           </button>
//                           <button
//                             onClick={() => handleViewDashboard(employer.employer_code)}
//                             className="p-2 text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300 hover:bg-green-50 dark:hover:bg-green-900/30 rounded-lg transition-colors"
//                             title="View Dashboard"
//                           >
//                             <BarChart className="h-4 w-4" />
//                           </button>
//                           <button
//                             onClick={() => handleOpenEdit(employer)}
//                             className={`p-2 ${themeStyle.textColor} hover:${themeStyle.textColor.replace('600', '800')} hover:bg-${theme.accentBase}-50 dark:hover:bg-${theme.accentBase}-900/30 rounded-lg transition-colors`}
//                             title="Edit"
//                           >
//                             <Edit2 className="h-4 w-4" />
//                           </button>
//                           <button
//                             onClick={() => handleOpenDelete(employer)}
//                             className="p-2 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors"
//                             title="Delete"
//                           >
//                             <Trash2 className="h-4 w-4" />
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
//           {totalPages > 1 && (
//             <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700">
//               <div className="flex items-center justify-between">
//                 <div className="text-sm text-gray-700 dark:text-gray-300">
//                   Showing <span className="font-medium">{startIndex + 1}</span> to{' '}
//                   <span className="font-medium">{Math.min(startIndex + itemsPerPage, filteredEmployers.length)}</span> of{' '}
//                   <span className="font-medium">{filteredEmployers.length}</span> results
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <button
//                     onClick={() => setPage(prev => Math.max(1, prev - 1))}
//                     disabled={page === 1}
//                     className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
//                   >
//                     <ChevronLeft className="h-5 w-5" />
//                   </button>
//                   {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
//                     let pageNum;
//                     if (totalPages <= 5) {
//                       pageNum = i + 1;
//                     } else if (page <= 3) {
//                       pageNum = i + 1;
//                     } else if (page >= totalPages - 2) {
//                       pageNum = totalPages - 4 + i;
//                     } else {
//                       pageNum = page - 2 + i;
//                     }
                    
//                     return (
//                       <button
//                         key={pageNum}
//                         onClick={() => setPage(pageNum)}
//                         className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
//                           page === pageNum
//                             ? `${themeStyle.buttonBg} text-white`
//                             : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
//                         }`}
//                       >
//                         {pageNum}
//                       </button>
//                     );
//                   })}
//                   <button
//                     onClick={() => setPage(prev => Math.min(totalPages, prev + 1))}
//                     disabled={page === totalPages}
//                     className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
//                   >
//                     <ChevronRight className="h-5 w-5" />
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </main>

//       {/* Create Employer Modal */}
//       {openCreateModal && (
//         <AnimatePresence>
//           <div className="fixed inset-0 z-50 overflow-y-auto">
//           <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-0 sm:p-4 overflow-y-auto">
//                    <motion.div
//                      initial={{ opacity: 0, scale: 0.95, y: 20 }}
//                      animate={{ opacity: 1, scale: 1, y: 0 }}
//                      exit={{ opacity: 0, scale: 0.95, y: 20 }}
//                      transition={{ type: "spring", damping: 25, stiffness: 300 }}
//                      className="bg-white w-full max-w-4xl max-h-screen sm:max-h-[90vh] sm:rounded-2xl shadow-2xl sm:border sm:border-gray-200 flex flex-col h-screen sm:h-auto"
//                    >
//                 <div className="px-6 pt-5 pb-4 sm:px-8 sm:pt-6 sm:pb-6">
//                   <div className="flex items-center justify-between mb-6">
//                     <div>
//                       <h3 className="text-xl font-bold text-gray-900 dark:text-white">
//                         <UserPlus className="inline-block h-6 w-6 mr-2" />
//                         Create New Employer
//                       </h3>
//                       <p className="text-gray-600 dark:text-gray-400 mt-1">
//                         Fill in the employer details below
//                       </p>
//                     </div>
//                     <button
//                       onClick={() => setOpenCreateModal(false)}
//                       className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 transition-colors p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
//                     >
//                       <X className="h-5 w-5" />
//                     </button>
//                   </div>
                  
//                   <div className="space-y-6 max-h-[70vh] overflow-y-auto pr-2">
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                       {/* Basic Information */}
//                       <div className="space-y-4">
//                         <h4 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
//                           <UserCog className="h-5 w-5" />
//                           Basic Information
//                         </h4>
                        
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                             Employer Code *
//                           </label>
//                           <input
//                             type="text"
//                             value={newEmployer.employer_code}
//                             onChange={(e) => updateNewEmployer('employer_code', e.target.value)}
//                             className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//                             placeholder="e.g., EMP001"
//                             required
//                           />
//                         </div>
                        
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                             Company Name *
//                           </label>
//                           <input
//                             type="text"
//                             value={newEmployer.name}
//                             onChange={(e) => updateNewEmployer('name', e.target.value)}
//                             className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//                             placeholder="e.g., Tech Solutions Inc."
//                             required
//                           />
//                         </div>
                        
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                             Slug
//                           </label>
//                           <input
//                             type="text"
//                             value={newEmployer.slug}
//                             onChange={(e) => updateNewEmployer('slug', e.target.value)}
//                             className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//                             placeholder="e.g., tech-solutions"
//                           />
//                         </div>
                        
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                             Status
//                           </label>
//                           <select
//                             value={newEmployer.status}
//                             onChange={(e) => updateNewEmployer('status', e.target.value)}
//                             className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//                           >
//                             <option value="pending">Pending</option>
//                             <option value="active">Active</option>
//                             <option value="inactive">Inactive</option>
//                             <option value="verified">Verified</option>
//                           </select>
//                         </div>
//                       </div>

//                       {/* Security */}
//                       <div className="space-y-4">
//                         <h4 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
//                           <Lock className="h-5 w-5" />
//                           Security
//                         </h4>
                        
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                             Password *
//                           </label>
//                           <input
//                             type="password"
//                             value={newEmployer.password}
//                             onChange={(e) => updateNewEmployer('password', e.target.value)}
//                             className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//                             placeholder="Enter password"
//                             required
//                           />
//                         </div>
                        
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                             Confirm Password *
//                           </label>
//                           <input
//                             type="password"
//                             value={newEmployer.confirmPassword}
//                             onChange={(e) => updateNewEmployer('confirmPassword', e.target.value)}
//                             className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//                             placeholder="Confirm password"
//                             required
//                           />
//                         </div>
//                       </div>
//                     </div>

//                     {/* Contact Information */}
//                     <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
//                       <h4 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2 mb-4">
//                         <Mail className="h-5 w-5" />
//                         Contact Information
//                       </h4>
//                       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                             Email
//                           </label>
//                           <input
//                             type="email"
//                             value={newEmployer.email}
//                             onChange={(e) => updateNewEmployer('email', e.target.value)}
//                             className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//                             placeholder="company@example.com"
//                           />
//                         </div>
                        
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                             Phone
//                           </label>
//                           <input
//                             type="tel"
//                             value={newEmployer.phone}
//                             onChange={(e) => updateNewEmployer('phone', e.target.value)}
//                             className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//                             placeholder="+1234567890"
//                           />
//                         </div>
//                       </div>
//                     </div>

//                     {/* Company Details */}
//                     <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
//                       <h4 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2 mb-4">
//                         <Briefcase className="h-5 w-5" />
//                         Company Details
//                       </h4>
//                       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                             Industry
//                           </label>
//                           <input
//                             type="text"
//                             value={newEmployer.custom_data.industry}
//                             onChange={(e) => updateNewEmployer('custom_data.industry', e.target.value)}
//                             className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//                             placeholder="e.g., Technology"
//                           />
//                         </div>
                        
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                             Number of Employees
//                           </label>
//                           <input
//                             type="number"
//                             value={newEmployer.custom_data.employees}
//                             onChange={(e) => updateNewEmployer('custom_data.employees', parseInt(e.target.value) || 0)}
//                             className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//                             placeholder="0"
//                             min="0"
//                           />
//                         </div>
                        
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                             Website
//                           </label>
//                           <input
//                             type="url"
//                             value={newEmployer.custom_data.website}
//                             onChange={(e) => updateNewEmployer('custom_data.website', e.target.value)}
//                             className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//                             placeholder="https://example.com"
//                           />
//                         </div>
                        
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                             Founded Year
//                           </label>
//                           <input
//                             type="number"
//                             value={newEmployer.custom_data.founded_year}
//                             onChange={(e) => updateNewEmployer('custom_data.founded_year', e.target.value)}
//                             className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//                             placeholder="2020"
//                             min="1900"
//                             max="2024"
//                           />
//                         </div>
                        
//                         <div className="md:col-span-2">
//                           <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                             Description
//                           </label>
//                           <textarea
//                             value={newEmployer.custom_data.description}
//                             onChange={(e) => updateNewEmployer('custom_data.description', e.target.value)}
//                             rows="3"
//                             className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
//                             placeholder="Company description..."
//                           />
//                         </div>
//                       </div>
//                     </div>

//                     {/* Address Information */}
//                     <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
//                       <h4 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2 mb-4">
//                         <MapPin className="h-5 w-5" />
//                         Address Information
//                       </h4>
//                       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                         <div className="md:col-span-2">
//                           <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                             Address
//                           </label>
//                           <input
//                             type="text"
//                             value={newEmployer.custom_data.address}
//                             onChange={(e) => updateNewEmployer('custom_data.address', e.target.value)}
//                             className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//                             placeholder="Street address"
//                           />
//                         </div>
                        
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                             City
//                           </label>
//                           <input
//                             type="text"
//                             value={newEmployer.custom_data.city}
//                             onChange={(e) => updateNewEmployer('custom_data.city', e.target.value)}
//                             className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//                             placeholder="City"
//                           />
//                         </div>
                        
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                             State
//                           </label>
//                           <input
//                             type="text"
//                             value={newEmployer.custom_data.state}
//                             onChange={(e) => updateNewEmployer('custom_data.state', e.target.value)}
//                             className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//                             placeholder="State"
//                           />
//                         </div>
                        
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                             Country
//                           </label>
//                           <input
//                             type="text"
//                             value={newEmployer.custom_data.country}
//                             onChange={(e) => updateNewEmployer('custom_data.country', e.target.value)}
//                             className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//                             placeholder="Country"
//                           />
//                         </div>
                        
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                             Postal Code
//                           </label>
//                           <input
//                             type="text"
//                             value={newEmployer.custom_data.postal_code}
//                             onChange={(e) => updateNewEmployer('custom_data.postal_code', e.target.value)}
//                             className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//                             placeholder="12345"
//                           />
//                         </div>
//                       </div>
//                     </div>

//                     {/* Coordinates */}
//                     <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
//                       <h4 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2 mb-4">
//                         <Globe className="h-5 w-5" />
//                         Coordinates
//                       </h4>
//                       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                             Latitude
//                           </label>
//                           <input
//                             type="number"
//                             step="0.000001"
//                             value={newEmployer.latitude}
//                             onChange={(e) => updateNewEmployer('latitude', parseFloat(e.target.value) || 0.0)}
//                             className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//                             placeholder="0.0"
//                           />
//                         </div>
                        
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                             Longitude
//                           </label>
//                           <input
//                             type="number"
//                             step="0.000001"
//                             value={newEmployer.longitude}
//                             onChange={(e) => updateNewEmployer('longitude', parseFloat(e.target.value) || 0.0)}
//                             className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//                             placeholder="0.0"
//                           />
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
                
//                 <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700/50 flex justify-end space-x-3">
//                   <button
//                     onClick={() => setOpenCreateModal(false)}
//                     className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     onClick={handleCreateEmployer}
//                     className={`px-4 py-2 ${themeStyle.buttonBg} hover:${themeStyle.buttonHover} text-white font-medium rounded-lg text-sm transition-colors shadow-md hover:shadow-lg`}
//                   >
//                     Create Employer
//                   </button>
//                 </div>
//               </motion.div>
//             </div>
//           </div>
//         </AnimatePresence>
//       )}

//       {/* View Employer Modal */}
//       {openViewModal && selectedEmployer && (
//         <AnimatePresence>
//           <div className="fixed inset-0 z-50 overflow-y-auto">
//             <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
             
//               <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
//               <motion.div
//                 initial={{ opacity: 0, scale: 0.95 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 exit={{ opacity: 0, scale: 0.95 }}
//                 className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full"
//               >
//                 <div className="px-6 pt-5 pb-4">
//                   <div className="flex items-center justify-between mb-4">
//                     <h3 className="text-lg font-bold text-gray-900 dark:text-white">
//                       <Eye className="inline-block h-5 w-5 mr-2" />
//                       Employer Details
//                     </h3>
//                     <button
//                       onClick={() => setOpenViewModal(false)}
//                       className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 transition-colors p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
//                     >
//                       <X className="h-5 w-5" />
//                     </button>
//                   </div>
                  
//                   <div className="space-y-6">
//                     <div className="flex items-center gap-4">
//                       <div className="h-16 w-16 flex items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600">
//                         <Building className="h-8 w-8 text-white" />
//                       </div>
//                       <div>
//                         <h4 className="text-xl font-bold text-gray-900 dark:text-white">{selectedEmployer.name}</h4>
//                         <p className="text-gray-600 dark:text-gray-400">{selectedEmployer.employer_code}</p>
//                       </div>
//                     </div>
                    
//                     <div className="grid grid-cols-2 gap-4">
//                       <div>
//                         <p className="text-sm text-gray-500 dark:text-gray-400">Status</p>
//                         <p className={`px-3 py-1 inline-flex text-xs font-semibold rounded-full ${getStatusColor(selectedEmployer.status)}`}>
//                           {selectedEmployer.status.charAt(0).toUpperCase() + selectedEmployer.status.slice(1)}
//                         </p>
//                       </div>
//                       <div>
//                         <p className="text-sm text-gray-500 dark:text-gray-400">Industry</p>
//                         <p className="font-medium text-gray-900 dark:text-white">{selectedEmployer.custom_data?.industry || 'N/A'}</p>
//                       </div>
//                       <div>
//                         <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
//                         <p className="font-medium text-gray-900 dark:text-white">{selectedEmployer.email || 'N/A'}</p>
//                       </div>
//                       <div>
//                         <p className="text-sm text-gray-500 dark:text-gray-400">Phone</p>
//                         <p className="font-medium text-gray-900 dark:text-white">{selectedEmployer.phone || 'N/A'}</p>
//                       </div>
//                     </div>
                    
//                     <div>
//                       <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Address</p>
//                       <p className="text-gray-900 dark:text-white">
//                         {selectedEmployer.custom_data?.address || 'N/A'}<br />
//                         {selectedEmployer.custom_data?.city && `${selectedEmployer.custom_data.city}, `}
//                         {selectedEmployer.custom_data?.state} {selectedEmployer.custom_data?.postal_code}<br />
//                         {selectedEmployer.custom_data?.country}
//                       </p>
//                     </div>
                    
//                     <div>
//                       <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Description</p>
//                       <p className="text-gray-900 dark:text-white">{selectedEmployer.custom_data?.description || 'No description provided'}</p>
//                     </div>
                    
//                     <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
//                       <p className="text-sm text-gray-500 dark:text-gray-400">Created</p>
//                       <p className="text-gray-900 dark:text-white">{formatDate(selectedEmployer.created_at)}</p>
//                     </div>
//                   </div>
//                 </div>
                
//                 <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700/50 flex justify-end space-x-3">
//                   <button
//                     onClick={() => setOpenViewModal(false)}
//                     className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
//                   >
//                     Close
//                   </button>
//                   <button
//                     onClick={() => {
//                       setOpenViewModal(false);
//                       handleOpenEdit(selectedEmployer);
//                     }}
//                     className={`px-4 py-2 ${themeStyle.buttonBg} hover:${themeStyle.buttonHover} text-white font-medium rounded-lg text-sm transition-colors`}
//                   >
//                     Edit Employer
//                   </button>
//                 </div>
//               </motion.div>
//             </div>
//           </div>
//         </AnimatePresence>
//       )}

//       {/* Edit Employer Modal */}
//       {openEditModal && selectedEmployer && (
//         <AnimatePresence>
//           <div className="fixed inset-0 z-50 overflow-y-auto">
//             <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
//               <div 
//                 className="fixed inset-0 bg-gray-500 dark:bg-gray-900 bg-opacity-75 transition-opacity"
//                 onClick={() => setOpenEditModal(false)}
//               />
//               <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
//               <motion.div
//                 initial={{ opacity: 0, scale: 0.95 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 exit={{ opacity: 0, scale: 0.95 }}
//                 className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full"
//               >
//                 <div className="px-6 pt-5 pb-4 sm:px-8 sm:pt-6 sm:pb-6">
//                   <div className="flex items-center justify-between mb-6">
//                     <h3 className="text-xl font-bold text-gray-900 dark:text-white">
//                       <Edit2 className="inline-block h-6 w-6 mr-2" />
//                       Edit Employer
//                     </h3>
//                     <button
//                       onClick={() => setOpenEditModal(false)}
//                       className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 transition-colors p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
//                     >
//                       <X className="h-5 w-5" />
//                     </button>
//                   </div>
                  
//                   <div className="space-y-6 max-h-[70vh] overflow-y-auto pr-2">
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                       <div className="space-y-4">
//                         <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Basic Information</h4>
                        
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                             Employer Code
//                           </label>
//                           <input
//                             type="text"
//                             value={selectedEmployer.employer_code}
//                             onChange={(e) => updateSelectedEmployer('employer_code', e.target.value)}
//                             className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//                             disabled
//                           />
//                         </div>
                        
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                             Company Name *
//                           </label>
//                           <input
//                             type="text"
//                             value={selectedEmployer.name}
//                             onChange={(e) => updateSelectedEmployer('name', e.target.value)}
//                             className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//                             required
//                           />
//                         </div>
                        
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                             Status
//                           </label>
//                           <select
//                             value={selectedEmployer.status}
//                             onChange={(e) => updateSelectedEmployer('status', e.target.value)}
//                             className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//                           >
//                             <option value="pending">Pending</option>
//                             <option value="active">Active</option>
//                             <option value="inactive">Inactive</option>
//                             <option value="verified">Verified</option>
//                           </select>
//                         </div>
//                       </div>

//                       <div className="space-y-4">
//                         <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Change Password</h4>
//                         <p className="text-sm text-gray-500 dark:text-gray-400">Leave blank to keep current password</p>
                        
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                             New Password
//                           </label>
//                           <input
//                             type="password"
//                             value={newEmployer.password}
//                             onChange={(e) => setNewEmployer(prev => ({ ...prev, password: e.target.value }))}
//                             className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//                           />
//                         </div>
                        
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                             Confirm New Password
//                           </label>
//                           <input
//                             type="password"
//                             value={newEmployer.confirmPassword}
//                             onChange={(e) => setNewEmployer(prev => ({ ...prev, confirmPassword: e.target.value }))}
//                             className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//                           />
//                         </div>
//                       </div>
//                     </div>

//                     {/* Contact Information and other fields would continue here... */}
                    
//                   </div>
//                 </div>
                
//                 <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700/50 flex justify-end space-x-3">
//                   <button
//                     onClick={() => setOpenEditModal(false)}
//                     className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     onClick={handleUpdateEmployer}
//                     className={`px-4 py-2 ${themeStyle.buttonBg} hover:${themeStyle.buttonHover} text-white font-medium rounded-lg text-sm transition-colors shadow-md hover:shadow-lg`}
//                   >
//                     Update Employer
//                   </button>
//                 </div>
//               </motion.div>
//             </div>
//           </div>
//         </AnimatePresence>
//       )}

//       {/* Delete Confirmation Modal */}
//       {openDeleteModal && selectedEmployer && (
//         <AnimatePresence>
//           <div className="fixed inset-0 z-50 overflow-y-auto">
//             <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
//               <div className="fixed inset-0 bg-gray-500 dark:bg-gray-900 bg-opacity-75 transition-opacity" />
//               <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
//               <motion.div
//                 initial={{ opacity: 0, scale: 0.95 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 exit={{ opacity: 0, scale: 0.95 }}
//                 className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-md sm:w-full"
//               >
//                 <div className="px-6 pt-5 pb-4 text-center">
//                   <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-red-900 mb-4">
//                     <AlertTriangle className="h-6 w-6 text-red-600 dark:text-red-400" />
//                   </div>
                  
//                   <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
//                     Confirm Delete
//                   </h3>
//                   <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
//                     Are you sure you want to delete employer
//                   </p>
//                   <p className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
//                     {selectedEmployer.name} ({selectedEmployer.employer_code})?
//                   </p>
//                   <p className="text-xs text-gray-400 dark:text-gray-500">
//                     This action cannot be undone.
//                   </p>
//                 </div>
                
//                 <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700/50 flex justify-center space-x-3">
//                   <button
//                     onClick={() => setOpenDeleteModal(false)}
//                     className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     onClick={handleDeleteEmployer}
//                     className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg text-sm transition-colors shadow-md hover:shadow-lg"
//                   >
//                     Delete Employer
//                   </button>
//                 </div>
//               </motion.div>
//             </div>
//           </div>
//         </AnimatePresence>
//       )}
//     </div>
//   );
// }

// export default AdminPage;



// 'use client';
// import { motion, AnimatePresence } from 'framer-motion';
// import React, { useState, useEffect } from 'react';
// import { 
//   Plus, 
//   Edit2, 
//   Trash2, 
//   Eye, 
//   Users, 
//   UserCheck, 
//   UserCog, 
//   UserPlus,
//   Shield,
//   Briefcase,
//   Calendar,
//   MapPin,
//   DollarSign,
//   ChevronDown,
//   ChevronUp,
//   ChevronLeft,
//   ChevronRight,
//   Filter,
//   Search,
//   AlertCircle,
//   CheckCircle,
//   XCircle,
//   Building,
//   Users as UsersIcon,
//   Globe,
//   RefreshCw,
//   X,
//   ExternalLink,
//   Mail,
//   Phone,
//   Clock,
//   Star,
//   Award,
//   TrendingUp,
//   TrendingDown,
//   Check,
//   AlertTriangle,
//   MoreVertical,
//   Download,
//   BarChart,
//   PieChart,
//   Target,
//   Lock,
//   Key,
//   Settings,
//   HelpCircle
// } from 'lucide-react';
// import { useTheme } from './ThemeContext';

// // API Configuration
// const API_BASE_URL_SERVER = import.meta.env.VITE_API_BASE_URL_SERVER || "https://hr.hinzah.com";
// const EMPLOYERS_API = `${API_BASE_URL_SERVER}/api/employer`;

// // API Service
// const apiService = {
//   // Fetch all employers
//   async fetchEmployers() {
//     try {
//       const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
//       const companyId = currentUser.companyId || '';
//       const token = localStorage.getItem('token') || localStorage.getItem('authToken');
      
//       const response = await fetch(`https://hr.hinzah.com/api/employers/hierarchy/${companyId}`, {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`
//         }
//       });
      
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
      
//       const data = await response.json();
//       console.log("API Response:", data);
//       return data;
//     } catch (error) {
//       console.error('Error fetching employers:', error);
//       throw error;
//     }
//   },

//   // Create employer
//   async createEmployer(employerData) {
//     try {
//       const token = localStorage.getItem('token') || localStorage.getItem('authToken');
//       const response = await fetch(`${API_BASE_URL_SERVER}/api/employers`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`
//         },
//         body: JSON.stringify(employerData)
//       });
      
//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
//       }
      
//       return await response.json();
//     } catch (error) {
//       console.error('Error creating employer:', error);
//       throw error;
//     }
//   },

//   // Update employer
//   async updateEmployer(id, employerData) {
//     try {
//       const token = localStorage.getItem('token') || localStorage.getItem('authToken');
//       const response = await fetch(`${EMPLOYERS_API}/${id}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`
//         },
//         body: JSON.stringify(employerData)
//       });
      
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
      
//       return await response.json();
//     } catch (error) {
//       console.error('Error updating employer:', error);
//       throw error;
//     }
//   },

//   // Delete employer
//   async deleteEmployer(id) {
//     try {
//       const token = localStorage.getItem('token') || localStorage.getItem('authToken');
//       const response = await fetch(`${EMPLOYERS_API}/${id}`, {
//         method: 'DELETE',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`
//         }
//       });
      
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
      
//       return await response.json();
//     } catch (error) {
//       console.error('Error deleting employer:', error);
//       throw error;
//     }
//   }
// };

// function AdminPage() {
//   const { theme, getThemeClasses } = useTheme();
//   const themeClasses = getThemeClasses();
  
//   // States
//   const [employers, setEmployers] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(null);
  
//   // Dialog states
//   const [openCreateModal, setOpenCreateModal] = useState(false);
//   const [openViewModal, setOpenViewModal] = useState(false);
//   const [openEditModal, setOpenEditModal] = useState(false);
//   const [openDeleteModal, setOpenDeleteModal] = useState(false);
  
//   // Selected employer
//   const [selectedEmployer, setSelectedEmployer] = useState(null);
//   const [newEmployer, setNewEmployer] = useState({
//     employer_code: '',
//     password: '',     
//     name: '',
//     slug: '',
//     status: '',
//     email: '',
//     phone: '',
//     latitude: 0.0,
//     longitude: 0.0,
//     custom_data: {
//       industry: '',
//       employees: 0,
//       location: '',
//       founded_year: '',
//       revenue: '',
//       address: '',
//       city: '',
//       country: '',
//     },
//     belongToTheCompanyID: ''
//   });

//   // Filter and search states
//   const [searchTerm, setSearchTerm] = useState('');
//   const [statusFilter, setStatusFilter] = useState('all');
//   const [industryFilter, setIndustryFilter] = useState('all');
//   const [sortBy, setSortBy] = useState('created_at');
//   const [sortOrder, setSortOrder] = useState('desc');
//   const [page, setPage] = useState(1);
//   const [itemsPerPage] = useState(10);
//   const [selectedRows, setSelectedRows] = useState([]);

//   // Initialize - Fetch employers on component mount
//   useEffect(() => {
//     fetchEmployers();
//   }, []);

//   // Fetch employers from API
//   const fetchEmployers = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const data = await apiService.fetchEmployers();
      
//       // Extract employers from the nested structure
//       if (data && data.companies && Array.isArray(data.companies)) {
//         // Map companies to employers format
//         const employersData = data.companies
//           .filter(company => company.employer) // Filter out companies without employer
//           .map(company => {
//             const employer = company.employer || {};
//             return {
//               id: employer.id,
//               employer_code: employer.employer_code,
//               name: employer.name,
//               email: employer.email,
//               phone: employer.phone,
//               slug: employer.slug,
//               status: employer.status,
//               latitude: employer.latitude,
//               longitude: employer.longitude,
//               created_at: employer.created_at,
//               custom_data: employer.custom_data || {},
//               company_code: company.company_code,
//               employees: company.employees || []
//             };
//           });
//         setEmployers(employersData);
//       } else {
//         console.warn("Unexpected API response structure:", data);
//         setEmployers([]);
//       }
//     } catch (err) {
//       console.error("Error fetching employers:", err);
//       setError('Failed to fetch employers. Please try again.');
//       setEmployers([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Filtered employers
//   const filteredEmployers = employers.filter(employer => {
//     const matchesSearch = 
//       (employer.employer_code && employer.employer_code.toLowerCase().includes(searchTerm.toLowerCase())) ||
//       (employer.name && employer.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
//       (employer.email && employer.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
//       (employer.phone && employer.phone.toLowerCase().includes(searchTerm.toLowerCase()));
    
//     const matchesStatus = statusFilter === 'all' || employer.status === statusFilter;
//     const matchesIndustry = industryFilter === 'all' || 
//       (employer.custom_data?.industry && employer.custom_data.industry.toLowerCase().includes(industryFilter.toLowerCase()));
    
//     return matchesSearch && matchesStatus && matchesIndustry;
//   }).sort((a, b) => {
//     if (sortBy === 'name') {
//       return sortOrder === 'asc' 
//         ? (a.name || '').localeCompare(b.name || '')
//         : (b.name || '').localeCompare(a.name || '');
//     } else if (sortBy === 'status') {
//       return sortOrder === 'asc'
//         ? (a.status || '').localeCompare(b.status || '')
//         : (b.status || '').localeCompare(a.status || '');
//     } else if (sortBy === 'employees') {
//       const empA = a.custom_data?.employees || 0;
//       const empB = b.custom_data?.employees || 0;
//       return sortOrder === 'asc' ? empA - empB : empB - empA;
//     } else {
//       const dateA = a.created_at ? new Date(a.created_at).getTime() : 0;
//       const dateB = b.created_at ? new Date(b.created_at).getTime() : 0;
//       return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
//     }
//   });

//   // Pagination
//   const totalPages = Math.ceil(filteredEmployers.length / itemsPerPage);
//   const startIndex = (page - 1) * itemsPerPage;
//   const paginatedEmployers = filteredEmployers.slice(startIndex, startIndex + itemsPerPage);

//   // Handle Create Employer
//   const handleCreateEmployer = async () => {
//     try {
//       setError(null);
      
//       // Validation
//       if (newEmployer.password !== newEmployer.confirmPassword) {
//         throw new Error('Passwords do not match');
//       }

//       if (!newEmployer.employer_code || !newEmployer.name || !newEmployer.password) {
//         throw new Error('Required fields (Employer Code, Name, Password) are missing');
//       }  

//       const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
//       const companyId = currentUser.companyId || '';
    
//       if (!companyId) {
//         throw new Error('Unable to determine company. Please log in again.');
//       }

//       // Prepare API payload
//       const payload = {
//         employer_code: newEmployer.employer_code,
//         password: newEmployer.password,
//         name: newEmployer.name,
//         slug: newEmployer.slug,
//         status: newEmployer.status,
//         email: newEmployer.email,
//         phone: newEmployer.phone,
//         latitude: parseFloat(newEmployer.latitude) || 0.0,
//         longitude: parseFloat(newEmployer.longitude) || 0.0,
//         custom_data: newEmployer.custom_data,
//         belong_to_company_code: companyId
//       };

//       // Call API
//       const response = await apiService.createEmployer(payload);
      
//       // Update local state
//       const newEmployerData = response.data || response;
//       setEmployers(prev => [...prev, {
//         id: newEmployerData.id,
//         employer_code: newEmployerData.employer_code,
//         name: newEmployerData.name,
//         email: newEmployerData.email,
//         phone: newEmployerData.phone,
//         status: newEmployerData.status,
//         created_at: newEmployerData.created_at,
//         custom_data: newEmployerData.custom_data || {},
//         company_code: companyId,
//         employees: []
//       }]);
      
//       setSuccess('Employer created successfully!');
//       setOpenCreateModal(false);
//       resetNewEmployerForm();
      
//       setTimeout(() => setSuccess(null), 3000);
//     } catch (err) {
//       setError(err.message || 'Failed to create employer');
//     }
//   };

//   // Handle Update Employer
//   const handleUpdateEmployer = async () => {
//     if (!selectedEmployer) return;

//     try {
//       setError(null);
      
//       // Prepare update payload
//       const payload = {
//         employer_code: selectedEmployer.employer_code,
//         name: selectedEmployer.name,
//         slug: selectedEmployer.slug,
//         status: selectedEmployer.status,
//         email: selectedEmployer.email,
//         phone: selectedEmployer.phone,
//         latitude: parseFloat(selectedEmployer.latitude) || 0.0,
//         longitude: parseFloat(selectedEmployer.longitude) || 0.0,
//         custom_data: selectedEmployer.custom_data
//       };

//       // Update password only if provided
//       if (newEmployer.password) {
//         if (newEmployer.password !== newEmployer.confirmPassword) {
//           throw new Error('Passwords do not match');
//         }
//         payload.password = newEmployer.password;
//       }

//       // Call API
//       const response = await apiService.updateEmployer(selectedEmployer.id, payload);
//       const updatedEmployerData = response.data || response;
      
//       // Update local state
//       const updatedEmployers = employers.map(emp => 
//         emp.id === selectedEmployer.id ? { 
//           ...emp, 
//           ...updatedEmployerData,
//           custom_data: updatedEmployerData.custom_data || emp.custom_data
//         } : emp
//       );
      
//       setEmployers(updatedEmployers);
//       setSuccess('Employer updated successfully!');
//       setOpenEditModal(false);
      
//       setTimeout(() => setSuccess(null), 3000);
//     } catch (err) {
//       setError(err.message || 'Failed to update employer');
//     }
//   };

//   // Handle Delete Employer
//   const handleDeleteEmployer = async () => {
//     if (!selectedEmployer) return;

//     try {
//       setError(null);
      
//       // Call API
//       await apiService.deleteEmployer(selectedEmployer.id);
      
//       // Update local state
//       setEmployers(employers.filter(emp => emp.id !== selectedEmployer.id));
//       setSuccess('Employer deleted successfully!');
//       setOpenDeleteModal(false);
      
//       setTimeout(() => setSuccess(null), 3000);
//     } catch (err) {
//       setError(err.message || 'Failed to delete employer');
//     }
//   };

//   const resetNewEmployerForm = () => {
//     setNewEmployer({
//       employer_code: '',
//       password: '',
//       confirmPassword: '',
//       name: '',
//       slug: '',
//       status: 'pending',
//       email: '',
//       phone: '',
//       latitude: 0.0,
//       longitude: 0.0,
//       custom_data: {
//         industry: '',
//         employees: 0,
//         location: '',
//         website: '',
//         description: '',
//         founded_year: '',
//         revenue: '',
//         address: '',
//         city: '',
//         state: '',
//         country: 'India',
//         postal_code: '',
//         bank_name: '',
//         account_number: '',
//         ifsc_code: '',
//         contact_person: '',
//         contact_position: ''
//       },
//     });
//   };

//   // Handle modal opens
//   const handleOpenView = (employer) => {
//     setSelectedEmployer(employer);
//     setOpenViewModal(true);
//   };

//   const handleOpenEdit = (employer) => {
//     setSelectedEmployer({ ...employer });
//     setNewEmployer({
//       password: '',
//       confirmPassword: ''
//     });
//     setOpenEditModal(true);
//   };

//   const handleOpenDelete = (employer) => {
//     setSelectedEmployer(employer);
//     setOpenDeleteModal(true);
//   };

//   // Format date
//   const formatDate = (dateString) => {
//     if (!dateString) return 'N/A';
//     return new Date(dateString).toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit'
//     });
//   };

//   // Get status color
//   const getStatusColor = (status) => {
//     switch (status) {
//       case 'active': 
//         return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
//       case 'pending': 
//         return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
//       case 'inactive': 
//         return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
//       case 'verified': 
//         return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
//       default: 
//         return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
//     }
//   };

//   // Get status icon
//   const getStatusIcon = (status) => {
//     switch (status) {
//       case 'active': return <CheckCircle className="h-4 w-4" />;
//       case 'pending': return <AlertCircle className="h-4 w-4" />;
//       case 'inactive': return <XCircle className="h-4 w-4" />;
//       case 'verified': return <Shield className="h-4 w-4" />;
//       default: return <HelpCircle className="h-4 w-4" />;
//     }
//   };

//   // Stats calculation
//   const totalEmployers = employers.length;
//   const activeEmployers = employers.filter(e => e.status === 'active').length;
//   const pendingEmployers = employers.filter(e => e.status === 'pending').length;
//   const verifiedEmployers = employers.filter(e => e.status === 'verified').length;

//   // Get unique industries for filter
//   const industries = [...new Set(employers
//     .filter(e => e.custom_data?.industry)
//     .map(e => e.custom_data.industry)
//   )];

//   // Handle row selection
//   const toggleRowSelection = (id) => {
//     setSelectedRows(prev => 
//       prev.includes(id) 
//         ? prev.filter(rowId => rowId !== id)
//         : [...prev, id]
//     );
//   };

//   const selectAllRows = () => {
//     if (selectedRows.length === paginatedEmployers.length) {
//       setSelectedRows([]);
//     } else {
//       setSelectedRows(paginatedEmployers.map(emp => emp.id));
//     }
//   };

//   // Bulk actions
//   const handleBulkDelete = async () => {
//     if (selectedRows.length === 0 || !confirm(`Are you sure you want to delete ${selectedRows.length} employers?`)) return;

//     try {
//       setError(null);
//       setLoading(true);
      
//       for (const id of selectedRows) {
//         await apiService.deleteEmployer(id);
//       }
      
//       setEmployers(prev => prev.filter(emp => !selectedRows.includes(emp.id)));
//       setSelectedRows([]);
//       setSuccess(`${selectedRows.length} employers deleted successfully!`);
      
//       setTimeout(() => setSuccess(null), 3000);
//     } catch (err) {
//       setError('Failed to delete selected employers');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleBulkStatusChange = async (newStatus) => {
//     if (selectedRows.length === 0) return;

//     try {
//       setError(null);
//       setLoading(true);
      
//       for (const id of selectedRows) {
//         const employer = employers.find(e => e.id === id);
//         if (employer) {
//           await apiService.updateEmployer(id, { status: newStatus });
//         }
//       }
      
//       // Refresh data
//       fetchEmployers();
//       setSelectedRows([]);
//       setSuccess(`${selectedRows.length} employers updated to ${newStatus} status!`);
      
//       setTimeout(() => setSuccess(null), 3000);
//     } catch (err) {
//       setError('Failed to update selected employers');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // View dashboard
//   const handleViewDashboard = (employerCode) => {
//     if (employerCode) {
//       window.open(`${API_BASE_URL_SERVER}/dashboard?employer=${employerCode}`, '_blank');
//     }
//   };

//   // Get theme colors
//   const getThemeStyle = () => {
//     return {
//       buttonBg: `bg-gradient-to-r from-${theme.accentBase}-500 to-${theme.accentBase}-600`,
//       buttonHover: `hover:from-${theme.accentBase}-600 hover:to-${theme.accentBase}-700`,
//       textColor: `text-${theme.accentBase}-600`,
//       borderColor: `border-${theme.accentBase}-200`,
//       bgColor: `bg-${theme.accentBase}-50`,
//       ringColor: `ring-${theme.accentBase}-500`
//     };
//   };

//   const themeStyle = getThemeStyle();

//   // Update new employer form
//   const updateNewEmployer = (field, value) => {
//     if (field.includes('.')) {
//       const [parent, child] = field.split('.');
//       setNewEmployer(prev => ({
//         ...prev,
//         [parent]: {
//           ...prev[parent],
//           [child]: value
//         }
//       }));
//     } else {
//       setNewEmployer(prev => ({
//         ...prev,
//         [field]: value
//       }));
//     }
//   };

//   // Update selected employer form
//   const updateSelectedEmployer = (field, value) => {
//     if (field.includes('.')) {
//       const [parent, child] = field.split('.');
//       setSelectedEmployer(prev => ({
//         ...prev,
//         [parent]: {
//           ...prev[parent],
//           [child]: value
//         }
//       }));
//     } else {
//       setSelectedEmployer(prev => ({
//         ...prev,
//         [field]: value
//       }));
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-200">
//       {/* Header */}
//       <header className={`bg-white dark:bg-gray-800 shadow-sm transition-colors duration-200 ${themeStyle.borderColor}`}>
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
//           <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
//             <div>
//               <div className="flex items-center gap-3">
//                 <div className={`p-2 rounded-lg ${themeStyle.bgColor}`}>
//                   <Building className={`h-6 w-6 ${themeStyle.textColor}`} />
//                 </div>
//                 <div>
//                   <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
//                     Employers Management
//                   </h1>
//                   <p className="text-gray-600 dark:text-gray-400 mt-1">
//                     Manage and monitor all employer accounts
//                   </p>
//                 </div>
//               </div>
//             </div>
            
//             <div className="flex items-center gap-3">
//               <button
//                 onClick={fetchEmployers}
//                 className="inline-flex items-center px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
//               >
//                 <RefreshCw className="h-4 w-4 mr-2" />
//                 Refresh
//               </button>
//               <button
//                 onClick={() => setOpenCreateModal(true)}
//                 className={`inline-flex items-center px-4 py-2 ${themeStyle.buttonBg} hover:${themeStyle.buttonHover} text-white font-medium rounded-lg transition-all shadow-md hover:shadow-lg`}
//               >
//                 <UserPlus className="h-5 w-5 mr-2" />
//                 Add Employer
//               </button>
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* Main Content */}
//       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* Success/Error Messages */}
//         <AnimatePresence>
//           {error && (
//             <motion.div
//               initial={{ opacity: 0, y: -20 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -20 }}
//               className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl"
//             >
//               <div className="flex items-center">
//                 <XCircle className="h-5 w-5 text-red-400 mr-3 flex-shrink-0" />
//                 <span className="text-red-800 dark:text-red-200 flex-1">{error}</span>
//                 <button
//                   onClick={() => setError(null)}
//                   className="ml-4 text-red-400 hover:text-red-600 dark:hover:text-red-300 transition-colors"
//                 >
//                   <X className="h-5 w-5" />
//                 </button>
//               </div>
//             </motion.div>
//           )}
          
//           {success && (
//             <motion.div
//               initial={{ opacity: 0, y: -20 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -20 }}
//               className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl"
//             >
//               <div className="flex items-center">
//                 <CheckCircle className="h-5 w-5 text-green-400 mr-3 flex-shrink-0" />
//                 <span className="text-green-800 dark:text-green-200 flex-1">{success}</span>
//                 <button
//                   onClick={() => setSuccess(null)}
//                   className="ml-4 text-green-400 hover:text-green-600 dark:hover:text-green-300 transition-colors"
//                 >
//                   <X className="h-5 w-5" />
//                 </button>
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>

//         {/* Stats Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//           <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 transition-all hover:shadow-xl hover:-translate-y-1">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Total Employers</p>
//                 <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{totalEmployers}</p>
//               </div>
//               <div className={`p-3 rounded-full ${themeStyle.bgColor}`}>
//                 <Building className={`h-6 w-6 ${themeStyle.textColor}`} />
//               </div>
//             </div>
//             <div className="flex items-center gap-2 mt-4">
//               <TrendingUp className="h-4 w-4 text-green-500" />
//               <span className="text-sm text-gray-600 dark:text-gray-400">All registered companies</span>
//             </div>
//           </div>

//           <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 transition-all hover:shadow-xl hover:-translate-y-1">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Active</p>
//                 <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{activeEmployers}</p>
//               </div>
//               <div className="p-3 rounded-full bg-green-100 dark:bg-green-900">
//                 <UserCheck className="h-6 w-6 text-green-600 dark:text-green-400" />
//               </div>
//             </div>
//             <div className="flex items-center gap-2 mt-4">
//               <CheckCircle className="h-4 w-4 text-green-500" />
//               <span className="text-sm text-gray-600 dark:text-gray-400">Currently operational</span>
//             </div>
//           </div>

//           <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 transition-all hover:shadow-xl hover:-translate-y-1">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Pending</p>
//                 <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{pendingEmployers}</p>
//               </div>
//               <div className="p-3 rounded-full bg-yellow-100 dark:bg-yellow-900">
//                 <AlertCircle className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
//               </div>
//             </div>
//             <div className="flex items-center gap-2 mt-4">
//               <Clock className="h-4 w-4 text-yellow-500" />
//               <span className="text-sm text-gray-600 dark:text-gray-400">Awaiting approval</span>
//             </div>
//           </div>

//           <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 transition-all hover:shadow-xl hover:-translate-y-1">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Verified</p>
//                 <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{verifiedEmployers}</p>
//               </div>
//               <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900">
//                 <Shield className="h-6 w-6 text-blue-600 dark:text-blue-400" />
//               </div>
//             </div>
//             <div className="flex items-center gap-2 mt-4">
//               <Award className="h-4 w-4 text-blue-500" />
//               <span className="text-sm text-gray-600 dark:text-gray-400">Verified & trusted</span>
//             </div>
//           </div>
//         </div>

//         {/* Filters and Search */}
//         <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-6 transition-colors">
//           <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
//             <div className="relative flex-1">
//               <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
//               <input
//                 type="text"
//                 placeholder="Search employers by code, name, email, or phone..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="pl-12 pr-4 py-3 w-full border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
//               />
//             </div>
            
//             <div className="flex flex-wrap items-center gap-3">
//               <select
//                 value={statusFilter}
//                 onChange={(e) => setStatusFilter(e.target.value)}
//                 className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//               >
//                 <option value="all">All Status</option>
//                 <option value="active">Active</option>
//                 <option value="pending">Pending</option>
//                 <option value="inactive">Inactive</option>
//                 <option value="verified">Verified</option>
//               </select>

//               <select
//                 value={industryFilter}
//                 onChange={(e) => setIndustryFilter(e.target.value)}
//                 className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//               >
//                 <option value="all">All Industries</option>
//                 {industries.map(industry => (
//                   <option key={industry} value={industry}>{industry}</option>
//                 ))}
//               </select>

//               <select
//                 value={sortBy}
//                 onChange={(e) => setSortBy(e.target.value)}
//                 className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//               >
//                 <option value="created_at">Sort by Date</option>
//                 <option value="name">Sort by Name</option>
//                 <option value="status">Sort by Status</option>
//                 <option value="employees">Sort by Employees</option>
//               </select>

//               <button
//                 onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')}
//                 className="p-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
//                 title={sortOrder === 'asc' ? 'Sort descending' : 'Sort ascending'}
//               >
//                 {sortOrder === 'asc' ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
//               </button>

//               <button
//                 onClick={() => setSelectedRows([])}
//                 className={`px-4 py-3 ${selectedRows.length > 0 ? 'bg-red-600 hover:bg-red-700' : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'} text-white dark:text-gray-300 font-medium rounded-xl transition-colors`}
//                 disabled={selectedRows.length === 0}
//               >
//                 Clear Selection ({selectedRows.length})
//               </button>
//             </div>
//           </div>

//           {/* Bulk Actions */}
//           {selectedRows.length > 0 && (
//             <div className="flex flex-wrap items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl mb-4">
//               <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
//                 {selectedRows.length} employer(s) selected
//               </span>
//               <div className="flex flex-wrap gap-2">
//                 <button
//                   onClick={() => handleBulkStatusChange('active')}
//                   className="px-3 py-2 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-sm font-medium rounded-lg hover:bg-green-200 dark:hover:bg-green-800 transition-colors"
//                 >
//                   Mark Active
//                 </button>
//                 <button
//                   onClick={() => handleBulkStatusChange('pending')}
//                   className="px-3 py-2 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 text-sm font-medium rounded-lg hover:bg-yellow-200 dark:hover:bg-yellow-800 transition-colors"
//                 >
//                   Mark Pending
//                 </button>
//                 <button
//                   onClick={() => handleBulkStatusChange('inactive')}
//                   className="px-3 py-2 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 text-sm font-medium rounded-lg hover:bg-red-200 dark:hover:bg-red-800 transition-colors"
//                 >
//                   Mark Inactive
//                 </button>
//                 <button
//                   onClick={handleBulkDelete}
//                   className="px-3 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition-colors"
//                 >
//                   Delete Selected
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Employers Table */}
//         <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden transition-colors">
//           <div className="overflow-x-auto">
//             <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
//               <thead className="bg-gray-50 dark:bg-gray-700">
//                 <tr>
//                   <th className="px-6 py-4 text-left">
//                     <div className="flex items-center">
//                       <input
//                         type="checkbox"
//                         checked={selectedRows.length === paginatedEmployers.length && paginatedEmployers.length > 0}
//                         onChange={selectAllRows}
//                         className="h-4 w-4 rounded border-gray-300 dark:border-gray-600 text-indigo-600 focus:ring-indigo-500"
//                       />
//                     </div>
//                   </th>
//                   <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
//                     Company
//                   </th>
//                   <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
//                     Contact
//                   </th>
//                   <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
//                     Status
//                   </th>
//                   <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
//                     Industry
//                   </th>
//                   <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
//                     Created
//                   </th>
//                   <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
//                     Actions
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
//                 {loading ? (
//                   <tr>
//                     <td colSpan={7} className="px-6 py-12 text-center">
//                       <div className="flex flex-col items-center justify-center">
//                         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500 mb-4"></div>
//                         <p className="text-gray-500 dark:text-gray-400">Loading employers...</p>
//                       </div>
//                     </td>
//                   </tr>
//                 ) : paginatedEmployers.length === 0 ? (
//                   <tr>
//                     <td colSpan={7} className="px-6 py-12 text-center">
//                       <div className="flex flex-col items-center justify-center">
//                         <Building className="h-16 w-16 text-gray-300 dark:text-gray-600 mb-4" />
//                         <p className="text-gray-500 dark:text-gray-400 text-lg font-medium mb-2">No employers found</p>
//                         <p className="text-gray-400 dark:text-gray-500 text-sm mb-4">
//                           {searchTerm || statusFilter !== 'all' || industryFilter !== 'all'
//                             ? 'Try changing your search or filter criteria'
//                             : 'Get started by creating your first employer'}
//                         </p>
//                         {!searchTerm && statusFilter === 'all' && industryFilter === 'all' && (
//                           <button
//                             onClick={() => setOpenCreateModal(true)}
//                             className={`inline-flex items-center px-4 py-2 ${themeStyle.buttonBg} hover:${themeStyle.buttonHover} text-white font-medium rounded-lg transition-colors`}
//                           >
//                             <UserPlus className="h-5 w-5 mr-2" />
//                             Add New Employer
//                           </button>
//                         )}
//                       </div>
//                     </td>
//                   </tr>
//                 ) : (
//                   paginatedEmployers.map((employer) => (
//                     <tr 
//                       key={employer.id} 
//                       className={`hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-150 ${
//                         selectedRows.includes(employer.id) ? 'bg-blue-50 dark:bg-blue-900/20' : ''
//                       }`}
//                     >
//                       <td className="px-6 py-4">
//                         <input
//                           type="checkbox"
//                           checked={selectedRows.includes(employer.id)}
//                           onChange={() => toggleRowSelection(employer.id)}
//                           className="h-4 w-4 rounded border-gray-300 dark:border-gray-600 text-indigo-600 focus:ring-indigo-500"
//                         />
//                       </td>
//                       <td className="px-6 py-4">
//                         <div className="flex items-center gap-3">
//                           <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600">
//                             <Building className="h-5 w-5 text-white" />
//                           </div>
//                           <div>
//                             <div className="font-medium text-gray-900 dark:text-white">
//                               {employer.name || 'N/A'}
//                             </div>
//                             <div className="text-sm text-gray-500 dark:text-gray-400">
//                               {employer.employer_code || 'N/A'}
//                             </div>
//                           </div>
//                         </div>
//                       </td>
//                       <td className="px-6 py-4">
//                         <div className="space-y-1">
//                           <div className="flex items-center gap-2 text-sm text-gray-900 dark:text-white">
//                             <Mail className="h-4 w-4 text-gray-400" />
//                             {employer.email || 'N/A'}
//                           </div>
//                           <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
//                             <Phone className="h-4 w-4 text-gray-400" />
//                             {employer.phone || 'N/A'}
//                           </div>
//                         </div>
//                       </td>
//                       <td className="px-6 py-4">
//                         <div className="flex items-center gap-2">
//                           {getStatusIcon(employer.status)}
//                           <span className={`px-3 py-1 inline-flex text-xs font-semibold rounded-full ${getStatusColor(employer.status)}`}>
//                             {(employer.status || 'pending').charAt(0).toUpperCase() + (employer.status || 'pending').slice(1)}
//                           </span>
//                         </div>
//                       </td>
//                       <td className="px-6 py-4">
//                         <div className="text-sm text-gray-900 dark:text-white">
//                           {employer.custom_data?.industry || 'N/A'}
//                         </div>
//                         <div className="text-xs text-gray-500 dark:text-gray-400">
//                           {employer.custom_data?.employees ? `${employer.custom_data.employees} employees` : ''}
//                         </div>
//                       </td>
//                       <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
//                         {formatDate(employer.created_at)}
//                       </td>
//                       <td className="px-6 py-4">
//                         <div className="flex items-center gap-2">
//                           <button
//                             onClick={() => handleOpenView(employer)}
//                             className="p-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors"
//                             title="View Details"
//                           >
//                             <Eye className="h-4 w-4" />
//                           </button>
//                           <button
//                             onClick={() => handleViewDashboard(employer.employer_code)}
//                             className="p-2 text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300 hover:bg-green-50 dark:hover:bg-green-900/30 rounded-lg transition-colors"
//                             title="View Dashboard"
//                           >
//                             <BarChart className="h-4 w-4" />
//                           </button>
//                           <button
//                             onClick={() => handleOpenEdit(employer)}
//                             className={`p-2 ${themeStyle.textColor} hover:${themeStyle.textColor.replace('600', '800')} hover:bg-${theme.accentBase}-50 dark:hover:bg-${theme.accentBase}-900/30 rounded-lg transition-colors`}
//                             title="Edit"
//                           >
//                             <Edit2 className="h-4 w-4" />
//                           </button>
//                           <button
//                             onClick={() => handleOpenDelete(employer)}
//                             className="p-2 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors"
//                             title="Delete"
//                           >
//                             <Trash2 className="h-4 w-4" />
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
//           {totalPages > 1 && (
//             <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700">
//               <div className="flex items-center justify-between">
//                 <div className="text-sm text-gray-700 dark:text-gray-300">
//                   Showing <span className="font-medium">{startIndex + 1}</span> to{' '}
//                   <span className="font-medium">{Math.min(startIndex + itemsPerPage, filteredEmployers.length)}</span> of{' '}
//                   <span className="font-medium">{filteredEmployers.length}</span> results
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <button
//                     onClick={() => setPage(prev => Math.max(1, prev - 1))}
//                     disabled={page === 1}
//                     className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
//                   >
//                     <ChevronLeft className="h-5 w-5" />
//                   </button>
//                   {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
//                     let pageNum;
//                     if (totalPages <= 5) {
//                       pageNum = i + 1;
//                     } else if (page <= 3) {
//                       pageNum = i + 1;
//                     } else if (page >= totalPages - 2) {
//                       pageNum = totalPages - 4 + i;
//                     } else {
//                       pageNum = page - 2 + i;
//                     }
                    
//                     return (
//                       <button
//                         key={pageNum}
//                         onClick={() => setPage(pageNum)}
//                         className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
//                           page === pageNum
//                             ? `${themeStyle.buttonBg} text-white`
//                             : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
//                         }`}
//                       >
//                         {pageNum}
//                       </button>
//                     );
//                   })}
//                   <button
//                     onClick={() => setPage(prev => Math.min(totalPages, prev + 1))}
//                     disabled={page === totalPages}
//                     className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
//                   >
//                     <ChevronRight className="h-5 w-5" />
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </main>

//       {/* Create Employer Modal */}
//       {openCreateModal && (
//         <AnimatePresence>
//           <div className="fixed inset-0 z-50 overflow-y-auto">
//             <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-0 sm:p-4 overflow-y-auto">
//               <motion.div
//                 initial={{ opacity: 0, scale: 0.95, y: 20 }}
//                 animate={{ opacity: 1, scale: 1, y: 0 }}
//                 exit={{ opacity: 0, scale: 0.95, y: 20 }}
//                 transition={{ type: "spring", damping: 25, stiffness: 300 }}
//                 className="bg-white dark:bg-gray-800 w-full max-w-4xl max-h-screen sm:max-h-[90vh] sm:rounded-2xl shadow-2xl sm:border sm:border-gray-200 dark:sm:border-gray-700 flex flex-col h-screen sm:h-auto"
//               >
//                 <div className="px-6 pt-5 pb-4 sm:px-8 sm:pt-6 sm:pb-6">
//                   <div className="flex items-center justify-between mb-6">
//                     <div>
//                       <h3 className="text-xl font-bold text-gray-900 dark:text-white">
//                         <UserPlus className="inline-block h-6 w-6 mr-2" />
//                         Create New Employer
//                       </h3>
//                       <p className="text-gray-600 dark:text-gray-400 mt-1">
//                         Fill in the employer details below
//                       </p>
//                     </div>
//                     <button
//                       onClick={() => setOpenCreateModal(false)}
//                       className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 transition-colors p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
//                     >
//                       <X className="h-5 w-5" />
//                     </button>
//                   </div>
                  
//                   <div className="space-y-6 max-h-[70vh] overflow-y-auto pr-2">
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                       {/* Basic Information */}
//                       <div className="space-y-4">
//                         <h4 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
//                           <UserCog className="h-5 w-5" />
//                           Basic Information
//                         </h4>
                        
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                             Employer Code *
//                           </label>
//                           <input
//                             type="text"
//                             value={newEmployer.employer_code}
//                             onChange={(e) => updateNewEmployer('employer_code', e.target.value)}
//                             className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//                             placeholder="e.g., EMP001"
//                             required
//                           />
//                         </div>
                        
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                             Company Name *
//                           </label>
//                           <input
//                             type="text"
//                             value={newEmployer.name}
//                             onChange={(e) => updateNewEmployer('name', e.target.value)}
//                             className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//                             placeholder="e.g., Tech Solutions Inc."
//                             required
//                           />
//                         </div>
                        
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                             Slug
//                           </label>
//                           <input
//                             type="text"
//                             value={newEmployer.slug}
//                             onChange={(e) => updateNewEmployer('slug', e.target.value)}
//                             className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//                             placeholder="e.g., tech-solutions"
//                           />
//                         </div>
                        
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                             Status
//                           </label>
//                           <select
//                             value={newEmployer.status}
//                             onChange={(e) => updateNewEmployer('status', e.target.value)}
//                             className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//                           >
//                             <option value="pending">Pending</option>
//                             <option value="active">Active</option>
//                             <option value="inactive">Inactive</option>
//                             <option value="verified">Verified</option>
//                           </select>
//                         </div>
//                       </div>

//                       {/* Security */}
//                       <div className="space-y-4">
//                         <h4 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
//                           <Lock className="h-5 w-5" />
//                           Security
//                         </h4>
                        
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                             Password *
//                           </label>
//                           <input
//                             type="password"
//                             value={newEmployer.password}
//                             onChange={(e) => updateNewEmployer('password', e.target.value)}
//                             className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//                             placeholder="Enter password"
//                             required
//                           />
//                         </div>
                        
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                             Confirm Password *
//                           </label>
//                           <input
//                             type="password"
//                             value={newEmployer.confirmPassword}
//                             onChange={(e) => updateNewEmployer('confirmPassword', e.target.value)}
//                             className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//                             placeholder="Confirm password"
//                             required
//                           />
//                         </div>
//                       </div>
//                     </div>

//                     {/* Contact Information */}
//                     <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
//                       <h4 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2 mb-4">
//                         <Mail className="h-5 w-5" />
//                         Contact Information
//                       </h4>
//                       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                             Email
//                           </label>
//                           <input
//                             type="email"
//                             value={newEmployer.email}
//                             onChange={(e) => updateNewEmployer('email', e.target.value)}
//                             className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//                             placeholder="company@example.com"
//                           />
//                         </div>
                        
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                             Phone
//                           </label>
//                           <input
//                             type="tel"
//                             value={newEmployer.phone}
//                             onChange={(e) => updateNewEmployer('phone', e.target.value)}
//                             className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//                             placeholder="+1234567890"
//                           />
//                         </div>
//                       </div>
//                     </div>

//                     {/* Company Details */}
//                     <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
//                       <h4 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2 mb-4">
//                         <Briefcase className="h-5 w-5" />
//                         Company Details
//                       </h4>
//                       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                             Industry
//                           </label>
//                           <input
//                             type="text"
//                             value={newEmployer.custom_data.industry}
//                             onChange={(e) => updateNewEmployer('custom_data.industry', e.target.value)}
//                             className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//                             placeholder="e.g., Technology"
//                           />
//                         </div>
                        
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                             Number of Employees
//                           </label>
//                           <input
//                             type="number"
//                             value={newEmployer.custom_data.employees}
//                             onChange={(e) => updateNewEmployer('custom_data.employees', parseInt(e.target.value) || 0)}
//                             className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//                             placeholder="0"
//                             min="0"
//                           />
//                         </div>
                        
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                             Website
//                           </label>
//                           <input
//                             type="url"
//                             value={newEmployer.custom_data.website}
//                             onChange={(e) => updateNewEmployer('custom_data.website', e.target.value)}
//                             className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//                             placeholder="https://example.com"
//                           />
//                         </div>
                        
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                             Founded Year
//                           </label>
//                           <input
//                             type="number"
//                             value={newEmployer.custom_data.founded_year}
//                             onChange={(e) => updateNewEmployer('custom_data.founded_year', e.target.value)}
//                             className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//                             placeholder="2020"
//                             min="1900"
//                             max="2024"
//                           />
//                         </div>
                        
//                         <div className="md:col-span-2">
//                           <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                             Description
//                           </label>
//                           <textarea
//                             value={newEmployer.custom_data.description}
//                             onChange={(e) => updateNewEmployer('custom_data.description', e.target.value)}
//                             rows="3"
//                             className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
//                             placeholder="Company description..."
//                           />
//                         </div>
//                       </div>
//                     </div>

//                     {/* Address Information */}
//                     <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
//                       <h4 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2 mb-4">
//                         <MapPin className="h-5 w-5" />
//                         Address Information
//                       </h4>
//                       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                         <div className="md:col-span-2">
//                           <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                             Address
//                           </label>
//                           <input
//                             type="text"
//                             value={newEmployer.custom_data.address}
//                             onChange={(e) => updateNewEmployer('custom_data.address', e.target.value)}
//                             className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//                             placeholder="Street address"
//                           />
//                         </div>
                        
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                             City
//                           </label>
//                           <input
//                             type="text"
//                             value={newEmployer.custom_data.city}
//                             onChange={(e) => updateNewEmployer('custom_data.city', e.target.value)}
//                             className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//                             placeholder="City"
//                           />
//                         </div>
                        
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                             State
//                           </label>
//                           <input
//                             type="text"
//                             value={newEmployer.custom_data.state}
//                             onChange={(e) => updateNewEmployer('custom_data.state', e.target.value)}
//                             className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//                             placeholder="State"
//                           />
//                         </div>
                        
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                             Country
//                           </label>
//                           <input
//                             type="text"
//                             value={newEmployer.custom_data.country}
//                             onChange={(e) => updateNewEmployer('custom_data.country', e.target.value)}
//                             className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//                             placeholder="Country"
//                           />
//                         </div>
                        
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                             Postal Code
//                           </label>
//                           <input
//                             type="text"
//                             value={newEmployer.custom_data.postal_code}
//                             onChange={(e) => updateNewEmployer('custom_data.postal_code', e.target.value)}
//                             className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//                             placeholder="12345"
//                           />
//                         </div>
//                       </div>
//                     </div>

//                     {/* Coordinates */}
//                     <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
//                       <h4 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2 mb-4">
//                         <Globe className="h-5 w-5" />
//                         Coordinates
//                       </h4>
//                       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                             Latitude
//                           </label>
//                           <input
//                             type="number"
//                             step="0.000001"
//                             value={newEmployer.latitude}
//                             onChange={(e) => updateNewEmployer('latitude', parseFloat(e.target.value) || 0.0)}
//                             className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//                             placeholder="0.0"
//                           />
//                         </div>
                        
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                             Longitude
//                           </label>
//                           <input
//                             type="number"
//                             step="0.000001"
//                             value={newEmployer.longitude}
//                             onChange={(e) => updateNewEmployer('longitude', parseFloat(e.target.value) || 0.0)}
//                             className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//                             placeholder="0.0"
//                           />
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
                
//                 <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700/50 flex justify-end space-x-3">
//                   <button
//                     onClick={() => setOpenCreateModal(false)}
//                     className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     onClick={handleCreateEmployer}
//                     className={`px-4 py-2 ${themeStyle.buttonBg} hover:${themeStyle.buttonHover} text-white font-medium rounded-lg text-sm transition-colors shadow-md hover:shadow-lg`}
//                   >
//                     Create Employer
//                   </button>
//                 </div>
//               </motion.div>
//             </div>
//           </div>
//         </AnimatePresence>
//       )}

//       {/* View Employer Modal */}
//       {openViewModal && selectedEmployer && (
//         <AnimatePresence>
//           <div className="fixed inset-0 z-50 overflow-y-auto">
//             <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0 inset-0 bg-gray-500 dark:bg-gray-900 bg-opacity-75 transition-opacity">
              
//               <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
//               <motion.div
//                 initial={{ opacity: 0, scale: 0.95 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 exit={{ opacity: 0, scale: 0.95 }}
//                 className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full"
//               >
//                 <div className="px-6 pt-5 pb-4">
//                   <div className="flex items-center justify-between mb-4">
//                     <h3 className="text-lg font-bold text-gray-900 dark:text-white">
//                       <Eye className="inline-block h-5 w-5 mr-2" />
//                       Employer Details
//                     </h3>
//                     <button
//                       onClick={() => setOpenViewModal(false)}
//                       className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 transition-colors p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
//                     >
//                       <X className="h-5 w-5" />
//                     </button>
//                   </div>
                  
//                   <div className="space-y-6">
//                     <div className="flex items-center gap-4">
//                       <div className="h-16 w-16 flex items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600">
//                         <Building className="h-8 w-8 text-white" />
//                       </div>
//                       <div>
//                         <h4 className="text-xl font-bold text-gray-900 dark:text-white">{selectedEmployer.name || 'N/A'}</h4>
//                         <p className="text-gray-600 dark:text-gray-400">{selectedEmployer.employer_code || 'N/A'}</p>
//                       </div>
//                     </div>
                    
//                     <div className="grid grid-cols-2 gap-4">
//                       <div>
//                         <p className="text-sm text-gray-500 dark:text-gray-400">Status</p>
//                         <p className={`px-3 py-1 inline-flex text-xs font-semibold rounded-full ${getStatusColor(selectedEmployer.status)}`}>
//                           {(selectedEmployer.status || 'pending').charAt(0).toUpperCase() + (selectedEmployer.status || 'pending').slice(1)}
//                         </p>
//                       </div>
//                       <div>
//                         <p className="text-sm text-gray-500 dark:text-gray-400">Industry</p>
//                         <p className="font-medium text-gray-900 dark:text-white">{selectedEmployer.custom_data?.industry || 'N/A'}</p>
//                       </div>
//                       <div>
//                         <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
//                         <p className="font-medium text-gray-900 dark:text-white">{selectedEmployer.email || 'N/A'}</p>
//                       </div>
//                       <div>
//                         <p className="text-sm text-gray-500 dark:text-gray-400">Phone</p>
//                         <p className="font-medium text-gray-900 dark:text-white">{selectedEmployer.phone || 'N/A'}</p>
//                       </div>
//                     </div>
                    
//                     <div>
//                       <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Address</p>
//                       <p className="text-gray-900 dark:text-white">
//                         {selectedEmployer.custom_data?.address || 'N/A'}<br />
//                         {selectedEmployer.custom_data?.city && `${selectedEmployer.custom_data.city}, `}
//                         {selectedEmployer.custom_data?.state} {selectedEmployer.custom_data?.postal_code}<br />
//                         {selectedEmployer.custom_data?.country}
//                       </p>
//                     </div>
                    
//                     <div>
//                       <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Description</p>
//                       <p className="text-gray-900 dark:text-white">{selectedEmployer.custom_data?.description || 'No description provided'}</p>
//                     </div>
                    
//                     <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
//                       <p className="text-sm text-gray-500 dark:text-gray-400">Created</p>
//                       <p className="text-gray-900 dark:text-white">{formatDate(selectedEmployer.created_at)}</p>
//                     </div>
//                   </div>
//                 </div>
                
//                 <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700/50 flex justify-end space-x-3">
//                   <button
//                     onClick={() => setOpenViewModal(false)}
//                     className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
//                   >
//                     Close
//                   </button>
//                   <button
//                     onClick={() => {
//                       setOpenViewModal(false);
//                       handleOpenEdit(selectedEmployer);
//                     }}
//                     className={`px-4 py-2 ${themeStyle.buttonBg} hover:${themeStyle.buttonHover} text-white font-medium rounded-lg text-sm transition-colors`}
//                   >
//                     Edit Employer
//                   </button>
//                 </div>
//               </motion.div>
//             </div>
//           </div>
//         </AnimatePresence>
//       )}

//       {/* Edit Employer Modal */}
//       {openEditModal && selectedEmployer && (
//         <AnimatePresence>
//           <div className="fixed inset-0 z-50 overflow-y-auto">
//             <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            
//               <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
//               <motion.div
//                 initial={{ opacity: 0, scale: 0.95 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 exit={{ opacity: 0, scale: 0.95 }}
//                 className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full"
//               >
//                 <div className="px-6 pt-5 pb-4 sm:px-8 sm:pt-6 sm:pb-6">
//                   <div className="flex items-center justify-between mb-6">
//                     <h3 className="text-xl font-bold text-gray-900 dark:text-white">
//                       <Edit2 className="inline-block h-6 w-6 mr-2" />
//                       Edit Employer
//                     </h3>
//                     <button
//                       onClick={() => setOpenEditModal(false)}
//                       className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 transition-colors p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
//                     >
//                       <X className="h-5 w-5" />
//                     </button>
//                   </div>
                  
//                   <div className="space-y-6 max-h-[70vh] overflow-y-auto pr-2">
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                       <div className="space-y-4">
//                         <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Basic Information</h4>
                        
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                             Employer Code
//                           </label>
//                           <input
//                             type="text"
//                             value={selectedEmployer.employer_code || ''}
//                             onChange={(e) => updateSelectedEmployer('employer_code', e.target.value)}
//                             className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//                             disabled
//                           />
//                         </div>
                        
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                             Company Name *
//                           </label>
//                           <input
//                             type="text"
//                             value={selectedEmployer.name || ''}
//                             onChange={(e) => updateSelectedEmployer('name', e.target.value)}
//                             className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//                             required
//                           />
//                         </div>
                        
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                             Status
//                           </label>
//                           <select
//                             value={selectedEmployer.status || 'pending'}
//                             onChange={(e) => updateSelectedEmployer('status', e.target.value)}
//                             className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//                           >
//                             <option value="pending">Pending</option>
//                             <option value="active">Active</option>
//                             <option value="inactive">Inactive</option>
//                             <option value="verified">Verified</option>
//                           </select>
//                         </div>
                        
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                             Email
//                           </label>
//                           <input
//                             type="email"
//                             value={selectedEmployer.email || ''}
//                             onChange={(e) => updateSelectedEmployer('email', e.target.value)}
//                             className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//                           />
//                         </div>
                        
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                             Phone
//                           </label>
//                           <input
//                             type="tel"
//                             value={selectedEmployer.phone || ''}
//                             onChange={(e) => updateSelectedEmployer('phone', e.target.value)}
//                             className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//                           />
//                         </div>
//                       </div>

//                       <div className="space-y-4">
//                         <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Change Password</h4>
//                         <p className="text-sm text-gray-500 dark:text-gray-400">Leave blank to keep current password</p>
                        
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                             New Password
//                           </label>
//                           <input
//                             type="password"
//                             value={newEmployer.password}
//                             onChange={(e) => setNewEmployer(prev => ({ ...prev, password: e.target.value }))}
//                             className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//                           />
//                         </div>
                        
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                             Confirm New Password
//                           </label>
//                           <input
//                             type="password"
//                             value={newEmployer.confirmPassword}
//                             onChange={(e) => setNewEmployer(prev => ({ ...prev, confirmPassword: e.target.value }))}
//                             className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//                           />
//                         </div>
//                       </div>
//                     </div>

//                     {/* Company Details */}
//                     <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
//                       <h4 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2 mb-4">
//                         <Briefcase className="h-5 w-5" />
//                         Company Details
//                       </h4>
//                       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                             Industry
//                           </label>
//                           <input
//                             type="text"
//                             value={selectedEmployer.custom_data?.industry || ''}
//                             onChange={(e) => updateSelectedEmployer('custom_data.industry', e.target.value)}
//                             className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//                           />
//                         </div>
                        
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                             Number of Employees
//                           </label>
//                           <input
//                             type="number"
//                             value={selectedEmployer.custom_data?.employees || 0}
//                             onChange={(e) => updateSelectedEmployer('custom_data.employees', parseInt(e.target.value) || 0)}
//                             className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//                           />
//                         </div>
                        
//                         <div className="md:col-span-2">
//                           <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                             Description
//                           </label>
//                           <textarea
//                             value={selectedEmployer.custom_data?.description || ''}
//                             onChange={(e) => updateSelectedEmployer('custom_data.description', e.target.value)}
//                             rows="3"
//                             className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
//                           />
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
                
//                 <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700/50 flex justify-end space-x-3">
//                   <button
//                     onClick={() => setOpenEditModal(false)}
//                     className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     onClick={handleUpdateEmployer}
//                     className={`px-4 py-2 ${themeStyle.buttonBg} hover:${themeStyle.buttonHover} text-white font-medium rounded-lg text-sm transition-colors shadow-md hover:shadow-lg`}
//                   >
//                     Update Employer
//                   </button>
//                 </div>
//               </motion.div>
//             </div>
//           </div>
//         </AnimatePresence>
//       )}

//       {/* Delete Confirmation Modal */}
//       {openDeleteModal && selectedEmployer && (
//         <AnimatePresence>
//           <div className="fixed inset-0 z-50 overflow-y-auto">
//             <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
//               <div className="fixed inset-0 bg-gray-500 dark:bg-gray-900 bg-opacity-75 transition-opacity" />
//               <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
//               <motion.div
//                 initial={{ opacity: 0, scale: 0.95 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 exit={{ opacity: 0, scale: 0.95 }}
//                 className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-md sm:w-full"
//               >
//                 <div className="px-6 pt-5 pb-4 text-center">
//                   <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-red-900 mb-4">
//                     <AlertTriangle className="h-6 w-6 text-red-600 dark:text-red-400" />
//                   </div>
                  
//                   <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
//                     Confirm Delete
//                   </h3>
//                   <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
//                     Are you sure you want to delete employer
//                   </p>
//                   <p className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
//                     {selectedEmployer.name} ({selectedEmployer.employer_code})
//                   </p>
//                   <p className="text-xs text-gray-400 dark:text-gray-500">
//                     This action cannot be undone.
//                   </p>
//                 </div>
                
//                 <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700/50 flex justify-center space-x-3">
//                   <button
//                     onClick={() => setOpenDeleteModal(false)}
//                     className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     onClick={handleDeleteEmployer}
//                     className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg text-sm transition-colors shadow-md hover:shadow-lg"
//                   >
//                     Delete Employer
//                   </button>
//                 </div>
//               </motion.div>
//             </div>
//           </div>
//         </AnimatePresence>
//       )}
//     </div>
//   );
// }

// export default AdminPage;







'use client';
import { motion, AnimatePresence } from 'framer-motion';
import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Edit2, 
  Trash2, 
  Eye, 
  Users, 
  UserCheck, 
  UserCog, 
  UserPlus,
  Shield,
  Briefcase,
  Calendar,
  MapPin,
  DollarSign,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  Filter,
  Search,
  AlertCircle,
  CheckCircle,
  XCircle,
  Building,
  Users as UsersIcon,
  Globe,
  RefreshCw,
  X,
  ExternalLink,
  Mail,
  Phone,
  Clock,
  Star,
  Award,
  TrendingUp,
  ShieldCheck,
  TrendingDown,
  Check,
  AlertTriangle,
  MoreVertical,
  Download,
  BarChart,
  PieChart,
  Target,
  Lock,
  Key,
  Settings,
  HelpCircle,
  Sun,
  Moon
} from 'lucide-react';
import { useTheme } from './ThemeContext';
import { MODULES, SUB_PERMISSIONS } from './data/navdata';
// API Configuration
const API_BASE_URL_SERVER = import.meta.env.VITE_API_BASE_URL_SERVER || "https://hr.hinzah.com";
const EMPLOYERS_API = `${API_BASE_URL_SERVER}/api/employer`;

// API Service
const apiService = {
  async fetchEmployers() {
    try {
      const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
      const companyId = currentUser.companyId || '';
      const token = localStorage.getItem('token') || localStorage.getItem('authToken');
      
      const response = await fetch(`https://hr.hinzah.com/api/employers/hierarchy/${companyId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching employers:', error);
      throw error;
    }
  },

  async createEmployer(employerData) {
    try {
      const token = localStorage.getItem('token') || localStorage.getItem('authToken');
      const response = await fetch(`${API_BASE_URL_SERVER}/api/employers`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(employerData)
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error creating employer:', error);
      throw error;
    }
  },

  async createEmployerPermissions(employerId, permissions) {
   
     console.log("employers id or code",employerId)
      const permissionsPayload = {
      company_code: employerId,
      permissions:permissions
    };
     
    try {
      const token = localStorage.getItem('token') || localStorage.getItem('authToken');
      const response = await fetch("https://hr.hinzah.com/api/company/permissions", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(permissionsPayload)
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        console.warn('Permissions API failed:', errorData);
        return { success: false, error: errorData };
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error creating permissions:', error);
      return { success: false, error: error.message };
    }
  },

  async updateEmployer(id, employerData) {
    try {
      const token = localStorage.getItem('token') || localStorage.getItem('authToken');
      const response = await fetch(`${EMPLOYERS_API}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(employerData)
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error updating employer:', error);
      throw error;
    }
  },

  async deleteEmployer(id) {
    try {
      const token = localStorage.getItem('token') || localStorage.getItem('authToken');
      const response = await fetch(`${EMPLOYERS_API}/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error deleting employer:', error);
      throw error;
    }
  },

  async getEmployerPermissions(employerId) {
    try {
      const token = localStorage.getItem('token') || localStorage.getItem('authToken');
      const response = await fetch(`${API_BASE_URL_SERVER}/api/employer/${employerId}/permissions`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching employer permissions:', error);
      throw error;
    }
  }
};

function AdminPage() {
  const { theme, getThemeClasses } = useTheme();
  const themeClasses = getThemeClasses();
  const [darkMode, setDarkMode] = useState(false);
  const [openModule, setOpenModule] = useState(null);
  // States
  const [employers, setEmployers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  
  // Dialog states
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openViewModal, setOpenViewModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  
  // Selected employer
  const [selectedEmployer, setSelectedEmployer] = useState(null);
  const [newEmployer, setNewEmployer] = useState({
    employer_code: '',
    password: '',     
    name: '',
    slug: '',
    status: 'pending',
    email: '',
    phone: '',
    latitude: 0.0,
    longitude: 0.0,
    custom_data: {
      industry: '',
      employees: 0,
      location: '',
      founded_year: '',
      revenue: '',
      address: '',
      city: '',
      country: 'India',
    }
  }); 
  
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
  
  const [formData, setFormData] = useState({
    permissions: generateDefaultPermissions('employee'),
  });

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

  // Filter and search states
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [industryFilter, setIndustryFilter] = useState('all');
  const [sortBy, setSortBy] = useState('created_at');
  const [sortOrder, setSortOrder] = useState('desc');
  const [page, setPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [selectedRows, setSelectedRows] = useState([]);

  // Initialize - Fetch employers on component mount
  useEffect(() => {
    fetchEmployers();
    // Check for dark mode preference
    const isDark = localStorage.getItem('darkMode') === 'true' || 
      window.matchMedia('(prefers-color-scheme: dark)').matches;
    setDarkMode(isDark);
    updateDarkModeClasses(isDark);
  }, []);

  const updateDarkModeClasses = (isDark) => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode);
    updateDarkModeClasses(newDarkMode);
  };

  // Fetch employers from API
  const fetchEmployers = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiService.fetchEmployers();
      
      if (data && data.companies && Array.isArray(data.companies)) {
        const employersData = data.companies
          .filter(company => company.employer)
          .map(company => {
            const employer = company.employer || {};
            return {
              id: employer.id,
              employer_code: employer.employer_code,
              name: employer.name,
              email: employer.email,
              phone: employer.phone,
              slug: employer.slug,
              status: employer.status,
              latitude: employer.latitude,
              longitude: employer.longitude,
              created_at: employer.created_at,
              custom_data: employer.custom_data || {},
              company_code: company.company_code,
              employees: company.employees || []
            };
          });
        setEmployers(employersData);
      } else {
        setEmployers([]);
      }
    } catch (err) {
      console.error("Error fetching employers:", err);
      setError('Failed to fetch employers. Please try again.');
      setEmployers([]);
    } finally {
      setLoading(false);
    }
  };

  // Handle Create Employer with automatic permission creation
  const handleCreateEmployer = async () => {
    try {
      setError(null);
      
      if (newEmployer.password !== newEmployer.confirmPassword) {
        throw new Error('Passwords do not match');
      }

      if (!newEmployer.employer_code || !newEmployer.name || !newEmployer.password) {
        throw new Error('Required fields (Employer Code, Name, Password) are missing');
      }  

      const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
      const companyId = currentUser.companyId || '';
    
      if (!companyId) {
        throw new Error('Unable to determine company. Please log in again.');
      }

      const payload = {
        employer_code: newEmployer.employer_code,
        password: newEmployer.password,
        name: newEmployer.name,
        slug: newEmployer.slug,
        status: newEmployer.status,
        email: newEmployer.email,
        phone: newEmployer.phone,
        latitude: parseFloat(newEmployer.latitude) || 0.0,
        longitude: parseFloat(newEmployer.longitude) || 0.0,
        custom_data: newEmployer.custom_data,
        belong_to_company_code: companyId
      };

      // Step 1: Create the employer
      console.log('Creating employer with data:', payload);
      const response = await apiService.createEmployer(payload);
      const newEmployerData = response.data || response;
      
      console.log('Employer created successfully:', newEmployerData);
      
      // Step 2: Automatically create permissions for this employer
      if (newEmployerData.id) {
        console.log('Creating permissions for employer ID:', newEmployerData.id);
        console.log('Permissions to set:', formData.permissions);
        
        const permissionsResult = await apiService.createEmployerPermissions(
          newEmployerData.company_code, 
          formData.permissions
        );
        
        if (permissionsResult.success === false) {
          console.warn('Permissions creation failed, but employer was created:', permissionsResult.error);
          // Don't throw error, just log warning
        } else {
          console.log('Permissions created successfully:', permissionsResult);
        }
      } else {
        console.warn('No employer ID returned, skipping permission creation');
      }
      
      // Add employer to state
      setEmployers(prev => [...prev, {
        id: newEmployerData.id,
        employer_code: newEmployerData.employer_code,
        name: newEmployerData.name,
        email: newEmployerData.email,
        phone: newEmployerData.phone,
        status: newEmployerData.status,
        created_at: newEmployerData.created_at,
        custom_data: newEmployerData.custom_data || {},
        company_code: companyId,
        employees: []
      }]);
      
      setSuccess('Employer created successfully with permissions!');
      setOpenCreateModal(false);
      resetNewEmployerForm();
      
      // Reset permissions to default
      setFormData({
        permissions: generateDefaultPermissions('employee'),
      });
      
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      console.error('Error in handleCreateEmployer:', err);
      setError(err.message || 'Failed to create employer');
    }
  };

  // Handle Update Employer
  const handleUpdateEmployer = async () => {
    if (!selectedEmployer) return;

    try {
      setError(null);
      
      const payload = {
        employer_code: selectedEmployer.employer_code,
        name: selectedEmployer.name,
        slug: selectedEmployer.slug,
        status: selectedEmployer.status,
        email: selectedEmployer.email,
        phone: selectedEmployer.phone,
        latitude: parseFloat(selectedEmployer.latitude) || 0.0,
        longitude: parseFloat(selectedEmployer.longitude) || 0.0,
        custom_data: selectedEmployer.custom_data
      };

      if (newEmployer.password) {
        if (newEmployer.password !== newEmployer.confirmPassword) {
          throw new Error('Passwords do not match');
        }
        payload.password = newEmployer.password;
      }

      const response = await apiService.updateEmployer(selectedEmployer.id, payload);
      const updatedEmployerData = response.data || response;
      
      const updatedEmployers = employers.map(emp => 
        emp.id === selectedEmployer.id ? { 
          ...emp, 
          ...updatedEmployerData,
          custom_data: updatedEmployerData.custom_data || emp.custom_data
        } : emp
      );
      
      setEmployers(updatedEmployers);
      setSuccess('Employer updated successfully!');
      setOpenEditModal(false);
      
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError(err.message || 'Failed to update employer');
    }
  };

  // Handle Delete Employer
  const handleDeleteEmployer = async () => {
    if (!selectedEmployer) return;

    try {
      setError(null);
      await apiService.deleteEmployer(selectedEmployer.id);
      setEmployers(employers.filter(emp => emp.id !== selectedEmployer.id));
      setSuccess('Employer deleted successfully!');
      setOpenDeleteModal(false);
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError(err.message || 'Failed to delete employer');
    }
  };

  const resetNewEmployerForm = () => {
    setNewEmployer({
      employer_code: '',
      password: '',
      confirmPassword: '',
      name: '',
      slug: '',
      status: 'pending',
      email: '',
      phone: '',
      latitude: 0.0,
      longitude: 0.0,
      custom_data: {
        industry: '',
        employees: 0,
        location: '',
        website: '',
        description: '',
        founded_year: '',
        revenue: '',
        address: '',
        city: '',
        state: '',
        country: 'India',
        postal_code: '',
        bank_name: '',
        account_number: '',
        ifsc_code: '',
        contact_person: '',
        contact_position: ''
      },
    });
  };

  // Handle modal opens
  const handleOpenView = (employer) => {
    setSelectedEmployer(employer);
    setOpenViewModal(true);
  };

  const handleOpenEdit = async (employer) => {
    setSelectedEmployer({ ...employer });
    setNewEmployer({
      password: '',
      confirmPassword: ''
    });
    
    // Load existing permissions for this employer
    try {
      const permissionsData = await apiService.getEmployerPermissions(employer.id);
      if (permissionsData.permissions) {
        setFormData(prev => ({
          ...prev,
          permissions: permissionsData.permissions
        }));
      }
    } catch (error) {
      console.warn('Failed to load permissions, using defaults:', error);
      // Keep current permissions if loading fails
    }
    
    setOpenEditModal(true);
  };

  const handleOpenDelete = (employer) => {
    setSelectedEmployer(employer);
    setOpenDeleteModal(true);
  };

  // Filtered employers
  const filteredEmployers = employers.filter(employer => {
    const matchesSearch = 
      (employer.employer_code && employer.employer_code.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (employer.name && employer.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (employer.email && employer.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (employer.phone && employer.phone.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesStatus = statusFilter === 'all' || employer.status === statusFilter;
    const matchesIndustry = industryFilter === 'all' || 
      (employer.custom_data?.industry && employer.custom_data.industry.toLowerCase().includes(industryFilter.toLowerCase()));
    
    return matchesSearch && matchesStatus && matchesIndustry;
  }).sort((a, b) => {
    if (sortBy === 'name') {
      return sortOrder === 'asc' 
        ? (a.name || '').localeCompare(b.name || '')
        : (b.name || '').localeCompare(a.name || '');
    } else if (sortBy === 'status') {
      return sortOrder === 'asc'
        ? (a.status || '').localeCompare(b.status || '')
        : (b.status || '').localeCompare(a.status || '');
    } else if (sortBy === 'employees') {
      const empA = a.custom_data?.employees || 0;
      const empB = b.custom_data?.employees || 0;
      return sortOrder === 'asc' ? empA - empB : empB - empA;
    } else {
      const dateA = a.created_at ? new Date(a.created_at).getTime() : 0;
      const dateB = b.created_at ? new Date(b.created_at).getTime() : 0;
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    }
  });

  // Pagination
  const totalPages = Math.ceil(filteredEmployers.length / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const paginatedEmployers = filteredEmployers.slice(startIndex, startIndex + itemsPerPage);

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case 'active': 
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300 border border-green-200 dark:border-green-800';
      case 'pending': 
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300 border border-yellow-200 dark:border-yellow-800';
      case 'inactive': 
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300 border border-red-200 dark:border-red-800';
      case 'verified': 
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300 border border-blue-200 dark:border-blue-800';
      default: 
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800/50 dark:text-gray-300 border border-gray-200 dark:border-gray-700';
    }
  };

  // Get status icon
  const getStatusIcon = (status) => {
    switch (status) {
      case 'active': return <CheckCircle className="h-4 w-4" />;
      case 'pending': return <AlertCircle className="h-4 w-4" />;
      case 'inactive': return <XCircle className="h-4 w-4" />;
      case 'verified': return <Shield className="h-4 w-4" />;
      default: return <HelpCircle className="h-4 w-4" />;
    }
  };

  // Stats calculation
  const totalEmployers = employers.length;
  const activeEmployers = employers.filter(e => e.status === 'active').length;
  const pendingEmployers = employers.filter(e => e.status === 'pending').length;
  const verifiedEmployers = employers.filter(e => e.status === 'verified').length;

  // Get unique industries for filter
  const industries = [...new Set(employers
    .filter(e => e.custom_data?.industry)
    .map(e => e.custom_data.industry)
  )];

  // Handle row selection
  const toggleRowSelection = (id) => {
    setSelectedRows(prev => 
      prev.includes(id) 
        ? prev.filter(rowId => rowId !== id)
        : [...prev, id]
    );
  };

  const selectAllRows = () => {
    if (selectedRows.length === paginatedEmployers.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(paginatedEmployers.map(emp => emp.id));
    }
  };

  // Bulk actions
  const handleBulkDelete = async () => {
    if (selectedRows.length === 0 || !confirm(`Are you sure you want to delete ${selectedRows.length} employers?`)) return;

    try {
      setError(null);
      setLoading(true);
      
      for (const id of selectedRows) {
        await apiService.deleteEmployer(id);
      }
      
      setEmployers(prev => prev.filter(emp => !selectedRows.includes(emp.id)));
      setSelectedRows([]);
      setSuccess(`${selectedRows.length} employers deleted successfully!`);
      
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError('Failed to delete selected employers');
    } finally {
      setLoading(false);
    }
  };

  const handleBulkStatusChange = async (newStatus) => {
    if (selectedRows.length === 0) return;

    try {
      setError(null);
      setLoading(true);
      
      for (const id of selectedRows) {
        const employer = employers.find(e => e.id === id);
        if (employer) {
          await apiService.updateEmployer(id, { status: newStatus });
        }
      }
      
      fetchEmployers();
      setSelectedRows([]);
      setSuccess(`${selectedRows.length} employers updated to ${newStatus} status!`);
      
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError('Failed to update selected employers');
    } finally {
      setLoading(false);
    }
  };

  // View dashboard
  const handleViewDashboard = (employerCode) => {
    if (employerCode) {
      window.open(`${API_BASE_URL_SERVER}/dashboard?employer=${employerCode}`, '_blank');
    }
  };

  // Update new employer form
  const updateNewEmployer = (field, value) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setNewEmployer(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setNewEmployer(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  // Update selected employer form
  const updateSelectedEmployer = (field, value) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setSelectedEmployer(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setSelectedEmployer(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  // Get theme gradient
  const getThemeGradient = () => {
    return `bg-gradient-to-r from-${themeClasses.accentBase}-500 to-${themeClasses.accentBase}-600`;
  };

  // Get hover gradient
  const getHoverGradient = () => {
    return `hover:from-${themeClasses.accentBase}-600 hover:to-${themeClasses.accentBase}-700`;
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-all duration-300 ${darkMode ? 'dark' : ''}`}>
      {/* Header */}
      <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg shadow-lg border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-2xl ${getThemeGradient()} shadow-lg`}>
                <Building className="h-7 w-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white bg-clip-text bg-gradient-to-r from-gray-800 to-gray-600 dark:from-white dark:to-gray-300">
                  Employers Management
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  Manage and monitor all employer accounts
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <button
                onClick={toggleDarkMode}
                className="p-3 rounded-xl bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 transition-all shadow-sm hover:shadow-md"
                title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
              >
                {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
              
              <button
                onClick={fetchEmployers}
                className="inline-flex items-center px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-xl hover:bg-gray-50 dark:hover:bg-gray-600 transition-all shadow-sm hover:shadow-md"
              >
                <RefreshCw className="h-5 w-5 mr-2" />
                Refresh
              </button>
              
              <button
                onClick={() => setOpenCreateModal(true)}
                className={`inline-flex items-center px-6 py-3 ${getThemeGradient()} ${getHoverGradient()} text-white font-semibold rounded-xl transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5`}
              >
                <UserPlus className="h-5 w-5 mr-2" />
                Add Employer
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Success/Error Messages */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-6 p-4 bg-gradient-to-r from-red-50 to-red-100 dark:from-red-900/10 dark:to-red-900/5 border-l-4 border-red-500 rounded-r-xl shadow-lg"
            >
              <div className="flex items-center">
                <XCircle className="h-5 w-5 text-red-500 mr-3 flex-shrink-0" />
                <span className="text-red-800 dark:text-red-300 flex-1">{error}</span>
                <button
                  onClick={() => setError(null)}
                  className="ml-4 text-red-500 hover:text-red-700 dark:hover:text-red-400 transition-colors p-1 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </motion.div>
          )}
          
          {success && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-6 p-4 bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/10 dark:to-green-900/5 border-l-4 border-green-500 rounded-r-xl shadow-lg"
            >
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                <span className="text-green-800 dark:text-green-300 flex-1">{success}</span>
                <button
                  onClick={() => setSuccess(null)}
                  className="ml-4 text-green-500 hover:text-green-700 dark:hover:text-green-400 transition-colors p-1 hover:bg-green-100 dark:hover:bg-green-900/30 rounded-lg"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-gray-700 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-1">Total Employers</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">{totalEmployers}</p>
                <div className="flex items-center gap-2 mt-2">
                  <div className={`h-2 flex-1 rounded-full bg-gradient-to-r from-${themeClasses.accentBase}-500 to-${themeClasses.accentBase}-600`}></div>
                  <TrendingUp className="h-4 w-4 text-green-500" />
                </div>
              </div>
              <div className={`p-3 rounded-xl bg-gradient-to-br from-${themeClasses.accentBase}-500 to-${themeClasses.accentBase}-600 shadow-lg`}>
                <Building className="h-6 w-6 text-white" />
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-gray-700 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-1">Active</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">{activeEmployers}</p>
                <div className="flex items-center gap-2 mt-2">
                  <div className="h-2 flex-1 rounded-full bg-gradient-to-r from-green-500 to-green-600"></div>
                  <UserCheck className="h-4 w-4 text-green-500" />
                </div>
              </div>
              <div className="p-3 rounded-xl bg-gradient-to-br from-green-500 to-green-600 shadow-lg">
                <UserCheck className="h-6 w-6 text-white" />
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-gray-700 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-1">Pending</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">{pendingEmployers}</p>
                <div className="flex items-center gap-2 mt-2">
                  <div className="h-2 flex-1 rounded-full bg-gradient-to-r from-yellow-500 to-yellow-600"></div>
                  <Clock className="h-4 w-4 text-yellow-500" />
                </div>
              </div>
              <div className="p-3 rounded-xl bg-gradient-to-br from-yellow-500 to-yellow-600 shadow-lg">
                <AlertCircle className="h-6 w-6 text-white" />
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-gray-700 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-1">Verified</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">{verifiedEmployers}</p>
                <div className="flex items-center gap-2 mt-2">
                  <div className="h-2 flex-1 rounded-full bg-gradient-to-r from-blue-500 to-blue-600"></div>
                  <Award className="h-4 w-4 text-blue-500" />
                </div>
              </div>
              <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg">
                <Shield className="h-6 w-6 text-white" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 mb-6 border border-gray-100 dark:border-gray-700">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
            <div className="relative flex-1 group">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-gray-600 dark:group-focus-within:text-gray-300 transition-colors" />
              <input
                type="text"
                placeholder="Search employers by code, name, email, or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 pr-4 py-3 w-full border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm"
              />
            </div>
            
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative group">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="pending">Pending</option>
                  <option value="inactive">Inactive</option>
                  <option value="verified">Verified</option>
                </select>
              </div>

              <select
                value={industryFilter}
                onChange={(e) => setIndustryFilter(e.target.value)}
                className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
              >
                <option value="all">All Industries</option>
                {industries.map(industry => (
                  <option key={industry} value={industry}>{industry}</option>
                ))}
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
              >
                <option value="created_at">Sort by Date</option>
                <option value="name">Sort by Name</option>
                <option value="status">Sort by Status</option>
                <option value="employees">Sort by Employees</option>
              </select>

              <button
                onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')}
                className="p-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-600 transition-all shadow-sm hover:shadow-md"
                title={sortOrder === 'asc' ? 'Sort descending' : 'Sort ascending'}
              >
                {sortOrder === 'asc' ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {/* Bulk Actions */}
          {selectedRows.length > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="flex flex-wrap items-center gap-3 p-4 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/10 dark:to-blue-900/5 rounded-xl mb-4 border border-blue-200 dark:border-blue-800"
            >
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {selectedRows.length} employer(s) selected
              </span>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => handleBulkStatusChange('active')}
                  className="px-3 py-2 bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300 text-sm font-medium rounded-lg hover:bg-green-200 dark:hover:bg-green-900/40 transition-colors border border-green-200 dark:border-green-800"
                >
                  Mark Active
                </button>
                <button
                  onClick={() => handleBulkStatusChange('pending')}
                  className="px-3 py-2 bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-300 text-sm font-medium rounded-lg hover:bg-yellow-200 dark:hover:bg-yellow-900/40 transition-colors border border-yellow-200 dark:border-yellow-800"
                >
                  Mark Pending
                </button>
                <button
                  onClick={() => handleBulkStatusChange('inactive')}
                  className="px-3 py-2 bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-300 text-sm font-medium rounded-lg hover:bg-red-200 dark:hover:bg-red-900/40 transition-colors border border-red-200 dark:border-red-800"
                >
                  Mark Inactive
                </button>
                <button
                  onClick={handleBulkDelete}
                  className="px-3 py-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white text-sm font-medium rounded-lg transition-all shadow-md hover:shadow-lg"
                >
                  Delete Selected
                </button>
              </div>
              <button
                onClick={() => setSelectedRows([])}
                className="ml-auto text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
              >
                Clear Selection
              </button>
            </motion.div>
          )}
        </div>

        {/* Employers Table */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700/50">
                <tr>
                  <th className="px-6 py-4 text-left">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedRows.length === paginatedEmployers.length && paginatedEmployers.length > 0}
                        onChange={selectAllRows}
                        className="h-4 w-4 rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500 focus:ring-offset-0"
                      />
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    Company
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    Industry
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    Created
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {loading ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>
                        <p className="text-gray-500 dark:text-gray-400">Loading employers...</p>
                      </div>
                    </td>
                  </tr>
                ) : paginatedEmployers.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <div className="p-4 rounded-2xl bg-gray-100 dark:bg-gray-700 mb-4">
                          <Building className="h-16 w-16 text-gray-400 dark:text-gray-500" />
                        </div>
                        <p className="text-gray-500 dark:text-gray-400 text-lg font-medium mb-2">No employers found</p>
                        <p className="text-gray-400 dark:text-gray-500 text-sm mb-4">
                          {searchTerm || statusFilter !== 'all' || industryFilter !== 'all'
                            ? 'Try changing your search or filter criteria'
                            : 'Get started by creating your first employer'}
                        </p>
                        {!searchTerm && statusFilter === 'all' && industryFilter === 'all' && (
                          <button
                            onClick={() => setOpenCreateModal(true)}
                            className={`inline-flex items-center px-4 py-2 ${getThemeGradient()} ${getHoverGradient()} text-white font-medium rounded-lg transition-all shadow-md hover:shadow-lg`}
                          >
                            <UserPlus className="h-5 w-5 mr-2" />
                            Add New Employer
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ) : (
                  paginatedEmployers.map((employer) => (
                    <tr 
                      key={employer.id} 
                      className={`hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-150 ${
                        selectedRows.includes(employer.id) ? 'bg-blue-50 dark:bg-blue-900/10' : ''
                      }`}
                    >
                      <td className="px-6 py-4">
                        <input
                          type="checkbox"
                          checked={selectedRows.includes(employer.id)}
                          onChange={() => toggleRowSelection(employer.id)}
                          className="h-4 w-4 rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500 focus:ring-offset-0"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className={`h-10 w-10 flex items-center justify-center rounded-xl bg-gradient-to-br from-${themeClasses.accentBase}-500 to-${themeClasses.accentBase}-600 shadow-md`}>
                            <Building className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                              {employer.name || 'N/A'}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              {employer.employer_code || 'N/A'}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-sm text-gray-900 dark:text-white">
                            <Mail className="h-4 w-4 text-gray-400" />
                            {employer.email || 'N/A'}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                            <Phone className="h-4 w-4 text-gray-400" />
                            {employer.phone || 'N/A'}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span className={`px-3 py-1 inline-flex text-xs font-semibold rounded-full ${getStatusColor(employer.status)}`}>
                            <span className="flex items-center gap-1">
                              {getStatusIcon(employer.status)}
                              {(employer.status || 'pending').charAt(0).toUpperCase() + (employer.status || 'pending').slice(1)}
                            </span>
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900 dark:text-white">
                          {employer.custom_data?.industry || 'N/A'}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {employer.custom_data?.employees ? `${employer.custom_data.employees} employees` : ''}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                        {formatDate(employer.created_at)}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handleOpenView(employer)}
                            className="p-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-all"
                            title="View Details"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleViewDashboard(employer.employer_code)}
                            className="p-2 text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300 hover:bg-green-50 dark:hover:bg-green-900/30 rounded-lg transition-all"
                            title="View Dashboard"
                          >
                            <BarChart className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleOpenEdit(employer)}
                            className={`p-2 text-${themeClasses.accentBase}-600 hover:text-${themeClasses.accentBase}-800 dark:text-${themeClasses.accentBase}-400 dark:hover:text-${themeClasses.accentBase}-300 hover:bg-${themeClasses.accentBase}-50 dark:hover:bg-${themeClasses.accentBase}-900/30 rounded-lg transition-all`}
                            title="Edit"
                          >
                            <Edit2 className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleOpenDelete(employer)}
                            className="p-2 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-all"
                            title="Delete"
                          >
                            <Trash2 className="h-4 w-4" />
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
          {totalPages > 1 && (
            <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="text-sm text-gray-700 dark:text-gray-300">
                  Showing <span className="font-medium">{startIndex + 1}</span> to{' '}
                  <span className="font-medium">{Math.min(startIndex + itemsPerPage, filteredEmployers.length)}</span> of{' '}
                  <span className="font-medium">{filteredEmployers.length}</span> results
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setPage(prev => Math.max(1, prev - 1))}
                    disabled={page === 1}
                    className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 transition-all shadow-sm"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (page <= 3) {
                      pageNum = i + 1;
                    } else if (page >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = page - 2 + i;
                    }
                    
                    return (
                      <button
                        key={pageNum}
                        onClick={() => setPage(pageNum)}
                        className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${
                          page === pageNum
                            ? `${getThemeGradient()} text-white shadow-md`
                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 shadow-sm'
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                  <button
                    onClick={() => setPage(prev => Math.min(totalPages, prev + 1))}
                    disabled={page === totalPages}
                    className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 transition-all shadow-sm"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Modals */}
      {/* Create Employer Modal with Permissions */}
   {openCreateModal && (
  <AnimatePresence>
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-0 sm:p-4 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="bg-white dark:bg-gray-800 w-full max-w-6xl max-h-screen sm:max-h-[90vh] sm:rounded-2xl shadow-2xl sm:border sm:border-gray-200 dark:sm:border-gray-700 flex flex-col h-screen sm:h-auto"
        >
          <div className="px-6 pt-5 pb-4 sm:px-8 sm:pt-6 sm:pb-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  <UserPlus className="inline-block h-7 w-7 mr-2" />
                  Create New Employer
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  Manage employer details and permissions
                </p>
              </div>
              <button
                onClick={() => setOpenCreateModal(false)}
                className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 transition-colors p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            {/* Employer Form Section - Two Columns */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {/* Left Column: Employer Input Fields */}
              <div className="space-y-6 max-h-[50vh] overflow-y-auto pr-4">
                <div className="space-y-6">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                    <UserCog className="h-5 w-5" />
                    Basic Information
                  </h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Employer Code *
                      </label>
                      <input
                        type="text"
                        value={newEmployer.employer_code}
                        onChange={(e) => updateNewEmployer('employer_code', e.target.value)}
                        className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        placeholder="EMP001"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Company Name *
                      </label>
                      <input
                        type="text"
                        value={newEmployer.name}
                        onChange={(e) => updateNewEmployer('name', e.target.value)}
                        className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        placeholder="Tech Solutions Inc."
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Status
                      </label>
                      <select
                        value={newEmployer.status}
                        onChange={(e) => updateNewEmployer('status', e.target.value)}
                        className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      >
                        <option value="pending">Pending</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                        <option value="verified">Verified</option>
                      </select>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Slug
                      </label>
                      <input
                        type="text"
                        value={newEmployer.slug}
                        onChange={(e) => updateNewEmployer('slug', e.target.value)}
                        className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        placeholder="tech-solutions"
                      />
                    </div>
                  </div>
                </div>

                {/* Security Section */}
                <div className="space-y-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                    <Lock className="h-5 w-5" />
                    Security
                  </h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Password *
                      </label>
                      <input
                        type="password"
                        value={newEmployer.password}
                        onChange={(e) => updateNewEmployer('password', e.target.value)}
                        className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        placeholder="••••••••"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Confirm Password *
                      </label>
                      <input
                        type="password"
                        value={newEmployer.confirmPassword}
                        onChange={(e) => updateNewEmployer('confirmPassword', e.target.value)}
                        className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        placeholder="••••••••"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="space-y-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                    <Mail className="h-5 w-5" />
                    Contact Information
                  </h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Email
                      </label>
                      <input
                        type="email"
                        value={newEmployer.email}
                        onChange={(e) => updateNewEmployer('email', e.target.value)}
                        className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        placeholder="company@example.com"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Phone
                      </label>
                      <input
                        type="tel"
                        value={newEmployer.phone}
                        onChange={(e) => updateNewEmployer('phone', e.target.value)}
                        className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        placeholder="+1234567890"
                      />
                    </div>
                  </div>
                </div>

                {/* Company Details */}
                <div className="space-y-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                    <Briefcase className="h-5 w-5" />
                    Company Details
                  </h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Industry
                      </label>
                      <input
                        type="text"
                        value={newEmployer.custom_data.industry}
                        onChange={(e) => updateNewEmployer('custom_data.industry', e.target.value)}
                        className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        placeholder="Technology"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Employees
                      </label>
                      <input
                        type="number"
                        value={newEmployer.custom_data.employees}
                        onChange={(e) => updateNewEmployer('custom_data.employees', parseInt(e.target.value) || 0)}
                        className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        placeholder="50"
                        min="0"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Location
                      </label>
                      <input
                        type="text"
                        value={newEmployer.custom_data.location}
                        onChange={(e) => updateNewEmployer('custom_data.location', e.target.value)}
                        className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        placeholder="City, Country"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Founded Year
                      </label>
                      <input
                        type="number"
                        value={newEmployer.custom_data.founded_year}
                        onChange={(e) => updateNewEmployer('custom_data.founded_year', e.target.value)}
                        className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        placeholder="2020"
                        min="1900"
                        max="2024"
                      />
                    </div>
                    
                    <div className="md:col-span-2 space-y-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Address
                      </label>
                      <input
                        type="text"
                        value={newEmployer.custom_data.address}
                        onChange={(e) => updateNewEmployer('custom_data.address', e.target.value)}
                        className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        placeholder="Street Address"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        City
                      </label>
                      <input
                        type="text"
                        value={newEmployer.custom_data.city}
                        onChange={(e) => updateNewEmployer('custom_data.city', e.target.value)}
                        className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        placeholder="City"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Country
                      </label>
                      <input
                        type="text"
                        value={newEmployer.custom_data.country}
                        onChange={(e) => updateNewEmployer('custom_data.country', e.target.value)}
                        className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        placeholder="Country"
                      />
                    </div>
                  </div>
                </div>

                {/* Coordinates */}
                <div className="space-y-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                    <Globe className="h-5 w-5" />
                    Coordinates
                  </h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Latitude
                      </label>
                      <input
                        type="number"
                        step="0.000001"
                        value={newEmployer.latitude}
                        onChange={(e) => updateNewEmployer('latitude', parseFloat(e.target.value) || 0.0)}
                        className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        placeholder="0.0"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Longitude
                      </label>
                      <input
                        type="number"
                        step="0.000001"
                        value={newEmployer.longitude}
                        onChange={(e) => updateNewEmployer('longitude', parseFloat(e.target.value) || 0.0)}
                        className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        placeholder="0.0"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Employer Preview/Details Display */}
              <div className="lg:border-l lg:border-gray-200 dark:lg:border-gray-700 lg:pl-8">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                  <Eye className="h-5 w-5" />
                  Employer Preview
                </h4>
                
                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6 border border-gray-200 dark:border-gray-700 space-y-6">
                  {/* Company Header */}
                  <div className="flex items-center gap-4">
                    <div className="h-16 w-16 flex items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600">
                      <Building className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <h5 className="text-xl font-bold text-gray-900 dark:text-white">
                        {newEmployer.name || "Company Name"}
                      </h5>
                      <p className="text-gray-600 dark:text-gray-400">
                        {newEmployer.employer_code || "EMP001"}
                      </p>
                    </div>
                  </div>

                  {/* Status Badge */}
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Status</p>
                    <span className={`px-3 py-1.5 inline-flex text-sm font-semibold rounded-full ${getStatusColor(newEmployer.status)}`}>
                      {newEmployer.status.charAt(0).toUpperCase() + newEmployer.status.slice(1)}
                    </span>
                  </div>

                  {/* Contact Info */}
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Contact Information</p>
                      <div className="space-y-2">
                        {newEmployer.email && (
                          <div className="flex items-center gap-2">
                            <Mail className="h-4 w-4 text-gray-400" />
                            <span className="text-gray-900 dark:text-white">{newEmployer.email}</span>
                          </div>
                        )}
                        {newEmployer.phone && (
                          <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4 text-gray-400" />
                            <span className="text-gray-900 dark:text-white">{newEmployer.phone}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Company Details */}
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Company Details</p>
                      <div className="grid grid-cols-2 gap-4">
                        {newEmployer.custom_data.industry && (
                          <div>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Industry</p>
                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                              {newEmployer.custom_data.industry}
                            </p>
                          </div>
                        )}
                        {newEmployer.custom_data.employees > 0 && (
                          <div>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Employees</p>
                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                              {newEmployer.custom_data.employees}
                            </p>
                          </div>
                        )}
                        {newEmployer.custom_data.location && (
                          <div className="col-span-2">
                            <p className="text-xs text-gray-500 dark:text-gray-400">Location</p>
                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                              {newEmployer.custom_data.location}
                            </p>
                          </div>
                        )}
                        {newEmployer.custom_data.address && (
                          <div className="col-span-2">
                            <p className="text-xs text-gray-500 dark:text-gray-400">Address</p>
                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                              {newEmployer.custom_data.address}
                            </p>
                            <div className="flex gap-2 mt-1">
                              {newEmployer.custom_data.city && (
                                <span className="text-xs text-gray-600 dark:text-gray-400">{newEmployer.custom_data.city},</span>
                              )}
                              {newEmployer.custom_data.country && (
                                <span className="text-xs text-gray-600 dark:text-gray-400">{newEmployer.custom_data.country}</span>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Coordinates */}
                    {(newEmployer.latitude !== 0.0 || newEmployer.longitude !== 0.0) && (
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Coordinates</p>
                        <div className="flex gap-4">
                          <div>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Latitude</p>
                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                              {newEmployer.latitude}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Longitude</p>
                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                              {newEmployer.longitude}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Permissions Section - Full Width Below */}
            <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h4 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <ShieldCheck className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                    Module Permissions
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 mt-1">
                    Set access permissions for each module
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setFormData({ permissions: generateDefaultPermissions('employee') })}
                    className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm font-medium rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors border border-gray-300 dark:border-gray-600"
                  >
                    Reset to Employee
                  </button>
                  <button
                    onClick={() => setFormData({ permissions: generateDefaultPermissions('superadmin') })}
                    className="px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white text-sm font-medium rounded-lg hover:from-purple-600 hover:to-indigo-700 transition-all shadow-md"
                  >
                    Set All Permissions
                  </button>
                </div>
              </div>

              {/* Permissions Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {MODULES.map(mod => {
                  const modulePermissions = SUB_PERMISSIONS[mod.name] || [];
                  const enabledCount = modulePermissions.reduce((count, perm) => {
                    const permData = formData.permissions[mod.name]?.[perm.name] || {};
                    return count + (Object.values(permData).filter(Boolean).length);
                  }, 0);
                  const totalCount = modulePermissions.length * 4; // 4 permissions per sub-permission
                  
                  return (
                    <div key={mod.name} className="bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-white dark:bg-gray-700 rounded-lg">
                            <mod.icon className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                          </div>
                          <div>
                            <h5 className="font-semibold text-gray-900 dark:text-white">{mod.name}</h5>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {modulePermissions.length} permissions
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => setOpenModule(openModule === mod.name ? null : mod.name)}
                          className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
                        >
                          {openModule === mod.name ? (
                            <ChevronUp className="h-5 w-5" />
                          ) : (
                            <ChevronDown className="h-5 w-5" />
                          )}
                        </button>
                      </div>
                      
                      {/* Enabled/Disabled Status */}
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {enabledCount === 0 ? 'Disabled' : 'Enabled'}
                        </span>
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {enabledCount}/{totalCount}
                        </span>
                      </div>
                      
                      {/* Progress Bar */}
                      <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full mb-4">
                        <div 
                          className="h-full bg-gradient-to-r from-green-500 to-green-600 rounded-full transition-all duration-300"
                          style={{ width: `${(enabledCount / totalCount) * 100}%` }}
                        />
                      </div>
                      
                      {/* Expandable Permissions */}
                      {openModule === mod.name && (
                        <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
                          <div className="space-y-4">
                            {modulePermissions.map(perm => (
                              <div key={perm.name} className="bg-white dark:bg-gray-700/50 rounded-lg p-4">
                                <h6 className="font-medium text-gray-900 dark:text-white mb-3">{perm.name}</h6>
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                                  {['view', 'create', 'edit', 'delete'].map(type => {
                                    const checked = getPerm(mod.name, perm.name, type);
                                    return (
                                      <label key={type} className="flex items-center gap-2 cursor-pointer">
                                        <input
                                          type="checkbox"
                                          checked={checked}
                                          onChange={() => togglePermission(mod.name, perm.name, type)}
                                          className="h-4 w-4 rounded border-gray-300 dark:border-gray-600 text-indigo-600 focus:ring-indigo-500 focus:ring-offset-0"
                                        />
                                        <span className="text-sm text-gray-700 dark:text-gray-300 capitalize">{type}</span>
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
                  );
                })}
              </div>
            </div>
          </div>
          
          <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700/50 flex justify-end space-x-3">
            <button
              onClick={() => setOpenCreateModal(false)}
              className="px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleCreateEmployer}
              className={`px-6 py-2.5 ${themeClasses.buttonBg} hover:${themeClasses.buttonHover} text-white font-medium rounded-lg text-sm transition-colors shadow-md hover:shadow-lg flex items-center gap-2`}
            >
              <UserPlus className="h-4 w-4" />
              Create Employer with Permissions
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  </AnimatePresence>
)}
      {/* View Employer Modal */}
      {openViewModal && selectedEmployer && (
        <AnimatePresence>
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0 inset-0 bg-gray-500 dark:bg-gray-900 bg-opacity-75 transition-opacity">
              
              <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full"
              >
                <div className="px-6 pt-5 pb-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                      <Eye className="inline-block h-5 w-5 mr-2" />
                      Employer Details
                    </h3>
                    <button
                      onClick={() => setOpenViewModal(false)}
                      className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 transition-colors p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="h-16 w-16 flex items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600">
                        <Building className="h-8 w-8 text-white" />
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-gray-900 dark:text-white">{selectedEmployer.name || 'N/A'}</h4>
                        <p className="text-gray-600 dark:text-gray-400">{selectedEmployer.employer_code || 'N/A'}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Status</p>
                        <p className={`px-3 py-1 inline-flex text-xs font-semibold rounded-full ${getStatusColor(selectedEmployer.status)}`}>
                          {(selectedEmployer.status || 'pending').charAt(0).toUpperCase() + (selectedEmployer.status || 'pending').slice(1)}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Industry</p>
                        <p className="font-medium text-gray-900 dark:text-white">{selectedEmployer.custom_data?.industry || 'N/A'}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                        <p className="font-medium text-gray-900 dark:text-white">{selectedEmployer.email || 'N/A'}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Phone</p>
                        <p className="font-medium text-gray-900 dark:text-white">{selectedEmployer.phone || 'N/A'}</p>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Address</p>
                      <p className="text-gray-900 dark:text-white">
                        {selectedEmployer.custom_data?.address || 'N/A'}<br />
                        {selectedEmployer.custom_data?.city && `${selectedEmployer.custom_data.city}, `}
                        {selectedEmployer.custom_data?.state} {selectedEmployer.custom_data?.postal_code}<br />
                        {selectedEmployer.custom_data?.country}
                      </p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Description</p>
                      <p className="text-gray-900 dark:text-white">{selectedEmployer.custom_data?.description || 'No description provided'}</p>
                    </div>
                    
                    <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                      <p className="text-sm text-gray-500 dark:text-gray-400">Created</p>
                      <p className="text-gray-900 dark:text-white">{formatDate(selectedEmployer.created_at)}</p>
                    </div>
                  </div>
                </div>
                
                <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700/50 flex justify-end space-x-3">
                  <button
                    onClick={() => setOpenViewModal(false)}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => {
                      setOpenViewModal(false);
                      handleOpenEdit(selectedEmployer);
                    }}
                    className={`px-4 py-2 ${themeClasses.buttonBg} hover:${themeClasses.buttonHover} text-white font-medium rounded-lg text-sm transition-colors`}
                  >
                    Edit Employer
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </AnimatePresence>
      )}

      {/* Edit Employer Modal */}
      {openEditModal && selectedEmployer && (
        <AnimatePresence>
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            
              <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full"
              >
                <div className="px-6 pt-5 pb-4 sm:px-8 sm:pt-6 sm:pb-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      <Edit2 className="inline-block h-6 w-6 mr-2" />
                      Edit Employer
                    </h3>
                    <button
                      onClick={() => setOpenEditModal(false)}
                      className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 transition-colors p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                  
                  <div className="space-y-6 max-h-[70vh] overflow-y-auto pr-2">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Basic Information</h4>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Employer Code
                          </label>
                          <input
                            type="text"
                            value={selectedEmployer.employer_code || ''}
                            onChange={(e) => updateSelectedEmployer('employer_code', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            disabled
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Company Name *
                          </label>
                          <input
                            type="text"
                            value={selectedEmployer.name || ''}
                            onChange={(e) => updateSelectedEmployer('name', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            required
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Status
                          </label>
                          <select
                            value={selectedEmployer.status || 'pending'}
                            onChange={(e) => updateSelectedEmployer('status', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                          >
                            <option value="pending">Pending</option>
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                            <option value="verified">Verified</option>
                          </select>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Email
                          </label>
                          <input
                            type="email"
                            value={selectedEmployer.email || ''}
                            onChange={(e) => updateSelectedEmployer('email', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Phone
                          </label>
                          <input
                            type="tel"
                            value={selectedEmployer.phone || ''}
                            onChange={(e) => updateSelectedEmployer('phone', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                          />
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Change Password</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Leave blank to keep current password</p>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            New Password
                          </label>
                          <input
                            type="password"
                            value={newEmployer.password}
                            onChange={(e) => setNewEmployer(prev => ({ ...prev, password: e.target.value }))}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Confirm New Password
                          </label>
                          <input
                            type="password"
                            value={newEmployer.confirmPassword}
                            onChange={(e) => setNewEmployer(prev => ({ ...prev, confirmPassword: e.target.value }))}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Company Details */}
                    <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2 mb-4">
                        <Briefcase className="h-5 w-5" />
                        Company Details
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Industry
                          </label>
                          <input
                            type="text"
                            value={selectedEmployer.custom_data?.industry || ''}
                            onChange={(e) => updateSelectedEmployer('custom_data.industry', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Number of Employees
                          </label>
                          <input
                            type="number"
                            value={selectedEmployer.custom_data?.employees || 0}
                            onChange={(e) => updateSelectedEmployer('custom_data.employees', parseInt(e.target.value) || 0)}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                          />
                        </div>
                        
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Description
                          </label>
                          <textarea
                            value={selectedEmployer.custom_data?.description || ''}
                            onChange={(e) => updateSelectedEmployer('custom_data.description', e.target.value)}
                            rows="3"
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700/50 flex justify-end space-x-3">
                  <button
                    onClick={() => setOpenEditModal(false)}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleUpdateEmployer}
                    className={`px-4 py-2 ${themeClasses.buttonBg} hover:${themeClasses.buttonHover} text-white font-medium rounded-lg text-sm transition-colors shadow-md hover:shadow-lg`}
                  >
                    Update Employer
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </AnimatePresence>
      )}

      {/* Delete Confirmation Modal */}
      {openDeleteModal && selectedEmployer && (
        <AnimatePresence>
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0 inset-0 bg-gray-500 dark:bg-gray-900 bg-opacity-75 transition-opacity">
             
              <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-md sm:w-full"
              >
                <div className="px-6 pt-5 pb-4 text-center">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-red-900 mb-4">
                    <AlertTriangle className="h-6 w-6 text-red-600 dark:text-red-400" />
                  </div>
                  
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                    Confirm Delete
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                    Are you sure you want to delete employer
                  </p>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
                    {selectedEmployer.name} ({selectedEmployer.employer_code})
                  </p>
                  <p className="text-xs text-gray-400 dark:text-gray-500">
                    This action cannot be undone.
                  </p>
                </div>
                
                <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700/50 flex justify-center space-x-3">
                  <button
                    onClick={() => setOpenDeleteModal(false)}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDeleteEmployer}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg text-sm transition-colors shadow-md hover:shadow-lg"
                  >
                    Delete Employer
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </AnimatePresence>
      )}
    </div>
  );
}

export default AdminPage;