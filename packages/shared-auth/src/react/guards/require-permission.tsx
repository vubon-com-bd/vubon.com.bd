import type { ReactNode } from 'react';
import { usePermission } from '../hooks/use-permission';

export interface RequirePermissionProps {
  readonly children: ReactNode;
  readonly permission: string | readonly string[];
  readonly mode?: 'any' | 'all';
  readonly fallback?: ReactNode;
}

export function RequirePermission({
  children,
  permission,
  mode = 'all',
  fallback = null,
}: RequirePermissionProps): JSX.Element {
  const { hasPermission } = usePermission();
  return hasPermission(permission, mode) ? <>{children}</> : <>{fallback}</>;
}
