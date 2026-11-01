/**
 * Validate Bangladesh TIN (12 digits)
 * @module shared-utils/bd/document
 */
export function validateTin(value: string): boolean {
  const digits = String(value).replace(/\D/g, '');
  return /^\d{12}$/.test(digits) && !/^0+$/.test(digits);
}
