

// 'use client';

// import React, { useState, useEffect } from 'react';
// import {
//   FaSearch,
//   FaPlus,
//   FaBuilding,
//   FaCheck,
//   FaHome,
//   FaUsersCog,
//   FaUserPlus,
//   FaUserTie,
//   FaClock,
//   FaCalendarAlt,
//   FaFileInvoiceDollar,
//   FaSignOutAlt,
// } from 'react-icons/fa';
// import { ChevronDown, ChevronUp, Save } from 'lucide-react';
// import { useTheme } from './ThemeContext'; // adjust path if needed

// const MODULES = [
//   { name: 'Base', color: 'bg-gray-600', icon: FaHome },
//   { name: 'Recruitment', color: 'bg-blue-600', icon: FaUsersCog },
//   { name: 'Onboarding', color: 'bg-purple-600', icon: FaUserPlus },
//   { name: 'Employee', color: 'bg-green-600', icon: FaUserTie },
//   { name: 'Attendance', color: 'bg-yellow-600', icon: FaClock },
//   { name: 'Leave', color: 'bg-red-600', icon: FaCalendarAlt },
//   { name: 'Payroll', color: 'bg-teal-600', icon: FaFileInvoiceDollar },
//   { name: 'Offboarding', color: 'bg-rose-600', icon: FaSignOutAlt },
// ];

//  const SUB_PERMISSIONS = {
//   Base: [
//      { code: 'CO', name: 'Company', color: 'bg-blue-600' },
//      { code: 'DE', name: 'Permission Assign', color: 'bg-purple-500' },
//    ],
//    Recruitment: [
//      { code: 'RE', name: 'Recruitment', color: 'bg-green-500' },
//      { code: 'RD', name: 'Recruitment Dashboard', color: 'bg-blue-500' },
//   ],
//    Onboarding: [
//      { code: 'OB', name: 'Onboarding', color: 'bg-green-500' },
//      { code: 'OC', name: 'Candidates', color: 'bg-blue-500' },
//    ],
//    Employee: [
//      { code: 'EM', name: 'Employee', color: 'bg-green-500' },
//      { code: 'EP', name: 'Employee Profile', color: 'bg-green-400' },
//     { code: 'EM', name: 'Employees', color: 'bg-blue-500' },
//      { code: 'DR', name: 'Document Requests', color: 'bg-teal-500' },
//      { code: 'SR', name: 'Shift Requests', color: 'bg-cyan-500' },
//      { code: 'WTR', name: 'Work Type Requests', color: 'bg-blue-500' },
//      { code: 'RSA', name: 'Rotating Shift Assign', color: 'bg-teal-500' },
//    ],
//    Attendance: [
//     { code: 'AD', name: 'Attendance Dashboard', color: 'bg-green-500' },
//      { code: 'BD', name: 'Biometric Devices', color: 'bg-green-400' },
//      { code: 'ATT', name: 'Attendances', color: 'bg-blue-500' },
//      { code: 'WR', name: 'Work Records', color: 'bg-teal-500' },
//     { code: 'SR', name: 'Shift Requests', color: 'bg-cyan-500' },
//      { code: 'WTR', name: 'Work Type Requests', color: 'bg-blue-500' },
//      { code: 'RSA', name: 'Rotating Shift Assign', color: 'bg-teal-500' },
//    ],
//    Leave: [
//      { code: 'LD', name: 'Leave Dashboard', color: 'bg-green-500' },
//      { code: 'MLR', name: 'My Leave Requests', color: 'bg-green-400' },
//      { code: 'LR', name: 'Leave Requests', color: 'bg-blue-500' },
//     { code: 'LT', name: 'Leave Types', color: 'bg-teal-500' },
//      { code: 'AAL', name: 'All Assigned Leaves', color: 'bg-cyan-500' },
//   ],
//    Payroll: [
//      { code: 'PD', name: 'Payroll Dashboard', color: 'bg-green-500' },
//     { code: 'PC', name: 'Payroll Contract', color: 'bg-green-400' },
//      { code: 'PS', name: 'Payroll Payslip', color: 'bg-blue-500' },
//      { code: 'PLA', name: 'Payroll Loan / Advanced Salary', color: 'bg-teal-500' },
//    ],
//    Offboarding: [
//      { code: 'OFFD', name: 'Offboarding Dashboard', color: 'bg-green-500' },
//      { code: 'OFF', name: 'Offboardings', color: 'bg-green-400' },
//    ],
//  };


