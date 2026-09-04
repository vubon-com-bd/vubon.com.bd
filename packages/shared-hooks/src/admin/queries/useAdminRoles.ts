/**
 * useAdminRoles Hook
 * অ্যাডমিন রোল লিস্ট পাওয়ার হুক
 */

import { useQuery } from '@tanstack/react-query';
import { AdminRoleEndpoints } from '@vubon/shared-api';
import { AdminRole } from '@vubon/shared-types';

export const useAdminRoles = (roleEndpoints: AdminRoleEndpoints) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['admin', 'roles', 'list'],
    queryFn: () => roleEndpoints.getRoles(),
    staleTime: 5 * 60 * 1000,
  });

  const { data: hierarchy } = useQuery({
    queryKey: ['admin', 'roles', 'hierarchy'],
    queryFn: () => roleEndpoints.getRoleHierarchy(),
    staleTime: 10 * 60 * 1000,
  });

  // AdminRole টাইপ ব্যবহার করে টাইপ-সেফ ডেটা পাওয়া
  const roles: AdminRole[] = data?.roles || [];

  // সিস্টেম রোল ফিল্টার করা
  const getSystemRoles = (): AdminRole[] => {
    return roles.filter((role) => role.isSystem === true);
  };

  // ডিফল্ট রোল ফিল্টার করা
  const getDefaultRoles = (): AdminRole[] => {
    return roles.filter((role) => role.isDefault === true);
  };

  // হায়ারার্কি অনুযায়ী সাজানো
  const getRolesByHierarchy = (): AdminRole[] => {
    return [...roles].sort((a, b) => b.hierarchy - a.hierarchy);
  };

  // রোল নামের লিস্ট পাওয়া
  const getRoleNames = (): string[] => {
    return roles.map((role) => role.name);
  };

  // রোল দ্বারা পারমিশন পাওয়া
  const getPermissionsByRole = (roleName: string): string[] => {
    const role = roles.find((r) => r.name === roleName);
    return role?.permissions || [];
  };

  return {
    roles,
    total: data?.total || 0,
    hierarchy: hierarchy || {},
    isLoading,
    error,
    refetch,
    getSystemRoles,
    getDefaultRoles,
    getRolesByHierarchy,
    getRoleNames,
    getPermissionsByRole,
  };
};
