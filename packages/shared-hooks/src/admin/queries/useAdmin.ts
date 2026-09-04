/**
 * useAdmin Hook
 * একটি অ্যাডমিন পাওয়ার হুক
 */

import { useQuery } from '@tanstack/react-query';
import { AdminEndpoints } from '@vubon/shared-api';
import { Admin } from '@vubon/shared-types';

export const useAdmin = (adminEndpoints: AdminEndpoints, adminId: string) => {
  const {
    data: admin,
    isLoading,
    error,
    refetch,
  } = useQuery<Admin>({
    queryKey: ['admin', 'detail', adminId],
    queryFn: () => adminEndpoints.getAdmin(adminId),
    enabled: !!adminId,
    staleTime: 5 * 60 * 1000,
  });

  return {
    admin,
    isLoading,
    error,
    refetch,
  };
};
