// 'use client';

// import React from 'react';
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
// import { UserCheck, Briefcase, Users, TrendingUp, CheckCircle } from 'lucide-react';
// import { useTheme } from './ThemeContext'; // ← your existing theme context

// export default function RecruitmentDashboard() {
//   const { theme } = useTheme();

//   // === KPI Data ===
//   const kpiData = [
//     { label: 'Total Vacancies', value: 159, icon: Briefcase, color: 'bg-orange-100 border-orange-400' },
//     { label: 'Ongoing Recruitments', value: 14, icon: Users, color: 'bg-red-100 border-red-400' },
//     { label: 'Hired Candidates', value: 9, icon: CheckCircle, color: 'bg-emerald-100 border-emerald-400' },
//     { label: 'Conversion Rate', value: '25.0%', icon: TrendingUp, color: 'bg-blue-100 border-blue-400' },
//     { label: 'Offer Acceptance Rate', value: '11.1%', icon: UserCheck, color: 'bg-teal-100 border-teal-400' },
//   ];

//   const skillZone = [
//     { skill: 'DR Driver', count: 1, color: 'bg-orange-500' },
//     { skill: 'CH Chief', count: 1, color: 'bg-emerald-500' },
//     { skill: 'SU Supervisor', count: 0, color: 'bg-yellow-400' },
//     { skill: 'EL Electrician', count: 0, color: 'bg-gray-400' },
//     { skill: 'CA Calling Agent', count: 0, color: 'bg-blue-500' },
//   ];

//   const offerStatus = [
//     { name: 'Not Sent', value: 60, color: '#94A3B8' },
//     { name: 'Sent', value: 20, color: '#FBBF24' },
//     { name: 'Accepted', value: 10, color: '#3B82F6' },
//     { name: 'Rejected', value: 5, color: '#EF4444' },
//     { name: 'Joined', value: 5, color: '#10B981' },
//   ];

//   const onboardCandidates = [
//     { name: 'Amelia Hayes', dept: 'Odoo Dev - Senior', initials: 'AH' },
//     { name: 'Ravi Kumar', dept: 'Odoo Dev - Mid Level', initials: 'RK' },
//     { name: 'Emily Turner', dept: 'Odoo Dev - Junior', initials: 'ET' },
//   ];

//   const joiningsData = [
//     { month: 'Jan', count: 0 }, { month: 'Feb', count: 0 }, { month: 'Mar', count: 0 },
//     { month: 'Apr', count: 0 }, { month: 'May', count: 0 }, { month: 'Jun', count: 0 },
//     { month: 'Jul', count: 0 }, { month: 'Aug', count: 2 }, { month: 'Sep', count: 2 },
//     { month: 'Oct', count: 3 }, { month: 'Nov', count: 1 }, { month: 'Dec', count: 0 },
//   ];

//   const stageData = [
//     { stage: 'Initial', count: 2 },
//     { stage: 'Applied', count: 3 },
//     { stage: 'Test', count: 1 },
//     { stage: 'Interview', count: 2 },
//     { stage: 'Cancelled', count: 1 },
//     { stage: 'Hired', count: 6 },
//   ];

//   const ongoingRecruitments = [
//     { recruitment: 'Recruitment Drive', managers: 'Abigail Roberts, Dev Prakash' },
//     { recruitment: 'FutureForce Recruitment', managers: 'Alexander Smith' },
//     { recruitment: 'Mobile Developer', managers: 'Amelia Cooper' },
//     { recruitment: 'New Title Up', managers: 'Noah Young' },
//     { recruitment: 'Engineer', managers: 'Sophia Chen' },
//   ];

