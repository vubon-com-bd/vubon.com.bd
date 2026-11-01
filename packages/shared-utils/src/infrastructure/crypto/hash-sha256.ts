/**
 * Compute SHA-256 hash (hex) of a string
 * @module shared-utils/infrastructure/crypto
 */
export async function hashSha256(input: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(input);
  const hash = await globalThis.crypto.subtle.digest('SHA-256', data);
  const bytes = new Uint8Array(hash);
  return Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('');
}
