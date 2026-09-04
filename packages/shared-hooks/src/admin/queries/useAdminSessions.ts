/**
 * useAdminSessions Hook
 * অ্যাডমিন সেশন পাওয়ার হুক
 */

import { useQuery } from '@tanstack/react-query';
import { AdminSessionEndpoints } from '@vubon/shared-api';
import { AdminSession } from '@vubon/shared-types';

export const useAdminSessions = (sessionEndpoints: AdminSessionEndpoints, adminId: string) => {
  const {
    data: sessions,
    isLoading,
    error,
    refetch,
  } = useQuery<AdminSession[]>({
    queryKey: ['admin', 'sessions', adminId],
    queryFn: () => sessionEndpoints.getSessions(adminId),
    enabled: !!adminId,
    staleTime: 2 * 60 * 1000,
  });

  const { data: activeCount } = useQuery({
    queryKey: ['admin', 'sessions', 'active-count', adminId],
    queryFn: () => sessionEndpoints.getActiveSessionsCount(adminId),
    enabled: !!adminId,
    staleTime: 1 * 60 * 1000,
  });

  return {
    sessions: sessions || [],
    activeCount: activeCount?.count || 0,
    isLoading,
    error,
    refetch,
  };
};

export const useMyAdminSessions = (sessionEndpoints: AdminSessionEndpoints) => {
  const {
    data: sessions,
    isLoading,
    error,
    refetch,
  } = useQuery<AdminSession[]>({
    queryKey: ['admin', 'sessions', 'me'],
    queryFn: () => sessionEndpoints.getMySessions(),
    staleTime: 2 * 60 * 1000,
  });

  return {
    sessions: sessions || [],
    isLoading,
    error,
    refetch,
  };
};
