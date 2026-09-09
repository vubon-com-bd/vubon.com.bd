import { BaseValueObject } from './base.types';

/**
 * Quantity Value Object class
 */
export class Quantity implements BaseValueObject<{ value: number; unit?: string }> {
  constructor(public value: { value: number; unit?: string }) {}

  isValid(): boolean {
    return this.value.value >= 0;
  }

  equals(other: Quantity): boolean {
    return this.value.value === other.value.value && this.value.unit === other.value.unit;
  }

  add(other: Quantity): Quantity {
    if (this.value.unit !== other.value.unit) {
      throw new Error('Cannot add quantities with different units');
    }
    return new Quantity({
      value: this.value.value + other.value.value,
      unit: this.value.unit,
    });
  }

  subtract(other: Quantity): Quantity {
    if (this.value.unit !== other.value.unit) {
      throw new Error('Cannot subtract quantities with different units');
    }
    return new Quantity({
      value: this.value.value - other.value.value,
      unit: this.value.unit,
    });
  }

  multiply(factor: number): Quantity {
    return new Quantity({
      value: this.value.value * factor,
      unit: this.value.unit,
    });
  }

  divide(factor: number): Quantity {
    return new Quantity({
      value: this.value.value / factor,
      unit: this.value.unit,
    });
  }

  toString(): string {
    return `${this.value.value}${this.value.unit ? ` ${this.value.unit}` : ''}`;
  }
}

/**
 * Quantity number type
 */
export type QuantityNumber = number;
