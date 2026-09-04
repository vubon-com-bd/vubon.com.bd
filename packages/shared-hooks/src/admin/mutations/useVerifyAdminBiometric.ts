/**
 * useVerifyAdminBiometric Hook
 * অ্যাডমিন বায়োমেট্রিক ভেরিফাই করার হুক
 */

import { useMutation } from '@tanstack/react-query';
import { AdminBiometricEndpoints } from '@vubon/shared-api';
import { AdminBiometricVerifyInput } from '@vubon/shared-types';

export const useVerifyAdminBiometric = (biometricEndpoints: AdminBiometricEndpoints) => {
  return useMutation({
    mutationFn: ({ adminId, data }: { adminId: string; data: AdminBiometricVerifyInput }) =>
      biometricEndpoints.verifyBiometric(adminId, data),
  });
};
