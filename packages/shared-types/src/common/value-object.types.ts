import { BaseValueObject } from './base.types';

/**
 * Value object interface
 */
export interface ValueObject<T = unknown> extends BaseValueObject<T> {
  value: T;
  validate(value: T): boolean;
  getValue(): T;
  toString(): string;
}

/**
 * Value object constructor type
 */
export type ValueObjectConstructor<T> = new (value: unknown) => T;
