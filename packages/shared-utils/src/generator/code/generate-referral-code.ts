/**
 * Generate a referral code (uppercase alphanumeric)
 * @module shared-utils/generator/code
 */
export function generateReferralCode(length = 10, prefix = ''): string {
  if (!Number.isInteger(length) || length < 6 || length > 24) {
    throw new RangeError('length must be an integer between 6 and 24');
  }
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  const bytes = new Uint8Array(length);
  globalThis.crypto.getRandomValues(bytes);
  let out = '';
  for (let i = 0; i < length; i++) {
    out += chars[bytes[i] % chars.length];
  }
  return prefix ? `${prefix}${out}` : out;
}
