/**
 * OrderDiscount Value Object
 * @module order-service/domain/value-objects/primitives
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { CURRENCY } from '@vubon/shared-constants/common';

export interface OrderDiscountValue {
  readonly amount: number;
  readonly currency: string;
  readonly code?: string;
}

const VALID_CURRENCIES = new Set<string>(Object.values(CURRENCY));

export class OrderDiscountVO extends BaseVO<OrderDiscountValue> {
  private constructor(value: OrderDiscountValue) {
    super(value);
    Object.freeze(this);
  }

  static create(amount: number, currency: string, code?: string): OrderDiscountVO {
    if (!Number.isFinite(amount)) {
      throw new ValidationError('OrderDiscount amount must be finite', 'amount');
    }
    if (amount < 0) {
      throw new ValidationError('OrderDiscount amount cannot be negative', 'amount');
    }
    if (!VALID_CURRENCIES.has(currency)) {
      throw new ValidationError(`Invalid currency: ${currency}`, 'currency');
    }
    const rounded = Math.round(amount * 100) / 100;
    return new OrderDiscountVO({ amount: rounded, currency, code });
  }

  static none(currency: string): OrderDiscountVO {
    return new OrderDiscountVO({ amount: 0, currency });
  }

  static reconstitute(value: OrderDiscountValue): OrderDiscountVO {
    return new OrderDiscountVO(value);
  }

  get amount(): number { return this.value.amount; }
  get currency(): string { return this.value.currency; }
  get code(): string | undefined { return this.value.code; }

  isApplied(): boolean { return this.amount > 0; }
}
