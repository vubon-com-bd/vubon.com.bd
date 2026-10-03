/**
 * Check if string meets strong password regex
 * @module shared-utils/validator/identity
 */
import { REGEX, VALIDATION } from '@vubon/shared-constants/common';

export function isValidPassword(value: string): boolean {
  if (typeof value !== 'string') return false;
  if (
    value.length < VALIDATION.PASSWORD_MIN_LENGTH ||
    value.length > VALIDATION.PASSWORD_MAX_LENGTH
  ) {
    return false;
  }
  return REGEX.PASSWORD_STRONG.test(value);
}
