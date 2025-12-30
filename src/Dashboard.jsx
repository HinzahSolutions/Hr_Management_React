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
  LineChart as LineChartIcon
} from 'lucide-react';
import { useTheme } from './ThemeContext';

export default function Dashboard() {
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
  const getGradient = () => theme?.gradient || 'from-orange-500 to-orange-600';

  const [activeFilter, setActiveFilter] = useState('today');
  const [chartView, setChartView] = useState('bar'); // 'bar', 'line', 'pie'

  // ----- DATA -----
  const recruitmentData = [
    { name: 'Initial', 'Recruitment Drive': 8, 'FutureForce Recruitment': 0 },
    { name: 'Applied', 'Recruitment Drive': 1, 'FutureForce Recruitment': 1 },
    { name: 'Test', 'Recruitment Drive': 0, 'FutureForce Recruitment': 1 },
    { name: 'Interview', 'Recruitment Drive': 1, 'FutureForce Recruitment': 4 },
    { name: 'Cancelled', 'Recruitment Drive': 0, 'FutureForce Recruitment': 1 },
    { name: 'Hired', 'Recruitment Drive': 1, 'FutureForce Recruitment': 2 },
  ];

  const hoursData = [
    { dept: 'SW Dept', pending: 5, worked: 20, target: 25 },
    { dept: 'Sales', pending: 10, worked: 15, target: 30 },
    { dept: 'Marketing', pending: 8, worked: 18, target: 25 },
    { dept: 'Finance', pending: 6, worked: 22, target: 28 },
    { dept: 'Growth', pending: 4, worked: 25, target: 30 },
    { dept: 'Expert', pending: 3, worked: 20, target: 25 },
  ];

  const feedback = [
    { id: 'GBSIIM', name: 'Sandeep', role: 'Manager', time: '2h ago', avatarColor: 'bg-blue-500' },
    { id: 'PEO1', name: 'Michael Brown', role: 'Developer', time: '4h ago', avatarColor: 'bg-purple-500' },
    { id: 'PEO8', name: 'Matthew Harris', role: 'Designer', time: '1d ago', avatarColor: 'bg-green-500' },
    { id: 'PEO6', name: 'Jessica Evans', role: 'Analyst', time: '2d ago', avatarColor: 'bg-pink-500' },
  ];

  const leaveData = [
    { name: 'Owen Jenkins', days: 3, type: 'Sick Leave', avatar: 'OJ' },
    { name: 'Sarah Miller', days: 5, type: 'Vacation', avatar: 'SM' },
    { name: 'David Wilson', days: 2, type: 'Personal', avatar: 'DW' },
  ];

  const pieData = [
    { name: 'Recruitment Drive', value: 35, color: '#3B82F6' },
    { name: 'FutureForce', value: 45, color: '#EC4899' },
    { name: 'Internal', value: 20, color: '#10B981' },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50/50 via-white to-blue-50/30 p-4 lg:p-6">
      {/* HEADER */}
      <div className="mb-6 lg:mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Dashboard Overview</h1>
            <p className="text-gray-600 mt-1">Welcome back! Here's what's happening today.</p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative flex-1 lg:flex-none">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
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
        </div>
      </div>

      {/* KPI CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6 lg:mb-8">
        <div className="bg-white rounded-2xl p-5 lg:p-6 shadow-lg border border-gray-200/50 hover:shadow-xl transition-shadow group">
          <div className="flex items-center justify-between mb-4">
            <div className={`p-3 ${getLightBg()} rounded-xl`}>
              <UserPlus className={`h-6 w-6 ${getTextAccent()}`} />
            </div>
            <span className="text-xs font-medium px-2 py-1 bg-green-100 text-green-700 rounded-full">
              +12%
            </span>
          </div>
          <h3 className="text-sm font-medium text-gray-500 mb-1">New Joining Today</h3>
          <div className="flex items-baseline gap-2">
            <p className="text-2xl lg:text-3xl font-bold text-gray-900">0</p>
            <span className="text-sm text-gray-500">employees</span>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex items-center text-xs text-gray-500">
              <Clock className="h-3 w-3 mr-1" /> Updated just now
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 lg:p-6 shadow-lg border border-gray-200/50 hover:shadow-xl transition-shadow group">
          <div className="flex items-center justify-between mb-4">
            <div className={`p-3 ${getLightBg()} rounded-xl`}>
              <Users className={`h-6 w-6 ${getTextAccent()}`} />
            </div>
            <span className="text-xs font-medium px-2 py-1 bg-blue-100 text-blue-700 rounded-full">
              +8%
            </span>
          </div>
          <h3 className="text-sm font-medium text-gray-500 mb-1">New Joining This Week</h3>
          <div className="flex items-baseline gap-2">
            <p className="text-2xl lg:text-3xl font-bold text-gray-900">0</p>
            <span className="text-sm text-gray-500">employees</span>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex items-center text-xs text-gray-500">
              <Calendar className="h-3 w-3 mr-1" /> This week
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 lg:p-6 shadow-lg border border-gray-200/50 hover:shadow-xl transition-shadow group">
          <div className="flex items-center justify-between mb-4">
            <div className={`p-3 ${getLightBg()} rounded-xl`}>
              <TrendingUp className={`h-6 w-6 ${getTextAccent()}`} />
            </div>
            <span className="text-xs font-medium px-2 py-1 bg-purple-100 text-purple-700 rounded-full">
              +24%
            </span>
          </div>
          <h3 className="text-sm font-medium text-gray-500 mb-1">Total Strength</h3>
          <div className="flex items-baseline gap-2">
            <p className="text-2xl lg:text-3xl font-bold text-gray-900">46</p>
            <span className="text-sm text-gray-500">employees</span>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex items-center text-xs text-gray-500">
              <RefreshCw className="h-3 w-3 mr-1" /> Live update
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 lg:p-6 shadow-lg border border-gray-200/50 hover:shadow-xl transition-shadow group">
          <div className="flex items-center justify-between mb-4">
            <div className={`p-3 ${getLightBg()} rounded-xl`}>
              <Package className={`h-6 w-6 ${getTextAccent()}`} />
            </div>
            <button className="p-1 hover:bg-gray-100 rounded-lg">
              <Plus className="h-5 w-5 text-gray-600" />
            </button>
          </div>
          <h3 className="text-sm font-medium text-gray-500 mb-1">Announcements</h3>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
              <span className="text-white text-sm font-bold">HT</span>
            </div>
            <div>
              <p className="font-medium text-gray-900">Hinzah Tour</p>
              <p className="text-xs text-gray-500">Company event next week</p>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100">
            <button className="text-sm font-medium text-gray-600 hover:text-gray-900 flex items-center">
              View all <ChevronRight className="h-4 w-4 ml-1" />
            </button>
          </div>
        </div>
      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
        {/* Recruitment Analytics */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-5 lg:p-6 shadow-lg border border-gray-200/50">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
            <div>
              <h3 className="text-lg lg:text-xl font-bold text-gray-900">Recruitment Analytics</h3>
              <p className="text-sm text-gray-500 mt-1">Track recruitment progress across campaigns</p>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 p-1 bg-gray-100 rounded-xl">
                <button
                  onClick={() => setChartView('bar')}
                  className={`p-2 rounded-lg ${chartView === 'bar' ? 'bg-white shadow-sm' : ''}`}
                >
                  <BarChart3 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setChartView('line')}
                  className={`p-2 rounded-lg ${chartView === 'line' ? 'bg-white shadow-sm' : ''}`}
                >
                  <LineChartIcon className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setChartView('pie')}
                  className={`p-2 rounded-lg ${chartView === 'pie' ? 'bg-white shadow-sm' : ''}`}
                >
                  <PieChartIcon className="h-4 w-4" />
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
                <BarChart data={recruitmentData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px'
                    }}
                  />
                  <Legend />
                  <Bar dataKey="Recruitment Drive" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="FutureForce Recruitment" fill="#EC4899" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          ) : chartView === 'line' ? (
            <div className="h-72 lg:h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={recruitmentData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="Recruitment Drive" stroke="#3B82F6" strokeWidth={2} />
                  <Line type="monotone" dataKey="FutureForce Recruitment" stroke="#EC4899" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="h-72 lg:h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>

        {/* Feedback To Answer */}
        <div className="bg-white rounded-2xl p-5 lg:p-6 shadow-lg border border-gray-200/50">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg lg:text-xl font-bold text-gray-900">Feedback To Answer</h3>
              <p className="text-sm text-gray-500 mt-1">{feedback.length} pending responses</p>
            </div>
            <button className="p-2 hover:bg-gray-100 rounded-xl">
              <Eye className="h-5 w-5 text-gray-600" />
            </button>
          </div>
          
          <div className="space-y-4">
            {feedback.map((f) => (
              <div key={f.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl transition-colors">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 ${f.avatarColor} rounded-xl flex items-center justify-center`}>
                    <span className="text-white font-medium">{f.name[0]}</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{f.name}</p>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500">{f.role}</span>
                      <span className="text-xs text-gray-400">•</span>
                      <span className="text-xs text-gray-500">{f.time}</span>
                    </div>
                  </div>
                </div>
                <button className={`px-3 py-1.5 ${getButtonGradient()} ${getButtonHover()} text-white text-sm font-medium rounded-lg transition-all`}>
                  Answer
                </button>
              </div>
            ))}
          </div>
          
          <button className="w-full mt-4 py-3 text-sm font-medium text-gray-600 hover:text-gray-900 border border-gray-300 hover:border-gray-400 rounded-xl transition-colors">
            View All Feedback
          </button>
        </div>

        {/* Asset Requests */}
        <div className="bg-white rounded-2xl p-5 lg:p-6 shadow-lg border border-gray-200/50">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg lg:text-xl font-bold text-gray-900">Asset Requests</h3>
              <p className="text-sm text-gray-500 mt-1">Pending approvals</p>
            </div>
            <button className="p-2 hover:bg-gray-100 rounded-xl">
              <X className="h-5 w-5 text-gray-600" />
            </button>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-gray-600 to-gray-700 rounded-xl flex items-center justify-center">
                  <span className="text-white font-medium">M</span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Mona Phirani</p>
                  <p className="text-xs text-gray-500">(PEOO) • Headphones</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg">
                  <Check className="h-4 w-4" />
                </button>
                <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
          
          <div className="mt-6 p-3 bg-blue-50 rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">3 more requests</p>
                <p className="text-xs text-gray-500">Waiting for your review</p>
              </div>
              <button className="text-sm font-medium text-blue-600 hover:text-blue-700">
                Review All
              </button>
            </div>
          </div>
        </div>

        {/* Hours Chart */}
        <div className="bg-white rounded-2xl p-5 lg:p-6 shadow-lg border border-gray-200/50">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg lg:text-xl font-bold text-gray-900">Hours Distribution</h3>
              <p className="text-sm text-gray-500 mt-1">2025-11 • Department wise</p>
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
          
          <div className="h-64 lg:h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={hoursData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="dept" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="worked" stackId="1" stroke="#10B981" fill="#10B981" fillOpacity={0.6} />
                <Area type="monotone" dataKey="pending" stackId="1" stroke="#EC4899" fill="#EC4899" fillOpacity={0.6} />
                <Area type="monotone" dataKey="target" stroke="#3B82F6" fill="transparent" strokeWidth={2} strokeDasharray="5 5" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* On Leave */}
        <div className="bg-white rounded-2xl p-5 lg:p-6 shadow-lg border border-gray-200/50">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg lg:text-xl font-bold text-gray-900">On Leave Today</h3>
              <p className="text-sm text-gray-500 mt-1">{leaveData.length} employees absent</p>
            </div>
            <button className="p-2 hover:bg-gray-100 rounded-xl">
              <Calendar className="h-5 w-5 text-gray-600" />
            </button>
          </div>
          
          <div className="space-y-4">
            {leaveData.map((person) => (
              <div key={person.name} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                    <span className="text-white font-medium">{person.avatar}</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{person.name}</p>
                    <p className="text-xs text-gray-500">{person.type}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-900">{person.days} days</p>
                  <p className="text-xs text-gray-500">Leave</p>
                </div>
              </div>
            ))}
          </div>
          
          <button className="w-full mt-4 py-3 text-sm font-medium text-gray-600 hover:text-gray-900 border border-gray-300 hover:border-gray-400 rounded-xl transition-colors">
            View Leave Calendar
          </button>
        </div>
      </div>

      
   
    </div>
  );
}