/**
 * Authentication Token Types
 * Types for token management, generation, and validation
 */

import type { AuthTokenType, AuthTokenStatus } from '@vubon/shared-constants';
import {
  AUTH_TOKEN_TYPES,
  AUTH_TOKEN_STATUS,
  AUTH_TOKEN_CONFIG,
  AUTH_TOKEN_EXPIRY_MAP,
  ONE_TIME_USE_AUTH_TOKENS,
  LONG_LIVED_AUTH_TOKENS,
  SHORT_LIVED_AUTH_TOKENS,
  ACTIVE_AUTH_TOKEN_STATUSES,
  INVALID_AUTH_TOKEN_STATUSES,
  AUTH_TOKEN_HEADERS,
  AUTH_TOKEN_CLAIMS,
} from '@vubon/shared-constants';
import type { ID, Timestamp, UUID } from '../common/core-primitives.types';

// ============================================================
// TOKEN PAYLOAD
// ============================================================

/**
 * Base token payload
 */
export interface AuthTokenPayload {
  /** Token type */
  type: AuthTokenType;
  /** User ID (subject) */
  userId: ID;
  /** Token ID (JTI) */
  jti: UUID;
  /** Issuer */
  iss: string;
  /** Audience */
  aud: string;
  /** Issued at timestamp */
  iat: number;
  /** Expiration timestamp */
  exp: number;
  /** Not before timestamp */
  nbf?: number;
  /** User role */
  role?: string;
  /** User permissions */
  permissions?: string[];
  /** Device ID */
  deviceId?: ID;
  /** Session ID */
  sessionId?: ID;
  /** IP address */
  ipAddress?: string;
  /** User agent */
  userAgent?: string;
  /** Additional claims */
  [key: string]: unknown;
}

/**
 * Access token payload
 */
export interface AuthAccessTokenPayload extends AuthTokenPayload {
  type: typeof AUTH_TOKEN_TYPES.ACCESS;
  /** Whether token can be used for API access */
  apiAccess: boolean;
}

/**
 * Refresh token payload
 */
export interface AuthRefreshTokenPayload extends AuthTokenPayload {
  type: typeof AUTH_TOKEN_TYPES.REFRESH;
  /** Parent access token ID (if any) */
  parentTokenId?: UUID;
}

/**
 * Verification token payload
 */
export interface AuthVerificationTokenPayload extends AuthTokenPayload {
  type: typeof AUTH_TOKEN_TYPES.VERIFICATION;
  /** Verification type (email, phone, etc.) */
  verificationType: string;
  /** Target (email, phone, etc.) */
  target: string;
}

/**
 * Reset token payload
 */
export interface AuthResetTokenPayload extends AuthTokenPayload {
  type: typeof AUTH_TOKEN_TYPES.RESET;
  /** Reset type (password, etc.) */
  resetType: string;
}

/**
 * MFA token payload
 */
export interface AuthMfaTokenPayload extends AuthTokenPayload {
  type: typeof AUTH_TOKEN_TYPES.MFA;
  /** MFA method */
  mfaMethod: string;
  /** MFA session ID */
  mfaSessionId: string;
}

// ============================================================
// TOKEN RECORD
// ============================================================

/**
 * Token record (stored in database)
 */
export interface AuthTokenRecord {
  /** Unique token ID */
  id: ID;
  /** Token ID (JTI) */
  jti: UUID;
  /** User ID */
  userId: ID;
  /** Token type */
  type: AuthTokenType;
  /** Token status */
  status: AuthTokenStatus;
  /** Token hash (for verification) */
  tokenHash: string;
  /** Refresh token hash (if applicable) */
  refreshTokenHash?: string;
  /** Token expiry timestamp */
  expiresAt: Timestamp;
  /** Refresh token expiry timestamp (if applicable) */
  refreshExpiresAt?: Timestamp;
  /** Token issued at timestamp */
  issuedAt: Timestamp;
  /** Token revoked at timestamp (if applicable) */
  revokedAt?: Timestamp;
  /** Device ID (if applicable) */
  deviceId?: ID;
  /** Session ID (if applicable) */
  sessionId?: ID;
  /** IP address (if applicable) */
  ipAddress?: string;
  /** User agent (if applicable) */
  userAgent?: string;
  /** Whether token is one-time use */
  isOneTimeUse: boolean;
  /** Whether token is active */
  isActive: boolean;
  /** Additional metadata */
  metadata?: Record<string, unknown>;
}

// ============================================================
// TOKEN REQUEST
// ============================================================

/**
 * Token generation request
 */
