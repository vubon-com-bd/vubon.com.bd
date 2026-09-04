/**
 * useDisableAdminBiometric Hook
 * অ্যাডমিন বায়োমেট্রিক ডিসেবল করার হুক
 */

import { useMutation } from '@tanstack/react-query';
import { AdminBiometricEndpoints } from '@vubon/shared-api';

export const useDisableAdminBiometric = (biometricEndpoints: AdminBiometricEndpoints) => {
  return useMutation({
    mutationFn: ({ adminId, deviceId }: { adminId: string; deviceId: string }) =>
      biometricEndpoints.disableBiometric(adminId, deviceId),
  });
};
