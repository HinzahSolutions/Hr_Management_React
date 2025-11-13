'use client';

import React, { useState } from 'react';
import {
  Search,
  Filter,
  MoreVertical,
  Copy,
  Edit2,
  Trash2,
  CheckCircle,
  XCircle,
  Plus,
  ChevronDown,
  User,
  Clock,
  Calendar,
  Home,
  Building,
  Briefcase,
  Users,
  FileText,
  AlertCircle,
  Menu,
  X,
  Globe
} from 'lucide-react';

const sidebarItems = [
  { icon: <Home className="h-5 w-5" />, label: 'Dashboard', active: false },
  { icon: <Briefcase className="h-5 w-5" />, label: 'Recruitment', active: false },
  { icon: <Users className="h-5 w-5" />, label: 'Onboarding', active: false },
  { icon: <User className="h-5 w-5" />, label: 'Employee', active: true, subItems: [
    'Profile', 'Employees', 'Document Requests', 'Shift Requests', 'Work Type Requests',
    'Rotating Shift Assign', 'Rotating Work Type Assign', 'Disciplinary Actions', 'Policies', 'Organization Chart'
  ]},
  { icon: <Clock className="h-5 w-5" />, label: 'Attendance', active: false },
  { icon: <Calendar className="h-5 w-5" />, label: 'Leave', active: false },
];

const shiftRequests = [
  { id: 1, name: 'Asif Ahmad', code: 'PEP1079', comment: true, approved: true, rejected: false },
  { id: 2, name: 'Vandita Sharma', code: 'PEP00', comment: false, approved: true, rejected: false },
  { id: 3, name: 'Vandita Sharma', code: 'PEP00', comment: true, approved: true, rejected: false },
  { id: 4, name: 'Charlotte White', code: 'PEP19', comment: false, approved: true, rejected: false },
  { id: 5, name: 'test Kp', code: 'PEP1005', comment: true, approved: true, rejected: false },
  { id: 6, name: 'Test', code: 'PEP1001', comment: false, approved: true, rejected: false },
  { id: 7, name: 'Vandita Sharma', code: 'PEP00', comment: true, approved: true, rejected: false },
  { id: 8, name: 'Vandita Sharma', code: 'PEP00', comment: false, approved: true, rejected: false },
];

