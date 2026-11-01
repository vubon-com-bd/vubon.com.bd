/**
 * Value Object Interface
 * @module shared-kernel/domain/base
 *
 * Pure abstraction — কোনো external import নেই।
 */
export interface ValueObject<TValue = unknown> {
  readonly value: TValue;
  equals(other: ValueObject<TValue>): boolean;
  toString(): string;
  toJSON(): TValue;
}

export interface Comparable<T> {
  equals(other: T): boolean;
}

export interface Serializable<TJson = unknown> {
  toJSON(): TJson;
}

export interface RangeValueObject<T> extends ValueObject<T> {
  readonly min: T;
  readonly max: T;
}
