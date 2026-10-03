/**
 * Branded Types Utility
 * @module shared-types/common/utils
 *
 * Nominal typing-এর জন্য branded type helper।
 *
 * ⚠️ Note: helper-এর নাম Branded, কারণ business/Product-এ Brand entity আছে।
 */

declare const __brand: unique symbol;

export type Branded<T, B extends string> = T & { readonly [__brand]: B };

export type Unbrand<T> = T extends Branded<infer U, string> ? U : T;

export type BrandValue<T extends Branded<unknown, string>> =
  T extends Branded<infer U, string> ? U : never;

export type BrandName<T extends Branded<unknown, string>> =
  T extends Branded<unknown, infer B> ? B : never;
