/**
 * PayoutAmount Value Object — respects VENDOR_PAYOUT min/max
 * @module vendor-service/domain/value-objects/primitives
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { VENDOR_PAYOUT } from '@vubon/shared-constants/business';

const MIN = VENDOR_PAYOUT.MIN_AMOUNT;
const MAX = VENDOR_PAYOUT.MAX_AMOUNT;

export interface PayoutAmountValue {
  readonly amount: number;
  readonly currency: string;
}

export class PayoutAmountVO extends BaseVO<PayoutAmountValue> {
  private constructor(value: PayoutAmountValue) {
    super(value);
  }

  static create(amount: number, currency: string): PayoutAmountVO {
    if (!Number.isFinite(amount)) {
      throw new ValidationError('Payout amount must be a finite number', 'payoutAmount');
    }
    if (amount < MIN) {
      throw new ValidationError(`Payout amount must be at least ${MIN}`, 'payoutAmount');
    }
    if (amount > MAX) {
      throw new ValidationError(`Payout amount cannot exceed ${MAX}`, 'payoutAmount');
    }
    if (typeof currency !== 'string' || currency.length !== 3) {
      throw new ValidationError('Currency must be a 3-char ISO code', 'currency');
    }
    const rounded = Math.round(amount * 100) / 100;
    return new PayoutAmountVO({ amount: rounded, currency: currency.toUpperCase() });
  }

  static reconstitute(value: PayoutAmountValue): PayoutAmountVO {
    return new PayoutAmountVO(value);
  }

  static minimum(currency: string): PayoutAmountVO {
    return new PayoutAmountVO({ amount: MIN, currency: currency.toUpperCase() });
  }

  get amount(): number {
    return this.value.amount;
  }

  get currency(): string {
    return this.value.currency;
  }

  add(other: PayoutAmountVO): PayoutAmountVO {
    this.assertSameCurrency(other);
    return PayoutAmountVO.create(this.amount + other.amount, this.currency);
  }

  subtractFee(feeAmount: number): PayoutAmountVO {
    if (!Number.isFinite(feeAmount) || feeAmount < 0) {
      throw new ValidationError('Fee must be a non-negative number', 'fee');
    }
    const net = Math.round((this.amount - feeAmount) * 100) / 100;
    if (net < MIN) {
      throw new ValidationError(
        `Net payout after fee (${net}) is below minimum (${MIN})`,
        'payoutAmount',
      );
    }
    return new PayoutAmountVO({ amount: net, currency: this.currency });
  }

  isAtMinimum(): boolean {
    return this.amount === MIN;
  }

  private assertSameCurrency(other: PayoutAmountVO): void {
    if (this.currency !== other.currency) {
      throw new ValidationError('Currency mismatch', 'currency');
    }
  }
}
