
// 'use client';

// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';
// import { fetchEmployees } from './store/slices/employeeSlice';
// import {
//   Calendar, User, MapPin, Globe, Briefcase, Clock, Users, DollarSign,
//   Edit2, Phone, Mail, Building, FileText, Badge, Smartphone, MoreVertical,
//   Menu, X, ArrowLeft, Shield, Home
// } from 'lucide-react';
// import { useTheme } from './ThemeContext';
// import { motion, AnimatePresence } from 'framer-motion';

// export default function Profile() {
//   const { getThemeClasses } = useTheme();
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { employees, loading } = useSelector((state) => state.employees);

//   // Get theme classes
//   const themeClasses = getThemeClasses();

//   // Find employee by ID
//   const employee = employees.find(emp => emp.id === parseInt(id)) || {
//     name: 'Unknown Employee',
//     code: 'N/A',
//     department: 'N/A',
//     email: 'Not available',
//     phone: 'Not available',
//     workEmail: 'Not available',
//     personalEmail: 'Not available',
//     workPhone: 'Not available',
//     personalPhone: 'Not available',
//     status: 'offline',
//     position: 'N/A',
//     workType: 'N/A',
//     joinDate: 'N/A',
//     dob: 'N/A',
//     address: 'Not available',
//     emergencyContact: 'Not available',
//     photo: null,
//     gender: 'N/A',
//     country: 'N/A',
//     shift: 'N/A',
//     company: 'N/A',
//     manager: 'N/A',
//     salary: 'N/A',
//     badgeId: 'N/A',
//     documents: []
//   };

//   // State for UI
//   const [activeTab, setActiveTab] = useState('about');
//   const [showMobileMenu, setShowMobileMenu] = useState(false);
//   const [isMobile, setIsMobile] = useState(false);

//   // Responsive detection
//   useEffect(() => {
//     const checkScreenSize = () => {
//       setIsMobile(window.innerWidth < 768);
//     };
//     checkScreenSize();
//     window.addEventListener('resize', checkScreenSize);
//     return () => window.removeEventListener('resize', checkScreenSize);
//   }, []);

//   // Fetch employees if not already loaded
//   useEffect(() => {
//     if (employees.length === 0) {
//       dispatch(fetchEmployees());
//     }
//   }, [dispatch, employees.length]);

//   // Format date helper
//   const formatDate = (dateString) => {
//     if (!dateString || dateString === 'N/A') return 'N/A';
//     try {
//       const date = new Date(dateString);
//       return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
//     } catch {
//       return dateString;
//     }
//   };

//   // Get initials for avatar
//   const getInitials = (name) => {
//     if (!name || name === 'Unknown Employee') return 'E';
//     return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
//   };

//   // Loading state
//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-white flex flex-col lg:flex-row overflow-hidden">
//       {/* SIDEBAR - Desktop */}
//       <div className="hidden lg:flex flex-col w-64 border-r border-gray-200 bg-white">
//         {/* Employee Info Card */}
//         <div className="p-6 border-b border-gray-200">
//           <div className="flex flex-col items-center">
//             <div className={`w-20 h-20 rounded-full ${themeClasses.buttonBg} flex items-center justify-center text-white text-2xl font-bold mb-4`}>
//               {getInitials(employee.name)}
//             </div>
//             <h2 className="text-xl font-bold text-gray-900 text-center">{employee.name}</h2>
//             <p className="text-sm text-gray-500 mt-1">{employee.code}</p>
//             <div className="flex items-center gap-2 mt-3">
//               <div className={`px-3 py-1 ${themeClasses.lightBg} ${themeClasses.textColor} rounded-full text-xs font-medium`}>
//                 {employee.department}
//               </div>
//               <div className={`w-2 h-2 rounded-full ${employee.status === 'online' ? 'bg-green-500' : 'bg-gray-400'}`}></div>
//             </div>
//           </div>
//         </div>

//         {/* Navigation */}
//         <div className="flex-1 overflow-y-auto p-4">
//           <nav className="space-y-1">
//             {['about', 'work', 'attendance', 'leave', 'payroll', 'allowance', 'penalty', 'performance', 'documents'].map((tab) => (
//               <button
//                 key={tab}
//                 onClick={() => setActiveTab(tab)}
//                 className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
//                   activeTab === tab
//                     ? `${themeClasses.lightBg} ${themeClasses.textColor}`
//                     : 'text-gray-600 hover:bg-gray-100'
//                 }`}
//               >
//                 {getTabIcon(tab)}
//                 <span className="font-medium capitalize">
//                   {tab === 'allowance' ? 'Allowance & Deduction' : 
//                    tab === 'penalty' ? 'Penalty Account' : tab}
//                 </span>
//               </button>
//             ))}
//           </nav>
//         </div>

//         {/* Quick Actions */}
//         <div className="p-4 border-t border-gray-200">
//           <button className={`w-full py-2.5 ${themeClasses.buttonBg} text-white rounded-lg font-medium text-sm`}>
//             Edit Profile
//           </button>
//         </div>
//       </div>

