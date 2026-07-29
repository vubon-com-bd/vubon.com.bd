/**
 * Admin Layout Component
 * Main layout for admin dashboard with sidebar and content area
 */

import React, { useState } from 'react';
import { AdminHeader } from './AdminHeader.js';
import { AdminSidebar } from './AdminSidebar.js';

export interface AdminLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children, className = '' }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Sidebar */}
      <AdminSidebar isOpen={isSidebarOpen} onClose={closeSidebar} className="hidden lg:block" />

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={closeSidebar}
          aria-hidden="true"
        />
      )}

      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 transform bg-white shadow-lg transition-transform duration-300 ease-in-out lg:hidden ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <AdminSidebar isOpen={true} onClose={closeSidebar} />
      </div>

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <AdminHeader onMenuClick={toggleSidebar} />
        <main className={`flex-1 overflow-y-auto p-4 md:p-6 ${className}`}>{children}</main>
      </div>
    </div>
  );
};

AdminLayout.displayName = 'AdminLayout';
