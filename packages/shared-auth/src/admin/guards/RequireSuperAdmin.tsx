/**
 * RequireSuperAdmin Guard
 * সুপার অ্যাডমিন প্রয়োজন গার্ড
 */

import React, { ReactNode } from 'react';
import { ADMIN_ROLES } from '@vubon/shared-constants';

export interface RequireSuperAdminProps {
  children: ReactNode;
  fallback?: ReactNode;
  loadingFallback?: ReactNode;
  redirectTo?: string;
  admin: {
    role: string;
    permissions?: string[];
    isAuthenticated: boolean;
    isLoading: boolean;
  };
}

export const RequireSuperAdminOnly: React.FC<RequireSuperAdminProps> = ({
  children,
  fallback,
  loadingFallback = <div>Loading...</div>,
  redirectTo = '/unauthorized',
  admin,
}) => {
  const { role, isAuthenticated, isLoading } = admin;

  if (isLoading) {
    return <>{loadingFallback}</>;
  }

  if (!isAuthenticated) {
    if (fallback) {
      return <>{fallback}</>;
    }
    return <div>Redirecting to login...</div>;
  }

  const isSuperAdmin = role === ADMIN_ROLES.SUPER_ADMIN;

  if (!isSuperAdmin) {
    if (fallback) {
      return <>{fallback}</>;
    }
    return <div>Redirecting to {redirectTo}...</div>;
  }

  return <>{children}</>;
};