//       {/* MAIN CONTENT AREA */}
//       <div className="flex-1 flex flex-col overflow-hidden">
//         {/* MOBILE HEADER */}
//         {isMobile && (
//           <div className="sticky top-0 z-10 bg-white border-b border-gray-200 px-4 py-3">
//             <div className="flex items-center justify-between">
//               <div className="flex items-center gap-3">
//                 <button 
//                   onClick={() => navigate('/employee')}
//                   className="p-2 hover:bg-gray-100 rounded-lg"
//                 >
//                   <ArrowLeft className="h-5 w-5 text-gray-600" />
//                 </button>
//                 <div>
//                   <h1 className="text-lg font-bold text-gray-900">Employee</h1>
//                   <p className="text-xs text-gray-500">{employee.code}</p>
//                 </div>
//               </div>
//               <button 
//                 onClick={() => setShowMobileMenu(!showMobileMenu)}
//                 className="p-2 hover:bg-gray-100 rounded-lg"
//               >
//                 {showMobileMenu ? <X className="h-5 w-5 text-gray-600" /> : <Menu className="h-5 w-5 text-gray-600" />}
//               </button>
//             </div>
//           </div>
//         )}

//         {/* MOBILE MENU DRAWER */}
//         <AnimatePresence>
//           {showMobileMenu && isMobile && (
//             <motion.div
//               initial={{ x: '100%' }}
//               animate={{ x: 0 }}
//               exit={{ x: '100%' }}
//               className="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden"
//               onClick={() => setShowMobileMenu(false)}
//             >
//               <motion.div
//                 initial={{ x: '100%' }}
//                 animate={{ x: 0 }}
//                 exit={{ x: '100%' }}
//                 className="absolute right-0 top-0 bottom-0 w-64 bg-white shadow-xl"
//                 onClick={(e) => e.stopPropagation()}
//               >
//                 <div className="p-4 border-b border-gray-200">
//                   <div className="flex items-center justify-between mb-4">
//                     <h2 className="font-bold text-gray-900">Menu</h2>
//                     <button onClick={() => setShowMobileMenu(false)}>
//                       <X className="h-5 w-5 text-gray-500" />
//                     </button>
//                   </div>
//                   <div className="flex items-center gap-3">
//                     <div className={`w-12 h-12 rounded-full ${themeClasses.buttonBg} flex items-center justify-center text-white font-bold`}>
//                       {getInitials(employee.name)}
//                     </div>
//                     <div>
//                       <p className="font-medium text-gray-900">{employee.name}</p>
//                       <p className="text-xs text-gray-500">{employee.code}</p>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="p-4 overflow-y-auto h-[calc(100vh-180px)]">
//                   <nav className="space-y-1">
//                     {['about', 'work', 'attendance', 'leave', 'payroll', 'allowance', 'penalty', 'performance', 'documents'].map((tab) => (
//                       <button
//                         key={tab}
//                         onClick={() => {
//                           setActiveTab(tab);
//                           setShowMobileMenu(false);
//                         }}
//                         className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
//                           activeTab === tab
//                             ? `${themeClasses.lightBg} ${themeClasses.textColor}`
//                             : 'text-gray-600 hover:bg-gray-100'
//                         }`}
//                       >
//                         {getTabIcon(tab)}
//                         <span className="font-medium capitalize">
//                           {tab === 'allowance' ? 'Allowance & Deduction' : 
//                            tab === 'penalty' ? 'Penalty Account' : tab}
//                         </span>
//                       </button>
//                     ))}
//                   </nav>
//                 </div>
//               </motion.div>
//             </motion.div>
//           )}
//         </AnimatePresence>

//         {/* CONTENT HEADER */}
//         <div className="border-b border-gray-200 px-4 lg:px-6 py-4">
//           <h2 className="text-xl lg:text-2xl font-bold text-gray-900 capitalize">
//             {activeTab === 'allowance' ? 'Allowance & Deduction' : 
//              activeTab === 'penalty' ? 'Penalty Account' : activeTab}
//           </h2>
//           {!isMobile && (
//             <p className="text-gray-600 mt-1">Employee ID: {employee.code}</p>
//           )}
//         </div>

//         {/* SCROLLABLE CONTENT AREA */}
//         <div className="flex-1 overflow-y-auto">
//           <div className="p-4 lg:p-6">
//             {activeTab === 'about' ? (
//               <div className="space-y-6">
//                 {/* Personal Information */}
//                 <InfoSection 
//                   title="Personal Information" 
//                   icon={<User className="h-5 w-5" />}
//                   themeClasses={themeClasses}
//                 >
//                   <InfoItem label="Date of Birth" value={formatDate(employee.dob)} />
//                   <InfoItem label="Gender" value={employee.gender} />
//                   <InfoItem label="Address" value={employee.address} />
//                   <InfoItem label="Country" value={employee.country} />
//                   <InfoItem label="Phone" value={employee.phone} />
//                   <InfoItem label="Email" value={employee.email} />
//                 </InfoSection>

