'use client';

import React, { useState } from 'react';
import {
  Search,
  Filter,
  Plus,
  X,
  Calendar,
  ChevronDown,
  MoreVertical,
  Edit,
  Trash2,
  ToggleLeft,
  ToggleRight,
} from 'lucide-react';

export default function LoanAdvancedSalary() {
  const [activeTab, setActiveTab] = useState('Loan');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data
  const loans = [
    {
      id: 1,
      type: 'Loan',
      title: 'Medical Loan',
      employee: 'Grace Allen (PEP21)',
      dept: 'Sales Dept / Sales Man',
      date: 'July 1, 2025',
      desc: 'Loan for parents medical case.',
      amount: 5000,
      installments: 12,
      paid: 0,
    },
    {
      id: 2,
      type: 'Loan',
      title: 'Car Loan',
      employee: 'Dev Prakash (PEP00)',
      dept: 'Hr Dept / Recruiter',
      date: 'Nov. 6, 2025',
      desc: 'desc.',
      amount: 15000,
      installments: 24,
      paid: 2,
    },
  ];

  const advances = [
    {
      id: 3,
      type: 'Advanced Salary',
      title: 'schoolfees advance',
      employee: 'Dev Prakash (PEP00)',
      dept: 'Hr Dept / Recruiter',
      date: 'Oct 31, 2025',
      desc: 'advance for school fees.',
      amount: 2000,
      installments: 2,
      paid: 0,
    },
    {
      id: 4,
      type: 'Advanced Salary',
      title: 'Acompte',
      employee: 'Zohir Djenden (PEP3658)',
      dept: 'Sales Dept / Sales Man',
      date: 'Oct 29, 2025',
      desc: 'Acompte.',
      amount: 1000,
      installments: 1,
      paid: 0,
    },
    {
      id: 5,
      type: 'Advanced Salary',
      title: 'Adv',
      employee: 'Alexander Smith (PEP16)',
      dept: 'Sales Dept / Sales Man',
      date: 'Nov 1, 2025',
      desc: 'desc.',
      amount: 800,
      installments: 1,
      paid: 0,
    },
    {
      id: 6,
      type: 'Advanced Salary',
      title: 'Advance salary',
      employee: 'Priya Sharma (EMP102)',
      dept: 'None / None',
      date: 'Nov. 12, 2025',
      desc: 'i need.',
      amount: 20000,
      installments: 2,
      paid: 0,
    },
  ];

  const fines = [];

  const allItems = [...loans, ...advances, ...fines];
  const filteredItems = allItems
    .filter(i => i.type === activeTab)
    .filter(i => i.employee.toLowerCase().includes(searchQuery.toLowerCase()));

  const openDetail = (item) => {
    setSelectedLoan(item);
    setShowDetailModal(true);
  };

  return (
    <>
      {/* ====================== HEADER ====================== */}
      <div className="bg-white border-b border-gray-200 px-4 sm:px-6 py-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h1 className="text-2xl font-bold text-gray-900">Loan / Advanced Salary</h1>
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

        {/* Tabs */}
        <div className="flex gap-6 mt-6 border-b border-gray-200">
          {['Loan', 'Advanced Salary', 'Fine'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 px-1 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab
                  ? 'border-red-600 text-red-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* ====================== GRID ====================== */}
      <div className="p-4 sm:p-6 bg-gray-50">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredItems.map(item => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => openDetail(item)}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-medium text-cyan-600 bg-cyan-100 px-2 py-1 rounded">
                  {item.type === 'Advanced Salary' ? 'Advanced Salary' : item.type}
                </span>
                <div className="flex gap-1">
                  <button className="text-gray-400 hover:text-gray-600">
                    <Edit className="h-4 w-4" />
                  </button>
                  <button className="text-red-400 hover:text-red-600">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-gray-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  {item.employee.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{item.employee}</h3>
                  <p className="text-xs text-gray-600">{item.dept}</p>
                  <p className="text-xs text-gray-500">{item.date}</p>
                </div>
              </div>

              <h4 className="font-medium text-gray-900 mb-1">{item.title}</h4>
              <p className="text-sm text-gray-600 line-clamp-2 mb-3">{item.desc}</p>

              <button className="w-full bg-red-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-red-700">
                Installments
              </button>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-6 text-sm text-gray-600">
          <span>Page 1 of 1.</span>
          <div className="flex items-center gap-2">
            <span>Page</span>
            <select className="px-2 py-1 border border-gray-300 rounded text-sm">
              <option>1</option>
            </select>
            <span>of 1</span>
          </div>
        </div>
      </div>

      {/* ====================== DETAIL MODAL ====================== */}
      {showDetailModal && selectedLoan && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-screen overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Details</h2>
              <button
                onClick={() => setShowDetailModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gray-600 text-white rounded-full flex items-center justify-center text-lg font-bold">
                  {selectedLoan.employee.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{selectedLoan.employee}</h3>
                  <p className="text-sm text-gray-600">None / None</p>
                </div>
              </div>

              <h4 className="text-lg font-medium text-gray-900">
                {selectedLoan.type === 'Advanced Salary' ? 'Advance salary' : selectedLoan.title}
              </h4>

              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Total Amount :</span>
                  <p className="font-medium">{selectedLoan.amount.toFixed(2)}</p>
                </div>
                <div>
                  <span className="text-gray-600">Paid Amount :</span>
                  <p className="font-medium">0</p>
                </div>
                <div>
                  <span className="text-gray-600">Balance Amount :</span>
                  <p className="font-medium">{(selectedLoan.amount - selectedLoan.paid).toFixed(2)}</p>
                </div>
              </div>

              <div className="border rounded-lg overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 text-gray-700">
                    <tr>
                      <th className="px-4 py-2 text-left">S/N</th>
                      <th className="px-4 py-2 text-left">One Time Date</th>
                      <th className="px-4 py-2 text-left">Amount</th>
                      <th className="px-4 py-2 text-left">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {Array.from({ length: selectedLoan.installments }, (_, i) => (
                      <tr key={i}>
                        <td className="px-4 py-2">{i + 1}</td>
                        <td className="px-4 py-2">
                          {i === 0 ? '01 December, 2025' : i === 1 ? '01 January, 2026' : '-'}
                        </td>
                        <td className="px-4 py-2">{(selectedLoan.amount / selectedLoan.installments).toFixed(2)}</td>
                        <td className="px-4 py-2">
                          <span className="text-yellow-600 font-medium">Pending</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ====================== CREATE MODAL ====================== */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-screen overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Loan / Advanced Salary</h2>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Type <span className="text-red-500">*</span>
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500">
                    <option>Loan</option>
                    <option>Advanced Salary</option>
                    <option>Penalty / Fine</option>
                  </select>
                </div>

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

                {/* Amount */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Amount <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    placeholder="0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Description"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>

                {/* Installment Amount */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Installment Amount</label>
                  <input
                    type="number"
                    placeholder="Installment Amount"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>

                {/* Total Installments */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Total Installments <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    placeholder="Total Installments"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>

                {/* Installment start date */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Installment start date <span className="text-red-500">*</span>
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

                {/* Settled */}
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700">Settled</label>
                  <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-300">
                    <span className="translate-x-1 inline-block h-4 w-4 transform rounded-full bg-white transition"></span>
                  </button>
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