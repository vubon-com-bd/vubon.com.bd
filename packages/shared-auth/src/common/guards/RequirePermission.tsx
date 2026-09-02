import React, { ReactNode } from 'react';
import { useAuth, useAuthLoading } from '../react/useAuth';
import { usePermission } from '../react/usePermission';

export interface RequirePermissionProps {
  children: ReactNode;
  permissions: string | string[];
  requireAll?: boolean;
  fallback?: ReactNode;
  redirectTo?: string;
  loadingFallback?: ReactNode;
}

export const RequirePermission: React.FC<RequirePermissionProps> = ({
  children,
  permissions,
  requireAll = false,
  fallback,
  redirectTo = '/unauthorized',
  loadingFallback = <div>Loading...</div>,
}) => {
  const { isAuthenticated } = useAuth();
  const isLoading = useAuthLoading();
  const { hasAnyPermission, hasAllPermissions } = usePermission();

  if (isLoading) {
    return <>{loadingFallback}</>;
  }

  if (!isAuthenticated) {
    return <div>Redirecting to login...</div>;
  }

  const permissionList = Array.isArray(permissions) ? permissions : [permissions];
  const permissionChecks = permissionList.map((p) => {
    const [resource, action] = p.split(':');
    return { resource, action };
  });

  const hasPermission = requireAll
    ? hasAllPermissions(permissionChecks)
    : hasAnyPermission(permissionChecks);

  if (!hasPermission) {
    if (fallback) {
      return <>{fallback}</>;
    }
    console.log(`Redirecting to ${redirectTo}`);
    return <div>Redirecting to {redirectTo}...</div>;
  }

  return <>{children}</>;
};
