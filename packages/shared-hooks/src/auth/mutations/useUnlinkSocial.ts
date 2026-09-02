/**
 * Auth useUnlinkSocial Mutation
 * প্রমীকরণ সোশ্যাল আনলিংক মিউটেশন
 */

import { useMutation } from '@tanstack/react-query';
import { AuthSocialEndpoints } from '@vubon/shared-api';

export const useUnlinkSocial = (socialEndpoints: AuthSocialEndpoints) => {
  return useMutation({
    mutationFn: (provider: string) => socialEndpoints.unlinkSocialAccount(provider),
  });
};
