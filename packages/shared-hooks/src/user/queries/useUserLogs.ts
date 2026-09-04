/**
 * useUserLogs Hook
 * ইউজারের লগ পাওয়ার হুক
 */

import { useQuery } from '@tanstack/react-query';
import { UserLogEndpoints } from '@vubon/shared-api';
import { UserLogQuery } from '@vubon/shared-types';

export const useUserLogs = (
  logEndpoints: UserLogEndpoints,
  userId: string,
  query: UserLogQuery = {}
) => {
  const { page = 1, limit = 10, level, category, startDate, endDate, search } = query;

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: [
      'user',
      'logs',
      userId,
      { page, limit, level, category, startDate, endDate, search },
    ],
    queryFn: () =>
      logEndpoints.getLogs(userId, { page, limit, level, category, startDate, endDate, search }),
    enabled: !!userId,
    staleTime: 2 * 60 * 1000,
  });

  const { data: stats } = useQuery({
    queryKey: ['user', 'logs', 'stats', userId],
    queryFn: () => logEndpoints.getLogStats(userId),
    enabled: !!userId,
    staleTime: 5 * 60 * 1000,
  });

  return {
    logs: data?.logs || [],
    total: data?.total || 0,
    page: data?.page || page,
    limit: data?.limit || limit,
    stats,
    isLoading,
    error,
    refetch,
  };
};

export const useMyLogs = (logEndpoints: UserLogEndpoints, query: UserLogQuery = {}) => {
  const { page = 1, limit = 10, level, category, startDate, endDate, search } = query;

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['user', 'logs', 'me', { page, limit, level, category, startDate, endDate, search }],
    queryFn: () =>
      logEndpoints.getMyLogs({ page, limit, level, category, startDate, endDate, search }),
    staleTime: 2 * 60 * 1000,
  });

  const { data: stats } = useQuery({
    queryKey: ['user', 'logs', 'stats', 'me'],
    queryFn: () => logEndpoints.getMyLogStats(),
    staleTime: 5 * 60 * 1000,
  });

  return {
    logs: data?.logs || [],
    total: data?.total || 0,
    page: data?.page || page,
    limit: data?.limit || limit,
    stats,
    isLoading,
    error,
    refetch,
  };
};
