/**
 * useEnableAdminBiometric Hook
 * অ্যাডমিন বায়োমেট্রিক ইন্যাবল করার হুক
 */

import { useMutation } from '@tanstack/react-query';
import { AdminBiometricEndpoints } from '@vubon/shared-api';

export const useEnableAdminBiometric = (biometricEndpoints: AdminBiometricEndpoints) => {
  return useMutation({
    mutationFn: ({ adminId, deviceId }: { adminId: string; deviceId: string }) =>
      biometricEndpoints.enableBiometric(adminId, deviceId),
  });
};
