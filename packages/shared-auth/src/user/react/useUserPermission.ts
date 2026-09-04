/**
 * useUserPermission Hook
 * ইউজার পারমিশন হুক
 */

import { useState, useEffect, useCallback } from 'react';
import { UserPermission } from '@vubon/shared-types';
import { USER_PERMISSIONS } from '@vubon/shared-constants';

export interface UseUserPermissionOptions {
  userId?: string;
  autoLoad?: boolean;
}

export interface UseUserPermissionResult {
  permissions: UserPermission[];
  isLoading: boolean;
  error: Error | null;
  hasPermission: (permission: string) => boolean;
  hasAnyPermission: (permissions: string[]) => boolean;
  hasAllPermissions: (permissions: string[]) => boolean;
  getPermissionsByResource: (resource: string) => UserPermission[];
  refresh: () => Promise<void>;
}

// Extended type for mock permission
interface MockPermission {
  id: string;
  userId: string;
  permission: string;
  resource: string;
  action: string;
  scope: 'global' | 'organization' | 'team' | 'user';
  grantedBy: string;
  grantedAt: Date;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export const useUserPermission = (
  options: UseUserPermissionOptions = {}
): UseUserPermissionResult => {
  const { userId, autoLoad = true } = options;

  const [permissions, setPermissions] = useState<UserPermission[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const loadPermissions = useCallback(async () => {
    if (!userId) {
      setPermissions([]);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // In real implementation, this would fetch from API
      // For now, return mock permissions from constants
      const permissionKeys = Object.keys(USER_PERMISSIONS) as readonly string[];
      const mockPermissions: MockPermission[] = permissionKeys.map((key, index) => ({
        id: `perm_${index}`,
        userId: userId,
        permission: key,
        resource: key.split('_')[0]?.toLowerCase() || 'system',
        action: key.split('_')[1]?.toLowerCase() || 'manage',
        scope: 'global' as const,
        grantedBy: 'system',
        grantedAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      }));

      // Convert to UserPermission type
      setPermissions(mockPermissions as unknown as UserPermission[]);
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  const hasPermission = useCallback(
    (permission: string): boolean => {
      // Check if permission exists in constants
      const permissionKeys = Object.keys(USER_PERMISSIONS) as readonly string[];
      const isValidPermission = permissionKeys.includes(permission);

      if (!isValidPermission) {
        return false;
      }

      // Check if user has the permission
      return permissions.some((p) => String(p.permission) === permission);
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

  const getPermissionsByResource = useCallback(
    (resource: string): UserPermission[] => {
      return permissions.filter((p) => p.resource === resource);
    },
    [permissions]
  );

  useEffect(() => {
    if (autoLoad) {
      loadPermissions();
    }
  }, [autoLoad, loadPermissions]);

  return {
    permissions,
    isLoading,
    error,
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
    getPermissionsByResource,
    refresh: loadPermissions,
  };
};

export const useUserHasPermission = (permission: string): boolean => {
  const { hasPermission } = useUserPermission({ autoLoad: true });
  return hasPermission(permission);
};

export const useUserHasAnyPermission = (permissions: string[]): boolean => {
  const { hasAnyPermission } = useUserPermission({ autoLoad: true });
  return hasAnyPermission(permissions);
};

export const useUserHasAllPermissions = (permissions: string[]): boolean => {
  const { hasAllPermissions } = useUserPermission({ autoLoad: true });
  return hasAllPermissions(permissions);
};
