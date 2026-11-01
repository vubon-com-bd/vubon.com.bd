import type { ReactNode } from 'react';
import { usePermission } from '../hooks/use-permission';

export interface RoleGuardProps {
  readonly children: ReactNode;
  readonly role: string | readonly string[];
  readonly fallback?: ReactNode;
}

/**
 * Component alias for RequireRole.
 * Kept for API parity with link's spec.
 */
export function RoleGuard({ children, role, fallback = null }: RoleGuardProps): JSX.Element {
  const { hasRole } = usePermission();
  return hasRole(role) ? <>{children}</> : <>{fallback}</>;
}
