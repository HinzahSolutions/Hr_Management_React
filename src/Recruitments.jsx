'use client';

import React, { useState } from 'react';
import { 
  Plus, Search, Filter, X, MoreVertical, Star, Menu, 
  ChevronLeft, ChevronRight, Eye, Edit2, Trash2, Download,
  Calendar, Clock, Mail, Phone, MapPin, User, Briefcase,
  MessageSquare, FileText, CheckCircle, XCircle, AlertCircle,
  Users, BarChart3, Grid3X3, Settings, Bell, ArrowRight,
  TrendingUp, TrendingDown, RefreshCw, Copy, QrCode,
  ChevronDown, ChevronUp, Award, Target, Zap, Crown
} from 'lucide-react';
import { useTheme } from './ThemeContext';

const recruitmentData = {
  'mobile developer': {
    totalCandidates: 24,
    openPositions: 3,
    hired: 2,
    conversionRate: '8.3%',
    stages: [
      {
        name: 'Applied',
        count: 12,
        candidates: [
          {
            id: 1,
            name: 'Ganesh Alapakam',
            email: 'alapakamg@example.com',
            position: 'Django Dev - Senior Developer',
            contact: '+916305979503',
            interviews: 'Scheduled: 2',
            rating: 4,
            status: 'active',
            experience: '5 years',
            location: 'Bangalore, IN',
            lastActive: '2 hours ago',
            avatarColor: 'bg-gradient-to-br from-blue-500 to-cyan-500'
          },
          {
            id: 2,
            name: 'Sophia Chen',
            email: 'sophia.chen@example.com',
            position: 'Mobile Developer - Mid Level',
            contact: '+14155552671',
            interviews: 'Scheduled: 1',
            rating: 5,
            status: 'active',
            experience: '3 years',
            location: 'San Francisco, US',
            lastActive: '1 hour ago',
            avatarColor: 'bg-gradient-to-br from-purple-500 to-pink-500'
          },
          {
            id: 3,
            name: 'Rajesh Kumar',
            email: 'rajesh.k@example.com',
            position: 'Full Stack Developer',
            contact: '+919876543210',
            interviews: 'Scheduled: 0',
            rating: 3,
            status: 'pending',
            experience: '4 years',
            location: 'Delhi, IN',
            lastActive: '1 day ago',
            avatarColor: 'bg-gradient-to-br from-green-500 to-emerald-500'
          },
        ],
      },
      {
        name: 'Initial Screening',
        count: 6,
        candidates: [
          {
            id: 4,
            name: 'Emma Wilson',
            email: 'emma.w@example.com',
            position: 'UI/UX Designer',
            contact: '+447911123456',
            interviews: 'Scheduled: 3',
            rating: 4,
            status: 'active',
            experience: '2 years',
            location: 'London, UK',
            lastActive: '3 hours ago',
            avatarColor: 'bg-gradient-to-br from-amber-500 to-orange-500'
          },
        ],
      },
      {
        name: 'Technical Round',
        count: 3,
        candidates: [],
      },
      {
        name: 'HR Round',
        count: 2,
        candidates: [
          {
            id: 5,
            name: 'Alex Johnson',
            email: 'alex.j@example.com',
            position: 'Product Manager',
            contact: '+13125551234',
            interviews: 'Scheduled: 4',
            rating: 5,
            status: 'active',
            experience: '7 years',
            location: 'New York, US',
            lastActive: 'Just now',
            avatarColor: 'bg-gradient-to-br from-red-500 to-pink-500'
          },
        ],
      },
      {
        name: 'Final Round',
        count: 1,
        candidates: [],
      },
    ],
  },
};

