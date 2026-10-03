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
}

const VALID_CURRENCIES = new Set<string>(Object.values(CURRENCY));

export class OrderDiscountVO extends BaseVO<OrderDiscountValue> {
  private constructor(value: OrderDiscountValue) {
    super(value);
  }

  static create(amount: number, currency: string): OrderDiscountVO {
    const vo = new OrderDiscountVO({ amount, currency });
    vo.validate();
    return vo;
  }

  static zero(currency: string): OrderDiscountVO {
    return new OrderDiscountVO({ amount: 0, currency });
  }

  static reconstitute(amount: number, currency: string): OrderDiscountVO {
    return new OrderDiscountVO({ amount, currency });
  }

  protected validate(): void {
    const { amount, currency } = this.value;
    if (!Number.isFinite(amount) || amount < 0) {
      throw new ValidationError('Discount must be non-negative finite', 'discount');
    }
    if (!VALID_CURRENCIES.has(currency)) {
      throw new ValidationError(`Invalid currency: ${currency}`, 'currency');
    }
  }

  get amount(): number { return this.value.amount; }
  get currency(): string { return this.value.currency; }
  get isZero(): boolean { return this.amount === 0; }
}
