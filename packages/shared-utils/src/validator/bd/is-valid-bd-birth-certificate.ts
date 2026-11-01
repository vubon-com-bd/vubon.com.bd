/**
 * Check if string is a valid Bangladesh birth certificate number (17 digits)
 * @module shared-utils/validator/bd
 */
export function isValidBdBirthCertificate(value: string): boolean {
  if (typeof value !== 'string') return false;
  const digits = value.replace(/\D/g, '');
  return /^\d{17}$/.test(digits);
}
