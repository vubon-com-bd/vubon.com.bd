/**
 * Cryptographically secure random integer in [min, max] (rejection sampling, no modulo bias)
 * @module shared-utils/infrastructure/crypto
 */
export function randomIntSecure(min: number, max: number): number {
  if (!Number.isInteger(min) || !Number.isInteger(max)) {
    throw new RangeError('min and max must be integers');
  }
  if (min > max) throw new RangeError('min must be <= max');
  if (min === max) return min;

  const range = max - min + 1;
  const maxUint32 = 0xffffffff;
  const limit = maxUint32 - (maxUint32 % range);

  const buffer = new Uint32Array(1);
  let value = 0;
  do {
    globalThis.crypto.getRandomValues(buffer);
    value = buffer[0];
  } while (value >= limit);

  return min + (value % range);
}
