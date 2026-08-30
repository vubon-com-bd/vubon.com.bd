/**
 * Authentication Token Constants
 * Token management, types, and configuration constants
 */

import { ERROR_CODE } from '../common/error.constants';

/**
 * Token Types
 * Different types of authentication tokens
 */
export const TOKEN_TYPES = {
  /** Access token for API authentication */
  ACCESS: 'access',
  /** Refresh token for obtaining new access tokens */
  REFRESH: 'refresh',
  /** Email verification token */
  VERIFICATION: 'verification',
  /** Password reset token */
  RESET: 'reset',
  /** Two-factor authentication token */
  MFA: 'mfa',
  /** API key for service-to-service authentication */
  API_KEY: 'api_key',
  /** Session token for web sessions */
  SESSION: 'session',
  /** Social login token */
  SOCIAL: 'social',
  /** Single Sign-On token */
  SSO: 'sso',
  /** OAuth access token */
  OAUTH: 'oauth',
  /** OAuth refresh token */
  OAUTH_REFRESH: 'oauth_refresh',
  /** Device token for device authentication */
  DEVICE: 'device',
  /** Invitation token for user invitations */
  INVITATION: 'invitation',
  /** Magic link token for passwordless login */
  MAGIC_LINK: 'magic_link',
} as const;

export type TokenType = (typeof TOKEN_TYPES)[keyof typeof TOKEN_TYPES];

/**
 * Token Status
 * Current status of a token
 */
export const TOKEN_STATUS = {
  /** Token is active and valid */
  ACTIVE: 'active',
  /** Token has expired */
  EXPIRED: 'expired',
  /** Token has been revoked */
  REVOKED: 'revoked',
  /** Token is blacklisted */
  BLACKLISTED: 'blacklisted',
  /** Token is pending (not yet activated) */
  PENDING: 'pending',
  /** Token is used (one-time use) */
  USED: 'used',
  /** Token is invalid */
  INVALID: 'invalid',
} as const;

export type TokenStatus = (typeof TOKEN_STATUS)[keyof typeof TOKEN_STATUS];

/**
 * Token Configuration
 * Default configuration values for tokens
 */
export const TOKEN_CONFIG = {
  /** Access token expiry in seconds (15 minutes) */
  ACCESS_EXPIRY: 900,
  /** Refresh token expiry in seconds (7 days) */
  REFRESH_EXPIRY: 604800,
  /** Verification token expiry in seconds (24 hours) */
  VERIFICATION_EXPIRY: 86400,
  /** Reset token expiry in seconds (1 hour) */
  RESET_EXPIRY: 3600,
  /** MFA token expiry in seconds (5 minutes) */
  MFA_EXPIRY: 300,
  /** Magic link expiry in seconds (15 minutes) */
  MAGIC_LINK_EXPIRY: 900,
  /** Invitation token expiry in seconds (7 days) */
  INVITATION_EXPIRY: 604800,
  /** OAuth token expiry in seconds (1 hour) */
  OAUTH_EXPIRY: 3600,
  /** OAuth refresh token expiry in seconds (30 days) */
  OAUTH_REFRESH_EXPIRY: 2592000,
  /** Device token expiry in seconds (30 days) */
  DEVICE_EXPIRY: 2592000,
  /** API key expiry in seconds (365 days) */
  API_KEY_EXPIRY: 31536000,
  /** Token algorithm */
  ALGORITHM: 'HS256' as const,
  /** Token issuer */
  ISSUER: 'vubon.com.bd',
  /** Token audience */
  AUDIENCE: 'vubon-platform',
  /** Token version */
  VERSION: '1.0.0',
} as const;

export type TokenConfig = (typeof TOKEN_CONFIG)[keyof typeof TOKEN_CONFIG];

/**
 * Token Error Messages
 * Error messages for token-related failures
 * Using ERROR_CODE from common/error.constants
 */
export const TOKEN_ERRORS = {
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

export type TokenError = (typeof TOKEN_ERRORS)[keyof typeof TOKEN_ERRORS];

/**
 * Token Success Messages
 * Success messages for token operations
 */
export const TOKEN_SUCCESS = {
  GENERATED: 'Token generated successfully',
  REFRESHED: 'Token refreshed successfully',
  VERIFIED: 'Token verified successfully',
  REVOKED: 'Token revoked successfully',
  VALIDATED: 'Token validated successfully',
} as const;

export type TokenSuccess = (typeof TOKEN_SUCCESS)[keyof typeof TOKEN_SUCCESS];

/**
 * Token Status Messages
 * Human-readable messages for each token status
 */
export const TOKEN_STATUS_MESSAGES: Record<TokenStatus, string> = {
  [TOKEN_STATUS.ACTIVE]: 'Token is active and valid',
  [TOKEN_STATUS.EXPIRED]: 'Token has expired',
  [TOKEN_STATUS.REVOKED]: 'Token has been revoked',
  [TOKEN_STATUS.BLACKLISTED]: 'Token is blacklisted',
  [TOKEN_STATUS.PENDING]: 'Token is pending',
  [TOKEN_STATUS.USED]: 'Token has been used',
  [TOKEN_STATUS.INVALID]: 'Token is invalid',
} as const;

/**
 * Active Token Statuses
 * Statuses that indicate a valid token
 */
export const ACTIVE_TOKEN_STATUSES: TokenStatus[] = [TOKEN_STATUS.ACTIVE] as const;

/**
 * Invalid Token Statuses
 * Statuses that indicate an invalid token
 */
export const INVALID_TOKEN_STATUSES: TokenStatus[] = [
  TOKEN_STATUS.EXPIRED,
  TOKEN_STATUS.REVOKED,
  TOKEN_STATUS.BLACKLISTED,
  TOKEN_STATUS.INVALID,
] as const;

/**
 * Token Types with Expiry
 * Mapping of token types to their default expiry times
 */
export const TOKEN_EXPIRY_MAP: Record<TokenType, number> = {
  [TOKEN_TYPES.ACCESS]: TOKEN_CONFIG.ACCESS_EXPIRY,
  [TOKEN_TYPES.REFRESH]: TOKEN_CONFIG.REFRESH_EXPIRY,
  [TOKEN_TYPES.VERIFICATION]: TOKEN_CONFIG.VERIFICATION_EXPIRY,
  [TOKEN_TYPES.RESET]: TOKEN_CONFIG.RESET_EXPIRY,
  [TOKEN_TYPES.MFA]: TOKEN_CONFIG.MFA_EXPIRY,
  [TOKEN_TYPES.API_KEY]: TOKEN_CONFIG.API_KEY_EXPIRY,
  [TOKEN_TYPES.SESSION]: TOKEN_CONFIG.ACCESS_EXPIRY,
  [TOKEN_TYPES.SOCIAL]: TOKEN_CONFIG.ACCESS_EXPIRY,
  [TOKEN_TYPES.SSO]: TOKEN_CONFIG.ACCESS_EXPIRY,
  [TOKEN_TYPES.OAUTH]: TOKEN_CONFIG.OAUTH_EXPIRY,
  [TOKEN_TYPES.OAUTH_REFRESH]: TOKEN_CONFIG.OAUTH_REFRESH_EXPIRY,
  [TOKEN_TYPES.DEVICE]: TOKEN_CONFIG.DEVICE_EXPIRY,
  [TOKEN_TYPES.INVITATION]: TOKEN_CONFIG.INVITATION_EXPIRY,
  [TOKEN_TYPES.MAGIC_LINK]: TOKEN_CONFIG.MAGIC_LINK_EXPIRY,
} as const;

/**
 * One-Time Use Tokens
 * Token types that can only be used once
 */
export const ONE_TIME_USE_TOKENS: TokenType[] = [
  TOKEN_TYPES.VERIFICATION,
  TOKEN_TYPES.RESET,
  TOKEN_TYPES.MFA,
  TOKEN_TYPES.MAGIC_LINK,
  TOKEN_TYPES.INVITATION,
] as const;

/**
 * Long-Lived Tokens
 * Token types with long expiry times
 */
export const LONG_LIVED_TOKENS: TokenType[] = [
  TOKEN_TYPES.REFRESH,
  TOKEN_TYPES.API_KEY,
  TOKEN_TYPES.DEVICE,
  TOKEN_TYPES.OAUTH_REFRESH,
] as const;

/**
 * Short-Lived Tokens
 * Token types with short expiry times
 */
export const SHORT_LIVED_TOKENS: TokenType[] = [
  TOKEN_TYPES.ACCESS,
  TOKEN_TYPES.MFA,
  TOKEN_TYPES.MAGIC_LINK,
  TOKEN_TYPES.SESSION,
  TOKEN_TYPES.OAUTH,
] as const;

/**
 * Token Headers
 * HTTP headers used for token transmission
 */
export const TOKEN_HEADERS = {
  AUTHORIZATION: 'Authorization',
  BEARER: 'Bearer',
  X_API_KEY: 'X-API-Key',
  X_REFRESH_TOKEN: 'X-Refresh-Token',
  X_DEVICE_TOKEN: 'X-Device-Token',
} as const;

export type TokenHeader = (typeof TOKEN_HEADERS)[keyof typeof TOKEN_HEADERS];

/**
 * Token Claims
 * Standard JWT claims
 */
export const TOKEN_CLAIMS = {
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

export type TokenClaim = (typeof TOKEN_CLAIMS)[keyof typeof TOKEN_CLAIMS];

/**
 * Helper function to check if token status is active
 */
export function isActiveTokenStatus(status: TokenStatus): boolean {
  return ACTIVE_TOKEN_STATUSES.includes(status);
}

/**
 * Helper function to check if token status is invalid
 */
export function isInvalidTokenStatus(status: TokenStatus): boolean {
  return INVALID_TOKEN_STATUSES.includes(status);
}

/**
 * Helper function to check if token is one-time use
 */
export function isOneTimeUseToken(tokenType: TokenType): boolean {
  return ONE_TIME_USE_TOKENS.includes(tokenType);
}

/**
 * Helper function to check if token is long-lived
 */
export function isLongLivedToken(tokenType: TokenType): boolean {
  return LONG_LIVED_TOKENS.includes(tokenType);
}

/**
 * Helper function to check if token is short-lived
 */
export function isShortLivedToken(tokenType: TokenType): boolean {
  return SHORT_LIVED_TOKENS.includes(tokenType);
}

/**
 * Helper function to check if token type is valid
 */
export function isValidTokenType(tokenType: string): tokenType is TokenType {
  return Object.values(TOKEN_TYPES).includes(tokenType as TokenType);
}

/**
 * Helper function to check if token status is valid
 */
export function isValidTokenStatus(status: string): status is TokenStatus {
  return Object.values(TOKEN_STATUS).includes(status as TokenStatus);
}

/**
 * Helper function to get token expiry in seconds
 */
export function getTokenExpiry(tokenType: TokenType): number {
  return TOKEN_EXPIRY_MAP[tokenType] || TOKEN_CONFIG.ACCESS_EXPIRY;
}

/**
 * Helper function to get token status message
 */
export function getTokenStatusMessage(status: TokenStatus): string {
  return TOKEN_STATUS_MESSAGES[status] || 'Unknown token status';
}

/**
 * Helper function to check if token is expired
 */
export function isTokenExpired(createdAt: Date, tokenType: TokenType): boolean {
  const now = Date.now();
  const tokenAge = (now - createdAt.getTime()) / 1000; // Convert to seconds
  const expiry = getTokenExpiry(tokenType);
  return tokenAge >= expiry;
}

/**
 * Helper function to get remaining token time in seconds
 */
export function getTokenRemainingTime(createdAt: Date, tokenType: TokenType): number {
  const now = Date.now();
  const tokenAge = (now - createdAt.getTime()) / 1000;
  const expiry = getTokenExpiry(tokenType);
  const remaining = expiry - tokenAge;
  return Math.max(0, remaining);
}

/**
 * Helper function to format authorization header
 */
export function formatAuthorizationHeader(
  token: string,
  type: 'Bearer' | 'Basic' = 'Bearer'
): string {
  return `${type} ${token}`;
}

/**
 * Helper function to extract token from authorization header
 */
export function extractTokenFromHeader(header: string): string | null {
  const match = header.match(/^Bearer\s+(.+)$/);
  return match ? match[1] : null;
}
