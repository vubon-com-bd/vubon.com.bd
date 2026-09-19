/**
 * Generate a cryptographically secure random alphanumeric string
 * @module shared-utils/generator/text
 */
const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

export function generateRandomString(length: number): string {
  if (!Number.isInteger(length) || length < 1 || length > 1024) {
    throw new RangeError('length must be an integer between 1 and 1024');
  }
  const bytes = new Uint8Array(length);
  globalThis.crypto.getRandomValues(bytes);
  let out = '';
  for (let i = 0; i < length; i++) out += ALPHABET[bytes[i] % ALPHABET.length];
  return out;
}
