

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

// export default function Sidebar({ isCollapsed, onToggleCollapse }) {
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
//       <div z
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
//         <div className={`px-4 py-2 pt-4 border-b ${getSidebarBorder()}`}>
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
//         <button
//           disabled
//           className={`lg:hidden fixed top-4 left-4 z-50 p-2 ${getButtonGradient()} text-white rounded-xl shadow-lg opacity-50`}
//         >
//           <Menu className="h-5 w-5" />
//         </button>

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
//       <button
//         onClick={() => setIsMobileOpen(true)}
//         className={`lg:hidden fixed top-4 left-4 z-50 p-2 ${getButtonGradient()} text-white rounded-xl shadow-lg`}
//       >
//         <Menu className="h-5 w-5" />
//       </button>

//       {/* Mobile Overlay */}
//       {/* {isMobileOpen && (
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
//       )} */}
//       {isMobileOpen && (
//   <div className="lg:hidden fixed inset-0 z-50 bg-black/60"
//        onClick={() => setIsMobileOpen(false)}>
//     <aside
//       className="w-72 h-full"
//       onClick={e => e.stopPropagation()}
//     >
//       <SidebarContent isMobile />
//     </aside>
//   </div>
// )}


//       {/* Desktop Sidebar */}
//       <aside className={`
//         hidden lg:flex lg:fixed lg:inset-y-0 lg:left-0 lg:flex-col
       
//   fixed inset-y-0 left-0
//   transition-all
//   // ${isCollapsed ? 'w-20' : 'w-64'}
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


// 'use client';

// import React, { useState, useEffect, useMemo, useRef } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { 
//   Menu, X, ChevronDown, ChevronRight, Home, Settings, 
//   Building, Bell, LogOut, Loader2, AlertCircle
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
//   const { theme, refreshTheme } = useTheme();
//   const { logout, user: authUser } = useAuth();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [openMenus, setOpenMenus] = useState({});
//   const [isMobileOpen, setIsMobileOpen] = useState(false);
//   const [hoveredMenu, setHoveredMenu] = useState(null);
//   const [hoveredMenuPosition, setHoveredMenuPosition] = useState({ top: 0, left: 0 });
//   const [hoverTimeout, setHoverTimeout] = useState(null);
//   const [showExpandButton, setShowExpandButton] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);
//   const [apiPermissions, setApiPermissions] = useState(null); // Start as null
//   const [prevUser, setPrevUser] = useState(null);
//   const [apiError, setApiError] = useState(false);
//   const [apiErrorMessage, setApiErrorMessage] = useState('');
  
//   const menuItemRefs = useRef({});
//   const floatingSubmenuRef = useRef(null);

//   const currentUser = authUser || {};
  
//   // Fetch permissions from API
//   useEffect(() => {
//     const fetchPermissionsFromAPI = async () => {
//       if (!currentUser?.company_code) {
//         console.log('No company code found');
//         setIsLoading(false);
//         return;
//       }

//       try {
//         setIsLoading(true);
//         setApiError(false);
//         setApiErrorMessage('');
        
//         const token = localStorage.getItem('authToken');
//         if (!token) {
//           console.log('No auth token found');
//           setApiError(true);
//           setApiErrorMessage('No authentication token');
//           setIsLoading(false);
//           return;
//         }

//         console.log('Fetching permissions for:', currentUser.company_code);
//           console.log('token:',token );
        
//         const response = await fetch(
//           'https://hr.hinzah.com/api/company/permissions',
//           {
//             method: 'GET',
//             headers: {
//               'Authorization': `Bearer ${token}`,
//               'Content-Type': 'application/json',
//               'Accept': 'application/json',
//             },
//           }
//         );

//         console.log('API Response Status:', response.status);

//         if (response.status === 401) {
//           setApiError(true);
//           setApiErrorMessage('Unauthorized - Token may be invalid or expired');
//           setApiPermissions(null); // Clear API permissions
//           setIsLoading(false);
//           return;
//         }

//         if (!response.ok) {
//           setApiError(true);
//           setApiErrorMessage(`API Error: ${response.status}`);
//           setApiPermissions(null); // Clear API permissions
//           setIsLoading(false);
//           return;
//         }

//         const data = await response.json();
//         console.log('API Response Data:', data);
        
//         // Store the permissions from API response
//         // According to your Postman image: { permissions: { "Base": { "Company": { "view": true } } } }
//         if (data.permissions) {
//           setApiPermissions(data.permissions);
//           console.log('API Permissions set:', data.permissions);
//           setApiError(false);
//         } else if (data) {
//           // If permissions is directly in data
//           setApiPermissions(data);
//           console.log('API Permissions set (direct):', data);
//           setApiError(false);
//         } else {
//           console.warn('No permissions data found in response');
//           setApiPermissions(null);
//           setApiError(true);
//           setApiErrorMessage('No permissions data in response');
//         }
//       } catch (error) {
//         console.error('Error fetching permissions:', error);
//         setApiError(true);
//         setApiErrorMessage(error.message);
//         setApiPermissions(null);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchPermissionsFromAPI();
//   }, [currentUser?.company_code]);

//   // Force theme refresh when user changes
//   useEffect(() => {
//     const checkUserChange = async () => {
//       if (prevUser?.id !== currentUser?.id) {
//         setIsLoading(true);
        
//         if (refreshTheme) {
//           await refreshTheme();
//         }
        
//         setTimeout(() => {
//           setIsLoading(false);
//         }, 500);
        
//         setPrevUser(currentUser);
//       } else if (prevUser === null && currentUser) {
//         setIsLoading(false);
//         setPrevUser(currentUser);
//       }
//     };
    
//     checkUserChange();
//   }, [currentUser, refreshTheme]);

//   // CRITICAL: Only use API permissions when available and valid
//   // If API returns 401 or error, DO NOT fall back to any other permissions
//   const permissions = useMemo(() => {
//     // If API call was successful and returned permissions
//     if (!apiError && apiPermissions !== null && Object.keys(apiPermissions).length > 0) {
//       console.log('✅ Using API permissions:', apiPermissions);
//       return apiPermissions;
//     } else {
//       // If API failed or returned no permissions, return empty object
//       console.log('❌ API failed or no permissions - returning empty permissions');
//       return {};
//     }
//   }, [apiPermissions, apiError]);

//   const isSuperAdmin = currentUser.role === 'superadmin';

//   // Theme detection
//   const isLightTheme = isLoading ? false : (theme?.type === 'light' || theme?.sidebarBg?.includes('white') || theme?.sidebarBg?.includes('gray-50'));

//   // Theme helper functions
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

//   // Check if user has view permission for a sub-item (based on API structure)
//   const canViewSubItem = (moduleName, subItemName) => {
//     if (isLoading) return false;
    
//     // IMPORTANT: If API failed, NO PERMISSIONS
//     if (apiError || apiPermissions === null) {
//       return false;
//     }
    
//     // Check if module exists in permissions
//     if (!permissions[moduleName]) {
//       return false;
//     }
    
//     const modulePermissions = permissions[moduleName];
    
//     // According to your Postman image structure: permissions.Base.Company.view
//     // Check if subItemName exists as a key in modulePermissions
//     for (const [key, value] of Object.entries(modulePermissions)) {
//       if (key === subItemName && value && typeof value === 'object') {
//         // Check if view permission is true
//         return value.view === true;
//       }
//     }
    
//     return false;
//   };

//   // Check if user has any view permission in a module
//   const hasAnyPermissionInModule = (moduleName) => {
//     if (isLoading) return false;
    
//     // IMPORTANT: If API failed, NO PERMISSIONS
//     if (apiError || apiPermissions === null) {
//       return false;
//     }
    
//     // For superadmin, only show if API has permissions for this module
//     if (isSuperAdmin) {
//       // Super admin should only see modules that have permissions in API
//       const subItems = SUB_PERMISSIONS[moduleName] || [];
//       if (subItems.length === 0) return false;
      
//       // Check if any sub-item exists in API permissions
//       return subItems.some(sub => canViewSubItem(moduleName, sub.name));
//     }
    
//     // For regular users, check API permissions
//     if (!permissions[moduleName]) {
//       return false;
//     }
    
//     const modulePermissions = permissions[moduleName];
    
//     // Check if any sub-item has view permission
//     return Object.values(modulePermissions).some(
//       subItem => subItem && typeof subItem === 'object' && subItem.view === true
//     );
//   };

//   // Get visible sub-items for a module
//   const getVisibleSubItems = (moduleName) => {
//     if (isLoading) return [];
    
//     // IMPORTANT: If API failed, NO PERMISSIONS
//     if (apiError || apiPermissions === null) {
//       return [];
//     }
    
//     const subItems = SUB_PERMISSIONS[moduleName] || [];
    
//     return subItems.filter(sub => {
//       // Even super admin needs API permissions
//       return canViewSubItem(moduleName, sub.name);
//     });
//   };

//   // Filter modules based on API permissions
//   const dynamicMenu = useMemo(() => {
//     if (isLoading) return [];
    
//     // If API failed, return empty array (no modules)
//     if (apiError || apiPermissions === null) {
//       console.log('❌ API failed - showing NO modules');
//       return [];
//     }
    
//     console.log('✅ Filtering modules with API permissions:', permissions);
    
//     const filteredModules = MODULES.map(mod => {
//       // Check if user has any permission in this module
//       if (!hasAnyPermissionInModule(mod.name)) {
//         return null;
//       }

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
//         link: mappedSubItems[0]?.link || '#',
//         submenu: mappedSubItems,
//       };
//     }).filter(Boolean);
    
