/**
 * Chunk array into smaller arrays
 * @module shared-utils/common/array
 *
 * @example
 * chunk([1,2,3,4,5], 2) // [[1,2],[3,4],[5]]
 */
export function chunk<T>(items: readonly T[], size: number): T[][] {
  if (!Number.isInteger(size) || size < 1) {
    throw new RangeError('Chunk size must be a positive integer');
  }
  const result: T[][] = [];
  for (let i = 0; i < items.length; i += size) {
    result.push(items.slice(i, i + size) as T[]);
  }
  return result;
}
