/**
 * Auth useRecoverAccount Mutation
 * প্রমীকরণ অ্যাকাউন্ট রিকোভার মিউটেশন
 */

import { useMutation } from '@tanstack/react-query';
import { AuthAccountLockEndpoints } from '@vubon/shared-api';

export const useRecoverAccount = (lockEndpoints: AuthAccountLockEndpoints) => {
  return useMutation({
    mutationFn: () => lockEndpoints.unlockAccount(),
  });
};
