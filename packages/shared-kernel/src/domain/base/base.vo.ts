/**
 * Base Value Object
 * @module shared-kernel/domain/base
 *
 * Pure abstraction — কোনো external import নেই।
 * Value Objects are immutable, identity-less domain objects.
 */
export abstract class BaseVO<T = unknown> {
  protected readonly _value: T;

  protected constructor(value: T) {
    this._value = this.freezeValue(value);
  }

  get value(): T {
    return this._value;
  }

  equals(other: BaseVO<T>): boolean {
    if (other === null || other === undefined) return false;
    if (!(other instanceof BaseVO)) return false;
    return this.structuralEquals(this._value, other._value);
  }

  toString(): string {
    return String(this._value);
  }

  toJSON(): T {
    return this._value;
  }

  private freezeValue(value: T): T {
    if (value !== null && typeof value === 'object') {
      return Object.freeze(value);
    }
    return value;
  }

  private structuralEquals(a: T, b: T): boolean {
    if (a === b) return true;
    if (a === null || b === null) return false;
    if (typeof a !== typeof b) return false;
    if (typeof a !== 'object') return false;

    try {
      return JSON.stringify(a) === JSON.stringify(b);
    } catch {
      return false;
    }
  }
}
