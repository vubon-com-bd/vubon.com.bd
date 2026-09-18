/**
 * Value Object Types
 * @module shared-kernel/domain/types
 *
 * Pure types — কোনো external import নেই।
 */
export type ValueObjectPrimitive = string | number | boolean | bigint;

export interface ValueObjectSnapshot<T> {
  readonly value: T;
}

export interface ValueObjectComparison<T> {
  readonly a: T;
  readonly b: T;
  readonly equal: boolean;
}

export interface ValueObjectValidation {
  readonly valid: boolean;
  readonly errors?: readonly string[];
}

export interface Range<T> {
  readonly min: T;
  readonly max: T;
}

export interface Interval<T> {
  readonly start: T;
  readonly end: T;
  readonly inclusive: boolean;
}
