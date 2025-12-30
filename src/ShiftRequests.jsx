

// 'use client';

// import React, { useState } from 'react';
// import {
//   Search, Filter, ChevronDown, Plus, Calendar, CheckCircle, XCircle
// } from 'lucide-react';
// import { useTheme } from './ThemeContext';

// const shiftRequests = [
//   { id: 1, name: 'Muqadas BVJBJN Ejaz', code: 'PEP00', avatar: 'MB', currentShift: 'ft', dateFrom: 'Monday, November 10, 2025', dateTo: 'Monday, November 10, 2025' },
//   { id: 2, name: 'Charlotte White', code: 'PEP19', avatar: 'CW', currentShift: 'ft', dateFrom: 'Thursday, November 13, 2025', dateTo: 'None' },
//   { id: 3, name: 'test Kp', code: 'PEP1005', avatar: 'TK', currentShift: 'ft', dateFrom: 'Monday, November 10, 2025', dateTo: 'None' },
//   { id: 4, name: 'Muqadas BVJBJN Ejaz', code: 'PEP00', avatar: 'MB', currentShift: 'ft', dateFrom: 'Friday, November 7, 2025', dateTo: 'None' },
//   { id: 5, name: 'Muqadas BVJBJN Ejaz', code: 'PEP00', avatar: 'MB', currentShift: 'ft', dateFrom: 'Thursday, November 6, 2025', dateTo: 'Thursday, November 6, 2025' },
// ];

// export default function ShiftRequestsPerfect() {
//   const { theme } = useTheme();
//   const [selectedAll, setSelectedAll] = useState(false);
//   const [selectedRows, setSelectedRows] = useState({});

//   const toggleSelectAll = () => {
//     const newState = !selectedAll;
//     const newSel = {};
//     shiftRequests.forEach((_, i) => newSel[i] = newState);
//     setSelectedRows(newSel);
//     setSelectedAll(newState);
//   };

//   const toggleRow = (i) => {
//     const newSel = { ...selectedRows, [i]: !selectedRows[i] };
//     setSelectedRows(newSel);
//     setSelectedAll(Object.values(newSel).every(v => v) && Object.keys(newSel).length === shiftRequests.length);
//   };

//   const accentBg = `bg-${theme.accent}`;
//   const accentText = `text-${theme.accent}`;

//   return (
//     <>
//       {/* HEADER */}
//       <div className="bg-white border-b border-gray-200 px-8 py-6">
//         <div className="flex justify-between items-center mb-6">
//           <h1 className="text-3xl font-bold text-gray-900">Shift Requests</h1>

//           <div className="flex items-center gap-4">
//             <div className="relative">
//               <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
//               <input
//                 type="text"
//                 placeholder="Search"
//                 className="pl-12 pr-6 py-3.5 w-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-current text-base"
//               />
//             </div>

//             <button className="px-3 py-3 border border-gray-300 rounded-xl font-medium hover:bg-gray-50 flex items-center gap-2">
//               <Filter className="w-5 h-5" /> Filter
//             </button>
//             <button className="px-3 py-3 border border-gray-300 rounded-xl font-medium hover:bg-gray-50 flex items-center gap-2">
//               Group By <ChevronDown className="w-4 h-4" />
//             </button>
//             <button className="px-3 py-3 border border-gray-300 rounded-xl font-medium hover:bg-gray-50 flex items-center gap-2">
//               Actions <ChevronDown className="w-4 h-4" />
//             </button>
//              <button className={`px-4 py-3 ${accentBg} text-white rounded-xl font-medium  flex items-center gap-2 shadow-md text-base`}>
//               + Create
//             </button>
//           </div>
//         </div>

//         {/* Select All + Legend */}
//         <div className="flex justify-between items-center">
//           <button
//             onClick={toggleSelectAll}
//             className={`px-4 py-3 rounded-xl font-bold text-base transition-all shadow-sm border-2 ${
//               selectedAll
//                 ? `${accentBg} text-white border-${theme.accent}`
//                 : `border-${theme.accent} ${accentText} bg-white`
//             }`}
//           >
//             {selectedAll ? 'Deselect All Shifts' : 'Select All Shifts'}
//           </button>

//           <div className="flex items-center gap-10 text-base font-medium">
//             <span className="flex items-center gap-3">
//               <div className="w-4 h-4 rounded-full bg-green-500"></div> Approved
//             </span>
//             <span className="flex items-center gap-3">
//               <div className="w-4 h-4 rounded-full bg-red-500"></div> Rejected
//             </span>
//           </div>
//         </div>
//       </div>

