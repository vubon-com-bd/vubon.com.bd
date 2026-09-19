/**
 * Check if number is between min and max (inclusive)
 * @module shared-utils/common/number
 */
export function between(value: number, min: number, max: number, inclusive = true): boolean {
  if (inclusive) return value >= min && value <= max;
  return value > min && value < max;
}
