/**
 * Customer Layout Component
 * Base layout for customer-facing pages with header and footer
 */

import React from 'react';
import { Header } from './Header.js';
import { Footer } from './Footer.js';

export interface LayoutProps {
  children: React.ReactNode;
  showHeader?: boolean;
  showFooter?: boolean;
  className?: string;
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  showHeader = true,
  showFooter = true,
  className = '',
}) => {
  return (
    <div className="flex min-h-screen flex-col">
      {showHeader && <Header />}
      <main className={`flex-1 ${className}`}>{children}</main>
      {showFooter && <Footer />}
    </div>
  );
};

Layout.displayName = 'Layout';
