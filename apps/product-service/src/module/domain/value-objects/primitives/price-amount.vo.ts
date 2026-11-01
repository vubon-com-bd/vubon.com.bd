/**
 * PriceAmount Value Object
 * @module product-service/domain/value-objects/primitives
 *
 * Non-negative fixed-precision amount।
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { PRICING } from '@vubon/shared-constants/business';

export class PriceAmountVO extends BaseVO<number> {
  private constructor(value: number) { super(value); }

  static create(raw: number): PriceAmountVO {
    if (!Number.isFinite(raw)) {
      throw new ValidationError('PriceAmount must be a finite number', 'amount');
    }
    if (raw < PRICING.MIN_PRICE) {
      throw new ValidationError(`PriceAmount cannot be less than ${PRICING.MIN_PRICE}`, 'amount');
    }
    if (raw > PRICING.MAX_PRICE) {
      throw new ValidationError(`PriceAmount exceeds max ${PRICING.MAX_PRICE}`, 'amount');
    }
    const factor = Math.pow(10, PRICING.DECIMAL_PLACES);
    return new PriceAmountVO(Math.round(raw * factor) / factor);
  }

  static reconstitute(raw: number): PriceAmountVO { return new PriceAmountVO(raw); }

  static zero(): PriceAmountVO { return new PriceAmountVO(0); }

  isZero(): boolean { return this.value === 0; }
  isPositive(): boolean { return this.value > 0; }

  add(other: PriceAmountVO): PriceAmountVO {
    return PriceAmountVO.create(this.value + other.value);
  }

  subtract(other: PriceAmountVO): PriceAmountVO {
    return PriceAmountVO.create(this.value - other.value);
  }

  multiply(factor: number): PriceAmountVO {
    return PriceAmountVO.create(this.value * factor);
  }
}
