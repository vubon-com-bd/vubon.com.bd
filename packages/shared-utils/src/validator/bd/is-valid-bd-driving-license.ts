/**
 * Check if string is a valid Bangladesh driving license number
 * @module shared-utils/validator/bd
 *
 * Format: 2 letters + 6-7 digits
 */
export function isValidBdDrivingLicense(value: string): boolean {
  if (typeof value !== 'string') return false;
  const trimmed = value.trim().toUpperCase();
  return /^[A-Z]{2}\d{6,7}$/.test(trimmed);
}
