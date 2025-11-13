'use client';

import React, { useState } from 'react';
import {
  Search,
  Filter,
  List,
  MoreVertical,
  Plus,
  X,
  Download,
  Mail,
  Trash2,
  Calendar,
  ChevronDown,
} from 'lucide-react';

export default function Payslip() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAll, setSelectedAll] = useState(false);
  const [selectedCount, setSelectedCount] = useState(0);

  // Mock payslips
  const payslips = [
    {
      id: 1,
      employee: 'Matthew Harris (PEP08)',
      avatar: 'MH',
      startDate: '01 November, 2025',
      endDate: '13 November, 2025',
      batch: 'None',
      grossPay: '28735.00 QR',
      status: 'Paid',
      statusColor: 'text-green-600',
    },
    {
      id: 2,
      employee: 'Matthew Harris (PEP08)',
      avatar: 'MH',
      startDate: '01 November, 2025',
      endDate: '12 November, 2025',
      batch: 'None',
      grossPay: '27862.50 QR',
      status: 'Confirmed',
      statusColor: 'text-blue-600',
    },
    {
      id: 3,
      employee: 'Priya Sharma (EMP102)',
      avatar: 'PS',
      startDate: '12 November, 2025',
      endDate: '12 November, 2025',
      batch: 'None',
      grossPay: '21294.12 QR',
      status: 'Review Ongoing',
      statusColor: 'text-yellow-600',
    },
    {
      id: 4,
      employee: 'Matthew Harris (PEP08)',
      avatar: 'MH',
      startDate: '01 November, 2025',
      endDate: '10 November, 2025',
      batch: 'None',
      grossPay: '26717.50 QR',
      status: 'Draft',
      statusColor: 'text-gray-600',
    },
    {
      id: 5,
      employee: 'Sarah Anderson (PEP02)',
      avatar: 'SA',
      startDate: '01 November, 2025',
      endDate: '09 November, 2025',
      batch: 'None',
      grossPay: '20283.38 QR',
      status: 'Mail Sent',
      statusColor: 'text-green-600',
    },
    {
      id: 6,
      employee: 'David King (PEP10)',
      avatar: 'DK',
      startDate: '01 November, 2025',
      endDate: '09 November, 2025',
      batch: 'None',
      grossPay: '2020.59 QR',
      status: 'Mail Not Sent',
      statusColor: 'text-gray-600',
    },
    {
      id: 7,
      employee: 'Aria Powell (PEP43)',
      avatar: 'AP',
      startDate: '01 November, 2025',
      endDate: '09 November, 2025',
      batch: 'None',
      grossPay: '5388.24 QR',
      status: 'Paid',
      statusColor: 'text-green-600',
    },
    {
      id: 8,
      employee: 'Matthew Harris (PEP08)',
      avatar: 'MH',
      startDate: '01 November, 2025',
      endDate: '09 November, 2025',
      batch: 'None',
      grossPay: '26145.00 QR',
      status: 'Confirmed',
      statusColor: 'text-blue-600',
    },
  ];

  const filteredPayslips = payslips.filter(p =>
    p.employee.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectAll = () => {
    setSelectedAll(!selectedAll);
    setSelectedCount(selectedAll ? 0 : filteredPayslips.length);
  };

  const handleRowSelect = () => {
    const newCount = selectedCount === filteredPayslips.length ? 0 : selectedCount + 1;
    setSelectedCount(newCount);
    setSelectedAll(newCount === filteredPayslips.length);
  };

  return (
    <>
      {/* ====================== HEADER ====================== */}
      <div className="bg-white border-b border-gray-200 px-4 sm:px-6 py-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h1 className="text-2xl font-bold text-gray-900">Payslip</h1>
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
        <div className="flex flex-wrap items-center gap-4 text-sm mt-4">
          <span className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div> Paid
          </span>
          <span className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div> Confirmed
          </span>
          <span className="flex items-center gap-2">
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div> Review Ongoing
          </span>
          <span className="flex items-center gap-2">
            <div className="w-3 h-3 bg-gray-500 rounded-full"></div> Draft
          </span>
          <span className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-600 rounded-full"></div> Mail Sent
          </span>
          <span className="flex items-center gap-2">
            <div className="w-3 h-3 bg-gray-400 rounded-full"></div> Mail Not Sent
          </span>
        </div>
      </div>

      {/* ====================== BULK ACTIONS ====================== */}
      {selectedCount > 0 && (
        <div className="bg-white border-b border-gray-200 px-4 sm:px-6 py-3">
          <div className="flex items-center gap-3">
            <button
              onClick={handleSelectAll}
              className="px-3 py-1.5 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700"
            >
              Select All Payslips
            </button>
            <button
              onClick={() => {
                setSelectedAll(false);
                setSelectedCount(0);
              }}
              className="px-3 py-1.5 bg-cyan-600 text-white rounded-lg text-sm hover:bg-cyan-700"
            >
              Unselect All Payslips
            </button>
            <button className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700">
              Export Payslips
            </button>
            <span className="ml-auto bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-medium">
              {selectedCount} — Selected
            </span>
          </div>
        </div>
      )}

      {/* ====================== TABLE ====================== */}
      <div className="p-4 sm:p-6 bg-gray-50">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-200">
            <label className="flex items-center gap-2 text-sm font-medium text-green-600 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedAll}
                onChange={handleSelectAll}
                className="w-4 h-4 text-green-600 rounded focus:ring-green-500"
              />
              Select All Payslips
            </label>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-left text-gray-600 border-b">
                <tr>
                  <th className="px-4 py-3"></th>
                  <th className="px-4 py-3">Employee</th>
                  <th className="px-4 py-3">Start Date</th>
                  <th className="px-4 py-3">End Date</th>
                  <th className="px-4 py-3">Batch</th>
                  <th className="px-4 py-3">Gross Pay</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredPayslips.map((p, i) => (
                  <tr
                    key={p.id}
                    className={`hover:bg-gray-50 ${selectedCount > 0 && i < selectedCount ? 'bg-red-50' : ''}`}
                  >
                    <td className="px-4 py-3">
                      <input
                        type="checkbox"
                        checked={selectedAll || i < selectedCount}
                        onChange={handleRowSelect}
                        className="w-4 h-4 text-green-600 rounded focus:ring-green-500"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gray-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                          {p.avatar}
                        </div>
                        <span className="font-medium text-gray-900">{p.employee}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-600">{p.startDate}</td>
                    <td className="px-4 py-3 text-gray-600">{p.endDate}</td>
                    <td className="px-4 py-3 text-gray-600">{p.batch}</td>
                    <td className="px-4 py-3 font-medium text-gray-900">{p.grossPay}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button className="text-gray-600 hover:text-gray-800">
                          <Download className="h-4 w-4" />
                        </button>
                        <button className="text-gray-600 hover:text-gray-800">
                          <Mail className="h-4 w-4" />
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
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h2 className="text-lg font-bold text-gray-900">Create Payslip</h2>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Employee</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500">
                  <option>Matthew Harris (PEP08)</option>
                  <option>Priya Sharma (EMP102)</option>
                  <option>Sarah Anderson (PEP02)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                  <div className="relative">
                    <input
                      type="text"
                      value="01 / 11 / 2025"
                      readOnly
                      className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg bg-gray-50"
                    />
                    <Calendar className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
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
              </div>
            </div>

            <div className="flex justify-end p-4 border-t border-gray-200">
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