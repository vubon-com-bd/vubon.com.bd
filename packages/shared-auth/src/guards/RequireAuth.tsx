/**
 * Require Auth Guard - Authentication route protection
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 *
 * @module shared-auth/src/guards/RequireAuth
 *
 * RULES:
 * ✅ ONLY authentication route protection - NO business logic
 * ✅ NO business permission logic, admin policies
 * ✅ Pure React guard component
 * ✅ TypeScript strict
 */

import React from 'react';
import { useAuth } from '../react/useAuth';

// ==================== Types ====================

export interface RequireAuthProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  redirectTo?: string;
  replace?: boolean;
  loadingFallback?: React.ReactNode;
  onUnauthenticated?: () => void;
  /** Use Next.js router for navigation (requires Next.js environment) */
  useNextRouter?: boolean;
}

// ==================== Guard Component ====================

/**
 * Guard component that requires authentication
 * Redirects to login page if not authenticated
 *
 * @example
 * // Protect dashboard route (plain redirect)
 * <RequireAuth redirectTo="/login">
 *   <DashboardPage />
 * </RequireAuth>
 *
 * @example
 * // Protect dashboard route with Next.js router
 * <RequireAuth redirectTo="/login" useNextRouter>
 *   <DashboardPage />
 * </RequireAuth>
 */
export const RequireAuth: React.FC<RequireAuthProps> = ({
  children,
  fallback,
  redirectTo = '/login',
  replace = false,
  loadingFallback = null,
  onUnauthenticated,
  useNextRouter = false,
}) => {
  const { isAuthenticated, isLoading } = useAuth();

  // Next.js router (only if useNextRouter is true)
  let nextRouter: ReturnType<typeof import('next/navigation').useRouter> | null = null;
  if (useNextRouter) {
    try {
      // Dynamic import to avoid errors in non-Next.js environments
      const { useRouter } = require('next/navigation');
      nextRouter = useRouter();
    } catch {
      // Silently fail - fallback to window.location
      useNextRouter = false;
    }
  }

  // Default loading fallback
  const defaultLoadingFallback = (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        <p className="mt-2 text-gray-600">Loading...</p>
      </div>
    </div>
  );

  // Show loading state
  if (isLoading) {
    return <>{loadingFallback ?? defaultLoadingFallback}</>;
  }

  // If not authenticated, redirect
  if (!isAuthenticated) {
    onUnauthenticated?.();

    if (typeof window !== 'undefined' && redirectTo) {
      if (useNextRouter && nextRouter) {
        // Next.js router navigation
        if (replace) {
          nextRouter.replace(redirectTo);
        } else {
          nextRouter.push(redirectTo);
        }
      } else {
        // Plain redirect
        if (replace) {
          window.location.replace(redirectTo);
        } else {
          window.location.href = redirectTo;
        }
      }
    }
    return <>{fallback}</>;
  }

  // If authenticated, render children
  return <>{children}</>;
};

/**
 * Higher-order component for requiring authentication
 * Wraps a component with RequireAuth guard
 *
 * @example
 * const DashboardPage = withAuth(DashboardComponent, { redirectTo: '/login' });
 */
export const withAuth = <P extends object>(
  Component: React.ComponentType<P>,
  options?: Omit<RequireAuthProps, 'children'>
): React.FC<P> => {
  const WrappedComponent: React.FC<P> = (props) => (
    <RequireAuth {...options}>
      <Component {...props} />
    </RequireAuth>
  );

  WrappedComponent.displayName = `withAuth(${Component.displayName || Component.name || 'Component'})`;

  return WrappedComponent;
};

// ==================== Type Exports ====================

export type { RequireAuthProps };
