/**
 * Check if string is a valid Nagad number
 * @module shared-utils/validator/payment
 */
export function isValidNagad(value: string): boolean {
  if (typeof value !== 'string') return false;
  const digits = value.replace(/\D/g, '');
  const withoutCountry = digits.startsWith('880') ? digits.slice(3) : digits;
  return /^01[3-9]\d{8}$/.test(withoutCountry);
}
