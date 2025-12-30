// 'use client';

// import React, { useState } from 'react';
// import {
//   Search,
//   Filter,
//   Grid3X3,
//   MoreVertical,
//   Plus,
//   X,
//   Calendar,
//   Paperclip,
//   ChevronLeft,
//   ChevronRight,
//   Check,
//   XCircle,
//   AlertCircle,
//   Info,
//   User,
//   Download,
//   Settings,
//   Bell,
//   Users,
//   Clock,
//   TrendingUp,
//   TrendingDown,
//   ArrowRight,
//   Eye,
//   Edit2,
//   Trash2,
//   RefreshCw,
//   BarChart3,
//   PieChart as PieChartIcon,
//   LineChart as LineChartIcon,
//   Gift,
//   CreditCard,
//   CalendarDays,
//   FileText
// } from 'lucide-react';
// import { useTheme } from './ThemeContext';

// export default function LeaveRequests() {
//   const { theme } = useTheme();
  
//   // Theme helper functions
//   const getAccentColor = () => theme?.accent || 'orange-600';
//   const getBorderColor = () => theme?.borderColor || 'border-orange-600';
//   const getTextAccent = () => theme?.accent ? `text-${theme.accent}` : 'text-orange-600';
//   const getButtonGradient = () => theme?.button ? `bg-gradient-to-r ${theme.button}` : 'bg-gradient-to-r from-orange-500 to-orange-600';
//   const getButtonHover = () => theme?.buttonHover || 'hover:from-orange-600 hover:to-orange-700';
//   const getLightBg = () => theme?.lightBg || 'bg-orange-50';
//   const getSidebarActive = () => theme?.sidebarActive || 'bg-orange-200';
//   const getRingColor = () => theme?.ringColor || 'ring-orange-500';

//   const [showCreateModal, setShowCreateModal] = useState(false);
//   const [showDetailsModal, setShowDetailsModal] = useState(false);
//   const [showGiveBalanceModal, setShowGiveBalanceModal] = useState(false);
//   const [selectedRequest, setSelectedRequest] = useState(null);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [selectedAll, setSelectedAll] = useState(false);
//   const [activeFilter, setActiveFilter] = useState('all');
//   const [viewMode, setViewMode] = useState('table');
//   const [page, setPage] = useState(1);
//   const [balanceForm, setBalanceForm] = useState({
//     employee: '',
//     leaveType: '',
//     balanceCode: '',
//     days: '',
//     validFrom: '',
//     validUntil: '',
//     notes: ''
//   });
//   const totalPages = 3;

//   // Mock data
//   const requests = [
//     {
//       id: 1,
//       employee: 'Dev Prakash',
//       code: 'PEP00',
//       department: 'Engineering',
//       type: 'Marriage Leave',
//       start: '26 November, 2025',
//       end: '26 November, 2025',
//       days: 1.0,
//       status: 'Requested',
//       statusColor: 'bg-yellow-100 text-yellow-800',
//       avatarColor: 'bg-gradient-to-br from-blue-500 to-blue-600',
//       confirmButtons: ['Approve', 'Reject'],
//       description: 'Marriage ceremony leave request',
//     },
//     {
//       id: 2,
//       employee: 'Dev Prakash',
//       code: 'PEP00',
//       department: 'Engineering',
//       type: 'Maternity Leave',
//       start: '15 November, 2025',
//       end: '15 November, 2025',
//       days: 1.0,
//       status: 'Approved',
//       statusColor: 'bg-green-100 text-green-800',
//       avatarColor: 'bg-gradient-to-br from-blue-500 to-blue-600',
//       confirmButtons: ['Approve', 'Reject'],
//       description: 'Maternity leave approval',
//     },
//     {
//       id: 3,
//       employee: 'Dev Prakash',
//       code: 'PEP00',
//       department: 'Engineering',
//       type: 'Maternity Leave',
//       start: '12 November, 2025',
//       end: '12 November, 2025',
//       days: 1.0,
//       status: 'Approved',
//       statusColor: 'bg-green-100 text-green-800',
//       avatarColor: 'bg-gradient-to-br from-blue-500 to-blue-600',
//       confirmButtons: ['Approve', 'Reject'],
//       hasWarning: true,
//       description: 'Maternity leave with documentation pending',
//     },
//     {
//       id: 4,
//       employee: 'Dev Prakash',
//       code: 'PEP00',
//       department: 'Engineering',
//       type: 'Sick Leave',
//       start: '26 December, 2025',
//       end: '26 December, 2025',
//       days: 1.0,
//       status: 'Cancelled',
//       statusColor: 'bg-gray-100 text-gray-800',
//       avatarColor: 'bg-gradient-to-br from-blue-500 to-blue-600',
//       confirmButtons: ['Requested'],
//       description: 'Sick leave cancelled by employee',
//     },
//     {
//       id: 5,
//       employee: 'Dev Prakash',
//       code: 'PEP00',
//       department: 'Engineering',
//       type: 'Sick Leave',
//       start: '30 December, 2025',
//       end: '30 December, 2025',
//       days: 1.0,
//       status: 'Requested',
//       statusColor: 'bg-yellow-100 text-yellow-800',
//       avatarColor: 'bg-gradient-to-br from-blue-500 to-blue-600',
//       confirmButtons: ['Approve', 'Reject'],
//       description: 'Medical appointment leave request',
//     },
//     {
//       id: 6,
//       employee: 'Dev Prakash',
//       code: 'PEP00',
//       department: 'Engineering',
//       type: 'Sick Leave',
//       start: '30 November, 2025',
//       end: '30 November, 2025',
//       days: 0.0,
//       status: 'Requested',
//       statusColor: 'bg-yellow-100 text-yellow-800',
//       avatarColor: 'bg-gradient-to-br from-blue-500 to-blue-600',
//       confirmButtons: ['Approve', 'Reject'],
//       description: 'Half day sick leave',
//     },
//     {
//       id: 7,
//       employee: 'Liam Bennett',
//       code: 'PEP15',
//       department: 'Sales',
//       type: 'Casual Leave',
//       start: '07 November, 2025',
//       end: '07 November, 2025',
//       days: 1.0,
//       status: 'Requested',
//       statusColor: 'bg-yellow-100 text-yellow-800',
//       avatarColor: 'bg-gradient-to-br from-green-500 to-green-600',
//       confirmButtons: ['Approve', 'Reject'],
//       description: 'Personal casual leave request',
//     },
//     {
//       id: 8,
//       employee: 'Dev Prakash',
//       code: 'PEP00',
//       department: 'Engineering',
//       type: 'Maternity Leave',
//       start: '25 November, 2025',
//       end: '25 November, 2025',
//       days: 1.0,
//       status: 'Requested',
//       statusColor: 'bg-yellow-100 text-yellow-800',
//       avatarColor: 'bg-gradient-to-br from-blue-500 to-blue-600',
//       confirmButtons: ['Approve', 'Reject'],
//       description: 'Maternity leave extension request',
//     },
//     {
//       id: 9,
//       employee: 'Dev Prakash',
//       code: 'PEP00',
//       department: 'Engineering',
//       type: 'Maternity Leave',
//       start: '15 November, 2025',
//       end: '15 November, 2025',
//       days: 1.0,
//       status: 'Rejected',
//       statusColor: 'bg-red-100 text-red-800',
//       avatarColor: 'bg-gradient-to-br from-blue-500 to-blue-600',
//       confirmButtons: ['Approve', 'Reject'],
//       description: 'Maternity leave rejected due to insufficient documentation',
//     },
//   ];

//   // Leave balance codes data
//   const leaveBalanceCodes = [
//     { id: 'LB-2025-001', type: 'Annual Leave', days: 15, status: 'Active', issuedDate: '2025-01-01', expiresDate: '2025-12-31' },
//     { id: 'LB-2025-002', type: 'Sick Leave', days: 10, status: 'Active', issuedDate: '2025-01-01', expiresDate: '2025-12-31' },
//     { id: 'LB-2025-003', type: 'Maternity Leave', days: 90, status: 'Pending', issuedDate: '2025-11-01', expiresDate: '2026-02-01' },
//     { id: 'LB-2025-004', type: 'Emergency Leave', days: 5, status: 'Used', issuedDate: '2025-06-01', expiresDate: '2025-12-31' },
//   ];

//   const openDetails = (req, index) => {
//     setSelectedRequest(req);
//     setCurrentIndex(index);
//     setShowDetailsModal(true);
//   };

//   const navigate = (direction) => {
//     const newIndex = direction === 'prev' ? currentIndex - 1 : currentIndex + 1;
//     if (newIndex >= 0 && newIndex < requests.length) {
//       setCurrentIndex(newIndex);
//       setSelectedRequest(requests[newIndex]);
//     }
//   };

//   const handleBalanceFormChange = (e) => {
//     const { name, value } = e.target;
//     setBalanceForm(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleGiveBalance = () => {
//     // Generate a unique balance code
//     const balanceCode = `LB-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    
//     // Here you would typically send the data to your backend
//     console.log('Giving balance:', { ...balanceForm, balanceCode });
    
//     // Reset form and close modal
//     setBalanceForm({
//       employee: '',
//       leaveType: '',
//       balanceCode: '',
//       days: '',
//       validFrom: '',
//       validUntil: '',
//       notes: ''
//     });
//     setShowGiveBalanceModal(false);
    
//     // Show success message
//     alert(`Balance code ${balanceCode} has been issued successfully!`);
//   };

//   const summaryData = {
//     requested: { count: 5, change: '+2', trend: 'up' },
//     approved: { count: 2, change: '+1', trend: 'up' },
//     rejected: { count: 1, change: '-0', trend: 'neutral' },
//     cancelled: { count: 1, change: '-0', trend: 'neutral' }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50/50 via-white to-blue-50/30 p-4 lg:p-6">
//       {/* HEADER */}
//       <div className="mb-6 lg:mb-8">
//         <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
//           <div>
//             <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Leave Requests Management</h1>
//             <p className="text-gray-600 mt-1">Review and manage employee leave requests</p>
//           </div>
          
//           <div className="flex items-center gap-3">
//             <div className="relative">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
//               <input
//                 type="text"
//                 placeholder="Search requests..."
//                 className={`pl-10 pr-4 py-2 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 ${getRingColor()} focus:border-transparent w-full lg:w-64`}
//               />
//             </div>
            
//             <button className={`p-2 ${getLightBg()} ${getTextAccent()} rounded-xl hover:opacity-90`}>
//               <Filter className="h-5 w-5" />
//             </button>
            
//             <button className="relative p-2 hover:bg-gray-100 rounded-xl">
//               <Bell className="h-5 w-5 text-gray-600" />
//               <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
//             </button>
            
//             <button className="hidden lg:flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-xl text-sm hover:bg-gray-50">
//               <Settings className="h-4 w-4" /> Settings
//             </button>
//           </div>
//         </div>

//         {/* Filter Bar */}
//         <div className="flex items-center gap-2 mt-6 overflow-x-auto scrollbar-hide">
//           <div className="flex items-center gap-2 p-1 bg-gray-100 rounded-xl">
//             <button
//               onClick={() => setViewMode('table')}
//               className={`px-3 py-1.5 text-sm rounded-lg flex items-center gap-2 ${
//                 viewMode === 'table' ? 'bg-white shadow-sm' : ''
//               }`}
//             >
//               <BarChart3 className="h-4 w-4" /> Table
//             </button>
//             <button
//               onClick={() => setViewMode('card')}
//               className={`px-3 py-1.5 text-sm rounded-lg flex items-center gap-2 ${
//                 viewMode === 'card' ? 'bg-white shadow-sm' : ''
//               }`}
//             >
//               <Grid3X3 className="h-4 w-4" /> Cards
//             </button>
//           </div>
          
//           {['all', 'requested', 'approved', 'rejected'].map((filter) => (
//             <button
//               key={filter}
//               onClick={() => setActiveFilter(filter)}
//               className={`px-4 py-2 rounded-xl text-sm font-medium capitalize whitespace-nowrap ${
//                 activeFilter === filter
//                   ? `${getButtonGradient()} ${getButtonHover()} text-white`
//                   : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-300'
//               }`}
//             >
//               {filter}
//             </button>
//           ))}
          
//           <div className="flex items-center gap-1 border border-gray-300 rounded-xl px-3 py-2 bg-white">
//             <Calendar className="h-4 w-4 text-gray-500" />
//             <span className="text-sm text-gray-700">12 Nov 2025</span>
//           </div>
//         </div>
//       </div>

//       {/* SUMMARY CARDS */}
//       <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6 lg:mb-8">
//         <div className="bg-white rounded-2xl p-5 lg:p-6 shadow-lg border border-gray-200/50 hover:shadow-xl transition-shadow">
//           <div className="flex items-center justify-between mb-4">
//             <div className="p-3 bg-yellow-50 rounded-xl">
//               <AlertCircle className="h-6 w-6 text-yellow-600" />
//             </div>
//             <div className="flex items-center text-sm text-yellow-600 font-medium">
//               <TrendingUp className="h-4 w-4 mr-1" />
//               {summaryData.requested.change}
//             </div>
//           </div>
//           <h3 className="text-sm font-medium text-gray-500 mb-1">Pending Requests</h3>
//           <div className="flex items-baseline gap-2">
//             <p className="text-2xl lg:text-3xl font-bold text-gray-900">{summaryData.requested.count}</p>
//             <span className="text-sm text-gray-500">awaiting</span>
//           </div>
//           <div className="mt-4 pt-4 border-t border-gray-100">
//             <button className="text-sm font-medium text-gray-600 hover:text-gray-900 flex items-center">
//               Review <ArrowRight className="h-4 w-4 ml-1" />
//             </button>
//           </div>
//         </div>

