/**
 * useUserRoles Hook
 * ইউজারের রোল পাওয়ার হুক
 */

import { useQuery } from '@tanstack/react-query';
import { UserRoleEndpoints } from '@vubon/shared-api';
import { UserRole } from '@vubon/shared-types';

export const useUserRoles = (roleEndpoints: UserRoleEndpoints, userId: string) => {
  const {
    data: roles,
    isLoading,
    error,
    refetch,
  } = useQuery<UserRole[]>({
    queryKey: ['user', 'roles', userId],
    queryFn: () => roleEndpoints.getRoles(userId),
    enabled: !!userId,
    staleTime: 5 * 60 * 1000,
  });

  const { data: available } = useQuery({
    queryKey: ['user', 'roles', 'available'],
    queryFn: () => roleEndpoints.getAvailableRoles(),
    staleTime: 10 * 60 * 1000,
  });

  const { data: hierarchy } = useQuery({
    queryKey: ['user', 'roles', 'hierarchy'],
    queryFn: () => roleEndpoints.getRoleHierarchy(),
    staleTime: 10 * 60 * 1000,
  });

  const hasRole = (role: string) => {
    return roles?.some((r) => r.role === role) || false;
  };

  const hasAnyRole = (roleList: string[]) => {
    return roleList.some((r) => hasRole(r));
  };

  const hasAllRoles = (roleList: string[]) => {
    return roleList.every((r) => hasRole(r));
  };

  return {
    roles: roles || [],
    availableRoles: available?.roles || [],
    hierarchy: hierarchy?.hierarchy || {},
    isLoading,
    error,
    refetch,
    hasRole,
    hasAnyRole,
    hasAllRoles,
  };
};

export const useMyRoles = (roleEndpoints: UserRoleEndpoints) => {
  const {
    data: roles,
    isLoading,
    error,
    refetch,
  } = useQuery<UserRole[]>({
    queryKey: ['user', 'roles', 'me'],
    queryFn: () => roleEndpoints.getMyRoles(),
    staleTime: 5 * 60 * 1000,
  });

  const hasRole = (role: string) => {
    return roles?.some((r) => r.role === role) || false;
  };

  return {
    roles: roles || [],
    isLoading,
    error,
    refetch,
    hasRole,
    hasAnyRole: (roleList: string[]) => roleList.some((r) => hasRole(r)),
    hasAllRoles: (roleList: string[]) => roleList.every((r) => hasRole(r)),
  };
};
