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
  }

  static create(amount: number, currency: string, rate?: number): OrderTaxVO {
    const vo = new OrderTaxVO({ amount, currency, rate });
    vo.validate();
    return vo;
  }

  static calculate(subtotal: number, taxRate: number, currency: string): OrderTaxVO {
    if (taxRate < 0 || taxRate > 1) {
      throw new ValidationError('Tax rate must be between 0 and 1', 'taxRate');
    }
    const amount = Math.round(subtotal * taxRate * 100) / 100;
    return new OrderTaxVO({ amount, currency, rate: taxRate });
  }

  static zero(currency: string): OrderTaxVO {
    return new OrderTaxVO({ amount: 0, currency, rate: 0 });
  }

  static reconstitute(amount: number, currency: string, rate?: number): OrderTaxVO {
    return new OrderTaxVO({ amount, currency, rate });
  }

  protected validate(): void {
    const { amount, currency, rate } = this.value;
    if (!Number.isFinite(amount) || amount < 0) {
      throw new ValidationError('Tax must be non-negative finite', 'tax');
    }
    if (rate !== undefined && (rate < 0 || rate > 1)) {
      throw new ValidationError('Tax rate must be between 0 and 1', 'taxRate');
    }
    if (!VALID_CURRENCIES.has(currency)) {
      throw new ValidationError(`Invalid currency: ${currency}`, 'currency');
    }
  }

  get amount(): number { return this.value.amount; }
  get currency(): string { return this.value.currency; }
  get rate(): number | undefined { return this.value.rate; }
}