//         <div className="bg-white rounded-2xl p-5 lg:p-6 shadow-lg border border-gray-200/50 hover:shadow-xl transition-shadow">
//           <div className="flex items-center justify-between mb-4">
//             <div className="p-3 bg-green-50 rounded-xl">
//               <Check className="h-6 w-6 text-green-600" />
//             </div>
//             <div className="flex items-center text-sm text-green-600 font-medium">
//               <TrendingUp className="h-4 w-4 mr-1" />
//               {summaryData.approved.change}
//             </div>
//           </div>
//           <h3 className="text-sm font-medium text-gray-500 mb-1">Approved</h3>
//           <div className="flex items-baseline gap-2">
//             <p className="text-2xl lg:text-3xl font-bold text-green-600">{summaryData.approved.count}</p>
//             <span className="text-sm text-gray-500">leaves</span>
//           </div>
//           <div className="mt-4 pt-4 border-t border-gray-100">
//             <div className="flex items-center text-xs text-gray-500">
//               <Clock className="h-3 w-3 mr-1" /> This month
//             </div>
//           </div>
//         </div>

//         <div className="bg-white rounded-2xl p-5 lg:p-6 shadow-lg border border-gray-200/50 hover:shadow-xl transition-shadow">
//           <div className="flex items-center justify-between mb-4">
//             <div className="p-3 bg-red-50 rounded-xl">
//               <XCircle className="h-6 w-6 text-red-600" />
//             </div>
//             <div className="flex items-center text-sm text-red-600 font-medium">
//               {summaryData.rejected.trend === 'up' ? 
//                 <TrendingUp className="h-4 w-4 mr-1" /> : 
//                 summaryData.rejected.trend === 'down' ?
//                 <TrendingDown className="h-4 w-4 mr-1" /> :
//                 <span className="text-xs">-</span>
//               }
//               {summaryData.rejected.change}
//             </div>
//           </div>
//           <h3 className="text-sm font-medium text-gray-500 mb-1">Rejected</h3>
//           <div className="flex items-baseline gap-2">
//             <p className="text-2xl lg:text-3xl font-bold text-red-600">{summaryData.rejected.count}</p>
//             <span className="text-sm text-gray-500">leaves</span>
//           </div>
//           <div className="mt-4 pt-4 border-t border-gray-100">
//             <button className="text-sm font-medium text-gray-600 hover:text-gray-900">
//               View reasons
//             </button>
//           </div>
//         </div>

//         <div className="bg-white rounded-2xl p-5 lg:p-6 shadow-lg border border-gray-200/50 hover:shadow-xl transition-shadow">
//           <div className="flex items-center justify-between mb-4">
//             <div className={`p-3 ${getLightBg()} rounded-xl`}>
//               <Gift className={`h-6 w-6 ${getTextAccent()}`} />
//             </div>
//             <button 
//               onClick={() => setShowGiveBalanceModal(true)}
//               className={`px-3 py-1.5 ${getButtonGradient()} ${getButtonHover()} text-white text-xs font-medium rounded-lg flex items-center gap-1`}
//             >
//               <Plus className="h-3 w-3" /> Give Balance
//             </button>
//           </div>
//           <h3 className="text-sm font-medium text-gray-500 mb-1">Leave Balance</h3>
//           <div className="flex items-baseline gap-2">
//             <p className="text-2xl lg:text-3xl font-bold text-gray-900">{leaveBalanceCodes.length}</p>
//             <span className="text-sm text-gray-500">active codes</span>
//           </div>
//           <div className="mt-4 pt-4 border-t border-gray-100">
//             <button className="text-sm font-medium text-gray-600 hover:text-gray-900 flex items-center">
//               Manage <ArrowRight className="h-4 w-4 ml-1" />
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* STATUS LEGEND */}
//       <div className="mb-6 bg-white rounded-2xl p-5 shadow-lg border border-gray-200/50">
//         <div className="flex items-center justify-between mb-4">
//           <h3 className="font-medium text-gray-900">Request Status</h3>
//           <span className="text-sm text-gray-500">{requests.length} total requests</span>
//         </div>
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//           <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-xl">
//             <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
//             <div>
//               <p className="text-sm font-medium text-gray-900">Requested</p>
//               <p className="text-xs text-gray-500">Awaiting approval</p>
//             </div>
//           </div>
//           <div className="flex items-center gap-3 p-3 bg-green-50 rounded-xl">
//             <div className="w-3 h-3 bg-green-500 rounded-full"></div>
//             <div>
//               <p className="text-sm font-medium text-gray-900">Approved</p>
//               <p className="text-xs text-gray-500">Leave granted</p>
//             </div>
//           </div>
//           <div className="flex items-center gap-3 p-3 bg-red-50 rounded-xl">
//             <div className="w-3 h-3 bg-red-500 rounded-full"></div>
//             <div>
//               <p className="text-sm font-medium text-gray-900">Rejected</p>
//               <p className="text-xs text-gray-500">Leave denied</p>
//             </div>
//           </div>
//           <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
//             <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
//             <div>
//               <p className="text-sm font-medium text-gray-900">Cancelled</p>
//               <p className="text-xs text-gray-500">By employee</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* LEAVE BALANCE CODES SECTION */}
//       <div className="mb-6 bg-white rounded-2xl shadow-lg border border-gray-200/50 overflow-hidden">
//         <div className={`${getLightBg()} border-b border-gray-200`}>
//           <div className="flex items-center justify-between p-6">
//             <div className="flex items-center gap-3">
//               <div className={`p-2 ${getLightBg()} rounded-xl`}>
//                 <CreditCard className={`h-5 w-5 ${getTextAccent()}`} />
//               </div>
//               <div>
//                 <h3 className="text-lg font-bold text-gray-900">Leave Balance Codes</h3>
//                 <p className="text-sm text-gray-500 mt-1">Manage and distribute leave balance codes to employees</p>
//               </div>
//             </div>
            
//             <div className="flex items-center gap-3">
//               <button className="p-2 hover:bg-gray-100 rounded-xl">
//                 <Download className="h-5 w-5 text-gray-600" />
//               </button>
//               <button 
//                 onClick={() => setShowGiveBalanceModal(true)}
//                 className={`px-4 py-2 ${getButtonGradient()} ${getButtonHover()} text-white text-sm font-medium rounded-xl flex items-center gap-2`}
//               >
//                 <Gift className="h-4 w-4" /> Give Balance Code
//               </button>
//             </div>
//           </div>
//         </div>

//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead className="border-b border-gray-200">
//               <tr>
//                 <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Balance Code</th>
//                 <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Leave Type</th>
//                 <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Days</th>
//                 <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Issued Date</th>
//                 <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Expires Date</th>
//                 <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
//                 <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-200">
//               {leaveBalanceCodes.map((code) => (
//                 <tr key={code.id} className="hover:bg-gray-50/50 transition-colors">
//                   <td className="px-6 py-4">
//                     <div className="flex items-center gap-2">
//                       <CreditCard className="h-4 w-4 text-gray-400" />
//                       <span className="font-medium text-gray-900">{code.id}</span>
//                     </div>
//                   </td>
//                   <td className="px-6 py-4 text-sm font-medium text-gray-900">{code.type}</td>
//                   <td className="px-6 py-4">
//                     <span className="inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium bg-blue-100 text-blue-700">
//                       {code.days} days
//                     </span>
//                   </td>
//                   <td className="px-6 py-4 text-sm text-gray-700">{code.issuedDate}</td>
//                   <td className="px-6 py-4 text-sm text-gray-700">{code.expiresDate}</td>
//                   <td className="px-6 py-4">
//                     <span className={`inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium ${
//                       code.status === 'Active' ? 'bg-green-100 text-green-800' :
//                       code.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
//                       'bg-gray-100 text-gray-800'
//                     }`}>
//                       {code.status}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4">
//                     <div className="flex items-center gap-2">
//                       <button className="p-1.5 hover:bg-gray-100 rounded-lg">
//                         <Eye className="h-4 w-4 text-gray-600" />
//                       </button>
//                       <button className="p-1.5 hover:bg-gray-100 rounded-lg">
//                         <Edit2 className="h-4 w-4 text-gray-600" />
//                       </button>
//                       <button className="p-1.5 hover:bg-gray-100 rounded-lg">
//                         <Trash2 className="h-4 w-4 text-gray-600" />
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* TABLE VIEW */}
//       {viewMode === 'table' && (
//         <div className="bg-white rounded-2xl shadow-lg border border-gray-200/50 overflow-hidden">
//           {/* Table Header */}
//           <div className={`${getLightBg()} border-b border-gray-200`}>
//             <div className="flex items-center justify-between p-6">
//               <div>
//                 <h3 className="text-lg font-bold text-gray-900">Leave Requests</h3>
//                 <p className="text-sm text-gray-500 mt-1">{requests.length} requests found</p>
//               </div>
              
//               <div className="flex items-center gap-3">
//                 <button className="p-2 hover:bg-gray-100 rounded-xl">
//                   <Download className="h-5 w-5 text-gray-600" />
//                 </button>
//                 <button className="p-2 hover:bg-gray-100 rounded-xl">
//                   <MoreVertical className="h-5 w-5 text-gray-600" />
//                 </button>
//                 <button
//                   onClick={() => setShowCreateModal(true)}
//                   className={`px-4 py-2 ${getButtonGradient()} ${getButtonHover()} text-white text-sm font-medium rounded-xl flex items-center gap-2`}
//                 >
//                   <Plus className="h-4 w-4" /> Create Request
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* Table */}
//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead className="border-b border-gray-200">
//                 <tr>
//                   <th className="px-6 py-4 text-left">
//                     <input
//                       type="checkbox"
//                       checked={selectedAll}
//                       onChange={(e) => setSelectedAll(e.target.checked)}
//                       className={`rounded border-gray-300 ${getTextAccent()} focus:${getRingColor()}`}
//                     />
//                   </th>
//                   <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Employee</th>
//                   <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Leave Type</th>
//                   <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Start Date</th>
//                   <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">End Date</th>
//                   <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Days</th>
//                   <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
//                   <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-200">
//                 {requests.map((req, idx) => (
//                   <tr key={req.id} className="hover:bg-gray-50/50 transition-colors">
//                     <td className="px-6 py-4">
//                       <input
//                         type="checkbox"
//                         checked={selectedAll}
//                         onChange={(e) => setSelectedAll(e.target.checked)}
//                         className={`rounded border-gray-300 ${getTextAccent()} focus:${getRingColor()}`}
//                       />
//                     </td>
//                     <td className="px-6 py-4">
//                       <button
//                         onClick={() => openDetails(req, idx)}
//                         className="flex items-center gap-3 hover:opacity-80 transition-opacity"
//                       >
//                         <div className={`w-10 h-10 ${req.avatarColor} rounded-xl flex items-center justify-center`}>
//                           <span className="text-white font-medium">{req.employee.split(' ').map(n => n[0]).join('')}</span>
//                         </div>
//                         <div className="text-left">
//                           <p className="font-medium text-gray-900">{req.employee}</p>
//                           <div className="flex items-center gap-2">
//                             <span className="text-xs text-gray-500">{req.code}</span>
//                             <span className="text-xs text-gray-400">•</span>
//                             <span className="text-xs text-gray-500">{req.department}</span>
//                             {req.hasWarning && <AlertCircle className="h-3 w-3 text-orange-500" />}
//                           </div>
//                         </div>
//                       </button>
//                     </td>
//                     <td className="px-6 py-4 text-sm font-medium text-gray-900">{req.type}</td>
//                     <td className="px-6 py-4 text-sm text-gray-700">{req.start}</td>
//                     <td className="px-6 py-4 text-sm text-gray-700">{req.end}</td>
//                     <td className="px-6 py-4">
//                       <span className="inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium bg-blue-100 text-blue-700">
//                         <Clock className="h-4 w-4 mr-1" /> {req.days} days
//                       </span>
//                     </td>
//                     <td className="px-6 py-4">
//                       <span className={`inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium ${req.statusColor}`}>
//                         {req.status}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4">
//                       <div className="flex items-center gap-2">
//                         {req.confirmButtons.includes('Approve') && (
//                           <button className="px-3 py-1.5 bg-green-100 text-green-700 rounded-lg text-sm font-medium hover:bg-green-200 flex items-center gap-1">
//                             <Check className="h-4 w-4" /> Approve
//                           </button>
//                         )}
//                         {req.confirmButtons.includes('Reject') && (
//                           <button className="px-3 py-1.5 bg-red-100 text-red-700 rounded-lg text-sm font-medium hover:bg-red-200 flex items-center gap-1">
//                             <XCircle className="h-4 w-4" /> Reject
//                           </button>
//                         )}
//                         {req.confirmButtons.includes('Requested') && (
//                           <button className="px-3 py-1.5 bg-yellow-100 text-yellow-700 rounded-lg text-sm font-medium">
//                             Requested
//                           </button>
//                         )}
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           {/* Pagination */}
//           <div className="border-t border-gray-200 px-6 py-4">
//             <div className="flex items-center justify-between">
//               <div className="text-sm text-gray-600">
//                 Showing <span className="font-medium">{requests.length}</span> of{' '}
//                 <span className="font-medium">{requests.length}</span> requests
//               </div>
              
