'use client';

import React, { useState } from 'react';
import {
  Filter,
  ChevronDown,
  Circle,
  Plus,
} from 'lucide-react';

const attendanceData = [
  {
    id: 1,
    employee: 'Vandita Sharma (PEP00)',
    date: '23 October, 2025',
    day: 'Thursday',
    checkIn: '08:00',
    inDate: '23 October, 2025',
    checkOut: '16:00',
    outDate: '23 October, 2025',
    status: 'validated',
  },
  {
    id: 2,
    employee: 'Vandita Sharma (PEP00)',
    date: '24 October, 2025',
    day: 'Friday',
    checkIn: '08:00',
    inDate: '24 October, 2025',
    checkOut: '16:00',
    outDate: '24 October, 2025',
    status: 'validated',
  },
  {
    id: 3,
    employee: 'Vandita Sharma (PEP00)',
    date: '27 October, 2025',
    day: 'Monday',
    checkIn: '08:00',
    inDate: '27 October, 2025',
    checkOut: '16:00',
    outDate: '27 October, 2025',
    status: 'not-validated',
  },
  {
    id: 4,
    employee: 'Vandita Sharma (PEP00)',
    date: '28 October, 2025',
    day: 'Tuesday',
    checkIn: '08:00',
    inDate: '28 October, 2025',
    checkOut: '16:00',
    outDate: '28 October, 2025',
    status: 'requested',
  },
  {
    id: 5,
    employee: 'Vandita Sharma (PEP00)',
    date: '29 October, 2025',
    day: 'Wednesday',
    checkIn: '08:00',
    inDate: '29 October, 2025',
    checkOut: '16:00',
    outDate: '29 October, 2025',
    status: 'approved',
  },
  {
    id: 6,
    employee: 'Vandita Sharma (PEP00)',
    date: '30 October, 2025',
    day: 'Thursday',
    checkIn: '08:00',
    inDate: '30 October, 2025',
    checkOut: '16:00',
    outDate: '30 October, 2025',
    status: 'validated',
  },
  {
    id: 7,
    employee: 'Vandita Sharma (PEP00)',
    date: '08 November, 2025',
    day: 'Saturday',
    checkIn: '08:40',
    inDate: '08 November, 2025',
    checkOut: '22:25',
    outDate: '08 November, 2025',
    status: 'not-validated',
  },
  {
    id: 8,
    employee: 'Vandita Sharma (PEP00)',
    date: '10 November, 2025',
    day: 'Monday',
    checkIn: '22:23',
    inDate: '10 November, 2025',
    checkOut: '22:23',
    outDate: '10 November, 2025',
    status: 'requested',
  },
];

const workSummaryData = [
  {
    id: 9,
    employee: 'Vandita Sharma (PEP00)',
    shift: 'Office Shift',
    workType: 'None',
    minHour: '00:00',
    atWork: '08:00',
    pendingHour: '00:00',
    overtime: '01:00',
  },
  {
    id: 10,
    employee: 'Vandita Sharma (PEP00)',
    shift: 'Office Shift',
    workType: 'None',
    minHour: '00:00',
    atWork: '08:00',
    pendingHour: '00:00',
    overtime: '01:00',
  },
  {
    id: 11,
    employee: 'Vandita Sharma (PEP00)',
    shift: 'Office Shift',
    workType: 'None',
    minHour: '00:00',
    atWork: '08:00',
    pendingHour: '00:00',
    overtime: '01:00',
  },
  {
    id: 12,
    employee: 'Vandita Sharma (PEP00)',
    shift: 'Office Shift',
    workType: 'None',
    minHour: '00:00',
    atWork: '08:00',
    pendingHour: '00:00',
    overtime: '01:00',
  },
  {
    id: 13,
    employee: 'Vandita Sharma (PEP00)',
    shift: 'Office Shift',
    workType: 'None',
    minHour: '00:00',
    atWork: '08:00',
    pendingHour: '00:00',
    overtime: '01:00',
  },
  {
    id: 14,
    employee: 'Vandita Sharma (PEP00)',
    shift: 'Office Shift',
    workType: 'None',
    minHour: '00:00',
    atWork: '08:00',
    pendingHour: '00:00',
    overtime: '01:00',
  },
  {
    id: 15,
    employee: 'Vandita Sharma (PEP00)',
    shift: 'Office Shift',
    workType: 'None',
    minHour: '00:00',
    atWork: '08:00',
    pendingHour: '00:00',
    overtime: '01:00',
  },
];

