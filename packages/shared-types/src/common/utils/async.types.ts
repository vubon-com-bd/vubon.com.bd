/**
 * Async Utility Types
 * @module shared-types/common/utils
 */

export type Awaitable<T> = T | Promise<T>;

export type AsyncFunction<
  TArgs extends readonly unknown[] = readonly unknown[],
  TReturn = unknown,
> = (...args: TArgs) => Promise<TReturn>;

export type AsyncReturnType<T extends (...args: never[]) => unknown> = T extends (
  ...args: never[]
) => Promise<infer R>
  ? R
  : never;