//               <div className="flex items-center gap-4">
//                 <div className="flex items-center gap-2">
//                   <button
//                     onClick={() => setPage(Math.max(1, page - 1))}
//                     disabled={page === 1}
//                     className="p-2 hover:bg-gray-100 rounded-xl disabled:opacity-50"
//                   >
//                     <ChevronLeft className="h-4 w-4" />
//                   </button>
                  
//                   <div className="flex items-center gap-2">
//                     {[1, 2, 3].map(p => (
//                       <button
//                         key={p}
//                         onClick={() => setPage(p)}
//                         className={`w-10 h-10 rounded-lg font-medium ${
//                           page === p
//                             ? `${getButtonGradient()} text-white`
//                             : 'text-gray-600 hover:bg-gray-100'
//                         }`}
//                       >
//                         {p}
//                       </button>
//                     ))}
//                   </div>
                  
//                   <button
//                     onClick={() => setPage(Math.min(totalPages, page + 1))}
//                     disabled={page === totalPages}
//                     className="p-2 hover:bg-gray-100 rounded-xl disabled:opacity-50"
//                   >
//                     <ChevronRight className="h-4 w-4" />
//                   </button>
//                 </div>
                
//                 <div className="text-sm text-gray-600">
//                   Page <span className="font-medium">{page}</span> of <span className="font-medium">{totalPages}</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* CARD VIEW */}
//       {viewMode === 'card' && (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {requests.map((req, idx) => (
//             <div key={req.id} className="bg-white rounded-2xl shadow-lg border border-gray-200/50 p-6">
//               <div className="flex items-start justify-between mb-4">
//                 <div className="flex items-center gap-3">
//                   <div className={`w-12 h-12 ${req.avatarColor} rounded-xl flex items-center justify-center`}>
//                     <span className="text-white text-lg font-bold">{req.employee.split(' ').map(n => n[0]).join('')}</span>
//                   </div>
//                   <div>
//                     <h3 className="font-bold text-gray-900">{req.employee}</h3>
//                     <div className="flex items-center gap-2 mt-1">
//                       <span className="text-sm text-gray-500">{req.code}</span>
//                       <span className="text-xs text-gray-400">•</span>
//                       <span className="text-sm text-gray-500">{req.department}</span>
//                     </div>
//                   </div>
//                 </div>
//                 <button className="p-2 hover:bg-gray-100 rounded-xl">
//                   <MoreVertical className="h-5 w-5 text-gray-600" />
//                 </button>
//               </div>
              
//               <div className="space-y-4 mb-6">
//                 <div className="flex items-center justify-between">
//                   <span className="text-sm text-gray-500">Leave Type</span>
//                   <span className="font-medium text-gray-900">{req.type}</span>
//                 </div>
//                 <div className="flex items-center justify-between">
//                   <span className="text-sm text-gray-500">Duration</span>
//                   <span className="inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium bg-blue-100 text-blue-700">
//                     <Clock className="h-4 w-4 mr-1" /> {req.days} days
//                   </span>
//                 </div>
//                 <div className="flex items-center justify-between">
//                   <span className="text-sm text-gray-500">Date</span>
//                   <span className="font-medium text-gray-900">{req.start}</span>
//                 </div>
//                 <div className="flex items-center justify-between">
//                   <span className="text-sm text-gray-500">Status</span>
//                   <span className={`inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium ${req.statusColor}`}>
//                     {req.status}
//                   </span>
//                 </div>
//               </div>
              
//               <div className="flex items-center justify-between pt-4 border-t border-gray-200">
//                 <button
//                   onClick={() => openDetails(req, idx)}
//                   className="text-sm font-medium text-gray-600 hover:text-gray-900 flex items-center"
//                 >
//                   <Eye className="h-4 w-4 mr-1" /> View Details
//                 </button>
                
//                 <div className="flex items-center gap-2">
//                   {req.confirmButtons.includes('Approve') && (
//                     <button className="px-3 py-1.5 bg-green-100 text-green-700 rounded-lg text-sm font-medium hover:bg-green-200 flex items-center gap-1">
//                       <Check className="h-3 w-3" />
//                     </button>
//                   )}
//                   {req.confirmButtons.includes('Reject') && (
//                     <button className="px-3 py-1.5 bg-red-100 text-red-700 rounded-lg text-sm font-medium hover:bg-red-200 flex items-center gap-1">
//                       <XCircle className="h-3 w-3" />
//                     </button>
//                   )}
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* GIVE BALANCE CODE MODAL */}
//       {showGiveBalanceModal && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm">
//           <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full p-6 relative">
//             <button
//               onClick={() => setShowGiveBalanceModal(false)}
//               className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-xl"
//             >
//               <X className="h-5 w-5 text-gray-500" />
//             </button>

//             <div className="flex items-center gap-3 mb-6">
//               <div className={`p-2 ${getLightBg()} rounded-xl`}>
//                 <Gift className={`h-6 w-6 ${getTextAccent()}`} />
//               </div>
//               <div>
//                 <h2 className="text-xl font-bold text-gray-900">Give Leave Balance</h2>
//                 <p className="text-gray-600 text-sm mt-1">Issue a leave balance code to an employee</p>
//               </div>
//             </div>

//             <div className="space-y-4">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Employee <span className="text-red-600">*</span>
//                   </label>
//                   <select
//                     name="employee"
//                     value={balanceForm.employee}
//                     onChange={handleBalanceFormChange}
//                     className={`w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 ${getRingColor()} focus:border-transparent`}
//                   >
//                     <option value="">Select Employee</option>
//                     <option value="PEP00">Dev Prakash (PEP00) - Engineering</option>
//                     <option value="PEP15">Liam Bennett (PEP15) - Sales</option>
//                   </select>
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Leave Type <span className="text-red-600">*</span>
//                   </label>
//                   <select
//                     name="leaveType"
//                     value={balanceForm.leaveType}
//                     onChange={handleBalanceFormChange}
//                     className={`w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 ${getRingColor()} focus:border-transparent`}
//                   >
//                     <option value="">Select Leave Type</option>
//                     <option value="Annual Leave">Annual Leave</option>
//                     <option value="Sick Leave">Sick Leave</option>
//                     <option value="Maternity Leave">Maternity Leave</option>
//                     <option value="Casual Leave">Casual Leave</option>
//                     <option value="Emergency Leave">Emergency Leave</option>
//                   </select>
//                 </div>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Number of Days <span className="text-red-600">*</span>
//                   </label>
//                   <input
//                     type="number"
//                     name="days"
//                     value={balanceForm.days}
//                     onChange={handleBalanceFormChange}
//                     placeholder="Enter number of days"
//                     className={`w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 ${getRingColor()} focus:border-transparent`}
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Balance Code (Auto-generated)
//                   </label>
//                   <input
//                     type="text"
//                     readOnly
//                     value="Will be generated upon submission"
//                     className={`w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-sm focus:outline-none focus:ring-2 ${getRingColor()} focus:border-transparent`}
//                   />
//                 </div>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Valid From <span className="text-red-600">*</span>
//                   </label>
//                   <div className="relative">
//                     <input
//                       type="date"
//                       name="validFrom"
//                       value={balanceForm.validFrom}
//                       onChange={handleBalanceFormChange}
//                       className={`w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 ${getRingColor()} focus:border-transparent`}
//                     />
//                     <Calendar className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
//                   </div>
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Valid Until <span className="text-red-600">*</span>
//                   </label>
//                   <div className="relative">
//                     <input
//                       type="date"
//                       name="validUntil"
//                       value={balanceForm.validUntil}
//                       onChange={handleBalanceFormChange}
//                       className={`w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 ${getRingColor()} focus:border-transparent`}
//                     />
//                     <CalendarDays className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
//                   </div>
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Notes (Optional)
//                 </label>
//                 <textarea
//                   name="notes"
//                   value={balanceForm.notes}
//                   onChange={handleBalanceFormChange}
//                   rows="3"
//                   placeholder="Add any additional notes or instructions..."
//                   className={`w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 ${getRingColor()} focus:border-transparent`}
//                 />
//               </div>

//               <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mt-4">
//                 <div className="flex items-start gap-3">
//                   <Info className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
//                   <div className="text-sm text-blue-800">
//                     <p className="font-medium">Important Information</p>
//                     <ul className="list-disc pl-5 mt-1 space-y-1">
//                       <li>Balance codes are unique and can only be used once</li>
//                       <li>Codes expire on the specified date</li>
//                       <li>Employees will receive an email notification</li>
//                       <li>Balance can be viewed in the employee's portal</li>
//                     </ul>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="flex items-center justify-end gap-3 mt-8 pt-6 border-t border-gray-200">
//               <button
//                 onClick={() => setShowGiveBalanceModal(false)}
//                 className="px-4 py-2 border border-gray-300 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-50"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleGiveBalance}
//                 className={`px-6 py-2.5 ${getButtonGradient()} ${getButtonHover()} text-white text-sm font-medium rounded-xl flex items-center gap-2`}
//               >
//                 <Gift className="h-4 w-4" /> Issue Balance Code
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* CREATE MODAL */}
//       {showCreateModal && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm">
//           <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full p-6 relative">
//             <button
//               onClick={() => setShowCreateModal(false)}
//               className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-xl"
//             >
//               <X className="h-5 w-5 text-gray-500" />
//             </button>

//             <h2 className="text-xl font-bold text-gray-900 mb-6">Create Leave Request</h2>

//             <div className="space-y-4">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Employee <span className="text-red-600">*</span>
//                   </label>
//                   <select className={`w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 ${getRingColor()} focus:border-transparent`}>
//                     <option>Dev Prakash (PEP00)</option>
//                   </select>
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Leave Type <span className="text-red-600">*</span>
//                   </label>
//                   <select className={`w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 ${getRingColor()} focus:border-transparent`}>
//                     <option>-- Choose Leave Type --</option>
//                   </select>
//                 </div>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Start Date <span className="text-red-600">*</span>
//                   </label>
//                   <div className="relative">
//                     <input
//                       type="text"
//                       value="13 / 11 / 2025"
//                       readOnly
//                       className={`w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 ${getRingColor()} focus:border-transparent`}
//                     />
//                     <Calendar className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
//                   </div>
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Start Date Breakdown <span className="text-red-600">*</span>
//                   </label>
//                   <select className={`w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 ${getRingColor()} focus:border-transparent`}>
//                     <option>Full Day</option>
//                   </select>
//                 </div>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
//                   <div className="relative">
//                     <input
//                       type="text"
//                       value="13 / 11 / 2025"
//                       readOnly
//                       className={`w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 ${getRingColor()} focus:border-transparent`}
//                     />
//                     <Calendar className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
//                   </div>
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     End Date Breakdown <span className="text-red-600">*</span>
//                   </label>
//                   <select className={`w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 ${getRingColor()} focus:border-transparent`}>
//                     <option>Full Day</option>
//                   </select>
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Description <span className="text-red-600">*</span>
//                 </label>
//                 <textarea
//                   rows="3"
//                   placeholder="Enter reason for leave..."
//                   className={`w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 ${getRingColor()} focus:border-transparent`}
//                 />
//               </div>

//               <div className="flex items-center gap-2">
//                 <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 flex items-center gap-2">
//                   <Paperclip className="h-4 w-4" /> Attach Document
//                 </button>
//                 <span className="text-xs text-gray-500">Supporting documents (optional)</span>
//               </div>
//             </div>

//             <div className="flex items-center justify-end gap-3 mt-8 pt-6 border-t border-gray-200">
//               <button
//                 onClick={() => setShowCreateModal(false)}
//                 className="px-4 py-2 border border-gray-300 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-50"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={() => setShowCreateModal(false)}
//                 className={`px-6 py-2.5 ${getButtonGradient()} ${getButtonHover()} text-white text-sm font-medium rounded-xl flex items-center gap-2`}
//               >
//                 <Check className="h-4 w-4" /> Submit Request
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* DETAILS MODAL (Keep existing details modal code as is) */}
//       {/* ... existing details modal code ... */}
//     </div>
//   );
// }

'use client';





// import React, { useState, useEffect, useMemo } from 'react';
// import {
//   Search,
//   Filter,
//   Grid3X3,
//   MoreVertical,
//   Plus,
//   X,
//   Calendar,
//   Paperclip,
//   ChevronLeft,
//   ChevronRight,
//   Check,
//   XCircle,
//   AlertCircle,
//   Info,
//   User,
//   Download,
//   Settings,
//   Bell,
//   Users,
//   Clock,
//   TrendingUp,
//   TrendingDown,
//   ArrowRight,
//   Eye,
//   Edit2,
//   Trash2,
//   RefreshCw,
//   BarChart3,
//   PieChart as PieChartIcon,
//   LineChart as LineChartIcon,
//   Gift,
//   CreditCard,
//   CalendarDays,
//   FileText
// } from 'lucide-react';
// import { useTheme } from './ThemeContext';

// const STORAGE_KEY = 'leaveRequests';

