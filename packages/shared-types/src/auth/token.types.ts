/**
 * Token Types - Pure TypeScript type contracts for JWT and tokens
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce

 * @module shared-types/auth-types/auth/token.types

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
  | ***'whatsapp_otp'           // বাংলাদেশ স্পেসিফিক - হোয়াটসঅ্যাপ ওটিপি***
  | ***'bkash_auth'             // বাংলাদেশ স্পেসিফিক - বিকাশ অথেনটিকেশন***
  | ***'nagad_auth'             // বাংলাদেশ স্পেসিফিক - নগদ অথেনটিকেশন***
  | ***'rocket_auth';           // বাংলাদেশ স্পেসিফিক - রকেট অথেনটিকেশন***

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
  ***readonly azp?: string;       // authorized party - OAuth2 compatible***
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

  // বাংলাদেশ স্পেসিফিক ফিল্ডসমূহ
  readonly district?: string;
  readonly upazila?: string;                      ***// উপজেলা - লোকেশন-বেসড পারমিশনের জন্য***
  readonly division?: string;                      ***// বিভাগ (ঢাকা, চট্টগ্রাম, রাজশাহী ইত্যাদি)***
  readonly isPremiumCustomer?: boolean;
  ***readonly networkType?: '2g' | '3g' | '4g' | '5g' | 'wifi' | 'unknown';  // নেটওয়ার্ক টাইপ***
  ***readonly mobileOperator?: 'gp' | 'robi' | 'banglalink' | 'teletalk' | 'unknown';  // মোবাইল অপারেটর***
  ***readonly isNightTime?: boolean;               // রাত ১০টা - সকাল ৬টা (নাইট টাইম সিকিউরিটি)***
  ***readonly isWeekend?: boolean;                 // শুক্রবার/শনিবার (বাংলাদেশের উইকেন্ড)***
  ***readonly dataSaverEnabled?: boolean;          // ডাটা সেভার মোড অন/অফ***
  ***readonly mfaMethodUsed?: 'totp' | 'sms' | 'whatsapp' | 'bkash' | 'nagad' | 'rocket';  // কোন MFA পদ্ধতি ব্যবহার করা হয়েছে***
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
  ***readonly deviceType?: 'mobile' | 'desktop' | 'tablet' | 'feature_phone' | 'kiosk';  // ডিভাইস টাইপ***
  ***readonly networkFingerprint?: string;          // নেটওয়ার্ক ফিঙ্গারপ্রিন্ট (VPN/প্রক্সি ডিটেক্ট করতে)***
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
  ***| 'nid_verification'       // বাংলাদেশ NID ভেরিফিকেশন***
  ***| 'tin_verification'       // বাংলাদেশ টিআইএন ভেরিফিকেশন***
  ***| 'trade_license_verification';  // ট্রেড লাইসেন্স ভেরিফিকেশন***

export interface VerificationTokenPayload extends BaseTokenPayload {
  readonly type: 'email_verification' | 'phone_verification' | 'password_reset' | ***'nid_verification'***;
  readonly purpose: VerificationPurpose;
  readonly userId: string;
  readonly newValue?: string;                      // New email/phone for change
  readonly redirectUrl?: string;
  ***readonly documentId?: string;                  // NID/TIN/ট্রেড লাইসেন্সের আইডি***
  ***readonly documentNumber?: string;              // ডকুমেন্ট নম্বর (এনক্রিপ্টেড)***
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
  ***readonly mfsProvider?: 'bkash' | 'nagad' | 'rocket';  // MFS প্রোভাইডার (বাংলাদেশ স্পেসিফিক)***
  ***readonly whatsappNumber?: string;               // হোয়াটসঅ্যাপ ওটিপির জন্য ফোন নম্বর***
}

// ============================================================
// Magic Link Token Payload (Passwordless login)
// ============================================================
export interface MagicLinkTokenPayload extends BaseTokenPayload {
  readonly type: 'magic_link';
  readonly email: string;
  readonly redirectUrl: string;
  readonly action: 'login' | 'signup' | 'verify';
  ***readonly phoneNumber?: string;                  // ফোন নম্বর দিয়েও ম্যাজিক লিংক***
  ***readonly viaWhatsApp?: boolean;                // হোয়াটসঅ্যাপে ম্যাজিক লিংক পাঠানো হবে?***
}

// ============================================================
// Session Transfer Token Payload (Device to device - Bangladesh specific)
// ============================================================
export interface SessionTransferTokenPayload extends BaseTokenPayload {
  readonly type: 'session_transfer';
  readonly fromSessionId: string;
  readonly toDeviceId: string;
  readonly transferMethod: 'qr_code' | 'magic_link' | 'otp';
  ***readonly viaWhatsApp?: boolean;                // হোয়াটসঅ্যাপে ট্রান্সফার কোড পাঠানো***
  ***readonly viaSms?: boolean;                     // এসএমএসে ট্রান্সফার কোড পাঠানো***
  ***readonly featurePhoneCompatible?: boolean;     // ফিচার ফোনের জন্য কম্প্যাটিবল মোড***
}

