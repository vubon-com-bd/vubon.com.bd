/**
 * Format number with fixed decimals (safe)
 * @module shared-utils/formatter/number
 */
export function formatDecimal(value: number, decimals = 2): string {
  if (!Number.isInteger(decimals) || decimals < 0 || decimals > 20) {
    throw new RangeError('decimals must be an integer between 0 and 20');
  }
  if (!Number.isFinite(value)) return '0';
  return value.toFixed(decimals);
}
