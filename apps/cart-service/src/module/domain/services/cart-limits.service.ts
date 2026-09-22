import { CART_LIMIT } from '@vubon/shared-constants/cart';

export class CartLimitsService {
  getMaxItems(): number {
    return CART_LIMIT.MAX_ITEMS ?? 100;
  }

  getMaxQuantityPerItem(): number {
    return CART_LIMIT.MAX_QUANTITY_PER_ITEM ?? 999;
  }

  isWithinItemLimit(itemCount: number): boolean {
    return itemCount <= this.getMaxItems();
  }

  isWithinQuantityLimit(quantity: number): boolean {
    return quantity <= this.getMaxQuantityPerItem();
  }
}
