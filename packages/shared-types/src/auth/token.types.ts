/**
 * Token Types - Pure TypeScript type contracts for JWT and tokens
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module shared-types/auth-types/auth/token.types
 * 
 * RULES:
 * ✅ ONLY type declarations, interfaces, unions
 * ✅ NO jwt.sign, jwt.verify, token generation logic
 * ✅ NO functions, classes, enums
 * ✅ NO validation schemas (Zod)
 * ✅ NO framework imports
 */

import type {
  TOKEN_EXPIRY,
  JWT_CONFIG,
  API_KEY_CONFIG,
} from '@vubon/auth-constants';

import type { Role } from './role.types';
import type { PermissionString } from './permission.types';

// ============================================================
// Token Types (Based on constants - NO enums)
// ============================================================
export type TokenType = 
  | 'access'
  | 'refresh'
  | 'email_verification'
  | 'phone_verification'
  | 'password_reset'
  | 'mfa'
  | 'mfa_backup'
  | 'api_key'
  | 'magic_link'
  | 'session_transfer'
  | 'device_trust'
  | 'passwordless_login';

// ============================================================
// Token Algorithm Types
// ============================================================
export type TokenAlgorithm = 'RS256' | 'RS384' | 'RS512' | 'HS256' | 'HS384' | 'HS512';

// ============================================================
// Base JWT Payload (Standard claims)
// ============================================================
export interface BaseTokenPayload {
  readonly sub: string;        // subject (user ID)
  readonly iat: number;        // issued at (Unix timestamp)
  readonly exp: number;        // expiry (Unix timestamp)
  readonly iss: string;        // issuer (from JWT_CONFIG.ISSUER)
  readonly aud: string;        // audience (from JWT_CONFIG.AUDIENCE)
  readonly jti: string;        // JWT ID (unique)
  readonly nbf?: number;       // not before (Unix timestamp)
}

// ============================================================
// Access Token Payload
// ============================================================
export interface AccessTokenPayload extends BaseTokenPayload {
  readonly type: 'access';
  readonly email: string;
  readonly emailVerified: boolean;
  readonly phoneNumber?: string;
  readonly phoneVerified?: boolean;
  readonly role: Role;
  readonly permissions: readonly PermissionString[];
  readonly sessionId: string;
  readonly deviceId: string;
  readonly trustLevel: number;                    // 0-4
  readonly mfaVerified: boolean;
  
  // Bangladesh specific
  readonly district?: string;
  readonly isPremiumCustomer?: boolean;
}

// ============================================================
// Refresh Token Payload
// ============================================================
export interface RefreshTokenPayload extends BaseTokenPayload {
  readonly type: 'refresh';
  readonly sessionId: string;
  readonly tokenVersion: number;
  readonly deviceId: string;
  readonly trustLevel: number;
}

// ============================================================
// Verification Token Payload
// ============================================================
export type VerificationPurpose = 
  | 'email_verification'
  | 'phone_verification'
  | 'password_reset'
  | 'account_recovery'
  | 'email_change'
  | 'phone_change';

export interface VerificationTokenPayload extends BaseTokenPayload {
  readonly type: 'email_verification' | 'phone_verification' | 'password_reset';
  readonly purpose: VerificationPurpose;
  readonly userId: string;
  readonly newValue?: string;                      // New email/phone for change
  readonly redirectUrl?: string;
}

// ============================================================
// MFA Token Payload
// ============================================================
export interface MFATokenPayload extends BaseTokenPayload {
  readonly type: 'mfa' | 'mfa_backup';
  readonly methodId: string;
  readonly verificationType: string;
  readonly userId: string;
  readonly sessionId: string;
  readonly trustDevice: boolean;
  readonly trustDurationDays?: number;
}

// ============================================================
// Magic Link Token Payload (Passwordless login)
// ============================================================
export interface MagicLinkTokenPayload extends BaseTokenPayload {
  readonly type: 'magic_link';
  readonly email: string;
  readonly redirectUrl: string;
  readonly action: 'login' | 'signup' | 'verify';
}

// ============================================================
// Session Transfer Token Payload (Device to device - Bangladesh specific)
// ============================================================
export interface SessionTransferTokenPayload extends BaseTokenPayload {
  readonly type: 'session_transfer';
  readonly fromSessionId: string;
  readonly toDeviceId: string;
  readonly transferMethod: 'qr_code' | 'magic_link' | 'otp';
}

// ============================================================
// Device Trust Token Payload
// ============================================================
export interface DeviceTrustTokenPayload extends BaseTokenPayload {
  readonly type: 'device_trust';
  readonly deviceId: string;
  readonly trustLevel: number;
  readonly userId: string;
}

// ============================================================
// API Key Payload
// ============================================================
export interface APIKeyPayload {
  readonly id: string;
  readonly keyId: string;                         // Prefix + id
  readonly name: string;
  readonly userId: string;
  readonly permissions: readonly PermissionString[];
  readonly expiresAt: Date | null;
  readonly lastUsedAt: Date | null;
  readonly createdAt: Date;
  readonly createdBy: string;
  readonly isActive: boolean;
  readonly allowedIps?: readonly string[];
  readonly allowedReferrers?: readonly string[];
  readonly rateLimitPerMinute?: number;
}

