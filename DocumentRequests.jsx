'use client';

import React, { useState } from 'react';
import {
  Search, Filter, ChevronDown, Plus, CheckCircle,
  XCircle, Trash2, AlertCircle, Eye, Download,
  MoreVertical, Calendar, Users, FileText, Clock,
  Bell, Settings, BarChart3, Grid3X3, TrendingUp,
  RefreshCw, ArrowRight, Copy, Mail, User,
  ChevronRight, ChevronUp, Check, X, Upload,
  FileUp, Shield, Lock, File
} from 'lucide-react';
import { useTheme } from './src/ThemeContext';


const documentGroups = [
  { 
    id: 1, 
    name: 'Software Test Engineer', 
    progress: '0/1', 
    isOpen: true, 
    totalRequests: 12,
    pending: 8,
    approved: 3,
    rejected: 1,
    requests: [
      { 
        id: 1, 
        title: 'Software Test Engineer -- KALYANI Nishank', 
        comment: 'Experience certificate and education documents required',
        status: 'pending',
        requestedDate: '15 Dec, 2025',
        deadline: '22 Dec, 2025',
        candidate: 'Kalyani Nishank',
        department: 'Engineering',
        priority: 'High'
      }
    ] 
  },
  { 
    id: 2, 
    name: 'PAN Card Verification', 
    progress: '0/1', 
    isOpen: false, 
    totalRequests: 8,
    pending: 5,
    approved: 2,
    rejected: 1,
    requests: [] 
  },
  { 
    id: 3, 
    name: 'Voter ID Verification', 
    progress: '0/2', 
    isOpen: true, 
    totalRequests: 15,
    pending: 10,
    approved: 4,
    rejected: 1,
    requests: [
      { 
        id: 2, 
        title: 'Voter ID -- Ella Jackson', 
        comment: 'Front and back copies required',
        status: 'pending',
        requestedDate: '14 Dec, 2025',
        deadline: '21 Dec, 2025',
        candidate: 'Ella Jackson',
        department: 'Sales',
        priority: 'Medium'
      },
      { 
        id: 3, 
        title: 'Voter ID -- Amelia Cooper', 
        comment: 'Clear scanned copy needed',
        status: 'approved',
        requestedDate: '10 Dec, 2025',
        deadline: '17 Dec, 2025',
        candidate: 'Amelia Cooper',
        department: 'Marketing',
        priority: 'Low'
      }
    ] 
  },
  { 
    id: 4, 
    name: 'Visa & Work Permit', 
    progress: '0/4', 
    isOpen: false, 
    totalRequests: 6,
    pending: 3,
    approved: 2,
    rejected: 1,
    requests: [] 
  },
  { 
    id: 5, 
    name: 'Passport Verification', 
    progress: '1/9', 
    isOpen: false, 
    totalRequests: 24,
    pending: 15,
    approved: 8,
    rejected: 1,
    requests: [] 
  },
];

