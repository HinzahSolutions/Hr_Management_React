'use client';

import React, { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  AreaChart,
  Area
} from 'recharts';
import { 
  Bell, 
  Plus, 
  Check, 
  X, 
  Users, 
  Calendar, 
  TrendingUp, 
  Package, 
  Clock, 
  RefreshCw,
  ChevronRight,
  Search,
  Filter,
  MoreVertical,
  Eye,
  Download,
  Settings,
  UserPlus,
  BarChart3,
  PieChart as PieChartIcon,
  LineChart as LineChartIcon,
  Activity,
  Target,
  Award,
  Zap,
  TrendingDown,
  UserCheck,
  UserX,
  Coffee,
  Timer,
  AlertCircle,
  CheckCircle,
  XCircle,
  ArrowRight,
  ChevronLeft,
  EyeOff,
  Home,
  Briefcase,
  MessageSquare,
  Shield
} from 'lucide-react';
import { useTheme } from './ThemeContext';

const offlineEmployees = [
  { id: 1, name: 'ARJIT Chaudhary', status: 'Expected working', avatar: 'AC', department: 'Engineering', timeOffline: '2h 30m', color: 'bg-gradient-to-br from-blue-500 to-blue-600' },
  { id: 2, name: 'ARYAN AWATHI', status: 'Expected working', avatar: 'AA', department: 'Sales', timeOffline: '1h 45m', color: 'bg-gradient-to-br from-green-500 to-green-600' },
  { id: 3, name: 'Abigail Roberts', status: 'Expected working', avatar: 'AR', department: 'Marketing', timeOffline: '3h 15m', color: 'bg-gradient-to-br from-purple-500 to-purple-600' },
  { id: 4, name: 'Alexander Smith', status: 'Expected working', avatar: 'AS', department: 'HR', timeOffline: '45m', color: 'bg-gradient-to-br from-pink-500 to-pink-600' },
  { id: 5, name: 'Amelia Cooper', status: 'Expected working', avatar: 'AC', department: 'Finance', timeOffline: '4h 20m', color: 'bg-gradient-to-br from-yellow-500 to-yellow-600' },
  { id: 6, name: 'Asif Ahmad', status: 'Expected working', avatar: 'AA', department: 'Operations', timeOffline: '2h 00m', color: 'bg-gradient-to-br from-red-500 to-red-600' },
];

const hoursChartData = [
  { dept: 'S/W Dept.', pending: 10, worked: 20, overtime: 5 },
  { dept: 'Sales', pending: 5, worked: 18, overtime: 8 },
  { dept: 'HR', pending: 3, worked: 15, overtime: 2 },
  { dept: 'Marketing', pending: 8, worked: 22, overtime: 6 },
  { dept: 'Finance', pending: 2, worked: 12, overtime: 1 },
  { dept: 'Managers', pending: 4, worked: 25, overtime: 10 },
  { dept: 'Growth Hacking', pending: 6, worked: 19, overtime: 4 },
  { dept: 'Expert Stage', pending: 1, worked: 10, overtime: 3 },
];

const attendanceToValidate = [
  {
    id: 1,
    employee: 'Vandita Sharma (PEP00)',
    department: 'HR',
    date: '11 November, 2025',
    checkIn: '08:30',
    checkOut: '17:45',
    status: 'pending',
    avatar: 'VS',
    color: 'bg-gradient-to-br from-pink-500 to-pink-600'
  },
  {
    id: 2,
    employee: 'Michael Brown (PEO1)',
    department: 'Engineering',
    date: '11 November, 2025',
    checkIn: '09:15',
    checkOut: '18:30',
    status: 'pending',
    avatar: 'MB',
    color: 'bg-gradient-to-br from-blue-500 to-blue-600'
  },
  {
    id: 3,
    employee: 'Sarah Wilson (PEO3)',
    department: 'Sales',
    date: '11 November, 2025',
    checkIn: '08:45',
    checkOut: '17:15',
    status: 'pending',
    avatar: 'SW',
    color: 'bg-gradient-to-br from-green-500 to-green-600'
  },
];

