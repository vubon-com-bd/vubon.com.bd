/**
 * Base Value Object
 * All value objects extend this class
 * Value objects are immutable and compared by value
 */

export abstract class BaseValueObject<T> {
  protected readonly _value: T;

  constructor(value: T) {
    this._value = value;
  }

  /**
   * Get the raw value
   */
  public get value(): T {
    return this._value;
  }

  /**
   * Compare two value objects by value
   */
  public equals(other: BaseValueObject<T>): boolean {
    return this._value === other._value;
  }

  /**
   * Convert to string representation
   */
  public toString(): string {
    return String(this._value);
  }

  /**
   * Convert to JSON
   */
  public toJSON(): T {
    return this._value;
  }
}
