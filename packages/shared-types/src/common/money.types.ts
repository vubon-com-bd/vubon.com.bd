import { BaseValueObject } from './base.types';

/**
 * Money Value Object class
 */
export class Money implements BaseValueObject<{ amount: number; currency: string }> {
  constructor(public value: { amount: number; currency: string }) {}

  isValid(): boolean {
    return this.value.amount >= 0 && !!this.value.currency;
  }

  equals(other: Money): boolean {
    return this.value.amount === other.value.amount && this.value.currency === other.value.currency;
  }

  add(other: Money): Money {
    if (this.value.currency !== other.value.currency) {
      throw new Error('Cannot add money with different currencies');
    }
    return new Money({
      amount: this.value.amount + other.value.amount,
      currency: this.value.currency,
    });
  }

  subtract(other: Money): Money {
    if (this.value.currency !== other.value.currency) {
      throw new Error('Cannot subtract money with different currencies');
    }
    return new Money({
      amount: this.value.amount - other.value.amount,
      currency: this.value.currency,
    });
  }

  multiply(factor: number): Money {
    return new Money({
      amount: this.value.amount * factor,
      currency: this.value.currency,
    });
  }

  divide(factor: number): Money {
    return new Money({
      amount: this.value.amount / factor,
      currency: this.value.currency,
    });
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
