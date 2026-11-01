/**
 * OrderTax Value Object
 * @module order-service/domain/value-objects/primitives
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { CURRENCY } from '@vubon/shared-constants/common';

export interface OrderTaxValue {
  readonly amount: number;
  readonly currency: string;
  readonly rate?: number;
}

const VALID_CURRENCIES = new Set<string>(Object.values(CURRENCY));

export class OrderTaxVO extends BaseVO<OrderTaxValue> {
  private constructor(value: OrderTaxValue) {
    super(value);
    Object.freeze(this);
  }

  static create(amount: number, currency: string, rate?: number): OrderTaxVO {
    if (!Number.isFinite(amount) || amount < 0) {
      throw new ValidationError('OrderTax amount must be non-negative finite', 'amount');
    }
    if (!VALID_CURRENCIES.has(currency)) {
      throw new ValidationError(`Invalid currency: ${currency}`, 'currency');
    }
    if (rate !== undefined && (rate < 0 || rate > 1)) {
      throw new ValidationError('OrderTax rate must be between 0 and 1', 'rate');
    }
    const rounded = Math.round(amount * 100) / 100;
    return new OrderTaxVO({ amount: rounded, currency, rate });
  }

  static none(currency: string): OrderTaxVO {
    return new OrderTaxVO({ amount: 0, currency });
  }

  static reconstitute(value: OrderTaxValue): OrderTaxVO {
    return new OrderTaxVO(value);
  }

  get amount(): number { return this.value.amount; }
  get currency(): string { return this.value.currency; }
  get rate(): number | undefined { return this.value.rate; }

  hasTax(): boolean { return this.amount > 0; }
}
