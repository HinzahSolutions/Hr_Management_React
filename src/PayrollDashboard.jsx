'use client';

import React, { useState } from 'react';
import {
  Download,
  ChevronDown,
  Plus,
  FileText,
  Handshake,
} from 'lucide-react';

export default function PayrollDashboard() {
  const [selectedMonth, setSelectedMonth] = useState('2025-10');

  return (
    <>
      {/* ====================== HEADER ====================== */}
      <div className="bg-white border-b border-gray-200 px-4 sm:px-6 py-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h1 className="text-2xl font-bold text-gray-900">Payroll Dashboard</h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <label className="text-sm text-gray-600">Select Month and Year:</label>
              <input
                type="month"
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
            <button className="px-4 py-1.5 bg-red-600 text-white rounded-lg text-sm flex items-center gap-2 hover:bg-red-700">
              <Download className="h-4 w-4" /> Export
            </button>
          </div>
        </div>

        {/* Status Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-white p-4 rounded-lg shadow-sm border-t-4 border-green-500">
            <div className="text-3xl font-bold text-gray-900">1</div>
            <div className="text-sm text-gray-600 mt-1">Paid</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border-t-4 border-blue-500">
            <div className="text-3xl font-bold text-gray-900">19</div>
            <div className="text-sm text-gray-600 mt-1">Confirmed</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border-t-4 border-yellow-500">
            <div className="text-3xl font-bold text-gray-900">0</div>
            <div className="text-sm text-gray-600 mt-1">Review Ongoing</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border-t-4 border-red-500">
            <div className="text-3xl font-bold text-gray-900">5</div>
            <div className="text-sm text-gray-600 mt-1">Draft</div>
          </div>
        </div>
      </div>

      {/* ====================== MAIN CONTENT ====================== */}
      <div className="p-4 sm:p-6 bg-gray-50 space-y-6">
        {/* Employee Payslips + Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Bar Chart */}
          <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                Employee Payslips
                <ChevronDown className="h-4 w-4 text-gray-400" />
              </h2>
            </div>

            <div className="space-y-3">
              {/* Legend */}
              <div className="flex items-center gap-4 text-xs">
                <span className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-red-500 rounded"></div> Draft
                </span>
                <span className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-yellow-500 rounded"></div> Review Ongoing
                </span>
                <span className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-blue-500 rounded"></div> Confirmed
                </span>
                <span className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-green-500 rounded"></div> Paid
                </span>
              </div>

              {/* Chart */}
              <div className="relative h-64">
                <canvas id="payslipChart"></canvas>
                {/* Mock bars */}
                <div className="absolute bottom-0 left-0 right-0 flex items-end justify-center gap-8 h-full px-8">
                  <div className="flex flex-col items-center flex-1">
                    <div className="w-full bg-blue-500 rounded-t" style={{ height: '120px' }}></div>
                    <div className="text-xs text-gray-600 mt-1">Sarah Anderson</div>
                  </div>
                  <div className="flex flex-col items-center flex-1">
                    <div className="w-full bg-blue-500 rounded-t" style={{ height: '20px' }}></div>
                    <div className="text-xs text-gray-600 mt-1">Matthew Harris</div>
                  </div>
                </div>
                {/* Y-axis labels */}
                <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between text-xs text-gray-500 pl-2">
                  <span>1,40,000</span>
                  <span>1,20,000</span>
                  <span>1,00,000</span>
                  <span>80,000</span>
                  <span>60,000</span>
                  <span>40,000</span>
                  <span>20,000</span>
                  <span>0</span>
                </div>
                <div className="absolute bottom-8 left-0 right-0 text-center text-xs text-gray-600">
                  Name of Employees
                </div>
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Total Payslips Generated : 2
            </h3>
            <p className="text-2xl font-bold text-gray-900">139764.06 QR</p>
            <p className="text-sm text-gray-600 mt-1">Total Amount</p>

            <div className="mt-6">
              <h4 className="font-medium text-gray-900">Department Total Amount</h4>
              <div className="mt-3 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">S/W Dept</span>
                  <span className="font-medium">139764.06</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Employer Contributions + Contracts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Employer Contributions */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Employer Contributions</h3>
              <select className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none">
                <option>Aria Powell</option>
              </select>
            </div>

            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-600 border-b">
                  <th className="pb-2">Deduction</th>
                  <th className="pb-2">Employee Contribution</th>
                  <th className="pb-2">Employer Contribution</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-2 flex items-center gap-2">
                    <div className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                      ES
                    </div>
                    ESI
                  </td>
                  <td className="py-2">35.29 QR</td>
                  <td className="py-2">105.88 QR</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Contracts Ending */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-red-600 mb-4">Contracts ending</h3>
            <p className="text-sm text-gray-600">
              Number of contracts expiring in November 2025 : <strong>0</strong>
            </p>

            <div className="flex flex-col items-center justify-center mt-8 text-gray-400">
              <Handshake className="h-16 w-16 mb-3" />
              <p className="text-sm">No contracts ending this month</p>
            </div>
          </div>
        </div>

        {/* Department Chart */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Department Chart</h3>

          <div className="flex items-center justify-center">
            {/* Pie Chart */}
            <div className="relative w-48 h-48">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="#FCA5A5"
                  strokeWidth="10"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="#EF4444"
                  strokeWidth="10"
                  strokeDasharray="282.7"
                  strokeDashoffset="0"
                  className="origin-center -rotate-90"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-2 h-2 bg-red-500 rounded-full mx-auto"></div>
                  <p className="text-xs text-gray-600 mt-1">S/W Dept</p>
                </div>
              </div>
            </div>

            {/* Legend */}
            <div className="ml-8">
              <div className="flex items-center gap-2 text-sm">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span>S/W Dept</span>
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