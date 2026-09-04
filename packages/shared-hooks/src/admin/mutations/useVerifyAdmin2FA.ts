/**
 * useVerifyAdmin2FA Hook
 * অ্যাডমিন 2FA ভেরিফাই করার হুক
 */

import { useMutation } from '@tanstack/react-query';
import { Admin2FAEndpoints } from '@vubon/shared-api';
import { Admin2FAVerifyInput } from '@vubon/shared-types';

export const useVerifyAdmin2FA = (twoFAEndpoints: Admin2FAEndpoints) => {
  return useMutation({
    mutationFn: ({ adminId, data }: { adminId: string; data: Admin2FAVerifyInput }) =>
      twoFAEndpoints.verify2FA(adminId, data),
  });
};
