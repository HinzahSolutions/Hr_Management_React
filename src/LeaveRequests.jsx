'use client';

import React, { useState } from 'react';
import {
  Search,
  Filter,
  Grid3X3,
  MoreVertical,
  Plus,
  X,
  Calendar,
  Paperclip,
  ChevronLeft,
  ChevronRight,
  Check,
  XCircle,
  AlertCircle,
  Info,
  User,
} from 'lucide-react';

export default function LeaveRequests() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAll, setSelectedAll] = useState(false);

  // Mock data
  const requests = [
    {
      id: 1,
      employee: 'Dev Prakash (PEP00)',
      avatar: 'DP',
      type: 'marriage leave',
      start: '26 November, 2025',
      end: '26 November, 2025',
      days: 1.0,
      status: 'Requested',
      statusColor: 'bg-yellow-100 text-yellow-800',
      confirmButtons: ['Approved', 'Rejected'],
    },
    {
      id: 2,
      employee: 'Dev Prakash (PEP00)',
      avatar: 'DP',
      type: 'Maternity Leave',
      start: '15 November, 2025',
      end: '15 November, 2025',
      days: 1.0,
      status: 'Approved',
      statusColor: 'bg-green-100 text-green-800',
      confirmButtons: ['Approved', 'Rejected'],
    },
    {
      id: 3,
      employee: 'Dev Prakash (PEP00)',
      avatar: 'DP',
      type: 'Maternity Leave',
      start: '12 November, 2025',
      end: '12 November, 2025',
      days: 1.0,
      status: 'Approved',
      statusColor: 'bg-green-100 text-green-800',
      confirmButtons: ['Approved', 'Rejected'],
      hasWarning: true,
    },
    {
      id: 4,
      employee: 'Dev Prakash (PEP00)',
      avatar: 'DP',
      type: 'Sick Leave',
      start: '26 December, 2025',
      end: '26 December, 2025',
      days: 1.0,
      status: 'Cancelled',
      statusColor: 'bg-gray-100 text-gray-800',
      confirmButtons: ['Requested'],
    },
    {
      id: 5,
      employee: 'Dev Prakash (PEP00)',
      avatar: 'DP',
      type: 'Sick Leave',
      start: '30 December, 2025',
      end: '30 December, 2025',
      days: 1.0,
      status: 'Requested',
      statusColor: 'bg-yellow-100 text-yellow-800',
      confirmButtons: ['Approved', 'Rejected'],
    },
    {
      id: 6,
      employee: 'Dev Prakash (PEP00)',
      avatar: 'DP',
      type: 'Sick Leave',
      start: '30 November, 2025',
      end: '30 November, 2025',
      days: 0.0,
      status: 'Requested',
      statusColor: 'bg-yellow-100 text-yellow-800',
      confirmButtons: ['Approved', 'Rejected'],
    },
    {
      id: 7,
      employee: 'Liam Bennett',
      avatar: 'LB',
      type: 'Casual Leave',
      start: '07 November, 2025',
      end: '07 November, 2025',
      days: 1.0,
      status: 'Requested',
      statusColor: 'bg-yellow-100 text-yellow-800',
      confirmButtons: ['Approved', 'Rejected'],
    },
    {
      id: 8,
      employee: 'Dev Prakash (PEP00)',
      avatar: 'DP',
      type: 'Maternity Leave',
      start: '25 November, 2025',
      end: '25 November, 2025',
      days: 1.0,
      status: 'Requested',
      statusColor: 'bg-yellow-100 text-yellow-800',
      confirmButtons: ['Approved', 'Rejected'],
    },
    {
      id: 9,
      employee: 'Dev Prakash (PEP00)',
      avatar: 'DP',
      type: 'Maternity Leave',
      start: '15 November, 2025',
      end: '15 November, 2025',
      days: 1.0,
      status: 'Rejected',
      statusColor: 'bg-red-100 text-red-800',
      confirmButtons: ['Approved', 'Rejected'],
    },
  ];

  const openDetails = (req, index) => {
    setSelectedRequest(req);
    setCurrentIndex(index);
    setShowDetailsModal(true);
  };

  const navigate = (direction) => {
    const newIndex = direction === 'prev' ? currentIndex - 1 : currentIndex + 1;
    if (newIndex >= 0 && newIndex < requests.length) {
      setCurrentIndex(newIndex);
      setSelectedRequest(requests[newIndex]);
    }
  };

  return (
    <>
      {/* ====================== HEADER ====================== */}
      <div className="bg-white border-b border-gray-200 px-4 sm:px-6 py-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h1 className="text-2xl font-bold text-gray-900">Leave Requests</h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Search className="h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search"
                className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm w-48 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
            <button className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm flex items-center gap-2 hover:bg-gray-50">
              <Filter className="h-4 w-4" /> Filter
            </button>
            <button className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm flex items-center gap-2 hover:bg-gray-50">
              <Grid3X3 className="h-4 w-4" /> Group By
            </button>
            <button className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm flex items-center gap-2 hover:bg-gray-50">
              <MoreVertical className="h-4 w-4" /> Actions
            </button>
            <button
              onClick={() => setShowCreateModal(true)}
              className="px-4 py-1.5 bg-red-600 text-white rounded-lg text-sm flex items-center gap-2 hover:bg-red-700"
            >
              <Plus className="h-4 w-4" /> Create
            </button>
          </div>
        </div>

        {/* Status Legend */}
        <div className="flex items-center gap-6 text-sm mt-4">
          <span className="flex items-center gap-2">
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            Requested
          </span>
          <span className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            Approved
          </span>
          <span className="flex items-center gap-2">
            <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
            Cancelled
          </span>
          <span className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            Rejected
          </span>
        </div>
      </div>

      {/* ====================== TABLE ====================== */}
      <div className="p-4 sm:p-6 bg-gray-50">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-200">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={selectedAll}
                onChange={(e) => setSelectedAll(e.target.checked)}
                className="rounded border-gray-300"
              />
              <span className="text-green-600 font-medium">Select All Requests</span>
            </label>
          </div>

          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <input type="checkbox" className="rounded border-gray-300" />
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Employee
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Leave Type
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Start Date
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  End Date
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Requested Days
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Confirmation
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {requests.map((req, idx) => (
                <tr key={req.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <input type="checkbox" className="rounded border-gray-300" />
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <button
                      onClick={() => openDetails(req, idx)}
                      className="flex items-center gap-2 hover:underline"
                    >
                      <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-xs font-bold text-gray-700">
                        {req.avatar}
                      </div>
                      <span className="font-medium">{req.employee}</span>
                      {req.hasWarning && <AlertCircle className="h-4 w-4 text-orange-500" />}
                    </button>
                  </td>
                  <td className="px-4 py-3 text-sm font-medium">{req.type}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{req.start}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{req.end}</td>
                  <td className="px-4 py-3 text-sm font-medium">{req.days}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1">
                      {req.confirmButtons.includes('Approved') && (
                        <button className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs flex items-center gap-1">
                          <Check className="h-3 w-3" /> Approved
                        </button>
                      )}
                      {req.confirmButtons.includes('Rejected') && (
                        <button className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs flex items-center gap-1">
                          <XCircle className="h-3 w-3" /> Rejected
                        </button>
                      )}
                      {req.confirmButtons.includes('Requested') && (
                        <button className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded text-xs">
                          Requested
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200 text-sm text-gray-600">
            <span>Page 1 of 2.</span>
            <div className="flex items-center gap-2">
              <span>Page</span>
              <div className="flex items-center border border-gray-300 rounded">
                <button className="px-2 py-1 hover:bg-gray-50">
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <input
                  type="number"
                  value={1}
                  readOnly
                  className="w-12 px-2 py-1 text-center border-x border-gray-300"
                />
                <span className="px-2 py-1 bg-gray-100">of 2</span>
                <button className="px-2 py-1 hover:bg-gray-50">
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
              <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50">Next</button>
              <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50">Last</button>
            </div>
          </div>
        </div>
      </div>

      {/* ====================== CREATE MODAL ====================== */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-screen overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Leave Request</h2>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Employee <span className="text-red-500">*</span>
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500">
                    <option>Dev Prakash (PEP00)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Leave Type <span className="text-red-500">*</span>
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500">
                    <option>-- Choose Leave Type --</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Start Date <span className="text-red-500">*</span>
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Start Date Breakdown <span className="text-red-500">*</span>
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500">
                    <option>Full Day</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    End Date Breakdown <span className="text-red-500">*</span>
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500">
                    <option>Full Day</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Attachment</label>
                <label className="flex items-center justify-center px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 cursor-pointer hover:bg-gray-100">
                  <Paperclip className="h-4 w-4 text-gray-400 mr-2" />
                  <span className="text-sm text-gray-500">Browse... No file selected.</span>
                  <input type="file" className="hidden" />
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={3}
                  placeholder="Description"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                ></textarea>
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

      {/* ====================== DETAILS MODAL WITH ARROWS ====================== */}
      {showDetailsModal && selectedRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-screen overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Details</h2>
              <button
                onClick={() => setShowDetailsModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center text-xl font-bold text-gray-700">
                  {selectedRequest.avatar}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{selectedRequest.employee}</h3>
                  <p className="text-sm text-gray-600">Hr Dept / Recruiter – (Hr Dept)</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm font-medium text-gray-700">Leave Type</p>
                  <p className="text-sm text-gray-900">{selectedRequest.type}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Days</p>
                  <p className="text-sm text-gray-900">{selectedRequest.days}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Start Date</p>
                  <p className="text-sm text-gray-900">{selectedRequest.start}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Start Date Breakdown</p>
                  <p className="text-sm text-gray-900">Full Day</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">End Date</p>
                  <p className="text-sm text-gray-900">{selectedRequest.end}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">End Date Breakdown</p>
                  <p className="text-sm text-gray-900">Full Day</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Created Date</p>
                  <p className="text-sm text-gray-900">07 November, 2025</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Created By</p>
                  <p className="text-sm text-gray-900">None</p>
                </div>
              </div>

              <div className="mt-6">
                <p className="text-sm font-medium text-gray-700 mb-1">Leave Description</p>
                <p className="text-sm text-gray-900 bg-gray-50 p-3 rounded">kkkkk</p>
              </div>

              {selectedRequest.status === 'Rejected' && (
                <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded">
                  <p className="text-sm font-medium text-red-800">Reason for Rejection</p>
                  <p className="text-sm text-red-700">Not approved</p>
                </div>
              )}

              <div className="mt-6">
                <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm flex items-center gap-2 hover:bg-gray-50">
                  <Paperclip className="h-4 w-4" /> View attachment
                </button>
              </div>

              <div className="mt-6 flex justify-center gap-2">
                <button
                  onClick={() => navigate('prev')}
                  disabled={currentIndex === 0}
                  className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={() => navigate('next')}
                  disabled={currentIndex === requests.length - 1}
                  className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
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