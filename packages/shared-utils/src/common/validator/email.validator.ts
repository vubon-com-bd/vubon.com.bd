/**
 * Email Validator — uses REGEX.EMAIL (single source of truth).
 */
import { REGEX } from '@vubon/shared-constants/src/common/regex.constants';
import { VALIDATION } from '@vubon/shared-constants/src/common/validation.constants';

export const isValidEmail = (email: string): boolean => REGEX.EMAIL.test(email.trim());

export const validateEmail = (email: string): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  const trimmed = email?.trim() ?? '';
  if (!trimmed) errors.push('Email is required');
  else {
    if (trimmed.length < VALIDATION.EMAIL.MIN_LENGTH)
      errors.push(`Email must be at least ${VALIDATION.EMAIL.MIN_LENGTH} characters`);
    if (trimmed.length > VALIDATION.EMAIL.MAX_LENGTH)
      errors.push(`Email must not exceed ${VALIDATION.EMAIL.MAX_LENGTH} characters`);
    if (!isValidEmail(trimmed)) errors.push('Invalid email format');
  }
  return { isValid: errors.length === 0, errors };
};
