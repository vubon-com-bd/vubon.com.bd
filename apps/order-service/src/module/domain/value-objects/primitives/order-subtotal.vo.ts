/**
 * OrderSubtotal Value Object
 * @module order-service/domain/value-objects/primitives
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { CURRENCY } from '@vubon/shared-constants/common';

export interface OrderSubtotalValue {
  readonly amount: number;
  readonly currency: string;
}

const VALID_CURRENCIES = new Set<string>(Object.values(CURRENCY));

export class OrderSubtotalVO extends BaseVO<OrderSubtotalValue> {
  private constructor(value: OrderSubtotalValue) {
    super(value);
    Object.freeze(this);
  }

  static create(amount: number, currency: string): OrderSubtotalVO {
    if (!Number.isFinite(amount)) {
      throw new ValidationError('OrderSubtotal amount must be finite', 'amount');
    }
    if (amount < 0) {
      throw new ValidationError('OrderSubtotal amount cannot be negative', 'amount');
    }
    if (!VALID_CURRENCIES.has(currency)) {
      throw new ValidationError(`Invalid currency: ${currency}`, 'currency');
    }
    const rounded = Math.round(amount * 100) / 100;
    return new OrderSubtotalVO({ amount: rounded, currency });
  }

  static zero(currency: string): OrderSubtotalVO {
    return new OrderSubtotalVO({ amount: 0, currency });
  }

  static reconstitute(value: OrderSubtotalValue): OrderSubtotalVO {
    return new OrderSubtotalVO(value);
  }

  get amount(): number { return this.value.amount; }
  get currency(): string { return this.value.currency; }

  add(other: OrderSubtotalVO): OrderSubtotalVO {
    this.assertSameCurrency(other);
    return OrderSubtotalVO.create(this.amount + other.amount, this.currency);
  }

  private assertSameCurrency(other: OrderSubtotalVO): void {
    if (this.currency !== other.currency) {
      throw new ValidationError(
        `Currency mismatch: ${this.currency} vs ${other.currency}`,
        'currency',
      );
    }
  }
}
