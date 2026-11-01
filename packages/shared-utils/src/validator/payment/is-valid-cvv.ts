/**
 * Check if string is a valid CVV (3-4 digits)
 * @module shared-utils/validator/payment
 */
export function isValidCvv(value: string): boolean {
  if (typeof value !== 'string') return false;
  return /^\d{3,4}$/.test(value);
}
