// // src/components/employee/Profile.jsx
// 'use client';

// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';
// import { fetchEmployees } from './store/slices/employeeSlice';
// import {
//   Calendar, User, MapPin, Globe, Briefcase, Clock, Users, DollarSign,
//   Edit2, Plus, Phone, Mail, Building, FileText, ChevronDown, Badge,
//   Sun, Moon, Smartphone, Monitor, MoreVertical, Menu, X,
//   ArrowLeft, Search, Filter, Download, Eye, ChevronRight
// } from 'lucide-react';
// import { useTheme } from './ThemeContext';

// const tabs = [
//   { id: 'about', label: 'About', icon: <User className="h-4 w-4" /> },
//   { id: 'work', label: 'Work Type & Shift', icon: <Clock className="h-4 w-4" /> },
//   { id: 'attendance', label: 'Attendance', icon: <Calendar className="h-4 w-4" /> },
//   { id: 'leave', label: 'Leave', icon: <Sun className="h-4 w-4" /> },
//   { id: 'payroll', label: 'Payroll', icon: <DollarSign className="h-4 w-4" /> },
//   { id: 'allowance', label: 'Allowance & Deduction', icon: <Users className="h-4 w-4" /> },
//   { id: 'penalty', label: 'Penalty Account', icon: <FileText className="h-4 w-4" /> },
//   { id: 'performance', label: 'Performance', icon: <Monitor className="h-4 w-4" /> },
//   { id: 'documents', label: 'Documents', icon: <Briefcase className="h-4 w-4" /> }
// ];

// const innerTabs = [
//   { id: 'bonus', label: 'Bonus Points', icon: '🏆' },
//   { id: 'interview', label: 'Scheduled Interview', icon: '📅' },
//   { id: 'resignation', label: 'Resignation', icon: '📝' }
// ];

// export default function Profile() {
//   const { theme } = useTheme();
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { employees, loading } = useSelector((state) => state.employees);

//   // Fetch employees if not already loaded
//   useEffect(() => {
//     if (employees.length === 0) {
//       dispatch(fetchEmployees());
//     }
//   }, [dispatch, employees.length]);

//   // Find employee by ID
//   const employee = employees.find(emp => emp.id === parseInt(id)) || {
//     name: 'Unknown Employee',
//     code: 'N/A',
//     department: 'N/A',
//     email: '',
//     phone: '',
//     workEmail: '',
//     personalEmail: '',
//     workPhone: '',
//     personalPhone: '',
//     status: 'offline',
//     position: '',
//     workType: '',
//     joinDate: '',
//     dob: '',
//     address: '',
//     emergencyContact: '',
//     photo: null,
//     documents: []
//   };

//   // Get theme colors directly from theme context
//   const themeConfig = theme || {
//     accent: 'orange-600',
//     textAccent: 'text-orange-600',
//     borderColor: 'border-orange-600',
//     button: 'from-orange-500 to-orange-600',
//     buttonHover: 'hover:from-orange-600 hover:to-orange-700',
//     lightBg: 'bg-orange-50',
//     sidebarActive: 'bg-orange-200'
//   };

//   // Helper functions to get theme values
//   const getAccentColor = () => theme?.accent || 'orange-600';
//   const getBorderColor = () => theme?.borderColor || 'border-orange-600';
//   const getTextAccent = () => theme?.accent ? `text-${theme.accent}` : 'text-orange-600';
//   const getButtonGradient = () => theme?.button ? `bg-gradient-to-r ${theme.button}` : 'bg-gradient-to-r from-orange-500 to-orange-600';
//   const getButtonHover = () => theme?.buttonHover || 'hover:from-orange-600 hover:to-orange-700';
//   const getLightBg = () => theme?.lightBg || 'bg-orange-50';
//   const getSidebarActive = () => theme?.sidebarActive || 'bg-orange-200';

//   const [activeTab, setActiveTab] = useState('about');
//   const [activeInnerTab, setActiveInnerTab] = useState('bonus');
//   const [showMobileMenu, setShowMobileMenu] = useState(false);
//   const [showContactDrawer, setShowContactDrawer] = useState(false);

//   // Format date helper
//   const formatDate = (dateString) => {
//     if (!dateString) return 'N/A';
//     try {
//       const date = new Date(dateString);
//       return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
//     } catch {
//       return dateString;
//     }
//   };

//   // Get initials for avatar
//   const getInitials = (name) => {
//     if (!name) return 'E';
//     return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
//   };

