/**
 * Phone Validator — uses REGEX.PHONE.
 */
import { REGEX } from '@vubon/shared-constants/src/common/regex.constants';

export const isValidPhone = (phone: string): boolean => REGEX.PHONE.test(phone.replace(/\s/g, ''));

export const isValidBDPhone = (phone: string): boolean =>
  REGEX.BD_PHONE.test(phone.replace(/\s/g, ''));

export const validatePhone = (phone: string): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  if (!phone) errors.push('Phone number is required');
  else if (!isValidPhone(phone)) errors.push('Invalid phone number format');
  return { isValid: errors.length === 0, errors };
};