//     console.log('✅ Final dynamic menu from API:', filteredModules);
//     return filteredModules;
//   }, [permissions, isSuperAdmin, isLoading, apiError, apiPermissions]);

//   const menuData = useMemo(() => {
//     if (isLoading) {
//       return [
//         { label: 'Dashboard', icon: Home, link: '/dashboard', color: getTextAccent() }
//       ];
//     }
    
//     // If API failed, show only Dashboard and error message
//     if (apiError) {
//       console.log('⚠️ API failed - showing minimal menu');
//       return [
//         { label: 'Dashboard', icon: Home, link: '/dashboard', color: getTextAccent() },
//         { label: 'Settings', icon: Settings, link: '/settings', color: getSecondaryTextColor() },
//       ];
//     }
    
//     const data = [
//       { label: 'Dashboard', icon: Home, link: '/dashboard', color: getTextAccent() },
//       ...dynamicMenu,
//       { label: 'Settings', icon: Settings, link: '/settings', color: getSecondaryTextColor() },
//     ];
    
//     console.log('✅ Final menu data from API:', data);
//     return data;
//   }, [dynamicMenu, isLoading, apiError]);

//   const isActive = (path) => location.pathname.startsWith(path);

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
//                 <p className={`text-xs ${getSecondaryTextColor()} flex items-center gap-1`}>
//                   {currentUser.companyName || 'HR System'}
//                   {apiError && (
//                     <span className="text-red-500 flex items-center gap-1">
//                       <AlertCircle className="w-3 h-3" />
//                       API Error
//                     </span>
//                   )}
//                 </p>
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

//       {/* Show API error message */}
//       {apiError && (!isCollapsed || isMobile) && (
//         <div className="mx-4 mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
//           <p className="text-red-700 text-sm font-medium">Permissions Error</p>
//           <p className="text-red-600 text-xs mt-1">{apiErrorMessage}</p>
//           <button 
//             onClick={() => window.location.reload()}
//             className="mt-2 text-xs text-red-600 hover:text-red-800 underline"
//           >
//             Retry
//           </button>
//         </div>
//       )}

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
//                       handleMenuHover(item.label, e);
//                     } else if (!isCollapsed && hasSubmenu) {
//                       setOpenMenus(prev => ({ ...prev, [item.label]: !prev[item.label] }));
//                     } else {
//                       navigate(item.link);
//                       if (isMobile) setIsMobileOpen(false);
//                     }
//                   }}
//                   onMouseEnter={(e) => handleMenuHover(item.label, e)}
//                   // onMouseLeave={handleMenuLeave}
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
//               </li>
//             );
//           })}
//         </ul>
        
//         {/* Show message if no modules from API */}
//         {!isLoading && !apiError && dynamicMenu.length === 0 && (
//           <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
//             <p className="text-yellow-700 text-sm">No permissions granted from API</p>
//           </div>
//         )}
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
//         <button
//           disabled
//           className={`lg:hidden fixed top-4 left-4 z-50 p-2 ${getButtonGradient()} text-white rounded-xl shadow-lg opacity-50`}
//         >
//           <Menu className="h-5 w-5" />
//         </button>

//         <aside className={`
//           hidden lg:flex lg:fixed lg:inset-y-0 lg:left-0 lg:flex-col
//           ${getSidebarBg()} ${getSidebarText()}
//           transition-all duration-300 z-40 shadow-2xl border-r ${getSidebarBorder()}
//           ${isCollapsed ? 'w-20' : 'w-64'}
//         `}>
//           <div className="h-full flex flex-col">
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
//           </div>
//         </aside>
//       </>
//     );
//   }

//   return (
//     <>
//       <button
//         onClick={() => setIsMobileOpen(true)}
//         className={`lg:hidden fixed top-4 left-4 z-50 p-2 ${getButtonGradient()} text-white rounded-xl shadow-lg`}
//       >
//         <Menu className="h-5 w-5" />
//       </button>

//       {isMobileOpen && (
//         <div className="lg:hidden fixed inset-0 z-50 bg-black/60"
//              onClick={() => setIsMobileOpen(false)}>
//           <aside
//             className="w-72 h-full"
//             onClick={e => e.stopPropagation()}
//           >
//             <SidebarContent isMobile />
//           </aside>
//         </div>
//       )}

//       <aside className={`
//         hidden lg:flex lg:fixed lg:inset-y-0 lg:left-0 lg:flex-col
//         fixed inset-y-0 left-0
//         transition-all
//         ${getSidebarBg()} ${getSidebarText()}
//         transition-all duration-300 z-40 shadow-2xl border-r ${getSidebarBorder()}
//         ${isCollapsed ? 'w-20' : 'w-64'}
//         hover:z-50
//       `}>
//         <SidebarContent />
//       </aside>
//     </>
//   );
// }


















// 'use client';

// import React, { useState, useEffect, useMemo, useRef } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { 
//   Menu, X, ChevronDown, ChevronRight, Home, Settings, 
//   Building, Bell, LogOut, Loader2, AlertCircle
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
//   const { theme, refreshTheme } = useTheme();
//   const { logout, user: authUser } = useAuth();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [openMenus, setOpenMenus] = useState({});
//   const [isMobileOpen, setIsMobileOpen] = useState(false);
//   const [hoveredMenu, setHoveredMenu] = useState(null);
//   const [hoveredMenuPosition, setHoveredMenuPosition] = useState({ top: 0, left: 0 });
//   const [hoverTimeout, setHoverTimeout] = useState(null);
//   const [showExpandButton, setShowExpandButton] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);
//   const [apiPermissions, setApiPermissions] = useState(null);
//   const [prevUser, setPrevUser] = useState(null);
//   const [apiError, setApiError] = useState(false);
//   const [apiErrorMessage, setApiErrorMessage] = useState('');
  
//   const menuItemRefs = useRef({});
//   const floatingSubmenuRef = useRef(null);
//   const sidebarRef = useRef(null);

//   const currentUser = authUser || {};
  
//   // Fetch permissions from API
//   useEffect(() => {
//     const fetchPermissionsFromAPI = async () => {
//       if (!currentUser?.company_code) {
//         console.log('No company code found');
//         setIsLoading(false);
//         return;
//       }

//       try {
//         setIsLoading(true);
//         setApiError(false);
//         setApiErrorMessage('');
        
//         const token = localStorage.getItem('authToken');
//         if (!token) {
//           console.log('No auth token found');
//           setApiError(true);
//           setApiErrorMessage('No authentication token');
//           setIsLoading(false);
//           return;
//         }

//         console.log('Fetching permissions for:', currentUser.company_code);
//         console.log('token:', token);
        
//         const response = await fetch(
//           'https://hr.hinzah.com/api/company/permissions',
//           {
//             method: 'GET',
//             headers: {
//               'Authorization': `Bearer ${token}`,
//               'Content-Type': 'application/json',
//               'Accept': 'application/json',
//             },
//           }
//         );

//         console.log('API Response Status:', response.status);

//         if (response.status === 401) {
//           setApiError(true);
//           setApiErrorMessage('Unauthorized - Token may be invalid or expired');
//           setApiPermissions(null);
//           setIsLoading(false);
//           return;
//         }

//         if (!response.ok) {
//           setApiError(true);
//           setApiErrorMessage(`API Error: ${response.status}`);
//           setApiPermissions(null);
//           setIsLoading(false);
//           return;
//         }

//         const data = await response.json();
//         console.log('API Response Data:', data);
        
//         if (data.permissions) {
//           setApiPermissions(data.permissions);
//           console.log('API Permissions set:', data.permissions);
//           setApiError(false);
//         } else if (data) {
//           setApiPermissions(data);
//           console.log('API Permissions set (direct):', data);
//           setApiError(false);
//         } else {
//           console.warn('No permissions data found in response');
//           setApiPermissions(null);
//           setApiError(true);
//           setApiErrorMessage('No permissions data in response');
//         }
//       } catch (error) {
//         console.error('Error fetching permissions:', error);
//         setApiError(true);
//         setApiErrorMessage(error.message);
//         setApiPermissions(null);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchPermissionsFromAPI();
//   }, [currentUser?.company_code]);

//   // Force theme refresh when user changes
//   useEffect(() => {
//     const checkUserChange = async () => {
//       if (prevUser?.id !== currentUser?.id) {
//         setIsLoading(true);
        
//         if (refreshTheme) {
//           await refreshTheme();
//         }
        
//         setTimeout(() => {
//           setIsLoading(false);
//         }, 500);
        
//         setPrevUser(currentUser);
//       } else if (prevUser === null && currentUser) {
//         setIsLoading(false);
//         setPrevUser(currentUser);
//       }
//     };
    
//     checkUserChange();
//   }, [currentUser, refreshTheme]);

//   // CRITICAL: Only use API permissions when available and valid
//   const permissions = useMemo(() => {
//     if (!apiError && apiPermissions !== null && Object.keys(apiPermissions).length > 0) {
//       console.log('✅ Using API permissions:', apiPermissions);
//       return apiPermissions;
//     } else {
//       console.log('❌ API failed or no permissions - returning empty permissions');
//       return {};
//     }
//   }, [apiPermissions, apiError]);

//   const isSuperAdmin = currentUser.role === 'superadmin';

//   // Theme detection
//   const isLightTheme = isLoading ? false : (theme?.type === 'light' || theme?.sidebarBg?.includes('white') || theme?.sidebarBg?.includes('gray-50'));

//   // Theme helper functions
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

