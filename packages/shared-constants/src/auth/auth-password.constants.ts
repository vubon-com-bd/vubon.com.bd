/**
 * Authentication Password Constants
 * Password management, validation, and security constants
 */

import { PASSWORD_STRONG_REGEX } from '../common/regex.constants';

// ============================================================
// AUTH PASSWORD RULES
// ============================================================
export const AUTH_PASSWORD_RULES = {
  MIN_LENGTH: 8,
  MAX_LENGTH: 100,
  PATTERN: PASSWORD_STRONG_REGEX,
  REQUIRE_UPPERCASE: true,
  REQUIRE_LOWERCASE: true,
  REQUIRE_NUMBER: true,
  REQUIRE_SPECIAL: true,
  MIN_UNIQUE_CHARS: 4,
  MAX_CONSECUTIVE_REPEATS: 3,
  MIN_CHARACTER_CLASSES: 3,
  MAX_AGE_DAYS: 90,
  PREVENT_REUSE_COUNT: 5,
  RESET_LOCK_TIME: 900,
  MAX_RESET_ATTEMPTS: 5,
} as const;

export type AuthPasswordRules = (typeof AUTH_PASSWORD_RULES)[keyof typeof AUTH_PASSWORD_RULES];

// ============================================================
// AUTH PASSWORD STRENGTH
// ============================================================
export const AUTH_PASSWORD_STRENGTH = {
  VERY_WEAK: 'very_weak',
  WEAK: 'weak',
  FAIR: 'fair',
  STRONG: 'strong',
  VERY_STRONG: 'very_strong',
} as const;

export type AuthPasswordStrength =
  (typeof AUTH_PASSWORD_STRENGTH)[keyof typeof AUTH_PASSWORD_STRENGTH];

// ============================================================
// AUTH PASSWORD STRENGTH SCORES
// ============================================================
export const AUTH_PASSWORD_STRENGTH_SCORES: Record<AuthPasswordStrength, number> = {
  [AUTH_PASSWORD_STRENGTH.VERY_WEAK]: 0,
  [AUTH_PASSWORD_STRENGTH.WEAK]: 25,
  [AUTH_PASSWORD_STRENGTH.FAIR]: 50,
  [AUTH_PASSWORD_STRENGTH.STRONG]: 75,
  [AUTH_PASSWORD_STRENGTH.VERY_STRONG]: 100,
} as const;

// ============================================================
// AUTH PASSWORD ERRORS
// ============================================================
export const AUTH_PASSWORD_ERRORS = {
  TOO_SHORT: `Password must be at least ${AUTH_PASSWORD_RULES.MIN_LENGTH} characters`,
  TOO_LONG: `Password must not exceed ${AUTH_PASSWORD_RULES.MAX_LENGTH} characters`,
  NO_UPPERCASE: 'Password must contain at least one uppercase letter',
  NO_LOWERCASE: 'Password must contain at least one lowercase letter',
  NO_NUMBER: 'Password must contain at least one number',
  NO_SPECIAL: 'Password must contain at least one special character',
  TOO_COMMON: 'Password is too common or easily guessable',
  CONTAINS_EMAIL: 'Password cannot contain your email address',
  CONTAINS_NAME: 'Password cannot contain your name',
  CONTAINS_USERNAME: 'Password cannot contain your username',
  CONTAINS_PHONE: 'Password cannot contain your phone number',
  TOO_MANY_REPEATS: 'Password has too many repeating characters',
  NOT_ENOUGH_UNIQUE: 'Password must have at least 4 unique characters',
  TOO_MANY_CONSECUTIVE: 'Password has too many consecutive characters',
  PREVIOUSLY_USED: 'Password has been used before. Please choose a new password',
  EXPIRED: 'Password has expired. Please change your password',
  RESET_FAILED: 'Password reset failed',
  RESET_LOCKED: 'Too many reset attempts. Please try again later',
  INVALID_CURRENT: 'Current password is incorrect',
  PASSWORD_MISMATCH: 'Passwords do not match',
  PASSWORD_SAME: 'New password cannot be the same as current password',
} as const;

export type AuthPasswordError = (typeof AUTH_PASSWORD_ERRORS)[keyof typeof AUTH_PASSWORD_ERRORS];

// ============================================================
// AUTH PASSWORD SUCCESS
// ============================================================
export const AUTH_PASSWORD_SUCCESS = {
  CHANGED: 'Password changed successfully',
  RESET: 'Password reset successfully',
  SENT: 'Password reset email sent successfully',
  VALIDATED: 'Password validated successfully',
} as const;

export type AuthPasswordSuccess =
  (typeof AUTH_PASSWORD_SUCCESS)[keyof typeof AUTH_PASSWORD_SUCCESS];

