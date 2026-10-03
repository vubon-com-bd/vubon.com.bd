/**
 * OrderTotal Value Object (single money amount)
 * @module order-service/domain/value-objects/primitives
 *
 * NOTE: Composite breakdown → composites/order-total.vo.ts
 * This is single positive money value — used for total field.
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { CURRENCY } from '@vubon/shared-constants/common';

export interface OrderMoneyValue {
  readonly amount: number;
  readonly currency: string;
}

const VALID_CURRENCIES = new Set<string>(Object.values(CURRENCY));

export class OrderTotalVO extends BaseVO<OrderMoneyValue> {
  private constructor(value: OrderMoneyValue) {
    super(value);
  }

  static create(amount: number, currency: string): OrderTotalVO {
    const vo = new OrderTotalVO({ amount, currency });
    vo.validate();
    return vo;
  }

  static reconstitute(amount: number, currency: string): OrderTotalVO {
    return new OrderTotalVO({ amount, currency });
  }

  protected validate(): void {
    const { amount, currency } = this.value;
    if (!Number.isFinite(amount)) {
      throw new ValidationError('Total amount must be a finite number', 'total');
    }
    if (amount < 0) {
      throw new ValidationError('Total amount cannot be negative', 'total');
    }
    if (!VALID_CURRENCIES.has(currency)) {
      throw new ValidationError(`Invalid currency: ${currency}`, 'currency');
    }
  }

  get amount(): number { return this.value.amount; }
  get currency(): string { return this.value.currency; }

  add(other: OrderTotalVO): OrderTotalVO {
    this.assertSameCurrency(other);
    return OrderTotalVO.create(this.round(this.amount + other.amount), this.currency);
  }

  subtract(other: OrderTotalVO): OrderTotalVO {
    this.assertSameCurrency(other);
    const diff = this.round(this.amount - other.amount);
    if (diff < 0) {
      throw new ValidationError('Result cannot be negative', 'total');
    }
    return OrderTotalVO.create(diff, this.currency);
  }

  private assertSameCurrency(other: OrderTotalVO): void {
    if (this.currency !== other.currency) {
      throw new ValidationError(
        `Currency mismatch: ${this.currency} vs ${other.currency}`,
        'currency',
      );
    }
  }

  private round(value: number): number {
    return Math.round(value * 100) / 100;
  }
}
