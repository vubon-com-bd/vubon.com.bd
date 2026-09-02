/**
 * Auth useVerifyEmail Mutation
 * প্রমীকরণ ইমেইল ভেরিফাই মিউটেশন
 */

import { useMutation } from '@tanstack/react-query';
import { AuthEndpoints } from '@vubon/shared-api';

export const useVerifyEmail = (authEndpoints: AuthEndpoints) => {
  return useMutation({
    mutationFn: (token: string) => authEndpoints.verifyEmail(token),
  });
};
