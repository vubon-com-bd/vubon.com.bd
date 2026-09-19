import type { ReactNode } from 'react';
import { useIsAuthenticated } from '../hooks/use-is-authenticated';

export interface LoginWallProps {
  readonly children: ReactNode;
  readonly message?: string;
  readonly loginPath?: string;
}

/**
 * Shows a "please log in" message with a link when anonymous.
 */
export function LoginWall({
  children,
  message = 'Please log in to continue',
  loginPath = '/login',
}: LoginWallProps): JSX.Element {
  const isAuthenticated = useIsAuthenticated();
  if (isAuthenticated) return <>{children}</>;
  return (
    <div role="dialog" aria-label="login-required">
      <p>{message}</p>
      <a href={loginPath}>Log in</a>
    </div>
  );
}
