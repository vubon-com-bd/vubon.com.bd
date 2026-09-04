/**
 * RequireAdmin Guard
 * অ্যাডমিন প্রয়োজন গার্ড
 */

import React, { ReactNode } from 'react';
import { ADMIN_ROLES } from '@vubon/shared-constants';

export interface RequireAdminProps {
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
  requireSuperAdmin?: boolean;
}

export const RequireAdmin: React.FC<RequireAdminProps> = ({
  children,
  fallback,
  loadingFallback = <div>Loading...</div>,
  redirectTo = '/unauthorized',
  admin,
  requireSuperAdmin = false,
}) => {
  const { role, permissions, isAuthenticated, isLoading } = admin;

  if (isLoading) {
    return <>{loadingFallback}</>;
  }

  if (!isAuthenticated) {
    if (fallback) {
      return <>{fallback}</>;
    }
    return <div>Redirecting to login...</div>;
  }

  // Check if admin has required role
  const isAdminRole = role === ADMIN_ROLES.ADMIN ||
    role === ADMIN_ROLES.SUPER_ADMIN ||
    role === ADMIN_ROLES.SYSTEM_ADMIN;

  const isSuperAdminRole = role === ADMIN_ROLES.SUPER_ADMIN;

  let hasAccess = false;

  if (requireSuperAdmin) {
    hasAccess = isSuperAdminRole;
  } else {
    hasAccess = isAdminRole || isSuperAdminRole;
  }

  if (!hasAccess) {
    if (fallback) {
      return <>{fallback}</>;
    }
    return <div>Redirecting to {redirectTo}...</div>;
  }

  return <>{children}</>;
};

// This is a separate component that uses RequireAdmin with requireSuperAdmin=true
// But we'll export it with a different name to avoid conflict
export const RequireAdminSuperAdmin: React.FC<Omit<RequireAdminProps, 'requireSuperAdmin'>> = (props) => {
  return <RequireAdmin {...props} requireSuperAdmin={true} />;
};
