/**
 * useRejectKYC Hook
 * KYC রিজেক্ট করার হুক
 */

import { useMutation } from '@tanstack/react-query';
import { UserKYCEndpoints } from '@vubon/shared-api';

export const useRejectKYC = (kycEndpoints: UserKYCEndpoints) => {
  return useMutation({
    mutationFn: ({ kycId, comments }: { kycId: string; comments?: string }) =>
      kycEndpoints.reviewKYC(kycId, { status: 'rejected', comments }),
  });
};
