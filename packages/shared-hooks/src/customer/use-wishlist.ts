import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { QueryKey } from '@tanstack/react-query';

export const WISHLIST_QUERY_KEY: QueryKey = ['customer', 'wishlist'];

export function useWishlist(
  fetcher: (signal: AbortSignal) => Promise<readonly string[]>,
  addFn: (productId: string) => Promise<void>,
  removeFn: (productId: string) => Promise<void>
): {
  readonly productIds: readonly string[];
  readonly has: (productId: string) => boolean;
  readonly add: (productId: string) => Promise<void>;
  readonly remove: (productId: string) => Promise<void>;
  readonly loading: boolean;
  readonly error: Error | null;
} {
  const client = useQueryClient();
  const query = useQuery<readonly string[], Error>({
    queryKey: WISHLIST_QUERY_KEY,
    queryFn: ({ signal }) => fetcher(signal),
    staleTime: 60_000,
  });

  const addMutation = useMutation<void, Error, string>({
    mutationFn: addFn,
    onSuccess: () => {
      void client.invalidateQueries({ queryKey: WISHLIST_QUERY_KEY });
    },
  });
  const removeMutation = useMutation<void, Error, string>({
    mutationFn: removeFn,
    onSuccess: () => {
      void client.invalidateQueries({ queryKey: WISHLIST_QUERY_KEY });
    },
  });

  const productIds = query.data ?? [];
  return {
    productIds,
    has: (productId: string) => productIds.includes(productId),
    add: addMutation.mutateAsync,
    remove: removeMutation.mutateAsync,
    loading: query.isLoading,
    error: query.error ?? null,
  };
}
