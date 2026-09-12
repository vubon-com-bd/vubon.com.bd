/**
 * bKash Validator — uses REGEX.BKASH_ACCOUNT.
 */
import { REGEX } from '@vubon/shared-constants/src/common/regex.constants';

export const isValidBkashNumber = (number: string): boolean =>
  REGEX.BKASH_ACCOUNT.test(number.replace(/\s/g, ''));
