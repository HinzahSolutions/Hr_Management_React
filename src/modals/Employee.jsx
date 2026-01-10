



// 'use client';

// import React, { useEffect, useCallback, useRef, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import {
//   Search, Filter, Plus, MoreVertical, Mail, Phone, Badge,
//   CheckSquare, Square, Star, Trash2, Eye, Download, 
//   ChevronDown, ChevronUp, AlertCircle, RefreshCw, UserPlus,
//   Users, Briefcase, Building, Calendar, MapPin, Shield
// } from 'lucide-react';
// import { useTheme } from '../ThemeContext';
// import AddModal from './AddModal';
// import { motion, AnimatePresence } from 'framer-motion';
// import { useDispatch, useSelector } from 'react-redux';
// import {
//   setSearch,
//   setFilters,
//   clearFilters,
//   toggleSelect,
//   toggleSelectAll,
//   deleteEmployees,
//   fetchEmployees,
//   addEmployee,
//   filterEmployees,
//   searchEmployees,
//   clearSelected
// } from '../store/slices/employeeSlice';
// import { employeeApi } from '../superadminapis/employeeapis/employeeApiFunctions';

// export default function Employee() {
//   const { theme, getThemeClasses } = useTheme();
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   // Get theme classes
//   const themeClasses = getThemeClasses();
  
//   // Get state from Redux store
//   const {
//     employees,
//     filteredEmployees,
//     selected,
//     filters,
//     search,
//     loading,
//     error
//   } = useSelector((state) => state.employees);

//   // State for responsive design
//   const [showFilters, setShowFilters] = useState(false);
//   const [activeModal, setActiveModal] = useState(null);
//   const [isExporting, setIsExporting] = useState(false);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [expandedRows, setExpandedRows] = useState(new Set());
//   const [isMobile, setIsMobile] = useState(false);
//   const [isTablet, setIsTablet] = useState(false);
//   const [apiError, setApiError] = useState(null);
//   const [retryCount, setRetryCount] = useState(0);
  
//   // Use ref for debounce timeout
//   const searchTimeoutRef = useRef(null);

//   // Handle responsive breakpoints
//   useEffect(() => {
//     const checkScreenSize = () => {
//       const width = window.innerWidth;
//       setIsMobile(width < 768);
//       setIsTablet(width >= 768 && width < 1024);
//     };

//     checkScreenSize();
//     window.addEventListener('resize', checkScreenSize);
//     return () => window.removeEventListener('resize', checkScreenSize);
//   }, []);

//   // Fetch employees on mount with retry logic
//   useEffect(() => {
//     const loadEmployees = async () => {
//       try {
//         const result = await dispatch(fetchEmployees());
//         if (fetchEmployees.rejected.match(result)) {
//           setApiError(result.payload || result.error.message);
//         } else {
//           setApiError(null);
//         }
//       } catch (error) {
//         setApiError(error.message);
//       }
//     };

//     loadEmployees();
//   }, [dispatch, retryCount]);

//   // Apply filters locally when search or filters change
//   const filteredEmployeesToDisplay = React.useMemo(() => {
//     if (!filteredEmployees || filteredEmployees.length === 0) {
//       return [];
//     }

//     let filtered = [...filteredEmployees];

//     // Apply local search (if not using server-side search)
//     if (search) {
//       const term = search.toLowerCase();
//       filtered = filtered.filter(emp =>
//         emp.name?.toLowerCase().includes(term) ||
//         emp.email?.toLowerCase().includes(term) ||
//         emp.position?.toLowerCase().includes(term) ||
//         emp.badgeId?.toLowerCase().includes(term) ||
//         emp.department?.toLowerCase().includes(term)
//       );
//     }

//     return filtered;
//   }, [filteredEmployees, search]);

//   // Custom debounce function
//   const debounce = (func, delay) => {
//     let timeoutId;
//     return (...args) => {
//       if (timeoutId) {
//         clearTimeout(timeoutId);
//       }
//       timeoutId = setTimeout(() => {
//         func(...args);
//       }, delay);
//     };
//   };

//   // Handle search with custom debounce
//   const handleSearchChange = useCallback(
//     debounce((searchTerm) => {
//       if (searchTerm.length >= 2 || searchTerm.length === 0) {
//         dispatch(searchEmployees({ searchTerm, filters }));
//       }
//     }, 300),
//     [dispatch, filters]
//   );

//   const onSearchChange = (e) => {
//     const value = e.target.value;
//     dispatch(setSearch(value));
//     handleSearchChange(value);
//   };

//   // Handle filter changes with API call
//   const handleFilterChange = (filterName, value) => {
//     const newFilters = { ...filters, [filterName]: value };
//     dispatch(setFilters(newFilters));
    
//     // If any filter is active, make API call
//     const hasActiveFilters = Object.values(newFilters).some(val => val !== '');
//     if (hasActiveFilters) {
//       dispatch(filterEmployees(newFilters));
//     } else {
//       // If no filters, fetch all employees
//       dispatch(fetchEmployees());
//     }
//   };

//   const handleClearFilters = () => {
//     dispatch(clearFilters());
//     dispatch(setSearch(''));
//     dispatch(fetchEmployees());
//   };

//   const handleRetry = () => {
//     setRetryCount(prev => prev + 1);
//     setApiError(null);
//   };

//   const handleDeleteSelected = async () => {
//     if (selected.length > 0 && window.confirm(`Delete ${selected.length} selected employee(s)?`)) {
//       dispatch(deleteEmployees(selected));
//     }
//   };

//   const handleActionClick = () => {
//     setActiveModal('addEmployee');
//   };

//   const closeModal = () => {
//     setActiveModal(null);
//   };

//   // Handle adding a new employee
//   const handleAddEmployee = async (employeeData) => {
//     try {
//       const result = await dispatch(addEmployee(employeeData));
//       if (addEmployee.fulfilled.match(result)) {
//         closeModal();
//         // Show success message
//         alert('Employee added successfully!');
//       } else {
//         throw new Error(result.error?.message || 'Failed to add employee');
//       }
//     } catch (error) {
//       alert(`Error adding employee: ${error.message}`);
//     }
//   };