// export default function PermissionAssign() {
//   const { theme } = useTheme();

//   const [companies, setCompanies] = useState([]);
//   const [selectedCompany, setSelectedCompany] = useState(null);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [openModule, setOpenModule] = useState(null);
//   const [saved, setSaved] = useState(false);
//   const [permissions, setPermissions] = useState({});

//   useEffect(() => {
//     const data = JSON.parse(localStorage.getItem('companies') || '[]');
//     setCompanies(data);
//     if (data.length > 0 && !selectedCompany) setSelectedCompany(data[0]);

//     const permObj = {};
//     data.forEach(c => permObj[c.id] = c.permissions || {});
//     setPermissions(permObj);
//   }, []);

//   const togglePermission = (module, code, type) => {
//     if (!selectedCompany) return;
//     setPermissions(prev => ({
//       ...prev,
//       [selectedCompany.id]: {
//         ...prev[selectedCompany.id],
//         [module]: {
//           ...prev[selectedCompany.id]?.[module],
//           [code]: {
//             ...prev[selectedCompany.id]?.[module]?.[code],
//             [type]: !prev[selectedCompany.id]?.[module]?.[code]?.[type],
//           },
//         },
//       },
//     }));
//   };

//   const getPerm = (module, code, type) =>
//     permissions[selectedCompany?.id]?.[module]?.[code]?.[type] || false;

//   const handleSave = () => {
//     const updated = companies.map(c =>
//       c.id === selectedCompany.id ? { ...c, permissions: permissions[c.id] } : c
//     );
//     setCompanies(updated);
//     localStorage.setItem('companies', JSON.stringify(updated));
//     setSaved(true);
//     setTimeout(() => setSaved(false), 3000);
//   };

//   const filtered = companies.filter(c =>
//     c.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
//     (c.companyId || '').toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   return (
//     <div className="flex min-h-screen bg-gray-50">
//       {/* Left Sidebar – Company List */}
//       <div className="w-80 bg-white border-r border-gray-200 shadow-lg">
//         <div className="p-6 border-b border-gray-200">
//           <h2 className="text-lg font-bold text-gray-800">Companies ({companies.length})</h2>
//         </div>
//         <div className="p-4 space-y-3 overflow-y-auto h-full pb-32">
//           {filtered.map(company => (
//             <div
//               key={company.id}
//               onClick={() => setSelectedCompany(company)}
//               className={`p-4 rounded-xl cursor-pointer transition-all duration-300 border-2 ${
//                 selectedCompany?.id === company.id
//                   ? `border-${theme.accent} bg-${theme.accent}/5 shadow-md`
//                   : 'border-transparent hover:bg-gray-50'
//               }`}
//             >
//               <div className="flex items-center gap-4">
//                 <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${theme.gradient} flex items-center justify-center text-white font-bold text-lg shadow`}>
//                   {company.username[0].toUpperCase()}
//                 </div>
//                 <div className="flex-1">
//                   <p className="font-semibold text-gray-900">{company.username}</p>
//                   <p className="text-sm text-gray-500">{company.companyId || '—'}</p>
//                 </div>
//                 <span className={`px-3 py-1 rounded-full text-xs font-bold ${
//                   company.role === 'superadmin'
//                     ? 'bg-purple-100 text-purple-700'
//                     : `bg-${theme.accent}/10 text-${theme.accent}`
//                 }`}>
//                   {company.role.toUpperCase()}
//                 </span>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Right Panel */}
//       <div className="flex-1 p-8">
//         {/* Header */}
//         <div className="mb-8 flex justify-between items-center">
//           <h1 className="text-3xl font-bold text-gray-800">Permission Management</h1>
//           <div className="flex gap-4">
//             <div className="relative">
//               <FaSearch className="absolute left-3 top-3 text-gray-400" />
//               <input
//                 type="text"
//                 placeholder="Search companies..."
//                 value={searchQuery}
//                 onChange={e => setSearchQuery(e.target.value)}
//                 className="pl-10 pr-4 py-3 w-72 border border-gray-300 rounded-xl focus:ring-4 focus:ring-cyan-300 focus:border-cyan-500 outline-none transition"
//               />
//             </div>
//             <button className={`px-6 py-3 bg-gradient-to-r ${theme.button} text-white rounded-xl shadow-lg hover:shadow-xl flex items-center gap-2 font-medium transition transform hover:scale-105`}>
//               <FaPlus /> Create Company
//             </button>
//           </div>
//         </div>

