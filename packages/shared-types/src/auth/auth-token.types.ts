/**
 * Authentication Token Types
 * Token management data types
 */

import type { TokenType, TokenStatus, TokenClaim } from '@vubon/shared-constants';

import type { ID, Timestamp } from '../common/core-primitives.types';
import type { AuthUser } from './auth.types';

/**
 * Token Data
 * Complete token information
 */
export interface TokenData {
  /** Token unique identifier (JTI) */
  id: ID;
  /** Token value (actual token string) */
  value: string;
  /** Token type */
  type: TokenType;
  /** Current token status */
  status: TokenStatus;
  /** User ID associated with the token */
  userId: ID;
  /** Token creation timestamp */
  createdAt: Timestamp;
  /** Token expiry timestamp */
  expiresAt: Timestamp;
  /** Token last used timestamp */
  lastUsedAt?: Timestamp;
  /** Token issuer */
  issuer: string;
  /** Token audience */
  audience: string;
  /** Token scopes (optional) */
  scopes?: string[];
  /** Token metadata (optional) */
  metadata?: Record<string, unknown>;
}

/**
 * Token Payload
 * Data encoded within a token
 * Uses TokenClaim for standard JWT claims
 */
export interface TokenPayload {
  /** Subject (user ID) - maps to TokenClaim.SUBJECT */
  sub: ID;
  /** Issuer - maps to TokenClaim.ISSUER */
  iss: string;
  /** Audience - maps to TokenClaim.AUDIENCE */
  aud: string;
  /** Expiration timestamp - maps to TokenClaim.EXPIRATION */
  exp: number;
  /** Not before timestamp - maps to TokenClaim.NOT_BEFORE */
  nbf?: number;
  /** Issued at timestamp - maps to TokenClaim.ISSUED_AT */
  iat: number;
  /** JWT ID - maps to TokenClaim.JWT_ID */
  jti: string;
  /** Token type - maps to TokenClaim.TOKEN_TYPE */
  type: TokenType;
  /** User role - maps to TokenClaim.ROLE */
  role?: string;
  /** User permissions - maps to TokenClaim.PERMISSIONS */
  permissions?: string[];
  /** Device ID - maps to TokenClaim.DEVICE_ID */
  deviceId?: ID;
  /** Session ID - maps to TokenClaim.SESSION_ID */
  sessionId?: ID;
  /** IP address - maps to TokenClaim.IP_ADDRESS */
  ipAddress?: string;
  /** User agent - maps to TokenClaim.USER_AGENT */
  userAgent?: string;
  /** Additional claims */
  [key: string]: unknown;
}

/**
 * Token Claims Map
 * Type-safe mapping of token claims using TokenClaim
 */
export type TokenClaimsMap = {
  [K in TokenClaim]?: string | number | boolean | unknown;
};

/**
 * Token Generation Request
 * Data required to generate a new token
 */
export interface TokenGenerationRequest {
  /** User ID */
  userId: ID;
  /** Token type */
  type: TokenType;
  /** Token expiry in seconds (optional) */
  expiresIn?: number;
  /** Token claims (optional) - uses TokenClaim keys */
  claims?: Partial<TokenClaimsMap>;
  /** Token scopes (optional) */
  scopes?: string[];
  /** Device ID (optional) */
  deviceId?: ID;
  /** Session ID (optional) */
  sessionId?: ID;
  /** IP address (optional) */
  ipAddress?: string;
  /** User agent (optional) */
  userAgent?: string;
}

/**
 * Token Validation Request
 * Data required to validate a token
 */
export interface TokenValidationRequest {
  /** Token value */
  token: string;
  /** Expected token type */
  expectedType?: TokenType;
  /** Expected audience (optional) */
  audience?: string;
  /** Expected issuer (optional) */
  issuer?: string;
  /** Validate token status */
  validateStatus?: boolean;
  /** Validate expiration */
  validateExpiry?: boolean;
  /** Additional claims to validate */
  requiredClaims?: TokenClaim[];
}

/**
 * Token Validation Result
 * Result of token validation
 */
