/**
 * Base Domain Types
 * @module shared-kernel/domain/types
 *
 * Pure types — কোনো external import নেই।
 */
export type PrimitiveValue = string | number | boolean | null | undefined;

export type DeepReadonly<T> = T extends PrimitiveValue
  ? T
  : T extends readonly (infer U)[]
    ? readonly DeepReadonly<U>[]
    : T extends object
      ? { readonly [K in keyof T]: DeepReadonly<T[K]> }
      : T;

export interface Identifiable<TId = string> {
  readonly id: TId;
}

export interface Timestamped {
  readonly createdAt: number;
  readonly updatedAt: number;
}

export interface SoftDeletable {
  readonly deletedAt?: number;
}

export interface Versioned {
  readonly version: number;
}
