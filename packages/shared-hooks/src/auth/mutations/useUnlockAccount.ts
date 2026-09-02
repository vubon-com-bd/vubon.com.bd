/**
 * Auth useUnlockAccount Mutation
 * প্রমীকরণ অ্যাকাউন্ট আনলক মিউটেশন
 */

import { useMutation } from '@tanstack/react-query';
import { AuthAccountLockEndpoints } from '@vubon/shared-api';

export const useUnlockAccount = (lockEndpoints: AuthAccountLockEndpoints) => {
  return useMutation({
    mutationFn: () => lockEndpoints.unlockAccount(),
  });
};
