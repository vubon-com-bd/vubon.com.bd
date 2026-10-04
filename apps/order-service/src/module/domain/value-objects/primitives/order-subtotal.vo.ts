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
  }

  static create(amount: number, currency: string): OrderSubtotalVO {
    const vo = new OrderSubtotalVO({ amount, currency });
    vo.validate();
    return vo;
  }

  static zero(currency: string): OrderSubtotalVO {
    return new OrderSubtotalVO({ amount: 0, currency });
  }

  static reconstitute(amount: number, currency: string): OrderSubtotalVO {
    return new OrderSubtotalVO({ amount, currency });
  }

  protected validate(): void {
    const { amount, currency } = this.value;
    if (!Number.isFinite(amount) || amount < 0) {
      throw new ValidationError('Subtotal must be non-negative finite number', 'subtotal');
    }
    if (!VALID_CURRENCIES.has(currency)) {
      throw new ValidationError(`Invalid currency: ${currency}`, 'currency');
    }
  }

  get amount(): number { return this.value.amount; }
  get currency(): string { return this.value.currency; }

  add(other: OrderSubtotalVO): OrderSubtotalVO {
    if (this.currency !== other.currency) {
      throw new ValidationError('Currency mismatch', 'currency');
    }
    return OrderSubtotalVO.create(
      Math.round((this.amount + other.amount) * 100) / 100,
      this.currency,
    );
  }
}
