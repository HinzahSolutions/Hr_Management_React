'use client';

import React, { useEffect, useCallback, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search, Filter, Plus, MoreVertical, Mail, Phone, Badge,
  CheckSquare, Square, Star, Trash2, Eye, Download, 
  ChevronDown, ChevronUp, AlertCircle, RefreshCw, UserPlus,
  Users, Briefcase, Building, Calendar, MapPin, Shield,
  FileSpreadsheet, FileText, Clipboard, CheckCircle, X,
  ChevronLeft, ChevronRight, AlertTriangle, User
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
import toast from 'react-hot-toast';

// Import export libraries
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

// API Configuration
const API_BASE_URL_SERVER = import.meta.env.VITE_API_BASE_URL_SERVER || "https://hr.hinzah.com";

export default function Employee() {
  const { theme, getThemeClasses } = useTheme();
  const themeClasses = getThemeClasses();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
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

  // Helper function to get theme gradient
  const getThemeGradient = () => {
    return `bg-gradient-to-r from-${themeClasses.accentBase}-500 to-${themeClasses.accentBase}-600`;
  };

  // Helper function to get hover gradient
  const getHoverGradient = () => {
    return `hover:from-${themeClasses.accentBase}-600 hover:to-${themeClasses.accentBase}-700`;
  };

  // Helper function to get theme ring
  const getThemeRing = () => {
    return `focus:ring-${themeClasses.accentBase}-500`;
  };

  // Helper function to get theme border
  const getThemeBorder = () => {
    return `border-${themeClasses.accentBase}-500`;
  };

  // Helper function to get theme text
  const getThemeText = () => {
    return `text-${themeClasses.accentBase}-600`;
  };

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

  // Delete modal state
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

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
          toast.error('Failed to load employees');
        } else {
          setApiError(null);
        }
      } catch (error) {
        setApiError(error.message);
        toast.error('Error loading employees');
      }
    };

    loadEmployees();
  }, [dispatch, retryCount]);

  // DELETE API Function
  const deleteEmployeeAPI = async (employeeId) => {
    try {
      const token = localStorage.getItem('token') || localStorage.getItem('authToken');
      const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
      const companyCode = currentUser.company_code || currentUser.companyId;
      
      if (!companyCode) {
        throw new Error('Company code not found');
      }

      const response = await fetch(`${API_BASE_URL_SERVER}/api/company/${companyCode}/employee/${employeeId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error deleting employee:', error);
      throw error;
    }
  };

  // Export Functions
  const exportToExcel = (format = 'xlsx', type = 'all') => {
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
        toast.error('No data to export');
        return;
      }

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

      const worksheet = XLSX.utils.json_to_sheet(excelData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Employees');
      
      const excelBuffer = XLSX.write(workbook, { 
        bookType: format === 'csv' ? 'csv' : 'xlsx', 
        type: 'array' 
      });
      
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
      
      toast.success(`${format.toUpperCase()} export completed`);
      setShowExportMenu(false);
    } catch (error) {
      console.error('Error exporting to Excel:', error);
      toast.error('Error exporting data. Please try again.');
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
        toast.error('No data to export');
        return;
      }

      const doc = new jsPDF('landscape');
      
      doc.setFontSize(20);
      doc.text('Employee Directory Report', 14, 15);
      
      doc.setFontSize(12);
      doc.setTextColor(100);
      doc.text(`Report Type: ${type === 'selected' ? 'Selected Employees' : type === 'filtered' ? 'Filtered Employees' : 'All Employees'}`, 14, 25);
      doc.text(`Total Records: ${dataToExport.length}`, 14, 32);
      doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 39);
      
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
      
      const date = new Date().toISOString().split('T')[0];
      doc.save(`employees_${type}_${date}.pdf`);
      
      toast.success('PDF export completed');
      setShowExportMenu(false);
    } catch (error) {
      console.error('Error exporting to PDF:', error);
      toast.error('Error generating PDF. Please try again.');
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
      toast.error('Error exporting employees. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  // Debounced search
  const handleSearchChange = useCallback(
    (value) => {
      const timeoutId = setTimeout(() => {
        dispatch(setSearch(value));
        if (value.length >= 2 || value.length === 0) {
          const hasActiveFilters = Object.values(filters).some(val => val !== '');
          
          if (hasActiveFilters) {
            dispatch(searchEmployees({ searchTerm: value, filters }));
          } else {
            dispatch(searchEmployees({ searchTerm: value }));
          }
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
    
    const hasActiveFilters = Object.values(newFilters).some(val => val !== '');
    
    if (hasActiveFilters) {
      dispatch(filterEmployees(newFilters));
    } else {
      dispatch(fetchEmployees());
    }
  };

  // Clear all filters
  const handleClearFilters = () => {
    dispatch(clearFilters());
    dispatch(setSearch(''));
    dispatch(fetchEmployees());
    toast.success('Filters cleared');
  };

  // Refresh button handler
  const handleRefresh = async () => {
    try {
      await dispatch(fetchEmployees());
      toast.success('Employee list refreshed');
    } catch (error) {
      toast.error('Failed to refresh employee list');
    }
  };

  const handleRetry = () => {
    setRetryCount(prev => prev + 1);
    setApiError(null);
  };

  // Handle single employee delete
  const handleDeleteEmployee = async () => {
    if (!employeeToDelete) return;

    try {
      setIsDeleting(true);
      
      // Call the delete API
      await deleteEmployeeAPI(employeeToDelete.id);
      
      // Remove from Redux state
      await dispatch(deleteEmployees([employeeToDelete.id]));
      
      toast.success('Employee deleted successfully!');
      setDeleteModalOpen(false);
      setEmployeeToDelete(null);
      
    } catch (error) {
      console.error('Error deleting employee:', error);
      toast.error(error.message || 'Failed to delete employee');
    } finally {
      setIsDeleting(false);
    }
  };

  // Handle bulk delete
  const handleDeleteSelected = async () => {
    if (selected.length === 0) {
      toast.error('Please select employees to delete');
      return;
    }

    if (window.confirm(`Are you sure you want to delete ${selected.length} selected employee(s)?`)) {
      try {
        setIsDeleting(true);
        
        // Delete each selected employee via API
        for (const employeeId of selected) {
          await deleteEmployeeAPI(employeeId);
        }
        
        // Remove from Redux state
        await dispatch(deleteEmployees(selected));
        
        toast.success(`${selected.length} employee(s) deleted successfully`);
        
      } catch (error) {
        console.error('Error deleting employees:', error);
        toast.error('Failed to delete employees');
      } finally {
        setIsDeleting(false);
      }
    }
  };

  const handleActionClick = () => {
    setActiveModal('addEmployee');
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  // Open delete modal for single employee
  const openDeleteModal = (employee) => {
    setEmployeeToDelete(employee);
    setDeleteModalOpen(true);
  };

  // Handle adding a new employee
  const handleAddEmployee = async (employeeData) => {
    try {
      const result = await dispatch(addEmployee(employeeData));
      if (addEmployee.fulfilled.match(result)) {
        toast.success('Employee added successfully!');
        closeModal();
        
        await dispatch(fetchEmployees());
        
        const hasActiveFilters = Object.values(filters).some(val => val !== '');
        if (hasActiveFilters) {
          dispatch(filterEmployees(filters));
        }
        
      } else {
        throw new Error(result.error?.message || 'Failed to add employee');
      }
    } catch (error) {
      toast.error(`Error adding employee: ${error.message}`);
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
              className={`w-4 h-4 rounded border ${getThemeBorder()} ${getThemeText()} focus:ring-2 ${getThemeRing()} mt-1`}
            />
            
            <div className="relative">
              <div className={`w-10 h-10 rounded-full ${getThemeGradient()} flex items-center justify-center text-white font-bold text-sm shadow`}>
                {emp.name?.split(' ').map(n => n[0]).join('') || 'E'}
              </div>
              {emp.star && (
                <div className={`absolute -top-1 -right-1 ${getThemeGradient()} p-0.5 rounded-full`}>
                  <Star className="h-2.5 w-2.5" fill="white" />
                </div>
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-gray-900 truncate text-sm">{emp.name}</h3>
              <p className="text-xs text-gray-500">{emp.code}</p>
              <div className="flex items-center gap-1 mt-0.5">
                <span className={`px-1.5 py-0.5 bg-${themeClasses.accentBase}-100 ${getThemeText()} text-xs rounded-full`}>
                  {emp.department?.slice(0, 3) || 'N/A'}
                </span>
                <span className="text-xs text-gray-600 truncate">{emp.position?.slice(0, 15)}</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-1">
            <button
              onClick={() => openDeleteModal(emp)}
              className="p-1.5 hover:bg-red-50 text-red-600 rounded-lg"
              title="Delete"
            >
              <Trash2 className="h-4 w-4" />
            </button>
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
                className={`px-3 py-1.5 ${getThemeGradient()} text-white rounded-lg text-xs font-medium flex items-center gap-1 ${getHoverGradient()}`}
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
          className={`w-4 h-4 rounded border ${getThemeBorder()} ${getThemeText()} focus:ring-2 ${getThemeRing()}`}
        />
      </td>
      <td className="px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className={`w-8 h-8 rounded-full ${getThemeGradient()} flex items-center justify-center text-white font-bold text-xs shadow`}>
              {emp.name?.split(' ').map(n => n[0]).join('') || 'E'}
            </div>
            {emp.star && (
              <div className={`absolute -top-1 -right-1 ${getThemeGradient()} p-0.5 rounded-full`}>
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
        <span className={`px-2 py-1 bg-${themeClasses.accentBase}-100 ${getThemeText()} text-xs rounded-full`}>
          {emp.department || 'N/A'}
        </span>
      </td>
      <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center gap-1">
          <button
            onClick={() => handleViewProfile(emp.id)}
            className={`p-1.5 hover:bg-${themeClasses.accentBase}-50 rounded ${getThemeText()}`}
            title="View Profile"
          >
            <Eye className="h-4 w-4" />
          </button>
          <button
            onClick={() => openDeleteModal(emp)}
            className="p-1.5 hover:bg-red-50 text-red-600 rounded"
            title="Delete"
          >
            <Trash2 className="h-4 w-4" />
          </button>
          <button className={`p-1.5 hover:bg-${themeClasses.accentBase}-50 rounded ${getThemeText()}`}>
            <MoreVertical className="h-4 w-4" />
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
              <div className={`p-2 rounded-lg bg-${themeClasses.accentBase}-100 ${getThemeText()}`}>
                <Users className={`h-5 w-5`} />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Employees</h1>
                <p className="text-sm text-gray-600">Total: {employees.length} | Filtered: {filteredEmployees.length}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              {/* Refresh Button */}
              <button
                onClick={handleRefresh}
                className={`px-3 py-2 bg-${themeClasses.accentBase}-100 ${getThemeText()} hover:bg-${themeClasses.accentBase}-200 rounded-lg font-medium text-sm flex items-center gap-2 border ${getThemeBorder()}`}
                disabled={loading}
              >
                <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                <span className="hidden sm:inline">
                  {loading ? 'Refreshing...' : 'Refresh'}
                </span>
              </button>
              
              {/* Export Dropdown */}
              <div className="relative" ref={exportMenuRef}>
                <button
                  onClick={() => setShowExportMenu(!showExportMenu)}
                  className={`px-4 py-2 ${getThemeGradient()} text-white rounded-lg font-medium text-sm flex items-center gap-2 ${getHoverGradient()} transition-all`}
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
                              ? `${getThemeGradient()} text-white` 
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          All
                        </button>
                        <button
                          onClick={() => setExportFormat('filtered')}
                          className={`px-3 py-1.5 text-xs rounded ${
                            exportFormat === 'filtered' 
                              ? `${getThemeGradient()} text-white` 
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          Filtered ({filteredEmployees.length})
                        </button>
                        <button
                          onClick={() => setExportFormat('selected')}
                          className={`px-3 py-1.5 text-xs rounded ${
                            exportFormat === 'selected' 
                              ? `${getThemeGradient()} text-white` 
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
                className={`px-4 py-2 ${getThemeGradient()} text-white rounded-lg font-medium text-sm flex items-center gap-2 shadow-md ${getHoverGradient()}`}
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
                className={`pl-10 pr-4 py-2 w-full rounded-lg border ${getThemeBorder()} text-sm focus:outline-none focus:ring-2 ${getThemeRing()} focus:border-transparent`}
              />
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`px-3 py-2 border ${getThemeBorder()} rounded-lg hover:bg-${themeClasses.accentBase}-50 flex items-center gap-2 text-sm ${getThemeText()}`}
              >
                <Filter className="h-4 w-4" />
                <span className="hidden sm:inline">Filters</span>
                {Object.values(filters).some(val => val !== '') && (
                  <span className="bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                    Active
                  </span>
                )}
              </button>
              
              {selected.length > 0 && (
                <button
                  onClick={handleDeleteSelected}
                  disabled={isDeleting}
                  className="px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg flex items-center gap-2 text-sm disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isDeleting ? (
                    <RefreshCw className="h-4 w-4 animate-spin" />
                  ) : (
                    <Trash2 className="h-4 w-4" />
                  )}
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
                    className={`w-full px-3 py-2 border ${getThemeBorder()} rounded-lg focus:outline-none focus:ring-2 ${getThemeRing()} focus:border-transparent`}
                  >
                    <option value="">All Departments</option>
                    <option value="IT">IT</option>
                    <option value="HR">HR</option>
                    <option value="Sales">Sales</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Finance">Finance</option>
                    <option value="Design">Design</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Status</label>
                  <select
                    value={filters.status || ''}
                    onChange={(e) => handleFilterChange('status', e.target.value)}
                    className={`w-full px-3 py-2 border ${getThemeBorder()} rounded-lg focus:outline-none focus:ring-2 ${getThemeRing()} focus:border-transparent`}
                  >
                    <option value="">All Status</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="on leave">On Leave</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Work Type</label>
                  <select
                    value={filters.workType || ''}
                    onChange={(e) => handleFilterChange('workType', e.target.value)}
                    className={`w-full px-3 py-2 border ${getThemeBorder()} rounded-lg focus:outline-none focus:ring-2 ${getThemeRing()} focus:border-transparent`}
                  >
                    <option value="">All Types</option>
                    <option value="Permanent">Permanent</option>
                    <option value="Contract">Contract</option>
                    <option value="Intern">Intern</option>
                    <option value="Remote">Remote</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Position</label>
                  <select
                    value={filters.position || ''}
                    onChange={(e) => handleFilterChange('position', e.target.value)}
                    className={`w-full px-3 py-2 border ${getThemeBorder()} rounded-lg focus:outline-none focus:ring-2 ${getThemeRing()} focus:border-transparent`}
                  >
                    <option value="">All Positions</option>
                    <option value="Developer">Developer</option>
                    <option value="Manager">Manager</option>
                    <option value="Designer">Designer</option>
                    <option value="Analyst">Analyst</option>
                  </select>
                </div>
                
                <div className="col-span-2 flex items-end gap-2">
                  <button
                    onClick={handleClearFilters}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 text-sm flex-1"
                  >
                    Clear All Filters
                  </button>
                  <button
                    onClick={() => setShowFilters(false)}
                    className={`px-4 py-2 ${getThemeGradient()} text-white rounded-lg ${getHoverGradient()} text-sm flex-1`}
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
              
              {/* Active filters summary */}
              {Object.values(filters).some(val => val !== '') && (
                <div className="mt-3 pt-3 border-t border-gray-200">
                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <span className="font-medium">Active Filters:</span>
                    {Object.entries(filters)
                      .filter(([_, value]) => value !== '')
                      .map(([key, value]) => (
                        <span 
                          key={key} 
                          className={`px-2 py-1 bg-${themeClasses.accentBase}-100 ${getThemeText()} rounded-full capitalize`}
                        >
                          {key}: {value}
                        </span>
                      ))
                    }
                  </div>
                </div>
              )}
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
              <CheckSquare className={`h-4 w-4 ${getThemeText()}`} />
            ) : (
              <Square className={`h-4 w-4 ${getThemeText()}`} />
            )}
            <span className={`font-medium ${getThemeText()}`}>
              Select All ({filteredEmployees.length})
            </span>
          </button>
          
          {selected.length > 0 && (
            <span className={`${getThemeText()} font-medium`}>
              {selected.length} selected
            </span>
          )}
        </div>
        
        <div className="text-xs text-gray-600 flex items-center gap-4">
          <span>Showing {filteredEmployees.length} of {employees.length}</span>
          {loading && (
            <span className="flex items-center gap-1">
              <RefreshCw className="h-3 w-3 animate-spin" />
              Updating...
            </span>
          )}
        </div>
      </div>

      {/* EMPLOYEES TABLE */}
      <div className="px-4 py-4">
        {loading && employees.length === 0 ? (
          <div className="text-center py-12">
            <div className={`inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-${themeClasses.accentBase}-600`}></div>
            <p className="mt-2 text-gray-600">Loading employees...</p>
          </div>
        ) : apiError ? (
          <div className="text-center py-12">
            <AlertCircle className="h-12 w-12 text-red-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Error Loading Data</h3>
            <p className="text-gray-500 mb-4">{apiError}</p>
            <button
              onClick={handleRetry}
              className={`px-4 py-2 ${getThemeGradient()} text-white rounded-lg font-medium text-sm flex items-center gap-2 mx-auto ${getHoverGradient()}`}
            >
              <RefreshCw className="h-4 w-4" />
              Retry
            </button>
          </div>
        ) : filteredEmployees.length === 0 ? (
          <div className="text-center py-12">
            <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {Object.values(filters).some(val => val !== '') || search 
                ? 'No employees match your filters' 
                : 'No employees found'}
            </h3>
            <p className="text-gray-500 mb-6">
              {Object.values(filters).some(val => val !== '') || search 
                ? 'Try adjusting your search or filters' 
                : 'Add your first employee to get started'}
            </p>
            <button
              onClick={handleActionClick}
              className={`px-4 py-2 ${getThemeGradient()} text-white rounded-lg font-medium text-sm ${getHoverGradient()}`}
            >
              Add Employee
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
                  <button className={`p-2 hover:bg-${themeClasses.accentBase}-50 rounded-lg ${getThemeText()}`}>
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button className={`px-3 py-1 ${getThemeGradient()} text-white rounded-lg text-sm ${getHoverGradient()}`}>
                    1
                  </button>
                  <button className={`p-2 hover:bg-${themeClasses.accentBase}-50 rounded-lg ${getThemeText()}`}>
                    <ChevronRight className="h-4 w-4" />
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

      {/* DELETE EMPLOYEE MODAL */}
      <AnimatePresence>
        {deleteModalOpen && employeeToDelete && (
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-full bg-red-100 dark:bg-red-900/30">
                        <AlertTriangle className="h-6 w-6 text-red-600 dark:text-red-400" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                          Delete Employee
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                          Confirm employee deletion
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setDeleteModalOpen(false);
                        setEmployeeToDelete(null);
                      }}
                      className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 transition-colors p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    <div className={`bg-${themeClasses.accentBase}-50 dark:bg-${themeClasses.accentBase}-900/20 border border-${themeClasses.accentBase}-200 dark:border-${themeClasses.accentBase}-800 rounded-xl p-4`}>
                      <div className="flex items-center gap-3">
                        <div className={`h-12 w-12 flex items-center justify-center rounded-xl ${getThemeGradient()}`}>
                          <User className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900 dark:text-white">{employeeToDelete.name}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {employeeToDelete.code} • {employeeToDelete.position}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Email</span>
                        <span className="font-medium text-gray-900 dark:text-white">{employeeToDelete.email}</span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Department</span>
                        <span className={`px-2 py-1 bg-${themeClasses.accentBase}-100 ${getThemeText()} text-xs rounded-full`}>
                          {employeeToDelete.department || 'N/A'}
                        </span>
                      </div>
                    </div>
                    
                    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <h5 className="font-medium text-red-900 dark:text-red-300 text-sm">Warning: This action cannot be undone</h5>
                          <p className="text-red-800 dark:text-red-400 text-xs mt-1">
                            All employee data, including attendance records, leave requests, and personal information will be permanently deleted.
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <AlertCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <h5 className="font-medium text-yellow-900 dark:text-yellow-300 text-sm">Important Note</h5>
                          <p className="text-yellow-800 dark:text-yellow-400 text-xs mt-1">
                            If this employee has any pending tasks or approvals, they will be reassigned to their manager.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700/50 border-t border-gray-200 dark:border-gray-700 flex justify-end gap-3">
                  <button
                    onClick={() => {
                      setDeleteModalOpen(false);
                      setEmployeeToDelete(null);
                    }}
                    className="px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                    disabled={isDeleting}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDeleteEmployee}
                    disabled={isDeleting}
                    className="px-4 py-2.5 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-medium rounded-lg text-sm transition-all shadow-md hover:shadow-lg flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isDeleting ? (
                      <>
                        <RefreshCw className="h-4 w-4 animate-spin" />
                        Deleting...
                      </>
                    ) : (
                      <>
                        <Trash2 className="h-4 w-4" />
                        Delete Employee
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}