'use client';
import { forwardRef, type ReactNode } from 'react';
import { DashboardLayout, type DashboardLayoutProps } from './DashboardLayout';

export interface AdminLayoutProps
  extends Omit<DashboardLayoutProps, 'navbarLeft' | 'navbarRight' | 'sidebar'> {
  readonly navbarLeft?: ReactNode;
  readonly navbarRight?: ReactNode;
  readonly sidebar?: ReactNode;
}

/**
 * Admin page layout.
 * ⚠️ Sidebar + navbar are slots — pass your nav items from the app.
 */
export const AdminLayout = forwardRef<HTMLDivElement, AdminLayoutProps>(
  function AdminLayout(props, ref) {
    return <DashboardLayout ref={ref} {...props} />;
  },
);

AdminLayout.displayName = 'AdminLayout';
