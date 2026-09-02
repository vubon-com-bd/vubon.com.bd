/**
 * Auth useAuthGuard Hook
 * প্রমীকরণ অথ গার্ড হুক
 */

import { useState, useEffect } from 'react';
import { useAuth } from '../../common/react/useAuth';

export interface AuthGuardOptions {
  requireAuth: boolean;
  redirectTo?: string;
  fallback?: React.ReactNode;
  loadingFallback?: React.ReactNode;
}

export interface AuthGuardResult {
  authorized: boolean;
  isLoading: boolean;
  component: React.ReactNode | null;
}

export const useAuthGuard = (options: AuthGuardOptions): AuthGuardResult => {
  const { isAuthenticated, isLoading } = useAuth();
  const [result, setResult] = useState<AuthGuardResult>({
    authorized: false,
    isLoading: true,
    component: null,
  });

  useEffect(() => {
    if (isLoading) {
      setResult({
        authorized: false,
        isLoading: true,
        component: options.loadingFallback || null,
      });
      return;
    }

    if (options.requireAuth && !isAuthenticated) {
      setResult({
        authorized: false,
        isLoading: false,
        component: options.fallback || null,
      });
      return;
    }

    if (!options.requireAuth && isAuthenticated) {
      setResult({
        authorized: true,
        isLoading: false,
        component: options.fallback || null,
      });
      return;
    }

    setResult({
      authorized: true,
      isLoading: false,
      component: null,
    });
  }, [isAuthenticated, isLoading, options]);

  return result;
};

export const useRequireAuth = (redirectTo?: string): AuthGuardResult => {
  return useAuthGuard({
    requireAuth: true,
    redirectTo: redirectTo || '/login',
  });
};

export const usePublicRoute = (redirectTo?: string): AuthGuardResult => {
  return useAuthGuard({
    requireAuth: false,
    redirectTo: redirectTo || '/dashboard',
  });
};