// ============================================================
// Device Trust Token Payload
// ============================================================
export interface DeviceTrustTokenPayload extends BaseTokenPayload {
  readonly type: 'device_trust';
  readonly deviceId: string;
  readonly trustLevel: number;
  readonly userId: string;
  ***readonly deviceType?: 'mobile' | 'desktop' | 'feature_phone';***
  ***readonly isPublicDevice?: boolean;             // পাবলিক ডিভাইস (সাইবার ক্যাফে/কিওস্ক)***
}

// ============================================================
***// বাংলাদেশ স্পেসিফিক: MFS অথেনটিকেশন টোকেন পেলোড (বিকাশ/নগদ/রকেট)***
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

***// বাংলাদেশ স্পেসিফিক: হোয়াটসঅ্যাপ ওটিপি টোকেন পেলোড***
export interface WhatsAppOTPPayload extends BaseTokenPayload {
  readonly type: 'whatsapp_otp';
  readonly phoneNumber: string;
  readonly countryCode: '880';                    // বাংলাদেশের জন্য ফিক্সড
  readonly userId: string;
  readonly purpose: 'login' | 'verification' | 'password_reset';
  readonly businessAccountId?: string;             // হোয়াটসঅ্যাপ বিজনেস অ্যাকাউন্ট আইডি
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
  ***readonly allowedDistricts?: readonly string[];   // কোন জেলা থেকে এই API Key ব্যবহার করা যাবে***
  ***readonly allowedNetworkTypes?: readonly ('2g' | '3g' | '4g' | '5g' | 'wifi')[];  // নেটওয়ার্ক রেস্ট্রিকশন***
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
    readonly district?: string;                   // বাংলাদেশ স্পেসিফিক
    readonly upazila?: string;                    ***// উপজেলা***
    readonly division?: string;                   ***// বিভাগ***
    readonly postalCode?: string;                 ***// পোস্টাল কোড***
  };
  readonly purpose?: string;
  readonly redirectUrl?: string;
  readonly originalToken?: string;                // For one-time display (e.g., backup codes)
  ***readonly networkInfo?: {                      // নেটওয়ার্ক ইনফরমেশন***
    readonly networkType?: '2g' | '3g' | '4g' | '5g' | 'wifi' | 'unknown';
    readonly mobileOperator?: 'gp' | 'robi' | 'banglalink' | 'teletalk' | 'unknown';
    readonly isVpn?: boolean;
    readonly isProxy?: boolean;
    readonly isTor?: boolean;
  };
  ***readonly simInfo?: {                         // সিম ইনফরমেশন (সিম সুইপ ডিটেকশনের জন্য)***
    readonly operator?: 'gp' | 'robi' | 'banglalink' | 'teletalk' | 'unknown';
    readonly iccidHash?: string;                  // হ্যাশড ICCID (সিম ইউনিক আইডি)
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
  ***readonly requiresAdditionalVerification?: boolean;  // অতিরিক্ত ভেরিফিকেশন দরকার? (যেমন: সিম সুইপ সন্দেহ)***
  ***readonly suggestedAction?: 'allow' | 'mfa_required' | 'block' | 'notify_admin';  // সুপারিশকৃত অ্যাকশন***
}

// ============================================================
// Token Error Types (বাংলাদেশ স্পেসিফিক এরর যোগ করা হয়েছে)
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
  ***| 'TOKEN_DISTRICT_MISMATCH'      // টোকেনের জেলা বর্তমান জেলার সাথে মিলেনি***
  ***| 'TOKEN_NETWORK_TYPE_MISMATCH'   // নেটওয়ার্ক টাইপ পরিবর্তন হয়েছে (যেমন: ওয়াইফাই থেকে মোবাইল নেটওয়ার্ক)***
  ***| 'TOKEN_SIM_SWAP_DETECTED'       // সিম সুইপ ডিটেক্ট করা হয়েছে***
  ***| 'TOKEN_SUSPICIOUS_HOUR'         // রাতের বেলায় অস্বাভাবিক অ্যাক্সেস***
  ***| 'TOKEN_WEEKEND_RESTRICTION';     // উইকেন্ডে রেস্ট্রিকশন (যদি কনফিগার করা থাকে)***