//   return (
//     <div className="min-h-screen bg-white">
//       {/* MOBILE HEADER */}
//       <div className="lg:hidden sticky top-0 z-50 bg-white border-b border-gray-200">
//         <div className="px-4 py-3 flex items-center justify-between">
//           <div className="flex items-center gap-3">
//             <button 
//               onClick={() => navigate('/employee')}
//               className="p-2 hover:bg-gray-100 rounded-lg"
//             >
//               <ArrowLeft className="h-5 w-5 text-gray-600" />
//             </button>
//             <div className="flex items-center gap-2">
//               <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${getButtonGradient()} flex items-center justify-center text-white font-bold text-lg`}>
//                 {employee.photo ? (
//                   <img src={employee.photo} alt={employee.name} className="w-full h-full rounded-xl object-cover" />
//                 ) : (
//                   getInitials(employee.name)
//                 )}
//               </div>
//               <div>
//                 <h1 className="font-bold text-gray-900 text-lg">{employee.name}</h1>
//                 <p className="text-xs text-gray-500">{employee.code}</p>
//               </div>
//             </div>
//           </div>
//           <div className="flex items-center gap-2">
//             <button className="p-2 hover:bg-gray-100 rounded-lg">
//               <Search className="h-5 w-5 text-gray-600" />
//             </button>
//             <button 
//               onClick={() => setShowMobileMenu(!showMobileMenu)}
//               className="p-2 hover:bg-gray-100 rounded-lg"
//             >
//               {showMobileMenu ? <X className="h-5 w-5 text-gray-600" /> : <Menu className="h-5 w-5 text-gray-600" />}
//             </button>
//           </div>
//         </div>

//         {/* Mobile Contact Info */}
//         <div className={`px-4 py-3 ${getLightBg()}`}>
//           <div className="flex items-center justify-between overflow-x-auto gap-4 scrollbar-hide">
//             <ContactItemMobile 
//               label="Work Email"
//               value={(employee.workEmail || employee.email || 'N/A').substring(0, 12) + '...'}
//               theme={themeConfig}
//             />
//             <ContactItemMobile 
//               label="Personal Email"
//               value={(employee.personalEmail || employee.email || 'N/A').substring(0, 12) + '...'}
//               theme={themeConfig}
//             />
//             <ContactItemMobile 
//               label="Work Phone"
//               value={(employee.workPhone || employee.phone || 'N/A').substring(0, 9) + '...'}
//               theme={themeConfig}
//             />
//             <ContactItemMobile 
//               label="Personal Phone"
//               value={(employee.personalPhone || employee.phone || 'N/A').substring(0, 9) + '...'}
//               theme={themeConfig}
//             />
//           </div>
//         </div>
//       </div>

//       {/* DESKTOP HEADER */}
//       <div className="hidden lg:block bg-white shadow-sm border-b border-gray-200">
//         <div className="px-8 py-6">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-4">
//               <div className="relative">
//                 <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${getButtonGradient()} flex items-center justify-center text-2xl font-black text-white overflow-hidden`}>
//                   {employee.photo ? (
//                     <img src={employee.photo} alt={employee.name} className="w-full h-full object-cover" />
//                   ) : (
//                     getInitials(employee.name)
//                   )}
//                 </div>
//                 <div className={`absolute bottom-0 right-0 w-4 h-4 ${employee.status === 'online' ? 'bg-green-500' : 'bg-gray-400'} rounded-full border-2 border-white`} />
//               </div>
//               <div>
//                 <div className="flex items-center gap-2">
//                   <h1 className="text-2xl font-black text-gray-900">
//                     {employee.name}
//                   </h1>
//                   <span className={`px-2 py-1 ${getLightBg()} ${getTextAccent()} rounded-full text-sm font-bold`}>
//                     {employee.code}
//                   </span>
//                 </div>
//                 <p className="text-gray-600">{employee.department || 'N/A'}</p>
//               </div>
//             </div>
//             <div className="flex items-center gap-4">
//               <button className={`px-4 py-2 ${getLightBg()} ${getTextAccent()} rounded-xl font-medium`}>
//                 Edit Profile
//               </button>
//               <button className="p-2 hover:bg-gray-100 rounded-xl">
//                 <MoreVertical className="h-5 w-5 text-gray-600" />
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* MOBILE TABS DRAWER */}
//       {showMobileMenu && (
//         <div className="lg:hidden fixed inset-x-0 top-[104px] z-40 bg-white border-b border-gray-200 shadow-lg">
//           <div className="p-4">
//             <div className="space-y-1">
//               {tabs.map(tab => (
//                 <button
//                   key={tab.id}
//                   onClick={() => {
//                     setActiveTab(tab.id);
//                     setShowMobileMenu(false);
//                   }}
//                   className={`w-full flex items-center gap-3 px-4 py-4 rounded-xl text-left ${
//                     activeTab === tab.id
//                       ? `${getSidebarActive()} ${getTextAccent()} border-l-4 ${getBorderColor()}`
//                       : 'text-gray-600 hover:bg-gray-100'
//                   }`}
//                 >
//                   <span className={activeTab === tab.id ? getTextAccent() : 'text-gray-400'}>
//                     {tab.icon}
//                   </span>
//                   <span className="font-medium">{tab.label}</span>
//                 </button>
//               ))}
//             </div>
//           </div>
//         </div>
//       )}

