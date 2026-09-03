import { ValueObject } from '../base/base.vo';

export class Quantity extends ValueObject<number> {
  protected validate(): void {
    if (this._value < 0) {
      throw new Error('Quantity cannot be negative');
    }
    if (!Number.isInteger(this._value)) {
      throw new Error('Quantity must be an integer');
    }
  }

  increment(amount: number = 1): Quantity {
    return new Quantity(this._value + amount);
  }

  decrement(amount: number = 1): Quantity {
    if (this._value - amount < 0) {
      throw new Error('Insufficient quantity');
    }
    return new Quantity(this._value - amount);
  }

  isZero(): boolean {
    return this._value === 0;
  }

  isGreaterThan(other: Quantity): boolean {
    return this._value > other._value;
  }

  isLessThan(other: Quantity): boolean {
    return this._value < other._value;
  }

  isEqualTo(other: Quantity): boolean {
    return this._value === other._value;
  }

  isPositive(): boolean {
    return this._value > 0;
  }

  isNegative(): boolean {
    return this._value < 0;
  }

  static fromNumber(value: number): Quantity {
    return new Quantity(value);
  }

  static zero(): Quantity {
    return new Quantity(0);
  }

  static one(): Quantity {
    return new Quantity(1);
  }
}
