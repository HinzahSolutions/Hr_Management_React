'use client';

import React, { useState } from 'react';
import {
  Search,
  Filter,
  ChevronDown,
  Plus,
  Circle,
  ToggleLeft,
  ToggleRight,MoreVertical
} from 'lucide-react';

const devices = [
  {
    id: 1,
    name: 'test',
    type: 'e-Time Office System Direction(In/Out) Device',
    url: 'https://api.etimeoffice.com/api/',
    status: 'live',
    ip: '',
    port: '',
    toggle: false,
    buttons: ['Test', 'Schedule', 'Employee'],
  },
  {
    id: 2,
    name: 'Divice ol',
    type: 'ZKTeco / eSSL Biometric In Device',
    url: '',
    ip: '192.168.1.171',
    port: '4370',
    status: 'scheduled',
    toggle: true,
    buttons: ['Test', 'Schedule', 'Employee'],
  },
  {
    id: 3,
    name: 'test',
    type: 'ZKTeco / eSSL Biometric System Direction(In/Out) Device',
    url: '',
    ip: '10.77.2.200',
    port: '4370',
    status: 'not-connected',
    toggle: false,
    buttons: ['Test', 'Schedule', 'Employee'],
  },
];

const getStatusColor = (status) => {
  if (status === 'live') return 'text-orange-600';
  if (status === 'scheduled') return 'text-blue-600';
  return 'text-red-600';
};

const getStatusDot = (status) => {
  if (status === 'live') return 'bg-orange-500';
  if (status === 'scheduled') return 'bg-blue-500';
  return 'bg-red-500';
};

export default function BiometricDevices() {
  const [deviceList, setDeviceList] = useState(devices);
  const [toggles, setToggles] = useState(
    devices.reduce((acc, d) => ({ ...acc, [d.id]: d.toggle }), {})
  );

  const handleToggle = (id) => {
    setToggles((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <>
      {/* ====================== PAGE HEADER ====================== */}
      <div className="bg-white border-b border-gray-200 px-4 sm:px-6 py-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-2xl font-bold text-gray-900">Biometric Devices</h1>
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
              + Add
            </button>
          </div>
        </div>

        {/* Status Legend */}
        <div className="flex items-center gap-6 mt-4 text-sm">
          <span className="flex items-center gap-2">
            <Circle className={`h-3 w-3 fill-current ${getStatusDot('live')}`} />
            Live Capture
          </span>
          <span className="flex items-center gap-2">
            <Circle className={`h-3 w-3 fill-current ${getStatusDot('scheduled')}`} />
            Scheduled
          </span>
          <span className="flex items-center gap-2">
            <Circle className={`h-3 w-3 fill-current ${getStatusDot('not-connected')}`} />
            Not-Connected
          </span>
        </div>
      </div>

      {/* ====================== CONTENT ====================== */}
      <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {deviceList.map((device) => (
              <div
                key={device.id}
                className={`bg-white rounded-lg shadow-sm p-6 border-l-4 ${
                  device.status === 'live'
                    ? 'border-orange-500'
                    : device.status === 'scheduled'
                    ? 'border-blue-500'
                    : 'border-red-500'
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{device.name}</h3>
                    <p className="text-sm text-gray-600 mt-1">{device.type}</p>
                    {device.url && (
                      <p className="text-xs text-blue-600 mt-2 break-all">{device.url}</p>
                    )}
                    {device.ip && (
                      <p className="text-sm text-gray-700 mt-2">
                        {device.ip}:{device.port}
                      </p>
                    )}
                  </div>
                  <button className="text-gray-400 hover:text-gray-600">
                    <MoreVertical className="h-5 w-5" />
                  </button>
                </div>

                {/* Toggle */}
                {device.ip && (
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-gray-700">Activate live capture mode</span>
                    <button
                      onClick={() => handleToggle(device.id)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        toggles[device.id] ? 'bg-blue-600' : 'bg-gray-300'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          toggles[device.id] ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center gap-2">
                  {device.buttons.map((btn) => (
                    <button
                      key={btn}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                        btn === 'Test'
                          ? 'bg-green-100 text-green-700 hover:bg-green-200'
                          : btn === 'Schedule'
                          ? 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {btn}
                    </button>
                  ))}
                  <input type="checkbox" className="rounded border-gray-300 text-red-600" />
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-8 text-sm text-gray-600">
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