/**
 * Check if value is a valid rating (1-5 integer)
 * @module shared-utils/validator/business
 */
export function isValidRating(value: number): boolean {
  return Number.isInteger(value) && value >= 1 && value <= 5;
}
