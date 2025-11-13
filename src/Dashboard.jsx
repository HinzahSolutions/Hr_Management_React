// src/Dashboard.jsx
'use client';

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Plus, Check, X } from 'lucide-react';
import FloatingActionButton from './FloatingActionButton';

export default function Dashboard({ isCollapsed }) {
  const recruitmentData = [
    { name: 'Initial', 'Recruitment Drive': 8, 'FutureForce Recruitment': 0 },
    { name: 'Applied', 'Recruitment Drive': 1, 'FutureForce Recruitment': 1 },
    { name: 'Test', 'Recruitment Drive': 0, 'FutureForce Recruitment': 1 },
    { name: 'Interview', 'Recruitment Drive': 1, 'FutureForce Recruitment': 4 },
    { name: 'Cancelled', 'Recruitment Drive': 0, 'FutureForce Recruitment': 1 },
    { name: 'Hired', 'Recruitment Drive': 1, 'FutureForce Recruitment': 2 },
  ];

  const hoursData = [
    { dept: 'SW Dept', pending: 5, worked: 20 },
    { dept: 'Sales', pending: 10, worked: 15 },
    { dept: 'Marketing', pending: 8, worked: 18 },
    { dept: 'Finance', pending: 6, worked: 22 },
    { dept: 'Growth', pending: 4, worked: 25 },
    { dept: 'Expert', pending: 3, worked: 20 },
  ];

  const feedback = [
    { id: 'GBSIIM', name: 'Sandeep' },
    { id: 'PEO1', name: 'Michael Brown' },
    { id: 'PEO8', name: 'Matthew Harris' },
    { id: 'PEO6', name: 'Jessica Evans' },
  ];

  return (
    <div className="space-y-6">
      {/* Top KPI */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-green-200">
          <h3 className="text-sm font-medium text-gray-500">New Joining Today</h3>
          <p className="mt-2 text-3xl font-bold text-gray-900">0</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-yellow-200">
          <h3 className="text-sm font-medium text-gray-500">New Joining This Week</h3>
          <p className="mt-2 text-3xl font-bold text-gray-900">0</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-blue-200">
          <h3 className="text-sm font-medium text-gray-500">Total Strength</h3>
          <p className="mt-2 text-3xl font-bold text-gray-900">46</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-500">Announcements</h3>
            <button className="p-1 text-pink-600 hover:bg-pink-50 rounded">
              <Plus className="w-5 h-5" />
            </button>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">HT</span>
            </div>
            <span className="text-sm font-medium text-gray-700">Horilla Tour</span>
          </div>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Feedback */}
        <div className="bg-white p-5 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Feedback To Answer</h3>
          <div className="space-y-3">
            {feedback.map((f) => (
              <div key={f.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-medium">{f.name[0]}</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{f.name}</p>
                    <p className="text-xs text-gray-500">({f.id})</p>
                  </div>
                </div>
                <button className="px-3 py-1 text-xs font-medium text-white bg-blue-600 rounded hover:bg-blue-700">
                  Answer
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Asset Requests */}
        <div className="bg-white p-5 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Asset Requests To Approve</h3>
            <button className="text-gray-400 hover:text-gray-600">
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-medium">M</span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Mona Phirani</p>
                <p className="text-xs text-gray-500">(PEOO)</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-xs text-gray-500">Headphones</span>
              <button className="p-1 text-green-600 hover:bg-green-50 rounded">
                <Check className="w-4 h-4" />
              </button>
              <button className="p-1 text-red-600 hover:bg-red-50 rounded">
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* On Leave */}
        <div className="bg-white p-5 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">On Leave</h3>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-medium">O</span>
            </div>
            <p className="text-sm font-medium text-gray-900">Owen Jenkins</p>
          </div>
        </div>

        {/* Recruitment Chart */}
        <div className="bg-white p-5 rounded-lg shadow-sm lg:col-span-2">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recruitment Analytics</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={recruitmentData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Recruitment Drive" fill="#3B82F6" />
              <Bar dataKey="FutureForce Recruitment" fill="#EC4899" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Hours Chart */}
        <div className="bg-white p-5 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Hours Chart</h3>
            <button className="text-gray-400 hover:text-gray-600">
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="text-xs text-gray-500 mb-2">2025-11</div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={hoursData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="dept" angle={-45} textAnchor="end" height={80} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="pending" stackId="a" fill="#EC4899" />
              <Bar dataKey="worked" stackId="a" fill="#10B981" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Floating Action Button */}
      <button className="fixed bottom-6 right-6 w-12 h-12 bg-red-600 text-white rounded-full shadow-lg hover:bg-red-700 flex items-center justify-center z-50">
         <FloatingActionButton />
      </button>
    </div>
  );
}