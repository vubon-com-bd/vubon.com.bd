/**
 * Auth useEnableMFA Mutation
 * প্রমীকরণ MFA ইন্যাবল মিউটেশন
 */

import { useMutation } from '@tanstack/react-query';
import { AuthMFAEndpoints } from '@vubon/shared-api';

export const useEnableMFA = (mfaEndpoints: AuthMFAEndpoints) => {
  return useMutation({
    mutationFn: (type: string) => mfaEndpoints.enableMFA(type),
  });
};
