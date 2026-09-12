import { BaseValueObject } from './base.types';

export interface QuantityData {
  value: number;
  unit?: string;
}

/**
 * Quantity Value Object class
 */
export class Quantity implements BaseValueObject<QuantityData> {
  constructor(public value: QuantityData) {}

  isValid(): boolean {
    return (
      typeof this.value.value === 'number' && isFinite(this.value.value) && this.value.value >= 0
    );
  }

  equals(other: Quantity): boolean {
    return this.value.value === other.value.value && this.value.unit === other.value.unit;
  }

  private assertSameUnit(other: Quantity): void {
    if (this.value.unit !== other.value.unit) {
      throw new Error(
        `Cannot operate on quantities with different units: ${this.value.unit ?? 'none'} vs ${other.value.unit ?? 'none'}`
      );
    }
  }

  add(other: Quantity): Quantity {
    this.assertSameUnit(other);
    return new Quantity({ value: this.value.value + other.value.value, unit: this.value.unit });
  }

  subtract(other: Quantity): Quantity {
    this.assertSameUnit(other);
    const value = this.value.value - other.value.value;
    if (value < 0) throw new Error('Quantity cannot be negative');
    return new Quantity({ value, unit: this.value.unit });
  }

  multiply(factor: number): Quantity {
    if (!isFinite(factor)) throw new Error('Factor must be a finite number');
    return new Quantity({ value: this.value.value * factor, unit: this.value.unit });
  }

  divide(factor: number): Quantity {
    if (factor === 0) throw new Error('Cannot divide by zero');
    if (!isFinite(factor)) throw new Error('Factor must be a finite number');
    return new Quantity({ value: this.value.value / factor, unit: this.value.unit });
  }

  toString(): string {
    return `${this.value.value}${this.value.unit ? ` ${this.value.unit}` : ''}`;
  }
}

/**
 * Quantity number type
 */
export type QuantityNumber = number;
