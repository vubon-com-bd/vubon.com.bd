/**
 * Check if string is a valid Bangladesh TIN (12 digits)
 * @module shared-utils/validator/bd
 */
export function isValidTin(value: string): boolean {
  if (typeof value !== 'string') return false;
  const digits = value.replace(/\D/g, '');
  return /^\d{12}$/.test(digits);
}
