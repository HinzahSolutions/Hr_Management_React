// 'use client';

// import React, { useEffect, useCallback } from 'react';
// import { useNavigate } from 'react-router-dom';
// import {
//   Search, Filter, Plus, MoreVertical, Mail, Phone, Badge, Briefcase,
//   CheckSquare, Square, Star, Trash2, Eye
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
//   addEmployee
// } from '../store/slices/employeeSlice';

// export default function Employee() {
//   const { theme } = useTheme();
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   // Get state from Redux store
//   const {
//     employees,
//     filteredEmployees,
//     selected,
//     filters,
//     search,
//     loading
//   } = useSelector((state) => state.employees);

//   const accent = theme?.accent || 'blue-600';
//   const buttonBg = `bg-${accent}`;
//   const buttonHover = `hover:bg-${theme?.accentHover || accent.replace('600', '700')}`;
//   const buttonActive = 'active:scale-95';
//   const textColor = theme?.textColor || `text-${accent}`;
//   const hoverBg = theme?.hoverBg || 'hover:bg-gray-100';
//   const borderColor = theme?.borderColor || `border-${accent}`;
//   const focusRing = `focus:ring-${accent.replace('600', '500')}/50`;

//   const [showFilters, setShowFilters] = React.useState(false);
//   const [activeModal, setActiveModal] = React.useState(null);

//   // Fetch employees on mount
//   useEffect(() => {
//     dispatch(fetchEmployees());
//   }, [dispatch]);

//   // Filter employees based on search and filters
//   const filteredEmployeesToDisplay = React.useMemo(() => {
//     if (!employees || employees.length === 0) return [];

//     let filtered = [...employees];

//     // Apply search
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

//     // Apply filters
//     if (filters.department) {
//       filtered = filtered.filter(emp =>
//         emp.department?.toLowerCase() === filters.department.toLowerCase()
//       );
//     }

//     if (filters.position) {
//       filtered = filtered.filter(emp =>
//         emp.position?.toLowerCase().includes(filters.position.toLowerCase())
//       );
//     }

//     if (filters.status) {
//       filtered = filtered.filter(emp =>
//         emp.status?.toLowerCase() === filters.status.toLowerCase()
//       );
//     }

//     if (filters.workType) {
//       filtered = filtered.filter(emp =>
//         emp.workType?.toLowerCase() === filters.workType.toLowerCase()
//       );
//     }

//     if (filters.startDate) {
//       const startDate = new Date(filters.startDate);
//       filtered = filtered.filter(emp => {
//         const empDate = new Date(emp.joinDate);
//         return empDate >= startDate;
//       });
//     }

//     if (filters.endDate) {
//       const endDate = new Date(filters.endDate);
//       filtered = filtered.filter(emp => {
//         const empDate = new Date(emp.joinDate);
//         return empDate <= endDate;
//       });
//     }

//     return filtered;
//   }, [employees, search, filters]);

//   const handleSearch = (e) => {
//     dispatch(setSearch(e.target.value));
//   };

//   const handleFilterChange = (filterName, value) => {
//     dispatch(setFilters({ [filterName]: value }));
//   };

//   const handleClearFilters = () => {
//     dispatch(clearFilters());
//     dispatch(setSearch(''));
//   };

//   const handleDeleteSelected = () => {
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

//   // Handle adding a new employee from AddModal
//   const handleAddEmployee = (employeeData) => {
//     dispatch(addEmployee(employeeData));
//     closeModal();
//   };

//   // Navigate to employee profile
//   const handleViewProfile = (employeeId) => {
//     navigate(`/employee/profile/${employeeId}`);
//   };

//   // Handle row click to view profile
//   const handleRowClick = (employeeId, e) => {
//     // Don't navigate if clicking on checkbox or action buttons
//     if (e.target.closest('input[type="checkbox"]') || e.target.closest('button')) {
//       return;
//     }
//     handleViewProfile(employeeId);
//   };

