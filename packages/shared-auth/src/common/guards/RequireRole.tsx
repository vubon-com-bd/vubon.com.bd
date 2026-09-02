import React, { ReactNode } from 'react';
import { useAuth, useAuthLoading } from '../react/useAuth';
import { usePermission } from '../react/usePermission';

export interface RequireRoleProps {
  children: ReactNode;
  roles: string | string[];
  requireAll?: boolean;
  fallback?: ReactNode;
  redirectTo?: string;
  loadingFallback?: ReactNode;
}

export const RequireRole: React.FC<RequireRoleProps> = ({
  children,
  roles,
  requireAll = false,
  fallback,
  redirectTo = '/unauthorized',
  loadingFallback = <div>Loading...</div>,
}) => {
  const { isAuthenticated } = useAuth();
  const isLoading = useAuthLoading();
  const { hasAnyRole, hasAllRoles } = usePermission();

  if (isLoading) {
    return <>{loadingFallback}</>;
  }

  if (!isAuthenticated) {
    return <div>Redirecting to login...</div>;
  }

  const roleList = Array.isArray(roles) ? roles : [roles];
  const hasRole = requireAll ? hasAllRoles(roleList) : hasAnyRole(roleList);

  if (!hasRole) {
    if (fallback) {
      return <>{fallback}</>;
    }
    console.log(`Redirecting to ${redirectTo}`);
    return <div>Redirecting to {redirectTo}...</div>;
  }

  return <>{children}</>;
};