// // Initial seed data for admin view (also persisted in localStorage the first time)
// const initialRequests = [
//   {
//     id: 1,
//     employee: 'Dev Prakash',
//     code: 'PEP00',
//     department: 'Engineering',
//     type: 'Marriage Leave',
//     start: '26 November, 2025',
//     end: '26 November, 2025',
//     days: 1.0,
//     status: 'Requested',
//     statusColor: 'bg-yellow-100 text-yellow-800',
//     avatarColor: 'bg-gradient-to-br from-blue-500 to-blue-600',
//     confirmButtons: ['Approve', 'Reject'],
//     description: 'Marriage ceremony leave request',
//   },
//   {
//     id: 2,
//     employee: 'Dev Prakash',
//     code: 'PEP00',
//     department: 'Engineering',
//     type: 'Maternity Leave',
//     start: '15 November, 2025',
//     end: '15 November, 2025',
//     days: 1.0,
//     status: 'Approved',
//     statusColor: 'bg-green-100 text-green-800',
//     avatarColor: 'bg-gradient-to-br from-blue-500 to-blue-600',
//     confirmButtons: ['Approve', 'Reject'],
//     description: 'Maternity leave approval',
//   },
//   {
//     id: 3,
//     employee: 'Dev Prakash',
//     code: 'PEP00',
//     department: 'Engineering',
//     type: 'Maternity Leave',
//     start: '12 November, 2025',
//     end: '12 November, 2025',
//     days: 1.0,
//     status: 'Approved',
//     statusColor: 'bg-green-100 text-green-800',
//     avatarColor: 'bg-gradient-to-br from-blue-500 to-blue-600',
//     confirmButtons: ['Approve', 'Reject'],
//     hasWarning: true,
//     description: 'Maternity leave with documentation pending',
//   },
//   {
//     id: 4,
//     employee: 'Dev Prakash',
//     code: 'PEP00',
//     department: 'Engineering',
//     type: 'Sick Leave',
//     start: '26 December, 2025',
//     end: '26 December, 2025',
//     days: 1.0,
//     status: 'Cancelled',
//     statusColor: 'bg-gray-100 text-gray-800',
//     avatarColor: 'bg-gradient-to-br from-blue-500 to-blue-600',
//     confirmButtons: ['Requested'],
//     description: 'Sick leave cancelled by employee',
//   },
//   {
//     id: 5,
//     employee: 'Dev Prakash',
//     code: 'PEP00',
//     department: 'Engineering',
//     type: 'Sick Leave',
//     start: '30 December, 2025',
//     end: '30 December, 2025',
//     days: 1.0,
//     status: 'Requested',
//     statusColor: 'bg-yellow-100 text-yellow-800',
//     avatarColor: 'bg-gradient-to-br from-blue-500 to-blue-600',
//     confirmButtons: ['Approve', 'Reject'],
//     description: 'Medical appointment leave request',
//   },
//   {
//     id: 6,
//     employee: 'Dev Prakash',
//     code: 'PEP00',
//     department: 'Engineering',
//     type: 'Sick Leave',
//     start: '30 November, 2025',
//     end: '30 November, 2025',
//     days: 0.0,
//     status: 'Requested',
//     statusColor: 'bg-yellow-100 text-yellow-800',
//     avatarColor: 'bg-gradient-to-br from-blue-500 to-blue-600',
//     confirmButtons: ['Approve', 'Reject'],
//     description: 'Half day sick leave',
//   },
//   {
//     id: 7,
//     employee: 'Liam Bennett',
//     code: 'PEP15',
//     department: 'Sales',
//     type: 'Casual Leave',
//     start: '07 November, 2025',
//     end: '07 November, 2025',
//     days: 1.0,
//     status: 'Requested',
//     statusColor: 'bg-yellow-100 text-yellow-800',
//     avatarColor: 'bg-gradient-to-br from-green-500 to-green-600',
//     confirmButtons: ['Approve', 'Reject'],
//     description: 'Personal casual leave request',
//   },
//   {
//     id: 8,
//     employee: 'Dev Prakash',
//     code: 'PEP00',
//     department: 'Engineering',
//     type: 'Maternity Leave',
//     start: '25 November, 2025',
//     end: '25 November, 2025',
//     days: 1.0,
//     status: 'Requested',
//     statusColor: 'bg-yellow-100 text-yellow-800',
//     avatarColor: 'bg-gradient-to-br from-blue-500 to-blue-600',
//     confirmButtons: ['Approve', 'Reject'],
//     description: 'Maternity leave extension request',
//   },
//   {
//     id: 9,
//     employee: 'Dev Prakash',
//     code: 'PEP00',
//     department: 'Engineering',
//     type: 'Maternity Leave',
//     start: '15 November, 2025',
//     end: '15 November, 2025',
//     days: 1.0,
//     status: 'Rejected',
//     statusColor: 'bg-red-100 text-red-800',
//     avatarColor: 'bg-gradient-to-br from-blue-500 to-blue-600',
//     confirmButtons: ['Approve', 'Reject'],
//     description: 'Maternity leave rejected due to insufficient documentation',
//   },
// ];

// const leaveBalanceCodes = [
//   { id: 'LB-2025-001', type: 'Annual Leave', days: 15, status: 'Active', issuedDate: '2025-01-01', expiresDate: '2025-12-31' },
//   { id: 'LB-2025-002', type: 'Sick Leave', days: 10, status: 'Active', issuedDate: '2025-01-01', expiresDate: '2025-12-31' },
//   { id: 'LB-2025-003', type: 'Maternity Leave', days: 90, status: 'Pending', issuedDate: '2025-11-01', expiresDate: '2026-02-01' },
//   { id: 'LB-2025-004', type: 'Emergency Leave', days: 5, status: 'Used', issuedDate: '2025-06-01', expiresDate: '2025-12-31' },
// ];

// export default function LeaveRequests() {
//   const { theme } = useTheme();

//   // Theme helpers
//   const getTextAccent = () => (theme?.accent ? `text-${theme.accent}` : 'text-orange-600');
//   const getButtonGradient = () =>
//     theme?.button ? `bg-gradient-to-r ${theme.button}` : 'bg-gradient-to-r from-orange-500 to-orange-600';
//   const getButtonHover = () => theme?.buttonHover || 'hover:from-orange-600 hover:to-orange-700';
//   const getLightBg = () => theme?.lightBg || 'bg-orange-50';
//   const getRingColor = () => theme?.ringColor || 'ring-orange-500';

//   const [showCreateModal, setShowCreateModal] = useState(false);
//   const [showGiveBalanceModal, setShowGiveBalanceModal] = useState(false);
//   const [showDetailsModal, setShowDetailsModal] = useState(false);
//   const [selectedRequest, setSelectedRequest] = useState(null);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [selectedAll, setSelectedAll] = useState(false);
//   const [activeFilter, setActiveFilter] = useState('all');
//   const [viewMode, setViewMode] = useState('table');
//   const [page, setPage] = useState(1);
//   const totalPages = 3;

//   const [balanceForm, setBalanceForm] = useState({
//     employee: '',
//     leaveType: '',
//     balanceCode: '',
//     days: '',
//     validFrom: '',
//     validUntil: '',
//     notes: ''
//   });

//   // Load / persist requests in localStorage (shared with dashboard / my-requests)
//   const [requests, setRequests] = useState(() => {
//     try {
//       const saved = localStorage.getItem(STORAGE_KEY);
//       if (saved) return JSON.parse(saved);
//       localStorage.setItem(STORAGE_KEY, JSON.stringify(initialRequests));
//       return initialRequests;
//     } catch {
//       return initialRequests;
//     }
//   });

//   const saveRequests = (next) => {
//     setRequests(next);
//     try {
//       localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
//     } catch {
//       // ignore
//     }
//     window.dispatchEvent(new Event('leaveRequestsUpdated'));
//   };

//   const openDetails = (req, index) => {
//     setSelectedRequest(req);
//     setCurrentIndex(index);
//     setShowDetailsModal(true);
//   };

//   const navigate = (direction) => {
//     const newIndex = direction === 'prev' ? currentIndex - 1 : currentIndex + 1;
//     if (newIndex >= 0 && newIndex < requests.length) {
//       setCurrentIndex(newIndex);
//       setSelectedRequest(requests[newIndex]);
//     }
//   };

//   const handleStatusChange = (id, newStatus) => {
//     const next = requests.map((r) => {
//       if (r.id !== id) return r;

//       const statusLower = newStatus.toLowerCase();
//       let statusColor = r.statusColor;

//       if (statusLower === 'approved') {
//         statusColor = 'bg-green-100 text-green-800';
//       } else if (statusLower === 'rejected') {
//         statusColor = 'bg-red-100 text-red-800';
//       } else if (statusLower === 'requested') {
//         statusColor = 'bg-yellow-100 text-yellow-800';
//       } else if (statusLower === 'cancelled') {
//         statusColor = 'bg-gray-100 text-gray-800';
//       }

//       return { ...r, status: newStatus, statusColor };
//     });

//     saveRequests(next);
//   };

//   const handleBalanceFormChange = (e) => {
//     const { name, value } = e.target;
//     setBalanceForm((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleGiveBalance = () => {
//     const balanceCode = `LB-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
//     console.log('Giving balance:', { ...balanceForm, balanceCode });

//     setBalanceForm({
//       employee: '',
//       leaveType: '',
//       balanceCode: '',
//       days: '',
//       validFrom: '',
//       validUntil: '',
//       notes: ''
//     });
//     setShowGiveBalanceModal(false);
//     alert(`Balance code ${balanceCode} has been issued successfully!`);
//   };

//   const summaryData = useMemo(() => {
//     const counts = { requested: 0, approved: 0, rejected: 0, cancelled: 0 };

//     requests.forEach((r) => {
//       const s = String(r.status || '').toLowerCase();
//       if (s === 'requested') counts.requested += 1;
//       else if (s === 'approved') counts.approved += 1;
//       else if (s === 'rejected') counts.rejected += 1;
//       else if (s === 'cancelled') counts.cancelled += 1;
//     });

//     return {
//       requested: { count: counts.requested, change: '+0', trend: 'up' },
//       approved: { count: counts.approved, change: '+0', trend: 'up' },
//       rejected: { count: counts.rejected, change: '+0', trend: 'neutral' },
//       cancelled: { count: counts.cancelled, change: '+0', trend: 'neutral' },
//     };
//   }, [requests]);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50/50 via-white to-blue-50/30 p-4 lg:p-6">
//       {/* HEADER */}
//       <div className="mb-6 lg:mb-8">
//         <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
//           <div>
//             <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Leave Requests Management</h1>
//             <p className="text-gray-600 mt-1">Review and manage employee leave requests</p>
//           </div>

//           <div className="flex items-center gap-3">
//             <div className="relative">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
//               <input
//                 type="text"
//                 placeholder="Search requests..."
//                 className={`pl-10 pr-4 py-2 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 ${getRingColor()} focus:border-transparent w-full lg:w-64`}
//               />
//             </div>

//             <button className={`p-2 ${getLightBg()} ${getTextAccent()} rounded-xl hover:opacity-90`}>
//               <Filter className="h-5 w-5" />
//             </button>

//             <button className="relative p-2 hover:bg-gray-100 rounded-xl">
//               <Bell className="h-5 w-5 text-gray-600" />
//               <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
//             </button>

//             <button className="hidden lg:flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-xl text-sm hover:bg-gray-50">
//               <Settings className="h-4 w-4" /> Settings
//             </button>
//           </div>
//         </div>

//         {/* Filter Bar */}
//         <div className="flex items-center gap-2 mt-6 overflow-x-auto scrollbar-hide">
//           <div className="flex items-center gap-2 p-1 bg-gray-100 rounded-xl">
//             <button
//               onClick={() => setViewMode('table')}
//               className={`px-3 py-1.5 text-sm rounded-lg flex items-center gap-2 ${
//                 viewMode === 'table' ? 'bg-white shadow-sm' : ''
//               }`}
//             >
//               <BarChart3 className="h-4 w-4" /> Table
//             </button>
//             <button
//               onClick={() => setViewMode('card')}
//               className={`px-3 py-1.5 text-sm rounded-lg flex items-center gap-2 ${
//                 viewMode === 'card' ? 'bg-white shadow-sm' : ''
//               }`}
//             >
//               <Grid3X3 className="h-4 w-4" /> Cards
//             </button>
//           </div>

//           {['all', 'requested', 'approved', 'rejected'].map((filter) => (
//             <button
//               key={filter}
//               onClick={() => setActiveFilter(filter)}
//               className={`px-4 py-2 rounded-xl text-sm font-medium capitalize whitespace-nowrap ${
//                 activeFilter === filter
//                   ? `${getButtonGradient()} ${getButtonHover()} text-white`
//                   : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-300'
//               }`}
//             >
//               {filter}
//             </button>
//           ))}

//           <div className="flex items-center gap-1 border border-gray-300 rounded-xl px-3 py-2 bg-white">
//             <Calendar className="h-4 w-4 text-gray-500" />
//             <span className="text-sm text-gray-700">12 Nov 2025</span>
//           </div>
//         </div>
//       </div>

//       {/* SUMMARY CARDS */}
//       <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6 lg:mb-8">
//         <div className="bg-white rounded-2xl p-5 lg:p-6 shadow-lg border border-gray-200/50 hover:shadow-xl transition-shadow">
//           <div className="flex items-center justify-between mb-4">
//             <div className="p-3 bg-yellow-50 rounded-xl">
//               <AlertCircle className="h-6 w-6 text-yellow-600" />
//             </div>
//             <div className="flex items-center text-sm text-yellow-600 font-medium">
//               <TrendingUp className="h-4 w-4 mr-1" />
//               {summaryData.requested.change}
//             </div>
//           </div>
//           <h3 className="text-sm font-medium text-gray-500 mb-1">Pending Requests</h3>
//           <div className="flex items-baseline gap-2">
//             <p className="text-2xl lg:text-3xl font-bold text-gray-900">{summaryData.requested.count}</p>
//             <span className="text-sm text-gray-500">awaiting</span>
//           </div>
//           <div className="mt-4 pt-4 border-t border-gray-100">
//             <button className="text-sm font-medium text-gray-600 hover:text-gray-900 flex items-center">
//               Review <ArrowRight className="h-4 w-4 ml-1" />
//             </button>
//           </div>
//         </div>

