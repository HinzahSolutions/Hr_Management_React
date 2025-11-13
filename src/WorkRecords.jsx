'use client';

import React, { useState } from 'react';
import {
  Filter,
  Download,
  Circle,
  Plus,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

/* ---------- CONFIG ---------- */
const months = [
  { value: '2025-11', label: '2025-11' },
  { value: '2025-10', label: '2025-10' },
  { value: '2025-09', label: '2025-09' },
];

const legend = [
  { code: 'P', label: 'Present', color: 'bg-green-500' },
  { code: 'HP', label: 'Half Day Present', color: 'bg-yellow-500' },
  { code: 'O', label: 'On Leave, But attendance exist', color: 'bg-orange-500' },
  { code: 'L', label: 'Leave', color: 'bg-blue-500' },
  { code: 'A', label: 'Absent', color: 'bg-purple-500' },
  { code: 'C', label: 'Conflict', color: 'bg-red-500' },
];

/* ---------- HELPERS ---------- */
const generateDays = (year, month) => {
  const date = new Date(year, month - 1, 1);
  const days = [];
  while (date.getMonth() === month - 1) {
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  return days;
};

/* ---------- MOCK DATA ---------- */
const employees = [
  {
    id: 1,
    name: 'Abigail Roberts (PEP16)',
    records: [
      { day: 1, code: 'HP', color: 'bg-yellow-500' },
      { day: 2, code: 'A', color: 'bg-purple-500' },
      { day: 10, code: 'A', color: 'bg-purple-500' },
      { day: 11, code: 'A', color: 'bg-purple-500' },
      { day: 12, code: 'A', color: 'bg-purple-500' },
    ],
  },
  {
    id: 2,
    name: 'Alexander Smith (PEP16)',
    records: [
      { day: 3, code: 'A', color: 'bg-purple-500' },
      { day: 4, code: 'A', color: 'bg-purple-500' },
      { day: 5, code: 'L', color: 'bg-blue-500' },
      { day: 10, code: 'A', color: 'bg-purple-500' },
      { day: 11, code: 'A', color: 'bg-purple-500' },
      { day: 12, code: 'A', color: 'bg-purple-500' },
    ],
  },
  {
    id: 3,
    name: 'Amelia Cooper (PEP25)',
    records: [
      { day: 3, code: 'A', color: 'bg-purple-500' },
      { day: 4, code: 'A', color: 'bg-purple-500' },
      { day: 5, code: 'L', color: 'bg-blue-500' },
      { day: 10, code: 'A', color: 'bg-purple-500' },
      { day: 11, code: 'A', color: 'bg-purple-500' },
      { day: 12, code: 'A', color: 'bg-purple-500' },
    ],
  },
  {
    id: 4,
    name: 'Asif Ahmad (PEP1079)',
    records: [
      { day: 10, code: 'A', color: 'bg-purple-500' },
      { day: 11, code: 'A', color: 'bg-purple-500' },
      { day: 12, code: 'A', color: 'bg-purple-500' },
    ],
  },
  {
    id: 5,
    name: 'Ava Mitchell',
    records: [
      { day: 3, code: 'A', color: 'bg-purple-500' },
      { day: 4, code: 'A', color: 'bg-purple-500' },
      { day: 10, code: 'A', color: 'bg-purple-500' },
      { day: 11, code: 'A', color: 'bg-purple-500' },
    ],
  },
  {
    id: 6,
    name: 'Avery Hill (PEP31)',
    records: [
      { day: 3, code: 'A', color: 'bg-purple-500' },
      { day: 4, code: 'A', color: 'bg-purple-500' },
      { day: 10, code: 'A', color: 'bg-purple-500' },
      { day: 11, code: 'A', color: 'bg-purple-500' },
    ],
  },
  {
    id: 7,
    name: 'Ayyagari Kar (PEP1000)',
    records: [
      { day: 10, code: 'A', color: 'bg-purple-500' },
      { day: 11, code: 'A', color: 'bg-purple-500' },
    ],
  },
  {
    id: 8,
    name: 'BALAHARSHINI L (BL2035)',
    records: [
      { day: 10, code: 'L', color: 'bg-blue-500' },
      { day: 11, code: 'A', color: 'bg-purple-500' },
    ],
  },
];

/* ---------- MAIN COMPONENT ---------- */
export default function WorkRecords() {
  const [month, setMonth] = useState('2025-11');
  const [page, setPage] = useState(1);
  const totalPages = 1;

  const [year, mon] = month.split('-').map(Number);
  const daysInMonth = generateDays(year, mon);

  return (
    <>
      {/* ====================== HEADER ====================== */}
      <div className="bg-white border-b border-gray-200 px-4 sm:px-6 py-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-2xl font-bold text-blue-600">Work Records</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">Date: Nov. 12, 2025</span>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Month</span>
              <select
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                {months.map((m) => (
                  <option key={m.value} value={m.value}>
                    {m.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Actions + Legend */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mt-4">
          <div className="flex items-center gap-2">
            <button className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm flex items-center gap-2 hover:bg-red-700">
              <Download className="h-4 w-4" /> Export
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm flex items-center gap-2 hover:bg-gray-50">
              <Filter className="h-4 w-4" /> Filter
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-sm">
            {legend.map((item) => (
              <span key={item.code} className="flex items-center gap-2">
                <Circle className={`h-3 w-3 fill-current ${item.color}`} />
                {item.label}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ====================== TABLE (Vertical Scroll Only) ====================== */}
      <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">
        <div className="max-w-full">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            {/* Fixed Header */}
            <div className="border-b border-gray-200 bg-gray-50">
              <table className="w-full table-fixed">
                <thead>
                  <tr>
                    <th className="sticky left-0 bg-gray-50 px-4 py-3 text-left text-sm font-medium text-gray-700 z-20 w-48">
                      Employee
                    </th>
                    {daysInMonth.map((day, i) => (
                      <th
                        key={i}
                        className="px-2 py-3 text-center text-xs font-medium text-gray-700 min-w-[40px]"
                      >
                        {day.getDate()}
                      </th>
                    ))}
                  </tr>
                </thead>
              </table>
            </div>

            {/* Scrollable Body */}
            <div className="max-h-[65vh] overflow-y-auto">
              <table className="w-full table-fixed">
                <tbody className="divide-y divide-gray-200">
                  {employees.map((emp) => {
                    const recordMap = emp.records.reduce((acc, r) => {
                      acc[r.day] = r;
                      return acc;
                    }, {});

                    return (
                      <tr key={emp.id} className="hover:bg-gray-50">
                        <td className="sticky left-0 bg-white px-4 py-3 text-sm font-medium text-gray-900 z-10 border-r border-gray-200 w-48">
                          {emp.name}
                        </td>
                        {daysInMonth.map((_, i) => {
                          const day = i + 1;
                          const record = recordMap[day];
                          return (
                            <td key={i} className="px-2 py-3 text-center min-w-[40px]">
                              {record ? (
                                <div
                                  className={`w-8 h-8 mx-auto ${record.color} text-white rounded flex items-center justify-center text-xs font-medium`}
                                >
                                  {record.code}
                                </div>
                              ) : (
                                <div className="w-8 h-8 mx-auto border border-gray-200 rounded" />
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-6 text-sm text-gray-600">
            <span>Page {page} of {totalPages}.</span>
            <div className="flex items-center gap-2">
              <span>Page</span>
              <div className="flex items-center border border-gray-300 rounded">
                <button
                  onClick={() => setPage(Math.max(1, page - 1))}
                  disabled={page === 1}
                  className="px-2 py-1 hover:bg-gray-50 disabled:opacity-50"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <input
                  type="number"
                  value={page}
                  onChange={(e) =>
                    setPage(Math.min(totalPages, Math.max(1, Number(e.target.value))))
                  }
                  className="w-12 px-2 py-1 text-center border-x border-gray-300"
                />
                <span className="px-2 py-1 bg-gray-100">of {totalPages}</span>
                <button
                  onClick={() => setPage(Math.min(totalPages, page + 1))}
                  disabled={page === totalPages}
                  className="px-2 py-1 hover:bg-gray-50 disabled:opacity-50"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
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