export default function MyAttendances() {
  const [tab, setTab] = useState('attendance'); // 'attendance' | 'summary'

  const data = tab === 'attendance' ? attendanceData : workSummaryData;

  const getStatusColor = (status) => {
    if (status === 'validated') return 'text-green-600';
    if (status === 'not-validated') return 'text-red-600';
    if (status === 'requested') return 'text-orange-600';
    return 'text-blue-600';
  };

  const getStatusDot = (status) => {
    if (status === 'validated') return 'bg-green-500';
    if (status === 'not-validated') return 'bg-red-500';
    if (status === 'requested') return 'bg-orange-500';
    return 'bg-blue-500';
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
          <h1 className="text-2xl font-bold text-gray-900">My Attendances</h1>
          <div className="flex items-center gap-2">
            <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm flex items-center gap-2 hover:bg-gray-50">
              <Filter className="h-4 w-4" /> Filter
            </button>
          </div>
        </div>

        {/* Status Legend */}
        <div className="flex items-center gap-6 mt-4 text-sm">
          <span className="flex items-center gap-2">
            <Circle className={`h-3 w-3 fill-current ${getStatusDot('validated')}`} />
            Validated
          </span>
          <span className="flex items-center gap-2">
            <Circle className={`h-3 w-3 fill-current ${getStatusDot('not-validated')}`} />
            Not validated
          </span>
          <span className="flex items-center gap-2">
            <Circle className={`h-3 w-3 fill-current ${getStatusDot('requested')}`} />
            Requested
          </span>
          <span className="flex items-center gap-2">
            <Circle className={`h-3 w-3 fill-current ${getStatusDot('approved')}`} />
            Approved request
          </span>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mt-4 border-b border-gray-200">
          <button
            onClick={() => setTab('attendance')}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
              tab === 'attendance'
                ? 'border-red-600 text-red-600'
                : 'border-transparent text-gray-600 hover:text-gray-800'
            }`}
          >
            Attendance
          </button>
          <button
            onClick={() => setTab('summary')}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
              tab === 'summary'
                ? 'border-red-600 text-red-600'
                : 'border-transparent text-gray-600 hover:text-gray-800'
            }`}
          >
            Work Summary
          </button>
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
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Employee</th>
                    {tab === 'attendance' ? (
                      <>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Date</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Day</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Check-In</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">In Date</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Check-Out</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Out Date</th>
                      </>
                    ) : (
                      <>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Shift</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Work Type</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Min Hour</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">At Work</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Pending Hour</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Overtime</th>
                      </>
                    )}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {data.map((row) => (
                    <tr key={row.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-xs font-medium text-gray-700">
                            {getAvatarInitials(row.employee)}
                          </div>
                          <span className="text-sm font-medium text-gray-900">{row.employee}</span>
                        </div>
                      </td>
                      {tab === 'attendance' ? (
                        <>
                          <td className="px-4 py-3 text-sm text-gray-700">{row.date}</td>
                          <td className="px-4 py-3 text-sm text-gray-700">{row.day}</td>
                          <td className="px-4 py-3 text-sm text-gray-700">{row.checkIn}</td>
                          <td className="px-4 py-3 text-sm text-gray-700">{row.inDate}</td>
                          <td className="px-4 py-3 text-sm text-gray-700">{row.checkOut}</td>
                          <td className="px-4 py-3 text-sm text-gray-700">{row.outDate}</td>
                        </>
                      ) : (
                        <>
                          <td className="px-4 py-3 text-sm text-gray-700">{row.shift}</td>
                          <td className="px-4 py-3 text-sm text-gray-700">{row.workType}</td>
                          <td className="px-4 py-3 text-sm text-gray-700">{row.minHour}</td>
                          <td className="px-4 py-3 text-sm text-gray-700">{row.atWork}</td>
                          <td className="px-4 py-3 text-sm text-gray-700">{row.pendingHour}</td>
                          <td className="px-4 py-3 text-sm text-gray-700">{row.overtime}</td>
                        </>
                      )}
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