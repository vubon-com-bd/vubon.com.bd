/**
 * Generate a verification code (alphanumeric, uppercase)
 * @module shared-utils/generator/code
 */
export function generateVerificationCode(length = 6): string {
  if (!Number.isInteger(length) || length < 6 || length > 12) {
    throw new RangeError('length must be an integer between 6 and 12');
  }
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  const bytes = new Uint8Array(length);
  globalThis.crypto.getRandomValues(bytes);
  let out = '';
  for (let i = 0; i < length; i++) out += chars[bytes[i] % chars.length];
  return out;
}
