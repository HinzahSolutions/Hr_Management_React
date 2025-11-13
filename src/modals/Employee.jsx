'use client';

import React, { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  Plus,
  MoreVertical,
  Mail,
  Phone,
  Badge,
  Briefcase,
  CheckSquare,
  Square,
  Star,
  X,
} from 'lucide-react';

/* ========================================
   MOCK DATA – Replace with API later
   ======================================== */
const mockEmployees = [
  {
    id: 1,
    name: 'ARJIT Chaudhary',
    code: 'arjit98800-',
    email: 'arjit988@gmail.com',
    phone: '9889889785',
    badgeId: 'arjit98800-',
    position: 'Django Dev (S/W Dept)',
    status: 'offline',
    avatar: true,
  },
  {
    id: 2,
    name: 'ARYAN AWATHI',
    code: 'ANN123',
    email: 'kvedium5@gmail.com',
    phone: '8985957754',
    badgeId: 'ANN123',
    position: 'None',
    status: 'offline',
  },
  {
    id: 3,
    name: 'Abigail Roberts',
    code: 'PEP15',
    email: 'abigail.roberts@horilla.com',
    phone: '9876540015',
    badgeId: 'PEP15',
    position: 'Senior Manager (Managers)',
    status: 'offline',
    avatar: false,
    highlight: true,
  },
  {
    id: 4,
    name: 'Alexander Smith',
    code: 'PEP16',
    email: 'alexander.smith@horilla.com',
    phone: '9876540016',
    badgeId: 'PEP16',
    position: 'Sales Man (Sales Dept)',
    status: 'offline',
  },
  {
    id: 5,
    name: 'Amelia Cooper',
    code: 'PEP25',
    email: 'amelia.cooper@horilla.com',
    phone: '9876540025',
    badgeId: 'PEP25',
    position: 'Recruiter (HR Dept)',
    status: 'online',
    star: true,
  },
  {
    id: 6,
    name: 'Asif Ahmad',
    code: 'PEP1079',
    email: 'asif@gmail.com',
    phone: '732893831',
    badgeId: 'PEP1079',
    position: 'Sales Man (Sales Dept)',
    status: 'offline',
  },
  {
    id: 7,
    name: 'Ava Mitchell',
    code: 'None',
    email: 'ava.mitchell@horilla.com',
    phone: '9876540102',
    badgeId: 'None',
    position: 'Odoo Dev (S/W Dept)',
    status: 'offline',
  },
];

/* ========================================
   MAIN COMPONENT
   ======================================== */
