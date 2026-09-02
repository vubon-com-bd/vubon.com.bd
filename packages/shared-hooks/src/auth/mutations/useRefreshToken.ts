/**
 * Auth useRefreshToken Mutation
 * প্রমীকরণ টোকেন রিফ্রেশ মিউটেশন
 */

import { useMutation } from '@tanstack/react-query';
import { AuthEndpoints } from '@vubon/shared-api';

export const useRefreshToken = (authEndpoints: AuthEndpoints) => {
  return useMutation({
    mutationFn: (refreshToken: string) => authEndpoints.refreshToken({ refreshToken }),
    onSuccess: (data) => {
      if (data.accessToken) {
        localStorage.setItem('accessToken', data.accessToken);
        if (data.refreshToken) {
          localStorage.setItem('refreshToken', data.refreshToken);
        }
      }
    },
  });
};
