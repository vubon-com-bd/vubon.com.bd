/**
 * Check if a Date object is valid
 * @module shared-utils/common/date
 */
export function isValidDate(value: unknown): value is Date {
  return value instanceof Date && !Number.isNaN(value.getTime());
}
