'use client';

import React, { useState } from 'react';
import {
  Search,
  Filter,
  List,
  MoreVertical,
  Plus,
  X,
  Upload,
  Calendar,
  ChevronDown,
  Pencil,
  Trash2,
} from 'lucide-react';

export default function Contracts() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAll, setSelectedAll] = useState(false);

  // Mock contracts
  const contracts = [
    {
      id: 1,
      contractName: "Emma Lee (PEP11)'s Contract",
      employee: 'Emma Lee (PEP11)',
      startDate: '01 January, 2024',
      endDate: 'None',
      wageType: 'Monthly',
      basicSalary: 15000,
      status: 'Draft',
      statusColor: 'text-gray-600',
    },
    {
      id: 2,
      contractName: "Christopher Miller (PEP12)'s Contract",
      employee: 'Christopher Miller (PEP12)',
      startDate: '01 January, 2024',
      endDate: 'None',
      wageType: 'Monthly',
      basicSalary: 15000,
      status: 'Draft',
      statusColor: 'text-gray-600',
    },
    {
      id: 3,
      contractName: "Mia Nelson (PEP13)'s Contract",
      employee: 'Mia Nelson (PEP13)',
      startDate: '01 February, 2024',
      endDate: 'None',
      wageType: 'Monthly',
      basicSalary: 15000,
      status: 'Active',
      statusColor: 'text-green-600',
    },
    {
      id: 4,
      contractName: "Benjamin Parker (PEP14)'s Contract",
      employee: 'Benjamin Parker (PEP14)',
      startDate: '01 February, 2024',
      endDate: 'None',
      wageType: 'Monthly',
      basicSalary: 15000,
      status: 'Active',
      statusColor: 'text-green-600',
    },
    {
      id: 5,
      contractName: "Alexander Smith (PEP15)'s Contract",
      employee: 'Alexander Smith (PEP15)',
      startDate: '01 February, 2024',
      endDate: 'None',
      wageType: 'Monthly',
      basicSalary: 15000,
      status: 'Draft',
      statusColor: 'text-gray-600',
    },
    {
      id: 6,
      contractName: "Isabella Thompson (PEP17)'s Contract",
      employee: 'Isabella Thompson (PEP17)',
      startDate: '01 February, 2024',
      endDate: 'None',
      wageType: 'Monthly',
      basicSalary: 25000,
      status: 'Draft',
      statusColor: 'text-gray-600',
    },
    {
      id: 7,
      contractName: "Jacob Walker (PEP18)'s Contract",
      employee: 'Jacob Walker (PEP18)',
      startDate: '01 February, 2024',
      endDate: 'None',
      wageType: 'Monthly',
      basicSalary: 25000,
      status: 'Draft',
      statusColor: 'text-gray-600',
    },
    {
      id: 8,
      contractName: "Noah Young (PEP20)'s Contract",
      employee: 'Noah Young (PEP20)',
      startDate: '01 February, 2024',
      endDate: 'None',
      wageType: 'Monthly',
      basicSalary: 25000,
      status: 'Draft',
      statusColor: 'text-gray-600',
    },
  ];

  const filteredContracts = contracts.filter(c =>
    c.employee.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.contractName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      {/* ====================== HEADER ====================== */}
      <div className="bg-white border-b border-gray-200 px-4 sm:px-6 py-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h1 className="text-2xl font-bold text-gray-900">Contracts</h1>
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
            <button className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm flex items-center gap-2 hover:bg-gray-50">
              <List className="h-4 w-4" /> Group By
            </button>
            <select className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none">
              <option>Actions</option>
            </select>
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
            <div className="w-3 h-3 bg-green-500 rounded-full"></div> Active
          </span>
          <span className="flex items-center gap-2">
            <div className="w-3 h-3 bg-gray-400 rounded-full"></div> Draft
          </span>
          <span className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div> Expired
          </span>
          <span className="flex items-center gap-2">
            <div className="w-3 h-3 bg-black rounded-full"></div> Terminated
          </span>
        </div>
      </div>

      {/* ====================== TABLE ====================== */}
      <div className="p-4 sm:p-6 bg-gray-50">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-200">
            <label className="flex items-center gap-2 text-sm font-medium text-green-600 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedAll}
                onChange={() => setSelectedAll(!selectedAll)}
                className="w-4 h-4 text-green-600 rounded focus:ring-green-500"
              />
              Select All Contracts
            </label>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-left text-gray-600 border-b">
                <tr>
                  <th className="px-4 py-3"></th>
                  <th className="px-4 py-3">Contract</th>
                  <th className="px-4 py-3">Employee</th>
                  <th className="px-4 py-3">Start Date</th>
                  <th className="px-4 py-3">End Date</th>
                  <th className="px-4 py-3">Wage Type</th>
                  <th className="px-4 py-3">Basic Salary</th>
                  <th className="px-4 py-3">Filing Status</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredContracts.map((c, i) => (
                  <tr key={c.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <input
                        type="checkbox"
                        checked={selectedAll}
                        className="w-4 h-4 text-green-600 rounded focus:ring-green-500"
                      />
                    </td>
                    <td className="px-4 py-3 text-gray-900">{c.contractName}</td>
                    <td className="px-4 py-3 text-gray-900">{c.employee}</td>
                    <td className="px-4 py-3 text-gray-600">{c.startDate}</td>
                    <td className="px-4 py-3 text-gray-600">{c.endDate}</td>
                    <td className="px-4 py-3 text-gray-900">{c.wageType}</td>
                    <td className="px-4 py-3 text-gray-900">{c.basicSalary.toLocaleString()}</td>
                    <td className="px-4 py-3 text-gray-600">TDS</td>
                    <td className="px-4 py-3">
                      <span className={`font-medium ${c.statusColor}`}>{c.status}</span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button className="text-blue-600 hover:text-blue-800">
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button className="text-red-600 hover:text-red-800">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ====================== CREATE MODAL ====================== */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-screen overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Contract</h2>
              <div className="flex items-center gap-3">
                <select className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none">
                  <option>Draft</option>
                  <option>Active</option>
                </select>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Contract & Employee */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Contract <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Contract"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Employee <span className="text-red-500">*</span>
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500">
                    <option>Dev Prakash (PEP00)</option>
                  </select>
                </div>

                {/* Start & End Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Contract start date <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value="13 / 11 / 2025"
                      readOnly
                      className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg bg-gray-50"
                    />
                    <Calendar className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Contract end date</label>
                  <div className="relative">
                    <input
                      type="text"
                      value="13 / 11 / 2025"
                      readOnly
                      className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg bg-gray-50"
                    />
                    <Calendar className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                  </div>
                </div>

                {/* Wage Type & Pay Frequency */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Wage Type <span className="text-red-500">*</span>
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500">
                    <option>Monthly</option>
                    <option>Daily</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Pay Frequency <span className="text-red-500">*</span>
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500">
                    <option>Monthly</option>
                  </select>
                </div>

                {/* Basic Salary & Filing Status */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Basic Salary <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    value={0}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Filing Status</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none">
                    <option>---Choose Filing Status---</option>
                  </select>
                </div>

                {/* Department & Job Position */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none">
                    <option>---Choose Department---</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Job Position</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none">
                    <option>---Choose Job Position---</option>
                  </select>
                </div>

                {/* Job Role & Shift */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Job Role</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none">
                    <option>---Choose Job Role---</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Shift</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none">
                    <option>---Choose Shift---</option>
                  </select>
                </div>

                {/* Work Type & Notice Period */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Work Type</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none">
                    <option>---Choose Work Type---</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Notice Period <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    value={30}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>

                {/* Document & Deduct */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Contract document</label>
                  <label className="flex items-center justify-center px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 cursor-pointer hover:bg-gray-100">
                    <Upload className="h-4 w-4 text-gray-400 mr-2" />
                    <span className="text-sm text-gray-500">Browse... No file selected.</span>
                    <input type="file" className="hidden" />
                  </label>
                </div>
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700">Deduct From Basic Pay</label>
                  <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-red-600">
                    <span className="translate-x-6 inline-block h-4 w-4 transform rounded-full bg-white transition"></span>
                  </button>
                </div>

                {/* Calculate Daily Leave */}
                <div className="flex items-center justify-between md:col-span-2">
                  <label className="text-sm font-medium text-gray-700">Calculate Daily Leave Amount</label>
                  <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-red-600">
                    <span className="translate-x-6 inline-block h-4 w-4 transform rounded-full bg-white transition"></span>
                  </button>
                </div>

                {/* Note */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Note</label>
                  <textarea
                    placeholder="Note"
                    rows={3}
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