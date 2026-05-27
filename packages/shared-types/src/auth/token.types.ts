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
  | 'passwordless_login'
  // Bangladesh specific - WhatsApp OTP
  | 'whatsapp_otp'
  // Bangladesh specific - bKash authentication
  | 'bkash_auth'
  // Bangladesh specific - Nagad authentication
  | 'nagad_auth'
  // Bangladesh specific - Rocket authentication
  | 'rocket_auth';

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
  readonly azp?: string;       // authorized party - OAuth2 compatible
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

  // Bangladesh specific fields
  readonly district?: string;
  readonly upazila?: string;                     // Upazila - for location-based permissions
  readonly division?: string;                    // Division (Dhaka, Chattogram, Rajshahi, etc.)
  readonly isPremiumCustomer?: boolean;
  readonly networkType?: '2g' | '3g' | '4g' | '5g' | 'wifi' | 'unknown';  // Network type
  readonly mobileOperator?: 'gp' | 'robi' | 'banglalink' | 'teletalk' | 'unknown';  // Mobile operator
  readonly isNightTime?: boolean;               // 10 PM - 6 AM (night time security)
  readonly isWeekend?: boolean;                 // Friday/Saturday (Bangladesh weekend)
  readonly dataSaverEnabled?: boolean;          // Data saver mode on/off
  readonly mfaMethodUsed?: 'totp' | 'sms' | 'whatsapp' | 'bkash' | 'nagad' | 'rocket';  // MFA method used
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
  readonly deviceType?: 'mobile' | 'desktop' | 'tablet' | 'feature_phone' | 'kiosk';  // Device type
  readonly networkFingerprint?: string;          // Network fingerprint (to detect VPN/proxy)
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
  | 'phone_change'
  // Bangladesh specific
  | 'nid_verification'       // Bangladesh NID verification
  | 'tin_verification'       // Bangladesh TIN verification
  | 'trade_license_verification';  // Trade license verification

export interface VerificationTokenPayload extends BaseTokenPayload {
  readonly type: 'email_verification' | 'phone_verification' | 'password_reset' | 'nid_verification';
  readonly purpose: VerificationPurpose;
  readonly userId: string;
  readonly newValue?: string;                      // New email/phone for change
  readonly redirectUrl?: string;
  readonly documentId?: string;                  // NID/TIN/Trade license ID
  readonly documentNumber?: string;              // Document number (encrypted)
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
  readonly mfsProvider?: 'bkash' | 'nagad' | 'rocket';  // MFS provider (Bangladesh specific)
  readonly whatsappNumber?: string;               // Phone number for WhatsApp OTP
}

// ============================================================
// Magic Link Token Payload (Passwordless login)
// ============================================================
export interface MagicLinkTokenPayload extends BaseTokenPayload {
  readonly type: 'magic_link';
  readonly email: string;
  readonly redirectUrl: string;
  readonly action: 'login' | 'signup' | 'verify';
  readonly phoneNumber?: string;                  // Phone number for magic link
  readonly viaWhatsApp?: boolean;                // Send magic link via WhatsApp
}

// ============================================================
// Session Transfer Token Payload (Device to device - Bangladesh specific)
// ============================================================
export interface SessionTransferTokenPayload extends BaseTokenPayload {
  readonly type: 'session_transfer';
  readonly fromSessionId: string;
  readonly toDeviceId: string;
  readonly transferMethod: 'qr_code' | 'magic_link' | 'otp';
  readonly viaWhatsApp?: boolean;                // Send transfer code via WhatsApp
  readonly viaSms?: boolean;                     // Send transfer code via SMS
  readonly featurePhoneCompatible?: boolean;     // Compatible mode for feature phones
}

// ============================================================
// Device Trust Token Payload
// ============================================================
export interface DeviceTrustTokenPayload extends BaseTokenPayload {
  readonly type: 'device_trust';
  readonly deviceId: string;
  readonly trustLevel: number;
  readonly userId: string;
  readonly deviceType?: 'mobile' | 'desktop' | 'feature_phone';
  readonly isPublicDevice?: boolean;             // Public device (cyber cafe/kiosk)
}

// ============================================================
// Bangladesh specific: MFS authentication token payload (bKash/Nagad/Rocket)
export interface MFSProviderPayload extends BaseTokenPayload {
  readonly type: 'bkash_auth' | 'nagad_auth' | 'rocket_auth';
  readonly provider: 'bkash' | 'nagad' | 'rocket';
  readonly accountNumber: string;
  readonly maskedAccountNumber: string;
  readonly userId: string;
  readonly sessionId: string;
  readonly authMethod: 'pin' | 'otp' | 'fingerprint';
  readonly trustDevice: boolean;
}

