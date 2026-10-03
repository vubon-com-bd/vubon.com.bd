/**
 * PriceSyncService — compare cart prices vs current catalog prices
 * @module cart-service/domain/services
 *
 * Caller supplies current prices (fetched from product-service) — service
 * computes diffs and total impact. Pure logic.
 */
import { CartEntity } from '../entities/cart.entity.js';
import { CartItemEntity } from '../entities/cart-item.entity.js';

export interface CurrentPriceSnapshot {
  readonly productId: string;
  readonly variantId?: string;
  readonly price: number;
  readonly currency: string;
  readonly available: boolean;
}

export interface PriceChange {
  readonly itemId: string;
  readonly productId: string;
  readonly variantId?: string;
  readonly oldPrice: number;
  readonly newPrice: number;
  readonly delta: number;
  readonly deltaPercent: number;
}

export interface PriceSyncResult {
  readonly hasChanges: boolean;
  readonly changes: readonly PriceChange[];
  readonly totalDelta: number;
  readonly currency: string;
}

export class PriceSyncService {
  /** Compute price deltas for cart items against a fresh snapshot. */
  detectChanges(
    cart: CartEntity,
    snapshot: readonly CurrentPriceSnapshot[],
  ): PriceSyncResult {
    const changes: PriceChange[] = [];
    let totalDelta = 0;

    const map = new Map<string, CurrentPriceSnapshot>();
    for (const snap of snapshot) {
      map.set(this.key(snap.productId, snap.variantId), snap);
    }

    for (const item of cart.items) {
      const snap = map.get(this.key(item.productId.value, item.variantId?.value));
      if (!snap) continue;
      if (snap.price === item.unitPrice) continue;
      const delta = this.round(snap.price - item.unitPrice);
      const deltaPercent =
        item.unitPrice === 0
          ? 0
          : Math.round((delta / item.unitPrice) * 1000) / 10;
      changes.push({
        itemId: item.id,
        productId: item.productId.value,
        variantId: item.variantId?.value,
        oldPrice: item.unitPrice,
        newPrice: snap.price,
        delta,
        deltaPercent,
      });
      totalDelta = this.round(totalDelta + delta * item.quantity.value);
    }

    return {
      hasChanges: changes.length > 0,
      changes,
      totalDelta,
      currency: cart.currency,
    };
  }

  /** Apply price changes to the cart's items (mutates item entities). */
  applyChanges(
    cart: CartEntity,
    changes: readonly PriceChange[],
    now: string,
  ): void {
    for (const change of changes) {
      const item: CartItemEntity | undefined = cart.findItem(change.itemId);
      if (!item) continue;
      item.updateUnitPrice(change.newPrice, now);
    }
  }

  /** Detect items in cart that are no longer available in the catalog. */
  detectUnavailable(
    cart: CartEntity,
    snapshot: readonly CurrentPriceSnapshot[],
  ): readonly CartItemEntity[] {
    const map = new Map<string, CurrentPriceSnapshot>();
    for (const snap of snapshot) {
      map.set(this.key(snap.productId, snap.variantId), snap);
    }
    return cart.items.filter((item) => {
      const snap = map.get(this.key(item.productId.value, item.variantId?.value));
      if (!snap) return true;
      return !snap.available;
    });
  }

  private key(productId: string, variantId?: string): string {
    return variantId ? `${productId}::${variantId}` : productId;
  }

  private round(v: number): number {
    return Math.round(v * 100) / 100;
  }
}
