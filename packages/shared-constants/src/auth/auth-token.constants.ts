/**
 * Auth Token Constants (EXTENDS common/types)
 * @module shared-constants/auth/auth-token.constants
 */

import { TYPES } from '../common/types.constants';

export const AUTH_TOKEN = {
  // Base types
  ...TYPES,

  // Token types
  ACCESS: 'access',
  REFRESH: 'refresh',
  VERIFICATION: 'verification',
  RESET_PASSWORD: 'reset_password',
  MFA: 'mfa',
  API_KEY: 'api_key',
  OAUTH: 'oauth',
  SOCIAL: 'social',
  SSO: 'sso',
  SESSION: 'session',
  CSRF: 'csrf',
  JWT: 'jwt',
  BEARER: 'bearer',

  // Token settings
  ACCESS_TOKEN_EXPIRY: 900, // 15 minutes
  REFRESH_TOKEN_EXPIRY: 604800, // 7 days
  VERIFICATION_TOKEN_EXPIRY: 86400, // 24 hours
  RESET_TOKEN_EXPIRY: 3600, // 1 hour
  MFA_TOKEN_EXPIRY: 300, // 5 minutes
  API_KEY_EXPIRY: 31536000, // 1 year
  CSRF_TOKEN_EXPIRY: 3600, // 1 hour

  // Token lengths
  ACCESS_TOKEN_LENGTH: 64,
  REFRESH_TOKEN_LENGTH: 64,
  VERIFICATION_TOKEN_LENGTH: 64,
  RESET_TOKEN_LENGTH: 64,
  MFA_TOKEN_LENGTH: 6,
  API_KEY_LENGTH: 32,
  CSRF_TOKEN_LENGTH: 32,
  JWT_TOKEN_LENGTH: 0, // variable

  // Token prefixes
  PREFIX: {
    ACCESS: 'acc_',
    REFRESH: 'ref_',
    VERIFICATION: 'ver_',
    RESET: 'rst_',
    MFA: 'mfa_',
    API_KEY: 'api_',
    CSRF: 'csrf_',
    SESSION: 'sess_',
  } as const,
} as const;

export type AuthTokenType = (typeof AUTH_TOKEN)[keyof typeof AUTH_TOKEN];
export type AuthTokenPrefix = (typeof AUTH_TOKEN.PREFIX)[keyof typeof AUTH_TOKEN.PREFIX];
