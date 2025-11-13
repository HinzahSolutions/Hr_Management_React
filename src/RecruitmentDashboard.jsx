'use client';

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { UserCheck, Briefcase, Users, TrendingUp, CheckCircle } from 'lucide-react';

export default function RecruitmentDashboard() {
  // === KPI Data ===
  const kpiData = [
    { label: 'Total Vacancies', value: 159, color: 'border-orange-500', bg: 'bg-orange-50' },
    { label: 'Ongoing Recruitments', value: 14, color: 'border-red-500', bg: 'bg-red-50' },
    { label: 'Hired Candidates', value: 9, color: 'border-green-500', bg: 'bg-green-50' },
    { label: 'Conversion Rate', value: '25.0%', color: 'border-blue-500', bg: 'bg-blue-50' },
    { label: 'Offer Acceptance Rate (OAR)', value: '11.1%', color: 'border-green-600', bg: 'bg-green-50' },
  ];

  // === Skill Zone Status ===
  const skillZone = [
    { skill: 'DR Driver', count: 1, color: 'bg-orange-500' },
    { skill: 'CH Chief', count: 1, color: 'bg-green-500' },
    { skill: 'SU Supervisor', count: 0, color: 'bg-yellow-100' },
    { skill: 'EL Electrician', count: 0, color: 'bg-gray-400' },
    { skill: 'CA Calling Agent', count: 0, color: 'bg-blue-500' },
  ];

  // === Offer Letter Status (Pie Chart) ===
  const offerStatus = [
    { name: 'Not Sent', value: 60, color: '#9CA3AF' },
    { name: 'Sent', value: 20, color: '#FBBF24' },
    { name: 'Accepted', value: 10, color: '#3B82F6' },
    { name: 'Rejected', value: 5, color: '#EF4444' },
    { name: 'Joined', value: 5, color: '#10B981' },
  ];

  // === Onboard Candidates ===
  const onboardCandidates = [
    { name: 'Amelia Hayes', dept: 'Odoo Dev - (S/...', color: 'bg-teal-500' },
    { name: 'Ravi', dept: 'Odoo Dev - (S/...', color: 'bg-red-500' },
    { name: 'Emily Turner', dept: 'Odoo Dev - (S/...', color: 'bg-blue-500' },
  ];

  // === Joinings Per Month (Bar Chart) ===
  const joiningsData = [
    { month: 'Jan', count: 0 },
    { month: 'Feb', count: 0 },
    { month: 'Mar', count: 0 },
    { month: 'Apr', count: 0 },
    { month: 'May', count: 0 },
    { month: 'Jun', count: 0 },
    { month: 'Jul', count: 0 },
    { month: 'Aug', count: 2 },
    { month: 'Sep', count: 2 },
    { month: 'Oct', count: 3 },
    { month: 'Nov', count: 1 },
    { month: 'Dec', count: 0 },
  ];

  // === Current Hiring Pipeline (Table) ===
  const pipelineData = [
    { position: 'React Dev', initial: 0, test: 0 },
    { position: 'Flutter Dev', initial: 0, test: 0 },
    { position: 'Sales Representative', initial: 1, test: 0 },
    { position: 'Sales Manager', initial: 0, test: 0 },
    { position: 'Business Development Manager', initial: 0, test: 0 },
    { position: 'Field Sales Executive', initial: 0, test: 0 },
    { position: 'HR Manager', initial: 0, test: 0 },
    { position: 'HR Business Partner', initial: 0, test: 0 },
    { position: 'Senior Manager', initial: 0, test: 0 },
    { position: 'UI UX Expert', initial: 0, test: 0 },
    { position: 'UI UX - Mobile Developer', initial: 0, test: 0 },
  ];

  // === Candidates Per Stage (Horizontal Bar) ===
  const stageData = [
    { stage: 'Initial', count: 2 },
    { stage: 'Applied', count: 3 },
    { stage: 'Test', count: 1 },
    { stage: 'Interview', count: 2 },
    { stage: 'Cancelled', count: 1 },
    { stage: 'Hired', count: 6 },
  ];

  const stageColors = {
    'Recruitment Drive': '#3B82F6',
    'FutureForce Recruitment': '#F472B6',
    'mobile developer': '#F59E0B',
    'New Title up': '#E5E7EB',
    'engineer': '#10B981',
    'python': '#8B5CF6',
    'Recruitment_Marketing_Sales': '#06B6D4',
    'Marketing Associate': '#6366F1',
  };

  // === Ongoing Recruitments & Managers ===
  const ongoingRecruitments = [
    { recruitment: 'Recruitment Drive', managers: 'Abigail Roberts, Dev Prakash' },
    { recruitment: 'FutureForce Recruitment', managers: 'Alexander Smith' },
    { recruitment: 'mobile developer', managers: 'Amelia Cooper' },
    { recruitment: 'New Title up', managers: 'Noah Young' },
    { recruitment: 'engineer', managers: 'Sophia Chen' },
  ];

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* === KPI Cards === */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {kpiData.map((kpi, i) => (
          <div
            key={i}
            className={`p-4 rounded-lg border-l-4 ${kpi.color} ${kpi.bg} shadow-sm`}
          >
            <p className="text-xs text-gray-600">{kpi.label}</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{kpi.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* === Skill Zone Status === */}
        <div className="bg-white p-5 rounded-lg shadow-sm">
          <h3 className="text-sm font-semibold text-gray-800 mb-3">Skill Zone Status</h3>
          <div className="space-y-3">
            {skillZone.map((item, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`w-4 h-4 rounded-full ${item.color}`}></div>
                  <span className="text-sm text-gray-700">{item.skill}</span>
                </div>
                <span className="text-sm font-medium">{item.count} Candidate{item.count !== 1 ? 's' : ''}</span>
              </div>
            ))}
          </div>
        </div>

        {/* === Offer Letter Status === */}
        <div className="bg-white p-5 rounded-lg shadow-sm">
          <h3 className="text-sm font-semibold text-gray-800 mb-3">Candidate Offer Letter Status</h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={offerStatus}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={60}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {offerStatus.map((entry, i) => (
                    <Cell key={`cell-${i}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-3 space-y-1 text-xs">
            {offerStatus.map((item, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span>{item.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* === Onboard Candidates === */}
        <div className="bg-white p-5 rounded-lg shadow-sm">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-sm font-semibold text-gray-800">Candidate on Onboard</h3>
            <a href="#" className="text-xs text-orange-600 hover:underline">View</a>
          </div>
          <div className="space-y-3">
            {onboardCandidates.map((c, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full ${c.color} flex items-center justify-center text-white text-xs font-bold`}>
                  {c.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{c.name}</p>
                  <p className="text-xs text-gray-500">{c.dept}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* === Joinings Per Month === */}
        <div className="bg-white p-5 rounded-lg shadow-sm lg:col-span-1">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-sm font-semibold text-gray-800">Joinings Per Month</h3>
            <select className="text-xs border rounded px-2 py-1">
              <option>2025</option>
            </select>
          </div>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={joiningsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip />
                <Bar dataKey="count" fill="#F97316" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* === Current Hiring Pipeline === */}
      <div className="bg-white p-5 rounded-lg shadow-sm">
        <h3 className="text-sm font-semibold text-gray-800 mb-3">Current Hiring Pipeline</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2">Job Positions</th>
                <th className="text-center py-2">Initial</th>
                <th className="text-center py-2">Test</th>
              </tr>
            </thead>
            <tbody>
              {pipelineData.map((row, i) => (
                <tr key={i} className="border-b">
                  <td className="py-2">{row.position}</td>
                  <td className="text-center">{row.initial}</td>
                  <td className="text-center">{row.test}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* === My Onboarding Tasks === */}
        <div className="bg-white p-8 rounded-lg shadow-sm text-center">
          <div className="w-24 h-24 mx-auto mb-4">
            <svg viewBox="0 0 100 100" className="w-full h-full text-gray-400">
              <path d="M20 30h60v10H20zM20 50h40v10H20zM20 70h30v10H20z" fill="currentColor" opacity="0.3" />
              <rect x="65" y="25" width="20" height="50" rx="4" fill="currentColor" opacity="0.6" />
            </svg>
          </div>
          <p className="text-sm text-gray-600">No onboarding tasks are currently available.</p>
        </div>

        {/* === Candidates Per Stage === */}
        <div className="bg-white p-5 rounded-lg shadow-sm">
          <h3 className="text-sm font-semibold text-gray-800 mb-3">Candidates Per Stage</h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stageData} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" tick={{ fontSize: 10 }} />
                <YAxis dataKey="stage" type="category" tick={{ fontSize: 10 }} width={80} />
                <Tooltip />
                <Bar dataKey="count" fill="#3B82F6" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-3 flex flex-wrap gap-2 text-xs">
            {Object.entries(stageColors).map(([label, color]) => (
              <div key={label} className="flex items-center gap-1">
                <div className="w-3 h-3 rounded" style={{ backgroundColor: color }}></div>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* === Ongoing Recruitments & Hiring Managers === */}
      <div className="bg-white p-5 rounded-lg shadow-sm">
        <h3 className="text-sm font-semibold text-gray-800 mb-3">Ongoing Recruitments & Hiring Managers</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2">Recruitment</th>
                <th className="text-left py-2">Manager</th>
              </tr>
            </thead>
            <tbody>
              {ongoingRecruitments.map((row, i) => (
                <tr key={i} className="border-b">
                  <td className="py-2">{row.recruitment}</td>
                  <td className="py-2 text-gray-600">{row.managers}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}