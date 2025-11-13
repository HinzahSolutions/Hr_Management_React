'use client';

import React, { useState } from 'react';
import {
  Download,
  Plus,
  Calendar,
  ChevronDown,
  User,
  AlertCircle,
  CheckCircle,
  XCircle,
  TrendingUp,
} from 'lucide-react';
import { Bar, Pie, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

const months = [
  { value: '2025-11', label: '2025-11' },
  { value: '2025-10', label: '2025-10' },
  { value: '2025-09', label: '2025-09' },
];

export default function LeaveDashboard() {
  const [month, setMonth] = useState('2025-11');

  // Bar Chart - Employee Leaves
  const barData = {
    labels: ['Vandita Sharma', 'Liam Bennett', 'Amelia Cooper', 'Owen Jenkins'],
    datasets: [
      {
        label: 'Compensatory Leave Type',
        data: [1, 0, 0, 0],
        backgroundColor: '#60A5FA',
      },
      {
        label: 'Casual Leave',
        data: [0, 1, 0, 0],
        backgroundColor: '#F9A8D4',
      },
      {
        label: 'test',
        data: [0, 0, 1, 0],
        backgroundColor: '#FDBA74',
      },
      {
        label: 'Maternity Leave',
        data: [4, 0, 0, 0],
        backgroundColor: '#FDE68A',
      },
      {
        label: 'Sick Leave',
        data: [0, 0, 0, 4],
        backgroundColor: '#94A3B8',
      },
    ],
  };

  // Pie Chart - Department Leaves
  const pieData = {
    labels: ['SW Dept', 'Hr Dept', 'Marketing Dept'],
    datasets: [
      {
        data: [30, 40, 30],
        backgroundColor: ['#60A5FA', '#F9A8D4', '#FDBA74'],
        borderWidth: 2,
        borderColor: '#fff',
      },
    ],
  };

  // Donut Chart - Leave Type Count
  const donutData = {
    labels: ['test', 'Casual Leave', 'Maternity Leave', 'Sick Leave', 'Compensatory Leave Type'],
    datasets: [
      {
        data: [20, 15, 25, 20, 20],
        backgroundColor: ['#60A5FA', '#F9A8D4', '#FDBA74', '#94A3B8', '#FDE68A'],
        borderWidth: 2,
        borderColor: '#fff',
        cutout: '70%',
      },
    ],
  };

  // Line Chart - Weekly Leave Analytics
  const lineData = {
    labels: ['10-11-2025', '11-11-2025', '12-11-2025', '13-11-2025', '14-11-2025', '15-11-2025'],
    datasets: [
      {
        label: 'Leave Trends',
        data: [0.2, 0.9, 0.3, 0.1, 0.7, 0.9],
        borderColor: '#60A5FA',
        backgroundColor: 'rgba(96, 165, 250, 0.1)',
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'bottom' },
    },
  };

  return (
    <>
      {/* ====================== HEADER ====================== */}
      <div className="bg-white border-b border-gray-200 px-4 sm:px-6 py-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h1 className="text-2xl font-bold text-gray-900">Leave Dashboard</h1>
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
      </div>

      {/* ====================== CARDS ROW ====================== */}
      <div className="p-4 sm:p-6 bg-gray-50">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {/* Requests to Approve */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Requests to Approve</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">0</p>
              </div>
              <AlertCircle className="h-8 w-8 text-orange-500" />
            </div>
          </div>

          {/* Approved Leaves */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-green-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Approved Leaves In This Month</p>
                <p className="text-3xl font-bold text-green-600 mt-1">8</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </div>

          {/* Rejected Leaves */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-red-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Rejected Leaves In This Month</p>
                <p className="text-3xl font-bold text-red-600 mt-1">20</p>
              </div>
              <XCircle className="h-8 w-8 text-red-500" />
            </div>
          </div>

          {/* View Personal Dashboard */}
          <a
            href="#"
            className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 rounded-lg shadow-sm text-white flex items-center justify-between hover:from-indigo-700 hover:to-purple-700"
          >
            <div>
              <p className="text-sm">View Personal Dashboard</p>
            </div>
            <TrendingUp className="h-6 w-6" />
          </a>
        </div>

        {/* ====================== CHARTS ROW 1 ====================== */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Employee Leaves Bar Chart */}
          <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Employee Leaves</h3>
              <select className="px-3 py-1 border border-gray-300 rounded text-sm">
                <option>2025-11</option>
              </select>
            </div>
            <div className="h-64">
              <Bar data={barData} options={{ ...chartOptions, indexAxis: 'y' }} />
            </div>
          </div>

          {/* On Leave */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">On Leave</h3>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                <User className="h-6 w-6 text-gray-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Vandita Sharma</p>
              </div>
            </div>
          </div>

          {/* Upcoming Holidays */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Holidays</h3>
            <div className="flex flex-col items-center justify-center h-32 text-gray-500">
              <Calendar className="h-12 w-12 mb-2 text-gray-400" />
              <p className="text-sm">No more holidays scheduled for this month.</p>
            </div>
          </div>
        </div>

        {/* ====================== CHARTS ROW 2 ====================== */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Department Leaves Pie */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Department Leaves</h3>
            <select className="w-full px-3 py-1 border border-gray-300 rounded text-sm mb-4">
              <option>2025-11</option>
            </select>
            <div className="h-48">
              <Pie data={pieData} options={chartOptions} />
            </div>
          </div>

          {/* Leave Type Count Donut */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Leave Type - Count of leaves</h3>
            <select className="w-full px-3 py-1 border border-gray-300 rounded text-sm mb-4">
              <option>2025-11</option>
            </select>
            <div className="h-48">
              <Pie data={donutData} options={chartOptions} />
            </div>
          </div>

          {/* Weekly Leave Analytics Line */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Weekly Leave Analytics</h3>
            <div className="h-48">
              <Line data={lineData} options={chartOptions} />
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