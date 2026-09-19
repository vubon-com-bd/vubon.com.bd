/**
 * Check if value is an array
 * @module shared-utils/common/validation
 */
export function isArray<T = unknown>(value: unknown): value is T[] {
  return Array.isArray(value);
}