//   return (
//     <>
//       {/* HEADER */}
//       <div className="bg-white border-b border-gray-200 px-6 py-5">
//         <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
//           <div>
//             <h1 className="text-2xl font-bold text-gray-900">Employees</h1>
//             <p className="text-sm text-gray-600">Manage all employee records</p>
//             <p className="text-xs text-gray-500 mt-1">
//               Total: {employees.length} | Showing: {filteredEmployeesToDisplay.length} | Selected: {selected.length}
//             </p>
//           </div>
//           <div className="flex items-center gap-3">
//             <div className="relative">
//               <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
//               <input
//                 type="text"
//                 placeholder="Search employees..."
//                 value={search}
//                 onChange={handleSearch}
//                 className={`pl-10 pr-4 py-2.5 w-64 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 ${focusRing} focus:border-${accent}`}
//               />
//             </div>
//             <button
//               onClick={() => setShowFilters(!showFilters)}
//               className={`p-2.5 rounded-lg ${borderColor} border ${hoverBg} ${buttonActive}`}
//             >
//               <Filter className={`h-4 w-4 ${textColor}`} />
//             </button>
//             {selected.length > 0 && (
//               <button
//                 onClick={handleDeleteSelected}
//                 className={`px-5 py-2.5 bg-red-600 hover:bg-red-700 ${buttonActive} text-white rounded-lg font-medium text-sm flex items-center gap-2 shadow-md`}
//               >
//                 <Trash2 className="h-4 w-4" />
//                 Delete ({selected.length})
//               </button>
//             )}
//             <button
//               onClick={handleActionClick}
//               className={`px-5 py-2.5 ${buttonBg} ${buttonHover} ${buttonActive} text-white rounded-lg font-medium text-sm flex items-center gap-2 shadow-md`}
//             >
//               <Plus className="h-4 w-4" />
//               Create
//             </button>
//           </div>
//         </div>

//         {/* FILTERS */}
//         {showFilters && (
//           <div className="mt-5 p-5 bg-gray-50 rounded-xl border border-gray-200">
//             <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 text-sm">
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
//                   <option value="online">Online</option>
//                   <option value="offline">Offline</option>
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
//                   <option value="full-time">Full-time</option>
//                   <option value="part-time">Part-time</option>
//                   <option value="contract">Contract</option>
//                   <option value="remote">Remote</option>
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-xs font-medium text-gray-700 mb-1">Start Date</label>
//                 <input
//                   type="date"
//                   value={filters.startDate || ''}
//                   onChange={(e) => handleFilterChange('startDate', e.target.value)}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400"
//                 />
//               </div>

//               <div>
//                 <label className="block text-xs font-medium text-gray-700 mb-1">End Date</label>
//                 <input
//                   type="date"
//                   value={filters.endDate || ''}
//                   onChange={(e) => handleFilterChange('endDate', e.target.value)}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400"
//                 />
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

//       {/* STATUS + SELECT ALL */}
//       <div className="px-6 py-3 flex items-center justify-between text-xs text-gray-600">
//         <div className="flex items-center gap-6">
//           <span className="flex items-center gap-2">
//             <div className="w-2.5 h-2.5 bg-green-500 rounded-full"></div>
//             Online ({filteredEmployeesToDisplay.filter(e => e.status === 'online').length})
//           </span>
//           <span className="flex items-center gap-2">
//             <div className="w-2.5 h-2.5 bg-gray-400 rounded-full"></div>
//             Offline ({filteredEmployeesToDisplay.filter(e => e.status === 'offline').length})
//           </span>
//         </div>
//         <label className="flex items-center gap-2 cursor-pointer select-none">
//           <button
//             onClick={() => {
//               const allSelected = selected.length === filteredEmployeesToDisplay.length && filteredEmployeesToDisplay.length > 0;
//               if (allSelected) {
//                 // Deselect all
//                 filteredEmployeesToDisplay.forEach(emp => {
//                   if (selected.includes(emp.id)) {
//                     dispatch(toggleSelect(emp.id));
//                   }
//                 });
//               } else {
//                 // Select all filtered
//                 filteredEmployeesToDisplay.forEach(emp => {
//                   if (!selected.includes(emp.id)) {
//                     dispatch(toggleSelect(emp.id));
//                   }
//                 });
//               }
//             }}
//             className={`p-1 rounded ${hoverBg}`}
//           >
//             {selected.length === filteredEmployeesToDisplay.length && filteredEmployeesToDisplay.length > 0 ? (
//               <CheckSquare className={`h-4 w-4 ${textColor}`} />
//             ) : (
//               <Square className={`h-4 w-4 ${textColor}`} />
//             )}
//           </button>
//           <span className={`font-medium ${textColor}`}>
//             Select All ({filteredEmployeesToDisplay.length})
//           </span>
//         </label>
//       </div>

