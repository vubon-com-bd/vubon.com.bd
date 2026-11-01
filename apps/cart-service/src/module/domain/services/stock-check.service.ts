/**
 * StockCheckService — Detect stock-availability per cart item
 * @module cart-service/domain/services
 */
import { CartItemEntity } from '../entities/cart-item.entity.js';

export interface StockSnapshot {
  readonly productId: string;
  readonly variantId?: string;
  readonly available: number;
  readonly isAvailable: boolean;
}

export interface StockCheckItem {
  readonly itemId: string;
  readonly productId: string;
  readonly requested: number;
  readonly available: number;
  readonly isAvailable: boolean;
  readonly isSufficient: boolean;
}

export interface StockCheckResult {
  readonly items: readonly StockCheckItem[];
  readonly insufficient: readonly string[];
  readonly unavailable: readonly string[];
  readonly allAvailable: boolean;
}

export class StockCheckService {
  static check(
    cartItems: readonly CartItemEntity[],
    snapshots: readonly StockSnapshot[],
  ): StockCheckResult {
    const index = new Map<string, StockSnapshot>();
    for (const s of snapshots) {
      index.set(this.key(s.productId, s.variantId), s);
    }

    const items: StockCheckItem[] = [];
    const insufficient: string[] = [];
    const unavailable: string[] = [];

    for (const item of cartItems) {
      const snap = index.get(this.key(item.productId.value, item.variantId?.value));
      const available = snap?.available ?? 0;
      const isAvailable = snap?.isAvailable ?? false;
      const isSufficient = available >= item.quantity.value;

      if (!isAvailable) unavailable.push(item.id);
      else if (!isSufficient) insufficient.push(item.id);

      items.push({
        itemId: item.id,
        productId: item.productId.value,
        requested: item.quantity.value,
        available,
        isAvailable,
        isSufficient,
      });
    }

    return {
      items,
      insufficient,
      unavailable,
      allAvailable: insufficient.length === 0 && unavailable.length === 0,
    };
  }

  private static key(productId: string, variantId?: string): string {
    return `${productId}::${variantId ?? ''}`;
  }
}
