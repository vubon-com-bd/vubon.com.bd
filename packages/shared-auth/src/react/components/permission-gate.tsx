import type { ReactNode } from 'react';
import { usePermission } from '../hooks/use-permission';

export interface PermissionGateProps {
  readonly permission: string | readonly string[];
  readonly mode?: 'any' | 'all';
  readonly fallback?: ReactNode;
  readonly children: ReactNode;
}

export function PermissionGate({
  permission,
  mode = 'all',
  fallback = null,
  children,
}: PermissionGateProps): JSX.Element {
  const { hasPermission } = usePermission();
  return hasPermission(permission, mode) ? <>{children}</> : <>{fallback}</>;
}