// ============================================================
// Token Entity (Database model)
// ============================================================
export interface Token {
  readonly id: string;
  readonly userId: string;
  readonly type: TokenType;
  readonly tokenId: string;                       // jti - unique identifier
  readonly valueHash: string;                     // Hashed token value
  readonly expiresAt: Date;
  readonly createdAt: Date;
  readonly usedAt: Date | null;
  readonly revokedAt: Date | null;
  readonly revokedReason: string | null;
  readonly metadata: TokenMetadata;
  readonly version: number;                        // For rotation
}

// ============================================================
// Token Metadata
// ============================================================
export interface TokenMetadata {
  readonly ipAddress?: string;
  readonly userAgent?: string;
  readonly deviceId?: string;
  readonly deviceName?: string;
  readonly location?: {
    readonly country?: string;
    readonly city?: string;
    readonly district?: string;                   // Bangladesh specific
  };
  readonly purpose?: string;
  readonly redirectUrl?: string;
  readonly originalToken?: string;                // For one-time display (e.g., backup codes)
}

// ============================================================
// Token Validation Result
// ============================================================
export interface TokenValidationResult<T extends BaseTokenPayload = BaseTokenPayload> {
  readonly valid: boolean;
  readonly payload: T | null;
  readonly error?: TokenError;
  readonly errorDetails?: string;
  readonly isExpired: boolean;
  readonly isRevoked: boolean;
  readonly needsRefresh: boolean;
  readonly expiresInSeconds?: number;
}

// ============================================================
// Token Error Types
// ============================================================
export type TokenError = 
  | 'TOKEN_EXPIRED'
  | 'TOKEN_INVALID'
  | 'TOKEN_MALFORMED'
  | 'TOKEN_REVOKED'
  | 'TOKEN_SIGNATURE_INVALID'
  | 'TOKEN_ISSUER_INVALID'
  | 'TOKEN_AUDIENCE_INVALID'
  | 'TOKEN_CLAIMS_INVALID'
  | 'TOKEN_NOT_YET_VALID'
  | 'TOKEN_BLACKLISTED'
  | 'TOKEN_VERSION_MISMATCH'
  | 'TOKEN_DEVICE_MISMATCH';

// ============================================================
// Create Token Request (Internal)
// ============================================================
export interface CreateTokenRequest {
  readonly userId: string;
  readonly type: TokenType;
  readonly expiresInSeconds: number;
  readonly metadata?: Partial<TokenMetadata>;
  readonly customClaims?: Record<string, unknown>;
}

// ============================================================
// Token Response (API DTO)
// ============================================================
export interface TokenResponse {
  readonly accessToken: string;
  readonly refreshToken: string;
  readonly accessTokenExpiresIn: number;
  readonly refreshTokenExpiresIn: number;
  readonly tokenType: 'Bearer';
  readonly sessionId?: string;
}

// ============================================================
// Token Blacklist Entry
// ============================================================
export interface BlacklistedToken {
  readonly tokenId: string;
  readonly userId: string;
  readonly expiresAt: Date;
  readonly blacklistedAt: Date;
  readonly reason: string;
  readonly blacklistedBy: 'system' | 'user' | 'admin';
}

// ============================================================
// Create API Key Request
// ============================================================
export interface CreateAPIKeyRequest {
  readonly name: string;
  readonly userId: string;
  readonly permissions: readonly PermissionString[];
  readonly expiresInDays?: number;
  readonly allowedIps?: readonly string[];
  readonly allowedReferrers?: readonly string[];
  readonly rateLimitPerMinute?: number;
  readonly createdBy: string;
}

// ============================================================
// API Key Response
// ============================================================
export interface APIKeyResponse {
  readonly id: string;
  readonly key: string;                           // Full key (one-time display)
  readonly keyPreview: string;                    // Masked preview
  readonly name: string;
  readonly permissions: readonly PermissionString[];
  readonly expiresAt: Date | null;
  readonly createdAt: Date;
  readonly lastUsedAt: Date | null;
  readonly isActive: boolean;
  readonly warning?: string;                      // Security warning
}

// ============================================================
// API Key Validation Result
// ============================================================
export interface APIKeyValidationResult {
  readonly valid: boolean;
  readonly payload: APIKeyPayload | null;
  readonly error?: string;
  readonly isExpired: boolean;
  readonly hasPermission: (permission: PermissionString) => boolean;
}

// ============================================================
// Token Introspection Request (OAuth2 compliant)
// ============================================================
export interface TokenIntrospectionRequest {
  readonly token: string;
  readonly tokenTypeHint?: 'access_token' | 'refresh_token';
  readonly clientId?: string;
  readonly clientSecret?: string;
}

