/**
 * CartItemStatus Value Object
 * @module cart-service/domain/value-objects/primitives
 */
import { BaseStatusVO } from '@vubon/shared-kernel/domain/primitives';
import { CART_ITEM_STATUS } from '@vubon/shared-constants/business/cart';
import { InvalidCartItemStatusError } from '../../errors/cart-item.errors.js';

const ALLOWED = Object.values(CART_ITEM_STATUS) as readonly string[];

export class CartItemStatusVO extends BaseStatusVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): CartItemStatusVO {
    if (typeof raw !== 'string') {
      throw new InvalidCartItemStatusError(String(raw), ALLOWED);
    }
    if (!ALLOWED.includes(raw)) {
      throw new InvalidCartItemStatusError(raw, ALLOWED);
    }
    return new CartItemStatusVO(raw);
  }

  static reconstitute(raw: string): CartItemStatusVO {
    return new CartItemStatusVO(raw);
  }

  isRemoved(): boolean {
    return this.value === CART_ITEM_STATUS.REMOVED;
  }

  isOutOfStock(): boolean {
    return this.value === CART_ITEM_STATUS.OUT_OF_STOCK;
  }

  isUnavailable(): boolean {
    return this.value === CART_ITEM_STATUS.UNAVAILABLE;
  }

  isSaved(): boolean {
    return this.value === CART_ITEM_STATUS.SAVED;
  }

  isPurchasable(): boolean {
    return this.value === CART_ITEM_STATUS.ACTIVE;
  }
}
