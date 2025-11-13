'use client';

import React, { useState } from 'react';
import {
  Users,
  Clock,
  AlertCircle,
  Coffee,
  Timer,
  Search,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Plus,
  CheckCircle,
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const offlineEmployees = [
  { id: 1, name: 'ARJIT Chaudhary', status: 'Expected working', avatar: 'AC' },
  { id: 2, name: 'ARYAN AWATHI', status: 'Expected working', avatar: 'AA' },
  { id: 3, name: 'Abigail Roberts', status: 'Expected working', avatar: 'AR' },
  { id: 4, name: 'Alexander Smith', status: 'Expected working', avatar: 'AS' },
  { id: 5, name: 'Amelia Cooper', status: 'Expected working', avatar: 'AC' },
  { id: 6, name: 'Asif Ahmad', status: 'Expected working', avatar: 'AA' },
];

const hoursChartData = [
  { dept: 'S/W Dept.', pending: 10, worked: 20 },
  { dept: 'Sales', pending: 5, worked: 18 },
  { dept: 'HR', pending: 3, worked: 15 },
  { dept: 'Marketing', pending: 8, worked: 22 },
  { dept: 'Finance', pending: 2, worked: 12 },
  { dept: 'Managers', pending: 4, worked: 25 },
  { dept: 'Growth Hacking', pending: 6, worked: 19 },
  { dept: 'Expert Stage', pending: 1, worked: 10 },
];

const attendanceToValidate = [
  {
    id: 1,
    employee: 'Vandita Sharma (PEP00)',
    date: '11 November, 2025',
    checkIn: '08:30',
  },
];

export default function AttendanceDashboard() {
  const [page, setPage] = useState(1);
  const totalPages = 3;

  return (
    <>
      {/* ====================== PAGE HEADER ====================== */}
      <div className="bg-white border-b border-gray-200 px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Attendance Dashboard</h1>
          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-600">2025-11</div>
          </div>
        </div>
      </div>

      {/* ====================== CONTENT ====================== */}
      <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto space-y-6">

          {/* ====================== TODAY'S ATTENDANCE ====================== */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg shadow-sm p-6 border-t-4 border-blue-500">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Today's Attendances</h3>
              <p className="text-4xl font-bold text-gray-900">0.00%</p>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6 border-t-4 border-green-500">
              <h3 className="text-lg font-medium text-gray-900 mb-2">On Time</h3>
              <p className="text-4xl font-bold text-green-600">0</p>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6 border-t-4 border-red-500">
              <h3 className="text-lg clate font-medium text-gray-900 mb-2">Late Come</h3>
              <p className="text-4xl font-bold text-red-600">0</p>
            </div>
          </div>

          {/* ====================== ANALYTIC + OFFLINE + HOURS CHART ====================== */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Attendance Analytic */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">Attendance Analytic</h3>
                <div className="flex items-center gap-2">
                  <select className="text-sm border border-gray-300 rounded px-2 py-1">
                    <option>Day</option>
                  </select>
                  <div className="flex items-center gap-1 border border-gray-300 rounded px-2 py-1 text-sm">
                    <Calendar className="h-4 w-4" />
                    <span>12 / 11 / 2025</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center h-48 text-gray-400">
                <div className="w-16 h-16 mb-3">
                  <svg viewBox="0 0 64 64" fill="currentColor">
                    <path d="M32 58c14.36 0 26-11.64 26-26S46.36 6 32 6 6 17.64 6 32s11.64 26 26 26zm0-4c-12.15 0-22-9.85-22-22s9.85-22 22-22 22 9.85 22 22-9.85 22-22 22zm-8-32h16v4H24v-4zm0 12h16v4H24v-4zm0 12h12v4H24v-4z"/>
                  </svg>
                </div>
                <p className="text-sm">No records available at the moment.</p>
              </div>
            </div>

            {/* Offline Employees */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Offline Employees</h3>
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {offlineEmployees.map((emp) => (
                  <div key={emp.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-xs font-medium text-gray-700">
                        {emp.avatar}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{emp.name}</p>
                        <p className="text-xs text-gray-500">{emp.status}</p>
                      </div>
                    </div>
                    <input type="checkbox" className="rounded text-red-600" />
                  </div>
                ))}
              </div>
              <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
                <span>Page 1 of 3</span>
                <div className="flex items-center gap-1">
                  <button className="p-1 hover:bg-gray-100 rounded">
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button className="p-1 hover:bg-gray-100 rounded">
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Hours Chart */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">Hours Chart</h3>
                <div className="flex items-center gap-4 text-xs">
                  <span className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-pink-500 rounded"></div> Pending Hours
                  </span>
                  <span className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-teal-500 rounded"></div> Worked Hours
                  </span>
                </div>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={hoursChartData} margin={{ top: 10, right: 10, left: 10, bottom: 40 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="dept" angle={-45} textAnchor="end" height={80} tick={{ fontSize: 10 }} />
                    <YAxis tick={{ fontSize: 10 }} />
                    <Tooltip />
                    <Bar dataKey="pending" stackId="a" fill="#f472b6" />
                    <Bar dataKey="worked" stackId="a" fill="#14b8a6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* ====================== ON BREAK + OVERTIME TO APPROVE ====================== */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* On Break */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">On Break</h3>
              <div className="flex flex-col items-center justify-center h-40 text-gray-400">
                <Coffee className="w-12 h-12 mb-3" />
                <p className="text-sm">No employees are currently taking a break.</p>
              </div>
            </div>

            {/* Overtime To Approve */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Overtime To Approve</h3>
              <div className="flex flex-col items-center justify-center h-40 text-gray-400">
                <Search className="w-12 h-12 mb-3" />
                <p className="text-sm">No Records found.</p>
                <p className="text-xs text-gray-500 mt-1">No overtime records pending validation.</p>
              </div>
            </div>
          </div>

          {/* ====================== ATTENDANCE TO VALIDATE ====================== */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">Attendance To Validate</h3>
              <div className="flex items-center gap-2">
                <select className="text-sm border border-gray-300 rounded px-2 py-1">
                  <option>Day</option>
                </select>
                <div className="flex items-center gap-1 border border-gray-300 rounded px-2 py-1 text-sm">
                  <Calendar className="h-4 w-4" />
                  <span>12 / 11 / 2025</span>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Employee</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Date</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Check-in</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {attendanceToValidate.map((row) => (
                    <tr key={row.id}>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-xs font-medium text-gray-700">
                            VS
                          </div>
                          <span className="text-sm font-medium text-gray-900">{row.employee}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700">{row.date}</td>
                      <td className="px-4 py-3 text-sm text-gray-700">{row.checkIn}</td>
                      <td className="px-4 py-3">
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 flex items-center gap-1">
                          <CheckCircle className="h-4 w-4" /> Validate
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* ====================== DEPARTMENT OVERTIME CHART ====================== */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">Department Overtime Chart</h3>
              <div className="flex items-center gap-2">
                <select className="text-sm border border-gray-300 rounded px-2 py-1">
                  <option>Day</option>
                </select>
                <div className="flex items-center gap-1 border border-gray-300 rounded px-2 py-1 text-sm">
                  <Calendar className="h-4 w-4" />
                  <span>12 / 11 / 2025</span>
                </div>
              </div>
            </div>
            <div className="h-64 flex items-center justify-center text-gray-400">
              <Search className="w-12 h-12 mb-3" />
              <p className="text-sm">No overtime data available for the selected period.</p>
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