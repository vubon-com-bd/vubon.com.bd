/**
 * Check if string length is within [min, max]
 * @module shared-utils/validator/type
 */
export function isValidLength(value: string, min: number, max: number): boolean {
  if (typeof value !== 'string') return false;
  if (min < 0 || max < 0 || min > max) {
    throw new RangeError('min and max must satisfy 0 <= min <= max');
  }
  return value.length >= min && value.length <= max;
}
