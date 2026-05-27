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
  // ========== Bangladesh Specific Token Types ==========
  | 'mfs_verification'        // bKash/Nagad/Rocket verification
  | 'sim_swap_recovery'       // SIM swap recovery token
  | 'offline_mfa'             // Offline MFA code (for poor network)
  | 'nid_verification'        // NID verification token
  | 'agent_auth'              // Delivery/MFS agent authentication
  | 'family_share'            // Family sharing invitation token
  | 'kiosk_session';          // Public kiosk session token

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
// Access Token Payload (Enhanced for Bangladesh)
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

  // ========== Bangladesh Specific Fields ==========
  readonly district?: string;                     // জেলা
  readonly upazila?: string;                      // উপজেলা
  readonly division?: 'dhaka' | 'chattogram' | 'rajshahi' | 'khulna' | 'barishal' | 'sylhet' | 'rangpur' | 'mymensingh';
  readonly mobileOperator?: 'gp' | 'robi' | 'banglalink' | 'teletalk' | 'unknown';
  readonly networkType?: '2g' | '3g' | '4g' | '5g' | 'wifi' | 'unknown';
  readonly isPremiumCustomer?: boolean;
  readonly isVendor?: boolean;
  readonly isDeliveryAgent?: boolean;
  readonly isMfsAgent?: boolean;
  readonly dataSaverEnabled?: boolean;            // ডাটা সেভার মোড অন/অফ
  readonly allowOfflineAccess?: boolean;          // অফলাইন অ্যাক্সেস অনুমতি (দুর্বল নেটওয়ার্কের জন্য)
  readonly parentApprovalRequired?: boolean;      // প্যারেন্টাল কন্ট্রোল (১৮ বছরের নিচে)
  readonly dailySpentAmount?: number;             // আজকের খরচের পরিমাণ (BDT)
  readonly dailyLimit?: number;                   // দৈনিক লিমিট (BDT)
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

  // ========== Bangladesh Specific ==========
  readonly networkType?: '2g' | '3g' | '4g' | '5g' | 'wifi' | 'unknown';
  readonly allowExtendedTTL?: boolean;            // দুর্বল নেটওয়ার্কের জন্য বাড়তি TTL
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
  // ========== Bangladesh Specific ==========
  | 'nid_verification'
  | 'tin_verification'
  | 'trade_license_verification'
  | 'birth_registration_verification'
  | 'mfs_account_linking'
  | 'sim_swap_prevention'
  | 'kyc_upgrade';

export interface VerificationTokenPayload extends BaseTokenPayload {
  readonly type: 'email_verification' | 'phone_verification' | 'password_reset';
  readonly purpose: VerificationPurpose;
  readonly userId: string;
  readonly newValue?: string;                      // New email/phone for change
  readonly redirectUrl?: string;

  // ========== Bangladesh Specific ==========
  readonly nidNumber?: string;                    // NID verification
  readonly tinNumber?: string;                    // TIN verification
  readonly tradeLicenseNumber?: string;           // Trade license verification
  readonly birthRegistrationNumber?: string;      // Birth registration verification
  readonly mfsAccountNumber?: string;             // bKash/Nagad/Rocket account linking
  readonly mfsProvider?: 'bkash' | 'nagad' | 'rocket';
}

// ============================================================
// MFA Token Payload (Enhanced for Bangladesh)
// ============================================================
export interface MFATokenPayload extends BaseTokenPayload {
  readonly type: 'mfa' | 'mfa_backup';
  readonly methodId: string;
  readonly verificationType: string;
  readonly userId: string;
  readonly sessionId: string;
  readonly trustDevice: boolean;
  readonly trustDurationDays?: number;