//                 {/* Work Information */}
//                 <InfoSection 
//                   title="Work Information" 
//                   icon={<Briefcase className="h-5 w-5" />}
//                   themeClasses={themeClasses}
//                 >
//                   <InfoItem label="Department" value={employee.department} />
//                   <InfoItem label="Job Position" value={employee.position} />
//                   <InfoItem label="Shift" value={employee.shift} />
//                   <InfoItem label="Work Type" value={employee.workType} />
//                   <InfoItem label="Badge ID" value={employee.badgeId} />
//                 </InfoSection>

//                 {/* Contract & Bank */}
//                 <InfoSection 
//                   title="Contract & Bank" 
//                   icon={<FileText className="h-5 w-5" />}
//                   themeClasses={themeClasses}
//                 >
//                   <InfoItem label="Salary" value={employee.salary} />
//                   <InfoItem label="Joining Date" value={formatDate(employee.joinDate)} />
//                   <InfoItem label="Company" value={employee.company} />
//                   <InfoItem label="Manager" value={employee.manager} />
//                   <InfoItem label="Emergency Contact" value={employee.emergencyContact} />
//                 </InfoSection>
//               </div>
//             ) : (
//               <div className="bg-white rounded-lg border border-gray-200 p-6">
//                 <div className="text-center py-12">
//                   <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
//                     <FileText className="h-8 w-8 text-gray-400" />
//                   </div>
//                   <h3 className="text-lg font-bold text-gray-800 mb-2 capitalize">
//                     {activeTab === 'allowance' ? 'Allowance & Deduction' : 
//                      activeTab === 'penalty' ? 'Penalty Account' : activeTab}
//                   </h3>
//                   <p className="text-gray-500 max-w-md mx-auto">
//                     This section is under development. Content will be available soon.
//                   </p>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* MOBILE BOTTOM NAV */}
//         {isMobile && (
//           <div className="sticky bottom-0 bg-white border-t border-gray-200 px-4 py-2">
//             <div className="flex items-center justify-around">
//               <NavButton
//                 active={activeTab === 'about'}
//                 onClick={() => setActiveTab('about')}
//                 icon={<User className="h-5 w-5" />}
//                 label="About"
//                 themeClasses={themeClasses}
//               />
//               <NavButton
//                 active={activeTab === 'work'}
//                 onClick={() => setActiveTab('work')}
//                 icon={<Briefcase className="h-5 w-5" />}
//                 label="Work"
//                 themeClasses={themeClasses}
//               />
//               <NavButton
//                 active={activeTab === 'attendance'}
//                 onClick={() => setActiveTab('attendance')}
//                 icon={<Calendar className="h-5 w-5" />}
//                 label="Attendance"
//                 themeClasses={themeClasses}
//               />
//               <NavButton
//                 active={activeTab === 'payroll'}
//                 onClick={() => setActiveTab('payroll')}
//                 icon={<DollarSign className="h-5 w-5" />}
//                 label="Payroll"
//                 themeClasses={themeClasses}
//               />
//               <button
//                 onClick={() => setShowMobileMenu(true)}
//                 className="flex flex-col items-center p-2"
//               >
//                 <MoreVertical className="h-5 w-5 text-gray-500" />
//                 <span className="text-xs text-gray-500 mt-1">More</span>
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// // Helper function for tab icons
// function getTabIcon(tab) {
//   const iconClass = "h-5 w-5";
//   switch(tab) {
//     case 'about': return <User className={iconClass} />;
//     case 'work': return <Briefcase className={iconClass} />;
//     case 'attendance': return <Calendar className={iconClass} />;
//     case 'leave': return <Shield className={iconClass} />;
//     case 'payroll': return <DollarSign className={iconClass} />;
//     case 'allowance': return <Users className={iconClass} />;
//     case 'penalty': return <FileText className={iconClass} />;
//     case 'performance': return <Smartphone className={iconClass} />;
//     case 'documents': return <FileText className={iconClass} />;
//     default: return <User className={iconClass} />;
//   }
// }

// // Info Section Component
// function InfoSection({ title, icon, children, themeClasses }) {
//   return (
//     <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
//       <div className={`px-4 py-3 ${themeClasses.lightBg} border-b border-gray-200`}>
//         <div className="flex items-center gap-2">
//           <div className={themeClasses.textColor}>
//             {icon}
//           </div>
//           <h3 className="font-bold text-gray-900">{title}</h3>
//         </div>
//       </div>
//       <div className="p-4">
//         {children}
//       </div>
//     </div>
//   );
// }

// // Info Item Component
// function InfoItem({ label, value }) {
//   return (
//     <div className="flex justify-between items-center py-3 border-b border-gray-100 last:border-0">
//       <span className="text-sm text-gray-600">{label}</span>
//       <span className="font-medium text-gray-900 text-sm">{value}</span>
//     </div>
//   );
// }

