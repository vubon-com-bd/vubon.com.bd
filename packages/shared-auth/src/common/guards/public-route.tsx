import React, { ReactNode } from 'react';
import { useAuth } from '../hooks/use-auth';

export interface PublicRouteProps {
  children: ReactNode;
  redirectTo?: string;
}

export const PublicRoute: React.FC<PublicRouteProps> = ({ 
  children, 
  redirectTo = '/dashboard' 
}) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isAuthenticated) {
    // In a real app, this would redirect using a router
    // window.location.href = redirectTo;
    return <div>Redirecting to {redirectTo}...</div>;
  }

  return <>{children}</>;
};
