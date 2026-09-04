/**
 * useUpdateAdminSettings Hook
 * অ্যাডমিন সেটিংস আপডেট করার হুক
 */

import { useMutation } from '@tanstack/react-query';
import { AdminSettingsEndpoints } from '@vubon/shared-api';
import { AdminSettings } from '@vubon/shared-types';

export const useUpdateAdminSettings = (settingsEndpoints: AdminSettingsEndpoints) => {
  return useMutation({
    mutationFn: ({ adminId, settings }: { adminId: string; settings: AdminSettings[] }) =>
      settingsEndpoints.updateSettings(adminId, settings),
  });
};
