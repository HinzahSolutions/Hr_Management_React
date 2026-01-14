// // src/components/Navbar.jsx
// import React, { useEffect, useRef, useState } from 'react';
// import { useAuth } from './AuthContext';
// import {
//   FaBell,
//   FaGlobe,
//   FaUserCircle,
//   FaCog,
//   FaSignOutAlt,
//   FaBars,
// } from 'react-icons/fa';
// import { useNavigate } from 'react-router-dom';

// const Navbar = ({
//   title = 'HINZAH',
//   showCheckIn = true,
//   checkInText = 'Check-In',
//   userName = 'Mona',
//   notifications = 3,
//   onCheckIn = () => console.log('Checked in!'),
//   onToggleSidebar = () => {},
//   onLogout = () => console.log('Logged out'),
// }) => {
//   const [profileOpen, setProfileOpen] = useState(false);
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

//   const profileRef = useRef(null);
//   const mobileMenuRef = useRef(null);

//   const { user } = useAuth();
//   const navigate = useNavigate();

//   // Close dropdowns when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (
//         profileRef.current && !profileRef.current.contains(e.target) &&
//         mobileMenuRef.current && !mobileMenuRef.current.contains(e.target)
//       ) {
//         setProfileOpen(false);
//         setMobileMenuOpen(false);
//       }
//     };
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   const handleLogout = () => {
//     setProfileOpen(false);
//     onLogout();
//   };

//   const goToSettings = () => {
//     setMobileMenuOpen(false);
//     navigate('/admin/setting');
//   };

//   return (
//     <header className="fixed inset-x-0 top-0 z-10 flex h-16 items-center justify-between bg-white px-4 shadow-sm md:px-6 border-b border-gray-200">
//       {/* LEFT: Mobile Menu Toggle */}
//       <div className="flex items-center">
//         <button
//           onClick={onToggleSidebar}
//           className="lg:hidden text-gray-600 hover:text-gray-900 p-2 rounded-lg hover:bg-gray-100 transition"
//           aria-label="Toggle sidebar"
//         >
//           <FaBars className="h-6 w-6" />
//         </button>

//         {/* Optional: Logo */}
//         <div className="ml-3 lg:ml-0">
//           <h1 className="text-xl font-bold text-gray-800">{title}</h1>
//         </div>
//       </div>

//       {/* CENTER: Check-In Button (Hidden for now as per your comment) */}
//       <div className="flex-1 flex justify-center">
//         {/* Uncomment when needed */}
//         {/* {showCheckIn && (
//           <button
//             onClick={onCheckIn}
//             className="flex items-center gap-2 rounded-lg bg-green-100 px-5 py-2 text-sm font-semibold text-green-700 hover:bg-green-200 transition"
//           >
//             <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//             </svg>
//             {checkInText}
//           </button>
//         )} */}
//       </div>

//       {/* RIGHT: Icons + User */}
//       <div className="flex items-center gap-3">

//         {/* Desktop Icons */}
//         <div className="hidden md:flex items-center gap-4">
//           <button className="text-gray-600 hover:text-gray-900 p-2 rounded-lg hover:bg-gray-100 transition" onClick={() => navigate('admin/setting')} >
//             <FaCog className="h-5 w-5" />
//           </button>

//           <button className="relative text-gray-600 hover:text-gray-900 p-2 rounded-lg hover:bg-gray-100 transition">
//             <FaBell className="h-5 w-5" />
//             {notifications > 0 && (
//               <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white font-medium">
//                 {notifications > 99 ? '99+' : notifications}
//               </span>
//             )}
//           </button>

//           <button className="text-gray-600 hover:text-gray-900 p-2 rounded-lg hover:bg-gray-100 transition">
//             <FaGlobe className="h-5 w-5" />
//           </button>
//         </div>

//         {/* User Profile Dropdown */}
//         <div className="relative" ref={profileRef}>
//           <button
//             onClick={() => setProfileOpen(!profileOpen)}
//             className="flex items-center gap-3 text-gray-700 hover:text-gray-900 p-2 rounded-lg hover:bg-gray-100 transition"
//           >
//             <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm shadow-md">
//               {userName.charAt(0).toUpperCase()}
//             </div>
//             <span className="hidden md:block font-medium">{userName}</span>
//             <svg className={`h-4 w-4 transition-transform ${profileOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//             </svg>
//           </button>

//           {/* Profile Dropdown */}
//           {profileOpen && (
//             <div className="absolute right-0 top-full mt-2 w-56 rounded-xl border border-gray-200 bg-white shadow-xl py-3 z-120">
//               <div className="px-4 py-3 border-b border-gray-100">
//                 <p className="text-sm font-semibold text-gray-900">{userName}</p>
//                 <p className="text-xs text-gray-500">{user?.email || 'user@company.com'}</p>
//               </div>

//               <a href="/employee/profile" className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition">
//                 <FaUserCircle className="h-4 w-4" /> My Profile
//               </a>
//               <a href="/change-username" className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition">
//                 Change Username
//               </a>
//               <a href="/change-password" className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition">
//                 Change Password
//               </a>

//               <div className="my-2 border-t border-gray-200"></div>

//               <button
//                 onClick={handleLogout}
//                 className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition"
//               >
//                 <FaSignOutAlt className="h-4 w-4" /> Logout
//               </button>
//             </div>
//           )}
//         </div>

//         {/* Mobile Three-Dot Menu */}
//         <div className="relative md:hidden" ref={mobileMenuRef}>
//           <button
//             onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//             className="p-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100 transition"
//           >
//             <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
//             </svg>
//           </button>

//           {mobileMenuOpen && (
//             <div className="absolute right-0 top-full mt-2 w-48 rounded-xl border border-gray-200 bg-white shadow-xl py-2 z-50">
//               <button
//                 onClick={goToSettings}
//                 className="w-full flex items-center gap-3 px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 transition"
//               >
//                 <FaCog className="h-4 w-4" /> Settings
//               </button>

//               <button className="w-full flex items-center justify-between px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 transition">
//                 <div className="flex items-center gap-3">
//                   <FaBell className="h-4 w-4" /> Notifications
//                 </div>
//                 {notifications > 0 && (
//                   <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
//                     {notifications}
//                   </span>
//                 )}
//               </button>

//               <button className="w-full flex items-center gap-3 px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 transition">
//                 <FaGlobe className="h-4 w-4" /> Language
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Navbar;


// import React, { useEffect, useRef, useState } from 'react';
// import { useAuth } from './AuthContext';
// import { useLocation, useNavigate } from 'react-router-dom';
// import {
//   FaBell,
//   FaGlobe,
//   FaUserCircle,
//   FaCog,
//   FaSignOutAlt,
//   FaBars,
//   FaChevronRight,
//   FaHome
// } from 'react-icons/fa';

// const Navbar = ({
//   title = 'HINZAH',
//   showCheckIn = true,
//   checkInText = 'Check-In',
//   userName = 'Mona',
//   notifications = 3,
//   onCheckIn = () => console.log('Checked in!'),
//   onToggleSidebar = () => {},
//   onLogout = () => console.log('Logged out'),
// }) => {
//   const [profileOpen, setProfileOpen] = useState(false);
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [breadcrumbs, setBreadcrumbs] = useState([]);

//   const profileRef = useRef(null);
//   const mobileMenuRef = useRef(null);

//   const { user } = useAuth();
//   const navigate = useNavigate();
//   const location = useLocation();

//   // Generate breadcrumbs based on current path
//   useEffect(() => {
//     const pathnames = location.pathname.split('/').filter(x => x);
    
//     const breadcrumbArray = pathnames.map((value, index) => {
//       const to = `/${pathnames.slice(0, index + 1).join('/')}`;
//       const isLast = index === pathnames.length - 1;
      
//       // Format the breadcrumb label
//       let label = value;
//       if (value === 'dashboard') {
//         label = 'Dashboard';
//       } else if (value === 'employee') {
//         label = 'Employee';
//       } else if (value === 'attendance') {
//         label = 'Attendance';
//       } else if (value === 'leave') {
//         label = 'Leave';
//       } else if (value === 'payroll') {
//         label = 'Payroll';
//       } else if (value === 'settings') {
//         label = 'Settings';
//       } else if (value === 'recruitment') {
//         label = 'Recruitment';
//       } else if (value === 'onboarding') {
//         label = 'Onboarding';
//       } else if (value === 'offboarding') {
//         label = 'Offboarding';
//       } else if (value === 'admin') {
//         label = 'Admin';
//       } else {
//         // Capitalize first letter and replace hyphens with spaces
//         label = value
//           .replace(/-/g, ' ')
//           .replace(/\b\w/g, l => l.toUpperCase());
//       }
      
//       return {
//         label,
//         to: isLast ? null : to,
//         isLast
//       };
//     });

//     setBreadcrumbs(breadcrumbArray);
//   }, [location]);

//   // Close dropdowns when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (
//         profileRef.current && !profileRef.current.contains(e.target) &&
//         mobileMenuRef.current && !mobileMenuRef.current.contains(e.target)
//       ) {
//         setProfileOpen(false);
//         setMobileMenuOpen(false);
//       }
//     };
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   const handleLogout = () => {
//     setProfileOpen(false);
//     onLogout();
//   };

//   const goToSettings = () => {
//     setMobileMenuOpen(false);
//     navigate('/admin/setting');
//   };

//   // Function to handle breadcrumb click
//   const handleBreadcrumbClick = (to) => {
//     if (to) {
//       navigate(to);
//     }
//   };

//   return (
//     <header className="fixed inset-x-0 top-0 z-10 flex h-16 items-center justify-between bg-white px-4 shadow-sm md:px-6 border-b border-gray-200">
//       {/* LEFT: Mobile Menu Toggle + Breadcrumbs */}
//       <div className="flex items-center gap-3">
//         {/* <button
//           onClick={onToggleSidebar}
//           className="lg:hidden text-gray-600 hover:text-gray-900 p-2 rounded-lg hover:bg-gray-100 transition"
//           aria-label="Toggle sidebar"
//         >
//           <FaBars className="h-6 w-6" />
//         </button> */}

//         {/* Breadcrumb Navigation */}
//         <div className="hidden md:flex items-center text-sm">
//           <button
//             onClick={() => navigate('/dashboard')}
//             className="flex items-center text-gray-600 hover:text-gray-900 transition"
//           >
//             <FaHome className="h-4 w-4" />
//           </button>
          
//           {breadcrumbs.length > 0 && (
//             <div className="flex items-center">
//               <FaChevronRight className="h-3 w-3 mx-2 text-gray-400" />
              
//               {breadcrumbs.map((crumb, index) => (
//                 <div key={index} className="flex items-center">
//                   <button
//                     onClick={() => handleBreadcrumbClick(crumb.to)}
//                     disabled={crumb.isLast}
//                     className={`transition ${
//                       crumb.isLast 
//                         ? 'text-gray-900 font-semibold cursor-default' 
//                         : 'text-gray-600 hover:text-gray-900'
//                     }`}
//                   >
//                     {crumb.label}
//                   </button>
                  
//                   {index < breadcrumbs.length - 1 && (
//                     <FaChevronRight className="h-3 w-3 mx-2 text-gray-400" />
//                   )}
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Mobile Title (shown only on mobile) */}
//         <div className="md:hidden">
//           <h1 className="text-lg font-bold text-gray-800">
//             {breadcrumbs.length > 0 
//               ? breadcrumbs[breadcrumbs.length - 1]?.label || title 
//               : title
//             }
//           </h1>
//         </div>
//       </div>

//       {/* CENTER: Check-In Button (Hidden for now) */}
//       <div className="flex-1 flex justify-center">
//         {/* Empty center for now */}
//       </div>

//       {/* RIGHT: Icons + User */}
//       <div className="flex items-center gap-3">
//         {/* Desktop Icons */}
//         <div className="hidden md:flex items-center gap-4">
//           <button 
//             className="text-gray-600 hover:text-gray-900 p-2 rounded-lg hover:bg-gray-100 transition" 
//             onClick={() => navigate('/settings')}
//           >
//             <FaCog className="h-5 w-5" />
//           </button>

//           <button className="relative text-gray-600 hover:text-gray-900 p-2 rounded-lg hover:bg-gray-100 transition">
//             <FaBell className="h-5 w-5" />
//             {notifications > 0 && (
//               <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white font-medium">
//                 {notifications > 99 ? '99+' : notifications}
//               </span>
//             )}
//           </button>

//           <button className="text-gray-600 hover:text-gray-900 p-2 rounded-lg hover:bg-gray-100 transition">
//             <FaGlobe className="h-5 w-5" />
//           </button>
//         </div>

//         {/* User Profile Dropdown */}
//         <div className="relative" ref={profileRef}>
//           <button
//             onClick={() => setProfileOpen(!profileOpen)}
//             className="flex items-center gap-3 text-gray-700 hover:text-gray-900 p-2 rounded-lg hover:bg-gray-100 transition"
//           >
//             <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm shadow-md">
//               {userName.charAt(0).toUpperCase()}
//             </div>
//             <span className="hidden md:block font-medium">{userName}</span>
//             <svg className={`h-4 w-4 transition-transform ${profileOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//             </svg>
//           </button>

//           {/* Profile Dropdown */}
//           {profileOpen && (
//             <div className="absolute right-0 top-full mt-2 w-56 rounded-xl border border-gray-200 bg-white shadow-xl py-3 z-50">
//               <div className="px-4 py-3 border-b border-gray-100">
//                 <p className="text-sm font-semibold text-gray-900">{userName}</p>
//                 <p className="text-xs text-gray-500">{user?.email || 'user@company.com'}</p>
//               </div>

//               <button 
//                 onClick={() => {
//                   navigate('/employee/profile');
//                   setProfileOpen(false);
//                 }}
//                 className="w-full flex items-center gap-3 px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 transition"
//               >
//                 <FaUserCircle className="h-4 w-4" /> My Profile
//               </button>
//               <button 
//                 onClick={() => {
//                   navigate('/change-username');
//                   setProfileOpen(false);
//                 }}
//                 className="w-full flex items-center gap-3 px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 transition"
//               >
//                 Change Username
//               </button>
//               <button 
//                 onClick={() => {
//                   navigate('/change-password');
//                   setProfileOpen(false);
//                 }}
//                 className="w-full flex items-center gap-3 px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 transition"
//               >
//                 Change Password
//               </button>

//               <div className="my-2 border-t border-gray-200"></div>

//               <button
//                 onClick={handleLogout}
//                 className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition"
//               >
//                 <FaSignOutAlt className="h-4 w-4" /> Logout
//               </button>
//             </div>
//           )}
//         </div>

//         {/* Mobile Three-Dot Menu */}
//         <div className="relative md:hidden" ref={mobileMenuRef}>
//           <button
//             onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//             className="p-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100 transition"
//           >
//             <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
//             </svg>
//           </button>

//           {mobileMenuOpen && (
//             <div className="absolute right-0 top-full mt-2 w-48 rounded-xl border border-gray-200 bg-white shadow-xl py-2 z-50">
//               <button
//                 onClick={goToSettings}
//                 className="w-full flex items-center gap-3 px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 transition"
//               >
//                 <FaCog className="h-4 w-4" /> Settings
//               </button>

//               <button className="w-full flex items-center justify-between px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 transition">
//                 <div className="flex items-center gap-3">
//                   <FaBell className="h-4 w-4" /> Notifications
//                 </div>
//                 {notifications > 0 && (
//                   <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
//                     {notifications}
//                   </span>
//                 )}
//               </button>

//               <button className="w-full flex items-center gap-3 px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 transition">
//                 <FaGlobe className="h-4 w-4" /> Language
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Navbar;

import React, { useEffect, useRef, useState } from 'react';
import { useAuth } from './AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  FaBell,
  FaGlobe,
  FaUserCircle,
  FaCog,
  FaSignOutAlt,
  FaBars,
  FaChevronRight,
  FaHome
} from 'react-icons/fa';