//   return (
//     <div className="p-6 space-y-8 bg-gray-50 min-h-screen">
//       {/* KPI Cards – Modern Glass Style */}
//       <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
//         {kpiData.map((kpi, i) => (
//           <div
//             key={i}
//             className={`group relative overflow-hidden rounded-2xl border-2 ${kpi.color} bg-white/70 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300`}
//           >
//             <div className="p-6">
//               <div className="flex items-center justify-between mb-3">
//                 <kpi.icon className={`w-8 h-8 text-${theme.accent} opacity-70`} />
//                 <span className="text-3xl font-bold text-gray-900">{kpi.value}</span>
//               </div>
//               <p className="text-sm text-gray-600 font-medium">{kpi.label}</p>
//             </div>
//             <div className={`absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r ${theme.gradient} opacity-70`}></div>
//           </div>
//         ))}
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//         {/* Skill Zone */}
//         <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
//           <h3 className="text-lg font-bold text-gray-800 mb-5">Skill Zone Status</h3>
//           <div className="space-y-4">
//             {skillZone.map((item, i) => (
//               <div key={i} className="flex items-center justify-between">
//                 <div className="flex items-center gap-3">
//                   <div className={`w-10 h-10 rounded-xl ${item.color} flex items-center justify-center text-white font-bold text-sm shadow-md`}>
//                     {item.skill.split(' ').map(s => s[0]).join('')}
//                   </div>
//                   <span className="font-medium text-gray-700">{item.skill}</span>
//                 </div>
//                 <span className={`text-lg font-bold text-${theme.accent}`}>{item.count}</span>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Offer Letter Status */}
//         <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
//           <h3 className="text-lg font-bold text-gray-800 mb-5">Offer Letter Status</h3>
//           <div className="h-56">
//             <ResponsiveContainer width="100%" height="100%">
//               <PieChart>
//                 <Pie
//                   data={offerStatus}
//                   cx="50%"
//                   cy="50%"
//                   innerRadius={50}
//                   outerRadius={80}
//                   paddingAngle={3}
//                   dataKey="value"
//                 >
//                   {offerStatus.map((entry, i) => (
//                     <Cell key={`cell-${i}`} fill={entry.color} />
//                   ))}
//                 </Pie>
//                 <Tooltip />
//               </PieChart>
//             </ResponsiveContainer>
//           </div>
//           <div className="grid grid-cols-2 gap-3 mt-4 text-sm">
//             {offerStatus.map((item) => (
//               <div key={item.name} className="flex items-center gap-2">
//                 <div className="w-4 h-4 rounded" style={{ backgroundColor: item.color }}></div>
//                 <span className="text-gray-600">{item.name}</span>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Onboard Candidates */}
//         <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
//           <div className="flex justify-between items-center mb-5">
//             <h3 className="text-lg font-bold text-gray-800">Onboard Candidates</h3>
//             <a href="#" className={`text-sm font-medium text-${theme.accent} hover:underline`}>View All</a>
//           </div>
//           <div className="space-y-4">
//             {onboardCandidates.map((c, i) => (
//               <div key={i} className="flex items-center gap-4 hover:bg-gray-50 p-3 rounded-xl transition">
//                 <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${theme.gradient} flex items-center justify-center text-white font-bold shadow-lg`}>
//                   {c.initials}
//                 </div>
//                 <div>
//                   <p className="font-semibold text-gray-900">{c.name}</p>
//                   <p className="text-sm text-gray-500">{c.dept}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Joinings Per Month */}
//         <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
//           <div className="flex justify-between items-center mb-5">
//             <h3 className="text-lg font-bold text-gray-800">Joinings Per Month</h3>
//             <select className="text-sm border border-gray-300 rounded-lg px-3 py-1.5 focus:ring-2 focus:ring-current focus:border-transparent outline-none">
//               <option>2025</option>
//             </select>
//           </div>
//           <div className="h-56">
//             <ResponsiveContainer width="100%" height="100%">
//               <BarChart data={joiningsData}>
//                 <CartesianGrid strokeDasharray="4 4" stroke="#f0f0f0" />
//                 <XAxis dataKey="month" tick={{ fontSize: 11 }} />
//                 <YAxis tick={{ fontSize: 11 }} />
//                 <Tooltip cursor={{ fill: 'rgba(0,0,0,0.05)' }} />
//                 <Bar dataKey="count" fill={theme.accent === 'cyan-600' ? '#06b6d4' : `#${theme.accent.split('-')[1]}`} radius={[8, 8, 0, 0]} />
//               </BarChart>
//             </ResponsiveContainer>
//           </div>
//         </div>
//       </div>

