'use client';

import React, { useState } from 'react';
import {
  Search,
  Filter,
  ChevronDown,
  Plus,
  Copy,
  Eye,
  Edit2,
  Trash2,
  MoreVertical,
  Calendar,
  X,
  Check,
  Mail,
  UserCheck,
  Clock,
  AlertCircle,
  FileText,
  Download,
  Send,
} from 'lucide-react';

const candidatesData = [
  {
    id: 1,
    name: 'Amelia Hayes',
    initials: 'AH',
    email: 'amelia.ha...',
    joining: '08 / 11 / 2025',
    probation: '08 / 01 / 2026',
    position: 'Odoo Dev - (S/W Dept)',
    recruitment: 'Recruitment Drive',
    offerStatus: 'Accepted',
    portalStatus: 'Portal Sent',
  },
  {
    id: 2,
    name: 'Lucas Rogers',
    initials: 'LR',
    email: 'lucas.rog...',
    joining: 'dd / mm / yyyy',
    probation: 'dd / mm / yyyy',
    position: 'Sales Man - (Sales Dept)',
    recruitment: 'FutureForce Recruitment',
    offerStatus: 'Not Sent',
    portalStatus: 'Portal Not-Sent',
    actionLabel: 'Send Portal / Start Onboarding',
  },
  {
    id: 3,
    name: 'KALYANI',
    initials: 'KA',
    email: 'kalyani.i...',
    joining: 'dd / mm / yyyy',
    probation: 'dd / mm / yyyy',
    position: 'Odoo Dev - (S/W Dept)',
    recruitment: 'New Title up',
    offerStatus: 'Accepted',
    portalStatus: 'Joining Not-Set',
  },
  {
    id: 4,
    name: 'Mahesh',
    initials: 'USB',
    email: 'bmahesh12...',
    joining: '11 / 11 / 2025',
    probation: '12 / 02 / 2026',
    position: 'Django Dev - (S/W Dept)',
    recruitment: 'python',
    offerStatus: 'Not Sent',
    portalStatus: 'Joining Set',
  },
  {
    id: 5,
    name: 'Max Mustermann',
    initials: 'Apple',
    email: 'DerEchteM...',
    joining: 'dd / mm / yyyy',
    probation: 'dd / mm / yyyy',
    position: 'Django Dev - (S/W Dept)',
    recruitment: 'Recruitment Drive',
    offerStatus: 'Not Sent',
    portalStatus: 'Portal Sent',
  },
  {
    id: 6,
    name: 'Ravi',
    initials: 'R',
    email: 'kvedium5@...',
    joining: '31 / 10 / 2025',
    probation: '30 / 11 / 2025',
    position: 'Odoo Dev - (S/W Dept)',
    recruitment: 'Recruitment Drive',
    offerStatus: 'Sent',
    portalStatus: 'Joining Set',
  },
  {
    id: 7,
    name: 'Liam Bennett',
    initials: 'LB',
    email: 'liam.benn...',
    joining: 'dd / mm / yyyy',
    probation: 'dd / mm / yyyy',
    position: 'Odoo Dev - (S/W Dept)',
    recruitment: 'Recruitment Drive',
    offerStatus: 'Not Sent',
    portalStatus: 'Joining Not-Set',
  },
  {
    id: 8,
    name: 'Emily Turner',
    initials: 'ET',
    email: 'emily.tur...',
    joining: '15 / 07 / 2025',
    probation: 'dd / mm / yyyy',
    position: 'Odoo Dev - (S/W Dept)',
    recruitment: 'Recruitment Drive',
    offerStatus: 'Rejected',
    portalStatus: 'Joining Set',
  },
];

