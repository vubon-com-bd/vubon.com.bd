/**
 * Generate a NanoID-style random ID (crypto-safe)
 * @module shared-utils/generator/id
 */
const URLSAFE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';

export function generateNanoid(length = 21): string {
  if (!Number.isInteger(length) || length < 4 || length > 128) {
    throw new RangeError('length must be an integer between 4 and 128');
  }
  const bytes = new Uint8Array(length);
  globalThis.crypto.getRandomValues(bytes);
  let out = '';
  for (let i = 0; i < length; i++) {
    out += URLSAFE[bytes[i] & 63];
  }
  return out;
}