const Navbar = ({
  title = 'HINZAH',
  showCheckIn = true,
  checkInText = 'Check-In',
  userName = 'Mona',
  notifications = 3,
  onCheckIn = () => console.log('Checked in!'),
  onToggleSidebar = () => {},
  onLogout = () => console.log('Logged out'),
}) => {
  const [profileOpen, setProfileOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [breadcrumbs, setBreadcrumbs] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  const profileRef = useRef(null);
  const mobileMenuRef = useRef(null);

  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Check screen size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Generate breadcrumbs based on current path
  useEffect(() => {
    const pathnames = location.pathname.split('/').filter(x => x);
    
    const breadcrumbArray = pathnames.map((value, index) => {
      const to = `/${pathnames.slice(0, index + 1).join('/')}`;
      const isLast = index === pathnames.length - 1;
      
      // Format the breadcrumb label
      let label = value;
      if (value === 'dashboard') {
        label = 'Dashboard';
      } else if (value === 'employee') {
        label = 'Employee';
      } else if (value === 'attendance') {
        label = 'Attendance';
      } else if (value === 'leave') {
        label = 'Leave';
      } else if (value === 'payroll') {
        label = 'Payroll';
      } else if (value === 'settings') {
        label = 'Settings';
      } else if (value === 'recruitment') {
        label = 'Recruitment';
      } else if (value === 'onboarding') {
        label = 'Onboarding';
      } else if (value === 'offboarding') {
        label = 'Offboarding';
      } else if (value === 'admin') {
        label = 'Admin';
      } else {
        // Capitalize first letter and replace hyphens with spaces
        label = value
          .replace(/-/g, ' ')
          .replace(/\b\w/g, l => l.toUpperCase());
      }
      
      return {
        label,
        to: isLast ? null : to,
        isLast
      };
    });

    setBreadcrumbs(breadcrumbArray);
  }, [location]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        profileRef.current && !profileRef.current.contains(e.target) &&
        mobileMenuRef.current && !mobileMenuRef.current.contains(e.target)
      ) {
        setProfileOpen(false);
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    setProfileOpen(false);
    onLogout();
  };

  const goToSettings = () => {
    setMobileMenuOpen(false);
    navigate('/admin/setting');
  };

  // Function to handle breadcrumb click
  const handleBreadcrumbClick = (to) => {
    if (to) {
      navigate(to);
    }
  };

  return (
    <header className="fixed inset-x-0 top-0 z-40 flex h-16 items-center justify-between bg-white px-4 shadow-sm md:px-6 border-b border-gray-200">
      {/* LEFT: Mobile Menu Toggle + Breadcrumbs */}
      <div className="flex items-center gap-3">
        {/* Mobile/Tablet Menu Toggle Button */}
        <button
          onClick={onToggleSidebar}
          className="lg:hidden text-gray-600 hover:text-gray-900 p-2 rounded-lg hover:bg-gray-100 transition"
          aria-label="Toggle sidebar"
        >
          <FaBars className="h-6 w-6" />
        </button>

        {/* Breadcrumb Navigation */}
        <div className="hidden md:flex items-center text-sm">
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center text-gray-600 hover:text-gray-900 transition"
          >
            <FaHome className="h-4 w-4" />
          </button>
          
          {breadcrumbs.length > 0 && (
            <div className="flex items-center">
              <FaChevronRight className="h-3 w-3 mx-2 text-gray-400" />
              
              {breadcrumbs.map((crumb, index) => (
                <div key={index} className="flex items-center">
                  <button
                    onClick={() => handleBreadcrumbClick(crumb.to)}
                    disabled={crumb.isLast}
                    className={`transition ${
                      crumb.isLast 
                        ? 'text-gray-900 font-semibold cursor-default' 
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {crumb.label}
                  </button>
                  
                  {index < breadcrumbs.length - 1 && (
                    <FaChevronRight className="h-3 w-3 mx-2 text-gray-400" />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Mobile Title (shown only on mobile) */}
        <div className="md:hidden">
          <h1 className="text-lg font-bold text-gray-800">
            {breadcrumbs.length > 0 
              ? breadcrumbs[breadcrumbs.length - 1]?.label || title 
              : title
            }
          </h1>
        </div>
      </div>

      {/* CENTER: Check-In Button (Hidden for now) */}
      <div className="flex-1 flex justify-center">
        {/* Empty center for now */}
      </div>

      {/* RIGHT: Icons + User */}
      <div className="flex items-center gap-3">
        {/* Desktop Icons */}
        <div className="hidden md:flex items-center gap-4">
          <button 
            className="text-gray-600 hover:text-gray-900 p-2 rounded-lg hover:bg-gray-100 transition" 
            onClick={() => navigate('/settings')}
          >
            <FaCog className="h-5 w-5" />
          </button>

          <button className="relative text-gray-600 hover:text-gray-900 p-2 rounded-lg hover:bg-gray-100 transition">
            <FaBell className="h-5 w-5" />
            {notifications > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white font-medium">
                {notifications > 99 ? '99+' : notifications}
              </span>
            )}
          </button>

          <button className="text-gray-600 hover:text-gray-900 p-2 rounded-lg hover:bg-gray-100 transition">
            <FaGlobe className="h-5 w-5" />
          </button>
        </div>

        {/* User Profile Dropdown */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-3 text-gray-700 hover:text-gray-900 p-2 rounded-lg hover:bg-gray-100 transition"
          >
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm shadow-md">
              {userName.charAt(0).toUpperCase()}
            </div>
            <span className="hidden md:block font-medium">  <p className="text-sm font-semibold text-gray-900">
        {(() => {
          try {
            const userData = localStorage.getItem('currentUser');
            if (userData) {
              const user = JSON.parse(userData);
              return user.username || user.name || 'User';
            }
          } catch (error) {
            console.error('Error parsing user data:', error);
          }
          return 'User';
        })()}
      </p></span>
            <svg className={`h-4 w-4 transition-transform ${profileOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* Profile Dropdown */}
          {profileOpen && (
            <div className="absolute right-0 top-full mt-2 w-56 rounded-xl border border-gray-200 bg-white shadow-xl py-3 z-50">
              <div className="px-4 py-3 border-b border-gray-100">
                 <p className="text-sm font-semibold text-gray-900">
        {(() => {
          try {
            const userData = localStorage.getItem('currentUser');
            if (userData) {
              const user = JSON.parse(userData);
              return user.username || user.name || 'User';
            }
          } catch (error) {
            console.error('Error parsing user data:', error);
          }
          return 'User';
        })()}
      </p>
                <p className="text-xs text-gray-500">{user?.email || 'user@company.com'}</p>
              </div>

              <button 
                onClick={() => {
                  navigate('/employee/profile');
                  setProfileOpen(false);
                }}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 transition"
              >
                <FaUserCircle className="h-4 w-4" /> My Profile
              </button>
              <button 
                onClick={() => {
                  navigate('/change-username');
                  setProfileOpen(false);
                }}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 transition"
              >
                Change Username
              </button>
              <button 
                onClick={() => {
                  navigate('/change-password');
                  setProfileOpen(false);
                }}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 transition"
              >
                Change Password
              </button>

              <div className="my-2 border-t border-gray-200"></div>

              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition"
              >
                <FaSignOutAlt className="h-4 w-4" /> Logout
              </button>
            </div>
          )}
        </div>

        {/* Mobile Three-Dot Menu */}
        <div className="relative md:hidden" ref={mobileMenuRef}>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100 transition"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
            </svg>
          </button>

          {mobileMenuOpen && (
            <div className="absolute right-0 top-full mt-2 w-48 rounded-xl border border-gray-200 bg-white shadow-xl py-2 z-50">
              <button
                onClick={goToSettings}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 transition"
              >
                <FaCog className="h-4 w-4" /> Settings
              </button>

              <button 
                onClick={() => navigate('/settings')}
                className="w-full flex items-center justify-between px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 transition"
              >
                <div className="flex items-center gap-3">
                  <FaBell className="h-4 w-4" /> Notifications
                </div>
                {notifications > 0 && (
                  <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                    {notifications}
                  </span>
                )}
              </button>

              <button className="w-full flex items-center gap-3 px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 transition">
                <FaGlobe className="h-4 w-4" /> Language
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;