// // src/App.jsx
// import { useState } from 'react';
// import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
// import Sidebar from './Sidebar';
// import Navbar from './Navbar';
// import Dashboard from './Dashboard';
// import './App.css'
// import FloatingActionButton from './FloatingActionButton';
// import Employee from './modals/Employee';
// import Profile from './Profile';
// import ShiftRequests from './ShiftRequests';
// import DocumentRequests from '../DocumentRequests';
// import WorkTypeRequests from './WorkTypeRequests';
// import RotatingShiftAssign from './RotatingShiftAssign';
// import AttendanceDashboard from './AttendanceDashboard';
// import BiometricDevices from './BiometricDevices';
// import Attendances from './Attendances';
// import MyAttendances from './MyAttendances';
// import WorkRecords from './WorkRecords';
// import LeaveDashboard from './LeaveDashboard';
// import MyLeaveRequests from './MyLeaveRequests';
// import LeaveRequests from './LeaveRequests';
// import AllAssignedLeaves from './AllAssignedLeaves';
// import LeaveTypes from './LeaveTypes';
// import PayrollDashboard from './PayrollDashboard';
// import Contracts from './Contracts';
// import Allowances from './Allowances';
// import Payslip from './Payslip';
// import LoanAdvancedSalary from './LoanAdvancedSalary';
// import Login from './Login';

// export default function App() {
//   const [isCollapsed, setIsCollapsed] = useState(false);

//   const menuData = [
//     { label: 'Dashboard', icon: 'dashboard', link: '/dashboard', active: true },
//     { label: 'Recruitment', icon: 'recruitment', link: '/recruitment' },
//     { label: 'Onboarding', icon: 'onboarding', link: '/onboarding' },
//     {
//       label: 'Employee',
//       icon: 'employee',
//       link: '/employee',
//       submenu: [
//         { label: 'Profile', link: '/employee/profile' },
//         { label: 'Employees', link: '/employee' },
//         { label: 'Document Requests', link: '/employee/documents' },
//         { label: 'Shift Requests', link: '/employee/shift' },
//         { label: 'Work Type Requests', link: '/employee/worktype' },
//         { label: 'Rotating Shift Assign', link: '/employee/rotating-shift' },
//         // { label: 'Rotating Work Type Assign', link: '/employee/rotating-worktype' },
//         // { label: 'Disciplinary Actions', link: '/employee/disciplinary' },
//         // { label: 'Policies', link: '/employee/policies' },
//         // { label: 'Organization Chart', link: '/employee/org-chart' },
//       ],
//     },
//     {
//       label: 'Attendance',
//       icon: 'attendance',
//       link: '/attendance',
//       submenu: [
//         { label: 'Dashboard', link: '/attendance/dashboard' },
//         { label: 'Biometric Devices', link: '/attendance/devices' },
//         { label: 'Attendances', link: '/attendance/list' },
//         { label: 'Attendance Requests', link: '/attendance/requests' },
//         // { label: 'Hour Account', link: '/attendance/hour-account' },
//         { label: 'Work Records', link: '/attendance/work-records' },
//         // { label: 'Attendance Activities', link: '/attendance/activities' },
//         // { label: 'Late Come Early Out', link: '/attendance/late-early' },
//         { label: 'My Attendances', link: '/attendance/my' },
//       ],
//     },
//     {
//       label: 'Leave',
//       icon: 'leave',
//       link: '/leave',
//       submenu: [
//         { label: 'Dashboard', link: '/leave/dashboard' },
//         { label: 'My Leave Requests', link: '/leave/my-requests' },
//         { label: 'Leave Requests', link: '/leave/requests' },
//         { label: 'Leave Types', link: '/leave/types' },
//         { label: 'Assigned Leave', link: '/leave/assigned' },
//         { label: 'Leave Allocation Request', link: '/leave/allocation' },
//         { label: 'Compensatory Leave Requests', link: '/leave/compensatory' },
//       ],
//     },
//     {
//       label: 'Payroll',
//       icon: 'payroll',
//       link: '/payroll',
//       submenu: [
//         { label: 'Dashboard', link: '/payroll/dashboard' },
//         { label: 'Contract', link: '/payroll/contract' },
//         { label: 'Allowances', link: '/payroll/allowances' },
//         { label: 'Deductions', link: '/payroll/deductions' },
//         { label: 'Payslips', link: '/payroll/payslips' },
//         { label: 'Loan / Advanced Salary', link: '/payroll/loan' },
//         { label: 'Encashments & Reimbursements', link: '/payroll/encashments' },
//         { label: 'Federal Tax', link: '/payroll/tax' },
//       ],
//     },
//     { label: 'Performance', icon: 'performance', link: '/performance' },
//     { label: 'Offboarding', icon: 'offboarding', link: '/offboarding' },
//     {
//       label: 'Assets',
//       icon: 'assets',
//       link: '/assets',
//       submenu: [
//         { label: 'Dashboard', link: '/assets/dashboard' },
//         { label: 'Asset View', link: '/assets/view' },
//         { label: 'Asset Batches', link: '/assets/batches' },
//         { label: 'Request and Allocation', link: '/assets/request' },
//         { label: 'Asset History', link: '/assets/history' },
//         { label: 'Asset Categories', link: '/assets/category' },
//       ],
//     },
//     { label: 'Help Desk', icon: 'helpDesk', link: '/helpdesk' },
//     { label: 'Project', icon: 'project', link: '/project' },
//     { label: 'Configuration', icon: 'configuration', link: '/config' },
//   ];