// // Mobile Navigation Button
// function NavButton({ active, onClick, icon, label, themeClasses }) {
//   return (
//     <button
//       onClick={onClick}
//       className={`flex flex-col items-center p-2 min-w-[64px] transition-colors ${
//         active ? themeClasses.textColor : 'text-gray-500'
//       }`}
//     >
//       <div className={`p-2 rounded-lg ${active ? themeClasses.lightBg : 'bg-transparent'}`}>
//         {icon}
//       </div>
//       <span className="text-xs mt-1 font-medium">{label}</span>
//     </button>
//   );
// }

// // Contact Detail Component
// function ContactDetail({ label, value, action, icon, themeClasses }) {
//   return (
//     <div className="bg-gray-50 rounded-lg p-3">
//       <div className="flex items-start gap-3">
//         <div className={`p-2 ${themeClasses.lightBg} ${themeClasses.textColor} rounded-lg`}>
//           {icon}
//         </div>
//         <div className="flex-1">
//           <p className="text-sm text-gray-500 mb-1">{label}</p>
//           <p className="text-base font-medium text-gray-900 break-all">{value}</p>
//         </div>
//         {action && (
//           <a
//             href={action}
//             className={`p-2 ${themeClasses.lightBg} ${themeClasses.textColor} rounded-lg`}
//           >
//             {icon}
//           </a>
//         )}
//       </div>
//     </div>
//   );
// }


'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchEmployees } from './store/slices/employeeSlice';
import {
  Calendar, User, MapPin, Globe, Briefcase, Clock, Users, DollarSign,
  Edit2, Phone, Mail, Building, FileText, Badge, Smartphone, MoreVertical,
  Menu, X, ArrowLeft, Shield, Home, Clock as ClockIcon, CheckCircle,
  XCircle, AlertCircle, ArrowUpRight, ArrowDownRight
} from 'lucide-react';
import { useTheme } from './ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function Profile() {
  const { getThemeClasses } = useTheme();
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { employees, loading } = useSelector((state) => state.employees);

  // Get theme classes
  const themeClasses = getThemeClasses();

  // Find employee by ID
  const employee = employees.find(emp => emp.id === parseInt(id)) || {
    name: 'Unknown Employee',
    code: 'N/A',
    department: 'N/A',
    email: 'Not available',
    phone: 'Not available',
    workEmail: 'Not available',
    personalEmail: 'Not available',
    workPhone: 'Not available',
    personalPhone: 'Not available',
    status: 'offline',
    position: 'N/A',
    workType: 'N/A',
    joinDate: 'N/A',
    dob: 'N/A',
    address: 'Not available',
    emergencyContact: 'Not available',
    photo: null,
    gender: 'N/A',
    country: 'N/A',
    shift: 'N/A',
    company: 'N/A',
    manager: 'N/A',
    salary: 'N/A',
    badgeId: 'N/A',
    documents: []
  };

  // State for UI and API data
  const [activeTab, setActiveTab] = useState('about');
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [attendanceData, setAttendanceData] = useState(null);
  const [attendanceLoading, setAttendanceLoading] = useState(false);
  const [attendanceError, setAttendanceError] = useState(null);
  const [dateRange, setDateRange] = useState('today'); // 'today', 'week', 'month', 'custom'
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Responsive detection
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Fetch employees if not already loaded
  useEffect(() => {
    if (employees.length === 0) {
      dispatch(fetchEmployees());
    }
  }, [dispatch, employees.length]);

  // Fetch attendance data when attendance tab is active
  useEffect(() => {
    if (activeTab === 'attendance' && employee.code !== 'N/A') {
      fetchAttendanceData();
    }
  }, [activeTab, employee.code, dateRange, selectedDate]);

  // Function to fetch attendance data
