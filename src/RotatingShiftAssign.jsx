'use client';

import React, { useState } from 'react';
import {
  Search,
  Filter,
  ChevronDown,
  Plus,
  Copy,
  Eye,
  Edit2,
  Trash2,
  Calendar,
  X,
  Check,
} from 'lucide-react';

const employeeData = [
  {
    id: 1,
    employee: 'BALAHARSHINI L (BI2035)',
    title: 'Morning to Night',
    basedOn: 'After',
    rotate: 'Rotate after 7 days',
    startDate: '03 November, 2025',
  },
  {
    id: 2,
    employee: 'Vandita Sharma (PEP00)',
    title: 'Morning to Night',
    basedOn: 'Weekend',
    rotate: 'Weekly every saturday',
    startDate: '10 November, 2025',
  },
  {
    id: 3,
    employee: 'Noah Young (PEP20)',
    title: 'Morning to Night',
    basedOn: 'Weekend',
    rotate: 'Weekly every monday',
    startDate: '05 July, 2025',
  },
  {
    id: 4,
    employee: 'Jacob Walker (PEP18)',
    title: 'Morning to Night',
    basedOn: 'Weekend',
    rotate: 'Weekly every monday',
    startDate: '05 July, 2025',
  },
  {
    id: 5,
    employee: 'Grace Allen (PEP21)',
    title: 'Morning to Night',
    basedOn: 'Weekend',
    rotate: 'Weekly every monday',
    startDate: '05 July, 2025',
  },
  {
    id: 6,
    employee: 'Samuel Baker (PEP22)',
    title: 'Morning to Night',
    basedOn: 'After',
    rotate: 'Rotate after 1 days',
    startDate: '05 July, 2025',
  },
  {
    id: 7,
    employee: 'Mia Nelson (PEP13)',
    title: 'Morning to Night',
    basedOn: 'After',
    rotate: 'Rotate after 1 days',
    startDate: '05 July, 2025',
  },
  {
    id: 8,
    employee: 'Isabella Thompson (PEP17)',
    title: 'Morning to Night',
    basedOn: 'After',
    rotate: 'Rotate after 1 days',
    startDate: '05 July, 2025',
  },
  {
    id: 9,
    employee: 'Alexander Smith (PEP16)',
    title: 'Morning to Night',
    basedOn: 'After',
    rotate: 'Rotate after 1 days',
    startDate: '05 July, 2025',
  },
];

const rotationData = [
  {
    id: 1,
    rotate: 'Rotate after 7 days',
    startDate: '03 November, 2025',
    currentShift: 'Morning Shift',
    nextSwitch: '17 November, 2025',
    nextShift: 'Night Shift',
  },
  {
    id: 2,
    rotate: 'Weekly every saturday',
    startDate: '10 November, 2025',
    currentShift: 'Regular Shift',
    nextSwitch: '15 November, 2025',
    nextShift: 'Morning Shift',
  },
  {
    id: 3,
    rotate: 'Weekly every monday',
    startDate: '05 July, 2025',
    currentShift: 'Morning Shift',
    nextSwitch: '12 July, 2025',
    nextShift: 'Night Shift',
  },
  {
    id: 4,
    rotate: 'Weekly every monday',
    startDate: '05 July, 2025',
    currentShift: 'Morning Shift',
    nextSwitch: '12 July, 2025',
    nextShift: 'Night Shift',
  },
  {
    id: 5,
    rotate: 'Weekly every monday',
    startDate: '05 July, 2025',
    currentShift: 'Morning Shift',
    nextSwitch: '12 July, 2025',
    nextShift: 'Night Shift',
  },
  {
    id: 6,
    rotate: 'Rotate after 1 days',
    startDate: '05 July, 2025',
    currentShift: 'Regular Shift',
    nextSwitch: '06 July, 2025',
    nextShift: 'Morning Shift',
  },
  {
    id: 7,
    rotate: 'Rotate after 1 days',
    startDate: '05 July, 2025',
    currentShift: 'Regular Shift',
    nextSwitch: '06 July, 2025',
    nextShift: 'Morning Shift',
  },
  {
    id: 8,
    rotate: 'Rotate after 1 days',
    startDate: '05 July, 2025',
    currentShift: 'Regular Shift',
    nextSwitch: '06 July, 2025',
    nextShift: 'Morning Shift',
  },
  {
    id: 9,
    rotate: 'Rotate after 1 days',
    startDate: '05 July, 2025',
    currentShift: 'Regular Shift',
    nextSwitch: '06 July, 2025',
    nextShift: 'Morning Shift',
  },
];

