/**
 * PaymentAmount Value Object — positive money with currency & rounding
 * @module payment-service/domain/value-objects/primitives
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { PAYMENT_LIMIT } from '@vubon/shared-constants/business/payment';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export interface PaymentAmountValue {
  readonly amount: number;
  readonly currency: string;
}

export class PaymentAmountVO extends BaseVO<PaymentAmountValue> {
  private constructor(value: PaymentAmountValue) {
    super(value);
  }

  static create(amount: number, currency: string): PaymentAmountVO {
    if (!Number.isFinite(amount)) {
      throw new ValidationError('Amount must be a finite number', 'amount');
    }
    if (amount < PAYMENT_LIMIT.MIN_AMOUNT) {
      throw new ValidationError(
        `Amount must be at least ${PAYMENT_LIMIT.MIN_AMOUNT}`,
        'amount',
      );
    }
    if (amount > PAYMENT_LIMIT.MAX_AMOUNT) {
      throw new ValidationError(
        `Amount exceeds maximum ${PAYMENT_LIMIT.MAX_AMOUNT}`,
        'amount',
      );
    }
    if (typeof currency !== 'string' || currency.trim().length !== 3) {
      throw new ValidationError('Currency must be a 3-char ISO code', 'currency');
    }
    const rounded = Math.round(amount * 100) / 100;
    return new PaymentAmountVO({ amount: rounded, currency: currency.toUpperCase() });
  }

  static reconstitute(amount: number, currency: string): PaymentAmountVO {
    return new PaymentAmountVO({ amount, currency: currency.toUpperCase() });
  }

  get amount(): number {
    return this.value.amount;
  }

  get currency(): string {
    return this.value.currency;
  }

  add(other: PaymentAmountVO): PaymentAmountVO {
    this.assertSameCurrency(other);
    return PaymentAmountVO.create(this.amount + other.amount, this.currency);
  }

  subtract(other: PaymentAmountVO): PaymentAmountVO {
    this.assertSameCurrency(other);
    const result = Math.round((this.amount - other.amount) * 100) / 100;
    if (result < 0) {
      throw new ValidationError('Result amount cannot be negative', 'amount');
    }
    return PaymentAmountVO.reconstitute(result, this.currency);
  }

  multiply(factor: number): PaymentAmountVO {
    if (!Number.isFinite(factor) || factor < 0) {
      throw new ValidationError('Multiplier must be a non-negative finite number', 'factor');
    }
    return PaymentAmountVO.reconstitute(
      Math.round(this.amount * factor * 100) / 100,
      this.currency,
    );
  }

  percentageOf(percent: number): PaymentAmountVO {
    if (!Number.isFinite(percent) || percent < 0 || percent > 100) {
      throw new ValidationError('Percent must be between 0 and 100', 'percent');
    }
    return this.multiply(percent / 100);
  }

  isGreaterThan(other: PaymentAmountVO): boolean {
    this.assertSameCurrency(other);
    return this.amount > other.amount;
  }

  isGreaterThanOrEqual(other: PaymentAmountVO): boolean {
    this.assertSameCurrency(other);
    return this.amount >= other.amount;
  }

  isZero(): boolean {
    return this.amount === 0;
  }

  private assertSameCurrency(other: PaymentAmountVO): void {
    if (this.currency !== other.currency) {
      throw new ValidationError(
        `Currency mismatch: ${this.currency} vs ${other.currency}`,
        'currency',
      );
    }
  }
}
