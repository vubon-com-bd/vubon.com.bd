/**
 * Round number to N decimal places
 * @module shared-utils/common/number
 *
 * @example
 * roundTo(1.2345, 2) // 1.23
 */
export function roundTo(value: number, decimals: number): number {
  if (!Number.isInteger(decimals) || decimals < 0 || decimals > 20) {
    throw new RangeError('decimals must be an integer between 0 and 20');
  }
  const factor = Math.pow(10, decimals);
  return Math.round(value * factor) / factor;
}
