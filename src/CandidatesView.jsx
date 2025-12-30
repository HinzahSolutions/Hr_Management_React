'use client';

import React, { useState } from 'react';
import { 
  Search, Filter, ChevronDown, Plus, Copy, Eye, Edit2, Trash2, 
  MoreVertical, Calendar, X, Check, Mail, UserCheck, Clock, 
  AlertCircle, FileText, Download, Send, Users, CheckCircle,
  ArrowRight, RefreshCw, Settings, Bell, BarChart3, Grid3X3,
  TrendingUp, TrendingDown, Mail as MailIcon, Phone, MapPin
} from 'lucide-react';
import { useTheme } from './ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';

const candidatesData = [
  { id: 1, name: 'Amelia Hayes', email: 'amelia.h@example.com', joining: '08/11/2025', probation: '08/01/2026', position: 'Odoo Dev', recruitment: 'Recruitment Drive', offer: 'Accepted', portal: 'Sent', status: 'active', experience: '5y', location: 'NYC' },
  { id: 2, name: 'Lucas Rogers', email: 'lucas.r@example.com', joining: '--/--/----', probation: '--/--/----', position: 'Sales', recruitment: 'FutureForce', offer: 'Not Sent', portal: 'Not Sent', status: 'pending', experience: '3y', location: 'LA' },
  { id: 3, name: 'Kalyani I.', email: 'kalyani@example.com', joining: '--/--/----', probation: '--/--/----', position: 'Odoo Dev', recruitment: 'New Title', offer: 'Accepted', portal: 'Not Set', status: 'active', experience: '4y', location: 'Bangalore' },
  { id: 4, name: 'Mahesh B.', email: 'mahesh@example.com', joining: '11/11/2025', probation: '12/02/2026', position: 'Django Dev', recruitment: 'Python', offer: 'Not Sent', portal: 'Set', status: 'active', experience: '6y', location: 'Hyderabad' },
  { id: 5, name: 'Max Mustermann', email: 'max@example.com', joining: '--/--/----', probation: '--/--/----', position: 'Django Dev', recruitment: 'Drive', offer: 'Not Sent', portal: 'Sent', status: 'pending', experience: '2y', location: 'Berlin' },
  { id: 6, name: 'Ravi Kumar', email: 'ravi@example.com', joining: '31/10/2025', probation: '30/11/2025', position: 'Odoo Dev', recruitment: 'Drive', offer: 'Sent', portal: 'Set', status: 'active', experience: '4y', location: 'Delhi' },
  { id: 7, name: 'Liam Bennett', email: 'liam@example.com', joining: '--/--/----', probation: '--/--/----', position: 'Odoo Dev', recruitment: 'Drive', offer: 'Not Sent', portal: 'Not Set', status: 'pending', experience: '3y', location: 'London' },
  { id: 8, name: 'Emily Turner', email: 'emily@example.com', joining: '15/07/2025', probation: '--/--/----', position: 'Odoo Dev', recruitment: 'Drive', offer: 'Rejected', portal: 'Set', status: 'inactive', experience: '7y', location: 'Sydney' },
];