//         <div className="bg-white rounded-2xl p-5 lg:p-6 shadow-lg border border-gray-200/50 hover:shadow-xl transition-shadow">
//           <div className="flex items-center justify-between mb-4">
//             <div className="p-3 bg-green-50 rounded-xl">
//               <Check className="h-6 w-6 text-green-600" />
//             </div>
//             <div className="flex items-center text-sm text-green-600 font-medium">
//               <TrendingUp className="h-4 w-4 mr-1" />
//               {summaryData.approved.change}
//             </div>
//           </div>
//           <h3 className="text-sm font-medium text-gray-500 mb-1">Approved</h3>
//           <div className="flex items-baseline gap-2">
//             <p className="text-2xl lg:text-3xl font-bold text-green-600">{summaryData.approved.count}</p>
//             <span className="text-sm text-gray-500">leaves</span>
//           </div>
//           <div className="mt-4 pt-4 border-t border-gray-100">
//             <div className="flex items-center text-xs text-gray-500">
//               <Clock className="h-3 w-3 mr-1" /> This month
//             </div>
//           </div>
//         </div>

//         <div className="bg-white rounded-2xl p-5 lg:p-6 shadow-lg border border-gray-200/50 hover:shadow-xl transition-shadow">
//           <div className="flex items-center justify-between mb-4">
//             <div className="p-3 bg-red-50 rounded-xl">
//               <XCircle className="h-6 w-6 text-red-600" />
//             </div>
//             <div className="flex items-center text-sm text-red-600 font-medium">
//               {summaryData.rejected.trend === 'up'
//                 ? <TrendingUp className="h-4 w-4 mr-1" />
//                 : summaryData.rejected.trend === 'down'
//                 ? <TrendingDown className="h-4 w-4 mr-1" />
//                 : <span className="text-xs">-</span>
//               }
//               {summaryData.rejected.change}
//             </div>
//           </div>
//           <h3 className="text-sm font-medium text-gray-500 mb-1">Rejected</h3>
//           <div className="flex items-baseline gap-2">
//             <p className="text-2xl lg:text-3xl font-bold text-red-600">{summaryData.rejected.count}</p>
//             <span className="text-sm text-gray-500">leaves</span>
//           </div>
//           <div className="mt-4 pt-4 border-t border-gray-100">
//             <button className="text-sm font-medium text-gray-600 hover:text-gray-900">
//               View reasons
//             </button>
//           </div>
//         </div>

//         <div className="bg-white rounded-2xl p-5 lg:p-6 shadow-lg border border-gray-200/50 hover:shadow-xl transition-shadow">
//           <div className="flex items-center justify-between mb-4">
//             <div className={`p-3 ${getLightBg()} rounded-xl`}>
//               <Gift className={`h-6 w-6 ${getTextAccent()}`} />
//             </div>
//             <button
//               onClick={() => setShowGiveBalanceModal(true)}
//               className={`px-3 py-1.5 ${getButtonGradient()} ${getButtonHover()} text-white text-xs font-medium rounded-lg flex items-center gap-1`}
//             >
//               <Plus className="h-3 w-3" /> Give Balance
//             </button>
//           </div>
//           <h3 className="text-sm font-medium text-gray-500 mb-1">Leave Balance</h3>
//           <div className="flex items-baseline gap-2">
//             <p className="text-2xl lg:text-3xl font-bold text-gray-900">{leaveBalanceCodes.length}</p>
//             <span className="text-sm text-gray-500">active codes</span>
//           </div>
//           <div className="mt-4 pt-4 border-t border-gray-100">
//             <button className="text-sm font-medium text-gray-600 hover:text-gray-900 flex items-center">
//               Manage <ArrowRight className="h-4 w-4 ml-1" />
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* STATUS LEGEND */}
//       <div className="mb-6 bg-white rounded-2xl p-5 shadow-lg border border-gray-200/50">
//         <div className="flex items-center justify-between mb-4">
//           <h3 className="font-medium text-gray-900">Request Status</h3>
//           <span className="text-sm text-gray-500">{requests.length} total requests</span>
//         </div>
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//           <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-xl">
//             <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
//             <div>
//               <p className="text-sm font-medium text-gray-900">Requested</p>
//               <p className="text-xs text-gray-500">Awaiting approval</p>
//             </div>
//           </div>
//           <div className="flex items-center gap-3 p-3 bg-green-50 rounded-xl">
//             <div className="w-3 h-3 bg-green-500 rounded-full"></div>
//             <div>
//               <p className="text-sm font-medium text-gray-900">Approved</p>
//               <p className="text-xs text-gray-500">Leave granted</p>
//             </div>
//           </div>
//           <div className="flex items-center gap-3 p-3 bg-red-50 rounded-xl">
//             <div className="w-3 h-3 bg-red-500 rounded-full"></div>
//             <div>
//               <p className="text-sm font-medium text-gray-900">Rejected</p>
//               <p className="text-xs text-gray-500">Leave denied</p>
//             </div>
//           </div>
//           <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
//             <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
//             <div>
//               <p className="text-sm font-medium text-gray-900">Cancelled</p>
//               <p className="text-xs text-gray-500">By employee</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* LEAVE BALANCE CODES */}
//       <div className="mb-6 bg-white rounded-2xl shadow-lg border border-gray-200/50 overflow-hidden">
//         <div className={`${getLightBg()} border-b border-gray-200`}>
//           <div className="flex items-center justify-between p-6">
//             <div className="flex items-center gap-3">
//               <div className={`p-2 ${getLightBg()} rounded-xl`}>
//                 <CreditCard className={`h-5 w-5 ${getTextAccent()}`} />
//               </div>
//               <div>
//                 <h3 className="text-lg font-bold text-gray-900">Leave Balance Codes</h3>
//                 <p className="text-sm text-gray-500 mt-1">Manage and distribute leave balance codes to employees</p>
//               </div>
//             </div>

//             <div className="flex items-center gap-3">
//               <button className="p-2 hover:bg-gray-100 rounded-xl">
//                 <Download className="h-5 w-5 text-gray-600" />
//               </button>
//               <button
//                 onClick={() => setShowGiveBalanceModal(true)}
//                 className={`px-4 py-2 ${getButtonGradient()} ${getButtonHover()} text-white text-sm font-medium rounded-xl flex items-center gap-2`}
//               >
//                 <Gift className="h-4 w-4" /> Give Balance Code
//               </button>
//             </div>
//           </div>
//         </div>

//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead className="border-b border-gray-200">
//               <tr>
//                 <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Balance Code</th>
//                 <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Leave Type</th>
//                 <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Days</th>
//                 <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Issued Date</th>
//                 <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Expires Date</th>
//                 <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
//                 <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-200">
//               {leaveBalanceCodes.map((code) => (
//                 <tr key={code.id} className="hover:bg-gray-50/50 transition-colors">
//                   <td className="px-6 py-4">
//                     <div className="flex items-center gap-2">
//                       <CreditCard className="h-4 w-4 text-gray-400" />
//                       <span className="font-medium text-gray-900">{code.id}</span>
//                     </div>
//                   </td>
//                   <td className="px-6 py-4 text-sm font-medium text-gray-900">{code.type}</td>
//                   <td className="px-6 py-4">
//                     <span className="inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium bg-blue-100 text-blue-700">
//                       {code.days} days
//                     </span>
//                   </td>
//                   <td className="px-6 py-4 text-sm text-gray-700">{code.issuedDate}</td>
//                   <td className="px-6 py-4 text-sm text-gray-700">{code.expiresDate}</td>
//                   <td className="px-6 py-4">
//                     <span
//                       className={`inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium ${
//                         code.status === 'Active'
//                           ? 'bg-green-100 text-green-800'
//                           : code.status === 'Pending'
//                           ? 'bg-yellow-100 text-yellow-800'
//                           : 'bg-gray-100 text-gray-800'
//                       }`}
//                     >
//                       {code.status}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4">
//                     <div className="flex items-center gap-2">
//                       <button className="p-1.5 hover:bg-gray-100 rounded-lg">
//                         <Eye className="h-4 w-4 text-gray-600" />
//                       </button>
//                       <button className="p-1.5 hover:bg-gray-100 rounded-lg">
//                         <Edit2 className="h-4 w-4 text-gray-600" />
//                       </button>
//                       <button className="p-1.5 hover:bg-gray-100 rounded-lg">
//                         <Trash2 className="h-4 w-4 text-gray-600" />
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* TABLE VIEW */}
//       {viewMode === 'table' && (
//         <div className="bg-white rounded-2xl shadow-lg border border-gray-200/50 overflow-hidden">
//           <div className={`${getLightBg()} border-b border-gray-200`}>
//             <div className="flex items-center justify-between p-6">
//               <div>
//                 <h3 className="text-lg font-bold text-gray-900">Leave Requests</h3>
//                 <p className="text-sm text-gray-500 mt-1">{requests.length} requests found</p>
//               </div>

//               <div className="flex items-center gap-3">
//                 <button className="p-2 hover:bg-gray-100 rounded-xl">
//                   <Download className="h-5 w-5 text-gray-600" />
//                 </button>
//                 <button className="p-2 hover:bg-gray-100 rounded-xl">
//                   <MoreVertical className="h-5 w-5 text-gray-600" />
//                 </button>
//                 <button
//                   onClick={() => setShowCreateModal(true)}
//                   className={`px-4 py-2 ${getButtonGradient()} ${getButtonHover()} text-white text-sm font-medium rounded-xl flex items-center gap-2`}
//                 >
//                   <Plus className="h-4 w-4" /> Create Request
//                 </button>
//               </div>
//             </div>
//           </div>

//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead className="border-b border-gray-200">
//                 <tr>
//                   <th className="px-6 py-4 text-left">
//                     <input
//                       type="checkbox"
//                       checked={selectedAll}
//                       onChange={(e) => setSelectedAll(e.target.checked)}
//                       className={`rounded border-gray-300 ${getTextAccent()} focus:${getRingColor()}`}
//                     />
//                   </th>
//                   <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Employee</th>
//                   <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Leave Type</th>
//                   <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Start Date</th>
//                   <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">End Date</th>
//                   <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Days</th>
//                   <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
//                   <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-200">
//                 {requests.map((req, idx) => (
//                   <tr key={req.id} className="hover:bg-gray-50/50 transition-colors">
//                     <td className="px-6 py-4">
//                       <input
//                         type="checkbox"
//                         checked={selectedAll}
//                         onChange={(e) => setSelectedAll(e.target.checked)}
//                         className={`rounded border-gray-300 ${getTextAccent()} focus:${getRingColor()}`}
//                       />
//                     </td>
//                     <td className="px-6 py-4">
//                       <button
//                         onClick={() => openDetails(req, idx)}
//                         className="flex items-center gap-3 hover:opacity-80 transition-opacity"
//                       >
//                         <div className={`w-10 h-10 ${req.avatarColor} rounded-xl flex items-center justify-center`}>
//                           <span className="text-white font-medium">
//                             {req.employee.split(' ').map((n) => n[0]).join('')}
//                           </span>
//                         </div>
//                         <div className="text-left">
//                           <p className="font-medium text-gray-900">{req.employee}</p>
//                           <div className="flex items-center gap-2">
//                             <span className="text-xs text-gray-500">{req.code}</span>
//                             <span className="text-xs text-gray-400">•</span>
//                             <span className="text-xs text-gray-500">{req.department}</span>
//                             {req.hasWarning && <AlertCircle className="h-3 w-3 text-orange-500" />}
//                           </div>
//                         </div>
//                       </button>
//                     </td>
//                     <td className="px-6 py-4 text-sm font-medium text-gray-900">{req.type}</td>
//                     <td className="px-6 py-4 text-sm text-gray-700">{req.start}</td>
//                     <td className="px-6 py-4 text-sm text-gray-700">{req.end}</td>
//                     <td className="px-6 py-4">
//                       <span className="inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium bg-blue-100 text-blue-700">
//                         <Clock className="h-4 w-4 mr-1" /> {req.days} days
//                       </span>
//                     </td>
//                     <td className="px-6 py-4">
//                       <span className={`inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium ${req.statusColor}`}>
//                         {req.status}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4">
//                       <div className="flex items-center gap-2">
//                         {Array.isArray(req.confirmButtons) && req.confirmButtons.includes('Approve') && (
//                           <button
//                             onClick={() => handleStatusChange(req.id, 'Approved')}
//                             className="px-3 py-1.5 bg-green-100 text-green-700 rounded-lg text-sm font-medium hover:bg-green-200 flex items-center gap-1"
//                           >
//                             <Check className="h-4 w-4" /> Approve
//                           </button>
//                         )}
//                         {Array.isArray(req.confirmButtons) && req.confirmButtons.includes('Reject') && (
//                           <button
//                             onClick={() => handleStatusChange(req.id, 'Rejected')}
//                             className="px-3 py-1.5 bg-red-100 text-red-700 rounded-lg text-sm font-medium hover:bg-red-200 flex items-center gap-1"
//                           >
//                             <XCircle className="h-4 w-4" /> Reject
//                           </button>
//                         )}
//                         {Array.isArray(req.confirmButtons) && req.confirmButtons.includes('Requested') && (
//                           <button className="px-3 py-1.5 bg-yellow-100 text-yellow-700 rounded-lg text-sm font-medium">
//                             Requested
//                           </button>
//                         )}
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           {/* Pagination (static pages demo) */}
//           <div className="border-t border-gray-200 px-6 py-4">
//             <div className="flex items-center justify-between">
//               <div className="text-sm text-gray-600">
//                 Showing <span className="font-medium">{requests.length}</span> of{' '}
//                 <span className="font-medium">{requests.length}</span> requests
//               </div>

