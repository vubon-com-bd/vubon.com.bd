/**
 * Authentication Token Types Module
 * Token management types for authentication system
 * Handles JWT tokens, refresh tokens, token validation and lifecycle
 */

import {
  UserId,
  Timestamp,
  Token,
  RefreshToken,
  UserRole,
  AuthProvider,
} from './core-primitives.types';

/**
 * Token Type
 * Types of authentication tokens
 */
export type TokenType = 'access' | 'refresh' | 'reset' | 'verify' | 'mfa' | 'api' | 'oauth';

/**
 * Token Status
 * Current status of a token
 */
export type TokenStatus = 'active' | 'expired' | 'revoked' | 'suspended' | 'pending';

/**
 * Token Algorithm
 * Supported token signing algorithms
 */
export type TokenAlgorithm =
  'HS256' | 'HS384' | 'HS512' | 'RS256' | 'RS384' | 'RS512' | 'ES256' | 'ES384' | 'ES512';

/**
 * Token Payload
 * Base token payload structure
 */
export interface TokenPayload {
  sub: string;
  exp: number;
  iat: number;
  iss?: string;
  aud?: string;
  jti?: string;
  type?: TokenType;
  [key: string]: unknown;
}

/**
 * Access Token Payload
 * Payload for access tokens
 */
export interface AccessTokenPayload extends TokenPayload {
  userId: UserId;
  email: string;
  roles: UserRole[];
  permissions: string[];
  sessionId: string;
  deviceId: string;
  provider?: AuthProvider;
}

/**
 * Refresh Token Payload
 * Payload for refresh tokens
 */
export interface RefreshTokenPayload extends TokenPayload {
  userId: UserId;
  sessionId: string;
  deviceId: string;
  refreshCount: number;
  rotated: boolean;
}

/**
 * Reset Token Payload
 * Payload for password reset tokens
 */
export interface ResetTokenPayload extends TokenPayload {
  userId: UserId;
  email: string;
  purpose: 'password_reset' | 'email_verification' | 'phone_verification';
}

/**
 * MFA Token Payload
 * Payload for MFA verification tokens
 */
export interface MFATokenPayload extends TokenPayload {
  userId: UserId;
  method: string;
  verified: boolean;
}

/**
 * Token Generation Request
 * Request to generate new tokens
 */
export interface TokenGenerationRequest {
  userId: UserId;
  email: string;
  sessionId: string;
  deviceId: string;
  roles: UserRole[];
  permissions: string[];
  tokenType: TokenType;
  provider?: AuthProvider;
  expiresIn?: number;
  customClaims?: Record<string, unknown>;
}

/**
 * Token Generation Response
 * Response after token generation
 */
export interface TokenGenerationResponse {
  success: boolean;
  data?: {
    accessToken: Token;
    refreshToken?: RefreshToken;
    accessTokenExpiresIn: number;
    refreshTokenExpiresIn?: number;
    tokenType: 'Bearer';
    issuedAt: Timestamp;
  };
  error?: string;
  timestamp: Timestamp;
}

/**
 * Token Validation Request
 * Request to validate a token
 */
export interface TokenValidationRequest {
  token: Token;
  tokenType: TokenType;
  validateSignature?: boolean;
  validateExpiry?: boolean;
  validateAudience?: boolean;
  validateIssuer?: boolean;
  requiredPermissions?: string[];
  requiredRoles?: UserRole[];
}

/**
 * Token Validation Response
 * Response after token validation
 */
export interface TokenValidationResponse {
  valid: boolean;
  data?: {
    payload: TokenPayload;
    userId?: UserId;
    sessionId?: string;
    email?: string;
    roles?: UserRole[];
    permissions?: string[];
    isExpired: boolean;
    isRevoked: boolean;
    isValid: boolean;
    validationErrors: TokenValidationError[];
  };
  timestamp: Timestamp;
}

/**
 * Token Validation Error
 * Error details for token validation
 */
export interface TokenValidationError {
  code: string;
  message: string;
  field?: string;
  timestamp: Timestamp;
}

/**
 * Token Revocation Request
 * Request to revoke a token
 */
export interface TokenRevocationRequest {
  token: Token;
  tokenType: TokenType;
  userId: UserId;
  reason?: string;
  invalidateRefreshToken?: boolean;
  invalidateAllTokens?: boolean;
}

/**
 * Token Revocation Response
 * Response after token revocation
 */
