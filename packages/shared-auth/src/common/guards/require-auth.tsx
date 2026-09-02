import React, { ReactNode } from 'react';
import { useAuth } from '../hooks/use-auth';

export interface RequireAuthProps {
  children: ReactNode;
  redirectTo?: string;
  fallback?: ReactNode;
}

export const RequireAuth: React.FC<RequireAuthProps> = ({ 
  children, 
  redirectTo = '/login',
  fallback 
}) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    if (fallback) {
      return <>{fallback}</>;
    }
    // In a real app, this would redirect using a router
    // window.location.href = redirectTo;
    return <div>Redirecting to {redirectTo}...</div>;
  }

  return <>{children}</>;
};