//               <div className="flex items-center gap-4">
//                 <div className="flex items-center gap-2">
//                   <button
//                     onClick={() => setPage(Math.max(1, page - 1))}
//                     disabled={page === 1}
//                     className="p-2 hover:bg-gray-100 rounded-xl disabled:opacity-50"
//                   >
//                     <ChevronLeft className="h-4 w-4" />
//                   </button>

//                   <div className="flex items-center gap-2">
//                     {[1, 2, 3].map((p) => (
//                       <button
//                         key={p}
//                         onClick={() => setPage(p)}
//                         className={`w-10 h-10 rounded-lg font-medium ${
//                           page === p
//                             ? `${getButtonGradient()} text-white`
//                             : 'text-gray-600 hover:bg-gray-100'
//                         }`}
//                       >
//                         {p}
//                       </button>
//                     ))}
//                   </div>

//                   <button
//                     onClick={() => setPage(Math.min(totalPages, page + 1))}
//                     disabled={page === totalPages}
//                     className="p-2 hover:bg-gray-100 rounded-xl disabled:opacity-50"
//                   >
//                     <ChevronRight className="h-4 w-4" />
//                   </button>
//                 </div>

//                 <div className="text-sm text-gray-600">
//                   Page <span className="font-medium">{page}</span> of{' '}
//                   <span className="font-medium">{totalPages}</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* CARD VIEW */}
//       {viewMode === 'card' && (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {requests.map((req, idx) => (
//             <div key={req.id} className="bg-white rounded-2xl shadow-lg border border-gray-200/50 p-6">
//               <div className="flex items-start justify-between mb-4">
//                 <div className="flex items-center gap-3">
//                   <div className={`w-12 h-12 ${req.avatarColor} rounded-xl flex items-center justify-center`}>
//                     <span className="text-white text-lg font-bold">
//                       {req.employee.split(' ').map((n) => n[0]).join('')}
//                     </span>
//                   </div>
//                   <div>
//                     <h3 className="font-bold text-gray-900">{req.employee}</h3>
//                     <div className="flex items-center gap-2 mt-1">
//                       <span className="text-sm text-gray-500">{req.code}</span>
//                       <span className="text-xs text-gray-400">•</span>
//                       <span className="text-sm text-gray-500">{req.department}</span>
//                     </div>
//                   </div>
//                 </div>
//                 <button className="p-2 hover:bg-gray-100 rounded-xl">
//                   <MoreVertical className="h-5 w-5 text-gray-600" />
//                 </button>
//               </div>

//               <div className="space-y-4 mb-6">
//                 <div className="flex items-center justify-between">
//                   <span className="text-sm text-gray-500">Leave Type</span>
//                   <span className="font-medium text-gray-900">{req.type}</span>
//                 </div>
//                 <div className="flex items-center justify-between">
//                   <span className="text-sm text-gray-500">Duration</span>
//                   <span className="inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium bg-blue-100 text-blue-700">
//                     <Clock className="h-4 w-4 mr-1" /> {req.days} days
//                   </span>
//                 </div>
//                 <div className="flex items-center justify-between">
//                   <span className="text-sm text-gray-500">Date</span>
//                   <span className="font-medium text-gray-900">{req.start}</span>
//                 </div>
//                 <div className="flex items-center justify-between">
//                   <span className="text-sm text-gray-500">Status</span>
//                   <span className={`inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium ${req.statusColor}`}>
//                     {req.status}
//                   </span>
//                 </div>
//               </div>

//               <div className="flex items-center justify-between pt-4 border-t border-gray-200">
//                 <button
//                   onClick={() => openDetails(req, idx)}
//                   className="text-sm font-medium text-gray-600 hover:text-gray-900 flex items-center"
//                 >
//                   <Eye className="h-4 w-4 mr-1" /> View Details
//                 </button>

//                 <div className="flex items-center gap-2">
//                   {req.confirmButtons.includes('Approve') && (
//                     <button className="px-3 py-1.5 bg-green-100 text-green-700 rounded-lg text-sm font-medium hover:bg-green-200 flex items-center gap-1">
//                       <Check className="h-3 w-3" />
//                     </button>
//                   )}
//                   {req.confirmButtons.includes('Reject') && (
//                     <button className="px-3 py-1.5 bg-red-100 text-red-700 rounded-lg text-sm font-medium hover:bg-red-200 flex items-center gap-1">
//                       <XCircle className="h-3 w-3" />
//                     </button>
//                   )}
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* GIVE BALANCE CODE MODAL */}
//       {showGiveBalanceModal && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm">
//           <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full p-6 relative">
//             <button
//               onClick={() => setShowGiveBalanceModal(false)}
//               className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-xl"
//             >
//               <X className="h-5 w-5 text-gray-500" />
//             </button>

//             <div className="flex items-center gap-3 mb-6">
//               <div className={`p-2 ${getLightBg()} rounded-xl`}>
//                 <Gift className={`h-6 w-6 ${getTextAccent()}`} />
//               </div>
//               <div>
//                 <h2 className="text-xl font-bold text-gray-900">Give Leave Balance</h2>
//                 <p className="text-gray-600 text-sm mt-1">Issue a leave balance code to an employee</p>
//               </div>
//             </div>

//             <div className="space-y-4">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Employee <span className="text-red-600">*</span>
//                   </label>
//                   <select
//                     name="employee"
//                     value={balanceForm.employee}
//                     onChange={handleBalanceFormChange}
//                     className={`w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 ${getRingColor()} focus:border-transparent`}
//                   >
//                     <option value="">Select Employee</option>
//                     <option value="PEP00">Dev Prakash (PEP00) - Engineering</option>
//                     <option value="PEP15">Liam Bennett (PEP15) - Sales</option>
//                   </select>
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Leave Type <span className="text-red-600">*</span>
//                   </label>
//                   <select
//                     name="leaveType"
//                     value={balanceForm.leaveType}
//                     onChange={handleBalanceFormChange}
//                     className={`w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 ${getRingColor()} focus:border-transparent`}
//                   >
//                     <option value="">Select Leave Type</option>
//                     <option value="Annual Leave">Annual Leave</option>
//                     <option value="Sick Leave">Sick Leave</option>
//                     <option value="Maternity Leave">Maternity Leave</option>
//                     <option value="Casual Leave">Casual Leave</option>
//                     <option value="Emergency Leave">Emergency Leave</option>
//                   </select>
//                 </div>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Number of Days <span className="text-red-600">*</span>
//                   </label>
//                   <input
//                     type="number"
//                     name="days"
//                     value={balanceForm.days}
//                     onChange={handleBalanceFormChange}
//                     placeholder="Enter number of days"
//                     className={`w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 ${getRingColor()} focus:border-transparent`}
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Balance Code (Auto-generated)
//                   </label>
//                   <input
//                     type="text"
//                     readOnly
//                     value="Will be generated upon submission"
//                     className={`w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-sm focus:outline-none focus:ring-2 ${getRingColor()} focus:border-transparent`}
//                   />
//                 </div>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Valid From <span className="text-red-600">*</span>
//                   </label>
//                   <div className="relative">
//                     <input
//                       type="date"
//                       name="validFrom"
//                       value={balanceForm.validFrom}
//                       onChange={handleBalanceFormChange}
//                       className={`w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 ${getRingColor()} focus:border-transparent`}
//                     />
//                     <Calendar className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
//                   </div>
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Valid Until <span className="text-red-600">*</span>
//                   </label>
//                   <div className="relative">
//                     <input
//                       type="date"
//                       name="validUntil"
//                       value={balanceForm.validUntil}
//                       onChange={handleBalanceFormChange}
//                       className={`w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 ${getRingColor()} focus:border-transparent`}
//                     />
//                     <CalendarDays className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
//                   </div>
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Notes (Optional)
//                 </label>
//                 <textarea
//                   name="notes"
//                   value={balanceForm.notes}
//                   onChange={handleBalanceFormChange}
//                   rows="3"
//                   placeholder="Add any additional notes or instructions..."
//                   className={`w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 ${getRingColor()} focus:border-transparent`}
//                 />
//               </div>

//               <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mt-4">
//                 <div className="flex items-start gap-3">
//                   <Info className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
//                   <div className="text-sm text-blue-800">
//                     <p className="font-medium">Important Information</p>
//                     <ul className="list-disc pl-5 mt-1 space-y-1">
//                       <li>Balance codes are unique and can only be used once</li>
//                       <li>Codes expire on the specified date</li>
//                       <li>Employees will receive an email notification</li>
//                       <li>Balance can be viewed in the employee's portal</li>
//                     </ul>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="flex items-center justify-end gap-3 mt-8 pt-6 border-t border-gray-200">
//               <button
//                 onClick={() => setShowGiveBalanceModal(false)}
//                 className="px-4 py-2 border border-gray-300 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-50"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleGiveBalance}
//                 className={`px-6 py-2.5 ${getButtonGradient()} ${getButtonHover()} text-white text-sm font-medium rounded-xl flex items-center gap-2`}
//               >
//                 <Gift className="h-4 w-4" /> Issue Balance Code
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* CREATE REQUEST MODAL */}
//       {showCreateModal && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm">
//           <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full p-6 relative">
//             <button
//               onClick={() => setShowCreateModal(false)}
//               className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-xl"
//             >
//               <X className="h-5 w-5 text-gray-500" />
//             </button>

//             <h2 className="text-xl font-bold text-gray-900 mb-6">Create Leave Request</h2>

//             <div className="space-y-4">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Employee <span className="text-red-600">*</span>
//                   </label>
//                   <select
//                     className={`w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 ${getRingColor()} focus:border-transparent`}
//                   >
//                     <option>Dev Prakash (PEP00)</option>
//                   </select>
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Leave Type <span className="text-red-600">*</span>
//                   </label>
//                   <select
//                     className={`w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 ${getRingColor()} focus:border-transparent`}
//                   >
//                     <option>-- Choose Leave Type --</option>
//                   </select>
//                 </div>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Start Date <span className="text-red-600">*</span>
//                   </label>
//                   <div className="relative">
//                     <input
//                       type="text"
//                       value="13 / 11 / 2025"
//                       readOnly
//                       className={`w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 ${getRingColor()} focus:border-transparent`}
//                     />
//                     <Calendar className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
//                   </div>
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Start Date Breakdown <span className="text-red-600">*</span>
//                   </label>
//                   <select
//                     className={`w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 ${getRingColor()} focus:border-transparent`}
//                   >
//                     <option>Full Day</option>
//                   </select>
//                 </div>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
//                   <div className="relative">
//                     <input
//                       type="text"
//                       value="13 / 11 / 2025"
//                       readOnly
//                       className={`w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 ${getRingColor()} focus:border-transparent`}
//                     />
//                     <Calendar className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
//                   </div>
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     End Date Breakdown <span className="text-red-600">*</span>
//                   </label>
//                   <select
//                     className={`w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 ${getRingColor()} focus:border-transparent`}
//                   >
//                     <option>Full Day</option>
//                   </select>
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Description <span className="text-red-600">*</span>
//                 </label>
//                 <textarea
//                   rows="3"
//                   placeholder="Enter reason for leave..."
//                   className={`w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 ${getRingColor()} focus:border-transparent`}
//                 />
//               </div>

//               <div className="flex items-center gap-2">
//                 <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 flex items-center gap-2">
//                   <Paperclip className="h-4 w-4" /> Attach Document
//                 </button>
//                 <span className="text-xs text-gray-500">Supporting documents (optional)</span>
//               </div>
//             </div>

//             <div className="flex items-center justify-end gap-3 mt-8 pt-6 border-t border-gray-200">
//               <button
//                 onClick={() => setShowCreateModal(false)}
//                 className="px-4 py-2 border border-gray-300 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-50"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={() => setShowCreateModal(false)}
//                 className={`px-6 py-2.5 ${getButtonGradient()} ${getButtonHover()} text-white text-sm font-medium rounded-xl flex items-center gap-2`}
//               >
//                 <Check className="h-4 w-4" /> Submit Request
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* DETAILS MODAL (optional – you can plug your existing details UI here) */}
//       {showDetailsModal && selectedRequest && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm">
//           <div className="bg-white rounded-2xl shadow-xl max-w-xl w-full p-6 relative">
//             <button
//               onClick={() => setShowDetailsModal(false)}
//               className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-xl"
//             >
//               <X className="h-5 w-5 text-gray-500" />
//             </button>

//             <h2 className="text-xl font-bold text-gray-900 mb-2">Leave Request Details</h2>
//             <p className="text-sm text-gray-500 mb-4">{selectedRequest.description}</p>

//             <div className="space-y-2 text-sm text-gray-700">
//               <p><span className="font-semibold">Employee:</span> {selectedRequest.employee} ({selectedRequest.code})</p>
//               <p><span className="font-semibold">Department:</span> {selectedRequest.department}</p>
//               <p><span className="font-semibold">Type:</span> {selectedRequest.type}</p>
//               <p><span className="font-semibold">Dates:</span> {selectedRequest.start} - {selectedRequest.end}</p>
//               <p><span className="font-semibold">Days:</span> {selectedRequest.days}</p>
//               <p><span className="font-semibold">Status:</span> {selectedRequest.status}</p>
//             </div>

