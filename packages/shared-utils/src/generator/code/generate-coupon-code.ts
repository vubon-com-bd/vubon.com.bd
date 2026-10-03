/**
 * Generate a coupon code (uppercase alphanumeric)
 * @module shared-utils/generator/code
 */
const CHARS = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // No 0/O/1/I ambiguity

export function generateCouponCode(length = 8, prefix = ''): string {
  if (!Number.isInteger(length) || length < 4 || length > 32) {
    throw new RangeError('length must be an integer between 4 and 32');
  }
  const bytes = new Uint8Array(length);
  globalThis.crypto.getRandomValues(bytes);
  let code = '';
  for (let i = 0; i < length; i++) {
    code += CHARS[bytes[i] % CHARS.length];
  }
  return prefix ? `${prefix}${code}` : code;
}
