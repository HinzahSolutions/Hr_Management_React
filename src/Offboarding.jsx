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
  MoreVertical,
  CheckCircle,
} from 'lucide-react';

const offboardingData = [
  {
    id: 1,
    employee: 'Vandita Sharma (PEP00)',
    reason: 'Personal',
    noticePeriod: '30 days',
    lastWorkingDay: '12 Dec. 2025',
    stage: 'Notice Period',
    taskStatus: '3/5',
  },
  {
    id: 2,
    employee: 'Dev Prakash (DP001)',
    reason: 'Career Growth',
    noticePeriod: '15 days',
    lastWorkingDay: '30 Nov. 2025',
    stage: 'Exit Interview',
    taskStatus: '1/1',
  },
  {
    id: 3,
    employee: 'Michael Brown (MB021)',
    reason: 'Relocation',
    noticePeriod: '60 days',
    lastWorkingDay: '15 Jan. 2026',
    stage: 'FNF',
    taskStatus: '2/2',
  },
];

const exitProcessData = [
  {
    id: 4,
    employee: 'Test User (TU999)',
    reason: 'Contract End',
    noticePeriod: 'None',
    lastWorkingDay: '10 Nov. 2025',
    stage: 'Work Handover',
    taskStatus: '0/3',
  },
];

const resignationData = [
  {
    id: 5,
    employee: 'Grace Allen (GA21)',
    reason: 'New Opportunity',
    noticePeriod: '30 days',
    lastWorkingDay: '05 Dec. 2025',
    stage: 'Archived',
    taskStatus: '5/5',
  },
];

export default function Offboarding() {
  const [tab, setTab] = useState('offboarding'); // 'offboarding' | 'exit' | 'resignation'
  const [selectedAll, setSelectedAll] = useState(false);
  const [selectedRows, setSelectedRows] = useState({});

  const data = tab === 'offboarding' ? offboardingData : tab === 'exit' ? exitProcessData : resignationData;

  const handleSelectAll = () => {
    const newSel = {};
    data.forEach((_, i) => (newSel[i] = !selectedAll));
    setSelectedRows(newSel);
    setSelectedAll(!selectedAll);
  };

  const handleSelectRow = (i) => {
    const newSel = { ...selectedRows, [i]: !selectedRows[i] };
    setSelectedRows(newSel);
    setSelectedAll(Object.values(newSel).every((v) => v));
  };

  const getAvatarInitials = (name) => {
    return name
      .split(' ')
      .filter((n) => n.match(/[A-Za-z]/))
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <>
      {/* ====================== PAGE HEADER ====================== */}
      <div className="bg-white border-b border-gray-200 px-4 sm:px-6 py-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-2xl font-bold text-gray-900">Offboarding</h1>
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
            <button className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm flex items-center gap-2 hover:bg-red-700">
              + Create
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mt-4 border-b border-gray-200">
          {[
            { key: 'offboarding', label: 'Offboarding' },
            { key: 'exit', label: 'Exit Process' },
            { key: 'resignation', label: 'Resignation Letters' },
          ].map((t) => (
            <button
              key={t.key}
              onClick={() => {
                setTab(t.key);
                setSelectedAll(false);
                setSelectedRows({});
              }}
              className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                tab === t.key
                  ? 'border-red-600 text-red-600'
                  : 'border-transparent text-gray-600 hover:text-gray-800'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* ====================== CONTENT ====================== */}
      <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto">
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
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Employee</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Reason</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Notice Period</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Last Working Day</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Stage</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Task Status</th>
                    {/* Fixed Actions Column */}
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
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-xs font-medium text-gray-700">
                            {getAvatarInitials(row.employee)}
                          </div>
                          <span className="text-sm font-medium text-gray-900">{row.employee}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700">{row.reason}</td>
                      <td className="px-4 py-3 text-sm text-gray-700">{row.noticePeriod}</td>
                      <td className="px-4 py-3 text-sm text-gray-700">{row.lastWorkingDay}</td>
                      <td className="px-4 py-3">
                        <span className="inline-block px-2 py-1 text-xs font-medium rounded bg-blue-100 text-blue-800">
                          {row.stage}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                            row.taskStatus === '5/5'
                              ? 'bg-green-100 text-green-800'
                              : row.taskStatus.includes('0/')
                              ? 'bg-red-100 text-red-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}
                        >
                          {row.taskStatus}
                        </span>
                      </td>
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
                          <button className="text-gray-400 hover:text-gray-600">
                            <MoreVertical className="h-5 w-5" />
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

      {/* ====================== FAB ====================== */}
      <button className="fixed bottom-6 right-6 w-14 h-14 bg-red-600 text-white rounded-full shadow-lg hover:bg-red-700 flex items-center justify-center z-50">
        <Plus className="h-6 w-6" />
      </button>
    </>
  );
}