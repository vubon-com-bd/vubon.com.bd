import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '../../errors/validation.errors';

export class OrderItemPriceVO extends BaseVO<number> {
  private constructor(value: number) {
    super(value);
  }

  static create(raw: number): OrderItemPriceVO {
    if (raw < 0 || !Number.isFinite(raw)) {
      throw new ValidationError('OrderItemPrice', `invalid: ${raw}`);
    }
    return new OrderItemPriceVO(raw);
  }

  get currency(): string {
    return 'BDT';
  }

  multiply(quantity: number): number {
    return this.value * quantity;
  }

  toDecimal(): string {
    return this.value.toFixed(2);
  }
}
