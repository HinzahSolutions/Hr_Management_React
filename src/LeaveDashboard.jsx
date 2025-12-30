// 'use client';

// import React, { useState } from 'react';
// import {
//   Download,
//   Plus,
//   Calendar,
//   ChevronDown,
//   User,
//   AlertCircle,
//   CheckCircle,
//   XCircle,
//   TrendingUp,
//   Users,
//   Home,
//   Clock,
//   Search,
//   Filter,
//   MoreVertical,
//   Settings,
//   Bell,
//   RefreshCw,
//   ArrowRight,
//   TrendingDown,
//   PieChart as PieChartIcon,
//   BarChart3,
//   LineChart as LineChartIcon,
//   Activity
// } from 'lucide-react';
// import { Bar, Pie, Line } from 'react-chartjs-2';
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
//   ArcElement,
//   PointElement,
//   LineElement,
// } from 'chart.js';
// import { useTheme } from './ThemeContext';

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
//   ArcElement,
//   PointElement,
//   LineElement
// );

// const months = [
//   { value: '2025-11', label: 'November 2025' },
//   { value: '2025-10', label: 'October 2025' },
//   { value: '2025-09', label: 'September 2025' },
// ];

// const upcomingHolidays = [
//   { id: 1, name: 'Christmas', date: '25 Dec 2025', days: 1, type: 'Public Holiday' },
//   { id: 2, name: 'New Year', date: '1 Jan 2026', days: 1, type: 'Public Holiday' },
//   { id: 3, name: 'Diwali', date: '31 Oct 2026', days: 3, type: 'Festival' },
// ];

// const onLeaveEmployees = [
//   { id: 1, name: 'Vandita Sharma', department: 'HR', leaveType: 'Sick Leave', days: 2, avatar: 'VS', color: 'bg-gradient-to-br from-pink-500 to-pink-600' },
//   { id: 2, name: 'Michael Brown', department: 'Engineering', leaveType: 'Vacation', days: 5, avatar: 'MB', color: 'bg-gradient-to-br from-blue-500 to-blue-600' },
//   { id: 3, name: 'Sarah Wilson', department: 'Sales', leaveType: 'Personal', days: 1, avatar: 'SW', color: 'bg-gradient-to-br from-green-500 to-green-600' },
//   { id: 4, name: 'David Lee', department: 'Marketing', leaveType: 'Maternity', days: 90, avatar: 'DL', color: 'bg-gradient-to-br from-purple-500 to-purple-600' },
// ];

// export default function LeaveDashboard() {
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

//   const [month, setMonth] = useState('2025-11');
//   const [activeFilter, setActiveFilter] = useState('month');
//   const [chartView, setChartView] = useState('bar');

//   // Bar Chart - Employee Leaves
//   const barData = {
//     labels: ['Vandita Sharma', 'Liam Bennett', 'Amelia Cooper', 'Owen Jenkins', 'Emma Davis'],
//     datasets: [
//       {
//         label: 'Compensatory Leave',
//         data: [1, 0, 0, 0, 1],
//         backgroundColor: '#60A5FA',
//         borderRadius: 6,
//       },
//       {
//         label: 'Casual Leave',
//         data: [0, 1, 0, 2, 0],
//         backgroundColor: '#F9A8D4',
//         borderRadius: 6,
//       },
//       {
//         label: 'Test',
//         data: [0, 0, 1, 0, 1],
//         backgroundColor: '#FDBA74',
//         borderRadius: 6,
//       },
//       {
//         label: 'Maternity Leave',
//         data: [4, 0, 0, 0, 0],
//         backgroundColor: '#FDE68A',
//         borderRadius: 6,
//       },
//       {
//         label: 'Sick Leave',
//         data: [0, 0, 0, 4, 2],
//         backgroundColor: '#94A3B8',
//         borderRadius: 6,
//       },
//     ],
//   };

//   // Pie Chart - Department Leaves
//   const pieData = {
//     labels: ['SW Dept', 'HR Dept', 'Marketing Dept', 'Sales Dept', 'Finance Dept'],
//     datasets: [
//       {
//         data: [25, 35, 15, 15, 10],
//         backgroundColor: ['#60A5FA', '#F9A8D4', '#FDBA74', '#94A3B8', '#34D399'],
//         borderWidth: 2,
//         borderColor: '#fff',
//       },
//     ],
//   };

//   // Donut Chart - Leave Type Count
//   const donutData = {
//     labels: ['Casual Leave', 'Sick Leave', 'Maternity Leave', 'Compensatory Leave', 'Personal Leave'],
//     datasets: [
//       {
//         data: [25, 30, 20, 15, 10],
//         backgroundColor: ['#60A5FA', '#F9A8D4', '#FDBA74', '#94A3B8', '#34D399'],
//         borderWidth: 2,
//         borderColor: '#fff',
//         cutout: '70%',
//       },
//     ],
//   };

