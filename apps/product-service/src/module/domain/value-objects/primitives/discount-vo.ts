/**
 * DiscountPercent Value Object
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { PRICING } from '@vubon/shared-constants/business/product';
import { DiscountExceededError } from '../../errors/pricing.errors.js';

export class DiscountPercentVO extends BaseVO<number> {
  private constructor(value: number) {
    super(value);
  }

  static create(raw: number): DiscountPercentVO {
    if (typeof raw !== 'number' || !Number.isFinite(raw)) {
      throw new Error('DiscountPercent must be a finite number');
    }
    if (raw < 0 || raw > PRICING.MAX_DISCOUNT_PERCENT) {
      throw new DiscountExceededError(raw, PRICING.MAX_DISCOUNT_PERCENT);
    }
    return new DiscountPercentVO(raw);
  }

  static none(): DiscountPercentVO {
    return new DiscountPercentVO(0);
  }

  static reconstitute(raw: number): DiscountPercentVO {
    return new DiscountPercentVO(raw);
  }

  applyTo(amount: number): number {
    const discount = (amount * this.value) / 100;
    return Math.round(discount * 100) / 100;
  }
}
