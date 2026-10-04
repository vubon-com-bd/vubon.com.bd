/**
 * Get first element (or undefined)
 * @module shared-utils/common/array
 */
export function first<T>(items: readonly T[]): T | undefined {
  return items.length > 0 ? items[0] : undefined;
}
