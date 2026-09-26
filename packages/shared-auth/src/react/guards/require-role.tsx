import type { ReactNode } from 'react';
import { usePermission } from '../hooks/use-permission';

export interface RequireRoleProps {
  readonly children: ReactNode;
  readonly role: string | readonly string[];
  readonly fallback?: ReactNode;
}

export function RequireRole({ children, role, fallback = null }: RequireRoleProps): JSX.Element {
  const { hasRole } = usePermission();
  return hasRole(role) ? <>{children}</> : <>{fallback}</>;
}
