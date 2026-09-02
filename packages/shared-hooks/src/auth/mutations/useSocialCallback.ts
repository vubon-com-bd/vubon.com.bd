/**
 * Auth useSocialCallback Mutation
 * প্রমীকরণ সোশ্যাল কলব্যাক মিউটেশন
 */

import { useMutation } from '@tanstack/react-query';
import { AuthSocialEndpoints } from '@vubon/shared-api';

export const useSocialCallback = (socialEndpoints: AuthSocialEndpoints) => {
  return useMutation({
    mutationFn: (data: { provider: string; code: string }) =>
      socialEndpoints.handleSocialCallback(data.provider, data.code),
    onSuccess: (data) => {
      if (data.accessToken) {
        localStorage.setItem('accessToken', data.accessToken);
      }
    },
  });
};