//   // Check if user has view permission for a sub-item
//   const canViewSubItem = (moduleName, subItemName) => {
//     if (isLoading) return false;
    
//     if (apiError || apiPermissions === null) {
//       return false;
//     }
    
//     if (!permissions[moduleName]) {
//       return false;
//     }
    
//     const modulePermissions = permissions[moduleName];
    
//     for (const [key, value] of Object.entries(modulePermissions)) {
//       if (key === subItemName && value && typeof value === 'object') {
//         return value.view === true;
//       }
//     }
    
//     return false;
//   };

//   // Check if user has any view permission in a module
//   const hasAnyPermissionInModule = (moduleName) => {
//     if (isLoading) return false;
    
//     if (apiError || apiPermissions === null) {
//       return false;
//     }
    
//     if (isSuperAdmin) {
//       const subItems = SUB_PERMISSIONS[moduleName] || [];
//       if (subItems.length === 0) return false;
      
//       return subItems.some(sub => canViewSubItem(moduleName, sub.name));
//     }
    
//     if (!permissions[moduleName]) {
//       return false;
//     }
    
//     const modulePermissions = permissions[moduleName];
    
//     return Object.values(modulePermissions).some(
//       subItem => subItem && typeof subItem === 'object' && subItem.view === true
//     );
//   };

//   // Get visible sub-items for a module
//   const getVisibleSubItems = (moduleName) => {
//     if (isLoading) return [];
    
//     if (apiError || apiPermissions === null) {
//       return [];
//     }
    
//     const subItems = SUB_PERMISSIONS[moduleName] || [];
    
//     return subItems.filter(sub => {
//       return canViewSubItem(moduleName, sub.name);
//     });
//   };

//   // Filter modules based on API permissions
//   const dynamicMenu = useMemo(() => {
//     if (isLoading) return [];
    
//     if (apiError || apiPermissions === null) {
//       console.log('❌ API failed - showing NO modules');
//       return [];
//     }
    
//     console.log('✅ Filtering modules with API permissions:', permissions);
    
//     const filteredModules = MODULES.map(mod => {
//       if (!hasAnyPermissionInModule(mod.name)) {
//         return null;
//       }

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

//       const visibleSubItems = getVisibleSubItems(mod.name);
      
//       if (visibleSubItems.length === 0) {
//         return null;
//       }

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
//         link: mappedSubItems[0]?.link || '#',
//         submenu: mappedSubItems,
//       };
//     }).filter(Boolean);
    
//     console.log('✅ Final dynamic menu from API:', filteredModules);
//     return filteredModules;
//   }, [permissions, isSuperAdmin, isLoading, apiError, apiPermissions]);

//   const menuData = useMemo(() => {
//     if (isLoading) {
//       return [
//         { label: 'Dashboard', icon: Home, link: '/dashboard', color: getTextAccent() }
//       ];
//     }
    
//     if (apiError) {
//       console.log('⚠️ API failed - showing minimal menu');
//       return [
//         { label: 'Dashboard', icon: Home, link: '/dashboard', color: getTextAccent() },
//         { label: 'Settings', icon: Settings, link: '/settings', color: getSecondaryTextColor() },
//       ];
//     }
    
//     const data = [
//       { label: 'Dashboard', icon: Home, link: '/dashboard', color: getTextAccent() },
//       ...dynamicMenu,
//       { label: 'Settings', icon: Settings, link: '/settings', color: getSecondaryTextColor() },
//     ];
    
//     console.log('✅ Final menu data from API:', data);
//     return data;
//   }, [dynamicMenu, isLoading, apiError]);

//   const isActive = (path) => location.pathname.startsWith(path);

//   // Handle menu hover for floating submenus
//   const handleMenuHover = (menuLabel, e) => {
//     if (!isCollapsed) return;
    
//     clearTimeout(hoverTimeout);
    
//     const timeoutId = setTimeout(() => {
//       setHoveredMenu(menuLabel);
      
//       const menuItem = menuItemRefs.current[menuLabel];
//       if (menuItem) {
//         const rect = menuItem.getBoundingClientRect();
//         setHoveredMenuPosition({
//           top: rect.top,
//           left: rect.right + 8,
//         });
//       }
//     }, 150);
    
//     setHoverTimeout(timeoutId);
//   };

//   const handleMenuLeave = () => {
//     clearTimeout(hoverTimeout);
    
//     const timeoutId = setTimeout(() => {
//       setHoveredMenu(null);
//     }, 200);
    
//     setHoverTimeout(timeoutId);
//   };

//   // Handle submenu item click
//   const handleSubmenuItemClick = (link) => {
//     navigate(link);
//     setOpenMenus({});
//     if (isMobileOpen) setIsMobileOpen(false);
//   };

//   // Toggle menu open/close
//   const toggleMenu = (menuLabel) => {
//     setOpenMenus(prev => ({
//       ...prev,
//       [menuLabel]: !prev[menuLabel]
//     }));
//   };

//   // Handle main menu item click
//   const handleMenuItemClick = (item) => {
//     if (item.submenu?.length > 0) {
//       if (isCollapsed) {
//         // For collapsed sidebar, show floating submenu on hover
//         return;
//       } else {
//         // For expanded sidebar, toggle dropdown
//         toggleMenu(item.label);
//       }
//     } else {
//       navigate(item.link);
//       if (isMobileOpen) setIsMobileOpen(false);
//     }
//   };

//   const SidebarContent = ({ isMobile = false }) => (
//     <div className={`h-full flex flex-col ${isMobile ? 'w-72' : ''}`} ref={sidebarRef}>
//       {/* Header - Fixed at top */}
//       <div className={`flex-none ${getSidebarBorder()} border-b`}>
//         <div className="p-6">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-3">
//               <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${getFromColorClass()} ${getToColorClass()} shadow-lg flex items-center justify-center`}>
//                 {currentUser.logo ? (
//                   <img src={currentUser.logo} alt="logo" className="w-8 h-8 rounded-lg object-contain" />
//                 ) : (
//                   <Building className="h-5 w-5 text-white" />
//                 )}
//               </div>
//               {(!isCollapsed || isMobile) && (
//                 <div>
//                   <h1 className={`text-lg font-bold ${getPrimaryTextColor()}`}>HRMS Pro</h1>
//                   <p className={`text-xs ${getSecondaryTextColor()} flex items-center gap-1`}>
//                     {currentUser.companyName || 'HR System'}
//                     {apiError && (
//                       <span className="text-red-500 flex items-center gap-1">
//                         <AlertCircle className="w-3 h-3" />
//                         API Error
//                       </span>
//                     )}
//                   </p>
//                 </div>
//               )}
//             </div>
//             {(!isCollapsed || isMobile) && (
//               <button
//                 onClick={() => isMobile ? setIsMobileOpen(false) : onToggleCollapse()}
//                 className={`p-2 ${isLightTheme ? 'hover:bg-gray-100' : 'hover:bg-white/10'} rounded-lg transition-colors`}
//               >
//                 <X className={`h-5 w-5 ${getSecondaryTextColor()}`} />
//               </button>
//             )}
//           </div>
//         </div>

//         {/* Show API error message */}
//         {apiError && (!isCollapsed || isMobile) && (
//           <div className="mx-4 mb-3 p-3 bg-red-50 border border-red-200 rounded-lg">
//             <p className="text-red-700 text-sm font-medium">Permissions Error</p>
//             <p className="text-red-600 text-xs mt-1">{apiErrorMessage}</p>
//             <button 
//               onClick={() => window.location.reload()}
//               className="mt-2 text-xs text-red-600 hover:text-red-800 underline"
//             >
//               Retry
//             </button>
//           </div>
//         )}
//       </div>

//       {/* Scrollable Menu Area */}
//       <div className="flex-1 min-h-0 overflow-hidden">
//         <div className="h-full overflow-y-auto overflow-x-hidden hover:overflow-y-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-transparent">
//           <nav className="py-4 px-3">
//             <ul className="space-y-1">
//               {menuData.map(item => {
//                 const Icon = item.icon;
//                 const hasSubmenu = item.submenu?.length > 0;
//                 const isOpen = openMenus[item.label];
//                 const active = isActive(item.link);
//                 const isHovered = hoveredMenu === item.label;
//                 const showFloatingSubmenu = isCollapsed && isHovered && hasSubmenu;
//                 const IconComponent = Icon;

//                 return (
//                   <li 
//                     key={item.label} 
//                     className="relative"
//                     ref={(el) => menuItemRefs.current[item.label] = el}
//                   >
//                     <div
//                       onClick={() => handleMenuItemClick(item)}
//                       onMouseEnter={(e) => handleMenuHover(item.label, e)}
//                       onMouseLeave={handleMenuLeave}
//                       className={`
//                         group flex items-center justify-between px-3 py-2.5 rounded-xl 
//                         cursor-pointer transition-all duration-200 select-none
//                         ${active ? getSidebarActive() : getSidebarHover()}
//                         ${active ? 'shadow-lg' : ''}
//                         ${isCollapsed ? 'justify-center px-2' : ''}
//                       `}
//                     >
//                       {/* Active indicator */}
//                       {active && !isCollapsed && (
//                         <div className={`absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-6 bg-gradient-to-b ${getFromColorClass()} ${getToColorClass()} rounded-r-full`}></div>
//                       )}

