import type { CartItemEntity } from '../entities/cart-item.entity';

export interface PriceChange {
  readonly productId: string;
  readonly oldPrice: number;
  readonly newPrice: number;
}

export class PriceSyncService {
  detectChanges(
    items: readonly CartItemEntity[],
    currentPrices: Readonly<Record<string, number>>,
  ): readonly PriceChange[] {
    const changes: PriceChange[] = [];
    for (const item of items) {
      const current = currentPrices[item.productId.value];
      if (typeof current === 'number' && current !== item.unitPrice) {
        changes.push({
          productId: item.productId.value,
          oldPrice: item.unitPrice,
          newPrice: current,
        });
      }
    }
    return changes;
  }
}
