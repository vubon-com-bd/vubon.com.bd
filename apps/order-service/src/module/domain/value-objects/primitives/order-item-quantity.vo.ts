/**
 * OrderItemQuantity Value Object
 * @module order-service/domain/value-objects/primitives
 */
import { BaseQuantityVO } from '@vubon/shared-kernel/domain/primitives';
import { ORDER_ITEM_LIMIT } from '@vubon/shared-constants/business/order';
import { InvalidQuantityError } from '../../errors/order-item.errors.js';

export class OrderItemQuantityVO extends BaseQuantityVO {
  private constructor(value: number) {
    super(value);
  }

  static create(raw: number): OrderItemQuantityVO {
    if (!Number.isFinite(raw)) {
      throw new InvalidQuantityError('Quantity must be a finite number');
    }
    if (!Number.isInteger(raw)) {
      throw new InvalidQuantityError('Quantity must be an integer');
    }
    if (raw < ORDER_ITEM_LIMIT.MIN_QUANTITY) {
      throw new InvalidQuantityError(
        `Quantity must be at least ${ORDER_ITEM_LIMIT.MIN_QUANTITY}`,
      );
    }
    if (raw > ORDER_ITEM_LIMIT.MAX_QUANTITY) {
      throw new InvalidQuantityError(
        `Quantity cannot exceed ${ORDER_ITEM_LIMIT.MAX_QUANTITY}`,
      );
    }
    return new OrderItemQuantityVO(raw);
  }

  static reconstitute(raw: number): OrderItemQuantityVO {
    return new OrderItemQuantityVO(raw);
  }

  add(other: OrderItemQuantityVO): OrderItemQuantityVO {
    return OrderItemQuantityVO.create(this.value + other.value);
  }

  subtract(other: OrderItemQuantityVO): OrderItemQuantityVO {
    return OrderItemQuantityVO.create(this.value - other.value);
  }
}
