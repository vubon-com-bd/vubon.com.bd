/**
 * Auth useEnableBiometric Mutation
 * প্রমীকরণ বায়োমেট্রিক ইন্যাবল মিউটেশন
 */

import { useMutation } from '@tanstack/react-query';
import { AuthBiometricEndpoints } from '@vubon/shared-api';

export const useEnableBiometric = (biometricEndpoints: AuthBiometricEndpoints) => {
  return useMutation({
    mutationFn: (deviceId: string) => biometricEndpoints.enableBiometric(deviceId),
  });
};
