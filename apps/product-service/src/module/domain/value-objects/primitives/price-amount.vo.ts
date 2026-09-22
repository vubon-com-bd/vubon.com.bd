import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { InvalidValueError } from '../../errors/invalid-value.errors';

export class PriceAmountVO extends BaseVO<number> {
  private constructor(value: number) {
    super(value);
  }

  static create(raw: number): PriceAmountVO {
    if (Number.isNaN(raw)) {
      throw new InvalidValueError('price_amount', 'Price amount cannot be NaN');
    }
    if (raw < 0) {
      throw new InvalidValueError('price_amount', `Price cannot be negative: ${raw}`);
    }
    if (raw > 1000000000) {
      throw new InvalidValueError('price_amount', `Price exceeds max: ${raw}`);
    }
    return new PriceAmountVO(raw);
  }

  isFree(): boolean { return this.value === 0; }

  withDiscount(percent: number): PriceAmountVO {
    if (percent < 0 || percent > 100) {
      throw new InvalidValueError('price_amount', `Invalid discount percent: ${percent}`);
    }
    return new PriceAmountVO(this.value * (1 - percent / 100));
  }
}
