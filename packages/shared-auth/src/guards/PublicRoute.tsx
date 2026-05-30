/**
 * Public Route Guard - Guest-only route protection
 * For pages like login, register that should not be accessible when authenticated
 * 
 * @module shared-auth/src/guards/PublicRoute
 * 
 * RULES:
 * ✅ ONLY guest-only route protection - NO business logic
 * ✅ Redirects authenticated users away
 * ✅ Pure React guard component
 * ✅ TypeScript strict
 */

import React from 'react';
import { useAuth } from '../react/useAuth';

// ==================== Types ====================

export interface PublicRouteProps {
  children: React.ReactNode;
  fallback ? : React.ReactNode;
  redirectTo ? : string;
  replace ? : boolean;
  loadingComponent ? : React.ReactNode;
}

// ==================== Guard Component ====================

/**
 * Guard component that only allows unauthenticated users
 * Redirects authenticated users away from public routes
 * 
 * @example
 * // Protect login page from authenticated users
 * <PublicRoute redirectTo="/dashboard">
 *   <LoginPage />
 * </PublicRoute>
 */
export const PublicRoute: React.FC < PublicRouteProps > = ({
  children,
  fallback = null,
  redirectTo = '/',
  replace = false,
  loadingComponent = null,
}) => {
  const { isAuthenticated, isLoading } = useAuth();
  
  // Show loading state
  if (isLoading) {
    return loadingComponent ? <>{loadingComponent}</> : null;
  }
  
  // If authenticated, redirect away
  if (isAuthenticated) {
    if (typeof window !== 'undefined' && redirectTo) {
      if (replace) {
        window.location.replace(redirectTo);
      } else {
        window.location.href = redirectTo;
      }
    }
    return <>{fallback}</>;
  }
  
  // If not authenticated, render children
  return <>{children}</>;
};

/**
 * Higher-order component for public routes
 * Wraps a component with PublicRoute guard
 * 
 * @example
 * const LoginPage = withPublicRoute(LoginComponent, { redirectTo: '/dashboard' });
 */
export const withPublicRoute = <P extends object>(
  Component: React.ComponentType<P>,
  options?: Omit<PublicRouteProps, 'children'>
): React.FC<P> => {
  const WrappedComponent: React.FC<P> = (props) => (
    <PublicRoute {...options}>
      <Component {...props} />
    </PublicRoute>
  );
  
  WrappedComponent.displayName = `withPublicRoute(${Component.displayName || Component.name || 'Component'})`;
  
  return WrappedComponent;
};

// ==================== Type Exports ====================

export type { PublicRouteProps };
