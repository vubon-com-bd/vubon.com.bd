/**
 * useUserPermissions Hook
 * ইউজারের পারমিশন পাওয়ার হুক
 */

import { useQuery } from '@tanstack/react-query';
import { UserPermissionEndpoints } from '@vubon/shared-api';
import { UserPermission } from '@vubon/shared-types';

export const useUserPermissions = (
  permissionEndpoints: UserPermissionEndpoints,
  userId: string
) => {
  const {
    data: permissions,
    isLoading,
    error,
    refetch,
  } = useQuery<UserPermission[]>({
    queryKey: ['user', 'permissions', userId],
    queryFn: () => permissionEndpoints.getPermissions(userId),
    enabled: !!userId,
    staleTime: 5 * 60 * 1000,
  });

  const { data: effective } = useQuery({
    queryKey: ['user', 'permissions', 'effective', userId],
    queryFn: () => permissionEndpoints.getEffectivePermissions(userId),
    enabled: !!userId,
    staleTime: 5 * 60 * 1000,
  });

  const hasPermission = (permission: string) => {
    return effective?.permissions?.includes(permission) || false;
  };

  const hasAnyPermission = (permissionList: string[]) => {
    return permissionList.some((p) => hasPermission(p));
  };

  const hasAllPermissions = (permissionList: string[]) => {
    return permissionList.every((p) => hasPermission(p));
  };

  return {
    permissions: permissions || [],
    effectivePermissions: effective?.permissions || [],
    roles: effective?.roles || [],
    isLoading,
    error,
    refetch,
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
  };
};

export const useMyPermissions = (permissionEndpoints: UserPermissionEndpoints) => {
  const {
    data: permissions,
    isLoading,
    error,
    refetch,
  } = useQuery<UserPermission[]>({
    queryKey: ['user', 'permissions', 'me'],
    queryFn: () => permissionEndpoints.getMyPermissions(),
    staleTime: 5 * 60 * 1000,
  });

  const { data: effective } = useQuery({
    queryKey: ['user', 'permissions', 'effective', 'me'],
    queryFn: () => permissionEndpoints.getMyEffectivePermissions(),
    staleTime: 5 * 60 * 1000,
  });

  const hasPermission = (permission: string) => {
    return effective?.permissions?.includes(permission) || false;
  };

  const hasAnyPermission = (permissionList: string[]) => {
    return permissionList.some((p) => hasPermission(p));
  };

  const hasAllPermissions = (permissionList: string[]) => {
    return permissionList.every((p) => hasPermission(p));
  };

  return {
    permissions: permissions || [],
    effectivePermissions: effective?.permissions || [],
    roles: effective?.roles || [],
    isLoading,
    error,
    refetch,
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
  };
};
