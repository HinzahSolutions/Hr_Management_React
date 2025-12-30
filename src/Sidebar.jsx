// 'use client';

// import React, { useState, useEffect, useMemo } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { 
//   Menu, X, ChevronDown, ChevronRight, Home, Settings, 
//   Users, Calendar, FileText, Briefcase, CreditCard, 
//   BarChart3, Shield, Bell, HelpCircle, LogOut, 
//   Search, Filter, Plus, User, Building, Clock,
//   DollarSign, PieChart, LineChart, Target, Award,
//   Zap, Star, Crown, Lock, Globe, Palette, Bell as BellIcon,
//   MessageSquare, Download, Upload, Eye, Edit2, Trash2,
//   MoreVertical, ArrowRight, CheckCircle, XCircle, AlertCircle,
//   Folder, FolderOpen, FolderPlus, BookOpen, Book, File,
//   FileText as FileTextIcon, FileCode, FileImage, FileSpreadsheet,
//   Mail, Phone, MapPin, Shield as ShieldIcon, Key, Database,
//   Server, Cloud, CloudRain, Sun, Moon, Wind, Thermometer,
//   Wifi, WifiOff, Battery, BatteryCharging, Power, RefreshCw
// } from 'lucide-react';
// import { useTheme } from './ThemeContext';
// import { MODULES, SUB_PERMISSIONS } from './data/navdata';
// import { useAuth } from './AuthContext';

// // Import FontAwesome icons for modules
// import { 
//   FaHome, 
//   FaUsersCog, 
//   FaUserPlus, 
//   FaUserTie, 
//   FaClock, 
//   FaCalendarAlt, 
//   FaFileInvoiceDollar, 
//   FaSignOutAlt 
// } from 'react-icons/fa';

// export default function Sidebar({ isCollapsed, onToggleCollapse }) {
//   const { theme } = useTheme();
//   const { logout } = useAuth();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [openMenus, setOpenMenus] = useState({});
//   const [isMobileOpen, setIsMobileOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [currentUser, setCurrentUser] = useState(() => {
//     try {
//       return JSON.parse(localStorage.getItem('currentUser') || '{}');
//     } catch {
//       return {};
//     }
//   });

//   // Sync with localStorage changes (for long-term usage)
//   useEffect(() => {
//     const handleStorageChange = () => {
//       try {
//         const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
//         setCurrentUser(user);
//       } catch {
//         setCurrentUser({});
//       }
//     };

//     // Listen for storage events (when localStorage changes in other tabs/components)
//     window.addEventListener('storage', handleStorageChange);
    
//     // Also check periodically for changes within the same tab
//     const interval = setInterval(handleStorageChange, 1000);

//     return () => {
//       window.removeEventListener('storage', handleStorageChange);
//       clearInterval(interval);
//     };
//   }, []);

//   const permissions = currentUser.permissions || {};
//   const isSuperAdmin = currentUser.role === 'superadmin';

//   // Check if theme is light or dark
//   const isLightTheme = theme?.type === 'light' || theme?.sidebarBg?.includes('white') || theme?.sidebarBg?.includes('gray-50') || theme?.sidebarBg?.includes('blue-50') || theme?.sidebarBg?.includes('green-50') || theme?.sidebarBg?.includes('purple-50') || theme?.sidebarBg?.includes('pink-50') || theme?.sidebarBg?.includes('orange-50') || theme?.sidebarBg?.includes('teal-50') || theme?.sidebarBg?.includes('amber-50') || theme?.sidebarBg?.includes('rose-50') || theme?.sidebarBg?.includes('cyan-50');
//   const isDarkTheme = theme?.type === 'dark' || theme?.sidebarBg?.includes('black') || theme?.sidebarBg?.includes('gray-9') || theme?.sidebarBg?.includes('gray-8') || theme?.sidebarBg?.includes('slate-9') || theme?.sidebarBg?.includes('zinc-9') || theme?.sidebarBg?.includes('neutral-9');

//   // Theme helper functions
//   const getSidebarBg = () => theme?.sidebarBg || 'bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900';
//   const getSidebarText = () => {
//     if (theme?.sidebarText) return theme.sidebarText;
//     return isLightTheme ? 'text-gray-800' : 'text-gray-200';
//   };
//   const getSidebarHover = () => {
//     if (theme?.sidebarHover) return theme.sidebarHover;
//     return isLightTheme ? 'hover:bg-gray-100' : 'hover:bg-white/10';
//   };
//   const getSidebarActive = () => {
//     if (theme?.sidebarActive) return theme.sidebarActive;
    
//     const fromColor = 'orange-500';
//     const toColor = 'pink-600';
//     if (isLightTheme) {
//       return `bg-gradient-to-r from-${fromColor}/10 to-${toColor}/10`;
//     }
//     return `bg-gradient-to-r from-${fromColor}/20 to-${toColor}/20`;
//   };
  
//   const getSidebarBorder = () => theme?.sidebarBorder || (isLightTheme ? 'border-gray-200' : 'border-gray-700');
//   const getButtonGradient = () => theme?.button ? `bg-gradient-to-r ${theme.button}` : 'bg-gradient-to-r from-orange-500 to-orange-600';
//   const getTextAccent = () => theme?.accent ? `text-${theme.accent}` : 'text-orange-400';
  
//   // Get text colors based on theme type
//   const getPrimaryTextColor = () => isLightTheme ? 'text-gray-800' : 'text-gray-200';
//   const getSecondaryTextColor = () => isLightTheme ? 'text-gray-600' : 'text-gray-400';
//   const getMutedTextColor = () => isLightTheme ? 'text-gray-500' : 'text-gray-500';
  
//   // Get background colors based on theme type
//   const getCardBg = () => isLightTheme ? 'bg-white/50' : 'bg-gray-800/50';
//   const getInputBg = () => isLightTheme ? 'bg-white' : 'bg-gray-800/50';
//   const getInputBorder = () => isLightTheme ? 'border-gray-300' : 'border-gray-700';
  
//   // Get gradient colors from theme
//   const getGradientFrom = () => {
//     if (theme?.gradient) {
//       const gradientParts = theme.gradient.split(' ');
//       const fromClass = gradientParts[0];
//       return fromClass.replace('from-', '');
//     }
//     return 'orange-500';
//   };

//   const getGradientTo = () => {
//     if (theme?.gradient) {
//       const gradientParts = theme.gradient.split(' ');
//       const toClass = gradientParts.find(part => part.startsWith('to-'));
//       return toClass ? toClass.replace('to-', '') : 'pink-600';
//     }
//     return 'pink-600';
//   };

//   const getFromColorClass = () => `from-${getGradientFrom()}`;
//   const getToColorClass = () => `to-${getGradientTo()}`;
//   const getAccentColor = () => theme?.accent?.split('-')[0] || 'orange';

//   useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth >= 1024 && isMobileOpen) {
//         setIsMobileOpen(false);
//       }
//     };
//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, [isMobileOpen]);

//   const toggleMenu = (name) => {
//     setOpenMenus(prev => ({ ...prev, [name]: !prev[name] }));
//   };

//   const isActive = (path) => location.pathname.startsWith(path);

//   // Check if user has view permission for a sub-item
//   const canViewSubItem = (moduleName, subItemName) => {
//     // For superadmin, check the actual permission value
//     if (isSuperAdmin) {
//       if (!permissions[moduleName]) return false;
//       const subItemPermissions = permissions[moduleName][subItemName];
//       if (!subItemPermissions) return false;
//       return subItemPermissions.view === true;
//     }
    
//     // For regular users, check permissions
//     if (!permissions[moduleName]) return false;
    
//     // Check if subItem exists in module permissions
//     const subItemPermissions = permissions[moduleName][subItemName];
//     if (!subItemPermissions) return false;
    
//     // Return true if view permission is true
//     return subItemPermissions.view === true;
//   };

//   // Check if user has any view permission in a module
//   const hasAnyPermissionInModule = (moduleName) => {
//     // For superadmin, check if there are any sub-items defined for this module
//     if (isSuperAdmin) {
//       const subItems = SUB_PERMISSIONS[moduleName] || [];
//       return subItems.length > 0;
//     }
    
//     // For regular users, check permissions
//     if (!permissions[moduleName]) return false;
    
//     // Check if any sub-item has view permission
//     const modulePermissions = permissions[moduleName];
//     return Object.values(modulePermissions).some(subItem => 
//       subItem && typeof subItem === 'object' && subItem.view === true
//     );
//   };

//   // Get visible sub-items for a module
//   const getVisibleSubItems = (moduleName) => {
//     const subItems = SUB_PERMISSIONS[moduleName] || [];
    
//     return subItems.filter(sub => {
//       // For regular users, check permission
//       return canViewSubItem(moduleName, sub.name);
//     });
//   };

//   // Filter modules based on permissions (memoized for performance)
//   const dynamicMenu = useMemo(() => MODULES.map(mod => {
//     // Get the icon component for this module
//     const getIconComponent = () => {
//       switch(mod.name) {
//         case 'Base': return FaHome;
//         case 'Recruitment': return FaUsersCog;
//         case 'Onboarding': return FaUserPlus;
//         case 'Employee': return FaUserTie;
//         case 'Attendance': return FaClock;
//         case 'Leave': return FaCalendarAlt;
//         case 'Payroll': return FaFileInvoiceDollar;
//         case 'Offboarding': return FaSignOutAlt;
//         default: return Home;
//       }
//     };

//     // Get visible sub-items for this module
//     const visibleSubItems = getVisibleSubItems(mod.name);
    
//     // If no visible sub-items, don't show the module
//     if (visibleSubItems.length === 0) {
//       return null;
//     }

//     // Map the visible sub-items
//     const mappedSubItems = visibleSubItems.map(sub => ({
//       label: sub.name,
//       key: sub.name,
//       link: sub.route,
//       icon: ChevronRight,
//     }));

//     return {
//       label: mod.name,
//       icon: getIconComponent(),
//       color: getTextAccent(),
//       link: mappedSubItems[0]?.link || '#', // First accessible sub-item as default link
//       submenu: mappedSubItems,
//     };
//   }).filter(Boolean), [permissions, isSuperAdmin]);

//   const menuData = useMemo(() => [
//     { label: 'Dashboard', icon: Home, link: '/dashboard', color: `text-${getAccentColor()}-${isLightTheme ? '600' : '400'}` },
//     ...dynamicMenu,
//     { label: 'Settings', icon: Settings, link: '/settings', color: getSecondaryTextColor() },
//     { label: 'Base', icon: FaHome, link: '/company', color: getSecondaryTextColor() },
//   ], [dynamicMenu, isLightTheme]);

//   const filteredMenuData = useMemo(() => menuData.filter(item =>
//     item.label.toLowerCase().includes(searchQuery.toLowerCase())
//   ), [menuData, searchQuery]);

//   // Mobile overlay
//   useEffect(() => {
//     if (isMobileOpen) {
//       document.body.style.overflow = 'hidden';
//     } else {
//       document.body.style.overflow = 'unset';
//     }
//     return () => {
//       document.body.style.overflow = 'unset';
//     };
//   }, [isMobileOpen]);

//   const SidebarContent = ({ isMobile = false }) => (
//     <div className={`h-full flex flex-col ${isMobile ? 'w-72' : ''}`}>
//       {/* Header */}
//       <div className={`p-6 border-b ${getSidebarBorder()}`}>
//         <div className="flex items-center justify-between">
//           <div className="flex items-center gap-3">
//             <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${getFromColorClass()} ${getToColorClass()} shadow-lg flex items-center justify-center`}>
//               {currentUser.logo ? (
//                 <img src={currentUser.logo} alt="logo" className="w-8 h-8 rounded-lg object-contain" />
//               ) : (
//                 <Building className="h-5 w-5 text-white" />
//               )}
//             </div>
//             {(!isCollapsed || isMobile) && (
//               <div>
//                 <h1 className={`text-lg font-bold ${getPrimaryTextColor()}`}>HRMS Pro</h1>
//                 <p className={`text-xs ${getSecondaryTextColor()}`}>{currentUser.companyName || 'HR System'}</p>
//               </div>
//             )}
//           </div>
//           {(!isCollapsed || isMobile) && (
//             <button
//               onClick={() => isMobile ? setIsMobileOpen(false) : onToggleCollapse()}
//               className={`p-2 ${isLightTheme ? 'hover:bg-gray-100' : 'hover:bg-white/10'} rounded-lg transition-colors`}
//             >
//               <X className={`h-5 w-5 ${getSecondaryTextColor()}`} />
//             </button>
//           )}
//         </div>
//       </div>

//       {/* Menu Items */}
//       <nav className="flex-1 overflow-y-auto py-4 px-3">
//         <ul className="space-y-1">
//           {filteredMenuData.map(item => {
//             const Icon = item.icon;
//             const hasSubmenu = item.submenu?.length > 0;
//             const isOpen = openMenus[item.label];
//             const active = isActive(item.link);
//             const IconComponent = Icon || Home;

//             return (
//               <li key={item.label}>
//                 <div
//                   onClick={() => hasSubmenu && toggleMenu(item.label)}
//                   className={`
//                     group flex items-center justify-between px-3 py-2.5 rounded-xl cursor-pointer transition-all duration-200
//                     ${active ? getSidebarActive() : getSidebarHover()}
//                     ${active ? 'shadow-lg' : ''}
//                     relative overflow-hidden
//                   `}
//                 >
//                   {/* Active indicator */}
//                   {active && (
//                     <div className={`absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-6 bg-gradient-to-b ${getFromColorClass()} ${getToColorClass()} rounded-r-full`}></div>
//                   )}

//                   {/* Glow effect */}
//                   <div className={`absolute inset-0 ${getFromColorClass()}/0 ${getToColorClass()}/0 group-hover:${getFromColorClass()}/10 group-hover:${getToColorClass()}/10 transition-all duration-300`}></div>

