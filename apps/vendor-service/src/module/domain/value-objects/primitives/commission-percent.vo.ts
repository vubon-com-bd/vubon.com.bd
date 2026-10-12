/**
 * CommissionPercent Value Object — 0 to 50 (per VENDOR_COMMISSION constraints)
 * @module vendor-service/domain/value-objects/primitives
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { VENDOR_COMMISSION } from '@vubon/shared-constants/business';

const MIN = VENDOR_COMMISSION.MIN_PERCENT;
const MAX = VENDOR_COMMISSION.MAX_PERCENT;
const DECIMALS = VENDOR_COMMISSION.DECIMAL_PLACES;

export class CommissionPercentVO extends BaseVO<number> {
  private constructor(value: number) {
    super(value);
  }

  static create(raw: number): CommissionPercentVO {
    if (!Number.isFinite(raw)) {
      throw new ValidationError('Commission percent must be a finite number', 'commissionPercent');
    }
    if (raw < MIN || raw > MAX) {
      throw new ValidationError(
        `Commission percent must be between ${MIN} and ${MAX}`,
        'commissionPercent',
      );
    }
    const factor = Math.pow(10, DECIMALS);
    const rounded = Math.round(raw * factor) / factor;
    return new CommissionPercentVO(rounded);
  }

  static reconstitute(raw: number): CommissionPercentVO {
    return new CommissionPercentVO(raw);
  }

  static zero(): CommissionPercentVO {
    return new CommissionPercentVO(0);
  }

  static defaultPercent(): CommissionPercentVO {
    return new CommissionPercentVO(VENDOR_COMMISSION.DEFAULT_PERCENT);
  }

  applyTo(amount: number): number {
    if (!Number.isFinite(amount) || amount < 0) {
      throw new ValidationError('Amount to apply commission must be non-negative', 'amount');
    }
    return Math.round(amount * (this.value / 100) * 100) / 100;
  }

  isZero(): boolean {
    return this.value === 0;
  }

  asFraction(): number {
    return this.value / 100;
  }
}
