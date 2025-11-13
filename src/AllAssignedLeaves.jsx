'use client';

import React, { useState } from 'react';
import {
  Search,
  Filter,
  Grid3X3,
  MoreVertical,
  Plus,
  X,
  ChevronDown,
  ChevronRight,
  User,
} from 'lucide-react';

export default function AllAssignedLeaves() {
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedLeaveType, setSelectedLeaveType] = useState('');
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [employeeSearch, setEmployeeSearch] = useState('');
  const [selectAll, setSelectAll] = useState(false);
  const [filters, setFilters] = useState([]);
  const [expandedGroups, setExpandedGroups] = useState({});

  // Mock leave types with assigned employees
  const leaveGroups = [
    {
      id: 1,
      type: 'marriage leave',
      count: 2,
      badgeColor: 'bg-red-600',
      employees: [
        { id: 1, name: 'Madison Kelly (PEP35)', available: 1.0, carry: 0.0, total: 1.0, used: 0, ass: '12 N' },
        { id: 2, name: 'Dev Prakash (PEP00)', available: 10.0, carry: 0.0, total: 10.0, used: 0, ass: '12 N' },
      ],
    },
    {
      id: 2,
      type: 'local',
      count: 1,
      badgeColor: 'bg-red-600',
      employees: [
        { id: 3, name: 'Dev Prakash (PEP00)', available: 2.0, carry: 0.0, total: 2.0, used: 0, ass: '10 N' },
      ],
    },
    {
      id: 3,
      type: 'test',
      count: 5,
      badgeColor: 'bg-red-600',
      employees: [],
    },
    {
      id: 4,
      type: 'Casual Leave',
      count: 5,
      badgeColor: 'bg-red-600',
      employees: [],
    },
    {
      id: 5,
      type: 'Maternity Leave',
      count: 13,
      badgeColor: 'bg-red-600',
      employees: [],
    },
    {
      id: 6,
      type: 'Sick Leave',
      count: 78,
      badgeColor: 'bg-red-600',
      employees: [],
    },
    {
      id: 7,
      type: 'Casual Leave',
      count: 75,
      badgeColor: 'bg-red-600',
      employees: [],
    },
    {
      id: 8,
      type: 'Compensatory Leave Type',
      count: 12,
      badgeColor: 'bg-red-600',
      employees: [],
    },
  ];

  // All employees for modal
  const allEmployees = [
    { id: 1, name: 'Daniel Foster (PEP06)', avatar: 'DF' },
    { id: 2, name: 'David King (PEP10)', avatar: 'DK' },
    { id: 3, name: 'Deepak Sharma (DEEPAK1)', avatar: 'DS' },
    { id: 4, name: 'Deepak Das', avatar: 'DD' },
    { id: 5, name: 'Demetria Abbey (PEP123)', avatar: 'DA' },
    { id: 6, name: 'Aria Powell (PEP43)', avatar: 'AP' },
    { id: 7, name: 'Arpita (BSTEG434)', avatar: 'A' },
    { id: 8, name: 'Asif Ahmad (PEP1079)', avatar: 'AA' },
    { id: 9, name: 'Ava Mitchell', avatar: 'AM' },
    { id: 10, name: 'Avery Hill (PEP31)', avatar: 'AH' },
    { id: 11, name: 'Ayaan kar (PEP1000)', avatar: 'AK' },
    { id: 12, name: 'BALAHARSHINI U (BI3100)', avatar: 'BU' },
  ];

  const filteredEmployees = allEmployees.filter(emp =>
    emp.name.toLowerCase().includes(employeeSearch.toLowerCase())
  );

  const toggleGroup = (id) => {
    setExpandedGroups(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const openAssignModal = () => {
    setShowAssignModal(true);
  };

  const addFilter = (field, value) => {
    if (!filters.find(f => f.field === field && f.value === value)) {
      setFilters([...filters, { field, value }]);
    }
  };

  const removeFilter = (index) => {
    setFilters(filters.filter((_, i) => i !== index));
  };

  const toggleEmployee = (id) => {
    setSelectedEmployees(prev =>
      prev.includes(id) ? prev.filter(e => e !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectAll) {
      setSelectedEmployees([]);
    } else {
      setSelectedEmployees(filteredEmployees.map(e => e.id));
    }
    setSelectAll(!selectAll);
  };

  return (
    <>
      {/* ====================== HEADER ====================== */}
      <div className="bg-white border-b border-gray-200 px-4 sm:px-6 py-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h1 className="text-2xl font-bold text-gray-900">All Assigned Leaves</h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Search className="h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search"
                className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm w-48 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
            <button className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm flex items-center gap-2 hover:bg-gray-50">
              <Filter className="h-4 w-4" /> Filter
            </button>
            <button className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm flex items-center gap-2 hover:bg-gray-50">
              <Grid3X3 className="h-4 w-4" /> Group By
            </button>
            <button className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm flex items-center gap-2 hover:bg-gray-50">
              <MoreVertical className="h-4 w-4" /> Actions
            </button>
            <button
              onClick={openAssignModal}
              className="px-4 py-1.5 bg-red-600 text-white rounded-lg text-sm flex items-center gap-2 hover:bg-red-700"
            >
              <Plus className="h-4 w-4" /> Assign
            </button>
          </div>
        </div>

        {/* Filters */}
        {filters.length > 0 && (
          <div className="flex items-center gap-2 mt-3 flex-wrap">
            <span className="text-sm text-orange-600 font-medium">Filters:</span>
            {filters.map((f, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1 px-2 py-1 bg-orange-100 text-orange-700 rounded-full text-xs"
              >
                Field: {f.field} {f.value}
                <button onClick={() => removeFilter(i)} className="ml-1">
                  <X className="h-3 w-3" />
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* ====================== CONTENT ====================== */}
      <div className="p-4 sm:p-6 bg-gray-50">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-200">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                className="rounded border-gray-300"
              />
              <span className="text-green-600 font-medium">Select All Leaves</span>
            </label>
          </div>

          <div className="divide-y divide-gray-200">
            {leaveGroups.map(group => (
              <div key={group.id}>
                {/* Group Header */}
                <div
                  className="flex items-center justify-between p-4 hover:bg-gray-50 cursor-pointer"
                  onClick={() => toggleGroup(group.id)}
                >
                  <div className="flex items-center gap-3">
                    {expandedGroups[group.id] ? (
                      <ChevronDown className="h-5 w-5 text-gray-500" />
                    ) : (
                      <ChevronRight className="h-5 w-5 text-gray-500" />
                    )}
                    <span className={`inline-flex items-center justify-center w-6 h-6 ${group.badgeColor} text-white text-xs font-bold rounded-full`}>
                      {group.count}
                    </span>
                    <span className="font-medium text-gray-900">{group.type}</span>
                  </div>
                </div>

                {/* Employees Table (only if expanded and has employees) */}
                {expandedGroups[group.id] && group.employees.length > 0 && (
                  <div className="px-4 pb-4">
                    <table className="w-full">
                      <thead className="bg-gray-50 text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <tr>
                          <th className="px-4 py-2 text-left">
                            <input type="checkbox" className="rounded border-gray-300" />
                          </th>
                          <th className="px-4 py-2 text-left">Employee</th>
                          <th className="px-4 py-2 text-left">Leave Type</th>
                          <th className="px-4 py-2 text-left">Available Days</th>
                          <th className="px-4 py-2 text-left">Carryforward Days</th>
                          <th className="px-4 py-2 text-left">Total Leave Days</th>
                          <th className="px-4 py-2 text-left">Used Leave Days</th>
                          <th className="px-4 py-2 text-left">Ass</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {group.employees.map(emp => (
                          <tr key={emp.id} className="hover:bg-gray-50">
                            <td className="px-4 py-2">
                              <input type="checkbox" className="rounded border-gray-300" />
                            </td>
                            <td className="px-4 py-2 text-sm">
                              <div className="flex items-center gap-2">
                                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-xs font-bold text-gray-700">
                                  {emp.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                                </div>
                                <span>{emp.name}</span>
                              </div>
                            </td>
                            <td className="px-4 py-2 text-sm">{group.type}</td>
                            <td className="px-4 py-2 text-sm">{emp.available}</td>
                            <td className="px-4 py-2 text-sm">{emp.carry}</td>
                            <td className="px-4 py-2 text-sm">{emp.total}</td>
                            <td className="px-4 py-2 text-sm">{emp.used}</td>
                            <td className="px-4 py-2 text-sm text-gray-600">{emp.ass}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200 text-sm text-gray-600">
            <span>Page 1 of 1.</span>
            <div className="flex items-center gap-2">
              <span>Page</span>
              <input
                type="number"
                value={1}
                readOnly
                className="w-12 px-2 py-1 text-center border border-gray-300 rounded"
              />
              <span>of 1</span>
            </div>
          </div>
        </div>
      </div>

      {/* ====================== ASSIGN MODAL ====================== */}
      {showAssignModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-screen overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Assign Leaves</h2>
              <button
                onClick={() => setShowAssignModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Leave Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Leave Type:</label>
                <select
                  value={selectedLeaveType}
                  onChange={(e) => {
                    setSelectedLeaveType(e.target.value);
                    addFilter('Leave Type', e.target.value);
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="">-- Select Leave Type --</option>
                  {leaveGroups.map(g => (
                    <option key={g.id} value={g.type}>{g.type}</option>
                  ))}
                </select>
              </div>

              {/* Employee Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Employee:</label>
                <div className="border border-gray-300 rounded-lg p-4 space-y-4 max-h-96 overflow-y-auto">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Search className="h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search"
                        value={employeeSearch}
                        onChange={(e) => setEmployeeSearch(e.target.value)}
                        className="px-3 py-1.5 border border-gray-300 rounded text-sm flex-1 focus:outline-none"
                      />
                    </div>
                    <button className="px-3 py-1.5 border border-gray-300 rounded text-xs flex items-center gap-1 hover:bg-gray-50">
                      <Filter className="h-4 w-4" /> Filter
                    </button>
                  </div>

                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-red-600">Selected {selectedEmployees.length}/170</span>
                    <button className="px-2 py-1 bg-red-100 text-red-700 rounded">Select All 170 user</button>
                    <button className="px-2 py-1 bg-gray-100 text-gray-700 rounded">Unselect All</button>
                    <button
                      onClick={toggleSelectAll}
                      className="px-2 py-1 bg-green-100 text-green-700 rounded"
                    >
                      {selectAll ? 'Deselect' : 'Select'} All 170 Item
                    </button>
                  </div>

                  <table className="w-full">
                    <thead>
                      <tr className="text-xs font-medium text-gray-500">
                        <th className="px-2 py-1 text-left">
                          <input
                            type="checkbox"
                            checked={selectAll}
                            onChange={toggleSelectAll}
                            className="rounded border-gray-300"
                          />
                        </th>
                        <th className="px-2 py-1 text-left">Employee</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {filteredEmployees.map(emp => (
                        <tr key={emp.id}>
                          <td className="px-2 py-1">
                            <input
                              type="checkbox"
                              checked={selectedEmployees.includes(emp.id)}
                              onChange={() => toggleEmployee(emp.id)}
                              className="rounded border-gray-300"
                            />
                          </td>
                          <td className="px-2 py-1 text-sm">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-xs font-bold text-gray-700">
                                {emp.avatar}
                              </div>
                              <span>{emp.name}</span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  <div className="flex items-center justify-between text-xs text-gray-600">
                    <span>Page 1 of 1</span>
                    <div className="flex items-center gap-2">
                      <span>Page</span>
                      <input type="number" value={1} readOnly className="w-12 px-1 py-0.5 text-center border rounded" />
                      <span>of 1</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 p-6 border-t border-gray-200">
              <button
                onClick={() => setShowAssignModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50"
              >
                Cancel
              </button>
              <button className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700">
                Add
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ====================== FAB ====================== */}
      <button className="fixed bottom-6 right-6 w-14 h-14 bg-red-600 text-white rounded-full shadow-lg hover:bg-red-700 flex items-center justify-center z-50">
        <Plus className="h-6 w-6" />
      </button>
    </>
  );
}