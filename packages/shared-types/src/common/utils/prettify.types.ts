/**
 * Prettify Utility
 * @module shared-types/common/utils
 *
 * IDE-তে type hover করলে পরিষ্কার দেখানোর জন্য।
 */

export type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

export type Simplify<T> = Prettify<T>;

export type Merge<A, B> = Prettify<Omit<A, keyof B> & B>;