//   // Line Chart - Weekly Leave Analytics
//   const lineData = {
//     labels: ['10-11-2025', '11-11-2025', '12-11-2025', '13-11-2025', '14-11-2025', '15-11-2025'],
//     datasets: [
//       {
//         label: 'Leave Requests',
//         data: [2, 5, 3, 1, 4, 6],
//         borderColor: '#60A5FA',
//         backgroundColor: 'rgba(96, 165, 250, 0.1)',
//         tension: 0.4,
//         fill: true,
//       },
//       {
//         label: 'Approved Leaves',
//         data: [1, 3, 2, 1, 2, 4],
//         borderColor: '#34D399',
//         backgroundColor: 'rgba(52, 211, 153, 0.1)',
//         tension: 0.4,
//         fill: true,
//       },
//     ],
//   };

//   const chartOptions = {
//     responsive: true,
//     maintainAspectRatio: false,
//     plugins: {
//       legend: { 
//         position: 'bottom',
//         labels: {
//           usePointStyle: true,
//           padding: 20,
//         }
//       },
//     },
//     scales: {
//       x: {
//         grid: {
//           display: false,
//         },
//       },
//       y: {
//         beginAtZero: true,
//         grid: {
//           borderDash: [3, 3],
//         },
//       },
//     },
//   };

//   const summaryData = {
//     pending: { count: 5, change: '+2', trend: 'up' },
//     approved: { count: 28, change: '+8', trend: 'up' },
//     rejected: { count: 12, change: '-3', trend: 'down' },
//     onLeave: { count: 8, change: '+1', trend: 'up' }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50/50 via-white to-blue-50/30 p-4 lg:p-6">
//       {/* HEADER */}
//       <div className="mb-6 lg:mb-8">
//         <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
//           <div>
//             <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Leave Management Dashboard</h1>
//             <p className="text-gray-600 mt-1">Track and manage employee leave requests</p>
//           </div>
          
//           <div className="flex items-center gap-3">
//             <div className="relative">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
//               <input
//                 type="text"
//                 placeholder="Search leave requests..."
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
//           {['today', 'week', 'month', 'quarter', 'year'].map((filter) => (
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
//             <select
//               value={month}
//               onChange={(e) => setMonth(e.target.value)}
//               className="bg-transparent text-sm text-gray-700 focus:outline-none"
//             >
//               {months.map((m) => (
//                 <option key={m.value} value={m.value}>
//                   {m.label}
//                 </option>
//               ))}
//             </select>
//           </div>
//         </div>
//       </div>

//       {/* SUMMARY CARDS */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6 lg:mb-8">
//         <div className="bg-white rounded-2xl p-5 lg:p-6 shadow-lg border border-gray-200/50 hover:shadow-xl transition-shadow">
//           <div className="flex items-center justify-between mb-4">
//             <div className="p-3 bg-yellow-50 rounded-xl">
//               <AlertCircle className="h-6 w-6 text-yellow-600" />
//             </div>
//             <div className="flex items-center text-sm text-yellow-600 font-medium">
//               {summaryData.pending.trend === 'up' ? 
//                 <TrendingUp className="h-4 w-4 mr-1" /> : 
//                 <TrendingDown className="h-4 w-4 mr-1" />
//               }
//               {summaryData.pending.change}
//             </div>
//           </div>
//           <h3 className="text-sm font-medium text-gray-500 mb-1">Pending Requests</h3>
//           <div className="flex items-baseline gap-2">
//             <p className="text-2xl lg:text-3xl font-bold text-gray-900">{summaryData.pending.count}</p>
//             <span className="text-sm text-gray-500">requests</span>
//           </div>
//           <div className="mt-4 pt-4 border-t border-gray-100">
//             <div className="flex items-center text-xs text-gray-500">
//               <Clock className="h-3 w-3 mr-1" /> Awaiting approval
//             </div>
//           </div>
//         </div>

//         <div className="bg-white rounded-2xl p-5 lg:p-6 shadow-lg border border-gray-200/50 hover:shadow-xl transition-shadow">
//           <div className="flex items-center justify-between mb-4">
//             <div className="p-3 bg-green-50 rounded-xl">
//               <CheckCircle className="h-6 w-6 text-green-600" />
//             </div>
//             <div className="flex items-center text-sm text-green-600 font-medium">
//               <TrendingUp className="h-4 w-4 mr-1" />
//               {summaryData.approved.change}
//             </div>
//           </div>
//           <h3 className="text-sm font-medium text-gray-500 mb-1">Approved This Month</h3>
//           <div className="flex items-baseline gap-2">
//             <p className="text-2xl lg:text-3xl font-bold text-green-600">{summaryData.approved.count}</p>
//             <span className="text-sm text-gray-500">leaves</span>
//           </div>
//           <div className="mt-4 pt-4 border-t border-gray-100">
//             <div className="flex items-center text-xs text-gray-500">
//               <Calendar className="h-3 w-3 mr-1" /> In November 2025
//             </div>
//           </div>
//         </div>

