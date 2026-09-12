/**
 * Random String Generator — cryptographically secure.
 * @module shared-utils/common/generator/random-string
 *
 * Uses rejection sampling (no modulo bias).
 */

import { randomBytes } from 'crypto';

const DEFAULT_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

export const generateRandomString = (length: number, chars?: string): string => {
  if (length <= 0) throw new Error('Length must be positive');
  const pool = chars ?? DEFAULT_CHARS;
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

export const generateUrlSafeString = (length: number): string => {
  if (length <= 0) throw new Error('Length must be positive');
  const bytesNeeded = Math.ceil((length * 3) / 4);
  return randomBytes(bytesNeeded).toString('base64url').slice(0, length);
};
