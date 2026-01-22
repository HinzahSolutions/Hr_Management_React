

// 'use client';

// import React, { useEffect, useCallback, useState } from 'react';
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

// export default function Employee() {
//   const { getThemeClasses } = useTheme();
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
//   const [expandedRows, setExpandedRows] = useState(new Set());
//   const [isMobile, setIsMobile] = useState(false);
//   const [isTablet, setIsTablet] = useState(false);
//   const [apiError, setApiError] = useState(null);
//   const [retryCount, setRetryCount] = useState(0);
//   const [showMobileMenu, setShowMobileMenu] = useState(false);

//   // Responsive detection
//   useEffect(() => {
//     const checkScreenSize = () => {
//       setIsMobile(window.innerWidth < 768);
//       setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
//     };

//     checkScreenSize();
//     window.addEventListener('resize', checkScreenSize);
//     return () => window.removeEventListener('resize', checkScreenSize);
//   }, []);

//   // Fetch employees
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

//   // Debounced search
//   const handleSearchChange = useCallback(
//     (value) => {
//       const timeoutId = setTimeout(() => {
//         if (value.length >= 2 || value.length === 0) {
//           dispatch(searchEmployees({ searchTerm: value, filters }));
//         }
//       }, 300);
      
//       return () => clearTimeout(timeoutId);
//     },
//     [dispatch, filters]
//   );

//   // Handle filter changes
//   const handleFilterChange = (filterName, value) => {
//     const newFilters = { ...filters, [filterName]: value };
//     dispatch(setFilters(newFilters));
    
//     if (Object.values(newFilters).some(val => val !== '')) {
//       dispatch(filterEmployees(newFilters));
//     } else {
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
//       } else {
//         throw new Error(result.error?.message || 'Failed to add employee');
//       }
//     } catch (error) {
//       alert(`Error adding employee: ${error.message}`);
//     }
//   };

//   // Handle export
//   const handleExport = async () => {
//     try {
//       setIsExporting(true);
//       // Simulate export - replace with actual API call
//       await new Promise(resolve => setTimeout(resolve, 1000));
//       alert('Export completed successfully!');
//     } catch (error) {
//       alert('Error exporting employees. Please try again.');
//     } finally {
//       setIsExporting(false);
//     }
//   };

//   // Navigate to employee profile
//   const handleViewProfile = (employeeId) => {
//     navigate(`/employee/profile/${employeeId}`);
//   };

//   // Toggle row expansion on mobile
//   const toggleRowExpand = (employeeId) => {
//     setExpandedRows(prev => {
//       const newSet = new Set(prev);
//       if (newSet.has(employeeId)) {
//         newSet.delete(employeeId);
//       } else {
//         newSet.add(employeeId);
//       }
//       return newSet;
//     });
//   };

//   // Select all filtered employees
//   const handleSelectAll = () => {
//     if (selected.length === filteredEmployees.length && filteredEmployees.length > 0) {
//       dispatch(clearSelected());
//     } else {
//       const allIds = filteredEmployees.map(emp => emp.id);
//       dispatch(toggleSelectAll(allIds));
//     }
//   };

//   // Render employee row for mobile
//   const renderMobileEmployeeRow = (emp) => {
//     const isExpanded = expandedRows.has(emp.id);
    
//     return (
//       <div 
//         key={emp.id}
//         className={`${emp.highlight ? 'bg-yellow-50' : 'bg-white'} border-b border-gray-200 p-3 ${
//           isExpanded ? 'bg-gray-50' : ''
//         }`}
//       >
//         <div className="flex items-start justify-between">
//           <div className="flex items-center gap-3 flex-1">
//             <input
//               type="checkbox"
//               checked={selected.includes(emp.id)}
//               onChange={() => dispatch(toggleSelect(emp.id))}
//               className={`w-4 h-4 rounded border ${themeClasses.borderColor} ${themeClasses.textColor} focus:ring-2 ${themeClasses.focusRing} mt-1`}
//             />
            
//             <div className="relative">
//               <div className={`w-10 h-10 rounded-full ${themeClasses.buttonBg} flex items-center justify-center text-white font-bold text-sm shadow`}>
//                 {emp.name?.split(' ').map(n => n[0]).join('') || 'E'}
//               </div>
//               {emp.star && (
//                 <div className={`absolute -top-1 -right-1 ${themeClasses.buttonBg} p-0.5 rounded-full`}>
//                   <Star className="h-2.5 w-2.5" fill="white" />
//                 </div>
//               )}
//             </div>
            