export default function CandidatesView() {
  const { theme } = useTheme();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedAll, setSelectedAll] = useState(false);
  const [selectedRows, setSelectedRows] = useState({});
  const [viewMode, setViewMode] = useState('table');
  const [activeFilter, setActiveFilter] = useState('all');

  // Theme helpers
  const getTextAccent = () => theme?.accent ? `text-${theme.accent}` : 'text-orange-600';
  const getButtonGradient = () => theme?.button ? `bg-gradient-to-r ${theme.button}` : 'bg-gradient-to-r from-orange-500 to-orange-600';
  const getButtonHover = () => theme?.buttonHover || 'hover:from-orange-600 hover:to-orange-700';
  const getLightBg = () => theme?.lightBg || 'bg-orange-50';
  const getRingColor = () => theme?.ringColor || 'ring-orange-500';

  // Handlers
  const handleSelectAll = () => {
    const newSel = {};
    candidatesData.forEach((_, i) => (newSel[i] = !selectedAll));
    setSelectedRows(newSel);
    setSelectedAll(!selectedAll);
  };

  const handleSelectRow = (i) => {
    const newSel = { ...selectedRows, [i]: !selectedRows[i] };
    setSelectedRows(newSel);
    setSelectedAll(Object.values(newSel).every((v) => v));
  };

  const getInitials = (name) => name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  const getStatusColor = (status) => ({
    active: 'bg-green-100 text-green-800',
    pending: 'bg-yellow-100 text-yellow-800',
    inactive: 'bg-red-100 text-red-800'
  }[status] || 'bg-gray-100 text-gray-800');

  const getPortalColor = (status) => ({
    'Sent': 'bg-green-100 text-green-800',
    'Not Sent': 'bg-yellow-100 text-yellow-800',
    'Not Set': 'bg-orange-100 text-orange-800',
    'Set': 'bg-blue-100 text-blue-800'
  }[status] || 'bg-gray-100 text-gray-800');

  const getOfferColor = (status) => ({
    'Accepted': 'bg-green-100 text-green-800',
    'Not Sent': 'bg-gray-100 text-gray-800',
    'Sent': 'bg-blue-100 text-blue-800',
    'Rejected': 'bg-red-100 text-red-800'
  }[status] || 'bg-gray-100 text-gray-800');

  const summaryData = {
    total: candidatesData.length,
    active: candidatesData.filter(c => c.status === 'active').length,
    hired: candidatesData.filter(c => c.offer === 'Accepted').length,
    pending: candidatesData.filter(c => c.offer === 'Not Sent').length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50/50 via-white to-blue-50/30">
      {/* HEADER */}
      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-sm border-b border-gray-200/50 p-4 lg:p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Hired Candidates</h1>
            <p className="text-gray-600 mt-1">Manage and track all hired candidates</p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search candidates..."
                className={`pl-10 pr-4 py-2 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 ${getRingColor()} focus:border-transparent w-full lg:w-64`}
              />
            </div>
            
            <button className={`p-2 ${getLightBg()} ${getTextAccent()} rounded-xl hover:opacity-90`}>
              <Filter className="h-5 w-5" />
            </button>
            
            <button className="relative p-2 hover:bg-gray-100 rounded-xl">
              <Bell className="h-5 w-5 text-gray-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            
            <button className="hidden lg:flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-xl text-sm hover:bg-gray-50">
              <Settings className="h-4 w-4" /> Settings
            </button>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex items-center gap-2 mt-6 overflow-x-auto scrollbar-hide">
          <div className="flex items-center gap-2 p-1 bg-gray-100 rounded-xl">
            <button
              onClick={() => setViewMode('table')}
              className={`px-3 py-1.5 text-sm rounded-lg flex items-center gap-2 ${
                viewMode === 'table' ? 'bg-white shadow-sm' : ''
              }`}
            >
              <BarChart3 className="h-4 w-4" /> Table
            </button>
            <button
              onClick={() => setViewMode('card')}
              className={`px-3 py-1.5 text-sm rounded-lg flex items-center gap-2 ${
                viewMode === 'card' ? 'bg-white shadow-sm' : ''
              }`}
            >
              <Grid3X3 className="h-4 w-4" /> Cards
            </button>
          </div>
          
          {['all', 'active', 'pending', 'hired', 'rejected'].map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-xl text-sm font-medium capitalize whitespace-nowrap ${
                activeFilter === filter
                  ? `${getButtonGradient()} ${getButtonHover()} text-white`
                  : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-300'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* SUMMARY CARDS */}
      <div className="p-4 lg:p-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6">
          <div className="bg-white rounded-2xl p-5 shadow-lg border border-gray-200/50">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-50 rounded-xl">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div className="flex items-center text-sm text-blue-600 font-medium">
                <TrendingUp className="h-4 w-4 mr-1" /> +{Math.floor(summaryData.total * 0.15)}
              </div>
            </div>
            <h3 className="text-sm font-medium text-gray-500 mb-1">Total Candidates</h3>
            <p className="text-2xl lg:text-3xl font-bold text-gray-900">{summaryData.total}</p>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-lg border border-gray-200/50">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-green-50 rounded-xl">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div className="text-sm text-green-600 font-medium">
                {Math.round((summaryData.active / summaryData.total) * 100)}%
              </div>
            </div>
            <h3 className="text-sm font-medium text-gray-500 mb-1">Active</h3>
            <p className="text-2xl lg:text-3xl font-bold text-green-600">{summaryData.active}</p>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-lg border border-gray-200/50">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-yellow-50 rounded-xl">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="text-sm text-yellow-600 font-medium">
                {Math.round((summaryData.pending / summaryData.total) * 100)}%
              </div>
            </div>
            <h3 className="text-sm font-medium text-gray-500 mb-1">Pending</h3>
            <p className="text-2xl lg:text-3xl font-bold text-yellow-600">{summaryData.pending}</p>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-lg border border-gray-200/50">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 ${getLightBg()} rounded-xl`}>
                <UserCheck className={`h-6 w-6 ${getTextAccent()}`} />
              </div>
              <button className="p-1 hover:bg-gray-100 rounded-lg">
                <RefreshCw className="h-5 w-5 text-gray-600" />
              </button>
            </div>
            <h3 className="text-sm font-medium text-gray-500 mb-1">Successfully Hired</h3>
            <p className="text-2xl lg:text-3xl font-bold text-gray-900">{summaryData.hired}</p>
          </div>
        </div>

        {/* TABLE VIEW */}
        {viewMode === 'table' && (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200/50 overflow-hidden">
            {/* Table Header */}
            <div className={`${getLightBg()} border-b border-gray-200`}>
              <div className="flex items-center justify-between p-6">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Candidates</h3>
                  <p className="text-sm text-gray-500 mt-1">{candidatesData.length} candidates found</p>
                </div>
                
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleSelectAll}
                    className={`px-4 py-2 rounded-xl text-sm font-medium ${
                      selectedAll
                        ? `${getButtonGradient()} ${getButtonHover()} text-white`
                        : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-300'
                    }`}
                  >
                    {selectedAll ? 'Deselect All' : 'Select All'}
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-xl">
                    <Download className="h-5 w-5 text-gray-600" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-xl">
                    <MoreVertical className="h-5 w-5 text-gray-600" />
                  </button>
                  <button
                    onClick={() => setShowCreateModal(true)}
                    className={`px-4 py-2 ${getButtonGradient()} ${getButtonHover()} text-white text-sm font-medium rounded-xl flex items-center gap-2`}
                  >
                    <Plus className="h-4 w-4" /> Create Candidate
                  </button>
                </div>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left">
                      <input
                        type="checkbox"
                        checked={selectedAll}
                        onChange={handleSelectAll}
                        className={`rounded border-gray-300 ${getTextAccent()} focus:${getRingColor()}`}
                      />
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Candidate</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Position</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Recruitment</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Joining Date</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Offer Status</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Portal Status</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {candidatesData.map((row, idx) => (
                    <tr key={row.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <input
                          type="checkbox"
                          checked={selectedRows[idx] || false}
                          onChange={() => handleSelectRow(idx)}
                          className={`rounded border-gray-300 ${getTextAccent()} focus:${getRingColor()}`}
                        />
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                            <span className="text-white font-medium">{getInitials(row.name)}</span>
                          </div>
                          <div className="text-left">
                            <p className="font-medium text-gray-900">{row.name}</p>
                            <p className="text-sm text-gray-500">{row.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">{row.position}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{row.recruitment}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          <span className="text-sm text-gray-700">{row.joining}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium ${getOfferColor(row.offer)}`}>
                          {row.offer}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium ${getPortalColor(row.portal)}`}>
                          {row.portal}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button className="p-1.5 hover:bg-blue-50 rounded-lg text-blue-600" title="View">
                            <Eye className="h-4 w-4" />
                          </button>
                          <button className="p-1.5 hover:bg-gray-100 rounded-lg" title="Edit">
                            <Edit2 className="h-4 w-4 text-gray-600" />
                          </button>
                          <button className="p-1.5 hover:bg-gray-100 rounded-lg" title="Documents">
                            <FileText className="h-4 w-4 text-gray-600" />
                          </button>
                          <button className="p-1.5 hover:bg-red-50 rounded-lg text-red-600" title="Delete">
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
        )}

        {/* CARD VIEW */}
        {viewMode === 'card' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {candidatesData.map((row) => (
              <div key={row.id} className="bg-white rounded-2xl shadow-lg border border-gray-200/50 p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                      <span className="text-white text-lg font-bold">{getInitials(row.name)}</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">{row.name}</h3>
                      <p className="text-sm text-gray-500">{row.email}</p>
                    </div>
                  </div>
                  <button className="p-2 hover:bg-gray-100 rounded-xl">
                    <MoreVertical className="h-5 w-5 text-gray-600" />
                  </button>
                </div>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Position</span>
                    <span className="font-medium text-gray-900">{row.position}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Recruitment</span>
                    <span className="font-medium text-gray-900">{row.recruitment}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Joining Date</span>
                    <span className="font-medium text-gray-900">{row.joining}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Offer Status</span>
                    <span className={`px-2 py-1 rounded-lg text-xs font-medium ${getOfferColor(row.offer)}`}>
                      {row.offer}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <button className="text-sm font-medium text-gray-600 hover:text-gray-900 flex items-center">
                    <Eye className="h-4 w-4 mr-1" /> View
                  </button>
                  <div className="flex items-center gap-2">
                    <button className="p-1.5 hover:bg-gray-100 rounded-lg">
                      <Edit2 className="h-4 w-4 text-gray-600" />
                    </button>
                    <button className="p-1.5 hover:bg-gray-100 rounded-lg">
                      <FileText className="h-4 w-4 text-gray-600" />
                    </button>
                    <button className="p-1.5 hover:bg-red-50 rounded-lg text-red-600">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* CREATE MODAL */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full p-6 relative">
            <button
              onClick={() => setShowCreateModal(false)}
              className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-xl"
            >
              <X className="h-5 w-5 text-gray-500" />
            </button>

            <h2 className="text-xl font-bold text-gray-900 mb-6">Create Candidate</h2>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <input
                type="text"
                placeholder="Full Name"
                className={`px-4 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 ${getRingColor()} focus:border-transparent`}
              />
              <input
                type="email"
                placeholder="Email Address"
                className={`px-4 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 ${getRingColor()} focus:border-transparent`}
              />
              <select className={`px-4 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 ${getRingColor()} focus:border-transparent`}>
                <option>Select Position</option>
                <option>Odoo Developer</option>
                <option>Django Developer</option>
                <option>Sales Executive</option>
              </select>
              <select className={`px-4 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 ${getRingColor()} focus:border-transparent`}>
                <option>Select Recruitment</option>
                <option>Recruitment Drive</option>
                <option>FutureForce</option>
              </select>
            </div>

            <div className="flex items-center justify-end gap-3 pt-6 border-t border-gray-200">
              <button
                onClick={() => setShowCreateModal(false)}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                className={`px-8 py-3 ${getButtonGradient()} ${getButtonHover()} text-white text-sm font-medium rounded-xl flex items-center gap-2`}
              >
                <Check className="h-4 w-4" /> Create Candidate
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FLOATING ACTION BUTTON */}
      <button className={`
        fixed bottom-8 right-8 z-50 
        flex h-16 w-16 items-center justify-center 
        rounded-2xl shadow-2xl 
        ${getButtonGradient()} ${getButtonHover()}
        text-white 
        transition-all duration-300
        hover:shadow-3xl hover:scale-110
        ring-4 ring-white/20
      `} onClick={() => setShowCreateModal(true)}>
        <Plus className="h-8 w-8" />
      </button>

      {/* QUICK STATS */}
      <div className="fixed bottom-8 left-8 z-40 bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-4 border border-gray-200/50 hidden lg:block">
        <div className="flex items-center gap-3 mb-3">
          <div className={`p-2 ${getLightBg()} rounded-xl`}>
            <UserCheck className={`h-5 w-5 ${getTextAccent()}`} />
          </div>
          <div>
            <h3 className="font-bold text-gray-900">Hiring Stats</h3>
            <p className="text-xs text-gray-500">{summaryData.hired} successfully hired</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              className={`h-full ${getButtonGradient()}`}
              initial={{ width: '0%' }}
              animate={{ width: `${(summaryData.hired / summaryData.total) * 100}%` }}
              transition={{ duration: 1 }}
            />
          </div>
          <span className="text-xs font-medium text-gray-700">{Math.round((summaryData.hired / summaryData.total) * 100)}%</span>
        </div>
      </div>
    </div>
  );
}