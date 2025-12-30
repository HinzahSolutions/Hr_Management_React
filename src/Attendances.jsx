'use client';

import React, { useState } from 'react';
import {
  Search,
  Filter,
  ChevronDown,
  Plus,
  Copy,
  Eye,
  Edit2,
  Trash2,
  CheckCircle,
  MoreVertical,
  Calendar,
  Users,
  Clock,
  AlertCircle,
  TrendingUp,
  TrendingDown,
  RefreshCw,
  Download,
  Settings,
  Bell,
  ArrowRight,
  UserCheck,
  XCircle,
  ChevronLeft,
  ChevronRight,
  BarChart3,
  PieChart as PieChartIcon,
  LineChart as LineChartIcon
} from 'lucide-react';
import { useTheme } from './ThemeContext';

const toValidateData = [
  {
    id: 1,
    employee: 'Vandita Sharma (PEP00)',
    batch: 'None',
    date: '11 November, 2025',
    day: 'Tuesday',
    checkIn: '08:30',
    confirmation: '11 Nov',
    department: 'HR',
    status: 'pending',
    avatarColor: 'bg-gradient-to-br from-pink-500 to-pink-600'
  },
  {
    id: 2,
    employee: 'Vandita Sharma (PEP00)',
    batch: 'Ora-1',
    date: '09 October, 2025',
    day: 'Thursday',
    checkIn: '08:00',
    confirmation: '09 Oct',
    department: 'HR',
    status: 'pending',
    avatarColor: 'bg-gradient-to-br from-pink-500 to-pink-600'
  },
  {
    id: 3,
    employee: 'Vandita Sharma (PEP00)',
    batch: 'Ora-1',
    date: '07 October, 2025',
    day: 'Tuesday',
    checkIn: '08:00',
    confirmation: '07 Oct',
    department: 'HR',
    status: 'pending',
    avatarColor: 'bg-gradient-to-br from-pink-500 to-pink-600'
  },
];

const otData = [
  {
    id: 4,
    employee: 'Vandita Sharma (PEP00)',
    batch: 'None',
    date: '08 November, 2025',
    day: 'Saturday',
    checkIn: '08:40',
    confirmation: '08 Nov',
    department: 'HR',
    status: 'overtime',
    avatarColor: 'bg-gradient-to-br from-pink-500 to-pink-600'
  },
  {
    id: 5,
    employee: 'Vandita Sharma (PEP00)',
    batch: 'None',
    date: '05 November, 2025',
    day: 'Wednesday',
    checkIn: '00:08',
    confirmation: '05 Nov',
    department: 'HR',
    status: 'overtime',
    avatarColor: 'bg-gradient-to-br from-pink-500 to-pink-600'
  },
  {
    id: 6,
    employee: 'Vandita Sharma (PEP00)',
    batch: 'Ora-1',
    date: '30 October, 2025',
    day: 'Thursday',
    checkIn: '08:00',
    confirmation: '30 Oct',
    department: 'HR',
    status: 'overtime',
    avatarColor: 'bg-gradient-to-br from-pink-500 to-pink-600'
  },
];

const validatedData = [
  {
    id: 13,
    employee: 'ARJIT Chaudhary (arjit9800-)',
    batch: 'None',
    date: '10 November, 2025',
    day: 'Monday',
    checkIn: '08:30',
    confirmation: '10 Nov',
    department: 'Engineering',
    status: 'validated',
    avatarColor: 'bg-gradient-to-br from-blue-500 to-blue-600'
  },
  {
    id: 14,
    employee: 'ARYAN AWATHI (ANN123)',
    batch: 'None',
    date: '10 November, 2025',
    day: 'Monday',
    checkIn: '07:30',
    confirmation: '10 Nov',
    department: 'Sales',
    status: 'validated',
    avatarColor: 'bg-gradient-to-br from-green-500 to-green-600'
  },
  {
    id: 15,
    employee: 'BALAHARSHINI L (BL2035)',
    batch: 'None',
    date: '10 November, 2025',
    day: 'Monday',
    checkIn: '06:00',
    confirmation: '10 Nov',
    department: 'Design',
    status: 'validated',
    avatarColor: 'bg-gradient-to-br from-purple-500 to-purple-600'
  },
];

