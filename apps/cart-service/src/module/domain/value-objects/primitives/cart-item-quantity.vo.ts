/**
 * CartItemQuantity Value Object
 * @module cart-service/domain/value-objects/primitives
 */
import { BaseQuantityVO } from '@vubon/shared-kernel/domain/primitives';
import { CART_LIMIT } from '@vubon/shared-constants/business/cart';
import { InvalidQuantityError } from '../../errors/cart-item.errors.js';

export class CartItemQuantityVO extends BaseQuantityVO {
  private constructor(value: number) {
    super(value);
  }

  static create(raw: number): CartItemQuantityVO {
    if (!Number.isFinite(raw)) {
      throw new InvalidQuantityError('Quantity must be a finite number');
    }
    if (!Number.isInteger(raw)) {
      throw new InvalidQuantityError('Quantity must be an integer');
    }
    if (raw < CART_LIMIT.MIN_QUANTITY_PER_ITEM) {
      throw new InvalidQuantityError(
        `Quantity must be at least ${CART_LIMIT.MIN_QUANTITY_PER_ITEM}`,
      );
    }
    if (raw > CART_LIMIT.MAX_QUANTITY_PER_ITEM) {
      throw new InvalidQuantityError(
        `Quantity cannot exceed ${CART_LIMIT.MAX_QUANTITY_PER_ITEM}`,
      );
    }
    return new CartItemQuantityVO(raw);
  }

  static reconstitute(raw: number): CartItemQuantityVO {
    return new CartItemQuantityVO(raw);
  }

  add(other: CartItemQuantityVO): CartItemQuantityVO {
    return CartItemQuantityVO.create(this.value + other.value);
  }

  subtract(other: CartItemQuantityVO): CartItemQuantityVO {
    return CartItemQuantityVO.create(this.value - other.value);
  }

  exceedsMax(): boolean {
    return this.value > CART_LIMIT.MAX_QUANTITY_PER_ITEM;
  }
}
