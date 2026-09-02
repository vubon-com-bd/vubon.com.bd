import React, { ReactNode } from 'react';
import { useAuth, useAuthLoading } from '../react/useAuth';

export interface PublicRouteProps {
  children: ReactNode;
  redirectTo?: string;
  loadingFallback?: ReactNode;
}

export const PublicRoute: React.FC<PublicRouteProps> = ({
  children,
  redirectTo = '/dashboard',
  loadingFallback = <div>Loading...</div>,
}) => {
  const { isAuthenticated } = useAuth();
  const isLoading = useAuthLoading();

  if (isLoading) {
    return <>{loadingFallback}</>;
  }

  if (isAuthenticated) {
    console.log(`Redirecting to ${redirectTo}`);
    return <div>Redirecting to {redirectTo}...</div>;
  }

  return <>{children}</>;
};
