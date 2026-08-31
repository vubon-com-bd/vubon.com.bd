/**
 * Authentication Token Schema
 * Zod schemas for token management, generation, and validation
 */

import { z } from 'zod';
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
  type AuthTokenType,
  type AuthTokenStatus,
} from '@vubon/shared-constants';
import {
  idSchema,
  uuidSchema,
  timestampSchema,
  jsonObjectSchema,
} from '../common/core-primitives.schema';

// ============================================================
// AUTH TOKEN TYPE & STATUS SCHEMAS
// ============================================================

/**
 * Auth token type schema
 */
export const authTokenTypeSchema = z.enum([
  AUTH_TOKEN_TYPES.ACCESS,
  AUTH_TOKEN_TYPES.REFRESH,
  AUTH_TOKEN_TYPES.VERIFICATION,
  AUTH_TOKEN_TYPES.RESET,
  AUTH_TOKEN_TYPES.MFA,
  AUTH_TOKEN_TYPES.API_KEY,
  AUTH_TOKEN_TYPES.SESSION,
  AUTH_TOKEN_TYPES.SOCIAL,
  AUTH_TOKEN_TYPES.SSO,
  AUTH_TOKEN_TYPES.OAUTH,
  AUTH_TOKEN_TYPES.OAUTH_REFRESH,
  AUTH_TOKEN_TYPES.DEVICE,
  AUTH_TOKEN_TYPES.INVITATION,
  AUTH_TOKEN_TYPES.MAGIC_LINK,
]);

/**
 * Auth token status schema
 */
export const authTokenStatusSchema = z.enum([
  AUTH_TOKEN_STATUS.ACTIVE,
  AUTH_TOKEN_STATUS.EXPIRED,
  AUTH_TOKEN_STATUS.REVOKED,
  AUTH_TOKEN_STATUS.BLACKLISTED,
  AUTH_TOKEN_STATUS.PENDING,
  AUTH_TOKEN_STATUS.USED,
  AUTH_TOKEN_STATUS.INVALID,
]);

// ============================================================
// AUTH TOKEN PAYLOAD SCHEMAS
// ============================================================

/**
 * Base token payload schema
 */
export const authTokenPayloadSchema = z
  .object({
    type: authTokenTypeSchema,
    userId: idSchema,
    jti: uuidSchema,
    iss: z.string().min(1),
    aud: z.string().min(1),
    iat: z.number().int().min(0),
    exp: z.number().int().min(0),
    nbf: z.number().int().min(0).optional(),
    role: z.string().optional(),
    permissions: z.array(z.string()).optional(),
    deviceId: idSchema.optional(),
    sessionId: idSchema.optional(),
    ipAddress: z.string().ip().optional(),
    userAgent: z.string().optional(),
  })
  .catchall(z.unknown());

/**
 * Access token payload schema
 */
export const authAccessTokenPayloadSchema = authTokenPayloadSchema.extend({
  type: z.literal(AUTH_TOKEN_TYPES.ACCESS),
  apiAccess: z.boolean().default(true),
});

/**
 * Refresh token payload schema
 */
export const authRefreshTokenPayloadSchema = authTokenPayloadSchema.extend({
  type: z.literal(AUTH_TOKEN_TYPES.REFRESH),
  parentTokenId: uuidSchema.optional(),
});

/**
 * Verification token payload schema
 */
export const authVerificationTokenPayloadSchema = authTokenPayloadSchema.extend({
  type: z.literal(AUTH_TOKEN_TYPES.VERIFICATION),
  verificationType: z.string().min(1),
  target: z.string().min(1),
});

/**
 * Reset token payload schema
 */
export const authResetTokenPayloadSchema = authTokenPayloadSchema.extend({
  type: z.literal(AUTH_TOKEN_TYPES.RESET),
  resetType: z.string().min(1),
});

/**
 * MFA token payload schema
 */
export const authMfaTokenPayloadSchema = authTokenPayloadSchema.extend({
  type: z.literal(AUTH_TOKEN_TYPES.MFA),
  mfaMethod: z.string().min(1),
  mfaSessionId: z.string().min(1),
});

// ============================================================
// AUTH TOKEN RECORD SCHEMA
// ============================================================

/**
 * Auth token record schema
 */
