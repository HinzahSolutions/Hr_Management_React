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
  Star,
  CheckCircle,
} from 'lucide-react';

// Sample data based on your screenshots
const recruitmentData = {
  'Recruitment Drive': {
    stages: [
      {
        name: 'Applied',
        count: 1,
        candidates: [
          {
            id: 1,
            name: 'Lalitha',
            email: 'lalithavi...',
            position: 'Odoo Dev - (S/W Dept)',
            contact: '6380924041',
            interviews: 'Scheduled: 0',
            rating: 5,
          },
        ],
      },
      {
        name: 'Resume view',
        count: 7,
        candidates: [],
      },
    ],
  },
  'FutureForce Recruitment': {
    stages: [
      {
        name: 'Applied',
        count: 0,
        candidates: [],
      },
      {
        name: 'Hired',
        count: 1,
        candidates: [
          {
            id: 2,
            name: 'Lucas Rogers',
            initials: 'LR',
            email: 'lucas.rog...',
            position: 'Sales Man - (Sales D...)',
            contact: '9876540107',
            interviews: 'Scheduled: 0',
            rating: 4,
          },
        ],
      },
    ],
  },
  'mobile developer': {
    stages: [
      {
        name: 'Applied',
        count: 1,
        candidates: [
          {
            id: 3,
            name: 'Ganesh Alapakam',
            email: 'alapakamg...',
            position: 'Django Dev - (S/W De...)',
            contact: '+916305979503',
            interviews: 'Scheduled: 0',
            rating: 3,
          },
        ],
      },
      {
        name: 'Initial',
        count: 0,
        candidates: [],
      },
    ],
  },
  'New Title up': {
    stages: [
      {
        name: 'Applied',
        count: 0,
        candidates: [],
      },
      {
        name: 'Initial',
        count: 2,
        candidates: [
          {
            id: 4,
            name: 'Maxi Musterfrau',
            email: 'maximuste...',
            position: 'Odoo Dev - (S/W Dept)',
            contact: '1899756342',
            interviews: 'Scheduled: 1',
            rating: 4,
          },
          {
            id: 5,
            name: 'Maxis Musterfrau',
            email: 'maxismust...',
            position: 'Odoo Dev - (S/W Dept)',
            contact: '1899756342',
            interviews: 'Scheduled: 0',
            rating: 3,
          },
        ],
      },
    ],
  },
};

