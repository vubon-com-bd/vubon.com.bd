/**
 * Auth useSessions Hook
 * প্রমীকরণ সেশন লিস্ট হুক
 */

import { useQuery } from '@tanstack/react-query';
import { AuthSessionEndpoints } from '@vubon/shared-api';

export const useSessions = (sessionEndpoints: AuthSessionEndpoints) => {
  const {
    data: sessions,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['auth', 'sessions'],
    queryFn: () => sessionEndpoints.getSessions(),
    staleTime: 30 * 1000,
  });

  return {
    sessions: sessions || [],
    isLoading,
    error,
    refetch,
  };
};