//       {/* MAIN CONTENT AREA */}
//       <div className="p-4 lg:p-8">
//         {/* MOBILE CURRENT TAB HEADER */}
//         <div className="lg:hidden mb-6">
//           <div className="flex items-center justify-between">
//             <h2 className="text-2xl font-black text-gray-900">
//               {tabs.find(t => t.id === activeTab)?.label || 'Profile'}
//             </h2>
//             <div className="flex items-center gap-2">
//               <button className="p-2 hover:bg-gray-100 rounded-xl">
//                 <Filter className="h-5 w-5 text-gray-600" />
//               </button>
//               <button className="p-2 hover:bg-gray-100 rounded-xl">
//                 <Download className="h-5 w-5 text-gray-600" />
//               </button>
//             </div>
//           </div>
//           {activeTab === 'work' && (
//             <div className="mt-4 flex items-center gap-2 overflow-x-auto scrollbar-hide">
//               {innerTabs.map(tab => (
//                 <button
//                   key={tab.id}
//                   onClick={() => setActiveInnerTab(tab.id)}
//                   className={`flex-shrink-0 px-4 py-2 rounded-full font-medium ${
//                     activeInnerTab === tab.id
//                       ? `${getButtonGradient()} text-white`
//                       : `${getLightBg()} ${getTextAccent()}`
//                   }`}
//                 >
//                   <span className="mr-2">{tab.icon}</span>
//                   {tab.label}
//                 </button>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* DESKTOP TABS */}
//         <div className="hidden lg:block mb-8">
//           <div className="flex items-center border-b border-gray-200">
//             {tabs.map(tab => (
//               <button
//                 key={tab.id}
//                 onClick={() => setActiveTab(tab.id)}
//                 className={`px-6 py-4 font-medium border-b-2 ${
//                   activeTab === tab.id
//                     ? `${getBorderColor()} ${getTextAccent()}`
//                     : 'border-transparent text-gray-500 hover:text-gray-700'
//                 }`}
//               >
//                 {tab.label}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* CONTENT */}
//         {activeTab === 'about' && (
//           <div className="space-y-4 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-6">
//             <InfoCard title="Personal Information" theme={themeConfig}>
//               <InfoRow icon={<Calendar className="h-5 w-5" />} label="Date of Birth" value={employee.dob ? formatDate(employee.dob) : 'N/A'} theme={themeConfig} />
//               <InfoRow icon={<User className="h-5 w-5" />} label="Gender" value={employee.gender || 'N/A'} theme={themeConfig} />
//               <InfoRow icon={<MapPin className="h-5 w-5" />} label="Address" value={employee.address || 'N/A'} theme={themeConfig} />
//               <InfoRow icon={<Globe className="h-5 w-5" />} label="Country" value={employee.country || 'N/A'} theme={themeConfig} />
//               <InfoRow icon={<Phone className="h-5 w-5" />} label="Phone" value={employee.phone || 'N/A'} theme={themeConfig} />
//               <InfoRow icon={<Mail className="h-5 w-5" />} label="Email" value={employee.email || 'N/A'} theme={themeConfig} />
//             </InfoCard>

//             <InfoCard title="Work Information" theme={themeConfig}>
//               <InfoRow icon={<Building className="h-5 w-5" />} label="Department" value={employee.department || 'N/A'} theme={themeConfig} />
//               <InfoRow icon={<Briefcase className="h-5 w-5" />} label="Job Position" value={employee.position || employee.designation || 'N/A'} theme={themeConfig} />
//               <InfoRow icon={<Clock className="h-5 w-5" />} label="Shift" value={employee.shift || 'N/A'} theme={themeConfig} />
//               <InfoRow icon={<Smartphone className="h-5 w-5" />} label="Work Type" value={employee.workType ? employee.workType.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()) : 'N/A'} theme={themeConfig} />
//               <InfoRow icon={<Badge className="h-5 w-5" />} label="Badge ID" value={employee.badgeId || employee.docNum || 'N/A'} theme={themeConfig} />
//             </InfoCard>

//             <InfoCard title="Contract & Bank" theme={themeConfig}>
//               <InfoRow icon={<DollarSign className="h-5 w-5" />} label="Salary" value={employee.salary || 'N/A'} theme={themeConfig} />
//               <InfoRow icon={<Calendar className="h-5 w-5" />} label="Joining Date" value={employee.joinDate ? formatDate(employee.joinDate) : 'N/A'} theme={themeConfig} />
//               <InfoRow icon={<Building className="h-5 w-5" />} label="Company" value={employee.company || 'N/A'} theme={themeConfig} />
//               <InfoRow icon={<Users className="h-5 w-5" />} label="Manager" value={employee.manager || employee.reportingManager || 'N/A'} theme={themeConfig} />
//               {employee.emergencyContact && (
//                 <InfoRow icon={<Phone className="h-5 w-5" />} label="Emergency Contact" value={employee.emergencyContact} theme={themeConfig} />
//               )}
//             </InfoCard>
//           </div>
//         )}

//         {activeTab === 'work' && activeInnerTab === 'bonus' && (
//           <div className="bg-white rounded-2xl border border-gray-200 p-4 lg:p-6">
//             <div className="flex items-center justify-between mb-6">
//               <div>
//                 <h3 className="text-lg font-bold text-gray-800">Current Shift</h3>
//                 <p className={`text-3xl lg:text-4xl font-black ${getTextAccent()} mt-2`}>{employee.shift || 'Not Assigned'}</p>
//                 <p className="text-sm text-gray-500 mt-2">Work Type: {employee.workType ? employee.workType.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()) : 'N/A'}</p>
//               </div>
//               <button className={`px-4 py-3 ${getButtonGradient()} ${getButtonHover()} text-white rounded-xl font-medium text-sm transition-all`}>
//                 Reallocate Shift
//               </button>
//             </div>

