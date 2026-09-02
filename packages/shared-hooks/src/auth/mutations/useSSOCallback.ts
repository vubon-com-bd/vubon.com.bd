/**
 * Auth useSSOCallback Mutation
 * প্রমীকরণ SSO কলব্যাক মিউটেশন
 */

import { useMutation } from '@tanstack/react-query';
import { AuthSSOEndpoints } from '@vubon/shared-api';

export const useSSOCallback = (ssoEndpoints: AuthSSOEndpoints) => {
  return useMutation({
    mutationFn: (data: { providerId: string; samlResponse?: string; relayState?: string }) =>
      ssoEndpoints.handleSSOCallback(data.providerId, data),
    onSuccess: (data) => {
      if (data.accessToken) {
        localStorage.setItem('accessToken', data.accessToken);
      }
    },
  });
};