//   // Handle export to Excel/CSV
//   const handleExport = async () => {
//     try {
//       setIsExporting(true);
//       const blob = await employeeApi.exportEmployees(filters);
      
//       // Create download link
//       const url = window.URL.createObjectURL(blob);
//       const a = document.createElement('a');
//       a.href = url;
//       a.download = `employees_export_${new Date().toISOString().split('T')[0]}.xlsx`;
//       document.body.appendChild(a);
//       a.click();
//       window.URL.revokeObjectURL(url);
//       document.body.removeChild(a);
      
//       alert('Export completed successfully!');
//     } catch (error) {
//       console.error('Export error:', error);
//       alert('Error exporting employees. Please try again.');
//     } finally {
//       setIsExporting(false);
//     }
//   };

//   // Navigate to employee profile
//   const handleViewProfile = (employeeId) => {
//     navigate(`/employee/profile/${employeeId}`);
//   };

//   // Handle row click to view profile
//   const handleRowClick = (employeeId, e) => {
//     if (e.target.closest('input[type="checkbox"]') || e.target.closest('button') || e.target.closest('a')) {
//       return;
//     }
    
//     if (isMobile) {
//       // On mobile, toggle expand/collapse instead of navigating
//       toggleRowExpand(employeeId);
//     } else {
//       // On desktop/tablet, navigate to profile
//       handleViewProfile(employeeId);
//     }
//   };

//   // Toggle row expansion on mobile
//   const toggleRowExpand = (employeeId) => {
//     const newExpandedRows = new Set(expandedRows);
//     if (newExpandedRows.has(employeeId)) {
//       newExpandedRows.delete(employeeId);
//     } else {
//       newExpandedRows.add(employeeId);
//     }
//     setExpandedRows(newExpandedRows);
//   };

//   // Select all filtered employees
//   const handleSelectAll = () => {
//     const allSelected = selected.length === filteredEmployeesToDisplay.length && filteredEmployeesToDisplay.length > 0;
    
//     if (allSelected) {
//       // Deselect all
//       dispatch(clearSelected());
//     } else {
//       // Select all filtered
//       const allIds = filteredEmployeesToDisplay.map(emp => emp.id);
//       allIds.forEach(id => {
//         if (!selected.includes(id)) {
//           dispatch(toggleSelect(id));
//         }
//       });
//     }
//   };

//   // Cleanup on unmount
//   useEffect(() => {
//     return () => {
//       if (searchTimeoutRef.current) {
//         clearTimeout(searchTimeoutRef.current);
//       }
//     };
//   }, []);

//   // Render employee row for mobile
//   const renderMobileEmployeeRow = (emp) => {
//     const isExpanded = expandedRows.has(emp.id);
    
//     return (
//       <div 
//         key={emp.id}
//         className={`${emp.highlight ? 'bg-yellow-50' : 'bg-white'} border-b border-gray-200 p-4 ${
//           isExpanded ? 'bg-gray-50' : ''
//         }`}
//       >
//         <div 
//           className="flex items-start justify-between cursor-pointer"
//           onClick={(e) => {
//             if (!e.target.closest('input[type="checkbox"]') && !e.target.closest('button')) {
//               toggleRowExpand(emp.id);
//             }
//           }}
//         >
//           <div className="flex items-center gap-3 flex-1">
//             <div 
//               className="mt-1" 
//               onClick={(e) => {
//                 e.stopPropagation();
//                 dispatch(toggleSelect(emp.id));
//               }}
//             >
//               <input
//                 type="checkbox"
//                 checked={selected.includes(emp.id)}
//                 onChange={() => {}}
//                 className={`w-4 h-4 rounded border ${themeClasses.borderColor} ${themeClasses.textColor} focus:ring-2 ${themeClasses.focusRing}`}
//               />
//             </div>
            
//             <div className="relative">
//               <div className={`w-12 h-12 rounded-full ${themeClasses.buttonBg} flex items-center justify-center text-white font-bold text-base shadow`}>
//                 {emp.name?.split(' ').map(n => n[0]).join('') || 'E'}
//               </div>
//               {emp.star && (
//                 <div className={`absolute -top-1 -right-1 ${themeClasses.buttonBg} p-1 rounded-full`}>
//                   <Star className="h-3 w-3" fill="white" />
//                 </div>
//               )}
//               <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${emp.status === 'active' || emp.status === 'online' ? 'bg-green-500' : emp.status === 'on_leave' ? 'bg-yellow-500' : 'bg-gray-400'}`} />
//             </div>
            
//             <div className="flex-1 min-w-0">
//               <h3 className="font-medium text-gray-900 truncate">{emp.name}</h3>
//               <p className="text-xs text-gray-500">{emp.code}</p>
//               <div className="flex items-center gap-2 mt-1">
//                 <span className="px-2 py-0.5 bg-blue-100 text-blue-800 text-xs rounded-full">
//                   {emp.department || 'N/A'}
//                 </span>
//                 <span className="text-xs text-gray-600 truncate">{emp.position}</span>
//               </div>
//             </div>
//           </div>
          
//           <button 
//             className={`p-2 hover:bg-gray-100 rounded-lg ml-2`}
//             onClick={(e) => {
//               e.stopPropagation();
//               toggleRowExpand(emp.id);
//             }}
//           >
//             {isExpanded ? (
//               <ChevronUp className="h-4 w-4 text-gray-500" />
//             ) : (
//               <ChevronDown className="h-4 w-4 text-gray-500" />
//             )}
//           </button>
//         </div>

//         {/* Expanded content */}
//         {isExpanded && (
//           <motion.div
//             initial={{ opacity: 0, height: 0 }}
//             animate={{ opacity: 1, height: 'auto' }}
//             exit={{ opacity: 0, height: 0 }}
//             className="mt-4 pt-4 border-t border-gray-200 space-y-3"
//           >
//             <div className="grid grid-cols-2 gap-3">
//               <div>
//                 <p className="text-xs text-gray-500">Email</p>
//                 <p className="text-sm font-medium truncate">{emp.email}</p>
//               </div>
//               <div>
//                 <p className="text-xs text-gray-500">Phone</p>
//                 <p className="text-sm font-medium">{emp.phone || 'N/A'}</p>
//               </div>
//               <div>
//                 <p className="text-xs text-gray-500">Badge ID</p>
//                 <p className="text-sm font-medium">{emp.badgeId || 'N/A'}</p>
//               </div>
//               <div>
//                 <p className="text-xs text-gray-500">Status</p>
//                 <p className="text-sm font-medium capitalize">{emp.status || 'N/A'}</p>
//               </div>
//             </div>
            