//             <div className="grid grid-cols-2 gap-4 mb-8">
//               {['Work type request', 'Rotating work type', 'Shift request', 'Rotating Shift'].map((item, i) => (
//                 <div key={i} className={`${getLightBg()} rounded-xl p-4 text-center hover:scale-[1.02] transition-transform`}>
//                   <p className="text-sm font-medium text-gray-700 mb-3">{item}</p>
//                   <div className={`w-12 h-12 mx-auto ${getButtonGradient()} rounded-xl flex items-center justify-center text-white text-2xl`}>
//                     +
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* ATTENDANCE TAB - EMPTY STATE */}
//         {activeTab === 'attendance' && (
//           <div className="bg-white rounded-2xl border border-gray-200 p-4 lg:p-8">
//             <div className="text-center py-8 lg:py-16">
//               <div className="w-16 h-16 lg:w-24 lg:h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
//                 <FileText className="h-8 lg:h-12 w-8 lg:w-12 text-gray-400" />
//               </div>
//               <h3 className="text-xl lg:text-2xl font-bold text-gray-800 mb-2">Attendance</h3>
//               <p className="text-gray-500 text-sm lg:text-base">
//                 No data available for this section yet. Content will appear here once it's been added.
//               </p>
//             </div>
//           </div>
//         )}

//         {/* OTHER TABS - EMPTY STATE */}
//         {activeTab !== 'about' && activeTab !== 'work' && activeTab !== 'attendance' && (
//           <div className="bg-white rounded-2xl border border-gray-200 p-4 lg:p-8">
//             <div className="text-center py-8 lg:py-16">
//               <div className="w-16 h-16 lg:w-24 lg:h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
//                 <FileText className="h-8 lg:h-12 w-8 lg:w-12 text-gray-400" />
//               </div>
//               <h3 className="text-xl lg:text-2xl font-bold text-gray-800 mb-2">
//                 {tabs.find(t => t.id === activeTab)?.label || activeTab}
//               </h3>
//               <p className="text-gray-500 text-sm lg:text-base">
//                 No data available for this section yet.
//               </p>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* MOBILE BOTTOM NAV */}
//       <div className="lg:hidden fixed bottom-0 inset-x-0 bg-white border-t border-gray-200 z-40">
//         <div className="flex items-center justify-around p-3">
//           <button
//             onClick={() => setActiveTab('about')}
//             className={`flex flex-col items-center p-2 ${
//               activeTab === 'about' ? getTextAccent() : 'text-gray-500'
//             }`}
//           >
//             <User className="h-5 w-5" />
//             <span className="text-xs mt-1">About</span>
//           </button>
//           <button
//             onClick={() => setActiveTab('work')}
//             className={`flex flex-col items-center p-2 ${
//               activeTab === 'work' ? getTextAccent() : 'text-gray-500'
//             }`}
//           >
//             <Clock className="h-5 w-5" />
//             <span className="text-xs mt-1">Work</span>
//           </button>
//           <button
//             onClick={() => setActiveTab('attendance')}
//             className={`flex flex-col items-center p-2 ${
//               activeTab === 'attendance' ? getTextAccent() : 'text-gray-500'
//             }`}
//           >
//             <Calendar className="h-5 w-5" />
//             <span className="text-xs mt-1">Attendance</span>
//           </button>
//           <button
//             onClick={() => setShowContactDrawer(true)}
//             className="flex flex-col items-center p-2 text-gray-500"
//           >
//             <Phone className="h-5 w-5" />
//             <span className="text-xs mt-1">Contact</span>
//           </button>
//           <button
//             onClick={() => setShowMobileMenu(true)}
//             className="flex flex-col items-center p-2 text-gray-500"
//           >
//             <Menu className="h-5 w-5" />
//             <span className="text-xs mt-1">More</span>
//           </button>
//         </div>
//       </div>

//       {/* CONTACT DRAWER */}
//       {showContactDrawer && (
//         <div className="lg:hidden fixed inset-0 z-50 bg-black bg-opacity-50">
//           <div className="absolute bottom-0 inset-x-0 bg-white rounded-t-3xl p-6">
//             <div className="flex items-center justify-between mb-6">
//               <h3 className="text-xl font-bold text-gray-900">Contact Information</h3>
//               <button onClick={() => setShowContactDrawer(false)}>
//                 <X className="h-6 w-6 text-gray-500" />
//               </button>
//             </div>
//             <div className="space-y-6">
//               <ContactDetail label="Work Email" value={employee.workEmail || employee.email || 'N/A'} />
//               <ContactDetail label="Personal Email" value={employee.personalEmail || employee.email || 'N/A'} />
//               <ContactDetail label="Work Phone" value={employee.workPhone || employee.phone || 'N/A'} />
//               <ContactDetail label="Personal Phone" value={employee.personalPhone || employee.phone || 'N/A'} />
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// // Mobile Contact Item Component
// function ContactItemMobile({ label, value, theme }) {
//   const getTextAccent = () => theme?.accent ? `text-${theme.accent}` : 'text-orange-600';
  
//   return (
//     <div className="flex-shrink-0">
//       <p className="text-xs text-gray-500">{label}</p>
//       <p className={`text-sm font-bold ${getTextAccent()}`}>{value}</p>
//     </div>
//   );
// }

// // Mobile Contact Detail Component
// function ContactDetail({ label, value }) {
//   return (
//     <div>
//       <p className="text-sm text-gray-500 mb-1">{label}</p>
//       <p className="text-lg font-bold text-gray-900">{value}</p>
//     </div>
//   );
// }

