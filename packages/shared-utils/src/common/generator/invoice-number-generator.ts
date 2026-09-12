/**
 * Invoice Number Generator — crypto-secure + collision-resistant.
 * @module shared-utils/common/generator/invoice-number
 *
 * Format: `INV-YYYYMMDD-XXXXXX`
 * Matches REGEX.INVOICE_NUMBER pattern.
 */

import { secureRandomString } from '../helper/crypto.helper';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

const formatDate = (d: Date = new Date()): string => {
  const y = d.getUTCFullYear();
  const m = String(d.getUTCMonth() + 1).padStart(2, '0');
  const day = String(d.getUTCDate()).padStart(2, '0');
  return `${y}${m}${day}`;
};

export const generateInvoiceNumber = (prefix: string = 'INV', date: Date = new Date()): string => {
  return `${prefix}-${formatDate(date)}-${secureRandomString(6, CHARS)}`;
};
