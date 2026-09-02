/**
 * Auth useUpdateAuthSettings Mutation
 * প্রমীকরণ সেটিংস আপডেট মিউটেশন
 */

import { useMutation } from '@tanstack/react-query';
import { SettingsEndpoints } from '@vubon/shared-api';

export interface AuthSettingsUpdate {
  key: string;
  value: unknown;
}

export const useUpdateAuthSettings = (settingsEndpoints: SettingsEndpoints) => {
  return useMutation({
    mutationFn: (data: AuthSettingsUpdate[]) => settingsEndpoints.updateSettings(data),
  });
};
