import { BaseValueObject } from './base.types';

export interface ValueObject<T = unknown> extends BaseValueObject<T> {
  validate(value: T): boolean;
  getValue(): T;
  toString(): string;
}

export type ValueObjectConstructor<T> = new (value: unknown) => T;
