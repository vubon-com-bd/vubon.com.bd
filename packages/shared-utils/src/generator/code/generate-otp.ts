/**
 * Generate cryptographically secure numeric OTP
 * @module shared-utils/generator/code
 *
 * ⚠️ NO modulo bias: uses rejection sampling.
 */
export function generateOtp(length = 6): string {
  if (!Number.isInteger(length) || length < 4 || length > 8) {
    throw new RangeError('length must be an integer between 4 and 8');
  }

  const maxUint32 = 0xffffffff;
  const limit = maxUint32 - (maxUint32 % 10);
  const buffer = new Uint32Array(1);

  let otp = '';
  for (let i = 0; i < length; i++) {
    let digit = 0;
    do {
      globalThis.crypto.getRandomValues(buffer);
      digit = buffer[0];
    } while (digit >= limit);
    otp += (digit % 10).toString();
  }
  return otp;
}
