/**
 * Auth useGenerateRecoveryCodes Mutation
 * প্রমীকরণ রিকোভারি কোড জেনারেট মিউটেশন
 */

import { useMutation } from '@tanstack/react-query';
import { AuthRecoveryCodeEndpoints } from '@vubon/shared-api';

export const useGenerateRecoveryCodes = (recoveryEndpoints: AuthRecoveryCodeEndpoints) => {
  return useMutation({
    mutationFn: () => recoveryEndpoints.generateRecoveryCodes(),
  });
};
