/**
 * Check if string is a valid Bangladesh BIN (13 digits)
 * @module shared-utils/validator/bd
 */
export function isValidBin(value: string): boolean {
  if (typeof value !== 'string') return false;
  const digits = value.replace(/\D/g, '');
  return /^\d{13}$/.test(digits);
}