//             <div className="flex items-center justify-between mt-6">
//               <div className="flex items-center gap-2 text-sm text-gray-500">
//                 <button
//                   onClick={() => navigate('prev')}
//                   disabled={currentIndex === 0}
//                   className="px-2 py-1 border border-gray-300 rounded-lg disabled:opacity-40"
//                 >
//                   <ChevronLeft className="h-4 w-4" />
//                 </button>
//                 <span>
//                   {currentIndex + 1} / {requests.length}
//                 </span>
//                 <button
//                   onClick={() => navigate('next')}
//                   disabled={currentIndex === requests.length - 1}
//                   className="px-2 py-1 border border-gray-300 rounded-lg disabled:opacity-40"
//                 >
//                   <ChevronRight className="h-4 w-4" />
//                 </button>
//               </div>

//               <div className="flex gap-2">
//                 <button
//                   onClick={() => handleStatusChange(selectedRequest.id, 'Approved')}
//                   className="px-3 py-1.5 bg-green-100 text-green-700 rounded-lg text-sm font-medium hover:bg-green-200 flex items-center gap-1"
//                 >
//                   <Check className="h-4 w-4" /> Approve
//                 </button>
//                 <button
//                   onClick={() => handleStatusChange(selectedRequest.id, 'Rejected')}
//                   className="px-3 py-1.5 bg-red-100 text-red-700 rounded-lg text-sm font-medium hover:bg-red-200 flex items-center gap-1"
//                 >
//                   <XCircle className="h-4 w-4" /> Reject
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }


'use client';

import React, { useState, useEffect } from 'react';
import {
  Search,
  Filter,
  MoreVertical,
  Plus,
  X,
  ChevronLeft,
  ChevronRight,
  Check,
  AlertCircle,
  Download,
  Eye,
  Edit2,
  Trash2,
  Calendar,
  User,
  FileText,
  Clock,
  CheckCircle,
  XCircle,
  RefreshCw,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Paperclip,
  Users,
  Building,
  Mail,
  Phone,
  ArrowRight,
  MoreHorizontal,
  CalendarDays,
  FileCheck,
  Ban,
  CheckSquare,
  Square,
  Filter as FilterIcon
} from 'lucide-react';

