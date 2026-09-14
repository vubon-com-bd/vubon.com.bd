/**
 * Compute difference (items in `a` not in `b`)
 * @module shared-utils/common/array
 */
export function difference<T>(a: readonly T[], b: readonly T[]): T[] {
  const setB = new Set(b);
  return Array.from(new Set(a.filter((item) => !setB.has(item))));
}
