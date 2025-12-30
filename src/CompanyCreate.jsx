// 'use client';

// import React, { useState, useEffect } from 'react';
// import {
//   X,
//   Check,
//   RefreshCw,
//   Plus,
//   Eye,
//   Building,
//   Shield,
//   Lock,
//   Palette,
//   Key,
//   Mail,
//   Phone,
//   MapPin,
//   ShieldCheck,
//   ChevronDown,
//   ChevronUp,
//   EyeIcon,
//   FilePlus,
//   Edit,
//   Trash,
//   UserCheck,
//   Save,
//   CheckCircle,
//   AlertCircle
// } from 'lucide-react';
// import { THEMES } from './ThemeContext';
// import { MODULES, SUB_PERMISSIONS } from './data/navdata';

// // Helper to count enabled permissions
// const countEnabledPermissions = (permissions) => {
//   if (!permissions) return { total: 0, enabled: 0, view: 0, create: 0, edit: 0, delete: 0 };
  
//   let enabled = 0;
//   let view = 0;
//   let create = 0;
//   let edit = 0;
//   let del = 0;
//   let total = 0;

//   Object.values(permissions).forEach(module => {
//     Object.values(module).forEach(submodule => {
//       Object.entries(submodule).forEach(([type, value]) => {
//         total++;
//         if (value) {
//           enabled++;
//           switch(type) {
//             case 'view': view++; break;
//             case 'create': create++; break;
//             case 'edit': edit++; break;
//             case 'delete': del++; break;
//           }
//         }
//       });
//     });
//   });

//   return { total, enabled, view, create, edit, delete: del };
// };

// // Default permissions based on role
// const generateDefaultPermissions = (role = 'employee') => {
//   const perms = {};
//   MODULES.forEach(mod => {
//     perms[mod.name] = {};
//     (SUB_PERMISSIONS[mod.name] || []).forEach(sub => {
//       perms[mod.name][sub.name] = {
//         view: role === 'superadmin', // true for superadmin, false for others
//         create: false,
//         edit: false,
//         delete: false,
//       };
//     });
//   });
//   return perms;
// };

// // Auto-set permissions when role changes to superadmin
// const autoSetSuperAdminPermissions = () => {
//   const newPermissions = {};
//   MODULES.forEach(mod => {
//     newPermissions[mod.name] = {};
//     (SUB_PERMISSIONS[mod.name] || []).forEach(sub => {
//       newPermissions[mod.name][sub.name] = {
//         view: true,     // Always true for superadmin
//         create: false,  // Always false for base submenu
//         edit: false,    // Always false for base submenu
//         delete: false,  // Always false for base submenu
//       };
//     });
//   });
//   return newPermissions;
// };

// const CompanyCreate = ({ 
//   isOpen, 
//   onClose, 
//   editingCompany = null, 
//   onSubmit,
//   loggedInUser,
//   themeColors
// }) => {
//   const [isLoading, setIsLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [openModule, setOpenModule] = useState(null);
//   const [permissionStats, setPermissionStats] = useState({ total: 0, enabled: 0 });

//   const [formData, setFormData] = useState({
//     username: '',
//     password: '',
//     confirmPassword: '',
//     companyId: '',
//     companyName: '',
//     role: 'employee',
//     email: '',
//     phone: '',
//     address: '',
//     logo: '',
//     theme: Object.values(THEMES)[0],
//     permissions: generateDefaultPermissions('employee'),
//     status: 'active',
//     employees: 0,
//     subscription: 'free',
//   });

//   // Initialize form when modal opens or editing company changes
//   useEffect(() => {
//     if (editingCompany) {
//       setFormData({
//         username: editingCompany.username || '',
//         password: '',
//         confirmPassword: '',
//         companyId: editingCompany.companyId || '',
//         companyName: editingCompany.companyName || editingCompany.username || '',
//         role: editingCompany.role || 'employee',
//         email: editingCompany.email || '',
//         phone: editingCompany.phone || '',
//         address: editingCompany.address || '',
//         logo: editingCompany.logo || '',
//         theme: editingCompany.theme || Object.values(THEMES)[0],
//         permissions: JSON.parse(JSON.stringify(editingCompany.permissions)),
//         status: editingCompany.status || 'active',
//         employees: editingCompany.employees || 0,
//         subscription: editingCompany.subscription || 'free',
//       });
//     } else {
//       setFormData({
//         username: '',
//         password: '',
//         confirmPassword: '',
//         companyId: '',
//         companyName: '',
//         role: 'employee',
//         email: '',
//         phone: '',
//         address: '',
//         logo: '',
//         theme: Object.values(THEMES)[0],
//         permissions: generateDefaultPermissions('employee'),
//         status: 'active',
//         employees: 0,
//         subscription: 'free',
//       });
//     }
//     setOpenModule(null);
//     setShowPassword(false);
//   }, [editingCompany, isOpen]);

//   // Update permission stats when permissions change
//   useEffect(() => {
//     const stats = countEnabledPermissions(formData.permissions);
//     setPermissionStats(stats);
//   }, [formData.permissions]);

//   // Handle role change with restrictions
//   const handleRoleChange = (role) => {
//     // If logged-in user is not superadmin, don't allow setting superadmin role
//     if (loggedInUser.role !== 'superadmin' && role === 'superadmin') {
//       alert('You do not have permission to create Super Admin accounts.');
//       return;
//     }
    
//     setFormData(prev => {
//       // If role is superadmin, set all view permissions to true and others to false
//       const newPermissions = role === 'superadmin' 
//         ? autoSetSuperAdminPermissions()
//         : generateDefaultPermissions(role);
      
//       return {
//         ...prev,
//         role,
//         permissions: newPermissions
//       };
//     });
//   };

//   const togglePermission = (moduleName, permissionName, type) => {
//     // If role is superadmin, view permissions cannot be disabled
//     if (formData.role === 'superadmin' && type === 'view') {
//       alert('View permissions cannot be disabled for Super Admin role.');
//       return;
//     }
    
//     setFormData(prev => ({
//       ...prev,
//       permissions: {
//         ...prev.permissions,
//         [moduleName]: {
//           ...prev.permissions[moduleName],
//           [permissionName]: {
//             ...prev.permissions[moduleName][permissionName],
//             [type]: !prev.permissions[moduleName][permissionName][type],
//           },
//         },
//       },
//     }));
//   };

//   const getPerm = (moduleName, permissionName, type) => {
//     return formData.permissions?.[moduleName]?.[permissionName]?.[type] ?? false;
//   };

//   const handleFormSubmit = async (e) => {
//     e.preventDefault();
    
