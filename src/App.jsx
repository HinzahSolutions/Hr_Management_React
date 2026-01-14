
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
import Settings from './Settings';
import Company from './Company';
import { label, link } from 'framer-motion/client';
import PermissionAssign from './PermissionAssign';
import { ThemeProvider } from './ThemeContext'
import { Toaster } from 'react-hot-toast';

import { Provider } from 'react-redux';
import { store } from './store/store';
import AdminPage from './AdminPage';

function AppContent() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  // const [isCollapsed, setIsCollapsed] = useState(false); // desktop width
const [isMobileOpen, setIsMobileOpen] = useState(false);
  



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
        { label: 'Employees', link: '/employee/employee' },
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
     {
      label:'Base' ,icon:'FaHouzz' , link:'/base',
      submenu: [
         { label: 'Add Company',link: '/base/company' },
    { label: 'Permission Assign',link: '/base/company/permission-assign' },
    {label:'Admin Page', link:'/base/company/admin'}
  ]
     }
  

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
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
         <Route path="/admin/login" element={<Login1 />} />
          {/* <Route path="/company2/login" element={<Login />} /> */}
             <Route path='/base/company' element={ <Company/>} />
           <Route path="/SuperAdmin/login" element={<Login2 />} />
        {/* <Route path="*" element={<Navigate to="/login" replace />} /> */}
      </Routes>
    );
  }

  return (
     <Provider store={store}>
    <div className="flex h-screen bg-gray-50">
     <Sidebar
  menuItems={menuData}
   isCollapsed={isCollapsed}
  onToggleCollapse={() => setIsCollapsed(!isCollapsed)}
  isMobileOpen={isMobileOpen}
  setIsMobileOpen={setIsMobileOpen}
  userName={'Mona'}
 
/>  

      <div
        className={`
          flex-1 flex flex-col transition-all duration-300 p-2  
          ${isCollapsed ? 'lg:ml-10' : 'lg:ml-60'}  
        `}
      >
        <Navbar  onToggleSidebar={() => {
    if (window.innerWidth >= 1024) {
      setIsCollapsed(prev => !prev); // desktop
    } else {
      setIsMobileOpen(true); // mobile & tablet
    }
  }} onLogout={logout} />

        <main className="flex-1 mt-11  md:p-6 container">
          <Routes>
          
            <Route path='/company' element={<Company/>} />
                     <Route path='/company/permission-assign' element={<PermissionAssign />}  />
                     <Route path='/company/admin' element={<AdminPage/>} />
              <Route path="/" element={<Navigate to="/dashboards" replace />} />
        <Route path="/dashboards" element={  <Dashboard />} />  

            <Route
              path="/*"
              element={
                <ProtectedRoute>
                  <Routes>
                      <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={  <ProtectedRoute><Dashboard /></ProtectedRoute>} />
                    <Route path='recruitment/dash' element={  <ProtectedRoute><RecruitmentDashboard/></ProtectedRoute>} />   
                    <Route path='recruitment/recruitment' element={  <ProtectedRoute><Recruitments/></ProtectedRoute>} />  

                    <Route path="/dashboard" element={  <ProtectedRoute><Dashboard /></ProtectedRoute>} />
                    <Route path="/employee" element={  <ProtectedRoute><Employee /></ProtectedRoute>} />
                    <Route path="/employee/profile/:id" element={  <ProtectedRoute><Profile /></ProtectedRoute>} />
                    <Route path="/employee/shift" element={  <ProtectedRoute><ShiftRequests /></ProtectedRoute>} />
                    <Route path="/employee/documents" element={  <ProtectedRoute><DocumentRequests /></ProtectedRoute>} />
                    <Route path="/employee/worktype" element={  <ProtectedRoute><WorkTypeRequests /></ProtectedRoute>} />
                    <Route path="/employee/rotating-shift" element={  <ProtectedRoute><RotatingShiftAssign /></ProtectedRoute>} />

                    <Route path="/attendance/dashboard" element={  <ProtectedRoute><AttendanceDashboard /></ProtectedRoute>} />
                    <Route path="/attendance/devices" element={  <ProtectedRoute><BiometricDevices /></ProtectedRoute>} />
                    <Route path="/attendance/list" element={  <ProtectedRoute><Attendances /></ProtectedRoute>} />
                    <Route path="/attendance/my" element={  <ProtectedRoute><MyAttendances /></ProtectedRoute>} />
                    <Route path="/attendance/work-records" element={  <ProtectedRoute><WorkRecords /></ProtectedRoute>} />

                    <Route path="/leave/dashboard" element={  <ProtectedRoute><LeaveDashboard /></ProtectedRoute>} />
                    <Route path="/leave/my-requests" element={  <ProtectedRoute><MyLeaveRequests /></ProtectedRoute>} />
                    <Route path="/leave/requests" element={  <ProtectedRoute><LeaveRequests /></ProtectedRoute>} />
                    <Route path="/leave/assigned" element={  <ProtectedRoute><AllAssignedLeaves /></ProtectedRoute>} />
                    <Route path="/leave/types" element={  <ProtectedRoute><LeaveTypes /></ProtectedRoute>} />

                    <Route path="/payroll/dashboard" element={  <ProtectedRoute><PayrollDashboard /></ProtectedRoute>} />
                    <Route path="/payroll/contract" element={  <ProtectedRoute><Contracts /></ProtectedRoute>} />
                    <Route path="/payroll/allowances" element={  <ProtectedRoute><Allowances /></ProtectedRoute>} />
                    <Route path="/payroll/payslips" element={  <ProtectedRoute><Payslip /></ProtectedRoute>} />
                    <Route path="/payroll/loan" element={  <ProtectedRoute><LoanAdvancedSalary /></ProtectedRoute>} />



                    <Route path='/offboard/dashboard' element={  <ProtectedRoute><OffboardingDashboard/></ProtectedRoute>} />
                    <Route path='/offboard/Offboarding' element={  <ProtectedRoute><Offboarding/></ProtectedRoute>} />
                    <Route path='Onboarding/candidates' element={  <ProtectedRoute><CandidatesView/></ProtectedRoute>} />


                    <Route path='/base/company' element={  <ProtectedRoute><Company/></ProtectedRoute>} />
                     <Route path='/base/company/permission-assign' element={  <ProtectedRoute><PermissionAssign /></ProtectedRoute>}  />
                     <Route path='base/company/admin' element={  <ProtectedRoute><AdminPage/></ProtectedRoute>} />


                      <Route path='admin/setting' element={  <ProtectedRoute><Settings/></ProtectedRoute>} />
                     

                   
                    <Route path="*" element={<Placeholder title="Page Not Found" />} />
                    

                  </Routes>
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
      </div>

      <FloatingActionButton />

      
    </div>
    </Provider>
  );
}

