/**
 * useAdminAnalytics Hook
 * অ্যাডমিন অ্যানালিটিক্স পাওয়ার হুক
 */

import { useQuery } from '@tanstack/react-query';
import { AdminAnalyticsEndpoints } from '@vubon/shared-api';
import { AdminAnalytics } from '@vubon/shared-types';

export const useAdminAnalytics = (analyticsEndpoints: AdminAnalyticsEndpoints, adminId: string) => {
  const {
    data: analytics,
    isLoading,
    error,
    refetch,
  } = useQuery<AdminAnalytics[]>({
    queryKey: ['admin', 'analytics', adminId],
    queryFn: () => analyticsEndpoints.getAnalytics(adminId),
    enabled: !!adminId,
    staleTime: 5 * 60 * 1000,
  });

  const { data: summary } = useQuery({
    queryKey: ['admin', 'analytics', 'summary', adminId],
    queryFn: () => analyticsEndpoints.getAnalyticsSummary(adminId),
    enabled: !!adminId,
    staleTime: 10 * 60 * 1000,
  });

  return {
    analytics: analytics || [],
    summary,
    isLoading,
    error,
    refetch,
  };
};
