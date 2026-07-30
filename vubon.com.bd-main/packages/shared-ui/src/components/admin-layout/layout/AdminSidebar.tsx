/**
 * Admin Sidebar Component
 * Dark theme navigation sidebar for admin dashboard
 */

import React from 'react';

export interface AdminSidebarProps {
  isOpen: boolean;
  onClose?: () => void;
  className?: string;
}

interface NavItem {
  label: string;
  href: string;
  icon: string;
  active?: boolean;
}

const navItems: NavItem[] = [
  { label: 'Dashboard', href: '/admin', icon: '📊', active: true },
  { label: 'Users', href: '/admin/users', icon: '👤' },
  { label: 'Sellers', href: '/admin/sellers', icon: '🏪' },
  { label: 'Orders', href: '/admin/orders', icon: '📦' },
  { label: 'Products', href: '/admin/products', icon: '🛍️' },
  { label: 'Payments', href: '/admin/payments', icon: '💳' },
  { label: 'Analytics', href: '/admin/analytics', icon: '📈' },
  { label: 'Reports', href: '/admin/reports', icon: '📋' },
  { label: 'Settings', href: '/admin/settings', icon: '⚙️' },
];

export const AdminSidebar: React.FC<AdminSidebarProps> = ({ isOpen, onClose, className = '' }) => {
  const handleNavClick = () => {
    if (onClose && window.innerWidth < 1024) {
      onClose();
    }
  };

  return (
    <aside
      className={`flex h-full w-64 flex-col bg-gray-900 text-white shadow-lg ${className}`}
      aria-hidden={!isOpen}
    >
      {/* Brand */}
      <div className="flex h-16 items-center border-b border-gray-800 px-4">
        <span className="text-xl font-bold text-white">Vubon</span>
        <span className="ml-1 text-sm font-medium text-gray-400">Admin</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                onClick={handleNavClick}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  item.active
                    ? 'bg-primary-600 text-white'
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Logout */}
      <div className="border-t border-gray-800 p-4">
        <button
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-300 transition-colors hover:bg-gray-800 hover:text-white"
          onClick={() => {
            // Logout logic
          }}
        >
          <span className="text-lg">🚪</span>
          Logout
        </button>
      </div>
    </aside>
  );
};

AdminSidebar.displayName = 'AdminSidebar';
