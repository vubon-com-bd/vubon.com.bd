/**
 * Check if integer is odd
 * @module shared-utils/common/number
 */
export function isOdd(value: number): boolean {
  if (!Number.isInteger(value)) return false;
  return Math.abs(value % 2) === 1;
}
