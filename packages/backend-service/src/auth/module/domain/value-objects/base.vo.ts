/**
 * Base Value Object abstract class
 * All value objects in the domain should extend this class
 * Value objects are immutable and identified by their values, not by an identity
 */
export abstract class BaseValueObject<T> {
  protected readonly _value: T;

  constructor(value: T) {
    this._value = Object.freeze(value);
  }

  /**
   * Get the raw value
   */
  get value(): T {
    return this._value;
  }

  /**
   * Compare two value objects for equality
   * Two value objects are equal if their values are equal
   */
  equals(other: this | null | undefined): boolean {
    if (other === null || other === undefined) {
      return false;
    }

    if (!(other instanceof BaseValueObject)) {
      return false;
    }

    return this._value === other._value;
  }

  /**
   * Get string representation of the value
   */
  toString(): string {
    if (this._value === null || this._value === undefined) {
      return '';
    }

    if (typeof this._value === 'object') {
      return JSON.stringify(this._value);
    }

    return String(this._value);
  }

  /**
   * Check if the value is empty or null
   */
  isEmpty(): boolean {
    if (this._value === null || this._value === undefined) {
      return true;
    }

    if (typeof this._value === 'string') {
      return this._value.trim().length === 0;
    }

    if (Array.isArray(this._value)) {
      return this._value.length === 0;
    }

    if (typeof this._value === 'object') {
      return Object.keys(this._value).length === 0;
    }

    return false;
  }
}
