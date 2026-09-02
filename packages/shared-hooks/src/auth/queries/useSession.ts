/**
 * Auth useSession Hook
 * প্রমীকরণ সেশন হুক
 */

import { useQuery } from '@tanstack/react-query';
import { AuthSessionEndpoints } from '@vubon/shared-api';
import { AUTH_SESSION } from '@vubon/shared-constants';

export const useSession = (sessionEndpoints: AuthSessionEndpoints, sessionId: string) => {
  const {
    data: session,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['auth', 'session', sessionId],
    queryFn: () => sessionEndpoints.getSession(sessionId),
    enabled: !!sessionId,
    staleTime: 30 * 1000,
  });

  // string হিসেবে কাস্ট করে তুলনা করা
  const sessionStatus = session?.status as string;
  const isActive = sessionStatus === AUTH_SESSION.STATUS.ACTIVE;
  const isExpired = sessionStatus === AUTH_SESSION.STATUS.EXPIRED;
  const isTerminated = sessionStatus === AUTH_SESSION.STATUS.TERMINATED;
  const isRevoked = sessionStatus === AUTH_SESSION.STATUS.REVOKED;
  const isPending = sessionStatus === AUTH_SESSION.STATUS.PENDING;
  const isInactive = sessionStatus === AUTH_SESSION.STATUS.INACTIVE;

  return {
    session,
    isActive,
    isExpired,
    isTerminated,
    isRevoked,
    isPending,
    isInactive,
    isLoading,
    error,
    refetch,
  };
};
