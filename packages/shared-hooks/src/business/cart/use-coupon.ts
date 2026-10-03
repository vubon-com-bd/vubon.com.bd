import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CART_QUERY_KEY } from './use-cart';
import type { Cart } from './cart.types';

export interface ApplyCouponInput {
  readonly code: string;
}

export function useCoupon(
  applyFn: (input: ApplyCouponInput) => Promise<Cart>,
  removeFn: () => Promise<Cart>
): {
  readonly apply: (input: ApplyCouponInput) => Promise<Cart>;
  readonly remove: () => Promise<Cart>;
  readonly loading: boolean;
  readonly error: Error | null;
} {
  const client = useQueryClient();

  const apply = useMutation<Cart, Error, ApplyCouponInput>({
    mutationFn: applyFn,
    onSuccess: () => {
      void client.invalidateQueries({ queryKey: CART_QUERY_KEY });
    },
  });

  const remove = useMutation<Cart, Error, void>({
    mutationFn: () => removeFn(),
    onSuccess: () => {
      void client.invalidateQueries({ queryKey: CART_QUERY_KEY });
    },
  });

  return {
    apply: apply.mutateAsync,
    remove: remove.mutateAsync,
    loading: apply.isPending || remove.isPending,
    error: apply.error ?? remove.error ?? null,
  };
}