//             <div className="flex items-center justify-between pt-3">
//               <div className="flex items-center gap-2">
//                 <button
//                   onClick={() => handleViewProfile(emp.id)}
//                   className={`p-2 rounded-lg hover:bg-gray-100 active:scale-95`}
//                   title="View Profile"
//                 >
//                   <Eye className={`h-4 w-4 ${themeClasses.textColor}`} />
//                 </button>
//                 <a
//                   href={`mailto:${emp.email}`}
//                   className={`p-2 rounded-lg hover:bg-gray-100 active:scale-95`}
//                   title="Send Email"
//                 >
//                   <Mail className={`h-4 w-4 ${themeClasses.textColor}`} />
//                 </a>
//                 <a
//                   href={`tel:${emp.phone}`}
//                   className={`p-2 rounded-lg hover:bg-gray-100 active:scale-95`}
//                   title="Call"
//                 >
//                   <Phone className={`h-4 w-4 ${themeClasses.textColor}`} />
//                 </a>
//               </div>
//               <button
//                 onClick={() => navigator.clipboard.writeText(emp.badgeId)}
//                 className={`p-2 rounded-lg hover:bg-gray-100 active:scale-95`}
//                 title="Copy Badge ID"
//               >
//                 <Badge className={`h-4 w-4 ${themeClasses.textColor}`} />
//               </button>
//             </div>
//           </motion.div>
//         )}
//       </div>
//     );
//   };

//   // Render employee row for tablet
//   const renderTabletEmployeeRow = (emp) => (
//     <tr
//       key={emp.id}
//       onClick={(e) => handleRowClick(emp.id, e)}
//       className={`${emp.highlight ? 'bg-yellow-50' : 'bg-white'} hover:bg-gray-50 transition cursor-pointer`}
//     >
//       <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
//         <input
//           type="checkbox"
//           checked={selected.includes(emp.id)}
//           onChange={() => dispatch(toggleSelect(emp.id))}
//           className={`w-4 h-4 rounded border ${themeClasses.borderColor} ${themeClasses.textColor} focus:ring-2 ${themeClasses.focusRing}`}
//         />
//       </td>
//       <td className="px-4 py-3">
//         <div className="flex items-center gap-3">
//           <div className="relative">
//             <div className={`w-10 h-10 rounded-full ${themeClasses.buttonBg} flex items-center justify-center text-white font-bold text-sm shadow`}>
//               {emp.name?.split(' ').map(n => n[0]).join('') || 'E'}
//             </div>
//             {emp.star && (
//               <div className={`absolute -top-1 -right-1 ${themeClasses.buttonBg} p-0.5 rounded-full`}>
//                 <Star className="h-3 w-3" fill="white" />
//               </div>
//             )}
//             <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${emp.status === 'active' || emp.status === 'online' ? 'bg-green-500' : emp.status === 'on_leave' ? 'bg-yellow-500' : 'bg-gray-400'}`} />
//           </div>
//           <div>
//             <div className="font-medium text-gray-900">{emp.name}</div>
//             <div className="text-xs text-gray-500">{emp.code}</div>
//           </div>
//         </div>
//       </td>
//       <td className="px-4 py-3 text-gray-700">
//         <div className="max-w-[150px] truncate">{emp.email}</div>
//       </td>
//       <td className="px-4 py-3 text-gray-700">{emp.phone || 'N/A'}</td>
//       <td className="px-4 py-3 text-gray-700">
//         <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
//           {emp.department || 'N/A'}
//         </span>
//       </td>
//       <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
//         <div className="flex items-center gap-1">
//           <button
//             onClick={() => handleViewProfile(emp.id)}
//             className={`p-2 rounded-lg hover:bg-gray-100 active:scale-95`}
//             title="View Profile"
//           >
//             <Eye className={`h-4 w-4 ${themeClasses.textColor}`} />
//           </button>
//           <button className="p-2 rounded-lg hover:bg-gray-100 active:scale-95">
//             <MoreVertical className="h-4 w-4 text-gray-500" />
//           </button>
//         </div>
//       </td>
//     </tr>
//   );