export default function Employee() {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  /* ----------------- Search Filter ----------------- */
  const filtered = useMemo(() => {
    const term = search.toLowerCase();
    return mockEmployees.filter(
      (emp) =>
        emp.name.toLowerCase().includes(term) ||
        emp.email.toLowerCase().includes(term) ||
        emp.position.toLowerCase().includes(term) ||
        emp.badgeId.toLowerCase().includes(term)
    );
  }, [search]);

  /* ----------------- Select All ----------------- */
  const toggleSelectAll = () => {
    if (selected.length === filtered.length && filtered.length > 0) {
      setSelected([]);
    } else {
      setSelected(filtered.map((e) => e.id));
    }
  };

  const toggleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  return (
    <>
      {/* ====================== HEADER ====================== */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-2xl font-bold text-gray-900">Employees</h1>

          <div className="flex items-center gap-3 flex-1 sm:max-w-md">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Filter className="h-5 w-5 text-gray-600" />
            </button>

            {/* Create Button */}
            <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2">
              <Plus className="h-5 w-5" />
              Create
            </button>
          </div>
        </div>

        {/* ====================== FILTERS PANEL ====================== */}
        {showFilters && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg space-y-3">
            <input placeholder="Search Reporting Manager for: s" className="w-full px-3 py-2 border rounded-md" />
            <input placeholder="Search Department for: s" className="w-full px-3 py-2 border rounded-md" />
            <input placeholder="Search Job Position for: s" className="w-full px-3 py-2 border rounded-md" />
            <input placeholder="Search Job Role for: s" className="w-full px-3 py-2 border rounded-md" />
            <input placeholder="Search Shift for: s" className="w-full px-3 py-2 border rounded-md" />
            <input placeholder="Search Work Type for: s" className="w-full px-3 py-2 border rounded-md" />
            <input placeholder="Search Company for: s" className="w-full px-3 py-2 border rounded-md" />
            <div className="flex justify-end gap-2">
              <button className="px-4 py-1.5 bg-orange-500 text-white rounded-full text-sm">Filters: 1</button>
              <button className="px-4 py-1.5 bg-orange-100 text-orange-700 rounded-full text-sm">Search: s</button>
              <button className="p-1.5 text-gray-500 hover:bg-gray-200 rounded-full">
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ====================== STATUS LEGEND ====================== */}
      <div className="px-6 py-3 flex items-center gap-6 text-sm">
        <span className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          Online
        </span>
        <span className="flex items-center gap-2">
          <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
          Offline
        </span>
      </div>

      {/* ====================== SELECT ALL ====================== */}
      <div className="px-6 pb-2">
        <label className="flex items-center gap-2 cursor-pointer select-none">
          <button onClick={toggleSelectAll} className="text-green-600 hover:text-green-700">
            {selected.length === filtered.length && filtered.length > 0 ? (
              <CheckSquare className="h-5 w-5" />
            ) : (
              <Square className="h-5 w-5" />
            )}
          </button>
          <span className="text-sm font-medium text-green-600">Select All Employees</span>
        </label>
      </div>

      {/* ====================== DESKTOP TABLE ====================== */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Badge Id</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Job Position</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filtered.map((emp) => (
              <tr key={emp.id} className={`${emp.highlight ? 'bg-yellow-50' : ''} hover:bg-gray-50`}>
                <td className="px-6 py-4">
                  <input
                    type="checkbox"
                    checked={selected.includes(emp.id)}
                    onChange={() => toggleSelect(emp.id)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      {emp.avatar ? (
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-medium">
                          {emp.name.split(' ').map((n) => n[0]).join('')}
                        </div>
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 font-medium">
                          {emp.name.split(' ').map((n) => n[0]).join('')}
                        </div>
                      )}
                      {emp.star && (
                        <div className="absolute -top-1 -right-1 bg-blue-500 text-white rounded-full p-0.5">
                          <Star className="h-3 w-3" />
                        </div>
                      )}
                      <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${emp.status === 'online' ? 'bg-green-500' : 'bg-gray-400'}`} />
                    </div>

                    <div>
                      <div className="text-sm font-medium text-gray-900">{emp.name}</div>
                      <div className="text-sm text-gray-500">{emp.code}</div>
                    </div>
                  </div>
                </td>

                <td className="px-6 py-4 text-sm text-gray-900">{emp.email}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{emp.phone}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{emp.badgeId}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{emp.position}</td>

                <td className="px-6 py-4 text-sm font-medium">
                  <div className="flex items-center gap-1">
                    <button className="p-1.5 hover:bg-gray-100 rounded"><Mail className="h-4 w-4" /></button>
                    <button className="p-1.5 hover:bg-gray-100 rounded"><Phone className="h-4 w-4" /></button>
                    <button className="p-1.5 hover:bg-gray-100 rounded"><Badge className="h-4 w-4" /></button>
                    <button className="p-1.5 hover:bg-gray-100 rounded"><Briefcase className="h-4 w-4" /></button>
                    <button className="p-1.5 hover:bg-gray-100 rounded"><MoreVertical className="h-4 w-4" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ====================== MOBILE CARDS ====================== */}
      <div className="lg:hidden px-6 pb-20 space-y-4">
        {filtered.map((emp) => (
          <div
            key={emp.id}
            className={`p-4 rounded-lg border ${emp.highlight ? 'bg-yellow-50 border-yellow-200' : 'bg-white border-gray-200'} shadow-sm`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={selected.includes(emp.id)}
                  onChange={() => toggleSelect(emp.id)}
                  className="mt-1 rounded border-gray-300 text-blue-600"
                />
                <div className="flex items-center gap-3">
                  <div className="relative">
                    {emp.avatar ? (
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-medium">
                        {emp.name.split(' ').map((n) => n[0]).join('')}
                      </div>
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 font-medium text-sm">
                        {emp.name.split(' ').map((n) => n[0]).join('')}
                      </div>
                    )}
                    {emp.star && (
                      <div className="absolute -top-1 -right-1 bg-blue-500 text-white rounded-full p-0.5">
                        <Star className="h-3 w-3" />
                      </div>
                    )}
                    <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${emp.status === 'online' ? 'bg-green-500' : 'bg-gray-400'}`} />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{emp.name}</div>
                    <div className="text-sm text-gray-500">{emp.code}</div>
                  </div>
                </div>
              </div>
              <button className="p-1 hover:bg-gray-100 rounded">
                <MoreVertical className="h-5 w-5 text-gray-500" />
              </button>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
              <div>
                <div className="text-gray-500">Email</div>
                <div className="font-medium">{emp.email}</div>
              </div>
              <div>
                <div className="text-gray-500">Phone</div>
                <div className="font-medium">{emp.phone}</div>
              </div>
              <div>
                <div className="text-gray-500">Badge ID</div>
                <div className="font-medium">{emp.badgeId}</div>
              </div>
              <div>
                <div className="text-gray-500">Position</div>
                <div className="font-medium">{emp.position}</div>
              </div>
            </div>

            <div className="mt-3 flex justify-end gap-2">
              <button className="p-2 hover:bg-gray-100 rounded"><Mail className="h-4 w-4" /></button>
              <button className="p-2 hover:bg-gray-100 rounded"><Phone className="h-4 w-4" /></button>
              <button className="p-2 hover:bg-gray-100 rounded"><Badge className="h-4 w-4" /></button>
            </div>
          </div>
        ))}
      </div>

      {/* ====================== FAB BUTTON ====================== */}
      <button className="fixed bottom-6 right-6 w-14 h-14 bg-red-600 text-white rounded-full shadow-lg hover:bg-red-700 transition-all flex items-center justify-center z-10">
        <Plus className="h-6 w-6" />
      </button>
    </>
  );
}