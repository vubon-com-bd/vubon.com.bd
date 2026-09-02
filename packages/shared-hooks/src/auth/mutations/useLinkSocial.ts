/**
 * Auth useLinkSocial Mutation
 * প্রমীকরণ সোশ্যাল লিংক মিউটেশন
 */

import { useMutation } from '@tanstack/react-query';
import { AuthSocialEndpoints } from '@vubon/shared-api';
import { AuthSocialProfile } from '@vubon/shared-types';

export const useLinkSocial = (socialEndpoints: AuthSocialEndpoints) => {
  return useMutation({
    mutationFn: (data: { provider: string; profile: AuthSocialProfile }) =>
      socialEndpoints.linkSocialAccount(data.provider, data.profile),
  });
};