//                   <button
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       if (!hasSubmenu) {
//                         navigate(item.link);
//                         if (isMobile) setIsMobileOpen(false);
//                       }
//                     }}
//                     className="flex items-center gap-3 flex-1 text-left relative z-10"
//                   >
//                     <div className={`p-1.5 rounded-lg ${item.color} ${isLightTheme ? 'bg-gray-100' : 'bg-gray-800/50'}`}>
//                       <IconComponent className="h-4 w-4" />
//                     </div>
//                     {(!isCollapsed || isMobile) && (
//                       <div className="flex-1 min-w-0">
//                         <span className={`font-medium text-sm truncate ${active ? (isLightTheme ? 'text-gray-900' : 'text-white') : getPrimaryTextColor()}`}>
//                           {item.label}
//                         </span>
//                         {hasSubmenu && item.submenu && (
//                           <p className={`text-xs ${getSecondaryTextColor()} mt-0.5`}>
//                             {item.submenu.length} items
//                           </p>
//                         )}
//                       </div>
//                     )}
//                   </button>
                  
//                   {hasSubmenu && (!isCollapsed || isMobile) && (
//                     <div className="relative z-10">
//                       {isOpen ? (
//                         <ChevronDown className={`h-4 w-4 ${getSecondaryTextColor()}`} />
//                       ) : (
//                         <ChevronRight className={`h-4 w-4 ${getSecondaryTextColor()}`} />
//                       )}
//                     </div>
//                   )}
//                 </div>

//                 {/* Submenu */}
//                 {hasSubmenu && isOpen && (!isCollapsed || isMobile) && (
//                   <div className={`ml-8 mt-1 space-y-0.5 pl-3 border-l ${getSidebarBorder()}`}>
//                     {item.submenu.map(sub => {
//                       const SubIcon = sub.icon || ChevronRight;
//                       const subActive = location.pathname === sub.link;
//                       const accentColor = getAccentColor();
                      
//                       return (
//                         <button
//                           key={sub.link}
//                           onClick={() => {
//                             navigate(sub.link);
//                             if (isMobile) setIsMobileOpen(false);
//                           }}
//                           className={`
//                             w-full text-left py-2 px-3 text-sm rounded-lg transition-all duration-150 flex items-center gap-2
//                             ${subActive 
//                               ? `${isLightTheme ? 'bg-gray-100 text-gray-900' : `bg-gradient-to-r ${getFromColorClass()}/10 ${getToColorClass()}/10 text-white`}` 
//                               : `${getSecondaryTextColor()} ${isLightTheme ? 'hover:text-gray-900 hover:bg-gray-50' : 'hover:text-white hover:bg-gray-800/50'}`
//                             }
//                           `}
//                         >
//                           <SubIcon className={`h-3 w-3 ${subActive ? `text-${accentColor}-${isLightTheme ? '600' : '400'}` : getSecondaryTextColor()}`} />
//                           <span className="truncate">{sub.label}</span>
//                           {subActive && (
//                             <div className={`ml-auto w-1.5 h-1.5 rounded-full bg-gradient-to-r ${getFromColorClass()} ${getToColorClass()}`}></div>
//                           )}
//                         </button>
//                       );
//                     })}
//                   </div>
//                 )}
//               </li>
//             );
//           })}
//         </ul>
//       </nav>

//       {/* User Profile & Footer */}
//       <div className={`p-4 border-t ${getSidebarBorder()}`}>
//         <div className="flex items-center gap-3 mb-4">
//           <div className="relative">
//             <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${getFromColorClass()} ${getToColorClass()} flex items-center justify-center shadow-lg`}>
//               <span className="text-white font-bold">
//                 {currentUser.username?.[0]?.toUpperCase() || 'U'}
//               </span>
//             </div>
//             <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
//           </div>
//           {(!isCollapsed || isMobile) && (
//             <div className="flex-1 min-w-0">
//               <p className={`font-semibold text-sm ${getPrimaryTextColor()} truncate`}>{currentUser.username || 'User'}</p>
//               <p className={`text-xs ${getSecondaryTextColor()} truncate`}>
//                 {isSuperAdmin ? 'Super Admin' : currentUser.role || 'Employee'}
//               </p>
//             </div>
//           )}
//         </div>

//         {(!isCollapsed || isMobile) && (
//           <>
//             {/* Status Badge */}
//             <div className={`mb-3 px-3 py-2 ${getCardBg()} rounded-lg`}>
//               <div className="flex items-center justify-between text-xs">
//                 <span className={getSecondaryTextColor()}>Status</span>
//                 <div className="flex items-center gap-1">
//                   <div className="w-2 h-2 rounded-full bg-green-500"></div>
//                   <span className={`${isLightTheme ? 'text-green-700' : 'text-green-400'} font-medium`}>Active</span>
//                 </div>
//               </div>
//             </div>

//             {/* Action Buttons */}
//             <div className="flex items-center gap-2">
//               <button 
//                 onClick={() => navigate('/settings')}
//                 className={`flex-1 px-3 py-1.5 ${getCardBg()} ${isLightTheme ? 'hover:bg-gray-200' : 'hover:bg-gray-800'} rounded-lg text-xs ${getSecondaryTextColor()} flex items-center justify-center gap-1`}
//               >
//                 <Settings className="h-3 w-3" />
//                 Settings
//               </button>
//               <button 
//                 onClick={logout}
//                 className={`flex-1 px-3 py-1.5 bg-gradient-to-r ${getFromColorClass()}/10 ${getToColorClass()}/10 hover:${getFromColorClass()}/20 hover:${getToColorClass()}/20 rounded-lg text-xs ${getTextAccent()} flex items-center justify-center gap-1`}
//               >
//                 <LogOut className="h-3 w-3" />
//                 Logout
//               </button>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );

//   return (
//     <>
//       {/* Mobile Menu Button */}
//       <button
//         onClick={() => setIsMobileOpen(true)}
//         className={`lg:hidden fixed top-4 left-4 z-40 p-2 ${getButtonGradient()} text-white rounded-xl shadow-lg`}
//       >
//         <Menu className="h-5 w-5" />
//       </button>

//       {/* Mobile Overlay */}
//       {isMobileOpen && (
//         <div 
//           className="lg:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
//           onClick={() => setIsMobileOpen(false)}
//         >
//           <div 
//             className={`fixed inset-y-0 left-0 w-72 ${getSidebarBg()} border-r ${getSidebarBorder()} shadow-2xl`}
//             onClick={(e) => e.stopPropagation()}
//           >
//             <SidebarContent isMobile />
//           </div>
//         </div>
//       )}

//       {/* Desktop Sidebar */}
//       <aside className={`
//         hidden lg:fixed lg:inset-y-0 lg:left-0 lg:flex lg:flex-col
//         ${getSidebarBg()} ${getSidebarText()}
//         transition-all duration-300 z-40 shadow-2xl border-r ${getSidebarBorder()}
//         ${isCollapsed ? 'w-20' : 'w-64'}
//       `}>
//         <SidebarContent />
//       </aside>

//       {/* Collapsed State Quick Actions */}
//       {isCollapsed && (
//         <div className="hidden lg:block fixed bottom-4 left-4 z-30 space-y-2">
//           <button
//             onClick={onToggleCollapse}
//             className={`w-12 h-12 ${getButtonGradient()} rounded-xl shadow-lg flex items-center justify-center text-white hover:shadow-xl transition-all`}
//             title="Expand Menu"
//           >
//             <ChevronRight className="h-5 w-5" />
//           </button>
//           <button className={`w-12 h-12 ${isLightTheme ? 'bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-900' : 'bg-gray-800/50 hover:bg-gray-800 text-gray-400 hover:text-white'} rounded-xl shadow flex items-center justify-center transition-all relative`} title="Notifications">
//             <Bell className="h-5 w-5" />
//             <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
//           </button>
//         </div>
//       )}
//     </>
//   );
// }


// 'use client';

// import React, { useState, useEffect, useMemo } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { 
//   Menu, X, ChevronDown, ChevronRight, Home, Settings, 
//   Users, Calendar, FileText, Briefcase, CreditCard, 
//   BarChart3, Shield, Bell, HelpCircle, LogOut, 
//   Search, Filter, Plus, User, Building, Clock,
//   DollarSign, PieChart, LineChart, Target, Award,
//   Zap, Star, Crown, Lock, Globe, Palette, Bell as BellIcon,
//   MessageSquare, Download, Upload, Eye, Edit2, Trash2,
//   MoreVertical, ArrowRight, CheckCircle, XCircle, AlertCircle,
//   Folder, FolderOpen, FolderPlus, BookOpen, Book, File,
//   FileText as FileTextIcon, FileCode, FileImage, FileSpreadsheet,
//   Mail, Phone, MapPin, Shield as ShieldIcon, Key, Database,
//   Server, Cloud, CloudRain, Sun, Moon, Wind, Thermometer,
//   Wifi, WifiOff, Battery, BatteryCharging, Power, RefreshCw
// } from 'lucide-react';
// import { useTheme } from './ThemeContext';
// import { MODULES, SUB_PERMISSIONS } from './data/navdata';
// import { useAuth } from './AuthContext';

// // Import FontAwesome icons for modules
// import { 
//   FaHome, 
//   FaUsersCog, 
//   FaUserPlus, 
//   FaUserTie, 
//   FaClock, 
//   FaCalendarAlt, 
//   FaFileInvoiceDollar, 
//   FaSignOutAlt 
// } from 'react-icons/fa';

// export default function Sidebar({ isCollapsed, onToggleCollapse }) {
//   const { theme } = useTheme();
//   const { logout, user: authUser } = useAuth();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [openMenus, setOpenMenus] = useState({});
//   const [isMobileOpen, setIsMobileOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState('');

//   // Use user from AuthContext for real-time updates (automatically reactive)
//   const currentUser = authUser || {};

//   // Real-time sync: Listen for storage events (cross-tab updates only)
//   // Same-tab updates are handled automatically via AuthContext
//   useEffect(() => {
//     const handleStorageChange = (e) => {
//       // Handle cross-tab updates - trigger a custom event
//       if (e.key === 'currentUser' && e.newValue) {
//         try {
//           const updatedUser = JSON.parse(e.newValue);
//           // Dispatch custom event for AuthContext to pick up
//           window.dispatchEvent(new CustomEvent('storageUserUpdate', { detail: updatedUser }));
//         } catch (error) {
//           console.error('Failed to parse updated user:', error);
//         }
//       }
//     };

//     window.addEventListener('storage', handleStorageChange);
//     return () => {
//       window.removeEventListener('storage', handleStorageChange);
//     };
//   }, []);

//   const permissions = currentUser.permissions || {};
//   const isSuperAdmin = currentUser.role === 'superadmin';

//   // Check if theme is light or dark
//   const isLightTheme = theme?.type === 'light' || theme?.sidebarBg?.includes('white') || theme?.sidebarBg?.includes('gray-50') || theme?.sidebarBg?.includes('blue-50') || theme?.sidebarBg?.includes('green-50') || theme?.sidebarBg?.includes('purple-50') || theme?.sidebarBg?.includes('pink-50') || theme?.sidebarBg?.includes('orange-50') || theme?.sidebarBg?.includes('teal-50') || theme?.sidebarBg?.includes('amber-50') || theme?.sidebarBg?.includes('rose-50') || theme?.sidebarBg?.includes('cyan-50');
//   const isDarkTheme = theme?.type === 'dark' || theme?.sidebarBg?.includes('black') || theme?.sidebarBg?.includes('gray-9') || theme?.sidebarBg?.includes('gray-8') || theme?.sidebarBg?.includes('slate-9') || theme?.sidebarBg?.includes('zinc-9') || theme?.sidebarBg?.includes('neutral-9');

//   // Theme helper functions
//   const getSidebarBg = () => theme?.sidebarBg || 'bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900';
//   const getSidebarText = () => {
//     if (theme?.sidebarText) return theme.sidebarText;
//     return isLightTheme ? 'text-gray-800' : 'text-gray-200';
//   };
//   const getSidebarHover = () => {
//     if (theme?.sidebarHover) return theme.sidebarHover;
//     return isLightTheme ? 'hover:bg-gray-100' : 'hover:bg-white/10';
//   };
//   const getSidebarActive = () => {
//     if (theme?.sidebarActive) return theme.sidebarActive;
    
//     const fromColor = 'orange-500';
//     const toColor = 'pink-600';
//     if (isLightTheme) {
//       return `bg-gradient-to-r from-${fromColor}/10 to-${toColor}/10`;
//     }
//     return `bg-gradient-to-r from-${fromColor}/20 to-${toColor}/20`;
//   };
  
//   const getSidebarBorder = () => theme?.sidebarBorder || (isLightTheme ? 'border-gray-200' : 'border-gray-700');
//   const getButtonGradient = () => theme?.button ? `bg-gradient-to-r ${theme.button}` : 'bg-gradient-to-r from-orange-500 to-orange-600';
//   const getTextAccent = () => theme?.accent ? `text-${theme.accent}` : 'text-orange-400';
  
//   // Get text colors based on theme type
//   const getPrimaryTextColor = () => isLightTheme ? 'text-gray-800' : 'text-gray-200';
//   const getSecondaryTextColor = () => isLightTheme ? 'text-gray-600' : 'text-gray-400';
//   const getMutedTextColor = () => isLightTheme ? 'text-gray-500' : 'text-gray-500';
  
//   // Get background colors based on theme type
//   const getCardBg = () => isLightTheme ? 'bg-white/50' : 'bg-gray-800/50';
//   const getInputBg = () => isLightTheme ? 'bg-white' : 'bg-gray-800/50';
//   const getInputBorder = () => isLightTheme ? 'border-gray-300' : 'border-gray-700';
  
//   // Get gradient colors from theme
//   const getGradientFrom = () => {
//     if (theme?.gradient) {
//       const gradientParts = theme.gradient.split(' ');
//       const fromClass = gradientParts[0];
//       return fromClass.replace('from-', '');
//     }
//     return 'orange-500';
//   };

//   const getGradientTo = () => {
//     if (theme?.gradient) {
//       const gradientParts = theme.gradient.split(' ');
//       const toClass = gradientParts.find(part => part.startsWith('to-'));
//       return toClass ? toClass.replace('to-', '') : 'pink-600';
//     }
//     return 'pink-600';
//   };

//   const getFromColorClass = () => `from-${getGradientFrom()}`;
//   const getToColorClass = () => `to-${getGradientTo()}`;
//   const getAccentColor = () => theme?.accent?.split('-')[0] || 'orange';

//   useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth >= 1024 && isMobileOpen) {
//         setIsMobileOpen(false);
//       }
//     };
//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, [isMobileOpen]);

//   const toggleMenu = (name) => {
//     setOpenMenus(prev => ({ ...prev, [name]: !prev[name] }));
//   };

//   const isActive = (path) => location.pathname.startsWith(path);

//   // Check if user has view permission for a sub-item
//   const canViewSubItem = (moduleName, subItemName) => {
//     // For superadmin, check the actual permission value
//     if (isSuperAdmin) {
//       if (!permissions[moduleName]) return false;
//       const subItemPermissions = permissions[moduleName][subItemName];
//       if (!subItemPermissions) return false;
//       return subItemPermissions.view === true;
//     }
    
//     // For regular users, check permissions
//     if (!permissions[moduleName]) return false;
    
//     // Check if subItem exists in module permissions
//     const subItemPermissions = permissions[moduleName][subItemName];
//     if (!subItemPermissions) return false;
    
//     // Return true if view permission is true
//     return subItemPermissions.view === true;
//   };

//   // Check if user has any view permission in a module
//   const hasAnyPermissionInModule = (moduleName) => {
//     // For superadmin, check if there are any sub-items defined for this module
//     if (isSuperAdmin) {
//       const subItems = SUB_PERMISSIONS[moduleName] || [];
//       return subItems.length > 0;
//     }
    
//     // For regular users, check permissions
//     if (!permissions[moduleName]) return false;
    
//     // Check if any sub-item has view permission
//     const modulePermissions = permissions[moduleName];
//     return Object.values(modulePermissions).some(subItem => 
//       subItem && typeof subItem === 'object' && subItem.view === true
//     );
//   };

//   // Get visible sub-items for a module
//   const getVisibleSubItems = (moduleName) => {
//     const subItems = SUB_PERMISSIONS[moduleName] || [];
    
//     return subItems.filter(sub => {
//       // For regular users, check permission
//       return canViewSubItem(moduleName, sub.name);
//     });
//   };

//   // Filter modules based on permissions (memoized for performance - updates in real-time)
//   const dynamicMenu = useMemo(() => MODULES.map(mod => {
//     // Get the icon component for this module
//     const getIconComponent = () => {
//       switch(mod.name) {
//         case 'Base': return FaHome;
//         case 'Recruitment': return FaUsersCog;
//         case 'Onboarding': return FaUserPlus;
//         case 'Employee': return FaUserTie;
//         case 'Attendance': return FaClock;
//         case 'Leave': return FaCalendarAlt;
//         case 'Payroll': return FaFileInvoiceDollar;
//         case 'Offboarding': return FaSignOutAlt;
//         default: return Home;
//       }
//     };

//     // Get visible sub-items for this module
//     const visibleSubItems = getVisibleSubItems(mod.name);
    
//     // If no visible sub-items, don't show the module
//     if (visibleSubItems.length === 0) {
//       return null;
//     }

//     // Map the visible sub-items
//     const mappedSubItems = visibleSubItems.map(sub => ({
//       label: sub.name,
//       key: sub.name,
//       link: sub.route,
//       icon: ChevronRight,
//     }));

//     return {
//       label: mod.name,
//       icon: getIconComponent(),
//       color: getTextAccent(),
//       link: mappedSubItems[0]?.link || '#', // First accessible sub-item as default link
//       submenu: mappedSubItems,
//     };
//   }).filter(Boolean), [permissions, isSuperAdmin, currentUser]);

//   const menuData = useMemo(() => [
//     { label: 'Dashboard', icon: Home, link: '/dashboard', color: `text-${getAccentColor()}-${isLightTheme ? '600' : '400'}` },
//     ...dynamicMenu,
//     { label: 'Settings', icon: Settings, link: '/settings', color: getSecondaryTextColor() },
   
//   ], [dynamicMenu, isLightTheme]);

//   const filteredMenuData = useMemo(() => menuData.filter(item =>
//     item.label.toLowerCase().includes(searchQuery.toLowerCase())
//   ), [menuData, searchQuery]);

//   // Mobile overlay
//   useEffect(() => {
//     if (isMobileOpen) {
//       document.body.style.overflow = 'hidden';
//     } else {
//       document.body.style.overflow = 'unset';
//     }
//     return () => {
//       document.body.style.overflow = 'unset';
//     };
//   }, [isMobileOpen]);

//   const SidebarContent = ({ isMobile = false }) => (
//     <div className={`h-full flex flex-col ${isMobile ? 'w-72' : ''}`}>
//       {/* Header */}
//       <div className={`p-6 border-b ${getSidebarBorder()}`}>
//         <div className="flex items-center justify-between">
//           <div className="flex items-center gap-3">
//             <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${getFromColorClass()} ${getToColorClass()} shadow-lg flex items-center justify-center`}>
//               {currentUser.logo ? (
//                 <img src={currentUser.logo} alt="logo" className="w-8 h-8 rounded-lg object-contain" />
//               ) : (
//                 <Building className="h-5 w-5 text-white" />
//               )}
//             </div>
//             {(!isCollapsed || isMobile) && (
//               <div>
//                 <h1 className={`text-lg font-bold ${getPrimaryTextColor()}`}>HRMS Pro</h1>
//                 <p className={`text-xs ${getSecondaryTextColor()}`}>{currentUser.companyName || 'HR System'}</p>
//               </div>
//             )}
//           </div>
//           {(!isCollapsed || isMobile) && (
//             <button
//               onClick={() => isMobile ? setIsMobileOpen(false) : onToggleCollapse()}
//               className={`p-2 ${isLightTheme ? 'hover:bg-gray-100' : 'hover:bg-white/10'} rounded-lg transition-colors`}
//             >
//               <X className={`h-5 w-5 ${getSecondaryTextColor()}`} />
//             </button>
//           )}
//         </div>
//       </div>

//       {/* Menu Items */}
//       <nav className="flex-1 overflow-y-auto py-4 px-3">
//         <ul className="space-y-1">
//           {filteredMenuData.map(item => {
//             const Icon = item.icon;
//             const hasSubmenu = item.submenu?.length > 0;
//             const isOpen = openMenus[item.label];
//             const active = isActive(item.link);
//             const IconComponent = Icon || Home;

//             return (
//               <li key={item.label}>
//                 <div
//                   onClick={() => hasSubmenu && toggleMenu(item.label)}
//                   className={`
//                     group flex items-center justify-between px-3 py-2.5 rounded-xl cursor-pointer transition-all duration-200
//                     ${active ? getSidebarActive() : getSidebarHover()}
//                     ${active ? 'shadow-lg' : ''}
//                     relative overflow-hidden
//                   `}
//                 >
//                   {/* Active indicator */}
//                   {active && (
//                     <div className={`absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-6 bg-gradient-to-b ${getFromColorClass()} ${getToColorClass()} rounded-r-full`}></div>
//                   )}

//                   {/* Glow effect */}
//                   <div className={`absolute inset-0 ${getFromColorClass()}/0 ${getToColorClass()}/0 group-hover:${getFromColorClass()}/10 group-hover:${getToColorClass()}/10 transition-all duration-300`}></div>

//                   <button
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       if (!hasSubmenu) {
//                         navigate(item.link);
//                         if (isMobile) setIsMobileOpen(false);
//                       }
//                     }}
//                     className="flex items-center gap-3 flex-1 text-left relative z-10"
//                   >
//                     <div className={`p-1.5 rounded-lg ${item.color} ${isLightTheme ? 'bg-gray-100' : 'bg-gray-800/50'}`}>
//                       <IconComponent className="h-4 w-4" />
//                     </div>
//                     {(!isCollapsed || isMobile) && (
//                       <div className="flex-1 min-w-0">
//                         <span className={`font-medium text-sm truncate ${active ? (isLightTheme ? 'text-gray-900' : 'text-white') : getPrimaryTextColor()}`}>
//                           {item.label}
//                         </span>
//                         {hasSubmenu && item.submenu && (
//                           <p className={`text-xs ${getSecondaryTextColor()} mt-0.5`}>
//                             {item.submenu.length} items
//                           </p>
//                         )}
//                       </div>
//                     )}
//                   </button>
                  
//                   {hasSubmenu && (!isCollapsed || isMobile) && (
//                     <div className="relative z-10">
//                       {isOpen ? (
//                         <ChevronDown className={`h-4 w-4 ${getSecondaryTextColor()}`} />
//                       ) : (
//                         <ChevronRight className={`h-4 w-4 ${getSecondaryTextColor()}`} />
//                       )}
//                     </div>
//                   )}
//                 </div>

//                 {/* Submenu */}
//                 {hasSubmenu && isOpen && (!isCollapsed || isMobile) && (
//                   <div className={`ml-8 mt-1 space-y-0.5 pl-3 border-l ${getSidebarBorder()}`}>
//                     {item.submenu.map(sub => {
//                       const SubIcon = sub.icon || ChevronRight;
//                       const subActive = location.pathname === sub.link;
//                       const accentColor = getAccentColor();
                      
//                       return (
//                         <button
//                           key={sub.link}
//                           onClick={() => {
//                             navigate(sub.link);
//                             if (isMobile) setIsMobileOpen(false);
//                           }}
//                           className={`
//                             w-full text-left py-2 px-3 text-sm rounded-lg transition-all duration-150 flex items-center gap-2
//                             ${subActive 
//                               ? `${isLightTheme ? 'bg-gray-100 text-gray-900' : `bg-gradient-to-r ${getFromColorClass()}/10 ${getToColorClass()}/10 text-white`}` 
//                               : `${getSecondaryTextColor()} ${isLightTheme ? 'hover:text-gray-900 hover:bg-gray-50' : 'hover:text-white hover:bg-gray-800/50'}`
//                             }
//                           `}
//                         >
//                           <SubIcon className={`h-3 w-3 ${subActive ? `text-${accentColor}-${isLightTheme ? '600' : '400'}` : getSecondaryTextColor()}`} />
//                           <span className="truncate">{sub.label}</span>
//                           {subActive && (
//                             <div className={`ml-auto w-1.5 h-1.5 rounded-full bg-gradient-to-r ${getFromColorClass()} ${getToColorClass()}`}></div>
//                           )}
//                         </button>
//                       );
//                     })}
//                   </div>
//                 )}
//               </li>
//             );
//           })}
//         </ul>
//       </nav>

//       {/* User Profile & Footer */}
//       <div className={`p-4 border-t ${getSidebarBorder()}`}>
//         <div className="flex items-center gap-3 mb-4">
//           <div className="relative">
//             <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${getFromColorClass()} ${getToColorClass()} flex items-center justify-center shadow-lg`}>
//               <span className="text-white font-bold">
//                 {currentUser.username?.[0]?.toUpperCase() || 'U'}
//               </span>
//             </div>
//             <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
//           </div>
//           {(!isCollapsed || isMobile) && (
//             <div className="flex-1 min-w-0">
//               <p className={`font-semibold text-sm ${getPrimaryTextColor()} truncate`}>{currentUser.username || 'User'}</p>
//               <p className={`text-xs ${getSecondaryTextColor()} truncate`}>
//                 {isSuperAdmin ? 'Super Admin' : currentUser.role || 'Employee'}
//               </p>
//             </div>
//           )}
//         </div>

//         {(!isCollapsed || isMobile) && (
//           <>
//             {/* Status Badge */}
//             <div className={`mb-3 px-3 py-2 ${getCardBg()} rounded-lg`}>
//               <div className="flex items-center justify-between text-xs">
//                 <span className={getSecondaryTextColor()}>Status</span>
//                 <div className="flex items-center gap-1">
//                   <div className="w-2 h-2 rounded-full bg-green-500"></div>
//                   <span className={`${isLightTheme ? 'text-green-700' : 'text-green-400'} font-medium`}>Active</span>
//                 </div>
//               </div>
//             </div>

//             {/* Action Buttons */}
//             <div className="flex items-center gap-2">
//               <button 
//                 onClick={() => navigate('/settings')}
//                 className={`flex-1 px-3 py-1.5 ${getCardBg()} ${isLightTheme ? 'hover:bg-gray-200' : 'hover:bg-gray-800'} rounded-lg text-xs ${getSecondaryTextColor()} flex items-center justify-center gap-1`}
//               >
//                 <Settings className="h-3 w-3" />
//                 Settings
//               </button>
//               <button 
//                 onClick={logout}
//                 className={`flex-1 px-3 py-1.5 bg-gradient-to-r ${getFromColorClass()}/10 ${getToColorClass()}/10 hover:${getFromColorClass()}/20 hover:${getToColorClass()}/20 rounded-lg text-xs ${getTextAccent()} flex items-center justify-center gap-1`}
//               >
//                 <LogOut className="h-3 w-3" />
//                 Logout
//               </button>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );

//   return (
//     <>
//       {/* Mobile Menu Button */}
//       <button
//         onClick={() => setIsMobileOpen(true)}
//         className={`lg:hidden fixed top-4 left-4 z-40 p-2 ${getButtonGradient()} text-white rounded-xl shadow-lg`}
//       >
//         <Menu className="h-5 w-5" />
//       </button>

//       {/* Mobile Overlay */}
//       {isMobileOpen && (
//         <div 
//           className="lg:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
//           onClick={() => setIsMobileOpen(false)}
//         >
//           <div 
//             className={`fixed inset-y-0 left-0 w-72 ${getSidebarBg()} border-r ${getSidebarBorder()} shadow-2xl`}
//             onClick={(e) => e.stopPropagation()}
//           >
//             <SidebarContent isMobile />
//           </div>
//         </div>
//       )}

//       {/* Desktop Sidebar */}
//       <aside className={`
//         hidden lg:fixed lg:inset-y-0 lg:left-0 lg:flex lg:flex-col
//         ${getSidebarBg()} ${getSidebarText()}
//         transition-all duration-300 z-40 shadow-2xl border-r ${getSidebarBorder()}
//         ${isCollapsed ? 'w-20' : 'w-64'}
//       `}>
//         <SidebarContent />
//       </aside>

//       {/* Collapsed State Quick Actions */}
//       {isCollapsed && (
//         <div className="hidden lg:block fixed bottom-4 left-4 z-30 space-y-2">
//           <button
//             onClick={onToggleCollapse}
//             className={`w-12 h-12 ${getButtonGradient()} rounded-xl shadow-lg flex items-center justify-center text-white hover:shadow-xl transition-all`}
//             title="Expand Menu"
//           >
//             <ChevronRight className="h-5 w-5" />
//           </button>
//           <button className={`w-12 h-12 ${isLightTheme ? 'bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-900' : 'bg-gray-800/50 hover:bg-gray-800 text-gray-400 hover:text-white'} rounded-xl shadow flex items-center justify-center transition-all relative`} title="Notifications">
//             <Bell className="h-5 w-5" />
//             <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
//           </button>
//         </div>
//       )}
//     </>
//   );
// }

// 'use client';

// import React, { useState, useEffect, useMemo } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { 
//   Menu, X, ChevronDown, ChevronRight, Home, Settings, 
//   Building, Bell, LogOut 
// } from 'lucide-react';
// import { useTheme } from './ThemeContext';
// import { MODULES, SUB_PERMISSIONS } from './data/navdata';
// import { useAuth } from './AuthContext';
// import { 
//   FaHome, 
//   FaUsersCog, 
//   FaUserPlus, 
//   FaUserTie, 
//   FaClock, 
//   FaCalendarAlt, 
//   FaFileInvoiceDollar, 
//   FaSignOutAlt 
// } from 'react-icons/fa';

// export default function Sidebar({ isCollapsed, onToggleCollapse }) {
//   const { theme } = useTheme();
//   const { logout, user: authUser } = useAuth();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [openMenus, setOpenMenus] = useState({});
//   const [isMobileOpen, setIsMobileOpen] = useState(false);
//   const [hoveredMenu, setHoveredMenu] = useState(null);
//   const [hoverTimeout, setHoverTimeout] = useState(null);
//   const [showExpandButton, setShowExpandButton] = useState(false);

//   const currentUser = authUser || {};
//   const permissions = currentUser.permissions || {};
//   const isSuperAdmin = currentUser.role === 'superadmin';

//   // Theme detection
//   const isLightTheme = theme?.type === 'light' || theme?.sidebarBg?.includes('white') || theme?.sidebarBg?.includes('gray-50');

//   // Theme helper functions
//   const getSidebarBg = () => theme?.sidebarBg || 'bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900';
//   const getSidebarText = () => theme?.sidebarText || (isLightTheme ? 'text-gray-800' : 'text-gray-200');
//   const getSidebarHover = () => theme?.sidebarHover || (isLightTheme ? 'hover:bg-gray-100' : 'hover:bg-white/10');
//   const getSidebarActive = () => {
//     if (theme?.sidebarActive) return theme.sidebarActive;
//     const fromColor = 'orange-500';
//     const toColor = 'pink-600';
//     if (isLightTheme) {
//       return `bg-gradient-to-r from-${fromColor}/10 to-${toColor}/10`;
//     }
//     return `bg-gradient-to-r from-${fromColor}/20 to-${toColor}/20`;
//   };
  
//   const getSidebarBorder = () => theme?.sidebarBorder || (isLightTheme ? 'border-gray-200' : 'border-gray-700');
//   const getTextAccent = () => theme?.accent ? `text-${theme.accent}` : 'text-orange-400';
  
//   // Get text colors
//   const getPrimaryTextColor = () => isLightTheme ? 'text-gray-800' : 'text-gray-200';
//   const getSecondaryTextColor = () => isLightTheme ? 'text-gray-600' : 'text-gray-400';

//   // Get gradient colors
//   const getGradientFrom = () => {
//     if (theme?.gradient) {
//       const fromClass = theme.gradient.split(' ')[0];
//       return fromClass.replace('from-', '');
//     }
//     return 'orange-500';
//   };

//   const getGradientTo = () => {
//     if (theme?.gradient) {
//       const gradientParts = theme.gradient.split(' ');
//       const toClass = gradientParts.find(part => part.startsWith('to-'));
//       return toClass ? toClass.replace('to-', '') : 'pink-600';
//     }
//     return 'pink-600';
//   };

//   const getFromColorClass = () => `from-${getGradientFrom()}`;
//   const getToColorClass = () => `to-${getGradientTo()}`;

//   // Handle sidebar hover to show expand button
//   useEffect(() => {
//     if (isCollapsed) {
//       const sidebar = document.querySelector('aside');
//       if (sidebar) {
//         const handleSidebarHover = () => setShowExpandButton(true);
//         const handleSidebarLeave = () => setShowExpandButton(false);
        
//         sidebar.addEventListener('mouseenter', handleSidebarHover);
//         sidebar.addEventListener('mouseleave', handleSidebarLeave);
        
//         return () => {
//           sidebar.removeEventListener('mouseenter', handleSidebarHover);
//           sidebar.removeEventListener('mouseleave', handleSidebarLeave);
//         };
//       }
//     }
//   }, [isCollapsed]);

//   // Handle hover for collapsed state
//   const handleMenuHover = (menuLabel) => {
//     if (isCollapsed) {
//       if (hoverTimeout) clearTimeout(hoverTimeout);
//       setHoveredMenu(menuLabel);
//       setShowExpandButton(true); // Show expand button when hovering menu
//     }
//   };

//   const handleMenuLeave = () => {
//     if (isCollapsed) {
//       const timeout = setTimeout(() => {
//         setHoveredMenu(null);
//       }, 200);
//       setHoverTimeout(timeout);
//     }
//   };

//   // Check permissions
//   const canViewSubItem = (moduleName, subItemName) => {
//     if (isSuperAdmin) {
//       return true;
//     }
    
//     if (!permissions[moduleName]) return false;
//     const subItemPermissions = permissions[moduleName][subItemName];
//     if (!subItemPermissions) return false;
//     return subItemPermissions.view === true;
//   };

//   // Get visible sub-items
//   const getVisibleSubItems = (moduleName) => {
//     const subItems = SUB_PERMISSIONS[moduleName] || [];
//     return subItems.filter(sub => canViewSubItem(moduleName, sub.name));
//   };

//   // Build dynamic menu
//   const dynamicMenu = useMemo(() => MODULES.map(mod => {
//     const getIconComponent = () => {
//       switch(mod.name) {
//         case 'Base': return FaHome;
//         case 'Recruitment': return FaUsersCog;
//         case 'Onboarding': return FaUserPlus;
//         case 'Employee': return FaUserTie;
//         case 'Attendance': return FaClock;
//         case 'Leave': return FaCalendarAlt;
//         case 'Payroll': return FaFileInvoiceDollar;
//         case 'Offboarding': return FaSignOutAlt;
//         default: return FaHome;
//       }
//     };

//     const visibleSubItems = getVisibleSubItems(mod.name);
//     if (visibleSubItems.length === 0) return null;

//     const mappedSubItems = visibleSubItems.map(sub => ({
//       label: sub.name,
//       key: sub.name,
//       link: sub.route,
//       icon: ChevronRight,
//     }));

//     return {
//       label: mod.name,
//       icon: getIconComponent(),
//       color: getTextAccent(),
//       link: mappedSubItems[0]?.link || '#',
//       submenu: mappedSubItems,
//     };
//   }).filter(Boolean), [permissions, isSuperAdmin]);

//   const menuData = useMemo(() => [
//     { label: 'Dashboard', icon: Home, link: '/dashboard', color: getTextAccent() },
//     ...dynamicMenu,
//     { label: 'Settings', icon: Settings, link: '/settings', color: getSecondaryTextColor() },
//   ], [dynamicMenu]);

//   // Floating Submenu Component for Collapsed State
//   const FloatingSubmenu = ({ menuItem }) => {
//     if (!menuItem || !menuItem.submenu || menuItem.submenu.length === 0) return null;

//     return (
//       <div 
//         className={`
//           fixed left-20 top-0 ml-2 w-56 rounded-xl shadow-2xl 
//           border ${getSidebarBorder()} 
//           ${isLightTheme ? 'bg-white' : 'bg-gray-900'} 
//           py-2 z-50 animate-in slide-in-from-left-1 duration-200
//           max-h-[80vh] overflow-y-auto
//         `}
//         onMouseEnter={() => handleMenuHover(menuItem.label)}
//         onMouseLeave={handleMenuLeave}
//       >
//         {/* Menu header */}
//         <div className={`px-4 py-2 border-b ${getSidebarBorder()}`}>
//           <div className="flex items-center gap-2">
//             <div className={`p-1.5 rounded-lg ${menuItem.color} ${isLightTheme ? 'bg-gray-100' : 'bg-gray-800/50'}`}>
//               {React.createElement(menuItem.icon || Home, { className: "h-4 w-4" })}
//             </div>
//             <span className={`font-medium text-sm ${getPrimaryTextColor()}`}>
//               {menuItem.label}
//             </span>
//           </div>
//         </div>

//         {/* Submenu items */}
//         <div className="py-2">
//           {menuItem.submenu.map(sub => {
//             const SubIcon = sub.icon || ChevronRight;
//             const subActive = location.pathname === sub.link;
            
//             return (
//               <button
//                 key={sub.link}
//                 onClick={() => {
//                   navigate(sub.link);
//                   setHoveredMenu(null);
//                 }}
//                 className={`
//                   w-full text-left py-2.5 px-4 text-sm rounded-lg mx-2 transition-all duration-150 
//                   flex items-center gap-3
//                   ${subActive 
//                     ? `${isLightTheme ? 'bg-gray-100 text-gray-900' : `bg-gradient-to-r ${getFromColorClass()}/10 ${getToColorClass()}/10 text-white`}` 
//                     : `${getSecondaryTextColor()} ${isLightTheme ? 'hover:text-gray-900 hover:bg-gray-50' : 'hover:text-white hover:bg-gray-800/50'}`
//                   }
//                 `}
//               >
//                 <SubIcon className="h-3.5 w-3.5" />
//                 <span className="truncate">{sub.label}</span>
//               </button>
//             );
//           })}
//         </div>
//       </div>
//     );
//   };

//   const SidebarContent = ({ isMobile = false }) => (
//     <div className={`h-full flex flex-col ${isMobile ? 'w-72' : ''}`}>
//       {/* Header */}
//       <div className={`p-6 border-b ${getSidebarBorder()}`}>
//         <div className="flex items-center justify-between">
//           <div className="flex items-center gap-3">
//             <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${getFromColorClass()} ${getToColorClass()} shadow-lg flex items-center justify-center`}>
//               {currentUser.logo ? (
//                 <img src={currentUser.logo} alt="logo" className="w-8 h-8 rounded-lg object-contain" />
//               ) : (
//                 <Building className="h-5 w-5 text-white" />
//               )}
//             </div>
//             {(!isCollapsed || isMobile) && (
//               <div>
//                 <h1 className={`text-lg font-bold ${getPrimaryTextColor()}`}>HRMS Pro</h1>
//                 <p className={`text-xs ${getSecondaryTextColor()}`}>{currentUser.companyName || 'HR System'}</p>
//               </div>
//             )}
//           </div>
//           {(!isCollapsed || isMobile) && (
//             <button
//               onClick={() => isMobile ? setIsMobileOpen(false) : onToggleCollapse()}
//               className={`p-2 rounded-lg transition-colors ${isLightTheme ? 'hover:bg-gray-100' : 'hover:bg-white/10'}`}
//             >
//               <X className={`h-5 w-5 ${getSecondaryTextColor()}`} />
//             </button>
//           )}
//         </div>
//       </div>

//       {/* Menu Items */}
//       <nav className="flex-1 overflow-y-auto py-4 px-3">
//         <ul className="space-y-1">
//           {menuData.map(item => {
//             const Icon = item.icon;
//             const hasSubmenu = item.submenu?.length > 0;
//             const isOpen = openMenus[item.label];
//             const active = location.pathname.startsWith(item.link);
//             const isHovered = hoveredMenu === item.label;
//             const showFloatingSubmenu = isCollapsed && isHovered && hasSubmenu;
//             const IconComponent = Icon;

//             return (
//               <li 
//                 key={item.label} 
//                 className="relative"
//                 onMouseEnter={() => handleMenuHover(item.label)}
//                 onMouseLeave={handleMenuLeave}
//               >
//                 <div
//                   onClick={() => {
//                     if (isCollapsed && hasSubmenu) {
//                       // In collapsed mode, clicking opens the floating menu
//                       setHoveredMenu(isHovered ? null : item.label);
//                     } else if (!isCollapsed && hasSubmenu) {
//                       // In expanded mode, clicking toggles the dropdown
//                       setOpenMenus(prev => ({ ...prev, [item.label]: !prev[item.label] }));
//                     } else {
//                       // No submenu, navigate directly
//                       navigate(item.link);
//                       if (isMobile) setIsMobileOpen(false);
//                     }
//                   }}
//                   className={`
//                     group flex items-center justify-between px-3 py-2.5 rounded-xl 
//                     cursor-pointer transition-all duration-200
//                     ${active ? getSidebarActive() : getSidebarHover()}
//                     ${active ? 'shadow-lg' : ''}
//                     ${isCollapsed ? 'justify-center px-2' : ''}
//                   `}
//                 >
//                   {/* Active indicator */}
//                   {active && !isCollapsed && (
//                     <div className={`absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-6 bg-gradient-to-b ${getFromColorClass()} ${getToColorClass()} rounded-r-full`}></div>
//                   )}

//                   <div className="flex items-center gap-3 flex-1">
//                     <div className={`p-1.5 rounded-lg ${item.color} ${isLightTheme ? 'bg-gray-100' : 'bg-gray-800/50'}`}>
//                       <IconComponent className="h-4 w-4" />
//                     </div>
//                     {(!isCollapsed || isMobile) && (
//                       <div className="flex-1 min-w-0">
//                         <span className={`font-medium text-sm truncate ${active ? (isLightTheme ? 'text-gray-900' : 'text-white') : getPrimaryTextColor()}`}>
//                           {item.label}
//                         </span>
//                       </div>
//                     )}
//                   </div>
                  
//                   {hasSubmenu && (!isCollapsed || isMobile) && (
//                     <div className="ml-2">
//                       {isOpen ? (
//                         <ChevronDown className={`h-4 w-4 ${getSecondaryTextColor()}`} />
//                       ) : (
//                         <ChevronRight className={`h-4 w-4 ${getSecondaryTextColor()}`} />
//                       )}
//                     </div>
//                   )}
//                 </div>

//                 {/* Floating submenu for collapsed state */}
//                 {showFloatingSubmenu && (
//                   <FloatingSubmenu menuItem={item} />
//                 )}

//                 {/* Regular submenu for expanded state */}
//                 {hasSubmenu && isOpen && !isCollapsed && !isMobile && (
//                   <div className={`ml-8 mt-1 space-y-0.5 pl-3 border-l ${getSidebarBorder()}`}>
//                     {item.submenu.map(sub => (
//                       <button
//                         key={sub.link}
//                         onClick={() => {
//                           navigate(sub.link);
//                           if (isMobile) setIsMobileOpen(false);
//                         }}
//                         className={`
//                           w-full text-left py-2 px-3 text-sm rounded-lg transition-all duration-150 
//                           flex items-center gap-2
//                           ${location.pathname === sub.link 
//                             ? `${isLightTheme ? 'bg-gray-100 text-gray-900' : `bg-gradient-to-r ${getFromColorClass()}/10 ${getToColorClass()}/10 text-white`}` 
//                             : `${getSecondaryTextColor()} ${isLightTheme ? 'hover:text-gray-900 hover:bg-gray-50' : 'hover:text-white hover:bg-gray-800/50'}`
//                           }
//                         `}
//                       >
//                         <ChevronRight className="h-3 w-3" />
//                         <span className="truncate">{sub.label}</span>
//                       </button>
//                     ))}
//                   </div>
//                 )}
//               </li>
//             );
//           })}
//         </ul>
//       </nav>

//       {/* User Profile & Footer */}
//       <div className={`p-4 border-t ${getSidebarBorder()}`}>
//         <div className="flex items-center gap-3 mb-4">
//           <div className="relative">
//             <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${getFromColorClass()} ${getToColorClass()} flex items-center justify-center shadow-lg`}>
//               <span className="text-white font-bold">
//                 {currentUser.username?.[0]?.toUpperCase() || 'U'}
//               </span>
//             </div>
//           </div>
//           {(!isCollapsed || isMobile) && (
//             <div className="flex-1 min-w-0">
//               <p className={`font-semibold text-sm ${getPrimaryTextColor()} truncate`}>
//                 {currentUser.username || 'User'}
//               </p>
//               <p className={`text-xs ${getSecondaryTextColor()} truncate`}>
//                 {isSuperAdmin ? 'Super Admin' : currentUser.role || 'Employee'}
//               </p>
//             </div>
//           )}
//         </div>

//         {(!isCollapsed || isMobile) && (
//           <div className="flex items-center gap-2">
//             <button 
//               onClick={() => navigate('/settings')}
//               className={`flex-1 px-3 py-1.5 ${isLightTheme ? 'bg-gray-100 hover:bg-gray-200' : 'bg-gray-800/50 hover:bg-gray-800'} rounded-lg text-xs ${getSecondaryTextColor()} flex items-center justify-center gap-1`}
//             >
//               <Settings className="h-3 w-3" />
//               Settings
//             </button>
//             <button 
//               onClick={logout}
//               className={`flex-1 px-3 py-1.5 bg-gradient-to-r ${getFromColorClass()}/10 ${getToColorClass()}/10 hover:${getFromColorClass()}/20 hover:${getToColorClass()}/20 rounded-lg text-xs ${getTextAccent()} flex items-center justify-center gap-1`}
//             >
//               <LogOut className="h-3 w-3" />
//               Logout
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );

//   return (
//     <>
//       {/* Mobile Menu Button */}
//       <button
//         onClick={() => setIsMobileOpen(true)}
//         className={`lg:hidden fixed top-4 left-4 z-50 p-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl shadow-lg`}
//       >
//         <Menu className="h-5 w-5" />
//       </button>

//       {/* Mobile Overlay */}
//       {isMobileOpen && (
//         <div 
//           className="lg:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
//           onClick={() => setIsMobileOpen(false)}
//         >
//           <div 
//             className={`fixed inset-y-0 left-0 w-72 ${getSidebarBg()} border-r ${getSidebarBorder()} shadow-2xl`}
//             onClick={(e) => e.stopPropagation()}
//           >
//             <SidebarContent isMobile />
//           </div>
//         </div>
//       )}

//       {/* Desktop Sidebar */}
//       <aside className={`
//         hidden lg:flex lg:fixed lg:inset-y-0 lg:left-0 lg:flex-col
//         ${getSidebarBg()} ${getSidebarText()}
//         transition-all duration-300 z-40 shadow-2xl border-r ${getSidebarBorder()}
//         ${isCollapsed ? 'w-20' : 'w-64'}
//         hover:z-50
//       `}>
//         <SidebarContent />
//       </aside>

//       {/* Expand Button - Only shown on hover in collapsed state */}
//       {isCollapsed && showExpandButton && (
//         <button
//           onClick={onToggleCollapse}
//           className={`
//             hidden lg:block fixed top-1/2 left-20 transform -translate-y-1/2 z-50
//             w-8 h-16 bg-gradient-to-r from-orange-500 to-orange-600 
//             rounded-r-xl shadow-lg flex items-center justify-center text-white
//             hover:shadow-xl transition-all duration-300
//             animate-in slide-in-from-left-1
//           `}
//           title="Expand Menu"
//           onMouseEnter={() => setShowExpandButton(true)}
//           onMouseLeave={() => setShowExpandButton(false)}
//         >
//           <ChevronRight className="h-4 w-4" />
//         </button>
//       )}

//       {/* Small toggle button at bottom - Always visible alternative */}
//       {isCollapsed && (
//         <button
//           onClick={onToggleCollapse}
//           className={`
//             hidden lg:block fixed bottom-4 left-4 z-30
//             w-10 h-10 bg-gradient-to-r from-orange-500 to-orange-600 
//             rounded-xl shadow-lg flex items-center justify-center text-white
//             hover:shadow-xl transition-all duration-300
//           `}
//           title="Expand Menu"
//         >
//           <ChevronRight className="h-4 w-4" />
//         </button>
//       )}
//     </>
//   );
// }


// 'use client';

// import React, { useState, useEffect, useMemo, useRef } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { 
//   Menu, X, ChevronDown, ChevronRight, Home, Settings, 
//   Building, Bell, LogOut 
// } from 'lucide-react';
// import { useTheme } from './ThemeContext';
// import { MODULES, SUB_PERMISSIONS } from './data/navdata';
// import { useAuth } from './AuthContext';
// import { 
//   FaHome, 
//   FaUsersCog, 
//   FaUserPlus, 
//   FaUserTie, 
//   FaClock, 
//   FaCalendarAlt, 
//   FaFileInvoiceDollar, 
//   FaSignOutAlt 
// } from 'react-icons/fa';

// export default function Sidebar({ isCollapsed, onToggleCollapse }) {
//   const { theme } = useTheme();
//   const { logout, user: authUser } = useAuth();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [openMenus, setOpenMenus] = useState({});
//   const [isMobileOpen, setIsMobileOpen] = useState(false);
//   const [hoveredMenu, setHoveredMenu] = useState(null);
//   const [hoveredMenuPosition, setHoveredMenuPosition] = useState({ top: 0, left: 0 });
//   const [hoverTimeout, setHoverTimeout] = useState(null);
//   const [showExpandButton, setShowExpandButton] = useState(false);
  
//   const menuItemRefs = useRef({});
//   const floatingSubmenuRef = useRef(null);

//   const currentUser = authUser || {};
//   const permissions = currentUser.permissions || {};
//   const isSuperAdmin = currentUser.role === 'superadmin';

//   // Theme detection
//   const isLightTheme = theme?.type === 'light' || theme?.sidebarBg?.includes('white') || theme?.sidebarBg?.includes('gray-50');

//   // Theme helper functions
//   const getSidebarBg = () => theme?.sidebarBg || 'bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900';
//   const getSidebarText = () => theme?.sidebarText || (isLightTheme ? 'text-gray-800' : 'text-gray-200');
//   const getSidebarHover = () => theme?.sidebarHover || (isLightTheme ? 'hover:bg-gray-100' : 'hover:bg-white/10');
//   const getSidebarActive = () => {
//     if (theme?.sidebarActive) return theme.sidebarActive;
//     const fromColor = 'orange-500';
//     const toColor = 'pink-600';
//     if (isLightTheme) {
//       return `bg-gradient-to-r from-${fromColor}/10 to-${toColor}/10`;
//     }
//     return `bg-gradient-to-r from-${fromColor}/20 to-${toColor}/20`;
//   };
  
//   const getSidebarBorder = () => theme?.sidebarBorder || (isLightTheme ? 'border-gray-200' : 'border-gray-700');
//   const getTextAccent = () => theme?.accent ? `text-${theme.accent}` : 'text-orange-400';
  
//   // Get text colors
//   const getPrimaryTextColor = () => isLightTheme ? 'text-gray-800' : 'text-gray-200';
//   const getSecondaryTextColor = () => isLightTheme ? 'text-gray-600' : 'text-gray-400';

//   // Get gradient colors
//   const getGradientFrom = () => {
//     if (theme?.gradient) {
//       const fromClass = theme.gradient.split(' ')[0];
//       return fromClass.replace('from-', '');
//     }
//     return 'orange-500';
//   };

//   const getGradientTo = () => {
//     if (theme?.gradient) {
//       const gradientParts = theme.gradient.split(' ');
//       const toClass = gradientParts.find(part => part.startsWith('to-'));
//       return toClass ? toClass.replace('to-', '') : 'pink-600';
//     }
//     return 'pink-600';
//   };

//   const getFromColorClass = () => `from-${getGradientFrom()}`;
//   const getToColorClass = () => `to-${getGradientTo()}`;

//   // Handle sidebar hover to show expand button
//   useEffect(() => {
//     if (isCollapsed) {
//       const sidebar = document.querySelector('aside');
//       if (sidebar) {
//         const handleSidebarHover = () => setShowExpandButton(true);
//         const handleSidebarLeave = () => setShowExpandButton(false);
        
//         sidebar.addEventListener('mouseenter', handleSidebarHover);
//         sidebar.addEventListener('mouseleave', handleSidebarLeave);
        
//         return () => {
//           sidebar.removeEventListener('mouseenter', handleSidebarHover);
//           sidebar.removeEventListener('mouseleave', handleSidebarLeave);
//         };
//       }
//     }
//   }, [isCollapsed]);

//   // Handle hover for collapsed state
//   const handleMenuHover = (menuLabel, event) => {
//     if (isCollapsed) {
//       if (hoverTimeout) clearTimeout(hoverTimeout);
//       setHoveredMenu(menuLabel);
//       setShowExpandButton(true);
      
//       // Get the position of the hovered menu item
//       const menuItem = menuItemRefs.current[menuLabel];
//       if (menuItem) {
//         const rect = menuItem.getBoundingClientRect();
//         setHoveredMenuPosition({
//           top: rect.top,
//           left: rect.right + 8, // 8px gap from the menu item
//         });
//       }
//     }
//   };

//   const handleMenuLeave = () => {
//     if (isCollapsed) {
//       const timeout = setTimeout(() => {
//         setHoveredMenu(null);
//       }, 200);
//       setHoverTimeout(timeout);
//     }
//   };

//   // Handle click outside floating submenu
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (isCollapsed && hoveredMenu && floatingSubmenuRef.current && 
//           !floatingSubmenuRef.current.contains(event.target) &&
//           !Object.values(menuItemRefs.current).some(ref => ref && ref.contains(event.target))) {
//         setHoveredMenu(null);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, [isCollapsed, hoveredMenu]);

//   // Check permissions
//   const canViewSubItem = (moduleName, subItemName) => {
//     if (isSuperAdmin) {
//       return true;
//     }
    
//     if (!permissions[moduleName]) return false;
//     const subItemPermissions = permissions[moduleName][subItemName];
//     if (!subItemPermissions) return false;
//     return subItemPermissions.view === true;
//   };

//   // Get visible sub-items
//   const getVisibleSubItems = (moduleName) => {
//     const subItems = SUB_PERMISSIONS[moduleName] || [];
//     return subItems.filter(sub => canViewSubItem(moduleName, sub.name));
//   };

//   // Build dynamic menu
//   const dynamicMenu = useMemo(() => MODULES.map(mod => {
//     const getIconComponent = () => {
//       switch(mod.name) {
//         case 'Base': return FaHome;
//         case 'Recruitment': return FaUsersCog;
//         case 'Onboarding': return FaUserPlus;
//         case 'Employee': return FaUserTie;
//         case 'Attendance': return FaClock;
//         case 'Leave': return FaCalendarAlt;
//         case 'Payroll': return FaFileInvoiceDollar;
//         case 'Offboarding': return FaSignOutAlt;
//         default: return FaHome;
//       }
//     };

//     const visibleSubItems = getVisibleSubItems(mod.name);
//     if (visibleSubItems.length === 0) return null;

//     const mappedSubItems = visibleSubItems.map(sub => ({
//       label: sub.name,
//       key: sub.name,
//       link: sub.route,
//       icon: ChevronRight,
//     }));

//     return {
//       label: mod.name,
//       icon: getIconComponent(),
//       color: getTextAccent(),
//       link: mappedSubItems[0]?.link || '#',
//       submenu: mappedSubItems,
//     };
//   }).filter(Boolean), [permissions, isSuperAdmin]);

//   const menuData = useMemo(() => [
//     { label: 'Dashboard', icon: Home, link: '/dashboard', color: getTextAccent() },
//     ...dynamicMenu,
//     { label: 'Settings', icon: Settings, link: '/settings', color: getSecondaryTextColor() },
//   ], [dynamicMenu]);

//   // Floating Submenu Component for Collapsed State
//   const FloatingSubmenu = ({ menuItem }) => {
//     if (!menuItem || !menuItem.submenu || menuItem.submenu.length === 0) return null;

//     // Calculate if submenu should be positioned above or below
//     const shouldPositionAbove = () => {
//       if (typeof window === 'undefined') return false;
//       const windowHeight = window.innerHeight;
//       const submenuHeight = (menuItem.submenu.length * 44) + 60; // Approximate height
//       return hoveredMenuPosition.top + submenuHeight > windowHeight - 20;
//     };

//     const positionStyle = {
//       left: `${hoveredMenuPosition.left}px`,
//       top: shouldPositionAbove() 
//         ? `${hoveredMenuPosition.top - ((menuItem.submenu.length * 44) + 60)}px`
//         : `${hoveredMenuPosition.top}px`,
//     };

//     return (
//       <div 
//         ref={floatingSubmenuRef}
//         className={`
//           fixed w-56 rounded-xl shadow-2xl 
//           border ${getSidebarBorder()} 
//           ${isLightTheme ? 'bg-white' : 'bg-gray-900'} 
//           py-2 z-50 animate-in slide-in-from-left-1 duration-200
//           max-h-[80vh] overflow-y-auto
//         `}
//         style={positionStyle}
//         onMouseEnter={() => {
//           if (hoverTimeout) clearTimeout(hoverTimeout);
//           setHoveredMenu(menuItem.label);
//         }}
//         onMouseLeave={handleMenuLeave}
//       >
//         {/* Menu header */}
//         <div className={`px-4 py-2 border-b ${getSidebarBorder()}`}>
//           <div className="flex items-center gap-2">
//             <div className={`p-1.5 rounded-lg ${menuItem.color} ${isLightTheme ? 'bg-gray-100' : 'bg-gray-800/50'}`}>
//               {React.createElement(menuItem.icon || Home, { className: "h-4 w-4" })}
//             </div>
//             <span className={`font-medium text-sm ${getPrimaryTextColor()}`}>
//               {menuItem.label}
//             </span>
//           </div>
//         </div>

//         {/* Submenu items */}
//         <div className="py-2">
//           {menuItem.submenu.map(sub => {
//             const SubIcon = sub.icon || ChevronRight;
//             const subActive = location.pathname === sub.link;
            
//             return (
//               <button
//                 key={sub.link}
//                 onClick={() => {
//                   navigate(sub.link);
//                   setHoveredMenu(null);
//                 }}
//                 className={`
//                   w-full text-left py-2.5 px-4 text-sm rounded-lg mx-2 transition-all duration-150 
//                   flex items-center gap-3
//                   ${subActive 
//                     ? `${isLightTheme ? 'bg-gray-100 text-gray-900' : `bg-gradient-to-r ${getFromColorClass()}/10 ${getToColorClass()}/10 text-white`}` 
//                     : `${getSecondaryTextColor()} ${isLightTheme ? 'hover:text-gray-900 hover:bg-gray-50' : 'hover:text-white hover:bg-gray-800/50'}`
//                   }
//                 `}
//               >
//                 <SubIcon className="h-3.5 w-3.5" />
//                 <span className="truncate">{sub.label}</span>
//               </button>
//             );
//           })}
//         </div>
//       </div>
//     );
//   };

//   const SidebarContent = ({ isMobile = false }) => (
//     <div className={`h-full flex flex-col ${isMobile ? 'w-72' : ''}`}>
//       {/* Header */}
//       <div className={`p-6 border-b ${getSidebarBorder()}`}>
//         <div className="flex items-center justify-between">
//           <div className="flex items-center gap-3">
//             <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${getFromColorClass()} ${getToColorClass()} shadow-lg flex items-center justify-center`}>
//               {currentUser.logo ? (
//                 <img src={currentUser.logo} alt="logo" className="w-8 h-8 rounded-lg object-contain" />
//               ) : (
//                 <Building className="h-5 w-5 text-white" />
//               )}
//             </div>
//             {(!isCollapsed || isMobile) && (
//               <div>
//                 <h1 className={`text-lg font-bold ${getPrimaryTextColor()}`}>HRMS Pro</h1>
//                 <p className={`text-xs ${getSecondaryTextColor()}`}>{currentUser.companyName || 'HR System'}</p>
//               </div>
//             )}
//           </div>
//           {(!isCollapsed || isMobile) && (
//             <button
//               onClick={() => isMobile ? setIsMobileOpen(false) : onToggleCollapse()}
//               className={`p-2 rounded-lg transition-colors ${isLightTheme ? 'hover:bg-gray-100' : 'hover:bg-white/10'}`}
//             >
//               <X className={`h-5 w-5 ${getSecondaryTextColor()}`} />
//             </button>
//           )}
//         </div>
//       </div>

//       {/* Menu Items */}
//       <nav className="flex-1 overflow-y-auto py-4 px-3">
//         <ul className="space-y-1">
//           {menuData.map(item => {
//             const Icon = item.icon;
//             const hasSubmenu = item.submenu?.length > 0;
//             const isOpen = openMenus[item.label];
//             const active = location.pathname.startsWith(item.link);
//             const isHovered = hoveredMenu === item.label;
//             const showFloatingSubmenu = isCollapsed && isHovered && hasSubmenu;
//             const IconComponent = Icon;

//             return (
//               <li 
//                 key={item.label} 
//                 className="relative"
//                 ref={(el) => menuItemRefs.current[item.label] = el}
//               >
//                 <div
//                   onClick={(e) => {
//                     if (isCollapsed && hasSubmenu) {
//                       // In collapsed mode, clicking opens the floating menu
//                       handleMenuHover(item.label, e);
//                     } else if (!isCollapsed && hasSubmenu) {
//                       // In expanded mode, clicking toggles the dropdown
//                       setOpenMenus(prev => ({ ...prev, [item.label]: !prev[item.label] }));
//                     } else {
//                       // No submenu, navigate directly
//                       navigate(item.link);
//                       if (isMobile) setIsMobileOpen(false);
//                     }
//                   }}
//                   onMouseEnter={(e) => handleMenuHover(item.label, e)}
//                   onMouseLeave={handleMenuLeave}
//                   className={`
//                     group flex items-center justify-between px-3 py-2.5 rounded-xl 
//                     cursor-pointer transition-all duration-200
//                     ${active ? getSidebarActive() : getSidebarHover()}
//                     ${active ? 'shadow-lg' : ''}
//                     ${isCollapsed ? 'justify-center px-2' : ''}
//                   `}
//                 >
//                   {/* Active indicator */}
//                   {active && !isCollapsed && (
//                     <div className={`absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-6 bg-gradient-to-b ${getFromColorClass()} ${getToColorClass()} rounded-r-full`}></div>
//                   )}

//                   <div className="flex items-center gap-3 flex-1">
//                     <div className={`p-1.5 rounded-lg ${item.color} ${isLightTheme ? 'bg-gray-100' : 'bg-gray-800/50'}`}>
//                       <IconComponent className="h-4 w-4" />
//                     </div>
//                     {(!isCollapsed || isMobile) && (
//                       <div className="flex-1 min-w-0">
//                         <span className={`font-medium text-sm truncate ${active ? (isLightTheme ? 'text-gray-900' : 'text-white') : getPrimaryTextColor()}`}>
//                           {item.label}
//                         </span>
//                       </div>
//                     )}
//                   </div>
                  
//                   {hasSubmenu && (!isCollapsed || isMobile) && (
//                     <div className="ml-2">
//                       {isOpen ? (
//                         <ChevronDown className={`h-4 w-4 ${getSecondaryTextColor()}`} />
//                       ) : (
//                         <ChevronRight className={`h-4 w-4 ${getSecondaryTextColor()}`} />
//                       )}
//                     </div>
//                   )}
//                 </div>

//                 {/* Floating submenu for collapsed state */}
//                 {showFloatingSubmenu && (
//                   <FloatingSubmenu menuItem={item} />
//                 )}

//                 {/* Regular submenu for expanded state */}
//                 {hasSubmenu && isOpen && !isCollapsed && !isMobile && (
//                   <div className={`ml-8 mt-1 space-y-0.5 pl-3 border-l ${getSidebarBorder()}`}>
//                     {item.submenu.map(sub => (
//                       <button
//                         key={sub.link}
//                         onClick={() => {
//                           navigate(sub.link);
//                           if (isMobile) setIsMobileOpen(false);
//                         }}
//                         className={`
//                           w-full text-left py-2 px-3 text-sm rounded-lg transition-all duration-150 
//                           flex items-center gap-2
//                           ${location.pathname === sub.link 
//                             ? `${isLightTheme ? 'bg-gray-100 text-gray-900' : `bg-gradient-to-r ${getFromColorClass()}/10 ${getToColorClass()}/10 text-white`}` 
//                             : `${getSecondaryTextColor()} ${isLightTheme ? 'hover:text-gray-900 hover:bg-gray-50' : 'hover:text-white hover:bg-gray-800/50'}`
//                           }
//                         `}
//                       >
//                         <ChevronRight className="h-3 w-3" />
//                         <span className="truncate">{sub.label}</span>
//                       </button>
//                     ))}
//                   </div>
//                 )}
//               </li>
//             );
//           })}
//         </ul>
//       </nav>

//       {/* User Profile & Footer */}
//       <div className={`p-4 border-t ${getSidebarBorder()}`}>
//         <div className="flex items-center gap-3 mb-4">
//           <div className="relative">
//             <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${getFromColorClass()} ${getToColorClass()} flex items-center justify-center shadow-lg`}>
//               <span className="text-white font-bold">
//                 {currentUser.username?.[0]?.toUpperCase() || 'U'}
//               </span>
//             </div>
//           </div>
//           {(!isCollapsed || isMobile) && (
//             <div className="flex-1 min-w-0">
//               <p className={`font-semibold text-sm ${getPrimaryTextColor()} truncate`}>
//                 {currentUser.username || 'User'}
//               </p>
//               <p className={`text-xs ${getSecondaryTextColor()} truncate`}>
//                 {isSuperAdmin ? 'Super Admin' : currentUser.role || 'Employee'}
//               </p>
//             </div>
//           )}
//         </div>

//         {(!isCollapsed || isMobile) && (
//           <div className="flex items-center gap-2">
//             <button 
//               onClick={() => navigate('/settings')}
//               className={`flex-1 px-3 py-1.5 ${isLightTheme ? 'bg-gray-100 hover:bg-gray-200' : 'bg-gray-800/50 hover:bg-gray-800'} rounded-lg text-xs ${getSecondaryTextColor()} flex items-center justify-center gap-1`}
//             >
//               <Settings className="h-3 w-3" />
//               Settings
//             </button>
//             <button 
//               onClick={logout}
//               className={`flex-1 px-3 py-1.5 bg-gradient-to-r ${getFromColorClass()}/10 ${getToColorClass()}/10 hover:${getFromColorClass()}/20 hover:${getToColorClass()}/20 rounded-lg text-xs ${getTextAccent()} flex items-center justify-center gap-1`}
//             >
//               <LogOut className="h-3 w-3" />
//               Logout
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );

//   return (
//     <>
//       {/* Mobile Menu Button */}
//       <button
//         onClick={() => setIsMobileOpen(true)}
//         className={`lg:hidden fixed top-4 left-4 z-50 p-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl shadow-lg`}
//       >
//         <Menu className="h-5 w-5" />
//       </button>

//       {/* Mobile Overlay */}
//       {isMobileOpen && (
//         <div 
//           className="lg:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
//           onClick={() => setIsMobileOpen(false)}
//         >
//           <div 
//             className={`fixed inset-y-0 left-0 w-72 ${getSidebarBg()} border-r ${getSidebarBorder()} shadow-2xl`}
//             onClick={(e) => e.stopPropagation()}
//           >
//             <SidebarContent isMobile />
//           </div>
//         </div>
//       )}

//       {/* Desktop Sidebar */}
//       <aside className={`
//         hidden lg:flex lg:fixed lg:inset-y-0 lg:left-0 lg:flex-col
//         ${getSidebarBg()} ${getSidebarText()}
//         transition-all duration-300 z-40 shadow-2xl border-r ${getSidebarBorder()}
//         ${isCollapsed ? 'w-20' : 'w-64'}
//         hover:z-50
//       `}>
//         <SidebarContent />
//       </aside>

//       {/* Expand Button - Only shown on hover in collapsed state */}
//       {isCollapsed && showExpandButton && (
//         <button
//           onClick={onToggleCollapse}
//           className={`
//             hidden lg:block fixed top-1/2 left-20 transform -translate-y-1/2 z-50
//             w-8 h-16 bg-gradient-to-r from-orange-500 to-orange-600 
//             rounded-r-xl shadow-lg flex items-center justify-center text-white
//             hover:shadow-xl transition-all duration-300
//             animate-in slide-in-from-left-1
//           `}
//           title="Expand Menu"
//           onMouseEnter={() => setShowExpandButton(true)}
//           onMouseLeave={() => setShowExpandButton(false)}
//         >
//           <ChevronRight className="h-4 w-4" />
//         </button>
//       )}

//       {/* Small toggle button at bottom - Always visible alternative */}
//       {isCollapsed && (
//         <button
//           onClick={onToggleCollapse}
//           className={`
//             hidden lg:block fixed bottom-4 left-4 z-30
//             w-10 h-10 bg-gradient-to-r from-orange-500 to-orange-600 
//             rounded-xl shadow-lg flex items-center justify-center text-white
//             hover:shadow-xl transition-all duration-300
//           `}
//           title="Expand Menu"
//         >
//           <ChevronRight className="h-4 w-4" />
//         </button>
//       )}
//     </>
//   );
// }


// 'use client';

// import React, { useState, useEffect, useMemo, useRef } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { 
//   Menu, X, ChevronDown, ChevronRight, Home, Settings, 
//   Building, Bell, LogOut 
// } from 'lucide-react';
// import { useTheme } from './ThemeContext';
// import { MODULES, SUB_PERMISSIONS } from './data/navdata';
// import { useAuth } from './AuthContext';
// import { 
//   FaHome, 
//   FaUsersCog, 
//   FaUserPlus, 
//   FaUserTie, 
//   FaClock, 
//   FaCalendarAlt, 
//   FaFileInvoiceDollar, 
//   FaSignOutAlt 
// } from 'react-icons/fa';

// export default function Sidebar({ isCollapsed, onToggleCollapse }) {
//   const { theme } = useTheme();
//   const { logout, user: authUser } = useAuth();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [openMenus, setOpenMenus] = useState({});
//   const [isMobileOpen, setIsMobileOpen] = useState(false);
//   const [hoveredMenu, setHoveredMenu] = useState(null);
//   const [hoveredMenuPosition, setHoveredMenuPosition] = useState({ top: 0, left: 0 });
//   const [hoverTimeout, setHoverTimeout] = useState(null);
//   const [showExpandButton, setShowExpandButton] = useState(false);
  
//   const menuItemRefs = useRef({});
//   const floatingSubmenuRef = useRef(null);

//   const currentUser = authUser || {};
//   const permissions = currentUser.permissions || {};
//   const isSuperAdmin = currentUser.role === 'superadmin';

//   // Theme detection
//   const isLightTheme = theme?.type === 'light' || theme?.sidebarBg?.includes('white') || theme?.sidebarBg?.includes('gray-50');

//   // Theme helper functions
//   const getSidebarBg = () => theme?.sidebarBg || 'bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900';
//   const getSidebarText = () => theme?.sidebarText || (isLightTheme ? 'text-gray-800' : 'text-gray-200');
//   const getSidebarHover = () => theme?.sidebarHover || (isLightTheme ? 'hover:bg-gray-100' : 'hover:bg-white/10');
//   const getSidebarActive = () => {
//     if (theme?.sidebarActive) return theme.sidebarActive;
//     const fromColor = 'orange-500';
//     const toColor = 'pink-600';
//     if (isLightTheme) {
//       return `bg-gradient-to-r from-${fromColor}/10 to-${toColor}/10`;
//     }
//     return `bg-gradient-to-r from-${fromColor}/20 to-${toColor}/20`;
//   };
  
//   const getSidebarBorder = () => theme?.sidebarBorder || (isLightTheme ? 'border-gray-200' : 'border-gray-700');
//   const getButtonGradient = () => theme?.button ? `bg-gradient-to-r ${theme.button}` : 'bg-gradient-to-r from-orange-500 to-orange-600';
//   const getTextAccent = () => theme?.accent ? `text-${theme.accent}` : 'text-orange-400';
  
//   const getPrimaryTextColor = () => isLightTheme ? 'text-gray-800' : 'text-gray-200';
//   const getSecondaryTextColor = () => isLightTheme ? 'text-gray-600' : 'text-gray-400';

//   // Get gradient colors
//   const getGradientFrom = () => {
//     if (theme?.gradient) {
//       const fromClass = theme.gradient.split(' ')[0];
//       return fromClass.replace('from-', '');
//     }
//     return 'orange-500';
//   };

//   const getGradientTo = () => {
//     if (theme?.gradient) {
//       const gradientParts = theme.gradient.split(' ');
//       const toClass = gradientParts.find(part => part.startsWith('to-'));
//       return toClass ? toClass.replace('to-', '') : 'pink-600';
//     }
//     return 'pink-600';
//   };

//   const getFromColorClass = () => `from-${getGradientFrom()}`;
//   const getToColorClass = () => `to-${getGradientTo()}`;

//   // Handle sidebar hover to show expand button
//   useEffect(() => {
//     if (isCollapsed) {
//       const sidebar = document.querySelector('aside');
//       if (sidebar) {
//         const handleSidebarHover = () => setShowExpandButton(true);
//         const handleSidebarLeave = () => setShowExpandButton(false);
        
//         sidebar.addEventListener('mouseenter', handleSidebarHover);
//         sidebar.addEventListener('mouseleave', handleSidebarLeave);
        
//         return () => {
//           sidebar.removeEventListener('mouseenter', handleSidebarHover);
//           sidebar.removeEventListener('mouseleave', handleSidebarLeave);
//         };
//       }
//     }
//   }, [isCollapsed]);

//   // Handle hover for collapsed state
//   const handleMenuHover = (menuLabel, event) => {
//     if (isCollapsed) {
//       if (hoverTimeout) clearTimeout(hoverTimeout);
//       setHoveredMenu(menuLabel);
//       setShowExpandButton(true);
      
//       // Get the position of the hovered menu item
//       const menuItem = menuItemRefs.current[menuLabel];
//       if (menuItem) {
//         const rect = menuItem.getBoundingClientRect();
//         setHoveredMenuPosition({
//           top: rect.top,
//           left: rect.right + 8, // 8px gap from the menu item
//         });
//       }
//     }
//   };

//   const handleMenuLeave = () => {
//     if (isCollapsed) {
//       const timeout = setTimeout(() => {
//         setHoveredMenu(null);
//       }, 200);
//       setHoverTimeout(timeout);
//     }
//   };

//   // Handle click outside floating submenu
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (isCollapsed && hoveredMenu && floatingSubmenuRef.current && 
//           !floatingSubmenuRef.current.contains(event.target) &&
//           !Object.values(menuItemRefs.current).some(ref => ref && ref.contains(event.target))) {
//         setHoveredMenu(null);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, [isCollapsed, hoveredMenu]);

//   // Check if user has view permission for a sub-item
//   const canViewSubItem = (moduleName, subItemName) => {
//     // For superadmin, check the actual permission value
//     if (isSuperAdmin) {
//       if (!permissions[moduleName]) return false;
//       const subItemPermissions = permissions[moduleName][subItemName];
//       if (!subItemPermissions) return false;
//       return subItemPermissions.view === true;
//     }
    
//     // For regular users, check permissions
//     if (!permissions[moduleName]) return false;
    
//     // Check if subItem exists in module permissions
//     const subItemPermissions = permissions[moduleName][subItemName];
//     if (!subItemPermissions) return false;
    
//     // Return true if view permission is true
//     return subItemPermissions.view === true;
//   };

//   // Check if user has any view permission in a module
//   const hasAnyPermissionInModule = (moduleName) => {
//     // For superadmin, check if there are any sub-items defined for this module
//     if (isSuperAdmin) {
//       const subItems = SUB_PERMISSIONS[moduleName] || [];
//       return subItems.length > 0;
//     }
    
//     // For regular users, check permissions
//     if (!permissions[moduleName]) return false;
    
//     // Check if any sub-item has view permission
//     const modulePermissions = permissions[moduleName];
//     return Object.values(modulePermissions).some(subItem => 
//       subItem && typeof subItem === 'object' && subItem.view === true
//     );
//   };

//   // Get visible sub-items for a module
//   const getVisibleSubItems = (moduleName) => {
//     const subItems = SUB_PERMISSIONS[moduleName] || [];
    
//     return subItems.filter(sub => {
//       // For regular users, check permission
//       return canViewSubItem(moduleName, sub.name);
//     });
//   };

//   // Filter modules based on permissions (memoized for performance - updates in real-time)
//   const dynamicMenu = useMemo(() => MODULES.map(mod => {
//     // Get the icon component for this module
//     const getIconComponent = () => {
//       switch(mod.name) {
//         case 'Base': return FaHome;
//         case 'Recruitment': return FaUsersCog;
//         case 'Onboarding': return FaUserPlus;
//         case 'Employee': return FaUserTie;
//         case 'Attendance': return FaClock;
//         case 'Leave': return FaCalendarAlt;
//         case 'Payroll': return FaFileInvoiceDollar;
//         case 'Offboarding': return FaSignOutAlt;
//         default: return Home;
//       }
//     };

//     // Get visible sub-items for this module
//     const visibleSubItems = getVisibleSubItems(mod.name);
    
//     // If no visible sub-items, don't show the module
//     if (visibleSubItems.length === 0) {
//       return null;
//     }

//     // Map the visible sub-items
//     const mappedSubItems = visibleSubItems.map(sub => ({
//       label: sub.name,
//       key: sub.name,
//       link: sub.route,
//       icon: ChevronRight,
//     }));

//     return {
//       label: mod.name,
//       icon: getIconComponent(),
//       color: getTextAccent(),
//       link: mappedSubItems[0]?.link || '#', // First accessible sub-item as default link
//       submenu: mappedSubItems,
//     };
//   }).filter(Boolean), [permissions, isSuperAdmin, currentUser]);

//   const menuData = useMemo(() => [
//     { label: 'Dashboard', icon: Home, link: '/dashboard', color: getTextAccent() },
//     ...dynamicMenu,
//     { label: 'Settings', icon: Settings, link: '/settings', color: getSecondaryTextColor() },
//   ], [dynamicMenu]);

//   const isActive = (path) => location.pathname.startsWith(path);

//   // Floating Submenu Component for Collapsed State
//   const FloatingSubmenu = ({ menuItem }) => {
//     if (!menuItem || !menuItem.submenu || menuItem.submenu.length === 0) return null;

//     // Calculate if submenu should be positioned above or below
//     const shouldPositionAbove = () => {
//       if (typeof window === 'undefined') return false;
//       const windowHeight = window.innerHeight;
//       const submenuHeight = (menuItem.submenu.length * 44) + 60; // Approximate height
//       return hoveredMenuPosition.top + submenuHeight > windowHeight - 20;
//     };

//     const positionStyle = {
//       left: `${hoveredMenuPosition.left}px`,
//       top: shouldPositionAbove() 
//         ? `${hoveredMenuPosition.top - ((menuItem.submenu.length * 44) + 60)}px`
//         : `${hoveredMenuPosition.top}px`,
//     };

//     return (
//       <div 
//         ref={floatingSubmenuRef}
//         className={`
//           fixed w-56 rounded-xl shadow-2xl 
//           border ${getSidebarBorder()} 
//           ${isLightTheme ? 'bg-white' : 'bg-gray-900'} 
//           py-2 z-50 animate-in slide-in-from-left-1 duration-200
//           max-h-[80vh] overflow-y-auto
//         `}
//         style={positionStyle}
//         onMouseEnter={() => {
//           if (hoverTimeout) clearTimeout(hoverTimeout);
//           setHoveredMenu(menuItem.label);
//         }}
//         onMouseLeave={handleMenuLeave}
//       >
//         {/* Menu header */}
//         <div className={`px-4 py-2 border-b ${getSidebarBorder()}`}>
//           <div className="flex items-center gap-2">
//             <div className={`p-1.5 rounded-lg ${menuItem.color} ${isLightTheme ? 'bg-gray-100' : 'bg-gray-800/50'}`}>
//               {React.createElement(menuItem.icon || Home, { className: "h-4 w-4" })}
//             </div>
//             <span className={`font-medium text-sm ${getPrimaryTextColor()}`}>
//               {menuItem.label}
//             </span>
//           </div>
//         </div>

//         {/* Submenu items */}
//         <div className="py-2">
//           {menuItem.submenu.map(sub => {
//             const SubIcon = sub.icon || ChevronRight;
//             const subActive = location.pathname === sub.link;
            
//             return (
//               <button
//                 key={sub.link}
//                 onClick={() => {
//                   navigate(sub.link);
//                   setHoveredMenu(null);
//                 }}
//                 className={`
//                   w-full text-left py-2.5 px-4 text-sm rounded-lg mx-2 transition-all duration-150 
//                   flex items-center gap-3
//                   ${subActive 
//                     ? `${isLightTheme ? 'bg-gray-100 text-gray-900' : `bg-gradient-to-r ${getFromColorClass()}/10 ${getToColorClass()}/10 text-white`}` 
//                     : `${getSecondaryTextColor()} ${isLightTheme ? 'hover:text-gray-900 hover:bg-gray-50' : 'hover:text-white hover:bg-gray-800/50'}`
//                   }
//                 `}
//               >
//                 <SubIcon className="h-3.5 w-3.5" />
//                 <span className="truncate">{sub.label}</span>
//               </button>
//             );
//           })}
//         </div>
//       </div>
//     );
//   };

//   const SidebarContent = ({ isMobile = false }) => (
//     <div className={`h-full flex flex-col ${isMobile ? 'w-72' : ''}`}>
//       {/* Header */}
//       <div className={`p-6 border-b ${getSidebarBorder()}`}>
//         <div className="flex items-center justify-between">
//           <div className="flex items-center gap-3">
//             <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${getFromColorClass()} ${getToColorClass()} shadow-lg flex items-center justify-center`}>
//               {currentUser.logo ? (
//                 <img src={currentUser.logo} alt="logo" className="w-8 h-8 rounded-lg object-contain" />
//               ) : (
//                 <Building className="h-5 w-5 text-white" />
//               )}
//             </div>
//             {(!isCollapsed || isMobile) && (
//               <div>
//                 <h1 className={`text-lg font-bold ${getPrimaryTextColor()}`}>HRMS Pro</h1>
//                 <p className={`text-xs ${getSecondaryTextColor()}`}>{currentUser.companyName || 'HR System'}</p>
//               </div>
//             )}
//           </div>
//           {(!isCollapsed || isMobile) && (
//             <button
//               onClick={() => isMobile ? setIsMobileOpen(false) : onToggleCollapse()}
//               className={`p-2 ${isLightTheme ? 'hover:bg-gray-100' : 'hover:bg-white/10'} rounded-lg transition-colors`}
//             >
//               <X className={`h-5 w-5 ${getSecondaryTextColor()}`} />
//             </button>
//           )}
//         </div>
//       </div>

//       {/* Menu Items */}
//       <nav className="flex-1 overflow-y-auto py-4 px-3">
//         <ul className="space-y-1">
//           {menuData.map(item => {
//             const Icon = item.icon;
//             const hasSubmenu = item.submenu?.length > 0;
//             const isOpen = openMenus[item.label];
//             const active = isActive(item.link);
//             const isHovered = hoveredMenu === item.label;
//             const showFloatingSubmenu = isCollapsed && isHovered && hasSubmenu;
//             const IconComponent = Icon;

//             return (
//               <li 
//                 key={item.label} 
//                 className="relative"
//                 ref={(el) => menuItemRefs.current[item.label] = el}
//               >
//                 <div
//                   onClick={(e) => {
//                     if (isCollapsed && hasSubmenu) {
//                       // In collapsed mode, clicking opens the floating menu
//                       handleMenuHover(item.label, e);
//                     } else if (!isCollapsed && hasSubmenu) {
//                       // In expanded mode, clicking toggles the dropdown
//                       setOpenMenus(prev => ({ ...prev, [item.label]: !prev[item.label] }));
//                     } else {
//                       // No submenu, navigate directly
//                       navigate(item.link);
//                       if (isMobile) setIsMobileOpen(false);
//                     }
//                   }}
//                   onMouseEnter={(e) => handleMenuHover(item.label, e)}
//                   onMouseLeave={handleMenuLeave}
//                   className={`
//                     group flex items-center justify-between px-3 py-2.5 rounded-xl 
//                     cursor-pointer transition-all duration-200
//                     ${active ? getSidebarActive() : getSidebarHover()}
//                     ${active ? 'shadow-lg' : ''}
//                     ${isCollapsed ? 'justify-center px-2' : ''}
//                   `}
//                 >
//                   {/* Active indicator */}
//                   {active && !isCollapsed && (
//                     <div className={`absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-6 bg-gradient-to-b ${getFromColorClass()} ${getToColorClass()} rounded-r-full`}></div>
//                   )}

//                   <div className="flex items-center gap-3 flex-1">
//                     <div className={`p-1.5 rounded-lg ${item.color} ${isLightTheme ? 'bg-gray-100' : 'bg-gray-800/50'}`}>
//                       <IconComponent className="h-4 w-4" />
//                     </div>
//                     {(!isCollapsed || isMobile) && (
//                       <div className="flex-1 min-w-0">
//                         <span className={`font-medium text-sm truncate ${active ? (isLightTheme ? 'text-gray-900' : 'text-white') : getPrimaryTextColor()}`}>
//                           {item.label}
//                         </span>
//                         {hasSubmenu && item.submenu && (!isCollapsed || isMobile) && (
//                           <p className={`text-xs ${getSecondaryTextColor()} mt-0.5`}>
//                             {item.submenu.length} items
//                           </p>
//                         )}
//                       </div>
//                     )}
//                   </div>
                  
//                   {hasSubmenu && (!isCollapsed || isMobile) && (
//                     <div className="ml-2">
//                       {isOpen ? (
//                         <ChevronDown className={`h-4 w-4 ${getSecondaryTextColor()}`} />
//                       ) : (
//                         <ChevronRight className={`h-4 w-4 ${getSecondaryTextColor()}`} />
//                       )}
//                     </div>
//                   )}
//                 </div>

//                 {/* Floating submenu for collapsed state */}
//                 {showFloatingSubmenu && (
//                   <FloatingSubmenu menuItem={item} />
//                 )}

//                 {/* Regular submenu for expanded state */}
//                 {hasSubmenu && isOpen && !isCollapsed && !isMobile && (
//                   <div className={`ml-8 mt-1 space-y-0.5 pl-3 border-l ${getSidebarBorder()}`}>
//                     {item.submenu.map(sub => {
//                       const SubIcon = sub.icon || ChevronRight;
//                       const subActive = location.pathname === sub.link;
                      
//                       return (
//                         <button
//                           key={sub.link}
//                           onClick={() => {
//                             navigate(sub.link);
//                             if (isMobile) setIsMobileOpen(false);
//                           }}
//                           className={`
//                             w-full text-left py-2 px-3 text-sm rounded-lg transition-all duration-150 
//                             flex items-center gap-2
//                             ${subActive 
//                               ? `${isLightTheme ? 'bg-gray-100 text-gray-900' : `bg-gradient-to-r ${getFromColorClass()}/10 ${getToColorClass()}/10 text-white`}` 
//                               : `${getSecondaryTextColor()} ${isLightTheme ? 'hover:text-gray-900 hover:bg-gray-50' : 'hover:text-white hover:bg-gray-800/50'}`
//                             }
//                           `}
//                         >
//                           <SubIcon className={`h-3 w-3 ${getSecondaryTextColor()}`} />
//                           <span className="truncate">{sub.label}</span>
//                           {subActive && (
//                             <div className={`ml-auto w-1.5 h-1.5 rounded-full bg-gradient-to-r ${getFromColorClass()} ${getToColorClass()}`}></div>
//                           )}
//                         </button>
//                       );
//                     })}
//                   </div>
//                 )}
//               </li>
//             );
//           })}
//         </ul>
//       </nav>

//       {/* User Profile & Footer */}
//       <div className={`p-4 border-t ${getSidebarBorder()}`}>
//         <div className="flex items-center gap-3 mb-4">
//           <div className="relative">
//             <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${getFromColorClass()} ${getToColorClass()} flex items-center justify-center shadow-lg`}>
//               <span className="text-white font-bold">
//                 {currentUser.username?.[0]?.toUpperCase() || 'U'}
//               </span>
//             </div>
//             <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
//           </div>
//           {(!isCollapsed || isMobile) && (
//             <div className="flex-1 min-w-0">
//               <p className={`font-semibold text-sm ${getPrimaryTextColor()} truncate`}>
//                 {currentUser.username || 'User'}
//               </p>
//               <p className={`text-xs ${getSecondaryTextColor()} truncate`}>
//                 {isSuperAdmin ? 'Super Admin' : currentUser.role || 'Employee'}
//               </p>
//             </div>
//           )}
//         </div>

//         {(!isCollapsed || isMobile) && (
//           <>
//             {/* Status Badge */}
//             <div className={`mb-3 px-3 py-2 ${isLightTheme ? 'bg-white/50' : 'bg-gray-800/50'} rounded-lg`}>
//               <div className="flex items-center justify-between text-xs">
//                 <span className={getSecondaryTextColor()}>Status</span>
//                 <div className="flex items-center gap-1">
//                   <div className="w-2 h-2 rounded-full bg-green-500"></div>
//                   <span className={`${isLightTheme ? 'text-green-700' : 'text-green-400'} font-medium`}>Active</span>
//                 </div>
//               </div>
//             </div>

//             {/* Action Buttons */}
//             <div className="flex items-center gap-2">
//               <button 
//                 onClick={() => navigate('/settings')}
//                 className={`flex-1 px-3 py-1.5 ${isLightTheme ? 'bg-white/50 hover:bg-gray-200' : 'bg-gray-800/50 hover:bg-gray-800'} rounded-lg text-xs ${getSecondaryTextColor()} flex items-center justify-center gap-1`}
//               >
//                 <Settings className="h-3 w-3" />
//                 Settings
//               </button>
//               <button 
//                 onClick={logout}
//                 className={`flex-1 px-3 py-1.5 bg-gradient-to-r ${getFromColorClass()}/10 ${getToColorClass()}/10 hover:${getFromColorClass()}/20 hover:${getToColorClass()}/20 rounded-lg text-xs ${getTextAccent()} flex items-center justify-center gap-1`}
//               >
//                 <LogOut className="h-3 w-3" />
//                 Logout
//               </button>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );

//   return (
//     <>
//       {/* Mobile Menu Button */}
//       <button
//         onClick={() => setIsMobileOpen(true)}
//         className={`lg:hidden fixed top-4 left-4 z-50 p-2 ${getButtonGradient()} text-white rounded-xl shadow-lg`}
//       >
//         <Menu className="h-5 w-5" />
//       </button>

//       {/* Mobile Overlay */}
//       {isMobileOpen && (
//         <div 
//           className="lg:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
//           onClick={() => setIsMobileOpen(false)}
//         >
//           <div 
//             className={`fixed inset-y-0 left-0 w-72 ${getSidebarBg()} border-r ${getSidebarBorder()} shadow-2xl`}
//             onClick={(e) => e.stopPropagation()}
//           >
//             <SidebarContent isMobile />
//           </div>
//         </div>
//       )}

//       {/* Desktop Sidebar */}
//       <aside className={`
//         hidden lg:flex lg:fixed lg:inset-y-0 lg:left-0 lg:flex-col
//         ${getSidebarBg()} ${getSidebarText()}
//         transition-all duration-300 z-40 shadow-2xl border-r ${getSidebarBorder()}
//         ${isCollapsed ? 'w-20' : 'w-64'}
//         hover:z-50
//       `}>
//         <SidebarContent />
//       </aside>

//       {/* Expand Button - Only shown on hover in collapsed state */}
//       {isCollapsed && showExpandButton && (
//         <button
//           onClick={onToggleCollapse}
//           className={`
//             hidden lg:block fixed top-1/2 left-20 transform -translate-y-1/2 z-50
//             w-8 h-16 bg-gradient-to-r ${getSidebarBg()}
//             rounded-r-xl shadow-lg flex items-center justify-center${getSidebarText()}
//             hover:shadow-xl transition-all duration-300
//             animate-in slide-in-from-left-1
//           `}
//           title="Expand Menu"
//           onMouseEnter={() => setShowExpandButton(true)}
//           onMouseLeave={() => setShowExpandButton(false)}
//         >
//           <ChevronRight className="h-4 w-4" />
//         </button>
//       )}

//       {/* Small toggle button at bottom - Always visible alternative */}
//       {isCollapsed && (
//         <button
//           onClick={onToggleCollapse}
//           className={`
//             hidden lg:block fixed bottom-4 left-4 z-30
//             w-10 h-10 ${getButtonGradient()} 
//             rounded-xl shadow-lg flex items-center justify-center text-white
//             hover:shadow-xl transition-all duration-300
//           `}
//           title="Expand Menu"
//         >
//           <ChevronRight className="h-4 w-4" />
//         </button>
//       )}
//     </>
//   );
// }


// 'use client';

// import React, { useState, useEffect, useMemo, useRef } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { 
//   Menu, X, ChevronDown, ChevronRight, Home, Settings, 
//   Building, Bell, LogOut, Loader2
// } from 'lucide-react';
// import { useTheme } from './ThemeContext';
// import { MODULES, SUB_PERMISSIONS } from './data/navdata';
// import { useAuth } from './AuthContext';
// import { 
//   FaHome, 
//   FaUsersCog, 
//   FaUserPlus, 
//   FaUserTie, 
//   FaClock, 
//   FaCalendarAlt, 
//   FaFileInvoiceDollar, 
//   FaSignOutAlt 
// } from 'react-icons/fa';

// export default function Sidebar({   isCollapsed, 
//   onToggleCollapse, 
//   // isMobileOpen = false, 
//   onMobileToggle = () => {}   }) {
//   const { theme, refreshTheme } = useTheme(); // Added refreshTheme
//   const { logout, user: authUser } = useAuth();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [openMenus, setOpenMenus] = useState({});
//   const [isMobileOpen, setIsMobileOpen] = useState(false);
//   const [hoveredMenu, setHoveredMenu] = useState(null);
//   const [hoveredMenuPosition, setHoveredMenuPosition] = useState({ top: 0, left: 0 });
//   const [hoverTimeout, setHoverTimeout] = useState(null);
//   const [showExpandButton, setShowExpandButton] = useState(false);
//   const [isLoading, setIsLoading] = useState(true); // Loading state
//   const [prevUser, setPrevUser] = useState(null);
  
//   const menuItemRefs = useRef({});
//   const floatingSubmenuRef = useRef(null);

//   const currentUser = authUser || {};
  
//   // Force theme refresh when user changes
//   useEffect(() => {
//     const checkUserChange = async () => {
//       if (prevUser?.id !== currentUser?.id) {
//         setIsLoading(true);
        
//         // Refresh theme from current user
//         if (refreshTheme) {
//           await refreshTheme();
//         }
        
//         // Small delay to ensure theme is applied
//         setTimeout(() => {
//           setIsLoading(false);
//         }, 500); // 0.5 second delay
        
//         setPrevUser(currentUser);
//       } else if (prevUser === null && currentUser) {
//         // First load
//         setIsLoading(false);
//         setPrevUser(currentUser);
//       }
//     };
    
//     checkUserChange();
//   }, [currentUser, refreshTheme]);

//   const permissions = currentUser.permissions || {};
//   const isSuperAdmin = currentUser.role === 'superadmin';

//   // Theme detection - Add fallback for when theme is loading
//   const isLightTheme = isLoading ? false : (theme?.type === 'light' || theme?.sidebarBg?.includes('white') || theme?.sidebarBg?.includes('gray-50'));

//   // Theme helper functions with loading fallbacks
//   const getSidebarBg = () => {
//     if (isLoading) return 'bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900';
//     return theme?.sidebarBg || 'bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900';
//   };
  
//   const getSidebarText = () => {
//     if (isLoading) return 'text-gray-200';
//     return theme?.sidebarText || (isLightTheme ? 'text-gray-800' : 'text-gray-200');
//   };
  
//   const getSidebarHover = () => {
//     if (isLoading) return 'hover:bg-white/10';
//     return theme?.sidebarHover || (isLightTheme ? 'hover:bg-gray-100' : 'hover:bg-white/10');
//   };
  
//   const getSidebarActive = () => {
//     if (isLoading) return 'bg-gradient-to-r from-orange-500/20 to-pink-600/20';
//     if (theme?.sidebarActive) return theme.sidebarActive;
//     const fromColor = 'orange-500';
//     const toColor = 'pink-600';
//     if (isLightTheme) {
//       return `bg-gradient-to-r from-${fromColor}/10 to-${toColor}/10`;
//     }
//     return `bg-gradient-to-r from-${fromColor}/20 to-${toColor}/20`;
//   };
  
//   const getSidebarBorder = () => {
//     if (isLoading) return 'border-gray-700';
//     return theme?.sidebarBorder || (isLightTheme ? 'border-gray-200' : 'border-gray-700');
//   };
  
//   const getButtonGradient = () => {
//     if (isLoading) return 'bg-gradient-to-r from-orange-500 to-orange-600';
//     return theme?.button ? `bg-gradient-to-r ${theme.button}` : 'bg-gradient-to-r from-orange-500 to-orange-600';
//   };
  
//   const getTextAccent = () => {
//     if (isLoading) return 'text-orange-400';
//     return theme?.accent ? `text-${theme.accent}` : 'text-orange-400';
//   };
  
//   const getPrimaryTextColor = () => isLoading ? 'text-gray-200' : (isLightTheme ? 'text-gray-800' : 'text-gray-200');
//   const getSecondaryTextColor = () => isLoading ? 'text-gray-400' : (isLightTheme ? 'text-gray-600' : 'text-gray-400');

//   // Get gradient colors with loading fallbacks
//   const getGradientFrom = () => {
//     if (isLoading) return 'orange-500';
//     if (theme?.gradient) {
//       const fromClass = theme.gradient.split(' ')[0];
//       return fromClass.replace('from-', '');
//     }
//     return 'orange-500';
//   };

//   const getGradientTo = () => {
//     if (isLoading) return 'pink-600';
//     if (theme?.gradient) {
//       const gradientParts = theme.gradient.split(' ');
//       const toClass = gradientParts.find(part => part.startsWith('to-'));
//       return toClass ? toClass.replace('to-', '') : 'pink-600';
//     }
//     return 'pink-600';
//   };

//   const getFromColorClass = () => `from-${getGradientFrom()}`;
//   const getToColorClass = () => `to-${getGradientTo()}`;

//   // Handle sidebar hover to show expand button
//   useEffect(() => {
//     if (isCollapsed && !isLoading) {
//       const sidebar = document.querySelector('aside');
//       if (sidebar) {
//         const handleSidebarHover = () => setShowExpandButton(true);
//         const handleSidebarLeave = () => setShowExpandButton(false);
        
//         sidebar.addEventListener('mouseenter', handleSidebarHover);
//         sidebar.addEventListener('mouseleave', handleSidebarLeave);
        
//         return () => {
//           sidebar.removeEventListener('mouseenter', handleSidebarHover);
//           sidebar.removeEventListener('mouseleave', handleSidebarLeave);
//         };
//       }
//     }
//   }, [isCollapsed, isLoading]);

//   // Handle hover for collapsed state
//   const handleMenuHover = (menuLabel, event) => {
//     if (isCollapsed && !isLoading) {
//       if (hoverTimeout) clearTimeout(hoverTimeout);
//       setHoveredMenu(menuLabel);
//       setShowExpandButton(true);
      
//       // Get the position of the hovered menu item
//       const menuItem = menuItemRefs.current[menuLabel];
//       if (menuItem) {
//         const rect = menuItem.getBoundingClientRect();
//         setHoveredMenuPosition({
//           top: rect.top,
//           left: rect.right + 8, // 8px gap from the menu item
//         });
//       }
//     }
//   };

//   const handleMenuLeave = () => {
//     if (isCollapsed && !isLoading) {
//       const timeout = setTimeout(() => {
//         setHoveredMenu(null);
//       }, 200);
//       setHoverTimeout(timeout);
//     }
//   };

//   // Handle click outside floating submenu
//   useEffect(() => {
//     if (isLoading) return;
    
//     const handleClickOutside = (event) => {
//       if (isCollapsed && hoveredMenu && floatingSubmenuRef.current && 
//           !floatingSubmenuRef.current.contains(event.target) &&
//           !Object.values(menuItemRefs.current).some(ref => ref && ref.contains(event.target))) {
//         setHoveredMenu(null);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, [isCollapsed, hoveredMenu, isLoading]);

//   // Check if user has view permission for a sub-item
//   const canViewSubItem = (moduleName, subItemName) => {
//     if (isLoading) return false;
    
//     // For superadmin, check the actual permission value
//     if (isSuperAdmin) {
//       if (!permissions[moduleName]) return false;
//       const subItemPermissions = permissions[moduleName][subItemName];
//       if (!subItemPermissions) return false;
//       return subItemPermissions.view === true;
//     }
    
//     // For regular users, check permissions
//     if (!permissions[moduleName]) return false;
    
//     // Check if subItem exists in module permissions
//     const subItemPermissions = permissions[moduleName][subItemName];
//     if (!subItemPermissions) return false;
    
//     // Return true if view permission is true
//     return subItemPermissions.view === true;
//   };

//   // Check if user has any view permission in a module
//   const hasAnyPermissionInModule = (moduleName) => {
//     if (isLoading) return false;
    
//     // For superadmin, check if there are any sub-items defined for this module
//     if (isSuperAdmin) {
//       const subItems = SUB_PERMISSIONS[moduleName] || [];
//       return subItems.length > 0;
//     }
    
//     // For regular users, check permissions
//     if (!permissions[moduleName]) return false;
    
//     // Check if any sub-item has view permission
//     const modulePermissions = permissions[moduleName];
//     return Object.values(modulePermissions).some(subItem => 
//       subItem && typeof subItem === 'object' && subItem.view === true
//     );
//   };

//   // Get visible sub-items for a module
//   const getVisibleSubItems = (moduleName) => {
//     if (isLoading) return [];
    
//     const subItems = SUB_PERMISSIONS[moduleName] || [];
    
//     return subItems.filter(sub => {
//       // For regular users, check permission
//       return canViewSubItem(moduleName, sub.name);
//     });
//   };

//   // Filter modules based on permissions (memoized for performance - updates in real-time)
//   const dynamicMenu = useMemo(() => {
//     if (isLoading) return [];
    
//     return MODULES.map(mod => {
//       // Get the icon component for this module
//       const getIconComponent = () => {
//         switch(mod.name) {
//           case 'Base': return FaHome;
//           case 'Recruitment': return FaUsersCog;
//           case 'Onboarding': return FaUserPlus;
//           case 'Employee': return FaUserTie;
//           case 'Attendance': return FaClock;
//           case 'Leave': return FaCalendarAlt;
//           case 'Payroll': return FaFileInvoiceDollar;
//           case 'Offboarding': return FaSignOutAlt;
//           default: return Home;
//         }
//       };

//       // Get visible sub-items for this module
//       const visibleSubItems = getVisibleSubItems(mod.name);
      
//       // If no visible sub-items, don't show the module
//       if (visibleSubItems.length === 0) {
//         return null;
//       }

//       // Map the visible sub-items
//       const mappedSubItems = visibleSubItems.map(sub => ({
//         label: sub.name,
//         key: sub.name,
//         link: sub.route,
//         icon: ChevronRight,
//       }));

//       return {
//         label: mod.name,
//         icon: getIconComponent(),
//         color: getTextAccent(),
//         link: mappedSubItems[0]?.link || '#', // First accessible sub-item as default link
//         submenu: mappedSubItems,
//       };
//     }).filter(Boolean);
//   }, [permissions, isSuperAdmin, currentUser, isLoading]);

//   const menuData = useMemo(() => {
//     if (isLoading) return [
//       { label: 'Dashboard', icon: Home, link: '/dashboard', color: getTextAccent() }
//     ];
    
//     return [
//       { label: 'Dashboard', icon: Home, link: '/dashboard', color: getTextAccent() },
//       ...dynamicMenu,
//       { label: 'Settings', icon: Settings, link: '/settings', color: getSecondaryTextColor() },
//     ];
//   }, [dynamicMenu, isLoading]);

//   const isActive = (path) => location.pathname.startsWith(path);

//   // Floating Submenu Component for Collapsed State
//   const FloatingSubmenu = ({ menuItem }) => {
//     if (!menuItem || !menuItem.submenu || menuItem.submenu.length === 0 || isLoading) return null;

//     // Calculate if submenu should be positioned above or below
//     const shouldPositionAbove = () => {
//       if (typeof window === 'undefined') return false;
//       const windowHeight = window.innerHeight;
//       const submenuHeight = (menuItem.submenu.length * 44) + 60; // Approximate height
//       return hoveredMenuPosition.top + submenuHeight > windowHeight - 20;
//     };

//     const positionStyle = {
//       left: `${hoveredMenuPosition.left}px`,
//       top: shouldPositionAbove() 
//         ? `${hoveredMenuPosition.top - ((menuItem.submenu.length * 44) + 60)}px`
//         : `${hoveredMenuPosition.top}px`,
//     };

//     return (
//       <div 
//         ref={floatingSubmenuRef}
//         className={`
//           fixed w-56 rounded-xl shadow-2xl 
//           border ${getSidebarBorder()} 
//           ${isLightTheme ? 'bg-white' : 'bg-gray-900'} 
//           py-2 z-50 animate-in slide-in-from-left-1 duration-200
//           max-h-[80vh] overflow-y-auto
//         `}
//         style={positionStyle}
//         onMouseEnter={() => {
//           if (hoverTimeout) clearTimeout(hoverTimeout);
//           setHoveredMenu(menuItem.label);
//         }}
//         onMouseLeave={handleMenuLeave}
//       >
//         {/* Menu header */}
//         <div className={`px-4 py-2 border-b ${getSidebarBorder()}`}>
//           <div className="flex items-center gap-2">
//             <div className={`p-1.5 rounded-lg ${menuItem.color} ${isLightTheme ? 'bg-gray-100' : 'bg-gray-800/50'}`}>
//               {React.createElement(menuItem.icon || Home, { className: "h-4 w-4" })}
//             </div>
//             <span className={`font-medium text-sm ${getPrimaryTextColor()}`}>
//               {menuItem.label}
//             </span>
//           </div>
//         </div>

//         {/* Submenu items */}
//         <div className="py-2">
//           {menuItem.submenu.map(sub => {
//             const SubIcon = sub.icon || ChevronRight;
//             const subActive = location.pathname === sub.link;
            
//             return (
//               <button
//                 key={sub.link}
//                 onClick={() => {
//                   navigate(sub.link);
//                   setHoveredMenu(null);
//                 }}
//                 className={`
//                   w-full text-left py-2.5 px-4 text-sm rounded-lg mx-2 transition-all duration-150 
//                   flex items-center gap-3
//                   ${subActive 
//                     ? `${isLightTheme ? 'bg-gray-100 text-gray-900' : `bg-gradient-to-r ${getFromColorClass()}/10 ${getToColorClass()}/10 text-white`}` 
//                     : `${getSecondaryTextColor()} ${isLightTheme ? 'hover:text-gray-900 hover:bg-gray-50' : 'hover:text-white hover:bg-gray-800/50'}`
//                   }
//                 `}
//               >
//                 <SubIcon className="h-3.5 w-3.5" />
//                 <span className="truncate">{sub.label}</span>
//               </button>
//             );
//           })}
//         </div>
//       </div>
//     );
//   };

//   const SidebarContent = ({ isMobile = false }) => (
//     <div className={`h-full flex flex-col ${isMobile ? 'w-72' : ''}`}>
//       {/* Header */}
//       <div className={`p-6 border-b ${getSidebarBorder()}`}>
//         <div className="flex items-center justify-between">
//           <div className="flex items-center gap-3">
//             <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${getFromColorClass()} ${getToColorClass()} shadow-lg flex items-center justify-center`}>
//               {currentUser.logo ? (
//                 <img src={currentUser.logo} alt="logo" className="w-8 h-8 rounded-lg object-contain" />
//               ) : (
//                 <Building className="h-5 w-5 text-white" />
//               )}
//             </div>
//             {(!isCollapsed || isMobile) && (
//               <div>
//                 <h1 className={`text-lg font-bold ${getPrimaryTextColor()}`}>HRMS Pro</h1>
//                 <p className={`text-xs ${getSecondaryTextColor()}`}>{currentUser.companyName || 'HR System'}</p>
//               </div>
//             )}
//           </div>
//           {(!isCollapsed || isMobile) && (
//             <button
//               onClick={() => isMobile ? setIsMobileOpen(false) : onToggleCollapse()}
//               className={`p-2 ${isLightTheme ? 'hover:bg-gray-100' : 'hover:bg-white/10'} rounded-lg transition-colors`}
//             >
//               <X className={`h-5 w-5 ${getSecondaryTextColor()}`} />
//             </button>
//           )}
//         </div>
//       </div>

//       {/* Menu Items */}
//       <nav className="flex-1 overflow-y-auto py-4 px-3">
//         <ul className="space-y-1">
//           {menuData.map(item => {
//             const Icon = item.icon;
//             const hasSubmenu = item.submenu?.length > 0;
//             const isOpen = openMenus[item.label];
//             const active = isActive(item.link);
//             const isHovered = hoveredMenu === item.label;
//             const showFloatingSubmenu = isCollapsed && isHovered && hasSubmenu;
//             const IconComponent = Icon;

//             return (
//               <li 
//                 key={item.label} 
//                 className="relative"
//                 ref={(el) => menuItemRefs.current[item.label] = el}
//               >
//                 <div
//                   onClick={(e) => {
//                     if (isCollapsed && hasSubmenu) {
//                       // In collapsed mode, clicking opens the floating menu
//                       handleMenuHover(item.label, e);
//                     } else if (!isCollapsed && hasSubmenu) {
//                       // In expanded mode, clicking toggles the dropdown
//                       setOpenMenus(prev => ({ ...prev, [item.label]: !prev[item.label] }));
//                     } else {
//                       // No submenu, navigate directly
//                       navigate(item.link);
//                       if (isMobile) setIsMobileOpen(false);
//                     }
//                   }}
//                   onMouseEnter={(e) => handleMenuHover(item.label, e)}
//                   onMouseLeave={handleMenuLeave}
//                   className={`
//                     group flex items-center justify-between px-3 py-2.5 rounded-xl 
//                     cursor-pointer transition-all duration-200
//                     ${active ? getSidebarActive() : getSidebarHover()}
//                     ${active ? 'shadow-lg' : ''}
//                     ${isCollapsed ? 'justify-center px-2' : ''}
//                   `}
//                 >
//                   {/* Active indicator */}
//                   {active && !isCollapsed && (
//                     <div className={`absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-6 bg-gradient-to-b ${getFromColorClass()} ${getToColorClass()} rounded-r-full`}></div>
//                   )}

//                   <div className="flex items-center gap-3 flex-1">
//                     <div className={`p-1.5 rounded-lg ${item.color} ${isLightTheme ? 'bg-gray-100' : 'bg-gray-800/50'}`}>
//                       <IconComponent className="h-4 w-4" />
//                     </div>
//                     {(!isCollapsed || isMobile) && (
//                       <div className="flex-1 min-w-0">
//                         <span className={`font-medium text-sm truncate ${active ? (isLightTheme ? 'text-gray-900' : 'text-white') : getPrimaryTextColor()}`}>
//                           {item.label}
//                         </span>
//                         {hasSubmenu && item.submenu && (!isCollapsed || isMobile) && (
//                           <p className={`text-xs ${getSecondaryTextColor()} mt-0.5`}>
//                             {item.submenu.length} items
//                           </p>
//                         )}
//                       </div>
//                     )}
//                   </div>
                  
//                   {hasSubmenu && (!isCollapsed || isMobile) && (
//                     <div className="ml-2">
//                       {isOpen ? (
//                         <ChevronDown className={`h-4 w-4 ${getSecondaryTextColor()}`} />
//                       ) : (
//                         <ChevronRight className={`h-4 w-4 ${getSecondaryTextColor()}`} />
//                       )}
//                     </div>
//                   )}
//                 </div>

//                 {/* Floating submenu for collapsed state */}
//                 {showFloatingSubmenu && (
//                   <FloatingSubmenu menuItem={item} />
//                 )}

//                 {/* Regular submenu for expanded state */}
//                 {hasSubmenu && isOpen && !isCollapsed && !isMobile && (
//                   <div className={`ml-8 mt-1 space-y-0.5 pl-3 border-l ${getSidebarBorder()}`}>
//                     {item.submenu.map(sub => {
//                       const SubIcon = sub.icon || ChevronRight;
//                       const subActive = location.pathname === sub.link;
                      
//                       return (
//                         <button
//                           key={sub.link}
//                           onClick={() => {
//                             navigate(sub.link);
//                             if (isMobile) setIsMobileOpen(false);
//                           }}
//                           className={`
//                             w-full text-left py-2 px-3 text-sm rounded-lg transition-all duration-150 
//                             flex items-center gap-2
//                             ${subActive 
//                               ? `${isLightTheme ? 'bg-gray-100 text-gray-900' : `bg-gradient-to-r ${getFromColorClass()}/10 ${getToColorClass()}/10 text-white`}` 
//                               : `${getSecondaryTextColor()} ${isLightTheme ? 'hover:text-gray-900 hover:bg-gray-50' : 'hover:text-white hover:bg-gray-800/50'}`
//                             }
//                           `}
//                         >
//                           <SubIcon className={`h-3 w-3 ${getSecondaryTextColor()}`} />
//                           <span className="truncate">{sub.label}</span>
//                           {subActive && (
//                             <div className={`ml-auto w-1.5 h-1.5 rounded-full bg-gradient-to-r ${getFromColorClass()} ${getToColorClass()}`}></div>
//                           )}
//                         </button>
//                       );
//                     })}
//                   </div>
//                 )}
//               </li>
//             );
//           })}
//         </ul>
//       </nav>

//       {/* User Profile & Footer */}
//       <div className={`p-4 border-t ${getSidebarBorder()}`}>
//         <div className="flex items-center gap-3 mb-4">
//           <div className="relative">
//             <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${getFromColorClass()} ${getToColorClass()} flex items-center justify-center shadow-lg`}>
//               <span className="text-white font-bold">
//                 {currentUser.username?.[0]?.toUpperCase() || 'U'}
//               </span>
//             </div>
//             <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
//           </div>
//           {(!isCollapsed || isMobile) && (
//             <div className="flex-1 min-w-0">
//               <p className={`font-semibold text-sm ${getPrimaryTextColor()} truncate`}>
//                 {currentUser.username || 'User'}
//               </p>
//               <p className={`text-xs ${getSecondaryTextColor()} truncate`}>
//                 {isSuperAdmin ? 'Super Admin' : currentUser.role || 'Employee'}
//               </p>
//             </div>
//           )}
//         </div>

//         {(!isCollapsed || isMobile) && (
//           <>
//             {/* Status Badge */}
//             <div className={`mb-3 px-3 py-2 ${isLightTheme ? 'bg-white/50' : 'bg-gray-800/50'} rounded-lg`}>
//               <div className="flex items-center justify-between text-xs">
//                 <span className={getSecondaryTextColor()}>Status</span>
//                 <div className="flex items-center gap-1">
//                   <div className="w-2 h-2 rounded-full bg-green-500"></div>
//                   <span className={`${isLightTheme ? 'text-green-700' : 'text-green-400'} font-medium`}>Active</span>
//                 </div>
//               </div>
//             </div>

//             {/* Action Buttons */}
//             <div className="flex items-center gap-2">
//               <button 
//                 onClick={() => navigate('/settings')}
//                 className={`flex-1 px-3 py-1.5 ${isLightTheme ? 'bg-white/50 hover:bg-gray-200' : 'bg-gray-800/50 hover:bg-gray-800'} rounded-lg text-xs ${getSecondaryTextColor()} flex items-center justify-center gap-1`}
//               >
//                 <Settings className="h-3 w-3" />
//                 Settings
//               </button>
//               <button 
//                 onClick={logout}
//                 className={`flex-1 px-3 py-1.5 bg-gradient-to-r ${getFromColorClass()}/10 ${getToColorClass()}/10 hover:${getFromColorClass()}/20 hover:${getToColorClass()}/20 rounded-lg text-xs ${getTextAccent()} flex items-center justify-center gap-1`}
//               >
//                 <LogOut className="h-3 w-3" />
//                 Logout
//               </button>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );

//   // Show loading state
//   if (isLoading) {
//     return (
//       <>
//         {/* Mobile Menu Button (disabled during loading) */}
//          <button
//         onClick={onMobileToggle}
//         className={`lg:hidden fixed top-4 left-4 z-50 p-2 ${getButtonGradient()} text-white rounded-xl shadow-lg`}
//       >
//         <Menu className="h-5 w-5" />
//       </button> 

//         {/* Loading sidebar */}
//         <aside className={`
//           hidden lg:flex lg:fixed lg:inset-y-0 lg:left-0 lg:flex-col
//           ${getSidebarBg()} ${getSidebarText()}
//           transition-all duration-300 z-40 shadow-2xl border-r ${getSidebarBorder()}
//           ${isCollapsed ? 'w-20' : 'w-64'}
//         `}>
//           <div className="h-full flex flex-col">
//             {/* Loading header */}
//             <div className={`p-6 border-b ${getSidebarBorder()}`}>
//               <div className="flex items-center gap-3">
//                 <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${getFromColorClass()} ${getToColorClass()} shadow-lg flex items-center justify-center`}>
//                   <Loader2 className="h-5 w-5 text-white animate-spin" />
//                 </div>
//                 {!isCollapsed && (
//                   <div className="flex-1">
//                     <div className="h-4 bg-gray-700/50 rounded w-24 mb-2 animate-pulse"></div>
//                     <div className="h-2 bg-gray-700/50 rounded w-16 animate-pulse"></div>
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Loading menu items */}
//             <nav className="flex-1 py-4 px-3">
//               <div className="space-y-1">
//                 {[1, 2, 3, 4, 5].map((i) => (
//                   <div key={i} className="px-3 py-2.5 rounded-xl animate-pulse">
//                     <div className="flex items-center gap-3">
//                       <div className={`p-1.5 rounded-lg bg-gray-700/50`}></div>
//                       {!isCollapsed && (
//                         <div className="h-3 bg-gray-700/50 rounded flex-1"></div>
//                       )}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </nav>

//             {/* Loading footer */}
//             <div className={`p-4 border-t ${getSidebarBorder()}`}>
//               <div className="flex items-center gap-3 mb-4">
//                 <div className="relative">
//                   <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${getFromColorClass()} ${getToColorClass()} flex items-center justify-center shadow-lg`}>
//                     <Loader2 className="h-5 w-5 text-white animate-spin" />
//                   </div>
//                 </div>
//                 {!isCollapsed && (
//                   <div className="flex-1">
//                     <div className="h-3 bg-gray-700/50 rounded w-20 mb-1 animate-pulse"></div>
//                     <div className="h-2 bg-gray-700/50 rounded w-16 animate-pulse"></div>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </aside>
//       </>
//     );
//   }

//   return (
//     <>
//       {/* Mobile Menu Button */}
//        <button
//         onClick={onMobileToggle}
//         className={`lg:hidden fixed top-4 left-4 z-50 p-2 ${getButtonGradient()} text-white rounded-xl shadow-lg`}
//       >
//         <Menu className="h-5 w-5" />
//       </button>

//       {/* Mobile Overlay */}
//        {isMobileOpen && (
//         <div 
//           className="lg:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
//           onClick={onMobileToggle}
//         >
//           <div 
//             className={`fixed inset-y-0 left-0 w-72 ${getSidebarBg()} border-r ${getSidebarBorder()} shadow-2xl`}
//             onClick={(e) => e.stopPropagation()}
//           >
//             <SidebarContent isMobile />
//           </div>
//         </div>
//       )}

//       {/* Desktop Sidebar */}
//        <aside className={`
//         hidden lg:flex lg:fixed lg:inset-y-0 lg:left-0 lg:flex-col
//         ${getSidebarBg()} ${getSidebarText()}
//         transition-all duration-300 z-40 shadow-2xl border-r ${getSidebarBorder()}
//         ${isCollapsed ? 'w-20' : 'w-64'}
//         hover:z-50
//       `}>
//         <SidebarContent />
//       </aside>

//       {/* Expand Button - Only shown on hover in collapsed state */}
//       {isCollapsed && showExpandButton && (
//         <button
//           onClick={onToggleCollapse}
//           className={`
//             hidden lg:block fixed top-1/2 left-20 transform -translate-y-1/2 z-50
//             w-8 h-16 bg-gradient-to-r ${getSidebarBg()} ${getSidebarText()}
//             rounded-r-xl shadow-lg flex items-center justify-center
//             hover:shadow-xl transition-all duration-300
//             animate-in slide-in-from-left-1
//           `}
//           title="Expand Menu"
//           onMouseEnter={() => setShowExpandButton(true)}
//           onMouseLeave={() => setShowExpandButton(false)}
//         >
//           <ChevronRight className="h-4 w-4" />
//         </button>
//       )}

//       {/* Small toggle button at bottom - Always visible alternative */}
//       {isCollapsed && (
//         <button
//           onClick={onToggleCollapse}
//           className={`
//             hidden lg:block fixed bottom-4 left-4 z-30
//             w-10 h-10 ${getButtonGradient()} 
//             rounded-xl shadow-lg flex items-center justify-center text-white
//             hover:shadow-xl transition-all duration-300
//           `}
//           title="Expand Menu"
//         >
//           <ChevronRight className="h-4 w-4" />
//         </button>
//       )}
//     </>
//   );
// }

'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  Menu, X, ChevronDown, ChevronRight, Home, Settings, 
  Building, Bell, LogOut, Loader2
} from 'lucide-react';
import { useTheme } from './ThemeContext';
import { MODULES, SUB_PERMISSIONS } from './data/navdata';
import { useAuth } from './AuthContext';
import { 
  FaHome, 
  FaUsersCog, 
  FaUserPlus, 
  FaUserTie, 
  FaClock, 
  FaCalendarAlt, 
  FaFileInvoiceDollar, 
  FaSignOutAlt 
} from 'react-icons/fa';

