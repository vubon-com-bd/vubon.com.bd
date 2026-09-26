import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '../../errors/validation.errors';

export class OrderSubtotalVO extends BaseVO<number> {
  private constructor(value: number) {
    super(value);
  }

  static create(raw: number): OrderSubtotalVO {
    if (raw < 0 || !Number.isFinite(raw)) {
      throw new ValidationError('OrderSubtotal', `invalid: ${raw}`);
    }
    return new OrderSubtotalVO(raw);
  }

  toDecimal(): string {
    return this.value.toFixed(2);
  }
}