//     if (!formData.username.trim() || !formData.companyId.trim()) {
//       alert('Username and Company ID are required!');
//       return;
//     }
//     if (!editingCompany && formData.password !== formData.confirmPassword) {
//       alert('Passwords do not match!');
//       return;
//     }
//     if (!editingCompany && !formData.password) {
//       alert('Password is required for new company!');
//       return;
//     }

//     setIsLoading(true);
    
//     // Prepare company data
//     const companyData = editingCompany
//       ? {
//           ...editingCompany,
//           username: formData.username.trim(),
//           companyId: formData.companyId.trim(),
//           companyName: formData.companyName.trim(),
//           role: formData.role,
//           email: formData.email.trim(),
//           phone: formData.phone.trim(),
//           address: formData.address.trim(),
//           logo: formData.logo || editingCompany.logo,
//           theme: formData.theme,
//           permissions: formData.permissions,
//           status: formData.status,
//           employees: parseInt(formData.employees) || 0,
//           subscription: formData.subscription,
//           ...(formData.password && { password: btoa(formData.password) }),
//         }
//       : {
//           id: Date.now(),
//           username: formData.username.trim(),
//           companyId: formData.companyId.trim(),
//           companyName: formData.companyName.trim(),
//           role: formData.role,
//           email: formData.email.trim(),
//           phone: formData.phone.trim(),
//           address: formData.address.trim(),
//           password: btoa(formData.password),
//           logo: formData.logo,
//           theme: formData.theme,
//           permissions: formData.permissions,
//           status: formData.status,
//           employees: parseInt(formData.employees) || 0,
//           subscription: formData.subscription,
//           createdAt: new Date().toISOString(),
//         };

//     // Call the parent onSubmit function
//     onSubmit(companyData, editingCompany);
//   };

//   if (!isOpen) return null;

//   // Theme helpers
//   const getButtonGradient = () => {
//     if (themeColors?.buttonGradient) {
//       return `bg-gradient-to-r ${themeColors.buttonGradient}`;
//     }
//     return 'bg-gradient-to-r from-orange-500 to-orange-600';
//   };

//   const getButtonHover = () => themeColors?.buttonHover || 'hover:from-orange-600 hover:to-orange-700';
//   const getRingColor = () => themeColors?.ringColor || 'ring-orange-500';

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm">
//       <div className="bg-white rounded-2xl shadow-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
//         <div className="sticky top-0 bg-white border-b border-gray-200 z-10">
//           <div className="flex items-center justify-between p-6">
//             <div>
//               <h2 className="text-2xl font-bold text-gray-900">
//                 {editingCompany ? 'Edit Company' : 'Create New Company'}
//               </h2>
//               <p className="text-gray-600 mt-1">Manage company details and permissions</p>
              
//               {/* Permission Stats */}
//               <div className="flex items-center gap-4 mt-2">
//                 <div className="flex items-center gap-2 text-sm">
//                   <div className="flex items-center gap-1">
//                     <CheckCircle className="h-4 w-4 text-green-500" />
//                     <span className="font-medium">{permissionStats.enabled}</span>
//                     <span className="text-gray-600">enabled</span>
//                   </div>
//                   <div className="text-gray-400">•</div>
//                   <div className="flex items-center gap-1">
//                     <AlertCircle className="h-4 w-4 text-gray-400" />
//                     <span className="font-medium">{permissionStats.total - permissionStats.enabled}</span>
//                     <span className="text-gray-600">disabled</span>
//                   </div>
//                 </div>
                
//                 {/* Permission Type Breakdown */}
//                 <div className="flex items-center gap-3 text-xs">
//                   <div className="flex items-center gap-1">
//                     <EyeIcon className="h-3 w-3 text-blue-500" />
//                     <span>{permissionStats.view}</span>
//                   </div>
//                   <div className="flex items-center gap-1">
//                     <FilePlus className="h-3 w-3 text-green-500" />
//                     <span>{permissionStats.create}</span>
//                   </div>
//                   <div className="flex items-center gap-1">
//                     <Edit className="h-3 w-3 text-yellow-500" />
//                     <span>{permissionStats.edit}</span>
//                   </div>
//                   <div className="flex items-center gap-1">
//                     <Trash className="h-3 w-3 text-red-500" />
//                     <span>{permissionStats.delete}</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <button
//               onClick={onClose}
//               className="p-2 hover:bg-gray-100 rounded-xl"
//             >
//               <X className="h-5 w-5 text-gray-500" />
//             </button>
//           </div>
//         </div>

//         <div className="p-6">
//           {isLoading ? (
//             <div className="flex items-center justify-center py-20">
//               <div className="text-center">
//                 <RefreshCw 
//                   className="h-12 w-12 animate-spin mx-auto mb-4"
//                   style={{ color: themeColors?.accentColor || '#ea580c' }}
//                 />
//                 <p className="text-gray-600">Loading company data...</p>
//               </div>
//             </div>
//           ) : (
//             <form onSubmit={handleFormSubmit}>
//               {/* Company Details Section */}
//               <div className="mb-8">
//                 <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
//                   <Building className="h-5 w-5" /> Company Details
//                 </h3>
//                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//                   <div className="space-y-4">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">
//                         Company Name <span className="text-red-600">*</span>
//                       </label>
//                       <input
//                         type="text"
//                         required
//                         placeholder="Enter company name"
//                         value={formData.companyName}
//                         onChange={e => setFormData(prev => ({ ...prev, companyName: e.target.value }))}
//                         className={`w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 ${getRingColor()} focus:border-transparent`}
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">
//                         Username <span className="text-red-600">*</span>
//                       </label>
//                       <input
//                         type="text"
//                         required
//                         placeholder="Enter username"
//                         value={formData.username}
//                         onChange={e => setFormData(prev => ({ ...prev, username: e.target.value }))}
//                         className={`w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 ${getRingColor()} focus:border-transparent`}
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">
//                         Company ID <span className="text-red-600">*</span>
//                       </label>
//                       <div className="flex gap-2">
//                         <input
//                           type="text"
//                           required
//                           placeholder="Enter company ID"
//                           value={formData.companyId}
//                           onChange={e => setFormData(prev => ({ ...prev, companyId: e.target.value }))}
//                           className={`flex-1 px-4 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 ${getRingColor()} focus:border-transparent`}
//                         />
//                         <button
//                           type="button"
//                           onClick={() => setFormData(prev => ({ ...prev, companyId: `COMP-${Date.now().toString().slice(-6)}` }))}
//                           className="px-4 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 text-sm font-medium"
//                         >
//                           Generate
//                         </button>
//                       </div>
//                     </div>
//                   </div>
                  
