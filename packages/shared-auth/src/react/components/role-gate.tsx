import type { ReactNode } from 'react';
import { usePermission } from '../hooks/use-permission';

export interface RoleGateProps {
  readonly role: string | readonly string[];
  readonly fallback?: ReactNode;
  readonly children: ReactNode;
}

export function RoleGate({ role, fallback = null, children }: RoleGateProps): JSX.Element {
  const { hasRole } = usePermission();
  return hasRole(role) ? <>{children}</> : <>{fallback}</>;
}
