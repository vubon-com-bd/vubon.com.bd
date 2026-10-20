/**
 * OrderItemQuantity Value Object
 * @module order-service/domain/value-objects/primitives
 */
import { BaseQuantityVO } from '@vubon/shared-kernel/domain/primitives';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { ORDER_ITEM_LIMIT } from '@vubon/shared-constants/business/order';

export class OrderItemQuantityVO extends BaseQuantityVO {
  private constructor(value: number) {
    super(value);
  }

  static create(raw: number): OrderItemQuantityVO {
    if (!Number.isInteger(raw)) {
      throw new ValidationError('OrderItemQuantity must be an integer', 'quantity');
    }
    if (raw < ORDER_ITEM_LIMIT.MIN_QUANTITY || raw > ORDER_ITEM_LIMIT.MAX_QUANTITY) {
      throw new ValidationError(
        `OrderItemQuantity must be between ${ORDER_ITEM_LIMIT.MIN_QUANTITY} and ${ORDER_ITEM_LIMIT.MAX_QUANTITY}`,
        'quantity',
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
