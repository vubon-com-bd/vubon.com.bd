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
 * ✅ Supports both Next.js App Router and Client-side routing
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
  /** Use Next.js router instead of window.location (requires next/navigation) */
  useNextRouter?: boolean;
}

// ==================== Private Helpers ====================

/**
 * Simple loading spinner component (optional)
 * Can be overridden via loadingFallback prop
 */
const DefaultLoadingSpinner: React.FC = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
  </div>
);

// ==================== Guard Component ====================

/**
 * Guard component that requires authentication
 * Redirects to login page if not authenticated
 *
 * Supports:
 * - Next.js App Router (when useNextRouter=true)
 * - Client-side routing (window.location)
 *
 * @example
 * // Client-side redirect (default)
 * <RequireAuth redirectTo="/login">
 *   <DashboardPage />
 * </RequireAuth>
 *
 * @example
 * // Next.js App Router redirect
 * <RequireAuth redirectTo="/login" useNextRouter>
 *   <DashboardPage />
 * </RequireAuth>
 *
 * @example
 * // With custom loading fallback
 * <RequireAuth loadingFallback={<MySkeleton />}>
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

  // Determine which loading fallback to use
  const effectiveLoadingFallback = loadingFallback ?? <DefaultLoadingSpinner />;

  // Show loading state
  if (isLoading) {
    return <>{effectiveLoadingFallback}</>;
  }

  // If not authenticated, redirect
  if (!isAuthenticated) {
    onUnauthenticated?.();

    if (typeof window !== 'undefined' && redirectTo) {
      // Use Next.js router if requested
      if (useNextRouter) {
        // Dynamic import to avoid breaking non-Next.js environments
        import('next/navigation').then(({ useRouter }) => {
          const router = useRouter();
          if (replace) {
            router.replace(redirectTo);
          } else {
            router.push(redirectTo);
          }
        }).catch(() => {
          // Fallback to window.location if next/navigation fails
          if (replace) {
            window.location.replace(redirectTo);
          } else {
            window.location.href = redirectTo;
          }
        });
      } else {
        // Standard client-side redirect
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
 * // Client-side redirect
 * const DashboardPage = withAuth(DashboardComponent, { redirectTo: '/login' });
 *
 * @example
 * // Next.js App Router redirect
 * const DashboardPage = withAuth(DashboardComponent, { redirectTo: '/login', useNextRouter: true });
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
