/**
 * Validate password strength (non-crypto, structural)
 * @module shared-utils/security/password
 *
 * Values আসে shared-constants/security/security.constants থেকে।
 */
import { SECURITY } from '@vubon/shared-constants/security';

export type PasswordStrength = 'weak' | 'fair' | 'good' | 'strong' | 'very_strong';

export interface PasswordValidation {
  readonly valid: boolean;
  readonly score: number;
  readonly strength: PasswordStrength;
  readonly feedback: readonly string[];
}

export function validateStrength(password: string): PasswordValidation {
  const feedback: string[] = [];
  let score = 0;

  if (password.length >= SECURITY.PASSWORD_MIN_LENGTH) score += 20;
  else feedback.push(`Password must be at least ${SECURITY.PASSWORD_MIN_LENGTH} characters`);

  if (password.length >= 12) score += 10;
  if (password.length >= 16) score += 10;

  if (/[a-z]/.test(password)) score += 10;
  else feedback.push('Add lowercase letters');

  if (/[A-Z]/.test(password)) score += 10;
  else feedback.push('Add uppercase letters');

  if (/\d/.test(password)) score += 10;
  else feedback.push('Add numbers');

  if (/[^A-Za-z0-9]/.test(password)) score += 15;
  else feedback.push('Add special characters');

  if (/(.)\1{2,}/.test(password)) {
    score -= 10;
    feedback.push('Avoid repeated characters');
  }

  score = Math.max(0, Math.min(100, score));

  const strength: PasswordStrength =
    score >= 90
      ? 'very_strong'
      : score >= 75
        ? 'strong'
        : score >= 55
          ? 'good'
          : score >= 35
            ? 'fair'
            : 'weak';

  const valid =
    password.length >= SECURITY.PASSWORD_MIN_LENGTH &&
    password.length <= SECURITY.PASSWORD_MAX_LENGTH &&
    score >= 55;

  return { valid, score, strength, feedback };
}
