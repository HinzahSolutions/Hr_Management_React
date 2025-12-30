// src/pages/Settings.jsx
import React, { useState } from 'react';
import {
  ChevronDown,
  ChevronRight,
 
  Globe,
  Users,
  FileText,
  UserCheck,
  Clock,
  Calendar,
  DollarSign,
  TrendingUp,
  LogOut,
  Box,
  HelpCircle,
  Briefcase,
  Shield,
  Search,
  Plus,
} from 'lucide-react';

const menuItems = [
  {
    label: 'General',
    icon: Globe,
    submenus: [
      'General Settings',
      'Employee Permission',
      'Accessibility Restriction',
      'User Group',
      'Date & Time Format',
      'History Tags',
      'Mail Server',
      'Gdrive Backup',
    ],
  },
  {
    label: 'Base',
    icon: Shield,
    count: 2,
  },
  {
    label: 'Recruitment',
    icon: FileText,
    count: 0,
  },
  {
    label: 'Employee',
    icon: Users,
    count: 8,
  },
  {
    label: 'Attendance',
    icon: Clock,
    count: 0,
  },
  {
    label: 'Leave',
    icon: Calendar,
    count: 4,
  },
  {
    label: 'Payroll',
    icon: DollarSign,
    count: 0,
  },
  {
    label: 'Performance',
    icon: TrendingUp,
    count: 0,
  },
  {
    label: 'Offboarding',
    icon: LogOut,
    count: 0,
  },
  {
    label: 'Asset',
    icon: Box,
    count: 0,
  },
  {
    label: 'Helpdesk',
    icon: HelpCircle,
    count: 0,
  },
  {
    label: 'Project',
    icon: Briefcase,
    count: 0,
  },
];

const employees = [
  { name: 'Aakansha Rajput', code: 'WG1001', role: 'None | None' },
  { name: 'Abigail Roberts', code: 'PEP15', role: 'Senior | Senior Manager - (Managers) | Managers' },
  { name: 'Admin Test', code: 'PEP00', role: 'Junior | HR Manager - (Hr Dept) | Hr Dept' },
  { name: 'Akshita', code: 'SG001', role: 'Payroll, Recruitment | HR Executive - (Hr Dept) | Hr Dept' },
  { name: 'Ali Ahmed', code: 'PEP10000', role: 'Sales Manager | Sales Man - (Sales Dept) | Sales Dept' },
  { name: 'Anni Bell', code: '', role: 'None | None' },
  { name: 'Arpita', code: 'BSTE@434', role: 'Senior | Senior Manager - (Managers) | Managers' },
  { name: 'Asif Ahmad', code: 'PEP1079', role: 'Senior | Sales Manager - (Sales Dept) | Sales Dept' },
];

export default function Settings() {
  const [openSection, setOpenSection] = useState('General');
  const [selectedEmployee, setSelectedEmployee] = useState(employees[0]);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Left Sidebar */}
      <div className="w-80 bg-white border-r border-gray-200 overflow-y-auto">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
            <Settings className="w-7 h-7" />
            Settings
          </h2>
        </div>

        <nav className="px-4 pb-6">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isOpen = openSection === item.label;

            return (
              <div key={item.label} className="mb-1">
                <button
                  onClick={() => setOpenSection(isOpen ? null : item.label)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all
                    ${isOpen ? 'bg-orange-50 text-orange-600' : 'hover:bg-gray-100 text-gray-700'}`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                    {item.count !== undefined && (
                      <span className="ml-auto bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                        {item.count}
                      </span>
                    )}
                  </div>
                  {item.submenus ? (
                    isOpen ? <ChevronDown /> : <ChevronRight />
                  ) : null}
                </button>

                {/* Submenu */}
                {item.submenus && isOpen && (
                  <div className="ml-12 mt-2 space-y-2">
                    {item.submenus.map((sub) => (
                      <button
                        key={sub}
                        className={`block w-full text-left px-4 py-2 rounded-lg text-sm transition-all
                          ${sub === 'Employee Permission' ? 'bg-orange-100 text-orange-600 font-medium' : 'hover:bg-gray-100 text-gray-600'}`}
                      >
                        {sub}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Employee Permissions</h1>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search"
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <button className="bg-red-600 text-white px-6 py-2 rounded-lg flex items-center gap-2 hover:bg-red-700 transition">
                <Plus className="w-5 h-5" />
                Assign
              </button>
            </div>
          </div>

          {/* Employee List + Permissions */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Employee List */}
            <div className="lg:col-span-1 space-y-3">
              {employees.map((emp) => (
                <button
                  key={emp.name}
                  onClick={() => setSelectedEmployee(emp)}
                  className={`w-full flex items-center gap-4 p-4 rounded-lg border transition-all
                    ${selectedEmployee.name === emp.name
                      ? 'border-orange-500 bg-orange-50'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                >
                  <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 font-bold">
                    {emp.name[0]}
                  </div>
                  <div className="text-left">
                    <div className="font-medium text-gray-800">{emp.name}</div>
                    {emp.code && <div className="text-sm text-gray-500">({emp.code})</div>}
                    <div className="text-xs text-gray-500 mt-1">{emp.role}</div>
                  </div>
                  <ChevronRight className="ml-auto text-gray-400" />
                </button>
              ))}
            </div>

            {/* Permission Panel */}
            <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center text-2xl font-bold text-gray-600">
                    {selectedEmployee.name[0]}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">{selectedEmployee.name}</h3>
                    <p className="text-sm text-gray-500">{selectedEmployee.role}</p>
                  </div>
                </div>
                <span className="text-green-600 text-sm font-medium flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  Updated the permissions.
                </span>
              </div>

              {/* Module Permissions */}
              <div className="space-y-6">
                {['Base', 'Employee', 'Horilla documents', 'Horilla automations', 'Recruitment', 'Leave', 'Pms', 'Onboarding', 'Asset', 'Attendance', 'Payroll', 'Biometric', 'Helpdesk', 'Offboarding', 'Project'].map((module) => (
                  <div key={module} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                    <div className="flex items-center gap-4">
                      <input type="checkbox" className="w-5 h-5 text-orange-600 rounded" defaultChecked={module === 'Employee'} />
                      <span className="font-medium text-gray-700">{module}</span>
                    </div>
                    <div className="flex gap-3">
                      {['View', 'Create', 'Edit', 'Delete'].map((action) => (
                        <button
                          key={action}
                          className={`w-8 h-8 rounded-full border-2 transition-all
                            ${module === 'Employee' && action === 'View'
                              ? 'bg-red-500 border-red-500'
                              : 'border-gray-300 hover:border-gray-400'
                            }`}
                        >
                          {module === 'Employee' && action === 'View' && (
                            <span className="text-white text-xs">Check</span>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}