export default function Recruitments() {
  const [selectedRecruitment, setSelectedRecruitment] = useState('Recruitment Drive');
  const [selectedAll, setSelectedAll] = useState(false);
  const [selectedRows, setSelectedRows] = useState({});

  const currentData = recruitmentData[selectedRecruitment] || { stages: [] };

  const handleSelectAll = () => {
    const newSel = {};
    currentData.stages.forEach((stage) =>
      stage.candidates.forEach((_, i) => (newSel[`${stage.name}-${i}`] = !selectedAll))
    );
    setSelectedRows(newSel);
    setSelectedAll(!selectedAll);
  };

  const handleSelectRow = (stageName, i) => {
    const key = `${stageName}-${i}`;
    const newSel = { ...selectedRows, [key]: !selectedRows[key] };
    setSelectedRows(newSel);
    setSelectedAll(Object.values(newSel).every((v) => v) && Object.keys(newSel).length === getTotalCandidates());
  };

  const getTotalCandidates = () => {
    return currentData.stages.reduce((acc, stage) => acc + stage.candidates.length, 0);
  };

  const getAvatarInitials = (name) => {
    return name
      .split(' ')
      .filter((n) => n.match(/[A-Za-z]/))
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-3 w-3 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <>
      {/* ====================== PAGE HEADER ====================== */}
      <div className="bg-white border-b border-gray-200 px-4 sm:px-6 py-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-2xl font-bold text-gray-900">Recruitments</h1>
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
            <div className="flex items-center gap-1 px-3 py-1.5 bg-orange-50 border border-orange-200 rounded-full text-xs font-medium text-orange-700">
              <span>Closed: false</span>
              <button className="ml-1 hover:text-orange-900">×</button>
            </div>
            <button className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm flex items-center gap-2 hover:bg-red-700">
              + Recruitment
            </button>
          </div>
        </div>

        {/* Recruitment Tabs */}
        <div className="flex gap-1 mt-4 overflow-x-auto">
          {Object.entries(recruitmentData).map(([key, value]) => {
            const total = value.stages.reduce((acc, s) => acc + s.count, 0);
            return (
              <button
                key={key}
                onClick={() => {
                  setSelectedRecruitment(key);
                  setSelectedAll(false);
                  setSelectedRows({});
                }}
                className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-t-lg transition-colors whitespace-nowrap ${
                  selectedRecruitment === key
                    ? 'bg-white text-red-600 border-t border-x border-gray-200'
                    : 'text-gray-600 hover:text-gray-800 bg-gray-50'
                }`}
              >
                {key}
                <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-600 rounded-full">
                  {total}
                </span>
                <span className="text-gray-400">::</span>
              </button>
            );
          })}
          <button className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm flex items-center gap-2 hover:bg-red-700 ml-2">
            + Stage
          </button>
        </div>
      </div>

      {/* ====================== CONTENT ====================== */}
      <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto space-y-6">
          {currentData.stages.map((stage) => (
            <div key={stage.name} className="bg-white rounded-lg shadow-sm overflow-hidden">
              {/* Stage Header */}
              <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-b border-gray-200">
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center justify-center w-6 h-6 text-sm font-bold text-white bg-red-600 rounded-full">
                    {stage.count}
                  </span>
                  <h3 className="text-sm font-medium text-gray-900">
                    {stage.name} {selectedRecruitment === 'Recruitment Drive' && stage.name === 'Applied' && '- (Recruitment Drive)'}
                    {selectedRecruitment === 'FutureForce Recruitment' && stage.name === 'Hired' && '- (FutureForce Recruitment)'}
                    {selectedRecruitment === 'mobile developer' && '- (mobile developer)'}
                    {selectedRecruitment === 'New Title up' && '- (New Title up)'}
                  </h3>
                </div>
                <button className="p-1.5 hover:bg-gray-200 rounded">
                  <Plus className="h-4 w-4 text-gray-600" />
                </button>
              </div>

              {/* Candidates Table */}
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
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Job Position</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Contact</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Scheduled Interviews</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Rating</th>
                      <th className="sticky right-0 bg-gray-50 px-4 py-3 text-left text-sm font-medium text-gray-700 border-l border-gray-200">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {stage.candidates.length > 0 ? (
                      stage.candidates.map((candidate, i) => (
                        <tr key={candidate.id} className="hover:bg-gray-50">
                          <td className="px-4 py-3">
                            <input
                              type="checkbox"
                              checked={selectedRows[`${stage.name}-${i}`] || false}
                              onChange={() => handleSelectRow(stage.name, i)}
                              className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                            />
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-xs font-medium text-white shadow-sm">
                                {candidate.initials || getAvatarInitials(candidate.name)}
                              </div>
                              <span className="text-sm font-medium text-gray-900">{candidate.name}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-700">{candidate.email}</td>
                          <td className="px-4 py-3 text-sm text-gray-700">{candidate.position}</td>
                          <td className="px-4 py-3 text-sm text-gray-700">{candidate.contact}</td>
                          <td className="px-4 py-3 text-sm text-gray-700">{candidate.interviews}</td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-0.5">{renderStars(candidate.rating)}</div>
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
                                <Trash2 className="h-4 w-4 text-red-600" />
                              </button>
                              <button className="text-gray-400 hover:text-gray-600">
                                <MoreVertical className="h-5 w-5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="8" className="px-4 py-8 text-center text-sm text-gray-500">
                          No candidates in this stage
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {stage.candidates.length > 0 && (
                <div className="flex items-center justify-between px-4 py-3 text-sm text-gray-600 border-t border-gray-200">
                  <span>Page 1 of 1.</span>
                  <div className="flex items-center gap-2">
                    <span>Page</span>
                    <div className="flex items-center border border-gray-300 rounded">
                      <button className="px-2 py-1 hover:bg-gray-50">1</button>
                      <span className="px-2 py-1 bg-gray-100">of 1</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ====================== FAB ====================== */}
      <button className="fixed bottom-6 right-6 w-14 h-14 bg-red-600 text-white rounded-full shadow-lg hover:bg-red-700 flex items-center justify-center z-50">
        <Plus className="h-6 w-6" />
      </button>
    </>
  );
}