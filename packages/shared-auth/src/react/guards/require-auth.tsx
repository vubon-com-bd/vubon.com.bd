import type { ReactNode } from 'react';
import { useIsAuthenticated } from '../hooks/use-is-authenticated';

export interface RequireAuthProps {
  readonly children: ReactNode;
  readonly fallback?: ReactNode;
  readonly redirectTo?: string;
}

export function RequireAuth({
  children,
  fallback = null,
  redirectTo,
}: RequireAuthProps): JSX.Element {
  const isAuthenticated = useIsAuthenticated();
  if (isAuthenticated) return <>{children}</>;
  if (redirectTo && typeof window !== 'undefined') {
    window.location.assign(redirectTo);
  }
  return <>{fallback}</>;
}
