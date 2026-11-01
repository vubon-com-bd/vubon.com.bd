import { useCallback, useState } from 'react';
import type { PaymentMethod } from './checkout.types';

export function usePaymentMethod(initial: PaymentMethod | null = null): {
  readonly method: PaymentMethod | null;
  readonly set: (method: PaymentMethod | null) => void;
  readonly selectById: (methods: readonly PaymentMethod[], id: string) => void;
  readonly isReady: boolean;
} {
  const [method, setMethod] = useState<PaymentMethod | null>(initial);

  const selectById = useCallback((methods: readonly PaymentMethod[], id: string) => {
    setMethod(methods.find((m) => m.id === id) ?? null);
  }, []);

  return {
    method,
    set: setMethod,
    selectById,
    isReady: method !== null && method.enabled,
  };
}
