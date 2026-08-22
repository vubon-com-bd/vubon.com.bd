/**
 * Authentication Constants
 * Core authentication configuration and constants
 */

import { AUTH_STATUS } from './auth-status.constants';
import { AUTH_TYPE } from './auth-type.constants';
import { AUTH_PROVIDER } from './auth-provider.constants';
import { AUTH_METHOD } from './auth-method.constants';

export const AUTH = {
  // Session configuration
  SESSION: {
    MAX_AGE: 3600, // 1 hour in seconds
    EXTEND_ON_ACTIVITY: true,
    INACTIVITY_TIMEOUT: 1800, // 30 minutes
    REMEMBER_ME_MAX_AGE: 604800, // 7 days
  },

  // Token configuration
  TOKEN: {
    ACCESS_TOKEN_EXPIRY: '15m',
    REFRESH_TOKEN_EXPIRY: '7d',
    VERIFICATION_TOKEN_EXPIRY: '24h',
    PASSWORD_RESET_TOKEN_EXPIRY: '1h',
    API_TOKEN_EXPIRY: '30d',
  },

  // Password configuration
  PASSWORD: {
    MIN_LENGTH: 8,
    MAX_LENGTH: 72,
    REQUIRE_UPPERCASE: true,
    REQUIRE_LOWERCASE: true,
    REQUIRE_NUMBER: true,
    REQUIRE_SPECIAL_CHAR: true,
    BCRYPT_ROUNDS: 12,
    HISTORY_LIMIT: 5,
    MAX_AGE_DAYS: 90,
  },

  // Verification configuration
  VERIFICATION: {
    EMAIL_VERIFICATION_EXPIRY: 86400, // 24 hours
    PHONE_VERIFICATION_EXPIRY: 600, // 10 minutes
    MAX_VERIFICATION_ATTEMPTS: 3,
    VERIFICATION_CODE_LENGTH: 6,
    RESEND_COOLDOWN: 60, // 1 minute
  },

  // Rate limiting
  RATE_LIMIT: {
    LOGIN: {
      windowMs: 900000, // 15 minutes
      maxAttempts: 5,
      blockDuration: 3600000, // 1 hour
    },
    REGISTRATION: {
      windowMs: 3600000, // 1 hour
      maxAttempts: 10,
    },
    VERIFICATION: {
      windowMs: 3600000, // 1 hour
      maxAttempts: 5,
    },
    PASSWORD_RESET: {
      windowMs: 3600000, // 1 hour
      maxAttempts: 3,
    },
  },

  // Default values
  DEFAULTS: {
    STATUS: AUTH_STATUS.ACTIVE,
    TYPE: AUTH_TYPE.LOCAL,
    PROVIDER: AUTH_PROVIDER.LOCAL,
    METHOD: AUTH_METHOD.PASSWORD,
    TIMEZONE: 'Asia/Dhaka',
    LOCALE: 'bn_BD',
  },

  // Security headers
  SECURITY_HEADERS: {
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block',
    'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
    'Content-Security-Policy': "default-src 'self'",
    'Referrer-Policy': 'strict-origin-when-cross-origin',
  },

  // Cookie configuration
  COOKIE: {
    ACCESS_TOKEN: {
      name: 'access_token',
      httpOnly: true,
      secure: true,
      sameSite: 'strict' as const,
      path: '/',
    },
    REFRESH_TOKEN: {
      name: 'refresh_token',
      httpOnly: true,
      secure: true,
      sameSite: 'strict' as const,
      path: '/',
    },
    SESSION_ID: {
      name: 'session_id',
      httpOnly: true,
      secure: true,
      sameSite: 'strict' as const,
      path: '/',
    },
  },
} as const;

export type AuthSessionConfig = typeof AUTH.SESSION;
export type AuthTokenConfig = typeof AUTH.TOKEN;
export type AuthPasswordConfig = typeof AUTH.PASSWORD;
export type AuthVerificationConfig = typeof AUTH.VERIFICATION;
export type AuthRateLimitConfig = typeof AUTH.RATE_LIMIT;
export type AuthDefaults = typeof AUTH.DEFAULTS;
export type AuthCookieConfig = typeof AUTH.COOKIE;

export function getSessionMaxAge(rememberMe: boolean): number {
  return rememberMe ? AUTH.SESSION.REMEMBER_ME_MAX_AGE : AUTH.SESSION.MAX_AGE;
}

export function getPasswordMinLength(): number {
  return AUTH.PASSWORD.MIN_LENGTH;
}

export function getPasswordMaxLength(): number {
  return AUTH.PASSWORD.MAX_LENGTH;
}

export function getVerificationCodeLength(): number {
  return AUTH.VERIFICATION.VERIFICATION_CODE_LENGTH;
}

export function getVerificationExpiry(): number {
  return AUTH.VERIFICATION.EMAIL_VERIFICATION_EXPIRY;
}

export function getLoginMaxAttempts(): number {
  return AUTH.RATE_LIMIT.LOGIN.maxAttempts;
}

export function getLoginBlockDuration(): number {
  return AUTH.RATE_LIMIT.LOGIN.blockDuration;
}

export function isPasswordValid(password: string): boolean {
  if (password.length < AUTH.PASSWORD.MIN_LENGTH) return false;
  if (password.length > AUTH.PASSWORD.MAX_LENGTH) return false;

  if (AUTH.PASSWORD.REQUIRE_UPPERCASE && !/[A-Z]/.test(password)) return false;
  if (AUTH.PASSWORD.REQUIRE_LOWERCASE && !/[a-z]/.test(password)) return false;
  if (AUTH.PASSWORD.REQUIRE_NUMBER && !/\d/.test(password)) return false;
  if (AUTH.PASSWORD.REQUIRE_SPECIAL_CHAR && !/[!@#$%^&*(),.?":{}|<>]/.test(password)) return false;

  return true;
}

export function getPasswordStrength(password: string): 'weak' | 'medium' | 'strong' {
  let score = 0;

  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score++;

  if (score <= 2) return 'weak';
  if (score <= 4) return 'medium';
  return 'strong';
}
