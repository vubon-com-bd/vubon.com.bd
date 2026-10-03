import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CART_QUERY_KEY } from './use-cart';
import type { Cart } from './cart.types';

export interface UpdateCartInput {
  readonly itemId: string;
  readonly quantity: number;
}

export function useUpdateCart(updateFn: (input: UpdateCartInput) => Promise<Cart>): {
  readonly update: (input: UpdateCartInput) => Promise<Cart>;
  readonly loading: boolean;
  readonly error: Error | null;
} {
  const client = useQueryClient();
  const mutation = useMutation<Cart, Error, UpdateCartInput>({
    mutationFn: updateFn,
    onSuccess: () => {
      void client.invalidateQueries({ queryKey: CART_QUERY_KEY });
    },
  });
  return {
    update: mutation.mutateAsync,
    loading: mutation.isPending,
    error: mutation.error ?? null,
  };
}
