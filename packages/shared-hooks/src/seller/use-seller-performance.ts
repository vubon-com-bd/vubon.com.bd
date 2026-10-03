import { useQuery } from '@tanstack/react-query';
import type { QueryKey } from '@tanstack/react-query';
import type { QueryParams } from '@vubon/shared-api/common';

export interface SellerPerformance {
  readonly vendorId: string;
  readonly totalOrders: number;
  readonly totalRevenue: number;
  readonly currency: string;
  readonly avgRating: number;
  readonly fulfillmentRate: number;
}

export function useSellerPerformance(
  params: QueryParams = {},
  fetcher: (params: QueryParams, signal: AbortSignal) => Promise<SellerPerformance>
): {
  readonly performance: SellerPerformance | undefined;
  readonly loading: boolean;
  readonly error: Error | null;
} {
  const key: QueryKey = ['seller', 'performance', params];
  const result = useQuery<SellerPerformance, Error>({
    queryKey: key,
    queryFn: ({ signal }) => fetcher(params, signal),
    staleTime: 5 * 60_000,
  });
  return {
    performance: result.data,
    loading: result.isLoading,
    error: result.error ?? null,
  };
}
