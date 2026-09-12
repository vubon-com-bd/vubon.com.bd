/**
 * OTP Generator — cryptographically secure.
 * @module shared-utils/common/generator/otp
 *
 * ⚠️ SECURITY: Uses crypto.randomInt — NEVER Math.random().
 * Predictable OTPs allow account takeover.
 */

import { secureNumericCode, secureRandomString } from '../helper/crypto.helper';

const MIN_LENGTH = 4;
const MAX_LENGTH = 10;

/**
 * Generates a crypto-secure numeric OTP.
 * @param length digit count (default 6)
 */
export const generateOTP = (length: number = 6): string => {
  if (length < MIN_LENGTH || length > MAX_LENGTH) {
    throw new Error(`OTP length must be between ${MIN_LENGTH} and ${MAX_LENGTH}`);
  }
  return secureNumericCode(length);
};

/**
 * Generates an alphanumeric OTP (harder to guess for high-value actions).
 * Excludes confusing chars (0/O, 1/I).
 */
export const generateAlphanumericOTP = (length: number = 8): string => {
  if (length < MIN_LENGTH || length > MAX_LENGTH) {
    throw new Error(`OTP length must be between ${MIN_LENGTH} and ${MAX_LENGTH}`);
  }
  return secureRandomString(length, 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789');
};