//   // Render employee row for desktop
//   const renderDesktopEmployeeRow = (emp) => (
//     <tr
//       key={emp.id}
//       onClick={(e) => handleRowClick(emp.id, e)}
//       className={`${emp.highlight ? 'bg-yellow-50' : 'bg-white'} hover:bg-gray-50 transition cursor-pointer`}
//     >
//       <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
//         <input
//           type="checkbox"
//           checked={selected.includes(emp.id)}
//           onChange={() => dispatch(toggleSelect(emp.id))}
//           className={`w-4 h-4 rounded border ${themeClasses.borderColor} ${themeClasses.textColor} focus:ring-2 ${themeClasses.focusRing}`}
//         />
//       </td>
//       <td className="px-4 py-3">
//         <div className="flex items-center gap-3">
//           <div className="relative">
//             <div className={`w-10 h-10 rounded-full ${themeClasses.buttonBg} flex items-center justify-center text-white font-bold text-sm shadow`}>
//               {emp.name?.split(' ').map(n => n[0]).join('') || 'E'}
//             </div>
//             {emp.star && (
//               <div className={`absolute -top-1 -right-1 ${themeClasses.buttonBg} p-0.5 rounded-full`}>
//                 <Star className="h-3 w-3" fill="white" />
//               </div>
//             )}
//             <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${emp.status === 'active' || emp.status === 'online' ? 'bg-green-500' : emp.status === 'on_leave' ? 'bg-yellow-500' : 'bg-gray-400'}`} />
//           </div>
//           <div>
//             <div className="font-medium text-gray-900">{emp.name}</div>
//             <div className="text-xs text-gray-500">{emp.code}</div>
//           </div>
//         </div>
//       </td>
//       <td className="px-4 py-3 text-gray-700">{emp.email}</td>
//       <td className="px-4 py-3 text-gray-700">{emp.phone || 'N/A'}</td>
//       <td className="px-4 py-3 font-medium text-gray-800">{emp.badgeId || 'N/A'}</td>
//       <td className="px-4 py-3 text-gray-700 max-w-48 truncate">{emp.position || 'N/A'}</td>
//       <td className="px-4 py-3 text-gray-700">
//         <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
//           {emp.department || 'N/A'}
//         </span>
//       </td>
//       <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
//         <div className="flex items-center gap-1">
//           <button
//             onClick={() => handleViewProfile(emp.id)}
//             className={`p-2 rounded-lg hover:bg-gray-100 active:scale-95`}
//             title="View Profile"
//           >
//             <Eye className={`h-4 w-4 ${themeClasses.textColor}`} />
//           </button>
//           <a
//             href={`mailto:${emp.email}`}
//             className={`p-2 rounded-lg hover:bg-gray-100 active:scale-95`}
//             title="Send Email"
//           >
//             <Mail className={`h-4 w-4 ${themeClasses.textColor}`} />
//           </a>
//           <a
//             href={`tel:${emp.phone}`}
//             className={`p-2 rounded-lg hover:bg-gray-100 active:scale-95`}
//             title="Call"
//           >
//             <Phone className={`h-4 w-4 ${themeClasses.textColor}`} />
//           </a>
//           <button
//             onClick={() => navigator.clipboard.writeText(emp.badgeId)}
//             className={`p-2 rounded-lg hover:bg-gray-100 active:scale-95`}
//             title="Copy Badge ID"
//           >
//             <Badge className={`h-4 w-4 ${themeClasses.textColor}`} />
//           </button>
//           <button className="p-2 rounded-lg hover:bg-gray-100 active:scale-95">
//             <MoreVertical className="h-4 w-4 text-gray-500" />
//           </button>
//         </div>
//       </td>
//     </tr>
//   );

//   // Error state display
//   // if (apiError && employees.length === 0) {
//   //   return (
//   //     <div className="flex flex-col items-center justify-center min-h-[70vh] px-4">
//   //       <div className="text-center max-w-md">
//   //         <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-4">
//   //           <AlertCircle className="h-8 w-8 text-red-600" />
//   //         </div>
//   //         <h2 className="text-xl font-bold text-gray-900 mb-2">Connection Error</h2>
//   //         <p className="text-gray-600 mb-4">
//   //           {apiError.includes('404') 
//   //             ? 'API endpoint not found. Please check if the backend server is running.'
//   //             : apiError.includes('Network')
//   //             ? 'Cannot connect to the server. Make sure the backend is running on http://192.168.0.3:8000'
//   //             : apiError}
//   //         </p>
//   //         <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-6 text-sm text-yellow-800">
//   //           <p className="font-medium mb-1">Troubleshooting steps:</p>
//   //           <ul className="list-disc list-inside space-y-1">
//   //             <li>Start your Django server: <code className="bg-gray-100 px-1 py-0.5 rounded">python manage.py runserver 192.168.0.3:8000</code></li>
//   //             <li>Check if the server is accessible at: <a href="http://192.168.0.3:8000" target="_blank" className="text-blue-600 underline">http://192.168.0.3:8000</a></li>
//   //             <li>Verify your network connection</li>
//   //           </ul>
//   //         </div>
//   //         <div className="flex flex-col sm:flex-row gap-3 justify-center">
//   //           <button
//   //             onClick={handleRetry}
//   //             className={`px-5 py-2.5 ${themeClasses.buttonBg} ${themeClasses.buttonHover} active:scale-95 text-white rounded-lg font-medium text-sm flex items-center gap-2 shadow-md`}
//   //           >
//   //             <RefreshCw className="h-4 w-4" />
//   //             Retry Connection
//   //           </button>
//   //           <button
//   //             onClick={handleActionClick}
//   //             className="px-5 py-2.5 border border-gray-300 text-gray-700 rounded-lg font-medium text-sm hover:bg-gray-50 active:scale-95 flex items-center gap-2"
//   //           >
//   //             <UserPlus className="h-4 w-4" />
//   //             Add Demo Employee
//   //           </button>
//   //         </div>
//   //       </div>
//   //     </div>
//   //   );
//   // }

//   return (
//     <>
//       {/* HEADER - Responsive */}
//       <div className="bg-white border-b border-gray-200 px-4 sm:px-6 py-4 sm:py-5">
//         <div className="flex flex-col gap-4">
//           {/* Top row with title and stats */}
//           <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
//             <div className="flex items-center gap-3">
//               <div className={`p-2 rounded-lg ${themeClasses.buttonBg} bg-opacity-10`}>
//                 <Users className={`h-5 w-5 ${themeClasses.textColor}`} />
//               </div>
//               <div>
//                 <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Employees</h1>
//                 <p className="text-xs sm:text-sm text-gray-600 mt-1">Manage all employee records</p>
//               </div>
//             </div>
            
//             <div className="flex items-center gap-3">
//               <div className="flex items-center gap-2 text-sm text-gray-700">
//                 <Shield className="h-4 w-4" />
//                 <span>Total: <span className="font-semibold">{employees.length}</span></span>
//                 <span className="mx-2">•</span>
//                 <span>Showing: <span className="font-semibold">{filteredEmployeesToDisplay.length}</span></span>
//                 <span className="mx-2">•</span>
//                 <span>Selected: <span className="font-semibold">{selected.length}</span></span>
//               </div>
//             </div>
//           </div>

//           {/* Search and action buttons */}
//           <div className="flex flex-col sm:flex-row gap-3">
//             {/* Search bar */}
//             <div className="relative flex-1">
//               <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
//               <input
//                 type="text"
//                 placeholder="Search by name, email, position..."
//                 value={search}
//                 onChange={onSearchChange}
//                 className={`pl-10 pr-4 py-2.5 w-full rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 ${themeClasses.focusRing} focus:border-${themeClasses.accent}`}
//               />
//             </div>
            
//             {/* Action buttons */}
//             <div className="flex flex-wrap gap-2 sm:gap-3">
//               <button
//                 onClick={() => setShowFilters(!showFilters)}
//                 className={`p-2.5 rounded-lg border ${themeClasses.borderColor} hover:bg-gray-100 active:scale-95 flex-shrink-0`}
//                 title="Toggle Filters"
//               >
//                 <Filter className={`h-4 w-4 ${themeClasses.textColor}`} />
//               </button>
              
