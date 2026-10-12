/**
 * SettlementAmount Value Object — respects VENDOR_SETTLEMENT min/max
 * @module vendor-service/domain/value-objects/primitives
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { VENDOR_SETTLEMENT } from '@vubon/shared-constants/business';

const MIN = VENDOR_SETTLEMENT.MIN_AMOUNT;
const MAX = VENDOR_SETTLEMENT.MAX_AMOUNT;

export interface SettlementAmountValue {
  readonly amount: number;
  readonly currency: string;
}

export class SettlementAmountVO extends BaseVO<SettlementAmountValue> {
  private constructor(value: SettlementAmountValue) {
    super(value);
  }

  static create(amount: number, currency: string): SettlementAmountVO {
    if (!Number.isFinite(amount)) {
      throw new ValidationError('Settlement amount must be a finite number', 'settlementAmount');
    }
    if (amount < MIN) {
      throw new ValidationError(`Settlement amount must be at least ${MIN}`, 'settlementAmount');
    }
    if (amount > MAX) {
      throw new ValidationError(`Settlement amount cannot exceed ${MAX}`, 'settlementAmount');
    }
    if (typeof currency !== 'string' || currency.length !== 3) {
      throw new ValidationError('Currency must be a 3-char ISO code', 'currency');
    }
    const rounded = Math.round(amount * 100) / 100;
    return new SettlementAmountVO({ amount: rounded, currency: currency.toUpperCase() });
  }

  static reconstitute(value: SettlementAmountValue): SettlementAmountVO {
    return new SettlementAmountVO(value);
  }

  get amount(): number {
    return this.value.amount;
  }

  get currency(): string {
    return this.value.currency;
  }

  /** Split into payout-eligible and carried-forward remainder. */
  splitForPayout(payoutMin: number): { payoutable: number; carriedForward: number } {
    if (this.amount < payoutMin) {
      return { payoutable: 0, carriedForward: this.amount };
    }
    return { payoutable: this.amount, carriedForward: 0 };
  }
}
