
import React, { useState } from 'react';
import {
  Search,
  Filter,
  ChevronDown,
  Plus,
  CheckCircle,
  XCircle,
  Copy,
  Edit2,
  Trash2,
  MoreVertical,
} from 'lucide-react';

const workTypeRequests = [
  {
    id: 1,
    employee: 'ARJIT Chaudhary (arj19800-)',
    requestedWorkType: 'Remote',
    previousCurrent: 'None',
    requestedDate: '12 November, 2025',
    requestedTill: '13 November, 2025',
    status: 'Requested',
    description: 'test',
  },
  {
    id: 2,
    employee: 'Vandita Sharma (PEP00)',
    requestedWorkType: 'Work From Home',
    previousCurrent: 'Work From Home',
    requestedDate: '11 November, 2025',
    requestedTill: 'None',
    status: 'Approved',
    description: 'Medical Emergency',
  },
  {
    id: 3,
    employee: 'ARJIT Chaudhary (arj19800-)',
    requestedWorkType: 'Work From Home',
    previousCurrent: 'None',
    requestedDate: '10 December, 2025',
    requestedTill: 'None',
    status: 'Rejected',
    description: 'Engineer',
  },
  {
    id: 4,
    employee: 'David King (PEP10)',
    requestedWorkType: 'Work From Office',
    previousCurrent: 'None',
    requestedDate: '10 November, 2025',
    requestedTill: '10 November, 2025',
    status: 'Requested',
    description: 'WFO request',
  },
  {
    id: 5,
    employee: 'Zohir Djenden (PEP3658)',
    requestedWorkType: 'Work From Office',
    previousCurrent: 'Work From Office',
    requestedDate: '10 November, 2025',
    requestedTill: 'None',
    status: 'Approved',
    description: 'asd',
  },
  {
    id: 6,
    employee: 'ARYAN AWATHI (ANN123)',
    requestedWorkType: 'Work From Home',
    previousCurrent: 'None',
    requestedDate: '07 November, 2025',
    requestedTill: 'None',
    status: 'Rejected',
    description: 'ghjkl;',
  },
  {
    id: 7,
    employee: 'nishanthini R (NR310)',
    requestedWorkType: 'Work From Home',
    previousCurrent: 'None',
    requestedDate: '03 November, 2025',
    requestedTill: '03 November, 2025',
    status: 'Approved',
    description: 'WORK FROM HOME',
  },
  {
    id: 8,
    employee: 'Madison Kelly (PEP35)',
    requestedWorkType: 'Work From Home',
    previousCurrent: 'None',
    requestedDate: '04 July, 2025',
    requestedTill: '15 July, 2025',
    status: 'Approved',
    description: 'requesting for work from...',
  },
];

export default function WorkTypeRequests() {
  const [selectedAll, setSelectedAll] = useState(false);
  const [selectedRows, setSelectedRows] = useState({});

  const handleSelectAll = () => {
    const newSelected = {};
    workTypeRequests.forEach((_, i) => (newSelected[i] = !selectedAll));
    setSelectedRows(newSelected);
    setSelectedAll(!selectedAll);
  };

  const handleSelectRow = (index) => {
    const newSelected = { ...selectedRows, [index]: !selectedRows[index] };
    setSelectedRows(newSelected);
    setSelectedAll(Object.values(newSelected).every(v => v));
  };

  const getStatusColor = (status) => {
    if (status === 'Approved') return 'text-green-700 bg-green-100';
    if (status === 'Rejected') return 'text-red-700 bg-red-100';
    return 'text-yellow-700 bg-yellow-100';
  };

  return (
    <>
      {/* ====================== PAGE HEADER ====================== */}
 
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-2xl font-bold text-gray-900">Work Type Requests</h1>
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
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
              <MoreVertical className="h-4 w-4" /> Group By
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm flex items-center gap-2 hover:bg-gray-50">
              Actions <ChevronDown className="h-4 w-4" />
            </button>
            <button className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm flex items-center gap-2 hover:bg-red-700">
              + Create
            </button>
          </div>
        </div>
      

      {/* ====================== CONTENT ====================== */}
      <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">
        <div className="max-w-5xl mx-auto">

          {/* Select All + Legend */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <button
              onClick={handleSelectAll}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                selectedAll
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {selectedAll ? 'Deselect All Worktypes' : 'Select All Worktypes'}
            </button>
            <div className="flex items-center gap-4 text-sm">
              <span className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500"></div> Approved
              </span>
              <span className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div> Rejected
              </span>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
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
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Employee</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Requested Work Type</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Previous/Current Work Type</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Requested Date</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Requested Till</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Status</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Description</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Comment</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Actions</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Confirmation</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {workTypeRequests.map((req, index) => (
                    <tr key={req.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <input
                          type="checkbox"
                          checked={selectedRows[index] || false}
                          onChange={() => handleSelectRow(index)}
                          className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <div className="text-sm font-medium text-gray-900">{req.employee}</div>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700">{req.requestedWorkType}</td>
                      <td className="px-4 py-3 text-sm text-gray-700">{req.previousCurrent}</td>
                      <td className="px-4 py-3 text-sm text-gray-700">{req.requestedDate}</td>
                      <td className="px-4 py-3 text-sm text-gray-700">{req.requestedTill}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(req.status)}`}>
                          {req.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700">{req.description}</td>
                      <td className="px-4 py-3 text-center">
                        {/* <button className="text-gray-500 hover:text-gray-700">
                          <FileText className="h-4 w-4" />
                        </button> */}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1">
                          <button className="p-1.5 hover:bg-gray-100 rounded">
                            <Copy className="h-4 w-4 text-gray-600" />
                          </button>
                          <button className="p-1.5 hover:bg-gray-100 rounded">
                            <Edit2 className="h-4 w-4 text-gray-600" />
                          </button>
                          <button className="p-1.5 hover:bg-gray-100 rounded">
                            <Trash2 className="h-4 w-4 text-red-600" />
                          </button>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <button className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1 ${
                            req.status === 'Approved' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                          }`}>
                            <CheckCircle className="h-3 w-3" /> Approved
                          </button>
                          <button className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1 ${
                            req.status === 'Rejected' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'
                          }`}>
                            <XCircle className="h-3 w-3" /> Rejected
                          </button>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <button className="p-1.5 hover:bg-gray-100 rounded">
                          <MoreVertical className="h-4 w-4 text-gray-600" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-6 text-sm text-gray-600">
            <span>Page 1 of 1.</span>
            <div className="flex items-center gap-2">
              <span>Page</span>
              <div className="flex items-center border border-gray-300 rounded">
                <button className="px-2 py-1 hover:bg-gray-50">1</button>
                <span className="px-2 py-1 bg-gray-100">of 1</span>
              </div>
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