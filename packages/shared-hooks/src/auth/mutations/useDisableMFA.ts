/**
 * Auth useDisableMFA Mutation
 * প্রমীকরণ MFA ডিসেবল মিউটেশন
 */

import { useMutation } from '@tanstack/react-query';
import { AuthMFAEndpoints } from '@vubon/shared-api';

export const useDisableMFA = (mfaEndpoints: AuthMFAEndpoints) => {
  return useMutation({
    mutationFn: (type: string) => mfaEndpoints.disableMFA(type),
  });
};