//       {/* Candidates Per Stage */}
//       <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
//         <h3 className="text-lg font-bold text-gray-800 mb-5">Candidates Per Stage</h3>
//         <div className="h-64">
//           <ResponsiveContainer width="100%" height="100%">
//             <BarChart data={stageData} layout="horizontal">
//               <CartesianGrid strokeDasharray="4 4" stroke="#f0f0f0" />
//               <XAxis type="number" tick={{ fontSize: 12 }} />
//               <YAxis dataKey="stage" type="category" tick={{ fontSize: 12 }} width={100} />
//               <Tooltip />
//               <Bar dataKey="count" fill={`#${theme.accent.split('-')[1] || '0891b2'}`} radius={[0, 8, 8, 0]} />
//             </BarChart>
//           </ResponsiveContainer>
//         </div>
//       </div>

//       {/* Ongoing Recruitments */}
//       <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
//         <h3 className="text-lg font-bold text-gray-800 mb-5">Ongoing Recruitments & Hiring Managers</h3>
//         <div className="overflow-x-auto">
//           <table className="w-full text-sm">
//             <thead>
//               <tr className="border-b border-gray-200">
//                 <th className="text-left py-3 font-semibold text-gray-700">Recruitment</th>
//                 <th className="text-left py-3 font-semibold text-gray-700">Hiring Managers</th>
//               </tr>
//             </thead>
//             <tbody>
//               {ongoingRecruitments.map((row, i) => (
//                 <tr key={i} className="border-b border-gray-100 hover:bg-gray-50 transition">
//                   <td className="py-4 font-medium text-gray-900">{row.recruitment}</td>
//                   <td className="py-4 text-gray-600">{row.managers}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }


'use client';

import React, { useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line,
  AreaChart, Area, Legend 
} from 'recharts';
import { 
  UserCheck,X,Plus, Briefcase, Users, TrendingUp, CheckCircle, 
  ArrowUpRight, ArrowDownRight, Download, Filter, Calendar,
  MoreVertical, Eye, Edit2, Trash2, RefreshCw, Search,
  Clock, DollarSign, Award, Target, Star, Crown, Zap,
  ChevronRight, ChevronDown, ChevronLeft, ChevronUp,
  Building, Mail, Phone, MapPin, Users as UsersIcon,
  BarChart3, PieChart as PieChartIcon, LineChart as LineChartIcon
} from 'lucide-react';
import { useTheme } from './ThemeContext';

