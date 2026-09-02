/**
 * Auth useLockAccount Mutation
 * প্রমীকরণ অ্যাকাউন্ট লক মিউটেশন
 */

import { useMutation } from '@tanstack/react-query';
import { AuthAccountLockEndpoints } from '@vubon/shared-api';

export const useLockAccount = (lockEndpoints: AuthAccountLockEndpoints) => {
  return useMutation({
    mutationFn: (reason?: string) => lockEndpoints.lockAccount(reason),
  });
};
