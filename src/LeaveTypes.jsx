'use client';

import React, { useState } from 'react';
import {
  Search,
  Filter,
  Plus,
  X,
  Upload,
  ToggleLeft,
  ToggleRight,
  ChevronDown,
  MoreVertical
} from 'lucide-react';

export default function LeaveTypes() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Mock leave types
  const leaveTypes = [
    {
      id: 1,
      name: 'marriage leave',
      icon: 'ring', // SVG or image placeholder
      payment: 'Unpaid',
      totalDays: 1.0,
      borderColor: 'border-yellow-500',
      iconBg: 'bg-gray-800',
    },
    {
      id: 2,
      name: 'local',
      icon: 'map-pin',
      payment: 'Unpaid',
      totalDays: 2.0,
      borderColor: 'border-green-500',
      iconBg: 'bg-green-600',
      iconText: 'LO',
      iconTextColor: 'text-white',
    },
    {
      id: 3,
      name: 'test',
      icon: 'test',
      payment: 'Unpaid',
      totalDays: 1.0,
      borderColor: 'border-orange-500',
      iconBg: 'bg-blue-100',
      iconText: 'A',
      iconTextColor: 'text-blue-600',
    },
    {
      id: 4,
      name: 'Casual Leave',
      icon: 'briefcase',
      payment: 'Unpaid',
      totalDays: 1.0,
      borderColor: 'border-green-500',
      iconBg: 'bg-green-600',
      iconText: 'CL',
      iconTextColor: 'text-white',
    },
    {
      id: 5,
      name: 'Maternity Leave',
      icon: 'baby',
      payment: 'Paid',
      totalDays: 90.0,
      borderColor: 'border-red-500',
      iconBg: 'bg-red-600',
      iconText: 'ML',
      iconTextColor: 'text-white',
    },
    {
      id: 6,
      name: 'Sick Leave',
      icon: 'thermometer',
      payment: 'Paid',
      totalDays: 10.0,
      borderColor: 'border-purple-500',
      iconBg: 'bg-purple-600',
      iconText: 'SL',
      iconTextColor: 'text-white',
    },
    {
      id: 7,
      name: 'Casual Leave',
      icon: 'briefcase',
      payment: 'Paid',
      totalDays: 1.0,
      borderColor: 'border-brown-500',
      iconBg: 'bg-amber-700',
      iconText: 'CL',
      iconTextColor: 'text-white',
    },
    {
      id: 8,
      name: 'Compensatory Leave Type',
      icon: 'clock',
      payment: 'Paid',
      totalDays: 1.0,
      borderColor: 'border-green-500',
      iconBg: 'bg-gray-600',
      iconText: 'CT',
      iconTextColor: 'text-white',
    },
  ];

  const filteredTypes = leaveTypes.filter(type =>
    type.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      {/* ====================== HEADER ====================== */}
      <div className="bg-white border-b border-gray-200 px-4 sm:px-6 py-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h1 className="text-2xl font-bold text-gray-900">Leave Types</h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Search className="h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm w-48 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
            <button className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm flex items-center gap-2 hover:bg-gray-50">
              <Filter className="h-4 w-4" /> Filter
            </button>
            <button
              onClick={() => setShowCreateModal(true)}
              className="px-4 py-1.5 bg-red-600 text-white rounded-lg text-sm flex items-center gap-2 hover:bg-red-700"
            >
              <Plus className="h-4 w-4" /> Create
            </button>
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-6 text-sm mt-4">
          <span className="flex items-center gap-2">
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            Unpaid
          </span>
          <span className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            Paid
          </span>
        </div>
      </div>

      {/* ====================== GRID ====================== */}
      <div className="p-4 sm:p-6 bg-gray-50">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredTypes.map(type => (
            <div
              key={type.id}
              className={`bg-white rounded-lg shadow-sm p-4 border-l-4 ${type.borderColor} hover:shadow-md transition-shadow cursor-pointer`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 ${type.iconBg} rounded-full flex items-center justify-center`}>
                    {type.iconText ? (
                      <span className={`text-lg font-bold ${type.iconTextColor}`}>{type.iconText}</span>
                    ) : (
                      <div className="w-10 h-10 bg-gray-400 rounded-full"></div>
                    )}
                  </div>
                  <h3 className="font-semibold text-gray-900">{type.name}</h3>
                </div>
                <button className="text-gray-400 hover:text-gray-600">
                  <MoreVertical className="h-5 w-5" />
                </button>
              </div>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Payment</span>
                  <span className={`font-medium ${type.payment === 'Paid' ? 'text-green-600' : 'text-yellow-600'}`}>
                    {type.payment}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Days</span>
                  <span className="font-medium text-gray-900">{type.totalDays}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-6 text-sm text-gray-600">
          <span>Page 1 of 1.</span>
          <div className="flex items-center gap-2">
            <span>Page</span>
            <input
              type="number"
              value={1}
              readOnly
              className="w-12 px-2 py-1 text-center border border-gray-300 rounded"
            />
            <ChevronDown className="h-4 w-4 text-gray-400" />
          </div>
        </div>
      </div>

      {/* ====================== CREATE MODAL ====================== */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-screen overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Create Leave Type</h2>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  placeholder="Name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              {/* Icon & Color */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Icon</label>
                  <label className="flex items-center justify-center px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 cursor-pointer hover:bg-gray-100">
                    <Upload className="h-4 w-4 text-gray-400 mr-2" />
                    <span className="text-sm text-gray-500">Browse... No file selected.</span>
                    <input type="file" className="hidden" />
                  </label>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Color</label>
                  <div className="flex items-center gap-2">
                    <div className="w-full h-10 bg-gray-800 rounded"></div>
                    <button className="p-1 border border-gray-300 rounded hover:bg-gray-50">
                      <ChevronDown className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Is Paid */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Is Paid</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500">
                  <option>Unpaid</option>
                  <option>Paid</option>
                </select>
              </div>

              {/* Limit Leave Days */}
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">Limit Leave Days</label>
                <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-red-600">
                  <span className="translate-x-6 inline-block h-4 w-4 transform rounded-full bg-white transition"></span>
                </button>
              </div>

              {/* Total Days */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Total Days</label>
                <input
                  type="number"
                  value={1}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              {/* Toggles */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700">Reset</label>
                  <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-300">
                    <span className="translate-x-1 inline-block h-4 w-4 transform rounded-full bg-white transition"></span>
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700">Require Approval</label>
                  <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-red-600">
                    <span className="translate-x-6 inline-block h-4 w-4 transform rounded-full bg-white transition"></span>
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700">Require Attachment</label>
                  <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-300">
                    <span className="translate-x-1 inline-block h-4 w-4 transform rounded-full bg-white transition"></span>
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700">Exclude Company Holidays</label>
                  <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-300">
                    <span className="translate-x-1 inline-block h-4 w-4 transform rounded-full bg-white transition"></span>
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700">Exclude Holidays</label>
                  <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-300">
                    <span className="translate-x-1 inline-block h-4 w-4 transform rounded-full bg-white transition"></span>
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700">Is Encashable</label>
                  <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-300">
                    <span className="translate-x-1 inline-block h-4 w-4 transform rounded-full bg-white transition"></span>
                  </button>
                </div>
              </div>

              {/* Assign to Employees */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Assign to Employees</label>
                <div className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg bg-gray-50">
                  <X className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-700">Dev Prakash (PEP00)</span>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 p-6 border-t border-gray-200">
              <button
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50"
              >
                Cancel
              </button>
              <button className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700">
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ====================== FAB ====================== */}
      <button className="fixed bottom-6 right-6 w-14 h-14 bg-red-600 text-white rounded-full shadow-lg hover:bg-red-700 flex items-center justify-center z-50">
        <Plus className="h-6 w-6" />
      </button>
    </>
  );
}