//         <div className="bg-white rounded-2xl p-5 lg:p-6 shadow-lg border border-gray-200/50 hover:shadow-xl transition-shadow">
//           <div className="flex items-center justify-between mb-4">
//             <div className="p-3 bg-red-50 rounded-xl">
//               <XCircle className="h-6 w-6 text-red-600" />
//             </div>
//             <div className="flex items-center text-sm text-red-600 font-medium">
//               <TrendingDown className="h-4 w-4 mr-1" />
//               {summaryData.rejected.change}
//             </div>
//           </div>
//           <h3 className="text-sm font-medium text-gray-500 mb-1">Rejected This Month</h3>
//           <div className="flex items-baseline gap-2">
//             <p className="text-2xl lg:text-3xl font-bold text-red-600">{summaryData.rejected.count}</p>
//             <span className="text-sm text-gray-500">leaves</span>
//           </div>
//           <div className="mt-4 pt-4 border-t border-gray-100">
//             <div className="flex items-center text-xs text-gray-500">
//               <AlertCircle className="h-3 w-3 mr-1" /> Requires attention
//             </div>
//           </div>
//         </div>

//         <div className="bg-white rounded-2xl p-5 lg:p-6 shadow-lg border border-gray-200/50 hover:shadow-xl transition-shadow">
//           <div className="flex items-center justify-between mb-4">
//             <div className="p-3 bg-blue-50 rounded-xl">
//               <Home className="h-6 w-6 text-blue-600" />
//             </div>
//             <div className="text-xs font-medium px-2 py-1 bg-blue-100 text-blue-700 rounded-full">
//               Currently out
//             </div>
//           </div>
//           <h3 className="text-sm font-medium text-gray-500 mb-1">On Leave Now</h3>
//           <div className="flex items-baseline gap-2">
//             <p className="text-2xl lg:text-3xl font-bold text-gray-900">{summaryData.onLeave.count}</p>
//             <span className="text-sm text-gray-500">employees</span>
//           </div>
//           <div className="mt-4 pt-4 border-t border-gray-100">
//             <button className="text-sm font-medium text-gray-600 hover:text-gray-900 flex items-center">
//               View all <ArrowRight className="h-4 w-4 ml-1" />
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* MAIN CHARTS GRID */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6 mb-6 lg:mb-8">
//         {/* Employee Leaves Bar Chart */}
//         <div className="lg:col-span-2 bg-white rounded-2xl p-5 lg:p-6 shadow-lg border border-gray-200/50">
//           <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
//             <div>
//               <h3 className="text-lg lg:text-xl font-bold text-gray-900">Employee Leaves Analysis</h3>
//               <p className="text-sm text-gray-500 mt-1">Breakdown by employee and leave type</p>
//             </div>
            
//             <div className="flex items-center gap-2">
//               <div className="flex items-center gap-2 p-1 bg-gray-100 rounded-xl">
//                 <button
//                   onClick={() => setChartView('bar')}
//                   className={`p-2 rounded-lg ${chartView === 'bar' ? 'bg-white shadow-sm' : ''}`}
//                 >
//                   <BarChart3 className="h-4 w-4" />
//                 </button>
//                 <button
//                   onClick={() => setChartView('pie')}
//                   className={`p-2 rounded-lg ${chartView === 'pie' ? 'bg-white shadow-sm' : ''}`}
//                 >
//                   <PieChartIcon className="h-4 w-4" />
//                 </button>
//               </div>
              
//               <button className="p-2 hover:bg-gray-100 rounded-xl">
//                 <MoreVertical className="h-5 w-5 text-gray-600" />
//               </button>
//             </div>
//           </div>

//           <div className="h-72 lg:h-80">
//             {chartView === 'bar' ? (
//               <Bar data={barData} options={{ ...chartOptions, indexAxis: 'y' }} />
//             ) : (
//               <Pie data={pieData} options={chartOptions} />
//             )}
//           </div>
//         </div>

//         {/* On Leave Employees */}
//         <div className="bg-white rounded-2xl p-5 lg:p-6 shadow-lg border border-gray-200/50">
//           <div className="flex items-center justify-between mb-6">
//             <div>
//               <h3 className="text-lg lg:text-xl font-bold text-gray-900">Currently On Leave</h3>
//               <p className="text-sm text-gray-500 mt-1">{onLeaveEmployees.length} employees</p>
//             </div>
//             <button className="p-2 hover:bg-gray-100 rounded-xl">
//               <Users className="h-5 w-5 text-gray-600" />
//             </button>
//           </div>
          
//           <div className="space-y-4">
//             {onLeaveEmployees.map((emp) => (
//               <div key={emp.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl transition-colors">
//                 <div className="flex items-center gap-3">
//                   <div className={`w-10 h-10 ${emp.color} rounded-xl flex items-center justify-center`}>
//                     <span className="text-white font-medium">{emp.avatar}</span>
//                   </div>
//                   <div>
//                     <p className="font-medium text-gray-900">{emp.name}</p>
//                     <div className="flex items-center gap-2">
//                       <span className="text-xs text-gray-500">{emp.department}</span>
//                       <span className="text-xs text-gray-400">•</span>
//                       <span className="text-xs text-blue-500">{emp.leaveType}</span>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="text-right">
//                   <p className="font-bold text-gray-900">{emp.days} days</p>
//                   <p className="text-xs text-gray-500">on leave</p>
//                 </div>
//               </div>
//             ))}
//           </div>
          
