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
  fallback ? : React.ReactNode;
  redirectTo ? : string;
  replace ? : boolean;
  loadingFallback ? : React.ReactNode;
  onUnauthenticated ? : () => void;
}

// ==================== Guard Component ====================

/**
 * Guard component that requires authentication
 * Redirects to login page if not authenticated
 * 
 * @example
 * // Protect dashboard route
 * <RequireAuth redirectTo="/login">
 *   <DashboardPage />
 * </RequireAuth>
 */
export const RequireAuth: React.FC < RequireAuthProps > = ({
  children,
  fallback,
  redirectTo = '/login',
  replace = false,
  loadingFallback = null,
  onUnauthenticated,
}) => {
  const { isAuthenticated, isLoading } = useAuth();
  
  // Show loading state
  if (isLoading) {
    return <>{loadingFallback}</>;
  }
  
  // If not authenticated, redirect
  if (!isAuthenticated) {
    onUnauthenticated?.();
    
    if (typeof window !== 'undefined' && redirectTo) {
      if (replace) {
        window.location.replace(redirectTo);
      } else {
        window.location.href = redirectTo;
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