//   const Placeholder = ({ title }) => (
//   <div className="p-6">
//     <h1 className="text-2xl font-bold">{title}</h1>
//     <p className="text-gray-600 mt-2">This page is ready for implementation.</p>
//   </div>
// );

//   return (
//     <BrowserRouter>
//       <div className="flex h-screen bg-gray-50">
//         {/* Sidebar */}
//         <Sidebar
//           menuItems={menuData}
//           isCollapsed={isCollapsed}
//           onToggleCollapse={() => setIsCollapsed(!isCollapsed)}
//         />

//         {/* Main Layout */}
//         <div
//           className={`
//             flex-1 flex flex-col
//             transition-all duration-300 ease-in-out
//             ${isCollapsed ? 'ml-20' : 'ml-64'}
//           `}
//         >
//           {/* Navbar */}
//           <Navbar onToggleSidebar={() => setIsCollapsed(!isCollapsed)} />

//           {/* Page Content */}
//           <main className="flex-1 overflow-y-auto mt-11 p-4 md:p-6">
//             <Routes>
//               {/* Default */}
//               <Route path="/" element={<Navigate to="/dashboard" replace />} />
//               <Route path="/dashboard" element={<Dashboard />} />

//               {/* Employee */}
//               <Route path="/employee" element={<Employee />} />
//               <Route path="/employee/profile" element={<Profile />} />
//               <Route path="/employee/shift" element={<ShiftRequests />} />
//                <Route path='/employee/documents' element={<DocumentRequests/>} />
//                <Route  path='/employee/worktype' element={<WorkTypeRequests/>} />
//                <Route path='/employee/rotating-shift' element={<RotatingShiftAssign/>} />
//               {/* Attendance */}
               
//                <Route path='/attendance/dashboard' element={<AttendanceDashboard/>} />
//                <Route path='/attendance/devices' element={<BiometricDevices />} />
//                <Route path='/attendance/list' element={<Attendances/>} />
//                 <Route path='/attendance/my' element={<MyAttendances/>} />
//                 <Route path='/attendance/work-records' element={<WorkRecords/>} />


//                 <Route path='/leave/dashboard' element={<LeaveDashboard/>} />
//                 <Route path='/leave/my-requests' element={<MyLeaveRequests/>} />
//                 <Route  path='/leave/requests' element={<LeaveRequests/>}/>
//                 <Route  path='/leave/assigned' element={<AllAssignedLeaves/>} />
//                 <Route path='/leave/types' element={<LeaveTypes/>} />


//                 <Route path='/payroll/dashboard' element={<PayrollDashboard/>} />
//                 <Route path='/payroll/contract' element={<Contracts/>} />
//                 <Route path='/payroll/allowances' element={<Allowances/>} />
//                 <Route path='/payroll/payslips' element={<Payslip/>} />
//                 <Route path='/payroll/loan' element={<LoanAdvancedSalary/>} />
//               {/* Placeholder Routes (Add real pages later) */}
            
//             </Routes>
//           </main>
//         </div>

//         {/* FAB */}
//         <button className="fixed bottom-6 right-6 w-14 h-14 bg-red-600 text-white rounded-full shadow-lg hover:bg-red-700 flex items-center justify-center z-50">
//           <FloatingActionButton />
//         </button>
//       </div>
//     </BrowserRouter>
//   );
// }


