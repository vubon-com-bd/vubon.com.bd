import type { ReactNode } from 'react';
import { useIsAuthenticated } from '../hooks/use-is-authenticated';

export interface PublicRouteProps {
  readonly children: ReactNode;
  readonly fallback?: ReactNode;
  readonly redirectTo?: string;
}

/**
 * Renders children ONLY when NOT authenticated.
 * Used for login/register pages.
 */
export function PublicRoute({
  children,
  fallback = null,
  redirectTo,
}: PublicRouteProps): JSX.Element {
  const isAuthenticated = useIsAuthenticated();
  if (!isAuthenticated) return <>{children}</>;
  if (redirectTo && typeof window !== 'undefined') {
    window.location.assign(redirectTo);
  }
  return <>{fallback}</>;
}
