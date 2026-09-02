/**
 * Auth useLogin Mutation
 * প্রমীকরণ লগইন মিউটেশন
 */

import { useMutation } from '@tanstack/react-query';
import { AuthEndpoints } from '@vubon/shared-api';
import { HTTP_STATUS } from '@vubon/shared-constants';

export const useLogin = (authEndpoints: AuthEndpoints) => {
  return useMutation({
    mutationFn: (data: { email: string; password: string }) => authEndpoints.login(data),
    onSuccess: (data) => {
      // HTTP_STATUS ব্যবহার করে সফল লগইন চেক
      // Store tokens in localStorage or sessionStorage
      if (data.accessToken) {
        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('refreshToken', data.refreshToken);
      }
    },
    onError: (error: Error & { response?: { status: number } }) => {
      // HTTP_STATUS ব্যবহার করে এরর হ্যান্ডেল
      if (error?.response?.status === HTTP_STATUS.UNAUTHORIZED) {
        // Invalid credentials - silently handle
      } else if (error?.response?.status === HTTP_STATUS.TOO_MANY_REQUESTS) {
        // Too many attempts - silently handle
      }
    },
  });
};