//               <button
//                 onClick={handleExport}
//                 disabled={isExporting || employees.length === 0}
//                 className={`p-2.5 rounded-lg border ${themeClasses.borderColor} hover:bg-gray-100 active:scale-95 ${(isExporting || employees.length === 0) ? 'opacity-50 cursor-not-allowed' : ''} flex-shrink-0`}
//                 title="Export to Excel"
//               >
//                 <Download className={`h-4 w-4 ${themeClasses.textColor}`} />
//               </button>
              
//               {selected.length > 0 && (
//                 <button
//                   onClick={handleDeleteSelected}
//                   className={`px-3 sm:px-5 py-2.5 bg-red-600 hover:bg-red-700 active:scale-95 text-white rounded-lg font-medium text-sm flex items-center gap-2 shadow-md flex-shrink-0`}
//                 >
//                   <Trash2 className="h-4 w-4" />
//                   <span className="hidden sm:inline">Delete ({selected.length})</span>
//                   <span className="sm:hidden">Del</span>
//                 </button>
//               )}
              
//               <button
//                 onClick={handleActionClick}
//                 className={`px-3 sm:px-5 py-2.5 ${themeClasses.buttonBg} ${themeClasses.buttonHover} active:scale-95 text-white rounded-lg font-medium text-sm flex items-center gap-2 shadow-md flex-1 sm:flex-none justify-center`}
//               >
//                 <Plus className="h-4 w-4" />
//                 <span className="hidden sm:inline">Create Employee</span>
//                 <span className="sm:hidden">Create</span>
//               </button>
//             </div>
//           </div>

//           {/* Error display */}
//           {error && (
//             <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
//               <div className="flex items-start gap-2">
//                 <AlertCircle className="h-4 w-4 text-red-500 mt-0.5" />
//                 <div className="flex-1">
//                   <p className="text-sm text-red-700">{error}</p>
//                   <button
//                     onClick={handleRetry}
//                     className="mt-2 text-sm font-medium text-red-600 hover:text-red-800 flex items-center gap-1"
//                   >
//                     <RefreshCw className="h-3 w-3" />
//                     Try Again
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* FILTERS - Responsive grid */}
//         {showFilters && (
//           <div className="mt-4 sm:mt-5 p-4 sm:p-5 bg-gray-50 rounded-xl border border-gray-200">
//             <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-sm">
//               <div>
//                 <label className="block text-xs font-medium text-gray-700 mb-1">Department</label>
//                 <select
//                   value={filters.department || ''}
//                   onChange={(e) => handleFilterChange('department', e.target.value)}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400"
//                 >
//                   <option value="">All Departments</option>
//                   <option value="IT">Information Technology</option>
//                   <option value="HR">Human Resources</option>
//                   <option value="Sales">Sales</option>
//                   <option value="Marketing">Marketing</option>
//                   <option value="Finance">Finance</option>
//                   <option value="Design">Design</option>
//                   <option value="Operations">Operations</option>
//                   <option value="Support">Support</option>
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-xs font-medium text-gray-700 mb-1">Position</label>
//                 <input
//                   type="text"
//                   placeholder="Position"
//                   value={filters.position || ''}
//                   onChange={(e) => handleFilterChange('position', e.target.value)}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400"
//                 />
//               </div>

//               <div>
//                 <label className="block text-xs font-medium text-gray-700 mb-1">Status</label>
//                 <select
//                   value={filters.status || ''}
//                   onChange={(e) => handleFilterChange('status', e.target.value)}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400"
//                 >
//                   <option value="">All Status</option>
//                   <option value="active">Active</option>
//                   <option value="inactive">Inactive</option>
//                   <option value="on_leave">On Leave</option>
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-xs font-medium text-gray-700 mb-1">Work Type</label>
//                 <select
//                   value={filters.workType || ''}
//                   onChange={(e) => handleFilterChange('workType', e.target.value)}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400"
//                 >
//                   <option value="">All Types</option>
//                   <option value="Permanent">Permanent</option>
//                   <option value="Contract">Contract</option>
//                   <option value="Intern">Intern</option>
//                   <option value="Remote">Remote</option>
//                 </select>
//               </div>

//               <div className="xs:col-span-2 sm:col-span-1 lg:col-span-2">
//                 <div className="grid grid-cols-2 gap-3">
//                   <div>
//                     <label className="block text-xs font-medium text-gray-700 mb-1">Start Date</label>
//                     <input
//                       type="date"
//                       value={filters.startDate || ''}
//                       onChange={(e) => handleFilterChange('startDate', e.target.value)}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-xs font-medium text-gray-700 mb-1">End Date</label>
//                     <input
//                       type="date"
//                       value={filters.endDate || ''}
//                       onChange={(e) => handleFilterChange('endDate', e.target.value)}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400"
//                     />
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="flex justify-end gap-3 mt-4">
//               <button
//                 onClick={handleClearFilters}
//                 className="px-5 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium text-sm hover:bg-gray-300"
//               >
//                 Clear All
//               </button>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* STATUS + SELECT ALL - Responsive */}
//       <div className="px-4 sm:px-6 py-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0 text-xs text-gray-600 bg-gray-50 border-b border-gray-200">
//         <div className="flex flex-wrap items-center gap-3 sm:gap-6">
//           <span className="flex items-center gap-2">
//             <div className="w-2.5 h-2.5 bg-green-500 rounded-full"></div>
//             <span className="hidden xs:inline">Active</span> ({filteredEmployeesToDisplay.filter(e => e.status === 'active' || e.status === 'online').length})
//           </span>
//           <span className="flex items-center gap-2">
//             <div className="w-2.5 h-2.5 bg-gray-400 rounded-full"></div>
//             <span className="hidden xs:inline">Inactive</span> ({filteredEmployeesToDisplay.filter(e => e.status === 'inactive' || e.status === 'offline').length})
//           </span>
//           <span className="flex items-center gap-2">
//             <div className="w-2.5 h-2.5 bg-yellow-500 rounded-full"></div>
//             <span className="hidden xs:inline">On Leave</span> ({filteredEmployeesToDisplay.filter(e => e.status === 'on_leave').length})
//           </span>
//         </div>
//         <label className="flex items-center gap-2 cursor-pointer select-none">
//           <button
//             onClick={handleSelectAll}
//             className={`p-1 rounded hover:bg-gray-200`}
//           >
//             {selected.length === filteredEmployeesToDisplay.length && filteredEmployeesToDisplay.length > 0 ? (
//               <CheckSquare className={`h-4 w-4 ${themeClasses.textColor}`} />
//             ) : (
//               <Square className={`h-4 w-4 ${themeClasses.textColor}`} />
//             )}
//           </button>
//           <span className={`font-medium ${themeClasses.textColor}`}>
//             Select All ({filteredEmployeesToDisplay.length})
//           </span>
//         </label>
//       </div>

