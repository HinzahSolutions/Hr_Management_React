import React, { useState } from 'react';
import {
  Search, Filter, ChevronDown, Plus, CheckCircle, XCircle,
  Copy, Edit2, Trash2, MoreVertical, X, ArrowLeft, Menu, Eye,
  ChevronRight, Calendar, User, Download, Settings, Bell, BarChart3,
  Grid3X3, Clock, Users, TrendingUp, TrendingDown, RefreshCw, Mail,
  Phone, MapPin, ChevronUp, ChevronLeft, Shield, FileText, Zap,
  Home, Briefcase, Monitor, Building, Check, ArrowRight, Target
} from 'lucide-react';
import { useTheme } from './ThemeContext';

const workTypeRequests = [
  {
    id: 1,
    employee: 'ARJIT Chaudhary',
    code: 'ARJ19800',
    department: 'Engineering',
    requestedWorkType: 'Remote',
    previousCurrent: 'Office',
    requestedDate: '12 Nov, 2025',
    requestedTill: '13 Nov, 2025',
    status: 'Requested',
    description: 'Personal project work',
    priority: 'Medium',
    avatarColor: 'from-blue-500 to-cyan-500'
  },
  {
    id: 2,
    employee: 'Vandita Sharma',
    code: 'PEP00',
    department: 'HR',
    requestedWorkType: 'Work From Home',
    previousCurrent: 'Hybrid',
    requestedDate: '11 Nov, 2025',
    requestedTill: 'None',
    status: 'Approved',
    description: 'Medical emergency recovery',
    priority: 'High',
    avatarColor: 'from-green-500 to-emerald-500'
  },
  {
    id: 3,
    employee: 'ARJIT Chaudhary',
    code: 'ARJ19800',
    department: 'Engineering',
    requestedWorkType: 'Work From Home',
    previousCurrent: 'Office',
    requestedDate: '10 Dec, 2025',
    requestedTill: 'None',
    status: 'Rejected',
    description: 'Project deployment week',
    priority: 'Medium',
    avatarColor: 'from-blue-500 to-cyan-500'
  },
  {
    id: 4,
    employee: 'David King',
    code: 'PEP10',
    department: 'Sales',
    requestedWorkType: 'Work From Office',
    previousCurrent: 'Remote',
    requestedDate: '10 Nov, 2025',
    requestedTill: '10 Nov, 2025',
    status: 'Requested',
    description: 'Client meeting requirement',
    priority: 'High',
    avatarColor: 'from-purple-500 to-pink-500'
  },
  {
    id: 5,
    employee: 'Zohir Djenden',
    code: 'PEP3658',
    department: 'Marketing',
    requestedWorkType: 'Work From Office',
    previousCurrent: 'Remote',
    requestedDate: '10 Nov, 2025',
    requestedTill: 'None',
    status: 'Approved',
    description: 'Team collaboration needed',
    priority: 'Medium',
    avatarColor: 'from-amber-500 to-orange-500'
  },
  {
    id: 6,
    employee: 'ARYAN AWATHI',
    code: 'ANN123',
    department: 'Engineering',
    requestedWorkType: 'Work From Home',
    previousCurrent: 'Office',
    requestedDate: '07 Nov, 2025',
    requestedTill: 'None',
    status: 'Rejected',
    description: 'On-site server maintenance',
    priority: 'High',
    avatarColor: 'from-red-500 to-pink-500'
  },
  {
    id: 7,
    employee: 'Nishanthini R',
    code: 'NR310',
    department: 'Design',
    requestedWorkType: 'Work From Home',
    previousCurrent: 'Office',
    requestedDate: '03 Nov, 2025',
    requestedTill: '03 Nov, 2025',
    status: 'Approved',
    description: 'Design review day',
    priority: 'Low',
    avatarColor: 'from-indigo-500 to-blue-500'
  },
  {
    id: 8,
    employee: 'Madison Kelly',
    code: 'PEP35',
    department: 'Operations',
    requestedWorkType: 'Work From Home',
    previousCurrent: 'Office',
    requestedDate: '04 Jul, 2025',
    requestedTill: '15 Jul, 2025',
    status: 'Approved',
    description: 'Extended remote work period',
    priority: 'Medium',
    avatarColor: 'from-teal-500 to-green-500'
  },
];

