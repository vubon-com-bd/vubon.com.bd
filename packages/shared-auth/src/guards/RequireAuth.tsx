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
  /**
   * Use Next.js router for navigation (requires next/navigation)
   * @default false
   */
  useNextRouter?: boolean;
}

// ==================== Default Loading Component ====================

const DefaultLoadingFallback: React.FC = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
  </div>
);

// ==================== Guard Component ====================

/**
 * Guard component that requires authentication
 * Redirects to login page if not authenticated
 *
 * @example
 * // Protect dashboard route with Next.js router
 * <RequireAuth redirectTo="/login" useNextRouter>
 *   <DashboardPage />
 * </RequireAuth>
 *
 * @example
 * // Protect dashboard route with window.location
 * <RequireAuth redirectTo="/login">
 *   <DashboardPage />
 * </RequireAuth>
 */
export const RequireAuth: React.FC<RequireAuthProps> = ({
  children,
  fallback,
  redirectTo = '/login',
  replace = false,
  loadingFallback,
  onUnauthenticated,
  useNextRouter = false,
}) => {
  const { isAuthenticated, isLoading } = useAuth();

  // Lazy load Next.js router only when needed and on client side
  const nextRouter = (() => {
    if (useNextRouter && typeof window !== 'undefined') {
      try {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const { useRouter } = require('next/navigation');
        return useRouter();
      } catch {
        console.warn('next/navigation not available. Falling back to window.location.');
        return null;
      }
    }
    return null;
  })();

  // Determine which loading fallback to use
  const LoadingComponent = loadingFallback ?? <DefaultLoadingFallback />;

  // Show loading state
  if (isLoading) {
    return <>{LoadingComponent}</>;
  }

  // If not authenticated, redirect
  if (!isAuthenticated) {
    onUnauthenticated?.();

    if (typeof window !== 'undefined' && redirectTo) {
      // Use Next.js router if available and requested
      if (useNextRouter && nextRouter) {
        if (replace) {
          nextRouter.replace(redirectTo);
        } else {
          nextRouter.push(redirectTo);
        }
      } else {
        // Fallback to window.location
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
 * // With Next.js router
 * const DashboardPage = withAuth(DashboardComponent, { redirectTo: '/login', useNextRouter: true });
 *
 * @example
 * // With window.location
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
