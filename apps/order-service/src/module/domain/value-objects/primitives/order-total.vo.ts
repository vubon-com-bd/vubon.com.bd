import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '../../errors/validation.errors';

export class OrderTotalVO extends BaseVO<number> {
  private constructor(value: number) {
    super(value);
  }

  static create(raw: number): OrderTotalVO {
    if (raw < 0 || !Number.isFinite(raw)) {
      throw new ValidationError('OrderTotal', `invalid: ${raw}`);
    }
    return new OrderTotalVO(raw);
  }

  get currency(): string {
    return 'BDT';
  }

  add(other: OrderTotalVO): OrderTotalVO {
    return new OrderTotalVO(this.value + other.value);
  }

  subtract(other: OrderTotalVO): OrderTotalVO {
    const result = this.value - other.value;
    if (result < 0) {
      throw new ValidationError('OrderTotal', 'cannot be negative');
    }
    return new OrderTotalVO(result);
  }

  toDecimal(): string {
    return this.value.toFixed(2);
  }
}
