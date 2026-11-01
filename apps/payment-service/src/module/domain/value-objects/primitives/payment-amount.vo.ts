/**
 * PaymentAmount Value Object
 * @module payment-service/domain/value-objects/primitives
 *
 * Business Rule:
 * - Positive number
 * - Max 2 decimal places
 * - Range: PAYMENT_LIMIT.MIN_AMOUNT - PAYMENT_LIMIT.MAX_AMOUNT
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
      throw new ValidationError('PaymentAmount must be a finite number', 'amount');
    }
    if (amount < PAYMENT_LIMIT.MIN_AMOUNT) {
      throw new ValidationError(
        `PaymentAmount must be >= ${PAYMENT_LIMIT.MIN_AMOUNT}`,
        'amount',
      );
    }
    if (amount > PAYMENT_LIMIT.MAX_AMOUNT) {
      throw new ValidationError(
        `PaymentAmount must be <= ${PAYMENT_LIMIT.MAX_AMOUNT}`,
        'amount',
      );
    }
    if (typeof currency !== 'string' || currency.trim().length === 0) {
      throw new ValidationError('PaymentAmount currency required', 'currency');
    }
    const rounded = Math.round(amount * 100) / 100;
    return new PaymentAmountVO({ amount: rounded, currency: currency.toUpperCase() });
  }

  static reconstitute(amount: number, currency: string): PaymentAmountVO {
    return new PaymentAmountVO({ amount, currency });
  }

  get amount(): number { return this.value.amount; }
  get currency(): string { return this.value.currency; }

  add(other: PaymentAmountVO): PaymentAmountVO {
    this.assertSameCurrency(other);
    return PaymentAmountVO.create(this.amount + other.amount, this.currency);
  }

  subtract(other: PaymentAmountVO): PaymentAmountVO {
    this.assertSameCurrency(other);
    return PaymentAmountVO.create(this.amount - other.amount, this.currency);
  }

  multiply(factor: number): PaymentAmountVO {
    if (!Number.isFinite(factor) || factor < 0) {
      throw new ValidationError('Multiplier must be a positive number', 'factor');
    }
    return PaymentAmountVO.create(this.amount * factor, this.currency);
  }

  isZero(): boolean { return this.amount === 0; }
  isPositive(): boolean { return this.amount > 0; }

  private assertSameCurrency(other: PaymentAmountVO): void {
    if (this.currency !== other.currency) {
      throw new ValidationError(
        `Currency mismatch: ${this.currency} vs ${other.currency}`,
        'currency',
      );
    }
  }
}
