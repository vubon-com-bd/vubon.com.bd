/**
 * Random float in [min, max)
 * @module shared-utils/common/number
 *
 * ⚠️ NOT for cryptographic use.
 */
export function randomFloat(min: number, max: number): number {
  if (min > max) throw new RangeError('min must be <= max');
  return Math.random() * (max - min) + min;
}
