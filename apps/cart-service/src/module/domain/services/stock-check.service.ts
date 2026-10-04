/**
 * StockCheckService — pure stock sufficiency checks
 * @module cart-service/domain/services
 *
 * Caller provides current stock info; service decides.
 */
import { CartEntity } from '../entities/cart.entity.js';
import { CartItemEntity } from '../entities/cart-item.entity.js';

export interface StockSnapshot {
  readonly productId: string;
  readonly variantId?: string;
  readonly available: number;
}

export interface StockCheckOutcome {
  readonly itemId: string;
  readonly productId: string;
  readonly variantId?: string;
  readonly requested: number;
  readonly available: number;
  readonly sufficient: boolean;
  readonly shortBy: number;
}

export interface BulkStockCheckResult {
  readonly allSufficient: boolean;
  readonly shortItems: readonly StockCheckOutcome[];
  readonly outcomes: readonly StockCheckOutcome[];
}

export class StockCheckService {
  /**
   * Check all items in the cart against a stock snapshot.
   */
  checkCart(
    cart: CartEntity,
    snapshot: readonly StockSnapshot[],
  ): BulkStockCheckResult {
    const map = new Map<string, number>();
    for (const s of snapshot) {
      map.set(this.key(s.productId, s.variantId), s.available);
    }

    const outcomes: StockCheckOutcome[] = cart.items.map((item) => {
      const available = map.get(
        this.key(item.productId.value, item.variantId?.value),
      ) ?? 0;
      const requested = item.quantity.value;
      const sufficient = available >= requested;
      return {
        itemId: item.id,
        productId: item.productId.value,
        variantId: item.variantId?.value,
        requested,
        available,
        sufficient,
        shortBy: sufficient ? 0 : requested - available,
      };
    });

    const shortItems = outcomes.filter((o) => !o.sufficient);
    return {
      allSufficient: shortItems.length === 0,
      shortItems,
      outcomes,
    };
  }

  /**
   * Check a single item's requested quantity against available stock.
   */
  checkItem(item: CartItemEntity, available: number): StockCheckOutcome {
    const requested = item.quantity.value;
    const sufficient = available >= requested;
    return {
      itemId: item.id,
      productId: item.productId.value,
      variantId: item.variantId?.value,
      requested,
      available,
      sufficient,
      shortBy: sufficient ? 0 : requested - available,
    };
  }

  /**
   * Maximum quantity that could be added to a cart item given current stock
   * and existing cart contents.
   */
  maxAddable(
    cart: CartEntity,
    productId: string,
    variantId: string | undefined,
    available: number,
  ): number {
    const existing = cart.findItemByProduct(productId, variantId);
    const currentQty = existing?.quantity.value ?? 0;
    return Math.max(0, available - currentQty);
  }

  private key(productId: string, variantId?: string): string {
    return variantId ? `${productId}::${variantId}` : productId;
  }
}
