/**
 * Token Generator — cryptographically secure.
 * @module shared-utils/common/generator/token
 *
 * ⚠️ Uses crypto.randomBytes. Predictable tokens = session hijack.
 */

import { randomBytes } from 'crypto';
import { secureRandomString, secureUUID } from '../helper/crypto.helper';

const DEFAULT_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

/**
 * Generates a crypto-secure token.
 * @param length number of characters (min 16)
 */
export const generateToken = (length: number = 32): string => {
  if (length < 16) throw new Error('Token length must be at least 16');
  return secureRandomString(length, DEFAULT_CHARS);
};

/**
 * Generates a hex token (useful for signatures).
 */
export const generateHexToken = (bytes: number = 32): string => {
  if (bytes < 16) throw new Error('Token must be at least 16 bytes');
  return randomBytes(bytes).toString('hex');
};

/**
 * Generates a URL-safe base64 token.
 */
export const generateUrlSafeToken = (bytes: number = 32): string => {
  if (bytes < 16) throw new Error('Token must be at least 16 bytes');
  return randomBytes(bytes).toString('base64url');
};

/**
 * Generates a JWT-style session ID (UUID v4).
 */
export const generateSessionId = (): string => secureUUID();