//                       <div className="flex items-center gap-3 flex-1">
//                         <div className={`p-1.5 rounded-lg ${item.color} ${isLightTheme ? 'bg-gray-100' : 'bg-gray-800/50'}`}>
//                           <IconComponent className="h-4 w-4" />
//                         </div>
//                         {(!isCollapsed || isMobile) && (
//                           <div className="flex-1 min-w-0">
//                             <span className={`font-medium text-sm truncate ${active ? (isLightTheme ? 'text-gray-900' : 'text-white') : getPrimaryTextColor()}`}>
//                               {item.label}
//                             </span>
//                             {hasSubmenu && item.submenu && (!isCollapsed || isMobile) && (
//                               <p className={`text-xs ${getSecondaryTextColor()} mt-0.5`}>
//                                 {item.submenu.length} items
//                               </p>
//                             )}
//                           </div>
//                         )}
//                       </div>
                      
//                       {hasSubmenu && (!isCollapsed || isMobile) && (
//                         <button
//                           onClick={(e) => {
//                             e.stopPropagation();
//                             toggleMenu(item.label);
//                           }}
//                           className="ml-2 p-1 hover:bg-white/10 rounded"
//                         >
//                           {isOpen ? (
//                             <ChevronDown className={`h-4 w-4 ${getSecondaryTextColor()}`} />
//                           ) : (
//                             <ChevronRight className={`h-4 w-4 ${getSecondaryTextColor()}`} />
//                           )}
//                         </button>
//                       )}
//                     </div>

//                     {/* Dropdown submenu for expanded sidebar */}
//                     {!isCollapsed && isOpen && hasSubmenu && item.submenu && (
//                       <div className="ml-8 mt-1 space-y-1">
//                         {item.submenu.map((subItem) => {
//                           const SubIcon = subItem.icon;
//                           const isSubActive = isActive(subItem.link);
                          
//                           return (
//                             <div
//                               key={subItem.key}
//                               onClick={() => handleSubmenuItemClick(subItem.link)}
//                               className={`
//                                 flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer
//                                 transition-all duration-150 select-none
//                                 ${isSubActive ? getSidebarActive() : getSidebarHover()}
//                                 ${isSubActive ? 'shadow-md' : ''}
//                               `}
//                             >
//                               <SubIcon className={`h-3 w-3 ${getSecondaryTextColor()}`} />
//                               <span className={`text-sm ${isSubActive ? 'font-medium text-white' : getSecondaryTextColor()}`}>
//                                 {subItem.label}
//                               </span>
//                             </div>
//                           );
//                         })}
//                       </div>
//                     )}

//                     {/* Floating submenu for collapsed sidebar */}
//                     {showFloatingSubmenu && isCollapsed && (
//                       <div
//                         ref={floatingSubmenuRef}
//                         className={`fixed z-50 w-48 rounded-xl shadow-2xl border ${getSidebarBorder()} ${getSidebarBg()}`}
//                         style={{
//                           top: `${hoveredMenuPosition.top}px`,
//                           left: `${hoveredMenuPosition.left}px`,
//                         }}
//                         onMouseEnter={() => clearTimeout(hoverTimeout)}
//                         onMouseLeave={handleMenuLeave}
//                       >
//                         <div className="p-2">
//                           <div className="px-3 py-2 mb-1 border-b border-gray-700/50">
//                             <p className={`font-semibold text-sm ${getPrimaryTextColor()}`}>
//                               {item.label}
//                             </p>
//                           </div>
//                           <div className="space-y-1">
//                             {item.submenu.map((subItem) => (
//                               <div
//                                 key={subItem.key}
//                                 onClick={() => handleSubmenuItemClick(subItem.link)}
//                                 className={`
//                                   flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer
//                                   hover:bg-white/10 transition-colors select-none
//                                 `}
//                               >
//                                 <ChevronRight className={`h-3 w-3 ${getSecondaryTextColor()}`} />
//                                 <span className={`text-sm ${getPrimaryTextColor()}`}>
//                                   {subItem.label}
//                                 </span>
//                               </div>
//                             ))}
//                           </div>
//                         </div>
//                       </div>
//                     )}
//                   </li>
//                 );
//               })}
//             </ul>
            
//             {/* Show message if no modules from API */}
//             {!isLoading && !apiError && dynamicMenu.length === 0 && (
//               <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
//                 <p className="text-yellow-700 text-sm">No permissions granted from API</p>
//               </div>
//             )}
//           </nav>
//         </div>
//       </div>

//       {/* User Profile & Footer - Fixed at bottom */}
//       <div className={`flex-none border-t ${getSidebarBorder()}`}>
//         <div className="p-4">
//           <div className="flex items-center gap-3 mb-4">
//             <div className="relative">
//               <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${getFromColorClass()} ${getToColorClass()} flex items-center justify-center shadow-lg`}>
//                 <span className="text-white font-bold">
//                   {currentUser.username?.[0]?.toUpperCase() || 'U'}
//                 </span>
//               </div>
//               <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
//             </div>
//             {(!isCollapsed || isMobile) && (
//               <div className="flex-1 min-w-0">
//                 <p className={`font-semibold text-sm ${getPrimaryTextColor()} truncate`}>
//                   {currentUser.username || 'User'}
//                 </p>
//                 <p className={`text-xs ${getSecondaryTextColor()} truncate`}>
//                   {isSuperAdmin ? 'Super Admin' : currentUser.role || 'Employee'}
//                 </p>
//               </div>
//             )}
//           </div>

//           {(!isCollapsed || isMobile) && (
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
//                 className={`flex-1 px-3 py-1.5 bg-gradient-to-r ${getFromColorClass()}/10 ${getToColorClass()}/10 hover:bg-gradient-to-r ${getFromColorClass()}/20 ${getToColorClass()}/20 rounded-lg text-xs ${getTextAccent()} flex items-center justify-center gap-1`}
//               >
//                 <LogOut className="h-3 w-3" />
//                 Logout
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );

//   // Show loading state
//   if (isLoading) {
//     return (
//       <>
//         <button
//           disabled
//           className={`lg:hidden fixed top-4 left-4 z-50 p-2 ${getButtonGradient()} text-white rounded-xl shadow-lg opacity-50`}
//         >
//           <Menu className="h-5 w-5" />
//         </button>

//         <aside className={`
//           hidden lg:flex lg:fixed lg:inset-y-0 lg:left-0 lg:flex-col
//           ${getSidebarBg()} ${getSidebarText()}
//           transition-all duration-300 z-40 shadow-2xl border-r ${getSidebarBorder()}
//           ${isCollapsed ? 'w-20' : 'w-64'}
//           h-screen
//         `}>
//           <div className="h-full flex flex-col">
//             <div className={`flex-none p-6 border-b ${getSidebarBorder()}`}>
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
//           </div>
//         </aside>
//       </>
//     );
//   }

//   return (
//     <>
//       <button
//         onClick={() => setIsMobileOpen(true)}
//         className={`lg:hidden fixed top-4 left-4 z-50 p-2 ${getButtonGradient()} text-white rounded-xl shadow-lg`}
//       >
//         <Menu className="h-5 w-5" />
//       </button>

//       {isMobileOpen && (
//         <div 
//           className="lg:hidden fixed inset-0 z-50 bg-black/60"
//           onClick={() => setIsMobileOpen(false)}
//         >
//           <aside
//             className="w-72 h-screen"
//             onClick={e => e.stopPropagation()}
//           >
//             <SidebarContent isMobile />
//           </aside>
//         </div>
//       )}

//       <aside 
//         className={`
//           hidden lg:flex lg:fixed lg:inset-y-0 lg:left-0 lg:flex-col
//           ${getSidebarBg()} ${getSidebarText()}
//           transition-all duration-300 z-40 shadow-2xl border-r ${getSidebarBorder()}
//           ${isCollapsed ? 'w-20' : 'w-64'}
//           h-screen
//         `}
//         onMouseLeave={handleMenuLeave}
//       >
//         <SidebarContent />
//       </aside>
//     </>
//   );
// }