//           <button className="w-full mt-4 py-3 text-sm font-medium text-gray-600 hover:text-gray-900 border border-gray-300 hover:border-gray-400 rounded-xl transition-colors">
//             View All Leave Records
//           </button>
//         </div>
//       </div>

//       {/* SECOND CHARTS GRID */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
//         {/* Department Leaves Pie */}
//         <div className="bg-white rounded-2xl p-5 lg:p-6 shadow-lg border border-gray-200/50">
//           <div className="flex items-center justify-between mb-6">
//             <div>
//               <h3 className="text-lg lg:text-xl font-bold text-gray-900">Department Leave Distribution</h3>
//               <p className="text-sm text-gray-500 mt-1">By department for {month}</p>
//             </div>
//             <button className="p-2 hover:bg-gray-100 rounded-xl">
//               <Download className="h-5 w-5 text-gray-600" />
//             </button>
//           </div>
          
//           <div className="h-64">
//             <Pie data={pieData} options={chartOptions} />
//           </div>
//         </div>

//         {/* Leave Type Count Donut */}
//         <div className="bg-white rounded-2xl p-5 lg:p-6 shadow-lg border border-gray-200/50">
//           <div className="flex items-center justify-between mb-6">
//             <div>
//               <h3 className="text-lg lg:text-xl font-bold text-gray-900">Leave Type Analysis</h3>
//               <p className="text-sm text-gray-500 mt-1">Count by leave type</p>
//             </div>
//             <button className="p-2 hover:bg-gray-100 rounded-xl">
//               <Activity className="h-5 w-5 text-gray-600" />
//             </button>
//           </div>
          
//           <div className="h-64">
//             <Pie data={donutData} options={chartOptions} />
//           </div>
//         </div>

//         {/* Weekly Leave Analytics Line */}
//         <div className="bg-white rounded-2xl p-5 lg:p-6 shadow-lg border border-gray-200/50">
//           <div className="flex items-center justify-between mb-6">
//             <div>
//               <h3 className="text-lg lg:text-xl font-bold text-gray-900">Weekly Leave Trends</h3>
//               <p className="text-sm text-gray-500 mt-1">Requests vs approvals trend</p>
//             </div>
//             <div className="flex items-center gap-2">
//               <button className="p-2 hover:bg-gray-100 rounded-xl">
//                 <RefreshCw className="h-5 w-5 text-gray-600" />
//               </button>
//               <button className="p-2 hover:bg-gray-100 rounded-xl">
//                 <MoreVertical className="h-5 w-5 text-gray-600" />
//               </button>
//             </div>
//           </div>
          
//           <div className="h-64">
//             <Line data={lineData} options={chartOptions} />
//           </div>
//         </div>
//       </div>