// ============================================================
// Create Token Request (Internal)
// ============================================================
export interface CreateTokenRequest {
  readonly userId: string;
  readonly type: TokenType;
  readonly expiresInSeconds: number;
  readonly metadata?: Partial<TokenMetadata>;
  readonly customClaims?: Record<string, unknown>;
  ***readonly mfaStatus?: 'verified' | 'pending' | 'required';  // MFA স্ট্যাটাস***
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
  ***readonly mfaRequired?: boolean;                // MFA দরকার কিনা***
  ***readonly mfaMethods?: readonly ('totp' | 'sms' | 'whatsapp' | 'bkash' | 'nagad' | 'rocket')[];  // উপলব্ধ MFA পদ্ধতি***
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
  ***readonlu simSwapDetected?: boolean;            // সিম সুইপের কারণে ব্ল্যাকলিস্ট করা হয়েছে?***
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
  ***readonly allowedDistricts?: readonly string[];   // কোন জেলা থেকে এই API Key ব্যবহার করা যাবে***
  ***readonly allowedTimes?: {                        // কোন সময়ে ব্যবহার করা যাবে***
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
  ***readonly allowedDistricts?: readonly string[];   // সীমাবদ্ধ জেলার তালিকা***
  ***readonly usageStats?: {                        // ব্যবহারের পরিসংখ্যান***
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
  ***readonly districtAllowed?: boolean;            // বর্তমান জেলা অনুমোদিত কিনা***
  ***readonly timeAllowed?: boolean;                 // বর্তমান সময় অনুমোদিত কিনা***
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
  ***readonly district?: string;                     // বাংলাদেশ স্পেসিফিক***
  ***readonly networkType?: string;                  // নেটওয়ার্ক টাইপ***
  ***readonly mfaVerified?: boolean;                 // MFA ভেরিফাইড কিনা***
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
    ***readonly district?: string;                    // বর্তমান জেলা (লোকেশন চেঞ্জ ডিটেক্ট করতে)***
    ***readonly networkType?: string;                 // বর্তমান নেটওয়ার্ক টাইপ***
  };
}

export interface TokenRotationResponse {
  readonly accessToken: string;
  readonly refreshToken: string;
  readonly accessTokenExpiresIn: number;
  readonly refreshTokenExpiresIn: number;
  readonly tokenVersion: number;
  ***readonly warning?: string;                       // সাসপিসিয়াস অ্যাক্টিভিটি সনাক্ত হলে ওয়ার্নিং***
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
  
  ***// বাংলাদেশ স্পেসিফিক স্ট্যাটিস্টিকস***
  ***readonly tokensByDistrict?: Record<string, number>;  // কোন জেলা থেকে বেশি টোকেন ব্যবহার হচ্ছে***
  ***readonly tokensByNetworkType?: Record<string, number>; // কোন নেটওয়ার্ক টাইপ থেকে বেশি টোকেন ব্যবহার হচ্ছে***
  ***readonly simSwapTokenRevocations?: number;           // সিম সুইপের কারণে কত টোকেন রিভোক করা হয়েছে***
  ***readonly mfaMethodDistribution?: Record<string, number>;  // কোন MFA পদ্ধতি বেশি ব্যবহার হচ্ছে (SMS, WhatsApp, bKash ইত্যাদি)***
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
  ***readonly district?: string;                     // জেলা ফিল্টার***
  ***readonly networkType?: string;                  // নেটওয়ার্ক টাইপ ফিল্টার***
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
  ***| 'token.sim_swap_detected'                    // সিম সুইপ ডিটেক্ট হয়েছে***
  ***| 'token.district_mismatch'                    // জেলা মিসম্যাচ সনাক্ত হয়েছে***
  ***| 'token.suspicious_hour_access';               // অস্বাভাবিক সময়ে অ্যাক্সেস***

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
  ***readonly location?: {                          // ইভেন্টের লোকেশন তথ্য***
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
  ***| 'token.sim_swap.revoked'                     // সিম সুইপের কারণে টোকেন রিভোক করা হয়েছে***
  ***| 'token.mfa.required';                         // MFA প্রয়োজন হয়েছে***

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
    ***readonly district?: string;                    // বর্তমান জেলা***
    ***readonly networkType?: string;                 // বর্তমান নেটওয়ার্ক টাইপ***
  };
  ***readonly viaWhatsApp?: boolean;                 // হোয়াটসঅ্যাপে ম্যাজিক লিংক পাঠানো হবে?***
  ***readonly phoneNumber?: string;                  // ফোন নম্বর (হোয়াটসঅ্যাপের জন্য)***
}

export interface PasswordlessLoginResponse {
  readonly success: boolean;
  readonly message: string;
  readonly emailSent: boolean;
  readonly expiresInSeconds: number;
  ***readonly whatsappSent?: boolean;                // হোয়াটসঅ্যাপে পাঠানো হয়েছে কিনা***
  ***readonly smsSent?: boolean;                     // এসএমএসে পাঠানো হয়েছে কিনা***
}
