/**
 * CartItemQuantity Value Object
 * @module cart-service/domain/value-objects/primitives
 *
 * Business Rule:
 * - Integer
 * - 1 to 999 (CART_LIMIT.MAX_QUANTITY_PER_ITEM)
 */
import { BaseQuantityVO } from '@vubon/shared-kernel/domain/primitives';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const MIN_QUANTITY = 1;
const MAX_QUANTITY = 999;

export class CartItemQuantityVO extends BaseQuantityVO {
  private constructor(value: number) {
    super(value);
  }

  static create(raw: number): CartItemQuantityVO {
    if (!Number.isFinite(raw) || !Number.isInteger(raw)) {
      throw new ValidationError('Quantity must be an integer', 'quantity');
    }
    if (raw < MIN_QUANTITY || raw > MAX_QUANTITY) {
      throw new ValidationError(
        `Quantity must be between ${MIN_QUANTITY} and ${MAX_QUANTITY}`,
        'quantity',
      );
    }
    return new CartItemQuantityVO(raw);
  }

  static reconstitute(raw: number): CartItemQuantityVO {
    return new CartItemQuantityVO(raw);
  }

  add(other: CartItemQuantityVO): CartItemQuantityVO {
    const total = this.value + other.value;
    if (total > MAX_QUANTITY) {
      throw new ValidationError(
        `Quantity sum exceeds maximum ${MAX_QUANTITY}`,
        'quantity',
      );
    }
    return new CartItemQuantityVO(total);
  }

  subtract(other: CartItemQuantityVO): CartItemQuantityVO {
    const result = this.value - other.value;
    if (result < MIN_QUANTITY) {
      throw new ValidationError(
        `Quantity difference below minimum ${MIN_QUANTITY}`,
        'quantity',
      );
    }
    return new CartItemQuantityVO(result);
  }

  canIncreaseBy(amount: number): boolean {
    return this.value + amount <= MAX_QUANTITY;
  }
}