  // ========== Bangladesh Specific ==========
  readonly mfsProvider?: 'bkash' | 'nagad' | 'rocket';  // MFA using bKash/Nagad PIN
  readonly whatsappOtpSent?: boolean;                    // WhatsApp OTP for MFA
  readonly voiceCallOtpSent?: boolean;                   // Voice call OTP for feature phones
  readonly offlineMfaCode?: string;                      // Pre-generated offline MFA code
  readonly simSwapCheckRequired?: boolean;               // SIM swap check before MFA
}

// ============================================================
// Magic Link Token Payload (Passwordless login)
// ============================================================
export interface MagicLinkTokenPayload extends BaseTokenPayload {
  readonly type: 'magic_link';
  readonly email: string;
  readonly redirectUrl: string;
  readonly action: 'login' | 'signup' | 'verify';

  // ========== Bangladesh Specific ==========
  readonly phoneNumber?: string;                  // Phone-based magic link (SMS/WhatsApp)
  readonly deliveryMethod?: 'email' | 'sms' | 'whatsapp' | 'imo';
}

// ============================================================
// Session Transfer Token Payload (Device to device - Bangladesh specific)
// ============================================================
export interface SessionTransferTokenPayload extends BaseTokenPayload {
  readonly type: 'session_transfer';
  readonly fromSessionId: string;
  readonly fromDeviceId: string;
  readonly toDeviceId: string;
  readonly toDeviceType: 'mobile' | 'tablet' | 'desktop' | 'laptop' | 'feature_phone';
  readonly transferMethod: 'qr_code' | 'magic_link' | 'otp' | 'bluetooth' | 'nfc';
  
  // ========== Bangladesh Specific ==========
  readonly isOfflineTransfer?: boolean;           // অফলাইনে ট্রান্সফার (Bluetooth/NFC)
  readonly featurePhoneCompatible?: boolean;      // ফিচার ফোনের জন্য কম্প্যাটিবল
  readonly transferCodeHash?: string;             // হ্যাশড ট্রান্সফার কোড
  readonly requiresConfirmation: boolean;         // কনফার্মেশন প্রয়োজন কিনা
  readonly confirmationMethod?: 'sms' | 'whatsapp' | 'voice_call';
}

// ============================================================
// ========== NEW: Bangladesh Specific Token Types ==========
// ============================================================

// ============================================================
// MFS Verification Token (bKash/Nagad/Rocket account linking)
// ============================================================
export interface MFSVerificationTokenPayload extends BaseTokenPayload {
  readonly type: 'mfs_verification';
  readonly userId: string;
  readonly mfsProvider: 'bkash' | 'nagad' | 'rocket';
  readonly accountNumber: string;
  readonly maskedAccountNumber: string;
  readonly verificationMethod: 'pin' | 'otp' | 'sms';
  readonly purpose: 'link' | 'verify' | 'payment';
  readonly amount?: number;                       // For payment verification
  readonly orderId?: string;
}

// ============================================================
// SIM Swap Recovery Token (বাংলাদেশের জন্য অত্যন্ত গুরুত্বপূর্ণ)
// ============================================================
export interface SIMSwapRecoveryTokenPayload extends BaseTokenPayload {
  readonly type: 'sim_swap_recovery';
  readonly userId: string;
  readonly phoneNumber: string;
  readonly oldMobileOperator: 'gp' | 'robi' | 'banglalink' | 'teletalk';
  readonly newMobileOperator: 'gp' | 'robi' | 'banglalink' | 'teletalk';
  readonly swapDetectedAt: Date;
  readonly recoveryMethod: 'email' | 'nid' | 'security_questions' | 'admin_override';
  readonly nidVerificationToken?: string;
  readonly requiresIdentityVerification: boolean;
  readonly temporaryAccessHours: number;          // সীমিত সময়ের জন্য অ্যাক্সেস
}

// ============================================================
// Offline MFA Token (দুর্বল নেটওয়ার্কের জন্য)
// ============================================================
export interface OfflineMFATokenPayload extends BaseTokenPayload {
  readonly type: 'offline_mfa';
  readonly userId: string;
  readonly offlineCodeId: string;
  readonly codeIndex: number;                     // 0-19 (pre-generated codes)
  readonly codeHash: string;
  readonly used: boolean;
  readonly generatedAt: Date;
  readonly validUntil: Date;
  readonly deviceId: string;
  readonly isEmergencyUse: boolean;
}

