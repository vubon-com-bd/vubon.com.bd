/**
 * useAdminPermissions Hook
 * অ্যাডমিন পারমিশন লিস্ট পাওয়ার হুক
 */

import { useQuery } from '@tanstack/react-query';
import { AdminPermissionEndpoints } from '@vubon/shared-api';
import { AdminPermission } from '@vubon/shared-types';
import { ADMIN_ROLES } from '@vubon/shared-constants';

export const useAdminPermissions = (permissionEndpoints: AdminPermissionEndpoints) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['admin', 'permissions', 'list'],
    queryFn: () => permissionEndpoints.getPermissions(),
    staleTime: 5 * 60 * 1000,
  });

  // AdminPermission টাইপ ব্যবহার করে টাইপ-সেফ ডেটা পাওয়া
  const permissions: AdminPermission[] = data?.permissions || [];

  // রিসোর্স অনুযায়ী পারমিশন ফিল্টার করা
  const getPermissionsByResource = (resource: string): AdminPermission[] => {
    return permissions.filter((p) => p.resource === resource);
  };

  // অ্যাকশন অনুযায়ী পারমিশন ফিল্টার করা
  const getPermissionsByAction = (action: string): AdminPermission[] => {
    return permissions.filter((p) => p.action === action);
  };

  // রোল অনুযায়ী পারমিশন ফিল্টার করা (স্ট্রিং হিসেবে তুলনা)
  const getPermissionsByRole = (role: string): AdminPermission[] => {
    return permissions.filter((p) => {
      return Array.isArray(p.roles) && p.roles.some((r) => r === role);
    });
  };

  // রোল ভ্যালিডেট করা (ADMIN_ROLES ব্যবহার করে)
  const isValidAdminRole = (role: string): boolean => {
    const validRoles: string[] = Object.values(ADMIN_ROLES);
    return validRoles.includes(role);
  };

  // পারমিশন গ্রুপ করা (রিসোর্স ভিত্তিক)
  const getPermissionsGroupedByResource = (): Record<string, AdminPermission[]> => {
    const grouped: Record<string, AdminPermission[]> = {};
    for (const permission of permissions) {
      if (!grouped[permission.resource]) {
        grouped[permission.resource] = [];
      }
      grouped[permission.resource].push(permission);
    }
    return grouped;
  };

  // পারমিশন নামের লিস্ট পাওয়া
  const getPermissionNames = (): string[] => {
    return permissions.map((p) => p.name);
  };

  return {
    permissions,
    total: data?.total || 0,
    isLoading,
    error,
    refetch,
    getPermissionsByResource,
    getPermissionsByAction,
    getPermissionsByRole,
    getPermissionsGroupedByResource,
    getPermissionNames,
    isValidAdminRole,
  };
};
