/**
 * Voucher Code Generator — cryptographically secure.
 * @module shared-utils/common/generator/voucher-code
 *
 * Uses DISCOUNT.VOUCHER constants (prefix, allowed chars, length bounds).
 */

import { DISCOUNT } from '@vubon/shared-constants/src/common/discount.constants';
import { secureRandomString } from '../helper/crypto.helper';

const { PREFIX, ALLOWED_CHARS, MIN_LENGTH, MAX_LENGTH } = DISCOUNT.VOUCHER;

export const generateVoucherCode = (length: number = 8): string => {
  if (length < MIN_LENGTH || length > MAX_LENGTH) {
    throw new Error(`Voucher length must be between ${MIN_LENGTH} and ${MAX_LENGTH}`);
  }
  const body = secureRandomString(length, ALLOWED_CHARS);
  return `${PREFIX}-${body}`;
};

export const generateVoucherBody = (length: number = 8): string => {
  if (length < MIN_LENGTH || length > MAX_LENGTH) {
    throw new Error(`Voucher length must be between ${MIN_LENGTH} and ${MAX_LENGTH}`);
  }
  return secureRandomString(length, ALLOWED_CHARS);
};
