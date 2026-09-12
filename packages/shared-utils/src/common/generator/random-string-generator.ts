/**
 * Random String Generator — cryptographically secure.
 * @module shared-utils/common/generator/random-string
 *
 * ⚠️ Uses crypto.randomBytes — NOT Math.random().
 * This is the BASE generator that other generators should use.
 */

import { randomBytes } from 'crypto';

const DEFAULT_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

/**
 * Generates a cryptographically secure random string.
 * @param length number of characters
 * @param chars  optional custom character pool
 */
export const generateRandomString = (length: number, chars?: string): string => {
  if (length <= 0) throw new Error('Length must be positive');
  const pool = chars ?? DEFAULT_CHARS;
  if (pool.length === 0) throw new Error('Character pool cannot be empty');

  const bytes = randomBytes(length);
  let result = '';
  for (let i = 0; i < length; i++) {
    result += pool[bytes[i]! % pool.length];
  }
  return result;
};

/**
 * Generates a URL-safe random string (base64url without padding).
 */
export const generateUrlSafeString = (length: number): string => {
  if (length <= 0) throw new Error('Length must be positive');
  const bytesNeeded = Math.ceil((length * 3) / 4);
  return randomBytes(bytesNeeded).toString('base64url').slice(0, length);
};