//                   <div className="space-y-4">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">
//                         Email Address
//                       </label>
//                       <div className="relative">
//                         <Mail className="absolute left-3 top-3.5 h-4 w-4 text-gray-400" />
//                         <input
//                           type="email"
//                           placeholder="company@email.com"
//                           value={formData.email}
//                           onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
//                           className={`w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 ${getRingColor()} focus:border-transparent`}
//                         />
//                       </div>
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">
//                         Phone Number
//                       </label>
//                       <div className="relative">
//                         <Phone className="absolute left-3 top-3.5 h-4 w-4 text-gray-400" />
//                         <input
//                           type="tel"
//                           placeholder="+1 (555) 123-4567"
//                           value={formData.phone}
//                           onChange={e => setFormData(prev => ({ ...prev, phone: e.target.value }))}
//                           className={`w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 ${getRingColor()} focus:border-transparent`}
//                         />
//                       </div>
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">
//                         Address
//                       </label>
//                       <div className="relative">
//                         <MapPin className="absolute left-3 top-3.5 h-4 w-4 text-gray-400" />
//                         <input
//                           type="text"
//                           placeholder="Company address"
//                           value={formData.address}
//                           onChange={e => setFormData(prev => ({ ...prev, address: e.target.value }))}
//                           className={`w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 ${getRingColor()} focus:border-transparent`}
//                         />
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Security & Role Section */}
//               <div className="mb-8">
//                 <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
//                   <Shield className="h-5 w-5" /> Security & Role
//                 </h3>
//                 <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Role <span className="text-red-600">*</span>
//                     </label>
//                     <select
//                       value={formData.role}
//                       onChange={(e) => handleRoleChange(e.target.value)}
//                       className={`w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 ${getRingColor()} focus:border-transparent`}
//                       disabled={editingCompany?.role === 'superadmin' && loggedInUser.role !== 'superadmin'}
//                     >
//                       <option value="employee">Employee</option>
//                       <option value="companyleader">Company Leader</option>
//                       <option value="admin">Admin</option>
//                       {loggedInUser.role === 'superadmin' && (
//                         <option value="superadmin">Super Admin</option>
//                       )}
//                     </select>
//                     {formData.role === 'superadmin' && (
//                       <p className="text-xs text-purple-600 mt-2 flex items-center gap-1">
//                         <ShieldCheck className="h-3 w-3" />
//                         Super Admin: All view permissions are automatically enabled
//                       </p>
//                     )}
//                   </div>
                  
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Password {!editingCompany && <span className="text-red-600">*</span>}
//                     </label>
//                     <div className="relative">
//                       <Key className="absolute left-3 top-3.5 h-4 w-4 text-gray-400" />
//                       <input
//                         type={showPassword ? 'text' : 'password'}
//                         placeholder={editingCompany ? 'New password (optional)' : 'Enter password'}
//                         value={formData.password}
//                         onChange={e => setFormData(prev => ({ ...prev, password: e.target.value }))}
//                         className={`w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 ${getRingColor()} focus:border-transparent`}
//                         required={!editingCompany}
//                       />
//                       <button
//                         type="button"
//                         onClick={() => setShowPassword(!showPassword)}
//                         className="absolute right-3 top-3.5 text-gray-500"
//                       >
//                         <Eye className="h-4 w-4" />
//                       </button>
//                     </div>
//                   </div>
                  
//                   {!editingCompany && (
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">
//                         Confirm Password <span className="text-red-600">*</span>
//                       </label>
//                       <div className="relative">
//                         <Key className="absolute left-3 top-3.5 h-4 w-4 text-gray-400" />
//                         <input
//                           type={showPassword ? 'text' : 'password'}
//                           placeholder="Confirm password"
//                           value={formData.confirmPassword}
//                           onChange={e => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
//                           className={`w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 ${getRingColor()} focus:border-transparent`}
//                           required
//                         />
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               </div>

//               {/* Theme Selection */}
//               <div className="mb-8">
//                 <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
//                   <Palette className="h-5 w-5" /> Theme Selection
//                 </h3>
//                 <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
//                   {Object.values(THEMES).map(t => {
//                     // Create color array from theme
//                     const colors = [];
                    
//                     // Extract colors from gradient if exists
//                     if (t.gradient) {
//                       const gradientColors = t.sidebarBg.match(/#[0-9A-Fa-f]{6}|rgb\([^)]+\)/g);
//                       if (gradientColors) colors.push(...gradientColors);
//                     }
                    
//                     // Add accent color
//                     if (t.accentColor) colors.push(t.accentColor);
                    
//                     // Add sidebar color
//                     if (t.sidebarBg && !t.sidebarBg.includes('gradient')) {
//                       colors.push(t.sidebarBg);
//                     }
                    
//                     // Get unique colors
//                     const uniqueColors = [...new Set(colors)].slice(0, 3);
                    
//                     return (
//                       <button
//                         key={t.id}
//                         type="button"
//                         onClick={() => setFormData(prev => ({ ...prev, theme: t }))}
//                         className={`relative p-3 rounded-xl border-2 transition-all hover:scale-105 ${
//                           formData.theme.id === t.id 
//                             ? 'shadow-lg' 
//                             : 'border-gray-200 hover:border-gray-300'
//                         }`}
//                         style={{ 
//                           borderColor: formData.theme.id === t.id ? (t.accentColor || '#ea580c') : undefined,
//                         }}
//                       >
//                         {/* Color Preview Stripes */}
//                         <div className="h-12 rounded-lg overflow-hidden flex mb-2">
//                           {uniqueColors.length > 0 ? (
//                             uniqueColors.map((color, idx) => (
//                               <div 
//                                 key={idx}
//                                 className="flex-1"
//                                 style={{ backgroundColor: color }}
//                               />
//                             ))
//                           ) : (
//                             <div 
//                               className="w-full h-full"
//                               style={{ 
//                                 background: t.gradient || 
//                                 `linear-gradient(135deg, ${t.sidebarBg || '#f97316'}, #ec4899)`
//                               }}
//                             />
//                           )}
//                         </div>
                        
//                         {/* Theme Name */}
//                         <div className="text-center">
//                           <div className="font-medium text-xs text-gray-900 truncate">
//                             {t.name}
//                           </div>
//                           <div className="text-[10px] text-gray-500 mt-0.5 truncate">
//                             {t.accentColor || 'Multi'}
//                           </div>
//                         </div>
                        
//                         {/* Selection Check */}
//                         {formData.theme.id === t.id && (
//                           <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
//                             <Check className="h-3 w-3 text-white" />
//                           </div>
//                         )}
//                       </button>
//                     );
//                   })}
//                 </div>
//               </div>

