/**
 * Check if string is a valid Bangladesh NID (10, 13, or 17 digits)
 * @module shared-utils/validator/bd
 */
import { REGEX } from '@vubon/shared-constants/common';

export function isValidNid(value: string): boolean {
  if (typeof value !== 'string') return false;
  const digits = value.replace(/\D/g, '');
  if (digits.length !== 10 && digits.length !== 13 && digits.length !== 17) {
    return false;
  }
  return REGEX.NID_BD.test(digits);
}