export default function Sidebar({ isCollapsed, onToggleCollapse }) {
  const { theme, refreshTheme } = useTheme(); // Added refreshTheme
  const { logout, user: authUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [openMenus, setOpenMenus] = useState({});
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [hoveredMenu, setHoveredMenu] = useState(null);
  const [hoveredMenuPosition, setHoveredMenuPosition] = useState({ top: 0, left: 0 });
  const [hoverTimeout, setHoverTimeout] = useState(null);
  const [showExpandButton, setShowExpandButton] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [prevUser, setPrevUser] = useState(null);
  
  const menuItemRefs = useRef({});
  const floatingSubmenuRef = useRef(null);

  const currentUser = authUser || {};
  
  // Force theme refresh when user changes
  useEffect(() => {
    const checkUserChange = async () => {
      if (prevUser?.id !== currentUser?.id) {
        setIsLoading(true);
        
        // Refresh theme from current user
        if (refreshTheme) {
          await refreshTheme();
        }
        
        // Small delay to ensure theme is applied
        setTimeout(() => {
          setIsLoading(false);
        }, 500); // 0.5 second delay
        
        setPrevUser(currentUser);
      } else if (prevUser === null && currentUser) {
        // First load
        setIsLoading(false);
        setPrevUser(currentUser);
      }
    };
    
    checkUserChange();
  }, [currentUser, refreshTheme]);

  const permissions = currentUser.permissions || {};
  const isSuperAdmin = currentUser.role === 'superadmin';

  // Theme detection - Add fallback for when theme is loading
  const isLightTheme = isLoading ? false : (theme?.type === 'light' || theme?.sidebarBg?.includes('white') || theme?.sidebarBg?.includes('gray-50'));

  // Theme helper functions with loading fallbacks
  const getSidebarBg = () => {
    if (isLoading) return 'bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900';
    return theme?.sidebarBg || 'bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900';
  };
  
  const getSidebarText = () => {
    if (isLoading) return 'text-gray-200';
    return theme?.sidebarText || (isLightTheme ? 'text-gray-800' : 'text-gray-200');
  };
  
  const getSidebarHover = () => {
    if (isLoading) return 'hover:bg-white/10';
    return theme?.sidebarHover || (isLightTheme ? 'hover:bg-gray-100' : 'hover:bg-white/10');
  };
  
  const getSidebarActive = () => {
    if (isLoading) return 'bg-gradient-to-r from-orange-500/20 to-pink-600/20';
    if (theme?.sidebarActive) return theme.sidebarActive;
    const fromColor = 'orange-500';
    const toColor = 'pink-600';
    if (isLightTheme) {
      return `bg-gradient-to-r from-${fromColor}/10 to-${toColor}/10`;
    }
    return `bg-gradient-to-r from-${fromColor}/20 to-${toColor}/20`;
  };
  
  const getSidebarBorder = () => {
    if (isLoading) return 'border-gray-700';
    return theme?.sidebarBorder || (isLightTheme ? 'border-gray-200' : 'border-gray-700');
  };
  
  const getButtonGradient = () => {
    if (isLoading) return 'bg-gradient-to-r from-orange-500 to-orange-600';
    return theme?.button ? `bg-gradient-to-r ${theme.button}` : 'bg-gradient-to-r from-orange-500 to-orange-600';
  };
  
  const getTextAccent = () => {
    if (isLoading) return 'text-orange-400';
    return theme?.accent ? `text-${theme.accent}` : 'text-orange-400';
  };
  
  const getPrimaryTextColor = () => isLoading ? 'text-gray-200' : (isLightTheme ? 'text-gray-800' : 'text-gray-200');
  const getSecondaryTextColor = () => isLoading ? 'text-gray-400' : (isLightTheme ? 'text-gray-600' : 'text-gray-400');

  // Get gradient colors with loading fallbacks
  const getGradientFrom = () => {
    if (isLoading) return 'orange-500';
    if (theme?.gradient) {
      const fromClass = theme.gradient.split(' ')[0];
      return fromClass.replace('from-', '');
    }
    return 'orange-500';
  };

  const getGradientTo = () => {
    if (isLoading) return 'pink-600';
    if (theme?.gradient) {
      const gradientParts = theme.gradient.split(' ');
      const toClass = gradientParts.find(part => part.startsWith('to-'));
      return toClass ? toClass.replace('to-', '') : 'pink-600';
    }
    return 'pink-600';
  };

  const getFromColorClass = () => `from-${getGradientFrom()}`;
  const getToColorClass = () => `to-${getGradientTo()}`;

  // Handle sidebar hover to show expand button
  useEffect(() => {
    if (isCollapsed && !isLoading) {
      const sidebar = document.querySelector('aside');
      if (sidebar) {
        const handleSidebarHover = () => setShowExpandButton(true);
        const handleSidebarLeave = () => setShowExpandButton(false);
        
        sidebar.addEventListener('mouseenter', handleSidebarHover);
        sidebar.addEventListener('mouseleave', handleSidebarLeave);
        
        return () => {
          sidebar.removeEventListener('mouseenter', handleSidebarHover);
          sidebar.removeEventListener('mouseleave', handleSidebarLeave);
        };
      }
    }
  }, [isCollapsed, isLoading]);

  // Handle hover for collapsed state
  const handleMenuHover = (menuLabel, event) => {
    if (isCollapsed && !isLoading) {
      if (hoverTimeout) clearTimeout(hoverTimeout);
      setHoveredMenu(menuLabel);
      setShowExpandButton(true);
      
      // Get the position of the hovered menu item
      const menuItem = menuItemRefs.current[menuLabel];
      if (menuItem) {
        const rect = menuItem.getBoundingClientRect();
        setHoveredMenuPosition({
          top: rect.top,
          left: rect.right + 8, // 8px gap from the menu item
        });
      }
    }
  };

  const handleMenuLeave = () => {
    if (isCollapsed && !isLoading) {
      const timeout = setTimeout(() => {
        setHoveredMenu(null);
      }, 200);
      setHoverTimeout(timeout);
    }
  };

  // Handle click outside floating submenu
  useEffect(() => {
    if (isLoading) return;
    
    const handleClickOutside = (event) => {
      if (isCollapsed && hoveredMenu && floatingSubmenuRef.current && 
          !floatingSubmenuRef.current.contains(event.target) &&
          !Object.values(menuItemRefs.current).some(ref => ref && ref.contains(event.target))) {
        setHoveredMenu(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isCollapsed, hoveredMenu, isLoading]);

  // Check if user has view permission for a sub-item
  const canViewSubItem = (moduleName, subItemName) => {
    if (isLoading) return false;
    
    // For superadmin, check the actual permission value
    if (isSuperAdmin) {
      if (!permissions[moduleName]) return false;
      const subItemPermissions = permissions[moduleName][subItemName];
      if (!subItemPermissions) return false;
      return subItemPermissions.view === true;
    }
    
    // For regular users, check permissions
    if (!permissions[moduleName]) return false;
    
    // Check if subItem exists in module permissions
    const subItemPermissions = permissions[moduleName][subItemName];
    if (!subItemPermissions) return false;
    
    // Return true if view permission is true
    return subItemPermissions.view === true;
  };

  // Check if user has any view permission in a module
  const hasAnyPermissionInModule = (moduleName) => {
    if (isLoading) return false;
    
    // For superadmin, check if there are any sub-items defined for this module
    if (isSuperAdmin) {
      const subItems = SUB_PERMISSIONS[moduleName] || [];
      return subItems.length > 0;
    }
    
    // For regular users, check permissions
    if (!permissions[moduleName]) return false;
    
    // Check if any sub-item has view permission
    const modulePermissions = permissions[moduleName];
    return Object.values(modulePermissions).some(subItem => 
      subItem && typeof subItem === 'object' && subItem.view === true
    );
  };

  // Get visible sub-items for a module
  const getVisibleSubItems = (moduleName) => {
    if (isLoading) return [];
    
    const subItems = SUB_PERMISSIONS[moduleName] || [];
    
    return subItems.filter(sub => {
      // For regular users, check permission
      return canViewSubItem(moduleName, sub.name);
    });
  };

  // Filter modules based on permissions (memoized for performance - updates in real-time)
  const dynamicMenu = useMemo(() => {
    if (isLoading) return [];
    
    return MODULES.map(mod => {
      // Get the icon component for this module
      const getIconComponent = () => {
        switch(mod.name) {
          case 'Base': return FaHome;
          case 'Recruitment': return FaUsersCog;
          case 'Onboarding': return FaUserPlus;
          case 'Employee': return FaUserTie;
          case 'Attendance': return FaClock;
          case 'Leave': return FaCalendarAlt;
          case 'Payroll': return FaFileInvoiceDollar;
          case 'Offboarding': return FaSignOutAlt;
          default: return Home;
        }
      };

      // Get visible sub-items for this module
      const visibleSubItems = getVisibleSubItems(mod.name);
      
      // If no visible sub-items, don't show the module
      if (visibleSubItems.length === 0) {
        return null;
      }

      // Map the visible sub-items
      const mappedSubItems = visibleSubItems.map(sub => ({
        label: sub.name,
        key: sub.name,
        link: sub.route,
        icon: ChevronRight,
      }));

      return {
        label: mod.name,
        icon: getIconComponent(),
        color: getTextAccent(),
        link: mappedSubItems[0]?.link || '#', // First accessible sub-item as default link
        submenu: mappedSubItems,
      };
    }).filter(Boolean);
  }, [permissions, isSuperAdmin, currentUser, isLoading]);

  const menuData = useMemo(() => {
    if (isLoading) return [
      { label: 'Dashboard', icon: Home, link: '/dashboard', color: getTextAccent() }
    ];
    
    return [
      { label: 'Dashboard', icon: Home, link: '/dashboard', color: getTextAccent() },
      ...dynamicMenu,
      { label: 'Settings', icon: Settings, link: '/settings', color: getSecondaryTextColor() },
    ];
  }, [dynamicMenu, isLoading]);

  const isActive = (path) => location.pathname.startsWith(path);

  // Floating Submenu Component for Collapsed State
  const FloatingSubmenu = ({ menuItem }) => {
    if (!menuItem || !menuItem.submenu || menuItem.submenu.length === 0 || isLoading) return null;

    // Calculate if submenu should be positioned above or below
    const shouldPositionAbove = () => {
      if (typeof window === 'undefined') return false;
      const windowHeight = window.innerHeight;
      const submenuHeight = (menuItem.submenu.length * 44) + 60; // Approximate height
      return hoveredMenuPosition.top + submenuHeight > windowHeight - 20;
    };

    const positionStyle = {
      left: `${hoveredMenuPosition.left}px`,
      top: shouldPositionAbove() 
        ? `${hoveredMenuPosition.top - ((menuItem.submenu.length * 44) + 60)}px`
        : `${hoveredMenuPosition.top}px`,
    };

    return (
      <div z
        ref={floatingSubmenuRef}
        className={`
          fixed w-56 rounded-xl shadow-2xl 
          border ${getSidebarBorder()} 
          ${isLightTheme ? 'bg-white' : 'bg-gray-900'} 
          py-2 z-50 animate-in slide-in-from-left-1 duration-200
          max-h-[80vh] overflow-y-auto
        `}
        style={positionStyle}
        onMouseEnter={() => {
          if (hoverTimeout) clearTimeout(hoverTimeout);
          setHoveredMenu(menuItem.label);
        }}
        onMouseLeave={handleMenuLeave}
      >
        {/* Menu header */}
        <div className={`px-4 py-2 pt-4 border-b ${getSidebarBorder()}`}>
          <div className="flex items-center gap-2">
            <div className={`p-1.5 rounded-lg ${menuItem.color} ${isLightTheme ? 'bg-gray-100' : 'bg-gray-800/50'}`}>
              {React.createElement(menuItem.icon || Home, { className: "h-4 w-4" })}
            </div>
            <span className={`font-medium text-sm ${getPrimaryTextColor()}`}>
              {menuItem.label}
            </span>
          </div>
        </div>

        {/* Submenu items */}
        <div className="py-2">
          {menuItem.submenu.map(sub => {
            const SubIcon = sub.icon || ChevronRight;
            const subActive = location.pathname === sub.link;
            
            return (
              <button
                key={sub.link}
                onClick={() => {
                  navigate(sub.link);
                  setHoveredMenu(null);
                }}
                className={`
                  w-full text-left py-2.5 px-4 text-sm rounded-lg mx-2 transition-all duration-150 
                  flex items-center gap-3
                  ${subActive 
                    ? `${isLightTheme ? 'bg-gray-100 text-gray-900' : `bg-gradient-to-r ${getFromColorClass()}/10 ${getToColorClass()}/10 text-white`}` 
                    : `${getSecondaryTextColor()} ${isLightTheme ? 'hover:text-gray-900 hover:bg-gray-50' : 'hover:text-white hover:bg-gray-800/50'}`
                  }
                `}
              >
                <SubIcon className="h-3.5 w-3.5" />
                <span className="truncate">{sub.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  const SidebarContent = ({ isMobile = false }) => (
    <div className={`h-full flex flex-col ${isMobile ? 'w-72' : ''}`}>
      {/* Header */}
      <div className={`p-6 border-b ${getSidebarBorder()}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${getFromColorClass()} ${getToColorClass()} shadow-lg flex items-center justify-center`}>
              {currentUser.logo ? (
                <img src={currentUser.logo} alt="logo" className="w-8 h-8 rounded-lg object-contain" />
              ) : (
                <Building className="h-5 w-5 text-white" />
              )}
            </div>
            {(!isCollapsed || isMobile) && (
              <div>
                <h1 className={`text-lg font-bold ${getPrimaryTextColor()}`}>HRMS Pro</h1>
                <p className={`text-xs ${getSecondaryTextColor()}`}>{currentUser.companyName || 'HR System'}</p>
              </div>
            )}
          </div>
          {(!isCollapsed || isMobile) && (
            <button
              onClick={() => isMobile ? setIsMobileOpen(false) : onToggleCollapse()}
              className={`p-2 ${isLightTheme ? 'hover:bg-gray-100' : 'hover:bg-white/10'} rounded-lg transition-colors`}
            >
              <X className={`h-5 w-5 ${getSecondaryTextColor()}`} />
            </button>
          )}
        </div>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 overflow-y-auto py-4 px-3">
        <ul className="space-y-1">
          {menuData.map(item => {
            const Icon = item.icon;
            const hasSubmenu = item.submenu?.length > 0;
            const isOpen = openMenus[item.label];
            const active = isActive(item.link);
            const isHovered = hoveredMenu === item.label;
            const showFloatingSubmenu = isCollapsed && isHovered && hasSubmenu;
            const IconComponent = Icon;

            return (
              <li 
                key={item.label} 
                className="relative"
                ref={(el) => menuItemRefs.current[item.label] = el}
              >
                <div
                  onClick={(e) => {
                    if (isCollapsed && hasSubmenu) {
                      // In collapsed mode, clicking opens the floating menu
                      handleMenuHover(item.label, e);
                    } else if (!isCollapsed && hasSubmenu) {
                      // In expanded mode, clicking toggles the dropdown
                      setOpenMenus(prev => ({ ...prev, [item.label]: !prev[item.label] }));
                    } else {
                      // No submenu, navigate directly
                      navigate(item.link);
                      if (isMobile) setIsMobileOpen(false);
                    }
                  }}
                  onMouseEnter={(e) => handleMenuHover(item.label, e)}
                  onMouseLeave={handleMenuLeave}
                  className={`
                    group flex items-center justify-between px-3 py-2.5 rounded-xl 
                    cursor-pointer transition-all duration-200
                    ${active ? getSidebarActive() : getSidebarHover()}
                    ${active ? 'shadow-lg' : ''}
                    ${isCollapsed ? 'justify-center px-2' : ''}
                  `}
                >
                  {/* Active indicator */}
                  {active && !isCollapsed && (
                    <div className={`absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-6 bg-gradient-to-b ${getFromColorClass()} ${getToColorClass()} rounded-r-full`}></div>
                  )}

                  <div className="flex items-center gap-3 flex-1">
                    <div className={`p-1.5 rounded-lg ${item.color} ${isLightTheme ? 'bg-gray-100' : 'bg-gray-800/50'}`}>
                      <IconComponent className="h-4 w-4" />
                    </div>
                    {(!isCollapsed || isMobile) && (
                      <div className="flex-1 min-w-0">
                        <span className={`font-medium text-sm truncate ${active ? (isLightTheme ? 'text-gray-900' : 'text-white') : getPrimaryTextColor()}`}>
                          {item.label}
                        </span>
                        {hasSubmenu && item.submenu && (!isCollapsed || isMobile) && (
                          <p className={`text-xs ${getSecondaryTextColor()} mt-0.5`}>
                            {item.submenu.length} items
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                  
                  {hasSubmenu && (!isCollapsed || isMobile) && (
                    <div className="ml-2">
                      {isOpen ? (
                        <ChevronDown className={`h-4 w-4 ${getSecondaryTextColor()}`} />
                      ) : (
                        <ChevronRight className={`h-4 w-4 ${getSecondaryTextColor()}`} />
                      )}
                    </div>
                  )}
                </div>

                {/* Floating submenu for collapsed state */}
                {showFloatingSubmenu && (
                  <FloatingSubmenu menuItem={item} />
                )}

                {/* Regular submenu for expanded state */}
                {hasSubmenu && isOpen && !isCollapsed && !isMobile && (
                  <div className={`ml-8 mt-1 space-y-0.5 pl-3 border-l ${getSidebarBorder()}`}>
                    {item.submenu.map(sub => {
                      const SubIcon = sub.icon || ChevronRight;
                      const subActive = location.pathname === sub.link;
                      
                      return (
                        <button
                          key={sub.link}
                          onClick={() => {
                            navigate(sub.link);
                            if (isMobile) setIsMobileOpen(false);
                          }}
                          className={`
                            w-full text-left py-2 px-3 text-sm rounded-lg transition-all duration-150 
                            flex items-center gap-2
                            ${subActive 
                              ? `${isLightTheme ? 'bg-gray-100 text-gray-900' : `bg-gradient-to-r ${getFromColorClass()}/10 ${getToColorClass()}/10 text-white`}` 
                              : `${getSecondaryTextColor()} ${isLightTheme ? 'hover:text-gray-900 hover:bg-gray-50' : 'hover:text-white hover:bg-gray-800/50'}`
                            }
                          `}
                        >
                          <SubIcon className={`h-3 w-3 ${getSecondaryTextColor()}`} />
                          <span className="truncate">{sub.label}</span>
                          {subActive && (
                            <div className={`ml-auto w-1.5 h-1.5 rounded-full bg-gradient-to-r ${getFromColorClass()} ${getToColorClass()}`}></div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User Profile & Footer */}
      <div className={`p-4 border-t ${getSidebarBorder()}`}>
        <div className="flex items-center gap-3 mb-4">
          <div className="relative">
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${getFromColorClass()} ${getToColorClass()} flex items-center justify-center shadow-lg`}>
              <span className="text-white font-bold">
                {currentUser.username?.[0]?.toUpperCase() || 'U'}
              </span>
            </div>
            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
          </div>
          {(!isCollapsed || isMobile) && (
            <div className="flex-1 min-w-0">
              <p className={`font-semibold text-sm ${getPrimaryTextColor()} truncate`}>
                {currentUser.username || 'User'}
              </p>
              <p className={`text-xs ${getSecondaryTextColor()} truncate`}>
                {isSuperAdmin ? 'Super Admin' : currentUser.role || 'Employee'}
              </p>
            </div>
          )}
        </div>

        {(!isCollapsed || isMobile) && (
          <>
            {/* Status Badge */}
            <div className={`mb-3 px-3 py-2 ${isLightTheme ? 'bg-white/50' : 'bg-gray-800/50'} rounded-lg`}>
              <div className="flex items-center justify-between text-xs">
                <span className={getSecondaryTextColor()}>Status</span>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span className={`${isLightTheme ? 'text-green-700' : 'text-green-400'} font-medium`}>Active</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              <button 
                onClick={() => navigate('/settings')}
                className={`flex-1 px-3 py-1.5 ${isLightTheme ? 'bg-white/50 hover:bg-gray-200' : 'bg-gray-800/50 hover:bg-gray-800'} rounded-lg text-xs ${getSecondaryTextColor()} flex items-center justify-center gap-1`}
              >
                <Settings className="h-3 w-3" />
                Settings
              </button>
              <button 
                onClick={logout}
                className={`flex-1 px-3 py-1.5 bg-gradient-to-r ${getFromColorClass()}/10 ${getToColorClass()}/10 hover:${getFromColorClass()}/20 hover:${getToColorClass()}/20 rounded-lg text-xs ${getTextAccent()} flex items-center justify-center gap-1`}
              >
                <LogOut className="h-3 w-3" />
                Logout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );

  // Show loading state
  if (isLoading) {
    return (
      <>
        {/* Mobile Menu Button (disabled during loading) */}
        <button
          disabled
          className={`lg:hidden fixed top-4 left-4 z-50 p-2 ${getButtonGradient()} text-white rounded-xl shadow-lg opacity-50`}
        >
          <Menu className="h-5 w-5" />
        </button>

        {/* Loading sidebar */}
        <aside className={`
          hidden lg:flex lg:fixed lg:inset-y-0 lg:left-0 lg:flex-col
          ${getSidebarBg()} ${getSidebarText()}
          transition-all duration-300 z-40 shadow-2xl border-r ${getSidebarBorder()}
          ${isCollapsed ? 'w-20' : 'w-64'}
        `}>
          <div className="h-full flex flex-col">
            {/* Loading header */}
            <div className={`p-6 border-b ${getSidebarBorder()}`}>
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${getFromColorClass()} ${getToColorClass()} shadow-lg flex items-center justify-center`}>
                  <Loader2 className="h-5 w-5 text-white animate-spin" />
                </div>
                {!isCollapsed && (
                  <div className="flex-1">
                    <div className="h-4 bg-gray-700/50 rounded w-24 mb-2 animate-pulse"></div>
                    <div className="h-2 bg-gray-700/50 rounded w-16 animate-pulse"></div>
                  </div>
                )}
              </div>
            </div>

            {/* Loading menu items */}
            <nav className="flex-1 py-4 px-3">
              <div className="space-y-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="px-3 py-2.5 rounded-xl animate-pulse">
                    <div className="flex items-center gap-3">
                      <div className={`p-1.5 rounded-lg bg-gray-700/50`}></div>
                      {!isCollapsed && (
                        <div className="h-3 bg-gray-700/50 rounded flex-1"></div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </nav>

            {/* Loading footer */}
            <div className={`p-4 border-t ${getSidebarBorder()}`}>
              <div className="flex items-center gap-3 mb-4">
                <div className="relative">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${getFromColorClass()} ${getToColorClass()} flex items-center justify-center shadow-lg`}>
                    <Loader2 className="h-5 w-5 text-white animate-spin" />
                  </div>
                </div>
                {!isCollapsed && (
                  <div className="flex-1">
                    <div className="h-3 bg-gray-700/50 rounded w-20 mb-1 animate-pulse"></div>
                    <div className="h-2 bg-gray-700/50 rounded w-16 animate-pulse"></div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </aside>
      </>
    );
  }

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileOpen(true)}
        className={`lg:hidden fixed top-4 left-4 z-50 p-2 ${getButtonGradient()} text-white rounded-xl shadow-lg`}
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Mobile Overlay */}
      {/* {isMobileOpen && (
        <div 
          className="lg:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          onClick={() => setIsMobileOpen(false)}
        >
          <div 
            className={`fixed inset-y-0 left-0 w-72 ${getSidebarBg()} border-r ${getSidebarBorder()} shadow-2xl`}
            onClick={(e) => e.stopPropagation()}
          >
            <SidebarContent isMobile />
          </div>
        </div>
      )} */}
      {isMobileOpen && (
  <div className="lg:hidden fixed inset-0 z-50 bg-black/60"
       onClick={() => setIsMobileOpen(false)}>
    <aside
      className="w-72 h-full"
      onClick={e => e.stopPropagation()}
    >
      <SidebarContent isMobile />
    </aside>
  </div>
)}


      {/* Desktop Sidebar */}
      <aside className={`
        hidden lg:flex lg:fixed lg:inset-y-0 lg:left-0 lg:flex-col
       
  fixed inset-y-0 left-0
  transition-all
  // ${isCollapsed ? 'w-20' : 'w-64'}
        ${getSidebarBg()} ${getSidebarText()}
        transition-all duration-300 z-40 shadow-2xl border-r ${getSidebarBorder()}
        ${isCollapsed ? 'w-20' : 'w-64'}
        hover:z-50
      `}>
        <SidebarContent />
      </aside>

      {/* Expand Button - Only shown on hover in collapsed state */}
      {isCollapsed && showExpandButton && (
        <button
          onClick={onToggleCollapse}
          className={`
            hidden lg:block fixed top-1/2 left-20 transform -translate-y-1/2 z-50
            w-8 h-16 bg-gradient-to-r ${getSidebarBg()} ${getSidebarText()}
            rounded-r-xl shadow-lg flex items-center justify-center
            hover:shadow-xl transition-all duration-300
            animate-in slide-in-from-left-1
          `}
          title="Expand Menu"
          onMouseEnter={() => setShowExpandButton(true)}
          onMouseLeave={() => setShowExpandButton(false)}
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      )}

      {/* Small toggle button at bottom - Always visible alternative */}
      {isCollapsed && (
        <button
          onClick={onToggleCollapse}
          className={`
            hidden lg:block fixed bottom-4 left-4 z-30
            w-10 h-10 ${getButtonGradient()} 
            rounded-xl shadow-lg flex items-center justify-center text-white
            hover:shadow-xl transition-all duration-300
          `}
          title="Expand Menu"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      )}
    </>
  );
} 