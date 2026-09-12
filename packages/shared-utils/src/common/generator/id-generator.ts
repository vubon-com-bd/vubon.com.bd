/**
 * ID Generator — cryptographically secure.
 * @module shared-utils/common/generator/id
 */

import { secureRandomString } from '../helper/crypto.helper';

const DEFAULT_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

/**
 * Generates a crypto-secure ID with optional prefix.
 */
export const generateId = (prefix: string = '', length: number = 12): string => {
  if (length <= 0) throw new Error('Length must be positive');
  const id = secureRandomString(length, DEFAULT_CHARS);
  return prefix ? `${prefix}-${id}` : id;
};
