




// 'use client';

// import React, { useState, useEffect } from 'react';
// import {
//   Search,
//   Filter,
//   ChevronDown,
//   Plus,
//   Copy,
//   Eye,
//   Edit2,
//   Trash2,
//   CheckCircle,
//   MoreVertical,
//   Calendar,
//   Users,
//   Clock,
//   AlertCircle,
//   TrendingUp,
//   TrendingDown,
//   RefreshCw,
//   Download,
//   Settings,
//   Bell,
//   ArrowRight,
//   UserCheck,
//   XCircle,
//   ChevronLeft,
//   ChevronRight,
//   BarChart3,
//   PieChart as PieChartIcon,
//   LineChart as LineChartIcon,
//   Loader2
// } from 'lucide-react';
// import { useTheme } from './ThemeContext';

// // API Configuration
// const API_BASE_URL = 'https://hr.hinzah.com';
// const CURRENT_DATE = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format

// export default function Attendances() {
//   const { theme } = useTheme();
  
//   // State for API data
//   const [attendanceData, setAttendanceData] = useState({
//     toValidate: [],
//     overtime: [],
//     validated: []
//   });
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [summaryData, setSummaryData] = useState({
//     toValidate: { count: 0, change: '+0', trend: 'neutral' },
//     overtime: { count: 0, change: '+0', trend: 'neutral' },
//     validated: { count: 0, change: '+0', trend: 'neutral' },
//     pending: { count: 0, change: '+0', trend: 'neutral' }
//   });

//   // UI States
//   const [tab, setTab] = useState('validate');
//   const [selectedAll, setSelectedAll] = useState(false);
//   const [selectedRows, setSelectedRows] = useState({});
//   const [activeFilter, setActiveFilter] = useState('all');
//   const [page, setPage] = useState(1);
//   const [viewMode, setViewMode] = useState('table');
//   const [searchQuery, setSearchQuery] = useState('');
//   const [filteredData, setFilteredData] = useState([]);
//   const totalPages = 3;

//   // Theme helper functions
//   const getAccentColor = () => theme?.accent || 'orange-600';
//   const getBorderColor = () => theme?.borderColor || 'border-orange-600';
//   const getTextAccent = () => theme?.accent ? `text-${theme.accent}` : 'text-orange-600';
//   const getButtonGradient = () => theme?.button ? `bg-gradient-to-r ${theme.button}` : 'bg-gradient-to-r from-orange-500 to-orange-600';
//   const getButtonHover = () => theme?.buttonHover || 'hover:from-orange-600 hover:to-orange-700';
//   const getLightBg = () => theme?.lightBg || 'bg-orange-50';
//   const getSidebarActive = () => theme?.sidebarActive || 'bg-orange-200';
//   const getRingColor = () => theme?.ringColor || 'ring-orange-500';

//   // Fetch attendance data from API
//   const fetchAttendanceData = async () => {
//     let currentUser = null;
//     try {
//       const userData = localStorage.getItem('currentUser');
//       if (userData) {
//         currentUser = JSON.parse(userData);
//       }
//     } catch (error) {
//       console.error('Error parsing currentUser from localStorage:', error);
//     }

//     try {
//       setLoading(true);
//       setError(null);

//       if (!currentUser || !currentUser.company_code) {
//         throw new Error('No company code found. Please login again.');
//       }

//     const response = await fetch(
//   `${API_BASE_URL}/api/attendance/company/${currentUser.company_code}/date/${CURRENT_DATE}`,
//   {
//     headers: {
//       'Authorization': `Bearer ${localStorage.getItem('authToken')}`, // Add this
//       'Accept': 'application/json',
//       'Content-Type': 'application/json',
//     }
//   }
// );

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const data = await response.json();
//       console.log("Attendance data from API:", data);
      
//       // Process API response
//       processAttendanceData(data);
      
//     } catch (err) {
//       console.error('Error fetching attendance data:', err);
//       setError(err.message);
//       // Fallback to mock data if API fails
//       useFallbackData();
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Process API response data
//   const processAttendanceData = (apiData) => {
//     const toValidate = [];
//     const overtime = [];
//     const validated = [];

//     // Process data if API response has data array
//     if (apiData.status && Array.isArray(apiData.data)) {
//       apiData.data.forEach((record, index) => {
//         // Extract employee code and name
//         const employeeCode = record.employee_code || `EMP${String(index + 1).padStart(3, '0')}`;
//         const employeeName = record.employee_name || `Employee ${index + 1}`;
        
//         // Determine status based on attendance_type and check_in/check_out times
//         let status = 'pending';
//         let category = 'toValidate';
//         let statusText = 'To Validate';
        
//         if (record.attendance_type === 'present' || record.check_in || record.check_out) {
//           status = 'validated';
//           category = 'validated';
//           statusText = 'Validated';
//         } else if (record.attendance_type === 'overtime' || record.attendance_type === 'ot') {
//           status = 'overtime';
//           category = 'overtime';
//           statusText = 'Overtime';
//         } else if (record.attendance_type === 'absent') {
//           status = 'pending';
//           category = 'toValidate';
//           statusText = 'Absent';
//         }
        
//         // Format check-in time if available
//         let checkInTime = '--:--';
//         if (record.check_in) {
//           const time = new Date(record.check_in);
//           checkInTime = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
//         }
        
//         // Format check-out time if available
//         let checkOutTime = '--:--';
//         if (record.check_out) {
//           const time = new Date(record.check_out);
//           checkOutTime = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
//         }
        
//         // Create attendance record
//         const attendanceRecord = {
//           id: record.id || index,
//           employee: `${employeeName} (${employeeCode})`,
//           batch: record.batch || 'None',
//           date: record.date ? formatDate(record.date) : formatDate(CURRENT_DATE),
//           day: record.day || (record.date ? getDayOfWeek(record.date) : getDayOfWeek(CURRENT_DATE)),
//           checkIn: checkInTime,
//           checkOut: checkOutTime,
//           confirmation: record.date ? formatShortDate(record.date) : formatShortDate(CURRENT_DATE),
//           department: record.department || 'General',
//           status: status,
//           statusText: statusText,
//           attendanceType: record.attendance_type || 'absent',
//           avatarColor: getAvatarColor(index)
//         };

//         // Categorize based on status
//         switch(category) {
//           case 'toValidate':
//             toValidate.push(attendanceRecord);
//             break;
//           case 'overtime':
//             overtime.push(attendanceRecord);
//             break;
//           case 'validated':
//             validated.push(attendanceRecord);
//             break;
//           default:
//             toValidate.push(attendanceRecord);
//         }
//       });
//     }

//     console.log("Processed data - To Validate:", toValidate.length);
//     console.log("Processed data - Overtime:", overtime.length);
//     console.log("Processed data - Validated:", validated.length);

//     setAttendanceData({
//       toValidate,
//       overtime,
//       validated
//     });

//     // Update summary data
//     updateSummaryData(toValidate, overtime, validated);
//   };

//   // Fallback mock data (used if API fails)
//   const useFallbackData = () => {
//     // const fallbackToValidate = [
//     //   {
//     //     id: 1,
//     //     employee: 'Vandita Sharma (PEP00)',
//     //     batch: 'None',
//     //     date: '11 November, 2025',
//     //     day: 'Tuesday',
//     //     checkIn: '08:30',
//     //     checkOut: '17:30',
//     //     confirmation: '11 Nov',
//     //     department: 'HR',
//     //     status: 'pending',
//     //     statusText: 'Absent',
//     //     attendanceType: 'absent',
//     //     avatarColor: 'bg-gradient-to-br from-pink-500 to-pink-600'
//     //   },
//     // ];

//     // const fallbackOt = [
//     //   {
//     //     id: 4,
//     //     employee: 'Vandita Sharma (PEP00)',
//     //     batch: 'None',
//     //     date: '08 November, 2025',
//     //     day: 'Saturday',
//     //     checkIn: '08:40',
//     //     checkOut: '19:30',
//     //     confirmation: '08 Nov',
//     //     department: 'HR',
//     //     status: 'overtime',
//     //     statusText: 'Overtime',
//     //     attendanceType: 'overtime',
//     //     avatarColor: 'bg-gradient-to-br from-pink-500 to-pink-600'
//     //   },
//     // ];

//     // const fallbackValidated = [
//     //   {
//     //     id: 13,
//     //     employee: 'ARJIT Chaudhary (arjit9800-)',
//     //     batch: 'None',
//     //     date: '10 November, 2025',
//     //     day: 'Monday',
//     //     checkIn: '08:30',
//     //     checkOut: '17:30',
//     //     confirmation: '10 Nov',
//     //     department: 'Engineering',
//     //     status: 'validated',
//     //     statusText: 'Validated',
//     //     attendanceType: 'present',
//     //     avatarColor: 'bg-gradient-to-br from-blue-500 to-blue-600'
//     //   },
//     // ];

//     setAttendanceData({
//       toValidate: fallbackToValidate,
//       overtime: fallbackOt,
//       validated: fallbackValidated
//     });

//     updateSummaryData(fallbackToValidate, fallbackOt, fallbackValidated);
//   };

//   // Update summary statistics
//   const updateSummaryData = (toValidate, overtime, validated) => {
//     setSummaryData({
//       toValidate: { 
//         count: toValidate.length, 
//         change: `+${toValidate.length}`, 
//         trend: toValidate.length > 0 ? 'up' : 'neutral' 
//       },
//       overtime: { 
//         count: overtime.length, 
//         change: `+${overtime.length}`, 
//         trend: overtime.length > 0 ? 'up' : 'neutral' 
//       },
//       validated: { 
//         count: validated.length, 
//         change: `+${validated.length}`, 
//         trend: validated.length > 0 ? 'up' : 'neutral' 
//       },
//       pending: { 
//         count: toValidate.length, 
//         change: `+${toValidate.length}`, 
//         trend: toValidate.length > 0 ? 'up' : 'neutral' 
//       }
//     });
//   };

//   // Helper functions
//   const formatDate = (dateString) => {
//     try {
//       const date = new Date(dateString);
//       return date.toLocaleDateString('en-US', {
//         day: 'numeric',
//         month: 'long',
//         year: 'numeric'
//       });
//     } catch (error) {
//       return formatDate(CURRENT_DATE);
//     }
//   };

//   const formatShortDate = (dateString) => {
//     try {
//       const date = new Date(dateString);
//       return date.toLocaleDateString('en-US', {
//         day: 'numeric',
//         month: 'short'
//       });
//     } catch (error) {
//       return formatShortDate(CURRENT_DATE);
//     }
//   };

//   const getDayOfWeek = (dateString) => {
//     try {
//       const date = new Date(dateString);
//       return date.toLocaleDateString('en-US', { weekday: 'long' });
//     } catch (error) {
//       return getDayOfWeek(CURRENT_DATE);
//     }
//   };

//   const getAvatarColor = (index) => {
//     const colors = [
//       'bg-gradient-to-br from-pink-500 to-pink-600',
//       'bg-gradient-to-br from-blue-500 to-blue-600',
//       'bg-gradient-to-br from-green-500 to-green-600',
//       'bg-gradient-to-br from-purple-500 to-purple-600',
//       'bg-gradient-to-br from-yellow-500 to-yellow-600',
//       'bg-gradient-to-br from-red-500 to-red-600',
//       'bg-gradient-to-br from-indigo-500 to-indigo-600',
//       'bg-gradient-to-br from-teal-500 to-teal-600'
//     ];
//     return colors[index % colors.length];
//   };

//   const getAvatarInitials = (name) => {
//     if (!name) return 'NA';
//     return name
//       .split(' ')
//       .map((n) => n[0])
//       .join('')
//       .toUpperCase()
//       .substring(0, 2);
//   };

//   const getStatusColor = (status) => {
//     switch(status?.toLowerCase()) {
//       case 'pending':
//       case 'absent':
//         return 'bg-yellow-100 text-yellow-700';
//       case 'overtime':
//       case 'ot':
//         return 'bg-purple-100 text-purple-700';
//       case 'validated':
//       case 'present':
//       case 'approved':
//         return 'bg-green-100 text-green-700';
//       default:
//         return 'bg-gray-100 text-gray-700';
//     }
//   };

//   // Filter data based on search query
//   useEffect(() => {
//     const currentData = attendanceData[tab === 'validate' ? 'toValidate' : tab === 'ot' ? 'overtime' : 'validated'];
    
//     if (!searchQuery.trim()) {
//       setFilteredData(currentData);
//       return;
//     }

//     const query = searchQuery.toLowerCase();
//     const filtered = currentData.filter(item =>
//       item.employee.toLowerCase().includes(query) ||
//       (item.department && item.department.toLowerCase().includes(query)) ||
//       item.date.toLowerCase().includes(query) ||
//       (item.batch && item.batch.toLowerCase().includes(query))
//     );

//     setFilteredData(filtered);
//   }, [searchQuery, tab, attendanceData]);

//   // Initialize filtered data
//   useEffect(() => {
//     const currentData = attendanceData[tab === 'validate' ? 'toValidate' : tab === 'ot' ? 'overtime' : 'validated'];
//     setFilteredData(currentData);
//   }, [tab, attendanceData]);

//   // Fetch data on component mount
//   useEffect(() => {
//     fetchAttendanceData();
//   }, []);

//   // UI Handlers
//   const handleSelectAll = () => {
//     const newSel = {};
//     filteredData.forEach((_, i) => (newSel[i] = !selectedAll));
//     setSelectedRows(newSel);
//     setSelectedAll(!selectedAll);
//   };

//   const handleSelectRow = (i) => {
//     const newSel = { ...selectedRows, [i]: !selectedRows[i] };
//     setSelectedRows(newSel);
//     setSelectedAll(Object.values(newSel).every((v) => v));
//   };

//   const handleRefresh = () => {
//     fetchAttendanceData();
//   };

//   // Handle validation of attendance
//   const handleValidateAttendance = (id) => {
//     console.log('Validating attendance ID:', id);
//     // Implement validation logic here
//     // Update the status to validated
//     const updatedData = filteredData.map(item => 
//       item.id === id ? { ...item, status: 'validated', statusText: 'Validated' } : item
//     );
    
//     // Update the specific category
//     if (tab === 'validate') {
//       setAttendanceData(prev => ({
//         ...prev,
//         toValidate: prev.toValidate.filter(item => item.id !== id),
//         validated: [...prev.validated, {...filteredData.find(item => item.id === id), status: 'validated', statusText: 'Validated'}]
//       }));
//     }
//   };

//   // Render loading state
//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-gray-50/50 via-white to-blue-50/30 p-4 lg:p-6 flex items-center justify-center">
//         <div className="text-center">
//           <Loader2 className="h-12 w-12 animate-spin mx-auto text-orange-600" />
//           <p className="mt-4 text-gray-600">Loading attendance data...</p>
//         </div>
//       </div>
//     );
//   }

//   // Render error state
//   if (error) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-gray-50/50 via-white to-blue-50/30 p-4 lg:p-6">
//         <div className="bg-red-50 border border-red-200 rounded-2xl p-6 mb-6">
//           <div className="flex items-center gap-3">
//             <AlertCircle className="h-6 w-6 text-red-600" />
//             <div>
//               <h3 className="font-medium text-red-800">Error Loading Data</h3>
//               <p className="text-sm text-red-600 mt-1">{error}</p>
//               <p className="text-sm text-red-600">Showing fallback data instead.</p>
//             </div>
//           </div>
//           <button
//             onClick={handleRefresh}
//             className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center gap-2"
//           >
//             <RefreshCw className="h-4 w-4" /> Try Again
//           </button>
//         </div>
//         {/* Continue with fallback data display */}
//       </div>
//     );
//   }

//   const data = filteredData;

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50/50 via-white to-blue-50/30 p-4 lg:p-6">
//       {/* HEADER */}
//       <div className="mb-6 lg:mb-8">
//         <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
//           <div>
//             <div className="flex items-center gap-3">
//               <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Attendance Management</h1>
//               <button
//                 onClick={handleRefresh}
//                 className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
//                 title="Refresh data"
//               >
//                 <RefreshCw className={`h-5 w-5 text-gray-600 ${loading ? 'animate-spin' : ''}`} />
//               </button>
//             </div>
//             <p className="text-gray-600 mt-1">
//               Showing data for {formatDate(CURRENT_DATE)} • Last updated: Just now
//             </p>
//           </div>
          
//           <div className="flex items-center gap-3">
//             <div className="relative">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
//               <input
//                 type="text"
//                 placeholder="Search attendance..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
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
//               <Users className="h-4 w-4" /> Cards
//             </button>
//           </div>
          
//           <div className="flex items-center gap-1 border border-gray-300 rounded-xl px-3 py-2 bg-white">
//             <Calendar className="h-4 w-4 text-gray-500" />
//             <span className="text-sm text-gray-700">{formatDate(CURRENT_DATE)}</span>
//           </div>
          
//           {['all', 'today', 'week', 'month'].map((filter) => (
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
          
//           <button 
//             onClick={() => {
//               // Implement CSV export functionality here
//               console.log('Export data');
//             }}
//             className={`p-2 ${getLightBg()} ${getTextAccent()} rounded-xl hover:opacity-90`}
//           >
//             <Download className="h-5 w-5" />
//           </button>
//         </div>
//       </div>

//       {/* SUMMARY CARDS */}
//       <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6 lg:mb-8">
//         {Object.entries(summaryData).map(([key, value]) => (
//           <div key={key} className="bg-white rounded-2xl p-5 lg:p-6 shadow-lg border border-gray-200/50 hover:shadow-xl transition-shadow">
//             <div className="flex items-center justify-between mb-4">
//               <div className={`p-3 ${
//                 key === 'toValidate' ? 'bg-yellow-50' :
//                 key === 'overtime' ? 'bg-purple-50' :
//                 key === 'validated' ? 'bg-green-50' :
//                 getLightBg()
//               } rounded-xl`}>
//                 {key === 'toValidate' ? <AlertCircle className="h-6 w-6 text-yellow-600" /> :
//                  key === 'overtime' ? <Clock className="h-6 w-6 text-purple-600" /> :
//                  key === 'validated' ? <UserCheck className="h-6 w-6 text-green-600" /> :
//                  <AlertCircle className={`h-6 w-6 ${getTextAccent()}`} />
//                 }
//               </div>
//               <div className={`flex items-center text-sm font-medium ${
//                 key === 'toValidate' ? 'text-yellow-600' :
//                 key === 'overtime' ? 'text-purple-600' :
//                 key === 'validated' ? 'text-green-600' :
//                 getTextAccent()
//               }`}>
//                 {value.trend === 'up' ? 
//                   <TrendingUp className="h-4 w-4 mr-1" /> : 
//                   value.trend === 'down' ?
//                   <TrendingDown className="h-4 w-4 mr-1" /> :
//                   null
//                 }
//                 {value.change}
//               </div>
//             </div>
//             <h3 className="text-sm font-medium text-gray-500 mb-1">
//               {key === 'toValidate' ? 'To Validate (Absent)' :
//                key === 'overtime' ? 'Overtime' :
//                key === 'validated' ? 'Validated (Present)' : 'Pending Action'}
//             </h3>
//             <div className="flex items-baseline gap-2">
//               <p className="text-2xl lg:text-3xl font-bold text-gray-900">{value.count}</p>
//               <span className="text-sm text-gray-500">
//                 {key === 'toValidate' || key === 'validated' ? 'attendance' : 'records'}
//               </span>
//             </div>
//             <div className="mt-4 pt-4 border-t border-gray-100">
//               <button 
//                 onClick={() => setTab(key === 'pending' ? 'validate' : key.replace(/([A-Z])/g, '$1').toLowerCase())}
//                 className={`text-sm font-medium ${getTextAccent()} hover:opacity-90 flex items-center`}
//               >
//                 View all <ArrowRight className="h-4 w-4 ml-1" />
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* TABS */}
//       <div className="bg-white rounded-2xl shadow-lg border border-gray-200/50 mb-6">
//         <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 p-6">
//           <div className="flex items-center gap-6">
//             <div className="flex gap-1 border-b border-gray-200">
//               {[
//                 { key: 'validate', label: 'To Validate (Absent)', icon: <AlertCircle className="h-4 w-4" />, count: attendanceData.toValidate.length },
//                 { key: 'ot', label: 'Overtime', icon: <Clock className="h-4 w-4" />, count: attendanceData.overtime.length },
//                 { key: 'validated', label: 'Validated (Present)', icon: <UserCheck className="h-4 w-4" />, count: attendanceData.validated.length },
//               ].map((t) => (
//                 <button
//                   key={t.key}
//                   onClick={() => {
//                     setTab(t.key);
//                     setSelectedAll(false);
//                     setSelectedRows({});
//                     setSearchQuery('');
//                   }}
//                   className={`flex items-center gap-2 px-4 py-3 font-medium border-b-2 transition-colors ${
//                     tab === t.key
//                       ? `${getBorderColor()} ${getTextAccent()}`
//                       : 'border-transparent text-gray-600 hover:text-gray-800'
//                   }`}
//                 >
//                   {t.icon}
//                   {t.label}
//                   <span className={`ml-2 px-2 py-0.5 text-xs font-medium rounded-full ${
//                     tab === t.key ? 'bg-white text-gray-900' : 'bg-gray-100 text-gray-600'
//                   }`}>
//                     {t.count}
//                   </span>
//                 </button>
//               ))}
//             </div>
//           </div>
          
//           <div className="flex items-center gap-3">
//             {data.length > 0 && (
//               <button
//                 onClick={handleSelectAll}
//                 className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
//                   selectedAll
//                     ? 'bg-green-600 text-white hover:bg-green-700'
//                     : `${getLightBg()} ${getTextAccent()} hover:opacity-90`
//                 }`}
//               >
//                 {selectedAll ? 'Deselect All' : 'Select All'}
//               </button>
//             )}
//             <button className="p-2 hover:bg-gray-100 rounded-xl">
//               <MoreVertical className="h-5 w-5 text-gray-600" />
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Empty State */}
//       {data.length === 0 ? (
//         <div className="bg-white rounded-2xl shadow-lg border border-gray-200/50 p-12 text-center">
//           <div className="max-w-md mx-auto">
//             <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
//               <Users className="h-8 w-8 text-gray-400" />
//             </div>
//             <h3 className="text-lg font-medium text-gray-900 mb-2">No attendance records found</h3>
//             <p className="text-gray-600 mb-6">
//               {searchQuery ? 'No records match your search.' : `No ${tab === 'validate' ? 'absent employees' : tab} records for today.`}
//             </p>
//             {searchQuery && (
//               <button
//                 onClick={() => setSearchQuery('')}
//                 className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
//               >
//                 Clear search
//               </button>
//             )}
//           </div>
//         </div>
//       ) : (
//         <>
//           {/* TABLE VIEW */}
//           {viewMode === 'table' && (
//             <div className="bg-white rounded-2xl shadow-lg border border-gray-200/50 overflow-hidden">
//               {/* Table */}
//               <div className="overflow-x-auto">
//                 <table className="w-full">
//                   <thead className={`${getLightBg()} border-b border-gray-200`}>
//                     <tr>
//                       <th className="px-6 py-4 text-left">
//                         <input
//                           type="checkbox"
//                           checked={selectedAll}
//                           onChange={handleSelectAll}
//                           className={`rounded border-gray-300 ${getTextAccent()} focus:${getRingColor()}`}
//                         />
//                       </th>
//                       <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Employee</th>
//                       <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Batch</th>
//                       <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Date</th>
//                       <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Day</th>
//                       <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Check-In</th>
//                       <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Check-Out</th>
//                       <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
//                         {tab === 'validate' ? 'Status' : tab === 'ot' ? 'Overtime Status' : 'Attendance Status'}
//                       </th>
//                       <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
//                     </tr>
//                   </thead>
//                   <tbody className="divide-y divide-gray-200">
//                     {data.map((row, i) => (
//                       <tr key={row.id} className="hover:bg-gray-50/50 transition-colors">
//                         <td className="px-6 py-4">
//                           <input
//                             type="checkbox"
//                             checked={selectedRows[i] || false}
//                             onChange={() => handleSelectRow(i)}
//                             className={`rounded border-gray-300 ${getTextAccent()} focus:${getRingColor()}`}
//                           />
//                         </td>
//                         <td className="px-6 py-4">
//                           <div className="flex items-center gap-3">
//                             <div className={`w-10 h-10 ${row.avatarColor} rounded-xl flex items-center justify-center`}>
//                               <span className="text-white font-medium">{getAvatarInitials(row.employee)}</span>
//                             </div>
//                             <div>
//                               <p className="font-medium text-gray-900">{row.employee}</p>
//                               <p className="text-xs text-gray-500">{row.department}</p>
//                             </div>
//                           </div>
//                         </td>
//                         <td className="px-6 py-4 text-sm text-gray-700">
//                           <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
//                             row.batch === 'None' ? 'bg-gray-100 text-gray-700' : 'bg-blue-100 text-blue-700'
//                           }`}>
//                             {row.batch}
//                           </span>
//                         </td>
//                         <td className="px-6 py-4 text-sm text-gray-700">{row.date}</td>
//                         <td className="px-6 py-4 text-sm text-gray-700">{row.day}</td>
//                         <td className="px-6 py-4">
//                           <span className={`inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium ${
//                             row.checkIn !== '--:--' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
//                           }`}>
//                             <Clock className="h-4 w-4 mr-1" /> {row.checkIn}
//                           </span>
//                         </td>
//                         <td className="px-6 py-4">
//                           <span className={`inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium ${
//                             row.checkOut !== '--:--' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'
//                           }`}>
//                             <Clock className="h-4 w-4 mr-1" /> {row.checkOut}
//                           </span>
//                         </td>
//                         <td className="px-6 py-4">
//                           <div className="flex items-center gap-2">
//                             <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(row.status)}`}>
//                               {row.statusText}
//                             </span>
//                             {tab === 'validate' && (
//                               <button 
//                                 onClick={() => handleValidateAttendance(row.id)}
//                                 className={`px-3 py-1.5 ${getButtonGradient()} ${getButtonHover()} text-white text-sm font-medium rounded-lg flex items-center gap-1`}
//                               >
//                                 <CheckCircle className="h-3 w-3" /> Mark Present
//                               </button>
//                             )}
//                           </div>
//                         </td>
//                         <td className="px-6 py-4">
//                           <div className="flex items-center gap-2">
//                             <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
//                               <Eye className="h-4 w-4 text-gray-600" />
//                             </button>
//                             <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
//                               <Edit2 className="h-4 w-4 text-gray-600" />
//                             </button>
//                             <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
//                               <Trash2 className="h-4 w-4 text-red-600" />
//                             </button>
//                           </div>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>

