/**
 * Clamp number between min and max
 * @module shared-utils/common/number
 */
export function clamp(value: number, min: number, max: number): number {
  if (min > max) throw new RangeError('min must be <= max');
  if (value < min) return min;
  if (value > max) return max;
  return value;
}
