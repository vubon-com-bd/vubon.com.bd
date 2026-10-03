/**
 * Generate a cryptographically secure hex token
 * @module shared-utils/infrastructure/crypto
 */
export function generateToken(bytes = 32): string {
  if (!Number.isInteger(bytes) || bytes < 16 || bytes > 128) {
    throw new RangeError('bytes must be an integer between 16 and 128');
  }
  const buffer = new Uint8Array(bytes);
  globalThis.crypto.getRandomValues(buffer);
  return Array.from(buffer, (b) => b.toString(16).padStart(2, '0')).join('');
}
