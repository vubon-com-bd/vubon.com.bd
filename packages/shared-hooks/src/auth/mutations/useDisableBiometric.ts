/**
 * Auth useDisableBiometric Mutation
 * প্রমীকরণ বায়োমেট্রিক ডিসেবল মিউটেশন
 */

import { useMutation } from '@tanstack/react-query';
import { AuthBiometricEndpoints } from '@vubon/shared-api';

export const useDisableBiometric = (biometricEndpoints: AuthBiometricEndpoints) => {
  return useMutation({
    mutationFn: (deviceId: string) => biometricEndpoints.disableBiometric(deviceId),
  });
};
