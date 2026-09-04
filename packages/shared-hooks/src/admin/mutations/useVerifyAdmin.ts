/**
 * useVerifyAdmin Hook
 * অ্যাডমিন ভেরিফাই করার হুক
 */

import { useMutation } from '@tanstack/react-query';
import { AdminVerificationEndpoints } from '@vubon/shared-api';
import { AdminVerificationVerifyInput } from '@vubon/shared-types';

export const useVerifyAdmin = (verificationEndpoints: AdminVerificationEndpoints) => {
  return useMutation({
    mutationFn: ({
      verificationId,
      data,
    }: {
      verificationId: string;
      data: AdminVerificationVerifyInput;
    }) => verificationEndpoints.verifyCode(verificationId, data),
  });
};
