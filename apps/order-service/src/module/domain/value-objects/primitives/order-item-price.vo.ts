/**
 * OrderItemPrice Value Object
 * @module order-service/domain/value-objects/primitives
 *
 * Price at time of purchase (snapshot) — cannot be negative.
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { CURRENCY } from '@vubon/shared-constants/common';

export interface OrderItemPriceValue {
  readonly amount: number;
  readonly currency: string;
}

const VALID_CURRENCIES = new Set<string>(Object.values(CURRENCY));

export class OrderItemPriceVO extends BaseVO<OrderItemPriceValue> {
  private constructor(value: OrderItemPriceValue) {
    super(value);
    Object.freeze(this);
  }

  static create(amount: number, currency: string): OrderItemPriceVO {
    if (!Number.isFinite(amount)) {
      throw new ValidationError('OrderItemPrice amount must be finite', 'amount');
    }
    if (amount < 0) {
      throw new ValidationError('OrderItemPrice amount cannot be negative', 'amount');
    }
    if (!VALID_CURRENCIES.has(currency)) {
      throw new ValidationError(`Invalid currency: ${currency}`, 'currency');
    }
    const rounded = Math.round(amount * 100) / 100;
    return new OrderItemPriceVO({ amount: rounded, currency });
  }

  static zero(currency: string): OrderItemPriceVO {
    return new OrderItemPriceVO({ amount: 0, currency });
  }

  static reconstitute(value: OrderItemPriceValue): OrderItemPriceVO {
    return new OrderItemPriceVO(value);
  }

  get amount(): number { return this.value.amount; }
  get currency(): string { return this.value.currency; }

  multiply(factor: number): OrderItemPriceVO {
    if (!Number.isFinite(factor) || factor < 0) {
      throw new ValidationError('Multiplier must be non-negative finite', 'factor');
    }
    return OrderItemPriceVO.create(this.amount * factor, this.currency);
  }
}