//             <div className="flex-1 min-w-0">
//               <h3 className="font-medium text-gray-900 truncate text-sm">{emp.name}</h3>
//               <p className="text-xs text-gray-500">{emp.code}</p>
//               <div className="flex items-center gap-1 mt-0.5">
//                 <span className="px-1.5 py-0.5 bg-blue-100 text-blue-800 text-xs rounded-full">
//                   {emp.department?.slice(0, 3) || 'N/A'}
//                 </span>
//                 <span className="text-xs text-gray-600 truncate">{emp.position?.slice(0, 15)}</span>
//               </div>
//             </div>
//           </div>
          
//           <button 
//             className="p-1.5 hover:bg-gray-100 rounded-lg ml-1"
//             onClick={() => toggleRowExpand(emp.id)}
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
//             className="mt-3 pt-3 border-t border-gray-200 space-y-2"
//           >
//             <div className="grid grid-cols-2 gap-2 text-xs">
//               <div>
//                 <p className="text-gray-500">Email</p>
//                 <p className="font-medium truncate">{emp.email}</p>
//               </div>
//               <div>
//                 <p className="text-gray-500">Phone</p>
//                 <p className="font-medium">{emp.phone || 'N/A'}</p>
//               </div>
//               <div>
//                 <p className="text-gray-500">Badge ID</p>
//                 <p className="font-medium">{emp.badgeId || 'N/A'}</p>
//               </div>
//               <div>
//                 <p className="text-gray-500">Status</p>
//                 <p className="font-medium capitalize">{emp.status || 'N/A'}</p>
//               </div>
//             </div>
            
//             <div className="flex items-center justify-between pt-2">
//               <button
//                 onClick={() => handleViewProfile(emp.id)}
//                 className={`px-3 py-1.5 ${themeClasses.buttonBg} text-white rounded-lg text-xs font-medium flex items-center gap-1`}
//               >
//                 <Eye className="h-3 w-3" />
//                 View
//               </button>
//               <div className="flex items-center gap-1">
//                 <a href={`mailto:${emp.email}`} className="p-1.5 hover:bg-gray-100 rounded">
//                   <Mail className="h-4 w-4 text-gray-600" />
//                 </a>
//                 <a href={`tel:${emp.phone}`} className="p-1.5 hover:bg-gray-100 rounded">
//                   <Phone className="h-4 w-4 text-gray-600" />
//                 </a>
//               </div>
//             </div>
//           </motion.div>
//         )}
//       </div>
//     );
//   };

//   // Render employee row for tablet/desktop
//   const renderTableRow = (emp) => (
//     <tr
//       key={emp.id}
//       className="hover:bg-gray-50 transition cursor-pointer border-b border-gray-100"
//       onClick={() => !isMobile && handleViewProfile(emp.id)}
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
//             <div className={`w-8 h-8 rounded-full ${themeClasses.buttonBg} flex items-center justify-center text-white font-bold text-xs shadow`}>
//               {emp.name?.split(' ').map(n => n[0]).join('') || 'E'}
//             </div>
//             {emp.star && (
//               <div className={`absolute -top-1 -right-1 ${themeClasses.buttonBg} p-0.5 rounded-full`}>
//                 <Star className="h-2 w-2" fill="white" />
//               </div>
//             )}
//           </div>
//           <div>
//             <div className="font-medium text-gray-900 text-sm">{emp.name}</div>
//             <div className="text-xs text-gray-500">{emp.code}</div>
//           </div>
//         </div>
//       </td>
//       <td className="px-4 py-3 text-gray-700 text-sm">
//         <div className="truncate max-w-[150px]">{emp.email}</div>
//       </td>
//       <td className="px-4 py-3 text-gray-700 text-sm">{emp.phone || 'N/A'}</td>
//       <td className="px-4 py-3 text-gray-700 text-sm">{emp.badgeId || 'N/A'}</td>
//       <td className="px-4 py-3 text-gray-700 text-sm truncate max-w-[120px]">{emp.position || 'N/A'}</td>
//       <td className="px-4 py-3">
//         <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
//           {emp.department || 'N/A'}
//         </span>
//       </td>
//       <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
//         <div className="flex items-center gap-1">
//           <button
//             onClick={() => handleViewProfile(emp.id)}
//             className="p-1.5 hover:bg-gray-100 rounded"
//             title="View Profile"
//           >
//             <Eye className="h-4 w-4 text-gray-600" />
//           </button>
//           <button className="p-1.5 hover:bg-gray-100 rounded">
//             <MoreVertical className="h-4 w-4 text-gray-500" />
//           </button>
//         </div>
//       </td>
//     </tr>
//   );

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* HEADER */}
//       <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
//         <div className="px-4 py-4">
//           {/* Title and Stats */}
//           <div className="flex items-center justify-between mb-4">
//             <div className="flex items-center gap-3">
//               <div className={`p-2 rounded-lg ${themeClasses.buttonBg} bg-opacity-10`}>
//                 <Users className={`h-5 w-5 ${themeClasses.textColor}`} />
//               </div>
//               <div>
//                 <h1 className="text-xl font-bold text-gray-900">Employees</h1>
//                 <p className="text-sm text-gray-600">Total: {employees.length}</p>
//               </div>
//             </div>
            