//               {/* Pagination */}
//               <div className="border-t border-gray-200 px-6 py-4">
//                 <div className="flex items-center justify-between">
//                   <div className="text-sm text-gray-600">
//                     Showing <span className="font-medium">{data.length}</span> of{' '}
//                     <span className="font-medium">{data.length}</span> records
//                   </div>
                  
//                   <div className="flex items-center gap-4">
//                     <div className="flex items-center gap-2">
//                       <button
//                         onClick={() => setPage(Math.max(1, page - 1))}
//                         disabled={page === 1}
//                         className="p-2 hover:bg-gray-100 rounded-xl disabled:opacity-50"
//                       >
//                         <ChevronLeft className="h-4 w-4" />
//                       </button>
                      
//                       <div className="flex items-center gap-2">
//                         {[1, 2, 3].map(p => (
//                           <button
//                             key={p}
//                             onClick={() => setPage(p)}
//                             className={`w-10 h-10 rounded-lg font-medium ${
//                               page === p
//                                 ? `${getButtonGradient()} text-white`
//                                 : 'text-gray-600 hover:bg-gray-100'
//                             }`}
//                           >
//                             {p}
//                           </button>
//                         ))}
//                       </div>
                      
//                       <button
//                         onClick={() => setPage(Math.min(totalPages, page + 1))}
//                         disabled={page === totalPages}
//                         className="p-2 hover:bg-gray-100 rounded-xl disabled:opacity-50"
//                       >
//                         <ChevronRight className="h-4 w-4" />
//                       </button>
//                     </div>
                    
