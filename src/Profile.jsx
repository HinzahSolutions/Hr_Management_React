'use client';

import React, { useState } from 'react';
import {
  Calendar, User, MapPin, Globe, Home, Building, Briefcase, Clock, Users, DollarSign,
  Edit2, Plus, GraduationCap, Heart, Baby, Phone, AlertCircle, Tag, FileText, Landmark,
  Mail, Check, X, Download, Eye, Trash2, RotateCw, AlertTriangle, Award, FileCheck,
} from 'lucide-react';

const tabs = [
  'About',
  'Work Type & Shift',
  'Attendance',
  'Leave',
  'Payroll',
  'Allowance & Deduction',
  'Penalty Account',
  'Performance',
  'Documents',
];

const innerTabs = {
  'Work Type & Shift': ['Bonus Points', 'Scheduled Interview', 'Resignation'],
};

export default function Profile() {
  const [activeTab, setActiveTab] = useState('About');
  const [activeInnerTab, setActiveInnerTab] = useState('Bonus Points');

  const employee = {
    name: 'Surya Jena',
    code: 'PEP00',
    workEmail: 'thegaming060@gmail.com',
    personalEmail: 'thegaming060@gmail.com',
    workPhone: '8545875968',
    personalPhone: '8659784581',
    avatar: false,
    online: false,
  };

  return (
    <>
      {/* ====================== HEADER ====================== */}
      <div className="bg-white border-b border-gray-200 px-4 sm:px-6 py-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 text-lg sm:text-xl font-medium">
                {employee.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div className={`absolute bottom-0 right-0 w-3 h-3 sm:w-4 sm:h-4 rounded-full border-2 border-white ${employee.online ? 'bg-green-500' : 'bg-gray-400'}`} />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                {employee.name} <span className="text-base sm:text-lg font-medium text-gray-500">({employee.code})</span>
              </h1>
            </div>
          </div>
          <div className="flex flex-wrap gap-3 text-xs sm:text-sm text-gray-600">
            <div className="flex items-center gap-1.5"><Mail className="h-3.5 w-3.5 sm:h-4 sm:w-4" /><span className="font-medium">Work Email:</span> {employee.workEmail}</div>
            <div className="flex items-center gap-1.5"><Mail className="h-3.5 w-3.5 sm:h-4 sm:w-4" /><span className="font-medium">Email:</span> {employee.personalEmail}</div>
            <div className="flex items-center gap-1.5"><Phone className="h-3.5 w-3.5 sm:h-4 sm:w-4" /><span className="font-medium">Work Phone:</span> {employee.workPhone}</div>
            <div className="flex items-center gap-1.5"><Phone className="h-3.5 w-3.5 sm:h-4 sm:w-4" /><span className="font-medium">Phone:</span> {employee.personalPhone}</div>
          </div>
        </div>
      </div>

      {/* ====================== MAIN TABS ====================== */}
      <div className="border-b border-gray-200 px-4 sm:px-6">
        <nav className="flex flex-wrap gap-3 sm:gap-6 text-sm font-medium overflow-x-auto">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-3 border-b-2 whitespace-nowrap transition-colors ${
                activeTab === tab
                  ? 'border-red-600 text-red-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>

      {/* ====================== INNER TABS ====================== */}
      {activeTab === 'Work Type & Shift' && (
        <div className="bg-gray-50 border-b border-gray-200 px-4 sm:px-6 py-3">
          <nav className="flex gap-4 sm:gap-6 text-sm font-medium">
            {innerTabs['Work Type & Shift'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveInnerTab(tab)}
                className={`py-2 border-b-2 transition-colors ${
                  activeInnerTab === tab
                    ? 'border-red-600 text-red-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>
      )}

      {/* ====================== CONTENT ====================== */}
      <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">

        {/* ABOUT */}
        {activeTab === 'About' && <AboutTab />}

        {/* WORK TYPE & SHIFT */}
        {activeTab === 'Work Type & Shift' && activeInnerTab === 'Bonus Points' && <BonusPointsTab />}
        {activeTab === 'Work Type & Shift' && activeInnerTab === 'Scheduled Interview' && <ScheduledInterviewTab />}
        {activeTab === 'Work Type & Shift' && activeInnerTab === 'Resignation' && <ResignationTab />}

        {/* ATTENDANCE */}
        {activeTab === 'Attendance' && <AttendanceTab />}

        {/* LEAVE */}
        {activeTab === 'Leave' && <LeaveTab />}

        {/* PAYROLL */}
        {activeTab === 'Payroll' && <PayrollTab />}

        {/* ALLOWANCE & DEDUCTION */}
        {activeTab === 'Allowance & Deduction' && <AllowanceDeductionTab />}

        {/* PENALTY ACCOUNT */}
        {activeTab === 'Penalty Account' && <PenaltyAccountTab />}

        {/* PERFORMANCE */}
        {activeTab === 'Performance' && <PerformanceTab />}

        {/* DOCUMENTS */}
        {activeTab === 'Documents' && <DocumentsTab />}
      </div>

      {/* FAB */}
      <button className="fixed bottom-5 right-5 w-12 h-12 sm:w-14 sm:h-14 bg-red-600 text-white rounded-full shadow-lg hover:bg-red-700 flex items-center justify-center z-10">
        <Plus className="h-5 w-5 sm:h-6 sm:w-6" />
      </button>
    </>
  );
}

/* ====================== TAB COMPONENTS ====================== */

function AboutTab() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      {/* Personal Info */}
      <div className="bg-white rounded-lg shadow-sm p-4 sm:p-5">
        <SectionHeader title="Personal Information" />
        <div className="space-y-3 text-xs sm:text-sm">
          <InfoRow icon={<Calendar className="h-4 w-4" />} label="Date of Birth" value="10 Oct" />
          <InfoRow icon={<User className="h-4 w-4" />} label="Gender" value="Male" />
          <InfoRow icon={<MapPin className="h-4 w-4" />} label="Address" value="Delhi" />
          <InfoRow icon={<Globe className="h-4 w-4" />} label="Country" value="India" />
          <InfoRow icon={<Home className="h-4 w-4" />} label="State" value="Odisha" />
          <InfoRow icon={<Building className="h-4 w-4" />} label="City" value="Bhubaneswar" />
          <InfoRow icon={<GraduationCap className="h-4 w-4" />} label="Qualification" value="MBA" />
          <InfoRow icon={<Briefcase className="h-4 w-4" />} label="Experience" value="None" />
          <InfoRow icon={<Heart className="h-4 w-4" />} label="Marital Status" value="Single" />
          <InfoRow icon={<Baby className="h-4 w-4" />} label="Children" value="None" />
          <InfoRow icon={<Phone className="h-4 w-4" />} label="Emergency Contact Name" value="65598425478" />
          <InfoRow icon={<Users className="h-4 w-4" />} label="Emergency Contact Relation" value="Me only" />
        </div>
      </div>

      {/* Work Info */}
      <div className="bg-white rounded-lg shadow-sm p-4 sm:p-5">
        <SectionHeader title="Work Information" />
        <div className="space-y-3 text-xs sm:text-sm">
          <InfoRow icon={<Briefcase className="h-4 w-4" />} label="Department" value="Hr Dept" />
          <InfoRow icon={<Briefcase className="h-4 w-4" />} label="Job Position" value="Recruiter - (Hr Dept)" />
          <InfoRow icon={<Clock className="h-4 w-4" />} label="Shift Information" value="Night Shift" />
          <InfoRow icon={<Users className="h-4 w-4" />} label="Employee Type" value="Permanent" />
          <InfoRow icon={<Users className="h-4 w-4" />} label="Reporting Manager" value="Ava Mitchell" />
          <InfoRow icon={<MapPin className="h-4 w-4" />} label="Work Location" value="India" />
          <InfoRow icon={<Calendar className="h-4 w-4" />} label="End Date" value="22 May, 2026" />
        </div>
      </div>

      {/* Contract + Bank + Tags */}
      <div className="bg-white rounded-lg shadow-sm p-4 sm:p-5 space-y-5">
        <div>
          <SectionHeader title="Contract Details" />
          <div className="space-y-3 text-xs sm:text-sm">
            <InfoRow icon={<Briefcase className="h-4 w-4" />} label="Work Type" value="Work From Home" />
            <InfoRow icon={<DollarSign className="h-4 w-4" />} label="Salary" value="18000" />
            <InfoRow icon={<Building className="h-4 w-4" />} label="Company" value="Horilla" />
            <InfoRow icon={<Calendar className="h-4 w-4" />} label="Joining Date" value="10 November, 2025" />
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">AI Team</span>
        </div>
        <div>
          <SectionHeader title="Bank Information" />
          <div className="space-y-3 text-xs sm:text-sm">
            <InfoRow icon={<Landmark className="h-4 w-4" />} label="Bank Name" value="Axis" />
            <InfoRow icon={<FileText className="h-4 w-4" />} label="Account Number" value="627288262892" />
            <InfoRow icon={<MapPin className="h-4 w-4" />} label="Branch" value="Valady" />
            <InfoRow icon={<Tag className="h-4 w-4" />} label="Bank Code #1" value="IDIB000VOO5" />
            <InfoRow icon={<MapPin className="h-4 w-4" />} label="Bank Address" value="44 Venkatesh Nagar, Opposite Sivan Temple, Valady, Lalugudi Taluk" />
            <InfoRow icon={<Globe className="h-4 w-4" />} label="Country" value="India" />
          </div>
        </div>
      </div>
    </div>
  );
}

function BonusPointsTab() {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">Current Shift: Night Shift</h3>
        <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm flex items-center gap-2">
          + Reallocate Shift
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {['Work type request', 'Rotating work type', 'Shift request', 'Rotating Shift'].map(item => (
          <div key={item} className="flex justify-between p-3 bg-gray-50 rounded-lg">
            <span className="text-sm">{item}</span>
            <button className="text-red-600"><Plus className="h-5 w-5" /></button>
          </div>
        ))}
      </div>
      <Table headers={['Employee', 'Title', 'Based On', 'Rotate', 'Start Date', 'Current Shift']} data={[
        ['Surya Jena (PEP00)', 'Morning to Night', 'Weekend', 'Weekly everysaturday', '10 November, 2025', 'Regular Shift']
      ]} />
    </div>
  );
}

function ScheduledInterviewTab() {
  return <EmptyTab title="Scheduled Interview" message="No interviews scheduled." />;
}
function ResignationTab() {
  return <EmptyTab title="Resignation" message="No resignation requests." />;
}
function AttendanceTab() {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-end mb-4"><button className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm">+ Create</button></div>
      <Table headers={['Employee', 'Date', 'Day', 'Check-In', 'In Date', 'Check-Out', 'Out Date']} data={[
        ['Surya Jena (PEP00)', '10 November, 2025', 'Monday', '10:23 p.m.', '10 November, 2025', '10:23 p.m.', '10 November, 2025'],
        ['Surya Jena (PEP00)', '08 November, 2025', 'Saturday', '8:40 a.m.', '08 November, 2025', '10:25 p.m.', '08 November, 2025'],
      ]} />
    </div>
  );
}
function LeaveTab() {
  return <EmptyTab title="Leave" message="No leave requests." />;
}
function PayrollTab() {
  return <EmptyTab title="Payroll" message="Payroll data will appear here." />;
}
function AllowanceDeductionTab() {
  return <EmptyTab title="Allowance & Deduction" message="No allowances or deductions." />;
}
function PenaltyAccountTab() {
  return <EmptyTab title="Penalty Account" message="No penalties recorded." />;
}
function PerformanceTab() {
  return <EmptyTab title="Performance" message="Performance reviews will appear here." />;
}
function DocumentsTab() {
  return <EmptyTab title="Documents" message="Upload and manage documents here." />;
}

/* ====================== HELPERS ====================== */
function SectionHeader({ title }) {
  return (
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-base sm:text-lg font-semibold text-gray-900">{title}</h3>
      <button className="p-1.5 hover:bg-gray-100 rounded"><Edit2 className="h-4 w-4 text-gray-500" /></button>
    </div>
  );
}

function InfoRow({ icon, label, value }) {
  return (
    <div className="flex items-start gap-2 text-gray-600">
      <div className="mt-0.5 text-gray-500">{icon}</div>
      <div className="flex-1">
        <span className="block font-medium text-gray-700">{label}</span>
        <span className="block text-gray-900">{value}</span>
      </div>
    </div>
  );
}

function Table({ headers, data }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="bg-gray-50 border-b">
          <tr>{headers.map(h => <th key={h} className="px-4 py-3 text-left font-medium text-gray-700">{h}</th>)}</tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i} className="border-b hover:bg-gray-50">
              {row.map((cell, j) => <td key={j} className="px-4 py-3">{cell}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function EmptyTab({ title, message }) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-10 text-center">
      <h3 className="text-lg font-semibold text-gray-700 mb-2">{title}</h3>
      <p className="text-gray-500">{message}</p>
    </div>
  );
}