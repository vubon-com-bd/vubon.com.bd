/**
 * Negate a predicate function
 * @module shared-utils/common/function
 */
export function negate<TArgs extends readonly unknown[]>(
  predicate: (...args: TArgs) => boolean
): (...args: TArgs) => boolean {
  return (...args: TArgs): boolean => !predicate(...args);
}
