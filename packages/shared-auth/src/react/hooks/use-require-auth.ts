import { useEffect } from 'react';
import { useIsAuthenticated } from './use-is-authenticated';
import { redirectToLogin } from '../utils/auth-redirect';

export interface UseRequireAuthOptions {
  readonly redirectTo?: string;
  readonly enabled?: boolean;
}

/**
 * Side-effect hook: redirects to login if not authenticated.
 * For rendering guards use `<RequireAuth>` component.
 */
export function useRequireAuth(options: UseRequireAuthOptions = {}): boolean {
  const { redirectTo = '/login', enabled = true } = options;
  const isAuthenticated = useIsAuthenticated();

  useEffect(() => {
    if (enabled && !isAuthenticated) redirectToLogin(redirectTo);
  }, [enabled, isAuthenticated, redirectTo]);

  return isAuthenticated;
}
