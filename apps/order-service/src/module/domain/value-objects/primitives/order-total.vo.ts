/**
 * OrderTotal Value Object
 * @module order-service/domain/value-objects/primitives
 *
 * Immutable money amount with currency. Cannot be negative.
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { CURRENCY } from '@vubon/shared-constants/common';
import { ORDER_LIMIT } from '@vubon/shared-constants/business/order';

export interface OrderTotalValue {
  readonly amount: number;
  readonly currency: string;
}

const VALID_CURRENCIES = new Set<string>(Object.values(CURRENCY));

export class OrderTotalVO extends BaseVO<OrderTotalValue> {
  private constructor(value: OrderTotalValue) {
    super(value);
    Object.freeze(this);
  }

  static create(amount: number, currency: string): OrderTotalVO {
    if (!Number.isFinite(amount)) {
      throw new ValidationError('OrderTotal amount must be finite', 'amount');
    }
    if (amount < 0) {
      throw new ValidationError('OrderTotal amount cannot be negative', 'amount');
    }
    if (amount > ORDER_LIMIT.MAX_AMOUNT) {
      throw new ValidationError(
        `OrderTotal amount exceeds max ${ORDER_LIMIT.MAX_AMOUNT}`,
        'amount',
      );
    }
    if (!VALID_CURRENCIES.has(currency)) {
      throw new ValidationError(`Invalid currency: ${currency}`, 'currency');
    }
    const rounded = Math.round(amount * 100) / 100;
    return new OrderTotalVO({ amount: rounded, currency });
  }

  static zero(currency: string): OrderTotalVO {
    return new OrderTotalVO({ amount: 0, currency });
  }

  static reconstitute(value: OrderTotalValue): OrderTotalVO {
    return new OrderTotalVO(value);
  }

  get amount(): number { return this.value.amount; }
  get currency(): string { return this.value.currency; }

  add(other: OrderTotalVO): OrderTotalVO {
    this.assertSameCurrency(other);
    return OrderTotalVO.create(this.amount + other.amount, this.currency);
  }

  subtract(other: OrderTotalVO): OrderTotalVO {
    this.assertSameCurrency(other);
    return OrderTotalVO.create(this.amount - other.amount, this.currency);
  }

  isZero(): boolean { return this.amount === 0; }
  isPositive(): boolean { return this.amount > 0; }

  private assertSameCurrency(other: OrderTotalVO): void {
    if (this.currency !== other.currency) {
      throw new ValidationError(
        `Currency mismatch: ${this.currency} vs ${other.currency}`,
        'currency',
      );
    }
  }
}
