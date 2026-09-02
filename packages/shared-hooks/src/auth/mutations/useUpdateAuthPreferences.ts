/**
 * Auth useUpdateAuthPreferences Mutation
 * প্রমীকরণ প্রেফারেন্স আপডেট মিউটেশন
 */

import { useMutation } from '@tanstack/react-query';
import { PreferencesEndpoints } from '@vubon/shared-api';
import { AuthPreferences } from '@vubon/shared-types';

export const useUpdateAuthPreferences = (preferencesEndpoints: PreferencesEndpoints) => {
  return useMutation({
    mutationFn: (data: Partial<AuthPreferences>) => preferencesEndpoints.updatePreferences(data),
  });
};
