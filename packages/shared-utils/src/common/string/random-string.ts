/**
 * Generate random alphanumeric string
 * @module shared-utils/common/string
 *
 * ⚠️ NOT for cryptographic use. Use crypto.getRandomValues for security.
 */
const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

export function randomString(length: number): string {
  if (!Number.isInteger(length) || length < 0) {
    throw new RangeError('length must be a non-negative integer');
  }
  let result = '';
  for (let i = 0; i < length; i++) {
    result += ALPHABET.charAt(Math.floor(Math.random() * ALPHABET.length));
  }
  return result;
}
