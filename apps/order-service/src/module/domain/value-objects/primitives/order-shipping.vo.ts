/**
 * OrderShipping Value Object
 * @module order-service/domain/value-objects/primitives
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { CURRENCY } from '@vubon/shared-constants/common';

export interface OrderShippingValue {
  readonly amount: number;
  readonly currency: string;
  readonly method?: string;
}

const VALID_CURRENCIES = new Set<string>(Object.values(CURRENCY));

export class OrderShippingVO extends BaseVO<OrderShippingValue> {
  private constructor(value: OrderShippingValue) {
    super(value);
    Object.freeze(this);
  }

  static create(amount: number, currency: string, method?: string): OrderShippingVO {
    if (!Number.isFinite(amount) || amount < 0) {
      throw new ValidationError('OrderShipping amount must be non-negative finite', 'amount');
    }
    if (!VALID_CURRENCIES.has(currency)) {
      throw new ValidationError(`Invalid currency: ${currency}`, 'currency');
    }
    const rounded = Math.round(amount * 100) / 100;
    return new OrderShippingVO({ amount: rounded, currency, method });
  }

  static free(currency: string, method?: string): OrderShippingVO {
    return new OrderShippingVO({ amount: 0, currency, method });
  }

  static reconstitute(value: OrderShippingValue): OrderShippingVO {
    return new OrderShippingVO(value);
  }

  get amount(): number { return this.value.amount; }
  get currency(): string { return this.value.currency; }
  get method(): string | undefined { return this.value.method; }

  isFree(): boolean { return this.amount === 0; }
}
