/**
 * Nagad Validator — uses REGEX.NAGAD_ACCOUNT.
 */
import { REGEX } from '@vubon/shared-constants/src/common/regex.constants';

export const isValidNagadNumber = (number: string): boolean =>
  REGEX.NAGAD_ACCOUNT.test(number.replace(/\s/g, ''));
