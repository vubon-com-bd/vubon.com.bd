/**
 * useAdminSettings Hook
 * অ্যাডমিন সেটিংস পাওয়ার হুক
 */

import { useQuery } from '@tanstack/react-query';
import { AdminSettingsEndpoints } from '@vubon/shared-api';
import { AdminSettings } from '@vubon/shared-types';

export const useAdminSettings = (settingsEndpoints: AdminSettingsEndpoints, adminId: string) => {
  const {
    data: settings,
    isLoading,
    error,
    refetch,
  } = useQuery<AdminSettings[]>({
    queryKey: ['admin', 'settings', adminId],
    queryFn: () => settingsEndpoints.getSettings(adminId),
    enabled: !!adminId,
    staleTime: 5 * 60 * 1000,
  });

  return {
    settings: settings || [],
    isLoading,
    error,
    refetch,
  };
};
