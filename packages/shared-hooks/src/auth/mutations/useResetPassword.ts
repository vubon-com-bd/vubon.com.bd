/**
 * Auth useResetPassword Mutation
 * প্রমীকরণ রিসেট পাসওয়ার্ড মিউটেশন
 */

import { useMutation } from '@tanstack/react-query';
import { AuthEndpoints } from '@vubon/shared-api';

export const useResetPassword = (authEndpoints: AuthEndpoints) => {
  return useMutation({
    mutationFn: (data: { token: string; newPassword: string }) =>
      authEndpoints.resetPassword(data.token, data.newPassword),
  });
};
