/**
 * useAdminLogs Hook
 * অ্যাডমিন লগ পাওয়ার হুক
 */

import { useQuery } from '@tanstack/react-query';
import { AdminLogEndpoints } from '@vubon/shared-api';
import { AdminLogQuery } from '@vubon/shared-types';

export const useAdminLogs = (
  logEndpoints: AdminLogEndpoints,
  adminId: string,
  query: AdminLogQuery = {}
) => {
  const { page = 1, limit = 10, level, category, startDate, endDate, search } = query;

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: [
      'admin',
      'logs',
      adminId,
      { page, limit, level, category, startDate, endDate, search },
    ],
    queryFn: () =>
      logEndpoints.getLogs(adminId, { page, limit, level, category, startDate, endDate, search }),
    enabled: !!adminId,
    staleTime: 2 * 60 * 1000,
  });

  const { data: stats } = useQuery({
    queryKey: ['admin', 'logs', 'stats', adminId],
    queryFn: () => logEndpoints.getLogStats(adminId),
    enabled: !!adminId,
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

export const useMyAdminLogs = (logEndpoints: AdminLogEndpoints, query: AdminLogQuery = {}) => {
  const { page = 1, limit = 10, level, category, startDate, endDate, search } = query;

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['admin', 'logs', 'me', { page, limit, level, category, startDate, endDate, search }],
    queryFn: () =>
      logEndpoints.getMyLogs({ page, limit, level, category, startDate, endDate, search }),
    staleTime: 2 * 60 * 1000,
  });

  const { data: stats } = useQuery({
    queryKey: ['admin', 'logs', 'stats', 'me'],
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
