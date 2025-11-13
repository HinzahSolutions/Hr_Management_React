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
  CheckCircle,
  MoreVertical,
} from 'lucide-react';

const toValidateData = [
  {
    id: 1,
    employee: 'Vandita Sharma (PEP00)',
    batch: 'None',
    date: '11 November, 2025',
    day: 'Tuesday',
    checkIn: '08:30',
    confirmation: '11 Nov',
  },
  {
    id: 2,
    employee: 'Vandita Sharma (PEP00)',
    batch: 'Ora-1',
    date: '09 October, 2025',
    day: 'Thursday',
    checkIn: '08:00',
    confirmation: '09 Oct',
  },
  {
    id: 3,
    employee: 'Vandita Sharma (PEP00)',
    batch: 'Ora-1',
    date: '07 October, 2025',
    day: 'Tuesday',
    checkIn: '08:00',
    confirmation: '07 Oct',
  },
];

const otData = [
  {
    id: 4,
    employee: 'Vandita Sharma (PEP00)',
    batch: 'None',
    date: '08 November, 2025',
    day: 'Saturday',
    checkIn: '08:40',
    confirmation: '08 Nov',
  },
  {
    id: 5,
    employee: 'Vandita Sharma (PEP00)',
    batch: 'None',
    date: '05 November, 2025',
    day: 'Wednesday',
    checkIn: '00:08',
    confirmation: '05 Nov',
  },
  {
    id: 6,
    employee: 'Vandita Sharma (PEP00)',
    batch: 'Ora-1',
    date: '30 October, 2025',
    day: 'Thursday',
    checkIn: '08:00',
    confirmation: '30 Oct',
  },
  {
    id: 7,
    employee: 'Vandita Sharma (PEP00)',
    batch: 'Ora-1',
    date: '29 October, 2025',
    day: 'Wednesday',
    checkIn: '08:00',
    confirmation: '29 Oct',
  },
  {
    id: 8,
    employee: 'Vandita Sharma (PEP00)',
    batch: 'Ora-1',
    date: '28 October, 2025',
    day: 'Tuesday',
    checkIn: '08:00',
    confirmation: '28 Oct',
  },
  {
    id: 9,
    employee: 'Vandita Sharma (PEP00)',
    batch: 'Ora-1',
    date: '27 October, 2025',
    day: 'Monday',
    checkIn: '08:00',
    confirmation: '27 Oct',
  },
  {
    id: 10,
    employee: 'Vandita Sharma (PEP00)',
    batch: 'Ora-1',
    date: '24 October, 2025',
    day: 'Friday',
    checkIn: '08:00',
    confirmation: '24 Oct',
  },
  {
    id: 11,
    employee: 'Vandita Sharma (PEP00)',
    batch: 'Ora-1',
    date: '23 October, 2025',
    day: 'Thursday',
    checkIn: '08:00',
    confirmation: '23 Oct',
  },
  {
    id: 12,
    employee: 'Vandita Sharma (PEP00)',
    batch: 'Ora-1',
    date: '22 October, 2025',
    day: 'Wednesday',
    checkIn: '08:00',
    confirmation: '22 Oct',
  },
];

const validatedData = [
  {
    id: 13,
    employee: 'ARJIT Chaudhary (arjit9800-)',
    batch: 'None',
    date: '10 November, 2025',
    day: 'Monday',
    checkIn: '08:30',
    confirmation: '10 Nov',
  },
  {
    id: 14,
    employee: 'ARYAN AWATHI (ANN123)',
    batch: 'None',
    date: '10 November, 2025',
    day: 'Monday',
    checkIn: '07:30',
    confirmation: '10 Nov',
  },
  {
    id: 15,
    employee: 'BALAHARSHINI L (BL2035)',
    batch: 'None',
    date: '10 November, 2025',
    day: 'Monday',
    checkIn: '06:00',
    confirmation: '10 Nov',
  },
  {
    id: 16,
    employee: 'Vandita Sharma (PEP00)',
    batch: 'FNA-2',
    date: '10 November, 2025',
    day: 'Monday',
    checkIn: '22:23',
    confirmation: '10 Nov',
  },
  {
    id: 17,
    employee: 'Zohir Djender (PEP3688)',
    batch: 'None',
    date: '10 November, 2025',
    day: 'Monday',
    checkIn: '08:30',
    confirmation: '10 Nov',
  },
  {
    id: 18,
    employee: 'ARYAN AWATHI (ANN123)',
    batch: 'None',
    date: '09 November, 2025',
    day: 'Sunday',
    checkIn: '17:01',
    confirmation: '09 Nov',
  },
  {
    id: 19,
    employee: 'Vandita Sharma (PEP00)',
    batch: 'None',
    date: '08 November, 2025',
    day: 'Saturday',
    checkIn: '08:40',
    confirmation: '08 Nov',
  },
  {
    id: 20,
    employee: 'Grace Allen (PEP21)',
    batch: 'None',
    date: '06 November, 2025',
    day: 'Thursday',
    checkIn: '14:40',
    confirmation: '06 Nov',
  },
];

export default function Attendances() {
  const [tab, setTab] = useState('validate'); // 'validate' | 'ot' | 'validated'
  const [selectedAll, setSelectedAll] = useState(false);
  const [selectedRows, setSelectedRows] = useState({});

  const data = tab === 'validate' ? toValidateData : tab === 'ot' ? otData : validatedData;

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
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  return (
    <>
      {/* ====================== PAGE HEADER ====================== */}
      <div className="bg-white border-b border-gray-200 px-4 sm:px-6 py-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-2xl font-bold text-gray-900">Attendances</h1>
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
            { key: 'validate', label: 'Attendance To Validate' },
            { key: 'ot', label: 'OT Attendances' },
            { key: 'validated', label: 'Validated Attendances' },
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
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Batch</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Date</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Day</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Check-In</th>
                    {tab === 'validate' ? (
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">In D Confirmation</th>
                    ) : tab === 'ot' ? (
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Confirmation</th>
                    ) : (
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Actions</th>
                    )}
                    {/* Fixed Actions Column */}
                    <th className="sticky right-0 bg-gray-50 px-4 py-3 text-left text-sm font-medium text-gray-700 border-l border-gray-200">
                      {tab === 'validate' ? 'Actions' : ''}
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
                      <td className="px-4 py-3 text-sm text-gray-700">{row.batch}</td>
                      <td className="px-4 py-3 text-sm text-gray-700">{row.date}</td>
                      <td className="px-4 py-3 text-sm text-gray-700">{row.day}</td>
                      <td className="px-4 py-3 text-sm text-gray-700">{row.checkIn}</td>
                      {tab === 'validate' ? (
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-700">{row.confirmation}</span>
                            <button className="px-4 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-medium hover:bg-blue-700 flex items-center gap-1">
                              <CheckCircle className="h-3 w-3" /> Validate
                            </button>
                          </div>
                        </td>
                      ) : tab === 'ot' ? (
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-700">{row.confirmation}</span>
                            <button className="px-3 py-1.5 bg-green-100 text-green-700 rounded-lg text-xs font-medium hover:bg-green-200 flex items-center gap-1">
                              <CheckCircle className="h-3 w-3" />
                            </button>
                          </div>
                        </td>
                      ) : (
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-700">{row.confirmation}</span>
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
                      )}
                      {/* Fixed Actions Column */}
                      <td className="sticky right-0 bg-white px-4 py-3 border-l border-gray-200">
                        {tab === 'validate' && (
                          <button className="text-gray-400 hover:text-gray-600">
                            <MoreVertical className="h-5 w-5" />
                          </button>
                        )}
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