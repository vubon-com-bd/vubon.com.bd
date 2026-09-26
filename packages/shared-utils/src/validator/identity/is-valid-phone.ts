/**
 * Check if string is a valid international phone
 * @module shared-utils/validator/identity
 */
import { REGEX } from '@vubon/shared-constants/common';

export function isValidPhone(value: string): boolean {
  if (typeof value !== 'string') return false;
  return REGEX.PHONE_INTL.test(value.trim());
}
