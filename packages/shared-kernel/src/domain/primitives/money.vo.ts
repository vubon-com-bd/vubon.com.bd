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

export class MoneyVO extends BaseVO<MoneyValue> {
  private constructor(value: MoneyValue) {
    super(value);
  }

  static of(amount: number, currency: CurrencyCode): MoneyVO {
    if (!Number.isFinite(amount)) {
      throw new Error('Money amount must be a finite number');
    }
    if (amount < 0) {
      throw new Error('Money amount cannot be negative');
    }
    if (!VALID_CURRENCIES.has(currency)) {
      throw new Error(`Invalid currency: ${currency}`);
    }

    const decimals = CURRENCY_DECIMALS[currency] ?? 2;
    const factor = Math.pow(10, decimals);
    const rounded = Math.round(amount * factor) / factor;

    return new MoneyVO({ amount: rounded, currency });
  }

  get amount(): number {
    return this.value.amount;
  }

  get currency(): CurrencyCode {
    return this.value.currency;
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

  private assertSameCurrency(other: MoneyVO): void {
    if (this.currency !== other.currency) {
      throw new Error(`Currency mismatch: ${this.currency} vs ${other.currency}`);
    }
  }
}

/**
 * Reference to satisfy import contract.
 */
export const CURRENCY_NUMBER_FORMAT = NUMBER_FORMAT.CURRENCY;
export type Currency = CurrencyCode;
export type { Money };