// ============================================================
// NID Verification Token (জাতীয় পরিচয়পত্র ভেরিফিকেশন)
// ============================================================
export interface NIDVerificationTokenPayload extends BaseTokenPayload {
  readonly type: 'nid_verification';
  readonly userId: string;
  readonly nidNumber: string;
  readonly nidType: 'old' | 'new';                // পুরনো NID (10 digits) বা নতুন NID (17 digits)
  readonly birthDate?: string;                    // জন্ম তারিখ (DD/MM/YYYY)
  readonly fatherName?: string;                   // পিতার নাম
  readonly motherName?: string;                   // মাতার নাম
  readonly verificationPurpose: 'kyc' | 'vendor_verification' | 'mfs_account' | 'sim_swap_recovery';
  readonly verifiedAt?: Date;
}

// ============================================================
// Agent Authentication Token (ডেলিভারি এজেন্ট / MFS এজেন্ট)
// ============================================================
export interface AgentAuthTokenPayload extends BaseTokenPayload {
  readonly type: 'agent_auth';
  readonly userId: string;
  readonly agentType: 'delivery' | 'mfs' | 'district_manager' | 'upzila_agent';
  readonly agentId: string;
  readonly assignedDistrict: string;               // কোন জেলায় কাজ করার অনুমতি আছে
  readonly assignedUpazila?: string;              // কোন উপজেলায় কাজ করার অনুমতি আছে
  readonly deviceId: string;
  readonly shiftStartTime?: string;               // শিফট শুরুর সময়
  readonly shiftEndTime?: string;                 // শিফট শেষের সময়
  readonly maxDailyDelivery?: number;             // সর্বোচ্চ ডেলিভারি সংখ্যা (ডেলিভারি এজেন্টের জন্য)
  readonly maxTransactionAmount?: number;         // সর্বোচ্চ লেনদেন পরিমাণ (MFS এজেন্টের জন্য)
}

// ============================================================
// Family Sharing Token (যৌথ পরিবারের জন্য)
// ============================================================
export interface FamilyShareTokenPayload extends BaseTokenPayload {
  readonly type: 'family_share';
  readonly ownerUserId: string;
  readonly familyMemberId: string;
  readonly familyMemberName: string;
  readonly familyMemberAge: number;
  readonly relationship: 'parent' | 'child' | 'spouse' | 'sibling' | 'other';
  readonly permissions: readonly ('view_orders' | 'track_orders' | 'add_to_cart' | 'wishlist' | 'limited_payment' | 'full_payment')[];
  readonly dailyLimit?: number;                   // BDT (for limited_payment)
  readonly expiresAt: Date;
  readonly requiresParentalApproval: boolean;     // 18 বছরের নিচে হলে এপ্রুভাল দরকার
  readonly invitationMethod: 'sms' | 'whatsapp' | 'qr_code';
}

// ============================================================
// Kiosk Session Token (পাবলিক কিয়স্ক/সাইবার ক্যাফে)
// ============================================================
export interface KioskSessionTokenPayload extends BaseTokenPayload {
  readonly type: 'kiosk_session';
  readonly userId: string;
  readonly kioskId: string;
  readonly kioskLocation: {
    readonly district: string;
    readonly upazila?: string;
    readonly latitude?: number;
    readonly longitude?: number;
  };
  readonly sessionDurationMinutes: number;        // সাধারণত 30 মিনিট
  readonly allowedActions: readonly ('browse' | 'cart' | 'mfs_payment')[];
  readonly mfsOnly: boolean;                      // শুধু MFS পেমেন্ট অনুমোদিত (কার্ড/ব্যাংক নয়)
  readonly autoLogoutOnClose: boolean;
  readonly warningMessageShown: boolean;          // "পাসওয়ার্ড সংরক্ষণ করবেন না" বার্তা দেখানো হয়েছে কিনা
}

