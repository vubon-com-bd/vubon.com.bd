/**
 * Check if value is a finite number
 * @module shared-utils/common/validation
 */
export function isNumber(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value);
}
