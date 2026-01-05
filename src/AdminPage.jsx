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
  XCircle
} from 'lucide-react';

// Custom hook for theme
const useTheme = () => {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    // Check local storage or system preference
    const storedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (storedTheme) {
      setTheme(storedTheme);
    } else if (systemPrefersDark) {
      setTheme('dark');
    }
  }, []);

  useEffect(() => {
    // Update document class when theme changes
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return { theme, toggleTheme };
};

function AdminPage() {
  const { theme, toggleTheme } = useTheme();
  
  // States
  const [employers, setEmployers] = useState([
    {
      id: 1,
      username: 'john.doe',
      email: 'john.doe@example.com',
      firstName: 'John',
      lastName: 'Doe',
      phone: '+1 234 567 8900',
      role: 'admin',
      status: 'active',
      custom_data: {
        department: 'Engineering',
        position: 'Lead Developer',
        hire_date: '2022-01-15',
        salary: 85000,
        location: 'New York'
      },
      createdAt: '2022-01-15T10:00:00Z'
    },
    {
      id: 2,
      username: 'jane.smith',
      email: 'jane.smith@example.com',
      firstName: 'Jane',
      lastName: 'Smith',
      phone: '+1 234 567 8901',
      role: 'manager',
      status: 'active',
      custom_data: {
        department: 'Marketing',
        position: 'Marketing Manager',
        hire_date: '2022-03-20',
        salary: 75000,
        location: 'San Francisco'
      },
      createdAt: '2022-03-20T09:30:00Z'
    },
    {
      id: 3,
      username: 'mike.johnson',
      email: 'mike.j@example.com',
      firstName: 'Mike',
      lastName: 'Johnson',
      phone: '+1 234 567 8902',
      role: 'employee',
      status: 'active',
      custom_data: {
        department: 'Sales',
        position: 'Sales Executive',
        hire_date: '2023-01-10',
        salary: 65000,
        location: 'Chicago'
      },
      createdAt: '2023-01-10T08:15:00Z'
    }
  ]);
  
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
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    phone: '',
    role: 'employee',
    custom_data: {
      department: '',
      position: '',
      hire_date: '',
      salary: 0,
      location: '',
    },
  });

  // Filter and search states
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');

  // Filtered employers
  const filteredEmployers = employers.filter(employer => {
    const matchesSearch = 
      employer.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      `${employer.firstName} ${employer.lastName}`.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRole = roleFilter === 'all' || employer.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || employer.status === statusFilter;
    
    return matchesSearch && matchesRole && matchesStatus;
  }).sort((a, b) => {
    if (sortBy === 'name') {
      return sortOrder === 'asc' 
        ? `${a.firstName} ${a.lastName}`.localeCompare(`${b.firstName} ${b.lastName}`)
        : `${b.firstName} ${b.lastName}`.localeCompare(`${a.firstName} ${a.lastName}`);
    } else if (sortBy === 'role') {
      return sortOrder === 'asc'
        ? a.role.localeCompare(b.role)
        : b.role.localeCompare(a.role);
    } else {
      return sortOrder === 'asc'
        ? new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        : new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
  });

  // Simulate API calls
  const fetchEmployers = async () => {
    setLoading(true);
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      // In real app: fetch from API
    } catch (err) {
      setError('Failed to fetch employers');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateEmployer = async () => {
    try {
      setError(null);
      
      // Validation
      if (newEmployer.password !== newEmployer.confirmPassword) {
        throw new Error('Passwords do not match');
      }

      if (!newEmployer.username || !newEmployer.email || !newEmployer.password) {
        throw new Error('Required fields are missing');
      }

      const newEmp = {
        id: employers.length + 1,
        username: newEmployer.username,
        email: newEmployer.email,
        firstName: newEmployer.firstName,
        lastName: newEmployer.lastName,
        phone: newEmployer.phone,
        role: newEmployer.role,
        status: 'active',
        custom_data: newEmployer.custom_data,
        createdAt: new Date().toISOString()
      };

      setEmployers([...employers, newEmp]);
      setSuccess('Employer created successfully!');
      setOpenCreateModal(false);
      resetNewEmployerForm();
      
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError(err.message || 'Failed to create employer');
    }
  };

  const handleUpdateEmployer = async () => {
    if (!selectedEmployer) return;

    try {
      setError(null);
      
      const updatedEmployers = employers.map(emp => 
        emp.id === selectedEmployer.id ? { ...selectedEmployer } : emp
      );
      
      setEmployers(updatedEmployers);
      setSuccess('Employer updated successfully!');
      setOpenEditModal(false);
      
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError('Failed to update employer');
    }
  };

  const handleDeleteEmployer = async () => {
    if (!selectedEmployer) return;

    try {
      setError(null);
      
      setEmployers(employers.filter(emp => emp.id !== selectedEmployer.id));
      setSuccess('Employer deleted successfully!');
      setOpenDeleteModal(false);
      
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError('Failed to delete employer');
    }
  };

  const resetNewEmployerForm = () => {
    setNewEmployer({
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: '',
      phone: '',
      role: 'employee',
      custom_data: {
        department: '',
        position: '',
        hire_date: '',
        salary: 0,
        location: '',
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
    setOpenEditModal(true);
  };

  const handleOpenDelete = (employer) => {
    setSelectedEmployer(employer);
    setOpenDeleteModal(true);
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Get role color
  const getRoleColor = (role) => {
    switch (role) {
      case 'admin': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'manager': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      default: return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
    }
  };

  // Get status color
  const getStatusColor = (status) => {
    return status === 'active' 
      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
  };

  // Stats calculation
  const totalEmployers = employers.length;
  const activeEmployers = employers.filter(e => e.status === 'active').length;
  const adminCount = employers.filter(e => e.role === 'admin').length;
  const managerCount = employers.filter(e => e.role === 'manager').length;

  return (
    <div className="min-h-screen lg:max-w-5xl bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
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
                Manage user profiles, roles, and access permissions
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                {theme === 'light' ? '🌙' : '☀️'}
              </button>
              <button
                onClick={() => setOpenCreateModal(true)}
                className="inline-flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors"
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
            </div>
          </div>
        )}
        
        {success && (
          <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-lg">
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-green-400 mr-2" />
              <span className="text-green-800 dark:text-green-200">{success}</span>
            </div>
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 transition-colors">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Total Employers</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{totalEmployers}</p>
              </div>
              <Users className="h-10 w-10 text-indigo-500" />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 transition-colors">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Active Users</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{activeEmployers}</p>
              </div>
              <UserCheck className="h-10 w-10 text-green-500" />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 transition-colors">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Administrators</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{adminCount}</p>
              </div>
              <Shield className="h-10 w-10 text-red-500" />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 transition-colors">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Managers</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{managerCount}</p>
              </div>
              <UserCog className="h-10 w-10 text-yellow-500" />
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
                placeholder="Search employers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
            
            <div className="flex flex-wrap gap-4">
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="all">All Roles</option>
                <option value="admin">Admin</option>
                <option value="manager">Manager</option>
                <option value="employee">Employee</option>
              </select>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="date">Sort by Date</option>
                <option value="name">Sort by Name</option>
                <option value="role">Sort by Role</option>
              </select>

              <button
                onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
              >
                {sortOrder === 'asc' ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
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
                    Username
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Full Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Department
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
                    <td colSpan={8} className="px-6 py-12 text-center">
                      <div className="flex justify-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500"></div>
                      </div>
                    </td>
                  </tr>
                ) : filteredEmployers.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-6 py-12 text-center text-gray-500 dark:text-gray-400">
                      No employers found
                    </td>
                  </tr>
                ) : (
                  filteredEmployers.map((employer) => (
                    <tr key={employer.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {employer.username}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 dark:text-white">
                          {employer.firstName} {employer.lastName}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 dark:text-white">
                          {employer.email}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getRoleColor(employer.role)}`}>
                          {employer.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(employer.status)}`}>
                          {employer.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 dark:text-white">
                          {employer.custom_data?.department || 'N/A'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {formatDate(employer.createdAt)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleOpenView(employer)}
                            className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                            title="View Details"
                          >
                            <Eye className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => handleOpenEdit(employer)}
                            className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors"
                            title="Edit"
                          >
                            <Edit2 className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => handleOpenDelete(employer)}
                            className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="h-5 w-5" />
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
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed  transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 dark:bg-gray-900 opacity-75"></div>
            </div>
            <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
              <div className="px-6 pt-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    <UserPlus className="inline-block h-5 w-5 mr-2" />
                    Create New Employer
                  </h3>
                  <button
                    onClick={() => setOpenCreateModal(false)}
                    className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 transition-colors"
                  >
                    <span className="sr-only">Close</span>
                    ✕
                  </button>
                </div>
              </div>
              
              <div className="px-6 py-4">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Username *
                      </label>
                      <input
                        type="text"
                        value={newEmployer.username}
                        onChange={(e) => setNewEmployer({...newEmployer, username: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                        placeholder="john.doe"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Email *
                      </label>
                      <input
                        type="email"
                        value={newEmployer.email}
                        onChange={(e) => setNewEmployer({...newEmployer, email: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Password *
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
                        Confirm Password *
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
                        First Name
                      </label>
                      <input
                        type="text"
                        value={newEmployer.firstName}
                        onChange={(e) => setNewEmployer({...newEmployer, firstName: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                        placeholder="John"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Last Name
                      </label>
                      <input
                        type="text"
                        value={newEmployer.lastName}
                        onChange={(e) => setNewEmployer({...newEmployer, lastName: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                        placeholder="Doe"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Phone
                      </label>
                      <input
                        type="tel"
                        value={newEmployer.phone}
                        onChange={(e) => setNewEmployer({...newEmployer, phone: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                        placeholder="+1 234 567 8900"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Role *
                      </label>
                      <select
                        value={newEmployer.role}
                        onChange={(e) => setNewEmployer({...newEmployer, role: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                      >
                        <option value="employee">Employee</option>
                        <option value="manager">Manager</option>
                        <option value="admin">Administrator</option>
                      </select>
                    </div>
                  </div>

                  <div className="border-t dark:border-gray-700 pt-4">
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                      <Briefcase className="inline-block h-4 w-4 mr-1" />
                      Additional Information
                    </h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Department
                        </label>
                        <input
                          type="text"
                          value={newEmployer.custom_data.department}
                          onChange={(e) => setNewEmployer({
                            ...newEmployer,
                            custom_data: { ...newEmployer.custom_data, department: e.target.value }
                          })}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                          placeholder="Engineering"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Position
                        </label>
                        <input
                          type="text"
                          value={newEmployer.custom_data.position}
                          onChange={(e) => setNewEmployer({
                            ...newEmployer,
                            custom_data: { ...newEmployer.custom_data, position: e.target.value }
                          })}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                          placeholder="Lead Developer"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          <Calendar className="inline-block h-4 w-4 mr-1" />
                          Hire Date
                        </label>
                        <input
                          type="date"
                          value={newEmployer.custom_data.hire_date}
                          onChange={(e) => setNewEmployer({
                            ...newEmployer,
                            custom_data: { ...newEmployer.custom_data, hire_date: e.target.value }
                          })}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          <DollarSign className="inline-block h-4 w-4 mr-1" />
                          Salary
                        </label>
                        <input
                          type="number"
                          value={newEmployer.custom_data.salary}
                          onChange={(e) => setNewEmployer({
                            ...newEmployer,
                            custom_data: { ...newEmployer.custom_data, salary: Number(e.target.value) }
                          })}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                          placeholder="75000"
                        />
                      </div>
                    </div>

                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        <MapPin className="inline-block h-4 w-4 mr-1" />
                        Location
                      </label>
                      <input
                        type="text"
                        value={newEmployer.custom_data.location}
                        onChange={(e) => setNewEmployer({
                          ...newEmployer,
                          custom_data: { ...newEmployer.custom_data, location: e.target.value }
                        })}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                        placeholder="New York, NY"
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700/50 flex justify-end space-x-3">
                <button
                  onClick={() => setOpenCreateModal(false)}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateEmployer}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-md text-sm transition-colors"
                >
                  Create Employer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* View Employer Modal */}
      {openViewModal && selectedEmployer && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className=""></div>
            </div>
            <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="px-6 pt-6">
                <div className="flex items-center justify-between">
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
              </div>
              
              <div className="px-6 py-4">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Username</p>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{selectedEmployer.username}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{selectedEmployer.email}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Full Name</p>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {selectedEmployer.firstName} {selectedEmployer.lastName}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Phone</p>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {selectedEmployer.phone || 'N/A'}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Role</p>
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getRoleColor(selectedEmployer.role)}`}>
                        {selectedEmployer.role}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Status</p>
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(selectedEmployer.status)}`}>
                        {selectedEmployer.status}
                      </span>
                    </div>
                  </div>

                  <div className="border-t dark:border-gray-700 pt-4">
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                      Additional Information
                    </h4>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Department</p>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {selectedEmployer.custom_data?.department || 'N/A'}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Position</p>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {selectedEmployer.custom_data?.position || 'N/A'}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Hire Date</p>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {selectedEmployer.custom_data?.hire_date 
                            ? formatDate(selectedEmployer.custom_data.hire_date) 
                            : 'N/A'}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Salary</p>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {selectedEmployer.custom_data?.salary 
                            ? `$${selectedEmployer.custom_data.salary.toLocaleString()}` 
                            : 'N/A'}
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
                      {formatDate(selectedEmployer.createdAt)}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700/50 flex justify-end">
                <button
                  onClick={() => setOpenViewModal(false)}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-md text-sm transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Employer Modal - Similar to Create Modal but for editing */}
      {openEditModal && selectedEmployer && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className=""></div>
            </div>
            <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
              <div className="px-6 pt-6">
                <div className="flex items-center justify-between">
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
              </div>
              
              <div className="px-6 py-4">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Username
                      </label>
                      <input
                        type="text"
                        value={selectedEmployer.username}
                        onChange={(e) => setSelectedEmployer({...selectedEmployer, username: e.target.value})}
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
                        First Name
                      </label>
                      <input
                        type="text"
                        value={selectedEmployer.firstName}
                        onChange={(e) => setSelectedEmployer({...selectedEmployer, firstName: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Last Name
                      </label>
                      <input
                        type="text"
                        value={selectedEmployer.lastName}
                        onChange={(e) => setSelectedEmployer({...selectedEmployer, lastName: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Phone
                      </label>
                      <input
                        type="tel"
                        value={selectedEmployer.phone}
                        onChange={(e) => setSelectedEmployer({...selectedEmployer, phone: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Role
                      </label>
                      <select
                        value={selectedEmployer.role}
                        onChange={(e) => setSelectedEmployer({...selectedEmployer, role: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                      >
                        <option value="employee">Employee</option>
                        <option value="manager">Manager</option>
                        <option value="admin">Administrator</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Status
                      </label>
                      <select
                        value={selectedEmployer.status}
                        onChange={(e) => setSelectedEmployer({...selectedEmployer, status: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                      >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                      </select>
                    </div>
                  </div>

                  <div className="border-t dark:border-gray-700 pt-4">
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                      Additional Information
                    </h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Department
                        </label>
                        <input
                          type="text"
                          value={selectedEmployer.custom_data?.department || ''}
                          onChange={(e) => setSelectedEmployer({
                            ...selectedEmployer,
                            custom_data: { ...selectedEmployer.custom_data, department: e.target.value }
                          })}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Position
                        </label>
                        <input
                          type="text"
                          value={selectedEmployer.custom_data?.position || ''}
                          onChange={(e) => setSelectedEmployer({
                            ...selectedEmployer,
                            custom_data: { ...selectedEmployer.custom_data, position: e.target.value }
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
                          custom_data: { ...selectedEmployer.custom_data, location: e.target.value }
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
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-md text-sm transition-colors"
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
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 dark:bg-gray-900 opacity-75"></div>
            </div>
            <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-md sm:w-full">
              <div className="px-6 pt-6">
                <div className="flex items-center justify-center">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-red-900">
                    <AlertCircle className="h-6 w-6 text-red-600 dark:text-red-400" />
                  </div>
                </div>
              </div>
              
              <div className="px-6 py-4 text-center">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  Confirm Delete
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Are you sure you want to delete employer <span className="font-semibold">{selectedEmployer.username}</span>?
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
                  Delete
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