//                     <div className="text-sm text-gray-600">
//                       Page <span className="font-medium">{page}</span> of <span className="font-medium">{totalPages}</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* CARD VIEW */}
//           {viewMode === 'card' && (
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {data.map((row) => (
//                 <div key={row.id} className="bg-white rounded-2xl shadow-lg border border-gray-200/50 p-6">
//                   <div className="flex items-start justify-between mb-4">
//                     <div className="flex items-center gap-3">
//                       <div className={`w-12 h-12 ${row.avatarColor} rounded-xl flex items-center justify-center`}>
//                         <span className="text-white text-lg font-bold">{getAvatarInitials(row.employee)}</span>
//                       </div>
//                       <div>
//                         <h3 className="font-bold text-gray-900">{row.employee.split('(')[0]?.trim() || row.employee}</h3>
//                         <div className="flex items-center gap-2 mt-1">
//                           <span className="text-sm text-gray-500">{row.department}</span>
//                           <span className="text-xs text-gray-400">•</span>
//                           <span className="text-xs text-gray-500">{row.employee.match(/\(([^)]+)\)/)?.[1] || ''}</span>
//                         </div>
//                       </div>
//                     </div>
//                     <button className="p-2 hover:bg-gray-100 rounded-xl">
//                       <MoreVertical className="h-5 w-5 text-gray-600" />
//                     </button>
//                   </div>
                  
//                   <div className="space-y-4 mb-6">
//                     <div className="flex items-center justify-between">
//                       <span className="text-sm text-gray-500">Date</span>
//                       <span className="font-medium text-gray-900">{row.date}</span>
//                     </div>
//                     <div className="flex items-center justify-between">
//                       <span className="text-sm text-gray-500">Day</span>
//                       <span className="font-medium text-gray-900">{row.day}</span>
//                     </div>
//                     <div className="flex items-center justify-between">
//                       <span className="text-sm text-gray-500">Check-In</span>
//                       <span className={`inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium ${
//                         row.checkIn !== '--:--' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
//                       }`}>
//                         <Clock className="h-4 w-4 mr-1" /> {row.checkIn}
//                       </span>
//                     </div>
//                     <div className="flex items-center justify-between">
//                       <span className="text-sm text-gray-500">Check-Out</span>
//                       <span className={`inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium ${
//                         row.checkOut !== '--:--' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'
//                       }`}>
//                         <Clock className="h-4 w-4 mr-1" /> {row.checkOut}
//                       </span>
//                     </div>
//                     <div className="flex items-center justify-between">
//                       <span className="text-sm text-gray-500">Batch</span>
//                       <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
//                         row.batch === 'None' ? 'bg-gray-100 text-gray-700' : 'bg-blue-100 text-blue-700'
//                       }`}>
//                         {row.batch}
//                       </span>
//                     </div>
//                   </div>
                  
//                   <div className="flex items-center justify-between pt-4 border-t border-gray-200">
//                     <div>
//                       <span className="text-sm text-gray-500">Status</span>
//                       <p className={`text-sm font-medium ${getStatusColor(row.status)} rounded-full px-3 py-1 inline-block`}>
//                         {row.statusText}
//                       </p>
//                     </div>
                    
//                     {tab === 'validate' ? (
//                       <button 
//                         onClick={() => handleValidateAttendance(row.id)}
//                         className={`px-4 py-2 ${getButtonGradient()} ${getButtonHover()} text-white text-sm font-medium rounded-lg flex items-center gap-2`}
//                       >
//                         <CheckCircle className="h-4 w-4" /> Mark Present
//                       </button>
//                     ) : (
//                       <div className="flex items-center gap-2">
//                         <button className="p-2 hover:bg-gray-100 rounded-lg">
//                           <Eye className="h-4 w-4 text-gray-600" />
//                         </button>
//                         <button className="p-2 hover:bg-gray-100 rounded-lg">
//                           <Edit2 className="h-4 w-4 text-gray-600" />
//                         </button>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </>
//       )}
//     </div>
//   );
// }



'use client';

import React, { useState, useEffect, useRef } from 'react';
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
  LineChart as LineChartIcon,
  Loader2,
  FileSpreadsheet,
  FileText,
  Clipboard,
  CheckSquare,
  Square,
  Moon,
  Sun,
  FileDown
} from 'lucide-react';
import { useTheme } from './ThemeContext';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

// API Configuration
const API_BASE_URL = 'https://hr.hinzah.com';
const CURRENT_DATE = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format

export default function Attendances() {
  const { theme, getThemeClasses, refreshTheme } = useTheme();
  const themeClasses = getThemeClasses();
  
  // State for API data
  const [attendanceData, setAttendanceData] = useState({
    toValidate: [],
    overtime: [],
    validated: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [summaryData, setSummaryData] = useState({
    toValidate: { count: 0, change: '+0', trend: 'neutral' },
    overtime: { count: 0, change: '+0', trend: 'neutral' },
    validated: { count: 0, change: '+0', trend: 'neutral' },
    pending: { count: 0, change: '+0', trend: 'neutral' }
  });

  // UI States
  const [tab, setTab] = useState('validate');
  const [selectedAll, setSelectedAll] = useState(false);
  const [selectedRows, setSelectedRows] = useState({});
  const [activeFilter, setActiveFilter] = useState('all');
  const [page, setPage] = useState(1);
  const [viewMode, setViewMode] = useState('table');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [showExportMenu, setShowExportMenu] = useState(false);
  const exportMenuRef = useRef(null);
  const totalPages = 3;

  // Close export menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (exportMenuRef.current && !exportMenuRef.current.contains(event.target)) {
        setShowExportMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Fetch attendance data from API
  const fetchAttendanceData = async () => {
    let currentUser = null;
    try {
      const userData = localStorage.getItem('currentUser');
      if (userData) {
        currentUser = JSON.parse(userData);
      }
    } catch (error) {
      console.error('Error parsing currentUser from localStorage:', error);
    }

    try {
      setLoading(true);
      setError(null);

      if (!currentUser || !currentUser.company_code) {
        throw new Error('No company code found. Please login again.');
      }

      const response = await fetch(
        `${API_BASE_URL}/api/attendance/company/${currentUser.company_code}/date/${CURRENT_DATE}`,
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          }
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Attendance data from API:", data);
      
      // Process API response
      processAttendanceData(data);
      
    } catch (err) {
      console.error('Error fetching attendance data:', err);
      setError(err.message);
      // Fallback to mock data if API fails
      useFallbackData();
    } finally {
      setLoading(false);
    }
  };

  // Process API response data
  const processAttendanceData = (apiData) => {
    const toValidate = [];
    const overtime = [];
    const validated = [];

    // Process data if API response has data array
    if (apiData.status && Array.isArray(apiData.data)) {
      apiData.data.forEach((record, index) => {
        // Extract employee code and name
        const employeeCode = record.employee_code || `EMP${String(index + 1).padStart(3, '0')}`;
        const employeeName = record.employee_name || `Employee ${index + 1}`;
        
        // Determine status based on attendance_type and check_in/check_out times
        let status = 'pending';
        let category = 'toValidate';
        let statusText = 'To Validate';
        
        if (record.attendance_type === 'present' || record.check_in || record.check_out) {
          status = 'validated';
          category = 'validated';
          statusText = 'Validated';
        } else if (record.attendance_type === 'overtime' || record.attendance_type === 'ot') {
          status = 'overtime';
          category = 'overtime';
          statusText = 'Overtime';
        } else if (record.attendance_type === 'absent') {
          status = 'pending';
          category = 'toValidate';
          statusText = 'Absent';
        }
        
        // Format check-in time if available
        let checkInTime = '--:--';
        if (record.check_in) {
          const time = new Date(record.check_in);
          checkInTime = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        }
        
        // Format check-out time if available
        let checkOutTime = '--:--';
        if (record.check_out) {
          const time = new Date(record.check_out);
          checkOutTime = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        }
        
        // Create attendance record
        const attendanceRecord = {
          id: record.id || index,
          employee: `${employeeName} (${employeeCode})`,
          batch: record.batch || 'None',
          date: record.date ? formatDate(record.date) : formatDate(CURRENT_DATE),
          day: record.day || (record.date ? getDayOfWeek(record.date) : getDayOfWeek(CURRENT_DATE)),
          checkIn: checkInTime,
          checkOut: checkOutTime,
          confirmation: record.date ? formatShortDate(record.date) : formatShortDate(CURRENT_DATE),
          department: record.department || 'General',
          status: status,
          statusText: statusText,
          attendanceType: record.attendance_type || 'absent',
          avatarColor: getAvatarColor(index)
        };

        // Categorize based on status
        switch(category) {
          case 'toValidate':
            toValidate.push(attendanceRecord);
            break;
          case 'overtime':
            overtime.push(attendanceRecord);
            break;
          case 'validated':
            validated.push(attendanceRecord);
            break;
          default:
            toValidate.push(attendanceRecord);
        }
      });
    }

    console.log("Processed data - To Validate:", toValidate.length);
    console.log("Processed data - Overtime:", overtime.length);
    console.log("Processed data - Validated:", validated.length);

    setAttendanceData({
      toValidate,
      overtime,
      validated
    });

    // Update summary data
    updateSummaryData(toValidate, overtime, validated);
  };

  // Fallback mock data
  const useFallbackData = () => {
    const fallbackToValidate = [
      {
        id: 1,
        employee: '---------',
        batch: 'None',
        date: '11 November, 2025',
        day: 'Tuesday',
        checkIn: '08:30',
        checkOut: '17:30',
        confirmation: '11 Nov',
        department: 'HR',
        status: 'pending',
        statusText: 'Absent',
        attendanceType: 'absent',
        avatarColor: 'bg-gradient-to-br from-pink-500 to-pink-600'
      },
    ];

    const fallbackOt = [
      {
        id: 4,
        employee: '--------------',
        batch: 'None',
        date: '08 November, 2025',
        day: 'Saturday',
        checkIn: '08:40',
        checkOut: '19:30',
        confirmation: '08 Nov',
        department: 'HR',
        status: 'overtime',
        statusText: 'Overtime',
        attendanceType: 'overtime',
        avatarColor: 'bg-gradient-to-br from-pink-500 to-pink-600'
      },
    ];

    const fallbackValidated = [
      {
        id: 13,
        employee: '------------------',
        batch: 'None',
        date: '10 November, 2025',
        day: 'Monday',
        checkIn: '08:30',
        checkOut: '17:30',
        confirmation: '10 Nov',
        department: 'Engineering',
        status: 'validated',
        statusText: 'Validated',
        attendanceType: 'present',
        avatarColor: 'bg-gradient-to-br from-blue-500 to-blue-600'
      },
    ];

    setAttendanceData({
      toValidate: fallbackToValidate,
      overtime: fallbackOt,
      validated: fallbackValidated
    });

    updateSummaryData(fallbackToValidate, fallbackOt, fallbackValidated);
  };

  // Update summary statistics
  const updateSummaryData = (toValidate, overtime, validated) => {
    setSummaryData({
      toValidate: { 
        count: toValidate.length, 
        change: `+${toValidate.length}`, 
        trend: toValidate.length > 0 ? 'up' : 'neutral' 
      },
      overtime: { 
        count: overtime.length, 
        change: `+${overtime.length}`, 
        trend: overtime.length > 0 ? 'up' : 'neutral' 
      },
      validated: { 
        count: validated.length, 
        change: `+${validated.length}`, 
        trend: validated.length > 0 ? 'up' : 'neutral' 
      },
      pending: { 
        count: toValidate.length, 
        change: `+${toValidate.length}`, 
        trend: toValidate.length > 0 ? 'up' : 'neutral' 
      }
    });
  };

  // Helper functions
  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
    } catch (error) {
      return formatDate(CURRENT_DATE);
    }
  };

  const formatShortDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'short'
      });
    } catch (error) {
      return formatShortDate(CURRENT_DATE);
    }
  };

  const getDayOfWeek = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { weekday: 'long' });
    } catch (error) {
      return getDayOfWeek(CURRENT_DATE);
    }
  };

  const getAvatarColor = (index) => {
    const colors = [
      'bg-gradient-to-br from-pink-500 to-pink-600',
      'bg-gradient-to-br from-blue-500 to-blue-600',
      'bg-gradient-to-br from-green-500 to-green-600',
      'bg-gradient-to-br from-purple-500 to-purple-600',
      'bg-gradient-to-br from-yellow-500 to-yellow-600',
      'bg-gradient-to-br from-red-500 to-red-600',
      'bg-gradient-to-br from-indigo-500 to-indigo-600',
      'bg-gradient-to-br from-teal-500 to-teal-600'
    ];
    return colors[index % colors.length];
  };

  const getAvatarInitials = (name) => {
    if (!name) return 'NA';
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  const getStatusColor = (status) => {
    switch(status?.toLowerCase()) {
      case 'pending':
      case 'absent':
        return darkMode ? 'bg-yellow-900/30 text-yellow-300' : 'bg-yellow-100 text-yellow-700';
      case 'overtime':
      case 'ot':
        return darkMode ? 'bg-purple-900/30 text-purple-300' : 'bg-purple-100 text-purple-700';
      case 'validated':
      case 'present':
      case 'approved':
        return darkMode ? 'bg-green-900/30 text-green-300' : 'bg-green-100 text-green-700';
      default:
        return darkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-700';
    }
  };

  // Export Functions
  const exportToExcel = (format = 'xlsx') => {
    try {
      // Get current tab data
      const currentData = attendanceData[tab === 'validate' ? 'toValidate' : tab === 'ot' ? 'overtime' : 'validated'];
      
      // Prepare data for Excel
      const excelData = currentData.map(item => ({
        'Employee ID': item.employee.match(/\(([^)]+)\)/)?.[1] || '',
        'Employee Name': item.employee.split('(')[0]?.trim() || item.employee,
        'Department': item.department,
        'Date': item.date,
        'Day': item.day,
        'Check-In': item.checkIn,
        'Check-Out': item.checkOut,
        'Batch': item.batch,
        'Status': item.statusText,
        'Attendance Type': item.attendanceType,
        'Confirmation Date': item.confirmation
      }));

      // Create worksheet
      const worksheet = XLSX.utils.json_to_sheet(excelData);
      
      // Create workbook
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Attendance Data');
      
      // Generate Excel file
      const excelBuffer = XLSX.write(workbook, { 
        bookType: format === 'csv' ? 'csv' : 'xlsx', 
        type: 'array' 
      });
      
      // Create blob and download
      const blob = new Blob(
        [excelBuffer], 
        { type: format === 'csv' ? 'text/csv;charset=utf-8;' : 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' }
      );
      
      const filename = `attendance_${tab}_${CURRENT_DATE}.${format === 'csv' ? 'csv' : 'xlsx'}`;
      saveAs(blob, filename);
      
      console.log(`${format.toUpperCase()} export completed successfully`);
    } catch (error) {
      console.error('Error exporting to Excel:', error);
      alert('Error exporting data. Please try again.');
    }
  };

  const exportToPDF = () => {
    try {
      // Get current tab data
      const currentData = attendanceData[tab === 'validate' ? 'toValidate' : tab === 'ot' ? 'overtime' : 'validated'];
      
      // Create PDF document
      const doc = new jsPDF();
      
      // Add header
      doc.setFontSize(20);
      doc.text(`Attendance Report - ${formatDate(CURRENT_DATE)}`, 14, 22);
      
      doc.setFontSize(12);
      doc.setTextColor(100);
      doc.text(`Category: ${tab === 'validate' ? 'To Validate (Absent)' : tab === 'ot' ? 'Overtime' : 'Validated (Present)'}`, 14, 32);
      doc.text(`Total Records: ${currentData.length}`, 14, 38);
      
      // Prepare table data
      const tableData = currentData.map(item => [
        item.employee.split('(')[0]?.trim() || item.employee,
        item.employee.match(/\(([^)]+)\)/)?.[1] || '',
        item.department,
        item.date,
        item.checkIn,
        item.checkOut,
        item.statusText,
        item.batch
      ]);
      
      // Add table
      autoTable(doc, {
        head: [['Employee Name', 'Employee ID', 'Department', 'Date', 'Check-In', 'Check-Out', 'Status', 'Batch']],
        body: tableData,
        startY: 45,
        styles: { fontSize: 9 },
        headStyles: { fillColor: [220, 220, 220] },
        columnStyles: {
          0: { cellWidth: 30 },
          1: { cellWidth: 20 },
          2: { cellWidth: 25 },
          3: { cellWidth: 25 },
          4: { cellWidth: 20 },
          5: { cellWidth: 20 },
          6: { cellWidth: 20 },
          7: { cellWidth: 20 }
        }
      });
      
      // Add footer
      const pageCount = doc.internal.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(10);
        doc.text(
          `Page ${i} of ${pageCount} • Generated on ${new Date().toLocaleDateString()} • HR System`,
          doc.internal.pageSize.width / 2,
          doc.internal.pageSize.height - 10,
          { align: 'center' }
        );
      }
      
      // Save PDF
      doc.save(`attendance_${tab}_${CURRENT_DATE}.pdf`);
      
      console.log('PDF export completed successfully');
    } catch (error) {
      console.error('Error exporting to PDF:', error);
      alert('Error generating PDF. Please try again.');
    }
  };

  const exportSelectedRows = (format = 'xlsx') => {
    try {
      const currentData = attendanceData[tab === 'validate' ? 'toValidate' : tab === 'ot' ? 'overtime' : 'validated'];
      
      // Get selected rows
      const selectedIndices = Object.keys(selectedRows).filter(key => selectedRows[key]);
      if (selectedIndices.length === 0) {
        alert('Please select at least one row to export.');
        return;
      }
      
      const selectedData = selectedIndices.map(index => currentData[index]);
      
      // Prepare data for Excel
      const excelData = selectedData.map(item => ({
        'Employee ID': item.employee.match(/\(([^)]+)\)/)?.[1] || '',
        'Employee Name': item.employee.split('(')[0]?.trim() || item.employee,
        'Department': item.department,
        'Date': item.date,
        'Day': item.day,
        'Check-In': item.checkIn,
        'Check-Out': item.checkOut,
        'Batch': item.batch,
        'Status': item.statusText,
        'Attendance Type': item.attendanceType
      }));

      // Create worksheet
      const worksheet = XLSX.utils.json_to_sheet(excelData);
      
      // Create workbook
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Selected Attendance Data');
      
      // Generate Excel file
      const excelBuffer = XLSX.write(workbook, { 
        bookType: format === 'csv' ? 'csv' : 'xlsx', 
        type: 'array' 
      });
      
      // Create blob and download
      const blob = new Blob(
        [excelBuffer], 
        { type: format === 'csv' ? 'text/csv;charset=utf-8;' : 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' }
      );
      
      const filename = `selected_attendance_${tab}_${CURRENT_DATE}.${format === 'csv' ? 'csv' : 'xlsx'}`;
      saveAs(blob, filename);
      
      console.log(`Selected rows ${format.toUpperCase()} export completed`);
    } catch (error) {
      console.error('Error exporting selected rows:', error);
      alert('Error exporting selected data.');
    }
  };

  // Filter data based on search query
  useEffect(() => {
    const currentData = attendanceData[tab === 'validate' ? 'toValidate' : tab === 'ot' ? 'overtime' : 'validated'];
    
    if (!searchQuery.trim()) {
      setFilteredData(currentData);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = currentData.filter(item =>
      item.employee.toLowerCase().includes(query) ||
      (item.department && item.department.toLowerCase().includes(query)) ||
      item.date.toLowerCase().includes(query) ||
      (item.batch && item.batch.toLowerCase().includes(query))
    );

    setFilteredData(filtered);
  }, [searchQuery, tab, attendanceData]);

  // Initialize filtered data
  useEffect(() => {
    const currentData = attendanceData[tab === 'validate' ? 'toValidate' : tab === 'ot' ? 'overtime' : 'validated'];
    setFilteredData(currentData);
  }, [tab, attendanceData]);

  // Fetch data on component mount
  useEffect(() => {
    fetchAttendanceData();
  }, []);

  // UI Handlers
  const handleSelectAll = () => {
    const newSel = {};
    filteredData.forEach((_, i) => (newSel[i] = !selectedAll));
    setSelectedRows(newSel);
    setSelectedAll(!selectedAll);
  };

  const handleSelectRow = (i) => {
    const newSel = { ...selectedRows, [i]: !selectedRows[i] };
    setSelectedRows(newSel);
    setSelectedAll(Object.values(newSel).every((v) => v));
  };

  const handleRefresh = () => {
    fetchAttendanceData();
  };

  const handleValidateAttendance = (id) => {
    console.log('Validating attendance ID:', id);
    // Implement validation logic here
    const updatedData = filteredData.map(item => 
      item.id === id ? { ...item, status: 'validated', statusText: 'Validated' } : item
    );
    
    if (tab === 'validate') {
      setAttendanceData(prev => ({
        ...prev,
        toValidate: prev.toValidate.filter(item => item.id !== id),
        validated: [...prev.validated, {...filteredData.find(item => item.id === id), status: 'validated', statusText: 'Validated'}]
      }));
    }
  };

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  // Render loading state
  if (loading) {
    return (
      <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gradient-to-br from-gray-50/50 via-white to-blue-50/30'} p-4 lg:p-6 flex items-center justify-center`}>
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin mx-auto" style={{ color: theme.accent }} />
          <p className="mt-4 text-gray-600 dark:text-gray-300">Loading attendance data...</p>
        </div>
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gradient-to-br from-gray-50/50 via-white to-blue-50/30'} p-4 lg:p-6`}>
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl p-6 mb-6">
          <div className="flex items-center gap-3">
            <AlertCircle className="h-6 w-6 text-red-600 dark:text-red-400" />
            <div>
              <h3 className="font-medium text-red-800 dark:text-red-300">Error Loading Data</h3>
              <p className="text-sm text-red-600 dark:text-red-400 mt-1">{error}</p>
              <p className="text-sm text-red-600 dark:text-red-400">Showing fallback data instead.</p>
            </div>
          </div>
          <button
            onClick={handleRefresh}
            style={{ backgroundColor: theme.accent }}
            className="mt-4 px-4 py-2 text-white rounded-lg hover:opacity-90 flex items-center gap-2"
          >
            <RefreshCw className="h-4 w-4" /> Try Again
          </button>
        </div>
      </div>
    );
  }

  const data = filteredData;

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gradient-to-br from-gray-50/50 via-white to-blue-50/30'} p-4 lg:p-6 transition-colors duration-200`}>
      {/* HEADER */}
      <div className="mb-6 lg:mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <h1 className={`text-2xl lg:text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Attendance Management
              </h1>
              <button
                onClick={handleRefresh}
                className={`p-2 ${darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'} rounded-xl transition-colors`}
                title="Refresh data"
              >
                <RefreshCw className={`h-5 w-5 ${darkMode ? 'text-gray-300' : 'text-gray-600'} ${loading ? 'animate-spin' : ''}`} />
              </button>
            </div>
            <p className={`mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Showing data for {formatDate(CURRENT_DATE)} • Last updated: Just now
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
              <input
                type="text"
                placeholder="Search attendance..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`pl-10 pr-4 py-2 ${darkMode ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500' : 'border-gray-300 bg-white text-gray-900'} border rounded-xl text-sm focus:outline-none focus:ring-2 ${themeClasses.ringColor} focus:border-transparent w-full lg:w-64`}
              />
            </div>
            
            <button
              onClick={toggleDarkMode}
              className={`p-2 ${darkMode ? 'bg-gray-800 hover:bg-gray-700 text-yellow-400' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'} rounded-xl transition-colors`}
              title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            
            <button className={`p-2 ${darkMode ? 'hover:bg-gray-800' : themeClasses.lightBg + ' hover:opacity-90'} ${themeClasses.textColor} rounded-xl`}>
              <Filter className="h-5 w-5" />
            </button>
            
            <div className="relative" ref={exportMenuRef}>
              <button 
                onClick={() => setShowExportMenu(!showExportMenu)}
                className={`p-2 ${darkMode ? 'hover:bg-gray-800' : themeClasses.lightBg + ' hover:opacity-90'} ${themeClasses.textColor} rounded-xl flex items-center gap-2`}
              >
                <Download className="h-5 w-5" />
                <span className="hidden lg:inline text-sm font-medium">Export</span>
                <ChevronDown className="h-4 w-4" />
              </button>
              
              {showExportMenu && (
                <div className={`absolute right-0 mt-2 w-56 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl shadow-lg border py-2 z-50`}>
                  <div className={`px-4 py-2 text-xs font-medium ${darkMode ? 'text-gray-400 border-gray-700' : 'text-gray-500 border-gray-100'} border-b`}>
                    Export Options
                  </div>
                  
                  <button
                    onClick={() => {
                      exportToExcel('xlsx');
                      setShowExportMenu(false);
                    }}
                    className={`w-full text-left px-4 py-2.5 text-sm ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'} flex items-center gap-2`}
                  >
                    <FileSpreadsheet className="h-4 w-4 text-green-500" />
                    Export to Excel (.xlsx)
                  </button>
                  
                  <button
                    onClick={() => {
                      exportToExcel('csv');
                      setShowExportMenu(false);
                    }}
                    className={`w-full text-left px-4 py-2.5 text-sm ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'} flex items-center gap-2`}
                  >
                    <FileText className="h-4 w-4 text-blue-500" />
                    Export to CSV (.csv)
                  </button>
                  
                  <button
                    onClick={() => {
                      exportToPDF();
                      setShowExportMenu(false);
                    }}
                    className={`w-full text-left px-4 py-2.5 text-sm ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'} flex items-center gap-2`}
                  >
                    <FileText className="h-4 w-4 text-red-500" />
                    Export to PDF (.pdf)
                  </button>
                  
                  <div className={`border-t ${darkMode ? 'border-gray-700' : 'border-gray-100'} mt-2 pt-2`}>
                    <button
                      onClick={() => {
                        exportSelectedRows('xlsx');
                        setShowExportMenu(false);
                      }}
                      className={`w-full text-left px-4 py-2.5 text-sm ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'} flex items-center gap-2`}
                    >
                      <Clipboard className="h-4 w-4" style={{ color: theme.accent }} />
                      Export Selected Rows
                    </button>
                  </div>
                </div>
              )}
            </div>
            
            <button className={`relative p-2 ${darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'} rounded-xl`}>
              <Bell className="h-5 w-5" style={{ color: darkMode ? '#d1d5db' : '#4b5563' }} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex items-center gap-2 mt-6 overflow-x-auto scrollbar-hide">
          <div className={`flex items-center gap-2 p-1 ${darkMode ? 'bg-gray-800' : 'bg-gray-100'} rounded-xl`}>
            <button
              onClick={() => setViewMode('table')}
              className={`px-3 py-1.5 text-sm rounded-lg flex items-center gap-2 ${
                viewMode === 'table' 
                  ? darkMode ? 'bg-gray-700' : 'bg-white shadow-sm' 
                  : darkMode ? 'text-gray-400' : 'text-gray-600'
              }`}
            >
              <BarChart3 className="h-4 w-4" /> Table
            </button>
            <button
              onClick={() => setViewMode('card')}
              className={`px-3 py-1.5 text-sm rounded-lg flex items-center gap-2 ${
                viewMode === 'card' 
                  ? darkMode ? 'bg-gray-700' : 'bg-white shadow-sm' 
                  : darkMode ? 'text-gray-400' : 'text-gray-600'
              }`}
            >
              <Users className="h-4 w-4" /> Cards
            </button>
          </div>
          
          <div className={`flex items-center gap-1 border ${darkMode ? 'border-gray-700 bg-gray-800 text-gray-300' : 'border-gray-300 bg-white text-gray-700'} rounded-xl px-3 py-2`}>
            <Calendar className="h-4 w-4" style={{ color: darkMode ? '#9ca3af' : '#6b7280' }} />
            <span className="text-sm">{formatDate(CURRENT_DATE)}</span>
          </div>
          
          {['all', 'today', 'week', 'month'].map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-xl text-sm font-medium capitalize whitespace-nowrap ${
                activeFilter === filter
                  ? `bg-gradient-to-r ${theme.button || 'from-orange-500 to-orange-600'} ${theme.buttonHover || 'hover:from-orange-600 hover:to-orange-700'} text-white`
                  : darkMode 
                    ? 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700'
                    : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-300'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6 lg:mb-8">
        {Object.entries(summaryData).map(([key, value]) => (
          <div key={key} className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200/50'} rounded-2xl p-5 lg:p-6 shadow-lg border hover:shadow-xl transition-shadow`}>
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 ${
                key === 'toValidate' ? darkMode ? 'bg-yellow-900/30' : 'bg-yellow-50' :
                key === 'overtime' ? darkMode ? 'bg-purple-900/30' : 'bg-purple-50' :
                key === 'validated' ? darkMode ? 'bg-green-900/30' : 'bg-green-50' :
                darkMode ? 'bg-gray-700' : themeClasses.lightBg
              } rounded-xl`}>
                {key === 'toValidate' ? <AlertCircle className={`h-6 w-6 ${darkMode ? 'text-yellow-400' : 'text-yellow-600'}`} /> :
                 key === 'overtime' ? <Clock className={`h-6 w-6 ${darkMode ? 'text-purple-400' : 'text-purple-600'}`} /> :
                 key === 'validated' ? <UserCheck className={`h-6 w-6 ${darkMode ? 'text-green-400' : 'text-green-600'}`} /> :
                 <AlertCircle className={`h-6 w-6 ${themeClasses.textColor}`} />
                }
              </div>
              <div className={`flex items-center text-sm font-medium ${
                key === 'toValidate' ? darkMode ? 'text-yellow-400' : 'text-yellow-600' :
                key === 'overtime' ? darkMode ? 'text-purple-400' : 'text-purple-600' :
                key === 'validated' ? darkMode ? 'text-green-400' : 'text-green-600' :
                themeClasses.textColor
              }`}>
                {value.trend === 'up' ? 
                  <TrendingUp className="h-4 w-4 mr-1" /> : 
                  value.trend === 'down' ?
                  <TrendingDown className="h-4 w-4 mr-1" /> :
                  null
                }
                {value.change}
              </div>
            </div>
            <h3 className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'} mb-1`}>
              {key === 'toValidate' ? 'To Validate (Absent)' :
               key === 'overtime' ? 'Overtime' :
               key === 'validated' ? 'Validated (Present)' : 'Pending Action'}
            </h3>
            <div className="flex items-baseline gap-2">
              <p className={`text-2xl lg:text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{value.count}</p>
              <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                {key === 'toValidate' || key === 'validated' ? 'attendance' : 'records'}
              </span>
            </div>
            <div className={`mt-4 pt-4 border-t ${darkMode ? 'border-gray-700' : 'border-gray-100'}`}>
              <button 
                onClick={() => setTab(key === 'pending' ? 'validate' : key.replace(/([A-Z])/g, '$1').toLowerCase())}
                className={`text-sm font-medium ${themeClasses.textColor} hover:opacity-90 flex items-center`}
              >
                View all <ArrowRight className="h-4 w-4 ml-1" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* TABS */}
      <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200/50'} rounded-2xl shadow-lg border mb-6`}>
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 p-6">
          <div className="flex items-center gap-6">
            <div className={`flex gap-1 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              {[
                { key: 'validate', label: 'To Validate (Absent)', icon: <AlertCircle className="h-4 w-4" />, count: attendanceData.toValidate.length },
                { key: 'ot', label: 'Overtime', icon: <Clock className="h-4 w-4" />, count: attendanceData.overtime.length },
                { key: 'validated', label: 'Validated (Present)', icon: <UserCheck className="h-4 w-4" />, count: attendanceData.validated.length },
              ].map((t) => (
                <button
                  key={t.key}
                  onClick={() => {
                    setTab(t.key);
                    setSelectedAll(false);
                    setSelectedRows({});
                    setSearchQuery('');
                  }}
                  className={`flex items-center gap-2 px-4 py-3 font-medium border-b-2 transition-colors ${
                    tab === t.key
                      ? `${themeClasses.borderColor} ${themeClasses.textColor}`
                      : darkMode ? 'border-transparent text-gray-400 hover:text-gray-300' : 'border-transparent text-gray-600 hover:text-gray-800'
                  }`}
                >
                  {t.icon}
                  {t.label}
                  <span className={`ml-2 px-2 py-0.5 text-xs font-medium rounded-full ${
                    tab === t.key 
                      ? darkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'
                      : darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {t.count}
                  </span>
                </button>
              ))}
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            {data.length > 0 && (
              <button
                onClick={handleSelectAll}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedAll
                    ? 'bg-green-600 text-white hover:bg-green-700'
                    : darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : `${themeClasses.lightBg} ${themeClasses.textColor} hover:opacity-90`
                }`}
              >
                {selectedAll ? 'Deselect All' : 'Select All'}
              </button>
            )}
            
            {Object.keys(selectedRows).some(key => selectedRows[key]) && (
              <button
                onClick={() => exportSelectedRows('xlsx')}
                className={`px-4 py-2 ${theme.button ? `bg-gradient-to-r ${theme.button}` : 'bg-gradient-to-r from-orange-500 to-orange-600'} text-white rounded-lg text-sm font-medium flex items-center gap-2 hover:opacity-90`}
              >
                <Clipboard className="h-4 w-4" />
                Export Selected ({Object.values(selectedRows).filter(v => v).length})
              </button>
            )}
            
            <button className={`p-2 ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} rounded-xl`}>
              <MoreVertical className="h-5 w-5" style={{ color: darkMode ? '#d1d5db' : '#4b5563' }} />
            </button>
          </div>
        </div>
      </div>

      {/* Empty State */}
      {data.length === 0 ? (
        <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200/50'} rounded-2xl shadow-lg border p-12 text-center`}>
          <div className="max-w-md mx-auto">
            <div className={`w-16 h-16 ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
              <Users className="h-8 w-8" style={{ color: darkMode ? '#9ca3af' : '#d1d5db' }} />
            </div>
            <h3 className={`text-lg font-medium ${darkMode ? 'text-white' : 'text-gray-900'} mb-2`}>
              No attendance records found
            </h3>
            <p className={`mb-6 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {searchQuery ? 'No records match your search.' : `No ${tab === 'validate' ? 'absent employees' : tab} records for today.`}
            </p>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className={`px-4 py-2 ${darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'} rounded-lg`}
              >
                Clear search
              </button>
            )}
          </div>
        </div>
      ) : (
        <>
          {/* TABLE VIEW */}
          {viewMode === 'table' && (
            <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200/50'} rounded-2xl shadow-lg border overflow-hidden`}>
              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className={`${darkMode ? 'bg-gray-700/50 border-gray-600' : themeClasses.lightBg + ' border-gray-200'} border-b`}>
                    <tr>
                      <th className="px-6 py-4 text-left">
                        <input
                          type="checkbox"
                          checked={selectedAll}
                          onChange={handleSelectAll}
                          className={`rounded ${darkMode ? 'border-gray-600 bg-gray-700' : 'border-gray-300'} ${themeClasses.textColor} focus:${themeClasses.ringColor}`}
                        />
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold" style={{ color: darkMode ? '#e5e7eb' : '#111827' }}>Employee</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold" style={{ color: darkMode ? '#e5e7eb' : '#111827' }}>Batch</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold" style={{ color: darkMode ? '#e5e7eb' : '#111827' }}>Date</th>
                      <th className="px 6 py-4 text-left text-sm font-semibold" style={{ color: darkMode ? '#e5e7eb' : '#111827' }}>Day</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold" style={{ color: darkMode ? '#e5e7eb' : '#111827' }}>Check-In</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold" style={{ color: darkMode ? '#e5e7eb' : '#111827' }}>Check-Out</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold" style={{ color: darkMode ? '#e5e7eb' : '#111827' }}>
                        {tab === 'validate' ? 'Status' : tab === 'ot' ? 'Overtime Status' : 'Attendance Status'}
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold" style={{ color: darkMode ? '#e5e7eb' : '#111827' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody className={`divide-y ${darkMode ? 'divide-gray-700' : 'divide-gray-200'}`}>
                    {data.map((row, i) => (
                      <tr key={row.id} className={darkMode ? 'hover:bg-gray-700/30 transition-colors' : 'hover:bg-gray-50/50 transition-colors'}>
                        <td className="px-6 py-4">
                          <input
                            type="checkbox"
                            checked={selectedRows[i] || false}
                            onChange={() => handleSelectRow(i)}
                            className={`rounded ${darkMode ? 'border-gray-600 bg-gray-700' : 'border-gray-300'} ${themeClasses.textColor} focus:${themeClasses.ringColor}`}
                          />
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 ${row.avatarColor} rounded-xl flex items-center justify-center`}>
                              <span className="text-white font-medium">{getAvatarInitials(row.employee)}</span>
                            </div>
                            <div>
                              <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{row.employee}</p>
                              <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{row.department}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                            row.batch === 'None' 
                              ? darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                              : darkMode ? 'bg-blue-900/30 text-blue-300' : 'bg-blue-100 text-blue-700'
                          }`}>
                            {row.batch}
                          </span>
                        </td>
                        <td className={`px-6 py-4 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{row.date}</td>
                        <td className={`px-6 py-4 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{row.day}</td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium ${
                            row.checkIn !== '--:--' 
                              ? darkMode ? 'bg-green-900/30 text-green-300' : 'bg-green-100 text-green-700'
                              : darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                          }`}>
                            <Clock className="h-4 w-4 mr-1" /> {row.checkIn}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium ${
                            row.checkOut !== '--:--' 
                              ? darkMode ? 'bg-blue-900/30 text-blue-300' : 'bg-blue-100 text-blue-700'
                              : darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                          }`}>
                            <Clock className="h-4 w-4 mr-1" /> {row.checkOut}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(row.status)}`}>
                              {row.statusText}
                            </span>
                            {tab === 'validate' && (
                              <button 
                                onClick={() => handleValidateAttendance(row.id)}
                                className={`px-3 py-1.5 ${theme.button ? `bg-gradient-to-r ${theme.button}` : 'bg-gradient-to-r from-orange-500 to-orange-600'} text-white text-sm font-medium rounded-lg flex items-center gap-1 hover:opacity-90`}
                              >
                                <CheckCircle className="h-3 w-3" /> Mark Present
                              </button>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <button className={`p-2 ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} rounded-lg transition-colors`}>
                              <Eye className="h-4 w-4" style={{ color: darkMode ? '#d1d5db' : '#4b5563' }} />
                            </button>
                            <button className={`p-2 ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} rounded-lg transition-colors`}>
                              <Edit2 className="h-4 w-4" style={{ color: darkMode ? '#d1d5db' : '#4b5563' }} />
                            </button>
                            <button className={`p-2 ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} rounded-lg transition-colors`}>
                              <Trash2 className="h-4 w-4 text-red-500" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className={`border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'} px-6 py-4`}>
                <div className="flex items-center justify-between">
                  <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Showing <span className="font-medium">{data.length}</span> of{' '}
                    <span className="font-medium">{data.length}</span> records
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setPage(Math.max(1, page - 1))}
                        disabled={page === 1}
                        className={`p-2 ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} rounded-xl disabled:opacity-50`}
                      >
                        <ChevronLeft className="h-4 w-4" style={{ color: darkMode ? '#9ca3af' : '#6b7280' }} />
                      </button>
                      
                      <div className="flex items-center gap-2">
                        {[1, 2, 3].map(p => (
                          <button
                            key={p}
                            onClick={() => setPage(p)}
                            className={`w-10 h-10 rounded-lg font-medium ${
                              page === p
                                ? `bg-gradient-to-r ${theme.button || 'from-orange-500 to-orange-600'} text-white`
                                : darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'
                            }`}
                          >
                            {p}
                          </button>
                        ))}
                      </div>
                      
                      <button
                        onClick={() => setPage(Math.min(totalPages, page + 1))}
                        disabled={page === totalPages}
                        className={`p-2 ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} rounded-xl disabled:opacity-50`}
                      >
                        <ChevronRight className="h-4 w-4" style={{ color: darkMode ? '#9ca3af' : '#6b7280' }} />
                      </button>
                    </div>
                    
                    <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
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
                <div key={row.id} className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200/50'} rounded-2xl shadow-lg border p-6`}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 ${row.avatarColor} rounded-xl flex items-center justify-center`}>
                        <span className="text-white text-lg font-bold">{getAvatarInitials(row.employee)}</span>
                      </div>
                      <div>
                        <h3 className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                          {row.employee.split('(')[0]?.trim() || row.employee}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                          <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{row.department}</span>
                          <span className={`text-xs ${darkMode ? 'text-gray-600' : 'text-gray-400'}`}>•</span>
                          <span className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                            {row.employee.match(/\(([^)]+)\)/)?.[1] || ''}
                          </span>
                        </div>
                      </div>
                    </div>
                    <button className={`p-2 ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} rounded-xl`}>
                      <MoreVertical className="h-5 w-5" style={{ color: darkMode ? '#d1d5db' : '#4b5563' }} />
                    </button>
                  </div>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center justify-between">
                      <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Date</span>
                      <span className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{row.date}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Day</span>
                      <span className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{row.day}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Check-In</span>
                      <span className={`inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium ${
                        row.checkIn !== '--:--' 
                          ? darkMode ? 'bg-green-900/30 text-green-300' : 'bg-green-100 text-green-700'
                          : darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                      }`}>
                        <Clock className="h-4 w-4 mr-1" /> {row.checkIn}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Check-Out</span>
                      <span className={`inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium ${
                        row.checkOut !== '--:--' 
                          ? darkMode ? 'bg-blue-900/30 text-blue-300' : 'bg-blue-100 text-blue-700'
                          : darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                      }`}>
                        <Clock className="h-4 w-4 mr-1" /> {row.checkOut}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Batch</span>
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                        row.batch === 'None' 
                          ? darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                          : darkMode ? 'bg-blue-900/30 text-blue-300' : 'bg-blue-100 text-blue-700'
                      }`}>
                        {row.batch}
                      </span>
                    </div>
                  </div>
                  
                  <div className={`flex items-center justify-between pt-4 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                    <div>
                      <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Status</span>
                      <p className={`text-sm font-medium ${getStatusColor(row.status)} rounded-full px-3 py-1 inline-block`}>
                        {row.statusText}
                      </p>
                    </div>
                    
                    {tab === 'validate' ? (
                      <button 
                        onClick={() => handleValidateAttendance(row.id)}
                        className={`px-4 py-2 ${theme.button ? `bg-gradient-to-r ${theme.button}` : 'bg-gradient-to-r from-orange-500 to-orange-600'} text-white text-sm font-medium rounded-lg flex items-center gap-2 hover:opacity-90`}
                      >
                        <CheckCircle className="h-4 w-4" /> Mark Present
                      </button>
                    ) : (
                      <div className="flex items-center gap-2">
                        <button className={`p-2 ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} rounded-lg`}>
                          <Eye className="h-4 w-4" style={{ color: darkMode ? '#d1d5db' : '#4b5563' }} />
                        </button>
                        <button className={`p-2 ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} rounded-lg`}>
                          <Edit2 className="h-4 w-4" style={{ color: darkMode ? '#d1d5db' : '#4b5563' }} />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}