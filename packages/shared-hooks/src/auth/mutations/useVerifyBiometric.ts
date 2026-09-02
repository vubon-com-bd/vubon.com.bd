/**
 * Auth useVerifyBiometric Mutation
 * প্রমীকরণ বায়োমেট্রিক ভেরিফাই মিউটেশন
 */

import { useMutation } from '@tanstack/react-query';
import { AuthBiometricEndpoints } from '@vubon/shared-api';
import { AuthBiometricVerifyInput } from '@vubon/shared-types';

export const useVerifyBiometric = (biometricEndpoints: AuthBiometricEndpoints) => {
  return useMutation({
    mutationFn: (data: AuthBiometricVerifyInput) => biometricEndpoints.verifyBiometric(data),
  });
};