export default function ShiftRequests() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedAll, setSelectedAll] = useState(false);
  const [selectedRows, setSelectedRows] = useState({});

  const handleSelectAll = () => {
    const newSelected = {};
    shiftRequests.forEach((_, i) => (newSelected[i] = !selectedAll));
    setSelectedRows(newSelected);
    setSelectedAll(!selectedAll);
  };

  const handleSelectRow = (index) => {
    const newSelected = { ...selectedRows, [index]: !selectedRows[index] };
    setSelectedRows(newSelected);
    setSelectedAll(Object.values(newSelected).every(v => v));
  };

  return (
    <>
      {/* ====================== SIDEBAR (Mobile Toggle) ====================== */}
    
      {/* ====================== MAIN LAYOUT ====================== */}
      <div className="flex h-screen bg-gray-50">
        {/* Desktop Sidebar */}
      
        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
       

          {/* Page Content */}
          <main className="flex-1 overflow-y-auto p-4 sm:p-6">
            <div className="max-w-7xl mx-auto">
              {/* Title + Actions */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Shift Requests</h1>
                <div className="flex flex-wrap items-center gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search"
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500 w-full sm:w-64"
                    />
                  </div>
                  <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm flex items-center gap-2 hover:bg-gray-50">
                    <Filter className="h-4 w-4" /> Filter
                  </button>
                  <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm flex items-center gap-2 hover:bg-gray-50">
                    <MoreVertical className="h-4 w-4" /> Group By
                  </button>
                  <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm flex items-center gap-2 hover:bg-gray-50">
                    Actions <ChevronDown className="h-4 w-4" />
                  </button>
                  <button className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm flex items-center gap-2 hover:bg-red-700">
                    + Create
                  </button>
                </div>
              </div>

              {/* Select All + Legend */}
              <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                <button
                  onClick={handleSelectAll}
                  className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    selectedAll
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {selectedAll ? 'Deselect All Shifts' : 'Select All Shifts'}
                </button>
                <div className="flex items-center gap-4 text-sm">
                  <span className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div> Approved
                  </span>
                  <span className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div> Rejected
                  </span>
                </div>
              </div>

              {/* Table */}
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-4 py-3 text-left">
                          <input
                            type="checkbox"
                            checked={selectedAll}
                            onChange={handleSelectAll}
                            className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                          />
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                          Employee
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                          Comment
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                          Actions
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                          Confirmation
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700"></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {shiftRequests.map((req, index) => (
                        <tr key={req.id} className="hover:bg-gray-50">
                          <td className="px-4 py-3">
                            <input
                              type="checkbox"
                              checked={selectedRows[index] || false}
                              onChange={() => handleSelectRow(index)}
                              className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                            />
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-xs font-medium text-gray-700">
                                {req.name.split(' ').map(n => n[0]).join('')}
                              </div>
                              <div>
                                <div className="text-sm font-medium text-gray-900">{req.name}</div>
                                <div className="text-xs text-gray-500">({req.code})</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-center">
                            {req.comment ? (
                              <FileText className="h-5 w-5 text-gray-500 mx-auto" />
                            ) : (
                              <span className="text-gray-300">—</span>
                            )}
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-1">
                              <button className="p-1.5 hover:bg-gray-100 rounded">
                                <Copy className="h-4 w-4 text-gray-600" />
                              </button>
                              <button className="p-1.5 hover:bg-gray-100 rounded">
                                <Edit2 className="h-4 w-4 text-gray-600" />
                              </button>
                              <button className="p-1.5 hover:bg-gray-100 rounded">
                                <Trash2 className="h-4 w-4 text-red-600" />
                              </button>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <button className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1 ${
                                req.approved
                                  ? 'bg-green-100 text-green-700'
                                  : 'bg-gray-100 text-gray-700'
                              }`}>
                                <CheckCircle className="h-3 w-3" /> Approved
                              </button>
                              <button className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1 ${
                                req.rejected
                                  ? 'bg-red-100 text-red-700'
                                  : 'bg-gray-100 text-gray-700'
                              }`}>
                                <XCircle className="h-3 w-3" /> Rejected
                              </button>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-right">
                            <button className="p-1.5 hover:bg-gray-100 rounded">
                              <MoreVertical className="h-4 w-4 text-gray-600" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* FAB */}
      <button className="fixed bottom-6 right-6 w-14 h-14 bg-red-600 text-white rounded-full shadow-lg hover:bg-red-700 flex items-center justify-center z-10">
        <Plus className="h-6 w-6" />
      </button>
    </>
  );
}

/* ====================== SIDEBAR CONTENT ====================== */
function SidebarContent() {
  return (
    <div>
      <div className="flex items-center gap-2 mb-8">
        <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
          H
        </div>
        <div>
          <div className="font-bold text-lg">Horilla</div>
          <div className="text-xs text-gray-400">My Company</div>
        </div>
      </div>
      <nav className="space-y-1">
        {sidebarItems.map((item, idx) => (
          <div key={idx}>
            <button
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                item.active
                  ? 'bg-gray-800 text-white'
                  : 'text-gray-400 hover:bg-gray-800 hover:text-white'
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
            {item.active && item.subItems && (
              <div className="ml-8 mt-1 space-y-1">
                {item.subItems.map((sub, i) => (
                  <button
                    key={i}
                    className={`block w-full text-left px-3 py-1.5 text-xs rounded transition-colors ${
                      sub === 'Shift Requests'
                        ? 'bg-red-600 text-white'
                        : 'text-gray-400 hover:text-white hover:bg-gray-800'
                    }`}
                  >
                    {sub}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </div>
  );
}