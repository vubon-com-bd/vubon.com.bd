import type { ReactNode } from 'react';

export interface BaseGuardProps {
  readonly children: ReactNode;
  readonly when: boolean;
  readonly fallback?: ReactNode;
}

/**
 * Base guard primitive — renders children only when `when` is true.
 * All other guards (`RequireAuth`, `RequireRole`, ...) build on this.
 */
export function BaseGuard({ children, when, fallback = null }: BaseGuardProps): JSX.Element {
  return <>{when ? children : fallback}</>;
}
