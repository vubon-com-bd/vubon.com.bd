/**
 * OrderItemPrice Value Object (SNAPSHOT — price at purchase)
 * @module order-service/domain/value-objects/primitives
 *
 * Immutable — no update method, because this is the price paid at purchase time.
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { CURRENCY } from '@vubon/shared-constants/common';
import { InvalidPriceError } from '../../errors/order-item.errors.js';

export interface OrderItemPriceValue {
  readonly amount: number;
  readonly currency: string;
  readonly compareAt?: number;
}

const VALID_CURRENCIES = new Set<string>(Object.values(CURRENCY));

export class OrderItemPriceVO extends BaseVO<OrderItemPriceValue> {
  private constructor(value: OrderItemPriceValue) {
    super(value);
  }

  static create(amount: number, currency: string, compareAt?: number): OrderItemPriceVO {
    const vo = new OrderItemPriceVO({ amount, currency, compareAt });
    vo.validate();
    return vo;
  }

  static reconstitute(
    amount: number,
    currency: string,
    compareAt?: number,
  ): OrderItemPriceVO {
    return new OrderItemPriceVO({ amount, currency, compareAt });
  }

  protected validate(): void {
    const { amount, currency, compareAt } = this.value;
    if (!Number.isFinite(amount)) {
      throw new InvalidPriceError('Price must be a finite number');
    }
    if (amount < 0) {
      throw new InvalidPriceError('Price cannot be negative');
    }
    if (!VALID_CURRENCIES.has(currency)) {
      throw new InvalidPriceError(`Invalid currency: ${currency}`);
    }
    if (compareAt !== undefined && compareAt < amount) {
      throw new InvalidPriceError('compareAtPrice cannot be less than unitPrice');
    }
  }

  get amount(): number { return this.value.amount; }
  get currency(): string { return this.value.currency; }
  get compareAt(): number | undefined { return this.value.compareAt; }

  multiply(qty: number): number {
    return Math.round(this.amount * qty * 100) / 100;
  }

  hasDiscount(): boolean {
    return this.compareAt !== undefined && this.compareAt > this.amount;
  }
}
