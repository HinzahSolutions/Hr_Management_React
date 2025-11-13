'use client';

import React, { useState } from 'react';
import {
  Search,
  Filter,
  ChevronDown,
  Plus,
  Upload,
  CheckCircle,
  XCircle,
  Trash2,
  Square,
  AlertCircle,
} from 'lucide-react';

const documentGroups = [
  {
    id: 1,
    name: 'Software test engineer',
    progress: '0/1',
    isOpen: true,
    requests: [
      {
        id: 1,
        title: 'Upload Software test engineer -- KALYANI Nishank',
        comment: 'nothing',
        status: 'pending',
      },
    ],
  },
  {
    id: 2,
    name: 'PAN CARD',
    progress: '0/1',
    isOpen: false,
    requests: [],
  },
  {
    id: 3,
    name: 'VOTER ID',
    progress: '0/2',
    isOpen: true,
    requests: [
      {
        id: 2,
        title: 'Upload VOTER ID -- Ella Jackson',
        comment: '',
        status: 'pending',
      },
      {
        id: 3,
        title: 'Upload VOTER ID -- Amelia Cooper',
        comment: '',
        status: 'pending',
      },
    ],
  },
  {
    id: 4,
    name: 'Visa Card',
    progress: '0/4',
    isOpen: false,
    requests: [],
  },
  {
    id: 5,
    name: 'Passport',
    progress: '1/9',
    isOpen: false,
    requests: [],
  },
];

export default function DocumentRequests() {
  const [groups, setGroups] = useState(documentGroups);

  const toggleGroup = (id) => {
    setGroups((prev) =>
      prev.map((g) => (g.id === id ? { ...g, isOpen: !g.isOpen } : g))
    );
  };

  return (
    <>
      {/* ====================== PAGE HEADER (No Sidebar) ====================== */}
      <div className="bg-white border-b border-gray-200 px-4 sm:px-6 py-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-2xl font-bold text-gray-900">Document Requests</h1>
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
              Actions <ChevronDown className="h-4 w-4" />
            </button>
            <button className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm flex items-center gap-2 hover:bg-red-700">
              + Create
            </button>
          </div>
        </div>
      </div>

      {/* ====================== CONTENT ====================== */}
      <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">
        <div className="max-w-5xl mx-auto space-y-6">

          {groups.map((group) => (
            <div key={group.id} className="bg-white rounded-lg shadow-sm">
              {/* Group Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => toggleGroup(group.id)}
                    className="p-1 hover:bg-gray-100 rounded"
                  >
                    <ChevronDown
                      className={`h-5 w-5 text-gray-600 transition-transform ${
                        group.isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                  />
                  <span className="font-medium text-gray-900">{group.name}</span>
                  <span className="px-2 py-0.5 bg-red-100 text-red-700 rounded-full text-xs font-medium">
                    {group.progress}
                  </span>
                </div>
                <button className="px-3 py-1.5 border border-gray-300 rounded-lg text-xs flex items-center gap-1 hover:bg-gray-50">
                  Actions <ChevronDown className="h-3 w-3" />
                </button>
              </div>

              {/* Group Content */}
              {group.isOpen && group.requests.length > 0 && (
                <div className="p-4 space-y-4">
                  {group.requests.map((req) => (
                    <div
                      key={req.id}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200"
                    >
                      <div className="flex items-center gap-3 flex-1">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center">
                            <Plus className="h-4 w-4 text-white" />
                          </div>
                          <AlertCircle className="h-5 w-5 text-red-500" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{req.title}</div>
                          {req.comment && (
                            <div className="text-xs text-gray-500 mt-1">{req.comment}</div>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="p-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200">
                          <CheckCircle className="h-4 w-4" />
                        </button>
                        <button className="p-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200">
                          <XCircle className="h-4 w-4" />
                        </button>
                        <button className="p-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Empty State */}
              {group.isOpen && group.requests.length === 0 && (
                <div className="p-8 text-center text-gray-500">
                  No document requests in this category.
                </div>
              )}
            </div>
          ))}

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