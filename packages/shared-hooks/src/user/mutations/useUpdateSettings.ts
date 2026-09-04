/**
 * useUpdateSettings Hook
 * সেটিংস আপডেট করার হুক
 */

import { useMutation } from '@tanstack/react-query';
import { SettingsEndpoints } from '@vubon/shared-api';
import { UserSettings, UserSettingsUpdateInput } from '@vubon/shared-types';

export const useUpdateSettings = (settingsEndpoints: SettingsEndpoints) => {
  return useMutation({
    mutationFn: async (data: UserSettingsUpdateInput) => {
      // SettingsEndpoints expects SettingsUpdate[] format
      const updateData: Array<{ key: string; value: unknown }> = [];

      // UserSettings টাইপ ব্যবহার করে ডেটা ম্যাপ করা
      const settingsData = data as Partial<UserSettings>;

      for (const [key, value] of Object.entries(settingsData)) {
        if (value !== undefined) {
          updateData.push({ key, value });
        }
      }

      return settingsEndpoints.updateSettings(updateData);
    },
  });
};
