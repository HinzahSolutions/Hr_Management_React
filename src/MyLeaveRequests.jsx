'use client';

import React, { useState, useEffect } from 'react';
import {
  Search,
  Filter,
  Grid3X3,
  MoreVertical,
  Plus,
  X,
  Calendar,
  Paperclip,
  AlertCircle,
  CheckCircle,
  XCircle,
  Clock,
} from 'lucide-react';

export default function MyLeaveRequests() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedAll, setSelectedAll] = useState(false);

  // Mock leave types data
  const leaveTypes = [
    {
      code: 'SL',
      name: 'Sick Leave',
      color: 'bg-purple-600',
      available: 0.0,
      carryforward: 0.0,
      total: 0.0,
      taken: 0.0,
    },
    {
      code: 'CL',
      name: 'Casual Leave',
      color: 'bg-gray-600',
      available: 0.0,
      carryforward: 0.0,
      total: 0.0,
      taken: 0.0,
    },
    {
      code: 'ML',
      name: 'Maternity Leave',
      color: 'bg-red-600',
      available: 80.0,
      carryforward: 0.0,
      total: 80.0,
      taken: 4.0,
    },
    {
      code: 'CT',
      name: 'Compensatory Leave Type',
      color: 'bg-gray-300',
      available: 0.0,
      carryforward: 0.0,
      total: 1.0,
      taken: 1.0,
    },
    {
      code: 'CL',
      name: 'Casual Leave',
      color: 'bg-green-600',
      available: 0.0,
      carryforward: 0.0,
      total: 12.0,
      taken: 0.0,
    },
  ];

  // Requests for the current user, pulled from the shared "leaveRequests" storage.
  const [requests, setRequests] = useState([]);

  const STORAGE_KEY = 'leaveRequests';
  const CURRENT_EMPLOYEE = 'Dev Prakash';

  const loadMyRequests = () => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (!saved) return [];
      const all = JSON.parse(saved);
      return all.filter((r) => r.employee === CURRENT_EMPLOYEE);
    } catch {
      return [];
    }
  };

  useEffect(() => {
    setRequests(loadMyRequests());
    const handleUpdated = () => {
      setRequests(loadMyRequests());
    };

    window.addEventListener('leaveRequestsUpdated', handleUpdated);
    return () => {
      window.removeEventListener('leaveRequestsUpdated', handleUpdated);
    };
  }, []);

  const getIcon = (type) => {
    if (!type) return 'LT';
    const t = type.toLowerCase();
    if (t.includes('sick')) return 'SL';
    if (t.includes('maternity')) return 'ML';
    if (t.includes('casual')) return 'CL';
    if (t.includes('marriage')) return 'marriage';
    return 'LV';
  };

  const getStatusColor = (status) => {
    const s = String(status || '').toLowerCase();
    if (s === 'requested') return 'bg-yellow-100 text-yellow-800';
    if (s === 'approved') return 'bg-green-100 text-green-800';
    if (s === 'rejected') return 'bg-red-100 text-red-800';
    if (s === 'cancelled') return 'bg-gray-100 text-gray-800';
    return 'bg-gray-100 text-gray-800';
  };

  const handleCancel = (id) => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (!saved) return;
      const all = JSON.parse(saved);
      const nextAll = all.map((r) =>
        r.id === id ? { ...r, status: 'Cancelled' } : r
      );
      localStorage.setItem(STORAGE_KEY, JSON.stringify(nextAll));
      window.dispatchEvent(new Event('leaveRequestsUpdated'));
      setRequests(loadMyRequests());
    } catch {
      // ignore
    }
  };

  return (
    <>
      {/* ====================== HEADER ====================== */}
      <div className="bg-white border-b border-gray-200 px-4 sm:px-6 py-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h1 className="text-2xl font-bold text-gray-900">My Leave Requests</h1>
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
      </div>

      {/* ====================== LEAVE TYPE CARDS ====================== */}
      <div className="p-4 sm:p-6 bg-gray-50">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
          {leaveTypes.map((lt) => (
            <div
              key={lt.code + lt.name}
              className="bg-white p-4 rounded-xl shadow-sm border border-gray-200"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-12 h-12 ${lt.color} rounded-full flex items-center justify-center text-white font-bold text-lg`}
                >
                  {lt.code}
                </div>
                <div>
                  <p className="font-medium text-gray-900">{lt.name}</p>
                  <p className="text-xs text-gray-500">
                    Available Leave Days: <strong>{lt.available}</strong>
                  </p>
                  <p className="text-xs text-gray-500">
                    Carryforward Leave Days: <strong>{lt.carryforward}</strong>
                  </p>
                  <p className="text-xs text-gray-500">
                    Total Leave Days: <strong>{lt.total}</strong>
                  </p>
                  <p className="text-xs text-gray-500">
                    Total Leave taken: <strong>{lt.taken}</strong>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ====================== STATUS LEGEND ====================== */}
        <div className="flex items-center gap-6 text-sm mb-4">
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

        {/* ====================== TABLE ====================== */}
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
                  Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Comment
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Confirmation
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {requests.map((req) => {
                const icon = getIcon(req.type);
                const statusColor = getStatusColor(req.status);

                return (
                  <tr key={req.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <input type="checkbox" className="rounded border-gray-300" />
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <div className="flex items-center gap-2">
                      {icon === 'marriage' ? (
                        <div className="w-8 h-8 bg-gray-200 border-2 border-dashed rounded flex items-center justify-center">
                          <div className="text-xs">marriage</div>
                        </div>
                      ) : (
                        <div
                          className={`w-8 h-8 ${
                            icon === 'ML' ? 'bg-red-600' : icon === 'SL' ? 'bg-purple-600' : 'bg-gray-600'
                          } rounded-full flex items-center justify-center text-white text-xs font-bold`}
                        >
                          {icon}
                        </div>
                      )}
                      <span className="font-medium">{req.type}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">{req.start}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{req.end}</td>
                  <td className="px-4 py-3 text-sm font-medium">{req.days}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${statusColor}`}
                    >
                      {req.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    {/* Simple rule: show comment icon for non-approved statuses */}
                    {String(req.status || '').toLowerCase() !== 'approved' && (
                      <AlertCircle className="h-4 w-4 text-orange-500" />
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => handleCancel(req.id)}
                      className="px-3 py-1 bg-gray-600 text-white rounded text-xs hover:bg-gray-700"
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* ====================== CREATE MODAL ====================== */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-md">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-screen overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Create Leave Request</h2>
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
                    Leave Type <span className="text-red-500">*</span>
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500">
                    <option>-- Choose Leave Type --</option>
                    <option>Sick Leave</option>
                    <option>Casual Leave</option>
                    <option>Maternity Leave</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Start Date <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value="12 / 11 / 2025"
                      readOnly
                      className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg bg-gray-50"
                    />
                    <Calendar className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Start Date Breakdown <span className="text-red-500">*</span>
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500">
                    <option>Full Day</option>
                    <option>Half Day</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                  <div className="relative">
                    <input
                      type="text"
                      value="12 / 11 / 2025"
                      readOnly
                      className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg bg-gray-50"
                    />
                    <Calendar className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    End Date Breakdown <span className="text-red-500">*</span>
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500">
                    <option>Full Day</option>
                    <option>Half Day</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Attachment</label>
                  <label className="flex items-center justify-center px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 cursor-pointer hover:bg-gray-100">
                    <Paperclip className="h-4 w-4 text-gray-400 mr-2" />
                    <span className="text-sm text-gray-500">Browse... No file selected.</span>
                    <input type="file" className="hidden" />
                  </label>
                </div>
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

      {/* ====================== FAB ====================== */}
      <button className="fixed bottom-6 right-6 w-14 h-14 bg-red-600 text-white rounded-full shadow-lg hover:bg-red-700 flex items-center justify-center z-50">
        <Plus className="h-6 w-6" />
      </button>
    </>
  );
}