// ============================================================
// Device Trust Token Payload (Enhanced)
// ============================================================
export interface DeviceTrustTokenPayload extends BaseTokenPayload {
  readonly type: 'device_trust';
  readonly deviceId: string;
  readonly trustLevel: number;
  readonly userId: string;

  // ========== Bangladesh Specific ==========
  readonly networkTypeWhenTrusted?: '2g' | '3g' | '4g' | '5g' | 'wifi';
  readonly locationWhenTrusted?: {
    readonly district: string;
    readonly upazila?: string;
  };
  readonly isFamilySharedDevice?: boolean;
  readonly familyMemberId?: string;
}

// ============================================================
// API Key Payload (Enhanced for Bangladesh)
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

  // ========== Bangladesh Specific ==========
  readonly allowedDistricts?: readonly string[];   // কোন জেলা থেকে API কল অনুমোদিত
  readonly mfaRequired?: boolean;                  // API কলের জন্য MFA প্রয়োজন কিনা
  readonly allowedNetworkTypes?: readonly ('2g' | '3g' | '4g' | '5g' | 'wifi')[];
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
// Token Metadata (Enhanced for Bangladesh)
// ============================================================
export interface TokenMetadata {
  readonly ipAddress?: string;
  readonly userAgent?: string;
  readonly deviceId?: string;
  readonly deviceName?: string;
  readonly location?: {
    readonly country?: string;
    readonly city?: string;
    readonly district?: string;                   // বাংলাদেশের জেলা
    readonly upazila?: string;                    // বাংলাদেশের উপজেলা
    readonly division?: string;                   // বাংলাদেশের বিভাগ
  };
  readonly purpose?: string;
  readonly redirectUrl?: string;
  readonly originalToken?: string;                // For one-time display (e.g., backup codes)

  // ========== Bangladesh Specific ==========
  readonly networkType?: '2g' | '3g' | '4g' | '5g' | 'wifi' | 'unknown';
  readonly mobileOperator?: 'gp' | 'robi' | 'banglalink' | 'teletalk' | 'unknown';
  readonly dataSaverEnabled?: boolean;
  readonly isOfflineGenerated?: boolean;          // অফলাইনে টোকেন জেনারেট করা হয়েছে কিনা
  readonly featurePhoneMode?: boolean;            // ফিচার ফোন মোড সক্রিয় কিনা
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
// Token Error Types (Enhanced for Bangladesh)
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
  // ========== Bangladesh Specific Errors ==========
  | 'TOKEN_DISTRICT_MISMATCH'        // ভিন্ন জেলা থেকে টোকেন ব্যবহার করা হচ্ছে
  | 'TOKEN_NETWORK_TYPE_MISMATCH'    // ভিন্ন নেটওয়ার্ক টাইপ (যেমন 2G → 4G)
  | 'TOKEN_SIM_SWAP_DETECTED'        // সিম সোয়াপ ডিটেক্ট হয়েছে
  | 'TOKEN_OFFLINE_CODE_USED'        // অফলাইন কোড ইতিমধ্যে ব্যবহার করা হয়েছে
  | 'TOKEN_AGENT_OUT_OF_AREA'        // এজেন্ট নিজের এলাকার বাইরে কাজ করছে
  | 'TOKEN_FAMILY_SHARE_EXPIRED';    // ফ্যামিলি শেয়ার টোকেন এক্সপায়ার্ড

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

  // ========== Bangladesh Specific ==========
  readonly requiresOfflineMode?: boolean;         // অফলাইন মোড সুপারিশ করা হচ্ছে কিনা
  readonly offlineMfaCodes?: readonly string[];   // অফলাইন MFA কোড (যদি প্রয়োজন হয়)
  readonly networkTypeDetected?: string;          // ডিটেক্ট করা নেটওয়ার্ক টাইপ
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
// Create API Key Request (Enhanced)
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

