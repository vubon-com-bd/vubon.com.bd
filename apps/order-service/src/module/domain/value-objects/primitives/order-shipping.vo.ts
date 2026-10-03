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
  }

  static create(amount: number, currency: string, method?: string): OrderShippingVO {
    const vo = new OrderShippingVO({ amount, currency, method });
    vo.validate();
    return vo;
  }

  static free(currency: string): OrderShippingVO {
    return new OrderShippingVO({ amount: 0, currency });
  }

  static reconstitute(amount: number, currency: string, method?: string): OrderShippingVO {
    return new OrderShippingVO({ amount, currency, method });
  }

  protected validate(): void {
    const { amount, currency } = this.value;
    if (!Number.isFinite(amount) || amount < 0) {
      throw new ValidationError('Shipping must be non-negative finite', 'shipping');
    }
    if (!VALID_CURRENCIES.has(currency)) {
      throw new ValidationError(`Invalid currency: ${currency}`, 'currency');
    }
  }

  get amount(): number { return this.value.amount; }
  get currency(): string { return this.value.currency; }
  get method(): string | undefined { return this.value.method; }
  get isFree(): boolean { return this.amount === 0; }
}
