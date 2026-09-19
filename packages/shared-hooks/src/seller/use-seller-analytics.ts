import { useQuery } from '@tanstack/react-query';
import type { QueryKey } from '@tanstack/react-query';
import type { QueryParams } from '@vubon/shared-api/common';

export interface SellerAnalytics {
  readonly revenue: number;
  readonly orders: number;
  readonly views: number;
  readonly conversionRate: number;
  readonly currency: string;
  readonly periodStart: string;
  readonly periodEnd: string;
}

export function useSellerAnalytics(
  params: QueryParams = {},
  fetcher: (params: QueryParams, signal: AbortSignal) => Promise<SellerAnalytics>
): {
  readonly analytics: SellerAnalytics | undefined;
  readonly loading: boolean;
  readonly error: Error | null;
} {
  const key: QueryKey = ['seller', 'analytics', params];
  const result = useQuery<SellerAnalytics, Error>({
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
