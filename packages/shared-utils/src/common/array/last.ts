/**
 * Get last element (or undefined)
 * @module shared-utils/common/array
 */
export function last<T>(items: readonly T[]): T | undefined {
  return items.length > 0 ? items[items.length - 1] : undefined;
}
