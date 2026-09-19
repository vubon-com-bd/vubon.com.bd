import { useQuery } from '@tanstack/react-query';
import type { QueryKey } from '@tanstack/react-query';
import type { QueryParams } from '@vubon/shared-api/common';

export interface AdminOrderSummary {
  readonly id: string;
  readonly orderNumber: string;
  readonly userId: string;
  readonly status: string;
  readonly total: number;
  readonly currency: string;
  readonly createdAt: string;
}

export interface AdminOrderListResult {
  readonly orders: readonly AdminOrderSummary[];
  readonly total: number;
}

export function useAdminOrders(
  params: QueryParams = {},
  fetcher: (params: QueryParams, signal: AbortSignal) => Promise<AdminOrderListResult>
): {
  readonly orders: readonly AdminOrderSummary[];
  readonly total: number;
  readonly loading: boolean;
  readonly error: Error | null;
} {
  const key: QueryKey = ['admin', 'orders', params];
  const result = useQuery<AdminOrderListResult, Error>({
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
