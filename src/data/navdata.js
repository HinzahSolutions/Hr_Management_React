

import { color } from 'chart.js/helpers';
import {
  FaHome,
  FaUsersCog,
  FaUserPlus,
  FaUserTie,
  FaClock,
  FaCalendarAlt,
  FaFileInvoiceDollar,
  FaSignOutAlt,
} from 'react-icons/fa';

export const MODULES = [
  { 
    name: 'Base', 
    color: 'bg-gray-600', 
    icon: FaHome,
    basePath: '/dashboard' 
  },
  { 
    name: 'Recruitment', 
    color: 'bg-blue-600', 
    icon: FaUsersCog,
    basePath: '/recruitment' 
  },
  { 
    name: 'Onboarding', 
    color: 'bg-purple-600', 
    icon: FaUserPlus,
    basePath: '/onboarding' 
  },
  { 
    name: 'Employee', 
    color: 'bg-green-600', 
    icon: FaUserTie,
    basePath: '/employee' 
  },
  { 
    name: 'Attendance', 
    color: 'bg-yellow-600', 
    icon: FaClock,
    basePath: '/attendance' 
  },
  { 
    name: 'Leave', 
    color: 'bg-red-600', 
    icon: FaCalendarAlt,
    basePath: '/leave' 
  },
  { 
    name: 'Payroll', 
    color: 'bg-teal-600', 
    icon: FaFileInvoiceDollar,
    basePath: '/payroll' 
  },
  { 
    name: 'Offboarding', 
    color: 'bg-rose-600', 
    icon: FaSignOutAlt,
    basePath: '/offboarding' 
  },
];

export const SUB_PERMISSIONS = {
  Base: [
    { code: 'CO', name: 'Company',           color: 'bg-blue-600',     route: 'base/company' },
    { code: 'DE', name: 'Permission Assign', color: 'bg-purple-500',   route: '/base/company/permission-assign' },
     {code:'AP', name:'Admin Profile',color:'bg-green-500', route:'/base/company/admin'}
  ],
  Recruitment: [
    { code: 'RE', name: 'Recruitment',           color: 'bg-green-500', route: 'recruitment/recruitment' },
    { code: 'RD', name: 'Recruitment Dashboard', color: 'bg-blue-500',  route: '/recruitment/dash' },
  ],
  Onboarding: [
    { code: 'OB', name: 'Onboarding',     color: 'bg-green-500', route: '/onboarding/process' },
    { code: 'OC', name: 'Candidates',     color: 'bg-blue-500',  route: '/onboarding/candidates' },
  ],
  Employee: [
    { code: 'EM', name: 'Employee',             color: 'bg-green-500', route: '/employee' },
    { code: 'EP', name: 'Employee Profile',      color: 'bg-green-400', route: '/employee/profile' },
    // { code: 'EL', name: 'Employees List',       color: 'bg-blue-500',  route: '/employee/list' },
    { code: 'DR', name: 'Document Requests',    color: 'bg-teal-500',  route: '/employee/documents' },
    { code: 'SR', name: 'Shift Requests',       color: 'bg-cyan-500',  route: '/employee/shift' },
    { code: 'WTR',name: 'Work Type Requests',   color: 'bg-indigo-500',route: '/employee/worktype' },
    { code: 'RSA',name: 'Rotating Shift Assign',color: 'bg-teal-600',  route: '/employee/rotating-shift' },
 
  ],
  Attendance: [
    { code: 'AD', name: 'Attendance Dashboard', color: 'bg-green-500', route: '/attendance/dashboard' },
    { code: 'BD', name: 'Biometric Devices',    color: 'bg-green-400', route: '/attendance/devices' },
    { code: 'ATT',name: 'Attendances',          color: 'bg-blue-500',  route: '/attendance/list' },
    { code: 'WR', name: 'Work Records',         color: 'bg-teal-500',  route: '/attendance/work-records' },
    { code: 'SR', name: 'Shift Requests',       color: 'bg-cyan-500',  route: '/attendance/shift-requests' },
    { code: 'WTR',name: 'Work Type Requests',   color: 'bg-indigo-500',route: '/attendance/worktype-requests' },
    { code: 'RSA',name: 'Rotating Shift Assign',color: 'bg-teal-600', route: '/attendance/rotating-shift' },



  ],
  Leave: [
    { code: 'LD',  name: 'Leave Dashboard',      color: 'bg-green-500', route: '/leave/dashboard' },
    { code: 'MLR', name: 'My Leave Requests',    color: 'bg-green-400', route: '/leave/my-requests' },
    { code: 'LR',  name: 'Leave Requests',       color: 'bg-blue-500',  route: '/leave/requests' },
    { code: 'LT',  name: 'Leave Types',          color: 'bg-teal-500',  route: '/leave/types' },
    { code: 'AAL', name: 'All Assigned Leaves',  color: 'bg-cyan-500',  route: '/leave/assigned' },


  ],
  Payroll: [
    { code: 'PD',  name: 'Payroll Dashboard',      color: 'bg-green-500', route: '/payroll/dashboard' },
    { code: 'PC',  name: 'Payroll Contract',       color: 'bg-green-400', route: '/payroll/contract' },
    { code: 'PS',  name: 'Payroll Payslip',        color: 'bg-blue-500',  route: '/payroll/payslips' },
    { code: 'PLA', name: 'Payroll Loan / Advance', color: 'bg-teal-500',  route: '/payroll/loan' },
  ],
  Offboarding: [
    { code: 'OFFD', name: 'Offboarding Dashboard', color: 'bg-green-500', route: '/offboarding/dashboard' },
    { code: 'OFF',  name: 'Offboardings',          color: 'bg-rose-500',  route: '/offboard/Offboarding' },

  ],
  
};