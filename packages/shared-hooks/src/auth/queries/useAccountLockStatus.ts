/**
 * Auth useAccountLockStatus Hook
 * প্রমীকরণ অ্যাকাউন্ট লক স্ট্যাটাস হুক
 */

import { useQuery } from '@tanstack/react-query';
import { AuthAccountLockEndpoints } from '@vubon/shared-api';

export const useAccountLockStatus = (lockEndpoints: AuthAccountLockEndpoints) => {
  const {
    data: status,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['auth', 'account', 'lock-status'],
    queryFn: () => lockEndpoints.getLockStatus(),
    staleTime: 30 * 1000,
  });

  return {
    status,
    isLoading,
    error,
    refetch,
    isLocked: status?.locked || false,
    attempts: status?.attempts || 0,
    remainingAttempts: status?.remainingAttempts || 0,
    unlockAt: status?.unlockAt,
  };
};
