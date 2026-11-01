/**
 * Check if string is a valid coupon code
 * @module shared-utils/validator/business
 */
export function isValidCouponCode(value: string): boolean {
  if (typeof value !== 'string') return false;
  const trimmed = value.trim();
  if (trimmed.length < 4 || trimmed.length > 32) return false;
  return /^[A-Z0-9_-]+$/i.test(trimmed);
}
