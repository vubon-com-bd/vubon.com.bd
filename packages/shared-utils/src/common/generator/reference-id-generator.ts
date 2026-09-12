/**
 * Reference ID Generator — crypto-secure.
 * @module shared-utils/common/generator/reference-id
 */

import { secureRandomString } from '../helper/crypto.helper';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

export const generateReferenceId = (prefix: string = 'REF'): string => {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = secureRandomString(6, CHARS);
  return `${prefix}-${timestamp}-${random}`;
};
