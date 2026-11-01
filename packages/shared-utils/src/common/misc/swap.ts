/**
 * Swap two array elements (immutable)
 * @module shared-utils/common/misc
 */
export function swap<T>(items: readonly T[], i: number, j: number): T[] {
  if (i < 0 || i >= items.length || j < 0 || j >= items.length) {
    throw new RangeError('Index out of bounds');
  }
  const result = [...items];
  [result[i], result[j]] = [result[j], result[i]];
  return result;
}
