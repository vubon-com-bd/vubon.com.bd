/**
 * Check if value is a string primitive
 * @module shared-utils/common/validation
 */
export function isString(value: unknown): value is string {
  return typeof value === 'string';
}
