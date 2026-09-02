/**
 * Auth usePermissions Hook
 * প্রমীকরণ পারমিশন হুক
 */

import { useQuery } from '@tanstack/react-query';
import { AuthPermissionEndpoints } from '@vubon/shared-api';
import { AUTH_PERMISSION } from '@vubon/shared-constants';

export const usePermissions = (permissionEndpoints: AuthPermissionEndpoints) => {
  const {
    data: permissions,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['auth', 'permissions'],
    queryFn: () => permissionEndpoints.getMyPermissions(),
    staleTime: 5 * 60 * 1000,
  });

  const hasPermission = (permission: string) => {
    // AUTH_PERMISSION ব্যবহার করে চেক করা
    const isValidPermission = Object.keys(AUTH_PERMISSION).includes(permission);
    if (!isValidPermission) return false;
    return permissions?.permissions?.includes(permission) || false;
  };

  const hasAnyPermission = (permissionList: string[]) => {
    return permissionList.some((p) => hasPermission(p));
  };

  const hasAllPermissions = (permissionList: string[]) => {
    return permissionList.every((p) => hasPermission(p));
  };

  const getAvailablePermissions = () => {
    return Object.keys(AUTH_PERMISSION);
  };

  return {
    permissions: permissions?.permissions || [],
    isLoading,
    error,
    refetch,
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
    getAvailablePermissions,
  };
};