export default function RotatingShiftAssign() {
  const [tab, setTab] = useState('employee'); // 'employee' | 'rotation'
  const [selectedAll, setSelectedAll] = useState(false);
  const [selectedRows, setSelectedRows] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    employees: [],
    rotatingShift: '',
    startDate: '',
    basedOn: '',
    rotateAfter: '',
  });

  const handleSelectAll = () => {
    const newSel = {};
    (tab === 'employee' ? employeeData : rotationData).forEach((_, i) => (newSel[i] = !selectedAll));
    setSelectedRows(newSel);
    setSelectedAll(!selectedAll);
  };

  const handleSelectRow = (i) => {
    const newSel = { ...selectedRows, [i]: !selectedRows[i] };
    setSelectedRows(newSel);
    setSelectedAll(Object.values(newSel).every((v) => v));
  };

  const openModal = () => setShowModal(true);
  const closeModal = () => {
    setShowModal(false);
    setForm({ employees: [], rotatingShift: '', startDate: '', basedOn: '', rotateAfter: '' });
  };

  const handleSave = () => {
    console.log('Saving:', form);
    closeModal();
  };

  const data = tab === 'employee' ? employeeData : rotationData;

  return (
    <>
      {/* ====================== PAGE HEADER ====================== */}
      <div className="bg-white border-b border-gray-200 px-4 sm:px-6 py-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-2xl font-bold text-gray-900">Rotating Shift Assign</h1>
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
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
              Group By <ChevronDown className="h-4 w-4" />
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm flex items-center gap-2 hover:bg-gray-50">
              Actions <ChevronDown className="h-4 w-4" />
            </button>
            <button
              onClick={openModal}
              className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm flex items-center gap-2 hover:bg-red-700"
            >
              Assign
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mt-4 border-b border-gray-200">
          {['employee', 'rotation'].map((t) => (
            <button
              key={t}
              onClick={() => {
                setTab(t);
                setSelectedAll(false);
                setSelectedRows({});
              }}
              className={`px-4 py-2 text-sm font-medium capitalize border-b-2 transition-colors ${
                tab === t
                  ? 'border-red-600 text-red-600'
                  : 'border-transparent text-gray-600 hover:text-gray-800'
              }`}
            >
              {t === 'employee' ? 'Employee' : 'Rotation'}
            </button>
          ))}
        </div>
      </div>

      {/* ====================== CONTENT ====================== */}
      <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto">
          {/* Select All */}
          <div className="mb-4">
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
          </div>

          {/* Table with Fixed Actions */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-max">
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
                    {tab === 'employee' ? (
                      <>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Employee</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Title</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Based On</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Rotate</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Start Date</th>
                      </>
                    ) : (
                      <>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Rotate</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Start Date</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Current Shift</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Next Switch</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Next Shift</th>
                      </>
                    )}
                    {/* Fixed Actions Header */}
                    <th className="sticky right-0 bg-gray-50 px-4 py-3 text-left text-sm font-medium text-gray-700 border-l border-gray-200">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {data.map((row, i) => (
                    <tr key={row.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <input
                          type="checkbox"
                          checked={selectedRows[i] || false}
                          onChange={() => handleSelectRow(i)}
                          className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                        />
                      </td>
                      {tab === 'employee' ? (
                        <>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-xs font-medium text-gray-700">
                                {row.employee.split(' ').map((n) => n[0]).join('')}
                              </div>
                              <div>
                                <div className="text-sm font-medium text-gray-900">{row.employee}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-700">{row.title}</td>
                          <td className="px-4 py-3 text-sm text-gray-700">{row.basedOn}</td>
                          <td className="px-4 py-3 text-sm text-gray-700">{row.rotate}</td>
                          <td className="px-4 py-3 text-sm text-gray-700">{row.startDate}</td>
                        </>
                      ) : (
                        <>
                          <td className="px-4 py-3 text-sm text-gray-700">{row.rotate}</td>
                          <td className="px-4 py-3 text-sm text-gray-700">{row.startDate}</td>
                          <td className="px-4 py-3 text-sm text-gray-700">{row.currentShift}</td>
                          <td className="px-4 py-3 text-sm text-gray-700">{row.nextSwitch}</td>
                          <td className="px-4 py-3 text-sm text-gray-700">{row.nextShift}</td>
                        </>
                      )}
                      {/* Fixed Actions Column */}
                      <td className="sticky right-0 bg-white px-4 py-3 border-l border-gray-200">
                        <div className="flex items-center gap-1">
                          <button className="p-1.5 hover:bg-gray-100 rounded">
                            <Copy className="h-4 w-4 text-gray-600" />
                          </button>
                          <button className="p-1.5 hover:bg-gray-100 rounded">
                            <Eye className="h-4 w-4 text-gray-600" />
                          </button>
                          <button className="p-1.5 hover:bg-gray-100 rounded">
                            <Edit2 className="h-4 w-4 text-gray-600" />
                          </button>
                          <button className="p-1.5 hover:bg-gray-100 rounded">
                            <Trash2 className="h-4 w-4 text-red-600" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-6 text-sm text-gray-600">
            <span>Page 1 of 1.</span>
            <div className="flex items-center gap-2">
              <span>Page</span>
              <div className="flex items-center border border-gray-300 rounded">
                <button className="px-2 py-1 hover:bg-gray-50">1</button>
                <span className="px-2 py-1 bg-gray-100">of 1</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ====================== ASSIGN MODAL ====================== */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 relative">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 p-1 hover:bg-gray-100 rounded"
            >
              <X className="h-5 w-5 text-gray-500" />
            </button>

            <h2 className="text-xl font-bold text-gray-900 mb-4">Rotating Shift Assign</h2>

            <div className="space-y-4">
              {/* Employees */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Employees <span className="text-red-600">*</span>
                </label>
                <div className="border border-gray-300 rounded-lg p-2 max-h-32 overflow-y-auto">
                  <label className="flex items-center gap-2 p-1 hover:bg-gray-50 cursor-pointer">
                    <input type="checkbox" className="rounded text-red-600" />
                    <span className="text-sm">Vandita Sharma (PEP00)</span>
                  </label>
                </div>
              </div>

              {/* Rotating Shift */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Rotating Shift <span className="text-red-600">*</span>
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500">
                  <option>-- Choose Rotating Shift --</option>
                  <option>Morning to Night</option>
                </select>
              </div>

              {/* Start Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Start date <span className="text-red-600">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="12 / 11 / 2025"
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
              </div>

              {/* Based On */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Based on <span className="text-red-600">*</span>
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500">
                  <option>After</option>
                  <option>Weekend</option>
                </select>
              </div>

              {/* Rotate after day */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Rotate after day <span className="text-red-600">*</span>
                </label>
                <input
                  type="number"
                  placeholder="5"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <button
                onClick={closeModal}
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700"
              >
                Save
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