export default function RecruitmentDashboard() {
  const { theme } = useTheme();
  
  // Theme helper functions
  const getAccentColor = () => theme?.accent || 'orange-600';
  const getBorderColor = () => theme?.borderColor || 'border-orange-600';
  const getTextAccent = () => theme?.accent ? `text-${theme.accent}` : 'text-orange-600';
  const getButtonGradient = () => theme?.button ? `bg-gradient-to-r ${theme.button}` : 'bg-gradient-to-r from-orange-500 to-orange-600';
  const getButtonHover = () => theme?.buttonHover || 'hover:from-orange-600 hover:to-orange-700';
  const getLightBg = () => theme?.lightBg || 'bg-orange-50';
  const getRingColor = () => theme?.ringColor || 'ring-orange-500';

  const [timeRange, setTimeRange] = useState('monthly');
  const [viewMode, setViewMode] = useState('grid');

  // === KPI Data ===
  const kpiData = [
    { 
      label: 'Total Vacancies', 
      value: 159, 
      icon: Briefcase, 
      color: 'bg-orange-100 text-orange-700 border-orange-200',
      change: '+12',
      trend: 'up',
      description: 'Open positions across departments'
    },
    { 
      label: 'Ongoing Recruitments', 
      value: 14, 
      icon: Users, 
      color: 'bg-red-100 text-red-700 border-red-200',
      change: '-3',
      trend: 'down',
      description: 'Active recruitment processes'
    },
    { 
      label: 'Hired Candidates', 
      value: 9, 
      icon: CheckCircle, 
      color: 'bg-emerald-100 text-emerald-700 border-emerald-200',
      change: '+4',
      trend: 'up',
      description: 'Successfully hired this month'
    },
    { 
      label: 'Conversion Rate', 
      value: '25.0%', 
      icon: TrendingUp, 
      color: 'bg-blue-100 text-blue-700 border-blue-200',
      change: '+2.5%',
      trend: 'up',
      description: 'Application to hire ratio'
    },
    { 
      label: 'Offer Acceptance', 
      value: '11.1%', 
      icon: UserCheck, 
      color: 'bg-teal-100 text-teal-700 border-teal-200',
      change: '+1.2%',
      trend: 'up',
      description: 'Accepted offers percentage'
    },
  ];

  const skillZone = [
    { skill: 'DR Driver', count: 1, color: 'bg-gradient-to-r from-orange-500 to-amber-500' },
    { skill: 'CH Chief', count: 1, color: 'bg-gradient-to-r from-emerald-500 to-green-500' },
    { skill: 'SU Supervisor', count: 0, color: 'bg-gradient-to-r from-yellow-500 to-amber-500' },
    { skill: 'EL Electrician', count: 0, color: 'bg-gradient-to-r from-gray-500 to-slate-500' },
    { skill: 'CA Calling Agent', count: 0, color: 'bg-gradient-to-r from-blue-500 to-cyan-500' },
  ];

  const offerStatus = [
    { name: 'Not Sent', value: 60, color: '#94A3B8', icon: Clock },
    { name: 'Sent', value: 20, color: '#FBBF24', icon: Mail },
    { name: 'Accepted', value: 10, color: '#3B82F6', icon: CheckCircle },
    { name: 'Rejected', value: 5, color: '#EF4444', icon: X },
    { name: 'Joined', value: 5, color: '#10B981', icon: UserCheck },
  ];

  const onboardCandidates = [
    { 
      name: 'Amelia Hayes', 
      dept: 'Odoo Dev - Senior', 
      initials: 'AH',
      avatarColor: 'bg-gradient-to-br from-blue-500 to-cyan-500',
      joiningDate: '15 Dec, 2025',
      status: 'Onboarded'
    },
    { 
      name: 'Ravi Kumar', 
      dept: 'Odoo Dev - Mid Level', 
      initials: 'RK',
      avatarColor: 'bg-gradient-to-br from-green-500 to-emerald-500',
      joiningDate: '10 Dec, 2025',
      status: 'Pending'
    },
    { 
      name: 'Emily Turner', 
      dept: 'Odoo Dev - Junior', 
      initials: 'ET',
      avatarColor: 'bg-gradient-to-br from-purple-500 to-pink-500',
      joiningDate: '05 Dec, 2025',
      status: 'Onboarded'
    },
    { 
      name: 'Michael Chen', 
      dept: 'UI/UX Designer', 
      initials: 'MC',
      avatarColor: 'bg-gradient-to-br from-amber-500 to-orange-500',
      joiningDate: '01 Dec, 2025',
      status: 'Onboarded'
    },
  ];

  const joiningsData = [
    { month: 'Jan', count: 0, target: 3 }, { month: 'Feb', count: 0, target: 4 },
    { month: 'Mar', count: 0, target: 5 }, { month: 'Apr', count: 0, target: 4 },
    { month: 'May', count: 0, target: 6 }, { month: 'Jun', count: 0, target: 5 },
    { month: 'Jul', count: 0, target: 7 }, { month: 'Aug', count: 2, target: 8 },
    { month: 'Sep', count: 2, target: 7 }, { month: 'Oct', count: 3, target: 6 },
    { month: 'Nov', count: 1, target: 5 }, { month: 'Dec', count: 0, target: 4 },
  ];

  const stageData = [
    { stage: 'Initial', count: 2, color: '#FBBF24' },
    { stage: 'Applied', count: 3, color: '#3B82F6' },
    { stage: 'Test', count: 1, color: '#8B5CF6' },
    { stage: 'Interview', count: 2, color: '#EC4899' },
    { stage: 'Cancelled', count: 1, color: '#6B7280' },
    { stage: 'Hired', count: 6, color: '#10B981' },
  ];

  const ongoingRecruitments = [
    { 
      recruitment: 'Recruitment Drive', 
      managers: 'Abigail Roberts, Dev Prakash',
      candidates: 45,
      deadline: '30 Dec, 2025',
      status: 'Active',
      progress: 75
    },
    { 
      recruitment: 'FutureForce Recruitment', 
      managers: 'Alexander Smith',
      candidates: 28,
      deadline: '15 Jan, 2026',
      status: 'Active',
      progress: 60
    },
    { 
      recruitment: 'Mobile Developer', 
      managers: 'Amelia Cooper',
      candidates: 12,
      deadline: '20 Dec, 2025',
      status: 'Active',
      progress: 90
    },
    { 
      recruitment: 'New Title Up', 
      managers: 'Noah Young',
      candidates: 8,
      deadline: '10 Jan, 2026',
      status: 'On Hold',
      progress: 30
    },
    { 
      recruitment: 'Engineer', 
      managers: 'Sophia Chen',
      candidates: 32,
      deadline: '05 Jan, 2026',
      status: 'Active',
      progress: 85
    },
  ];

  const departmentHiring = [
    { department: 'Engineering', hired: 8, open: 12, target: 15 },
    { department: 'Sales', hired: 3, open: 5, target: 8 },
    { department: 'Marketing', hired: 2, open: 3, target: 6 },
    { department: 'HR', hired: 1, open: 2, target: 3 },
    { department: 'Operations', hired: 4, open: 6, target: 10 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50/50 via-white to-blue-50/30 p-4 lg:p-6">
      {/* HEADER */}
      <div className="mb-6 lg:mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Recruitment Dashboard</h1>
            <p className="text-gray-600 mt-1">Track and manage all recruitment activities</p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search recruitments..."
                className={`pl-10 pr-4 py-2 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 ${getRingColor()} focus:border-transparent w-full lg:w-64`}
              />
            </div>
            
            <button className={`p-2 ${getLightBg()} ${getTextAccent()} rounded-xl hover:opacity-90`}>
              <Filter className="h-5 w-5" />
            </button>
            
            <div className="flex items-center gap-1 border border-gray-300 rounded-xl px-3 py-2 bg-white">
              <Calendar className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-700">Dec 2025</span>
            </div>
            
            <button className="hidden lg:flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-xl text-sm hover:bg-gray-50">
              <Download className="h-4 w-4" /> Export
            </button>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex items-center gap-2 mt-6 overflow-x-auto scrollbar-hide">
          <div className="flex items-center gap-2 p-1 bg-gray-100 rounded-xl">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3 py-1.5 text-sm rounded-lg flex items-center gap-2 ${
                viewMode === 'grid' ? 'bg-white shadow-sm' : ''
              }`}
            >
              <BarChart3 className="h-4 w-4" /> Grid
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-3 py-1.5 text-sm rounded-lg flex items-center gap-2 ${
                viewMode === 'list' ? 'bg-white shadow-sm' : ''
              }`}
            >
              <UsersIcon className="h-4 w-4" /> List
            </button>
          </div>
          
          {['weekly', 'monthly', 'quarterly', 'yearly'].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-4 py-2 rounded-xl text-sm font-medium capitalize whitespace-nowrap ${
                timeRange === range
                  ? `${getButtonGradient()} ${getButtonHover()} text-white`
                  : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-300'
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      {/* KPI CARDS */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-6 mb-6 lg:mb-8">
        {kpiData.map((kpi, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl p-5 lg:p-6 shadow-lg border border-gray-200/50 hover:shadow-xl transition-shadow group"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 ${kpi.color.split(' ')[0]} rounded-xl`}>
                <kpi.icon className={`h-6 w-6 ${kpi.color.split(' ')[1]}`} />
              </div>
              <div className={`flex items-center text-sm font-medium ${
                kpi.trend === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                {kpi.trend === 'up' ? (
                  <ArrowUpRight className="h-4 w-4 mr-1" />
                ) : (
                  <ArrowDownRight className="h-4 w-4 mr-1" />
                )}
                {kpi.change}
              </div>
            </div>
            <h3 className="text-sm font-medium text-gray-500 mb-1">{kpi.label}</h3>
            <div className="flex items-baseline gap-2">
              <p className="text-2xl lg:text-3xl font-bold text-gray-900">{kpi.value}</p>
              <span className="text-sm text-gray-500">this {timeRange}</span>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100">
              <p className="text-xs text-gray-500 truncate">{kpi.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6 lg:mb-8">
        {/* Skill Zone Status */}
        <div className="lg:col-span-1 bg-white rounded-2xl shadow-lg border border-gray-200/50 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-900">Skill Zone Status</h3>
            <button className={`p-2 ${getLightBg()} ${getTextAccent()} rounded-xl hover:opacity-90`}>
              <RefreshCw className="h-4 w-4" />
            </button>
          </div>
          <div className="space-y-4">
            {skillZone.map((item, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 ${item.color} rounded-xl flex items-center justify-center text-white font-bold shadow-lg`}>
                    {item.skill.split(' ').map(s => s[0]).join('')}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{item.skill}</p>
                    <p className="text-sm text-gray-500">Skill category</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-gray-900">{item.count}</p>
                  <p className="text-xs text-gray-500">candidates</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Offer Letter Status */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg border border-gray-200/50 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-900">Offer Letter Status</h3>
            <div className="flex items-center gap-2">
              <select className={`px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 ${getRingColor()} focus:border-transparent`}>
                <option>This Month</option>
                <option>Last Month</option>
                <option>Last Quarter</option>
              </select>
              <button className="p-1.5 hover:bg-gray-100 rounded-lg">
                <MoreVertical className="h-5 w-5 text-gray-600" />
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={offerStatus}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      paddingAngle={2}
                      dataKey="value"
                      labelLine={false}
                    >
                      {offerStatus.map((entry, i) => (
                        <Cell key={`cell-${i}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="space-y-4">
              {offerStatus.map((item, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: item.color }}>
                      {item.icon && <item.icon className="h-4 w-4 text-white" />}
                    </div>
                    <span className="font-medium text-gray-900">{item.name}</span>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900">{item.value}</p>
                    <p className="text-xs text-gray-500">candidates</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* SECOND GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6 lg:mb-8">
        {/* Onboard Candidates */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200/50 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-gray-900">Onboard Candidates</h3>
              <p className="text-sm text-gray-500 mt-1">Recent hires and pending onboardings</p>
            </div>
            <button className={`px-4 py-2 ${getButtonGradient()} ${getButtonHover()} text-white text-sm font-medium rounded-xl flex items-center gap-2`}>
              <UserCheck className="h-4 w-4" /> View All
            </button>
          </div>
          <div className="space-y-4">
            {onboardCandidates.map((c, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 ${c.avatarColor} rounded-xl flex items-center justify-center text-white font-bold text-lg`}>
                    {c.initials}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{c.name}</p>
                    <p className="text-sm text-gray-500">{c.dept}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-700">{c.joiningDate}</p>
                  <span className={`inline-flex items-center px-3 py-1 rounded-lg text-xs font-medium ${
                    c.status === 'Onboarded' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {c.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Joinings Per Month */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200/50 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-gray-900">Joinings Per Month</h3>
              <p className="text-sm text-gray-500 mt-1">Actual vs target hiring for 2025</p>
            </div>
            <select className={`px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 ${getRingColor()} focus:border-transparent`}>
              <option>2025</option>
              <option>2024</option>
              <option>2023</option>
            </select>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={joiningsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area 
                  type="monotone" 
                  dataKey="target" 
                  stackId="1"
                  stroke="#94A3B8" 
                  fill="#94A3B8" 
                  fillOpacity={0.1}
                  strokeWidth={2}
                />
                <Area 
                  type="monotone" 
                  dataKey="count" 
                  stackId="1"
                  stroke={getButtonGradient().includes('from-orange-500') ? '#f97316' : '#0891b2'} 
                  fill={getButtonGradient().includes('from-orange-500') ? '#f97316' : '#0891b2'} 
                  fillOpacity={0.3}
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center justify-center gap-6 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-orange-500"></div>
              <span className="text-sm text-gray-600">Actual Joinings</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-slate-400"></div>
              <span className="text-sm text-gray-600">Target</span>
            </div>
          </div>
        </div>
      </div>

      {/* THIRD GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6 lg:mb-8">
        {/* Candidates Per Stage */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200/50 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-900">Candidates Per Stage</h3>
            <button className={`p-2 ${getLightBg()} ${getTextAccent()} rounded-xl hover:opacity-90`}>
              <Download className="h-4 w-4" />
            </button>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stageData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" horizontal={false} />
                <XAxis type="number" />
                <YAxis 
                  dataKey="stage" 
                  type="category" 
                  width={80}
                  tick={{ fontSize: 12 }}
                />
                <Tooltip />
                <Bar 
                  dataKey="count" 
                  radius={[0, 4, 4, 0]}
                >
                  {stageData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-3 gap-2 mt-4">
            {stageData.map((stage, i) => (
              <div key={i} className="flex items-center gap-2 p-2">
                <div className="w-3 h-3 rounded" style={{ backgroundColor: stage.color }}></div>
                <span className="text-xs text-gray-600 truncate">{stage.stage}</span>
                <span className="text-xs font-medium text-gray-900 ml-auto">{stage.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Department Hiring */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200/50 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-900">Department Hiring Progress</h3>
            <button className="text-sm font-medium text-gray-600 hover:text-gray-900">
              View Details <ChevronRight className="h-4 w-4 inline" />
            </button>
          </div>
          <div className="space-y-4">
            {departmentHiring.map((dept, i) => (
              <div key={i} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-900">{dept.department}</span>
                  <span className="text-sm text-gray-600">{dept.hired} / {dept.target} hired</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-orange-500 to-amber-500 rounded-full"
                    style={{ width: `${(dept.hired / dept.target) * 100}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>Open: {dept.open}</span>
                  <span>Target: {dept.target}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ONGOING RECRUITMENTS TABLE */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200/50 overflow-hidden">
        {/* Table Header */}
        <div className={`${getLightBg()} border-b border-gray-200`}>
          <div className="flex items-center justify-between p-6">
            <div>
              <h3 className="text-lg font-bold text-gray-900">Ongoing Recruitments</h3>
              <p className="text-sm text-gray-500 mt-1">{ongoingRecruitments.length} active recruitments</p>
            </div>
            
            <div className="flex items-center gap-3">
              <button className="p-2 hover:bg-gray-100 rounded-xl">
                <Download className="h-5 w-5 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-xl">
                <MoreVertical className="h-5 w-5 text-gray-600" />
              </button>
              <button
                className={`px-4 py-2 ${getButtonGradient()} ${getButtonHover()} text-white text-sm font-medium rounded-xl flex items-center gap-2`}
              >
                <Plus className="h-4 w-4" /> New Recruitment
              </button>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Recruitment</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Hiring Managers</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Candidates</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Deadline</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Progress</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {ongoingRecruitments.map((row, i) => (
                <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                        <Briefcase className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{row.recruitment}</p>
                        <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${
                          row.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {row.status}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">{row.managers}</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium bg-blue-100 text-blue-700">
                      <Users className="h-4 w-4 mr-1" /> {row.candidates}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">{row.deadline}</td>
                  <td className="px-6 py-4">
                    <div className="w-32">
                      <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                        <span>Progress</span>
                        <span>{row.progress}%</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-orange-500 to-orange-600 rounded-full"
                          style={{ width: `${row.progress}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button className="p-1.5 hover:bg-gray-100 rounded-lg">
                        <Eye className="h-4 w-4 text-gray-600" />
                      </button>
                      <button className="p-1.5 hover:bg-gray-100 rounded-lg">
                        <Edit2 className="h-4 w-4 text-gray-600" />
                      </button>
                      <button className="p-1.5 hover:bg-gray-100 rounded-lg">
                        <Trash2 className="h-4 w-4 text-gray-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}