//               {/* Permissions Section */}
//               <div className="mb-8">
//                 <div className="flex items-center justify-between mb-4">
//                   <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
//                     <Lock className="h-5 w-5" /> Module Permissions
//                   </h3>
//                   <div className="flex items-center gap-4 text-sm">
//                     <div className="flex items-center gap-2">
//                       <div className="w-3 h-3 bg-green-500 rounded-full"></div>
//                       <span>Enabled</span>
//                     </div>
//                     <div className="flex items-center gap-2">
//                       <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
//                       <span>Disabled</span>
//                     </div>
//                   </div>
//                 </div>
                
//                 <div className="space-y-3">
//                   {MODULES.map(mod => (
//                     <div key={mod.name} className="bg-gray-50 rounded-xl border overflow-hidden">
//                       <button
//                         type="button"
//                         onClick={() => setOpenModule(openModule === mod.name ? null : mod.name)}
//                         className="w-full flex justify-between items-center p-4 hover:bg-gray-100 transition-colors"
//                       >
//                         <div className="flex items-center gap-3">
//                           <div className="p-2 bg-white rounded-lg">
//                             <mod.icon className="h-5 w-5 text-gray-700" />
//                           </div>
//                           <div className="text-left">
//                             <h4 className="font-semibold text-gray-900">{mod.name}</h4>
//                             <p className="text-sm text-gray-500">{(SUB_PERMISSIONS[mod.name] || []).length} permissions</p>
//                           </div>
//                         </div>
//                         {openModule === mod.name ? (
//                           <ChevronUp className="h-5 w-5 text-gray-500" />
//                         ) : (
//                           <ChevronDown className="h-5 w-5 text-gray-500" />
//                         )}
//                       </button>
                      
//                       {openModule === mod.name && (
//                         <div className="border-t border-gray-200 p-4 bg-white">
//                           <div className="mb-2">
//                             {formData.role === 'superadmin' && (
//                               <div className="bg-purple-50 border border-purple-200 rounded-lg p-3 mb-4">
//                                 <p className="text-sm text-purple-800 flex items-center gap-2">
//                                   <ShieldCheck className="h-4 w-4" />
//                                   Super Admin: All view permissions are enabled. Other permissions can be manually adjusted.
//                                 </p>
//                               </div>
//                             )}
//                           </div>
//                           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//                             {(SUB_PERMISSIONS[mod.name] || []).map(perm => (
//                               <div key={perm.name} className="bg-gray-50 rounded-lg p-4">
//                                 <h5 className="font-medium text-gray-900 mb-3">{perm.name}</h5>
//                                 <div className="grid grid-cols-2 gap-2">
//                                   {['view', 'create', 'edit', 'delete'].map(type => {
//                                     const checked = getPerm(mod.name, perm.name, type);
//                                     return (
//                                       <label key={type} className="flex items-center gap-2 cursor-pointer">
//                                         <div className="relative">
//                                           <input
//                                             type="checkbox"
//                                             checked={checked}
//                                             onChange={() => togglePermission(mod.name, perm.name, type)}
//                                             className="sr-only"
//                                             disabled={formData.role === 'superadmin' && type === 'view'}
//                                           />
//                                           <div className={`w-8 h-5 rounded-full transition-colors ${
//                                             checked ? 'bg-green-500' : 'bg-gray-300'
//                                           } ${formData.role === 'superadmin' && type === 'view' ? 'opacity-70' : ''}`}>
//                                             <div className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transform transition-transform ${
//                                               checked ? 'translate-x-3' : ''
//                                             }`} />
//                                           </div>
//                                         </div>
//                                         <span className={`text-xs text-gray-700 capitalize ${
//                                           formData.role === 'superadmin' && type === 'view' ? 'opacity-70' : ''
//                                         }`}>
//                                           {type}
//                                         </span>
//                                       </label>
//                                     );
//                                   })}
//                                 </div>
//                               </div>
//                             ))}
//                           </div>
//                         </div>
//                       )}
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* Form Actions */}
//               <div className="flex items-center justify-end gap-3 pt-6 border-t border-gray-200">
//                 <button
//                   type="button"
//                   onClick={onClose}
//                   className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-50"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   disabled={isLoading}
//                   className={`px-8 py-3 ${getButtonGradient()} ${getButtonHover()} text-white text-sm font-medium rounded-xl flex items-center gap-2 disabled:opacity-70`}
//                 >
//                   {isLoading ? (
//                     <>
//                       <RefreshCw className="h-4 w-4 animate-spin" />
//                       {editingCompany ? 'Updating...' : 'Creating...'}
//                     </>
//                   ) : editingCompany ? (
//                     <>
//                       <Save className="h-4 w-4" /> Update Company
//                     </>
//                   ) : (
//                     <>
//                       <Plus className="h-4 w-4" /> Create Company
//                     </>
//                   )}
//                 </button>
//               </div>
//             </form>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CompanyCreate;


'use client';

import React, { useState, useEffect } from 'react';
import {
  X,
  Check,
  RefreshCw,
  Plus,
  Eye,
  Building,
  Shield,
  Lock,
  Palette,
  Key,
  Mail,
  Phone,
  MapPin,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  EyeIcon,
  FilePlus,
  Edit,
  Trash,
  UserCheck,
  Save,
  CheckCircle,
  AlertCircle,
  EyeOff,
  Lock as LockIcon
} from 'lucide-react';
import { THEMES } from './ThemeContext';
import { MODULES, SUB_PERMISSIONS } from './data/navdata';

// Helper to count enabled permissions
const countEnabledPermissions = (permissions) => {
  if (!permissions) return { total: 0, enabled: 0, view: 0, create: 0, edit: 0, delete: 0 };
  
  let enabled = 0;
  let view = 0;
  let create = 0;
  let edit = 0;
  let del = 0;
  let total = 0;

  Object.values(permissions).forEach(module => {
    Object.values(module).forEach(submodule => {
      Object.entries(submodule).forEach(([type, value]) => {
        total++;
        if (value) {
          enabled++;
          switch(type) {
            case 'view': view++; break;
            case 'create': create++; break;
            case 'edit': edit++; break;
            case 'delete': del++; break;
          }
        }
      });
    });
  });

  return { total, enabled, view, create, edit, delete: del };
};

// Helper to check if user has view permission for a module/submodule
const hasUserViewPermission = (userPermissions, moduleName, permissionName) => {
  return userPermissions?.[moduleName]?.[permissionName]?.view || false;
};