export default function LeaveRequests() {
  // State management
  const [requests, setRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [leaveTypeFilter, setLeaveTypeFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  
  // Create form
  const [formData, setFormData] = useState({
    employee_id: '',
    leave_type: '',
    start_date: '',
    start_date_breakdown: 'full_day',
    end_date: '',
    end_date_breakdown: 'full_day',
    description: '',
    attachment: null
  });

  // Stats
  const [stats, setStats] = useState({
    requested: 0,
    approved: 0,
    cancelled: 0,
    rejected: 0,
    total: 0
  });

  // Mock data - Replace with actual API calls
  const mockRequests = [
    {
      id: 1,
      employee_name: 'Ojjo',
      employee_id: 'PF001',
      department: 'Human Resource',
      position: 'Sr. Human Resource Executive',
      leave_type: 'Maternity Leave',
      days: 2.0,
      start_date: '2025-12-25',
      start_date_breakdown: 'Full Day',
      end_date: '2025-12-26',
      end_date_breakdown: 'Full Day',
      created_date: '2025-12-23',
      created_by: 'None',
      description: 'Pass',
      status: 'requested',
      attachment: null,
      requested_days: ['2025-12-25', '2025-12-26'],
      leave_clash: false
    },
    {
      id: 2,
      employee_name: 'Adam Luis',
      employee_id: 'PF002',
      department: 'IT',
      position: 'Software Developer',
      leave_type: 'Casual Leave',
      days: 1.0,
      start_date: '2025-12-23',
      start_date_breakdown: 'Full Day',
      end_date: '2025-12-23',
      end_date_breakdown: 'Full Day',
      created_date: '2025-12-22',
      created_by: 'Admin',
      description: 'Family event',
      status: 'approved',
      attachment: 'document.pdf',
      requested_days: ['2025-12-23'],
      leave_clash: false
    },
    {
      id: 3,
      employee_name: 'Sarah Johnson',
      employee_id: 'PF003',
      department: 'Finance',
      position: 'Finance Manager',
      leave_type: 'Sick Leave',
      days: 3.0,
      start_date: '2025-12-20',
      start_date_breakdown: 'Full Day',
      end_date: '2025-12-22',
      end_date_breakdown: 'Full Day',
      created_date: '2025-12-19',
      created_by: 'System',
      description: 'Medical treatment',
      status: 'cancelled',
      attachment: 'medical_certificate.pdf',
      requested_days: ['2025-12-20', '2025-12-21', '2025-12-22'],
      leave_clash: true
    },
    {
      id: 4,
      employee_name: 'Michael Chen',
      employee_id: 'PF004',
      department: 'Sales',
      position: 'Sales Executive',
      leave_type: 'Annual Leave',
      days: 5.0,
      start_date: '2025-12-28',
      start_date_breakdown: 'Full Day',
      end_date: '2026-01-01',
      end_date_breakdown: 'Full Day',
      created_date: '2025-12-22',
      created_by: 'Manager',
      description: 'Year end vacation',
      status: 'rejected',
      attachment: null,
      requested_days: ['2025-12-28', '2025-12-29', '2025-12-30', '2025-12-31', '2026-01-01'],
      leave_clash: false
    }
  ];

  // Mock employees for dropdown
  const mockEmployees = [
    { id: 1, name: 'Ojjo', employee_id: 'PF001', department: 'Human Resource' },
    { id: 2, name: 'Adam Luis', employee_id: 'PF002', department: 'IT' },
    { id: 3, name: 'Sarah Johnson', employee_id: 'PF003', department: 'Finance' },
    { id: 4, name: 'Michael Chen', employee_id: 'PF004', department: 'Sales' }
  ];

  const leaveTypes = [
    'Maternity Leave',
    'Casual Leave',
    'Sick Leave',
    'Annual Leave',
    'Emergency Leave',
    'Study Leave'
  ];

  // API Base URL - Update with your backend URL
  const API_BASE_URL = 'http://192.168.0.5:8000/api';

  // Fetch leave requests from backend
  const fetchLeaveRequests = async () => {
    try {
      setLoading(true);
      // Uncomment for actual API call
      /*
      const response = await fetch(`${API_BASE_URL}/leave-requests`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setRequests(data.data || data);
        setFilteredRequests(data.data || data);
        
        // Calculate stats
        calculateStats(data.data || data);
        
        // Calculate total pages
        const totalItems = data.total || data.length || 0;
        setTotalPages(Math.ceil(totalItems / itemsPerPage));
      } else {
        throw new Error('Failed to fetch leave requests');
      }
      */
      
      // Using mock data for now
      setTimeout(() => {
        setRequests(mockRequests);
        setFilteredRequests(mockRequests);
        calculateStats(mockRequests);
        setTotalPages(Math.ceil(mockRequests.length / itemsPerPage));
        setLoading(false);
      }, 500);
      
    } catch (error) {
      console.error('Error fetching leave requests:', error);
      // Fallback to mock data
      setRequests(mockRequests);
      setFilteredRequests(mockRequests);
      calculateStats(mockRequests);
      setLoading(false);
    }
  };

  // Calculate statistics
  const calculateStats = (data) => {
    const stats = {
      requested: data.filter(item => item.status === 'requested').length,
      approved: data.filter(item => item.status === 'approved').length,
      cancelled: data.filter(item => item.status === 'cancelled').length,
      rejected: data.filter(item => item.status === 'rejected').length,
      total: data.length
    };
    setStats(stats);
  };

  // Format date
  const formatDate = (dateString) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Handle view details
  const handleViewDetails = (request) => {
    setSelectedRequest(request);
    setShowModal(true);
  };

  // Handle status update
  const handleUpdateStatus = async (requestId, newStatus) => {
    try {
      // Uncomment for actual API call
      /*
      const response = await fetch(`${API_BASE_URL}/leave-requests/${requestId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ status: newStatus })
      });
      
      if (response.ok) {
        // Update local state
        setRequests(prev => prev.map(req => 
          req.id === requestId ? { ...req, status: newStatus } : req
        ));
        
        // Refresh data
        fetchLeaveRequests();
        
        // Close modal if open
        if (showModal && selectedRequest?.id === requestId) {
          setSelectedRequest(prev => ({ ...prev, status: newStatus }));
        }
      }
      */
      
      // Mock update
      setRequests(prev => prev.map(req => 
        req.id === requestId ? { ...req, status: newStatus } : req
      ));
      
      if (showModal && selectedRequest?.id === requestId) {
        setSelectedRequest(prev => ({ ...prev, status: newStatus }));
      }
      
      fetchLeaveRequests();
      
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  // Handle create new leave request
  const handleCreateRequest = async (e) => {
    e.preventDefault();
    
    try {
      // Uncomment for actual API call
      /*
      const formDataToSend = new FormData();
      Object.keys(formData).forEach(key => {
        if (key === 'attachment' && formData[key]) {
          formDataToSend.append('attachment', formData[key]);
        } else {
          formDataToSend.append(key, formData[key]);
        }
      });
      
      const response = await fetch(`${API_BASE_URL}/leave-requests`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: formDataToSend
      });
      
      if (response.ok) {
        setShowCreateModal(false);
        resetForm();
        fetchLeaveRequests();
      }
      */
      
      // Mock creation
      const newRequest = {
        id: requests.length + 1,
        ...formData,
        employee_name: mockEmployees.find(e => e.id == formData.employee_id)?.name || 'Unknown',
        employee_id: mockEmployees.find(e => e.id == formData.employee_id)?.employee_id || 'PF000',
        days: calculateDays(formData.start_date, formData.end_date),
        created_date: new Date().toISOString().split('T')[0],
        created_by: 'Admin',
        status: 'requested',
        requested_days: generateRequestedDays(formData.start_date, formData.end_date),
        leave_clash: false
      };
      
      setRequests(prev => [...prev, newRequest]);
      setShowCreateModal(false);
      resetForm();
      fetchLeaveRequests();
      
    } catch (error) {
      console.error('Error creating leave request:', error);
    }
  };

  // Calculate days between dates
  const calculateDays = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays + 1;
  };

  // Generate requested days array
  const generateRequestedDays = (startDate, endDate) => {
    const days = [];
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    for (let d = start; d <= end; d.setDate(d.getDate() + 1)) {
      days.push(d.toISOString().split('T')[0]);
    }
    
    return days;
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      employee_id: '',
      leave_type: '',
      start_date: '',
      start_date_breakdown: 'full_day',
      end_date: '',
      end_date_breakdown: 'full_day',
      description: '',
      attachment: null
    });
  };

  // Handle employee selection
  const handleEmployeeSelect = (employeeId) => {
    if (selectedEmployees.includes(employeeId)) {
      setSelectedEmployees(prev => prev.filter(id => id !== employeeId));
    } else {
      setSelectedEmployees(prev => [...prev, employeeId]);
    }
  };

  // Handle select all
  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedEmployees([]);
    } else {
      setSelectedEmployees(currentPageData.map(item => item.id));
    }
    setSelectAll(!selectAll);
  };

  // Apply filters
  useEffect(() => {
    let filtered = [...requests];
    
    // Apply search
    if (searchQuery) {
      filtered = filtered.filter(request =>
        request.employee_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        request.employee_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        request.leave_type.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(request => request.status === statusFilter);
    }
    
    // Apply leave type filter
    if (leaveTypeFilter !== 'all') {
      filtered = filtered.filter(request => request.leave_type === leaveTypeFilter);
    }
    
    // Apply date filter
    if (dateFilter === 'past') {
      filtered = filtered.filter(request => new Date(request.start_date) < new Date());
    } else if (dateFilter === 'future') {
      filtered = filtered.filter(request => new Date(request.start_date) >= new Date());
    } else if (dateFilter === 'today') {
      const today = new Date().toISOString().split('T')[0];
      filtered = filtered.filter(request => 
        request.requested_days.includes(today)
      );
    }
    
    // Apply employee selection filter
    if (selectedEmployees.length > 0) {
      filtered = filtered.filter(request => selectedEmployees.includes(request.id));
    }
    
    setFilteredRequests(filtered);
    setTotalPages(Math.ceil(filtered.length / itemsPerPage));
    setCurrentPage(1);
  }, [searchQuery, statusFilter, leaveTypeFilter, dateFilter, selectedEmployees, requests]);

  // Get current page data
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPageData = filteredRequests.slice(indexOfFirstItem, indexOfLastItem);

  // Handle pagination
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Initialize
  useEffect(() => {
    fetchLeaveRequests();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 p-4 lg:p-6">
      {/* Header */}
      <div className="mb-6 lg:mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Leave Requests</h1>
            <p className="text-gray-600 mt-1">Manage and track all employee leave requests</p>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="p-2 hover:bg-gray-100 rounded-xl">
              <Download className="h-5 w-5 text-gray-600" />
            </button>
            <button className="relative p-2 hover:bg-gray-100 rounded-xl">
              <AlertCircle className="h-5 w-5 text-gray-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <button
              onClick={() => setShowCreateModal(true)}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-xl flex items-center gap-2"
            >
              <Plus className="h-4 w-4" /> Create Request
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
          <div className="bg-white rounded-xl p-4 shadow border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <div className="p-2 bg-blue-50 rounded-lg">
                <FileText className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-4 shadow border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Requested</p>
                <p className="text-2xl font-bold text-orange-600">{stats.requested}</p>
              </div>
              <div className="p-2 bg-orange-50 rounded-lg">
                <Clock className="h-5 w-5 text-orange-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-4 shadow border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Approved</p>
                <p className="text-2xl font-bold text-green-600">{stats.approved}</p>
              </div>
              <div className="p-2 bg-green-50 rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-4 shadow border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Cancelled</p>
                <p className="text-2xl font-bold text-gray-600">{stats.cancelled}</p>
              </div>
              <div className="p-2 bg-gray-50 rounded-lg">
                <Ban className="h-5 w-5 text-gray-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-4 shadow border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Rejected</p>
                <p className="text-2xl font-bold text-red-600">{stats.rejected}</p>
              </div>
              <div className="p-2 bg-red-50 rounded-lg">
                <XCircle className="h-5 w-5 text-red-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters Bar */}
        <div className="bg-white rounded-xl p-4 shadow border border-gray-200 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center gap-4">
            {/* Select All Checkbox */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleSelectAll}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                {selectAll ? (
                  <CheckSquare className="h-5 w-5 text-blue-600" />
                ) : (
                  <Square className="h-5 w-5 text-gray-400" />
                )}
              </button>
              <span className="text-sm text-gray-600">Select All Requests</span>
            </div>

            {/* Search Bar */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by employee name, ID, or leave type..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Filter Dropdowns */}
            <div className="flex flex-wrap gap-2">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Status</option>
                <option value="requested">Requested</option>
                <option value="approved">Approved</option>
                <option value="cancelled">Cancelled</option>
                <option value="rejected">Rejected</option>
              </select>

              <select
                value={leaveTypeFilter}
                onChange={(e) => setLeaveTypeFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Leave Types</option>
                {leaveTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>

              <select
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Dates</option>
                <option value="past">Past</option>
                <option value="today">Today</option>
                <option value="future">Future</option>
              </select>

              <button className="px-3 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 flex items-center gap-2">
                <FilterIcon className="h-4 w-4" /> More Filters
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Leave Requests Table */}
      <div className="bg-white rounded-xl shadow border border-gray-200 overflow-hidden">
        {/* Table Header */}
        <div className="border-b border-gray-200 bg-gray-50">
          <div className="grid grid-cols-12 px-6 py-4">
            <div className="col-span-1"></div>
            <div className="col-span-3 text-sm font-semibold text-gray-900">Employee</div>
            <div className="col-span-2 text-sm font-semibold text-gray-900">Leave Type</div>
            <div className="col-span-2 text-sm font-semibold text-gray-900">Dates</div>
            <div className="col-span-1 text-sm font-semibold text-gray-900">Days</div>
            <div className="col-span-1 text-sm font-semibold text-gray-900">Status</div>
            <div className="col-span-2 text-sm font-semibold text-gray-900">Actions</div>
          </div>
        </div>

        {/* Table Body */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <RefreshCw className="h-8 w-8 animate-spin text-blue-600" />
          </div>
        ) : currentPageData.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <FileText className="h-12 w-12 text-gray-300 mb-4" />
            <p className="text-gray-500">No leave requests found</p>
          </div>
        ) : (
          <div>
            {currentPageData.map((request) => (
              <div 
                key={request.id}
                className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
              >
                <div className="grid grid-cols-12 px-6 py-4 items-center">
                  {/* Checkbox */}
                  <div className="col-span-1">
                    <input
                      type="checkbox"
                      checked={selectedEmployees.includes(request.id)}
                      onChange={() => handleEmployeeSelect(request.id)}
                      className="h-4 w-4 text-blue-600 rounded border-gray-300"
                    />
                  </div>

                  {/* Employee */}
                  <div className="col-span-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <User className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{request.employee_name}</p>
                        <p className="text-sm text-gray-500">{request.employee_id}</p>
                        <p className="text-xs text-gray-400">{request.department} / {request.position}</p>
                      </div>
                    </div>
                  </div>

                  {/* Leave Type */}
                  <div className="col-span-2">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                      {request.leave_type}
                    </span>
                  </div>

                  {/* Dates */}
                  <div className="col-span-2">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1 text-sm">
                        <Calendar className="h-3 w-3 text-gray-400" />
                        <span>{formatDate(request.start_date)}</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        to {formatDate(request.end_date)}
                      </div>
                    </div>
                  </div>

                  {/* Days */}
                  <div className="col-span-1">
                    <span className="font-medium text-gray-900">{request.days}</span>
                  </div>

                  {/* Status */}
                  <div className="col-span-1">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                      request.status === 'approved' ? 'bg-green-100 text-green-800' :
                      request.status === 'requested' ? 'bg-orange-100 text-orange-800' :
                      request.status === 'cancelled' ? 'bg-gray-100 text-gray-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="col-span-2">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleViewDetails(request)}
                        className="p-2 hover:bg-blue-50 rounded-lg text-blue-600"
                        title="View Details"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      
                      {request.status === 'requested' && (
                        <>
                          <button
                            onClick={() => handleUpdateStatus(request.id, 'approved')}
                            className="p-2 hover:bg-green-50 rounded-lg text-green-600"
                            title="Approve"
                          >
                            <Check className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleUpdateStatus(request.id, 'rejected')}
                            className="p-2 hover:bg-red-50 rounded-lg text-red-600"
                            title="Reject"
                          >
                            <XCircle className="h-4 w-4" />
                          </button>
                        </>
                      )}
                      
                      <button className="p-2 hover:bg-gray-100 rounded-lg">
                        <MoreHorizontal className="h-4 w-4 text-gray-600" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        <div className="border-t border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Showing <span className="font-medium">{indexOfFirstItem + 1}</span> to{' '}
              <span className="font-medium">
                {Math.min(indexOfLastItem, filteredRequests.length)}
              </span> of{' '}
              <span className="font-medium">{filteredRequests.length}</span> requests
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
                  className="p-2 hover:bg-gray-100 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                
                <div className="flex items-center gap-1">
                  {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }
                    
                    return (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`w-8 h-8 rounded-lg font-medium ${
                          currentPage === pageNum
                            ? 'bg-blue-600 text-white'
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                  
                  {totalPages > 5 && (
                    <span className="px-2 text-gray-400">...</span>
                  )}
                </div>
                
                <button
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  className="p-2 hover:bg-gray-100 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
              
              <div className="text-sm text-gray-600">
                Page <span className="font-medium">{currentPage}</span> of{' '}
                <span className="font-medium">{totalPages}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Detail View Modal */}
      {showModal && selectedRequest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 z-10">
              <div className="flex items-center justify-between p-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Leave Request Details</h2>
                  <p className="text-gray-600 mt-1">Complete information about the leave request</p>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-xl"
                >
                  <X className="h-5 w-5 text-gray-500" />
                </button>
              </div>
            </div>

            <div className="p-6">
              {/* Employee Info */}
              <div className="mb-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
                    <User className="h-8 w-8 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{selectedRequest.employee_name}</h3>
                    <p className="text-gray-600">{selectedRequest.position} - ({selectedRequest.department})</p>
                    <p className="text-sm text-gray-500 mt-1">Employee ID: {selectedRequest.employee_id}</p>
                  </div>
                </div>
              </div>

              {/* Leave Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* Left Column */}
                <div className="space-y-6">
                  <div className="bg-gray-50 rounded-xl p-4">
                    <h4 className="font-semibold text-gray-900 mb-3">Leave Information</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Leave Type:</span>
                        <span className="font-medium">{selectedRequest.leave_type}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Days:</span>
                        <span className="font-medium">{selectedRequest.days}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Status:</span>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          selectedRequest.status === 'approved' ? 'bg-green-100 text-green-800' :
                          selectedRequest.status === 'requested' ? 'bg-orange-100 text-orange-800' :
                          selectedRequest.status === 'cancelled' ? 'bg-gray-100 text-gray-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {selectedRequest.status.charAt(0).toUpperCase() + selectedRequest.status.slice(1)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-4">
                    <h4 className="font-semibold text-gray-900 mb-3">Start Date</h4>
                    <div className="space-y-2">
                      <p className="text-lg font-medium">{formatDate(selectedRequest.start_date)}</p>
                      <div className="flex items-center gap-2">
                        <span className="text-gray-600">Breakdown:</span>
                        <span className="font-medium">{selectedRequest.start_date_breakdown}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-4">
                    <h4 className="font-semibold text-gray-900 mb-3">Created Information</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Created Date:</span>
                        <span>{formatDate(selectedRequest.created_date)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Created By:</span>
                        <span>{selectedRequest.created_by}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  <div className="bg-gray-50 rounded-xl p-4">
                    <h4 className="font-semibold text-gray-900 mb-3">Date Range</h4>
                    <div className="space-y-3">
                      <div>
                        <p className="text-gray-600 mb-1">Start Date</p>
                        <p className="font-medium">{formatDate(selectedRequest.start_date)}</p>
                        <p className="text-sm text-gray-500">Breakdown: {selectedRequest.start_date_breakdown}</p>
                      </div>
                      <div>
                        <p className="text-gray-600 mb-1">End Date</p>
                        <p className="font-medium">{formatDate(selectedRequest.end_date)}</p>
                        <p className="text-sm text-gray-500">Breakdown: {selectedRequest.end_date_breakdown}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-4">
                    <h4 className="font-semibold text-gray-900 mb-3">Leave Description</h4>
                    <p className="text-gray-700">{selectedRequest.description || 'No description provided'}</p>
                  </div>

                  {selectedRequest.attachment && (
                    <div className="bg-gray-50 rounded-xl p-4">
                      <h4 className="font-semibold text-gray-900 mb-3">Attachment</h4>
                      <div className="flex items-center gap-2 p-3 bg-white rounded-lg border">
                        <Paperclip className="h-4 w-4 text-gray-500" />
                        <span className="font-medium">{selectedRequest.attachment}</span>
                        <button className="ml-auto text-blue-600 hover:text-blue-800 text-sm">
                          View
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Requested Days */}
                  <div className="bg-gray-50 rounded-xl p-4">
                    <h4 className="font-semibold text-gray-900 mb-3">Requested Days</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedRequest.requested_days?.map((day, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-white rounded-lg text-sm border"
                        >
                          {new Date(day).toLocaleDateString()}
                        </span>
                      ))}
                    </div>
                    {selectedRequest.leave_clash && (
                      <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-sm text-red-800 flex items-center gap-2">
                          <AlertCircle className="h-4 w-4" />
                          Leave clash detected with other requests
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Status Actions */}
              {selectedRequest.status === 'requested' && (
                <div className="border-t border-gray-200 pt-6">
                  <h4 className="font-semibold text-gray-900 mb-4">Update Status</h4>
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleUpdateStatus(selectedRequest.id, 'approved')}
                      className="flex-1 px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-medium flex items-center justify-center gap-2"
                    >
                      <Check className="h-5 w-5" /> Approve Request
                    </button>
                    <button
                      onClick={() => handleUpdateStatus(selectedRequest.id, 'rejected')}
                      className="flex-1 px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-medium flex items-center justify-center gap-2"
                    >
                      <XCircle className="h-5 w-5" /> Reject Request
                    </button>
                    <button
                      onClick={() => handleUpdateStatus(selectedRequest.id, 'cancelled')}
                      className="flex-1 px-4 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-xl font-medium flex items-center justify-center gap-2"
                    >
                      <Ban className="h-5 w-5" /> Cancel Request
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Create Request Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 z-10">
              <div className="flex items-center justify-between p-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Create New Leave Request</h2>
                  <p className="text-gray-600 mt-1">Submit a new leave request for an employee</p>
                </div>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-xl"
                >
                  <X className="h-5 w-5 text-gray-500" />
                </button>
              </div>
            </div>

            <div className="p-6">
              <form onSubmit={handleCreateRequest}>
                <div className="space-y-6">
                  {/* Employee Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Employee *
                    </label>
                    <select
                      value={formData.employee_id}
                      onChange={(e) => setFormData({ ...formData, employee_id: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    >
                      <option value="">-- Select Employee --</option>
                      {mockEmployees.map(emp => (
                        <option key={emp.id} value={emp.id}>
                          {emp.name} ({emp.employee_id}) - {emp.department}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Leave Type */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Leave Type *
                    </label>
                    <select
                      value={formData.leave_type}
                      onChange={(e) => setFormData({ ...formData, leave_type: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    >
                      <option value="">-- Choose Leave Type --</option>
                      {leaveTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>

                  {/* Date Range */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Start Date *
                      </label>
                      <input
                        type="date"
                        value={formData.start_date}
                        onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                      <div className="mt-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Start Date Breakdown *
                        </label>
                        <select
                          value={formData.start_date_breakdown}
                          onChange={(e) => setFormData({ ...formData, start_date_breakdown: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="full_day">Full Day</option>
                          <option value="first_half">First Half</option>
                          <option value="second_half">Second Half</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        End Date *
                      </label>
                      <input
                        type="date"
                        value={formData.end_date}
                        onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                      <div className="mt-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          End Date Breakdown *
                        </label>
                        <select
                          value={formData.end_date_breakdown}
                          onChange={(e) => setFormData({ ...formData, end_date_breakdown: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="full_day">Full Day</option>
                          <option value="first_half">First Half</option>
                          <option value="second_half">Second Half</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Attachment */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Attachment
                    </label>
                    <div className="flex items-center gap-4">
                      <input
                        type="file"
                        onChange={(e) => setFormData({ ...formData, attachment: e.target.files[0] })}
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                      />
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      rows="4"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter leave description..."
                    />
                  </div>

                  {/* Form Actions */}
                  <div className="flex items-center justify-end gap-3 pt-6 border-t border-gray-200">
                    <button
                      type="button"
                      onClick={() => setShowCreateModal(false)}
                      className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-xl flex items-center gap-2"
                    >
                      <Plus className="h-4 w-4" /> Create Request
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
