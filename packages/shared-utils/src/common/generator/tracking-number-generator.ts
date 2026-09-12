/**
 * Tracking Number Generator — crypto-secure.
 * @module shared-utils/common/generator/tracking-number
 */

import { secureRandomString } from '../helper/crypto.helper';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

export const generateTrackingNumber = (prefix: string = 'TRK'): string => {
  return prefix + secureRandomString(12, CHARS);
};
