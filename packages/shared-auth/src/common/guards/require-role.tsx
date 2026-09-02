import React, { ReactNode } from 'react';
import { useAuth } from '../hooks/use-auth';

export interface RequireRoleProps {
  children: ReactNode;
  roles: string | string[];
  fallback?: ReactNode;
  redirectTo?: string;
}

export const RequireRole: React.FC<RequireRoleProps> = ({ 
  children, 
  roles,
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

  const roleList = Array.isArray(roles) ? roles : [roles];
  const hasRole = user && roleList.includes(user.role);

  if (!hasRole) {
    if (fallback) {
      return <>{fallback}</>;
    }
    // In a real app, this would redirect using a router
    // window.location.href = redirectTo;
    return <div>Redirecting to {redirectTo}...</div>;
  }

  return <>{children}</>;
};