export default function WorkTypeRequests() {
  const { theme } = useTheme();
  
  // Theme helper functions
  const getAccentColor = () => theme?.accent || 'orange-600';
  const getBorderColor = () => theme?.borderColor || 'border-orange-600';
  const getTextAccent = () => theme?.accent ? `text-${theme.accent}` : 'text-orange-600';
  const getButtonGradient = () => theme?.button ? `bg-gradient-to-r ${theme.button}` : 'bg-gradient-to-r from-orange-500 to-orange-600';
  const getButtonHover = () => theme?.buttonHover || 'hover:from-orange-600 hover:to-orange-700';
  const getLightBg = () => theme?.lightBg || 'bg-orange-50';
  const getRingColor = () => theme?.ringColor || 'ring-orange-500';

  const [selectedAll, setSelectedAll] = useState(false);
  const [selectedRows, setSelectedRows] = useState({});
  const [viewMode, setViewMode] = useState('table');
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const totalPages = 2;

  const handleSelectAll = () => {
    const newSelected = {};
    workTypeRequests.forEach((_, i) => (newSelected[i] = !selectedAll));
    setSelectedRows(newSelected);
    setSelectedAll(!selectedAll);
  };

  const handleSelectRow = (index) => {
    const newSelected = { ...selectedRows, [index]: !selectedRows[index] };
    setSelectedRows(newSelected);
    setSelectedAll(Object.values(newSelected).every(v => v));
  };

  const getStatusColor = (status) => {
    if (status === 'Approved') return 'bg-green-100 text-green-800';
    if (status === 'Rejected') return 'bg-red-100 text-red-800';
    return 'bg-yellow-100 text-yellow-800';
  };

  const getPriorityColor = (priority) => {
    if (priority === 'High') return 'bg-red-100 text-red-800';
    if (priority === 'Medium') return 'bg-yellow-100 text-yellow-800';
    return 'bg-green-100 text-green-800';
  };

  const getWorkTypeIcon = (type) => {
    if (type.includes('Home')) return <Home className="h-4 w-4" />;
    if (type.includes('Office')) return <Building className="h-4 w-4" />;
    if (type.includes('Remote')) return <Monitor className="h-4 w-4" />;
    return <Briefcase className="h-4 w-4" />;
  };

  const filteredRequests = workTypeRequests.filter(request => {
    const matchesSearch = 
      request.employee.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.department.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeFilter === 'all') return matchesSearch;
    if (activeFilter === 'requested') return matchesSearch && request.status === 'Requested';
    if (activeFilter === 'approved') return matchesSearch && request.status === 'Approved';
    if (activeFilter === 'rejected') return matchesSearch && request.status === 'Rejected';
    return matchesSearch;
  });

  const summaryData = {
    total: workTypeRequests.length,
    requested: workTypeRequests.filter(r => r.status === 'Requested').length,
    approved: workTypeRequests.filter(r => r.status === 'Approved').length,
    rejected: workTypeRequests.filter(r => r.status === 'Rejected').length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50/50 via-white to-blue-50/30">
      {/* HEADER */}
      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-sm border-b border-gray-200/50 p-4 lg:p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Work Type Requests</h1>
            <p className="text-gray-600 mt-1">Manage work location and mode change requests</p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search requests..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`pl-10 pr-4 py-2 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 ${getRingColor()} focus:border-transparent w-full lg:w-64`}
              />
            </div>
            
            <button className={`p-2 ${getLightBg()} ${getTextAccent()} rounded-xl hover:opacity-90`}>
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
        <div className="flex items-center gap-2 mt-6 overflow-x-auto scrollbar-hide">
          <div className="flex items-center gap-2 p-1 bg-gray-100 rounded-xl">
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
              <Grid3X3 className="h-4 w-4" /> Cards
            </button>
          </div>
          
          {['all', 'requested', 'approved', 'rejected'].map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-xl text-sm font-medium capitalize whitespace-nowrap ${
                activeFilter === filter
                  ? `${getButtonGradient()} ${getButtonHover()} text-white`
                  : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-300'
              }`}
            >
              {filter}
            </button>
          ))}
          
          <div className="flex items-center gap-1 border border-gray-300 rounded-xl px-3 py-2 bg-white">
            <Calendar className="h-4 w-4 text-gray-500" />
            <span className="text-sm text-gray-700">Nov 2025</span>
          </div>
        </div>
      </div>

      {/* SUMMARY CARDS */}
      <div className="p-4 lg:p-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6">
          <div className="bg-white rounded-2xl p-5 shadow-lg border border-gray-200/50">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-50 rounded-xl">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div className="flex items-center text-sm text-blue-600 font-medium">
                <TrendingUp className="h-4 w-4 mr-1" /> +{Math.floor(summaryData.total * 0.1)}
              </div>
            </div>
            <h3 className="text-sm font-medium text-gray-500 mb-1">Total Requests</h3>
            <p className="text-2xl lg:text-3xl font-bold text-gray-900">{summaryData.total}</p>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-lg border border-gray-200/50">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-yellow-50 rounded-xl">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="flex items-center text-sm text-yellow-600 font-medium">
                <TrendingUp className="h-4 w-4 mr-1" /> +{Math.floor(summaryData.requested * 0.2)}
              </div>
            </div>
            <h3 className="text-sm font-medium text-gray-500 mb-1">Pending</h3>
            <p className="text-2xl lg:text-3xl font-bold text-yellow-600">{summaryData.requested}</p>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-lg border border-gray-200/50">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-green-50 rounded-xl">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div className="flex items-center text-sm text-green-600 font-medium">
                <TrendingUp className="h-4 w-4 mr-1" /> +{Math.floor(summaryData.approved * 0.15)}
              </div>
            </div>
            <h3 className="text-sm font-medium text-gray-500 mb-1">Approved</h3>
            <p className="text-2xl lg:text-3xl font-bold text-green-600">{summaryData.approved}</p>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-lg border border-gray-200/50">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 ${getLightBg()} rounded-xl`}>
                <XCircle className={`h-6 w-6 ${getTextAccent()}`} />
              </div>
              <button className="p-1 hover:bg-gray-100 rounded-lg">
                <RefreshCw className="h-5 w-5 text-gray-600" />
              </button>
            </div>
            <h3 className="text-sm font-medium text-gray-500 mb-1">Rejected</h3>
            <p className="text-2xl lg:text-3xl font-bold text-gray-900">{summaryData.rejected}</p>
          </div>
        </div>

        {/* TABLE VIEW */}
        {viewMode === 'table' && (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200/50 overflow-hidden">
            {/* Table Header */}
            <div className={`${getLightBg()} border-b border-gray-200`}>
              <div className="flex items-center justify-between p-6">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Work Type Requests</h3>
                  <p className="text-sm text-gray-500 mt-1">{filteredRequests.length} requests found</p>
                </div>
                
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleSelectAll}
                    className={`px-4 py-2 rounded-xl text-sm font-medium ${
                      selectedAll
                        ? `${getButtonGradient()} ${getButtonHover()} text-white`
                        : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-300'
                    }`}
                  >
                    {selectedAll ? 'Deselect All' : 'Select All'}
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-xl">
                    <Download className="h-5 w-5 text-gray-600" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-xl">
                    <MoreVertical className="h-5 w-5 text-gray-600" />
                  </button>
                  <button
                    className={`px-4 py-2 ${getButtonGradient()} ${getButtonHover()} text-white text-sm font-medium rounded-xl flex items-center gap-2`}
                  >
                    <Plus className="h-4 w-4" /> Create Request
                  </button>
                </div>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left">
                      <input
                        type="checkbox"
                        checked={selectedAll}
                        onChange={handleSelectAll}
                        className={`rounded border-gray-300 ${getTextAccent()} focus:${getRingColor()}`}
                      />
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Employee</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Work Type</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Current</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Request Date</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Priority</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredRequests.map((req, idx) => (
                    <tr key={req.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <input
                          type="checkbox"
                          checked={selectedRows[idx] || false}
                          onChange={() => handleSelectRow(idx)}
                          className={`rounded border-gray-300 ${getTextAccent()} focus:${getRingColor()}`}
                        />
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${req.avatarColor} flex items-center justify-center`}>
                            <span className="text-white font-medium">
                              {req.employee.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <div className="text-left">
                            <p className="font-medium text-gray-900">{req.employee}</p>
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-gray-500">{req.code}</span>
                              <span className="text-xs text-gray-400">•</span>
                              <span className="text-xs text-gray-500">{req.department}</span>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          {getWorkTypeIcon(req.requestedWorkType)}
                          <span className="text-sm font-medium text-gray-900">{req.requestedWorkType}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">{req.previousCurrent}</td>
                      <td className="px-6 py-4">
                        <div className="space-y-1">
                          <div className="text-sm text-gray-700">{req.requestedDate}</div>
                          {req.requestedTill !== 'None' && (
                            <div className="flex items-center gap-1 text-xs text-gray-500">
                              <ArrowRight className="h-3 w-3" />
                              <span>Till {req.requestedTill}</span>
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium ${getStatusColor(req.status)}`}>
                          {req.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium ${getPriorityColor(req.priority)}`}>
                          {req.priority}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          {req.status === 'Requested' && (
                            <>
                              <button className="px-3 py-1.5 bg-green-100 text-green-700 rounded-lg text-sm font-medium hover:bg-green-200 flex items-center gap-1">
                                <CheckCircle className="h-4 w-4" /> Approve
                              </button>
                              <button className="px-3 py-1.5 bg-red-100 text-red-700 rounded-lg text-sm font-medium hover:bg-red-200 flex items-center gap-1">
                                <XCircle className="h-4 w-4" /> Reject
                              </button>
                            </>
                          )}
                          <button className="p-1.5 hover:bg-gray-100 rounded-lg">
                            <Eye className="h-4 w-4 text-gray-600" />
                          </button>
                          <button className="p-1.5 hover:bg-gray-100 rounded-lg">
                            <Edit2 className="h-4 w-4 text-gray-600" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="border-t border-gray-200 px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  Showing <span className="font-medium">{filteredRequests.length}</span> of{' '}
                  <span className="font-medium">{workTypeRequests.length}</span> requests
                </div>
                
                <div className="flex items-center gap-4">
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
                          className={`w-10 h-10 rounded-lg font-medium ${
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
                  
                  <div className="text-sm text-gray-600">
                    Page <span className="font-medium">{page}</span> of <span className="font-medium">{totalPages}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CARD VIEW */}
        {viewMode === 'card' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRequests.map((req) => (
              <div key={req.id} className="bg-white rounded-2xl shadow-lg border border-gray-200/50 p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${req.avatarColor} flex items-center justify-center`}>
                      <span className="text-white text-lg font-bold">
                        {req.employee.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">{req.employee}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <code className="text-xs bg-gray-100 px-2 py-0.5 rounded">{req.code}</code>
                        <span className="text-xs text-gray-500">{req.department}</span>
                      </div>
                    </div>
                  </div>
                  <button className="p-2 hover:bg-gray-100 rounded-xl">
                    <MoreVertical className="h-5 w-5 text-gray-600" />
                  </button>
                </div>
                
                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Work Type</span>
                    <div className="flex items-center gap-2">
                      {getWorkTypeIcon(req.requestedWorkType)}
                      <span className="font-medium text-gray-900">{req.requestedWorkType}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Current</span>
                    <span className="text-sm font-medium text-gray-700">{req.previousCurrent}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Request Date</span>
                    <span className="text-sm font-medium text-gray-900">{req.requestedDate}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Status</span>
                    <span className={`px-3 py-1 rounded-lg text-xs font-medium ${getStatusColor(req.status)}`}>
                      {req.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Priority</span>
                    <span className={`px-3 py-1 rounded-lg text-xs font-medium ${getPriorityColor(req.priority)}`}>
                      {req.priority}
                    </span>
                  </div>
                  {req.description && (
                    <div className="pt-3 border-t border-gray-100">
                      <p className="text-sm text-gray-600">{req.description}</p>
                    </div>
                  )}
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <button className="text-sm font-medium text-gray-600 hover:text-gray-900 flex items-center">
                    <Eye className="h-4 w-4 mr-1" /> View Details
                  </button>
                  
                  <div className="flex items-center gap-2">
                    {req.status === 'Requested' && (
                      <>
                        <button className="p-1.5 bg-green-100 text-green-700 rounded-lg hover:bg-green-200">
                          <CheckCircle className="h-4 w-4" />
                        </button>
                        <button className="p-1.5 bg-red-100 text-red-700 rounded-lg hover:bg-red-200">
                          <XCircle className="h-4 w-4" />
                        </button>
                      </>
                    )}
                    <button className="p-1.5 hover:bg-gray-100 rounded-lg">
                      <Edit2 className="h-4 w-4 text-gray-600" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* FLOATING ACTION BUTTON */}
      <button className={`
        fixed bottom-8 right-8 z-50 
        flex h-16 w-16 items-center justify-center 
        rounded-2xl shadow-2xl 
        ${getButtonGradient()} ${getButtonHover()}
        text-white 
        transition-all duration-300
        hover:shadow-3xl hover:scale-110
        ring-4 ring-white/20
      `}>
        <Plus className="h-8 w-8" />
      </button>

      {/* QUICK STATS */}
      <div className="fixed bottom-8 left-8 z-40 bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-4 border border-gray-200/50 hidden lg:block">
        <div className="flex items-center gap-3 mb-3">
          <div className={`p-2 ${getLightBg()} rounded-xl`}>
            <Briefcase className={`h-5 w-5 ${getTextAccent()}`} />
          </div>
          <div>
            <h3 className="font-bold text-gray-900">Work Type Stats</h3>
            <p className="text-xs text-gray-500">{summaryData.requested} pending requests</p>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Approval Rate</span>
            <span className="font-medium text-gray-900">
              {((summaryData.approved / summaryData.total) * 100).toFixed(1)}%
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Most Requested</span>
            <span className="font-medium text-gray-900">WFH</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Avg Processing</span>
            <span className="font-medium text-gray-900">1.5 days</span>
          </div>
        </div>
      </div>
    </div>
  );
}