export default function App() {
  return (
    <BrowserRouter>
    
      <AuthProvider>
        <ThemeProvider>
           <AppContent />
        </ThemeProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}




// 'use client';

// import { useState,useEffect } from 'react';
// import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
// import { AuthProvider, useAuth } from './AuthContext';
// import Sidebar from './Sidebar';
// import Navbar from './Navbar';
// import Dashboard from './Dashboard';
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
// import ProtectedRoute from './ProtectedRoute';
// import './App.css'
// import RecruitmentDashboard from './RecruitmentDashboard';
// import OffboardingDashboard from './OffboardingDashboard';
// import Offboarding from './Offboarding';
// import Recruitments from './Recruitments';
// import CandidatesView from './CandidatesView';
// import Login1 from './Login1'
// import Login2 from './Login2'
// import Settings from './Settings';
// import Company from './Company';
// import { label, link } from 'framer-motion/client';
// import PermissionAssign from './PermissionAssign';
// import { ThemeProvider } from './ThemeContext'
// import { Toaster } from 'react-hot-toast';

// import { Provider } from 'react-redux';
// import { store } from './store/store';
// import AdminPage from './AdminPage';

// function AppContent() {
//   const [isCollapsed, setIsCollapsed] = useState(false);
//   const { isAuthenticated, logout } = useAuth();
//     // const [isCollapsed, setIsCollapsed] = useState(false);
//   const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

//   // Fixed responsive layout for sidebar transition
// useEffect(() => {
//     const handleResize = () => {
//       // Auto-close mobile sidebar on larger screens
//       if (window.innerWidth >= 1024) {
//         setIsMobileSidebarOpen(false);
//       }
//       // Auto-expand sidebar on desktop
//       if (window.innerWidth >= 1024 && isCollapsed) {
//         setIsCollapsed(false);
//       }
//     };

//     window.addEventListener('resize', handleResize);
//     handleResize(); // Initial check

//     return () => window.removeEventListener('resize', handleResize);
//   }, [isCollapsed]);

//    const toggleSidebar = () => {
//     if (window.innerWidth < 1024) {
//       setIsMobileSidebarOpen(!isMobileSidebarOpen);
//     } else {
//       setIsCollapsed(!isCollapsed);
//     }
//   }; 

//   const menuData = [
//     { label: 'Dashboard', icon: 'dashboard', link: '/dashboard', active: true },
//     { label: 'Recruitment', icon: 'recruitment', link: '/recruitment',
//         submenu: [
//         { label: 'Dashboard', link: '/recruitment/dash' },
//         { label: 'Recruitment', link: '/recruitment/recruitment' },]
//      },
//     { label: 'Onboarding', icon: 'onboarding', link: '/onboarding',
//        submenu: [
//         { label: 'Candidates', link: '/onboarding/candidates' },]
//      },
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
//         { label: 'Work Records', link: '/attendance/work-records' },
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
//     { label: 'Offboarding', icon: 'offboarding', link: '/offboarding',
//        submenu: [
//         { label: 'Dashboard', link: '/offboard/dashboard' },
//         { label: 'Offboarding', link: '/offboard/Offboarding' },
//       ]
//      },
//      {
//       label: 'Company',
//       icon: 'FaHouzz',
//       link: '/company',
//       submenu: [
//         { label: 'Add Company', link: '/company' },
//         { label: 'Permission Assign', link: '/company/permission-assign' },
//         { label: 'Admin Page', link: '/company/admin' }
//       ]
//      }
//   ];

//   const Placeholder = ({ title }) => (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold">{title}</h1>
//       <p className="text-gray-600 mt-2">This page is ready for implementation.</p>
//     </div>
//   );

//   if (!isAuthenticated) {
//     return (
//       <Routes>
//         <Route path="/login" element={<Login />} />
//         <Route path="/company1/login" element={<Login1 />} />
//         <Route path="/SuperAdmin/login" element={<Login2 />} />
//         <Route path="*" element={<Navigate to="/login" replace />} />
//       </Routes>
//     );
//   }    

 

//   return (
//     <Provider store={store}>
//       <div className="flex h-screen bg-gray-50">
//         {/* Sidebar - Fixed width on desktop */}
//         <div className="hidden lg:block">
//           <Sidebar
//             isCollapsed={isCollapsed}
//           onToggleCollapse={toggleSidebar}
//           isMobileOpen={isMobileSidebarOpen}
//           onMobileToggle={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
//           />
//         </div>

//         {/* Main content area - Responsive margins */}
//           <div className={`
//           flex-1 flex flex-col w-full
//           transition-all duration-300 ease-in-out
//           ${isMobileSidebarOpen ? 'ml-0' : ''}
//           ${!isMobileSidebarOpen && window.innerWidth >= 1024 ? 
//             (isCollapsed ? 'lg:ml-20' : 'lg:ml-64') : 'ml-0'}
//         `}>
       

//           <main className="flex-1 overflow-auto mt-16 p-4 md:p-6 ">
//                  <Navbar 
//                        onToggleSidebar={toggleSidebar}
//             onLogout={logout}
//           />
//             <Routes>
//               <Route path="/" element={<Navigate to="/dashboard" replace />} />
//               <Route path="/company" element={<Company/>} />
//               <Route path="/company/permission-assign" element={<PermissionAssign />} />
//               <Route path="/company/admin" element={<AdminPage/>} />
          
//               <Route
//                 path="/*"
//                 element={
//                   <ProtectedRoute>
//                     <Routes>
//                       {/* Recruitment */}
//                       <Route path="/recruitment/dash" element={<RecruitmentDashboard/>} />   
//                       <Route path="/recruitment/recruitment" element={<Recruitments/>} />  

//                       {/* Dashboard */}
//                       <Route path="/dashboard" element={<Dashboard />} />

//                       {/* Employee */}
//                       <Route path="/employee" element={<Employee />} />
//                       <Route path="/employee/profile/:id" element={<Profile />} />
//                       <Route path="/employee/shift" element={<ShiftRequests />} />
//                       <Route path="/employee/documents" element={<DocumentRequests />} />
//                       <Route path="/employee/worktype" element={<WorkTypeRequests />} />
//                       <Route path="/employee/rotating-shift" element={<RotatingShiftAssign />} />

//                       {/* Attendance */}
//                       <Route path="/attendance/dashboard" element={<AttendanceDashboard />} />
//                       <Route path="/attendance/devices" element={<BiometricDevices />} />
//                       <Route path="/attendance/list" element={<Attendances />} />
//                       <Route path="/attendance/my" element={<MyAttendances />} />
//                       <Route path="/attendance/work-records" element={<WorkRecords />} />

//                       {/* Leave */}
//                       <Route path="/leave/dashboard" element={<LeaveDashboard />} />
//                       <Route path="/leave/my-requests" element={<MyLeaveRequests />} />
//                       <Route path="/leave/requests" element={<LeaveRequests />} />
//                       <Route path="/leave/assigned" element={<AllAssignedLeaves />} />
//                       <Route path="/leave/types" element={<LeaveTypes />} />

//                       {/* Payroll */}
//                       <Route path="/payroll/dashboard" element={<PayrollDashboard />} />
//                       <Route path="/payroll/contract" element={<Contracts />} />
//                       <Route path="/payroll/allowances" element={<Allowances />} />
//                       <Route path="/payroll/payslips" element={<Payslip />} />
//                       <Route path="/payroll/loan" element={<LoanAdvancedSalary />} />

//                       {/* Offboarding */}
//                       <Route path="/offboard/dashboard" element={<OffboardingDashboard/>} />
//                       <Route path="/offboard/Offboarding" element={<Offboarding/>} />

//                       {/* Onboarding */}
//                       <Route path="/onboarding/candidates" element={<CandidatesView/>} />

//                       {/* Settings */}
//                       <Route path="/admin/setting" element={<Settings/>} />

//                       {/* Placeholder */}
//                       <Route path="*" element={<Placeholder title="Page Not Found" />} />
//                     </Routes>
//                   </ProtectedRoute>
//                 }
//               />
//             </Routes>
//           </main>
//         </div>

//         <FloatingActionButton />
//       </div>
//     </Provider>
//   );
// }

// export default function App() {
//   return (
//     // <BrowserRouter>
//     //   <AuthProvider>
//     //     <ThemeProvider>
//     //       <AppContent />
//     //       <Toaster 
//     //         position="top-right"
//     //         toastOptions={{
//     //           duration: 3000,
//     //           style: {
//     //             background: '#363636',
//     //             color: '#fff',
//     //           },
//     //         }}
//     //       />
//     //     </ThemeProvider>
//     //   </AuthProvider>
//     // </BrowserRouter>

//       <BrowserRouter>
//       <AuthProvider> {/* AuthProvider must be OUTER */}
//         <ThemeProvider> {/* ThemeProvider must be INNER */}
//           <AppContent />
//         </ThemeProvider>
//       </AuthProvider>
//     </BrowserRouter>
//   );
// }
