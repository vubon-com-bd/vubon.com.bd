/**
 * Memoize a pure function with key resolver
 * @module shared-utils/common/function
 *
 * ⚠️ Cache grows unbounded. Use with care for long-running processes.
 */
export function memoize<TArgs extends readonly unknown[], TResult>(
  fn: (...args: TArgs) => TResult,
  keyResolver: (...args: TArgs) => string = (...args: TArgs) => JSON.stringify(args)
): (...args: TArgs) => TResult {
  const cache = new Map<string, TResult>();
  return (...args: TArgs): TResult => {
    const key = keyResolver(...args);
    const cached = cache.get(key);
    if (cached !== undefined) return cached;
    const value = fn(...args);
    cache.set(key, value);
    return value;
  };
}
