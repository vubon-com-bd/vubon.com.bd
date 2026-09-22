import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '../../errors/validation.errors';

export class OrderDiscountVO extends BaseVO<number> {
  private constructor(value: number) {
    super(value);
  }

  static create(raw: number): OrderDiscountVO {
    if (raw < 0 || !Number.isFinite(raw)) {
      throw new ValidationError('OrderDiscount', `invalid: ${raw}`);
    }
    return new OrderDiscountVO(raw);
  }

  static zero(): OrderDiscountVO {
    return new OrderDiscountVO(0);
  }

  toDecimal(): string {
    return this.value.toFixed(2);
  }
}