//       {/* EMPLOYEES LIST - Responsive */}
//       <div className="px-0 sm:px-6 pb-24 overflow-x-auto">
//         {loading ? (
//           <div className="text-center py-12">
//             <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
//             <p className="mt-2 text-gray-600">Loading employees...</p>
//           </div>
//         ) : filteredEmployeesToDisplay.length === 0 ? (
//           <div className="text-center py-12 px-4">
//             <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
//               <Users className="h-8 w-8 text-gray-400" />
//             </div>
//             <h3 className="text-lg font-medium text-gray-900 mb-2">No employees found</h3>
//             <p className="text-gray-500 max-w-md mx-auto mb-6">
//               {search || Object.values(filters).some(v => v) 
//                 ? "No employees match your search criteria. Try adjusting your search or filters."
//                 : "Get started by adding your first employee to the system."}
//             </p>
//             <button
//               onClick={handleActionClick}
//               className={`px-5 py-2.5 ${themeClasses.buttonBg} ${themeClasses.buttonHover} active:scale-95 text-white rounded-lg font-medium text-sm flex items-center gap-2 shadow-md mx-auto`}
//             >
//               <Plus className="h-4 w-4" />
//               Add First Employee
//             </button>
//           </div>
//         ) : (
//           <>
//             {/* Mobile View */}
//             {isMobile && (
//               <div className="space-y-0">
//                 {filteredEmployeesToDisplay.map((emp) => renderMobileEmployeeRow(emp))}
//               </div>
//             )}

//             {/* Tablet View */}
//             {isTablet && (
//               <div className="inline-block min-w-full align-middle">
//                 <table className="min-w-full divide-y divide-gray-200">
//                   <thead className="bg-gray-50">
//                     <tr>
//                       <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"></th>
//                       <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Employee</th>
//                       <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Email</th>
//                       <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Phone</th>
//                       <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Dept</th>
//                       <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"></th>
//                     </tr>
//                   </thead>
//                   <tbody className="bg-white divide-y divide-gray-200 text-sm">
//                     {filteredEmployeesToDisplay.map((emp) => renderTabletEmployeeRow(emp))}
//                   </tbody>
//                 </table>
//               </div>
//             )}

//             {/* Desktop View */}
//             {!isMobile && !isTablet && (
//               <div className="inline-block min-w-full align-middle">
//                 <table className="min-w-full divide-y divide-gray-200">
//                   <thead className="bg-gray-50">
//                     <tr>
//                       <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"></th>
//                       <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Employee</th>
//                       <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Email</th>
//                       <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Phone</th>
//                       <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Badge</th>
//                       <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Position</th>
//                       <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Department</th>
//                       <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"></th>
//                     </tr>
//                   </thead>
//                   <tbody className="bg-white divide-y divide-gray-200 text-sm">
//                     {filteredEmployeesToDisplay.map((emp) => renderDesktopEmployeeRow(emp))}
//                   </tbody>
//                 </table>
//               </div>
//             )}
//           </>
//         )}
//       </div>

//       <AnimatePresence>
//         {activeModal === 'addEmployee' && (
//           <AddModal onClose={closeModal} onAddEmployee={handleAddEmployee} />
//         )}
//       </AnimatePresence>
//     </>
//   );
// }


'use client';

import React, { useEffect, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search, Filter, Plus, MoreVertical, Mail, Phone, Badge,
  CheckSquare, Square, Star, Trash2, Eye, Download, 
  ChevronDown, ChevronUp, AlertCircle, RefreshCw, UserPlus,
  Users, Briefcase, Building, Calendar, MapPin, Shield
} from 'lucide-react';
import { useTheme } from '../ThemeContext';
import AddModal from './AddModal';
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import {
  setSearch,
  setFilters,
  clearFilters,
  toggleSelect,
  toggleSelectAll,
  deleteEmployees,
  fetchEmployees,
  addEmployee,
  filterEmployees,
  searchEmployees,
  clearSelected
} from '../store/slices/employeeSlice';

