/**
 * Auth Password Constants (EXTENDS common/validation)
 * @module shared-constants/auth/auth-password.constants
 */

import { VALIDATION } from '../common/validation.constants';

export const AUTH_PASSWORD = {
  // Base validation from common
  ...VALIDATION,

  // Password specific
  MIN_LENGTH: 8,
  MAX_LENGTH: 72,
  MIN_UPPERCASE: 1,
  MIN_LOWERCASE: 1,
  MIN_NUMBERS: 1,
  MIN_SPECIAL: 1,
  SPECIAL_CHARS: '!@#$%^&*()_+-=[]{}|;:,.<>?',

  // Password strength levels
  STRENGTH: {
    WEAK: 'weak',
    MEDIUM: 'medium',
    STRONG: 'strong',
    VERY_STRONG: 'very_strong',
  } as const,

  // Password patterns
  PATTERNS: {
    WEAK: /^.{6,}$/,
    MEDIUM: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
    STRONG: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    VERY_STRONG: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])(?=.{12,})/,
  },

  // Password history
  HISTORY: {
    MAX_ENTRIES: 10,
    PREVENT_REUSE: true,
    PREVENT_REUSE_COUNT: 5,
  },

  // Password expiry
  EXPIRY: {
    ENABLED: true,
    MAX_AGE_DAYS: 90,
    REMINDER_DAYS: 7,
    GRACE_PERIOD_DAYS: 3,
  },

  // Password lockout
  LOCKOUT: {
    MAX_ATTEMPTS: 5,
    DURATION_MINUTES: 30,
    RESET_ATTEMPTS_AFTER_MINUTES: 15,
  },
} as const;

export type PasswordStrength = (typeof AUTH_PASSWORD.STRENGTH)[keyof typeof AUTH_PASSWORD.STRENGTH];
