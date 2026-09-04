/**
 * useUpdatePreferences Hook
 * প্রেফারেন্স আপডেট করার হুক
 */

import { useMutation } from '@tanstack/react-query';
import { PreferencesEndpoints } from '@vubon/shared-api';
import { UserPreferences, UserPreferencesUpdateInput } from '@vubon/shared-types';

export const useUpdatePreferences = (preferencesEndpoints: PreferencesEndpoints) => {
  return useMutation({
    mutationFn: (data: UserPreferencesUpdateInput) =>
      preferencesEndpoints.updatePreferences(data as Partial<UserPreferences>),
  });
};
