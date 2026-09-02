import React, { ReactNode } from 'react';
import { useAuth, useAuthLoading } from '../react/useAuth';

export interface RequireAuthProps {
  children: ReactNode;
  redirectTo?: string;
  fallback?: ReactNode;
  loadingFallback?: ReactNode;
}

export const RequireAuth: React.FC<RequireAuthProps> = ({
  children,
  redirectTo = '/login',
  fallback,
  loadingFallback = <div>Loading...</div>,
}) => {
  const { isAuthenticated } = useAuth();
  const isLoading = useAuthLoading();

  if (isLoading) {
    return <>{loadingFallback}</>;
  }

  if (!isAuthenticated) {
    if (fallback) {
      return <>{fallback}</>;
    }
    // In a real app with routing, this would redirect
    console.log(`Redirecting to ${redirectTo}`);
    return <div>Redirecting to {redirectTo}...</div>;
  }

  return <>{children}</>;
};
