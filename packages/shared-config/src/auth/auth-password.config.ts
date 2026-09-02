/**
 * Auth Password Configuration
 * প্রমীকরণ পাসওয়ার্ড কনফিগারেশন
 */

import { AUTH_PASSWORD } from '@vubon/shared-constants';

export interface AuthPasswordConfig {
  minLength: number;
  maxLength: number;
  requireUppercase: boolean;
  requireLowercase: boolean;
  requireNumber: boolean;
  requireSpecialChar: boolean;
  allowWhitespace: boolean;
  disallowCommon: boolean;
  disallowRepeated: boolean;
  disallowSequential: boolean;
  disallowPersonalInfo: boolean;
  historyCount: number;
  maxAge: number;
  minAge: number;
  hashing: {
    algorithm: string;
    saltRounds: number;
    pepperEnabled: boolean;
  };
  reset: {
    tokenLength: number;
    tokenExpiry: number;
    maxRequests: number;
    requestCooldown: number;
  };
}

export const createAuthPasswordConfig = (): AuthPasswordConfig => ({
  minLength: AUTH_PASSWORD.POLICY.MIN_LENGTH,
  maxLength: AUTH_PASSWORD.POLICY.MAX_LENGTH,
  requireUppercase: AUTH_PASSWORD.POLICY.REQUIRE_UPPERCASE,
  requireLowercase: AUTH_PASSWORD.POLICY.REQUIRE_LOWERCASE,
  requireNumber: AUTH_PASSWORD.POLICY.REQUIRE_NUMBER,
  requireSpecialChar: AUTH_PASSWORD.POLICY.REQUIRE_SPECIAL_CHAR,
  allowWhitespace: AUTH_PASSWORD.POLICY.ALLOW_WHITESPACE,
  disallowCommon: AUTH_PASSWORD.POLICY.DISALLOW_COMMON,
  disallowRepeated: AUTH_PASSWORD.POLICY.DISALLOW_REPEATED,
  disallowSequential: AUTH_PASSWORD.POLICY.DISALLOW_SEQUENTIAL,
  disallowPersonalInfo: AUTH_PASSWORD.POLICY.DISALLOW_PERSONAL_INFO,
  historyCount: AUTH_PASSWORD.POLICY.HISTORY_COUNT,
  maxAge: AUTH_PASSWORD.POLICY.MAX_AGE,
  minAge: AUTH_PASSWORD.POLICY.MIN_AGE,
  hashing: {
    algorithm: AUTH_PASSWORD.HASHING.ALGORITHM,
    saltRounds: AUTH_PASSWORD.HASHING.SALT_ROUNDS,
    pepperEnabled: AUTH_PASSWORD.HASHING.PEPPER_ENABLED,
  },
  reset: {
    tokenLength: AUTH_PASSWORD.RESET.TOKEN_LENGTH,
    tokenExpiry: AUTH_PASSWORD.RESET.TOKEN_EXPIRY,
    maxRequests: AUTH_PASSWORD.RESET.MAX_REQUESTS,
    requestCooldown: AUTH_PASSWORD.RESET.REQUEST_COOLDOWN,
  },
});
