/**
 * Auth useForgotPassword Mutation
 * প্রমীকরণ ফরগট পাসওয়ার্ড মিউটেশন
 */

import { useMutation } from '@tanstack/react-query';
import { AuthEndpoints } from '@vubon/shared-api';
import { AUTH_VERIFICATION } from '@vubon/shared-constants';

export const useForgotPassword = (authEndpoints: AuthEndpoints) => {
  return useMutation({
    mutationFn: (email: string) => authEndpoints.forgotPassword(email),
    onSuccess: (data) => {
      // AUTH_VERIFICATION ব্যবহার করে স্ট্যাটাস চেক করা
      const status = data.success
        ? AUTH_VERIFICATION.STATUS.VERIFIED
        : AUTH_VERIFICATION.STATUS.PENDING;

      // onSuccess callback-এ status পাঠানো হচ্ছে
      return { ...data, status };
    },
  });
};
