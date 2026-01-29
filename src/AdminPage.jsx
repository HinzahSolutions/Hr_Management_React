

  




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
  Moon,
  ThumbsUp, // Added for approval
  FileCheck,
  Info, // Added for approval
  Shield as ShieldIcon // Added for approval
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
    console.log("employers id or code", employerId);
    const permissionsPayload = {
      company_code: employerId,
      permissions: permissions
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
  },

  // New approve employer API
  async approveEmployer(id) {
    try {
      const token = localStorage.getItem('token') || localStorage.getItem('authToken');
      const response = await fetch(`${API_BASE_URL_SERVER}/api/employers/${id}/approve`, {
        method: 'POST',
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
      console.error('Error approving employer:', error);
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
  const [activeSection,setActiveSection] = useState("basic")
  
  // Dialog states - Added approve modal
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openViewModal, setOpenViewModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openApproveModal, setOpenApproveModal] = useState(false); // New state
  
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

  // Handle Approve Employer
  const handleApproveEmployer = async () => {
    if (!selectedEmployer) return;

    try {
      setError(null);
      setLoading(true);
      
      await apiService.approveEmployer(selectedEmployer.id);
      
      // Update local state
      const updatedEmployers = employers.map(emp => 
        emp.id === selectedEmployer.id ? { 
          ...emp, 
          status: 'active' 
        } : emp
      );
      
      setEmployers(updatedEmployers);
      setSuccess('Employer approved successfully!');
      setOpenApproveModal(false);
      
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError(err.message || 'Failed to approve employer');
    } finally {
      setLoading(false);
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

  // Handle modal opens - Added approve
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

  // New function to handle open approve modal
  const handleOpenApprove = (employer) => {
    setSelectedEmployer(employer);
    setOpenApproveModal(true);
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
              {/* <button
                onClick={toggleDarkMode}
                className="p-3 rounded-xl bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 transition-all shadow-sm hover:shadow-md"
                title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
              >
                {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button> */}
              
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

        {/* Employers Table - Added Approve Action */}
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
                          {employer.status === 'pending' && (
                            <button
                              onClick={() => handleOpenApprove(employer)}
                              className="p-2 text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300 hover:bg-green-50 dark:hover:bg-green-900/30 rounded-lg transition-all"
                              title="Approve"
                            >
                              <ThumbsUp className="h-4 w-4" />
                            </button>
                          )}
                          <button
                            onClick={() => handleViewDashboard(employer.employer_code)}
                            className="p-2 text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-300 hover:bg-purple-50 dark:hover:bg-purple-900/30 rounded-lg transition-all"
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

      {/* CREATE EMPLOYER MODAL - FIXED DESIGN */}
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
                <div className="px-6 pt-5 pb-4 sm:px-8 sm:pt-6 sm:pb-6 flex-shrink-0 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                        <UserPlus className="h-7 w-7 text-indigo-600 dark:text-indigo-400" />
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
                </div>
                
                <div className="flex-1 overflow-y-auto">
                  <div className="p-6 sm:p-8">
                    {/* Horizontal Tabs for Sections */}
                    <div className="flex border-b border-gray-200 dark:border-gray-700 mb-6">
                      <button className={`px-4 py-2 text-sm font-medium border-b-2 ${activeSection === 'basic' ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400' : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'}`} onClick={() => setActiveSection('basic')}>
                        Basic Info
                      </button>
                      <button className={`px-4 py-2 text-sm font-medium border-b-2 ${activeSection === 'contact' ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400' : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'}`} onClick={() => setActiveSection('contact')}>
                        Contact & Location
                      </button>
                      <button className={`px-4 py-2 text-sm font-medium border-b-2 ${activeSection === 'security' ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400' : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'}`} onClick={() => setActiveSection('security')}>
                        Security
                      </button>
                      <button className={`px-4 py-2 text-sm font-medium border-b-2 ${activeSection === 'permissions' ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400' : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'}`} onClick={() => setActiveSection('permissions')}>
                        Permissions
                      </button>
                    </div>

                    {/* Basic Information Section */}
                    {activeSection === 'basic' && (
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="space-y-6">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              Employer Code *
                            </label>
                            <input
                              type="text"
                              value={newEmployer.employer_code}
                              onChange={(e) => updateNewEmployer('employer_code', e.target.value)}
                              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                              placeholder="EMP001"
                              required
                            />
                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                              Unique identifier for the employer
                            </p>
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              Company Name *
                            </label>
                            <input
                              type="text"
                              value={newEmployer.name}
                              onChange={(e) => updateNewEmployer('name', e.target.value)}
                              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                              placeholder="Tech Solutions Inc."
                              required
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              Status
                            </label>
                            <select
                              value={newEmployer.status}
                              onChange={(e) => updateNewEmployer('status', e.target.value)}
                              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            >
                              <option value="pending">Pending</option>
                              <option value="active">Active</option>
                              <option value="inactive">Inactive</option>
                              <option value="verified">Verified</option>
                            </select>
                          </div>
                        </div>
                        
                        <div className="space-y-6">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              Industry
                            </label>
                            <input
                              type="text"
                              value={newEmployer.custom_data.industry}
                              onChange={(e) => updateNewEmployer('custom_data.industry', e.target.value)}
                              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                              placeholder="Technology"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              Number of Employees
                            </label>
                            <input
                              type="number"
                              value={newEmployer.custom_data.employees}
                              onChange={(e) => updateNewEmployer('custom_data.employees', parseInt(e.target.value) || 0)}
                              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                              placeholder="50"
                              min="0"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              Founded Year
                            </label>
                            <input
                              type="number"
                              value={newEmployer.custom_data.founded_year}
                              onChange={(e) => updateNewEmployer('custom_data.founded_year', e.target.value)}
                              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                              placeholder="2020"
                              min="1900"
                              max="2024"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Contact & Location Section */}
                    {activeSection === 'contact' && (
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="space-y-6">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              Email Address
                            </label>
                            <div className="relative">
                              <Mail className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                              <input
                                type="email"
                                value={newEmployer.email}
                                onChange={(e) => updateNewEmployer('email', e.target.value)}
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                placeholder="company@example.com"
                              />
                            </div>
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              Phone Number
                            </label>
                            <div className="relative">
                              <Phone className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                              <input
                                type="tel"
                                value={newEmployer.phone}
                                onChange={(e) => updateNewEmployer('phone', e.target.value)}
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                placeholder="+1234567890"
                              />
                            </div>
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              Location
                            </label>
                            <input
                              type="text"
                              value={newEmployer.custom_data.location}
                              onChange={(e) => updateNewEmployer('custom_data.location', e.target.value)}
                              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                              placeholder="City, Country"
                            />
                          </div>
                        </div>
                        
                        <div className="space-y-6">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              Address
                            </label>
                            <textarea
                              value={newEmployer.custom_data.address}
                              onChange={(e) => updateNewEmployer('custom_data.address', e.target.value)}
                              rows="3"
                              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                              placeholder="Street Address"
                            />
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                City
                              </label>
                              <input
                                type="text"
                                value={newEmployer.custom_data.city}
                                onChange={(e) => updateNewEmployer('custom_data.city', e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                placeholder="City"
                              />
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Country
                              </label>
                              <input
                                type="text"
                                value={newEmployer.custom_data.country}
                                onChange={(e) => updateNewEmployer('custom_data.country', e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                placeholder="Country"
                              />
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Latitude
                              </label>
                              <input
                                type="number"
                                step="0.000001"
                                value={newEmployer.latitude}
                                onChange={(e) => updateNewEmployer('latitude', parseFloat(e.target.value) || 0.0)}
                                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                placeholder="0.0"
                              />
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Longitude
                              </label>
                              <input
                                type="number"
                                step="0.000001"
                                value={newEmployer.longitude}
                                onChange={(e) => updateNewEmployer('longitude', parseFloat(e.target.value) || 0.0)}
                                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                placeholder="0.0"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Security Section */}
                    {activeSection === 'security' && (
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="space-y-6">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              Password *
                            </label>
                            <div className="relative">
                              <Lock className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                              <input
                                type="password"
                                value={newEmployer.password}
                                onChange={(e) => updateNewEmployer('password', e.target.value)}
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                placeholder="••••••••"
                                required
                              />
                            </div>
                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                              Minimum 8 characters with letters and numbers
                            </p>
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              Confirm Password *
                            </label>
                            <div className="relative">
                              <Key className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                              <input
                                type="password"
                                value={newEmployer.confirmPassword}
                                onChange={(e) => updateNewEmployer('confirmPassword', e.target.value)}
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                placeholder="••••••••"
                                required
                              />
                            </div>
                          </div>
                        </div>
                        
                        <div className="space-y-6">
                          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
                            <div className="flex items-start gap-3">
                              <ShieldIcon className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                              <div>
                                <h4 className="font-medium text-blue-900 dark:text-blue-300">Security Requirements</h4>
                                <ul className="mt-2 space-y-1 text-sm text-blue-800 dark:text-blue-400">
                                  <li className="flex items-center gap-2">
                                    <Check className="h-4 w-4" />
                                    Password must be at least 8 characters
                                  </li>
                                  <li className="flex items-center gap-2">
                                    <Check className="h-4 w-4" />
                                    Include both letters and numbers
                                  </li>
                                  <li className="flex items-center gap-2">
                                    <Check className="h-4 w-4" />
                                    Avoid common passwords
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                          
                          <div className="bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl p-4">
                            <div className="flex items-start gap-3">
                              <Info className="h-5 w-5 text-gray-600 dark:text-gray-400 mt-0.5 flex-shrink-0" />
                              <div>
                                <h4 className="font-medium text-gray-900 dark:text-gray-300">Account Access</h4>
                                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                                  The employer will receive login credentials and can access their dashboard immediately after creation.
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Permissions Section */}
                    {activeSection === 'permissions' && (
                      <div className="space-y-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                              Module Permissions
                            </h4>
                            <p className="text-gray-600 dark:text-gray-400 mt-1">
                              Set access permissions for each module
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => setFormData({ permissions: generateDefaultPermissions('employee') })}
                              className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm font-medium rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                            >
                              Reset Defaults
                            </button>
                            <button
                              onClick={() => setFormData({ permissions: generateDefaultPermissions('superadmin') })}
                              className="px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white text-sm font-medium rounded-lg hover:from-purple-600 hover:to-indigo-700 transition-all"
                            >
                              Grant All Access
                            </button>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {MODULES.map(mod => {
                            const modulePermissions = SUB_PERMISSIONS[mod.name] || [];
                            const enabledCount = modulePermissions.reduce((count, perm) => {
                              const permData = formData.permissions[mod.name]?.[perm.name] || {};
                              return count + (Object.values(permData).filter(Boolean).length);
                            }, 0);
                            const totalCount = modulePermissions.length * 4;
                            
                            return (
                              <div key={mod.name} className="bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700 p-4 hover:shadow-md transition-shadow">
                                <div className="flex items-start justify-between mb-3">
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
                                
                                <div className="flex items-center justify-between mb-2">
                                  <span className={`text-sm ${enabledCount === 0 ? 'text-gray-500' : 'text-green-600 dark:text-green-400'}`}>
                                    {enabledCount === 0 ? 'Disabled' : 'Enabled'}
                                  </span>
                                  <span className="text-sm text-gray-500 dark:text-gray-400">
                                    {enabledCount}/{totalCount}
                                  </span>
                                </div>
                                
                                <div className="h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full mb-3">
                                  <div 
                                    className="h-full bg-gradient-to-r from-green-500 to-green-600 rounded-full transition-all duration-300"
                                    style={{ width: `${(enabledCount / totalCount) * 100}%` }}
                                  />
                                </div>
                                
                                {openModule === mod.name && (
                                  <div className="border-t border-gray-200 dark:border-gray-700 pt-3 mt-3">
                                    <div className="space-y-3">
                                      {modulePermissions.map(perm => (
                                        <div key={perm.name} className="bg-white dark:bg-gray-700 rounded-lg p-3">
                                          <h6 className="font-medium text-gray-900 dark:text-white mb-2 text-sm">{perm.name}</h6>
                                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                                            {['view', 'create', 'edit', 'delete'].map(type => {
                                              const checked = getPerm(mod.name, perm.name, type);
                                              return (
                                                <label key={type} className="flex items-center gap-1.5 cursor-pointer">
                                                  <input
                                                    type="checkbox"
                                                    checked={checked}
                                                    onChange={() => togglePermission(mod.name, perm.name, type)}
                                                    className="h-3.5 w-3.5 rounded border-gray-300 dark:border-gray-600 text-indigo-600 focus:ring-indigo-500 focus:ring-offset-0"
                                                  />
                                                  <span className="text-xs text-gray-700 dark:text-gray-300 capitalize">{type}</span>
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
                    )}
                  </div>
                </div>
                
                <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700/50 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Step {activeSection === 'basic' ? '1' : activeSection === 'contact' ? '2' : activeSection === 'security' ? '3' : '4'} of 4
                    </span>
                    <div className="flex gap-1">
                      <div className={`w-2 h-2 rounded-full ${activeSection === 'basic' ? 'bg-indigo-600' : 'bg-gray-300 dark:bg-gray-600'}`}></div>
                      <div className={`w-2 h-2 rounded-full ${activeSection === 'contact' ? 'bg-indigo-600' : 'bg-gray-300 dark:bg-gray-600'}`}></div>
                      <div className={`w-2 h-2 rounded-full ${activeSection === 'security' ? 'bg-indigo-600' : 'bg-gray-300 dark:bg-gray-600'}`}></div>
                      <div className={`w-2 h-2 rounded-full ${activeSection === 'permissions' ? 'bg-indigo-600' : 'bg-gray-300 dark:bg-gray-600'}`}></div>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    {activeSection !== 'basic' && (
                      <button
                        onClick={() => {
                          if (activeSection === 'contact') setActiveSection('basic');
                          if (activeSection === 'security') setActiveSection('contact');
                          if (activeSection === 'permissions') setActiveSection('security');
                        }}
                        className="px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                      >
                        Previous
                      </button>
                    )}
                    {activeSection !== 'permissions' ? (
                      <button
                        onClick={() => {
                          if (activeSection === 'basic') setActiveSection('contact');
                          if (activeSection === 'contact') setActiveSection('security');
                          if (activeSection === 'security') setActiveSection('permissions');
                        }}
                        className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg text-sm transition-colors"
                      >
                        Next
                      </button>
                    ) : (
                      <button
                        onClick={handleCreateEmployer}
                        className="px-4 py-2.5 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-medium rounded-lg text-sm transition-colors shadow-md hover:shadow-lg flex items-center gap-2"
                      >
                        <UserPlus className="h-4 w-4" />
                        Create Employer
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </AnimatePresence>
      )}

      {/* APPROVE EMPLOYER MODAL */}
      {openApproveModal && selectedEmployer && (
        <AnimatePresence>
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
                      <div className="p-2 rounded-full bg-green-100 dark:bg-green-900/30">
                        <ThumbsUp className="h-6 w-6 text-green-600 dark:text-green-400" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                          Approve Employer
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                          Confirm employer approval
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => setOpenApproveModal(false)}
                      className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 transition-colors p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-12 flex items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-600">
                          <Building className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900 dark:text-white">{selectedEmployer.name}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{selectedEmployer.employer_code}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Current Status</span>
                        <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(selectedEmployer.status)}`}>
                          {selectedEmployer.status.toUpperCase()}
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">New Status</span>
                        <span className="px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                          ACTIVE
                        </span>
                      </div>
                    </div>
                    
                    <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <h5 className="font-medium text-yellow-900 dark:text-yellow-300 text-sm">Important Note</h5>
                          <p className="text-yellow-800 dark:text-yellow-400 text-xs mt-1">
                            Once approved, the employer will gain access to their dashboard and can start managing their account.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700/50 border-t border-gray-200 dark:border-gray-700 flex justify-end gap-3">
                  <button
                    onClick={() => setOpenApproveModal(false)}
                    className="px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                    disabled={loading}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleApproveEmployer}
                    disabled={loading}
                    className="px-4 py-2.5 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-medium rounded-lg text-sm transition-all shadow-md hover:shadow-lg flex items-center gap-2 disabled:opacity-70"
                  >
                    {loading ? (
                      <>
                        <RefreshCw className="h-4 w-4 animate-spin" />
                        Approving...
                      </>
                    ) : (
                      <>
                        <ThumbsUp className="h-4 w-4" />
                        Approve Employer
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </AnimatePresence>
      )}

      {/* Other modals (View, Edit, Delete) remain the same */}
      {/* ... View Employer Modal ... */}
      {/* ... Edit Employer Modal ... */}
      {/* ... Delete Employer Modal ... */}


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