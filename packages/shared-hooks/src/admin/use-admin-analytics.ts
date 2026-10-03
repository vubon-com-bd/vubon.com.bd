import { useQuery } from '@tanstack/react-query';
import type { QueryKey } from '@tanstack/react-query';
import type { QueryParams } from '@vubon/shared-api/common';

export interface AdminAnalytics {
  readonly totalUsers: number;
  readonly totalOrders: number;
  readonly totalRevenue: number;
  readonly currency: string;
  readonly periodStart: string;
  readonly periodEnd: string;
}

export function useAdminAnalytics(
  params: QueryParams = {},
  fetcher: (params: QueryParams, signal: AbortSignal) => Promise<AdminAnalytics>
): {
  readonly analytics: AdminAnalytics | undefined;
  readonly loading: boolean;
  readonly error: Error | null;
} {
  const key: QueryKey = ['admin', 'analytics', params];
  const result = useQuery<AdminAnalytics, Error>({
    queryKey: key,
    queryFn: ({ signal }) => fetcher(params, signal),
    staleTime: 5 * 60_000,
  });
  return {
    analytics: result.data,
    loading: result.isLoading,
    error: result.error ?? null,
  };
}
