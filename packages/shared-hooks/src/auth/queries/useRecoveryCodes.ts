/**
 * Auth useRecoveryCodes Hook
 * প্রমীকরণ রিকোভারি কোড হুক
 */

import { useQuery } from '@tanstack/react-query';
import { AuthRecoveryCodeEndpoints } from '@vubon/shared-api';

export const useRecoveryCodes = (recoveryEndpoints: AuthRecoveryCodeEndpoints) => {
  const {
    data: codes,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['auth', 'recovery-codes'],
    queryFn: () => recoveryEndpoints.listRecoveryCodes(),
    staleTime: 60 * 1000,
  });

  return {
    codes: codes?.codes || [],
    count: codes?.codes?.length || 0,
    isLoading,
    error,
    refetch,
  };
};
