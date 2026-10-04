import type { CartItem } from './cart.types';
import { useCart } from './use-cart';
import type { Cart } from './cart.types';

export function useCartItems(fetcher: (signal: AbortSignal) => Promise<Cart | null>): {
  readonly items: readonly CartItem[];
  readonly count: number;
  readonly loading: boolean;
} {
  const { cart, loading } = useCart(fetcher);
  const items = cart?.items ?? [];
  return {
    items,
    count: items.reduce((s, i) => s + i.quantity, 0),
    loading,
  };
}