// src/App.jsx
'use client';

import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './AuthContext';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import Dashboard from './Dashboard';
import FloatingActionButton from './FloatingActionButton';
import Employee from './modals/Employee';
import Profile from './Profile';
import ShiftRequests from './ShiftRequests';
import DocumentRequests from '../DocumentRequests';
import WorkTypeRequests from './WorkTypeRequests';
import RotatingShiftAssign from './RotatingShiftAssign';
import AttendanceDashboard from './AttendanceDashboard';
import BiometricDevices from './BiometricDevices';
import Attendances from './Attendances';
import MyAttendances from './MyAttendances';
import WorkRecords from './WorkRecords';
import LeaveDashboard from './LeaveDashboard';
import MyLeaveRequests from './MyLeaveRequests';
import LeaveRequests from './LeaveRequests';
import AllAssignedLeaves from './AllAssignedLeaves';
import LeaveTypes from './LeaveTypes';
import PayrollDashboard from './PayrollDashboard';
import Contracts from './Contracts';
import Allowances from './Allowances';
import Payslip from './Payslip';
import LoanAdvancedSalary from './LoanAdvancedSalary';
import Login from './Login';
import ProtectedRoute from './ProtectedRoute';
import './App.css'
import RecruitmentDashboard from './RecruitmentDashboard';
import OffboardingDashboard from './OffboardingDashboard';
import Offboarding from './Offboarding';
import Recruitments from './Recruitments';
import CandidatesView from './CandidatesView';
import Login1 from './Login1'
import Login2 from './Login2'

