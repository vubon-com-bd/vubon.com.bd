/**
 * Remove duplicates using a key selector
 * @module shared-utils/common/array
 */
export function dedupeBy<T, K extends string | number>(
  items: readonly T[],
  keySelector: (item: T) => K
): T[] {
  const seen = new Set<K>();
  const result: T[] = [];
  for (const item of items) {
    const key = keySelector(item);
    if (!seen.has(key)) {
      seen.add(key);
      result.push(item);
    }
  }
  return result;
}
