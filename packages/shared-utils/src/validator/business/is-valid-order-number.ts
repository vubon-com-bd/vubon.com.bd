/**
 * Check if string is a valid order number
 * @module shared-utils/validator/business
 */
export function isValidOrderNumber(value: string): boolean {
  if (typeof value !== 'string') return false;
  const trimmed = value.trim().toUpperCase();
  return /^[A-Z]{2,4}-?\d{6,12}$/.test(trimmed);
}
