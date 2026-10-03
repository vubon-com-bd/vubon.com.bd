/**
 * Nullable / Optional Utility
 * @module shared-types/common/utils
 */

export type Nullable<T> = T | null;

export type Optional<T> = T | undefined;

export type Maybe<T> = T | null | undefined;

export type NonNullableDeep<T> = T extends object
  ? T extends readonly (infer U)[]
    ? readonly NonNullableDeep<U>[]
    : T extends (...args: never[]) => unknown
      ? T
      : { [P in keyof T]-?: NonNullableDeep<T[P]> }
  : NonNullable<T>;
