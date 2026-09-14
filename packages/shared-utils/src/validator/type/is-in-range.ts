/**
 * Check if a number is within [min, max] inclusive
 * @module shared-utils/validator/type
 */
export function isInRange(value: number, min: number, max: number): boolean {
  if (min > max) throw new RangeError('min must be <= max');
  if (!Number.isFinite(value)) return false;
  return value >= min && value <= max;
}