const breakEmployees = [
  { id: 1, name: 'David Lee', department: 'Engineering', breakStart: '14:30', duration: '30m', avatar: 'DL', color: 'bg-gradient-to-br from-blue-500 to-blue-600' },
  { id: 2, name: 'Emma Davis', department: 'Design', breakStart: '15:15', duration: '45m', avatar: 'ED', color: 'bg-gradient-to-br from-purple-500 to-purple-600' },
];

const overtimeToApprove = [
  { id: 1, name: 'Robert Johnson', hours: 4, date: '11 Nov', reason: 'Project Deadline', avatar: 'RJ', color: 'bg-gradient-to-br from-yellow-500 to-yellow-600' },
  { id: 2, name: 'Lisa Wang', hours: 6, date: '10 Nov', reason: 'Client Meeting', avatar: 'LW', color: 'bg-gradient-to-br from-red-500 to-red-600' },
  { id: 3, name: 'Tom Harris', hours: 3, date: '09 Nov', reason: 'System Migration', avatar: 'TH', color: 'bg-gradient-to-br from-green-500 to-green-600' },
];

const attendanceTrendData = [
  { day: 'Mon', attendance: 95, late: 5 },
  { day: 'Tue', attendance: 92, late: 8 },
  { day: 'Wed', attendance: 98, late: 2 },
  { day: 'Thu', attendance: 94, late: 6 },
  { day: 'Fri', attendance: 96, late: 4 },
  { day: 'Sat', attendance: 85, late: 15 },
  { day: 'Sun', attendance: 60, late: 40 },
];

const departmentOvertimeData = [
  { name: 'Engineering', value: 35, color: '#3B82F6' },
  { name: 'Sales', value: 25, color: '#10B981' },
  { name: 'Marketing', value: 20, color: '#EC4899' },
  { name: 'HR', value: 10, color: '#F59E0B' },
  { name: 'Finance', value: 10, color: '#8B5CF6' },
];

const COLORS = ['#3B82F6', '#10B981', '#EC4899', '#F59E0B', '#8B5CF6'];

