/**
 * Generate cryptographically secure random bytes
 * @module shared-utils/infrastructure/crypto
 */
export function randomBytes(length: number): Uint8Array {
  if (!Number.isInteger(length) || length < 1 || length > 65536) {
    throw new RangeError('length must be an integer between 1 and 65536');
  }
  const bytes = new Uint8Array(length);
  if (typeof globalThis.crypto?.getRandomValues === 'function') {
    globalThis.crypto.getRandomValues(bytes);
    return bytes;
  }
  throw new Error('Secure random source not available in this environment');
}
