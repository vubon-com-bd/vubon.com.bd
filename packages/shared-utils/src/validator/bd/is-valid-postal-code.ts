/**
 * Check if string is a valid Bangladesh postal code (4 digits)
 * @module shared-utils/validator/bd
 */
import { REGEX } from '@vubon/shared-constants/common';

export function isValidPostalCode(value: string): boolean {
  if (typeof value !== 'string') return false;
  return REGEX.POSTAL_BD.test(value.trim());
}
