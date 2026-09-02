import React, { ReactNode } from 'react';
import { useAuth } from '../hooks/use-auth';

export interface RequirePermissionProps {
  children: ReactNode;
  permissions: string | string[];
  requireAll?: boolean;
  fallback?: ReactNode;
  redirectTo?: string;
}

export const RequirePermission: React.FC<RequirePermissionProps> = ({ 
  children, 
  permissions,
  requireAll = false,
  fallback,
  redirectTo = '/unauthorized'
}) => {
  const { user, isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <div>Redirecting to login...</div>;
  }

  const permissionList = Array.isArray(permissions) ? permissions : [permissions];
  const userPermissions = user?.permissions || [];

  let hasPermission: boolean;
  if (requireAll) {
    hasPermission = permissionList.every(p => userPermissions.includes(p));
  } else {
    hasPermission = permissionList.some(p => userPermissions.includes(p));
  }

  if (!hasPermission) {
    if (fallback) {
      return <>{fallback}</>;
    }
    // In a real app, this would redirect using a router
    // window.location.href = redirectTo;
    return <div>Redirecting to {redirectTo}...</div>;
  }

  return <>{children}</>;
};