// // Info Card Component
// function InfoCard({ title, children, theme }) {
//   const getTextAccent = () => theme?.accent ? `text-${theme.accent}` : 'text-orange-600';
//   const getLightBg = () => theme?.lightBg || 'bg-orange-50';
  
//   return (
//     <div className="bg-white rounded-2xl border border-gray-200 p-4 lg:p-6 hover:shadow-md transition-shadow">
//       <div className="flex items-center justify-between mb-4">
//         <h3 className={`font-bold ${getTextAccent()} text-lg`}>{title}</h3>
//         <button className={`p-2 hover:${getLightBg()} rounded-xl transition-colors`}>
//           <Edit2 className={`h-4 w-4 ${getTextAccent()}`} />
//         </button>
//       </div>
//       <div className="space-y-4">
//         {children}
//       </div>
//     </div>
//   );
// }

// // Info Row Component
// function InfoRow({ icon, label, value, theme }) {
//   const getTextAccent = () => theme?.accent ? `text-${theme.accent}` : 'text-orange-600';
//   const getLightBg = () => theme?.lightBg || 'bg-orange-50';
  
//   return (
//     <div className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
//       <div className="flex items-center gap-3">
//         <div className={`p-2 ${getLightBg()} rounded-xl`}>
//           {icon}
//         </div>
//         <span className="text-sm text-gray-500">{label}</span>
//       </div>
//       <span className="font-medium text-gray-900">{value}</span>
//     </div>
//   );
// }

// // Contact Item Component (Desktop)
// function ContactItem({ icon, label, value, theme }) {
//   const getTextAccent = () => theme?.accent ? `text-${theme.accent}` : 'text-orange-600';
  
//   return (
//     <div className="flex items-center gap-3">
//       <div className={getTextAccent()}>
//         {icon}
//       </div>
//       <div>
//         <p className="text-sm text-gray-500">{label}</p>
//         <p className="font-bold text-gray-900">{value}</p>
//       </div>
//     </div>
//   );
// }


// src/components/employee/Profile.jsx
'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchEmployees } from './store/slices/employeeSlice';
import {
  Calendar, User, MapPin, Globe, Briefcase, Clock, Users, DollarSign,
  Edit2, Plus, Phone, Mail, Building, FileText, ChevronDown, Badge,
  Sun, Moon, Smartphone, Monitor, MoreVertical, Menu, X,
  ArrowLeft, Search, Filter, Download, Eye, ChevronRight
} from 'lucide-react';
import { useTheme } from './ThemeContext';

const tabs = [
  { id: 'about', label: 'About', icon: <User className="h-4 w-4" /> },
  { id: 'work', label: 'Work Type & Shift', icon: <Clock className="h-4 w-4" /> },
  { id: 'attendance', label: 'Attendance', icon: <Calendar className="h-4 w-4" /> },
  { id: 'leave', label: 'Leave', icon: <Sun className="h-4 w-4" /> },
  { id: 'payroll', label: 'Payroll', icon: <DollarSign className="h-4 w-4" /> },
  { id: 'allowance', label: 'Allowance & Deduction', icon: <Users className="h-4 w-4" /> },
  { id: 'penalty', label: 'Penalty Account', icon: <FileText className="h-4 w-4" /> },
  { id: 'performance', label: 'Performance', icon: <Monitor className="h-4 w-4" /> },
  { id: 'documents', label: 'Documents', icon: <Briefcase className="h-4 w-4" /> }
];

const innerTabs = [
  { id: 'bonus', label: 'Bonus Points', icon: '🏆' },
  { id: 'interview', label: 'Scheduled Interview', icon: '📅' },
  { id: 'resignation', label: 'Resignation', icon: '📝' }
];