// ============================================================
// Bangladesh specific: WhatsApp OTP token payload
export interface WhatsAppOTPPayload extends BaseTokenPayload {
  readonly type: 'whatsapp_otp';
  readonly phoneNumber: string;
  readonly countryCode: '880';                    // Fixed for Bangladesh
  readonly userId: string;
  readonly purpose: 'login' | 'verification' | 'password_reset';
  readonly businessAccountId?: string;            // WhatsApp business account ID
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
  readonly allowedDistricts?: readonly string[];   // Which districts can use this API Key
  readonly allowedNetworkTypes?: readonly ('2g' | '3g' | '4g' | '5g' | 'wifi')[];  // Network restrictions
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
    readonly upazila?: string;                    // Upazila
    readonly division?: string;                   // Division
    readonly postalCode?: string;                 // Postal code
  };
  readonly purpose?: string;
  readonly redirectUrl?: string;
  readonly originalToken?: string;                // For one-time display (e.g., backup codes)
  readonly networkInfo?: {                        // Network information
    readonly networkType?: '2g' | '3g' | '4g' | '5g' | 'wifi' | 'unknown';
    readonly mobileOperator?: 'gp' | 'robi' | 'banglalink' | 'teletalk' | 'unknown';
    readonly isVpn?: boolean;
    readonly isProxy?: boolean;
    readonly isTor?: boolean;
  };
  readonly simInfo?: {                            // SIM information (for SIM swap detection)
    readonly operator?: 'gp' | 'robi' | 'banglalink' | 'teletalk' | 'unknown';
    readonly iccidHash?: string;                  // Hashed ICCID (unique SIM ID)
    readonly lastSimChangeAt?: Date;
  };
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
  readonly requiresAdditionalVerification?: boolean;  // Additional verification needed? (e.g., SIM swap suspicion)
  readonly suggestedAction?: 'allow' | 'mfa_required' | 'block' | 'notify_admin';  // Suggested action
}

// ============================================================
// Token Error Types (Bangladesh specific errors added)
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
  | 'TOKEN_DEVICE_MISMATCH'
  | 'TOKEN_DISTRICT_MISMATCH'      // Token's district doesn't match current district
  | 'TOKEN_NETWORK_TYPE_MISMATCH'   // Network type changed (e.g., WiFi to mobile network)
  | 'TOKEN_SIM_SWAP_DETECTED'       // SIM swap detected
  | 'TOKEN_SUSPICIOUS_HOUR'         // Suspicious access at night
  | 'TOKEN_WEEKEND_RESTRICTION';     // Weekend restriction (if configured)

// ============================================================
// Create Token Request (Internal)
// ============================================================
export interface CreateTokenRequest {
  readonly userId: string;
  readonly type: TokenType;
  readonly expiresInSeconds: number;
  readonly metadata?: Partial<TokenMetadata>;
  readonly customClaims?: Record<string, unknown>;
  readonly mfaStatus?: 'verified' | 'pending' | 'required';  // MFA status
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
  readonly mfaRequired?: boolean;                // Is MFA required?
  readonly mfaMethods?: readonly ('totp' | 'sms' | 'whatsapp' | 'bkash' | 'nagad' | 'rocket')[];  // Available MFA methods
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
  readonly simSwapDetected?: boolean;            // Blocked due to SIM swap
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
  readonly allowedDistricts?: readonly string[];   // Which districts can use this API Key
  readonly allowedTimes?: {                        // Time restrictions for API usage
    readonly startHour: number;                      // 0-23
    readonly endHour: number;                        // 0-23
    readonly allowedDays?: ('sunday' | 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday')[];
  };
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
  readonly allowedDistricts?: readonly string[];   // Restricted districts list
  readonly usageStats?: {                         // Usage statistics
    readonly totalRequests: number;
    readonly lastRequestAt?: Date;
    readonly requestsByDistrict?: Record<string, number>;
  };
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
  readonly districtAllowed?: boolean;            // Whether current district is allowed
  readonly timeAllowed?: boolean;                 // Whether current time is allowed
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
  readonly district?: string;                     // Bangladesh specific
  readonly networkType?: string;                  // Network type
  readonly mfaVerified?: boolean;                 // Whether MFA is verified
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
    readonly district?: string;                    // Current district (to detect location change)
    readonly networkType?: string;                 // Current network type
  };
}

export interface TokenRotationResponse {
  readonly accessToken: string;
  readonly refreshToken: string;
  readonly accessTokenExpiresIn: number;
  readonly refreshTokenExpiresIn: number;
  readonly tokenVersion: number;
  readonly warning?: string;                       // Warning if suspicious activity detected
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

  // Bangladesh specific statistics
  readonly tokensByDistrict?: Record<string, number>;  // Which districts have most token usage
  readonly tokensByNetworkType?: Record<string, number>; // Which network types have most token usage
  readonly simSwapTokenRevocations?: number;           // How many tokens revoked due to SIM swap
  readonly mfaMethodDistribution?: Record<string, number>;  // Which MFA methods are most used (SMS, WhatsApp, bKash, etc.)
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
  readonly district?: string;                     // District filter
  readonly networkType?: string;                  // Network type filter
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
  | 'token.rotated'
  | 'token.sim_swap_detected'                    // SIM swap detected
  | 'token.district_mismatch'                    // District mismatch detected
  | 'token.suspicious_hour_access';               // Suspicious access at unusual hour

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
  readonly location?: {                          // Event location information
    readonly district?: string;
    readonly upazila?: string;
    readonly division?: string;
  };
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
  | 'token.api_key.revoked'
  | 'token.sim_swap.revoked'                     // Token revoked due to SIM swap
  | 'token.mfa.required';                         // MFA required

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
    readonly district?: string;                    // Current district
    readonly networkType?: string;                 // Current network type
  };
  readonly viaWhatsApp?: boolean;                 // Send magic link via WhatsApp
  readonly phoneNumber?: string;                  // Phone number (for WhatsApp)
}

export interface PasswordlessLoginResponse {
  readonly success: boolean;
  readonly message: string;
  readonly emailSent: boolean;
  readonly expiresInSeconds: number;
  readonly whatsappSent?: boolean;                // Whether sent via WhatsApp
  readonly smsSent?: boolean;                     // Whether sent via SMS
}