//       {/* TABLE - EXACT MATCH TO YOUR HRMS */}
//       <div className="flex-1 bg-gray-50 overflow-hidden">
//         <div className="h-full overflow-x-auto">
//           <div className="min-w-[1200px]">
//             <table className="w-full">
//               <thead className="bg-gray-100 border-b-2 border-gray-300">
//                 <tr className='py-3'>
//                   <th className="px-3 text-left w-12 sticky left-0 bg-gray-100 z-20">
//                     <input type="checkbox" checked={selectedAll} onChange={toggleSelectAll} className="w-5 h-5 rounded border-gray-400" />
//                   </th>
//                   <th className="py-3 px-4 text-left text-base font-bold text-gray-800 sticky left-12 bg-gray-100 z-20 border-x border-gray-300">
//                     Employee
//                   </th>
//                   <th className="px-4 py-3  text-left text-base font-bold text-gray-800 border-x border-gray-300">
//                     /Current Shift
//                   </th>
//                   <th className="px-4 py-3  text-center text-base font-bold text-gray-800 border-x border-gray-300">
//                     <Calendar className="w-5 h-5 inline-block mr-2" />
//                     Requested Date
//                   </th>
//                   <th className="px-4 py-3 text-center text-base font-bold text-gray-800 border-x border-gray-300">
//                     <Calendar className="w-5 h-5 inline-block mr-2" />
//                     Requested Till
//                   </th>
//                   <th className="px-4  text-center text-base font-bold text-gray-800 sticky right-0 bg-gray-100 z-20">
//                     Confirmation
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {shiftRequests.map((req, i) => (
//                   <tr key={req.id} className="hover:bg-gray-50 transition">
//                     <td className="px-6  sticky left-0 bg-white z-10 border-r border-gray-300">
//                       <input type="checkbox" checked={selectedRows[i] || false} onChange={() => toggleRow(i)} className="w-5 h-5 rounded border-gray-400" />
//                     </td>

//                     {/* Employee Column - Exact Match */}
//                     <td className="px-6 sticky left-12 bg-white z-10 border-r-2 border-gray-300">
//                       <div className="flex items-center gap-4">
//                         <div className={`w-8 h-8 ${accentBg} rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md`}>
//                           {req.avatar}
//                         </div>
//                         <div>
//                           <div className="font-bold text-gray-900 text-sm">{req.name}</div>
//                           <div className="text-sm text-gray-500">({req.code})</div>
//                         </div>
//                       </div>
//                     </td>

//                     <td className="px-6 py-5 text-center font-medium text-gray-700 border-x border-gray-300">
//                       {req.currentShift}
//                     </td>
//                     <td className="px-6 py-5 text-center font-medium text-gray-800 border-x border-gray-300">
//                       {req.dateFrom}
//                     </td>
//                     <td className="px-6 py-5 text-center font-medium text-gray-800 border-x border-gray-300">
//                       {req.dateTo}
//                     </td>

//                     {/* Confirmation - Exact Match */}
//                    <td className="sticky right-0 bg-white px-2 py-2 border-l-2 border-gray-200">
//                       <div className="flex items-center gap-4">
//                         <button className=" bg-green-100 text-green-700 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-green-200 transition">
//                           <CheckCircle className="w-6 h-6  text-sm" /> Approved
//                         </button>
//                         <button className="  text-sm bg-red-100 text-red-700 rounded-xl font-bold flex items-center gap-2 hover:bg-red-200 transition">
//                           <XCircle className="w-6 h-6  text-sm" /> Rejected
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>

//       {/* RED FAB */}
//       <button className="fixed bottom-8 right-8 w-16 h-16 bg-red-600 text-white rounded-full shadow-2xl flex items-center justify-center z-50 hover:bg-red-700 hover:scale-110 transition">
//         <Plus className="w-9 h-9" />
//       </button>
//     </>
//   );
// }


'use client';

import React, { useState } from 'react';
import {
  Search, Filter, ChevronDown, Plus, Calendar, CheckCircle, XCircle,
  MoreVertical, Eye, Edit2, Trash2, Download, Settings, Bell, BarChart3,
  Grid3X3, Clock, Users, TrendingUp, TrendingDown, RefreshCw, ArrowRight,
  ChevronRight, ChevronLeft, User, Mail, Phone, MapPin, Shield,
  FileText, Copy, AlertCircle, Check, X, UserCheck
} from 'lucide-react';
import { useTheme } from './ThemeContext';

const shiftRequests = [
  { 
    id: 1, 
    name: 'Muqadas Ejaz', 
    code: 'PEP00', 
    avatar: 'ME', 
    department: 'Engineering',
    currentShift: 'Morning Shift (9 AM - 5 PM)',
    requestedShift: 'Evening Shift (2 PM - 10 PM)',
    dateFrom: 'Monday, November 10, 2025', 
    dateTo: 'Monday, November 10, 2025',
    status: 'pending',
    reason: 'Medical appointment in morning',
    priority: 'Medium'
  },
  { 
    id: 2, 
    name: 'Charlotte White', 
    code: 'PEP19', 
    avatar: 'CW', 
    department: 'Sales',
    currentShift: 'Night Shift (10 PM - 6 AM)',
    requestedShift: 'Day Shift (8 AM - 4 PM)',
    dateFrom: 'Thursday, November 13, 2025', 
    dateTo: 'None',
    status: 'pending',
    reason: 'Family event',
    priority: 'Low'
  },
  { 
    id: 3, 
    name: 'Test KP', 
    code: 'PEP1005', 
    avatar: 'TK', 
    department: 'Marketing',
    currentShift: 'Regular Shift (9 AM - 6 PM)',
    requestedShift: 'Flexi Shift (10 AM - 7 PM)',
    dateFrom: 'Monday, November 10, 2025', 
    dateTo: 'None',
    status: 'approved',
    reason: 'Personal work',
    priority: 'Medium'
  },
  { 
    id: 4, 
    name: 'Muqadas Ejaz', 
    code: 'PEP00', 
    avatar: 'ME', 
    department: 'Engineering',
    currentShift: 'Morning Shift (9 AM - 5 PM)',
    requestedShift: 'Remote Work',
    dateFrom: 'Friday, November 7, 2025', 
    dateTo: 'None',
    status: 'rejected',
    reason: 'Project deadline',
    priority: 'High'
  },
  { 
    id: 5, 
    name: 'Muqadas Ejaz', 
    code: 'PEP00', 
    avatar: 'ME', 
    department: 'Engineering',
    currentShift: 'Morning Shift (9 AM - 5 PM)',
    requestedShift: 'Evening Shift (2 PM - 10 PM)',
    dateFrom: 'Thursday, November 6, 2025', 
    dateTo: 'Thursday, November 6, 2025',
    status: 'approved',
    reason: 'Doctor appointment',
    priority: 'High'
  },
  { 
    id: 6, 
    name: 'Alex Johnson', 
    code: 'PEP42', 
    avatar: 'AJ', 
    department: 'HR',
    currentShift: 'Day Shift (8 AM - 4 PM)',
    requestedShift: 'Half Day (8 AM - 12 PM)',
    dateFrom: 'Tuesday, November 11, 2025', 
    dateTo: 'Tuesday, November 11, 2025',
    status: 'pending',
    reason: 'Medical checkup',
    priority: 'Medium'
  },
];

export default function ShiftRequestsPerfect() {
  const { theme } = useTheme();
  const [selectedAll, setSelectedAll] = useState(false);
  const [selectedRows, setSelectedRows] = useState({});
  const [viewMode, setViewMode] = useState('table');
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const totalPages = 2;

  // Theme helper functions
  const getTextAccent = () => theme?.accent ? `text-${theme.accent}` : 'text-orange-600';
  const getButtonGradient = () => theme?.button ? `bg-gradient-to-r ${theme.button}` : 'bg-gradient-to-r from-orange-500 to-orange-600';
  const getButtonHover = () => theme?.buttonHover || 'hover:from-orange-600 hover:to-orange-700';
  const getLightBg = () => theme?.lightBg || 'bg-orange-50';
  const getRingColor = () => theme?.ringColor || 'ring-orange-500';

  const toggleSelectAll = () => {
    const newState = !selectedAll;
    const newSel = {};
    shiftRequests.forEach((_, i) => newSel[i] = newState);
    setSelectedRows(newSel);
    setSelectedAll(newState);
  };

  const toggleRow = (i) => {
    const newSel = { ...selectedRows, [i]: !selectedRows[i] };
    setSelectedRows(newSel);
    setSelectedAll(Object.values(newSel).every(v => v) && Object.keys(newSel).length === shiftRequests.length);
  };

  const filteredRequests = shiftRequests.filter(request => {
    const matchesSearch = 
      request.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.department.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeFilter === 'all') return matchesSearch;
    if (activeFilter === 'pending') return matchesSearch && request.status === 'pending';
    if (activeFilter === 'approved') return matchesSearch && request.status === 'approved';
    if (activeFilter === 'rejected') return matchesSearch && request.status === 'rejected';
    return matchesSearch;
  });

  const summaryData = {
    total: shiftRequests.length,
    pending: shiftRequests.filter(r => r.status === 'pending').length,
    approved: shiftRequests.filter(r => r.status === 'approved').length,
    rejected: shiftRequests.filter(r => r.status === 'rejected').length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50/50 via-white to-blue-50/30">
      {/* HEADER */}
      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-sm border-b border-gray-200/50 p-4 lg:p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Shift Requests</h1>
            <p className="text-gray-600 mt-1">Manage and approve employee shift change requests</p>
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
          
          {['all', 'pending', 'approved', 'rejected'].map((filter) => (
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
                <TrendingUp className="h-4 w-4 mr-1" /> +{Math.floor(summaryData.pending * 0.2)}
              </div>
            </div>
            <h3 className="text-sm font-medium text-gray-500 mb-1">Pending</h3>
            <p className="text-2xl lg:text-3xl font-bold text-yellow-600">{summaryData.pending}</p>
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
                  <h3 className="text-lg font-bold text-gray-900">Shift Requests</h3>
                  <p className="text-sm text-gray-500 mt-1">{filteredRequests.length} requests found</p>
                </div>
                
                <div className="flex items-center gap-3">
                  <button
                    onClick={toggleSelectAll}
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
                        onChange={toggleSelectAll}
                        className={`rounded border-gray-300 ${getTextAccent()} focus:${getRingColor()}`}
                      />
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Employee</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Current Shift</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Requested Shift</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Date From</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Date To</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
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
                          onChange={() => toggleRow(idx)}
                          className={`rounded border-gray-300 ${getTextAccent()} focus:${getRingColor()}`}
                        />
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                            <span className="text-white font-medium">{req.avatar}</span>
                          </div>
                          <div className="text-left">
                            <p className="font-medium text-gray-900">{req.name}</p>
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-gray-500">{req.code}</span>
                              <span className="text-xs text-gray-400">•</span>
                              <span className="text-xs text-gray-500">{req.department}</span>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">{req.currentShift}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <ArrowRight className="h-4 w-4 text-gray-400" />
                          <span className="text-sm font-medium text-gray-900">{req.requestedShift}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">{req.dateFrom}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium ${
                          req.dateTo === 'None' ? 'bg-gray-100 text-gray-800' : 'bg-blue-100 text-blue-800'
                        }`}>
                          {req.dateTo}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium ${
                          req.status === 'approved' ? 'bg-green-100 text-green-800' :
                          req.status === 'rejected' ? 'bg-red-100 text-red-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {req.status.charAt(0).toUpperCase() + req.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          {req.status === 'pending' && (
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
                  <span className="font-medium">{shiftRequests.length}</span> requests
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
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                      <span className="text-white text-lg font-bold">{req.avatar}</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">{req.name}</h3>
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
                    <span className="text-sm text-gray-500">Current</span>
                    <span className="text-sm font-medium text-gray-900 truncate max-w-[150px]">{req.currentShift}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Requested</span>
                    <span className="text-sm font-medium text-gray-900 truncate max-w-[150px]">{req.requestedShift}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Dates</span>
                    <span className="text-sm font-medium text-gray-900">{req.dateFrom.split(',')[0]}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Status</span>
                    <span className={`px-3 py-1 rounded-lg text-xs font-medium ${
                      req.status === 'approved' ? 'bg-green-100 text-green-800' :
                      req.status === 'rejected' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {req.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Priority</span>
                    <span className={`px-3 py-1 rounded-lg text-xs font-medium ${
                      req.priority === 'High' ? 'bg-red-100 text-red-800' :
                      req.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {req.priority}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <button
                    className="text-sm font-medium text-gray-600 hover:text-gray-900 flex items-center"
                  >
                    <Eye className="h-4 w-4 mr-1" /> View Details
                  </button>
                  
                  <div className="flex items-center gap-2">
                    {req.status === 'pending' && (
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
            <Clock className={`h-5 w-5 ${getTextAccent()}`} />
          </div>
          <div>
            <h3 className="font-bold text-gray-900">Shift Stats</h3>
            <p className="text-xs text-gray-500">{summaryData.pending} pending requests</p>
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
            <span className="text-gray-600">Avg Response Time</span>
            <span className="font-medium text-gray-900">1.2 days</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Most Active Dept</span>
            <span className="font-medium text-gray-900">Engineering</span>
          </div>
        </div>
      </div>
    </div>
  );
}