//             <button
//               onClick={handleActionClick}
//               className={`px-4 py-2 ${themeClasses.buttonBg} text-white rounded-lg font-medium text-sm flex items-center gap-2 shadow-md`}
//             >
//               <Plus className="h-4 w-4" />
//               <span className="hidden sm:inline">Add Employee</span>
//               <span className="sm:hidden">Add</span>
//             </button>
//           </div>

//           {/* Search and Actions */}
//           <div className="flex flex-col sm:flex-row gap-3">
//             <div className="relative flex-1">
//               <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
//               <input
//                 type="text"
//                 placeholder="Search employees..."
//                 value={search}
//                 onChange={(e) => {
//                   dispatch(setSearch(e.target.value));
//                   handleSearchChange(e.target.value);
//                 }}
//                 className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//               />
//             </div>
            
//             <div className="flex gap-2">
//               <button
//                 onClick={() => setShowFilters(!showFilters)}
//                 className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2 text-sm"
//               >
//                 <Filter className="h-4 w-4" />
//                 <span className="hidden sm:inline">Filters</span>
//               </button>
              
//               {selected.length > 0 && (
//                 <button
//                   onClick={handleDeleteSelected}
//                   className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center gap-2 text-sm"
//                 >
//                   <Trash2 className="h-4 w-4" />
//                   <span className="hidden sm:inline">Delete ({selected.length})</span>
//                   <span className="sm:hidden">Del</span>
//                 </button>
//               )}
//             </div>
//           </div>

//           {/* Filters */}
//           {showFilters && (
//             <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-sm">
//                 <div>
//                   <label className="block text-xs font-medium text-gray-700 mb-1">Department</label>
//                   <select
//                     value={filters.department || ''}
//                     onChange={(e) => handleFilterChange('department', e.target.value)}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
//                   >
//                     <option value="">All</option>
//                     <option value="IT">IT</option>
//                     <option value="HR">HR</option>
//                     <option value="Sales">Sales</option>
//                     <option value="Marketing">Marketing</option>
//                   </select>
//                 </div>

//                 <div>
//                   <label className="block text-xs font-medium text-gray-700 mb-1">Status</label>
//                   <select
//                     value={filters.status || ''}
//                     onChange={(e) => handleFilterChange('status', e.target.value)}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
//                   >
//                     <option value="">All</option>
//                     <option value="active">Active</option>
//                     <option value="inactive">Inactive</option>
//                   </select>
//                 </div>

//                 <div>
//                   <label className="block text-xs font-medium text-gray-700 mb-1">Work Type</label>
//                   <select
//                     value={filters.workType || ''}
//                     onChange={(e) => handleFilterChange('workType', e.target.value)}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
//                   >
//                     <option value="">All</option>
//                     <option value="Permanent">Permanent</option>
//                     <option value="Contract">Contract</option>
//                   </select>
//                 </div>

//                 <div className="flex items-end gap-2">
//                   <button
//                     onClick={handleClearFilters}
//                     className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 text-sm"
//                   >
//                     Clear
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* SELECT ALL BAR */}
//       <div className="px-4 py-2 bg-gray-50 border-b border-gray-200 flex items-center justify-between text-sm">
//         <div className="flex items-center gap-4">
//           <button
//             onClick={handleSelectAll}
//             className="flex items-center gap-2 hover:bg-gray-200 p-1 rounded"
//           >
//             {selected.length === filteredEmployees.length && filteredEmployees.length > 0 ? (
//               <CheckSquare className={`h-4 w-4 ${themeClasses.textColor}`} />
//             ) : (
//               <Square className={`h-4 w-4 ${themeClasses.textColor}`} />
//             )}
//             <span className={`font-medium ${themeClasses.textColor}`}>
//               Select All ({filteredEmployees.length})
//             </span>
//           </button>
//         </div>
        
