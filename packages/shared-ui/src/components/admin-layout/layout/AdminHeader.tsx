/**
 * Admin Header Component
 * Dashboard header with menu toggle, search, notifications, and profile
 */

import React, { useState } from 'react';

export interface AdminHeaderProps {
  onMenuClick?: () => void;
  userName?: string;
  userEmail?: string;
  userAvatar?: string;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({
  onMenuClick,
  userName = 'Admin User',
  userEmail = 'admin@example.com',
  userAvatar = '',
}) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4 md:px-6">
      {/* Left Section - Menu Toggle & Brand */}
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="rounded-md p-2 text-gray-600 hover:bg-gray-100 lg:hidden"
          aria-label="Toggle sidebar"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        <h1 className="text-xl font-semibold text-gray-800 max-lg:hidden">Admin Panel</h1>
      </div>

      {/* Center - Search */}
      <div className="hidden flex-1 max-w-md px-4 md:block">
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 pl-10 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
          <svg
            className="absolute left-3 top-2.5 h-4 w-4 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      {/* Right Section - Notifications & Profile */}
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <button
          className="relative rounded-full p-2 text-gray-600 hover:bg-gray-100"
          aria-label="Notifications"
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>
          <span className="absolute right-1 top-1 flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-red-500" />
          </span>
        </button>

        {/* Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-2 rounded-full hover:bg-gray-100"
            aria-expanded={isProfileOpen}
            aria-label="Profile menu"
          >
            {userAvatar ? (
              <img src={userAvatar} alt={userName} className="h-8 w-8 rounded-full" />
            ) : (
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-100 text-sm font-medium text-primary-600">
                {userName.charAt(0).toUpperCase()}
              </div>
            )}
            <span className="hidden text-sm font-medium text-gray-700 md:block">{userName}</span>
            <svg
              className="hidden h-4 w-4 text-gray-500 md:block"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {/* Dropdown Menu */}
          {isProfileOpen && (
            <div className="absolute right-0 z-50 mt-2 w-48 rounded-lg bg-white shadow-lg ring-1 ring-black/5">
              <div className="border-b border-gray-100 px-4 py-3">
                <p className="text-sm font-medium text-gray-900">{userName}</p>
                <p className="text-xs text-gray-500">{userEmail}</p>
              </div>
              <div className="py-1">
                <a
                  href="/admin/profile"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  Profile
                </a>
                <a
                  href="/admin/settings"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  Settings
                </a>
                <hr className="my-1" />
                <button
                  className="block w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-50"
                  onClick={() => {
                    // Logout logic
                  }}
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

AdminHeader.displayName = 'AdminHeader';
