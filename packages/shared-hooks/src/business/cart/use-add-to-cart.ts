import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CART_QUERY_KEY } from './use-cart';
import type { Cart } from './cart.types';

export interface AddToCartInput {
  readonly productId: string;
  readonly variantId?: string;
  readonly quantity: number;
}

export function useAddToCart(addFn: (input: AddToCartInput) => Promise<Cart>): {
  readonly add: (input: AddToCartInput) => Promise<Cart>;
  readonly loading: boolean;
  readonly error: Error | null;
} {
  const client = useQueryClient();
  const mutation = useMutation<Cart, Error, AddToCartInput>({
    mutationFn: addFn,
    onSuccess: () => {
      void client.invalidateQueries({ queryKey: CART_QUERY_KEY });
    },
  });
  return {
    add: mutation.mutateAsync,
    loading: mutation.isPending,
    error: mutation.error ?? null,
  };
}
