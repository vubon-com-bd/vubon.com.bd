import type { ReactNode } from 'react';

export interface BaseGateProps {
  readonly children: ReactNode;
  readonly when: boolean;
  readonly fallback?: ReactNode;
}

/**
 * Base gate component — primitive used by all *Gate components.
 */
export function BaseGate({
  children,
  when,
  fallback = null,
}: BaseGateProps): JSX.Element {
  return <>{when ? children : fallback}</>;
}
