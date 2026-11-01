/**
 * Partial application (left-most args)
 * @module shared-utils/common/function
 */
export function partial<A, TArgs extends readonly unknown[], R>(
  fn: (a: A, ...args: TArgs) => R,
  a: A
): (...args: TArgs) => R {
  return (...args: TArgs): R => fn(a, ...args);
}
