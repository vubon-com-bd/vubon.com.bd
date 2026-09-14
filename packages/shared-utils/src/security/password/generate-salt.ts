/**
 * Generate a cryptographically secure random salt (hex)
 * @module shared-utils/security/password
 */
export function generateSalt(bytes = 16): string {
  if (!Number.isInteger(bytes) || bytes < 8 || bytes > 64) {
    throw new RangeError('bytes must be an integer between 8 and 64');
  }
  const buffer = new Uint8Array(bytes);
  globalThis.crypto.getRandomValues(buffer);
  return Array.from(buffer, (b) => b.toString(16).padStart(2, '0')).join('');
}