//       {/* COMPACT TABLE */}
//       <div className="px-6 pb-24 overflow-x-auto">
//         {loading ? (
//           <div className="text-center py-12">
//             <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
//             <p className="mt-2 text-gray-600">Loading employees...</p>
//           </div>
//         ) : filteredEmployeesToDisplay.length === 0 ? (
//           <div className="text-center py-12">
//             <p className="text-gray-500">No employees found. Try adjusting your search or filters.</p>
//           </div>
//         ) : (
//           <div className="inline-block min-w-full align-middle">
//             <table className="min-w-full divide-y divide-gray-200">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"></th>
//                   <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Employee</th>
//                   <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Email</th>
//                   <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Phone</th>
//                   <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Badge</th>
//                   <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Position</th>
//                   <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Department</th>
//                   <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"></th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200 text-sm">
//                 {filteredEmployeesToDisplay.map((emp) => (
//                   <tr
//                     key={emp.id}
//                     onClick={(e) => handleRowClick(emp.id, e)}
//                     className={`${emp.highlight ? 'bg-yellow-50' : ''} hover:bg-gray-50 transition cursor-pointer`}
//                   >
//                     <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
//                       <input
//                         type="checkbox"
//                         checked={selected.includes(emp.id)}
//                         onChange={() => dispatch(toggleSelect(emp.id))}
//                         className={`w-4 h-4 rounded border ${borderColor} ${textColor} focus:ring-2 ${focusRing}`}
//                       />
//                     </td>
//                     <td className="px-4 py-3">
//                       <div className="flex items-center gap-3">
//                         <div className="relative">
//                           <div className={`w-10 h-10 rounded-full ${buttonBg} flex items-center justify-center text-white font-bold text-sm shadow`}>
//                             {emp.name?.split(' ').map(n => n[0]).join('') || 'E'}
//                           </div>
//                           {emp.star && (
//                             <div className={`absolute -top-1 -right-1 ${buttonBg} p-0.5 rounded-full`}>
//                               <Star className="h-3 w-3" fill="white" />
//                             </div>
//                           )}
//                           <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${emp.status === 'online' ? 'bg-green-500' : 'bg-gray-400'}`} />
//                         </div>
//                         <div>
//                           <div className="font-medium text-gray-900">{emp.name}</div>
//                           <div className="text-xs text-gray-500">{emp.code}</div>
//                         </div>
//                       </div>
//                     </td>
//                     <td className="px-4 py-3 text-gray-700">{emp.email}</td>
//                     <td className="px-4 py-3 text-gray-700">{emp.phone}</td>
//                     <td className="px-4 py-3 font-medium text-gray-800">{emp.badgeId}</td>
//                     <td className="px-4 py-3 text-gray-700 max-w-48 truncate">{emp.position}</td>
//                     <td className="px-4 py-3 text-gray-700">
//                       <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
//                         {emp.department}
//                       </span>
//                     </td>
//                     <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
//                       <div className="flex items-center gap-1">
//                         <button
//                           onClick={() => handleViewProfile(emp.id)}
//                           className={`p-2 rounded-lg ${hoverBg} ${buttonActive}`}
//                           title="View Profile"
//                         >
//                           <Eye className={`h-4 w-4 ${textColor}`} />
//                         </button>
//                         <button className={`p-2 rounded-lg ${hoverBg} ${buttonActive}`}>
//                           <Mail className={`h-4 w-4 ${textColor}`} />
//                         </button>
//                         <button className={`p-2 rounded-lg ${hoverBg} ${buttonActive}`}>
//                           <Phone className={`h-4 w-4 ${textColor}`} />
//                         </button>
//                         <button className={`p-2 rounded-lg ${hoverBg} ${buttonActive}`}>
//                           <Badge className={`h-4 w-4 ${textColor}`} />
//                         </button>
//                         <button className="p-2 rounded-lg hover:bg-gray-100">
//                           <MoreVertical className="h-4 w-4 text-gray-500" />
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
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

