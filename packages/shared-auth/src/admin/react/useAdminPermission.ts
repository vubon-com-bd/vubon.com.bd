/**
 * useAdminPermission Hook
 * অ্যাডমিন পারমিশন হুক
 */

import { useState, useEffect, useCallback } from 'react';
import { ADMIN_PERMISSIONS, ADMIN_ROLES } from '@vubon/shared-constants';
import { AdminPermission } from '@vubon/shared-types';
import { AdminPermissionClient } from '../client/admin-permission.client';

export interface UseAdminPermissionOptions {
  adminId?: string;
  autoLoad?: boolean;
}

export interface UseAdminPermissionResult {
  permissions: string[];
  roles: string[];
  adminPermissions: Partial<AdminPermission>[];
  isLoading: boolean;
  error: Error | null;
  hasPermission: (permission: string) => boolean;
  hasAnyPermission: (permissions: string[]) => boolean;
  hasAllPermissions: (permissions: string[]) => boolean;
  hasRole: (role: string) => boolean;
  hasAnyRole: (roles: string[]) => boolean;
  hasAllRoles: (roles: string[]) => boolean;
  hasAdminPermission: (permission: Partial<AdminPermission>) => boolean;
  hasAnyAdminPermission: (permissions: Partial<AdminPermission>[]) => boolean;
  hasAllAdminPermissions: (permissions: Partial<AdminPermission>[]) => boolean;
  isSuperAdmin: () => boolean;
  isAdmin: () => boolean;
  refresh: () => Promise<void>;
}

export const useAdminPermission = (
  options: UseAdminPermissionOptions = {}
): UseAdminPermissionResult => {
  const { adminId, autoLoad = true } = options;

  const [permissions, setPermissions] = useState<string[]>([]);
  const [roles, setRoles] = useState<string[]>([]);
  const [adminPermissions, setAdminPermissions] = useState<Partial<AdminPermission>[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const permissionClient = new AdminPermissionClient();

  const loadPermissions = useCallback(async () => {
    if (!adminId) {
      setPermissions([]);
      setRoles([]);
      setAdminPermissions([]);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // In real implementation, this would fetch from API
      // For now, return mock data
      const mockPermissions = Object.keys(ADMIN_PERMISSIONS).slice(0, 5);
      const validRoles = Object.values(ADMIN_ROLES);
      const mockRoles: string[] = [validRoles[0], validRoles[2]]; // ['super_admin', 'admin']

      setPermissions(mockPermissions);
      setRoles(mockRoles);
      permissionClient.setPermissions(mockPermissions);
      permissionClient.setRoles(mockRoles);

      // Convert to Partial<AdminPermission> array with proper typing
      const mockAdminPermissions: Partial<AdminPermission>[] = mockPermissions.map((name) => {
        const parts = name.split('_');
        const resource = parts.slice(0, -1).join('_').toLowerCase() || 'system';
        const action = parts[parts.length - 1].toLowerCase() || 'manage';

        // Only include valid actions
        const validActions = ['create', 'read', 'update', 'delete', 'manage', 'execute'];
        const validAction = validActions.includes(action) ? action : 'manage';

        // Cast roles to the correct type
        const typedRoles = mockRoles as (typeof ADMIN_ROLES)[keyof typeof ADMIN_ROLES][];

        return {
          name: name as keyof typeof ADMIN_PERMISSIONS,
          resource,
          action: validAction as 'create' | 'read' | 'update' | 'delete' | 'manage' | 'execute',
          roles: typedRoles,
        };
      });
      setAdminPermissions(mockAdminPermissions);
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  }, [adminId]);

  const hasPermission = useCallback(
    (permission: string): boolean => {
      return permissionClient.hasPermission(permission);
    },
    [permissions]
  );

  const hasAnyPermission = useCallback(
    (permissionList: string[]): boolean => {
      return permissionList.some((p) => hasPermission(p));
    },
    [hasPermission]
  );

  const hasAllPermissions = useCallback(
    (permissionList: string[]): boolean => {
      return permissionList.every((p) => hasPermission(p));
    },
    [hasPermission]
  );

  const hasRole = useCallback(
    (role: string): boolean => {
      return permissionClient.hasRole(role);
    },
    [roles]
  );

  const hasAnyRole = useCallback(
    (roleList: string[]): boolean => {
      return roleList.some((r) => hasRole(r));
    },
    [hasRole]
  );

  const hasAllRoles = useCallback(
    (roleList: string[]): boolean => {
      return roleList.every((r) => hasRole(r));
    },
    [hasRole]
  );

  const hasAdminPermission = useCallback(
    (permission: Partial<AdminPermission>): boolean => {
      if (!permission.name) return false;
      return hasPermission(permission.name);
    },
    [hasPermission]
  );

  const hasAnyAdminPermission = useCallback(
    (permissionList: Partial<AdminPermission>[]): boolean => {
      return permissionList.some((p) => hasAdminPermission(p));
    },
    [hasAdminPermission]
  );

  const hasAllAdminPermissions = useCallback(
    (permissionList: Partial<AdminPermission>[]): boolean => {
      return permissionList.every((p) => hasAdminPermission(p));
    },
    [hasAdminPermission]
  );

  const isSuperAdmin = useCallback((): boolean => {
    return permissionClient.isSuperAdmin();
  }, [roles]);

  const isAdmin = useCallback((): boolean => {
    return permissionClient.isAdmin();
  }, [roles]);

  useEffect(() => {
    if (autoLoad) {
      loadPermissions();
    }
  }, [autoLoad, loadPermissions]);

  return {
    permissions,
    roles,
    adminPermissions,
    isLoading,
    error,
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
    hasRole,
    hasAnyRole,
    hasAllRoles,
    hasAdminPermission,
    hasAnyAdminPermission,
    hasAllAdminPermissions,
    isSuperAdmin,
    isAdmin,
    refresh: loadPermissions,
  };
};

export const useAdminHasPermission = (permission: string): boolean => {
  const { hasPermission } = useAdminPermission({ autoLoad: true });
  return hasPermission(permission);
};

export const useAdminHasAnyPermission = (permissions: string[]): boolean => {
  const { hasAnyPermission } = useAdminPermission({ autoLoad: true });
  return hasAnyPermission(permissions);
};

export const useAdminHasAllPermissions = (permissions: string[]): boolean => {
  const { hasAllPermissions } = useAdminPermission({ autoLoad: true });
  return hasAllPermissions(permissions);
};

export const useAdminHasAdminPermission = (permission: Partial<AdminPermission>): boolean => {
  const { hasAdminPermission } = useAdminPermission({ autoLoad: true });
  return hasAdminPermission(permission);
};

export const useAdminPermissionHasRole = (role: string): boolean => {
  const { hasRole } = useAdminPermission({ autoLoad: true });
  return hasRole(role);
};

export const useAdminPermissionIsSuperAdmin = (): boolean => {
  const { isSuperAdmin } = useAdminPermission({ autoLoad: true });
  return isSuperAdmin();
};

export const useAdminPermissionIsAdmin = (): boolean => {
  const { isAdmin } = useAdminPermission({ autoLoad: true });
  return isAdmin();
};
