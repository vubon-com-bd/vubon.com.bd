/**
 * Check if string is a valid username
 * @module shared-utils/validator/identity
 */
import { REGEX, VALIDATION } from '@vubon/shared-constants/common';

export function isValidUsername(value: string): boolean {
  if (typeof value !== 'string') return false;
  const trimmed = value.trim();
  if (
    trimmed.length < VALIDATION.USERNAME_MIN_LENGTH ||
    trimmed.length > VALIDATION.USERNAME_MAX_LENGTH
  ) {
    return false;
  }
  return REGEX.USERNAME.test(trimmed);
}
