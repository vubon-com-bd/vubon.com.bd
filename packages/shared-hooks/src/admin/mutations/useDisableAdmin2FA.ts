/**
 * useDisableAdmin2FA Hook
 * অ্যাডমিন 2FA ডিসেবল করার হুক
 */

import { useMutation } from '@tanstack/react-query';
import { Admin2FAEndpoints } from '@vubon/shared-api';

export const useDisableAdmin2FA = (twoFAEndpoints: Admin2FAEndpoints) => {
  return useMutation({
    mutationFn: ({ adminId, method }: { adminId: string; method: string }) =>
      twoFAEndpoints.disable2FA(adminId, method),
  });
};
