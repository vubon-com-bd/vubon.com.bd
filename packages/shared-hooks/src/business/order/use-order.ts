import { useQuery } from '@tanstack/react-query';
import type { QueryKey } from '@tanstack/react-query';
import type { Order } from './order.types';

export function useOrder(
  id: string,
  fetcher: (id: string, signal: AbortSignal) => Promise<Order>
): {
  readonly order: Order | undefined;
  readonly loading: boolean;
  readonly error: Error | null;
} {
  const key: QueryKey = ['orders', 'detail', id];
  const result = useQuery<Order, Error>({
    queryKey: key,
    queryFn: ({ signal }) => fetcher(id, signal),
    enabled: id.length > 0,
    staleTime: 30_000,
  });
  return {
    order: result.data,
    loading: result.isLoading,
    error: result.error ?? null,
  };
}
