/**
 * Seller Sidebar Component
 * Navigation sidebar for seller dashboard
 */

import React from 'react';

export interface SellerSidebarProps {
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
  { label: 'Dashboard', href: '/seller', icon: '📊', active: true },
  { label: 'Orders', href: '/seller/orders', icon: '📦' },
  { label: 'Products', href: '/seller/products', icon: '🛍️' },
  { label: 'Customers', href: '/seller/customers', icon: '👥' },
  { label: 'Analytics', href: '/seller/analytics', icon: '📈' },
  { label: 'Reviews', href: '/seller/reviews', icon: '⭐' },
  { label: 'Payments', href: '/seller/payments', icon: '💳' },
  { label: 'Settings', href: '/seller/settings', icon: '⚙️' },
];

export const SellerSidebar: React.FC<SellerSidebarProps> = ({
  isOpen,
  onClose,
  className = '',
}) => {
  const handleNavClick = () => {
    if (onClose && window.innerWidth < 1024) {
      onClose();
    }
  };

  return (
    <aside
      className={`flex h-full w-64 flex-col bg-white shadow-lg ${className}`}
      aria-hidden={!isOpen}
    >
      {/* Brand */}
      <div className="flex h-16 items-center border-b border-gray-200 px-4">
        <span className="text-xl font-bold text-primary-600">Vubon</span>
        <span className="ml-1 text-sm font-medium text-gray-500">Seller</span>
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
                  item.active ? 'bg-primary-50 text-primary-700' : 'text-gray-700 hover:bg-gray-100'
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
      <div className="border-t border-gray-200 p-4">
        <button
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
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

SellerSidebar.displayName = 'SellerSidebar';
