/**
 * Order Number Generator — crypto-secure + collision-resistant.
 * @module shared-utils/common/generator/order-number
 *
 * Format: `ORD-YYYYMMDD-XXXXXX` (date + 6 crypto chars).
 */

import { secureRandomString } from '../helper/crypto.helper';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

const formatDate = (d: Date = new Date()): string => {
  const y = d.getUTCFullYear();
  const m = String(d.getUTCMonth() + 1).padStart(2, '0');
  const day = String(d.getUTCDate()).padStart(2, '0');
  return `${y}${m}${day}`;
};

export const generateOrderNumber = (prefix: string = 'ORD', date: Date = new Date()): string => {
  const datePart = formatDate(date);
  const randomPart = secureRandomString(6, CHARS);
  return `${prefix}-${datePart}-${randomPart}`;
};
