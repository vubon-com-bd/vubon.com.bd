/**
 * RequireUser Guard
 * ইউজার প্রয়োজন গার্ড
 */

import React, { ReactNode } from 'react';
import { USER_ROLES } from '@vubon/shared-constants';

export interface RequireUserProps {
  children: ReactNode;
  roles?: string | string[];
  permissions?: string | string[];
  requireAll?: boolean;
  fallback?: ReactNode;
  loadingFallback?: ReactNode;
  redirectTo?: string;
  user: {
    role: string;
    permissions?: string[];
    isAuthenticated: boolean;
    isLoading: boolean;
  };
}

export const RequireUser: React.FC<RequireUserProps> = ({
  children,
  roles,
  permissions,
  requireAll = false,
  fallback,
  loadingFallback = <div>Loading...</div>,
  redirectTo = '/unauthorized',
  user,
}) => {
  const { role, permissions: userPermissions, isAuthenticated, isLoading } = user;

  if (isLoading) {
    return <>{loadingFallback}</>;
  }

  if (!isAuthenticated) {
    if (fallback) {
      return <>{fallback}</>;
    }
    return <div>Redirecting to login...</div>;
  }

  // Check roles
  let hasRole = true;
  if (roles) {
    const roleList = Array.isArray(roles) ? roles : [roles];
    const userRole = role as string;

    if (requireAll) {
      hasRole = roleList.every((r) => userRole === r);
    } else {
      hasRole = roleList.some((r) => userRole === r);
    }
  }

  // Check permissions
  let hasPermission = true;
  if (permissions && userPermissions) {
    const permissionList = Array.isArray(permissions) ? permissions : [permissions];

    if (requireAll) {
      hasPermission = permissionList.every((p) => userPermissions?.includes(p) || false);
    } else {
      hasPermission = permissionList.some((p) => userPermissions?.includes(p) || false);
    }
  }

  if (!hasRole || !hasPermission) {
    if (fallback) {
      return <>{fallback}</>;
    }
    return <div>Redirecting to {redirectTo}...</div>;
  }

  return <>{children}</>;
};

export const RequireUserRole: React.FC<Omit<RequireUserProps, 'permissions'>> = (props) => {
  return <RequireUser {...props} />;
};

export const RequireUserPermission: React.FC<Omit<RequireUserProps, 'roles'>> = (props) => {
  return <RequireUser {...props} />;
};

export const RequireUserRoleOrPermission: React.FC<RequireUserProps> = (props) => {
  return <RequireUser {...props} requireAll={false} />;
};

export const RequireUserRoleAndPermission: React.FC<RequireUserProps> = (props) => {
  return <RequireUser {...props} requireAll={true} />;
};
