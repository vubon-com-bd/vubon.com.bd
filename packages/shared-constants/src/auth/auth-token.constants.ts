/**
 * Auth Token Constants
 * প্রমাণীকরণ টোকেন সম্পর্কিত কনস্ট্যান্টস
 */

import { AUTH } from './auth.constants';

export const AUTH_TOKEN = {
  ...AUTH.TOKEN,

  // Token status
  STATUS: {
    VALID: 'valid',
    INVALID: 'invalid',
    EXPIRED: 'expired',
    REVOKED: 'revoked',
    PENDING: 'pending',
    USED: 'used',
  },

  // Token algorithms
  ALGORITHMS: {
    HS256: 'HS256',
    HS384: 'HS384',
    HS512: 'HS512',
    RS256: 'RS256',
    RS384: 'RS384',
    RS512: 'RS512',
    ES256: 'ES256',
    ES384: 'ES384',
    ES512: 'ES512',
    PS256: 'PS256',
    PS384: 'PS384',
    PS512: 'PS512',
  },

  // Default expiry times (seconds)
  EXPIRY: {
    ACCESS: 900, // 15 minutes
    REFRESH: 604800, // 7 days
    VERIFICATION: 86400, // 24 hours
    PASSWORD_RESET: 3600, // 1 hour
    MAGIC_LINK: 600, // 10 minutes
    MFA: 300, // 5 minutes
    API_KEY: 31536000, // 1 year
    SESSION: 3600, // 1 hour
    IMPERSONATION: 1800, // 30 minutes
  },

  // Token claims
  CLAIMS: {
    ISS: 'iss',
    SUB: 'sub',
    AUD: 'aud',
    EXP: 'exp',
    NBF: 'nbf',
    IAT: 'iat',
    JTI: 'jti',
    TYPE: 'type',
    ROLE: 'role',
    PERMISSIONS: 'permissions',
    SESSION_ID: 'session_id',
    DEVICE_ID: 'device_id',
    PROVIDER: 'provider',
    MFA_VERIFIED: 'mfa_verified',
    IMPERSONATED: 'impersonated',
    ORIGINAL_USER: 'original_user',
  },
} as const;

export type AuthTokenStatus = (typeof AUTH_TOKEN.STATUS)[keyof typeof AUTH_TOKEN.STATUS];
export type AuthTokenAlgorithm = (typeof AUTH_TOKEN.ALGORITHMS)[keyof typeof AUTH_TOKEN.ALGORITHMS];
export type AuthTokenClaim = (typeof AUTH_TOKEN.CLAIMS)[keyof typeof AUTH_TOKEN.CLAIMS];