// ============================================================
// Token Introspection Response (OAuth2 compliant)
// ============================================================
export interface TokenIntrospectionResponse {
  readonly active: boolean;
  readonly scope?: string;
  readonly clientId?: string;
  readonly username?: string;
  readonly tokenType?: string;
  readonly exp?: number;
  readonly iat?: number;
  readonly nbf?: number;
  readonly sub?: string;
  readonly aud?: string;
  readonly iss?: string;
  readonly jti?: string;
  readonly permissions?: readonly string[];
  readonly role?: string;
}

// ============================================================
// Token Rotation Request
// ============================================================
export interface TokenRotationRequest {
  readonly refreshToken: string;
  readonly deviceInfo?: {
    readonly deviceId?: string;
    readonly userAgent?: string;
    readonly ipAddress?: string;
  };
}

export interface TokenRotationResponse {
  readonly accessToken: string;
  readonly refreshToken: string;
  readonly accessTokenExpiresIn: number;
  readonly refreshTokenExpiresIn: number;
  readonly tokenVersion: number;
}

// ============================================================
// Token Statistics (For admin dashboard)
// ============================================================
export interface TokenStatistics {
  readonly totalAccessTokens: number;
  readonly totalRefreshTokens: number;
  readonly totalApiKeys: number;
  readonly activeTokens: number;
  readonly expiredTokens: number;
  readonly revokedTokens: number;
  
  readonly tokensByType: Record<TokenType, number>;
  readonly averageTokenLifetimeSeconds: number;
  
  readonly topTokenUsers: ReadonlyArray<{
    readonly userId: string;
    readonly tokenCount: number;
  }>;
  
  readonly apiKeyUsageLastMonth: number;
  readonly tokenRefreshRate: number;              // Refreshes per day
  readonly tokenValidationErrors: number;
}

// ============================================================
// Token Cleanup Criteria
// ============================================================
export interface TokenCleanupCriteria {
  readonly olderThan?: Date;
  readonly types?: readonly TokenType[];
  readonly status?: readonly ('expired' | 'revoked')[];
  readonly userId?: string;
  readonly limit?: number;
}

export interface TokenCleanupResult {
  readonly totalDeleted: number;
  readonly deletedByType: Record<TokenType, number>;
  readonly archivedCount: number;
  readonly cleanupCompletedAt: Date;
}

// ============================================================
// Token Filter Options
// ============================================================
export interface TokenFilterOptions {
  readonly userId?: string;
  readonly type?: TokenType;
  readonly isActive?: boolean;
  readonly fromDate?: Date;
  readonly toDate?: Date;
  readonly limit?: number;
  readonly offset?: number;
  readonly sortBy?: 'createdAt' | 'expiresAt' | 'lastUsedAt';
  readonly sortOrder?: 'asc' | 'desc';
}

// ============================================================
// Token Event Types (For audit)
// ============================================================
export type TokenEventType = 
  | 'token.created'
  | 'token.refreshed'
  | 'token.revoked'
  | 'token.expired'
  | 'token.validated'
  | 'token.invalid'
  | 'token.blacklisted'
  | 'token.api_key.created'
  | 'token.api_key.revoked'
  | 'token.rotated';

export interface TokenEvent {
  readonly id: string;
  readonly eventType: TokenEventType;
  readonly tokenId: string;
  readonly tokenType: TokenType;
  readonly userId: string;
  readonly timestamp: Date;
  readonly ipAddress: string;
  readonly userAgent: string;
  readonly metadata: Record<string, unknown>;
}

// ============================================================
// JWT Configuration Type (From constants)
// ============================================================
export interface JWTConfig {
  readonly algorithm: TokenAlgorithm;
  readonly accessTokenExpiry: string;
  readonly refreshTokenExpiry: string;
  readonly issuer: string;
  readonly audience: string;
  readonly publicKey?: string;
  readonly privateKey?: string;
}

// ============================================================
// API Key Configuration Type (From constants)
// ============================================================
export interface APIKeyConfig {
  readonly prefix: string;
  readonly keyLength: number;
  readonly allowedIps?: readonly string[];
  readonly scopeSeparator: string;
}

// ============================================================
// Token Webhook Events
// ============================================================
export type TokenWebhookEventType = 
  | 'token.access.created'
  | 'token.refresh.created'
  | 'token.revoked'
  | 'token.api_key.created'
  | 'token.api_key.revoked';

export interface TokenWebhookPayload {
  readonly eventType: TokenWebhookEventType;
  readonly userId: string;
  readonly tokenType: TokenType;
  readonly tokenId: string;
  readonly timestamp: Date;
  readonly metadata: Record<string, unknown>;
}

// ============================================================
// Passwordless Login Request (Magic link)
// ============================================================
export interface PasswordlessLoginRequest {
  readonly email: string;
  readonly redirectUrl: string;
  readonly deviceInfo?: {
    readonly deviceId?: string;
    readonly userAgent?: string;
    readonly ipAddress?: string;
  };
}

export interface PasswordlessLoginResponse {
  readonly success: boolean;
  readonly message: string;
  readonly emailSent: boolean;
  readonly expiresInSeconds: number;
}