const fetchAttendanceData = async () => {
  setAttendanceLoading(true);
  setAttendanceError(null);
  
  try {
    // Get token from localStorage
    const token = localStorage.getItem('authToken');
    
    if (!token) {
      throw new Error('No authentication token found. Please login again.');
    }
    
    // Construct the API URL based on employee code
    const companyCode = employee.code.split('-')[0];
    const employeeCode = employee.code;
    
    if (!companyCode || !employeeCode) {
      throw new Error('Invalid employee code format');
    }

    console.log("Fetching attendance data for:", { companyCode, employeeCode });

    const response = await fetch(
      `https://hr.hinzah.com/api/attendance/company/${companyCode}/employee/${employeeCode}`,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    console.log('API Response status:', response.status);

    if (response.status === 401) {
      throw new Error('Authentication expired. Please login again.');
    }

    if (response.status === 403) {
      throw new Error('You do not have permission to access this data.');
    }

    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Error Response:', errorText);
      throw new Error(`Failed to fetch data. Status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Attendance API response data:', data);

    if (data.status === false) {
      throw new Error(data.message || 'API returned false status');
    }

    if (!data.data) {
      throw new Error('No attendance data found');
    }

    setAttendanceData(data);
  } catch (error) {
    console.error('Error fetching attendance data:', error);
    setAttendanceError(error.message);
    
    // Clear any previous data on error
    setAttendanceData(null);
  } finally {
    setAttendanceLoading(false);
  }
};

  // Format date helper
  const formatDate = (dateString) => {
    if (!dateString || dateString === 'N/A') return 'N/A';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    } catch {
      return dateString;
    }
  };

  // Format time helper
  const formatTime = (timeString) => {
    if (!timeString) return '--:--';
    try {
      return timeString.slice(0, 5); // Get HH:MM
    } catch {
      return timeString;
    }
  };

  // Calculate total hours worked
  const calculateWorkHours = (checkIn, checkOut) => {
    if (!checkIn || !checkOut) return '0h 0m';
    
    try {
      const [inHours, inMinutes] = checkIn.split(':').map(Number);
      const [outHours, outMinutes] = checkOut.split(':').map(Number);
      
      let totalMinutes = (outHours * 60 + outMinutes) - (inHours * 60 + inMinutes);
      
      // If check_out is earlier than check_in (overnight shift)
      if (totalMinutes < 0) {
        totalMinutes += 24 * 60;
      }
      
      const hours = Math.floor(totalMinutes / 60);
      const minutes = totalMinutes % 60;
      
      return `${hours}h ${minutes}m`;
    } catch {
      return '0h 0m';
    }
  };

  // Get attendance status
  const getAttendanceStatus = (checkIn, checkOut) => {
    if (!checkIn) return 'absent';
    if (!checkOut) return 'pending';
    
    const [inHours, inMinutes] = checkIn.split(':').map(Number);
    const checkInTime = inHours * 60 + inMinutes;
    
    // Consider 9:30 AM as late threshold
    if (checkInTime > 9 * 60 + 30) return 'late';
    return 'present';
  };

  // Get status color and icon
  const getStatusConfig = (status) => {
    switch(status) {
      case 'present':
        return { 
          color: 'text-green-600', 
          bg: 'bg-green-50', 
          icon: <CheckCircle className="h-4 w-4" />,
          text: 'Present'
        };
      case 'late':
        return { 
          color: 'text-amber-600', 
          bg: 'bg-amber-50', 
          icon: <AlertCircle className="h-4 w-4" />,
          text: 'Late'
        };
      case 'pending':
        return { 
          color: 'text-blue-600', 
          bg: 'bg-blue-50', 
          icon: <ClockIcon className="h-4 w-4" />,
          text: 'Pending'
        };
      default:
        return { 
          color: 'text-red-600', 
          bg: 'bg-red-50', 
          icon: <XCircle className="h-4 w-4" />,
          text: 'Absent'
        };
    }
  };

  // Get initials for avatar
  const getInitials = (name) => {
    if (!name || name === 'Unknown Employee') return 'E';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col lg:flex-row overflow-hidden">
      {/* SIDEBAR - Desktop */}
      <div className="hidden lg:flex flex-col w-64 border-r border-gray-200 bg-white">
        {/* Employee Info Card */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col items-center">
            <div className={`w-20 h-20 rounded-full ${themeClasses.buttonBg} flex items-center justify-center text-white text-2xl font-bold mb-4`}>
              {getInitials(employee.name)}
            </div>
            <h2 className="text-xl font-bold text-gray-900 text-center">{employee.name}</h2>
            <p className="text-sm text-gray-500 mt-1">{employee.code}</p>
            <div className="flex items-center gap-2 mt-3">
              <div className={`px-3 py-1 ${themeClasses.lightBg} ${themeClasses.textColor} rounded-full text-xs font-medium`}>
                {employee.department}
              </div>
              <div className={`w-2 h-2 rounded-full ${employee.status === 'online' ? 'bg-green-500' : 'bg-gray-400'}`}></div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto p-4">
          <nav className="space-y-1">
            {['about', 'work', 'attendance', 'leave', 'payroll', 'allowance', 'penalty', 'performance', 'documents'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                  activeTab === tab
                    ? `${themeClasses.lightBg} ${themeClasses.textColor}`
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {getTabIcon(tab)}
                <span className="font-medium capitalize">
                  {tab === 'allowance' ? 'Allowance & Deduction' : 
                   tab === 'penalty' ? 'Penalty Account' : tab}
                </span>
              </button>
            ))}
          </nav>
        </div>

        {/* Quick Actions */}
        <div className="p-4 border-t border-gray-200">
          <button className={`w-full py-2.5 ${themeClasses.buttonBg} text-white rounded-lg font-medium text-sm`}>
            Edit Profile
          </button>
        </div>
      </div>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* MOBILE HEADER */}
        {isMobile && (
          <div className="sticky top-0 z-10 bg-white border-b border-gray-200 px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => navigate('/employee')}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <ArrowLeft className="h-5 w-5 text-gray-600" />
                </button>
                <div>
                  <h1 className="text-lg font-bold text-gray-900">Employee</h1>
                  <p className="text-xs text-gray-500">{employee.code}</p>
                </div>
              </div>
              <button 
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                {showMobileMenu ? <X className="h-5 w-5 text-gray-600" /> : <Menu className="h-5 w-5 text-gray-600" />}
              </button>
            </div>
          </div>
        )}

        {/* MOBILE MENU DRAWER */}
        <AnimatePresence>
          {showMobileMenu && isMobile && (
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              className="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden"
              onClick={() => setShowMobileMenu(false)}
            >
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                className="absolute right-0 top-0 bottom-0 w-64 bg-white shadow-xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-4 border-b border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="font-bold text-gray-900">Menu</h2>
                    <button onClick={() => setShowMobileMenu(false)}>
                      <X className="h-5 w-5 text-gray-500" />
                    </button>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-full ${themeClasses.buttonBg} flex items-center justify-center text-white font-bold`}>
                      {getInitials(employee.name)}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{employee.name}</p>
                      <p className="text-xs text-gray-500">{employee.code}</p>
                    </div>
                  </div>
                </div>
                <div className="p-4 overflow-y-auto h-[calc(100vh-180px)]">
                  <nav className="space-y-1">
                    {['about', 'work', 'attendance', 'leave', 'payroll', 'allowance', 'penalty', 'performance', 'documents'].map((tab) => (
                      <button
                        key={tab}
                        onClick={() => {
                          setActiveTab(tab);
                          setShowMobileMenu(false);
                        }}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                          activeTab === tab
                            ? `${themeClasses.lightBg} ${themeClasses.textColor}`
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        {getTabIcon(tab)}
                        <span className="font-medium capitalize">
                          {tab === 'allowance' ? 'Allowance & Deduction' : 
                           tab === 'penalty' ? 'Penalty Account' : tab}
                        </span>
                      </button>
                    ))}
                  </nav>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* CONTENT HEADER */}
        <div className="border-b border-gray-200 px-4 lg:px-6 py-4">
          <h2 className="text-xl lg:text-2xl font-bold text-gray-900 capitalize">
            {activeTab === 'allowance' ? 'Allowance & Deduction' : 
             activeTab === 'penalty' ? 'Penalty Account' : activeTab}
          </h2>
          {!isMobile && (
            <p className="text-gray-600 mt-1">Employee ID: {employee.code}</p>
          )}
        </div>

        {/* SCROLLABLE CONTENT AREA */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-4 lg:p-6">
            {activeTab === 'about' ? (
              <div className="space-y-6">
                {/* Personal Information */}
                <InfoSection 
                  title="Personal Information" 
                  icon={<User className="h-5 w-5" />}
                  themeClasses={themeClasses}
                >
                  <InfoItem label="Date of Birth" value={formatDate(employee.dob)} />
                  <InfoItem label="Gender" value={employee.gender} />
                  <InfoItem label="Address" value={employee.address} />
                  <InfoItem label="Country" value={employee.country} />
                  <InfoItem label="Phone" value={employee.phone} />
                  <InfoItem label="Email" value={employee.email} />
                </InfoSection>

                {/* Work Information */}
                <InfoSection 
                  title="Work Information" 
                  icon={<Briefcase className="h-5 w-5" />}
                  themeClasses={themeClasses}
                >
                  <InfoItem label="Department" value={employee.department} />
                  <InfoItem label="Job Position" value={employee.position} />
                  <InfoItem label="Shift" value={employee.shift} />
                  <InfoItem label="Work Type" value={employee.workType} />
                  <InfoItem label="Badge ID" value={employee.badgeId} />
                </InfoSection>

                {/* Contract & Bank */}
                <InfoSection 
                  title="Contract & Bank" 
                  icon={<FileText className="h-5 w-5" />}
                  themeClasses={themeClasses}
                >
                  <InfoItem label="Salary" value={employee.salary} />
                  <InfoItem label="Joining Date" value={formatDate(employee.joinDate)} />
                  <InfoItem label="Company" value={employee.company} />
                  <InfoItem label="Manager" value={employee.manager} />
                  <InfoItem label="Emergency Contact" value={employee.emergencyContact} />
                </InfoSection>
              </div>
            ) : activeTab === 'attendance' ? (
              <div className="space-y-6">
                {/* Attendance Summary */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <SummaryCard
                    title="Total Days"
                    value={attendanceData?.data?.length || 0}
                    subtitle="This month"
                    icon={<Calendar className="h-5 w-5" />}
                    color="blue"
                  />
                  <SummaryCard
                    title="Present"
                    value={attendanceData?.data?.filter(item => item.check_in).length || 0}
                    subtitle="Days"
                    icon={<CheckCircle className="h-5 w-5" />}
                    color="green"
                  />
                  <SummaryCard
                    title="Late Arrivals"
                    value={attendanceData?.data?.filter(item => {
                      const [hours] = item.check_in?.split(':') || [];
                      return hours && parseInt(hours) >= 9 && parseInt(hours) <= 10;
                    }).length || 0}
                    subtitle="This month"
                    icon={<AlertCircle className="h-5 w-5" />}
                    color="amber"
                  />
                  <SummaryCard
                    title="Avg. Hours"
                    value={(() => {
                      const records = attendanceData?.data?.filter(item => item.check_in && item.check_out) || [];
                      if (records.length === 0) return '0h';
                      const totalMinutes = records.reduce((sum, item) => {
                        const [inH, inM] = item.check_in.split(':').map(Number);
                        const [outH, outM] = item.check_out.split(':').map(Number);
                        return sum + ((outH * 60 + outM) - (inH * 60 + inM));
                      }, 0);
                      const avgHours = Math.round(totalMinutes / records.length / 60);
                      return `${avgHours}h`;
                    })()}
                    subtitle="Per day"
                    icon={<ClockIcon className="h-5 w-5" />}
                    color="purple"
                  />
                </div>

                {/* Date Filter Controls */}
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    {['today', 'week', 'month', 'custom'].map((range) => (
                      <button
                        key={range}
                        onClick={() => setDateRange(range)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-colors ${
                          dateRange === range
                            ? `${themeClasses.buttonBg} text-white`
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {range}
                      </button>
                    ))}
                  </div>
                  <div className="text-sm text-gray-500">
                    Showing records for {dateRange === 'today' ? 'today' : `this ${dateRange}`}
                  </div>
                </div>

                {/* Attendance Table */}
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                  <div className={`px-6 py-4 ${themeClasses.lightBg} border-b border-gray-200`}>
                    <h3 className="font-bold text-gray-900">Attendance Records</h3>
                  </div>
                  
                  {attendanceLoading ? (
                    <div className="p-8 text-center">
                      <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                      <p className="mt-3 text-gray-500">Loading attendance data...</p>
                    </div>
                  ) : attendanceError ? (
                    <div className="p-8 text-center">
                      <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-3" />
                      <p className="text-red-600 mb-2">Failed to load attendance data</p>
                      <p className="text-gray-500 text-sm">{attendanceError}</p>
                      <button 
                        onClick={fetchAttendanceData}
                        className={`mt-4 px-4 py-2 ${themeClasses.buttonBg} text-white rounded-lg font-medium text-sm`}
                      >
                        Retry
                      </button>
                    </div>
                  ) : !attendanceData?.data || attendanceData.data.length === 0 ? (
                    <div className="p-8 text-center">
                      <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                      <p className="text-gray-600">No attendance records found</p>
                      <p className="text-gray-500 text-sm mt-1">Attendance data will appear here once recorded</p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="bg-gray-50 border-b border-gray-200">
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Day</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check In</th>
                            <th className="px6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check Out</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hours</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Remarks</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {attendanceData.data.map((record) => {
                            const status = getAttendanceStatus(record.check_in, record.check_out);
                            const statusConfig = getStatusConfig(status);
                            const permissions = record.permissions ? JSON.parse(record.permissions) : null;
                            
                            return (
                              <tr key={record.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="text-sm font-medium text-gray-900">{formatDate(record.date)}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="text-sm text-gray-600">{record.day}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="text-sm font-medium text-gray-900">
                                    {formatTime(record.check_in) || '--:--'}
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="text-sm font-medium text-gray-900">
                                    {formatTime(record.check_out) || '--:--'}
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="text-sm font-medium text-gray-900">
                                    {record.check_in && record.check_out 
                                      ? calculateWorkHours(record.check_in, record.check_out)
                                      : '--'}
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${statusConfig.bg} ${statusConfig.color}`}>
                                    {statusConfig.icon}
                                    {statusConfig.text}
                                  </div>
                                </td>
                                <td className="px-6 py-4">
                                  <div className="text-sm text-gray-600 max-w-xs">
                                    {permissions ? (
                                      <div className="space-y-1">
                                        {permissions.map((perm, idx) => (
                                          <div key={idx} className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded">
                                            {perm.from}-{perm.to}: {perm.reason}
                                          </div>
                                        ))}
                                      </div>
                                    ) : record.check_in && !record.check_out ? (
                                      <span className="text-amber-600">Pending check out</span>
                                    ) : !record.check_in && !record.check_out ? (
                                      <span className="text-red-600">No check-in recorded</span>
                                    ) : null}
                                  </div>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>

                {/* Today's Status (if available) */}
                {attendanceData?.data?.some(record => record.date === new Date().toISOString().split('T')[0]) && (
                  <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <h3 className="font-bold text-gray-900 mb-4">Today's Attendance</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {(() => {
                        const todayRecord = attendanceData.data.find(
                          record => record.date === new Date().toISOString().split('T')[0]
                        );
                        const status = getAttendanceStatus(todayRecord?.check_in, todayRecord?.check_out);
                        const statusConfig = getStatusConfig(status);
                        
                        return (
                          <>
                            <div className="space-y-2">
                              <div className="text-sm text-gray-500">Check In</div>
                              <div className="text-lg font-bold text-gray-900">
                                {todayRecord?.check_in ? formatTime(todayRecord.check_in) : '--:--'}
                              </div>
                            </div>
                            <div className="space-y-2">
                              <div className="text-sm text-gray-500">Check Out</div>
                              <div className="text-lg font-bold text-gray-900">
                                {todayRecord?.check_out ? formatTime(todayRecord.check_out) : '--:--'}
                              </div>
                            </div>
                            <div className="space-y-2">
                              <div className="text-sm text-gray-500">Status</div>
                              <div className={`inline-flex items-center gap-2 ${statusConfig.color}`}>
                                {statusConfig.icon}
                                <span className="text-lg font-bold">{statusConfig.text}</span>
                              </div>
                            </div>
                          </>
                        );
                      })()}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="text-center py-12">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                    <FileText className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2 capitalize">
                    {activeTab === 'allowance' ? 'Allowance & Deduction' : 
                     activeTab === 'penalty' ? 'Penalty Account' : activeTab}
                  </h3>
                  <p className="text-gray-500 max-w-md mx-auto">
                    This section is under development. Content will be available soon.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* MOBILE BOTTOM NAV */}
        {isMobile && (
          <div className="sticky bottom-0 bg-white border-t border-gray-200 px-4 py-2">
            <div className="flex items-center justify-around">
              <NavButton
                active={activeTab === 'about'}
                onClick={() => setActiveTab('about')}
                icon={<User className="h-5 w-5" />}
                label="About"
                themeClasses={themeClasses}
              />
              <NavButton
                active={activeTab === 'work'}
                onClick={() => setActiveTab('work')}
                icon={<Briefcase className="h-5 w-5" />}
                label="Work"
                themeClasses={themeClasses}
              />
              <NavButton
                active={activeTab === 'attendance'}
                onClick={() => setActiveTab('attendance')}
                icon={<Calendar className="h-5 w-5" />}
                label="Attendance"
                themeClasses={themeClasses}
              />
              <NavButton
                active={activeTab === 'payroll'}
                onClick={() => setActiveTab('payroll')}
                icon={<DollarSign className="h-5 w-5" />}
                label="Payroll"
                themeClasses={themeClasses}
              />
              <button
                onClick={() => setShowMobileMenu(true)}
                className="flex flex-col items-center p-2"
              >
                <MoreVertical className="h-5 w-5 text-gray-500" />
                <span className="text-xs text-gray-500 mt-1">More</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Helper function for tab icons
function getTabIcon(tab) {
  const iconClass = "h-5 w-5";
  switch(tab) {
    case 'about': return <User className={iconClass} />;
    case 'work': return <Briefcase className={iconClass} />;
    case 'attendance': return <Calendar className={iconClass} />;
    case 'leave': return <Shield className={iconClass} />;
    case 'payroll': return <DollarSign className={iconClass} />;
    case 'allowance': return <Users className={iconClass} />;
    case 'penalty': return <FileText className={iconClass} />;
    case 'performance': return <Smartphone className={iconClass} />;
    case 'documents': return <FileText className={iconClass} />;
    default: return <User className={iconClass} />;
  }
}

// Info Section Component
function InfoSection({ title, icon, children, themeClasses }) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className={`px-4 py-3 ${themeClasses.lightBg} border-b border-gray-200`}>
        <div className="flex items-center gap-2">
          <div className={themeClasses.textColor}>
            {icon}
          </div>
          <h3 className="font-bold text-gray-900">{title}</h3>
        </div>
      </div>
      <div className="p-4">
        {children}
      </div>
    </div>
  );
}

// Info Item Component
function InfoItem({ label, value }) {
  return (
    <div className="flex justify-between items-center py-3 border-b border-gray-100 last:border-0">
      <span className="text-sm text-gray-600">{label}</span>
      <span className="font-medium text-gray-900 text-sm">{value}</span>
    </div>
  );
}

// Mobile Navigation Button
function NavButton({ active, onClick, icon, label, themeClasses }) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center p-2 min-w-[64px] transition-colors ${
        active ? themeClasses.textColor : 'text-gray-500'
      }`}
    >
      <div className={`p-2 rounded-lg ${active ? themeClasses.lightBg : 'bg-transparent'}`}>
        {icon}
      </div>
      <span className="text-xs mt-1 font-medium">{label}</span>
    </button>
  );
}

// Contact Detail Component
function ContactDetail({ label, value, action, icon, themeClasses }) {
  return (
    <div className="bg-gray-50 rounded-lg p-3">
      <div className="flex items-start gap-3">
        <div className={`p-2 ${themeClasses.lightBg} ${themeClasses.textColor} rounded-lg`}>
          {icon}
        </div>
        <div className="flex-1">
          <p className="text-sm text-gray-500 mb-1">{label}</p>
          <p className="text-base font-medium text-gray-900 break-all">{value}</p>
        </div>
        {action && (
          <a
            href={action}
            className={`p-2 ${themeClasses.lightBg} ${themeClasses.textColor} rounded-lg`}
          >
            {icon}
          </a>
        )}
      </div>
    </div>
  );
}

// Summary Card Component
function SummaryCard({ title, value, subtitle, icon, color }) {
  const colorClasses = {
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-green-50 text-green-600',
    amber: 'bg-amber-50 text-amber-600',
    purple: 'bg-purple-50 text-purple-600',
    red: 'bg-red-50 text-red-600'
  };
  
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-500 mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          <p className="text-xs text-gray-400 mt-1">{subtitle}</p>
        </div>
        <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
          {icon}
        </div>
      </div>
    </div>
  );
}