/**
 * Time Validator — uses REGEX.TIME_SHORT / TIME_ISO.
 */
import { REGEX } from '@vubon/shared-constants/src/common/regex.constants';

export const isValidTime = (time: string): boolean =>
  REGEX.TIME_SHORT.test(time.trim()) || REGEX.TIME_ISO.test(time.trim());
