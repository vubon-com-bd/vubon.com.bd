/**
 * Check if card expiry (MM/YY or MMYY) is valid and in the future
 * @module shared-utils/validator/payment
 */
export function isValidExpiry(value: string, reference: Date = new Date()): boolean {
  if (typeof value !== 'string') return false;
  const cleaned = value.replace(/\s+/g, '');
  const match = cleaned.match(/^(\d{2})\/?(\d{2,4})$/);
  if (!match) return false;

  const month = parseInt(match[1], 10);
  let year = parseInt(match[2], 10);

  if (month < 1 || month > 12) return false;
  if (match[2].length === 2) year += 2000;
  if (year < 2000 || year > 2100) return false;

  const expiry = new Date(year, month, 0, 23, 59, 59);
  return expiry.getTime() >= reference.getTime();
}
