/**
 * Auth useSSOLogin Mutation
 * প্রমীকরণ SSO লগইন মিউটেশন
 */

import { useMutation } from '@tanstack/react-query';
import { AuthSSOEndpoints } from '@vubon/shared-api';

export const useSSOLogin = (ssoEndpoints: AuthSSOEndpoints) => {
  return useMutation({
    mutationFn: (providerId: string) => ssoEndpoints.initiateSSOLogin(providerId),
  });
};
