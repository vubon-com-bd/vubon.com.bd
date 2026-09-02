/**
 * Auth useLoginAttempts Hook
 * প্রমীকরণ লগইন Attempts হুক
 */

import { useQuery } from '@tanstack/react-query';
import { AuthLoginAttemptEndpoints } from '@vubon/shared-api';

export const useLoginAttempts = (attemptEndpoints: AuthLoginAttemptEndpoints) => {
  const {
    data: stats,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['auth', 'login-attempts', 'stats'],
    queryFn: () => attemptEndpoints.getStats(),
    staleTime: 30 * 1000,
  });

  const { data: history } = useQuery({
    queryKey: ['auth', 'login-attempts', 'history'],
    queryFn: () => attemptEndpoints.getHistory(10),
    staleTime: 60 * 1000,
  });

  return {
    stats,
    history: history?.items || [],
    isLoading,
    error,
    refetch,
    failedAttempts: stats?.failedAttempts || 0,
    remainingAttempts: stats?.remainingAttempts || 0,
    isBlocked: (stats?.blockedAttempts || 0) > 0,
  };
};