export interface TokenRevocationResponse {
  success: boolean;
  data?: {
    revoked: boolean;
    revokedAt: Timestamp;
    tokenId?: string;
    invalidatedSessions?: number;
  };
  error?: string;
  timestamp: Timestamp;
}

/**
 * Token Refresh Request
 * Request to refresh access token
 */
export interface TokenRefreshRequestExtended {
  refreshToken: RefreshToken;
  userId: UserId;
  sessionId: string;
  deviceId: string;
  rotateRefreshToken?: boolean;
}

/**
 * Token Refresh Response Extended
 * Response after token refresh
 */
export interface TokenRefreshResponseExtended {
  success: boolean;
  data?: {
    accessToken: Token;
    refreshToken?: RefreshToken;
    accessTokenExpiresIn: number;
    refreshTokenExpiresIn?: number;
    tokenType: 'Bearer';
    rotated: boolean;
  };
  error?: string;
  timestamp: Timestamp;
}

/**
 * Token Metadata
 * Additional token metadata
 */
export interface TokenMetadata {
  tokenId: string;
  userId: UserId;
  sessionId: string;
  deviceId: string;
  tokenType: TokenType;
  algorithm: TokenAlgorithm;
  issuedAt: Timestamp;
  expiresAt: Timestamp;
  lastUsedAt?: Timestamp;
  revokedAt?: Timestamp;
  revokedReason?: string;
  ipAddress?: string;
  userAgent?: string;
  location?: string;
  metadata?: Record<string, unknown>;
}

/**
 * Token Statistics
 * Statistical data about tokens
 */
export interface TokenStatistics {
  totalTokens: number;
  activeTokens: number;
  expiredTokens: number;
  revokedTokens: number;
  suspendedTokens: number;
  tokensByType: Record<TokenType, number>;
  tokensByStatus: Record<TokenStatus, number>;
  averageTokenLifetime: number;
  refreshCount: number;
  rotationCount: number;
  lastRotationAt?: Timestamp;
  timestamp: Timestamp;
}

/**
 * Token Security
 * Security settings for tokens
 */
export interface TokenSecurity {
  accessTokenExpiry: number;
  refreshTokenExpiry: number;
  resetTokenExpiry: number;
  verifyTokenExpiry: number;
  mfaTokenExpiry: number;
  enableTokenRotation: boolean;
  enableTokenRevocation: boolean;
  enforceSingleSession: boolean;
  enforceDeviceBinding: boolean;
  enforceIpBinding: boolean;
  requiredAlgorithm: TokenAlgorithm;
  signatureVerification: boolean;
  audience: string;
  issuer: string;
}

/**
 * Token Blacklist
 * Blacklisted tokens
 */
export interface TokenBlacklist {
  tokenId: string;
  token: Token;
  tokenType: TokenType;
  userId: UserId;
  reason: string;
  blacklistedAt: Timestamp;
  expiresAt: Timestamp;
}

/**
 * Token Filter
 * Filter criteria for token queries
 */
export interface TokenFilter {
  userId?: UserId[];
  tokenType?: TokenType[];
  status?: TokenStatus[];
  sessionId?: string[];
  deviceId?: string[];
  dateRange?: {
    start: Timestamp;
    end: Timestamp;
  };
  expiresWithin?: number;
}

/**
 * Token Response Builder
 * Helper for building token responses
 */
export interface TokenResponseBuilder {
  generateSuccess(response: TokenGenerationResponse): TokenGenerationResponse;
  validateSuccess(response: TokenValidationResponse): TokenValidationResponse;
  refreshSuccess(response: TokenRefreshResponseExtended): TokenRefreshResponseExtended;
  revokeSuccess(response: TokenRevocationResponse): TokenRevocationResponse;
  error(code: string, message: string, details?: Record<string, unknown>): TokenErrorResponse;
}

/**
 * Token Error Response
 * Error response for token operations
 */
export interface TokenErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
    details?: Record<string, unknown>;
  };
  timestamp: Timestamp;
  requestId?: string;
}

/**
 * Token Constants
 * Token-related constants
 */
export const TOKEN_TYPES = {
  ACCESS: 'access',
  REFRESH: 'refresh',
  RESET: 'reset',
  VERIFY: 'verify',
  MFA: 'mfa',
  API: 'api',
  OAUTH: 'oauth',
} as const;