export default function Employee() {
  const { getThemeClasses } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get theme classes
  const themeClasses = getThemeClasses();
  
  // Get state from Redux store
  const {
    employees,
    filteredEmployees,
    selected,
    filters,
    search,
    loading,
    error
  } = useSelector((state) => state.employees);

  // State for responsive design
  const [showFilters, setShowFilters] = useState(false);
  const [activeModal, setActiveModal] = useState(null);
  const [isExporting, setIsExporting] = useState(false);
  const [expandedRows, setExpandedRows] = useState(new Set());
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [apiError, setApiError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  // Responsive detection
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Fetch employees
  useEffect(() => {
    const loadEmployees = async () => {
      try {
        const result = await dispatch(fetchEmployees());
        if (fetchEmployees.rejected.match(result)) {
          setApiError(result.payload || result.error.message);
        } else {
          setApiError(null);
        }
      } catch (error) {
        setApiError(error.message);
      }
    };

    loadEmployees();
  }, [dispatch, retryCount]);

  // Debounced search
  const handleSearchChange = useCallback(
    (value) => {
      const timeoutId = setTimeout(() => {
        if (value.length >= 2 || value.length === 0) {
          dispatch(searchEmployees({ searchTerm: value, filters }));
        }
      }, 300);
      
      return () => clearTimeout(timeoutId);
    },
    [dispatch, filters]
  );

  // Handle filter changes
  const handleFilterChange = (filterName, value) => {
    const newFilters = { ...filters, [filterName]: value };
    dispatch(setFilters(newFilters));
    
    if (Object.values(newFilters).some(val => val !== '')) {
      dispatch(filterEmployees(newFilters));
    } else {
      dispatch(fetchEmployees());
    }
  };

  const handleClearFilters = () => {
    dispatch(clearFilters());
    dispatch(setSearch(''));
    dispatch(fetchEmployees());
  };

  const handleRetry = () => {
    setRetryCount(prev => prev + 1);
    setApiError(null);
  };

  const handleDeleteSelected = async () => {
    if (selected.length > 0 && window.confirm(`Delete ${selected.length} selected employee(s)?`)) {
      dispatch(deleteEmployees(selected));
    }
  };

  const handleActionClick = () => {
    setActiveModal('addEmployee');
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  // Handle adding a new employee
  const handleAddEmployee = async (employeeData) => {
    try {
      const result = await dispatch(addEmployee(employeeData));
      if (addEmployee.fulfilled.match(result)) {
        closeModal();
      } else {
        throw new Error(result.error?.message || 'Failed to add employee');
      }
    } catch (error) {
      alert(`Error adding employee: ${error.message}`);
    }
  };

  // Handle export
  const handleExport = async () => {
    try {
      setIsExporting(true);
      // Simulate export - replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert('Export completed successfully!');
    } catch (error) {
      alert('Error exporting employees. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  // Navigate to employee profile
  const handleViewProfile = (employeeId) => {
    navigate(`/employee/profile/${employeeId}`);
  };

  // Toggle row expansion on mobile
  const toggleRowExpand = (employeeId) => {
    setExpandedRows(prev => {
      const newSet = new Set(prev);
      if (newSet.has(employeeId)) {
        newSet.delete(employeeId);
      } else {
        newSet.add(employeeId);
      }
      return newSet;
    });
  };

  // Select all filtered employees
  const handleSelectAll = () => {
    if (selected.length === filteredEmployees.length && filteredEmployees.length > 0) {
      dispatch(clearSelected());
    } else {
      const allIds = filteredEmployees.map(emp => emp.id);
      dispatch(toggleSelectAll(allIds));
    }
  };

  // Render employee row for mobile
  const renderMobileEmployeeRow = (emp) => {
    const isExpanded = expandedRows.has(emp.id);
    
    return (
      <div 
        key={emp.id}
        className={`${emp.highlight ? 'bg-yellow-50' : 'bg-white'} border-b border-gray-200 p-3 ${
          isExpanded ? 'bg-gray-50' : ''
        }`}
      >
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3 flex-1">
            <input
              type="checkbox"
              checked={selected.includes(emp.id)}
              onChange={() => dispatch(toggleSelect(emp.id))}
              className={`w-4 h-4 rounded border ${themeClasses.borderColor} ${themeClasses.textColor} focus:ring-2 ${themeClasses.focusRing} mt-1`}
            />
            
            <div className="relative">
              <div className={`w-10 h-10 rounded-full ${themeClasses.buttonBg} flex items-center justify-center text-white font-bold text-sm shadow`}>
                {emp.name?.split(' ').map(n => n[0]).join('') || 'E'}
              </div>
              {emp.star && (
                <div className={`absolute -top-1 -right-1 ${themeClasses.buttonBg} p-0.5 rounded-full`}>
                  <Star className="h-2.5 w-2.5" fill="white" />
                </div>
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-gray-900 truncate text-sm">{emp.name}</h3>
              <p className="text-xs text-gray-500">{emp.code}</p>
              <div className="flex items-center gap-1 mt-0.5">
                <span className="px-1.5 py-0.5 bg-blue-100 text-blue-800 text-xs rounded-full">
                  {emp.department?.slice(0, 3) || 'N/A'}
                </span>
                <span className="text-xs text-gray-600 truncate">{emp.position?.slice(0, 15)}</span>
              </div>
            </div>
          </div>
          
          <button 
            className="p-1.5 hover:bg-gray-100 rounded-lg ml-1"
            onClick={() => toggleRowExpand(emp.id)}
          >
            {isExpanded ? (
              <ChevronUp className="h-4 w-4 text-gray-500" />
            ) : (
              <ChevronDown className="h-4 w-4 text-gray-500" />
            )}
          </button>
        </div>

        {/* Expanded content */}
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mt-3 pt-3 border-t border-gray-200 space-y-2"
          >
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <p className="text-gray-500">Email</p>
                <p className="font-medium truncate">{emp.email}</p>
              </div>
              <div>
                <p className="text-gray-500">Phone</p>
                <p className="font-medium">{emp.phone || 'N/A'}</p>
              </div>
              <div>
                <p className="text-gray-500">Badge ID</p>
                <p className="font-medium">{emp.badgeId || 'N/A'}</p>
              </div>
              <div>
                <p className="text-gray-500">Status</p>
                <p className="font-medium capitalize">{emp.status || 'N/A'}</p>
              </div>
            </div>
            
            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => handleViewProfile(emp.id)}
                className={`px-3 py-1.5 ${themeClasses.buttonBg} text-white rounded-lg text-xs font-medium flex items-center gap-1`}
              >
                <Eye className="h-3 w-3" />
                View
              </button>
              <div className="flex items-center gap-1">
                <a href={`mailto:${emp.email}`} className="p-1.5 hover:bg-gray-100 rounded">
                  <Mail className="h-4 w-4 text-gray-600" />
                </a>
                <a href={`tel:${emp.phone}`} className="p-1.5 hover:bg-gray-100 rounded">
                  <Phone className="h-4 w-4 text-gray-600" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    );
  };

  // Render employee row for tablet/desktop
  const renderTableRow = (emp) => (
    <tr
      key={emp.id}
      className="hover:bg-gray-50 transition cursor-pointer border-b border-gray-100"
      onClick={() => !isMobile && handleViewProfile(emp.id)}
    >
      <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
        <input
          type="checkbox"
          checked={selected.includes(emp.id)}
          onChange={() => dispatch(toggleSelect(emp.id))}
          className={`w-4 h-4 rounded border ${themeClasses.borderColor} ${themeClasses.textColor} focus:ring-2 ${themeClasses.focusRing}`}
        />
      </td>
      <td className="px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className={`w-8 h-8 rounded-full ${themeClasses.buttonBg} flex items-center justify-center text-white font-bold text-xs shadow`}>
              {emp.name?.split(' ').map(n => n[0]).join('') || 'E'}
            </div>
            {emp.star && (
              <div className={`absolute -top-1 -right-1 ${themeClasses.buttonBg} p-0.5 rounded-full`}>
                <Star className="h-2 w-2" fill="white" />
              </div>
            )}
          </div>
          <div>
            <div className="font-medium text-gray-900 text-sm">{emp.name}</div>
            <div className="text-xs text-gray-500">{emp.code}</div>
          </div>
        </div>
      </td>
      <td className="px-4 py-3 text-gray-700 text-sm">
        <div className="truncate max-w-[150px]">{emp.email}</div>
      </td>
      <td className="px-4 py-3 text-gray-700 text-sm">{emp.phone || 'N/A'}</td>
      <td className="px-4 py-3 text-gray-700 text-sm">{emp.badgeId || 'N/A'}</td>
      <td className="px-4 py-3 text-gray-700 text-sm truncate max-w-[120px]">{emp.position || 'N/A'}</td>
      <td className="px-4 py-3">
        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
          {emp.department || 'N/A'}
        </span>
      </td>
      <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center gap-1">
          <button
            onClick={() => handleViewProfile(emp.id)}
            className="p-1.5 hover:bg-gray-100 rounded"
            title="View Profile"
          >
            <Eye className="h-4 w-4 text-gray-600" />
          </button>
          <button className="p-1.5 hover:bg-gray-100 rounded">
            <MoreVertical className="h-4 w-4 text-gray-500" />
          </button>
        </div>
      </td>
    </tr>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* HEADER */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="px-4 py-4">
          {/* Title and Stats */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${themeClasses.buttonBg} bg-opacity-10`}>
                <Users className={`h-5 w-5 ${themeClasses.textColor}`} />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Employees</h1>
                <p className="text-sm text-gray-600">Total: {employees.length}</p>
              </div>
            </div>
            
            <button
              onClick={handleActionClick}
              className={`px-4 py-2 ${themeClasses.buttonBg} text-white rounded-lg font-medium text-sm flex items-center gap-2 shadow-md`}
            >
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">Add Employee</span>
              <span className="sm:hidden">Add</span>
            </button>
          </div>

          {/* Search and Actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search employees..."
                value={search}
                onChange={(e) => {
                  dispatch(setSearch(e.target.value));
                  handleSearchChange(e.target.value);
                }}
                className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2 text-sm"
              >
                <Filter className="h-4 w-4" />
                <span className="hidden sm:inline">Filters</span>
              </button>
              
              {selected.length > 0 && (
                <button
                  onClick={handleDeleteSelected}
                  className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center gap-2 text-sm"
                >
                  <Trash2 className="h-4 w-4" />
                  <span className="hidden sm:inline">Delete ({selected.length})</span>
                  <span className="sm:hidden">Del</span>
                </button>
              )}
            </div>
          </div>

          {/* Filters */}
          {showFilters && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-sm">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Department</label>
                  <select
                    value={filters.department || ''}
                    onChange={(e) => handleFilterChange('department', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="">All</option>
                    <option value="IT">IT</option>
                    <option value="HR">HR</option>
                    <option value="Sales">Sales</option>
                    <option value="Marketing">Marketing</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Status</label>
                  <select
                    value={filters.status || ''}
                    onChange={(e) => handleFilterChange('status', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="">All</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Work Type</label>
                  <select
                    value={filters.workType || ''}
                    onChange={(e) => handleFilterChange('workType', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="">All</option>
                    <option value="Permanent">Permanent</option>
                    <option value="Contract">Contract</option>
                  </select>
                </div>

                <div className="flex items-end gap-2">
                  <button
                    onClick={handleClearFilters}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 text-sm"
                  >
                    Clear
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* SELECT ALL BAR */}
      <div className="px-4 py-2 bg-gray-50 border-b border-gray-200 flex items-center justify-between text-sm">
        <div className="flex items-center gap-4">
          <button
            onClick={handleSelectAll}
            className="flex items-center gap-2 hover:bg-gray-200 p-1 rounded"
          >
            {selected.length === filteredEmployees.length && filteredEmployees.length > 0 ? (
              <CheckSquare className={`h-4 w-4 ${themeClasses.textColor}`} />
            ) : (
              <Square className={`h-4 w-4 ${themeClasses.textColor}`} />
            )}
            <span className={`font-medium ${themeClasses.textColor}`}>
              Select All ({filteredEmployees.length})
            </span>
          </button>
        </div>
        
        <div className="text-xs text-gray-600">
          Showing {filteredEmployees.length} of {employees.length}
        </div>
      </div>

      {/* EMPLOYEES TABLE */}
      <div className="px-4 py-4">
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="mt-2 text-gray-600">Loading...</p>
          </div>
        ) : filteredEmployees.length === 0 ? (
          <div className="text-center py-12">
            <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No employees found</h3>
            <p className="text-gray-500 mb-6">Try adjusting your search or filters</p>
            <button
              onClick={handleActionClick}
              className={`px-4 py-2 ${themeClasses.buttonBg} text-white rounded-lg font-medium text-sm`}
            >
              Add First Employee
            </button>
          </div>
        ) : (
          <>
            {/* Mobile View */}
            {isMobile && (
              <div className="space-y-1">
                {filteredEmployees.slice(0, 20).map(renderMobileEmployeeRow)}
              </div>
            )}

            {/* Desktop/Tablet View */}
            {!isMobile && (
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600"></th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Employee</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Email</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Phone</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Badge</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Position</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Department</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredEmployees.slice(0, 20).map(renderTableRow)}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Pagination */}
            {filteredEmployees.length > 20 && (
              <div className="mt-4 flex justify-center">
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm">
                  Load More
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Add Employee Modal */}
      <AnimatePresence>
        {activeModal === 'addEmployee' && (
          <AddModal onClose={closeModal} onAddEmployee={handleAddEmployee} />
        )}
      </AnimatePresence>
    </div>
  );
}