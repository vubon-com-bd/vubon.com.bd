/**
 * Check if integer is even
 * @module shared-utils/common/number
 */
export function isEven(value: number): boolean {
  if (!Number.isInteger(value)) return false;
  return value % 2 === 0;
}
