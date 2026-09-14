/**
 * Derive a key using PBKDF2 (SHA-256)
 * @module shared-utils/infrastructure/crypto
 */
export async function pbkdf2(
  password: string,
  salt: string,
  iterations = 100_000,
  lengthBytes = 32
): Promise<string> {
  if (iterations < 10_000 || iterations > 10_000_000) {
    throw new RangeError('iterations must be between 10000 and 10000000');
  }
  const encoder = new TextEncoder();
  const baseKey = await globalThis.crypto.subtle.importKey(
    'raw',
    encoder.encode(password),
    { name: 'PBKDF2' },
    false,
    ['deriveBits']
  );
  const derived = await globalThis.crypto.subtle.deriveBits(
    {
      name: 'PBKDF2',
      salt: encoder.encode(salt),
      iterations,
      hash: 'SHA-256',
    },
    baseKey,
    lengthBytes * 8
  );
  const bytes = new Uint8Array(derived);
  return Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('');
}
