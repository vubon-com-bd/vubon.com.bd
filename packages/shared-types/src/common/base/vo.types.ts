/**
 * Value Object Types
 * @module shared-types/common/base
 *
 * Immutable value objects।
 */

export interface BaseVO<T> {
  readonly value: T;
}

export interface Comparable<T> {
  equals(other: T): boolean;
}

export interface Serializable<TJson = unknown> {
  toJSON(): TJson;
}

export type VOWithEquality<T, TValue> = BaseVO<TValue> & Comparable<T>;

export interface RangeVO<T> {
  readonly min: T;
  readonly max: T;
}

export interface TimeRangeVO {
  readonly startAt: string;
  readonly endAt: string;
}
