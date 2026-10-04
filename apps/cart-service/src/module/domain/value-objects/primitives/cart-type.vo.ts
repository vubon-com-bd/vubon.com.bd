/**
 * CartType Value Object
 * @module cart-service/domain/value-objects/primitives
 */
import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives';
import { CART_TYPE } from '@vubon/shared-constants/business/cart';
import { InvalidCartTypeError } from '../../errors/cart.errors.js';

const ALLOWED = Object.values(CART_TYPE) as readonly string[];

export class CartTypeVO extends BaseTypeVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): CartTypeVO {
    if (typeof raw !== 'string') {
      throw new InvalidCartTypeError(String(raw), ALLOWED);
    }
    if (!ALLOWED.includes(raw)) {
      throw new InvalidCartTypeError(raw, ALLOWED);
    }
    return new CartTypeVO(raw);
  }

  static reconstitute(raw: string): CartTypeVO {
    return new CartTypeVO(raw);
  }

  isGuest(): boolean {
    return this.value === CART_TYPE.GUEST;
  }

  isUser(): boolean {
    return this.value === CART_TYPE.USER;
  }

  isWishlist(): boolean {
    return this.value === CART_TYPE.WISHLIST;
  }

  isSaved(): boolean {
    return this.value === CART_TYPE.SAVED;
  }

  isSubscription(): boolean {
    return this.value === CART_TYPE.SUBSCRIPTION;
  }
}
