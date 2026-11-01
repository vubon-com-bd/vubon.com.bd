/**
 * PriceSyncService — Detect/reconcile price changes from product-service
 * @module cart-service/domain/services
 */
import { CartItemEntity } from '../entities/cart-item.entity.js';

export interface PriceSnapshot {
  readonly productId: string;
  readonly variantId?: string;
  readonly currentPrice: number;
  readonly currency: string;
}

export interface PriceChangeItem {
  readonly itemId: string;
  readonly productId: string;
  readonly variantId?: string;
  readonly oldPrice: number;
  readonly newPrice: number;
  readonly delta: number;
  readonly currency: string;
}

export interface PriceSyncResult {
  readonly changed: readonly PriceChangeItem[];
  readonly unchanged: number;
  readonly missing: readonly string[];
}

export class PriceSyncService {
  static detectChanges(
    cartItems: readonly CartItemEntity[],
    snapshots: readonly PriceSnapshot[],
  ): PriceSyncResult {
    const index = new Map<string, PriceSnapshot>();
    for (const s of snapshots) {
      index.set(this.key(s.productId, s.variantId), s);
    }

    const changed: PriceChangeItem[] = [];
    const missing: string[] = [];
    let unchanged = 0;

    for (const item of cartItems) {
      const snap = index.get(this.key(item.productId.value, item.variantId?.value));
      if (!snap) {
        missing.push(item.id);
        continue;
      }
      if (snap.currentPrice !== item.unitPrice) {
        changed.push({
          itemId: item.id,
          productId: item.productId.value,
          variantId: item.variantId?.value,
          oldPrice: item.unitPrice,
          newPrice: snap.currentPrice,
          delta: this.round2(snap.currentPrice - item.unitPrice),
          currency: snap.currency,
        });
      } else {
        unchanged += 1;
      }
    }

    return { changed, unchanged, missing };
  }

  private static key(productId: string, variantId?: string): string {
    return `${productId}::${variantId ?? ''}`;
  }

  private static round2(n: number): number {
    return Math.round(n * 100) / 100;
  }
}
