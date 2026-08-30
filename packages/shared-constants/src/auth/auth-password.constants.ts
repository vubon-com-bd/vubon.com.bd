/**
 * Authentication Password Constants
 * Password management, validation, and security constants
 */

import { PASSWORD_STRONG_REGEX } from '../common/regex.constants';

/**
 * Password Rules
 * Password validation and security rules
 */
export const PASSWORD_RULES = {
  /** Minimum password length */
  MIN_LENGTH: 8,
  /** Maximum password length */
  MAX_LENGTH: 100,
  /** Password validation pattern (strong password) */
  PATTERN: PASSWORD_STRONG_REGEX,
  /** Require at least one uppercase letter */
  REQUIRE_UPPERCASE: true,
  /** Require at least one lowercase letter */
  REQUIRE_LOWERCASE: true,
  /** Require at least one number */
  REQUIRE_NUMBER: true,
  /** Require at least one special character */
  REQUIRE_SPECIAL: true,
  /** Minimum number of unique characters required */
  MIN_UNIQUE_CHARS: 4,
  /** Maximum consecutive repeating characters allowed */
  MAX_CONSECUTIVE_REPEATS: 3,
  /** Minimum character classes (upper, lower, number, special) required */
  MIN_CHARACTER_CLASSES: 3,
  /** Maximum password age in days before forced change */
  MAX_AGE_DAYS: 90,
  /** Number of previous passwords to prevent reuse */
  PREVENT_REUSE_COUNT: 5,
  /** Time in seconds to lock password reset attempts */
  RESET_LOCK_TIME: 900, // 15 minutes
  /** Maximum password reset attempts */
  MAX_RESET_ATTEMPTS: 5,
} as const;

export type PasswordRules = (typeof PASSWORD_RULES)[keyof typeof PASSWORD_RULES];

/**
 * Password Strength Levels
 * Levels of password strength
 */
export const PASSWORD_STRENGTH = {
  /** Very weak password */
  VERY_WEAK: 'very_weak',
  /** Weak password */
  WEAK: 'weak',
  /** Fair password */
  FAIR: 'fair',
  /** Strong password */
  STRONG: 'strong',
  /** Very strong password */
  VERY_STRONG: 'very_strong',
} as const;

export type PasswordStrength = (typeof PASSWORD_STRENGTH)[keyof typeof PASSWORD_STRENGTH];

/**
 * Password Strength Scores
 * Numerical scores for password strength
 */
export const PASSWORD_STRENGTH_SCORES: Record<PasswordStrength, number> = {
  [PASSWORD_STRENGTH.VERY_WEAK]: 0,
  [PASSWORD_STRENGTH.WEAK]: 25,
  [PASSWORD_STRENGTH.FAIR]: 50,
  [PASSWORD_STRENGTH.STRONG]: 75,
  [PASSWORD_STRENGTH.VERY_STRONG]: 100,
} as const;

/**
 * Password Error Messages
 * Error messages for password validation failures
 */
