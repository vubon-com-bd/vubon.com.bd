/**
 * useAdminRole Hook
 * অ্যাডমিন রোল হুক
 */

import { useState, useEffect, useCallback } from 'react';
import { ADMIN_ROLES } from '@vubon/shared-constants';

export interface UseAdminRoleOptions {
  adminId?: string;
  autoLoad?: boolean;
}

export interface UseAdminRoleResult {
  roles: string[];
  isLoading: boolean;
  error: Error | null;
  hasRole: (role: string) => boolean;
  hasAnyRole: (roles: string[]) => boolean;
  hasAllRoles: (roles: string[]) => boolean;
  getRoleHierarchy: (role: string) => number;
  isSuperAdmin: () => boolean;
  isAdmin: () => boolean;
  refresh: () => Promise<void>;
}

export const useAdminRole = (options: UseAdminRoleOptions = {}): UseAdminRoleResult => {
  const { adminId, autoLoad = true } = options;

  const [roles, setRoles] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const loadRoles = useCallback(async () => {
    if (!adminId) {
      setRoles([]);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // In real implementation, this would fetch from API
      // For now, return mock data
      const mockRoles = ['admin', 'moderator'];
      setRoles(mockRoles);
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  }, [adminId]);

  const hasRole = useCallback(
    (role: string): boolean => {
      return roles.includes(role);
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

  const getRoleHierarchy = useCallback((role: string): number => {
    const hierarchy: Record<string, number> = {
      [ADMIN_ROLES.SUPER_ADMIN]: 100,
      [ADMIN_ROLES.SYSTEM_ADMIN]: 95,
      [ADMIN_ROLES.ADMIN]: 90,
      [ADMIN_ROLES.AUTH_ADMIN]: 88,
      [ADMIN_ROLES.FINANCE_ADMIN]: 85,
      [ADMIN_ROLES.MANAGER]: 80,
      [ADMIN_ROLES.AUTH_SERVICE]: 78,
      [ADMIN_ROLES.AUTH_MANAGER]: 75,
      [ADMIN_ROLES.CONTENT_ADMIN]: 70,
      [ADMIN_ROLES.USER_ADMIN]: 70,
      [ADMIN_ROLES.REPORT_ADMIN]: 65,
      [ADMIN_ROLES.SETTINGS_ADMIN]: 65,
      [ADMIN_ROLES.MODERATOR]: 60,
      [ADMIN_ROLES.SUPPORT]: 40,
      [ADMIN_ROLES.AUTH_SUPPORT]: 40,
    };
    return hierarchy[role] || 0;
  }, []);

  const isSuperAdmin = useCallback((): boolean => {
    return hasRole(ADMIN_ROLES.SUPER_ADMIN);
  }, [hasRole]);

  const isAdmin = useCallback((): boolean => {
    return hasAnyRole([ADMIN_ROLES.SUPER_ADMIN, ADMIN_ROLES.SYSTEM_ADMIN, ADMIN_ROLES.ADMIN]);
  }, [hasAnyRole]);

  useEffect(() => {
    if (autoLoad) {
      loadRoles();
    }
  }, [autoLoad, loadRoles]);

  return {
    roles,
    isLoading,
    error,
    hasRole,
    hasAnyRole,
    hasAllRoles,
    getRoleHierarchy,
    isSuperAdmin,
    isAdmin,
    refresh: loadRoles,
  };
};

// Role-specific hooks (unique names)
export const useAdminRoleHasRole = (role: string): boolean => {
  const { hasRole } = useAdminRole({ autoLoad: true });
  return hasRole(role);
};

export const useAdminRoleIsSuperAdmin = (): boolean => {
  const { isSuperAdmin } = useAdminRole({ autoLoad: true });
  return isSuperAdmin();
};

export const useAdminRoleIsAdmin = (): boolean => {
  const { isAdmin } = useAdminRole({ autoLoad: true });
  return isAdmin();
};