// Default permissions based on role and logged-in user's permissions
const generateDefaultPermissions = (role = 'employee', loggedInUserPermissions = {}) => {
  const perms = {};
  MODULES.forEach(mod => {
    perms[mod.name] = {};
    (SUB_PERMISSIONS[mod.name] || []).forEach(sub => {
      // Only allow view permission if logged-in user has view permission for this
      const canView = role === 'superadmin' || 
                     (loggedInUserPermissions?.[mod.name]?.[sub.name]?.view || false);
      
      perms[mod.name][sub.name] = {
        view: canView,
        create: false,
        edit: false,
        delete: false,
      };
    });
  });
  return perms;
};

// Auto-set permissions when role changes to superadmin (only for permissions user can view)
const autoSetSuperAdminPermissions = (loggedInUserPermissions = {}) => {
  const newPermissions = {};
  MODULES.forEach(mod => {
    newPermissions[mod.name] = {};
    (SUB_PERMISSIONS[mod.name] || []).forEach(sub => {
      // Only enable view if logged-in user has view permission for this
      const canView = loggedInUserPermissions?.[mod.name]?.[sub.name]?.view || false;
      
      newPermissions[mod.name][sub.name] = {
        view: canView,     // Only true if user has view permission
        create: false,
        edit: false,
        delete: false,
      };
    });
  });
  return newPermissions;
};

