/**
 * Check if string is a valid Bangladesh passport number
 * @module shared-utils/validator/bd
 *
 * Format: 2 letters + 7 digits (new) or 9 digits (old)
 */
export function isValidBdPassport(value: string): boolean {
  if (typeof value !== 'string') return false;
  const trimmed = value.trim().toUpperCase();
  return /^[A-Z]{2}\d{7}$/.test(trimmed) || /^\d{9}$/.test(trimmed);
}
