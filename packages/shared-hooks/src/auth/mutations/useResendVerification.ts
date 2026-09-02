/**
 * Auth useResendVerification Mutation
 * প্রমীকরণ ভেরিফিকেশন পুনরায় পাঠান মিউটেশন
 */

import { useMutation } from '@tanstack/react-query';
import { AuthEndpoints } from '@vubon/shared-api';

export const useResendVerification = (authEndpoints: AuthEndpoints) => {
  return useMutation({
    mutationFn: (email: string) => authEndpoints.resendVerification(email),
  });
};