export const PASSWORD_ERRORS = {
  TOO_SHORT: `Password must be at least ${PASSWORD_RULES.MIN_LENGTH} characters`,
  TOO_LONG: `Password must not exceed ${PASSWORD_RULES.MAX_LENGTH} characters`,
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

export type PasswordError = (typeof PASSWORD_ERRORS)[keyof typeof PASSWORD_ERRORS];

/**
 * Password Success Messages
 * Success messages for password operations
 */
export const PASSWORD_SUCCESS = {
  CHANGED: 'Password changed successfully',
  RESET: 'Password reset successfully',
  SENT: 'Password reset email sent successfully',
  VALIDATED: 'Password validated successfully',
} as const;

export type PasswordSuccess = (typeof PASSWORD_SUCCESS)[keyof typeof PASSWORD_SUCCESS];

/**
 * Common Password List
 * Most common passwords that should be blocked
 */
export const COMMON_PASSWORDS: string[] = [
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

/**
 * Character Classes
 * Different character types for password validation
 */
export const PASSWORD_CHARACTER_CLASSES = {
  UPPERCASE: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  LOWERCASE: 'abcdefghijklmnopqrstuvwxyz',
  NUMBERS: '0123456789',
  SPECIAL: '!@#$%^&*()_+-=[]{}|;:,.<>?/~`',
} as const;

export type PasswordCharacterClass = keyof typeof PASSWORD_CHARACTER_CLASSES;

/**
 * Password Reset Status
 * Status of a password reset request
 */
export const PASSWORD_RESET_STATUS = {
  REQUESTED: 'requested',
  SENT: 'sent',
  COMPLETED: 'completed',
  EXPIRED: 'expired',
  FAILED: 'failed',
} as const;

export type PasswordResetStatus =
  (typeof PASSWORD_RESET_STATUS)[keyof typeof PASSWORD_RESET_STATUS];

/**
 * Password Reset Error Messages
 * Error messages for password reset operations
 */
export const PASSWORD_RESET_ERRORS = {
  EMAIL_NOT_FOUND: 'No account found with this email address',
  TOKEN_EXPIRED: 'Password reset token has expired',
  TOKEN_INVALID: 'Invalid password reset token',
  TOKEN_ALREADY_USED: 'Password reset token has already been used',
  TOO_MANY_ATTEMPTS: 'Too many reset attempts. Please try again later',
  USER_NOT_FOUND: 'User not found',
  EMAIL_NOT_SENT: 'Failed to send password reset email',
  RESET_NOT_ALLOWED: 'Password reset is not allowed for this account',
} as const;

export type PasswordResetError = (typeof PASSWORD_RESET_ERRORS)[keyof typeof PASSWORD_RESET_ERRORS];

/**
 * Helper function to check if password is strong enough
 * Based on password strength score threshold
 */
export function isPasswordStrongEnough(score: number, threshold: number = 50): boolean {
  return score >= threshold;
}

/**
 * Helper function to check if password meets all requirements
 * @param password The password to validate
 * @param rules Optional custom rules to override defaults
 */
export function validatePassword(
  password: string,
  rules: Partial<typeof PASSWORD_RULES> = {}
): { isValid: boolean; errors: string[] } {
  const finalRules = { ...PASSWORD_RULES, ...rules };
  const errors: string[] = [];

  // Check length
  if (password.length < finalRules.MIN_LENGTH) {
    errors.push(PASSWORD_ERRORS.TOO_SHORT);
  }
  if (password.length > finalRules.MAX_LENGTH) {
    errors.push(PASSWORD_ERRORS.TOO_LONG);
  }

  // Check character requirements
  if (finalRules.REQUIRE_UPPERCASE && !/[A-Z]/.test(password)) {
    errors.push(PASSWORD_ERRORS.NO_UPPERCASE);
  }
  if (finalRules.REQUIRE_LOWERCASE && !/[a-z]/.test(password)) {
    errors.push(PASSWORD_ERRORS.NO_LOWERCASE);
  }
  if (finalRules.REQUIRE_NUMBER && !/[0-9]/.test(password)) {
    errors.push(PASSWORD_ERRORS.NO_NUMBER);
  }
  if (finalRules.REQUIRE_SPECIAL && !/[!@#$%^&*()_+\-=\[\]{};:'",.<>?/\\|`~]/.test(password)) {
    errors.push(PASSWORD_ERRORS.NO_SPECIAL);
  }

  // Check consecutive repeats
  if (/(.)\1{2,}/.test(password)) {
    errors.push(PASSWORD_ERRORS.TOO_MANY_REPEATS);
  }

  // Check against common passwords
  if (COMMON_PASSWORDS.includes(password.toLowerCase())) {
    errors.push(PASSWORD_ERRORS.TOO_COMMON);
  }

  // Check unique characters
  const uniqueChars = new Set(password).size;
  if (uniqueChars < (finalRules.MIN_UNIQUE_CHARS || 4)) {
    errors.push(PASSWORD_ERRORS.NOT_ENOUGH_UNIQUE);
  }

  // Check character classes
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

/**
 * Helper function to calculate password strength score
 * Returns a score from 0 to 100
 */
export function calculatePasswordStrength(password: string): number {
  let score = 0;

  // Length contribution (max 25 points)
  if (password.length >= 8) score += 10;
  if (password.length >= 12) score += 10;
  if (password.length >= 16) score += 5;

  // Character variety (max 25 points)
  if (/[A-Z]/.test(password)) score += 5;
  if (/[a-z]/.test(password)) score += 5;
  if (/[0-9]/.test(password)) score += 5;
  if (/[!@#$%^&*()_+\-=\[\]{};:'",.<>?/\\|`~]/.test(password)) score += 10;

  // Complexity (max 25 points)
  const uniqueChars = new Set(password).size;
  if (uniqueChars >= 6) score += 10;
  if (uniqueChars >= 8) score += 10;
  if (uniqueChars >= 10) score += 5;

  // No common patterns (max 25 points)
  if (!/(.)\1{2,}/.test(password)) score += 10;
  if (!/(012|123|234|345|456|567|678|789|890)/.test(password)) score += 7;
  if (!/(qwerty|asdfgh|zxcvbn|qwertyuiop|asdfghjkl|zxcvbnm)/.test(password.toLowerCase()))
    score += 8;

  // Penalty for common passwords
  if (COMMON_PASSWORDS.includes(password.toLowerCase())) {
    score = Math.max(0, score - 30);
  }

  return Math.min(100, score);
}

/**
 * Helper function to get password strength label
 */
export function getPasswordStrength(score: number): PasswordStrength {
  if (score >= 80) return PASSWORD_STRENGTH.VERY_STRONG;
  if (score >= 60) return PASSWORD_STRENGTH.STRONG;
  if (score >= 40) return PASSWORD_STRENGTH.FAIR;
  if (score >= 20) return PASSWORD_STRENGTH.WEAK;
  return PASSWORD_STRENGTH.VERY_WEAK;
}

/**
 * Helper function to check if password is expired
 */
export function isPasswordExpired(
  lastChangedAt: Date,
  maxAgeDays: number = PASSWORD_RULES.MAX_AGE_DAYS
): boolean {
  const now = Date.now();
  const age = (now - lastChangedAt.getTime()) / (1000 * 60 * 60 * 24);
  return age >= maxAgeDays;
}

/**
 * Helper function to get password strength color
 */
export function getPasswordStrengthColor(strength: PasswordStrength): string {
  const colors: Record<PasswordStrength, string> = {
    [PASSWORD_STRENGTH.VERY_WEAK]: '#ff0000',
    [PASSWORD_STRENGTH.WEAK]: '#ff6600',
    [PASSWORD_STRENGTH.FAIR]: '#ffcc00',
    [PASSWORD_STRENGTH.STRONG]: '#66cc00',
    [PASSWORD_STRENGTH.VERY_STRONG]: '#00cc66',
  };
  return colors[strength] || '#808080';
}

/**
 * Helper function to get password strength label
 */
export function getPasswordStrengthLabel(strength: PasswordStrength): string {
  const labels: Record<PasswordStrength, string> = {
    [PASSWORD_STRENGTH.VERY_WEAK]: 'Very Weak',
    [PASSWORD_STRENGTH.WEAK]: 'Weak',
    [PASSWORD_STRENGTH.FAIR]: 'Fair',
    [PASSWORD_STRENGTH.STRONG]: 'Strong',
    [PASSWORD_STRENGTH.VERY_STRONG]: 'Very Strong',
  };
  return labels[strength] || 'Unknown';
}
