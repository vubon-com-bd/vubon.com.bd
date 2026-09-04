/**
 * useUpdateAdminPreferences Hook
 * অ্যাডমিন প্রেফারেন্স আপডেট করার হুক
 */

import { useMutation } from '@tanstack/react-query';
import { AdminPreferencesEndpoints } from '@vubon/shared-api';
import { AdminPreferencesUpdateInput } from '@vubon/shared-types';

export const useUpdateAdminPreferences = (preferencesEndpoints: AdminPreferencesEndpoints) => {
  return useMutation({
    mutationFn: ({ adminId, data }: { adminId: string; data: AdminPreferencesUpdateInput }) =>
      preferencesEndpoints.updatePreferences(adminId, data),
  });
};
