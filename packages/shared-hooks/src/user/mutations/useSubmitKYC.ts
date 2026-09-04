/**
 * useSubmitKYC Hook
 * KYC জমা দেওয়ার হুক
 */

import { useMutation } from '@tanstack/react-query';
import { UserKYCEndpoints } from '@vubon/shared-api';
import { UserKYCCreateInput } from '@vubon/shared-types';

export const useSubmitKYC = (kycEndpoints: UserKYCEndpoints) => {
  return useMutation({
    mutationFn: (data: UserKYCCreateInput) => kycEndpoints.createKYC(data),
  });
};

export const useSubmitKYCForVerification = (kycEndpoints: UserKYCEndpoints) => {
  return useMutation({
    mutationFn: (kycId: string) => kycEndpoints.submitKYC(kycId),
  });
};
