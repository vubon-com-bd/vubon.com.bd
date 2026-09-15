/**
 * ⚠️ CLIENT-SIDE SAFE ONLY.
 * Generates opaque, non-JWT tokens (e.g. CSRF, nonce, opaque refresh).
 *
 * For real JWT signing, use `server/token/token.service.ts`.
 */
export function generateOpaqueToken(byteLength = 32): string {
  if (byteLength < 16 || byteLength > 128) {
    throw new RangeError('byteLength must be between 16 and 128');
  }
  const bytes = new Uint8Array(byteLength);
  if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
    crypto.getRandomValues(bytes);
  } else {
    for (let i = 0; i < byteLength; i++) {
      bytes[i] = Math.floor(Math.random() * 256);
    }
  }
  return Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('');
}

/** Generate a short numeric OTP (uses crypto if available). */
export function generateNumericOtp(digits = 6): string {
  if (digits < 4 || digits > 10) {
    throw new RangeError('digits must be between 4 and 10');
  }
  const max = 10 ** digits;
  let n: number;
  if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
    const buf = new Uint32Array(1);
    crypto.getRandomValues(buf);
    n = (buf[0] ?? 0) % max;
  } else {
    n = Math.floor(Math.random() * max);
  }
  return String(n).padStart(digits, '0');
}