export interface TokenValidationResult {
  /** Is token valid */
  isValid: boolean;
  /** Token status */
  status: TokenStatus;
  /** Token payload (if valid) */
  payload?: TokenPayload;
  /** Token data (if valid) */
  token?: TokenData;
  /** User data (if valid) */
  user?: AuthUser;
  /** Validation error message */
  error?: string;
  /** Validation error code */
  errorCode?: string;
  /** Validated claims */
  validatedClaims?: TokenClaim[];
}

/**
 * Token Refresh Request
 * Data required to refresh a token
 */
export interface TokenRefreshRequest {
  /** Refresh token value */
  refreshToken: string;
  /** Device ID (optional) */
  deviceId?: ID;
  /** Session ID (optional) */
  sessionId?: ID;
  /** IP address (optional) */
  ipAddress?: string;
  /** User agent (optional) */
  userAgent?: string;
}

/**
 * Token Refresh Result
 * Result of token refresh
 */
export interface TokenRefreshResult {
  /** New access token */
  accessToken: string;
  /** New refresh token (if rotation enabled) */
  refreshToken?: string;
  /** Token expiry in seconds */
  expiresIn: number;
  /** Token type */
  tokenType: string;
  /** User data */
  user: AuthUser;
}

/**
 * Token Revocation Request
 * Data required to revoke a token
 */
export interface TokenRevocationRequest {
  /** Token value */
  token: string;
  /** Token type (optional) */
  type?: TokenType;
  /** User ID (optional) */
  userId?: ID;
  /** Revocation reason */
  reason?: string;
  /** Force revocation */
  force?: boolean;
}

/**
 * Token Revocation Result
 * Result of token revocation
 */
export interface TokenRevocationResult {
  /** Is token revoked */
  revoked: boolean;
  /** Revocation timestamp */
  revokedAt: Timestamp;
  /** Revocation reason */
  reason?: string;
  /** Message */
  message: string;
}

/**
 * Token Blacklist Entry
 * Blacklisted token information
 */
export interface TokenBlacklistEntry {
  /** Token ID (JTI) */
  id: ID;
  /** Token value (hashed) */
  tokenHash: string;
  /** Token type */
  type: TokenType;
  /** User ID */
  userId: ID;
  /** Blacklist reason */
  reason: string;
  /** Blacklist timestamp */
  blacklistedAt: Timestamp;
  /** Token expiry timestamp */
  expiresAt: Timestamp;
}

/**
 * Token Statistics
 * Token usage statistics
 */
export interface TokenStatistics {
  /** Total tokens generated */
  totalGenerated: number;
  /** Total tokens active */
  totalActive: number;
  /** Total tokens expired */
  totalExpired: number;
  /** Total tokens revoked */
  totalRevoked: number;
  /** Active by type */
  activeByType: Record<TokenType, number>;
  /** Average token lifetime in seconds */
  averageLifetime: number;
  /** Most used token type */
  mostUsedType: TokenType;
  /** Token generation rate (per hour) */
  generationRate: number;
  /** Timestamp of statistics */
  timestamp: Timestamp;
}

/**
 * Token Introspection Request
 * Request for token introspection (OAuth)
 */
export interface TokenIntrospectionRequest {
  /** Token value */
  token: string;
  /** Token type hint (optional) */
  tokenTypeHint?: string;
  /** Client ID (optional) */
  clientId?: string;
  /** Client secret (optional) */
  clientSecret?: string;
}

/**
 * Token Introspection Response
 * Response for token introspection (OAuth)
 */
export interface TokenIntrospectionResponse {
  /** Is token active */
  active: boolean;
  /** Token scopes */
  scope?: string;
  /** Client ID */
  clientId?: string;
  /** Username */
  username?: string;
  /** Token type */
  tokenType?: string;
  /** Expiration timestamp */
  exp?: number;
  /** Issued at timestamp */
  iat?: number;
  /** Not before timestamp */
  nbf?: number;
  /** Subject */
  sub?: string;
  /** Audience */
  aud?: string;
  /** Issuer */
  iss?: string;
  /** JWT ID */
  jti?: string;
  /** Additional claims */
  [key: string]: unknown;
}
