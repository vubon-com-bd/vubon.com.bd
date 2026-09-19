/**
 * Validate Bangladesh NID (10, 13, or 17 digits)
 * @module shared-utils/bd/document
 */
export function validateNid(value: string): boolean {
  const digits = String(value).replace(/\D/g, '');
  if (digits.length !== 10 && digits.length !== 13 && digits.length !== 17) {
    return false;
  }
  if (/^0+$/.test(digits)) return false;
  return true;
}
