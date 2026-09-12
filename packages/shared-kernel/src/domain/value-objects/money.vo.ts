import { ValueObject } from '../base/base.vo';

export interface MoneyProps {
  amount: number;
  currency: string;
}

export class Money extends ValueObject<MoneyProps> {
  protected validate(): void {
    if (this._value.amount < 0) {
      throw new Error('Amount cannot be negative');
    }
    if (!this._value.currency || this._value.currency.length === 0) {
      throw new Error('Currency is required');
    }
  }

  get amount(): number {
    return this._value.amount;
  }

  get currency(): string {
    return this._value.currency;
  }

  add(other: Money): Money {
    if (this.currency !== other.currency) {
      throw new Error('Cannot add different currencies');
    }
    return new Money({
      amount: this.amount + other.amount,
      currency: this.currency,
    });
  }

  subtract(other: Money): Money {
    if (this.currency !== other.currency) {
      throw new Error('Cannot subtract different currencies');
    }
    if (this.amount < other.amount) {
      throw new Error('Insufficient funds');
    }
    return new Money({
      amount: this.amount - other.amount,
      currency: this.currency,
    });
  }

  multiply(factor: number): Money {
    if (factor < 0) {
      throw new Error('Cannot multiply by negative factor');
    }
    return new Money({
      amount: this.amount * factor,
      currency: this.currency,
    });
  }

  divide(divisor: number): Money {
    if (divisor <= 0) {
      throw new Error('Divisor must be greater than zero');
    }
    return new Money({
      amount: this.amount / divisor,
      currency: this.currency,
    });
  }

  percentage(percent: number): Money {
    return new Money({
      amount: (this.amount * percent) / 100,
      currency: this.currency,
    });
  }

  isGreaterThan(other: Money): boolean {
    return this.amount > other.amount;
  }

  isLessThan(other: Money): boolean {
    return this.amount < other.amount;
  }

  isEqualTo(other: Money): boolean {
    return this.amount === other.amount;
  }

  isZero(): boolean {
    return this.amount === 0;
  }

  format(): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: this.currency,
    }).format(this.amount);
  }

  static zero(currency: string = 'BDT'): Money {
    return new Money({ amount: 0, currency });
  }

  static fromBDT(amount: number): Money {
    return new Money({ amount, currency: 'BDT' });
  }

  static fromUSD(amount: number): Money {
    return new Money({ amount, currency: 'USD' });
  }
}