export default function CandidatesView() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedAll, setSelectedAll] = useState(false);
  const [selectedRows, setSelectedRows] = useState({});

  const handleSelectAll = () => {
    const newSel = {};
    candidatesData.forEach((_, i) => (newSel[i] = !selectedAll));
    setSelectedRows(newSel);
    setSelectedAll(!selectedAll);
  };

  const handleSelectRow = (i) => {
    const newSel = { ...selectedRows, [i]: !selectedRows[i] };
    setSelectedRows(newSel);
    setSelectedAll(Object.values(newSel).every((v) => v) && Object.keys(newSel).length === candidatesData.length);
  };

  const getInitials = (name) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getPortalStatusColor = (status) => {
    switch (status) {
      case 'Portal Sent': return 'bg-green-100 text-green-800';
      case 'Portal Not-Sent': return 'bg-yellow-100 text-yellow-800';
      case 'Joining Not-Set': return 'bg-orange-100 text-orange-800';
      case 'Joining Set': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getOfferStatusColor = (status) => {
    switch (status) {
      case 'Accepted': return 'bg-green-100 text-green-800';
      case 'Not Sent': return 'bg-gray-100 text-gray-800';
      case 'Sent': return 'bg-blue-100 text-blue-800';
      case 'Rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <>
      {/* ====================== PAGE HEADER ====================== */}
      <div className="bg-white border-b border-gray-200 px-4 sm:px-6 py-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-2xl font-bold text-gray-900">Hired Candidates</h1>
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search"
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500 w-full sm:w-64"
              />
            </div>
            <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm flex items-center gap-2 hover:bg-gray-50">
              <Filter className="h-4 w-4" /> Filter
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm flex items-center gap-2 hover:bg-gray-50">
              Group By <ChevronDown className="h-4 w-4" />
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm flex items-center gap-2 hover:bg-gray-50">
              Actions <ChevronDown className="h-4 w-4" />
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm flex items-center gap-2 hover:bg-blue-700">
              <Send className="h-4 w-4" /> Send Portal
            </button>
            <button
              onClick={() => setShowCreateModal(true)}
              className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm flex items-center gap-2 hover:bg-red-700"
            >
              + Create
            </button>
          </div>
        </div>

        {/* Filter Badges */}
        <div className="flex flex-wrap gap-2 mt-3">
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
            <div className="w-2 h-2 bg-green-600 rounded-full"></div> Portal Sent
          </span>
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full">
            <div className="w-2 h-2 bg-yellow-600 rounded-full"></div> Portal Not-Sent
          </span>
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-orange-100 text-orange-800 text-xs font-medium rounded-full">
            <div className="w-2 h-2 bg-orange-600 rounded-full"></div> Joining Not-Set
          </span>
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
            <div className="w-2 h-2 bg-blue-600 rounded-full"></div> Joining Set
          </span>
        </div>
      </div>

      {/* ====================== CONTENT ====================== */}
      <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto">
          {/* Select All */}
          <div className="mb-4">
            <button
              onClick={handleSelectAll}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                selectedAll
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {selectedAll ? 'Deselect All Candidates' : 'Select All Candidates'}
            </button>
          </div>

          {/* Table */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-max">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-4 py-3 text-left">
                      <input
                        type="checkbox"
                        checked={selectedAll}
                        onChange={handleSelectAll}
                        className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                      />
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Candidate</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Email</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Date of joining</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Probation ends</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Job position</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Recruitment</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Offer letter</th>
                    <th className="sticky right-0 bg-gray-50 px-4 py-3 text-left text-sm font-medium text-gray-700 border-l border-gray-200">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {candidatesData.map((row, i) => (
                    <tr key={row.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <input
                          type="checkbox"
                          checked={selectedRows[i] || false}
                          onChange={() => handleSelectRow(i)}
                          className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium text-white ${
                              row.initials === 'Apple'
                                ? 'bg-red-500'
                                : row.initials === 'USB'
                                ? 'bg-gray-600'
                                : 'bg-gradient-to-br from-blue-400 to-blue-600'
                            }`}
                          >
                            {row.initials}
                          </div>
                          <span className="text-sm font-medium text-gray-900">{row.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700">{row.email}</td>
                      <td className="px-4 py-3 text-sm text-gray-700">
                        <div className="flex items-center gap-1">
                          {row.joining}
                          {row.joining.includes('dd') && <Calendar className="h-3 w-3 text-gray-400" />}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700">
                        <div className="flex items-center gap-1">
                          {row.probation}
                          {row.probation.includes('dd') && <Calendar className="h-3 w-3 text-gray-400" />}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700">{row.position}</td>
                      <td className="px-4 py-3 text-sm text-gray-700">{row.recruitment}</td>
                      <td className="px-4 py-3">
                        {row.actionLabel ? (
                          <button className="px-3 py-1 text-xs font-medium bg-black text-white rounded hover:bg-gray-800">
                            {row.actionLabel}
                          </button>
                        ) : (
                          <select
                            defaultValue={row.offerStatus}
                            className={`px-2 py-1 text-xs font-medium rounded ${getOfferStatusColor(row.offerStatus)} border-0 focus:ring-2 focus:ring-red-500`}
                          >
                            <option>Accepted</option>
                            <option>Not Sent</option>
                            <option>Sent</option>
                            <option>Rejected</option>
                          </select>
                        )}
                      </td>
                      <td className="sticky right-0 bg-white px-4 py-3 border-l border-gray-200">
                        <div className="flex items-center gap-1">
                          <button className="p-1.5 hover:bg-gray-100 rounded">
                            <Copy className="h-4 w-4 text-gray-600" />
                          </button>
                          <button className="p-1.5 hover:bg-gray-100 rounded">
                            <Eye className="h-4 w-4 text-gray-600" />
                          </button>
                          <button className="p-1.5 hover:bg-gray-100 rounded">
                            <Edit2 className="h-4 w-4 text-gray-600" />
                          </button>
                          <button className="p-1.5 hover:bg-gray-100 rounded">
                            <FileText className="h-4 w-4 text-gray-600" />
                          </button>
                          <button className="p-1.5 hover:bg-gray-100 rounded">
                            <Download className="h-4 w-4 text-gray-600" />
                          </button>
                          <button className="p-1.5 hover:bg-gray-100 rounded">
                            <Trash2 className="h-4 w-4 text-red-600" />
                          </button>
                          <button className="text-gray-400 hover:text-gray-600">
                            <MoreVertical className="h-5 w-5" />
                          </button>
                        </div>
                        {/* Progress Bar */}
                        <div className="mt-2 flex gap-1">
                          <div className={`h-1 flex-1 rounded-full ${row.offerStatus === 'Rejected' ? 'bg-red-500' : 'bg-gray-300'}`}></div>
                          <div className={`h-1 flex-1 rounded-full ${row.offerStatus === 'Sent' || row.offerStatus === 'Accepted' ? 'bg-orange-500' : 'bg-gray-300'}`}></div>
                          <div className={`h-1 flex-1 rounded-full ${row.portalStatus.includes('Sent') || row.portalStatus.includes('Set') ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* ====================== CREATE CANDIDATE MODAL ====================== */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-screen overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">Create Candidate</h2>
              <button
                onClick={() => setShowCreateModal(false)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>

            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-4">
                <div className="flex justify-center">
                  <div className="w-24 h-24 bg-yellow-500 rounded-full flex items-center justify-center text-3xl font-bold text-gray-900">
                    NO
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Recruitment <span className="text-red-600">*</span>
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500">
                    <option>-- Choose Recruitment --</option>
                    <option>Recruitment Drive</option>
                    <option>FutureForce Recruitment</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="13 / 11 / 2025"
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                  <textarea
                    rows={2}
                    placeholder="Address"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500">
                    <option>Select Country</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Zip Code</label>
                  <input
                    type="text"
                    placeholder="Zip Code"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Portfolio</label>
                  <input
                    type="text"
                    placeholder="Portfolio"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Mobile</label>
                  <input
                    type="text"
                    placeholder="Mobile"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Job Position</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500">
                    <option>-- Choose Job Position --</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Gender <span className="text-red-600">*</span>
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500">
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Source</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500">
                    <option>Inside software</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500">
                    <option>Select State</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Resume</label>
                  <input
                    type="file"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500 file:mr-4 file:py-1 file:px-3 file:rounded file:border-0 file:text-sm file:font-medium file:bg-red-50 file:text-red-700 hover:file:bg-red-100"
                  />
                </div>
              </div>
            </div>

            <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4 flex justify-end gap-2">
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