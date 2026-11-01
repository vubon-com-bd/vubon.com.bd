import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CART_QUERY_KEY } from './use-cart';

export function useRemoveFromCart(removeFn: (itemId: string) => Promise<void>): {
  readonly remove: (itemId: string) => Promise<void>;
  readonly loading: boolean;
  readonly error: Error | null;
} {
  const client = useQueryClient();
  const mutation = useMutation<void, Error, string>({
    mutationFn: removeFn,
    onSuccess: () => {
      void client.invalidateQueries({ queryKey: CART_QUERY_KEY });
    },
  });
  return {
    remove: mutation.mutateAsync,
    loading: mutation.isPending,
    error: mutation.error ?? null,
  };
}
