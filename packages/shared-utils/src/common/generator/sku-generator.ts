/**
 * SKU Generator — crypto-secure.
 * @module shared-utils/common/generator/sku
 *
 * Matches REGEX.SKU pattern: [A-Z0-9_-]{3,20}
 */

import { secureRandomString } from '../helper/crypto.helper';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

export const generateSKU = (prefix: string = 'SKU', length: number = 8): string => {
  if (length <= 0) throw new Error('Length must be positive');
  if (prefix.length + length > 20) {
    throw new Error('SKU (prefix + length) must not exceed 20 characters');
  }
  return prefix + secureRandomString(length, CHARS);
};
