/**
 * Token-related type definitions for the monorepo
 * All token types are centralized here for consistent usage across packages
 */

import type { DefaultRole } from '@vubon/shared-constants';

/**
 * Access token payload interface
 * Contains the data embedded in JWT access tokens
 */
export interface AccessTokenPayload {
  /** User ID associated with the token */
  userId: string;
  /** User email address */
  email: string;
  /** User roles */
  roles: DefaultRole[];
  /** User permissions */
  permissions: string[];
  /** Session ID for the current session */
  sessionId: string;
  /** Device ID if available */
  deviceId?: string;
  /** Token expiry timestamp */
  exp: number;
  /** Token issued at timestamp */
  iat: number;
  /** Token issuer */
  iss: string;
  /** Token audience */
  aud: string;
}

/**
 * Refresh token payload interface
 * Contains the data embedded in refresh tokens
 */
export interface RefreshTokenPayload {
  /** User ID associated with the token */
  userId: string;
  /** Token version for invalidation tracking */
  tokenVersion: number;
  /** Family ID for token rotation tracking */
  familyId: string;
  /** Rotation count for the token family */
  rotationCount: number;
  /** Session ID for the current session */
  sessionId: string;
  /** Device ID if available */
  deviceId?: string;
  /** Token expiry timestamp */
  exp: number;
  /** Token issued at timestamp */
  iat: number;
}

/**
 * Token response interface
 * Returned when a user authenticates or refreshes tokens
 */
export interface TokenResponse {
  /** Access token for API authentication */
  accessToken: string;
  /** Refresh token for obtaining new tokens */
  refreshToken: string;
  /** Access token expiry in seconds */
  expiresIn: number;
  /** Refresh token expiry in seconds */
  refreshExpiresIn: number;
  /** Token type (usually 'Bearer') */
  tokenType: string;
}

/**
 * Token refresh request interface
 * Used when requesting new access tokens
 */
export interface TokenRefreshRequest {
  /** Refresh token to exchange for new tokens */
  refreshToken: string;
  /** Device ID if available for tracking */
  deviceId?: string;
}

/**
 * Token refresh response interface
 * Returned when refreshing tokens
 */
export interface TokenRefreshResponse {
  /** New access token */
  accessToken: string;
  /** Optional new refresh token (if rotation is enabled) */
  refreshToken?: string;
  /** Access token expiry in seconds */
  expiresIn: number;
  /** Optional refresh token expiry in seconds */
  refreshExpiresIn?: number;
  /** Token type (usually 'Bearer') */
  tokenType: string;
  /** Whether a new refresh token was issued */
  rotationOccurred: boolean;
}

/**
 * Token rotation result interface
 * Contains both old and new tokens after rotation
 */
export interface TokenRotationResult {
  /** Old refresh token that was used */
  oldToken: string;
  /** Old token payload */
  oldPayload: RefreshTokenPayload;
  /** New refresh token that was issued */
  newToken: string;
  /** New token payload */
  newPayload: RefreshTokenPayload;
  /** New access token */
  accessToken: string;
  /** Access token expiry in seconds */
  expiresIn: number;
  /** Whether the rotation was successful */
  success: boolean;
}

/**
 * Token family interface
 * Tracks a group of related tokens for rotation tracking
 */
export interface TokenFamily {
  /** Unique family identifier */
  familyId: string;
  /** User ID associated with the family */
  userId: string;
  /** Session ID for the current session */
  sessionId: string;
  /** Device ID if available */
  deviceId?: string;
  /** List of token hashes in this family */
  tokens: string[];
  /** Current rotation count */
  rotationCount: number;
  /** Maximum allowed rotations before invalidation */
  maxRotations: number;
  /** Timestamp of the first token creation */
  createdAt: Date;
  /** Timestamp of the last token rotation */
  lastRotatedAt: Date;
  /** Whether the family is active */
  isActive: boolean;
}

/**
 * Token verification result interface
 * Result of verifying a token
 */
export interface TokenVerificationResult {
  /** Whether the token is valid */
  isValid: boolean;
  /** Token payload if valid */
  payload?: AccessTokenPayload | RefreshTokenPayload;
  /** Error message if invalid */
  error?: string;
  /** Error code for client-side handling */
  errorCode?: string;
}

/**
 * Token metadata interface
 * Additional metadata stored with tokens
 */
export interface TokenMetadata {
  /** IP address where the token was issued */
  ipAddress: string;
  /** User agent string */
  userAgent: string;
  /** Device fingerprint if available */
  deviceFingerprint?: string;
  /** Location information */
  location?: {
    countryCode?: string;
    region?: string;
    city?: string;
  };
  /** Timestamp of token issuance */
  issuedAt: Date;
}

/**
 * Token blacklist entry interface
 * Used for tracking revoked tokens
 */
export interface TokenBlacklistEntry {
  /** Token identifier (hash) */
  tokenId: string;
  /** User ID associated with the token */
  userId: string;
  /** Token type (access or refresh) */
  tokenType: 'access' | 'refresh';
  /** Reason for blacklisting */
  reason: 'logout' | 'revoked' | 'compromised' | 'expired' | 'rotated';
  /** Timestamp of blacklisting */
  blacklistedAt: Date;
  /** Expiry timestamp for the blacklist entry */
  expiresAt: Date;
}

/**
 * Token generation options interface
 * Options for generating tokens
 */
export interface TokenGenerationOptions {
  /** User ID for the token */
  userId: string;
  /** User email */
  email: string;
  /** User roles */
  roles: DefaultRole[];
  /** User permissions */
  permissions: string[];
  /** Session ID */
  sessionId: string;
  /** Device ID if available */
  deviceId?: string;
  /** Token type to generate */
  type: 'access' | 'refresh' | 'both';
  /** Custom expiry in seconds (overrides defaults) */
  customExpiry?: number;
  /** Additional claims to include */
  additionalClaims?: Record<string, unknown>;
}

/**
 * Token configuration interface
 * Configuration for token generation and validation
 */
export interface TokenConfig {
  /** Access token expiry in seconds */
  accessTokenExpiry: number;
  /** Refresh token expiry in seconds */
  refreshTokenExpiry: number;
  /** Token issuer */
  issuer: string;
  /** Token audience */
  audience: string;
  /** Algorithm for signing tokens */
  algorithm: 'HS256' | 'RS256' | 'ES256';
  /** Secret or private key for signing */
  secret: string;
  /** Public key for verification (if using asymmetric) */
  publicKey?: string;
  /** Whether to enable token rotation */
  enableRotation: boolean;
  /** Maximum rotations before invalidation */
  maxRotations: number;
  /** Whether to enable token blacklisting */
  enableBlacklisting: boolean;
  /** Clock skew tolerance in seconds */
  clockSkewTolerance: number;
}

/**
 * Token statistics interface
 * Statistical data about tokens
 */
export interface TokenStatistics {
  /** Total number of tokens issued */
  totalIssued: number;
  /** Number of active tokens */
  activeTokens: number;
  /** Number of revoked tokens */
  revokedTokens: number;
  /** Number of expired tokens */
  expiredTokens: number;
  /** Average token lifetime in seconds */
  averageLifetime: number;
  /** Token issuance by type */
  issuanceByType: Record<'access' | 'refresh', number>;
  /** Token rotations performed */
  rotationsPerformed: number;
  /** Timestamp when statistics were calculated */
  calculatedAt: Date;
}

/**
 * Token validation context interface
 * Context for token validation
 */
export interface TokenValidationContext {
  /** Required permissions (if any) */
  requiredPermissions?: string[];
  /** Required roles (if any) */
  requiredRoles?: DefaultRole[];
  /** Whether MFA is required */
  mfaRequired?: boolean;
  /** Whether MFA was verified */
  mfaVerified?: boolean;
  /** IP address of the request */
  ipAddress?: string;
  /** User agent of the request */
  userAgent?: string;
}