export const authTokenRecordSchema = z.object({
  id: idSchema,
  jti: uuidSchema,
  userId: idSchema,
  type: authTokenTypeSchema,
  status: authTokenStatusSchema,
  tokenHash: z.string().min(1),
  refreshTokenHash: z.string().optional(),
  expiresAt: timestampSchema,
  refreshExpiresAt: timestampSchema.optional(),
  issuedAt: timestampSchema,
  revokedAt: timestampSchema.optional(),
  deviceId: idSchema.optional(),
  sessionId: idSchema.optional(),
  ipAddress: z.string().ip().optional(),
  userAgent: z.string().optional(),
  isOneTimeUse: z.boolean().default(false),
  isActive: z.boolean().default(true),
  metadata: jsonObjectSchema.optional(),
});

// ============================================================
// AUTH TOKEN REQUEST SCHEMAS
// ============================================================

/**
 * Auth token generation request schema
 */
export const authTokenGenerateRequestSchema = z.object({
  userId: idSchema,
  type: authTokenTypeSchema,
  deviceId: idSchema.optional(),
  sessionId: idSchema.optional(),
  ipAddress: z.string().ip().optional(),
  userAgent: z.string().optional(),
  customExpiry: z.number().int().positive().optional(),
  claims: jsonObjectSchema.optional(),
});

/**
 * Auth token refresh request schema
 */
export const authTokenRefreshRequestSchema = z.object({
  refreshToken: z.string().min(1),
  deviceId: idSchema.optional(),
  sessionId: idSchema.optional(),
  ipAddress: z.string().ip().optional(),
  userAgent: z.string().optional(),
});

/**
 * Auth token verification request schema
 */
export const authTokenVerifyRequestSchema = z.object({
  token: z.string().min(1),
  expectedType: authTokenTypeSchema.optional(),
  expectedUserId: idSchema.optional(),
  expectedDeviceId: idSchema.optional(),
  expectedSessionId: idSchema.optional(),
});

// ============================================================
// AUTH TOKEN RESPONSE SCHEMAS
// ============================================================

/**
 * Auth token response schema
 */
export const authTokenResponseSchema = z.object({
  success: z.boolean(),
  accessToken: z.string().optional(),
  refreshToken: z.string().optional(),
  tokenType: authTokenTypeSchema.optional(),
  expiresIn: z.number().int().min(0).optional(),
  refreshExpiresIn: z.number().int().min(0).optional(),
  record: authTokenRecordSchema.optional(),
  error: z.string().optional(),
});

/**
 * Auth token verification response schema
 */
export const authTokenVerifyResponseSchema = z.object({
  isValid: z.boolean(),
  status: authTokenStatusSchema,
  payload: authTokenPayloadSchema.optional(),
  record: authTokenRecordSchema.optional(),
  error: z.string().optional(),
  needsRefresh: z.boolean().optional(),
});

// ============================================================
// AUTH TOKEN FILTER SCHEMA
// ============================================================

/**
 * Auth token filter schema
 */
export const authTokenFilterSchema = z.object({
  userId: idSchema.optional(),
  type: z.union([authTokenTypeSchema, z.array(authTokenTypeSchema)]).optional(),
  status: z.union([authTokenStatusSchema, z.array(authTokenStatusSchema)]).optional(),
  deviceId: idSchema.optional(),
  sessionId: idSchema.optional(),
  activeOnly: z.boolean().optional(),
  oneTimeUseOnly: z.boolean().optional(),
  issuedDateRange: z
    .object({
      start: z.date().optional(),
      end: z.date().optional(),
    })
    .optional(),
});

// ============================================================
// AUTH TOKEN SUMMARY SCHEMA
// ============================================================

/**
 * Auth token summary schema
 */
export const authTokenSummarySchema = z.object({
  userId: idSchema,
  totalTokens: z.number().int().min(0),
  activeTokens: z.number().int().min(0),
  expiredTokens: z.number().int().min(0),
  revokedTokens: z.number().int().min(0),
  tokensByType: z.record(authTokenTypeSchema, z.number().int().min(0)),
  tokensByStatus: z.record(authTokenStatusSchema, z.number().int().min(0)),
  currentAccessToken: authTokenRecordSchema.optional(),
  tokens: z.array(authTokenRecordSchema),
});

// ============================================================
// AUTH TOKEN CONFIG SCHEMA
// ============================================================

/**
 * Auth token config schema
 */
