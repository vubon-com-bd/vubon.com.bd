/**
 * useAdminPreferences Hook
 * অ্যাডমিন প্রেফারেন্স পাওয়ার হুক
 */

import { useQuery } from '@tanstack/react-query';
import { AdminPreferencesEndpoints } from '@vubon/shared-api';
import { AdminPreferences } from '@vubon/shared-types';

export const useAdminPreferences = (
  preferencesEndpoints: AdminPreferencesEndpoints,
  adminId: string
) => {
  const {
    data: preferences,
    isLoading,
    error,
    refetch,
  } = useQuery<AdminPreferences>({
    queryKey: ['admin', 'preferences', adminId],
    queryFn: () => preferencesEndpoints.getPreferences(adminId),
    enabled: !!adminId,
    staleTime: 5 * 60 * 1000,
  });

  return {
    preferences,
    isLoading,
    error,
    refetch,
  };
};
