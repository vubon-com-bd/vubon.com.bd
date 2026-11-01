/**
 * Format referral code (uppercase, alphanumeric only)
 * @module shared-utils/formatter/business
 */
export function formatReferralCode(code: string): string {
  return code.replace(/[^A-Za-z0-9]/g, '').toUpperCase();
}
