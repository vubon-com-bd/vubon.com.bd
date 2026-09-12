/**
 * Password Validator — uses SECURITY.PASSWORD (single source of truth).
 */
import { SECURITY } from '@vubon/shared-constants/src/common/security.constants';

const {
  MIN_LENGTH,
  MAX_LENGTH,
  REQUIRE_UPPERCASE,
  REQUIRE_LOWERCASE,
  REQUIRE_NUMBER,
  REQUIRE_SPECIAL,
} = SECURITY.PASSWORD;

export const validatePassword = (password: string): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  if (!password) {
    errors.push('Password is required');
    return { isValid: false, errors };
  }
  if (password.length < MIN_LENGTH)
    errors.push(`Password must be at least ${MIN_LENGTH} characters`);
  if (password.length > MAX_LENGTH)
    errors.push(`Password must not exceed ${MAX_LENGTH} characters`);
  if (REQUIRE_UPPERCASE && !/[A-Z]/.test(password))
    errors.push('Password must contain an uppercase letter');
  if (REQUIRE_LOWERCASE && !/[a-z]/.test(password))
    errors.push('Password must contain a lowercase letter');
  if (REQUIRE_NUMBER && !/[0-9]/.test(password)) errors.push('Password must contain a number');
  if (REQUIRE_SPECIAL && !/[^A-Za-z0-9]/.test(password))
    errors.push('Password must contain a special character');
  return { isValid: errors.length === 0, errors };
};

export const isStrongPassword = (password: string): boolean => validatePassword(password).isValid;
