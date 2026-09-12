/**
 * Coupon Code Generator — cryptographically secure.
 * @module shared-utils/common/generator/coupon-code
 *
 * Uses DISCOUNT.COUPON constants (prefix, allowed chars, length bounds).
 */

import { DISCOUNT } from '@vubon/shared-constants/src/common/discount.constants';
import { secureRandomString } from '../helper/crypto.helper';

const { PREFIX, ALLOWED_CHARS, MIN_LENGTH, MAX_LENGTH } = DISCOUNT.COUPON;

/**
 * Generates a crypto-secure coupon code with the standard prefix.
 */
export const generateCouponCode = (length: number = 8): string => {
  if (length < MIN_LENGTH || length > MAX_LENGTH) {
    throw new Error(`Coupon length must be between ${MIN_LENGTH} and ${MAX_LENGTH}`);
  }
  const body = secureRandomString(length, ALLOWED_CHARS);
  return `${PREFIX}-${body}`;
};

/**
 * Generates a raw body without prefix (for custom formats).
 */
export const generateCouponBody = (length: number = 8): string => {
  if (length < MIN_LENGTH || length > MAX_LENGTH) {
    throw new Error(`Coupon length must be between ${MIN_LENGTH} and ${MAX_LENGTH}`);
  }
  return secureRandomString(length, ALLOWED_CHARS);
};
