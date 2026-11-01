/**
 * Check if value is a boolean primitive
 * @module shared-utils/common/validation
 */
export function isBoolean(value: unknown): value is boolean {
  return typeof value === 'boolean';
}
