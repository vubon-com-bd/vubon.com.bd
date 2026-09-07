import { BaseValueObject } from './base.types';
import { VALIDATION } from '@vubon/shared-constants';

export interface QuantityData {
  value: number;
  unit?: string;
}

export class Quantity implements BaseValueObject<QuantityData> {
  private _data: QuantityData;

  constructor(value: number, unit?: string) {
    this._data = {
      value,
      unit,
    };
  }

  // BaseValueObject এর জন্য value প্রপার্টি
  get value(): QuantityData {
    return { ...this._data };
  }

  // প্রয়োজনীয় অন্যান্য গেটার
  get numericValue(): number {
    return this._data.value;
  }
  get unit(): string | undefined {
    return this._data.unit;
  }

  isValid(): boolean {
    // VALIDATION.QUANTITY ব্যবহার করে ভ্যালিডেশন
    const minValue = VALIDATION.QUANTITY?.MIN ?? 0;
    const maxValue = VALIDATION.QUANTITY?.MAX ?? Number.MAX_SAFE_INTEGER;

    return (
      this._data.value >= minValue &&
      this._data.value <= maxValue &&
      Number.isFinite(this._data.value)
    );
  }

  equals(other: Quantity): boolean {
    return this._data.value === other._data.value && this._data.unit === other._data.unit;
  }

  add(other: Quantity): Quantity {
    if (this._data.unit !== other._data.unit) {
      throw new Error('Unit mismatch');
    }
    return new Quantity(this._data.value + other._data.value, this._data.unit);
  }

  subtract(other: Quantity): Quantity {
    if (this._data.unit !== other._data.unit) {
      throw new Error('Unit mismatch');
    }
    return new Quantity(this._data.value - other._data.value, this._data.unit);
  }

  multiply(factor: number): Quantity {
    if (!Number.isFinite(factor)) {
      throw new Error('Invalid factor');
    }
    return new Quantity(this._data.value * factor, this._data.unit);
  }

  divide(factor: number): Quantity {
    if (factor === 0) {
      throw new Error('Cannot divide by zero');
    }
    if (!Number.isFinite(factor)) {
      throw new Error('Invalid factor');
    }
    return new Quantity(this._data.value / factor, this._data.unit);
  }

  // VALIDATION.QUANTITY ব্যবহার করে রাউন্ডিং
  round(precision?: number): Quantity {
    const decimalPlaces = precision ?? 2;
    const factor = Math.pow(10, decimalPlaces);
    const rounded = Math.round(this._data.value * factor) / factor;
    return new Quantity(rounded, this._data.unit);
  }

  // ফরম্যাটিং
  format(decimals?: number): string {
    const decimalPlaces = decimals ?? 2;
    const formattedValue = this._data.value.toFixed(decimalPlaces);
    return this._data.unit ? `${formattedValue} ${this._data.unit}` : formattedValue;
  }

  // VALIDATION.QUANTITY থেকে ভ্যালিডেশন রুলস পাওয়া
  getValidationRules(): {
    min: number;
    max: number;
  } {
    return {
      min: VALIDATION.QUANTITY?.MIN ?? 0,
      max: VALIDATION.QUANTITY?.MAX ?? Number.MAX_SAFE_INTEGER,
    };
  }

  // ভ্যালিডেশন রুলস চেক করা
  checkConstraints(): {
    isValid: boolean;
    errors: string[];
  } {
    const errors: string[] = [];
    const rules = this.getValidationRules();

    if (this._data.value < rules.min) {
      errors.push(`Value must be at least ${rules.min}`);
    }
    if (this._data.value > rules.max) {
      errors.push(`Value must be at most ${rules.max}`);
    }
    if (!Number.isFinite(this._data.value)) {
      errors.push('Value must be a finite number');
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  // স্বাস্থ্য পরীক্ষা
  isHealthy(): boolean {
    return this.isValid() && this._data.value > 0;
  }

  // সীমা পরীক্ষা
  isWithinRange(min: number, max: number): boolean {
    return this._data.value >= min && this._data.value <= max;
  }

  // VALIDATION.QUANTITY ব্যবহার করে ডিফল্ট ভ্যালু পাওয়া
  getDefaultMin(): number {
    return VALIDATION.QUANTITY?.MIN ?? 0;
  }

  getDefaultMax(): number {
    return VALIDATION.QUANTITY?.MAX ?? Number.MAX_SAFE_INTEGER;
  }

  toString(): string {
    return this.format();
  }

  toJSON(): QuantityData & { formatted: string } {
    return {
      ...this._data,
      formatted: this.format(),
    };
  }
}

export type QuantityNumber = number;

// VALIDATION.QUANTITY থেকে টাইপ
export type QuantityValidationRules = {
  min: number;
  max: number;
};

// কোয়ান্টিটি অপশন
export interface QuantityOptions {
  min?: number;
  max?: number;
  unit?: string;
}

// কোয়ান্টিটি রেঞ্জ
export interface QuantityRange {
  min: Quantity;
  max: Quantity;
  contains(quantity: Quantity): boolean;
  clamp(quantity: Quantity): Quantity;
}

// কোয়ান্টিটি পার্সার
export interface QuantityParser {
  parse(value: string | number): Quantity;
  parseString(value: string): Quantity;
  parseNumber(value: number): Quantity;
  isValidString(value: string): boolean;
}
