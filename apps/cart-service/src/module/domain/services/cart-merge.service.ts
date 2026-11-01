/**
 * CartMergeService — Merge guest cart into user cart
 * @module cart-service/domain/services
 *
 * Rules:
 *  - Quantities merged per strategy
 *  - New products added
 *  - Existing products quantity-resolved
 *  - Conflicts recorded
 */
import { CartEntity } from '../entities/cart.entity.js';
import { CartItemEntity } from '../entities/cart-item.entity.js';
import { MergeStrategyVO } from '../value-objects/primitives/merge-strategy.vo.js';

export interface MergeResult {
  readonly itemsMerged: number;
  readonly conflicts: number;
  readonly mergedItems: readonly MergePlanItem[];
}

export interface MergePlanItem {
  readonly productId: string;
  readonly variantId?: string;
  readonly sourceItemId: string;
  readonly targetItemId?: string;
  readonly resolvedQuantity: number;
  readonly isConflict: boolean;
}

export class CartMergeService {
  static plan(
    targetItems: readonly CartItemEntity[],
    sourceItems: readonly CartItemEntity[],
    strategy: MergeStrategyVO,
  ): MergeResult {
    const targetIndex = new Map<string, CartItemEntity>();
    for (const t of targetItems) {
      targetIndex.set(this.key(t), t);
    }

    const merged: MergePlanItem[] = [];
    let conflicts = 0;

    for (const s of sourceItems) {
      const key = this.key(s);
      const target = targetIndex.get(key);

      if (!target) {
        merged.push({
          productId: s.productId.value,
          variantId: s.variantId?.value,
          sourceItemId: s.id,
          resolvedQuantity: s.quantity.value,
          isConflict: false,
        });
        continue;
      }

      const resolvedQty = strategy.mergeQuantities(
        target.quantity.value,
        s.quantity.value,
      );
      const isConflict = resolvedQty !== target.quantity.value + s.quantity.value;

      if (isConflict) conflicts += 1;

      merged.push({
        productId: s.productId.value,
        variantId: s.variantId?.value,
        sourceItemId: s.id,
        targetItemId: target.id,
        resolvedQuantity: resolvedQty,
        isConflict,
      });
    }

    return {
      itemsMerged: merged.length,
      conflicts,
      mergedItems: merged,
    };
  }

  static assertCanMerge(
    source: CartEntity,
    target: CartEntity,
  ): void {
    if (source.id === target.id) {
      throw new Error('Cannot merge a cart with itself');
    }
  }

  private static key(item: CartItemEntity): string {
    return `${item.productId.value}::${item.variantId?.value ?? ''}`;
  }
}