function AppContent() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { isAuthenticated, logout } = useAuth();

   const menuData = [
    { label: 'Dashboard', icon: 'dashboard', link: '/dashboard', active: true },
    { label: 'Recruitment', icon: 'recruitment', link: '/recruitment',
        submenu: [
        { label: 'Dashboard', link: 'recruitment/dash' },
        { label: 'Recruitment', link: 'recruitment/recruitment' },]
     },
    { label: 'Onboarding', icon: 'onboarding', link: '/onboarding',
       submenu: [
        { label: 'Candidates ', link: 'Onboarding/candidates ' },]
     },
    {
      label: 'Employee',
      icon: 'employee',
      link: '/employee',
      submenu: [
        { label: 'Profile', link: '/employee/profile' },
        { label: 'Employees', link: '/employee' },
        { label: 'Document Requests', link: '/employee/documents' },
        { label: 'Shift Requests', link: '/employee/shift' },
        { label: 'Work Type Requests', link: '/employee/worktype' },
        { label: 'Rotating Shift Assign', link: '/employee/rotating-shift' },
        // { label: 'Rotating Work Type Assign', link: '/employee/rotating-worktype' },
        // { label: 'Disciplinary Actions', link: '/employee/disciplinary' },
        // { label: 'Policies', link: '/employee/policies' },
        // { label: 'Organization Chart', link: '/employee/org-chart' },
      ],
    },
    {
      label: 'Attendance',
      icon: 'attendance',
      link: '/attendance',
      submenu: [
        { label: 'Dashboard', link: '/attendance/dashboard' },
        { label: 'Biometric Devices', link: '/attendance/devices' },
        { label: 'Attendances', link: '/attendance/list' },
        { label: 'Attendance Requests', link: '/attendance/requests' },
        // { label: 'Hour Account', link: '/attendance/hour-account' },
        { label: 'Work Records', link: '/attendance/work-records' },
        // { label: 'Attendance Activities', link: '/attendance/activities' },
        // { label: 'Late Come Early Out', link: '/attendance/late-early' },
        { label: 'My Attendances', link: '/attendance/my' },
      ],
    },
    {
      label: 'Leave',
      icon: 'leave',
      link: '/leave',
      submenu: [
        { label: 'Dashboard', link: '/leave/dashboard' },
        { label: 'My Leave Requests', link: '/leave/my-requests' },
        { label: 'Leave Requests', link: '/leave/requests' },
        { label: 'Leave Types', link: '/leave/types' },
        { label: 'Assigned Leave', link: '/leave/assigned' },
        { label: 'Leave Allocation Request', link: '/leave/allocation' },
        { label: 'Compensatory Leave Requests', link: '/leave/compensatory' },
      ],
    },
    {
      label: 'Payroll',
      icon: 'payroll',
      link: '/payroll',
      submenu: [
        { label: 'Dashboard', link: '/payroll/dashboard' },
        { label: 'Contract', link: '/payroll/contract' },
        { label: 'Allowances', link: '/payroll/allowances' },
        { label: 'Deductions', link: '/payroll/deductions' },
        { label: 'Payslips', link: '/payroll/payslips' },
        { label: 'Loan / Advanced Salary', link: '/payroll/loan' },
        { label: 'Encashments & Reimbursements', link: '/payroll/encashments' },
        { label: 'Federal Tax', link: '/payroll/tax' },
      ],
    },
    // { label: 'Performance', icon: 'performance', link: '/performance' },
    { label: 'Offboarding', icon: 'offboarding', link: '/offboarding',
       submenu: [
        { label: 'Dashboard', link: '/offboard/dashboard' },
      { label: 'Offboarding', link: '/offboard/Offboarding' },]
     },
   
    // { label: 'Help Desk', icon: 'helpDesk', link: '/helpdesk' },
    // { label: 'Project', icon: 'project', link: '/project' },
    // { label: 'Configuration', icon: 'configuration', link: '/config' },
  ];


  const Placeholder = ({ title }) => (
    <div className="p-6">
      <h1 className="text-2xl font-bold">{title}</h1>
      <p className="text-gray-600 mt-2">This page is ready for implementation.</p>
    </div>
  );

  if (!isAuthenticated) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
         <Route path="/company1/login" element={<Login1 />} />
          {/* <Route path="/company2/login" element={<Login />} /> */}
           <Route path="/company2/login" element={<Login2 />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar
        menuItems={menuData}
        isCollapsed={isCollapsed}
        onToggleCollapse={() => setIsCollapsed(!isCollapsed)}
      />

      <div
        className={`
          flex-1 flex flex-col transition-all duration-300
          ${isCollapsed ? 'ml-20' : 'ml-64'}
        `}
      >
        <Navbar onToggleSidebar={() => setIsCollapsed(!isCollapsed)} onLogout={logout} />

        <main className="flex-1 overflow-y-auto mt-11 p-4 md:p-6">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route
              path="/*"
              element={
                <ProtectedRoute>
                  <Routes>

                    <Route path='recruitment/dash' element={<RecruitmentDashboard/>} />   
                    <Route path='recruitment/recruitment' element={<Recruitments/>} />  

                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/employee" element={<Employee />} />
                    <Route path="/employee/profile" element={<Profile />} />
                    <Route path="/employee/shift" element={<ShiftRequests />} />
                    <Route path="/employee/documents" element={<DocumentRequests />} />
                    <Route path="/employee/worktype" element={<WorkTypeRequests />} />
                    <Route path="/employee/rotating-shift" element={<RotatingShiftAssign />} />

                    <Route path="/attendance/dashboard" element={<AttendanceDashboard />} />
                    <Route path="/attendance/devices" element={<BiometricDevices />} />
                    <Route path="/attendance/list" element={<Attendances />} />
                    <Route path="/attendance/my" element={<MyAttendances />} />
                    <Route path="/attendance/work-records" element={<WorkRecords />} />

                    <Route path="/leave/dashboard" element={<LeaveDashboard />} />
                    <Route path="/leave/my-requests" element={<MyLeaveRequests />} />
                    <Route path="/leave/requests" element={<LeaveRequests />} />
                    <Route path="/leave/assigned" element={<AllAssignedLeaves />} />
                    <Route path="/leave/types" element={<LeaveTypes />} />

                    <Route path="/payroll/dashboard" element={<PayrollDashboard />} />
                    <Route path="/payroll/contract" element={<Contracts />} />
                    <Route path="/payroll/allowances" element={<Allowances />} />
                    <Route path="/payroll/payslips" element={<Payslip />} />
                    <Route path="/payroll/loan" element={<LoanAdvancedSalary />} />



                    <Route path='/offboard/dashboard' element={<OffboardingDashboard/>} />
                    <Route path='/offboard/Offboarding' element={<Offboarding/>} />
                    <Route path='Onboarding/candidates' element={<CandidatesView/>} />

                    {/* Placeholder */}
                    <Route path="*" element={<Placeholder title="Page Not Found" />} />
                    

                  </Routes>
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
      </div>

      <button className="fixed bottom-6 right-6 w-14 h-14 bg-red-600 text-white rounded-full shadow-lg hover:bg-red-700 flex items-center justify-center z-50">
        <FloatingActionButton />
      </button>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </BrowserRouter>
  );
}