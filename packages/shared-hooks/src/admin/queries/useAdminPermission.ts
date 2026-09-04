/**
 * useAdminPermission Hook
 * একটি অ্যাডমিন পারমিশন পাওয়ার হুক
 */

import { useQuery } from '@tanstack/react-query';
import { AdminPermissionEndpoints } from '@vubon/shared-api';
import { AdminPermission } from '@vubon/shared-types';

export const useAdminPermission = (
  permissionEndpoints: AdminPermissionEndpoints,
  permissionId: string
) => {
  const {
    data: permission,
    isLoading,
    error,
    refetch,
  } = useQuery<AdminPermission>({
    queryKey: ['admin', 'permission', permissionId],
    queryFn: () => permissionEndpoints.getPermission(permissionId),
    enabled: !!permissionId,
    staleTime: 5 * 60 * 1000,
  });

  return {
    permission,
    isLoading,
    error,
    refetch,
  };
};
