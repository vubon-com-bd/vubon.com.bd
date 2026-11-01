/**
 * Check if value is a valid Date
 * @module shared-utils/common/validation
 */
export function isDate(value: unknown): value is Date {
  return value instanceof Date && !Number.isNaN(value.getTime());
}