export interface AuthTokenGenerateRequest {
  /** User ID */
  userId: ID;
  /** Token type */
  type: AuthTokenType;
  /** Device ID (if applicable) */
  deviceId?: ID;
  /** Session ID (if applicable) */
  sessionId?: ID;
  /** IP address (if applicable) */
  ipAddress?: string;
  /** User agent (if applicable) */
  userAgent?: string;
  /** Custom expiry in seconds */
  customExpiry?: number;
  /** Additional claims */
  claims?: Record<string, unknown>;
}

/**
 * Token refresh request
 */
export interface AuthTokenRefreshRequest {
  /** Refresh token */
  refreshToken: string;
  /** Device ID (if applicable) */
  deviceId?: ID;
  /** Session ID (if applicable) */
  sessionId?: ID;
  /** IP address (if applicable) */
  ipAddress?: string;
  /** User agent (if applicable) */
  userAgent?: string;
}

/**
 * Token verification request
 */
export interface AuthTokenVerifyRequest {
  /** Token to verify */
  token: string;
  /** Expected token type (optional) */
  expectedType?: AuthTokenType;
  /** Expected user ID (optional) */
  expectedUserId?: ID;
  /** Expected device ID (optional) */
  expectedDeviceId?: ID;
  /** Expected session ID (optional) */
  expectedSessionId?: ID;
}

// ============================================================
// TOKEN RESPONSE
// ============================================================

/**
 * Token generation response
 */
export interface AuthTokenResponse {
  /** Whether the operation was successful */
  success: boolean;
  /** Access token (if applicable) */
  accessToken?: string;
  /** Refresh token (if applicable) */
  refreshToken?: string;
  /** Token type */
  tokenType?: AuthTokenType;
  /** Token expiry in seconds */
  expiresIn?: number;
  /** Refresh token expiry in seconds */
  refreshExpiresIn?: number;
  /** Token record (if applicable) */
  record?: AuthTokenRecord;
  /** Error message if failed */
  error?: string;
}

/**
 * Token verification response
 */
export interface AuthTokenVerifyResponse {
  /** Whether the token is valid */
  isValid: boolean;
  /** Token status */
  status: AuthTokenStatus;
  /** Token payload (if valid) */
  payload?: AuthTokenPayload;
  /** Token record (if found) */
  record?: AuthTokenRecord;
  /** Error message if invalid */
  error?: string;
  /** Whether token needs refresh */
  needsRefresh?: boolean;
}

// ============================================================
// TOKEN FILTER
// ============================================================

/**
 * Filter for querying tokens
 */
export interface AuthTokenFilter {
  /** Filter by user ID */
  userId?: ID;
  /** Filter by token type */
  type?: AuthTokenType | AuthTokenType[];
  /** Filter by status */
  status?: AuthTokenStatus | AuthTokenStatus[];
  /** Filter by device ID */
  deviceId?: ID;
  /** Filter by session ID */
  sessionId?: ID;
  /** Filter by active tokens only */
  activeOnly?: boolean;
  /** Filter by one-time use tokens */
  oneTimeUseOnly?: boolean;
  /** Filter by date range (issued) */
  issuedDateRange?: {
    start?: Date;
    end?: Date;
  };
}

// ============================================================
// TOKEN SUMMARY
// ============================================================

/**
 * Token summary for a user
 */
export interface AuthTokenSummary {
  /** User ID */
  userId: ID;
  /** Total tokens */
  totalTokens: number;
  /** Active tokens */
  activeTokens: number;
  /** Expired tokens */
  expiredTokens: number;
  /** Revoked tokens */
  revokedTokens: number;
  /** Tokens by type */
  tokensByType: Record<AuthTokenType, number>;
  /** Tokens by status */
  tokensByStatus: Record<AuthTokenStatus, number>;
  /** Current access token (if any) */
  currentAccessToken?: AuthTokenRecord;
  /** Active tokens */
  tokens: AuthTokenRecord[];
}

// ============================================================
// TOKEN CONFIG
// ============================================================

/**
 * Token configuration
 */
export interface AuthTokenConfig {
  /** Access token expiry in seconds */
  accessExpiry: number;
  /** Refresh token expiry in seconds */
  refreshExpiry: number;
  /** Verification token expiry in seconds */
  verificationExpiry: number;
  /** Reset token expiry in seconds */
  resetExpiry: number;
  /** MFA token expiry in seconds */
  mfaExpiry: number;
  /** Magic link expiry in seconds */
  magicLinkExpiry: number;
  /** Invitation expiry in seconds */
  invitationExpiry: number;
  /** OAuth token expiry in seconds */
  oauthExpiry: number;
  /** OAuth refresh token expiry in seconds */
  oauthRefreshExpiry: number;
  /** Device token expiry in seconds */
  deviceExpiry: number;
  /** API key expiry in seconds */
  apiKeyExpiry: number;
  /** Token algorithm */
  algorithm:
    'HS256' | 'HS384' | 'HS512' | 'RS256' | 'RS384' | 'RS512' | 'ES256' | 'ES384' | 'ES512';
  /** Token issuer */
  issuer: string;
  /** Token audience */
  audience: string;
  /** Token version */
  version: string;
}

