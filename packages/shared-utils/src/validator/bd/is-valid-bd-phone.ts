/**
 * Check if string is a valid Bangladesh phone number
 * @module shared-utils/validator/bd
 */
import { REGEX } from '@vubon/shared-constants/common';

export function isValidBdPhone(value: string): boolean {
  if (typeof value !== 'string') return false;
  return REGEX.PHONE_BD.test(value.trim());
}
