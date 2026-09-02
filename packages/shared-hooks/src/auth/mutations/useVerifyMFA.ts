/**
 * Auth useVerifyMFA Mutation
 * প্রমীকরণ MFA ভেরিফাই মিউটেশন
 */

import { useMutation } from '@tanstack/react-query';
import { AuthMFAEndpoints } from '@vubon/shared-api';
import { AuthMFAMethod } from '@vubon/shared-types';

export const useVerifyMFA = (mfaEndpoints: AuthMFAEndpoints) => {
  return useMutation({
    mutationFn: (data: { code: string; method: AuthMFAMethod }) => mfaEndpoints.verifyMFA(data),
  });
};
