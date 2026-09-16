'use client';
import { forwardRef, type ReactNode } from 'react';
import { DashboardLayout, type DashboardLayoutProps } from './DashboardLayout';

export interface SellerLayoutProps
  extends Omit<DashboardLayoutProps, 'navbarLeft' | 'navbarRight' | 'sidebar'> {
  readonly navbarLeft?: ReactNode;
  readonly navbarRight?: ReactNode;
  readonly sidebar?: ReactNode;
}

/** Seller page layout. */
export const SellerLayout = forwardRef<HTMLDivElement, SellerLayoutProps>(
  function SellerLayout(props, ref) {
    return <DashboardLayout ref={ref} {...props} />;
  },
);

SellerLayout.displayName = 'SellerLayout';
