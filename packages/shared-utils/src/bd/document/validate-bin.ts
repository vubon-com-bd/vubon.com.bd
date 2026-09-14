/**
 * Validate Bangladesh BIN (13 digits)
 * @module shared-utils/bd/document
 */
export function validateBin(value: string): boolean {
  const digits = String(value).replace(/\D/g, '');
  return /^\d{13}$/.test(digits) && !/^0+$/.test(digits);
}
