/**
 * Hash Helper — SHA-256 + HMAC.
 * @module shared-utils/common/helper/hash
 *
 * ⚠️ IMPORTANT: This is NOT for passwords.
 * For passwords, use bcrypt on the server — see SECURITY.PASSWORD.HASH_ALGORITHM.
 * This module is for integrity checks, cache keys, and non-secret hashing.
 */

import { createHash, createHmac, timingSafeEqual } from 'crypto';

/**
 * SHA-256 hash of a string (hex output).
 * ⚠️ Do NOT use for password hashing — use bcrypt instead.
 */
export const hashString = (str: string, algorithm: string = 'sha256'): string =>
  createHash(algorithm).update(str).digest('hex');

/**
 * HMAC-SHA256 using a secret key.
 * Use for webhook signatures, API request signing.
 */
export const hmacSha256 = (key: string, data: string): string =>
  createHmac('sha256', key).update(data).digest('hex');

/**
 * Timing-safe string comparison to prevent timing attacks.
 */
export const safeCompare = (a: string, b: string): boolean => {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return timingSafeEqual(bufA, bufB);
};