// ============================================================
// TOKEN HEADER (HTTP)
// ============================================================

/**
 * Token header from HTTP request
 */
export interface AuthTokenHttpHeader {
  /** Authorization header value */
  authorization?: string;
  /** API key header value */
  xApiKey?: string;
  /** Refresh token header value */
  xRefreshToken?: string;
  /** Device token header value */
  xDeviceToken?: string;
}

// ============================================================
// HELPER FUNCTIONS
// ============================================================

/**
 * Check if token type is valid
 */
export function isValidAuthTokenType(type: string): type is AuthTokenType {
  return Object.values(AUTH_TOKEN_TYPES).includes(type as AuthTokenType);
}

/**
 * Check if token status is valid
 */
export function isValidAuthTokenStatus(status: string): status is AuthTokenStatus {
  return Object.values(AUTH_TOKEN_STATUS).includes(status as AuthTokenStatus);
}

/**
 * Check if token is active
 */
export function isAuthTokenActive(status: AuthTokenStatus): boolean {
  return ACTIVE_AUTH_TOKEN_STATUSES.includes(status);
}

/**
 * Check if token is invalid
 */
export function isAuthTokenInvalid(status: AuthTokenStatus): boolean {
  return INVALID_AUTH_TOKEN_STATUSES.includes(status);
}

/**
 * Check if token is one-time use
 */
export function isAuthTokenOneTimeUse(type: AuthTokenType): boolean {
  return ONE_TIME_USE_AUTH_TOKENS.includes(type);
}

/**
 * Check if token is long-lived
 */
export function isAuthTokenLongLived(type: AuthTokenType): boolean {
  return LONG_LIVED_AUTH_TOKENS.includes(type);
}

/**
 * Check if token is short-lived
 */
export function isAuthTokenShortLived(type: AuthTokenType): boolean {
  return SHORT_LIVED_AUTH_TOKENS.includes(type);
}

/**
 * Get token expiry in seconds
 */
export function getAuthTokenExpiry(type: AuthTokenType): number {
  return AUTH_TOKEN_EXPIRY_MAP[type] || AUTH_TOKEN_CONFIG.ACCESS_EXPIRY;
}

/**
 * Check if token has expired
 */
export function isAuthTokenExpired(issuedAt: Date, type: AuthTokenType): boolean {
  const now = Date.now();
  const tokenAge = (now - issuedAt.getTime()) / 1000;
  const expiry = getAuthTokenExpiry(type);
  return tokenAge >= expiry;
}

/**
 * Get remaining token time in seconds
 */
export function getAuthTokenRemainingTime(issuedAt: Date, type: AuthTokenType): number {
  const now = Date.now();
  const tokenAge = (now - issuedAt.getTime()) / 1000;
  const expiry = getAuthTokenExpiry(type);
  const remaining = expiry - tokenAge;
  return Math.max(0, remaining);
}

/**
 * Get human-readable label for token type
 */
export function getAuthTokenTypeLabel(type: AuthTokenType): string {
  const labels: Record<AuthTokenType, string> = {
    access: 'Access Token',
    refresh: 'Refresh Token',
    verification: 'Verification Token',
    reset: 'Reset Token',
    mfa: 'MFA Token',
    api_key: 'API Key',
    session: 'Session Token',
    social: 'Social Token',
    sso: 'SSO Token',
    oauth: 'OAuth Token',
    oauth_refresh: 'OAuth Refresh Token',
    device: 'Device Token',
    invitation: 'Invitation Token',
    magic_link: 'Magic Link',
  };
  return labels[type] || 'Unknown Token Type';
}

/**
 * Get human-readable label for token status
 */
export function getAuthTokenStatusLabel(status: AuthTokenStatus): string {
  const labels: Record<AuthTokenStatus, string> = {
    active: 'Active',
    expired: 'Expired',
    revoked: 'Revoked',
    blacklisted: 'Blacklisted',
    pending: 'Pending',
    used: 'Used',
    invalid: 'Invalid',
  };
  return labels[status] || 'Unknown Status';
}

/**
 * Format token for authorization header
 */
export function formatAuthAuthorizationHeader(
  token: string,
  type: 'Bearer' | 'Basic' = 'Bearer'
): string {
  return `${type} ${token}`;
}

/**
 * Extract token from authorization header
 */
export function extractAuthTokenFromHeader(header: string): string | null {
  const match = header.match(/^Bearer\s+(.+)$/);
  return match ? match[1] : null;
}

/**
 * Generate token JTI (JWT ID)
 */
