import { BaseValueObject } from './base.types';

export class Quantity implements BaseValueObject<{ value: number; unit?: string }> {
  constructor(public value: { value: number; unit?: string }) {}

  isValid(): boolean {
    return (
      typeof this.value.value === 'number' && !isNaN(this.value.value) && this.value.value >= 0
    );
  }

  equals(other: Quantity): boolean {
    return this.value.value === other.value.value && this.value.unit === other.value.unit;
  }

  add(other: Quantity): Quantity {
    if (this.value.unit !== other.value.unit) {
      throw new Error('Units must match for addition');
    }
    return new Quantity({
      value: this.value.value + other.value.value,
      unit: this.value.unit,
    });
  }

  subtract(other: Quantity): Quantity {
    if (this.value.unit !== other.value.unit) {
      throw new Error('Units must match for subtraction');
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
    if (factor === 0) throw new Error('Cannot divide by zero');
    return new Quantity({
      value: this.value.value / factor,
      unit: this.value.unit,
    });
  }

  toString(): string {
    return `${this.value.value}${this.value.unit ? ` ${this.value.unit}` : ''}`;
  }
}

export type QuantityNumber = number;
