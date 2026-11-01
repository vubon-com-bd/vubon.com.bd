/**
 * Verify a plain password against a policy (no hashing)
 * @module shared-utils/security/password
 */
import { SECURITY } from '@vubon/shared-constants/security';

export interface PasswordPolicyResult {
  readonly valid: boolean;
  readonly errors: readonly string[];
}

export function verifyPasswordPolicy(password: string): PasswordPolicyResult {
  const errors: string[] = [];

  if (password.length < SECURITY.PASSWORD_MIN_LENGTH) {
    errors.push(`Too short (min ${SECURITY.PASSWORD_MIN_LENGTH})`);
  }
  if (password.length > SECURITY.PASSWORD_MAX_LENGTH) {
    errors.push(`Too long (max ${SECURITY.PASSWORD_MAX_LENGTH})`);
  }
  if (SECURITY.PASSWORD_REQUIRE_UPPERCASE && !/[A-Z]/.test(password)) {
    errors.push('Missing uppercase letter');
  }
  if (SECURITY.PASSWORD_REQUIRE_LOWERCASE && !/[a-z]/.test(password)) {
    errors.push('Missing lowercase letter');
  }
  if (SECURITY.PASSWORD_REQUIRE_NUMBER && !/\d/.test(password)) {
    errors.push('Missing number');
  }
  if (SECURITY.PASSWORD_REQUIRE_SYMBOL && !/[^A-Za-z0-9]/.test(password)) {
    errors.push('Missing special character');
  }

  return { valid: errors.length === 0, errors };
}
