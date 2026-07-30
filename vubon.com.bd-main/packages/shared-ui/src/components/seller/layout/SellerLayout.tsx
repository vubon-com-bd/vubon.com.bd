/**
 * Seller Layout Component
 * Main layout for seller dashboard with sidebar and content area
 */

import React, { useState } from 'react';
import { SellerHeader } from './SellerHeader.js';
import { SellerSidebar } from './SellerSidebar.js';

export interface SellerLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export const SellerLayout: React.FC<SellerLayoutProps> = ({ children, className = '' }) => {
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
      <SellerSidebar isOpen={isSidebarOpen} onClose={closeSidebar} className="hidden lg:block" />

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
        <SellerSidebar isOpen={true} onClose={closeSidebar} />
      </div>

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <SellerHeader onMenuClick={toggleSidebar} />
        <main className={`flex-1 overflow-y-auto p-4 md:p-6 ${className}`}>{children}</main>
      </div>
    </div>
  );
};

SellerLayout.displayName = 'SellerLayout';
