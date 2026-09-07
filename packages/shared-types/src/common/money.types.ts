import { BaseValueObject } from './base.types';

export class Money implements BaseValueObject<{ amount: number; currency: string }> {
  constructor(public value: { amount: number; currency: string }) {}

  isValid(): boolean {
    return (
      typeof this.value.amount === 'number' &&
      !isNaN(this.value.amount) &&
      this.value.amount >= 0 &&
      this.value.currency.trim() !== ''
    );
  }

  equals(other: Money): boolean {
    return this.value.amount === other.value.amount && this.value.currency === other.value.currency;
  }

  add(other: Money): Money {
    if (this.value.currency !== other.value.currency) {
      throw new Error('Currencies must match for addition');
    }
    return new Money({
      amount: this.value.amount + other.value.amount,
      currency: this.value.currency,
    });
  }

  subtract(other: Money): Money {
    if (this.value.currency !== other.value.currency) {
      throw new Error('Currencies must match for subtraction');
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
    if (factor === 0) throw new Error('Cannot divide by zero');
    return new Money({
      amount: this.value.amount / factor,
      currency: this.value.currency,
    });
  }

  getFormattedAmount(): string {
    return `${this.value.amount} ${this.value.currency}`;
  }

  toString(): string {
    return this.getFormattedAmount();
  }
}

export type MoneyAmount = number;
