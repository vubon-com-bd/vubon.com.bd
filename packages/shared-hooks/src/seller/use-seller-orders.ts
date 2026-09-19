import { useQuery } from '@tanstack/react-query';
import type { QueryKey } from '@tanstack/react-query';
import type { QueryParams } from '@vubon/shared-api/common';

export interface SellerOrderSummary {
  readonly id: string;
  readonly orderNumber: string;
  readonly customerName: string;
  readonly status: string;
  readonly total: number;
  readonly createdAt: string;
}

export interface SellerOrderListResult {
  readonly orders: readonly SellerOrderSummary[];
  readonly total: number;
}

export function useSellerOrders(
  params: QueryParams = {},
  fetcher: (params: QueryParams, signal: AbortSignal) => Promise<SellerOrderListResult>
): {
  readonly orders: readonly SellerOrderSummary[];
  readonly total: number;
  readonly loading: boolean;
  readonly error: Error | null;
} {
  const key: QueryKey = ['seller', 'orders', params];
  const result = useQuery<SellerOrderListResult, Error>({
    queryKey: key,
    queryFn: ({ signal }) => fetcher(params, signal),
    staleTime: 15_000,
  });
  return {
    orders: result.data?.orders ?? [],
    total: result.data?.total ?? 0,
    loading: result.isLoading,
    error: result.error ?? null,
  };
}
