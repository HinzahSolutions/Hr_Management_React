'use client';

import React, { useState } from 'react';
import {
  Search,
  Filter,
  Plus,
  X,
  Calendar,
  ChevronDown,
  ToggleLeft,
  ToggleRight,
  MoreVertical,
} from 'lucide-react';

export default function Allowances() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Mock allowances
  const allowances = [
    {
      id: 1,
      name: 'House Rent Allowance (HRA)',
      short: 'HR',
      amount: '4.5% of Basic Pay',
      oneTime: 'No',
      taxable: 'Yes',
      date: null,
      borderColor: 'border-green-500',
      iconBg: 'bg-gray-700',
      iconText: 'HR',
      iconTextColor: 'text-white',
    },
    {
      id: 2,
      name: 'Meal Allowance',
      short: 'MA',
      amount: '40.0 QR Amount Per Work From Office',
      oneTime: 'No',
      taxable: 'Yes',
      date: null,
      borderColor: 'border-yellow-500',
      iconBg: 'bg-yellow-500',
      iconText: 'MA',
      iconTextColor: 'text-white',
    },
    {
      id: 3,
      name: 'Education Allowance',
      short: 'EA',
      amount: '10.0% of Basic Pay',
      oneTime: 'No',
      taxable: 'Yes',
      date: null,
      borderColor: 'border-orange-500',
      iconBg: 'bg-orange-500',
      iconText: 'EA',
      iconTextColor: 'text-white',
    },
    {
      id: 4,
      name: 'Transport allowance',
      short: 'TA',
      amount: '10.0% of Basic Pay',
      oneTime: 'On',
      taxable: 'Yes',
      date: '31 October, 2025',
      borderColor: 'border-pink-500',
      iconBg: 'bg-pink-500',
      iconText: 'TA',
      iconTextColor: 'text-white',
    },
    {
      id: 5,
      name: 'overtime',
      short: 'OV',
      amount: '10.0% of Basic Pay',
      oneTime: 'On',
      taxable: 'Yes',
      date: '06 November, 2025',
      borderColor: 'border-yellow-500',
      iconBg: 'bg-yellow-500',
      iconText: 'OV',
      iconTextColor: 'text-white',
    },
    {
      id: 6,
      name: 'quarterly',
      short: 'QU',
      amount: '23.0% of Basic Pay',
      oneTime: 'On',
      taxable: 'Yes',
      date: '25 December, 2025',
      borderColor: 'border-pink-500',
      iconBg: 'bg-pink-500',
      iconText: 'QU',
      iconTextColor: 'text-white',
    },
    {
      id: 7,
      name: 'Developer',
      short: 'DE',
      amount: '5000.0',
      oneTime: 'On',
      taxable: 'Yes',
      date: null,
      borderColor: 'border-green-500',
      iconBg: 'bg-green-600',
      iconText: 'DE',
      iconTextColor: 'text-white',
    },
  ];

  const filteredAllowances = allowances.filter(a =>
    a.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      {/* ====================== HEADER ====================== */}
      <div className="bg-white border-b border-gray-200 px-4 sm:px-6 py-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h1 className="text-2xl font-bold text-gray-900">Allowances</h1>
          <div className="flex items-center gap-3">
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
            <div className="w-3 h-3 bg-green-500 rounded-full"></div> Not Fixed
          </span>
          <span className="flex items-center gap-2">
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div> Fixed
          </span>
          <span className="flex items-center gap-2">
            <div className="w-3 h-3 bg-gray-400 rounded-full"></div> Non Taxable
          </span>
          <span className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div> Taxable
          </span>
        </div>
      </div>

      {/* ====================== GRID ====================== */}
      <div className="p-4 sm:p-6 bg-gray-50">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredAllowances.map(a => (
            <div
              key={a.id}
              className={`bg-white rounded-lg shadow-sm p-4 border-l-4 ${a.borderColor} hover:shadow-md transition-shadow cursor-pointer`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 ${a.iconBg} rounded-full flex items-center justify-center`}>
                    <span className={`text-lg font-bold ${a.iconTextColor}`}>{a.iconText}</span>
                  </div>
                  <h3 className="font-semibold text-gray-900">{a.name}</h3>
                </div>
                <button className="text-gray-400 hover:text-gray-600">
                  <MoreVertical className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Amount</span>
                  <span className="font-medium text-gray-900">{a.amount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">One Time Allowance</span>
                  <span className="font-medium text-gray-900">{a.oneTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Taxable</span>
                  <span className="font-medium text-green-600">Yes</span>
                </div>
                {a.date && (
                  <div className="text-xs text-gray-500 mt-2">
                    {a.date}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ====================== CREATE MODAL ====================== */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-screen overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Allowance</h2>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Title"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>

                {/* One time date */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    One time date <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="dd / mm / yyyy"
                      className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                    <Calendar className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                  </div>
                </div>

                {/* Include all active employees */}
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700">
                    Include all active employees <span className="text-red-500">*</span>
                  </label>
                  <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-300">
                    <span className="translate-x-1 inline-block h-4 w-4 transform rounded-full bg-white transition"></span>
                  </button>
                </div>

                {/* Specific Employees */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Specific Employees <span className="text-red-500">*</span>
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="Search employees..."
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                    <button className="px-3 py-2 bg-orange-500 text-white rounded-lg text-sm hover:bg-orange-600">
                      Filter
                    </button>
                  </div>
                </div>

                {/* Is taxable */}
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700">
                    Is taxable <span className="text-red-500">*</span>
                  </label>
                  <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-red-600">
                    <span className="translate-x-6 inline-block h-4 w-4 transform rounded-full bg-white transition"></span>
                  </button>
                </div>

                {/* Is condition based */}
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700">
                    Is condition based <span className="text-red-500">*</span>
                  </label>
                  <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-300">
                    <span className="translate-x-1 inline-block h-4 w-4 transform rounded-full bg-white transition"></span>
                  </button>
                </div>

                {/* Is fixed */}
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700">
                    Is fixed <span className="text-red-500">*</span>
                  </label>
                  <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-red-600">
                    <span className="translate-x-6 inline-block h-4 w-4 transform rounded-full bg-white transition"></span>
                  </button>
                </div>

                {/* Amount */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Amount <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    placeholder="Amount"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>

                {/* If choice */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    If choice <span className="text-red-500">*</span>
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500">
                    <option>Basic Pay</option>
                    <option>Gross Pay</option>
                  </select>
                </div>

                {/* If condition */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    If condition <span className="text-red-500">*</span>
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500">
                    <option>Greater Than ("")</option>
                    <option>Less Than (&lt;)</option>
                    <option>Equal To (=)</option>
                  </select>
                </div>

                {/* If amount */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    If amount <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    value={0.0}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 p-6 border-t border-gray-200">
              <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">
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