//         {selectedCompany ? (
//           <>
//             {/* Selected Company Card */}
//             <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
//               <div className="flex items-center gap-5">
//                 <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${theme.gradient} flex items-center justify-center text-white text-3xl font-bold shadow-xl`}>
//                   {selectedCompany.username[0].toUpperCase()}
//                 </div>
//                 <div>
//                   <h2 className="text-2xl font-bold text-gray-900">{selectedCompany.username}</h2>
//                   <p className="text-gray-600">
//                     {selectedCompany.companyId || '—'} • <span className="capitalize">{selectedCompany.role}</span>
//                   </p>
//                 </div>
//               </div>
//             </div>

//             {/* Modules */}
//             <div className="space-y-4">
//               {MODULES.map(mod => (
//                 <div key={mod.name} className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden">
//                   <div
//                     onClick={() => setOpenModule(openModule === mod.name ? null : mod.name)}
//                     className="flex items-center justify-between p-5 cursor-pointer hover:bg-gray-50 transition"
//                   >
//                     <div className="flex items-center gap-4">
//                       <div className={`w-4 h-4 rounded-full ${mod.color}`}></div>
//                       <span className="font-semibold text-gray-800 flex items-center gap-3">
//                         <mod.icon className="text-lg" />
//                         {mod.name}
//                       </span>
//                     </div>
//                     {openModule === mod.name ? <ChevronUp /> : <ChevronDown />}
//                   </div>

//                   {openModule === mod.name && SUB_PERMISSIONS[mod.name] && (
//                     <div className="border-t border-gray-200">
//                       {SUB_PERMISSIONS[mod.name].map(perm => (
//                         <div
//                           key={perm.code}
//                           className="flex items-center gap-6 px-6 py-4 hover:bg-gray-50 transition"
//                         >
//                           <div className={`w-12 h-12 rounded-xl ${perm.color} flex items-center justify-center text-white font-bold text-sm shadow-md`}>
//                             {perm.code}
//                           </div>
//                           <span className="flex-gray-800 font-medium flex-1">{perm.name}</span>

//                           <div className="flex gap-8">
//                             {['view', 'create', 'edit', 'delete'].map(type => {
//                               const checked = getPerm(mod.name, perm.code, type);
//                               return (
//                                 <div key={type} className="flex flex-col items-center">
//                                   <span className="text-xs text-gray-500 mb-1 capitalize">{type}</span>
//                                   <button
//                                     onClick={e => {
//                                       e.stopPropagation();
//                                       togglePermission(mod.name, perm.code, type);
//                                     }}
//                                     className={`relative inline-flex h-7 w-12 items-center rounded-full transition-all duration-300 ${
//                                       checked ? `bg-${theme.accent}` : 'bg-gray-300'
//                                     } shadow-inner`}
//                                   >
//                                     <span className={`inline-block h-6 w-6 rounded-full bg-white shadow-lg transform transition-transform duration-300 ${
//                                       checked ? 'translate-x-6' : 'translate-x-0.5'
//                                     }`} />
//                                   </button>
//                                 </div>
//                               );
//                             })}
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               ))}
//             </div>

//             {/* Save Button */}
//             <div className="fixed bottom-8 right-8 z-50">
//               <button
//                 onClick={handleSave}
//                 className={`bg-gradient-to-r ${theme.button} text-white px-10 py-4 rounded-2xl shadow-2xl flex items-center gap-3 text-lg font-bold hover:scale-105 transition transform`}
//               >
//                 <Save className="w-6 h-6" /> Save Permissions
//               </button>
//             </div>

