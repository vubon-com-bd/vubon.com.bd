import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '../../errors/validation.errors';

export class OrderItemQuantityVO extends BaseVO<number> {
  static readonly MIN = 1;
  static readonly MAX = 9999;

  private constructor(value: number) {
    super(value);
  }

  static create(raw: number): OrderItemQuantityVO {
    if (!Number.isInteger(raw)) {
      throw new ValidationError('OrderItemQuantity', 'must be an integer');
    }
    if (raw < OrderItemQuantityVO.MIN || raw > OrderItemQuantityVO.MAX) {
      throw new ValidationError(
        'OrderItemQuantity',
        `must be between ${OrderItemQuantityVO.MIN} and ${OrderItemQuantityVO.MAX}`,
      );
    }
    return new OrderItemQuantityVO(raw);
  }

  add(other: OrderItemQuantityVO): OrderItemQuantityVO {
    return OrderItemQuantityVO.create(this.value + other.value);
  }

  multiply(factor: number): number {
    return this.value * factor;
  }
}
