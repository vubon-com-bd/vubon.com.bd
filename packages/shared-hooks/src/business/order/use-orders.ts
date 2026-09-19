import { useQuery } from '@tanstack/react-query';
import type { QueryKey } from '@tanstack/react-query';
import type { QueryParams } from '@vubon/shared-api/common';
import type { Order } from './order.types';

export interface OrderListResult {
  readonly orders: readonly Order[];
  readonly total: number;
}

export function useOrders(
  params: QueryParams = {},
  fetcher: (params: QueryParams, signal: AbortSignal) => Promise<OrderListResult>
): {
  readonly orders: readonly Order[];
  readonly total: number;
  readonly loading: boolean;
  readonly error: Error | null;
  readonly refetch: () => Promise<unknown>;
} {
  const key: QueryKey = ['orders', 'list', params];
  const result = useQuery<OrderListResult, Error>({
    queryKey: key,
    queryFn: ({ signal }) => fetcher(params, signal),
    staleTime: 15_000,
  });
  return {
    orders: result.data?.orders ?? [],
    total: result.data?.total ?? 0,
    loading: result.isLoading,
    error: result.error ?? null,
    refetch: result.refetch,
  };
}
