/**
 * Base Value Object
 * ভ্যালু অবজেক্টের বেস ক্লাস
 */
export abstract class ValueObject<T> {
  protected readonly _value: T;

  constructor(value: T) {
    this._value = value;
    this.validate();
  }

  get value(): T {
    return this._value;
  }

  protected abstract validate(): void;

  equals(other: ValueObject<T>): boolean {
    if (!other) return false;
    return this._value === other._value;
  }

  toPrimitives(): T {
    return this._value;
  }

  toString(): string {
    return String(this._value);
  }
}
