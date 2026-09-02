/**
 * Auth useSocialLogin Mutation
 * প্রমীকরণ সোশ্যাল লগইন মিউটেশন
 */

import { useMutation } from '@tanstack/react-query';
import { AuthSocialEndpoints } from '@vubon/shared-api';

export const useSocialLogin = (socialEndpoints: AuthSocialEndpoints) => {
  return useMutation({
    mutationFn: (data: { provider: string; token: string }) =>
      socialEndpoints.loginWithSocial(data.provider, data.token),
    onSuccess: (data) => {
      if (data.accessToken) {
        localStorage.setItem('accessToken', data.accessToken);
      }
    },
  });
};
