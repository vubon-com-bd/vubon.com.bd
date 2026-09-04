/**
 * useVerifyKYC Hook
 * KYC ভেরিফাই করার হুক
 */

import { useMutation } from '@tanstack/react-query';
import { UserKYCEndpoints } from '@vubon/shared-api';

export const useVerifyKYC = (kycEndpoints: UserKYCEndpoints) => {
  return useMutation({
    mutationFn: ({ kycId, comments }: { kycId: string; comments?: string }) =>
      kycEndpoints.reviewKYC(kycId, { status: 'verified', comments }),
  });
};