export default function RecruitmentPipeline() {
  const { theme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selected] = useState('mobile developer');
  const [viewMode, setViewMode] = useState('kanban');
  const [activeFilter, setActiveFilter] = useState('all');
  const current = recruitmentData[selected];

  // Theme helper functions
  const getAccentColor = () => theme?.accent || 'orange-600';
  const getBorderColor = () => theme?.borderColor || 'border-orange-600';
  const getTextAccent = () => theme?.accent ? `text-${theme.accent}` : 'text-orange-600';
  const getButtonGradient = () => theme?.button ? `bg-gradient-to-r ${theme.button}` : 'bg-gradient-to-r from-orange-500 to-orange-600';
  const getButtonHover = () => theme?.buttonHover || 'hover:from-orange-600 hover:to-orange-700';
  const getLightBg = () => theme?.lightBg || 'bg-orange-50';
  const getRingColor = () => theme?.ringColor || 'ring-orange-500';
  const getSidebarActive = () => theme?.sidebarActive || 'bg-orange-200';

  const getInitials = (name) =>
    name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

  const renderStars = (rating) =>
    Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? `fill-current ${getTextAccent()}` : 'text-gray-300'}`}
      />
    ));

  const summaryData = {
    total: current.totalCandidates,
    applied: current.stages[0].count,
    screening: current.stages[1].count,
    technical: current.stages[2].count,
    hr: current.stages[3].count,
    final: current.stages[4].count,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50/50 via-white to-blue-50/30">
      {/* HEADER */}
      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-sm border-b border-gray-200/50">
        <div className="p-4 lg:p-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Recruitment Pipeline</h1>
              <p className="text-gray-600 mt-1">Track candidates through hiring stages</p>
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
                onClick={() => setViewMode('kanban')}
                className={`px-3 py-1.5 text-sm rounded-lg flex items-center gap-2 ${
                  viewMode === 'kanban' ? 'bg-white shadow-sm' : ''
                }`}
              >
                <Grid3X3 className="h-4 w-4" /> Kanban
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-3 py-1.5 text-sm rounded-lg flex items-center gap-2 ${
                  viewMode === 'list' ? 'bg-white shadow-sm' : ''
                }`}
              >
                <BarChart3 className="h-4 w-4" /> List
              </button>
            </div>
            
            {['all', 'active', 'pending', 'rejected', 'hired'].map((filter) => (
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
            
            <button className="flex items-center gap-1 border border-gray-300 rounded-xl px-3 py-2 bg-white">
              <Calendar className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-700">Dec 2025</span>
            </button>
          </div>
        </div>
      </div>

      {/* SUMMARY CARDS */}
      <div className="p-4 lg:p-6">
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-4 mb-6">
          <div className="bg-white rounded-2xl p-4 shadow-lg border border-gray-200/50">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 bg-blue-50 rounded-xl">
                <Users className="h-5 w-5 text-blue-600" />
              </div>
              <div className="flex items-center text-sm text-blue-600 font-medium">
                <TrendingUp className="h-4 w-4 mr-1" />
                +12
              </div>
            </div>
            <h3 className="text-sm font-medium text-gray-500 mb-1">Total</h3>
            <p className="text-2xl font-bold text-gray-900">{summaryData.total}</p>
          </div>

          <div className="bg-white rounded-2xl p-4 shadow-lg border border-gray-200/50">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 bg-yellow-50 rounded-xl">
                <FileText className="h-5 w-5 text-yellow-600" />
              </div>
              <span className="text-xs px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full">Applied</span>
            </div>
            <h3 className="text-sm font-medium text-gray-500 mb-1">Applied</h3>
            <p className="text-2xl font-bold text-gray-900">{summaryData.applied}</p>
          </div>

          <div className="bg-white rounded-2xl p-4 shadow-lg border border-gray-200/50">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 bg-purple-50 rounded-xl">
                <Eye className="h-5 w-5 text-purple-600" />
              </div>
              <span className="text-xs px-2 py-1 bg-purple-100 text-purple-800 rounded-full">Screening</span>
            </div>
            <h3 className="text-sm font-medium text-gray-500 mb-1">Screening</h3>
            <p className="text-2xl font-bold text-gray-900">{summaryData.screening}</p>
          </div>

          <div className="bg-white rounded-2xl p-4 shadow-lg border border-gray-200/50">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 bg-indigo-50 rounded-xl">
                <Briefcase className="h-5 w-5 text-indigo-600" />
              </div>
              <span className="text-xs px-2 py-1 bg-indigo-100 text-indigo-800 rounded-full">Technical</span>
            </div>
            <h3 className="text-sm font-medium text-gray-500 mb-1">Technical</h3>
            <p className="text-2xl font-bold text-gray-900">{summaryData.technical}</p>
          </div>

          <div className="bg-white rounded-2xl p-4 shadow-lg border border-gray-200/50">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 bg-green-50 rounded-xl">
                <MessageSquare className="h-5 w-5 text-green-600" />
              </div>
              <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full">HR</span>
            </div>
            <h3 className="text-sm font-medium text-gray-500 mb-1">HR Round</h3>
            <p className="text-2xl font-bold text-gray-900">{summaryData.hr}</p>
          </div>

          <div className="bg-white rounded-2xl p-4 shadow-lg border border-gray-200/50">
            <div className="flex items-center justify-between mb-3">
              <div className={`p-2 ${getLightBg()} rounded-xl`}>
                <CheckCircle className={`h-5 w-5 ${getTextAccent()}`} />
              </div>
              <span className={`text-xs px-2 py-1 ${getLightBg()} ${getTextAccent()} rounded-full`}>Final</span>
            </div>
            <h3 className="text-sm font-medium text-gray-500 mb-1">Final Round</h3>
            <p className="text-2xl font-bold text-gray-900">{summaryData.final}</p>
          </div>
        </div>

        {/* RECRUITMENT HEADER */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200/50 p-4 lg:p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl">
                <Briefcase className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Mobile Developer Recruitment</h2>
                <div className="flex items-center gap-3 mt-2">
                  <span className="text-sm text-gray-500">{current.openPositions} open positions</span>
                  <span className="text-sm text-gray-400">•</span>
                  <span className="text-sm text-gray-500">{current.hired} hired</span>
                  <span className="text-sm text-gray-400">•</span>
                  <span className="text-sm text-gray-500">{current.conversionRate} conversion rate</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <button className="p-2 hover:bg-gray-100 rounded-xl">
                <Download className="h-5 w-5 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-xl">
                <MoreVertical className="h-5 w-5 text-gray-600" />
              </button>
              <button
                className={`px-4 py-2 ${getButtonGradient()} ${getButtonHover()} text-white text-sm font-medium rounded-xl flex items-center gap-2`}
              >
                <Plus className="h-4 w-4" /> Add Candidate
              </button>
            </div>
          </div>
        </div>

        {/* KANBAN BOARD */}
        {viewMode === 'kanban' ? (
          <div className="overflow-x-auto pb-6">
            <div className="flex gap-4 min-w-max">
              {current.stages.map((stage, stageIndex) => (
                <div 
                  key={stage.name} 
                  className="w-80 flex-shrink-0 bg-white rounded-2xl shadow-lg border border-gray-200/50 overflow-hidden"
                >
                  {/* Stage Header */}
                  <div className={`p-4 border-b ${getLightBg()}`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={`w-8 h-8 ${stage.count > 0 ? getButtonGradient() : 'bg-gray-300'} text-white rounded-lg flex items-center justify-center text-sm font-bold`}>
                          {stage.count}
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900">{stage.name}</h3>
                          <p className="text-xs text-gray-500">Stage {stageIndex + 1}</p>
                        </div>
                      </div>
                      <button className="p-2 hover:bg-white/50 rounded-xl">
                        <Plus className="h-4 w-4 text-gray-600" />
                      </button>
                    </div>
                  </div>

                  {/* Candidates List */}
                  <div className="p-2 max-h-[500px] overflow-y-auto">
                    {stage.candidates.length > 0 ? (
                      <div className="space-y-2">
                        {stage.candidates.map((candidate) => (
                          <div 
                            key={candidate.id} 
                            className="bg-gray-50 rounded-xl border border-gray-200 p-4 hover:bg-white hover:shadow-md transition-all cursor-pointer"
                          >
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex items-center gap-3">
                                <div className={`w-10 h-10 ${candidate.avatarColor} rounded-xl flex items-center justify-center text-white font-bold`}>
                                  {getInitials(candidate.name)}
                                </div>
                                <div>
                                  <h4 className="font-bold text-gray-900">{candidate.name}</h4>
                                  <div className="flex items-center gap-1 mt-1">
                                    {renderStars(candidate.rating)}
                                  </div>
                                </div>
                              </div>
                              <button className="p-1 hover:bg-gray-100 rounded-lg">
                                <MoreVertical className="h-4 w-4 text-gray-600" />
                              </button>
                            </div>

                            <div className="space-y-2">
                              <div className="flex items-center gap-2 text-sm">
                                <Mail className="h-3 w-3 text-gray-400" />
                                <span className="text-gray-600 truncate">{candidate.email}</span>
                              </div>
                              <div className="flex items-center gap-2 text-sm">
                                <Briefcase className="h-3 w-3 text-gray-400" />
                                <span className="text-gray-600 truncate">{candidate.position}</span>
                              </div>
                              <div className="flex items-center gap-2 text-sm">
                                <Phone className="h-3 w-3 text-gray-400" />
                                <span className="text-gray-600">{candidate.contact}</span>
                              </div>
                            </div>

                            <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
                              <span className={`text-xs px-2 py-1 rounded-full ${
                                candidate.status === 'active' ? 'bg-green-100 text-green-800' :
                                'bg-yellow-100 text-yellow-800'
                              }`}>
                                {candidate.status}
                              </span>
                              <span className="text-xs text-gray-500">{candidate.lastActive}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center py-12 text-gray-400">
                        <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mb-4">
                          <User className="h-8 w-8" />
                        </div>
                        <p className="text-sm">No candidates in this stage</p>
                        <button className={`mt-3 px-3 py-1.5 text-sm ${getButtonGradient()} ${getButtonHover()} text-white rounded-lg flex items-center gap-1`}>
                          <Plus className="h-3 w-3" /> Add Candidate
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Stage Footer */}
                  {stage.candidates.length > 0 && (
                    <div className="p-3 border-t border-gray-200 bg-gray-50">
                      <button className={`w-full px-4 py-2 ${getButtonGradient()} ${getButtonHover()} text-white text-sm font-medium rounded-lg flex items-center justify-center gap-2`}>
                        <Plus className="h-4 w-4" /> Add to {stage.name}
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* LIST VIEW */
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200/50 overflow-hidden">
            <div className={`${getLightBg()} border-b border-gray-200`}>
              <div className="flex items-center justify-between p-6">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">All Candidates</h3>
                  <p className="text-sm text-gray-500 mt-1">{current.totalCandidates} candidates found</p>
                </div>
                
                <div className="flex items-center gap-3">
                  <button className="p-2 hover:bg-gray-100 rounded-xl">
                    <Download className="h-5 w-5 text-gray-600" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-xl">
                    <MoreVertical className="h-5 w-5 text-gray-600" />
                  </button>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Candidate</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Position</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Stage</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Experience</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Location</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Rating</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {current.stages.flatMap((stage, stageIndex) => 
                    stage.candidates.map((candidate) => (
                      <tr key={candidate.id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 ${candidate.avatarColor} rounded-xl flex items-center justify-center`}>
                              <span className="text-white font-medium">{getInitials(candidate.name)}</span>
                            </div>
                            <div className="text-left">
                              <p className="font-medium text-gray-900">{candidate.name}</p>
                              <p className="text-sm text-gray-500">{candidate.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">{candidate.position}</td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium ${
                            stageIndex === 0 ? 'bg-yellow-100 text-yellow-800' :
                            stageIndex === 1 ? 'bg-purple-100 text-purple-800' :
                            stageIndex === 2 ? 'bg-indigo-100 text-indigo-800' :
                            stageIndex === 3 ? 'bg-green-100 text-green-800' :
                            'bg-blue-100 text-blue-800'
                          }`}>
                            {stage.name}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700">{candidate.experience}</td>
                        <td className="px-6 py-4 text-sm text-gray-700">{candidate.location}</td>
                        <td className="px-6 py-4">
                          <div className="flex gap-0.5">
                            {renderStars(candidate.rating)}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <button className="p-1.5 hover:bg-blue-50 rounded-lg text-blue-600">
                              <Eye className="h-4 w-4" />
                            </button>
                            <button className="p-1.5 hover:bg-gray-100 rounded-lg">
                              <Edit2 className="h-4 w-4 text-gray-600" />
                            </button>
                            <button className="p-1.5 hover:bg-gray-100 rounded-lg">
                              <Trash2 className="h-4 w-4 text-gray-600" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
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
        group
      `}>
        {/* Red dot */}
        <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full border-4 border-white flex items-center justify-center">
          <span className="text-xs font-bold text-white">3</span>
        </div>
        
        <Plus className="h-8 w-8" />
        
        {/* Pulsing effect */}
        <div className="absolute inset-0 rounded-2xl ring-4 ring-white/10 animate-ping opacity-20" />
      </button>

      {/* Quick Stats */}
      <div className="fixed bottom-8 left-8 z-40 bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-4 border border-gray-200/50 hidden lg:block">
        <div className="flex items-center gap-3 mb-3">
          <div className={`p-2 ${getLightBg()} rounded-xl`}>
            <Zap className={`h-5 w-5 ${getTextAccent()}`} />
          </div>
          <div>
            <h3 className="font-bold text-gray-900">Pipeline Stats</h3>
            <p className="text-xs text-gray-500">{current.totalCandidates} candidates in pipeline</p>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Conversion Rate</span>
            <span className="font-medium text-gray-900">{current.conversionRate}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Avg Time to Hire</span>
            <span className="font-medium text-gray-900">18 days</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Active Stages</span>
            <span className="font-medium text-gray-900">{current.stages.length}</span>
          </div>
        </div>
      </div>
    </div>
  );
}