import {
  CurrencyCode,
  DEFAULT_CURRENCY,
} from '@vubon/shared-constants/src/common/currency.constants';
import { BaseValueObject } from './base.types';

export interface MoneyData {
  amount: number;
  currency: CurrencyCode;
}

/**
 * Money Value Object class
 */
export class Money implements BaseValueObject<MoneyData> {
  constructor(public value: MoneyData = { amount: 0, currency: DEFAULT_CURRENCY }) {}

  isValid(): boolean {
    return (
      typeof this.value.amount === 'number' &&
      isFinite(this.value.amount) &&
      this.value.amount >= 0 &&
      !!this.value.currency
    );
  }

  equals(other: Money): boolean {
    return this.value.amount === other.value.amount && this.value.currency === other.value.currency;
  }

  private assertSameCurrency(other: Money): void {
    if (this.value.currency !== other.value.currency) {
      throw new Error(
        `Cannot operate on money with different currencies: ${this.value.currency} vs ${other.value.currency}`
      );
    }
  }

  add(other: Money): Money {
    this.assertSameCurrency(other);
    return new Money({
      amount: this.value.amount + other.value.amount,
      currency: this.value.currency,
    });
  }

  subtract(other: Money): Money {
    this.assertSameCurrency(other);
    const amount = this.value.amount - other.value.amount;
    if (amount < 0) throw new Error('Money cannot be negative');
    return new Money({ amount, currency: this.value.currency });
  }

  multiply(factor: number): Money {
    if (!isFinite(factor)) throw new Error('Factor must be a finite number');
    return new Money({ amount: this.value.amount * factor, currency: this.value.currency });
  }

  divide(factor: number): Money {
    if (factor === 0) throw new Error('Cannot divide by zero');
    if (!isFinite(factor)) throw new Error('Factor must be a finite number');
    return new Money({ amount: this.value.amount / factor, currency: this.value.currency });
  }

  getFormattedAmount(): string {
    return `${this.value.amount.toFixed(2)} ${this.value.currency}`;
  }

  toString(): string {
    return this.getFormattedAmount();
  }
}

/**
 * Money amount type
 */
export type MoneyAmount = number;
