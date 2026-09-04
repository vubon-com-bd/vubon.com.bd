/**
 * useEnableAdmin2FA Hook
 * অ্যাডমিন 2FA ইন্যাবল করার হুক
 */

import { useMutation } from '@tanstack/react-query';
import { Admin2FAEndpoints } from '@vubon/shared-api';

export const useEnableAdmin2FA = (twoFAEndpoints: Admin2FAEndpoints) => {
  return useMutation({
    mutationFn: ({ adminId, method }: { adminId: string; method: string }) =>
      twoFAEndpoints.enable2FA(adminId, method),
  });
};
