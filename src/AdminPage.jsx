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
  Filter,
  Search,
  AlertCircle,
  CheckCircle,
  XCircle,
  Building,
  Users as UsersIcon,
  Globe,
  RefreshCw
} from 'lucide-react';
import { useTheme } from './ThemeContext';

// API Configuration
const API_BASE_URL = 'https://hr.hinzah.com/api';
const EMPLOYERS_API = `${API_BASE_URL}/employers`;

// API Service
const apiService = {
  // Fetch all employers
  async fetchEmployers() {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(EMPLOYERS_API, {
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
      return data.data || [];
    } catch (error) {
      console.error('Error fetching employers:', error);
      throw error;
    }
  },

  // Create employer
  async createEmployer(employerData) {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${EMPLOYERS_API}/create`, {
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

  // Update employer
  async updateEmployer(id, employerData) {
    try {
      const token = localStorage.getItem('token');
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

  // Delete employer
  async deleteEmployer(id) {
    try {
      const token = localStorage.getItem('token');
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
  }
};

function AdminPage() {
  const { theme, getThemeClasses } = useTheme();
  const themeClasses = getThemeClasses();
  
  // States
  const [employers, setEmployers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  
  // Dialog states
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openViewModal, setOpenViewModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  
  // Selected employer
  const [selectedEmployer, setSelectedEmployer] = useState(null);
  const [newEmployer, setNewEmployer] = useState({
    employer_code: '',
    password: '',
    confirmPassword: '',
    name: '',
    slug: '',
    status: 'pending',
    email: '',
    latitude: 0.0,
    longitude: 0.0,
    custom_data: {
      industry: '',
      employees: 0,
      location: ''
    },
  });

  // Filter and search states
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('created_at');
  const [sortOrder, setSortOrder] = useState('desc');

  // Initialize - Fetch employers on component mount
  useEffect(() => {
    fetchEmployers();
  }, []);

  // Fetch employers from API
  const fetchEmployers = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiService.fetchEmployers();
      setEmployers(data);
    } catch (err) {
      setError('Failed to fetch employers. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Filtered employers
  const filteredEmployers = employers.filter(employer => {
    const matchesSearch = 
      (employer.employer_code && employer.employer_code.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (employer.name && employer.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (employer.email && employer.email.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesStatus = statusFilter === 'all' || employer.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  }).sort((a, b) => {
    if (sortBy === 'name') {
      return sortOrder === 'asc' 
        ? (a.name || '').localeCompare(b.name || '')
        : (b.name || '').localeCompare(a.name || '');
    } else if (sortBy === 'status') {
      return sortOrder === 'asc'
        ? (a.status || '').localeCompare(b.status || '')
        : (b.status || '').localeCompare(a.status || '');
    } else {
      const dateA = a.created_at ? new Date(a.created_at).getTime() : 0;
      const dateB = b.created_at ? new Date(b.created_at).getTime() : 0;
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    }
  });

  // Handle Create Employer
  const handleCreateEmployer = async () => {
    try {
      setError(null);
      
      // Validation
      if (newEmployer.password !== newEmployer.confirmPassword) {
        throw new Error('Passwords do not match');
      }

      if (!newEmployer.employer_code || !newEmployer.name || !newEmployer.password) {
        throw new Error('Required fields (Employer Code, Name, Password) are missing');
      }

      // Prepare API payload
      const payload = {
        employer_code: newEmployer.employer_code,
        password: newEmployer.password,
        name: newEmployer.name,
        slug: newEmployer.slug,
        status: newEmployer.status,
        email: newEmployer.email,
        latitude: parseFloat(newEmployer.latitude) || 0.0,
        longitude: parseFloat(newEmployer.longitude) || 0.0,
        custom_data: newEmployer.custom_data
      };

      // Call API
      const response = await apiService.createEmployer(payload);
      
      // Update local state
      setEmployers(prev => [...prev, response.data]);
      setSuccess('Employer created successfully!');
      setOpenCreateModal(false);
      resetNewEmployerForm();
      
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError(err.message || 'Failed to create employer');
    }
  };

  // Handle Update Employer
  const handleUpdateEmployer = async () => {
    if (!selectedEmployer) return;

    try {
      setError(null);
      
      // Prepare update payload
      const payload = {
        employer_code: selectedEmployer.employer_code,
        name: selectedEmployer.name,
        slug: selectedEmployer.slug,
        status: selectedEmployer.status,
        email: selectedEmployer.email,
        latitude: parseFloat(selectedEmployer.latitude) || 0.0,
        longitude: parseFloat(selectedEmployer.longitude) || 0.0,
        custom_data: selectedEmployer.custom_data
      };

      // Update password only if provided
      if (newEmployer.password) {
        if (newEmployer.password !== newEmployer.confirmPassword) {
          throw new Error('Passwords do not match');
        }
        payload.password = newEmployer.password;
      }

      // Call API
      const response = await apiService.updateEmployer(selectedEmployer.id, payload);
      
      // Update local state
      const updatedEmployers = employers.map(emp => 
        emp.id === selectedEmployer.id ? { ...emp, ...response.data } : emp
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
      
      // Call API
      await apiService.deleteEmployer(selectedEmployer.id);
      
      // Update local state
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
      latitude: 0.0,
      longitude: 0.0,
      custom_data: {
        industry: '',
        employees: 0,
        location: ''
      },
    });
  };

  // Handle modal opens
  const handleOpenView = (employer) => {
    setSelectedEmployer(employer);
    setOpenViewModal(true);
  };

  const handleOpenEdit = (employer) => {
    setSelectedEmployer({ ...employer });
    setNewEmployer({
      password: '',
      confirmPassword: ''
    });
    setOpenEditModal(true);
  };

  const handleOpenDelete = (employer) => {
    setSelectedEmployer(employer);
    setOpenDeleteModal(true);
  };

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
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'pending': 
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'inactive': 
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
      default: 
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
    }
  };

  // Stats calculation
  const totalEmployers = employers.length;
  const activeEmployers = employers.filter(e => e.status === 'active').length;
  const pendingEmployers = employers.filter(e => e.status === 'pending').length;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                <Users className="inline-block mr-2 h-6 w-6" />
                Employers Management
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Manage employer profiles and company information
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setOpenCreateModal(true)}
                className={`inline-flex items-center px-4 py-2 ${themeClasses.buttonBg} hover:${themeClasses.accentHover} text-white font-medium rounded-lg transition-colors`}
              >
                <UserPlus className="h-5 w-5 mr-2" />
                Add New Employer
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Success/Error Messages */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg">
            <div className="flex items-center">
              <XCircle className="h-5 w-5 text-red-400 mr-2" />
              <span className="text-red-800 dark:text-red-200">{error}</span>
              <button
                onClick={() => setError(null)}
                className="ml-auto text-gray-400 hover:text-gray-600"
              >
                <XCircle className="h-5 w-5" />
              </button>
            </div>
          </div>
        )}
        
        {success && (
          <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-lg">
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-green-400 mr-2" />
              <span className="text-green-800 dark:text-green-200">{success}</span>
              <button
                onClick={() => setSuccess(null)}
                className="ml-auto text-gray-400 hover:text-gray-600"
              >
                <XCircle className="h-5 w-5" />
              </button>
            </div>
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 transition-colors hover:shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Total Employers</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{totalEmployers}</p>
              </div>
              <Users className="h-10 w-10 text-indigo-500" />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 transition-colors hover:shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Active Employers</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{activeEmployers}</p>
              </div>
              <UserCheck className="h-10 w-10 text-green-500" />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 transition-colors hover:shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Pending Approval</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{pendingEmployers}</p>
              </div>
              <AlertCircle className="h-10 w-10 text-yellow-500" />
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-6 transition-colors">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search employers by code, name, or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
            
            <div className="flex flex-wrap items-center gap-4">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="inactive">Inactive</option>
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="created_at">Sort by Date</option>
                <option value="name">Sort by Name</option>
                <option value="status">Sort by Status</option>
              </select>

              <button
                onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')}
                className="p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                title={sortOrder === 'asc' ? 'Sort descending' : 'Sort ascending'}
              >
                {sortOrder === 'asc' ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
              </button>

              <button
                onClick={fetchEmployers}
                className={`inline-flex items-center px-4 py-2 ${themeClasses.buttonBg} hover:${themeClasses.accentHover} text-white font-medium rounded-lg transition-colors`}
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </button>
            </div>
          </div>
        </div>

        {/* Employers Table */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden transition-colors">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Code
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Company Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Industry
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Created
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {loading ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500 mb-4"></div>
                        <p className="text-gray-500 dark:text-gray-400">Loading employers...</p>
                      </div>
                    </td>
                  </tr>
                ) : filteredEmployers.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <Users className="h-12 w-12 text-gray-400 mb-4" />
                        <p className="text-gray-500 dark:text-gray-400 text-lg font-medium mb-2">No employers found</p>
                        <p className="text-gray-400 dark:text-gray-500 text-sm">
                          {searchTerm || statusFilter !== 'all' 
                            ? 'Try changing your search or filter criteria'
                            : 'Get started by creating your first employer'}
                        </p>
                        {!searchTerm && statusFilter === 'all' && (
                          <button
                            onClick={() => setOpenCreateModal(true)}
                            className={`mt-4 inline-flex items-center px-4 py-2 ${themeClasses.buttonBg} hover:${themeClasses.accentHover} text-white font-medium rounded-lg transition-colors`}
                          >
                            <UserPlus className="h-5 w-5 mr-2" />
                            Add New Employer
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredEmployers.map((employer) => (
                    <tr 
                      key={employer.id} 
                      className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-8 w-8 flex items-center justify-center rounded-md bg-gray-100 dark:bg-gray-700 mr-3">
                            <Building className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                              {employer.employer_code}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {employer.name}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 dark:text-white">
                          {employer.email || 'N/A'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(employer.status)}`}>
                          {employer.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 dark:text-white">
                          {employer.custom_data?.industry || 'N/A'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {formatDate(employer.created_at)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleOpenView(employer)}
                            className="p-1.5 text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-md transition-colors"
                            title="View Details"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleOpenEdit(employer)}
                            className={`p-1.5 ${themeClasses.textColor} hover:${themeClasses.accentHover} hover:bg-${themeClasses.accentBase}-50 dark:hover:bg-${themeClasses.accentBase}-900/30 rounded-md transition-colors`}
                            title="Edit"
                          >
                            <Edit2 className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleOpenDelete(employer)}
                            className="p-1.5 text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-md transition-colors"
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
        </div>
      </main>

      {/* Create Employer Modal */}
    {openCreateModal && (
  <AnimatePresence>
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-0 sm:p-4 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="bg-white w-full max-w-6xl max-h-screen sm:max-h-[90vh] sm:rounded-2xl shadow-2xl sm:border sm:border-gray-200 flex flex-col h-screen sm:h-auto"
      >
        {/* Header */}
        <div className="px-6 pt-5 pb-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold text-gray-900">
                Add New Employer
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                Fill in the employer details below
              </p>
            </div>
            <button
              onClick={() => setOpenCreateModal(false)}
              className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100"
            >
              <span className="sr-only">Close</span>
              ✕
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row flex-1 overflow-hidden">
          {/* Left Side - Form */}
          <div className="lg:w-2/3 p-6 overflow-y-auto">
            <div className="space-y-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900">Basic Information</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Employer Code *
                    </label>
                    <input
                      type="text"
                      value={newEmployer.employer_code}
                      onChange={(e) => setNewEmployer({...newEmployer, employer_code: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-colors"
                      placeholder="COMP001"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Company Name *
                    </label>
                    <input
                      type="text"
                      value={newEmployer.name}
                      onChange={(e) => setNewEmployer({...newEmployer, name: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-colors"
                      placeholder="Company XYZ Pvt. Ltd."
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={newEmployer.email}
                      onChange={(e) => setNewEmployer({...newEmployer, email: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-colors"
                      placeholder="contact@company.com"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Password *
                    </label>
                    <input
                      type="password"
                      value={newEmployer.password}
                      onChange={(e) => setNewEmployer({...newEmployer, password: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-colors"
                      placeholder="••••••••"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Confirm Password *
                    </label>
                    <input
                      type="password"
                      value={newEmployer.confirmPassword}
                      onChange={(e) => setNewEmployer({...newEmployer, confirmPassword: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-colors"
                      placeholder="••••••••"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Status
                    </label>
                    <select
                      value={newEmployer.status}
                      onChange={(e) => setNewEmployer({...newEmployer, status: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-colors"
                    >
                      <option value="pending">Pending</option>
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Company Information */}
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900">Company Information</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Industry
                    </label>
                    <input
                      type="text"
                      value={newEmployer.custom_data.industry}
                      onChange={(e) => setNewEmployer({
                        ...newEmployer,
                        custom_data: { ...newEmployer.custom_data, industry: e.target.value }
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-colors"
                      placeholder="IT Services"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Number of Employees
                    </label>
                    <input
                      type="number"
                      value={newEmployer.custom_data.employees}
                      onChange={(e) => setNewEmployer({
                        ...newEmployer,
                        custom_data: { ...newEmployer.custom_data, employees: Number(e.target.value) }
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-colors"
                      placeholder="150"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Company Website Slug
                  </label>
                  <input
                    type="text"
                    value={newEmployer.slug}
                    onChange={(e) => setNewEmployer({...newEmployer, slug: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-colors"
                    placeholder="company-xyz"
                  />
                </div>
              </div>

              {/* Location Information */}
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900">Location</h4>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Country
                  </label>
                  <div className="px-3 py-2 border border-gray-300 rounded-lg bg-gray-50">
                    <span className="text-gray-900">India</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      State
                    </label>
                    <input
                      type="text"
                      value={newEmployer.custom_data.state || ''}
                      onChange={(e) => setNewEmployer({
                        ...newEmployer,
                        custom_data: { 
                          ...newEmployer.custom_data, 
                          state: e.target.value,
                          location: e.target.value + ', ' + (newEmployer.custom_data.city || '') + ', India'
                        }
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-colors"
                      placeholder="Maharashtra"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      City
                    </label>
                    <input
                      type="text"
                      value={newEmployer.custom_data.city || ''}
                      onChange={(e) => setNewEmployer({
                        ...newEmployer,
                        custom_data: { 
                          ...newEmployer.custom_data, 
                          city: e.target.value,
                          location: (newEmployer.custom_data.state || '') + ', ' + e.target.value + ', India'
                        }
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-colors"
                      placeholder="Mumbai"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address
                  </label>
                  <textarea
                    value={newEmployer.custom_data.address || ''}
                    onChange={(e) => setNewEmployer({
                      ...newEmployer,
                      custom_data: { ...newEmployer.custom_data, address: e.target.value }
                    })}
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-colors"
                    placeholder="Enter full address (Street, Area, Landmark)"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      <MapPin className="inline-block h-4 w-4 mr-1" />
                      Latitude
                    </label>
                    <input
                      type="number"
                      step="0.0000001"
                      value={newEmployer.latitude}
                      onChange={(e) => setNewEmployer({...newEmployer, latitude: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-colors"
                      placeholder="19.076090"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      <MapPin className="inline-block h-4 w-4 mr-1" />
                      Longitude
                    </label>
                    <input
                      type="number"
                      step="0.0000001"
                      value={newEmployer.longitude}
                      onChange={(e) => setNewEmployer({...newEmployer, longitude: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-colors"
                      placeholder="72.877426"
                    />
                  </div>
                </div>
              </div>

              {/* Bank Information */}
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900">Bank Information</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Bank Name
                    </label>
                    <select
                      value={newEmployer.custom_data.bank_name || ''}
                      onChange={(e) => setNewEmployer({
                        ...newEmployer,
                        custom_data: { ...newEmployer.custom_data, bank_name: e.target.value }
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-colors"
                    >
                      <option value="">Select Bank</option>
                      <option value="HDFC">HDFC Bank</option>
                      <option value="ICICI">ICICI Bank</option>
                      <option value="SBI">State Bank of India</option>
                      <option value="Axis">Axis Bank</option>
                      <option value="Kotak">Kotak Mahindra Bank</option>
                      <option value="Yes">Yes Bank</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Account Number
                    </label>
                    <input
                      type="text"
                      value={newEmployer.custom_data.account_number || ''}
                      onChange={(e) => setNewEmployer({
                        ...newEmployer,
                        custom_data: { ...newEmployer.custom_data, account_number: e.target.value }
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-colors"
                      placeholder="# Account number"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Summary */}
          <div className="lg:w-1/3 border-t lg:border-t-0 lg:border-l border-gray-200 p-6 bg-gray-50">
            <div className="sticky top-0">
              <h4 className="font-medium text-gray-900 mb-6">Summary</h4>
              
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide font-medium mb-1">
                    Employer Code
                  </p>
                  <p className="text-sm font-medium text-gray-900">
                    {newEmployer.employer_code || (
                      <span className="text-gray-400 italic">Not provided</span>
                    )}
                  </p>
                </div>
                
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide font-medium mb-1">
                    Company Name
                  </p>
                  <p className="text-sm font-medium text-gray-900">
                    {newEmployer.name || (
                      <span className="text-gray-400 italic">Not provided</span>
                    )}
                  </p>
                </div>
                
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide font-medium mb-1">
                    Industry
                  </p>
                  <p className="text-sm font-medium text-gray-900">
                    {newEmployer.custom_data.industry || (
                      <span className="text-gray-400 italic">Not provided</span>
                    )}
                  </p>
                </div>
                
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide font-medium mb-1">
                    Company Size
                  </p>
                  <p className="text-sm font-medium text-gray-900">
                    {newEmployer.custom_data.employees ? (
                      `${newEmployer.custom_data.employees} employees`
                    ) : (
                      <span className="text-gray-400 italic">Not provided</span>
                    )}
                  </p>
                </div>
                
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide font-medium mb-1">
                    Email
                  </p>
                  <p className="text-sm font-medium text-gray-900">
                    {newEmployer.email || (
                      <span className="text-gray-400 italic">Not provided</span>
                    )}
                  </p>
                </div>
                
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide font-medium mb-1">
                    Status
                  </p>
                  <p className="text-sm font-medium text-gray-900 capitalize">
                    {newEmployer.status || (
                      <span className="text-gray-400 italic">Not provided</span>
                    )}
                  </p>
                </div>
                
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide font-medium mb-1">
                    Location
                  </p>
                  <p className="text-sm font-medium text-gray-900">
                    {newEmployer.custom_data.location || (
                      <span className="text-gray-400 italic">Not provided</span>
                    )}
                  </p>
                </div>
                
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide font-medium mb-1">
                    Bank Details
                  </p>
                  <p className="text-sm font-medium text-gray-900">
                    {newEmployer.custom_data.bank_name ? (
                      `${newEmployer.custom_data.bank_name} •••• ${newEmployer.custom_data.account_number?.slice(-4) || ''}`
                    ) : (
                      <span className="text-gray-400 italic">Not provided</span>
                    )}
                  </p>
                </div>
              </div>

              <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-100">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-0.5">
                    <svg className="h-5 w-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-blue-700">
                      All information will be encrypted and stored securely. 
                      Bank details are required for payroll processing.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 bg-white flex justify-between items-center">
          <div className="text-sm text-gray-500">
            <span className="font-medium">Note:</span> Fields marked with * are required
          </div>
          
          <div className="flex space-x-3">
            <button
              onClick={() => setOpenCreateModal(false)}
              className="px-5 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleCreateEmployer}
              className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg text-sm transition-colors shadow-sm hover:shadow"
            >
              Create Employer
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  </AnimatePresence>
)}

      {/* View Employer Modal */}
      {openViewModal && selectedEmployer && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 dark:bg-gray-900 bg-opacity-75 transition-opacity" />
            <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="px-6 pt-5 pb-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    <Eye className="inline-block h-5 w-5 mr-2" />
                    Employer Details
                  </h3>
                  <button
                    onClick={() => setOpenViewModal(false)}
                    className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 transition-colors"
                  >
                    <span className="sr-only">Close</span>
                    ✕
                  </button>
                </div>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Employer Code</p>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{selectedEmployer.employer_code}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Company Name</p>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{selectedEmployer.name}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Slug</p>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {selectedEmployer.slug || 'N/A'}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {selectedEmployer.email || 'N/A'}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Status</p>
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(selectedEmployer.status)}`}>
                        {selectedEmployer.status}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Location</p>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {selectedEmployer.latitude}, {selectedEmployer.longitude}
                      </p>
                    </div>
                  </div>

                  <div className="border-t dark:border-gray-700 pt-4">
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                      Company Information
                    </h4>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Industry</p>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {selectedEmployer.custom_data?.industry || 'N/A'}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Employees</p>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {selectedEmployer.custom_data?.employees || 'N/A'}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4">
                      <p className="text-sm text-gray-500 dark:text-gray-400">Location</p>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {selectedEmployer.custom_data?.location || 'N/A'}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Created Date</p>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {formatDate(selectedEmployer.created_at)}
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Last Updated</p>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {formatDate(selectedEmployer.updated_at)}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700/50 flex justify-end space-x-3">
                <button
                  onClick={() => setOpenViewModal(false)}
                  className={`px-4 py-2 ${themeClasses.buttonBg} hover:${themeClasses.accentHover} text-white font-medium rounded-md text-sm transition-colors`}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Employer Modal */}
      {openEditModal && selectedEmployer && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 dark:bg-gray-900 bg-opacity-75 transition-opacity" />
            <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
              <div className="px-6 pt-5 pb-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    <Edit2 className="inline-block h-5 w-5 mr-2" />
                    Edit Employer
                  </h3>
                  <button
                    onClick={() => setOpenEditModal(false)}
                    className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 transition-colors"
                  >
                    <span className="sr-only">Close</span>
                    ✕
                  </button>
                </div>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Employer Code *
                      </label>
                      <input
                        type="text"
                        value={selectedEmployer.employer_code}
                        onChange={(e) => setSelectedEmployer({...selectedEmployer, employer_code: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Company Name *
                      </label>
                      <input
                        type="text"
                        value={selectedEmployer.name}
                        onChange={(e) => setSelectedEmployer({...selectedEmployer, name: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        New Password (Leave blank to keep current)
                      </label>
                      <input
                        type="password"
                        value={newEmployer.password}
                        onChange={(e) => setNewEmployer({...newEmployer, password: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        value={newEmployer.confirmPassword}
                        onChange={(e) => setNewEmployer({...newEmployer, confirmPassword: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Slug
                      </label>
                      <input
                        type="text"
                        value={selectedEmployer.slug}
                        onChange={(e) => setSelectedEmployer({...selectedEmployer, slug: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        value={selectedEmployer.email}
                        onChange={(e) => setSelectedEmployer({...selectedEmployer, email: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Latitude
                      </label>
                      <input
                        type="number"
                        step="0.0000001"
                        value={selectedEmployer.latitude}
                        onChange={(e) => setSelectedEmployer({...selectedEmployer, latitude: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Longitude
                      </label>
                      <input
                        type="number"
                        step="0.0000001"
                        value={selectedEmployer.longitude}
                        onChange={(e) => setSelectedEmployer({...selectedEmployer, longitude: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Status
                    </label>
                    <select
                      value={selectedEmployer.status}
                      onChange={(e) => setSelectedEmployer({...selectedEmployer, status: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                    >
                      <option value="pending">Pending</option>
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>

                  <div className="border-t dark:border-gray-700 pt-4">
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                      Company Information
                    </h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Industry
                        </label>
                        <input
                          type="text"
                          value={selectedEmployer.custom_data?.industry || ''}
                          onChange={(e) => setSelectedEmployer({
                            ...selectedEmployer,
                            custom_data: { 
                              ...(selectedEmployer.custom_data || {}), 
                              industry: e.target.value 
                            }
                          })}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Number of Employees
                        </label>
                        <input
                          type="number"
                          value={selectedEmployer.custom_data?.employees || 0}
                          onChange={(e) => setSelectedEmployer({
                            ...selectedEmployer,
                            custom_data: { 
                              ...(selectedEmployer.custom_data || {}), 
                              employees: Number(e.target.value) 
                            }
                          })}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                        />
                      </div>
                    </div>

                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Location
                      </label>
                      <input
                        type="text"
                        value={selectedEmployer.custom_data?.location || ''}
                        onChange={(e) => setSelectedEmployer({
                          ...selectedEmployer,
                          custom_data: { 
                            ...(selectedEmployer.custom_data || {}), 
                            location: e.target.value 
                          }
                        })}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700/50 flex justify-end space-x-3">
                <button
                  onClick={() => setOpenEditModal(false)}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdateEmployer}
                  className={`px-4 py-2 ${themeClasses.buttonBg} hover:${themeClasses.accentHover} text-white font-medium rounded-md text-sm transition-colors`}
                >
                  Update Employer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {openDeleteModal && selectedEmployer && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 dark:bg-gray-900 bg-opacity-75 transition-opacity" />
            <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-md sm:w-full">
              <div className="px-6 pt-5 pb-4 text-center">
                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-red-900 mb-4">
                  <AlertCircle className="h-6 w-6 text-red-600 dark:text-red-400" />
                </div>
                
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  Confirm Delete
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                  Are you sure you want to delete employer
                </p>
                <p className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
                  {selectedEmployer.name} ({selectedEmployer.employer_code})?
                </p>
                <p className="text-xs text-gray-400 dark:text-gray-500">
                  This action cannot be undone.
                </p>
              </div>
              
              <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700/50 flex justify-center space-x-3">
                <button
                  onClick={() => setOpenDeleteModal(false)}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteEmployer}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-md text-sm transition-colors"
                >
                  Delete Employer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminPage;