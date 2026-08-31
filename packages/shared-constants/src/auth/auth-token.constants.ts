/**
 * Authentication Token Constants
 * Token management, types, and configuration constants
 */

import { ERROR_CODE } from '../common/error.constants';

// ============================================================
// AUTH TOKEN TYPES
// ============================================================
export const AUTH_TOKEN_TYPES = {
  ACCESS: 'access',
  REFRESH: 'refresh',
  VERIFICATION: 'verification',
  RESET: 'reset',
  MFA: 'mfa',
  API_KEY: 'api_key',
  SESSION: 'session',
  SOCIAL: 'social',
  SSO: 'sso',
  OAUTH: 'oauth',
  OAUTH_REFRESH: 'oauth_refresh',
  DEVICE: 'device',
  INVITATION: 'invitation',
  MAGIC_LINK: 'magic_link',
} as const;

export type AuthTokenType = (typeof AUTH_TOKEN_TYPES)[keyof typeof AUTH_TOKEN_TYPES];

// ============================================================
// AUTH TOKEN STATUS
// ============================================================
export const AUTH_TOKEN_STATUS = {
  ACTIVE: 'active',
  EXPIRED: 'expired',
  REVOKED: 'revoked',
  BLACKLISTED: 'blacklisted',
  PENDING: 'pending',
  USED: 'used',
  INVALID: 'invalid',
} as const;

export type AuthTokenStatus = (typeof AUTH_TOKEN_STATUS)[keyof typeof AUTH_TOKEN_STATUS];

// ============================================================
// AUTH TOKEN CONFIG
// ============================================================
export const AUTH_TOKEN_CONFIG = {
  ACCESS_EXPIRY: 900,
  REFRESH_EXPIRY: 604800,
  VERIFICATION_EXPIRY: 86400,
  RESET_EXPIRY: 3600,
  MFA_EXPIRY: 300,
  MAGIC_LINK_EXPIRY: 900,
  INVITATION_EXPIRY: 604800,
  OAUTH_EXPIRY: 3600,
  OAUTH_REFRESH_EXPIRY: 2592000,
  DEVICE_EXPIRY: 2592000,
  API_KEY_EXPIRY: 31536000,
  ALGORITHM: 'HS256' as const,
  ISSUER: 'vubon.com.bd',
  AUDIENCE: 'vubon-platform',
  VERSION: '1.0.0',
} as const;

export type AuthTokenConfig = (typeof AUTH_TOKEN_CONFIG)[keyof typeof AUTH_TOKEN_CONFIG];

// ============================================================
// AUTH TOKEN ERRORS
// ============================================================
export const AUTH_TOKEN_ERRORS = {
  TOKEN_EXPIRED: ERROR_CODE.EXPIRED_TOKEN,
  TOKEN_INVALID: ERROR_CODE.INVALID_TOKEN,
  TOKEN_MISSING: 'TOKEN_MISSING',
  TOKEN_BLACKLISTED: 'TOKEN_BLACKLISTED',
  TOKEN_REVOKED: ERROR_CODE.REVOKED_TOKEN,
  TOKEN_MALFORMED: 'TOKEN_MALFORMED',
  TOKEN_SIGNATURE_INVALID: 'TOKEN_SIGNATURE_INVALID',
  TOKEN_ISSUER_INVALID: 'TOKEN_ISSUER_INVALID',
  TOKEN_AUDIENCE_INVALID: 'TOKEN_AUDIENCE_INVALID',
  TOKEN_NOT_YET_VALID: 'TOKEN_NOT_YET_VALID',
  TOKEN_ALREADY_USED: 'TOKEN_ALREADY_USED',
  REFRESH_TOKEN_EXPIRED: ERROR_CODE.EXPIRED_REFRESH_TOKEN,
  REFRESH_TOKEN_INVALID: ERROR_CODE.INVALID_REFRESH_TOKEN,
  REFRESH_TOKEN_MISSING: 'REFRESH_TOKEN_MISSING',
  ACCESS_TOKEN_EXPIRED: ERROR_CODE.EXPIRED_TOKEN,
  ACCESS_TOKEN_INVALID: ERROR_CODE.INVALID_TOKEN,
  ACCESS_TOKEN_MISSING: 'ACCESS_TOKEN_MISSING',
  VERIFICATION_TOKEN_EXPIRED: ERROR_CODE.EXPIRED_TOKEN,
  VERIFICATION_TOKEN_INVALID: ERROR_CODE.INVALID_TOKEN,
  RESET_TOKEN_EXPIRED: ERROR_CODE.EXPIRED_TOKEN,
  RESET_TOKEN_INVALID: ERROR_CODE.INVALID_TOKEN,
  MFA_TOKEN_EXPIRED: ERROR_CODE.EXPIRED_TOKEN,
  MFA_TOKEN_INVALID: ERROR_CODE.INVALID_TOKEN,
  TOKEN_GENERATION_FAILED: 'TOKEN_GENERATION_FAILED',
  TOKEN_VALIDATION_FAILED: 'TOKEN_VALIDATION_FAILED',
  TOKEN_REVOCATION_FAILED: 'TOKEN_REVOCATION_FAILED',
} as const;

export type AuthTokenError = (typeof AUTH_TOKEN_ERRORS)[keyof typeof AUTH_TOKEN_ERRORS];

// ============================================================
// AUTH TOKEN SUCCESS
// ============================================================
export const AUTH_TOKEN_SUCCESS = {
  GENERATED: 'Token generated successfully',
  REFRESHED: 'Token refreshed successfully',
  VERIFIED: 'Token verified successfully',
  REVOKED: 'Token revoked successfully',
  VALIDATED: 'Token validated successfully',
} as const;

export type AuthTokenSuccess = (typeof AUTH_TOKEN_SUCCESS)[keyof typeof AUTH_TOKEN_SUCCESS];

// ============================================================
// AUTH TOKEN STATUS MESSAGES
// ============================================================
export const AUTH_TOKEN_STATUS_MESSAGES: Record<AuthTokenStatus, string> = {
  [AUTH_TOKEN_STATUS.ACTIVE]: 'Token is active and valid',
  [AUTH_TOKEN_STATUS.EXPIRED]: 'Token has expired',
  [AUTH_TOKEN_STATUS.REVOKED]: 'Token has been revoked',
  [AUTH_TOKEN_STATUS.BLACKLISTED]: 'Token is blacklisted',
  [AUTH_TOKEN_STATUS.PENDING]: 'Token is pending',
  [AUTH_TOKEN_STATUS.USED]: 'Token has been used',
  [AUTH_TOKEN_STATUS.INVALID]: 'Token is invalid',
} as const;

// ============================================================
// ACTIVE AUTH TOKEN STATUSES
// ============================================================
export const ACTIVE_AUTH_TOKEN_STATUSES: AuthTokenStatus[] = [AUTH_TOKEN_STATUS.ACTIVE] as const;

// ============================================================
// INVALID AUTH TOKEN STATUSES
// ============================================================
export const INVALID_AUTH_TOKEN_STATUSES: AuthTokenStatus[] = [
  AUTH_TOKEN_STATUS.EXPIRED,
  AUTH_TOKEN_STATUS.REVOKED,
  AUTH_TOKEN_STATUS.BLACKLISTED,
  AUTH_TOKEN_STATUS.INVALID,
] as const;

// ============================================================
// AUTH TOKEN EXPIRY MAP
// ============================================================
export const AUTH_TOKEN_EXPIRY_MAP: Record<AuthTokenType, number> = {
  [AUTH_TOKEN_TYPES.ACCESS]: AUTH_TOKEN_CONFIG.ACCESS_EXPIRY,
  [AUTH_TOKEN_TYPES.REFRESH]: AUTH_TOKEN_CONFIG.REFRESH_EXPIRY,
  [AUTH_TOKEN_TYPES.VERIFICATION]: AUTH_TOKEN_CONFIG.VERIFICATION_EXPIRY,
  [AUTH_TOKEN_TYPES.RESET]: AUTH_TOKEN_CONFIG.RESET_EXPIRY,
  [AUTH_TOKEN_TYPES.MFA]: AUTH_TOKEN_CONFIG.MFA_EXPIRY,
  [AUTH_TOKEN_TYPES.API_KEY]: AUTH_TOKEN_CONFIG.API_KEY_EXPIRY,
  [AUTH_TOKEN_TYPES.SESSION]: AUTH_TOKEN_CONFIG.ACCESS_EXPIRY,
  [AUTH_TOKEN_TYPES.SOCIAL]: AUTH_TOKEN_CONFIG.ACCESS_EXPIRY,
  [AUTH_TOKEN_TYPES.SSO]: AUTH_TOKEN_CONFIG.ACCESS_EXPIRY,
  [AUTH_TOKEN_TYPES.OAUTH]: AUTH_TOKEN_CONFIG.OAUTH_EXPIRY,
  [AUTH_TOKEN_TYPES.OAUTH_REFRESH]: AUTH_TOKEN_CONFIG.OAUTH_REFRESH_EXPIRY,
  [AUTH_TOKEN_TYPES.DEVICE]: AUTH_TOKEN_CONFIG.DEVICE_EXPIRY,
  [AUTH_TOKEN_TYPES.INVITATION]: AUTH_TOKEN_CONFIG.INVITATION_EXPIRY,
  [AUTH_TOKEN_TYPES.MAGIC_LINK]: AUTH_TOKEN_CONFIG.MAGIC_LINK_EXPIRY,
} as const;

// ============================================================
// ONE-TIME USE AUTH TOKENS
// ============================================================
export const ONE_TIME_USE_AUTH_TOKENS: AuthTokenType[] = [
  AUTH_TOKEN_TYPES.VERIFICATION,
  AUTH_TOKEN_TYPES.RESET,
  AUTH_TOKEN_TYPES.MFA,
  AUTH_TOKEN_TYPES.MAGIC_LINK,
  AUTH_TOKEN_TYPES.INVITATION,
] as const;

// ============================================================
// LONG-LIVED AUTH TOKENS
// ============================================================
export const LONG_LIVED_AUTH_TOKENS: AuthTokenType[] = [
  AUTH_TOKEN_TYPES.REFRESH,
  AUTH_TOKEN_TYPES.API_KEY,
  AUTH_TOKEN_TYPES.DEVICE,
  AUTH_TOKEN_TYPES.OAUTH_REFRESH,
] as const;

// ============================================================
// SHORT-LIVED AUTH TOKENS
// ============================================================
export const SHORT_LIVED_AUTH_TOKENS: AuthTokenType[] = [
  AUTH_TOKEN_TYPES.ACCESS,
  AUTH_TOKEN_TYPES.MFA,
  AUTH_TOKEN_TYPES.MAGIC_LINK,
  AUTH_TOKEN_TYPES.SESSION,
  AUTH_TOKEN_TYPES.OAUTH,
] as const;

// ============================================================
// AUTH TOKEN HEADERS
// ============================================================
export const AUTH_TOKEN_HEADERS = {
  AUTHORIZATION: 'Authorization',
  BEARER: 'Bearer',
  X_API_KEY: 'X-API-Key',
  X_REFRESH_TOKEN: 'X-Refresh-Token',
  X_DEVICE_TOKEN: 'X-Device-Token',
} as const;

export type AuthTokenHeader = (typeof AUTH_TOKEN_HEADERS)[keyof typeof AUTH_TOKEN_HEADERS];

// ============================================================
// AUTH TOKEN CLAIMS
// ============================================================
export const AUTH_TOKEN_CLAIMS = {
  ISSUER: 'iss',
  SUBJECT: 'sub',
  AUDIENCE: 'aud',
  EXPIRATION: 'exp',
  NOT_BEFORE: 'nbf',
  ISSUED_AT: 'iat',
  JWT_ID: 'jti',
  TOKEN_TYPE: 'type',
  USER_ID: 'user_id',
  ROLE: 'role',
  PERMISSIONS: 'permissions',
  DEVICE_ID: 'device_id',
  SESSION_ID: 'session_id',
  IP_ADDRESS: 'ip_address',
  USER_AGENT: 'user_agent',
} as const;