//       {/* UPCOMING HOLIDAYS */}
//       <div className="mt-6 bg-white rounded-2xl p-5 lg:p-6 shadow-lg border border-gray-200/50">
//         <div className="flex items-center justify-between mb-6">
//           <div>
//             <h3 className="text-lg lg:text-xl font-bold text-gray-900">Upcoming Holidays</h3>
//             <p className="text-sm text-gray-500 mt-1">{upcomingHolidays.length} holidays scheduled</p>
//           </div>
//           <div className="p-2 bg-blue-50 rounded-xl">
//             <Calendar className="h-5 w-5 text-blue-600" />
//           </div>
//         </div>
        
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           {upcomingHolidays.map((holiday) => (
//             <div key={holiday.id} className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-5 border border-blue-200">
//               <div className="flex items-start justify-between mb-4">
//                 <div>
//                   <h4 className="font-bold text-gray-900 text-lg">{holiday.name}</h4>
//                   <p className="text-sm text-gray-600 mt-1">{holiday.type}</p>
//                 </div>
//                 <span className="px-3 py-1 bg-blue-500 text-white text-sm font-medium rounded-full">
//                   {holiday.days} {holiday.days === 1 ? 'day' : 'days'}
//                 </span>
//               </div>
//               <div className="flex items-center text-sm text-gray-600">
//                 <Calendar className="h-4 w-4 mr-2" />
//                 {holiday.date}
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* PERSONAL DASHBOARD LINK */}
//       <div className="mt-6">
//         <div className={`bg-gradient-to-r ${getButtonGradient()} rounded-2xl p-6 shadow-lg`}>
//           <div className="flex items-center justify-between">
//             <div className="text-white">
//               <h3 className="text-lg lg:text-xl font-bold">View Your Leave Dashboard</h3>
//               <p className="text-blue-100 mt-1">Track your personal leave history and requests</p>
//             </div>
//             <button className="px-6 py-3 bg-white text-blue-600 font-medium rounded-xl hover:bg-blue-50 transition-colors flex items-center gap-2">
//               <TrendingUp className="h-5 w-5" /> View Personal Dashboard
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* FLOATING ACTION BUTTON */}
   
//     </div>
//   );
// }



'use client';

import React, { useState, useEffect, useMemo } from 'react';
import {
  Download,
  Plus,
  Calendar,
  ChevronDown,
  User,
  AlertCircle,
  CheckCircle,
  XCircle,
  TrendingUp,
  Users,
  Home,
  Clock,
  Search,
  Filter,
  MoreVertical,
  Settings,
  Bell,
  RefreshCw,
  ArrowRight,
  TrendingDown,
  PieChart as PieChartIcon,
  BarChart3,
  LineChart as LineChartIcon,
  Activity
} from 'lucide-react';
import { Bar, Pie, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
} from 'chart.js';
import { useTheme } from './ThemeContext';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

// Seed requests used only if localStorage is empty.
// NOTE: LeaveRequests / MyLeaveRequests will read & update the same key: "leaveRequests".
const seedRequests = [
  {
    id: 1,
    employee: 'Vandita Sharma',
    department: 'HR',
    type: 'Compensatory Leave',
    days: 1,
    status: 'approved',
    start: '2025-11-10',
    end: '2025-11-10',
  },
  {
    id: 2,
    employee: 'Liam Bennett',
    department: 'SW Dept',
    type: 'Casual Leave',
    days: 1,
    status: 'requested',
    start: '2025-11-11',
    end: '2025-11-11',
  },
  {
    id: 3,
    employee: 'Amelia Cooper',
    department: 'HR Dept',
    type: 'Test',
    days: 1,
    status: 'approved',
    start: '2025-11-12',
    end: '2025-11-12',
  },
  {
    id: 4,
    employee: 'Owen Jenkins',
    department: 'Marketing Dept',
    type: 'Maternity Leave',
    days: 4,
    status: 'approved',
    start: '2025-11-13',
    end: '2025-11-16',
  },
  {
    id: 5,
    employee: 'Emma Davis',
    department: 'Finance Dept',
    type: 'Sick Leave',
    days: 2,
    status: 'rejected',
    start: '2025-11-14',
    end: '2025-11-15',
  },
];

const months = [
  { value: '2025-11', label: 'November 2025' },
  { value: '2025-10', label: 'October 2025' },
  { value: '2025-09', label: 'September 2025' },
];

const upcomingHolidays = [
  { id: 1, name: 'Christmas', date: '25 Dec 2025', days: 1, type: 'Public Holiday' },
  { id: 2, name: 'New Year', date: '1 Jan 2026', days: 1, type: 'Public Holiday' },
  { id: 3, name: 'Diwali', date: '31 Oct 2026', days: 3, type: 'Festival' },
];

const onLeaveEmployees = [
  {
    id: 1,
    name: 'Vandita Sharma',
    department: 'HR',
    leaveType: 'Sick Leave',
    days: 2,
    avatar: 'VS',
    color: 'bg-gradient-to-br from-pink-500 to-pink-600',
  },
  {
    id: 2,
    name: 'Michael Brown',
    department: 'Engineering',
    leaveType: 'Vacation',
    days: 5,
    avatar: 'MB',
    color: 'bg-gradient-to-br from-blue-500 to-blue-600',
  },
  {
    id: 3,
    name: 'Sarah Wilson',
    department: 'Sales',
    leaveType: 'Personal',
    days: 1,
    avatar: 'SW',
    color: 'bg-gradient-to-br from-green-500 to-green-600',
  },
  {
    id: 4,
    name: 'David Lee',
    department: 'Marketing',
    leaveType: 'Maternity',
    days: 90,
    avatar: 'DL',
    color: 'bg-gradient-to-br from-purple-500 to-purple-600',
  },
];

// Load from localStorage or seed
const loadRequests = () => {
  try {
    const saved = localStorage.getItem('leaveRequests');
    if (saved) return JSON.parse(saved);
    localStorage.setItem('leaveRequests', JSON.stringify(seedRequests));
    return seedRequests;
  } catch {
    return seedRequests;
  }
};

export default function LeaveDashboard() {
  const { theme } = useTheme();

  // Theme helpers
  const getAccentColor = () => theme?.accent || 'orange-600';
  const getBorderColor = () => theme?.borderColor || 'border-orange-600';
  const getTextAccent = () => (theme?.accent ? `text-${theme.accent}` : 'text-orange-600');
  const getButtonGradient = () =>
    theme?.button ? `bg-gradient-to-r ${theme.button}` : 'bg-gradient-to-r from-orange-500 to-orange-600';
  const getButtonHover = () => theme?.buttonHover || 'hover:from-orange-600 hover:to-orange-700';
  const getLightBg = () => theme?.lightBg || 'bg-orange-50';
  const getRingColor = () => theme?.ringColor || 'ring-orange-500';

  const [requests, setRequests] = useState([]);
  const [month, setMonth] = useState('2025-11');
  const [activeFilter, setActiveFilter] = useState('month');
  const [chartView, setChartView] = useState('bar');

  // Load from localStorage and listen for cross-page updates
  useEffect(() => {
    setRequests(loadRequests());

    const handleUpdated = () => {
      setRequests(loadRequests());
    };

    window.addEventListener('leaveRequestsUpdated', handleUpdated);
    return () => {
      window.removeEventListener('leaveRequestsUpdated', handleUpdated);
    };
  }, []);

  // Filter by month if needed (you can expand this later)
  const filteredRequests = useMemo(() => {
    if (!month) return requests;
    const [year, m] = month.split('-');
    return requests.filter((r) => {
      if (!r.start) return true;
      const d = new Date(r.start);
      return d.getFullYear().toString() === year && (d.getMonth() + 1).toString().padStart(2, '0') === m;
    });
  }, [requests, month]);

  // Summary counts from filteredRequests
  const summaryData = useMemo(() => {
    const pending = filteredRequests.filter((r) => {
      const status = String(r.status || '').toLowerCase();
      return status === 'pending' || status === 'requested';
    }).length;

    const approved = filteredRequests.filter(
      (r) => String(r.status || '').toLowerCase() === 'approved'
    ).length;

    const rejected = filteredRequests.filter(
      (r) => String(r.status || '').toLowerCase() === 'rejected'
    ).length;
    const onLeave = approved; // simple approximation

    return {
      pending: { count: pending, change: '+2', trend: 'up' },
      approved: { count: approved, change: '+8', trend: 'up' },
      rejected: { count: rejected, change: '-3', trend: 'down' },
      onLeave: { count: onLeave, change: '+1', trend: 'up' },
    };
  }, [filteredRequests]);

  // Bar chart by employee & type
  const barData = useMemo(() => {
    const byEmployee = {};
    filteredRequests.forEach((r) => {
      if (!byEmployee[r.employee]) {
        byEmployee[r.employee] = {
          'Compensatory Leave': 0,
          'Casual Leave': 0,
          'Test': 0,
          'Maternity Leave': 0,
          'Sick Leave': 0,
          Other: 0,
        };
      }
      const key = ['Compensatory Leave', 'Casual Leave', 'Test', 'Maternity Leave', 'Sick Leave'].includes(r.type)
        ? r.type
        : 'Other';
      byEmployee[r.employee][key] += r.days || 0;
    });

    const labels = Object.keys(byEmployee);
    const typeKeys = ['Compensatory Leave', 'Casual Leave', 'Test', 'Maternity Leave', 'Sick Leave'];
    const colors = ['#60A5FA', '#F9A8D4', '#FDBA74', '#FDE68A', '#94A3B8'];

    return {
      labels,
      datasets: typeKeys.map((key, idx) => ({
        label: key,
        data: labels.map((name) => byEmployee[name][key] || 0),
        backgroundColor: colors[idx],
        borderRadius: 6,
      })),
    };
  }, [filteredRequests]);

  // Pie: department leaves
  const pieData = useMemo(() => {
    const byDept = {};
    filteredRequests.forEach((r) => {
      const dept = r.department || 'Unknown';
      byDept[dept] = (byDept[dept] || 0) + (r.days || 0);
    });
    const labels = Object.keys(byDept);
    const values = Object.values(byDept);
    const colors = ['#60A5FA', '#F9A8D4', '#FDBA74', '#94A3B8', '#34D399'];

    return {
      labels,
      datasets: [
        {
          data: values,
          backgroundColor: colors.slice(0, labels.length),
          borderWidth: 2,
          borderColor: '#fff',
        },
      ],
    };
  }, [filteredRequests]);

  // Donut: leave type count
  const donutData = useMemo(() => {
    const byType = {};
    filteredRequests.forEach((r) => {
      const type = r.type || 'Other';
      byType[type] = (byType[type] || 0) + 1;
    });
    const labels = Object.keys(byType);
    const values = Object.values(byType);
    const colors = ['#60A5FA', '#F9A8D4', '#FDBA74', '#94A3B8', '#34D399'];

    return {
      labels,
      datasets: [
        {
          data: values,
          backgroundColor: colors.slice(0, labels.length),
          borderWidth: 2,
          borderColor: '#fff',
          cutout: '70%',
        },
      ],
    };
  }, [filteredRequests]);

  // Line: simple trend by start date
  const lineData = useMemo(() => {
    const byDate = {};
    filteredRequests.forEach((r) => {
      const d = r.start || '2025-11-10';
      byDate[d] = (byDate[d] || 0) + 1;
    });
    const labels = Object.keys(byDate).sort();
    return {
      labels,
      datasets: [
        {
          label: 'Leave Requests',
          data: labels.map((l) => byDate[l]),
          borderColor: '#60A5FA',
          backgroundColor: 'rgba(96, 165, 250, 0.1)',
          tension: 0.4,
          fill: true,
        },
        {
          label: 'Approved Leaves',
          data: labels.map((l) => {
            return filteredRequests.filter(
              (r) => r.status === 'approved' && (r.start || '').startsWith(l)
            ).length;
          }),
          borderColor: '#34D399',
          backgroundColor: 'rgba(52, 211, 153, 0.1)',
          tension: 0.4,
          fill: true,
        },
      ],
    };
  }, [filteredRequests]);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          usePointStyle: true,
          padding: 20,
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          borderDash: [3, 3],
        },
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50/50 via-white to-blue-50/30 p-4 lg:p-6">
      {/* HEADER */}
      <div className="mb-6 lg:mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Leave Management Dashboard</h1>
            <p className="text-gray-600 mt-1">Track and manage employee leave requests</p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search leave requests..."
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
        </div>
      </div>

      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6 lg:mb-8">
        {/* Pending */}
        <div className="bg-white rounded-2xl p-5 lg:p-6 shadow-lg border border-gray-200/50 hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-yellow-50 rounded-xl">
              <AlertCircle className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="flex items-center text-sm text-yellow-600 font-medium">
              {summaryData.pending.trend === 'up' ? (
                <TrendingUp className="h-4 w-4 mr-1" />
              ) : (
                <TrendingDown className="h-4 w-4 mr-1" />
              )}
              {summaryData.pending.change}
            </div>
          </div>
          <h3 className="text-sm font-medium text-gray-500 mb-1">Pending Requests</h3>
          <div className="flex items-baseline gap-2">
            <p className="text-2xl lg:text-3xl font-bold text-gray-900">{summaryData.pending.count}</p>
            <span className="text-sm text-gray-500">requests</span>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex items-center text-xs text-gray-500">
              <Clock className="h-3 w-3 mr-1" /> Awaiting approval
            </div>
          </div>
        </div>

        {/* Approved */}
        <div className="bg-white rounded-2xl p-5 lg:p-6 shadow-lg border border-gray-200/50 hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-green-50 rounded-xl">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div className="flex items-center text-sm text-green-600 font-medium">
              <TrendingUp className="h-4 w-4 mr-1" />
              {summaryData.approved.change}
            </div>
          </div>
          <h3 className="text-sm font-medium text-gray-500 mb-1">Approved This Month</h3>
          <div className="flex items-baseline gap-2">
            <p className="text-2xl lg:text-3xl font-bold text-green-600">{summaryData.approved.count}</p>
            <span className="text-sm text-gray-500">leaves</span>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex items-center text-xs text-gray-500">
              <Calendar className="h-3 w-3 mr-1" /> In {months.find((m) => m.value === month)?.label || 'this period'}
            </div>
          </div>
        </div>

        {/* Rejected */}
        <div className="bg-white rounded-2xl p-5 lg:p-6 shadow-lg border border-gray-200/50 hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-red-50 rounded-xl">
              <XCircle className="h-6 w-6 text-red-600" />
            </div>
            <div className="flex items-center text-sm text-red-600 font-medium">
              <TrendingDown className="h-4 w-4 mr-1" />
              {summaryData.rejected.change}
            </div>
          </div>
          <h3 className="text-sm font-medium text-gray-500 mb-1">Rejected This Month</h3>
          <div className="flex items-baseline gap-2">
            <p className="text-2xl lg:text-3xl font-bold text-red-600">{summaryData.rejected.count}</p>
            <span className="text-sm text-gray-500">leaves</span>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex items-center text-xs text-gray-500">
              <AlertCircle className="h-3 w-3 mr-1" /> Requires attention
            </div>
          </div>
        </div>

        {/* On leave now (from static list) */}
        <div className="bg-white rounded-2xl p-5 lg:p-6 shadow-lg border border-gray-200/50 hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-50 rounded-xl">
              <Home className="h-6 w-6 text-blue-600" />
            </div>
            <div className="text-xs font-medium px-2 py-1 bg-blue-100 text-blue-700 rounded-full">
              Currently out
            </div>
          </div>
          <h3 className="text-sm font-medium text-gray-500 mb-1">On Leave Now</h3>
          <div className="flex items-baseline gap-2">
            <p className="text-2xl lg:text-3xl font-bold text-gray-900">{onLeaveEmployees.length}</p>
            <span className="text-sm text-gray-500">employees</span>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100">
            <button className="text-sm font-medium text-gray-600 hover:text-gray-900 flex items-center">
              View all <ArrowRight className="h-4 w-4 ml-1" />
            </button>
          </div>
        </div>
      </div>

      {/* MAIN CHARTS GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6 mb-6 lg:mb-8">
        {/* Employee Leaves Bar / Pie */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-5 lg:p-6 shadow-lg border border-gray-200/50">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
            <div>
              <h3 className="text-lg lg:text-xl font-bold text-gray-900">Employee Leaves Analysis</h3>
              <p className="text-sm text-gray-500 mt-1">Breakdown by employee and leave type</p>
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

          <div className="h-72 lg:h-80">
            {chartView === 'bar' ? (
              <Bar data={barData} options={{ ...chartOptions, indexAxis: 'y' }} />
            ) : (
              <Pie data={pieData} options={chartOptions} />
            )}
          </div>
        </div>

        {/* On Leave Employees */}
        <div className="bg-white rounded-2xl p-5 lg:p-6 shadow-lg border border-gray-200/50">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg lg:text-xl font-bold text-gray-900">Currently On Leave</h3>
              <p className="text-sm text-gray-500 mt-1">{onLeaveEmployees.length} employees</p>
            </div>
            <button className="p-2 hover:bg-gray-100 rounded-xl">
              <Users className="h-5 w-5 text-gray-600" />
            </button>
          </div>
          
          <div className="space-y-4">
            {onLeaveEmployees.map((emp) => (
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
                      <span className="text-xs text-blue-500">{emp.leaveType}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-900">{emp.days} days</p>
                  <p className="text-xs text-gray-500">on leave</p>
                </div>
              </div>
            ))}
          </div>
          
          <button className="w-full mt-4 py-3 text-sm font-medium text-gray-600 hover:text-gray-900 border border-gray-300 hover:border-gray-400 rounded-xl transition-colors">
            View All Leave Records
          </button>
        </div>
      </div>

      {/* SECOND CHARTS GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
        {/* Department Leaves Pie */}
        <div className="bg-white rounded-2xl p-5 lg:p-6 shadow-lg border border-gray-200/50">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg lg:text-xl font-bold text-gray-900">Department Leave Distribution</h3>
              <p className="text-sm text-gray-500 mt-1">By department for {months.find(m => m.value === month)?.label || 'selected period'}</p>
            </div>
            <button className="p-2 hover:bg-gray-100 rounded-xl">
              <Download className="h-5 w-5 text-gray-600" />
            </button>
          </div>
          
          <div className="h-64">
            <Pie data={pieData} options={chartOptions} />
          </div>
        </div>

        {/* Leave Type Count Donut */}
        <div className="bg-white rounded-2xl p-5 lg:p-6 shadow-lg border border-gray-200/50">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg lg:text-xl font-bold text-gray-900">Leave Type Analysis</h3>
              <p className="text-sm text-gray-500 mt-1">Count by leave type</p>
            </div>
            <button className="p-2 hover:bg-gray-100 rounded-xl">
              <Activity className="h-5 w-5 text-gray-600" />
            </button>
          </div>
          
          <div className="h-64">
            <Pie data={donutData} options={chartOptions} />
          </div>
        </div>

        {/* Weekly Leave Analytics Line */}
        <div className="bg-white rounded-2xl p-5 lg:p-6 shadow-lg border border-gray-200/50">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg lg:text-xl font-bold text-gray-900">Weekly Leave Trends</h3>
              <p className="text-sm text-gray-500 mt-1">Requests vs approvals trend</p>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-gray-100 rounded-xl">
                <RefreshCw className="h-5 w-5 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-xl">
                <MoreVertical className="h-5 w-5 text-gray-600" />
              </button>
            </div>
          </div>
          
          <div className="h-64">
            <Line data={lineData} options={chartOptions} />
          </div>
        </div>
      </div>

      {/* UPCOMING HOLIDAYS */}
      <div className="mt-6 bg-white rounded-2xl p-5 lg:p-6 shadow-lg border border-gray-200/50">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg lg:text-xl font-bold text-gray-900">Upcoming Holidays</h3>
            <p className="text-sm text-gray-500 mt-1">{upcomingHolidays.length} holidays scheduled</p>
          </div>
          <div className="p-2 bg-blue-50 rounded-xl">
            <Calendar className="h-5 w-5 text-blue-600" />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {upcomingHolidays.map((holiday) => (
            <div key={holiday.id} className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-5 border border-blue-200">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h4 className="font-bold text-gray-900 text-lg">{holiday.name}</h4>
                  <p className="text-sm text-gray-600 mt-1">{holiday.type}</p>
                </div>
                <span className="px-3 py-1 bg-blue-500 text-white text-sm font-medium rounded-full">
                  {holiday.days} {holiday.days === 1 ? 'day' : 'days'}
                </span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Calendar className="h-4 w-4 mr-2" />
                {holiday.date}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* PERSONAL DASHBOARD LINK */}
      <div className="mt-6">
        <div className={`bg-gradient-to-r ${getButtonGradient()} rounded-2xl p-6 shadow-lg`}>
          <div className="flex items-center justify-between">
            <div className="text-white">
              <h3 className="text-lg lg:text-xl font-bold">View Your Leave Dashboard</h3>
              <p className="text-blue-100 mt-1">Track your personal leave history and requests</p>
            </div>
            <button className="px-6 py-3 bg-white text-blue-600 font-medium rounded-xl hover:bg-blue-50 transition-colors flex items-center gap-2">
              <TrendingUp className="h-5 w-5" /> View Personal Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}