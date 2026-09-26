/**
 * Random integer in [min, max] (inclusive)
 * @module shared-utils/common/number
 *
 * ⚠️ NOT for cryptographic use.
 */
export function randomInt(min: number, max: number): number {
  if (!Number.isInteger(min) || !Number.isInteger(max)) {
    throw new RangeError('min and max must be integers');
  }
  if (min > max) throw new RangeError('min must be <= max');
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