'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  Menu, X, ChevronDown, ChevronRight, Home, Settings, 
  Building, Bell, LogOut, Loader2, AlertCircle
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
  const { theme, refreshTheme } = useTheme();
  const { logout, user: authUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [openMenus, setOpenMenus] = useState({});
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [hoveredMenu, setHoveredMenu] = useState(null);
  const [showExpandButton, setShowExpandButton] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [apiPermissions, setApiPermissions] = useState(null);
  const [prevUser, setPrevUser] = useState(null);
  const [apiError, setApiError] = useState(false);
  const [apiErrorMessage, setApiErrorMessage] = useState('');
  
  const menuItemRefs = useRef({});
  const floatingSubmenuRef = useRef(null);
  const sidebarRef = useRef(null);
  const sidebarContentRef = useRef(null);

  const currentUser = authUser || {};
  
  // Fetch permissions from API
  useEffect(() => {
    const fetchPermissionsFromAPI = async () => {
      if (!currentUser?.company_code) {
        console.log('No company code found');
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setApiError(false);
        setApiErrorMessage('');
        
        const token = localStorage.getItem('authToken');
        if (!token) {
          console.log('No auth token found');
          setApiError(true);
          setApiErrorMessage('No authentication token');
          setIsLoading(false);
          return;
        }

        const response = await fetch(
          'https://hr.hinzah.com/api/company/permissions',
          {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
              'Accept': 'application/json',
            },
          }
        );

        if (response.status === 401) {
          setApiError(true);
          setApiErrorMessage('Unauthorized - Token may be invalid or expired');
          setApiPermissions(null);
          setIsLoading(false);
          return;
        }

        if (!response.ok) {
          setApiError(true);
          setApiErrorMessage(`API Error: ${response.status}`);
          setApiPermissions(null);
          setIsLoading(false);
          return;
        }

        const data = await response.json();
        
        if (data.permissions) {
          setApiPermissions(data.permissions);
          setApiError(false);
        } else if (data) {
          setApiPermissions(data);
          setApiError(false);
        } else {
          setApiPermissions(null);
          setApiError(true);
          setApiErrorMessage('No permissions data in response');
        }
      } catch (error) {
        console.error('Error fetching permissions:', error);
        setApiError(true);
        setApiErrorMessage(error.message);
        setApiPermissions(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPermissionsFromAPI();
  }, [currentUser?.company_code]);

  // Force theme refresh when user changes
  useEffect(() => {
    const checkUserChange = async () => {
      if (prevUser?.id !== currentUser?.id) {
        setIsLoading(true);
        
        if (refreshTheme) {
          await refreshTheme();
        }
        
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
        
        setPrevUser(currentUser);
      } else if (prevUser === null && currentUser) {
        setIsLoading(false);
        setPrevUser(currentUser);
      }
    };
    
    checkUserChange();
  }, [currentUser, refreshTheme]);

  // CRITICAL: Only use API permissions when available and valid
  const permissions = useMemo(() => {
    if (!apiError && apiPermissions !== null && Object.keys(apiPermissions).length > 0) {
      return apiPermissions;
    } else {
      return currentUser.permissions || {};
    }
  }, [apiPermissions, apiError, currentUser.permissions]);

  const isSuperAdmin = currentUser.role === 'superadmin';

  // Theme detection
  const isLightTheme = isLoading ? false : (theme?.type === 'light' || theme?.sidebarBg?.includes('white') || theme?.sidebarBg?.includes('gray-50'));

  // Theme helper functions
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
      const sidebar = sidebarRef.current;
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

  // SIMPLE HOVER HANDLERS - NO SCROLL LOGIC
  const handleMenuHover = (menuLabel) => {
    if (isCollapsed && !isLoading) {
      setTimeout(() => {
        setHoveredMenu(menuLabel);
        setShowExpandButton(true);
      }, 150);
    }
  };

  const handleMenuLeave = () => {
    if (isCollapsed && !isLoading) {
      setTimeout(() => {
        setHoveredMenu(null);
      }, 200);
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
    
    if (isSuperAdmin) {
      if (!permissions[moduleName]) return false;
      const subItemPermissions = permissions[moduleName][subItemName];
      if (!subItemPermissions) return false;
      return subItemPermissions.view === true;
    }
    
    if (!permissions[moduleName]) return false;
    
    const subItemPermissions = permissions[moduleName][subItemName];
    if (!subItemPermissions) return false;
    
    return subItemPermissions.view === true;
  };

  // Check if user has any view permission in a module
  const hasAnyPermissionInModule = (moduleName) => {
    if (isLoading) return false;
    
    if (isSuperAdmin) {
      const subItems = SUB_PERMISSIONS[moduleName] || [];
      if (subItems.length === 0) return false;
      
      return subItems.some(sub => canViewSubItem(moduleName, sub.name));
    }
    
    if (!permissions[moduleName]) return false;
    
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
      return canViewSubItem(moduleName, sub.name);
    });
  };

  // Filter modules based on API permissions
  const dynamicMenu = useMemo(() => {
    if (isLoading) return [];
    
    if (apiError && apiPermissions === null) {
      return [];
    }
    
    const filteredModules = MODULES.map(mod => {
      if (!hasAnyPermissionInModule(mod.name)) {
        return null;
      }

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

      const visibleSubItems = getVisibleSubItems(mod.name);
      
      if (visibleSubItems.length === 0) {
        return null;
      }

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
        link: mappedSubItems[0]?.link || '#',
        submenu: mappedSubItems,
      };
    }).filter(Boolean);
    
    return filteredModules;
  }, [permissions, isSuperAdmin, currentUser, isLoading, apiError, apiPermissions]);

  const menuData = useMemo(() => {
    if (isLoading) {
      return [
        { label: 'Dashboard', icon: Home, link: '/dashboard', color: getTextAccent() }
      ];
    }
    
    if (apiError && apiPermissions === null) {
      return [
        { label: 'Dashboard', icon: Home, link: '/dashboard', color: getTextAccent() },
        { label: 'Settings', icon: Settings, link: '/settings', color: getSecondaryTextColor() },
      ];
    }
    
    const data = [
      { label: 'Dashboard', icon: Home, link: '/dashboard', color: getTextAccent() },
      ...dynamicMenu,
      { label: 'Settings', icon: Settings, link: '/settings', color: getSecondaryTextColor() },
    ];
    
    return data;
  }, [dynamicMenu, isLoading, apiError, apiPermissions]);

  const isActive = (path) => location.pathname.startsWith(path);

  // Floating Submenu Component for Collapsed State - SIMPLE FIXED POSITION
  const FloatingSubmenu = ({ menuItem: menuItemProp }) => {
    if (!menuItemProp || !menuItemProp.submenu || menuItemProp.submenu.length === 0 || isLoading) return null;

    const menuItemEl = menuItemRefs.current[menuItemProp.label];
    if (!menuItemEl) return null;
    
    const menuItemRect = menuItemEl.getBoundingClientRect();
    
    const absoluteTop = menuItemRect.top;
    const absoluteLeft = menuItemRect.right + 8;
    
    const shouldPositionAbove = () => {
      if (typeof window === 'undefined') return false;
      const windowHeight = window.innerHeight;
      const submenuHeight = (menuItemProp.submenu.length * 44) + 60;
      return absoluteTop + submenuHeight > windowHeight - 20;
    };

    const positionStyle = {
      left: `${absoluteLeft}px`,
      top: shouldPositionAbove() 
        ? `${absoluteTop - ((menuItemProp.submenu.length * 44) + 60)}px`
        : `${absoluteTop}px`,
      position: 'fixed',
    };

    return (
      <div
        ref={floatingSubmenuRef}
        className={`
          w-56 rounded-xl shadow-2xl 
          border ${getSidebarBorder()} 
          ${isLightTheme ? 'bg-white' : 'bg-gray-900'} 
          py-2 z-50 animate-in slide-in-from-left-1 duration-200
          max-h-[80vh] overflow-y-auto
        `}
        style={positionStyle}
        onMouseEnter={() => setHoveredMenu(menuItemProp.label)}
        onMouseLeave={handleMenuLeave}
      >
        <div className={`px-4 py-2 pt-4 border-b ${getSidebarBorder()}`}>
          <div className="flex items-center gap-2">
            <div className={`p-1.5 rounded-lg ${menuItemProp.color} ${isLightTheme ? 'bg-gray-100' : 'bg-gray-800/50'}`}>
              {React.createElement(menuItemProp.icon || Home, { className: "h-4 w-4" })}
            </div>
            <span className={`font-medium text-sm ${getPrimaryTextColor()}`}>
              {menuItemProp.label}
            </span>
          </div>
        </div>

        <div className="py-2">
          {menuItemProp.submenu.map(sub => {
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
    <div className={`h-full flex flex-col ${isMobile ? 'w-72' : ''}`} ref={sidebarRef}>
      {/* Header */}
      <div className={`p-6 border-b ${getSidebarBorder()} flex-none`}>
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
                <p className={`text-xs ${getSecondaryTextColor()} flex items-center gap-1`}>
                  {currentUser.companyName || 'HR System'}
                  {apiError && (
                    <span className="text-red-500 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      API Error
                    </span>
                  )}
                </p>
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
        
        {apiError && (!isCollapsed || isMobile) && (
          <div className="mt-3 p-2 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-700 text-xs font-medium">Permissions Error</p>
            <p className="text-red-600 text-xs mt-1">{apiErrorMessage}</p>
            <button 
              onClick={() => window.location.reload()}
              className="mt-1 text-xs text-red-600 hover:text-red-800 underline"
            >
              Retry
            </button>
          </div>
        )}
      </div>

      {/* Menu Items - SIMPLIFIED, NO AUTO SCROLL */}
      <div 
        className="flex-1 overflow-y-auto" 
        ref={sidebarContentRef}
        style={{
          // CRITICAL: This prevents any automatic scroll
          overscrollBehavior: 'none',
          scrollBehavior: 'auto',
          WebkitOverflowScrolling: 'touch',
        }}
        onMouseMove={(e) => {
          // Prevent any default mouse behavior
          e.preventDefault();
          e.stopPropagation();
        }}
        onMouseEnter={(e) => {
          // Lock the scroll position
          if (sidebarContentRef.current) {
            sidebarContentRef.current.style.overflow = 'hidden';
            setTimeout(() => {
              if (sidebarContentRef.current) {
                sidebarContentRef.current.style.overflow = 'auto';
              }
            }, 100);
          }
        }}
      >
        <nav className="py-4 px-3">
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
                      e.preventDefault();
                      e.stopPropagation();
                      
                      if (isCollapsed && hasSubmenu) {
                        handleMenuHover(item.label);
                      } else if (!isCollapsed && hasSubmenu) {
                        setOpenMenus(prev => ({ ...prev, [item.label]: !prev[item.label] }));
                      } else {
                        navigate(item.link);
                        if (isMobile) setIsMobileOpen(false);
                      }
                    }}
                    onMouseEnter={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleMenuHover(item.label);
                    }}
                    onMouseLeave={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleMenuLeave();
                    }}
                    className={`
                      group flex items-center justify-between px-3 py-2.5 rounded-xl 
                      cursor-pointer transition-all duration-200
                      ${active ? getSidebarActive() : getSidebarHover()}
                      ${active ? 'shadow-lg' : ''}
                      ${isCollapsed ? 'justify-center px-2' : ''}
                    `}
                  >
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

                  {showFloatingSubmenu && (
                    <FloatingSubmenu menuItem={item} />
                  )}

                  {hasSubmenu && isOpen && !isCollapsed && !isMobile && (
                    <div className={`ml-8 mt-1 space-y-0.5 pl-3 border-l ${getSidebarBorder()}`}>
                      {item.submenu.map(sub => {
                        const SubIcon = sub.icon || ChevronRight;
                        const subActive = location.pathname === sub.link;
                        
                        return (
                          <button
                            key={sub.link}
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
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
          
          {!isLoading && !apiError && dynamicMenu.length === 0 && (
            <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-yellow-700 text-sm">No permissions granted from API</p>
              <p className="text-yellow-600 text-xs mt-1">Contact your administrator</p>
            </div>
          )}
        </nav>
      </div>

      {/* User Profile & Footer */}
      <div className={`p-4 border-t ${getSidebarBorder()} flex-none`}>
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
            <div className={`mb-3 px-3 py-2 ${isLightTheme ? 'bg-white/50' : 'bg-gray-800/50'} rounded-lg`}>
              <div className="flex items-center justify-between text-xs">
                <span className={getSecondaryTextColor()}>Status</span>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span className={`${isLightTheme ? 'text-green-700' : 'text-green-400'} font-medium`}>Active</span>
                </div>
              </div>
            </div>

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
        <button
          disabled
          className={`lg:hidden fixed top-4 left-4 z-50 p-2 ${getButtonGradient()} text-white rounded-xl shadow-lg opacity-50`}
        >
          <Menu className="h-5 w-5" />
        </button>

        <aside className={`
          hidden lg:flex lg:fixed lg:inset-y-0 lg:left-0 lg:flex-col
          ${getSidebarBg()} ${getSidebarText()}
          transition-all duration-300 z-40 shadow-2xl border-r ${getSidebarBorder()}
          ${isCollapsed ? 'w-20' : 'w-60'}
        `}>
          <div className="h-full flex flex-col">
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

            <div className="flex-1 py-4 px-3">
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
            </div>

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
      <button
        onClick={() => setIsMobileOpen(true)}
        className={`lg:hidden fixed top-4 left-4 z-50 p-2 ${getButtonGradient()} text-white rounded-xl shadow-lg`}
      >
        <Menu className="h-5 w-5" />
      </button>

      {isMobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black"
             onClick={() => setIsMobileOpen(false)}>
          <aside
            className="w-72 h-full"
            onClick={e => e.stopPropagation()}
          >
            <SidebarContent isMobile />
          </aside>
        </div>
      )}

      {/* Desktop Sidebar - WITH SCROLL PREVENTION */}
      <aside 
        className={`
          hidden lg:flex lg:fixed lg:top-0 lg:bottom-0 lg:left-0
          ${getSidebarBg()} ${getSidebarText()}
          transition-all duration-300 z-40 shadow-2xl border-r ${getSidebarBorder()}
          ${isCollapsed ? 'w-20' : 'w-64'}
          hover:z-50
          h-screen
        `}
        onMouseMove={(e) => {
          // Prevent mouse movement from causing scroll
          e.preventDefault();
        }}
      >
        <SidebarContent />
      </aside>

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











// 'use client';

// import React, { useState, useEffect, useMemo, useRef } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { 
//   Menu, X, ChevronDown, ChevronRight, Home, Settings, 
//   Building, Bell, LogOut, Loader2, AlertCircle
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
//   const { theme, refreshTheme } = useTheme();
//   const { logout, user: authUser } = useAuth();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [openMenus, setOpenMenus] = useState({});
//   const [isMobileOpen, setIsMobileOpen] = useState(false);
//   const [hoveredMenu, setHoveredMenu] = useState(null);
//   const [showExpandButton, setShowExpandButton] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);
//   const [apiPermissions, setApiPermissions] = useState(null);
//   const [prevUser, setPrevUser] = useState(null);
//   const [apiError, setApiError] = useState(false);
//   const [apiErrorMessage, setApiErrorMessage] = useState('');
  
//   const menuItemRefs = useRef({});
//   const floatingSubmenuRef = useRef(null);
//   const sidebarRef = useRef(null);
//   const sidebarContentRef = useRef(null);
//   const lastScrollTopRef = useRef(0);

//   const currentUser = authUser || {};
  
//   // Fetch permissions from API
//   useEffect(() => {
//     const fetchPermissionsFromAPI = async () => {
//       if (!currentUser?.company_code) {
//         console.log('No company code found');
//         setIsLoading(false);
//         return;
//       }

//       try {
//         setIsLoading(true);
//         setApiError(false);
//         setApiErrorMessage('');
        
//         const token = localStorage.getItem('authToken');
//         if (!token) {
//           console.log('No auth token found');
//           setApiError(true);
//           setApiErrorMessage('No authentication token');
//           setIsLoading(false);
//           return;
//         }

//         const response = await fetch(
//           'https://hr.hinzah.com/api/company/permissions',
//           {
//             method: 'GET',
//             headers: {
//               'Authorization': `Bearer ${token}`,
//               'Content-Type': 'application/json',
//               'Accept': 'application/json',
//             },
//           }
//         );

//         if (response.status === 401) {
//           setApiError(true);
//           setApiErrorMessage('Unauthorized - Token may be invalid or expired');
//           setApiPermissions(null);
//           setIsLoading(false);
//           return;
//         }

//         if (!response.ok) {
//           setApiError(true);
//           setApiErrorMessage(`API Error: ${response.status}`);
//           setApiPermissions(null);
//           setIsLoading(false);
//           return;
//         }

//         const data = await response.json();
        
//         if (data.permissions) {
//           setApiPermissions(data.permissions);
//           setApiError(false);
//         } else if (data) {
//           setApiPermissions(data);
//           setApiError(false);
//         } else {
//           setApiPermissions(null);
//           setApiError(true);
//           setApiErrorMessage('No permissions data in response');
//         }
//       } catch (error) {
//         console.error('Error fetching permissions:', error);
//         setApiError(true);
//         setApiErrorMessage(error.message);
//         setApiPermissions(null);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchPermissionsFromAPI();
//   }, [currentUser?.company_code]);

//   // Force theme refresh when user changes
//   useEffect(() => {
//     const checkUserChange = async () => {
//       if (prevUser?.id !== currentUser?.id) {
//         setIsLoading(true);
        
//         if (refreshTheme) {
//           await refreshTheme();
//         }
        
//         setTimeout(() => {
//           setIsLoading(false);
//         }, 500);
        
//         setPrevUser(currentUser);
//       } else if (prevUser === null && currentUser) {
//         setIsLoading(false);
//         setPrevUser(currentUser);
//       }
//     };
    
//     checkUserChange();
//   }, [currentUser, refreshTheme]);

//   // CRITICAL: Only use API permissions when available and valid
//   const permissions = useMemo(() => {
//     if (!apiError && apiPermissions !== null && Object.keys(apiPermissions).length > 0) {
//       return apiPermissions;
//     } else {
//       return currentUser.permissions || {};
//     }
//   }, [apiPermissions, apiError, currentUser.permissions]);

//   const isSuperAdmin = currentUser.role === 'superadmin';

//   // Theme detection
//   const isLightTheme = isLoading ? false : (theme?.type === 'light' || theme?.sidebarBg?.includes('white') || theme?.sidebarBg?.includes('gray-50'));

//   // Theme helper functions
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
//       const sidebar = sidebarRef.current;
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

//   // COMPLETELY PREVENT ANY AUTO-SCROLLING
//   useEffect(() => {
//     if (isLoading) return;

//     const preventAutoScroll = (e) => {
//       // Prevent any wheel/touch events that could cause auto-scroll
//       const target = e.target;
//       const sidebar = sidebarRef.current;
      
//       if (sidebar && sidebar.contains(target)) {
//         e.preventDefault();
//         e.stopPropagation();
//         return false;
//       }
//     };

//     // Add event listeners with capture phase
//     document.addEventListener('wheel', preventAutoScroll, { passive: false, capture: true });
//     document.addEventListener('touchmove', preventAutoScroll, { passive: false, capture: true });
//     document.addEventListener('scroll', preventAutoScroll, { passive: false, capture: true });

//     return () => {
//       document.removeEventListener('wheel', preventAutoScroll, { capture: true });
//       document.removeEventListener('touchmove', preventAutoScroll, { capture: true });
//       document.removeEventListener('scroll', preventAutoScroll, { capture: true });
//     };
//   }, [isLoading]);

//   // SIMPLE HOVER HANDLERS
//   const handleMenuHover = (menuLabel) => {
//     if (isCollapsed && !isLoading) {
//       setTimeout(() => {
//         setHoveredMenu(menuLabel);
//         setShowExpandButton(true);
//       }, 150);
//     }
//   };

//   const handleMenuLeave = () => {
//     if (isCollapsed && !isLoading) {
//       setTimeout(() => {
//         setHoveredMenu(null);
//       }, 200);
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
    
//     if (isSuperAdmin) {
//       if (!permissions[moduleName]) return false;
//       const subItemPermissions = permissions[moduleName][subItemName];
//       if (!subItemPermissions) return false;
//       return subItemPermissions.view === true;
//     }
    
//     if (!permissions[moduleName]) return false;
    
//     const subItemPermissions = permissions[moduleName][subItemName];
//     if (!subItemPermissions) return false;
    
//     return subItemPermissions.view === true;
//   };

//   // Check if user has any view permission in a module
//   const hasAnyPermissionInModule = (moduleName) => {
//     if (isLoading) return false;
    
//     if (isSuperAdmin) {
//       const subItems = SUB_PERMISSIONS[moduleName] || [];
//       if (subItems.length === 0) return false;
      
//       return subItems.some(sub => canViewSubItem(moduleName, sub.name));
//     }
    
//     if (!permissions[moduleName]) return false;
    
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
//       return canViewSubItem(moduleName, sub.name);
//     });
//   };

//   // Filter modules based on API permissions
//   const dynamicMenu = useMemo(() => {
//     if (isLoading) return [];
    
//     if (apiError && apiPermissions === null) {
//       return [];
//     }
    
//     const filteredModules = MODULES.map(mod => {
//       if (!hasAnyPermissionInModule(mod.name)) {
//         return null;
//       }

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

//       const visibleSubItems = getVisibleSubItems(mod.name);
      
//       if (visibleSubItems.length === 0) {
//         return null;
//       }

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
//         link: mappedSubItems[0]?.link || '#',
//         submenu: mappedSubItems,
//       };
//     }).filter(Boolean);
    
//     return filteredModules;
//   }, [permissions, isSuperAdmin, currentUser, isLoading, apiError, apiPermissions]);

//   const menuData = useMemo(() => {
//     if (isLoading) {
//       return [
//         { label: 'Dashboard', icon: Home, link: '/dashboard', color: getTextAccent() }
//       ];
//     }
    
//     if (apiError && apiPermissions === null) {
//       return [
//         { label: 'Dashboard', icon: Home, link: '/dashboard', color: getTextAccent() },
//         { label: 'Settings', icon: Settings, link: '/settings', color: getSecondaryTextColor() },
//       ];
//     }
    
//     const data = [
//       { label: 'Dashboard', icon: Home, link: '/dashboard', color: getTextAccent() },
//       ...dynamicMenu,
//       { label: 'Settings', icon: Settings, link: '/settings', color: getSecondaryTextColor() },
//     ];
    
//     return data;
//   }, [dynamicMenu, isLoading, apiError, apiPermissions]);

//   const isActive = (path) => location.pathname.startsWith(path);

//   // Floating Submenu Component for Collapsed State
//   const FloatingSubmenu = ({ menuItem: menuItemProp }) => {
//     if (!menuItemProp || !menuItemProp.submenu || menuItemProp.submenu.length === 0 || isLoading) return null;

//     const menuItemEl = menuItemRefs.current[menuItemProp.label];
//     if (!menuItemEl) return null;
    
//     const menuItemRect = menuItemEl.getBoundingClientRect();
    
//     const absoluteTop = menuItemRect.top;
//     const absoluteLeft = menuItemRect.right + 8;
    
//     const shouldPositionAbove = () => {
//       if (typeof window === 'undefined') return false;
//       const windowHeight = window.innerHeight;
//       const submenuHeight = (menuItemProp.submenu.length * 44) + 60;
//       return absoluteTop + submenuHeight > windowHeight - 20;
//     };

//     const positionStyle = {
//       left: `${absoluteLeft}px`,
//       top: shouldPositionAbove() 
//         ? `${absoluteTop - ((menuItemProp.submenu.length * 44) + 60)}px`
//         : `${absoluteTop}px`,
//       position: 'fixed',
//     };

//     return (
//       <div
//         ref={floatingSubmenuRef}
//         className={`
//           w-56 rounded-xl shadow-2xl 
//           border ${getSidebarBorder()} 
//           ${isLightTheme ? 'bg-white' : 'bg-gray-900'} 
//           py-2 z-50 animate-in slide-in-from-left-1 duration-200
//           max-h-[80vh] overflow-y-auto
//         `}
//         style={positionStyle}
//         onMouseEnter={() => setHoveredMenu(menuItemProp.label)}
//         onMouseLeave={handleMenuLeave}
//       >
//         <div className={`px-4 py-2 pt-4 border-b ${getSidebarBorder()}`}>
//           <div className="flex items-center gap-2">
//             <div className={`p-1.5 rounded-lg ${menuItemProp.color} ${isLightTheme ? 'bg-gray-100' : 'bg-gray-800/50'}`}>
//               {React.createElement(menuItemProp.icon || Home, { className: "h-4 w-4" })}
//             </div>
//             <span className={`font-medium text-sm ${getPrimaryTextColor()}`}>
//               {menuItemProp.label}
//             </span>
//           </div>
//         </div>

//         <div className="py-2">
//           {menuItemProp.submenu.map(sub => {
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

//   // Function to handle manual scroll lock
//   const lockScrollPosition = () => {
//     if (sidebarContentRef.current) {
//       // Save current scroll position
//       lastScrollTopRef.current = sidebarContentRef.current.scrollTop;
      
//       // Lock scroll by preventing wheel events
//       const preventScroll = (e) => {
//         e.preventDefault();
//         e.stopPropagation();
//         // Force scroll position to stay fixed
//         sidebarContentRef.current.scrollTop = lastScrollTopRef.current;
//         return false;
//       };

//       sidebarContentRef.current.addEventListener('wheel', preventScroll, { passive: false });
      
//       // Return cleanup function
//       return () => {
//         if (sidebarContentRef.current) {
//           sidebarContentRef.current.removeEventListener('wheel', preventScroll);
//         }
//       };
//     }
//   };

//   const SidebarContent = ({ isMobile = false }) => {
//     // Lock scroll on mount for desktop
//     useEffect(() => {
//       if (!isMobile && !isLoading) {
//         const cleanup = lockScrollPosition();
//         return cleanup;
//       }
//     }, [isMobile, isLoading]);

//     return (
//       <div className={`h-full flex flex-col ${isMobile ? 'w-72' : ''}`} ref={sidebarRef}>
//         {/* Header */}
//         <div className={`p-6 border-b ${getSidebarBorder()} flex-none`}>
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-3">
//               <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${getFromColorClass()} ${getToColorClass()} shadow-lg flex items-center justify-center`}>
//                 {currentUser.logo ? (
//                   <img src={currentUser.logo} alt="logo" className="w-8 h-8 rounded-lg object-contain" />
//                 ) : (
//                   <Building className="h-5 w-5 text-white" />
//                 )}
//               </div>
//               {(!isCollapsed || isMobile) && (
//                 <div>
//                   <h1 className={`text-lg font-bold ${getPrimaryTextColor()}`}>HRMS Pro</h1>
//                   <p className={`text-xs ${getSecondaryTextColor()} flex items-center gap-1`}>
//                     {currentUser.companyName || 'HR System'}
//                     {apiError && (
//                       <span className="text-red-500 flex items-center gap-1">
//                         <AlertCircle className="w-3 h-3" />
//                         API Error
//                       </span>
//                     )}
//                   </p>
//                 </div>
//               )}
//             </div>
//             {(!isCollapsed || isMobile) && (
//               <button
//                 onClick={() => isMobile ? setIsMobileOpen(false) : onToggleCollapse()}
//                 className={`p-2 ${isLightTheme ? 'hover:bg-gray-100' : 'hover:bg-white/10'} rounded-lg transition-colors`}
//               >
//                 <X className={`h-5 w-5 ${getSecondaryTextColor()}`} />
//               </button>
//             )}
//           </div>
          
//           {apiError && (!isCollapsed || isMobile) && (
//             <div className="mt-3 p-2 bg-red-50 border border-red-200 rounded-lg">
//               <p className="text-red-700 text-xs font-medium">Permissions Error</p>
//               <p className="text-red-600 text-xs mt-1">{apiErrorMessage}</p>
//               <button 
//                 onClick={() => window.location.reload()}
//                 className="mt-1 text-xs text-red-600 hover:text-red-800 underline"
//               >
//                 Retry
//               </button>
//             </div>
//           )}
//         </div>

//         {/* Menu Items - NO AUTO SCROLL */}
//         <div 
//           className="flex-1 overflow-y-auto" 
//           ref={sidebarContentRef}
//           style={{
//             // Force fixed scroll behavior
//             scrollBehavior: 'auto',
//             // Prevent scroll bounce
//             overscrollBehavior: 'none',
//             // Force hardware acceleration
//             transform: 'translateZ(0)',
//             // Prevent text selection
//             userSelect: 'none',
//             WebkitUserSelect: 'none',
//           }}
//           onScroll={(e) => {
//             // Immediately reset scroll position if it tries to change
//             if (!isMobile) {
//               e.currentTarget.scrollTop = lastScrollTopRef.current;
//             }
//           }}
//         >
//           <nav className="py-4 px-3">
//             <ul className="space-y-1">
//               {menuData.map(item => {
//                 const Icon = item.icon;
//                 const hasSubmenu = item.submenu?.length > 0;
//                 const isOpen = openMenus[item.label];
//                 const active = isActive(item.link);
//                 const isHovered = hoveredMenu === item.label;
//                 const showFloatingSubmenu = isCollapsed && isHovered && hasSubmenu && !isMobile;
//                 const IconComponent = Icon;

//                 return (
//                   <li 
//                     key={item.label} 
//                     className="relative"
//                     ref={(el) => menuItemRefs.current[item.label] = el}
//                   >
//                     <div
//                       onClick={(e) => {
//                         if (isMobile) {
//                           // MOBILE: Normal behavior
//                           if (hasSubmenu) {
//                             e.preventDefault();
//                             e.stopPropagation();
//                             setOpenMenus(prev => ({ ...prev, [item.label]: !prev[item.label] }));
//                           } else {
//                             navigate(item.link);
//                             setIsMobileOpen(false);
//                           }
//                         } else {
//                           // DESKTOP: Prevent default to stop auto-scroll
//                           e.preventDefault();
//                           e.stopPropagation();
                          
//                           if (isCollapsed && hasSubmenu) {
//                             handleMenuHover(item.label);
//                           } else if (!isCollapsed && hasSubmenu) {
//                             setOpenMenus(prev => ({ ...prev, [item.label]: !prev[item.label] }));
//                           } else {
//                             navigate(item.link);
//                           }
//                         }
//                       }}
//                       onMouseEnter={!isMobile ? () => handleMenuHover(item.label) : undefined}
//                       onMouseLeave={!isMobile ? handleMenuLeave : undefined}
//                       className={`
//                         group flex items-center justify-between px-3 py-2.5 rounded-xl 
//                         cursor-pointer transition-all duration-200
//                         ${active ? getSidebarActive() : getSidebarHover()}
//                         ${active ? 'shadow-lg' : ''}
//                         ${isCollapsed && !isMobile ? 'justify-center px-2' : ''}
//                       `}
//                     >
//                       {active && !isCollapsed && !isMobile && (
//                         <div className={`absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-6 bg-gradient-to-b ${getFromColorClass()} ${getToColorClass()} rounded-r-full`}></div>
//                       )}

//                       <div className="flex items-center gap-3 flex-1">
//                         <div className={`p-1.5 rounded-lg ${item.color} ${isLightTheme ? 'bg-gray-100' : 'bg-gray-800/50'}`}>
//                           <IconComponent className="h-4 w-4" />
//                         </div>
//                         {(!isCollapsed || isMobile) && (
//                           <div className="flex-1 min-w-0">
//                             <span className={`font-medium text-sm truncate ${active ? (isLightTheme ? 'text-gray-900' : 'text-white') : getPrimaryTextColor()}`}>
//                               {item.label}
//                             </span>
//                             {hasSubmenu && item.submenu && (!isCollapsed || isMobile) && (
//                               <p className={`text-xs ${getSecondaryTextColor()} mt-0.5`}>
//                                 {item.submenu.length} items
//                               </p>
//                             )}
//                           </div>
//                         )}
//                       </div>
                      
//                       {hasSubmenu && (!isCollapsed || isMobile) && (
//                         <div className="ml-2">
//                           {isOpen ? (
//                             <ChevronDown className={`h-4 w-4 ${getSecondaryTextColor()}`} />
//                           ) : (
//                             <ChevronRight className={`h-4 w-4 ${getSecondaryTextColor()}`} />
//                           )}
//                         </div>
//                       )}
//                     </div>

//                     {/* DESKTOP ONLY: Floating submenu */}
//                     {showFloatingSubmenu && (
//                       <FloatingSubmenu menuItem={item} />
//                     )}

//                     {/* REGULAR SUBMENU (for expanded desktop and mobile) */}
//                     {hasSubmenu && isOpen && (!isCollapsed || isMobile) && (
//                       <div className={`ml-8 mt-1 space-y-0.5 pl-3 border-l ${getSidebarBorder()}`}>
//                         {item.submenu.map(sub => {
//                           const SubIcon = sub.icon || ChevronRight;
//                           const subActive = location.pathname === sub.link;
                          
//                           return (
//                             <button
//                               key={sub.link}
//                               onClick={() => {
//                                 navigate(sub.link);
//                                 if (isMobile) setIsMobileOpen(false);
//                               }}
//                               className={`
//                                 w-full text-left py-2 px-3 text-sm rounded-lg transition-all duration-150 
//                                 flex items-center gap-2
//                                 ${subActive 
//                                   ? `${isLightTheme ? 'bg-gray-100 text-gray-900' : `bg-gradient-to-r ${getFromColorClass()}/10 ${getToColorClass()}/10 text-white`}` 
//                                   : `${getSecondaryTextColor()} ${isLightTheme ? 'hover:text-gray-900 hover:bg-gray-50' : 'hover:text-white hover:bg-gray-800/50'}`
//                                 }
//                               `}
//                             >
//                               <SubIcon className={`h-3 w-3 ${getSecondaryTextColor()}`} />
//                               <span className="truncate">{sub.label}</span>
//                               {subActive && (
//                                 <div className={`ml-auto w-1.5 h-1.5 rounded-full bg-gradient-to-r ${getFromColorClass()} ${getToColorClass()}`}></div>
//                               )}
//                             </button>
//                           );
//                         })}
//                       </div>
//                     )}
//                   </li>
//                 );
//               })}
//             </ul>
            
//             {!isLoading && !apiError && dynamicMenu.length === 0 && (
//               <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
//                 <p className="text-yellow-700 text-sm">No permissions granted from API</p>
//                 <p className="text-yellow-600 text-xs mt-1">Contact your administrator</p>
//               </div>
//             )}
//           </nav>
//         </div>

//         {/* User Profile & Footer */}
//         <div className={`p-4 border-t ${getSidebarBorder()} flex-none`}>
//           <div className="flex items-center gap-3 mb-4">
//             <div className="relative">
//               <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${getFromColorClass()} ${getToColorClass()} flex items-center justify-center shadow-lg`}>
//                 <span className="text-white font-bold">
//                   {currentUser.username?.[0]?.toUpperCase() || 'U'}
//                 </span>
//               </div>
//               <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
//             </div>
//             {(!isCollapsed || isMobile) && (
//               <div className="flex-1 min-w-0">
//                 <p className={`font-semibold text-sm ${getPrimaryTextColor()} truncate`}>
//                   {currentUser.username || 'User'}
//                 </p>
//                 <p className={`text-xs ${getSecondaryTextColor()} truncate`}>
//                   {isSuperAdmin ? 'Super Admin' : currentUser.role || 'Employee'}
//                 </p>
//               </div>
//             )}
//           </div>

//           {(!isCollapsed || isMobile) && (
//             <>
//               <div className={`mb-3 px-3 py-2 ${isLightTheme ? 'bg-white/50' : 'bg-gray-800/50'} rounded-lg`}>
//                 <div className="flex items-center justify-between text-xs">
//                   <span className={getSecondaryTextColor()}>Status</span>
//                   <div className="flex items-center gap-1">
//                     <div className="w-2 h-2 rounded-full bg-green-500"></div>
//                     <span className={`${isLightTheme ? 'text-green-700' : 'text-green-400'} font-medium`}>Active</span>
//                   </div>
//                 </div>
//               </div>

//               <div className="flex items-center gap-2">
//                 <button 
//                   onClick={() => navigate('/settings')}
//                   className={`flex-1 px-3 py-1.5 ${isLightTheme ? 'bg-white/50 hover:bg-gray-200' : 'bg-gray-800/50 hover:bg-gray-800'} rounded-lg text-xs ${getSecondaryTextColor()} flex items-center justify-center gap-1`}
//                 >
//                   <Settings className="h-3 w-3" />
//                   Settings
//                 </button>
//                 <button 
//                   onClick={logout}
//                   className={`flex-1 px-3 py-1.5 bg-gradient-to-r ${getFromColorClass()}/10 ${getToColorClass()}/10 hover:${getFromColorClass()}/20 hover:${getToColorClass()}/20 rounded-lg text-xs ${getTextAccent()} flex items-center justify-center gap-1`}
//                 >
//                   <LogOut className="h-3 w-3" />
//                   Logout
//                 </button>
//               </div>
//             </>
//           )}
//         </div>
//       </div>
//     );
//   };

//   // Show loading state
//   if (isLoading) {
//     return (
//       <>
//         <button
//           disabled
//           className={`lg:hidden fixed top-4 left-4 z-50 p-2 ${getButtonGradient()} text-white rounded-xl shadow-lg opacity-50`}
//         >
//           <Menu className="h-5 w-5" />
//         </button>

//         <aside className={`
//           hidden lg:flex lg:fixed lg:inset-y-0 lg:left-0 lg:flex-col
//           ${getSidebarBg()} ${getSidebarText()}
//           transition-all duration-300 z-40 shadow-2xl border-r ${getSidebarBorder()}
//           ${isCollapsed ? 'w-20' : 'w-64'}
//         `}>
//           <div className="h-full flex flex-col">
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

//             <div className="flex-1 py-4 px-3">
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
//             </div>

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
//       <button
//         onClick={() => setIsMobileOpen(true)}
//         className={`lg:hidden fixed top-4 left-4 z-50 p-2 ${getButtonGradient()} text-white rounded-xl shadow-lg`}
//       >
//         <Menu className="h-5 w-5" />
//       </button>

//       {isMobileOpen && (
//         <div className="lg:hidden fixed inset-0 z-50 bg-black"
//              onClick={() => setIsMobileOpen(false)}>
//           <aside
//             className="w-72 h-full"
//             onClick={e => e.stopPropagation()}
//           >
//             <SidebarContent isMobile />
//           </aside>
//         </div>
//       )}

//       {/* Desktop Sidebar - SCROLL LOCKED */}
//       <aside 
//         className={`
//           hidden lg:flex lg:fixed lg:top-0 lg:bottom-0 lg:left-0
//           ${getSidebarBg()} ${getSidebarText()}
//           transition-all duration-300 z-40 shadow-2xl border-r ${getSidebarBorder()}
//           ${isCollapsed ? 'w-20' : 'w-64'}
//           hover:z-50
//           h-screen
//         `}
//       >
//         <SidebarContent isMobile={false} />
//       </aside>

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
