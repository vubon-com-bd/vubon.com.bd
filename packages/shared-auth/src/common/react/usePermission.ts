import { useMemo } from 'react';
import { useAuth } from './useAuth';
import { PermissionClient, PermissionCheck } from '../client/permission.client';

export interface UsePermissionOptions {
  permissions?: string[];
  roles?: string[];
  requireAll?: boolean;
}

export const usePermission = (options: UsePermissionOptions = {}) => {
  const { user } = useAuth();
  const { permissions = [], roles = [], requireAll = false } = options;

  const permissionClient = useMemo(() => {
    const client = new PermissionClient();
    if (user?.permissions) {
      client.setPermissions(
        user.permissions.map((p) => ({
          id: p,
          name: p,
          resource: p.split(':')[0] || '',
          action: p.split(':')[1] || '',
        }))
      );
    }
    if (user?.role) {
      client.setRoles([
        {
          id: user.role,
          name: user.role,
          permissions: [],
          isDefault: true,
        },
      ]);
    }
    return client;
  }, [user]);

  const hasPermission = (resource: string, action: string): boolean => {
    return permissionClient.hasPermission({ resource, action });
  };

  const hasAnyPermission = (checks: PermissionCheck[]): boolean => {
    return permissionClient.hasAnyPermission(checks);
  };

  const hasAllPermissions = (checks: PermissionCheck[]): boolean => {
    return permissionClient.hasAllPermissions(checks);
  };

  const hasRole = (role: string): boolean => {
    return permissionClient.hasRole(role);
  };

  const hasAnyRole = (roleNames: string[]): boolean => {
    return permissionClient.hasAnyRole(roleNames);
  };

  const hasAllRoles = (roleNames: string[]): boolean => {
    return permissionClient.hasAllRoles(roleNames);
  };

  // Check if user has required permissions
  const hasRequiredPermissions = useMemo(() => {
    if (permissions.length === 0 && roles.length === 0) return true;

    let hasPerms = true;
    let hasRoles = true;

    if (permissions.length > 0) {
      const checks = permissions.map((p) => {
        const [resource, action] = p.split(':');
        return { resource, action };
      });

      hasPerms = requireAll ? hasAllPermissions(checks) : hasAnyPermission(checks);
    }

    if (roles.length > 0) {
      hasRoles = requireAll ? hasAllRoles(roles) : hasAnyRole(roles);
    }

    return hasPerms && hasRoles;
  }, [
    permissions,
    roles,
    requireAll,
    hasAllPermissions,
    hasAnyPermission,
    hasAllRoles,
    hasAnyRole,
  ]);

  return {
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
    hasRole,
    hasAnyRole,
    hasAllRoles,
    hasRequiredPermissions,
    permissionClient,
    permissions: permissionClient.getUserPermissions(),
    roles: permissionClient.getUserRoles(),
    canManageResource: (resource: string) => permissionClient.canManageResource(resource),
    canViewResource: (resource: string) => permissionClient.canViewResource(resource),
    canEditResource: (resource: string) => permissionClient.canEditResource(resource),
    canDeleteResource: (resource: string) => permissionClient.canDeleteResource(resource),
    canCreateResource: (resource: string) => permissionClient.canCreateResource(resource),
  };
};

/**
 * useHasPermission Hook
 * পারমিশন চেক করার হুক
 */
export const useHasPermission = (resource: string, action: string): boolean => {
  const { hasPermission } = usePermission();
  return hasPermission(resource, action);
};

/**
 * useHasRole Hook
 * রোল চেক করার হুক
 */
export const useHasRole = (role: string): boolean => {
  const { hasRole } = usePermission();
  return hasRole(role);
};

/**
 * useIsAdmin Hook
 * অ্যাডমিন কিনা চেক করার হুক
 */
export const useIsAdmin = (): boolean => {
  const { hasAnyRole } = usePermission();
  return hasAnyRole(['admin', 'super_admin']);
};

/**
 * useIsVendor Hook
 * ভেন্ডর কিনা চেক করার হুক
 */
export const useIsVendor = (): boolean => {
  const { hasRole } = usePermission();
  return hasRole('vendor');
};
