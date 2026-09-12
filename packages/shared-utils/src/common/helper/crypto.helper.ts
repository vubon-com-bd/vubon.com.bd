/**
 * Crypto Helper — Node.js crypto module utilities.
 * @module shared-utils/common/helper/crypto
 *
 * ⚠️ ALL functions use cryptographically secure randomness.
 * NEVER use Math.random() for anything security-related.
 *
 * NOTE: Uses rejection sampling to avoid modulo bias when picking
 * characters from a pool.
 */

import { randomBytes, randomUUID, randomInt as cryptoRandomInt } from 'crypto';

/**
 * Cryptographically secure random bytes.
 */
export const secureRandomBytes = (length: number): Buffer => {
  if (length <= 0) throw new Error('Length must be positive');
  return randomBytes(length);
};

/**
 * Cryptographically secure random integer in [min, max] (inclusive).
 */
export const secureRandomInt = (min: number, max: number): number => {
  if (min > max) throw new Error('min must be <= max');
  return cryptoRandomInt(min, max + 1);
};

/**
 * Cryptographically secure random string from a character pool.
 * Uses rejection sampling to avoid modulo bias.
 */
export const secureRandomString = (length: number, chars?: string): string => {
  if (length <= 0) throw new Error('Length must be positive');
  const pool = chars ?? 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  if (pool.length === 0) throw new Error('Character pool cannot be empty');

  const maxValid = Math.floor(256 / pool.length) * pool.length;
  let result = '';
  while (result.length < length) {
    const bytes = randomBytes(length - result.length + 8);
    for (let i = 0; i < bytes.length && result.length < length; i++) {
      const byte = bytes[i]!;
      if (byte < maxValid) {
        result += pool[byte % pool.length];
      }
    }
  }
  return result;
};

/**
 * Cryptographically secure UUID v4.
 */
export const secureUUID = (): string => randomUUID();

/**
 * Cryptographically secure numeric code (e.g. OTP).
 */
export const secureNumericCode = (length: number): string => {
  if (length <= 0) throw new Error('Length must be positive');
  let result = '';
  for (let i = 0; i < length; i++) {
    result += cryptoRandomInt(0, 10).toString();
  }
  return result;
};

/**
 * Generates a cryptographically secure salt (hex string).
 */
export const generateSalt = (bytes: number = 16): string => {
  if (bytes < 8) throw new Error('Salt must be at least 8 bytes');
  return randomBytes(bytes).toString('hex');
};