//             {saved && (
//               <div className="fixed bottom-24 right-8 bg-emerald-500 text-white px-8 py-4 rounded-2xl shadow-2xl flex items-center gap-3 animate-pulse z-50">
//                 <FaCheck className="text-2xl" /> Saved Successfully!
//               </div>
//             )}
//           </>
//         ) : (
//           <div className="flex items-center justify-center h-96 text-gray-400 text-xl">
//             ← Select a company to manage permissions
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// src/components/PermissionAssign.jsx
'use client';

import React, { useState, useEffect } from 'react';
import { FaSearch, FaCheck, FaSpinner } from 'react-icons/fa';
import { ChevronDown, ChevronUp, Save } from 'lucide-react';
import { useTheme } from './ThemeContext';
import { MODULES, SUB_PERMISSIONS } from './data/navdata'; // Adjust path if needed

export default function PermissionAssign() {
  const { theme = { accent: 'cyan-600', gradient: 'from-cyan-500 to-blue-600', button: 'from-cyan-500 to-blue-600' } } = useTheme();

  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [openModule, setOpenModule] = useState(null);
  const [permissions, setPermissions] = useState({});

  const [isLoadingCompany, setIsLoadingCompany] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('companies') || '[]');
    setCompanies(data);

    const permObj = {};
    data.forEach(company => {
      permObj[company.id] = {};

      MODULES.forEach(mod => {
        permObj[company.id][mod.name] = {};
        (SUB_PERMISSIONS[mod.name] || []).forEach(sub => {
          const saved = company.permissions?.[mod.name]?.[sub.name]; // Use .name instead of .code
          permObj[company.id][mod.name][sub.name] = {
            view: saved?.view ?? true,
            create: saved?.create ?? false,
            edit: saved?.edit ?? false,
            delete: saved?.delete ?? false,
          };
        });
      });
    });

    setPermissions(permObj);

    if (data.length > 0 && !selectedCompany) {
      handleSelectCompany(data[0]);
    }
  }, []);

  const handleSelectCompany = (company) => {
    setIsLoadingCompany(true);
    setSelectedCompany(company);
    setOpenModule(null);
    setTimeout(() => setIsLoadingCompany(false), 600);
  };

  const togglePermission = (moduleName, subName, type) => {
    if (!selectedCompany || isSaving) return;

    setPermissions(prev => ({
      ...prev,
      [selectedCompany.id]: {
        ...prev[selectedCompany.id],
        [moduleName]: {
          ...prev[selectedCompany.id][moduleName],
          [subName]: {
            ...prev[selectedCompany.id][moduleName][subName],
            [type]: !prev[selectedCompany.id][moduleName][subName][type],
          },
        },
      },
    }));
  };

  const getPerm = (moduleName, subName, type) => {
    return permissions[selectedCompany?.id]?.[moduleName]?.[subName]?.[type] ?? false;
  };

  const handleSave = async () => {
    if (!selectedCompany || isSaving) return;

    setIsSaving(true);

    const updatedCompanies = companies.map(c =>
      c.id === selectedCompany.id
        ? { ...c, permissions: permissions[c.id] }
        : c
    );

    await new Promise(resolve => setTimeout(resolve, 1200));

    setCompanies(updatedCompanies);
    localStorage.setItem('companies', JSON.stringify(updatedCompanies));

    setIsSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const filtered = companies.filter(c =>
    c.username?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (c.companyId || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-80 bg-white border-r border-gray-200 shadow-lg flex flex-col">
        <div className="p-6 border-b">
          <h2 className="text-lg font-bold text-gray-800">Companies ({companies.length})</h2>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {filtered.map(company => (
            <div
              key={company.id}
              onClick={() => handleSelectCompany(company)}
              className={`p-4 rounded-xl cursor-pointer border-2 transition-all duration-300 ${
                selectedCompany?.id === company.id
                  ? `border-${theme.accent} bg-${theme.accent}/5 shadow-md`
                  : 'border-transparent hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${theme.gradient} flex items-center justify-center text-white font-bold text-lg shadow`}>
                  {company.username?.[0]?.toUpperCase() || '?'}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900 truncate">{company.username}</p>
                  <p className="text-sm text-gray-500">{company.companyId || '—'}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  company.role === 'superadmin' ? 'bg-purple-100 text-purple-700' : `bg-${theme.accent}/10 text-${theme.accent}`
                }`}>
                  {company.role?.toUpperCase() || 'USER'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-y-auto relative">
        <div className="mb-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800">Permission Management</h1>
          <div className="relative">
            <FaSearch className="absolute left-3 top-3.5 text-gray-400" />
            <input
              type="text"
              placeholder="Search companies..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-3 w-72 border border-gray-300 rounded-xl focus:ring-4 focus:ring-cyan-300 outline-none"
            />
          </div>
        </div>

        {isLoadingCompany ? (
          <div className="flex flex-col items-center justify-center h-96 text-gray-500">
            <FaSpinner className="w-12 h-12 animate-spin text-cyan-600 mb-4" />
            <p className="text-lg">Loading permissions...</p>
          </div>
        ) : selectedCompany ? (
          <>
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border">
              <div className="flex items-center gap-5">
                <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${theme.gradient} flex items-center justify-center text-white text-3xl font-bold shadow-xl`}>
                  {selectedCompany.username[0].toUpperCase()}
                </div>
                <div>
                  <h2 className="text-2xl font-bold">{selectedCompany.username}</h2>
                  <p className="text-gray-600">{selectedCompany.companyId || '—'} • {selectedCompany.role}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {MODULES.map(mod => (
                <div key={mod.name} className="bg-white rounded-2xl shadow-md border overflow-hidden">
                  <div
                    onClick={() => setOpenModule(openModule === mod.name ? null : mod.name)}
                    className="flex justify-between items-center p-5 cursor-pointer hover:bg-gray-50 transition"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-4 h-4 rounded-full ${mod.color}`}></div>
                      <span className="font-semibold flex items-center gap-3">
                        <mod.icon className="text-xl" />
                        {mod.name}
                      </span>
                    </div>
                    {openModule === mod.name ? <ChevronUp /> : <ChevronDown />}
                  </div>

                  {openModule === mod.name && (
                    <div className="border-t">
                      {SUB_PERMISSIONS[mod.name].map(perm => (
                        <div key={perm.name} className="flex items-center gap-6 px-6 py-4 hover:bg-gray-50">
                          <span className="w-48 font-medium text-gray-800">{perm.name}</span>

                          <div className="flex gap-10">
                            {['view', 'create', 'edit', 'delete'].map(type => {
                              const checked = getPerm(mod.name, perm.name, type);
                              return (
                                <label key={type} className="flex flex-col items-center cursor-pointer">
                                  <span className="text-xs text-gray-500 mb-1 capitalize">{type}</span>
                                  <button
                                    type="button"
                                    disabled={isSaving}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      togglePermission(mod.name, perm.name, type);
                                    }}
                                    className={`relative inline-flex h-7 w-12 rounded-full transition-all duration-300 ${
                                      checked ? `bg-${theme.accent}` : 'bg-gray-300'
                                    } ${isSaving ? 'opacity-50 cursor-not-allowed' : ''}`}
                                  >
                                    <span className={`inline-block h-6 w-6 rounded-full bg-white shadow-lg transform transition-transform duration-300 ${
                                      checked ? 'translate-x-6' : 'translate-x-0.5'
                                    }`} />
                                  </button>
                                </label>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-96 text-gray-400 text-xl">
            Select a company to manage permissions
          </div>
        )}

        {/* Save Button */}
        {selectedCompany && (
          <div className="fixed bottom-8 right-8 z-50">
            <button
              onClick={handleSave}
              disabled={isSaving}
              className={`bg-gradient-to-r ${theme.button} text-white px-10 py-4 rounded-2xl shadow-2xl flex items-center gap-3 text-lg font-bold hover:scale-105 active:scale-95 transition transform disabled:opacity-70`}
            >
              {isSaving ? (
                <>
                  <FaSpinner className="w-6 h-6 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-6 h-6" />
                  Save Permissions
                </>
              )}
            </button>
          </div>
        )}

        {/* Success Toast */}
        {saved && (
          <div className="fixed bottom-28 right-8 bg-emerald-500 text-white px-8 py-4 rounded-2xl shadow-2xl flex items-center gap-3 animate-pulse z-50">
            <FaCheck className="text-2xl" />
            Permissions Saved Successfully!
          </div>
        )}
      </div>
    </div>
  );
}