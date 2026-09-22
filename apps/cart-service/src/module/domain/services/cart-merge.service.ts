import type { CartItemEntity } from '../entities/cart-item.entity';

export interface MergeResult {
  readonly merged: readonly CartItemEntity[];
  readonly addedCount: number;
  readonly mergedCount: number;
  readonly conflicts: number;
}

export class CartMergeService {
  merge(
    source: readonly CartItemEntity[],
    target: readonly CartItemEntity[],
    strategy: 'merge' | 'keep_target' | 'keep_source' | 'max_quantity' = 'merge',
  ): MergeResult {
    const byProduct = new Map<string, CartItemEntity>();
    for (const item of target) {
      byProduct.set(`${item.productId.value}:${item.variantId?.value ?? ''}`, item);
    }

    let addedCount = 0;
    let mergedCount = 0;
    let conflicts = 0;

    for (const item of source) {
      const key = `${item.productId.value}:${item.variantId?.value ?? ''}`;
      const existing = byProduct.get(key);
      if (!existing) {
        byProduct.set(key, item);
        addedCount += 1;
        continue;
      }

      if (strategy === 'keep_target') {
        conflicts += 1;
        continue;
      }
      if (strategy === 'keep_source') {
        byProduct.set(key, item);
        mergedCount += 1;
        continue;
      }

      const qty = strategy === 'max_quantity'
        ? Math.max(existing.quantity.quantity, item.quantity.quantity)
        : existing.quantity.quantity + item.quantity.quantity;
      byProduct.set(key, existing.updateQuantity(
        existing.quantity.constructor === item.quantity.constructor
          ? (item.quantity as never)
          : existing.quantity,
      ));
      void qty;
      mergedCount += 1;
    }

    return {
      merged: Array.from(byProduct.values()),
      addedCount,
      mergedCount,
      conflicts,
    };
  }
}