export default function AttendanceDashboard() {
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

  const [page, setPage] = useState(1);
  const [activeFilter, setActiveFilter] = useState('today');
  const [selectedDate, setSelectedDate] = useState('12 / 11 / 2025');
  const [viewMode, setViewMode] = useState('daily');
  const [chartView, setChartView] = useState('bar');
  const totalPages = 3;

  const handleValidateAttendance = (id) => {
    console.log(`Validating attendance for ID: ${id}`);
    // Add validation logic here
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50/50 via-white to-blue-50/30 p-4 lg:p-6">
      {/* HEADER */}
      <div className="mb-6 lg:mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Attendance Dashboard</h1>
            <p className="text-gray-600 mt-1">Monitor and manage employee attendance in real-time</p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search employees..."
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

        {/* Time Filter */}
        <div className="flex items-center gap-2 mt-6 overflow-x-auto scrollbar-hide">
          {['today', 'week', 'month', 'quarter', 'year'].map((filter) => (
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
            <span className="text-sm text-gray-700">{selectedDate}</span>
          </div>
        </div>
      </div>

      {/* KPI CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6 lg:mb-8">
        <div className="bg-white rounded-2xl p-5 lg:p-6 shadow-lg border border-gray-200/50 hover:shadow-xl transition-shadow group">
          <div className="flex items-center justify-between mb-4">
            <div className={`p-3 ${getLightBg()} rounded-xl`}>
              <UserCheck className={`h-6 w-6 ${getTextAccent()}`} />
            </div>
            <div className="flex items-center text-sm text-green-600 font-medium">
              <TrendingUp className="h-4 w-4 mr-1" /> +2.5%
            </div>
          </div>
          <h3 className="text-sm font-medium text-gray-500 mb-1">Today's Attendance Rate</h3>
          <div className="flex items-baseline gap-2">
            <p className="text-2xl lg:text-3xl font-bold text-gray-900">95.2%</p>
            <span className="text-sm text-gray-500">46/48 employees</span>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex items-center text-xs text-gray-500">
              <Clock className="h-3 w-3 mr-1" /> Updated: 10:30 AM
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 lg:p-6 shadow-lg border border-gray-200/50 hover:shadow-xl transition-shadow group">
          <div className="flex items-center justify-between mb-4">
            <div className={`p-3 ${getLightBg()} rounded-xl`}>
              <Target className={`h-6 w-6 ${getTextAccent()}`} />
            </div>
            <div className="flex items-center text-sm text-green-600 font-medium">
              <TrendingUp className="h-4 w-4 mr-1" /> +5%
            </div>
          </div>
          <h3 className="text-sm font-medium text-gray-500 mb-1">On Time Today</h3>
          <div className="flex items-baseline gap-2">
            <p className="text-2xl lg:text-3xl font-bold text-green-600">42</p>
            <span className="text-sm text-gray-500">employees</span>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex items-center text-xs text-gray-500">
              <UserCheck className="h-3 w-3 mr-1" /> 87.5% on-time rate
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 lg:p-6 shadow-lg border border-gray-200/50 hover:shadow-xl transition-shadow group">
          <div className="flex items-center justify-between mb-4">
            <div className={`p-3 ${getLightBg()} rounded-xl`}>
              <AlertCircle className={`h-6 w-6 ${getTextAccent()}`} />
            </div>
            <div className="flex items-center text-sm text-red-600 font-medium">
              <TrendingDown className="h-4 w-4 mr-1" /> -3%
            </div>
          </div>
          <h3 className="text-sm font-medium text-gray-500 mb-1">Late Today</h3>
          <div className="flex items-baseline gap-2">
            <p className="text-2xl lg:text-3xl font-bold text-red-600">6</p>
            <span className="text-sm text-gray-500">employees</span>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex items-center text-xs text-gray-500">
              <Clock className="h-3 w-3 mr-1" /> Avg delay: 18min
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 lg:p-6 shadow-lg border border-gray-200/50 hover:shadow-xl transition-shadow group">
          <div className="flex items-center justify-between mb-4">
            <div className={`p-3 ${getLightBg()} rounded-xl`}>
              <UserX className={`h-6 w-6 ${getTextAccent()}`} />
            </div>
            <div className="text-xs font-medium px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full">
              Attention needed
            </div>
          </div>
          <h3 className="text-sm font-medium text-gray-500 mb-1">Offline Now</h3>
          <div className="flex items-baseline gap-2">
            <p className="text-2xl lg:text-3xl font-bold text-gray-900">6</p>
            <span className="text-sm text-gray-500">employees</span>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100">
            <button className="text-sm font-medium text-gray-600 hover:text-gray-900 flex items-center">
              View details <ArrowRight className="h-4 w-4 ml-1" />
            </button>
          </div>
        </div>
      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
        {/* Attendance Analytics */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-5 lg:p-6 shadow-lg border border-gray-200/50">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
            <div>
              <h3 className="text-lg lg:text-xl font-bold text-gray-900">Attendance Analytics</h3>
              <p className="text-sm text-gray-500 mt-1">Weekly attendance trend</p>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 p-1 bg-gray-100 rounded-xl">
                <button
                  onClick={() => setChartView('line')}
                  className={`p-2 rounded-lg ${chartView === 'line' ? 'bg-white shadow-sm' : ''}`}
                >
                  <LineChartIcon className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setChartView('bar')}
                  className={`p-2 rounded-lg ${chartView === 'bar' ? 'bg-white shadow-sm' : ''}`}
                >
                  <BarChart3 className="h-4 w-4" />
                </button>
              </div>
              
              <div className="flex items-center gap-2 p-1 bg-gray-100 rounded-xl">
                <button
                  onClick={() => setViewMode('daily')}
                  className={`px-3 py-1.5 text-sm rounded-lg ${viewMode === 'daily' ? 'bg-white shadow-sm' : ''}`}
                >
                  Daily
                </button>
                <button
                  onClick={() => setViewMode('weekly')}
                  className={`px-3 py-1.5 text-sm rounded-lg ${viewMode === 'weekly' ? 'bg-white shadow-sm' : ''}`}
                >
                  Weekly
                </button>
                <button
                  onClick={() => setViewMode('monthly')}
                  className={`px-3 py-1.5 text-sm rounded-lg ${viewMode === 'monthly' ? 'bg-white shadow-sm' : ''}`}
                >
                  Monthly
                </button>
              </div>
              
              <button className="p-2 hover:bg-gray-100 rounded-xl">
                <MoreVertical className="h-5 w-5 text-gray-600" />
              </button>
            </div>
          </div>

          {chartView === 'bar' ? (
            <div className="h-72 lg:h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={attendanceTrendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px'
                    }}
                  />
                  <Legend />
                  <Bar dataKey="attendance" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="late" fill="#EF4444" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="h-72 lg:h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={attendanceTrendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px'
                    }}
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="attendance" 
                    name="Attendance %" 
                    stroke="#3B82F6" 
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="late" 
                    name="Late %" 
                    stroke="#EF4444" 
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    dot={{ r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>

        {/* Offline Employees */}
        <div className="bg-white rounded-2xl p-5 lg:p-6 shadow-lg border border-gray-200/50">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg lg:text-xl font-bold text-gray-900">Offline Employees</h3>
              <p className="text-sm text-gray-500 mt-1">{offlineEmployees.length} employees offline</p>
            </div>
            <button className={`p-2 ${getLightBg()} ${getTextAccent()} rounded-xl hover:opacity-90`}>
              <Bell className="h-5 w-5" />
            </button>
          </div>
          
          <div className="space-y-4 max-h-80 overflow-y-auto pr-2">
            {offlineEmployees.map((emp) => (
              <div key={emp.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl transition-colors">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 ${emp.color} rounded-xl flex items-center justify-center`}>
                    <span className="text-white font-medium">{emp.avatar}</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{emp.name}</p>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500">{emp.department}</span>
                      <span className="text-xs text-gray-400">•</span>
                      <span className="text-xs text-red-500">{emp.timeOffline} offline</span>
                    </div>
                  </div>
                </div>
                <input 
                  type="checkbox" 
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 transform scale-125" 
                />
              </div>
            ))}
          </div>
          
          <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setPage(Math.max(1, page - 1))}
                className="p-2 hover:bg-gray-100 rounded-xl"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <span className="text-sm text-gray-600">Page {page} of {totalPages}</span>
              <button 
                onClick={() => setPage(Math.min(totalPages, page + 1))}
                className="p-2 hover:bg-gray-100 rounded-xl"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
            <button className="text-sm font-medium text-gray-600 hover:text-gray-900">
              Send Reminders
            </button>
          </div>
        </div>
      </div>

      {/* SECOND ROW */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 mt-6">
        {/* Hours Distribution */}
        <div className="bg-white rounded-2xl p-5 lg:p-6 shadow-lg border border-gray-200/50">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg lg:text-xl font-bold text-gray-900">Hours Distribution</h3>
              <p className="text-sm text-gray-500 mt-1">Department-wise hours analysis</p>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-gray-100 rounded-xl">
                <Download className="h-5 w-5 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-xl">
                <MoreVertical className="h-5 w-5 text-gray-600" />
              </button>
            </div>
          </div>
          
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={hoursChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="dept" />
                <YAxis />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px'
                  }}
                />
                <Legend />
                <Area type="monotone" dataKey="worked" stackId="1" stroke="#10B981" fill="#10B981" fillOpacity={0.6} />
                <Area type="monotone" dataKey="pending" stackId="1" stroke="#EC4899" fill="#EC4899" fillOpacity={0.6} />
                <Area type="monotone" dataKey="overtime" stroke="#F59E0B" fill="#F59E0B" fillOpacity={0.6} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* On Break & Overtime */}
        <div className="grid grid-cols-1 gap-4 lg:gap-6">
          {/* On Break */}
          <div className="bg-white rounded-2xl p-5 lg:p-6 shadow-lg border border-gray-200/50">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg lg:text-xl font-bold text-gray-900">On Break Now</h3>
                <p className="text-sm text-gray-500 mt-1">{breakEmployees.length} employees on break</p>
              </div>
              <div className="p-2 bg-blue-50 rounded-xl">
                <Coffee className="h-5 w-5 text-blue-600" />
              </div>
            </div>
            
            <div className="space-y-4">
              {breakEmployees.map((emp) => (
                <div key={emp.id} className="flex items-center justify-between p-3 bg-blue-50/50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 ${emp.color} rounded-xl flex items-center justify-center`}>
                      <span className="text-white font-medium">{emp.avatar}</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{emp.name}</p>
                      <p className="text-sm text-gray-500">{emp.department}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">{emp.breakStart}</p>
                    <p className="text-sm text-gray-500">{emp.duration}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Overtime To Approve */}
          <div className="bg-white rounded-2xl p-5 lg:p-6 shadow-lg border border-gray-200/50">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg lg:text-xl font-bold text-gray-900">Overtime To Approve</h3>
                <p className="text-sm text-gray-500 mt-1">{overtimeToApprove.length} pending approvals</p>
              </div>
              <div className="p-2 bg-yellow-50 rounded-xl">
                <Timer className="h-5 w-5 text-yellow-600" />
              </div>
            </div>
            
            <div className="space-y-4">
              {overtimeToApprove.map((ot) => (
                <div key={ot.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl transition-colors">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 ${ot.color} rounded-xl flex items-center justify-center`}>
                      <span className="text-white font-medium">{ot.avatar}</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{ot.name}</p>
                      <p className="text-sm text-gray-500">{ot.reason}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <p className="font-bold text-gray-900">{ot.hours}h</p>
                      <p className="text-xs text-gray-500">{ot.date}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg">
                        <CheckCircle className="h-4 w-4" />
                      </button>
                      <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
                        <XCircle className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ATTENDANCE TO VALIDATE */}
      <div className="mt-6 bg-white rounded-2xl p-5 lg:p-6 shadow-lg border border-gray-200/50">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
          <div>
            <h3 className="text-lg lg:text-xl font-bold text-gray-900">Attendance To Validate</h3>
            <p className="text-sm text-gray-500 mt-1">{attendanceToValidate.length} pending validations</p>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="p-2 hover:bg-gray-100 rounded-xl">
              <RefreshCw className="h-5 w-5 text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-xl">
              <Filter className="h-5 w-5 text-gray-600" />
            </button>
            <button className={`px-4 py-2 ${getButtonGradient()} ${getButtonHover()} text-white rounded-xl text-sm font-medium`}>
              Bulk Validate
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className={`${getLightBg()} border-b border-gray-200`}>
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Employee</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Department</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Date</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Check-in</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Check-out</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {attendanceToValidate.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 ${row.color} rounded-xl flex items-center justify-center`}>
                        <span className="text-white font-medium">{row.avatar}</span>
                      </div>
                      <span className="font-medium text-gray-900">{row.employee}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-700">{row.department}</td>
                  <td className="px-4 py-4 text-sm text-gray-700">{row.date}</td>
                  <td className="px-4 py-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-700">
                      {row.checkIn}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-700">
                      {row.checkOut}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <button 
                      onClick={() => handleValidateAttendance(row.id)}
                      className={`px-4 py-2 ${getButtonGradient()} ${getButtonHover()} text-white rounded-xl text-sm font-medium flex items-center gap-2 transition-all`}
                    >
                      <CheckCircle className="h-4 w-4" /> Validate
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* DEPARTMENT OVERTIME CHART */}
      <div className="mt-6 bg-white rounded-2xl p-5 lg:p-6 shadow-lg border border-gray-200/50">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg lg:text-xl font-bold text-gray-900">Department Overtime Distribution</h3>
            <p className="text-sm text-gray-500 mt-1">Overtime hours by department</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 p-1 bg-gray-100 rounded-xl">
              <button
                onClick={() => setChartView('pie')}
                className={`p-2 rounded-lg ${chartView === 'pie' ? 'bg-white shadow-sm' : ''}`}
              >
                <PieChartIcon className="h-4 w-4" />
              </button>
            </div>
            <button className="p-2 hover:bg-gray-100 rounded-xl">
              <Download className="h-5 w-5 text-gray-600" />
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={departmentOvertimeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {departmentOvertimeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          <div className="space-y-4">
            {departmentOvertimeData.map((dept, index) => (
              <div key={dept.name} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                  <span className="font-medium text-gray-900">{dept.name}</span>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-900">{dept.value}%</p>
                  <p className="text-sm text-gray-500">of total overtime</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FLOATING ACTION BUTTON */}
      <button 
        className={`fixed bottom-6 right-6 w-14 h-14 ${getButtonGradient()} text-white rounded-full shadow-xl hover:shadow-2xl flex items-center justify-center z-50 transition-all hover:scale-105`}
      >
        <Plus className="h-6 w-6" />
      </button>
    </div>
  );
}