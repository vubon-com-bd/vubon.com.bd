import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '../../errors/validation.errors';

export class OrderShippingVO extends BaseVO<number> {
  private constructor(value: number) {
    super(value);
  }

  static create(raw: number): OrderShippingVO {
    if (raw < 0 || !Number.isFinite(raw)) {
      throw new ValidationError('OrderShipping', `invalid: ${raw}`);
    }
    return new OrderShippingVO(raw);
  }

  static zero(): OrderShippingVO {
    return new OrderShippingVO(0);
  }

  toDecimal(): string {
    return this.value.toFixed(2);
  }
}