export default function DocumentRequestsThemed() {
  const { theme } = useTheme();
  const [groups, setGroups] = useState(documentGroups);
  const [viewMode, setViewMode] = useState('list');
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Theme helper functions
  const getTextAccent = () => theme?.accent ? `text-${theme.accent}` : 'text-orange-600';
  const getButtonGradient = () => theme?.button ? `bg-gradient-to-r ${theme.button}` : 'bg-gradient-to-r from-orange-500 to-orange-600';
  const getButtonHover = () => theme?.buttonHover || 'hover:from-orange-600 hover:to-orange-700';
  const getLightBg = () => theme?.lightBg || 'bg-orange-50';
  const getRingColor = () => theme?.ringColor || 'ring-orange-500';
  const getSidebarActive = () => theme?.sidebarActive || 'bg-orange-200';

  const toggleGroup = (id) => setGroups(prev => prev.map(g => g.id === id ? { ...g, isOpen: !g.isOpen } : g));

  const filteredGroups = groups.filter(group => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'pending') return group.pending > 0;
    if (activeFilter === 'approved') return group.approved > 0;
    if (activeFilter === 'rejected') return group.rejected > 0;
    return true;
  });

  const totalStats = {
    requests: groups.reduce((sum, g) => sum + g.totalRequests, 0),
    pending: groups.reduce((sum, g) => sum + g.pending, 0),
    approved: groups.reduce((sum, g) => sum + g.approved, 0),
    rejected: groups.reduce((sum, g) => sum + g.rejected, 0),
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50/50 via-white to-blue-50/30">
      {/* HEADER */}
      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-sm border-b border-gray-200/50 p-4 lg:p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Document Requests</h1>
            <p className="text-gray-600 mt-1">Manage and track all document requests</p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search documents..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
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
              onClick={() => setViewMode('list')}
              className={`px-3 py-1.5 text-sm rounded-lg flex items-center gap-2 ${
                viewMode === 'list' ? 'bg-white shadow-sm' : ''
              }`}
            >
              <BarChart3 className="h-4 w-4" /> List
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3 py-1.5 text-sm rounded-lg flex items-center gap-2 ${
                viewMode === 'grid' ? 'bg-white shadow-sm' : ''
              }`}
            >
              <Grid3X3 className="h-4 w-4" /> Grid
            </button>
          </div>
          
          {['all', 'pending', 'approved', 'rejected'].map((filter) => (
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
          
          <div className="flex items-center gap-1 border border-gray-300 rounded-xl px-3 py-2 bg-white">
            <Calendar className="h-4 w-4 text-gray-500" />
            <span className="text-sm text-gray-700">Dec 2025</span>
          </div>
        </div>
      </div>

      {/* SUMMARY CARDS */}
      <div className="p-4 lg:p-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6">
          <div className="bg-white rounded-2xl p-5 shadow-lg border border-gray-200/50">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-50 rounded-xl">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
              <div className="flex items-center text-sm text-blue-600 font-medium">
                <TrendingUp className="h-4 w-4 mr-1" /> +{Math.floor(totalStats.requests * 0.1)}
              </div>
            </div>
            <h3 className="text-sm font-medium text-gray-500 mb-1">Total Requests</h3>
            <p className="text-2xl lg:text-3xl font-bold text-gray-900">{totalStats.requests}</p>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-lg border border-gray-200/50">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-yellow-50 rounded-xl">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="flex items-center text-sm text-yellow-600 font-medium">
                <TrendingUp className="h-4 w-4 mr-1" /> +{Math.floor(totalStats.pending * 0.15)}
              </div>
            </div>
            <h3 className="text-sm font-medium text-gray-500 mb-1">Pending</h3>
            <p className="text-2xl lg:text-3xl font-bold text-yellow-600">{totalStats.pending}</p>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-lg border border-gray-200/50">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-green-50 rounded-xl">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div className="flex items-center text-sm text-green-600 font-medium">
                <TrendingUp className="h-4 w-4 mr-1" /> +{Math.floor(totalStats.approved * 0.2)}
              </div>
            </div>
            <h3 className="text-sm font-medium text-gray-500 mb-1">Approved</h3>
            <p className="text-2xl lg:text-3xl font-bold text-green-600">{totalStats.approved}</p>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-lg border border-gray-200/50">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 ${getLightBg()} rounded-xl`}>
                <XCircle className={`h-6 w-6 ${getTextAccent()}`} />
              </div>
              <button className="p-1 hover:bg-gray-100 rounded-lg">
                <RefreshCw className="h-5 w-5 text-gray-600" />
              </button>
            </div>
            <h3 className="text-sm font-medium text-gray-500 mb-1">Rejected</h3>
            <p className="text-2xl lg:text-3xl font-bold text-gray-900">{totalStats.rejected}</p>
          </div>
        </div>

        {/* DOCUMENT GROUPS */}
        <div className="space-y-6">
          {filteredGroups.map((group) => (
            <div key={group.id} className="bg-white rounded-2xl shadow-lg border border-gray-200/50 overflow-hidden">
              {/* Group Header */}
              <div className={`p-6 border-b ${getLightBg()}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => toggleGroup(group.id)}
                      className="p-2 hover:bg-white/50 rounded-xl transition-colors"
                    >
                      {group.isOpen ? (
                        <ChevronUp className="h-5 w-5 text-gray-600" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-gray-600" />
                      )}
                    </button>

                    <div className="flex items-center gap-3">
                      <div className={`p-3 ${getButtonGradient()} rounded-xl`}>
                        <Shield className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">{group.name}</h3>
                        <div className="flex items-center gap-4 mt-1">
                          <span className="text-sm text-gray-500">Total: {group.totalRequests}</span>
                          <span className="text-sm text-yellow-600">Pending: {group.pending}</span>
                          <span className="text-sm text-green-600">Approved: {group.approved}</span>
                          <span className="text-sm text-red-600">Rejected: {group.rejected}</span>
                        </div>
                      </div>
                    </div>

                    <div className={`px-4 py-2 ${getButtonGradient()} text-white rounded-xl font-bold flex items-center gap-2`}>
                      <span>{group.progress}</span>
                      <span className="text-sm">completed</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button className={`px-4 py-2 ${getButtonGradient()} ${getButtonHover()} text-white text-sm font-medium rounded-xl flex items-center gap-2`}>
                      <Plus className="h-4 w-4" /> New Request
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-xl">
                      <MoreVertical className="h-5 w-5 text-gray-600" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Requests List */}
              {group.isOpen && (
                <div className="p-6">
                  {group.requests.length > 0 ? (
                    <div className="space-y-4">
                      {group.requests.map((request) => (
                        <div key={request.id} className="bg-gray-50 rounded-xl border border-gray-200 p-6 hover:border-gray-300 transition-colors">
                          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                            <div className="flex items-start gap-4">
                              <div className={`p-3 ${
                                request.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                                request.status === 'approved' ? 'bg-green-100 text-green-700' :
                                'bg-gray-100 text-gray-700'
                              } rounded-xl`}>
                                {request.status === 'pending' ? <AlertCircle className="h-6 w-6" /> :
                                 request.status === 'approved' ? <CheckCircle className="h-6 w-6" /> :
                                 <FileText className="h-6 w-6" />}
                              </div>
                              
                              <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                  <h4 className="font-bold text-gray-900">{request.title}</h4>
                                  <span className={`px-3 py-1 rounded-lg text-xs font-medium ${
                                    request.priority === 'High' ? 'bg-red-100 text-red-800' :
                                    request.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                                    'bg-green-100 text-green-800'
                                  }`}>
                                    {request.priority} Priority
                                  </span>
                                </div>
                                
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                  <div className="space-y-2">
                                    <div className="flex items-center gap-2 text-sm">
                                      <User className="h-4 w-4 text-gray-400" />
                                      <span className="text-gray-600">{request.candidate}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm">
                                      <Calendar className="h-4 w-4 text-gray-400" />
                                      <span className="text-gray-600">Requested: {request.requestedDate}</span>
                                    </div>
                                  </div>
                                  <div className="space-y-2">
                                    <div className="flex items-center gap-2 text-sm">
                                      <Clock className="h-4 w-4 text-gray-400" />
                                      <span className="text-gray-600">Deadline: {request.deadline}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm">
                                      <Users className="h-4 w-4 text-gray-400" />
                                      <span className="text-gray-600">{request.department}</span>
                                    </div>
                                  </div>
                                </div>
                                
                                {request.comment && (
                                  <div className="mt-4 p-3 bg-white rounded-lg border">
                                    <p className="text-sm text-gray-600">{request.comment}</p>
                                  </div>
                                )}
                              </div>
                            </div>

                            <div className="flex items-center gap-2">
                              <button className="p-2 hover:bg-green-100 rounded-lg text-green-600" title="Approve">
                                <CheckCircle className="h-5 w-5" />
                              </button>
                              <button className="p-2 hover:bg-red-100 rounded-lg text-red-600" title="Reject">
                                <XCircle className="h-5 w-5" />
                              </button>
                              <button className="p-2 hover:bg-blue-100 rounded-lg text-blue-600" title="View">
                                <Eye className="h-5 w-5" />
                              </button>
                              <button className="p-2 hover:bg-gray-100 rounded-lg" title="Download">
                                <Download className="h-5 w-5 text-gray-600" />
                              </button>
                              <button className="p-2 hover:bg-gray-100 rounded-lg" title="More">
                                <MoreVertical className="h-5 w-5 text-gray-600" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-16">
                      <div className="w-20 h-20 mx-auto bg-gray-100 rounded-2xl flex items-center justify-center mb-4">
                        <FileText className="h-10 w-10 text-gray-400" />
                      </div>
                      <h4 className="text-lg font-medium text-gray-900 mb-2">No requests in this category</h4>
                      <p className="text-gray-600 mb-6">There are currently no document requests in this category.</p>
                      <button className={`px-6 py-3 ${getButtonGradient()} ${getButtonHover()} text-white rounded-xl flex items-center gap-2 mx-auto`}>
                        <Plus className="h-4 w-4" /> Create First Request
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

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
      `}>
        <Plus className="h-8 w-8" />
      </button>

      {/* QUICK STATS */}
      <div className="fixed bottom-8 left-8 z-40 bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-4 border border-gray-200/50 hidden lg:block">
        <div className="flex items-center gap-3 mb-3">
          <div className={`p-2 ${getLightBg()} rounded-xl`}>
            <File className={`h-5 w-5 ${getTextAccent()}`} />
          </div>
          <div>
            <h3 className="font-bold text-gray-900">Document Stats</h3>
            <p className="text-xs text-gray-500">{totalStats.requests} total requests</p>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Pending Rate</span>
            <span className="font-medium text-gray-900">
              {((totalStats.pending / totalStats.requests) * 100).toFixed(1)}%
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Approval Rate</span>
            <span className="font-medium text-gray-900">
              {((totalStats.approved / totalStats.requests) * 100).toFixed(1)}%
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Avg Response Time</span>
            <span className="font-medium text-gray-900">2.3 days</span>
          </div>
        </div>
      </div>
    </div>
  );
}