// ============================================================
// AUTH COMMON PASSWORDS
// ============================================================
export const AUTH_COMMON_PASSWORDS: string[] = [
  'password',
  '123456',
  '12345678',
  '123456789',
  '1234567890',
  'qwerty',
  'abc123',
  'password123',
  'admin',
  'letmein',
  'welcome',
  'monkey',
  'dragon',
  'master',
  'hello',
  'freedom',
  'whatever',
  'jordan',
  'computer',
  'abcdef',
  '111111',
  '000000',
  '123123',
  '654321',
  '0987654321',
  'qwertyuiop',
  'qwerty123',
  '1q2w3e4r',
  'password1',
  'passw0rd',
  'p@ssw0rd',
];

// ============================================================
// AUTH PASSWORD CHARACTER CLASSES
// ============================================================
export const AUTH_PASSWORD_CHARACTER_CLASSES = {
  UPPERCASE: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  LOWERCASE: 'abcdefghijklmnopqrstuvwxyz',
  NUMBERS: '0123456789',
  SPECIAL: '!@#$%^&*()_+-=[]{}|;:,.<>?/~`',
} as const;

export type AuthPasswordCharacterClass = keyof typeof AUTH_PASSWORD_CHARACTER_CLASSES;

// ============================================================
// AUTH PASSWORD RESET STATUS
// ============================================================
export const AUTH_PASSWORD_RESET_STATUS = {
  REQUESTED: 'requested',
  SENT: 'sent',
  COMPLETED: 'completed',
  EXPIRED: 'expired',
  FAILED: 'failed',
} as const;

export type AuthPasswordResetStatus =
  (typeof AUTH_PASSWORD_RESET_STATUS)[keyof typeof AUTH_PASSWORD_RESET_STATUS];

// ============================================================
// AUTH PASSWORD RESET ERRORS
// ============================================================
export const AUTH_PASSWORD_RESET_ERRORS = {
  EMAIL_NOT_FOUND: 'No account found with this email address',
  TOKEN_EXPIRED: 'Password reset token has expired',
  TOKEN_INVALID: 'Invalid password reset token',
  TOKEN_ALREADY_USED: 'Password reset token has already been used',
  TOO_MANY_ATTEMPTS: 'Too many reset attempts. Please try again later',
  USER_NOT_FOUND: 'User not found',
  EMAIL_NOT_SENT: 'Failed to send password reset email',
  RESET_NOT_ALLOWED: 'Password reset is not allowed for this account',
} as const;

export type AuthPasswordResetError =
  (typeof AUTH_PASSWORD_RESET_ERRORS)[keyof typeof AUTH_PASSWORD_RESET_ERRORS];

// ============================================================
// AUTH PASSWORD MAIN OBJECT
// ============================================================
export const authPassword = {
  RULES: AUTH_PASSWORD_RULES,
  STRENGTH: AUTH_PASSWORD_STRENGTH,
  STRENGTH_SCORES: AUTH_PASSWORD_STRENGTH_SCORES,
  ERRORS: AUTH_PASSWORD_ERRORS,
  SUCCESS: AUTH_PASSWORD_SUCCESS,
  COMMON_PASSWORDS: AUTH_COMMON_PASSWORDS,
  CHARACTER_CLASSES: AUTH_PASSWORD_CHARACTER_CLASSES,
  RESET_STATUS: AUTH_PASSWORD_RESET_STATUS,
  RESET_ERRORS: AUTH_PASSWORD_RESET_ERRORS,
} as const;

export type AuthPassword = typeof authPassword;

// ============================================================
// HELPER FUNCTIONS
// ============================================================
export function isAuthPasswordStrongEnough(score: number, threshold: number = 50): boolean {
  return score >= threshold;
}

