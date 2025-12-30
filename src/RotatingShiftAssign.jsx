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
  Menu,
  ArrowLeft,
  MoreVertical,
  Users,
  Clock,
  RefreshCw,
  ChevronRight
} from 'lucide-react';
import { useTheme } from './ThemeContext';

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
  const { theme } = useTheme();
  
  // Theme helper functions
  const getAccentColor = () => theme?.accent || 'orange-600';
  const getBorderColor = () => theme?.borderColor || 'border-orange-600';
  const getTextAccent = () => theme?.accent ? `text-${theme.accent}` : 'text-orange-600';
  const getButtonGradient = () => theme?.button ? `bg-gradient-to-r ${theme.button}` : 'bg-gradient-to-r from-orange-500 to-orange-600';
  const getButtonHover = () => theme?.buttonHover || 'hover:from-orange-600 hover:to-orange-700';
  const getLightBg = () => theme?.lightBg || 'bg-orange-50';
  const getSidebarActive = () => theme?.sidebarActive || 'bg-orange-200';
  const getRingColor = () => theme?.ringColor || 'ring-orange-500';
  const getHoverBg = () => theme?.hoverBg || 'hover:bg-orange-500/10';

  const [tab, setTab] = useState('employee'); // 'employee' | 'rotation'
  const [selectedAll, setSelectedAll] = useState(false);
  const [selectedRows, setSelectedRows] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [showMobileFilter, setShowMobileFilter] = useState(false);
  const [mobileView, setMobileView] = useState('list'); // 'list' or 'card'
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

  // Mobile Card View for Employee Tab
  const EmployeeMobileCard = ({ employee, index }) => (
    <div className={`bg-white rounded-xl border ${selectedRows[index] ? 'border-blue-500' : 'border-gray-200'} p-4 mb-3 shadow-sm`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={selectedRows[index] || false}
            onChange={() => handleSelectRow(index)}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-medium">
            {employee.employee.split(' ').map((n) => n[0]).join('')}
          </div>
          <div>
            <h3 className="font-medium text-gray-900 text-sm">{employee.employee.split('(')[0].trim()}</h3>
            <p className="text-xs text-gray-500">{employee.employee.split('(')[1]?.replace(')', '')}</p>
          </div>
        </div>
        <button className="p-1.5 hover:bg-gray-100 rounded-lg">
          <MoreVertical className="h-4 w-4 text-gray-600" />
        </button>
      </div>

      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-500">Title:</span>
          <span className="font-medium">{employee.title}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Based On:</span>
          <span className="font-medium">{employee.basedOn}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Rotation:</span>
          <span className="font-medium">{employee.rotate}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Start Date:</span>
          <span className="font-medium">{employee.startDate.split(',')[0]}</span>
        </div>
      </div>

      <div className="flex items-center gap-2 mt-4 pt-3 border-t border-gray-100">
        <button className="p-1.5 hover:bg-gray-100 rounded-lg">
          <Copy className="h-4 w-4 text-gray-600" />
        </button>
        <button className="p-1.5 hover:bg-gray-100 rounded-lg">
          <Eye className="h-4 w-4 text-gray-600" />
        </button>
        <button className="p-1.5 hover:bg-gray-100 rounded-lg">
          <Edit2 className="h-4 w-4 text-gray-600" />
        </button>
        <button className="p-1.5 hover:bg-gray-100 rounded-lg">
          <Trash2 className="h-4 w-4 text-red-600" />
        </button>
      </div>
    </div>
  );

  // Mobile Card View for Rotation Tab
  const RotationMobileCard = ({ rotation, index }) => (
    <div className={`bg-white rounded-xl border ${selectedRows[index] ? 'border-blue-500' : 'border-gray-200'} p-4 mb-3 shadow-sm`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={selectedRows[index] || false}
            onChange={() => handleSelectRow(index)}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center text-white">
            <RefreshCw className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-medium text-gray-900 text-sm">Rotation Schedule</h3>
            <p className="text-xs text-gray-500">{rotation.rotate}</p>
          </div>
        </div>
        <button className="p-1.5 hover:bg-gray-100 rounded-lg">
          <MoreVertical className="h-4 w-4 text-gray-600" />
        </button>
      </div>

      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-500">Start Date:</span>
          <span className="font-medium">{rotation.startDate.split(',')[0]}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Current Shift:</span>
          <span className="font-medium">{rotation.currentShift}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Next Switch:</span>
          <span className="font-medium">{rotation.nextSwitch.split(',')[0]}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Next Shift:</span>
          <span className="font-medium text-blue-600">{rotation.nextShift}</span>
        </div>
      </div>

      <div className="flex items-center gap-2 mt-4 pt-3 border-t border-gray-100">
        <button className="p-1.5 hover:bg-gray-100 rounded-lg">
          <Copy className="h-4 w-4 text-gray-600" />
        </button>
        <button className="p-1.5 hover:bg-gray-100 rounded-lg">
          <Eye className="h-4 w-4 text-gray-600" />
        </button>
        <button className="p-1.5 hover:bg-gray-100 rounded-lg">
          <Edit2 className="h-4 w-4 text-gray-600" />
        </button>
        <button className="p-1.5 hover:bg-gray-100 rounded-lg">
          <Trash2 className="h-4 w-4 text-red-600" />
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* MOBILE HEADER */}
      <div className="lg:hidden sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <ArrowLeft className="h-5 w-5 text-gray-600" />
            </button>
            <div>
              <h1 className="text-lg font-bold text-gray-900">Rotating Shift</h1>
              <p className="text-xs text-gray-500">{data.length} {tab === 'employee' ? 'employees' : 'schedules'}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setMobileView(mobileView === 'list' ? 'card' : 'list')}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              {mobileView === 'list' ? (
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 border border-gray-400"></div>
                  <div className="w-3 h-3 border border-gray-400"></div>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-0.5">
                  <div className="w-1.5 h-1.5 bg-gray-400"></div>
                  <div className="w-1.5 h-1.5 bg-gray-400"></div>
                  <div className="w-1.5 h-1.5 bg-gray-400"></div>
                  <div className="w-1.5 h-1.5 bg-gray-400"></div>
                </div>
              )}
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <Search className="h-5 w-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Mobile Tabs */}
        <div className="flex gap-1 px-4 border-b border-gray-200">
          {[
            { id: 'employee', label: 'Employees', icon: <Users className="h-4 w-4" /> },
            { id: 'rotation', label: 'Rotations', icon: <Clock className="h-4 w-4" /> }
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => {
                setTab(t.id);
                setSelectedAll(false);
                setSelectedRows({});
              }}
              className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium border-b-2 transition-colors ${
                tab === t.id
                  ? `${getBorderColor()} ${getTextAccent()}`
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {t.icon}
              {t.label}
            </button>
          ))}
        </div>

        {/* Mobile Toolbar */}
        <div className="px-4 py-2 bg-gray-50 flex items-center gap-2 overflow-x-auto scrollbar-hide">
          <button 
            onClick={() => setShowMobileFilter(!showMobileFilter)}
            className={`px-3 py-1.5 text-sm rounded-full flex items-center gap-1 ${
              showMobileFilter ? `${getButtonGradient()} text-white` : 'bg-white text-gray-700 border border-gray-300'
            }`}
          >
            <Filter className="h-3 w-3" /> Filter
          </button>
          <button className="px-3 py-1.5 bg-white text-gray-700 text-sm rounded-full border border-gray-300">
            {selectedAll ? 'Deselect All' : 'Select All'}
          </button>
          <button 
            onClick={openModal}
            className={`px-3 py-1.5 ${getButtonGradient()} text-white text-sm rounded-full flex items-center gap-1`}
          >
            <Plus className="h-3 w-3" /> Assign
          </button>
        </div>
      </div>

      {/* DESKTOP HEADER */}
      <div className="hidden lg:block bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Rotating Shift Assign</h1>
            <p className="text-gray-600 mt-1">Manage rotating shift assignments for employees</p>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={openModal}
              className={`px-4 py-2 ${getButtonGradient()} ${getButtonHover()} text-white rounded-lg font-medium flex items-center gap-2 hover:shadow-lg transition-all`}
            >
              <Plus className="h-4 w-4" /> Assign Shift
            </button>
          </div>
        </div>

        {/* Desktop Tabs & Toolbar */}
        <div className="flex items-center justify-between mt-6">
          <div className="flex items-center gap-6">
            <div className="flex gap-1 border-b border-gray-200">
              {[
                { id: 'employee', label: 'Employees', icon: <Users className="h-4 w-4" /> },
                { id: 'rotation', label: 'Rotation Schedules', icon: <RefreshCw className="h-4 w-4" /> }
              ].map((t) => (
                <button
                  key={t.id}
                  onClick={() => {
                    setTab(t.id);
                    setSelectedAll(false);
                    setSelectedRows({});
                  }}
                  className={`flex items-center gap-2 px-4 py-3 font-medium border-b-2 transition-colors ${
                    tab === t.id
                      ? `${getBorderColor()} ${getTextAccent()}`
                      : 'border-transparent text-gray-600 hover:text-gray-800'
                  }`}
                >
                  {t.icon}
                  {t.label}
                </button>
              ))}
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className={`pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 ${getRingColor()} focus:border-transparent w-64`}
              />
            </div>
            <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm flex items-center gap-2 hover:bg-gray-50">
              <Filter className="h-4 w-4" /> Filter
            </button>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="p-4 lg:p-6">
        {/* Select All Button - Desktop */}
        <div className="hidden lg:block mb-4">
          <button
            onClick={handleSelectAll}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedAll
                ? 'bg-green-600 text-white hover:bg-green-700'
                : `${getLightBg()} ${getTextAccent()} hover:opacity-90`
            }`}
          >
            {selectedAll ? 'Deselect All' : 'Select All'}
          </button>
        </div>

        {/* MOBILE VIEW */}
        {mobileView === 'card' ? (
          <div className="lg:hidden">
            {tab === 'employee' 
              ? employeeData.map((employee, index) => (
                  <EmployeeMobileCard key={employee.id} employee={employee} index={index} />
                ))
              : rotationData.map((rotation, index) => (
                  <RotationMobileCard key={rotation.id} rotation={rotation} index={index} />
                ))
            }
          </div>
        ) : (
          /* MOBILE TABLE VIEW */
          <div className="lg:hidden overflow-x-auto">
            <table className="w-full min-w-max">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">
                    <input
                      type="checkbox"
                      checked={selectedAll}
                      onChange={handleSelectAll}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </th>
                  {tab === 'employee' ? (
                    <>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">Employee</th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">Rotation</th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">Start Date</th>
                    </>
                  ) : (
                    <>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">Rotation</th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">Current Shift</th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">Next Switch</th>
                    </>
                  )}
                  <th className="px-3 py-2"></th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data.map((row, i) => (
                  <tr key={row.id} className="hover:bg-gray-50">
                    <td className="px-3 py-3">
                      <input
                        type="checkbox"
                        checked={selectedRows[i] || false}
                        onChange={() => handleSelectRow(i)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                    </td>
                    {tab === 'employee' ? (
                      <>
                        <td className="px-3 py-3">
                          <div className="text-sm font-medium text-gray-900">{row.employee.split('(')[0].trim()}</div>
                          <div className="text-xs text-gray-500">{row.rotate}</div>
                        </td>
                        <td className="px-3 py-3 text-xs text-gray-700">{row.basedOn}</td>
                        <td className="px-3 py-3 text-xs text-gray-700">{row.startDate.split(',')[0]}</td>
                      </>
                    ) : (
                      <>
                        <td className="px-3 py-3 text-xs text-gray-700">{row.rotate}</td>
                        <td className="px-3 py-3 text-xs text-gray-700">{row.currentShift}</td>
                        <td className="px-3 py-3 text-xs text-gray-700">{row.nextSwitch.split(',')[0]}</td>
                      </>
                    )}
                    <td className="px-3 py-3 text-right">
                      <button className="p-1 hover:bg-gray-100 rounded">
                        <MoreVertical className="h-4 w-4 text-gray-600" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* DESKTOP TABLE */}
        <div className="hidden lg:block bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className={`${getLightBg()} border-b border-gray-200`}>
                <tr>
                  <th className="px-6 py-4 text-left">
                    <input
                      type="checkbox"
                      checked={selectedAll}
                      onChange={handleSelectAll}
                      className={`rounded border-gray-300 ${getTextAccent()} focus:${getRingColor()}`}
                    />
                  </th>
                  {tab === 'employee' ? (
                    <>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Employee</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Title</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Based On</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Rotate</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Start Date</th>
                    </>
                  ) : (
                    <>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Rotate</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Start Date</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Current Shift</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Next Switch</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Next Shift</th>
                    </>
                  )}
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {data.map((row, i) => (
                  <tr key={row.id} className="hover:bg-gray-50/50">
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={selectedRows[i] || false}
                        onChange={() => handleSelectRow(i)}
                        className={`rounded border-gray-300 ${getTextAccent()} focus:${getRingColor()}`}
                      />
                    </td>
                    {tab === 'employee' ? (
                      <>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-medium">
                              {row.employee.split(' ').map((n) => n[0]).join('')}
                            </div>
                            <div>
                              <div className="font-medium text-gray-900">{row.employee}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700">{row.title}</td>
                        <td className="px-6 py-4 text-sm text-gray-700">{row.basedOn}</td>
                        <td className="px-6 py-4 text-sm text-gray-700">{row.rotate}</td>
                        <td className="px-6 py-4 text-sm text-gray-700">{row.startDate}</td>
                      </>
                    ) : (
                      <>
                        <td className="px-6 py-4 text-sm text-gray-700">{row.rotate}</td>
                        <td className="px-6 py-4 text-sm text-gray-700">{row.startDate}</td>
                        <td className="px-6 py-4 text-sm text-gray-700">{row.currentShift}</td>
                        <td className="px-6 py-4 text-sm text-gray-700">{row.nextSwitch}</td>
                        <td className="px-6 py-4 text-sm font-medium text-blue-600">{row.nextShift}</td>
                      </>
                    )}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                          <Copy className="h-4 w-4 text-gray-600" />
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                          <Eye className="h-4 w-4 text-gray-600" />
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                          <Edit2 className="h-4 w-4 text-gray-600" />
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
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

        {/* PAGINATION */}
        <div className="flex items-center justify-between mt-6 text-sm text-gray-600">
          <span className="hidden lg:inline">Page 1 of 1.</span>
          <div className="flex items-center gap-4 w-full lg:w-auto justify-between lg:justify-end">
            <span className="lg:hidden">Showing {data.length} {tab === 'employee' ? 'employees' : 'schedules'}</span>
            <div className="flex items-center gap-2">
              <span className="hidden lg:inline">Page</span>
              <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                <button className="px-3 py-1.5 hover:bg-gray-50 text-sm">1</button>
                <span className="px-3 py-1.5 bg-gray-100 text-sm">of 1</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ASSIGN MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 relative">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-lg"
            >
              <X className="h-5 w-5 text-gray-500" />
            </button>

            <h2 className="text-xl font-bold text-gray-900 mb-4">Assign Rotating Shift</h2>

            <div className="space-y-4">
              {/* Employees */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Employees <span className="text-red-600">*</span>
                </label>
                <div className="border border-gray-300 rounded-lg p-2 max-h-32 overflow-y-auto">
                  {employeeData.slice(0, 3).map((emp) => (
                    <label key={emp.id} className="flex items-center gap-2 p-1 hover:bg-gray-50 cursor-pointer">
                      <input type="checkbox" className={`rounded ${getTextAccent()}`} />
                      <span className="text-sm">{emp.employee}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Rotating Shift */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Rotating Shift <span className="text-red-600">*</span>
                </label>
                <select className={`w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 ${getRingColor()} focus:border-transparent`}>
                  <option>-- Choose Rotating Shift --</option>
                  <option>Morning to Night</option>
                  <option>Day to Evening</option>
                  <option>Custom Rotation</option>
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
                    className={`w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 ${getRingColor()} focus:border-transparent`}
                  />
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
              </div>

              {/* Based On */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Based on <span className="text-red-600">*</span>
                </label>
                <select className={`w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 ${getRingColor()} focus:border-transparent`}>
                  <option>After</option>
                  <option>Weekend</option>
                  <option>Monthly</option>
                </select>
              </div>

              {/* Rotate after day */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Rotate after (days) <span className="text-red-600">*</span>
                </label>
                <input
                  type="number"
                  placeholder="5"
                  className={`w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 ${getRingColor()} focus:border-transparent`}
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
                className={`px-4 py-2 ${getButtonGradient()} ${getButtonHover()} text-white rounded-lg text-sm font-medium transition-all`}
              >
                Save Assignment
              </button>
            </div>
          </div>
        </div>
      )}

     
     
    </div>
  );
}