export default function Profile() {
  const { theme } = useTheme();
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { employees, loading } = useSelector((state) => state.employees);

  // Fetch employees if not already loaded
  useEffect(() => {
    if (employees.length === 0) {
      dispatch(fetchEmployees());
    }
  }, [dispatch, employees.length]);

  // Find employee by ID
  const employee = employees.find(emp => emp.id === parseInt(id)) || {
    name: 'Unknown Employee',
    code: 'N/A',
    department: 'N/A',
    email: '',
    phone: '',
    workEmail: '',
    personalEmail: '',
    workPhone: '',
    personalPhone: '',
    status: 'offline',
    position: '',
    workType: '',
    joinDate: '',
    dob: '',
    address: '',
    emergencyContact: '',
    photo: null,
    documents: []
  };

  // Get theme colors directly from theme context
  const themeConfig = theme || {
    accent: 'orange-600',
    textAccent: 'text-orange-600',
    borderColor: 'border-orange-600',
    button: 'from-orange-500 to-orange-600',
    buttonHover: 'hover:from-orange-600 hover:to-orange-700',
    lightBg: 'bg-orange-50',
    sidebarActive: 'bg-orange-200'
  };

  // Helper functions to get theme values
  const getAccentColor = () => theme?.accent || 'orange-600';
  const getBorderColor = () => theme?.borderColor || 'border-orange-600';
  const getTextAccent = () => theme?.accent ? `text-${theme.accent}` : 'text-orange-600';
  const getButtonGradient = () => theme?.button ? `bg-gradient-to-r ${theme.button}` : 'bg-gradient-to-r from-orange-500 to-orange-600';
  const getButtonHover = () => theme?.buttonHover || 'hover:from-orange-600 hover:to-orange-700';
  const getLightBg = () => theme?.lightBg || 'bg-orange-50';
  const getSidebarActive = () => theme?.sidebarActive || 'bg-orange-200';

  const [activeTab, setActiveTab] = useState('about');
  const [activeInnerTab, setActiveInnerTab] = useState('bonus');
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showContactDrawer, setShowContactDrawer] = useState(false);

  // Format date helper
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    } catch {
      return dateString;
    }
  };

  // Get initials for avatar
  const getInitials = (name) => {
    if (!name) return 'E';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* MOBILE HEADER */}
      <div className="lg:hidden sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => navigate('/employee')}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <ArrowLeft className="h-5 w-5 text-gray-600" />
            </button>
            <div className="flex items-center gap-2">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${getButtonGradient()} flex items-center justify-center text-white font-bold text-lg`}>
                {employee.photo ? (
                  <img src={employee.photo} alt={employee.name} className="w-full h-full rounded-xl object-cover" />
                ) : (
                  getInitials(employee.name)
                )}
              </div>
              <div>
                <h1 className="font-bold text-gray-900 text-lg">{employee.name}</h1>
                <p className="text-xs text-gray-500">{employee.code}</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <Search className="h-5 w-5 text-gray-600" />
            </button>
            <button 
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              {showMobileMenu ? <X className="h-5 w-5 text-gray-600" /> : <Menu className="h-5 w-5 text-gray-600" />}
            </button>
          </div>
        </div>

        {/* Mobile Contact Info */}
        <div className={`px-4 py-3 ${getLightBg()}`}>
          <div className="flex items-center justify-between overflow-x-auto gap-4 scrollbar-hide">
            <ContactItemMobile 
              label="Work Email"
              value={(employee.workEmail || employee.email || 'N/A').substring(0, 12) + '...'}
              theme={themeConfig}
            />
            <ContactItemMobile 
              label="Personal Email"
              value={(employee.personalEmail || employee.email || 'N/A').substring(0, 12) + '...'}
              theme={themeConfig}
            />
            <ContactItemMobile 
              label="Work Phone"
              value={(employee.workPhone || employee.phone || 'N/A').substring(0, 9) + '...'}
              theme={themeConfig}
            />
            <ContactItemMobile 
              label="Personal Phone"
              value={(employee.personalPhone || employee.phone || 'N/A').substring(0, 9) + '...'}
              theme={themeConfig}
            />
          </div>
        </div>
      </div>

      {/* DESKTOP HEADER */}
      <div className="hidden lg:block bg-white shadow-sm border-b border-gray-200">
        <div className="px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${getButtonGradient()} flex items-center justify-center text-2xl font-black text-white overflow-hidden`}>
                  {employee.photo ? (
                    <img src={employee.photo} alt={employee.name} className="w-full h-full object-cover" />
                  ) : (
                    getInitials(employee.name)
                  )}
                </div>
                <div className={`absolute bottom-0 right-0 w-4 h-4 ${employee.status === 'online' ? 'bg-green-500' : 'bg-gray-400'} rounded-full border-2 border-white`} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-black text-gray-900">
                    {employee.name}
                  </h1>
                  <span className={`px-2 py-1 ${getLightBg()} ${getTextAccent()} rounded-full text-sm font-bold`}>
                    {employee.code}
                  </span>
                </div>
                <p className="text-gray-600">{employee.department || 'N/A'}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className={`px-4 py-2 ${getLightBg()} ${getTextAccent()} rounded-xl font-medium`}>
                Edit Profile
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-xl">
                <MoreVertical className="h-5 w-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE TABS DRAWER */}
      {showMobileMenu && (
        <div className="lg:hidden fixed inset-x-0 top-[104px] z-40 bg-white border-b border-gray-200 shadow-lg">
          <div className="p-4">
            <div className="space-y-1">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setShowMobileMenu(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-4 rounded-xl text-left ${
                    activeTab === tab.id
                      ? `${getSidebarActive()} ${getTextAccent()} border-l-4 ${getBorderColor()}`
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <span className={activeTab === tab.id ? getTextAccent() : 'text-gray-400'}>
                    {tab.icon}
                  </span>
                  <span className="font-medium">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* MAIN CONTENT AREA */}
      <div className="p-4 lg:p-8">
        {/* MOBILE CURRENT TAB HEADER */}
        <div className="lg:hidden mb-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-black text-gray-900">
              {tabs.find(t => t.id === activeTab)?.label || 'Profile'}
            </h2>
            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-gray-100 rounded-xl">
                <Filter className="h-5 w-5 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-xl">
                <Download className="h-5 w-5 text-gray-600" />
              </button>
            </div>
          </div>
          {activeTab === 'work' && (
            <div className="mt-4 flex items-center gap-2 overflow-x-auto scrollbar-hide">
              {innerTabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveInnerTab(tab.id)}
                  className={`flex-shrink-0 px-4 py-2 rounded-full font-medium ${
                    activeInnerTab === tab.id
                      ? `${getButtonGradient()} text-white`
                      : `${getLightBg()} ${getTextAccent()}`
                  }`}
                >
                  <span className="mr-2">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* DESKTOP TABS */}
        <div className="hidden lg:block mb-8">
          <div className="flex items-center border-b border-gray-200">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-4 font-medium border-b-2 ${
                  activeTab === tab.id
                    ? `${getBorderColor()} ${getTextAccent()}`
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* CONTENT */}
        {activeTab === 'about' && (
          <div className="space-y-4 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-6">
            <InfoCard title="Personal Information" theme={themeConfig}>
              <InfoRow icon={<Calendar className="h-5 w-5" />} label="Date of Birth" value={employee.dob ? formatDate(employee.dob) : 'N/A'} theme={themeConfig} />
              <InfoRow icon={<User className="h-5 w-5" />} label="Gender" value={employee.gender || 'N/A'} theme={themeConfig} />
              <InfoRow icon={<MapPin className="h-5 w-5" />} label="Address" value={employee.address || 'N/A'} theme={themeConfig} />
              <InfoRow icon={<Globe className="h-5 w-5" />} label="Country" value={employee.country || 'N/A'} theme={themeConfig} />
              <InfoRow icon={<Phone className="h-5 w-5" />} label="Phone" value={employee.phone || 'N/A'} theme={themeConfig} />
              <InfoRow icon={<Mail className="h-5 w-5" />} label="Email" value={employee.email || 'N/A'} theme={themeConfig} />
            </InfoCard>

            <InfoCard title="Work Information" theme={themeConfig}>
              <InfoRow icon={<Building className="h-5 w-5" />} label="Department" value={employee.department || 'N/A'} theme={themeConfig} />
              <InfoRow icon={<Briefcase className="h-5 w-5" />} label="Job Position" value={employee.position || employee.designation || 'N/A'} theme={themeConfig} />
              <InfoRow icon={<Clock className="h-5 w-5" />} label="Shift" value={employee.shift || 'N/A'} theme={themeConfig} />
              <InfoRow icon={<Smartphone className="h-5 w-5" />} label="Work Type" value={employee.workType ? employee.workType.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()) : 'N/A'} theme={themeConfig} />
              <InfoRow icon={<Badge className="h-5 w-5" />} label="Badge ID" value={employee.badgeId || employee.docNum || 'N/A'} theme={themeConfig} />
            </InfoCard>

            <InfoCard title="Contract & Bank" theme={themeConfig}>
              <InfoRow icon={<DollarSign className="h-5 w-5" />} label="Salary" value={employee.salary || 'N/A'} theme={themeConfig} />
              <InfoRow icon={<Calendar className="h-5 w-5" />} label="Joining Date" value={employee.joinDate ? formatDate(employee.joinDate) : 'N/A'} theme={themeConfig} />
              <InfoRow icon={<Building className="h-5 w-5" />} label="Company" value={employee.company || 'N/A'} theme={themeConfig} />
              <InfoRow icon={<Users className="h-5 w-5" />} label="Manager" value={employee.manager || employee.reportingManager || 'N/A'} theme={themeConfig} />
              {employee.emergencyContact && (
                <InfoRow icon={<Phone className="h-5 w-5" />} label="Emergency Contact" value={employee.emergencyContact} theme={themeConfig} />
              )}
            </InfoCard>
          </div>
        )}

        {activeTab === 'work' && activeInnerTab === 'bonus' && (
          <div className="bg-white rounded-2xl border border-gray-200 p-4 lg:p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-bold text-gray-800">Current Shift</h3>
                <p className={`text-3xl lg:text-4xl font-black ${getTextAccent()} mt-2`}>{employee.shift || 'Not Assigned'}</p>
                <p className="text-sm text-gray-500 mt-2">Work Type: {employee.workType ? employee.workType.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()) : 'N/A'}</p>
              </div>
              <button className={`px-4 py-3 ${getButtonGradient()} ${getButtonHover()} text-white rounded-xl font-medium text-sm transition-all`}>
                Reallocate Shift
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8">
              {['Work type request', 'Rotating work type', 'Shift request', 'Rotating Shift'].map((item, i) => (
                <div key={i} className={`${getLightBg()} rounded-xl p-4 text-center hover:scale-[1.02] transition-transform`}>
                  <p className="text-sm font-medium text-gray-700 mb-3">{item}</p>
                  <div className={`w-12 h-12 mx-auto ${getButtonGradient()} rounded-xl flex items-center justify-center text-white text-2xl`}>
                    +
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ATTENDANCE TAB - EMPTY STATE */}
        {activeTab === 'attendance' && (
          <div className="bg-white rounded-2xl border border-gray-200 p-4 lg:p-8">
            <div className="text-center py-8 lg:py-16">
              <div className="w-16 h-16 lg:w-24 lg:h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                <FileText className="h-8 lg:h-12 w-8 lg:w-12 text-gray-400" />
              </div>
              <h3 className="text-xl lg:text-2xl font-bold text-gray-800 mb-2">Attendance</h3>
              <p className="text-gray-500 text-sm lg:text-base">
                No data available for this section yet. Content will appear here once it's been added.
              </p>
            </div>
          </div>
        )}

        {/* OTHER TABS - EMPTY STATE */}
        {activeTab !== 'about' && activeTab !== 'work' && activeTab !== 'attendance' && (
          <div className="bg-white rounded-2xl border border-gray-200 p-4 lg:p-8">
            <div className="text-center py-8 lg:py-16">
              <div className="w-16 h-16 lg:w-24 lg:h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                <FileText className="h-8 lg:h-12 w-8 lg:w-12 text-gray-400" />
              </div>
              <h3 className="text-xl lg:text-2xl font-bold text-gray-800 mb-2">
                {tabs.find(t => t.id === activeTab)?.label || activeTab}
              </h3>
              <p className="text-gray-500 text-sm lg:text-base">
                No data available for this section yet.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* MOBILE BOTTOM NAV */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 bg-white border-t border-gray-200 z-40">
        <div className="flex items-center justify-around p-3">
          <button
            onClick={() => setActiveTab('about')}
            className={`flex flex-col items-center p-2 ${
              activeTab === 'about' ? getTextAccent() : 'text-gray-500'
            }`}
          >
            <User className="h-5 w-5" />
            <span className="text-xs mt-1">About</span>
          </button>
          <button
            onClick={() => setActiveTab('work')}
            className={`flex flex-col items-center p-2 ${
              activeTab === 'work' ? getTextAccent() : 'text-gray-500'
            }`}
          >
            <Clock className="h-5 w-5" />
            <span className="text-xs mt-1">Work</span>
          </button>
          <button
            onClick={() => setActiveTab('attendance')}
            className={`flex flex-col items-center p-2 ${
              activeTab === 'attendance' ? getTextAccent() : 'text-gray-500'
            }`}
          >
            <Calendar className="h-5 w-5" />
            <span className="text-xs mt-1">Attendance</span>
          </button>
          <button
            onClick={() => setShowContactDrawer(true)}
            className="flex flex-col items-center p-2 text-gray-500"
          >
            <Phone className="h-5 w-5" />
            <span className="text-xs mt-1">Contact</span>
          </button>
          <button
            onClick={() => setShowMobileMenu(true)}
            className="flex flex-col items-center p-2 text-gray-500"
          >
            <Menu className="h-5 w-5" />
            <span className="text-xs mt-1">More</span>
          </button>
        </div>
      </div>

      {/* CONTACT DRAWER */}
      {showContactDrawer && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black bg-opacity-50">
          <div className="absolute bottom-0 inset-x-0 bg-white rounded-t-3xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Contact Information</h3>
              <button onClick={() => setShowContactDrawer(false)}>
                <X className="h-6 w-6 text-gray-500" />
              </button>
            </div>
            <div className="space-y-6">
              <ContactDetail label="Work Email" value={employee.workEmail || employee.email || 'N/A'} />
              <ContactDetail label="Personal Email" value={employee.personalEmail || employee.email || 'N/A'} />
              <ContactDetail label="Work Phone" value={employee.workPhone || employee.phone || 'N/A'} />
              <ContactDetail label="Personal Phone" value={employee.personalPhone || employee.phone || 'N/A'} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Mobile Contact Item Component
function ContactItemMobile({ label, value, theme }) {
  const getTextAccent = () => theme?.accent ? `text-${theme.accent}` : 'text-orange-600';
  
  return (
    <div className="flex-shrink-0">
      <p className="text-xs text-gray-500">{label}</p>
      <p className={`text-sm font-bold ${getTextAccent()}`}>{value}</p>
    </div>
  );
}

// Mobile Contact Detail Component
function ContactDetail({ label, value }) {
  return (
    <div>
      <p className="text-sm text-gray-500 mb-1">{label}</p>
      <p className="text-lg font-bold text-gray-900">{value}</p>
    </div>
  );
}

// Info Card Component
function InfoCard({ title, children, theme }) {
  const getTextAccent = () => theme?.accent ? `text-${theme.accent}` : 'text-orange-600';
  const getLightBg = () => theme?.lightBg || 'bg-orange-50';
  
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-4 lg:p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <h3 className={`font-bold ${getTextAccent()} text-lg`}>{title}</h3>
        <button className={`p-2 hover:${getLightBg()} rounded-xl transition-colors`}>
          <Edit2 className={`h-4 w-4 ${getTextAccent()}`} />
        </button>
      </div>
      <div className="space-y-4">
        {children}
      </div>
    </div>
  );
}

// Info Row Component
function InfoRow({ icon, label, value, theme }) {
  const getTextAccent = () => theme?.accent ? `text-${theme.accent}` : 'text-orange-600';
  const getLightBg = () => theme?.lightBg || 'bg-orange-50';
  
  return (
    <div className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
      <div className="flex items-center gap-3">
        <div className={`p-2 ${getLightBg()} rounded-xl`}>
          {icon}
        </div>
        <span className="text-sm text-gray-500">{label}</span>
      </div>
      <span className="font-medium text-gray-900">{value}</span>
    </div>
  );
}

// Contact Item Component (Desktop)
function ContactItem({ icon, label, value, theme }) {
  const getTextAccent = () => theme?.accent ? `text-${theme.accent}` : 'text-orange-600';
  
  return (
    <div className="flex items-center gap-3">
      <div className={getTextAccent()}>
        {icon}
      </div>
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="font-bold text-gray-900">{value}</p>
      </div>
    </div>
  );
}