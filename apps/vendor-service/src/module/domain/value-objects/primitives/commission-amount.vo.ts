/**
 * CommissionAmount Value Object — non-negative money
 * @module vendor-service/domain/value-objects/primitives
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { VENDOR_COMMISSION } from '@vubon/shared-constants/business';

const MAX = VENDOR_COMMISSION.MAX_FIXED;
const MIN = VENDOR_COMMISSION.MIN_FIXED;

export interface CommissionAmountValue {
  readonly amount: number;
  readonly currency: string;
}

export class CommissionAmountVO extends BaseVO<CommissionAmountValue> {
  private constructor(value: CommissionAmountValue) {
    super(value);
  }

  static create(amount: number, currency: string): CommissionAmountVO {
    if (!Number.isFinite(amount)) {
      throw new ValidationError('Commission amount must be a finite number', 'commissionAmount');
    }
    if (amount < MIN || amount > MAX) {
      throw new ValidationError(
        `Commission amount must be between ${MIN} and ${MAX}`,
        'commissionAmount',
      );
    }
    if (typeof currency !== 'string' || currency.length !== 3) {
      throw new ValidationError('Currency must be a 3-char ISO code', 'currency');
    }
    const rounded = Math.round(amount * 100) / 100;
    return new CommissionAmountVO({ amount: rounded, currency: currency.toUpperCase() });
  }

  static reconstitute(value: CommissionAmountValue): CommissionAmountVO {
    return new CommissionAmountVO(value);
  }

  static zero(currency: string): CommissionAmountVO {
    return new CommissionAmountVO({ amount: 0, currency: currency.toUpperCase() });
  }

  get amount(): number {
    return this.value.amount;
  }

  get currency(): string {
    return this.value.currency;
  }

  add(other: CommissionAmountVO): CommissionAmountVO {
    this.assertSameCurrency(other);
    return CommissionAmountVO.create(this.amount + other.amount, this.currency);
  }

  subtract(other: CommissionAmountVO): CommissionAmountVO {
    this.assertSameCurrency(other);
    const result = Math.round((this.amount - other.amount) * 100) / 100;
    if (result < 0) {
      throw new ValidationError('Commission subtraction would result in negative', 'commissionAmount');
    }
    return new CommissionAmountVO({ amount: result, currency: this.currency });
  }

  isZero(): boolean {
    return this.amount === 0;
  }

  private assertSameCurrency(other: CommissionAmountVO): void {
    if (this.currency !== other.currency) {
      throw new ValidationError(
        `Currency mismatch: ${this.currency} vs ${other.currency}`,
        'currency',
      );
    }
  }
}