const summaryData = {
  toValidate: { count: 3, change: '+1', trend: 'up' },
  overtime: { count: 12, change: '+3', trend: 'up' },
  validated: { count: 18, change: '+5', trend: 'up' },
  pending: { count: 3, change: '-1', trend: 'down' }
};

export default function Attendances() {
  const { theme } = useTheme();
  
  // Theme helper functions
  const getAccentColor = () => theme?.accent || 'orange-600';
  const getBorderColor = () => theme?.borderColor || 'border-orange-600';
  const getTextAccent = () => theme?.accent ? `text-${theme.accent}` : 'text-orange-600';
  const getButtonGradient = () => theme?.button ? `bg-gradient-to-r ${theme.button}` : 'bg-gradient-to-r from-orange-500 to-orange-600';
  const getButtonHover = () => theme?.buttonHover || 'hover:from-orange-600 hover:to-orange-700';
  const getLightBg = () => theme?.lightBg || 'bg-orange-50';
  const getSidebarActive = () => theme?.sidebarActive || 'bg-orange-200';
  const getRingColor = () => theme?.ringColor || 'ring-orange-500';

  const [tab, setTab] = useState('validate'); // 'validate' | 'ot' | 'validated'
  const [selectedAll, setSelectedAll] = useState(false);
  const [selectedRows, setSelectedRows] = useState({});
  const [activeFilter, setActiveFilter] = useState('all');
  const [page, setPage] = useState(1);
  const [viewMode, setViewMode] = useState('table'); // 'table' or 'card'
  const totalPages = 3;

  const data = tab === 'validate' ? toValidateData : tab === 'ot' ? otData : validatedData;

  const handleSelectAll = () => {
    const newSel = {};
    data.forEach((_, i) => (newSel[i] = !selectedAll));
    setSelectedRows(newSel);
    setSelectedAll(!selectedAll);
  };

  const handleSelectRow = (i) => {
    const newSel = { ...selectedRows, [i]: !selectedRows[i] };
    setSelectedRows(newSel);
    setSelectedAll(Object.values(newSel).every((v) => v));
  };

  const getAvatarInitials = (name) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      case 'overtime': return 'bg-purple-100 text-purple-700';
      case 'validated': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50/50 via-white to-blue-50/30 p-4 lg:p-6">
      {/* HEADER */}
      <div className="mb-6 lg:mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Attendance Management</h1>
            <p className="text-gray-600 mt-1">Manage and validate employee attendance records</p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search attendance..."
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
              <Users className="h-4 w-4" /> Cards
            </button>
          </div>
          
          <div className="flex items-center gap-1 border border-gray-300 rounded-xl px-3 py-2 bg-white">
            <Calendar className="h-4 w-4 text-gray-500" />
            <span className="text-sm text-gray-700">12 Nov 2025</span>
          </div>
          
          {['all', 'today', 'week', 'month'].map((filter) => (
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
          
          <button className={`p-2 ${getLightBg()} ${getTextAccent()} rounded-xl hover:opacity-90`}>
            <Download className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6 lg:mb-8">
        <div className="bg-white rounded-2xl p-5 lg:p-6 shadow-lg border border-gray-200/50 hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-yellow-50 rounded-xl">
              <AlertCircle className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="flex items-center text-sm text-yellow-600 font-medium">
              {summaryData.toValidate.trend === 'up' ? 
                <TrendingUp className="h-4 w-4 mr-1" /> : 
                <TrendingDown className="h-4 w-4 mr-1" />
              }
              {summaryData.toValidate.change}
            </div>
          </div>
          <h3 className="text-sm font-medium text-gray-500 mb-1">To Validate</h3>
          <div className="flex items-baseline gap-2">
            <p className="text-2xl lg:text-3xl font-bold text-gray-900">{summaryData.toValidate.count}</p>
            <span className="text-sm text-gray-500">attendance</span>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100">
            <button 
              onClick={() => setTab('validate')}
              className={`text-sm font-medium ${getTextAccent()} hover:opacity-90 flex items-center`}
            >
              View all <ArrowRight className="h-4 w-4 ml-1" />
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 lg:p-6 shadow-lg border border-gray-200/50 hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-purple-50 rounded-xl">
              <Clock className="h-6 w-6 text-purple-600" />
            </div>
            <div className="flex items-center text-sm text-purple-600 font-medium">
              <TrendingUp className="h-4 w-4 mr-1" />
              {summaryData.overtime.change}
            </div>
          </div>
          <h3 className="text-sm font-medium text-gray-500 mb-1">Overtime</h3>
          <div className="flex items-baseline gap-2">
            <p className="text-2xl lg:text-3xl font-bold text-gray-900">{summaryData.overtime.count}</p>
            <span className="text-sm text-gray-500">records</span>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100">
            <button 
              onClick={() => setTab('ot')}
              className={`text-sm font-medium ${getTextAccent()} hover:opacity-90 flex items-center`}
            >
              View all <ArrowRight className="h-4 w-4 ml-1" />
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 lg:p-6 shadow-lg border border-gray-200/50 hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-green-50 rounded-xl">
              <UserCheck className="h-6 w-6 text-green-600" />
            </div>
            <div className="flex items-center text-sm text-green-600 font-medium">
              <TrendingUp className="h-4 w-4 mr-1" />
              {summaryData.validated.change}
            </div>
          </div>
          <h3 className="text-sm font-medium text-gray-500 mb-1">Validated</h3>
          <div className="flex items-baseline gap-2">
            <p className="text-2xl lg:text-3xl font-bold text-gray-900">{summaryData.validated.count}</p>
            <span className="text-sm text-gray-500">attendance</span>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100">
            <button 
              onClick={() => setTab('validated')}
              className={`text-sm font-medium ${getTextAccent()} hover:opacity-90 flex items-center`}
            >
              View all <ArrowRight className="h-4 w-4 ml-1" />
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 lg:p-6 shadow-lg border border-gray-200/50 hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className={`p-3 ${getLightBg()} rounded-xl`}>
              <AlertCircle className={`h-6 w-6 ${getTextAccent()}`} />
            </div>
            <button className="p-1 hover:bg-gray-100 rounded-lg">
              <RefreshCw className="h-5 w-5 text-gray-600" />
            </button>
          </div>
          <h3 className="text-sm font-medium text-gray-500 mb-1">Pending Action</h3>
          <div className="flex items-baseline gap-2">
            <p className="text-2xl lg:text-3xl font-bold text-gray-900">{summaryData.pending.count}</p>
            <span className="text-sm text-gray-500">awaiting</span>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100">
            <button className="text-sm font-medium text-gray-600 hover:text-gray-900">
              Take action
            </button>
          </div>
        </div>
      </div>

      {/* TABS */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200/50 mb-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 p-6">
          <div className="flex items-center gap-6">
            <div className="flex gap-1 border-b border-gray-200">
              {[
                { key: 'validate', label: 'To Validate', icon: <AlertCircle className="h-4 w-4" /> },
                { key: 'ot', label: 'Overtime', icon: <Clock className="h-4 w-4" /> },
                { key: 'validated', label: 'Validated', icon: <UserCheck className="h-4 w-4" /> },
              ].map((t) => (
                <button
                  key={t.key}
                  onClick={() => {
                    setTab(t.key);
                    setSelectedAll(false);
                    setSelectedRows({});
                  }}
                  className={`flex items-center gap-2 px-4 py-3 font-medium border-b-2 transition-colors ${
                    tab === t.key
                      ? `${getBorderColor()} ${getTextAccent()}`
                      : 'border-transparent text-gray-600 hover:text-gray-800'
                  }`}
                >
                  {t.icon}
                  {t.label}
                  <span className={`ml-2 px-2 py-0.5 text-xs font-medium rounded-full ${
                    tab === t.key ? 'bg-white text-gray-900' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {tab === 'validate' ? 3 : tab === 'ot' ? 12 : 18}
                  </span>
                </button>
              ))}
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={handleSelectAll}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedAll
                  ? 'bg-green-600 text-white hover:bg-green-700'
                  : `${getLightBg()} ${getTextAccent()} hover:opacity-90`
              }`}
            >
              {selectedAll ? 'Deselect All' : 'Select All'}
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-xl">
              <MoreVertical className="h-5 w-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {/* TABLE VIEW */}
      {viewMode === 'table' && (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200/50 overflow-hidden">
          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className={`${getLightBg()} border-b border-gray-200`}>
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
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Batch</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Date</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Day</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Check-In</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    {tab === 'validate' ? 'Confirmation' : tab === 'ot' ? 'Status' : 'Actions'}
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {data.map((row, i) => (
                  <tr key={row.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={selectedRows[i] || false}
                        onChange={() => handleSelectRow(i)}
                        className={`rounded border-gray-300 ${getTextAccent()} focus:${getRingColor()}`}
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 ${row.avatarColor} rounded-xl flex items-center justify-center`}>
                          <span className="text-white font-medium">{getAvatarInitials(row.employee)}</span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{row.employee.split('(')[0].trim()}</p>
                          <p className="text-xs text-gray-500">{row.department}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                        row.batch === 'None' ? 'bg-gray-100 text-gray-700' : 'bg-blue-100 text-blue-700'
                      }`}>
                        {row.batch}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">{row.date}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{row.day}</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium bg-green-100 text-green-700">
                        <Clock className="h-4 w-4 mr-1" /> {row.checkIn}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {tab === 'validate' ? (
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-700">{row.confirmation}</span>
                          <button className={`px-3 py-1.5 ${getButtonGradient()} ${getButtonHover()} text-white text-sm font-medium rounded-lg flex items-center gap-1`}>
                            <CheckCircle className="h-3 w-3" /> Validate
                          </button>
                        </div>
                      ) : tab === 'ot' ? (
                        <div className="flex items-center gap-2">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(row.status)}`}>
                            {row.status === 'overtime' ? 'Overtime' : 'Normal'}
                          </span>
                          <span className="text-sm text-gray-700">{row.confirmation}</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-700">{row.confirmation}</span>
                          <div className="flex items-center gap-1">
                            <button className="p-1.5 hover:bg-gray-100 rounded-lg">
                              <Copy className="h-4 w-4 text-gray-600" />
                            </button>
                            <button className="p-1.5 hover:bg-gray-100 rounded-lg">
                              <Eye className="h-4 w-4 text-gray-600" />
                            </button>
                          </div>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                          <Edit2 className="h-4 w-4 text-gray-600" />
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                          <Trash2 className="h-4 w-4 text-red-600" />
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                          <MoreVertical className="h-4 w-4 text-gray-600" />
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
                Showing <span className="font-medium">{data.length}</span> of{' '}
                <span className="font-medium">{tab === 'validate' ? 3 : tab === 'ot' ? 12 : 18}</span> records
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
                    {[1, 2, 3].map(p => (
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
          {data.map((row) => (
            <div key={row.id} className="bg-white rounded-2xl shadow-lg border border-gray-200/50 p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 ${row.avatarColor} rounded-xl flex items-center justify-center`}>
                    <span className="text-white text-lg font-bold">{getAvatarInitials(row.employee)}</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">{row.employee.split('(')[0].trim()}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-sm text-gray-500">{row.department}</span>
                      <span className="text-xs text-gray-400">•</span>
                      <span className="text-xs text-gray-500">{row.employee.match(/\(([^)]+)\)/)?.[1] || ''}</span>
                    </div>
                  </div>
                </div>
                <button className="p-2 hover:bg-gray-100 rounded-xl">
                  <MoreVertical className="h-5 w-5 text-gray-600" />
                </button>
              </div>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Date</span>
                  <span className="font-medium text-gray-900">{row.date}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Day</span>
                  <span className="font-medium text-gray-900">{row.day}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Check-In</span>
                  <span className="inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium bg-green-100 text-green-700">
                    <Clock className="h-4 w-4 mr-1" /> {row.checkIn}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Batch</span>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                    row.batch === 'None' ? 'bg-gray-100 text-gray-700' : 'bg-blue-100 text-blue-700'
                  }`}>
                    {row.batch}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div>
                  <span className="text-sm text-gray-500">Status</span>
                  <p className={`text-sm font-medium ${
                    tab === 'validate' ? 'text-yellow-600' : 
                    tab === 'ot' ? 'text-purple-600' : 'text-green-600'
                  }`}>
                    {tab === 'validate' ? 'To Validate' : tab === 'ot' ? 'Overtime' : 'Validated'}
                  </p>
                </div>
                
                {tab === 'validate' ? (
                  <button className={`px-4 py-2 ${getButtonGradient()} ${getButtonHover()} text-white text-sm font-medium rounded-lg flex items-center gap-2`}>
                    <CheckCircle className="h-4 w-4" /> Validate
                  </button>
                ) : (
                  <div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-gray-100 rounded-lg">
                      <Eye className="h-4 w-4 text-gray-600" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-lg">
                      <Edit2 className="h-4 w-4 text-gray-600" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* FLOATING ACTION BUTTON */}
    
    </div>
  );
}