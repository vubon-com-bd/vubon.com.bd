import { BaseValueObject } from './base.types';

export interface ValueObject<T = unknown> extends BaseValueObject<T> {
  validate(value: T): boolean;
  getValue(): T;
  toString(): string;
  equals(other: this): boolean;
}

export type ValueObjectConstructor<T extends ValueObject> = new (value: unknown) => T;

// অতিরিক্ত হেল্পার টাইপ
export type PrimitiveValue = string | number | boolean | null | undefined;
export type ComplexValue = Record<string, unknown> | unknown[];

// ভ্যালু অবজেক্টের জন্য অপশন
export interface ValueObjectOptions<T = unknown> {
  validate?: (value: T) => boolean;
  transform?: (value: T) => T;
  defaultValue?: T;
}

// ভ্যালু অবজেক্ট ফ্যাক্টরি
export type ValueObjectFactory<T extends ValueObject> = (value: unknown) => T;

// ইমিউটেবল ভ্যালু অবজেক্ট
export interface ImmutableValueObject<T = unknown> extends ValueObject<T> {
  readonly value: T;
}

// নালেবল ভ্যালু অবজেক্ট
export interface NullableValueObject<T = unknown> extends ValueObject<T | null> {
  isNull(): boolean;
  getValueOrThrow(): T;
}

// ভ্যালু অবজেক্টের তুলনা ফলাফল
export type ComparisonResult = -1 | 0 | 1;

// কম্প্যারেবল ভ্যালু অবজেক্ট
export interface ComparableValueObject<T = unknown> extends ValueObject<T> {
  compareTo(other: this): ComparisonResult;
  isLessThan(other: this): boolean;
  isGreaterThan(other: this): boolean;
  isEqual(other: this): boolean;
}

// সিরিয়ালাইজেবল ভ্যালু অবজেক্ট
export interface SerializableValueObject<T = unknown> extends ValueObject<T> {
  toJSON(): T;
  fromJSON(data: T): this;
}