export function generateAuthTokenJti(): UUID {
  return crypto.randomUUID();
}

/**
 * Create token config
 */
export function createAuthTokenConfig(overrides?: Partial<AuthTokenConfig>): AuthTokenConfig {
  return {
    accessExpiry: AUTH_TOKEN_CONFIG.ACCESS_EXPIRY,
    refreshExpiry: AUTH_TOKEN_CONFIG.REFRESH_EXPIRY,
    verificationExpiry: AUTH_TOKEN_CONFIG.VERIFICATION_EXPIRY,
    resetExpiry: AUTH_TOKEN_CONFIG.RESET_EXPIRY,
    mfaExpiry: AUTH_TOKEN_CONFIG.MFA_EXPIRY,
    magicLinkExpiry: AUTH_TOKEN_CONFIG.MAGIC_LINK_EXPIRY,
    invitationExpiry: AUTH_TOKEN_CONFIG.INVITATION_EXPIRY,
    oauthExpiry: AUTH_TOKEN_CONFIG.OAUTH_EXPIRY,
    oauthRefreshExpiry: AUTH_TOKEN_CONFIG.OAUTH_REFRESH_EXPIRY,
    deviceExpiry: AUTH_TOKEN_CONFIG.DEVICE_EXPIRY,
    apiKeyExpiry: AUTH_TOKEN_CONFIG.API_KEY_EXPIRY,
    algorithm: AUTH_TOKEN_CONFIG.ALGORITHM,
    issuer: AUTH_TOKEN_CONFIG.ISSUER,
    audience: AUTH_TOKEN_CONFIG.AUDIENCE,
    version: AUTH_TOKEN_CONFIG.VERSION,
    ...overrides,
  };
}

/**
 * Get token header for HTTP request
 */
export function createAuthTokenHttpHeader(
  token?: string,
  apiKey?: string,
  refreshToken?: string,
  deviceToken?: string
): AuthTokenHttpHeader {
  const header: AuthTokenHttpHeader = {};
  if (token) header.authorization = formatAuthAuthorizationHeader(token);
  if (apiKey) header.xApiKey = apiKey;
  if (refreshToken) header.xRefreshToken = refreshToken;
  if (deviceToken) header.xDeviceToken = deviceToken;
  return header;
}

/**
 * Get standard token claims
 */
export function getAuthStandardTokenClaims(): string[] {
  return [
    AUTH_TOKEN_CLAIMS.ISSUER,
    AUTH_TOKEN_CLAIMS.SUBJECT,
    AUTH_TOKEN_CLAIMS.AUDIENCE,
    AUTH_TOKEN_CLAIMS.EXPIRATION,
    AUTH_TOKEN_CLAIMS.NOT_BEFORE,
    AUTH_TOKEN_CLAIMS.ISSUED_AT,
    AUTH_TOKEN_CLAIMS.JWT_ID,
  ];
}

/**
 * Get token type from claim
 */
export function getAuthTokenTypeFromClaim(tokenType: string): AuthTokenType | null {
  const validTypes = Object.values(AUTH_TOKEN_TYPES);
  if (validTypes.includes(tokenType as AuthTokenType)) {
    return tokenType as AuthTokenType;
  }
  return null;
}

/**
 * Validate token header
 */
export function validateAuthTokenHttpHeader(header: AuthTokenHttpHeader): {
  hasValidAuth: boolean;
  hasApiKey: boolean;
  hasRefreshToken: boolean;
} {
  return {
    hasValidAuth: !!(header.authorization && extractAuthTokenFromHeader(header.authorization)),
    hasApiKey: !!header.xApiKey,
    hasRefreshToken: !!header.xRefreshToken,
  };
}

/**
 * Get all available token headers
 */
export function getAuthTokenHeaders(): string[] {
  return [
    AUTH_TOKEN_HEADERS.AUTHORIZATION,
    AUTH_TOKEN_HEADERS.BEARER,
    AUTH_TOKEN_HEADERS.X_API_KEY,
    AUTH_TOKEN_HEADERS.X_REFRESH_TOKEN,
    AUTH_TOKEN_HEADERS.X_DEVICE_TOKEN,
  ];
}

/**
 * Check if header is a token header
 */
export function isAuthTokenHeader(header: string): boolean {
  const tokenHeaders = [
    AUTH_TOKEN_HEADERS.AUTHORIZATION,
    AUTH_TOKEN_HEADERS.BEARER,
    AUTH_TOKEN_HEADERS.X_API_KEY,
    AUTH_TOKEN_HEADERS.X_REFRESH_TOKEN,
    AUTH_TOKEN_HEADERS.X_DEVICE_TOKEN,
  ];
  return tokenHeaders.includes(header as (typeof tokenHeaders)[number]);
}
