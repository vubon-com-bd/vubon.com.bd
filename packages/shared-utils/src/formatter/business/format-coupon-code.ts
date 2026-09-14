/**
 * Format coupon code (uppercase, remove spaces)
 * @module shared-utils/formatter/business
 */
export function formatCouponCode(code: string): string {
  return code.trim().replace(/\s+/g, '').toUpperCase();
}
