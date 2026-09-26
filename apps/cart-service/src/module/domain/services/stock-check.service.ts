import type { CartItemEntity } from '../entities/cart-item.entity';

export interface StockStatus {
  readonly productId: string;
  readonly available: boolean;
  readonly availableQuantity: number;
}

export class StockCheckService {
  findUnavailable(
    items: readonly CartItemEntity[],
    stock: Readonly<Record<string, number>>,
  ): readonly StockStatus[] {
    const result: StockStatus[] = [];
    for (const item of items) {
      const available = stock[item.productId.value] ?? 0;
      result.push({
        productId: item.productId.value,
        available: available >= item.quantity.quantity,
        availableQuantity: available,
      });
    }
    return result.filter((s) => !s.available);
  }
}