export const TOKEN_STATUS = {
  ACTIVE: 'active',
  EXPIRED: 'expired',
  REVOKED: 'revoked',
  SUSPENDED: 'suspended',
  PENDING: 'pending',
} as const;

export const TOKEN_ALGORITHMS = {
  HS256: 'HS256',
  HS384: 'HS384',
  HS512: 'HS512',
  RS256: 'RS256',
  RS384: 'RS384',
  RS512: 'RS512',
  ES256: 'ES256',
  ES384: 'ES384',
  ES512: 'ES512',
} as const;

/**
 * Default Token Configuration
 */
export const DEFAULT_TOKEN_CONFIG = {
  accessTokenExpiry: 900, // 15 minutes
  refreshTokenExpiry: 604800, // 7 days
  resetTokenExpiry: 3600, // 1 hour
  verifyTokenExpiry: 86400, // 24 hours
  mfaTokenExpiry: 300, // 5 minutes
  algorithm: 'RS256',
  enableRotation: true,
  enableRevocation: true,
  enforceBinding: true,
} as const;

/**
 * Token Scopes
 * Token permission scopes
 */
export type TokenScope =
  | 'read:profile'
  | 'write:profile'
  | 'read:orders'
  | 'write:orders'
  | 'read:products'
  | 'write:products'
  | 'read:cart'
  | 'write:cart'
  | 'admin:users'
  | 'admin:products'
  | 'admin:orders'
  | 'admin:settings';

/**
 * Token Claims
 * Custom token claims
 */
export interface TokenClaims {
  userId: UserId;
  email: string;
  roles: UserRole[];
  scopes: TokenScope[];
  permissions: string[];
  sessionId: string;
  deviceId: string;
  provider?: AuthProvider;
  metadata?: Record<string, unknown>;
}

/**
 * Token Rotation
 * Token rotation information
 */
export interface TokenRotation {
  oldTokenId: string;
  newTokenId: string;
  userId: UserId;
  sessionId: string;
  rotatedAt: Timestamp;
  reason: 'refresh' | 'security' | 'expired' | 'manual';
  previousRefreshCount: number;
  currentRefreshCount: number;
}

/**
 * Token Audit Log
 * Audit log entry for token operations
 */
export interface TokenAuditLog {
  id: string;
  tokenId: string;
  userId: UserId;
  operation: 'generated' | 'validated' | 'refreshed' | 'revoked' | 'expired' | 'rotated';
  tokenType: TokenType;
  success: boolean;
  ipAddress?: string;
  userAgent?: string;
  metadata?: Record<string, unknown>;
  timestamp: Timestamp;
}

/**
 * Token Verification
 * Token verification result
 */
export interface TokenVerification {
  verified: boolean;
  payload?: TokenPayload;
  error?: string;
  timestamp: Timestamp;
}

/**
 * Token Expiry Check
 * Token expiry status
 */
export interface TokenExpiryCheck {
  isExpired: boolean;
  expiresIn: number;
  expiredAt: Timestamp;
  remainingTime: number;
  warningThreshold: number;
  shouldRenew: boolean;
}

/**
 * Token Signing Request
 * Request to sign token data
 */
export interface TokenSigningRequest {
  payload: Record<string, unknown>;
  algorithm: TokenAlgorithm;
  secretKey: string;
  privateKey?: string;
  expiresIn: number;
  issuer?: string;
  audience?: string;
}

/**
 * Token Signing Response
 * Response after token signing
 */
export interface TokenSigningResponse {
  success: boolean;
  data?: {
    token: Token;
    signature: string;
    algorithm: TokenAlgorithm;
    issuedAt: Timestamp;
    expiresAt: Timestamp;
  };
  error?: string;
}

/**
 * Token Verification Request
 * Request to verify token signature
 */
export interface TokenVerificationRequest {
  token: Token;
  algorithm: TokenAlgorithm;
  secretKey: string;
  publicKey?: string;
  verifySignature: boolean;
  verifyExpiry: boolean;
}

/**
 * Token Verification Response
 * Response after token signature verification
 */
export interface TokenVerificationResponse {
  success: boolean;
  data?: {
    verified: boolean;
    payload?: Record<string, unknown>;
    signatureValid: boolean;
    expiryValid: boolean;
    algorithm: TokenAlgorithm;
  };
  error?: string;
  timestamp: Timestamp;
}
