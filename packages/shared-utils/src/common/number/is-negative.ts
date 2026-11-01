/**
 * Check if number is negative (excludes zero by default)
 * @module shared-utils/common/number
 */
export function isNegative(value: number, includeZero = false): boolean {
  return includeZero ? value <= 0 : value < 0;
}
