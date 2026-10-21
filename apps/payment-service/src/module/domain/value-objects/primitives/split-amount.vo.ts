/**
 * SplitAmount Value Object
 * @module payment-service/domain/value-objects/primitives
 *
 * Represents an amount allocated to a single split receiver.
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export interface SplitAmountValue {
  readonly amount: number;
  readonly currency: string;
}

export class SplitAmountVO extends BaseVO<SplitAmountValue> {
  private constructor(value: SplitAmountValue) {
    super(value);
  }

  static create(amount: number, currency: string): SplitAmountVO {
    if (!Number.isFinite(amount)) {
      throw new ValidationError('SplitAmount must be a finite number', 'splitAmount');
    }
    if (amount <= 0) {
      throw new ValidationError('SplitAmount must be positive', 'splitAmount');
    }
    if (typeof currency !== 'string' || currency.trim().length === 0) {
      throw new ValidationError('SplitAmount currency required', 'currency');
    }
    const rounded = Math.round(amount * 100) / 100;
    return new SplitAmountVO({ amount: rounded, currency: currency.toUpperCase() });
  }

  static reconstitute(amount: number, currency: string): SplitAmountVO {
    return new SplitAmountVO({ amount, currency });
  }

  get amount(): number { return this.value.amount; }
  get currency(): string { return this.value.currency; }
}