//         <div className="text-xs text-gray-600">
//           Showing {filteredEmployees.length} of {employees.length}
//         </div>
//       </div>

//       {/* EMPLOYEES TABLE */}
//       <div className="px-4 py-4">
//         {loading ? (
//           <div className="text-center py-12">
//             <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
//             <p className="mt-2 text-gray-600">Loading...</p>
//           </div>
//         ) : filteredEmployees.length === 0 ? (
//           <div className="text-center py-12">
//             <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
//             <h3 className="text-lg font-medium text-gray-900 mb-2">No employees found</h3>
//             <p className="text-gray-500 mb-6">Try adjusting your search or filters</p>
//             <button
//               onClick={handleActionClick}
//               className={`px-4 py-2 ${themeClasses.buttonBg} text-white rounded-lg font-medium text-sm`}
//             >
//               Add First Employee
//             </button>
//           </div>
//         ) : (
//           <>
//             {/* Mobile View */}
//             {isMobile && (
//               <div className="space-y-1">
//                 {filteredEmployees.slice(0, 20).map(renderMobileEmployeeRow)}
//               </div>
//             )}

//             {/* Desktop/Tablet View */}
//             {!isMobile && (
//               <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
//                 <div className="overflow-x-auto">
//                   <table className="min-w-full divide-y divide-gray-200">
//                     <thead className="bg-gray-50">
//                       <tr>
//                         <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600"></th>
//                         <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Employee</th>
//                         <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Email</th>
//                         <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Phone</th>
//                         <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Badge</th>
//                         <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Position</th>
//                         <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Department</th>
//                         <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Actions</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {filteredEmployees.slice(0, 20).map(renderTableRow)}
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//             )}

//             {/* Pagination */}
//             {filteredEmployees.length > 20 && (
//               <div className="mt-4 flex justify-center">
//                 <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm">
//                   Load More
//                 </button>
//               </div>
//             )}
//           </>
//         )}
//       </div>

//       {/* Add Employee Modal */}
//       <AnimatePresence>
//         {activeModal === 'addEmployee' && (
//           <AddModal onClose={closeModal} onAddEmployee={handleAddEmployee} />
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }


'use client';

