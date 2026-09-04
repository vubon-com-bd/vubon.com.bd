/**
 * useAdminRole Hook
 * একটি অ্যাডমিন রোল পাওয়ার হুক
 */

import { useQuery } from '@tanstack/react-query';
import { AdminRoleEndpoints } from '@vubon/shared-api';
import { AdminRole } from '@vubon/shared-types';

export const useAdminRole = (roleEndpoints: AdminRoleEndpoints, roleId: string) => {
  const {
    data: role,
    isLoading,
    error,
    refetch,
  } = useQuery<AdminRole>({
    queryKey: ['admin', 'role', roleId],
    queryFn: () => roleEndpoints.getRole(roleId),
    enabled: !!roleId,
    staleTime: 5 * 60 * 1000,
  });

  return {
    role,
    isLoading,
    error,
    refetch,
  };
};
