/**
 * Auth useLogout Mutation
 * প্রমীকরণ লগআউট মিউটেশন
 */

import { useMutation } from '@tanstack/react-query';
import { AuthEndpoints } from '@vubon/shared-api';

export const useLogout = (authEndpoints: AuthEndpoints) => {
  return useMutation({
    mutationFn: () => authEndpoints.logout(),
    onSuccess: () => {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    },
  });
};
