/**
 * RefundAmount Value Object
 * @module payment-service/domain/value-objects/primitives
 *
 * Business Rule:
 * - Positive number, max 2 decimals
 * - Cannot exceed original payment amount
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export interface RefundAmountValue {
  readonly amount: number;
  readonly currency: string;
}

export class RefundAmountVO extends BaseVO<RefundAmountValue> {
  private constructor(value: RefundAmountValue) {
    super(value);
  }

  static create(amount: number, currency: string): RefundAmountVO {
    if (!Number.isFinite(amount)) {
      throw new ValidationError('RefundAmount must be a finite number', 'refundAmount');
    }
    if (amount <= 0) {
      throw new ValidationError('RefundAmount must be positive', 'refundAmount');
    }
    if (typeof currency !== 'string' || currency.trim().length === 0) {
      throw new ValidationError('RefundAmount currency required', 'currency');
    }
    const rounded = Math.round(amount * 100) / 100;
    return new RefundAmountVO({ amount: rounded, currency: currency.toUpperCase() });
  }

  static reconstitute(amount: number, currency: string): RefundAmountVO {
    return new RefundAmountVO({ amount, currency });
  }

  get amount(): number { return this.value.amount; }
  get currency(): string { return this.value.currency; }

  exceeds(paidAmount: number): boolean {
    return this.amount > paidAmount;
  }

  isFullRefundOf(paidAmount: number): boolean {
    return Math.abs(this.amount - paidAmount) < 0.01;
  }
}
