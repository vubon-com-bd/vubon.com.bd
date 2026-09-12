/**
 * Rocket Validator — uses REGEX.ROCKET_ACCOUNT.
 */
import { REGEX } from '@vubon/shared-constants/src/common/regex.constants';

export const isValidRocketNumber = (number: string): boolean =>
  REGEX.ROCKET_ACCOUNT.test(number.replace(/\s/g, ''));
