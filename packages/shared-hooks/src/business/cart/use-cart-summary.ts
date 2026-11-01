import { useMemo } from 'react';
import type { Cart } from './cart.types';

export interface CartSummary {
  readonly itemsCount: number;
  readonly subtotal: number;
  readonly discount: number;
  readonly total: number;
  readonly currency: string;
}

export function useCartSummary(cart: Cart | null): CartSummary {
  return useMemo(() => {
    if (!cart) {
      return {
        itemsCount: 0,
        subtotal: 0,
        discount: 0,
        total: 0,
        currency: 'BDT',
      };
    }
    return {
      itemsCount: cart.items.reduce((s, i) => s + i.quantity, 0),
      subtotal: cart.subtotal,
      discount: cart.discount,
      total: cart.total,
      currency: cart.currency,
    };
  }, [cart]);
}
