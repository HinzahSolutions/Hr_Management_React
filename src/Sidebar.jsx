'use client';

import React, { useState } from 'react';
import {
  FaTachometerAlt,
  FaUserPlus,
  FaUserCheck,
  FaUsers,
  FaClock,
  FaCalendarTimes,
  FaMoneyBillWave,
  FaChartLine,
  FaSignOutAlt,
  FaBoxOpen,
  FaHeadset,
  FaProjectDiagram,
  FaCog,
  FaBars,
  FaTimes,
  FaChevronDown,
  FaChevronRight,
} from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';
import logoimage from './assets/logo.png'

const iconMap = {
  dashboard: <FaTachometerAlt />,
  recruitment: <FaUserPlus />,
  onboarding: <FaUserCheck />,
  employee: <FaUsers />,
  attendance: <FaClock />,
  leave: <FaCalendarTimes />,
  payroll: <FaMoneyBillWave />,
  performance: <FaChartLine />,
  offboarding: <FaSignOutAlt />,
  assets: <FaBoxOpen />,
  helpDesk: <FaHeadset />,
  project: <FaProjectDiagram />,
  configuration: <FaCog />,
};

export default function Sidebar({
  menuItems = [],
  logo = 'HRMS',
  company = 'Hinzah Solutions',
  userName = 'Mona',
  isCollapsed: controlledCollapsed,
  onToggleCollapse,
}) {
  const [openMenus, setOpenMenus] = useState({});
  const navigate = useNavigate();
  const location = useLocation();

  // Use controlled or uncontrolled collapse
  const isCollapsed = controlledCollapsed ?? false;

  const toggleMenu = (label) => {
    setOpenMenus((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  const isActive = (link) => {
    if (link === '/dashboard') return location.pathname === '/dashboard';
    return location.pathname.startsWith(link) && link !== '/';
  };

  const handleNavigate = (link) => (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(link);
  };

  return (
    <>
      {/* Sidebar */}
      <aside
        className={`
          fixed left-0 top-0 h-screen bg-gray-900 text-white flex flex-col
          transition-all duration-300 ease-in-out z-50 shadow-2xl
          ${isCollapsed ? 'w-20' : 'w-64'}
        `}
        style={{ overflow: 'visible' }} // Critical: Prevent clipping
      >
        {/* Header */}
        <div className="relative p-4 border-b border-gray-800 ">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center font-bold text-lg">
              <img className='w-[100%] h-[100%]' src=
              {logoimage} />
            </div>
            {!isCollapsed && (
              <div className="overflow-hidden">
                <h1 className="text-xl font-bold truncate">{logo}</h1>
                <p className="text-xs text-gray-400 truncate">{company}</p>
              </div>
            )}
          </div>

          {/* Toggle Button - Positioned outside to avoid clipping */}
          <button
            onClick={onToggleCollapse}
            className={`
              absolute top-1/2 -right-3 transform -translate-y-1/2
              w-7 h-7 bg-gray-700 rounded-full flex items-center justify-center
              hover:bg-gray-600 transition-all duration-200
              shadow-md border border-gray-600 z-10
            `}
            aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {isCollapsed ? (
              <FaBars className="w-4 h-4 text-white" />
            ) : (
              <FaTimes className="w-4 h-4 text-white" />
            )}
          </button>
        </div>

        {/* Menu */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900">
          <ul className="space-y-1">
            {menuItems.map((item) => {
              const hasSubmenu = item.submenu && item.submenu.length > 0;
              const isOpen = openMenus[item.label];
              const active = item.active || isActive(item.link);

              return (
                <li key={item.label}>
                  {/* Main Item */}
                  <div
                    onClick={() => hasSubmenu && toggleMenu(item.label)}
                    className={`
                      flex items-center justify-between px-3 py-2.5 rounded-lg cursor-pointer
                      transition-all duration-200 group
                      ${active ? 'bg-gray-700 text-white shadow-sm' : 'text-gray-300 hover:bg-gray-800 hover:text-white'}
                    `}
                  >
                    <button
                      onClick={handleNavigate(item.link)}
                      className="flex items-center gap-3 flex-1 text-left"
                      disabled={hasSubmenu}
                    >
                      <span className="w-6 flex justify-center">
                        {iconMap[item.icon] || <FaTachometerAlt className="w-5 h-5" />}
                      </span>
                      {!isCollapsed && (
                        <span className="text-sm font-medium truncate">{item.label}</span>
                      )}
                    </button>

                    {hasSubmenu && !isCollapsed && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleMenu(item.label);
                        }}
                        className="text-xs p-1 opacity-70 group-hover:opacity-100"
                      >
                        {isOpen ? <FaChevronDown /> : <FaChevronRight />}
                      </button>
                    )}
                  </div>

                  {/* Submenu */}
                  {hasSubmenu && isOpen && !isCollapsed && (
                    <ul className="ml-9 mt-1 space-y-1 border-l border-gray-700 pl-3">
                      {item.submenu.map((sub) => {
                        const subActive = sub.active || location.pathname === sub.link;

                        return (
                          <li key={sub.label}>
                            <button
                              onClick={handleNavigate(sub.link)}
                              className={`
                                block w-full text-left py-1.5 px-2 text-xs rounded transition-colors
                                ${subActive ? 'text-white font-medium bg-gray-700' : 'text-gray-400 hover:text-white hover:bg-gray-800'}
                              `}
                            >
                              {sub.label}
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        {/* User Profile */}
        {!isCollapsed && (
          <div className="p-4 border-t border-gray-800 flex-shrink-0">
            <div className="flex items-center gap-3 bg-gray-800 p-3 rounded-lg hover:bg-gray-700 transition-colors">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                {userName[0].toUpperCase()}
              </div>
              <div className="overflow-hidden">
                <p className="text-sm font-medium truncate">{userName}</p>
                <p className="text-xs text-gray-400">Admin</p>
              </div>
            </div>
          </div>
        )}
      </aside>

      {/* Overlay when collapsed (optional) */}
      {isCollapsed && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 hidden lg:block pointer-events-none" />
      )}
    </>
  );
}