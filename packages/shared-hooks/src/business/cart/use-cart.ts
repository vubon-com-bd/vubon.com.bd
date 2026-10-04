import { useQuery } from '@tanstack/react-query';
import type { QueryKey } from '@tanstack/react-query';
import type { Cart } from './cart.types';

export const CART_QUERY_KEY: QueryKey = ['cart'];

export function useCart(fetcher: (signal: AbortSignal) => Promise<Cart | null>): {
  readonly cart: Cart | null;
  readonly loading: boolean;
  readonly error: Error | null;
  readonly refetch: () => Promise<unknown>;
} {
  const result = useQuery<Cart | null, Error>({
    queryKey: CART_QUERY_KEY,
    queryFn: ({ signal }) => fetcher(signal),
    staleTime: 10_000,
  });
  return {
    cart: result.data ?? null,
    loading: result.isLoading,
    error: result.error ?? null,
    refetch: result.refetch,
  };
}
