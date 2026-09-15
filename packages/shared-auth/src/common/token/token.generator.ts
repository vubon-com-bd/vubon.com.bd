/**
 * ⚠️ CLIENT-SIDE SAFE ONLY.
 * Uses Web Crypto when available, throws when neither crypto
 * nor Node crypto is reachable — NEVER falls back to Math.random.
 */
function getCrypto(): Crypto {
  if (typeof globalThis.crypto === 'undefined') {
    throw new Error('No Web Crypto available — cannot generate secure tokens in this environment');
  }
  return globalThis.crypto;
}

export function generateOpaqueToken(byteLength = 32): string {
  if (byteLength < 16 || byteLength > 128) {
    throw new RangeError('byteLength must be between 16 and 128');
  }
  const bytes = new Uint8Array(byteLength);
  getCrypto().getRandomValues(bytes);
  return Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('');
}

/** Generate a short numeric OTP (crypto-secure). */
export function generateNumericOtp(digits = 6): string {
  if (digits < 4 || digits > 10) {
    throw new RangeError('digits must be between 4 and 10');
  }
  const max = 10 ** digits;
  const buf = new Uint32Array(1);
  getCrypto().getRandomValues(buf);
  const n = (buf[0] ?? 0) % max;
  return String(n).padStart(digits, '0');
}
