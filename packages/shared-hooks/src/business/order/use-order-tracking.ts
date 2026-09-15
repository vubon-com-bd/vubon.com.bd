import { useQuery } from '@tanstack/react-query';
import type { QueryKey } from '@tanstack/react-query';
import type { OrderTracking } from './order.types';

export function useOrderTracking(
  orderId: string,
  fetcher: (orderId: string, signal: AbortSignal) => Promise<OrderTracking>,
  options: { refetchIntervalMs?: number } = {}
): {
  readonly tracking: OrderTracking | undefined;
  readonly loading: boolean;
  readonly error: Error | null;
} {
  const key: QueryKey = ['orders', 'tracking', orderId];
  const result = useQuery<OrderTracking, Error>({
    queryKey: key,
    queryFn: ({ signal }) => fetcher(orderId, signal),
    enabled: orderId.length > 0,
    refetchInterval: options.refetchIntervalMs ?? 60_000,
  });
  return {
    tracking: result.data,
    loading: result.isLoading,
    error: result.error ?? null,
  };
}
