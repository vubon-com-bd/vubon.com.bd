/**
 * Check if value is a non-null object (may be array/date/etc.)
 * @module shared-utils/common/validation
 */
export function isObject(value: unknown): value is object {
  return typeof value === 'object' && value !== null;
}
