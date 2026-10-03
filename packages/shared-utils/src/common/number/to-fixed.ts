/**
 * Convert number to fixed string safely
 * @module shared-utils/common/number
 */
export function toFixed(value: number, decimals = 2): string {
  if (!Number.isInteger(decimals) || decimals < 0 || decimals > 20) {
    throw new RangeError('decimals must be an integer between 0 and 20');
  }
  if (!Number.isFinite(value)) return '0';
  return value.toFixed(decimals);
}
