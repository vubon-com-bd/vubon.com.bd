/**
 * DeepPartial Utility
 * @module shared-types/common/utils
 *
 * Recursively makes all properties optional.
 */

export type DeepPartial<T> = T extends object
  ? T extends readonly (infer U)[]
    ? readonly DeepPartial<U>[]
    : T extends (...args: never[]) => unknown
      ? T
      : { [P in keyof T]?: DeepPartial<T[P]> }
  : T;

export type DeepRequired<T> = T extends object
  ? T extends readonly (infer U)[]
    ? readonly DeepRequired<U>[]
    : T extends (...args: never[]) => unknown
      ? T
      : { [P in keyof T]-?: DeepRequired<T[P]> }
  : T;

export type DeepReadonly<T> = T extends object
  ? T extends readonly (infer U)[]
    ? readonly DeepReadonly<U>[]
    : T extends (...args: never[]) => unknown
      ? T
      : { readonly [P in keyof T]: DeepReadonly<T[P]> }
  : T;
