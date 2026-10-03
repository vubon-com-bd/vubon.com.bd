/**
 * Floor a number to N decimal places
 * @module shared-utils/common/number
 */
export function floorTo(value: number, decimals = 0): number {
  if (!Number.isInteger(decimals) || decimals < 0 || decimals > 20) {
    throw new RangeError('decimals must be an integer between 0 and 20');
  }
  const factor = Math.pow(10, decimals);
  return Math.floor(value * factor) / factor;
}
