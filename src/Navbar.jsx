import React, { useEffect, useRef, useState } from 'react';
import { useAuth } from './AuthContext';
import {
  FaBell,
  FaGlobe,
  FaUserCircle,
  FaCog,
  FaSignOutAlt,
  FaBars,
} from 'react-icons/fa';

const Navbar = ({
  title = 'HINZAH',
  showCheckIn = true,
  checkInText = 'Check-In',
  userName = 'Mona',
  notifications = 3,
  onCheckIn = () => console.log('Checked in!'),
  onToggleSidebar = () => {},
  onLogout
}) => {
  const [profileOpen, setProfileOpen] = useState(false);
  const [rightMenuOpen, setRightMenuOpen] = useState(false);
  const profileRef = useRef(null);
  const rightMenuRef = useRef(null);

  const { user } = useAuth();

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        profileRef.current && !profileRef.current.contains(e.target) &&
        rightMenuRef.current && !rightMenuRef.current.contains(e.target)
      ) {
        setProfileOpen(false);
        setRightMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-40 flex h-16 items-center justify-between bg-white px-4 shadow-sm md:px-6">
      {/* LEFT: Logo + Mobile Menu Toggle */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="lg:hidden text-gray-600 hover:text-gray-900"
          aria-label="Toggle sidebar"
        >
          <FaBars className="h-6 w-6" />
        </button>

       
      </div>

      {/* CENTER: Check-In Button */}
      <div className="flex flex-1 justify-center">
        {/* {showCheckIn && (
          <button
            onClick={onCheckIn}
            className="flex items-center gap-2 rounded-lg bg-green-100 px-4 py-1.5 text-sm font-medium text-green-700 transition-colors hover:bg-green-200"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            {checkInText}
          </button>
        )} */}
      </div>

      {/* RIGHT: Icons + User */}
      <div className="flex items-center gap-2 md:gap-4">
        {/* Settings */}
        <button className="hidden text-gray-600 hover:text-gray-900 md:block">
          <FaCog className="h-5 w-5" />
        </button>

        {/* Notifications */}
        <button className="relative hidden text-gray-600 hover:text-gray-900 md:block">
          <FaBell className="h-5 w-5" />
          {notifications > 0 && (
            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">
              {notifications}
            </span>
          )}
        </button>

        {/* Language */}
        <button className="hidden text-gray-600 hover:text-gray-900 md:block">
          <FaGlobe className="h-5 w-5" />
        </button>

        {/* User Profile */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-2 text-gray-700 hover:text-gray-900"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-300 text-sm font-bold text-gray-700">
              {userName[0]}
            </div>
            <span className="hidden text-sm font-medium md:block">{userName}</span>
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* Profile Dropdown */}
          {profileOpen && (
            <div className="absolute right-0 z-50 mt-2 w-48 rounded-lg border border-gray-200 bg-white py-2 shadow-lg">
              <a href="/employee/profile" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                <FaUserCircle className="h-4 w-4" /> My Profile
              </a>
              <a href="/change-username" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                Change Username
              </a>
              <a href="/change-password" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                Change Password
              </a>
              <hr className="my-1 border-gray-200" />
              <a  onClick={onLogout} className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                <FaSignOutAlt className="h-4 w-4" /> Logout
              </a>
            </div>
          )}
        </div>

        {/* Mobile: Three-dot menu */}
        <div className="relative md:hidden" ref={rightMenuRef}>
          <button
            onClick={() => setRightMenuOpen(!rightMenuOpen)}
            className="text-gray-600 hover:text-gray-900"
            aria-label="More actions"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
            </svg>
          </button>

          {rightMenuOpen && (
            <div className="absolute right-0 z-50 mt-2 w-48 rounded-lg border border-gray-200 bg-white py-2 shadow-lg">
              <button className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50">
                <FaCog className="h-4 w-4" /> Settings
              </button>

              <button className="relative flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50">
                <FaBell className="h-4 w-4" />
                Notifications
                {notifications > 0 && (
                  <span className="ml-auto flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                    {notifications}
                  </span>
                )}
              </button>

              <button className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50">
                <FaGlobe className="h-4 w-4" /> Language
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;