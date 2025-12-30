'use client';

import React, { useState } from 'react';
import {
  Filter,
  Download,
  Plus,
  ChevronLeft,
  ChevronRight,
  Search,
  Calendar,
  MoreVertical,
  Eye,
  Settings,
  Users,
  UserCheck,
  AlertCircle,
  RefreshCw,
  BarChart3,
  PieChart as PieChartIcon,
  LineChart as LineChartIcon,
  TrendingUp,
  TrendingDown,
  ArrowRight,
  Bell,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { useTheme } from './ThemeContext';

/* ---------- CONFIG ---------- */
const months = [
  { value: '2025-11', label: 'November 2025' },
  { value: '2025-10', label: 'October 2025' },
  { value: '2025-09', label: 'September 2025' },
];

const legend = [
  { code: 'P', label: 'Present', color: 'bg-green-500', count: 248 },
  { code: 'HP', label: 'Half Day', color: 'bg-yellow-500', count: 12 },
  { code: 'O', label: 'On Leave', color: 'bg-orange-500', count: 18 },
  { code: 'L', label: 'Leave', color: 'bg-blue-500', count: 45 },
  { code: 'A', label: 'Absent', color: 'bg-purple-500', count: 8 },
  { code: 'C', label: 'Conflict', color: 'bg-red-500', count: 3 },
];

/* ---------- HELPERS ---------- */
const generateDays = (year, month) => {
  const date = new Date(year, month - 1, 1);
  const days = [];
  while (date.getMonth() === month - 1) {
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  return days;
};

/* ---------- MOCK DATA ---------- */
const employees = [
  {
    id: 1,
    name: 'Abigail Roberts',
    code: 'PEP16',
    department: 'Engineering',
    records: [
      { day: 1, code: 'HP', color: 'bg-yellow-500' },
      { day: 2, code: 'A', color: 'bg-purple-500' },
      { day: 10, code: 'A', color: 'bg-purple-500' },
      { day: 11, code: 'A', color: 'bg-purple-500' },
      { day: 12, code: 'A', color: 'bg-purple-500' },
    ],
  },
  {
    id: 2,
    name: 'Alexander Smith',
    code: 'PEP16',
    department: 'Sales',
    records: [
      { day: 3, code: 'A', color: 'bg-purple-500' },
      { day: 4, code: 'A', color: 'bg-purple-500' },
      { day: 5, code: 'L', color: 'bg-blue-500' },
      { day: 10, code: 'A', color: 'bg-purple-500' },
      { day: 11, code: 'A', color: 'bg-purple-500' },
      { day: 12, code: 'A', color: 'bg-purple-500' },
    ],
  },
  {
    id: 3,
    name: 'Amelia Cooper',
    code: 'PEP25',
    department: 'Marketing',
    records: [
      { day: 3, code: 'A', color: 'bg-purple-500' },
      { day: 4, code: 'A', color: 'bg-purple-500' },
      { day: 5, code: 'L', color: 'bg-blue-500' },
      { day: 10, code: 'A', color: 'bg-purple-500' },
      { day: 11, code: 'A', color: 'bg-purple-500' },
      { day: 12, code: 'A', color: 'bg-purple-500' },
    ],
  },
  {
    id: 4,
    name: 'Asif Ahmad',
    code: 'PEP1079',
    department: 'Finance',
    records: [
      { day: 10, code: 'A', color: 'bg-purple-500' },
      { day: 11, code: 'A', color: 'bg-purple-500' },
      { day: 12, code: 'A', color: 'bg-purple-500' },
    ],
  },
  {
    id: 5,
    name: 'Ava Mitchell',
    code: 'PEP42',
    department: 'HR',
    records: [
      { day: 3, code: 'A', color: 'bg-purple-500' },
      { day: 4, code: 'A', color: 'bg-purple-500' },
      { day: 10, code: 'A', color: 'bg-purple-500' },
      { day: 11, code: 'A', color: 'bg-purple-500' },
    ],
  },
  {
    id: 6,
    name: 'Avery Hill',
    code: 'PEP31',
    department: 'Operations',
    records: [
      { day: 3, code: 'A', color: 'bg-purple-500' },
      { day: 4, code: 'A', color: 'bg-purple-500' },
      { day: 10, code: 'A', color: 'bg-purple-500' },
      { day: 11, code: 'A', color: 'bg-purple-500' },
    ],
  },
  {
    id: 7,
    name: 'Ayyagari Kar',
    code: 'PEP1000',
    department: 'Engineering',
    records: [
      { day: 10, code: 'A', color: 'bg-purple-500' },
      { day: 11, code: 'A', color: 'bg-purple-500' },
    ],
  },
  {
    id: 8,
    name: 'BALAHARSHINI L',
    code: 'BL2035',
    department: 'Design',
    records: [
      { day: 10, code: 'L', color: 'bg-blue-500' },
      { day: 11, code: 'A', color: 'bg-purple-500' },
    ],
  },
];

/* ---------- MAIN COMPONENT ---------- */
export default function WorkRecords() {
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

  const [month, setMonth] = useState('2025-11');
  const [page, setPage] = useState(1);
  const [viewMode, setViewMode] = useState('table'); // 'table' or 'card'
  const [activeFilter, setActiveFilter] = useState('all');
  const totalPages = 3;

  const [year, mon] = month.split('-').map(Number);
  const daysInMonth = generateDays(year, mon);

  // Calculate attendance summary
  const calculateSummary = () => {
    let present = 0, halfDay = 0, leave = 0, absent = 0, conflict = 0;
    
    employees.forEach(emp => {
      emp.records.forEach(record => {
        switch(record.code) {
          case 'P': present++; break;
          case 'HP': halfDay++; break;
          case 'L': case 'O': leave++; break;
          case 'A': absent++; break;
          case 'C': conflict++; break;
        }
      });
    });
    
    return { present, halfDay, leave, absent, conflict };
  };

  const summary = calculateSummary();
  const totalRecords = employees.length * daysInMonth.length;

  return (
    <div className=" flex-1 min-h-screen bg-gradient-to-br from-gray-50/50 via-white to-blue-50/30 p-4 lg:p-6">
      {/* HEADER */}
      <div className="mb-6 lg:mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Work Records</h1>
            <p className="text-gray-600 mt-1">Track and manage employee attendance records</p>
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
            <select
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              className="bg-transparent text-sm text-gray-700 focus:outline-none"
            >
              {months.map((m) => (
                <option key={m.value} value={m.value}>
                  {m.label}
                </option>
              ))}
            </select>
          </div>
          
          {['all', 'present', 'absent', 'leave'].map((filter) => (
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
            <Filter className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6 lg:mb-8">
        <div className="bg-white rounded-2xl p-4 shadow-lg border border-gray-200/50">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 bg-green-50 rounded-lg">
              <UserCheck className="h-5 w-5 text-green-600" />
            </div>
            <span className="text-xs font-medium text-green-600">+5%</span>
          </div>
          <p className="text-sm text-gray-500 mb-1">Present</p>
          <p className="text-2xl font-bold text-gray-900">{summary.present}</p>
        </div>
        
        <div className="bg-white rounded-2xl p-4 shadow-lg border border-gray-200/50">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 bg-yellow-50 rounded-lg">
              <AlertCircle className="h-5 w-5 text-yellow-600" />
            </div>
            <span className="text-xs font-medium text-yellow-600">-2%</span>
          </div>
          <p className="text-sm text-gray-500 mb-1">Half Day</p>
          <p className="text-2xl font-bold text-gray-900">{summary.halfDay}</p>
        </div>
        
        <div className="bg-white rounded-2xl p-4 shadow-lg border border-gray-200/50">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Users className="h-5 w-5 text-blue-600" />
            </div>
            <span className="text-xs font-medium text-blue-600">+8%</span>
          </div>
          <p className="text-sm text-gray-500 mb-1">Leave</p>
          <p className="text-2xl font-bold text-gray-900">{summary.leave}</p>
        </div>
        
        <div className="bg-white rounded-2xl p-4 shadow-lg border border-gray-200/50">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 bg-purple-50 rounded-lg">
              <TrendingDown className="h-5 w-5 text-purple-600" />
            </div>
            <span className="text-xs font-medium text-purple-600">-3%</span>
          </div>
          <p className="text-sm text-gray-500 mb-1">Absent</p>
          <p className="text-2xl font-bold text-gray-900">{summary.absent}</p>
        </div>
        
        <div className="bg-white rounded-2xl p-4 shadow-lg border border-gray-200/50">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 bg-red-50 rounded-lg">
              <AlertCircle className="h-5 w-5 text-red-600" />
            </div>
            <span className="text-xs font-medium text-red-600">+1%</span>
          </div>
          <p className="text-sm text-gray-500 mb-1">Conflicts</p>
          <p className="text-2xl font-bold text-gray-900">{summary.conflict}</p>
        </div>
      </div>

      {/* LEGEND */}
      <div className="mb-6 bg-white rounded-2xl p-5 shadow-lg border border-gray-200/50">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-medium text-gray-900">Attendance Legend</h3>
          <span className="text-sm text-gray-500">{totalRecords} total records</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {legend.map((item) => (
            <div key={item.code} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
              <div className={`w-8 h-8 ${item.color} rounded-lg flex items-center justify-center text-white font-bold`}>
                {item.code}
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">{item.label}</p>
                <p className="text-xs text-gray-500">{item.count} records</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* TABLE VIEW */}
      {viewMode === 'table' && (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200/50 overflow-hidden">
          {/* Table Header */}
          <div className={`${getLightBg()} border-b border-gray-200`}>
            <div className="flex items-center justify-between p-6">
              <div>
                <h3 className="text-lg font-bold text-gray-900">Attendance Records</h3>
                <p className="text-sm text-gray-500 mt-1">{employees.length} employees • {daysInMonth.length} days</p>
              </div>
              
              <div className="flex items-center gap-3">
                <button className="p-2 hover:bg-gray-100 rounded-xl">
                  <Eye className="h-5 w-5 text-gray-600" />
                </button>
                <button className={`p-2 ${getLightBg()} ${getTextAccent()} rounded-xl hover:opacity-90`}>
                  <Download className="h-5 w-5" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-xl">
                  <MoreVertical className="h-5 w-5 text-gray-600" />
                </button>
              </div>
            </div>
          </div>

          {/* Scrollable Table */}
          <div className="max-h-[60vh] overflow-y-auto">
            <table className="w-full">
              <thead className="sticky top-0 bg-white z-10">
                <tr className="border-b border-gray-200">
                  <th className="sticky left-0 bg-white px-6 py-4 text-left text-sm font-semibold text-gray-900 z-20 min-w-[240px] border-r border-gray-200">
                    <div className="flex items-center gap-2">
                      <span>Employee</span>
                      <span className="text-xs text-gray-400">({employees.length})</span>
                    </div>
                  </th>
                  {daysInMonth.map((day, i) => (
                    <th
                      key={i}
                      className="px-3 py-4 text-center text-xs font-semibold text-gray-700 min-w-[48px]"
                    >
                      <div className="flex flex-col items-center">
                        <span className="font-medium">{day.getDate()}</span>
                        <span className="text-xs text-gray-400">
                          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][day.getDay()]}
                        </span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              
              <tbody className="divide-y divide-gray-100">
                {employees.map((emp) => {
                  const recordMap = emp.records.reduce((acc, r) => {
                    acc[r.day] = r;
                    return acc;
                  }, {});

                  return (
                    <tr key={emp.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="sticky left-0 bg-white px-6 py-4 min-w-[240px] z-10 border-r border-gray-200">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                            <span className="text-white font-medium">{emp.name[0]}</span>
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{emp.name}</p>
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-gray-500">{emp.code}</span>
                              <span className="text-xs text-gray-400">•</span>
                              <span className="text-xs text-gray-500">{emp.department}</span>
                            </div>
                          </div>
                        </div>
                      </td>
                      
                      {daysInMonth.map((_, i) => {
                        const day = i + 1;
                        const record = recordMap[day];
                        return (
                          <td key={i} className="px-3 py-4 text-center min-w-[48px]">
                            {record ? (
                              <div
                                className={`w-10 h-10 mx-auto ${record.color} text-white rounded-xl flex items-center justify-center text-sm font-bold shadow-sm hover:shadow-md transition-shadow cursor-help`}
                                title={`${record.code} - ${legend.find(l => l.code === record.code)?.label}`}
                              >
                                {record.code}
                              </div>
                            ) : (
                              <div className="w-10 h-10 mx-auto border border-gray-200 rounded-xl hover:border-gray-300 transition-colors" />
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="border-t border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">
                Showing <span className="font-medium">{employees.length}</span> employees
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
          {employees.map((emp) => {
            const recordMap = emp.records.reduce((acc, r) => {
              acc[r.day] = r;
              return acc;
            }, {});
            
            const presentCount = emp.records.filter(r => r.code === 'P').length;
            const attendanceRate = Math.round((presentCount / daysInMonth.length) * 100);

            return (
              <div key={emp.id} className="bg-white rounded-2xl shadow-lg border border-gray-200/50 p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                      <span className="text-white text-lg font-bold">{emp.name[0]}</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">{emp.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-sm text-gray-500">{emp.code}</span>
                        <span className="text-xs text-gray-400">•</span>
                        <span className="text-sm text-gray-500">{emp.department}</span>
                      </div>
                    </div>
                  </div>
                  <button className="p-2 hover:bg-gray-100 rounded-xl">
                    <MoreVertical className="h-5 w-5 text-gray-600" />
                  </button>
                </div>
                
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-500">Attendance Rate</span>
                    <span className={`text-sm font-bold ${
                      attendanceRate >= 90 ? 'text-green-600' : 
                      attendanceRate >= 70 ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      {attendanceRate}%
                    </span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${
                        attendanceRate >= 90 ? 'bg-green-500' : 
                        attendanceRate >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${attendanceRate}%` }}
                    />
                  </div>
                </div>
                
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-700 mb-3">Recent Attendance</h4>
                  <div className="grid grid-cols-7 gap-2">
                    {daysInMonth.slice(-7).map((day, i) => {
                      const dayNumber = daysInMonth.length - 6 + i;
                      const record = recordMap[dayNumber];
                      return (
                        <div key={i} className="text-center">
                          <div className="text-xs text-gray-400 mb-1">
                            {['S', 'M', 'T', 'W', 'T', 'F', 'S'][day.getDay()]}
                          </div>
                          {record ? (
                            <div
                              className={`w-8 h-8 mx-auto ${record.color} rounded-lg flex items-center justify-center text-xs font-bold text-white`}
                              title={record.code}
                            >
                              {day.getDate()}
                            </div>
                          ) : (
                            <div className="w-8 h-8 mx-auto border border-gray-200 rounded-lg flex items-center justify-center text-xs text-gray-400">
                              {day.getDate()}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <button className="text-sm font-medium text-gray-600 hover:text-gray-900">
                    View Details
                  </button>
                  <button className={`px-4 py-2 ${getButtonGradient()} ${getButtonHover()} text-white text-sm font-medium rounded-lg`}>
                    Update
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* FLOATING ACTION BUTTON */}
    
    </div>
  );
}