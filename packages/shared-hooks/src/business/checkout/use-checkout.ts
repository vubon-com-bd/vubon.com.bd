import { useMutation } from '@tanstack/react-query';
import type { CheckoutSession } from './checkout.types';

export interface InitiateCheckoutInput {
  readonly cartId: string;
  readonly addressId: string;
  readonly paymentMethodId: string;
  readonly notes?: string;
}

export function useCheckout(
  initiateFn: (input: InitiateCheckoutInput) => Promise<CheckoutSession>
): {
  readonly initiate: (input: InitiateCheckoutInput) => Promise<CheckoutSession>;
  readonly loading: boolean;
  readonly error: Error | null;
} {
  const mutation = useMutation<CheckoutSession, Error, InitiateCheckoutInput>({
    mutationFn: initiateFn,
  });
  return {
    initiate: mutation.mutateAsync,
    loading: mutation.isPending,
    error: mutation.error ?? null,
  };
}