import React, { useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search, Filter, Plus, MoreVertical, Mail, Phone, Badge, Briefcase,
  CheckSquare, Square, Star, Trash2, Eye
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
  addEmployee
} from '../store/slices/employeeSlice';

export default function Employee() {
  const { theme } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get state from Redux store
  const {
    employees,
    filteredEmployees,
    selected,
    filters,
    search,
    loading
  } = useSelector((state) => state.employees);

  const accent = theme?.accent || 'blue-600';
  const buttonBg = `bg-${accent}`;
  const buttonHover = `hover:bg-${theme?.accentHover || accent.replace('600', '700')}`;
  const buttonActive = 'active:scale-95';
  const textColor = theme?.textColor || `text-${accent}`;
  const hoverBg = theme?.hoverBg || 'hover:bg-gray-100';
  const borderColor = theme?.borderColor || `border-${accent}`;
  const focusRing = `focus:ring-${accent.replace('600', '500')}/50`;

  const [showFilters, setShowFilters] = React.useState(false);
  const [activeModal, setActiveModal] = React.useState(null);

  // Fetch employees on mount
  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  // Filter employees based on search and filters
  const filteredEmployeesToDisplay = React.useMemo(() => {
    if (!employees || employees.length === 0) return [];

    let filtered = [...employees];

    // Apply search
    if (search) {
      const term = search.toLowerCase();
      filtered = filtered.filter(emp =>
        emp.name?.toLowerCase().includes(term) ||
        emp.email?.toLowerCase().includes(term) ||
        emp.position?.toLowerCase().includes(term) ||
        emp.badgeId?.toLowerCase().includes(term) ||
        emp.department?.toLowerCase().includes(term)
      );
    }

    // Apply filters
    if (filters.department) {
      filtered = filtered.filter(emp =>
        emp.department?.toLowerCase() === filters.department.toLowerCase()
      );
    }

    if (filters.position) {
      filtered = filtered.filter(emp =>
        emp.position?.toLowerCase().includes(filters.position.toLowerCase())
      );
    }

    if (filters.status) {
      filtered = filtered.filter(emp =>
        emp.status?.toLowerCase() === filters.status.toLowerCase()
      );
    }

    if (filters.workType) {
      filtered = filtered.filter(emp =>
        emp.workType?.toLowerCase() === filters.workType.toLowerCase()
      );
    }

    if (filters.startDate) {
      const startDate = new Date(filters.startDate);
      filtered = filtered.filter(emp => {
        const empDate = new Date(emp.joinDate);
        return empDate >= startDate;
      });
    }

    if (filters.endDate) {
      const endDate = new Date(filters.endDate);
      filtered = filtered.filter(emp => {
        const empDate = new Date(emp.joinDate);
        return empDate <= endDate;
      });
    }

    return filtered;
  }, [employees, search, filters]);

  const handleSearch = (e) => {
    dispatch(setSearch(e.target.value));
  };

  const handleFilterChange = (filterName, value) => {
    dispatch(setFilters({ [filterName]: value }));
  };

  const handleClearFilters = () => {
    dispatch(clearFilters());
    dispatch(setSearch(''));
  };

  const handleDeleteSelected = () => {
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

  // Handle adding a new employee from AddModal
  const handleAddEmployee = (employeeData) => {
    dispatch(addEmployee(employeeData));
    closeModal();
  };

  // Navigate to employee profile
  const handleViewProfile = (employeeId) => {
    navigate(`/employee/profile/${employeeId}`);
  };

  // Handle row click to view profile
  const handleRowClick = (employeeId, e) => {
    // Don't navigate if clicking on checkbox or action buttons
    if (e.target.closest('input[type="checkbox"]') || e.target.closest('button')) {
      return;
    }
    handleViewProfile(employeeId);
  };

  return (
    <>
      {/* HEADER */}
      <div className="bg-white border-b border-gray-200 px-6 py-5">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Employees</h1>
            <p className="text-sm text-gray-600">Manage all employee records</p>
            <p className="text-xs text-gray-500 mt-1">
              Total: {employees.length} | Showing: {filteredEmployeesToDisplay.length} | Selected: {selected.length}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search employees..."
                value={search}
                onChange={handleSearch}
                className={`pl-10 pr-4 py-2.5 w-64 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 ${focusRing} focus:border-${accent}`}
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`p-2.5 rounded-lg ${borderColor} border ${hoverBg} ${buttonActive}`}
            >
              <Filter className={`h-4 w-4 ${textColor}`} />
            </button>
            {selected.length > 0 && (
              <button
                onClick={handleDeleteSelected}
                className={`px-5 py-2.5 bg-red-600 hover:bg-red-700 ${buttonActive} text-white rounded-lg font-medium text-sm flex items-center gap-2 shadow-md`}
              >
                <Trash2 className="h-4 w-4" />
                Delete ({selected.length})
              </button>
            )}
            <button
              onClick={handleActionClick}
              className={`px-5 py-2.5 ${buttonBg} ${buttonHover} ${buttonActive} text-white rounded-lg font-medium text-sm flex items-center gap-2 shadow-md`}
            >
              <Plus className="h-4 w-4" />
              Create
            </button>
          </div>
        </div>

        {/* FILTERS */}
        {showFilters && (
          <div className="mt-5 p-5 bg-gray-50 rounded-xl border border-gray-200">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 text-sm">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Department</label>
                <select
                  value={filters.department || ''}
                  onChange={(e) => handleFilterChange('department', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400"
                >
                  <option value="">All Departments</option>
                  <option value="IT">Information Technology</option>
                  <option value="HR">Human Resources</option>
                  <option value="Sales">Sales</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Finance">Finance</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Position</label>
                <input
                  type="text"
                  placeholder="Position"
                  value={filters.position || ''}
                  onChange={(e) => handleFilterChange('position', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Status</label>
                <select
                  value={filters.status || ''}
                  onChange={(e) => handleFilterChange('status', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400"
                >
                  <option value="">All Status</option>
                  <option value="online">Online</option>
                  <option value="offline">Offline</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Work Type</label>
                <select
                  value={filters.workType || ''}
                  onChange={(e) => handleFilterChange('workType', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400"
                >
                  <option value="">All Types</option>
                  <option value="full-time">Full-time</option>
                  <option value="part-time">Part-time</option>
                  <option value="contract">Contract</option>
                  <option value="remote">Remote</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Start Date</label>
                <input
                  type="date"
                  value={filters.startDate || ''}
                  onChange={(e) => handleFilterChange('startDate', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">End Date</label>
                <input
                  type="date"
                  value={filters.endDate || ''}
                  onChange={(e) => handleFilterChange('endDate', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400"
                />
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={handleClearFilters}
                className="px-5 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium text-sm hover:bg-gray-300"
              >
                Clear All
              </button>
            </div>
          </div>
        )}
      </div>

      {/* STATUS + SELECT ALL */}
      <div className="px-6 py-3 flex items-center justify-between text-xs text-gray-600">
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 bg-green-500 rounded-full"></div>
            Online ({filteredEmployeesToDisplay.filter(e => e.status === 'online').length})
          </span>
          <span className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 bg-gray-400 rounded-full"></div>
            Offline ({filteredEmployeesToDisplay.filter(e => e.status === 'offline').length})
          </span>
        </div>
        <label className="flex items-center gap-2 cursor-pointer select-none">
          <button
            onClick={() => {
              const allSelected = selected.length === filteredEmployeesToDisplay.length && filteredEmployeesToDisplay.length > 0;
              if (allSelected) {
                // Deselect all
                filteredEmployeesToDisplay.forEach(emp => {
                  if (selected.includes(emp.id)) {
                    dispatch(toggleSelect(emp.id));
                  }
                });
              } else {
                // Select all filtered
                filteredEmployeesToDisplay.forEach(emp => {
                  if (!selected.includes(emp.id)) {
                    dispatch(toggleSelect(emp.id));
                  }
                });
              }
            }}
            className={`p-1 rounded ${hoverBg}`}
          >
            {selected.length === filteredEmployeesToDisplay.length && filteredEmployeesToDisplay.length > 0 ? (
              <CheckSquare className={`h-4 w-4 ${textColor}`} />
            ) : (
              <Square className={`h-4 w-4 ${textColor}`} />
            )}
          </button>
          <span className={`font-medium ${textColor}`}>
            Select All ({filteredEmployeesToDisplay.length})
          </span>
        </label>
      </div>

      {/* COMPACT TABLE */}
      <div className="px-6 pb-24 overflow-x-auto">
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="mt-2 text-gray-600">Loading employees...</p>
          </div>
        ) : filteredEmployeesToDisplay.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No employees found. Try adjusting your search or filters.</p>
          </div>
        ) : (
          <div className="inline-block min-w-full align-middle">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"></th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Employee</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Email</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Phone</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Badge</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Position</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Department</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"></th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200 text-sm">
                {filteredEmployeesToDisplay.map((emp) => (
                  <tr
                    key={emp.id}
                    onClick={(e) => handleRowClick(emp.id, e)}
                    className={`${emp.highlight ? 'bg-yellow-50' : ''} hover:bg-gray-50 transition cursor-pointer`}
                  >
                    <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                      <input
                        type="checkbox"
                        checked={selected.includes(emp.id)}
                        onChange={() => dispatch(toggleSelect(emp.id))}
                        className={`w-4 h-4 rounded border ${borderColor} ${textColor} focus:ring-2 ${focusRing}`}
                      />
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <div className={`w-10 h-10 rounded-full ${buttonBg} flex items-center justify-center text-white font-bold text-sm shadow`}>
                            {emp.name?.split(' ').map(n => n[0]).join('') || 'E'}
                          </div>
                          {emp.star && (
                            <div className={`absolute -top-1 -right-1 ${buttonBg} p-0.5 rounded-full`}>
                              <Star className="h-3 w-3" fill="white" />
                            </div>
                          )}
                          <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${emp.status === 'online' ? 'bg-green-500' : 'bg-gray-400'}`} />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{emp.name}</div>
                          <div className="text-xs text-gray-500">{emp.code}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-700">{emp.email}</td>
                    <td className="px-4 py-3 text-gray-700">{emp.phone}</td>
                    <td className="px-4 py-3 font-medium text-gray-800">{emp.badgeId}</td>
                    <td className="px-4 py-3 text-gray-700 max-w-48 truncate">{emp.position}</td>
                    <td className="px-4 py-3 text-gray-700">
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                        {emp.department}
                      </span>
                    </td>
                    <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleViewProfile(emp.id)}
                          className={`p-2 rounded-lg ${hoverBg} ${buttonActive}`}
                          title="View Profile"
                        >
                          <Eye className={`h-4 w-4 ${textColor}`} />
                        </button>
                        <button className={`p-2 rounded-lg ${hoverBg} ${buttonActive}`}>
                          <Mail className={`h-4 w-4 ${textColor}`} />
                        </button>
                        <button className={`p-2 rounded-lg ${hoverBg} ${buttonActive}`}>
                          <Phone className={`h-4 w-4 ${textColor}`} />
                        </button>
                        <button className={`p-2 rounded-lg ${hoverBg} ${buttonActive}`}>
                          <Badge className={`h-4 w-4 ${textColor}`} />
                        </button>
                        <button className="p-2 rounded-lg hover:bg-gray-100">
                          <MoreVertical className="h-4 w-4 text-gray-500" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <AnimatePresence>
        {activeModal === 'addEmployee' && (
          <AddModal onClose={closeModal} onAddEmployee={handleAddEmployee} />
        )}
      </AnimatePresence>
    </>
  );
}