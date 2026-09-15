import { useCallback, useMemo, type ReactNode } from 'react';
import { hasPermission } from '../../common/permission/permission.checker';
import { hasRole } from '../../common/role/role.checker';
import type { Role } from '../../common/role/role.types';
import { PermissionContext } from '../contexts/permission.context';

export interface PermissionProviderProps {
  readonly children: ReactNode;
  readonly roles: readonly string[];
  readonly permissions: readonly string[];
}

export function PermissionProvider({
  children,
  roles,
  permissions,
}: PermissionProviderProps): JSX.Element {
  const checkRole = useCallback(
    (role: string | readonly string[]) =>
      hasRole(roles as readonly Role[], role as Role | readonly Role[], 'any'),
    [roles],
  );

  const checkPermission = useCallback(
    (permission: string | readonly string[], mode: 'any' | 'all' = 'all') =>
      hasPermission(permissions, permission, mode),
    [permissions],
  );

  const value = useMemo(
    () => ({
      roles,
      permissions,
      hasRole: checkRole,
      hasPermission: checkPermission,
    }),
    [roles, permissions, checkRole, checkPermission],
  );

  return (
    <PermissionContext.Provider value={value}>
      {children}
    </PermissionContext.Provider>
  );
}