export type AuthTokenClaim = (typeof AUTH_TOKEN_CLAIMS)[keyof typeof AUTH_TOKEN_CLAIMS];

// ============================================================
// AUTH TOKEN MAIN OBJECT
// ============================================================
export const authToken = {
  TYPES: AUTH_TOKEN_TYPES,
  STATUS: AUTH_TOKEN_STATUS,
  CONFIG: AUTH_TOKEN_CONFIG,
  ERRORS: AUTH_TOKEN_ERRORS,
  SUCCESS: AUTH_TOKEN_SUCCESS,
  STATUS_MESSAGES: AUTH_TOKEN_STATUS_MESSAGES,
  ACTIVE_STATUSES: ACTIVE_AUTH_TOKEN_STATUSES,
  INVALID_STATUSES: INVALID_AUTH_TOKEN_STATUSES,
  EXPIRY_MAP: AUTH_TOKEN_EXPIRY_MAP,
  ONE_TIME_USE: ONE_TIME_USE_AUTH_TOKENS,
  LONG_LIVED: LONG_LIVED_AUTH_TOKENS,
  SHORT_LIVED: SHORT_LIVED_AUTH_TOKENS,
  HEADERS: AUTH_TOKEN_HEADERS,
  CLAIMS: AUTH_TOKEN_CLAIMS,
} as const;

export type AuthToken = typeof authToken;

// ============================================================
// HELPER FUNCTIONS
// ============================================================
export function isActiveAuthTokenStatus(status: AuthTokenStatus): boolean {
  return ACTIVE_AUTH_TOKEN_STATUSES.includes(status);
}

export function isInvalidAuthTokenStatus(status: AuthTokenStatus): boolean {
  return INVALID_AUTH_TOKEN_STATUSES.includes(status);
}

export function isOneTimeUseAuthToken(tokenType: AuthTokenType): boolean {
  return ONE_TIME_USE_AUTH_TOKENS.includes(tokenType);
}

export function isLongLivedAuthToken(tokenType: AuthTokenType): boolean {
  return LONG_LIVED_AUTH_TOKENS.includes(tokenType);
}

export function isShortLivedAuthToken(tokenType: AuthTokenType): boolean {
  return SHORT_LIVED_AUTH_TOKENS.includes(tokenType);
}

export function isValidAuthTokenType(tokenType: string): tokenType is AuthTokenType {
  return Object.values(AUTH_TOKEN_TYPES).includes(tokenType as AuthTokenType);
}

export function isValidAuthTokenStatus(status: string): status is AuthTokenStatus {
  return Object.values(AUTH_TOKEN_STATUS).includes(status as AuthTokenStatus);
}

export function getAuthTokenExpiry(tokenType: AuthTokenType): number {
  return AUTH_TOKEN_EXPIRY_MAP[tokenType] || AUTH_TOKEN_CONFIG.ACCESS_EXPIRY;
}

export function getAuthTokenStatusMessage(status: AuthTokenStatus): string {
  return AUTH_TOKEN_STATUS_MESSAGES[status] || 'Unknown token status';
}

export function isAuthTokenExpired(createdAt: Date, tokenType: AuthTokenType): boolean {
  const now = Date.now();
  const tokenAge = (now - createdAt.getTime()) / 1000;
  const expiry = getAuthTokenExpiry(tokenType);
  return tokenAge >= expiry;
}

export function getAuthTokenRemainingTime(createdAt: Date, tokenType: AuthTokenType): number {
  const now = Date.now();
  const tokenAge = (now - createdAt.getTime()) / 1000;
  const expiry = getAuthTokenExpiry(tokenType);
  const remaining = expiry - tokenAge;
  return Math.max(0, remaining);
}

export function formatAuthAuthorizationHeader(
  token: string,
  type: 'Bearer' | 'Basic' = 'Bearer'
): string {
  return `${type} ${token}`;
}

export function extractAuthTokenFromHeader(header: string): string | null {
  const match = header.match(/^Bearer\s+(.+)$/);
  return match ? match[1] : null;
}
