/**
 * Remove duplicate primitives from array
 * @module shared-utils/common/array
 */
export function dedupe<T extends string | number | boolean | null | undefined>(
  items: readonly T[]
): T[] {
  return Array.from(new Set(items));
}
