/**
 * Validate Bangladesh postal code (4 digits, 1000-9499)
 * @module shared-utils/bd/document
 */
export function validatePostcode(value: string): boolean {
  const digits = String(value).replace(/\D/g, '');
  if (!/^\d{4}$/.test(digits)) return false;
  const num = Number(digits);
  return num >= 1000 && num <= 9499;
}
