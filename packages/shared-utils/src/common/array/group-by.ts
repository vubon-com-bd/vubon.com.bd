/**
 * Group array items by a key selector
 * @module shared-utils/common/array
 */
export function groupBy<T, K extends string | number | symbol>(
  items: readonly T[],
  keySelector: (item: T) => K
): Record<K, T[]> {
  const result = {} as Record<K, T[]>;
  for (const item of items) {
    const key = keySelector(item);
    if (!result[key]) result[key] = [];
    result[key].push(item);
  }
  return result;
}