const CompanyCreate = ({ 
  isOpen, 
  onClose, 
  editingCompany = null, 
  onSubmit,
  loggedInUser,
  themeColors,
  loggedInUserPermissions = {} // Add this prop for logged-in user's permissions
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [openModule, setOpenModule] = useState(null);
  const [permissionStats, setPermissionStats] = useState({ total: 0, enabled: 0 });

  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    companyId: '',
    companyName: '',
    role: 'employee',
    email: '',
    phone: '',
    address: '',
    logo: '',
    theme: Object.values(THEMES)[0],
    permissions: generateDefaultPermissions('employee', loggedInUserPermissions),
    status: 'active',
    employees: 0,
    subscription: 'free',
  });

  // Initialize form when modal opens or editing company changes
  useEffect(() => {
    if (editingCompany) {
      // Filter permissions based on logged-in user's view access
      const filteredPermissions = {};
      Object.keys(editingCompany.permissions || {}).forEach(moduleName => {
        filteredPermissions[moduleName] = {};
        Object.keys(editingCompany.permissions[moduleName] || {}).forEach(permissionName => {
          // Only include permissions that logged-in user can view
          if (hasUserViewPermission(loggedInUserPermissions, moduleName, permissionName)) {
            filteredPermissions[moduleName][permissionName] = {
              ...editingCompany.permissions[moduleName][permissionName]
            };
          }
        });
      });

      setFormData({
        username: editingCompany.username || '',
        password: '',
        confirmPassword: '',
        companyId: editingCompany.companyId || '',
        companyName: editingCompany.companyName || editingCompany.username || '',
        role: editingCompany.role || 'employee',
        email: editingCompany.email || '',
        phone: editingCompany.phone || '',
        address: editingCompany.address || '',
        logo: editingCompany.logo || '',
        theme: editingCompany.theme || Object.values(THEMES)[0],
        permissions: filteredPermissions,
        status: editingCompany.status || 'active',
        employees: editingCompany.employees || 0,
        subscription: editingCompany.subscription || 'free',
      });
    } else {
      setFormData({
        username: '',
        password: '',
        confirmPassword: '',
        companyId: '',
        companyName: '',
        role: 'employee',
        email: '',
        phone: '',
        address: '',
        logo: '',
        theme: Object.values(THEMES)[0],
        permissions: generateDefaultPermissions('employee', loggedInUserPermissions),
        status: 'active',
        employees: 0,
        subscription: 'free',
      });
    }
    setOpenModule(null);
    setShowPassword(false);
  }, [editingCompany, isOpen, loggedInUserPermissions]);

  // Update permission stats when permissions change
  useEffect(() => {
    const stats = countEnabledPermissions(formData.permissions);
    setPermissionStats(stats);
  }, [formData.permissions]);

  // Handle role change with restrictions
  const handleRoleChange = (role) => {
    // If logged-in user is not superadmin, don't allow setting superadmin role
    if (loggedInUser.role !== 'superadmin' && role === 'superadmin') {
      alert('You do not have permission to create Super Admin accounts.');
      return;
    }
    
    setFormData(prev => {
      // If role is superadmin, set view permissions based on logged-in user's access
      const newPermissions = role === 'superadmin' 
        ? autoSetSuperAdminPermissions(loggedInUserPermissions)
        : generateDefaultPermissions(role, loggedInUserPermissions);
      
      return {
        ...prev,
        role,
        permissions: newPermissions
      };
    });
  };

  const togglePermission = (moduleName, permissionName, type) => {
    // Check if logged-in user has view permission for this module
    if (!hasUserViewPermission(loggedInUserPermissions, moduleName, permissionName)) {
      alert('You do not have permission to modify this permission.');
      return;
    }

    // If role is superadmin, view permissions cannot be disabled
    if (formData.role === 'superadmin' && type === 'view') {
      alert('View permissions cannot be disabled for Super Admin role.');
      return;
    }
    
    setFormData(prev => ({
      ...prev,
      permissions: {
        ...prev.permissions,
        [moduleName]: {
          ...prev.permissions[moduleName],
          [permissionName]: {
            ...prev.permissions[moduleName][permissionName],
            [type]: !prev.permissions[moduleName][permissionName][type],
          },
        },
      },
    }));
  };

  const getPerm = (moduleName, permissionName, type) => {
    return formData.permissions?.[moduleName]?.[permissionName]?.[type] ?? false;
  };

  // Check if user can modify a permission type
  const canModifyPermission = (moduleName, permissionName, type) => {
    // User must have view permission for this module
    if (!hasUserViewPermission(loggedInUserPermissions, moduleName, permissionName)) {
      return false;
    }

    // For superadmin role, view permissions cannot be disabled
    if (formData.role === 'superadmin' && type === 'view') {
      return false;
    }

    return true;
  };

  // const handleFormSubmit = async (e) => {
  //   e.preventDefault();
    
  //   if (!formData.username.trim() || !formData.companyId.trim()) {
  //     alert('Username and Company ID are required!');
  //     return;
  //   }
  //   if (!editingCompany && formData.password !== formData.confirmPassword) {
  //     alert('Passwords do not match!');
  //     return;
  //   }
  //   if (!editingCompany && !formData.password) {
  //     alert('Password is required for new company!');
  //     return;
  //   }

  //   setIsLoading(true);
    
  //   // Prepare company data
  //   const companyData = editingCompany
  //     ? {
  //         ...editingCompany,
  //         username: formData.username.trim(),
  //         companyId: formData.companyId.trim(),
  //         companyName: formData.companyName.trim(),
  //         role: formData.role,
  //         email: formData.email.trim(),
  //         phone: formData.phone.trim(),
  //         address: formData.address.trim(),
  //         logo: formData.logo || editingCompany.logo,
  //         theme: formData.theme,
  //         permissions: {
  //           ...editingCompany.permissions, // Keep existing permissions
  //           ...formData.permissions // Update with new permissions (only those user can modify)
  //         },
  //         status: formData.status,
  //         employees: parseInt(formData.employees) || 0,
  //         subscription: formData.subscription,
  //         ...(formData.password && { password: btoa(formData.password) }),
  //       }
  //     : {
  //         id: Date.now(),
  //         username: formData.username.trim(),
  //         companyId: formData.companyId.trim(),
  //         companyName: formData.companyName.trim(),
  //         role: formData.role,
  //         email: formData.email.trim(),
  //         phone: formData.phone.trim(),
  //         address: formData.address.trim(),
  //         password: btoa(formData.password),
  //         logo: formData.logo,
  //         theme: formData.theme,
  //         permissions: formData.permissions,
  //         status: formData.status,
  //         employees: parseInt(formData.employees) || 0,
  //         subscription: formData.subscription,
  //         createdAt: new Date().toISOString(),
  //       };

  //   // Call the parent onSubmit function
  //   onSubmit(companyData, editingCompany);
  // };

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!formData.username.trim() || !formData.companyId.trim()) {
    return alert('Username and Company ID are required!');
  }
  if (!editingCompany && formData.password !== formData.confirmPassword) {
    return alert('Passwords do not match!');
  }
  if (!editingCompany && !formData.password) {
    return alert('Password is required for new company!');
  }

  setIsLoading(true);

  try {
    // Prepare company data for API
    const companyPayload = {
      username: formData.username.trim(),
      company_name: formData.companyName.trim(),
      role: formData.role,
      theme: formData.theme.name || 'black', // Default to black if not specified
      address: formData.address.trim(),
      phone: formData.phone.trim(),
      ...(formData.email && { email: formData.email.trim() }),
      ...(formData.password && { password: formData.password }),
    };

    // API 1: Create/Update Company
    const companyUrl = 'http://192.168.0.5:8000/api/admin/companies';
    const companyMethod = editingCompany ? 'PUT' : 'POST';

    console.log('Sending company data:', companyPayload);
    
    const companyResponse = await fetch(companyUrl, {
      method: companyMethod,
      headers: {
        'Content-Type': 'application/json',
        // Add authorization header if needed
        // 'Authorization': `Bearer ${yourToken}`,
      },
      body: JSON.stringify(companyPayload),
    });

    if (!companyResponse.ok) {
      const errorData = await companyResponse.json();
      throw new Error(`Company API failed: ${errorData.message || companyResponse.statusText}`);
    }

    const companyResult = await companyResponse.json();
    console.log('Company API response:', companyResult);

    // Extract company code from response
    const companyCode = companyResult.companyCode || formData.companyId;
    
    // API 2: Set Permissions
    // Prepare permissions in the format shown in the WhatsApp image
    const permissionsPayload = {
      company_code: companyCode,
      permissions: formData.permissions
    };

    console.log('Sending permissions data:', permissionsPayload);
    
    const permissionsResponse = await fetch('http://192.168.0.5:8000/api/company/permissions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Add authorization header if needed
        // 'Authorization': `Bearer ${yourToken}`,
      },
      body: JSON.stringify(permissionsPayload),
    });

    if (!permissionsResponse.ok) {
      const errorData = await permissionsResponse.json();
      throw new Error(`Permissions API failed: ${errorData.message || permissionsResponse.statusText}`);
    }

    const permissionsResult = await permissionsResponse.json();
    console.log('Permissions API response:', permissionsResult);

    // Update local state with data from API response
    const companyData = {
      id: editingCompany ? editingCompany.id : Date.now(),
      ...companyResult.data || companyResult,
      username: formData.username.trim(),
      companyId: formData.companyId.trim(),
      companyName: formData.companyName.trim(),
      role: formData.role,
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      address: formData.address.trim(),
      password: btoa(formData.password),
      logo: formData.logo,
      theme: formData.theme,
      permissions: formData.permissions,
      status: formData.status,
      employees: parseInt(formData.employees) || 0,
      subscription: formData.subscription,
      createdAt: editingCompany ? editingCompany.createdAt : new Date().toISOString(),
    };

    // Update local state
    setCompanies(prev =>
      editingCompany
        ? prev.map(c => (c.id === editingCompany.id ? companyData : c))
        : [...prev, companyData]
    );

    closeModal();
    triggerSuccess(editingCompany ? 'Company updated successfully!' : 'Company created successfully!');

  } catch (error) {
    console.error('API Error:', error);
    alert(`Failed to save company: ${error.message}`);
  } finally {
    setIsLoading(false);
  }
};

  if (!isOpen) return null;

  // Theme helpers
  const getButtonGradient = () => {
    if (themeColors?.buttonGradient) {
      return `bg-gradient-to-r ${themeColors.buttonGradient}`;
    }
    return 'bg-gradient-to-r from-orange-500 to-orange-600';
  };

  const getButtonHover = () => themeColors?.buttonHover || 'hover:from-orange-600 hover:to-orange-700';
  const getRingColor = () => themeColors?.ringColor || 'ring-orange-500';

  // Count how many permissions the logged-in user can access
  const userAccessiblePermissions = () => {
    let accessibleCount = 0;
    let totalCount = 0;
    
    MODULES.forEach(mod => {
      (SUB_PERMISSIONS[mod.name] || []).forEach(sub => {
        totalCount++;
        if (hasUserViewPermission(loggedInUserPermissions, mod.name, sub.name)) {
          accessibleCount++;
        }
      });
    });
    
    return { accessible: accessibleCount, total: totalCount };
  };

  const accessibleStats = userAccessiblePermissions();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 z-10">
          <div className="flex items-center justify-between p-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {editingCompany ? 'Edit Company' : 'Create New Company'}
              </h2>
              <p className="text-gray-600 mt-1">Manage company details and permissions</p>
              
              {/* Access Information */}
              <div className="mt-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center gap-2 text-sm text-blue-800">
                  <ShieldCheck className="h-4 w-4" />
                  <span>
                    You have access to <span className="font-bold">{accessibleStats.accessible}</span> out of <span className="font-bold">{accessibleStats.total}</span> permissions
                  </span>
                </div>
              </div>
              
              {/* Permission Stats */}
              <div className="flex items-center gap-4 mt-3">
                <div className="flex items-center gap-2 text-sm">
                  <div className="flex items-center gap-1">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="font-medium">{permissionStats.enabled}</span>
                    <span className="text-gray-600">enabled</span>
                  </div>
                  <div className="text-gray-400">•</div>
                  <div className="flex items-center gap-1">
                    <AlertCircle className="h-4 w-4 text-gray-400" />
                    <span className="font-medium">{permissionStats.total - permissionStats.enabled}</span>
                    <span className="text-gray-600">disabled</span>
                  </div>
                </div>
                
                {/* Permission Type Breakdown */}
                <div className="flex items-center gap-3 text-xs">
                  <div className="flex items-center gap-1">
                    <EyeIcon className="h-3 w-3 text-blue-500" />
                    <span>{permissionStats.view}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FilePlus className="h-3 w-3 text-green-500" />
                    <span>{permissionStats.create}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Edit className="h-3 w-3 text-yellow-500" />
                    <span>{permissionStats.edit}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Trash className="h-3 w-3 text-red-500" />
                    <span>{permissionStats.delete}</span>
                  </div>
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-xl"
            >
              <X className="h-5 w-5 text-gray-500" />
            </button>
          </div>
        </div>

        <div className="p-6">
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <RefreshCw 
                  className="h-12 w-12 animate-spin mx-auto mb-4"
                  style={{ color: themeColors?.accentColor || '#ea580c' }}
                />
                <p className="text-gray-600">Loading company data...</p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleFormSubmit}>
              {/* Company Details Section */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Building className="h-5 w-5" /> Company Details
                </h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Company Name <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Enter company name"
                        value={formData.companyName}
                        onChange={e => setFormData(prev => ({ ...prev, companyName: e.target.value }))}
                        className={`w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 ${getRingColor()} focus:border-transparent`}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Username <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Enter username"
                        value={formData.username}
                        onChange={e => setFormData(prev => ({ ...prev, username: e.target.value }))}
                        className={`w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 ${getRingColor()} focus:border-transparent`}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Company ID <span className="text-red-600">*</span>
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          required
                          placeholder="Enter company ID"
                          value={formData.companyId}
                          onChange={e => setFormData(prev => ({ ...prev, companyId: e.target.value }))}
                          className={`flex-1 px-4 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 ${getRingColor()} focus:border-transparent`}
                        />
                        <button
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, companyId: `COMP-${Date.now().toString().slice(-6)}` }))}
                          className="px-4 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 text-sm font-medium"
                        >
                          Generate
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3.5 h-4 w-4 text-gray-400" />
                        <input
                          type="email"
                          placeholder="company@email.com"
                          value={formData.email}
                          onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
                          className={`w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 ${getRingColor()} focus:border-transparent`}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3.5 h-4 w-4 text-gray-400" />
                        <input
                          type="tel"
                          placeholder="+1 (555) 123-4567"
                          value={formData.phone}
                          onChange={e => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                          className={`w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 ${getRingColor()} focus:border-transparent`}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Address
                      </label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3.5 h-4 w-4 text-gray-400" />
                        <input
                          type="text"
                          placeholder="Company address"
                          value={formData.address}
                          onChange={e => setFormData(prev => ({ ...prev, address: e.target.value }))}
                          className={`w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 ${getRingColor()} focus:border-transparent`}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Security & Role Section */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Shield className="h-5 w-5" /> Security & Role
                </h3>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Role <span className="text-red-600">*</span>
                    </label>
                    <select
                      value={formData.role}
                      onChange={(e) => handleRoleChange(e.target.value)}
                      className={`w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 ${getRingColor()} focus:border-transparent`}
                      disabled={editingCompany?.role === 'superadmin' && loggedInUser.role !== 'superadmin'}
                    >
                      <option value="employee">Employee</option>
                      <option value="companyleader">Company Leader</option>
                      <option value="admin">Admin</option>
                      {loggedInUser.role === 'superadmin' && (
                        <option value="superadmin">Super Admin</option>
                      )}
                    </select>
                    {formData.role === 'superadmin' && (
                      <p className="text-xs text-purple-600 mt-2 flex items-center gap-1">
                        <ShieldCheck className="h-3 w-3" />
                        Super Admin: All view permissions are automatically enabled
                      </p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Password {!editingCompany && <span className="text-red-600">*</span>}
                    </label>
                    <div className="relative">
                      <Key className="absolute left-3 top-3.5 h-4 w-4 text-gray-400" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder={editingCompany ? 'New password (optional)' : 'Enter password'}
                        value={formData.password}
                        onChange={e => setFormData(prev => ({ ...prev, password: e.target.value }))}
                        className={`w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 ${getRingColor()} focus:border-transparent`}
                        required={!editingCompany}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3.5 text-gray-500"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  
                  {!editingCompany && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Confirm Password <span className="text-red-600">*</span>
                      </label>
                      <div className="relative">
                        <Key className="absolute left-3 top-3.5 h-4 w-4 text-gray-400" />
                        <input
                          type={showPassword ? 'text' : 'password'}
                          placeholder="Confirm password"
                          value={formData.confirmPassword}
                          onChange={e => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                          className={`w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 ${getRingColor()} focus:border-transparent`}
                          required
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Theme Selection */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Palette className="h-5 w-5" /> Theme Selection
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
                  {Object.values(THEMES).map(t => {
                    // Create color array from theme
                    const colors = [];
                    
                    // Extract colors from gradient if exists
                    if (t.gradient) {
                      const gradientColors = t.sidebarBg.match(/#[0-9A-Fa-f]{6}|rgb\([^)]+\)/g);
                      if (gradientColors) colors.push(...gradientColors);
                    }
                    
                    // Add accent color
                    if (t.accentColor) colors.push(t.accentColor);
                    
                    // Add sidebar color
                    if (t.sidebarBg && !t.sidebarBg.includes('gradient')) {
                      colors.push(t.sidebarBg);
                    }
                    
                    // Get unique colors
                    const uniqueColors = [...new Set(colors)].slice(0, 3);
                    
                    return (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, theme: t }))}
                        className={`relative p-3 rounded-xl border-2 transition-all hover:scale-105 ${
                          formData.theme.id === t.id 
                            ? 'shadow-lg' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        style={{ 
                          borderColor: formData.theme.id === t.id ? (t.accentColor || '#ea580c') : undefined,
                        }}
                      >
                        {/* Color Preview Stripes */}
                        <div className="h-12 rounded-lg overflow-hidden flex mb-2">
                          {uniqueColors.length > 0 ? (
                            uniqueColors.map((color, idx) => (
                              <div 
                                key={idx}
                                className="flex-1"
                                style={{ backgroundColor: color }}
                              />
                            ))
                          ) : (
                            <div 
                              className="w-full h-full"
                              style={{ 
                                background: t.gradient || 
                                `linear-gradient(135deg, ${t.sidebarBg || '#f97316'}, #ec4899)`
                              }}
                            />
                          )}
                        </div>
                        
                        {/* Theme Name */}
                        <div className="text-center">
                          <div className="font-medium text-xs text-gray-900 truncate">
                            {t.name}
                          </div>
                          <div className="text-[10px] text-gray-500 mt-0.5 truncate">
                            {t.accentColor || 'Multi'}
                          </div>
                        </div>
                        
                        {/* Selection Check */}
                        {formData.theme.id === t.id && (
                          <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                            <Check className="h-3 w-3 text-white" />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Permissions Section */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <Lock className="h-5 w-5" /> Module Permissions
                    <span className="text-sm font-normal text-gray-500">
                      ({accessibleStats.accessible} accessible out of {accessibleStats.total})
                    </span>
                  </h3>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span>Enabled</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                      <span>Disabled</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-blue-100 rounded-full border border-blue-300"></div>
                      <span>No Access</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  {MODULES.map(mod => {
                    // Filter sub-permissions that user can access
                    const accessibleSubPermissions = (SUB_PERMISSIONS[mod.name] || []).filter(sub => 
                      hasUserViewPermission(loggedInUserPermissions, mod.name, sub.name)
                    );

                    const totalSubPermissions = (SUB_PERMISSIONS[mod.name] || []).length;
                    
                    // Skip module if user has no access to any sub-permission
                    if (accessibleSubPermissions.length === 0) {
                      return null;
                    }

                    return (
                      <div key={mod.name} className="bg-gray-50 rounded-xl border overflow-hidden">
                        <button
                          type="button"
                          onClick={() => setOpenModule(openModule === mod.name ? null : mod.name)}
                          className="w-full flex justify-between items-center p-4 hover:bg-gray-100 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-white rounded-lg">
                              <mod.icon className="h-5 w-5 text-gray-700" />
                            </div>
                            <div className="text-left">
                              <div className="flex items-center gap-2">
                                <h4 className="font-semibold text-gray-900">{mod.name}</h4>
                                {accessibleSubPermissions.length < totalSubPermissions && (
                                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded">
                                    {accessibleSubPermissions.length}/{totalSubPermissions} accessible
                                  </span>
                                )}
                              </div>
                              <p className="text-sm text-gray-500">{accessibleSubPermissions.length} accessible permissions</p>
                            </div>
                          </div>
                          {openModule === mod.name ? (
                            <ChevronUp className="h-5 w-5 text-gray-500" />
                          ) : (
                            <ChevronDown className="h-5 w-5 text-gray-500" />
                          )}
                        </button>
                        
                        {openModule === mod.name && (
                          <div className="border-t border-gray-200 p-4 bg-white">
                            <div className="mb-2">
                              {formData.role === 'superadmin' && (
                                <div className="bg-purple-50 border border-purple-200 rounded-lg p-3 mb-4">
                                  <p className="text-sm text-purple-800 flex items-center gap-2">
                                    <ShieldCheck className="h-4 w-4" />
                                    Super Admin: All view permissions are enabled. Other permissions can be manually adjusted.
                                  </p>
                                </div>
                              )}
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                              {accessibleSubPermissions.map(perm => (
                                <div key={perm.name} className="bg-gray-50 rounded-lg p-4">
                                  <div className="flex items-center justify-between mb-3">
                                    <h5 className="font-medium text-gray-900">{perm.name}</h5>
                                    <div className="flex items-center gap-1 text-xs text-green-600 bg-green-50 px-2 py-1 rounded">
                                      <EyeIcon className="h-3 w-3" />
                                      Accessible
                                    </div>
                                  </div>
                                  <div className="grid grid-cols-2 gap-2">
                                    {['view', 'create', 'edit', 'delete'].map(type => {
                                      const checked = getPerm(mod.name, perm.name, type);
                                      const canModify = canModifyPermission(mod.name, perm.name, type);
                                      
                                      return (
                                        <label 
                                          key={type} 
                                          className={`flex items-center gap-2 ${canModify ? 'cursor-pointer' : 'cursor-not-allowed opacity-60'}`}
                                          title={!canModify ? 'You do not have permission to modify this' : ''}
                                        >
                                          <div className="relative">
                                            <input
                                              type="checkbox"
                                              checked={checked}
                                              onChange={() => canModify && togglePermission(mod.name, perm.name, type)}
                                              className="sr-only"
                                              disabled={!canModify}
                                            />
                                            <div className={`w-8 h-5 rounded-full transition-colors ${
                                              checked ? 'bg-green-500' : 'bg-gray-300'
                                            } ${!canModify ? 'opacity-50' : ''}`}>
                                              <div className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transform transition-transform ${
                                                checked ? 'translate-x-3' : ''
                                              }`} />
                                            </div>
                                          </div>
                                          <span className={`text-xs text-gray-700 capitalize ${!canModify ? 'opacity-50' : ''}`}>
                                            {type}
                                            {!canModify && type === 'view' && formData.role === 'superadmin' && (
                                              <span className="text-[10px] text-purple-600 ml-1">(auto)</span>
                                            )}
                                          </span>
                                        </label>
                                      );
                                    })}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}

                  {/* Show message if user has no access to any module */}
                  {MODULES.filter(mod => {
                    const accessibleSubPermissions = (SUB_PERMISSIONS[mod.name] || []).filter(sub => 
                      hasUserViewPermission(loggedInUserPermissions, mod.name, sub.name)
                    );
                    return accessibleSubPermissions.length > 0;
                  }).length === 0 && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 text-center">
                      <div className="flex flex-col items-center gap-3">
                        <LockIcon className="h-12 w-12 text-yellow-500" />
                        <div>
                          <h4 className="font-semibold text-yellow-800">No Permission Access</h4>
                          <p className="text-yellow-700 text-sm mt-1">
                            You do not have view permission for any module. You cannot set permissions for this company.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex items-center justify-end gap-3 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`px-8 py-3 ${getButtonGradient()} ${getButtonHover()} text-white text-sm font-medium rounded-xl flex items-center gap-2 disabled:opacity-70`}
                >
                  {isLoading ? (
                    <>
                      <RefreshCw className="h-4 w-4 animate-spin" />
                      {editingCompany ? 'Updating...' : 'Creating...'}
                    </>
                  ) : editingCompany ? (
                    <>
                      <Save className="h-4 w-4" /> Update Company
                    </>
                  ) : (
                    <>
                      <Plus className="h-4 w-4" /> Create Company
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default CompanyCreate;