  // ========== Bangladesh Specific ==========
  readonly allowedDistricts?: readonly string[];
  readonly mfaRequired?: boolean;
  readonly allowedNetworkTypes?: readonly ('2g' | '3g' | '4g' | '5g' | 'wifi')[];
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

  // ========== Bangladesh Specific ==========
  readonly allowedDistricts?: readonly string[];
}

// ============================================================
// API Key Validation Result (Enhanced)
// ============================================================
export interface APIKeyValidationResult {
  readonly valid: boolean;
  readonly payload: APIKeyPayload | null;
  readonly error?: string;
  readonly isExpired: boolean;
  readonly hasPermission: (permission: PermissionString) => boolean;
  
  // ========== Bangladesh Specific ==========
  readonly districtAllowed?: boolean;
  readonly networkTypeAllowed?: boolean;
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

  // ========== Bangladesh Specific ==========
  readonly district?: string;
  readonly upazila?: string;
  readonly division?: string;
  readonly agentType?: 'delivery' | 'mfs' | 'district_manager';
  readonly allowedDistricts?: readonly string[];
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
    readonly networkType?: '2g' | '3g' | '4g' | '5g' | 'wifi';
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

  // ========== Bangladesh Specific ==========
  readonly mfaTokensByProvider: {
    readonly totp?: number;
    readonly sms?: number;
    readonly whatsapp?: number;
    readonly bkash?: number;
    readonly nagad?: number;
    readonly rocket?: number;
  };
  readonly offlineMfaUsage: number;               // অফলাইন MFA ব্যবহারের সংখ্যা
  readonly simSwapRecoveryTokens: number;         // সিম সোয়াপ রিকভারি টোকেনের সংখ্যা
  readonly tokensByNetworkType: Record<string, number>;
  readonly tokensByDistrict: Record<string, number>;
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
  
  // ========== Bangladesh Specific ==========
  readonly district?: string;
  readonly networkType?: '2g' | '3g' | '4g' | '5g' | 'wifi';
  readonly mfsProvider?: 'bkash' | 'nagad' | 'rocket';
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
  // ========== Bangladesh Specific ==========
  | 'token.mfs_verification.created'
  | 'token.mfs_verification.used'
  | 'token.sim_swap_recovery.created'
  | 'token.sim_swap_recovery.used'
  | 'token.offline_mfa.generated'
  | 'token.offline_mfa.used'
  | 'token.agent_auth.created'
  | 'token.agent_auth.expired'
  | 'token.family_share.created'
  | 'token.family_share.accepted'
  | 'token.kiosk_session.created'
  | 'token.kiosk_session.terminated';

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
  | 'token.api_key.revoked'
  // ========== Bangladesh Specific ==========
  | 'token.sim_swap_recovery.triggered'
  | 'token.offline_mfa.used'
  | 'token.agent_auth.created';

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
  readonly email?: string;
  readonly phoneNumber?: string;                  // বাংলাদেশের জন্য ফোন নম্বর দিয়েও লগইন
  readonly redirectUrl: string;
  readonly deviceInfo?: {
    readonly deviceId?: string;
    readonly userAgent?: string;
    readonly ipAddress?: string;
    readonly networkType?: '2g' | '3g' | '4g' | '5g' | 'wifi';
  };
  readonly deliveryMethod?: 'email' | 'sms' | 'whatsapp' | 'imo';  // বাংলাদেশের জন্য এক্সট্রা অপশন
}

export interface PasswordlessLoginResponse {
  readonly success: boolean;
  readonly message: string;
  readonly emailSent: boolean;
  readonly smsSent?: boolean;
  readonly whatsappSent?: boolean;
  readonly expiresInSeconds: number;
  readonly deliveryMethod: string;
}
