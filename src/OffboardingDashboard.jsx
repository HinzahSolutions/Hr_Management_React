'use client';

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Clock, UserMinus, AlertCircle } from 'lucide-react';

export default function OffboardingDashboard() {
  // === KPI Data ===
  const kpiData = [
    { label: 'Offboarding Rate', value: '0.0058', color: 'text-gray-900', bg: 'bg-white' },
    { label: 'Avg. Notice Period', value: '8 : 5', color: 'text-gray-900', bg: 'bg-white' },
    { label: 'Active Offboardings', value: 1, color: 'text-gray-900', bg: 'bg-white' },
  ];

  // === Task Status ===
  const taskStatus = [
    { name: 'Michael Brown', stage: 'Archived', tasks: '1/1', color: 'bg-green-500' },
    { name: 'Test', stage: 'Exit Interview', tasks: '0/1', color: 'bg-red-500' },
    { name: 'Dev Prakash', stage: 'FNF', tasks: '2/2', color: 'bg-orange-500' },
  ];

  // === Not Returned Assets ===
  const notReturnedAssets = [
    { name: 'Dev Prakash', asset: 'Gigabyte AERO 15 OLED - Laptops', reminder: true },
    { name: 'Dev Prakash', asset: 'Doogee - Phones', reminder: true },
    { name: 'Dev Prakash', asset: 'Dell XPS 13 - Laptops', reminder: true },
    { name: 'Dev Prakash', asset: 'Honda - Car', reminder: true },
    { name: 'Dev Prakash', asset: 'Hyundai - Car', reminder: true },
  ];

  // === Department - JobPosition Offboarding (Bar Chart) ===
  const deptOffboarding = [
    { dept: 'S/W Dept', odoo: 1.0, recruiter: 0.9 },
    { dept: 'Hr Dept', odoo: 0.8, recruiter: 1.0 },
  ];

  // === Offboarding Feedbacks ===
  const feedbacks = [
    { name: 'Test', feedback: 'office' },
    { name: 'Dev Prakash', feedback: 'work performance' },
    { name: 'Dev Prakash', feedback: 'jghjgj' },
    { name: 'Michael Brown', feedback: 'ss' },
    { name: 'Dev Prakash', feedback: 'self' },
    { name: 'Michael Brown', feedback: 'NEW FEEDBACK' },
  ];

  // === Joining and Offboarding Chart ===
  const joinOffboardChart = [
    { category: 'resigning', count: 8 },
    { category: 'archived', count: 1 },
    { category: 'New', count: 5 },
  ];

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* === KPI Cards === */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {kpiData.map((kpi, i) => (
          <div
            key={i}
            className={`p-5 rounded-lg shadow-sm border ${kpi.bg === 'bg-white' ? 'bg-white' : kpi.bg}`}
          >
            <p className="text-sm text-gray-600">{kpi.label}</p>
            <p className="text-3xl font-bold mt-1">{kpi.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* === Task Status === */}
        <div className="bg-white p-5 rounded-lg shadow-sm">
          <h3 className="text-sm font-semibold text-gray-800 mb-3">Task Status</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Employee</th>
                  <th className="text-left py-2">Stage</th>
                  <th className="text-center py-2">Task Status</th>
                </tr>
              </thead>
              <tbody>
                {taskStatus.map((row, i) => (
                  <tr key={i} className="border-b">
                    <td className="py-3 flex items-center gap-2">
                      <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center text-white text-xs font-bold">
                        {row.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span>{row.name}</span>
                    </td>
                    <td className="py-3">{row.stage}</td>
                    <td className="text-center py-3">
                      <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                        row.tasks === '1/1' ? 'bg-green-100 text-green-800' :
                        row.tasks === '0/1' ? 'bg-red-100 text-red-800' :
                        'bg-orange-100 text-orange-800'
                      }`}>
                        {row.tasks}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* === Not Returned Assets === */}
        <div className="bg-white p-5 rounded-lg shadow-sm">
          <h3 className="text-sm font-semibold text-gray-800 mb-3">Not Returned Assets</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Employee</th>
                  <th className="text-left py-2">Asset</th>
                  <th className="text-center py-2">Reminder</th>
                </tr>
              </thead>
              <tbody>
                {notReturnedAssets.map((row, i) => (
                  <tr key={i} className="border-b">
                    <td className="py-3 flex items-center gap-2">
                      <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center text-white text-xs font-bold">
                        {row.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span>{row.name}</span>
                    </td>
                    <td className="py-3 text-gray-700">{row.asset}</td>
                    <td className="text-center py-3">
                      <input type="checkbox" className="w-4 h-4 text-red-600 rounded" defaultChecked={row.reminder} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* === Department - JobPosition Offboarding === */}
        <div className="bg-white p-5 rounded-lg shadow-sm md:col-span-1">
          <h3 className="text-sm font-semibold text-gray-800 mb-3">Department - JobPosition Offboarding</h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={deptOffboarding}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="dept" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip />
                <Bar dataKey="odoo" fill="#F472B6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="recruiter" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-3 flex justify-center gap-4 text-xs">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded" style={{ backgroundColor: '#F472B6' }}></div>
              <span>Odoo Dev (S/W Dept)</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded" style={{ backgroundColor: '#3B82F6' }}></div>
              <span>Recruiter (Hr Dept)</span>
            </div>
          </div>
        </div>

        {/* === Offboarding Employees Feedbacks === */}
        <div className="bg-white p-5 rounded-lg shadow-sm">
          <h3 className="text-sm font-semibold text-gray-800 mb-3">Offboarding Employees Feedbacks</h3>
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {feedbacks.map((fb, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center text-white text-xs font-bold">
                  {fb.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{fb.name}</p>
                  <p className="text-xs text-gray-600">{fb.feedback}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* === Joining and Offboarding Chart === */}
        <div className="bg-white p-5 rounded-lg shadow-sm">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-sm font-semibold text-gray-800">Joining and Offboarding Chart</h3>
            <button className="text-gray-400 hover:text-gray-600">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M6 10a2 2 0 100-4 2 2 0 000 4zM10 10a2 2 0 100-4 2 2 0 000 4zM14 10a2 2 0 100-4 2 2 0 000 4z" />
              </svg>
            </button>
          </div>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={joinOffboardChart}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip />
                <Bar dataKey="count" fill="#60A5FA" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-3 flex justify-center text-xs">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded" style={{ backgroundColor: '#60A5FA' }}></div>
              <span>Employees</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}