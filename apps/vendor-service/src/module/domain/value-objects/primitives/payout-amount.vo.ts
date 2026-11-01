/**
 * PayoutAmount Value Object
 * @module vendor-service/domain/value-objects/primitives
 *
 * Business Rules:
 * - 100 – 10,000,000 (in BDT minor units absorbed as major)
 * - 2 decimal rounding
 * - Non-negative
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { VENDOR_PAYOUT } from '@vubon/shared-constants/business';

const MIN = VENDOR_PAYOUT.MIN_AMOUNT;
const MAX = VENDOR_PAYOUT.MAX_AMOUNT;
const DECIMALS = 2;

export class PayoutAmountVO extends BaseVO<number> {
  private constructor(value: number) {
    super(value);
  }

  static create(raw: number): PayoutAmountVO {
    if (typeof raw !== 'number' || !Number.isFinite(raw)) {
      throw new ValidationError('PayoutAmount must be a finite number', 'amount');
    }
    if (raw < MIN) {
      throw new ValidationError(
        `PayoutAmount must be at least ${MIN}`,
        'amount',
      );
    }
    if (raw > MAX) {
      throw new ValidationError(
        `PayoutAmount cannot exceed ${MAX}`,
        'amount',
      );
    }
    const factor = Math.pow(10, DECIMALS);
    const rounded = Math.round(raw * factor) / factor;
    return new PayoutAmountVO(rounded);
  }

  static reconstitute(raw: number): PayoutAmountVO {
    return new PayoutAmountVO(raw);
  }

  get amount(): number {
    return this.value;
  }

  isAtMinimum(): boolean {
    return this.value === MIN;
  }

  isAtMaximum(): boolean {
    return this.value === MAX;
  }

  /** Rounding helper for arithmetic */
  add(other: PayoutAmountVO): number {
    const factor = Math.pow(10, DECIMALS);
    return Math.round((this.value + other.value) * factor) / factor;
  }

  subtract(other: PayoutAmountVO): number {
    const factor = Math.pow(10, DECIMALS);
    return Math.round((this.value - other.value) * factor) / factor;
  }

  /** Format with 2 decimals for display */
  toDisplay(): string {
    return this.value.toFixed(DECIMALS);
  }
}
