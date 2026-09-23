/**
 * Money Value Object
 * @module shared-kernel/domain/primitives
 *
 * Values আসে shared-constants/common থেকে।
 */
import { CURRENCY } from '@vubon/shared-constants/common';
import { NUMBER_FORMAT } from '@vubon/shared-constants/common';
import type { Money, CurrencyCode } from '@vubon/shared-types/common';
import { BaseVO } from '../base/base.vo';

const VALID_CURRENCIES = new Set<string>(Object.values(CURRENCY));
const CURRENCY_DECIMALS: Record<string, number> = {
  BDT: 2,
  USD: 2,
  EUR: 2,
  GBP: 2,
  INR: 2,
  JPY: 0,
};

export interface MoneyValue {
  readonly amount: number;
  readonly currency: CurrencyCode;
}

/**
 * Base Money VO — abstract, extend করার জন্য।
 * Subclass-এ specific currency constraint।
 */
export abstract class BaseMoneyVO extends BaseVO<MoneyValue> {
  protected constructor(value: MoneyValue) {
    super(value);
  }

  protected static validateAmount(amount: number): void {
    if (!Number.isFinite(amount)) {
      throw new Error('Money amount must be a finite number');
    }
    if (amount < 0) {
      throw new Error('Money amount cannot be negative');
    }
  }

  protected static validateCurrency(currency: string): void {
    if (!VALID_CURRENCIES.has(currency)) {
      throw new Error(`Invalid currency: ${currency}`);
    }
  }

  protected static round(amount: number, currency: CurrencyCode): number {
    const decimals = CURRENCY_DECIMALS[currency] ?? 2;
    const factor = Math.pow(10, decimals);
    return Math.round(amount * factor) / factor;
  }

  get amount(): number {
    return this.value.amount;
  }

  get currency(): CurrencyCode {
    return this.value.currency;
  }

  protected assertSameCurrency(other: BaseMoneyVO): void {
    if (this.currency !== other.currency) {
      throw new Error(`Currency mismatch: ${this.currency} vs ${other.currency}`);
    }
  }
}

/**
 * Concrete MoneyVO — general purpose।
 */
export class MoneyVO extends BaseMoneyVO {
  private constructor(value: MoneyValue) {
    super(value);
  }

  static of(amount: number, currency: CurrencyCode): MoneyVO {
    BaseMoneyVO.validateAmount(amount);
    BaseMoneyVO.validateCurrency(currency);
    const rounded = BaseMoneyVO.round(amount, currency);
    return new MoneyVO({ amount: rounded, currency });
  }

  add(other: MoneyVO): MoneyVO {
    this.assertSameCurrency(other);
    return MoneyVO.of(this.amount + other.amount, this.currency);
  }

  subtract(other: MoneyVO): MoneyVO {
    this.assertSameCurrency(other);
    return MoneyVO.of(this.amount - other.amount, this.currency);
  }

  multiply(factor: number): MoneyVO {
    if (!Number.isFinite(factor)) {
      throw new Error('Multiplier must be a finite number');
    }
    return MoneyVO.of(this.amount * factor, this.currency);
  }
}

/**
 * Reference to satisfy import contract.
 */
export const CURRENCY_NUMBER_FORMAT = NUMBER_FORMAT.CURRENCY;
export type Currency = CurrencyCode;
export type { Money };
