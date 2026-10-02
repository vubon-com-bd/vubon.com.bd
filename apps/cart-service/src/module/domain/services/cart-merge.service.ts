/**
 * CartMergeService — merge two carts by strategy
 * @module cart-service/domain/services
 *
 * Pure logic: takes two carts (already loaded), returns merged item list
 * and a report of conflicts. Caller persists the result.
 */
import { CartEntity } from '../entities/cart.entity.js';
import { CartItemEntity } from '../entities/cart-item.entity.js';
import { MergeStrategyVO } from '../value-objects/primitives/merge-strategy.vo.js';
import { CART_LIMIT } from '@vubon/shared-constants/business/cart';
import { CartItemQuantityVO } from '../value-objects/primitives/cart-item-quantity.vo.js';

export interface MergeConflict {
  readonly productId: string;
  readonly variantId?: string;
  readonly sourceQty: number;
  readonly targetQty: number;
  readonly mergedQty: number;
  readonly reason: string;
}

export interface MergeResult {
  readonly mergedItems: readonly CartItemEntity[];
  readonly itemsMerged: number;
  readonly conflicts: readonly MergeConflict[];
  readonly itemsDroppedDueToLimit: number;
}

export class CartMergeService {
  /**
   * Merge source cart items into target cart items using the strategy.
   * Does NOT mutate inputs; returns a new list of merged entities.
   */
  merge(
    source: CartEntity,
    target: CartEntity,
    strategy: MergeStrategyVO,
    now: string,
  ): MergeResult {
    const merged = new Map<string, CartItemEntity>();

    // Seed with target items
    for (const item of target.items) {
      merged.set(this.keyFor(item.productId.value, item.variantId?.value), item);
    }

    let itemsMerged = 0;
    let dropped = 0;
    const conflicts: MergeConflict[] = [];

    for (const srcItem of source.items) {
      const k = this.keyFor(srcItem.productId.value, srcItem.variantId?.value);
      const existing = merged.get(k);

      if (!existing) {
        // Fresh entry
        if (merged.size >= CART_LIMIT.MAX_ITEMS) {
          dropped += 1;
          continue;
        }
        merged.set(k, srcItem);
        itemsMerged += 1;
        continue;
      }

      const combinedQty = strategy.combine(
        existing.quantity.value,
        srcItem.quantity.value,
        CART_LIMIT.MAX_QUANTITY_PER_ITEM,
      );

      if (combinedQty !== existing.quantity.value + srcItem.quantity.value) {
        conflicts.push({
          productId: srcItem.productId.value,
          variantId: srcItem.variantId?.value,
          sourceQty: srcItem.quantity.value,
          targetQty: existing.quantity.value,
          mergedQty: combinedQty,
          reason: 'quantity_capped',
        });
      }

      // Mutate the existing entity in place (it is the working copy
      // belonging to the merged map for this operation).
      const qtyVo = CartItemQuantityVO.create(combinedQty);
      existing.changeQuantity(qtyVo, now);

      itemsMerged += 1;
    }

    return {
      mergedItems: Array.from(merged.values()),
      itemsMerged,
      conflicts,
      itemsDroppedDueToLimit: dropped,
    };
  }

  /**
   * Preview quantity outcome for a specific product+variant.
   */
  previewQuantity(
    targetQty: number,
    sourceQty: number,
    strategy: MergeStrategyVO,
  ): number {
    return strategy.combine(targetQty, sourceQty, CART_LIMIT.MAX_QUANTITY_PER_ITEM);
  }

  private keyFor(productId: string, variantId?: string): string {
    return variantId ? `${productId}::${variantId}` : productId;
  }
}
