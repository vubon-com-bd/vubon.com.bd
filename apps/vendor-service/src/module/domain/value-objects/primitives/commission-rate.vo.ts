/**
 * CommissionRate Value Object
 * @module vendor-service/domain/value-objects/primitives
 *
 * Business Rules:
 * - Range 1% – 50%
 * - Rounded to 2 decimal places
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { VENDOR_COMMISSION } from '@vubon/shared-constants/business';

const MIN = VENDOR_COMMISSION.MIN_PERCENT;
const MAX = VENDOR_COMMISSION.MAX_PERCENT;
const DECIMALS = VENDOR_COMMISSION.DECIMAL_PLACES;

export class CommissionRateVO extends BaseVO<number> {
  private constructor(value: number) {
    super(value);
  }

  static create(raw: number): CommissionRateVO {
    if (typeof raw !== 'number' || !Number.isFinite(raw)) {
      throw new ValidationError('CommissionRate must be a finite number', 'rate');
    }
    if (raw < MIN || raw > MAX) {
      throw new ValidationError(
        `CommissionRate must be between ${MIN} and ${MAX}`,
        'rate',
      );
    }
    const factor = Math.pow(10, DECIMALS);
    const rounded = Math.round(raw * factor) / factor;
    return new CommissionRateVO(rounded);
  }

  static reconstitute(raw: number): CommissionRateVO {
    return new CommissionRateVO(raw);
  }

  static default(): CommissionRateVO {
    return new CommissionRateVO(VENDOR_COMMISSION.DEFAULT_PERCENT);
  }

  get percent(): number {
    return this.value;
  }

  /** Convert to decimal fraction (e.g. 15 → 0.15) */
  get fraction(): number {
    return this.value / 100;
  }

  /**
   * Apply this rate to a base amount.
   * Returns commission value (rounded to 2 decimals).
   */
  apply(baseAmount: number): number {
    if (!Number.isFinite(baseAmount) || baseAmount < 0) {
      throw new ValidationError('baseAmount must be a non-negative finite number', 'baseAmount');
    }
    const factor = Math.pow(10, DECIMALS);
    return Math.round(baseAmount * this.fraction * factor) / factor;
  }

  isHigherThan(other: CommissionRateVO): boolean {
    return this.value > other.value;
  }

  isLowerThan(other: CommissionRateVO): boolean {
    return this.value < other.value;
  }

  isAtMinimum(): boolean {
    return this.value === MIN;
  }

  isAtMaximum(): boolean {
    return this.value === MAX;
  }
}