export function validateAuthPassword(
  password: string,
  rules: Partial<typeof AUTH_PASSWORD_RULES> = {}
): { isValid: boolean; errors: string[] } {
  const finalRules = { ...AUTH_PASSWORD_RULES, ...rules };
  const errors: string[] = [];

  if (password.length < finalRules.MIN_LENGTH) {
    errors.push(AUTH_PASSWORD_ERRORS.TOO_SHORT);
  }
  if (password.length > finalRules.MAX_LENGTH) {
    errors.push(AUTH_PASSWORD_ERRORS.TOO_LONG);
  }

  if (finalRules.REQUIRE_UPPERCASE && !/[A-Z]/.test(password)) {
    errors.push(AUTH_PASSWORD_ERRORS.NO_UPPERCASE);
  }
  if (finalRules.REQUIRE_LOWERCASE && !/[a-z]/.test(password)) {
    errors.push(AUTH_PASSWORD_ERRORS.NO_LOWERCASE);
  }
  if (finalRules.REQUIRE_NUMBER && !/[0-9]/.test(password)) {
    errors.push(AUTH_PASSWORD_ERRORS.NO_NUMBER);
  }
  if (finalRules.REQUIRE_SPECIAL && !/[!@#$%^&*()_+\-=\[\]{};:'",.<>?/\\|`~]/.test(password)) {
    errors.push(AUTH_PASSWORD_ERRORS.NO_SPECIAL);
  }

  if (/(.)\1{2,}/.test(password)) {
    errors.push(AUTH_PASSWORD_ERRORS.TOO_MANY_REPEATS);
  }

  if (AUTH_COMMON_PASSWORDS.includes(password.toLowerCase())) {
    errors.push(AUTH_PASSWORD_ERRORS.TOO_COMMON);
  }

  const uniqueChars = new Set(password).size;
  if (uniqueChars < (finalRules.MIN_UNIQUE_CHARS || 4)) {
    errors.push(AUTH_PASSWORD_ERRORS.NOT_ENOUGH_UNIQUE);
  }

  let charClasses = 0;
  if (/[A-Z]/.test(password)) charClasses++;
  if (/[a-z]/.test(password)) charClasses++;
  if (/[0-9]/.test(password)) charClasses++;
  if (/[!@#$%^&*()_+\-=\[\]{};:'",.<>?/\\|`~]/.test(password)) charClasses++;
  if (charClasses < (finalRules.MIN_CHARACTER_CLASSES || 3)) {
    errors.push(
      `Password must contain at least ${finalRules.MIN_CHARACTER_CLASSES} different character types (uppercase, lowercase, numbers, special)`
    );
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

export function calculateAuthPasswordStrength(password: string): number {
  let score = 0;

  if (password.length >= 8) score += 10;
  if (password.length >= 12) score += 10;
  if (password.length >= 16) score += 5;

  if (/[A-Z]/.test(password)) score += 5;
  if (/[a-z]/.test(password)) score += 5;
  if (/[0-9]/.test(password)) score += 5;
  if (/[!@#$%^&*()_+\-=\[\]{};:'",.<>?/\\|`~]/.test(password)) score += 10;

  const uniqueChars = new Set(password).size;
  if (uniqueChars >= 6) score += 10;
  if (uniqueChars >= 8) score += 10;
  if (uniqueChars >= 10) score += 5;

  if (!/(.)\1{2,}/.test(password)) score += 10;
  if (!/(012|123|234|345|456|567|678|789|890)/.test(password)) score += 7;
  if (!/(qwerty|asdfgh|zxcvbn|qwertyuiop|asdfghjkl|zxcvbnm)/.test(password.toLowerCase()))
    score += 8;

  if (AUTH_COMMON_PASSWORDS.includes(password.toLowerCase())) {
    score = Math.max(0, score - 30);
  }

  return Math.min(100, score);
}

export function getAuthPasswordStrength(score: number): AuthPasswordStrength {
  if (score >= 80) return AUTH_PASSWORD_STRENGTH.VERY_STRONG;
  if (score >= 60) return AUTH_PASSWORD_STRENGTH.STRONG;
  if (score >= 40) return AUTH_PASSWORD_STRENGTH.FAIR;
  if (score >= 20) return AUTH_PASSWORD_STRENGTH.WEAK;
  return AUTH_PASSWORD_STRENGTH.VERY_WEAK;
}

export function isAuthPasswordExpired(
  lastChangedAt: Date,
  maxAgeDays: number = AUTH_PASSWORD_RULES.MAX_AGE_DAYS
): boolean {
  const now = Date.now();
  const age = (now - lastChangedAt.getTime()) / (1000 * 60 * 60 * 24);
  return age >= maxAgeDays;
}

export function getAuthPasswordStrengthColor(strength: AuthPasswordStrength): string {
  const colors: Record<AuthPasswordStrength, string> = {
    [AUTH_PASSWORD_STRENGTH.VERY_WEAK]: '#ff0000',
    [AUTH_PASSWORD_STRENGTH.WEAK]: '#ff6600',
    [AUTH_PASSWORD_STRENGTH.FAIR]: '#ffcc00',
    [AUTH_PASSWORD_STRENGTH.STRONG]: '#66cc00',
    [AUTH_PASSWORD_STRENGTH.VERY_STRONG]: '#00cc66',
  };
  return colors[strength] || '#808080';
}

export function getAuthPasswordStrengthLabel(strength: AuthPasswordStrength): string {
  const labels: Record<AuthPasswordStrength, string> = {
    [AUTH_PASSWORD_STRENGTH.VERY_WEAK]: 'Very Weak',
    [AUTH_PASSWORD_STRENGTH.WEAK]: 'Weak',
    [AUTH_PASSWORD_STRENGTH.FAIR]: 'Fair',
    [AUTH_PASSWORD_STRENGTH.STRONG]: 'Strong',
    [AUTH_PASSWORD_STRENGTH.VERY_STRONG]: 'Very Strong',
  };
  return labels[strength] || 'Unknown';
}
