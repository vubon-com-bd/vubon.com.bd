import type { ReactNode } from 'react';
import { useIsAuthenticated } from '../hooks/use-is-authenticated';
import { redirectToLogin } from '../utils/auth-redirect';

export interface PrivateRouteProps {
  readonly children: ReactNode;
  readonly fallback?: ReactNode;
  readonly redirectTo?: string;
}

/**
 * Renders children ONLY when authenticated.
 * Redirects to login otherwise.
 */
export function PrivateRoute({
  children,
  fallback = null,
  redirectTo = '/login',
}: PrivateRouteProps): JSX.Element {
  const isAuthenticated = useIsAuthenticated();
  if (isAuthenticated) return <>{children}</>;
  if (typeof window !== 'undefined') redirectToLogin(redirectTo);
  return <>{fallback}</>;
}
