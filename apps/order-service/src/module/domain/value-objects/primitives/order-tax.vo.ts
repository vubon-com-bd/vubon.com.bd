import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '../../errors/validation.errors';

export class OrderTaxVO extends BaseVO<number> {
  private constructor(value: number) {
    super(value);
  }

  static create(raw: number): OrderTaxVO {
    if (raw < 0 || !Number.isFinite(raw)) {
      throw new ValidationError('OrderTax', `invalid: ${raw}`);
    }
    return new OrderTaxVO(raw);
  }

  static zero(): OrderTaxVO {
    return new OrderTaxVO(0);
  }

  toDecimal(): string {
    return this.value.toFixed(2);
  }
}
