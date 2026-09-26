/**
 * Check if number is positive (excludes zero by default)
 * @module shared-utils/common/number
 */
export function isPositive(value: number, includeZero = false): boolean {
  return includeZero ? value >= 0 : value > 0;
}