export const authTokenConfigSchema = z.object({
  accessExpiry: z.number().int().positive().default(AUTH_TOKEN_CONFIG.ACCESS_EXPIRY),
  refreshExpiry: z.number().int().positive().default(AUTH_TOKEN_CONFIG.REFRESH_EXPIRY),
  verificationExpiry: z.number().int().positive().default(AUTH_TOKEN_CONFIG.VERIFICATION_EXPIRY),
  resetExpiry: z.number().int().positive().default(AUTH_TOKEN_CONFIG.RESET_EXPIRY),
  mfaExpiry: z.number().int().positive().default(AUTH_TOKEN_CONFIG.MFA_EXPIRY),
  magicLinkExpiry: z.number().int().positive().default(AUTH_TOKEN_CONFIG.MAGIC_LINK_EXPIRY),
  invitationExpiry: z.number().int().positive().default(AUTH_TOKEN_CONFIG.INVITATION_EXPIRY),
  oauthExpiry: z.number().int().positive().default(AUTH_TOKEN_CONFIG.OAUTH_EXPIRY),
  oauthRefreshExpiry: z.number().int().positive().default(AUTH_TOKEN_CONFIG.OAUTH_REFRESH_EXPIRY),
  deviceExpiry: z.number().int().positive().default(AUTH_TOKEN_CONFIG.DEVICE_EXPIRY),
  apiKeyExpiry: z.number().int().positive().default(AUTH_TOKEN_CONFIG.API_KEY_EXPIRY),
  algorithm: z
    .enum(['HS256', 'HS384', 'HS512', 'RS256', 'RS384', 'RS512', 'ES256', 'ES384', 'ES512'])
    .default(AUTH_TOKEN_CONFIG.ALGORITHM),
  issuer: z.string().default(AUTH_TOKEN_CONFIG.ISSUER),
  audience: z.string().default(AUTH_TOKEN_CONFIG.AUDIENCE),
  version: z.string().default(AUTH_TOKEN_CONFIG.VERSION),
});

// ============================================================
// AUTH TOKEN HEADER SCHEMA
// ============================================================

/**
 * Auth token HTTP header schema
 */
export const authTokenHttpHeaderSchema = z.object({
  authorization: z.string().optional(),
  xApiKey: z.string().optional(),
  xRefreshToken: z.string().optional(),
  xDeviceToken: z.string().optional(),
});

// ============================================================
// TYPE INFERENCES (Zod থেকে টাইপ বের করা)
// ============================================================

export type AuthTokenPayload = z.infer<typeof authTokenPayloadSchema>;
export type AuthAccessTokenPayload = z.infer<typeof authAccessTokenPayloadSchema>;
export type AuthRefreshTokenPayload = z.infer<typeof authRefreshTokenPayloadSchema>;
export type AuthVerificationTokenPayload = z.infer<typeof authVerificationTokenPayloadSchema>;
export type AuthResetTokenPayload = z.infer<typeof authResetTokenPayloadSchema>;
export type AuthMfaTokenPayload = z.infer<typeof authMfaTokenPayloadSchema>;
export type AuthTokenRecord = z.infer<typeof authTokenRecordSchema>;
export type AuthTokenGenerateRequest = z.infer<typeof authTokenGenerateRequestSchema>;
export type AuthTokenRefreshRequest = z.infer<typeof authTokenRefreshRequestSchema>;
export type AuthTokenVerifyRequest = z.infer<typeof authTokenVerifyRequestSchema>;
export type AuthTokenResponse = z.infer<typeof authTokenResponseSchema>;
export type AuthTokenVerifyResponse = z.infer<typeof authTokenVerifyResponseSchema>;
export type AuthTokenFilter = z.infer<typeof authTokenFilterSchema>;
export type AuthTokenSummary = z.infer<typeof authTokenSummarySchema>;
export type AuthTokenConfig = z.infer<typeof authTokenConfigSchema>;
export type AuthTokenHttpHeader = z.infer<typeof authTokenHttpHeaderSchema>;

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
 * Get token type label
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
 * Get token status label
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
 * Get token status message
 */
export function getAuthTokenStatusMessage(status: AuthTokenStatus): string {
  const messages: Record<AuthTokenStatus, string> = {
    active: 'Token is active and valid',
    expired: 'Token has expired',
    revoked: 'Token has been revoked',
    blacklisted: 'Token is blacklisted',
    pending: 'Token is pending',
    used: 'Token has been used',
    invalid: 'Token is invalid',
  };
  return messages[status] || 'Unknown token status';
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
export function generateAuthTokenJti(): string {
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
 * Create token HTTP header
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
 * Validate token HTTP header
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