import React, { useEffect, useCallback, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search, Filter, Plus, MoreVertical, Mail, Phone, Badge,
  CheckSquare, Square, Star, Trash2, Eye, Download, 
  ChevronDown, ChevronUp, AlertCircle, RefreshCw, UserPlus,
  Users, Briefcase, Building, Calendar, MapPin, Shield,
  FileSpreadsheet, FileText, Clipboard, CheckCircle, X,
  ChevronLeft, ChevronRight
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

// Import export libraries
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

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
  
  // Export states
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [exportFormat, setExportFormat] = useState('all');
  const exportMenuRef = useRef(null);

  // Close export menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (exportMenuRef.current && !exportMenuRef.current.contains(event.target)) {
        setShowExportMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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

  // Export Functions
  const exportToExcel = (format = 'xlsx', type = 'all') => {
    try {
      let dataToExport = [];
      
      if (type === 'selected' && selected.length > 0) {
        // Export selected employees
        dataToExport = employees.filter(emp => selected.includes(emp.id));
      } else if (type === 'filtered') {
        // Export filtered employees
        dataToExport = filteredEmployees;
      } else {
        // Export all employees
        dataToExport = employees;
      }

      if (dataToExport.length === 0) {
        alert('No data to export');
        return;
      }

      // Prepare data for Excel
      const excelData = dataToExport.map((emp, index) => ({
        'S.No': index + 1,
        'Employee ID': emp.code || 'N/A',
        'Employee Name': emp.name || 'N/A',
        'Email': emp.email || 'N/A',
        'Phone': emp.phone || 'N/A',
        'Badge ID': emp.badgeId || 'N/A',
        'Position': emp.position || 'N/A',
        'Department': emp.department || 'N/A',
        'Status': emp.status || 'N/A',
        'Work Type': emp.workType || 'N/A',
        'Joining Date': emp.joiningDate || 'N/A',
        'Reporting Manager': emp.manager || 'N/A',
        'Location': emp.location || 'N/A',
        'Is Active': emp.active ? 'Yes' : 'No'
      }));

      // Create worksheet
      const worksheet = XLSX.utils.json_to_sheet(excelData);
      
      // Create workbook
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Employees');
      
      // Generate Excel file
      const excelBuffer = XLSX.write(workbook, { 
        bookType: format === 'csv' ? 'csv' : 'xlsx', 
        type: 'array' 
      });
      
      // Create blob and download
      const blob = new Blob(
        [excelBuffer], 
        { 
          type: format === 'csv' 
            ? 'text/csv;charset=utf-8;' 
            : 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' 
        }
      );
      
      const date = new Date().toISOString().split('T')[0];
      const filename = `employees_${type}_${date}.${format === 'csv' ? 'csv' : 'xlsx'}`;
      saveAs(blob, filename);
      
      console.log(`${format.toUpperCase()} export completed successfully`);
      setShowExportMenu(false);
    } catch (error) {
      console.error('Error exporting to Excel:', error);
      alert('Error exporting data. Please try again.');
    }
  };

  const exportToPDF = (type = 'all') => {
    try {
      let dataToExport = [];
      
      if (type === 'selected' && selected.length > 0) {
        dataToExport = employees.filter(emp => selected.includes(emp.id));
      } else if (type === 'filtered') {
        dataToExport = filteredEmployees;
      } else {
        dataToExport = employees;
      }

      if (dataToExport.length === 0) {
        alert('No data to export');
        return;
      }

      // Create PDF document
      const doc = new jsPDF('landscape');
      
      // Add header
      doc.setFontSize(20);
      doc.text('Employee Directory Report', 14, 15);
      
      doc.setFontSize(12);
      doc.setTextColor(100);
      doc.text(`Report Type: ${type === 'selected' ? 'Selected Employees' : type === 'filtered' ? 'Filtered Employees' : 'All Employees'}`, 14, 25);
      doc.text(`Total Records: ${dataToExport.length}`, 14, 32);
      doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 39);
      
      // Prepare table data
      const tableData = dataToExport.map((emp, index) => [
        index + 1,
        emp.code || 'N/A',
        emp.name || 'N/A',
        emp.email || 'N/A',
        emp.phone || 'N/A',
        emp.department || 'N/A',
        emp.position || 'N/A',
        emp.status || 'N/A'
      ]);
      
      // Add table
      autoTable(doc, {
        head: [['#', 'Emp ID', 'Name', 'Email', 'Phone', 'Department', 'Position', 'Status']],
        body: tableData,
        startY: 45,
        styles: { fontSize: 8 },
        headStyles: { fillColor: [66, 66, 66] },
        columnStyles: {
          0: { cellWidth: 10 },
          1: { cellWidth: 20 },
          2: { cellWidth: 30 },
          3: { cellWidth: 40 },
          4: { cellWidth: 25 },
          5: { cellWidth: 25 },
          6: { cellWidth: 30 },
          7: { cellWidth: 20 }
        },
        margin: { left: 14 }
      });
      
      // Add footer
      const pageCount = doc.internal.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(10);
        doc.text(
          `Page ${i} of ${pageCount} • Employee Directory • Confidential`,
          doc.internal.pageSize.width / 2,
          doc.internal.pageSize.height - 10,
          { align: 'center' }
        );
      }
      
      // Save PDF
      const date = new Date().toISOString().split('T')[0];
      doc.save(`employees_${type}_${date}.pdf`);
      
      console.log('PDF export completed successfully');
      setShowExportMenu(false);
    } catch (error) {
      console.error('Error exporting to PDF:', error);
      alert('Error generating PDF. Please try again.');
    }
  };

  const handleExport = async (type = 'all', format = 'xlsx') => {
    try {
      setIsExporting(true);
      
      if (format === 'pdf') {
        exportToPDF(type);
      } else {
        exportToExcel(format, type);
      }
      
    } catch (error) {
      console.error('Export error:', error);
      alert('Error exporting employees. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

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
            
            <div className="flex items-center gap-2">
              {/* Export Dropdown */}
              <div className="relative" ref={exportMenuRef}>
                <button
                  onClick={() => setShowExportMenu(!showExportMenu)}
                  className={`px-4 py-2 ${themeClasses.lightBg} ${themeClasses.textColor} rounded-lg font-medium text-sm flex items-center gap-2 hover:opacity-90`}
                  disabled={isExporting}
                >
                  {isExporting ? (
                    <>
                      <RefreshCw className="h-4 w-4 animate-spin" />
                      <span className="hidden sm:inline">Exporting...</span>
                    </>
                  ) : (
                    <>
                      <Download className="h-4 w-4" />
                      <span className="hidden sm:inline">Export</span>
                      <ChevronDown className="h-4 w-4" />
                    </>
                  )}
                </button>
                
                {showExportMenu && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                    <div className="px-4 py-2 text-xs font-medium text-gray-500 border-b border-gray-100">
                      Export Options
                    </div>
                    
                    <div className="px-4 py-2 border-b border-gray-100">
                      <div className="text-xs font-medium text-gray-700 mb-2">Export Type:</div>
                      <div className="flex flex-wrap gap-1">
                        <button
                          onClick={() => setExportFormat('all')}
                          className={`px-3 py-1.5 text-xs rounded ${
                            exportFormat === 'all' 
                              ? `${themeClasses.buttonBg} text-white` 
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          All
                        </button>
                        <button
                          onClick={() => setExportFormat('filtered')}
                          className={`px-3 py-1.5 text-xs rounded ${
                            exportFormat === 'filtered' 
                              ? `${themeClasses.buttonBg} text-white` 
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          Filtered ({filteredEmployees.length})
                        </button>
                        <button
                          onClick={() => setExportFormat('selected')}
                          className={`px-3 py-1.5 text-xs rounded ${
                            exportFormat === 'selected' 
                              ? `${themeClasses.buttonBg} text-white` 
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                          disabled={selected.length === 0}
                        >
                          Selected ({selected.length})
                        </button>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => handleExport(exportFormat, 'xlsx')}
                      className="w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 flex items-center gap-2"
                    >
                      <FileSpreadsheet className="h-4 w-4 text-green-600" />
                      Export to Excel (.xlsx)
                    </button>
                    
                    <button
                      onClick={() => handleExport(exportFormat, 'csv')}
                      className="w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 flex items-center gap-2"
                    >
                      <FileText className="h-4 w-4 text-blue-600" />
                      Export to CSV (.csv)
                    </button>
                    
                    <button
                      onClick={() => handleExport(exportFormat, 'pdf')}
                      className="w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 flex items-center gap-2"
                    >
                      <FileText className="h-4 w-4 text-red-600" />
                      Export to PDF (.pdf)
                    </button>
                    
                    {selected.length > 0 && (
                      <div className="border-t border-gray-100 mt-2 pt-2">
                        <button
                          onClick={() => {
                            exportToExcel('xlsx', 'selected');
                            setShowExportMenu(false);
                          }}
                          className="w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 flex items-center gap-2 text-xs"
                        >
                          <Clipboard className="h-3.5 w-3.5" style={{ color: themeClasses.accent }} />
                          Quick Export Selected Only
                        </button>
                      </div>
                    )}
                  </div>
                )}
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
          
          {selected.length > 0 && (
            <span className="text-blue-600 font-medium">
              {selected.length} selected
            </span>
          )}
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
            <p className="mt-2 text-gray-600">Loading employees...</p>
          </div>
        ) : apiError ? (
          <div className="text-center py-12">
            <AlertCircle className="h-12 w-12 text-red-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Error Loading Data</h3>
            <p className="text-gray-500 mb-4">{apiError}</p>
            <button
              onClick={handleRetry}
              className={`px-4 py-2 ${themeClasses.buttonBg} text-white rounded-lg font-medium text-sm flex items-center gap-2 mx-auto`}
            >
              <RefreshCw className="h-4 w-4" />
              Retry
            </button>
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
              <div className="mt-4 flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  Showing 1-20 of {filteredEmployees.length}
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2 hover:bg-gray-100 rounded-lg">
                    <ChevronLeft className="h-4 w-4 text-gray-600" />
                  </button>
                  <button className={`px-3 py-1 ${themeClasses.buttonBg} text-white rounded-lg text-sm`}>
                    1
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-lg">
                    <ChevronRight className="h-4 w-4 text-gray-600" />
                  </button>
                </div>
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