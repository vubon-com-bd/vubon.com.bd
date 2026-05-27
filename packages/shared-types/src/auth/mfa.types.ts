/**
 * MFA Types - Pure TypeScript type contracts for Multi-Factor Authentication
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module shared-types/auth-types/auth/mfa.types
 * 
 * RULES:
 * ✅ ONLY type declarations, interfaces, unions
 * ✅ NO OTP generation, TOTP verification, QR code generation
 * ✅ NO functions, classes, enums
 * ✅ NO validation schemas (Zod)
 * ✅ NO framework imports
 */

import type {
  MFA_PROVIDERS,
  MFA_STATUS,
  MFA_VERIFICATION_TYPES,
  OTP_CONFIG,
  RECOVERY_CODES,
  MFA_TIMEOUTS,
  MFA_PRESETS,
} from '@vubon/auth-constants';

// ============================================================
// MFA Provider Types (Based on constants - NO enums)
// ============================================================
export type MFAProvider = typeof MFA_PROVIDERS[keyof typeof MFA_PROVIDERS];

// Extended MFA providers for Bangladesh
export type ExtendedMFAProvider = 
  | MFAProvider
  | 'whatsapp_otp'      // WhatsApp OTP (popular in BD)
  | 'imo_otp'           // Imo OTP (Bangladesh specific)
  | 'bkash_pin'         // bKash PIN as MFA
  | 'nagad_pin'         // Nagad PIN as MFA
  | 'rocket_pin'        // Rocket PIN as MFA
  | 'voice_call_otp';   // Voice call OTP for feature phones

// ============================================================
// MFA Status Types (Based on constants)
// ============================================================
export type MFAStatus = typeof MFA_STATUS[keyof typeof MFA_STATUS];

// Extended MFA status
export type ExtendedMFAStatus = 
  | MFAStatus
  | 'setup_in_progress'
  | 'enabled_default'
  | 'enabled_multi'
  | 'disabled_by_admin'
  | 'disabled_by_user'
  | 'recovery_mode';

// ============================================================
// MFA Verification Types (Based on constants)
// ============================================================
export type MFAVerificationType = typeof MFA_VERIFICATION_TYPES[keyof typeof MFA_VERIFICATION_TYPES];

// Extended verification types
export type ExtendedMFAVerificationType = 
  | MFAVerificationType
  | 'high_value_order'      // > 25,000 BDT
  | 'international_order'
  | 'bulk_order'
  | 'first_time_payment'
  | 'new_payment_method';

// ============================================================
// MFA Method Entity (Core domain model)
// ============================================================
export interface MFAMethod {
  readonly id: string;
  readonly userId: string;
  readonly provider: ExtendedMFAProvider;
  readonly identifier: string;           // email, phone number, key ID
  readonly label: string | null;         // User-friendly name (e.g., "My Google Auth")
  readonly isPrimary: boolean;
  readonly isVerified: boolean;
  readonly isBackup: boolean;
  readonly priority: number;              // 1 = highest priority
  readonly createdAt: Date;
  readonly verifiedAt: Date | null;
  readonly lastUsedAt: Date | null;
  readonly lastFailedAt: Date | null;
  readonly failedAttempts: number;
  readonly metadata: MFAMethodMetadata;
}

// MFA Method Metadata
export interface MFAMethodMetadata {
  readonly deviceInfo?: {
    readonly deviceId?: string;
    readonly deviceName?: string;
    readonly os?: string;
    readonly browser?: string;
  };
  readonly locationInfo?: {
    readonly ipAddress?: string;
    readonly country?: string;
    readonly city?: string;
  };
  readonly backupCodesRemaining?: number;
  readonly totpInfo?: TOTPMetadata;
  readonly webauthnInfo?: WebAuthnMetadata;
  readonly whatsappInfo?: WhatsAppMetadata;      // Bangladesh specific
  readonly bkashInfo?: MFSMetadata;               // Bangladesh specific
}

// ============================================================
// TOTP Specific Data
// ============================================================
export interface TOTPMetadata {
  readonly secret: string;                 // Encrypted secret
  readonly algorithm: string;              // 'SHA-1', 'SHA-256', 'SHA-512'
  readonly digits: number;                 // 6 or 8
  readonly period: number;                 // 30 seconds default
  readonly window: number;                 // Allowed time window (1 = before/after)
  readonly issuer: string;                 // 'vubon.com.bd'
  readonly accountName: string;            // email or phone
}

// ============================================================
// Backup Code Entity
// ============================================================
export interface BackupCode {
  readonly id: string;
  readonly userId: string;
  readonly codeHash: string;               // Hashed, not plain text
  readonly used: boolean;
  readonly usedAt: Date | null;
  readonly createdAt: Date;
  readonly expiresAt: Date | null;
}

export interface BackupCodesResponse {
  readonly codes: ReadonlyArray<string>;   // Plain text (one-time display)
  readonly remainingCount: number;
  readonly totalCount: number;
  readonly regenerateLink: string;
  readonly downloadLink?: string;
}

// ============================================================
// WebAuthn Specific Data
// ============================================================
export interface WebAuthnMetadata {
  readonly credentialId: string;
  readonly publicKey: string;
  readonly signCount: number;
  readonly deviceName: string;
  readonly aaguid: string;                 // Authenticator Attestation GUID
  readonly transports: ReadonlyArray<'usb' | 'nfc' | 'ble' | 'internal'>;
  readonly backupEligible: boolean;
  readonly backupState: boolean;
}

// WebAuthn Registration Request
export interface WebAuthnRegistrationRequest {
  readonly userId: string;
  readonly deviceName: string;
  readonly displayName?: string;
  readonly authenticatorType?: 'platform' | 'cross-platform';
}

// WebAuthn Registration Response
export interface WebAuthnRegistrationResponse {
  readonly challenge: string;
  readonly rpId: string;
  readonly rpName: string;
  readonly userId: string;
  readonly userName: string;
  readonly userDisplayName: string;
  readonly timeout: number;
  readonly attestation: 'none' | 'indirect' | 'direct';
  readonly authenticatorSelection?: {
    readonly authenticatorAttachment?: 'platform' | 'cross-platform';
    readonly residentKey?: 'discouraged' | 'preferred' | 'required';
    readonly userVerification?: 'discouraged' | 'preferred' | 'required';
  };
}

// WebAuthn Authentication Request
export interface WebAuthnAuthRequest {
  readonly challenge: string;
  readonly rpId: string;
  readonly timeout: number;
  readonly allowCredentials?: ReadonlyArray<{
    readonly id: string;
    readonly type: 'public-key';
    readonly transports?: ReadonlyArray<'usb' | 'nfc' | 'ble' | 'internal'>;
  }>;
  readonly userVerification?: 'discouraged' | 'preferred' | 'required';
}

// ============================================================
// WhatsApp OTP (Bangladesh specific)
// ============================================================
export interface WhatsAppMetadata {
  readonly phoneNumber: string;
  readonly verifiedAt: Date;
  readonly lastOtpSentAt: Date | null;
  readonly otpCount: number;
}

// ============================================================
// Mobile Financial Services (MFS) MFA - Bangladesh specific
// ============================================================
export interface MFSMetadata {
  readonly provider: 'bkash' | 'nagad' | 'rocket';
  readonly accountNumber: string;
  readonly maskedAccountNumber: string;    // e.g., "017*****123"
  readonly verifiedAt: Date;
  readonly lastPinVerifiedAt: Date | null;
}

// ============================================================
// MFA Setup Request/Response
// ============================================================
export interface MFASetupRequest {
  readonly userId: string;
  readonly provider: ExtendedMFAProvider;
  readonly identifier: string;
  readonly label?: string;
  readonly setAsPrimary?: boolean;
  readonly metadata?: Record<string, unknown>;
}

export interface MFASetupResponse {
  readonly methodId: string;
  readonly provider: ExtendedMFAProvider;
  readonly qrCodeUrl?: string;              // For TOTP (URL only, no generation)
  readonly secret?: string;                 // For TOTP (one-time display)
  readonly backupCodes?: ReadonlyArray<string>;
  readonly whatsappCode?: string;           // For WhatsApp verification
  readonly instructions?: string;
  readonly expiresAt: Date;
}

// ============================================================
// MFA Verification Request/Response
// ============================================================
export interface MFAVerificationRequest {
  readonly userId: string;
  readonly methodId?: string;               // If null, try primary
  readonly code: string;
  readonly verificationType: ExtendedMFAVerificationType;
  readonly trustDevice?: boolean;
  readonly trustDurationDays?: number;
  readonly challengeId?: string;
}

export interface MFAVerificationResult {
  readonly success: boolean;
  readonly verified: boolean;
  readonly methodUsed: ExtendedMFAProvider | null;
  readonly remainingAttempts: number;
  readonly isLocked: boolean;
  readonly lockExpiresAt?: Date;
  readonly error?: string;
  readonly errorCode?: string;
  readonly requiresAlternativeMethod: boolean;
  readonly alternativeMethods?: ReadonlyArray<ExtendedMFAProvider>;
}

// ============================================================
// MFA Status Response
// ============================================================
export interface MFAStatusResponse {
  readonly enabled: boolean;
  readonly status: ExtendedMFAStatus;
  readonly methods: ReadonlyArray<MFAMethodDTO>;
  readonly requiredForRole: boolean;
  readonly requiredForAction: boolean;
  readonly trustedDevices: ReadonlyArray<string>;
  readonly recoveryCodesRemaining: number;
  readonly defaultMethod: ExtendedMFAProvider | null;
  readonly recommendedMethods: ReadonlyArray<ExtendedMFAProvider>;
}

// MFA Method DTO (API response)
export interface MFAMethodDTO {
  readonly id: string;
  readonly provider: ExtendedMFAProvider;
  readonly identifier: string;              // Masked for security
  readonly label: string | null;
  readonly isPrimary: boolean;
  readonly isVerified: boolean;
  readonly isBackup: boolean;
  readonly priority: number;
  readonly createdAt: string;               // ISO date
  readonly lastUsedAt: string | null;
  readonly iconName: string;
  readonly displayName: string;
}

// ============================================================
// Disable MFA Request
// ============================================================
export interface DisableMFARequest {
  readonly userId: string;
  readonly methodId?: string;               // If undefined, disable all
  readonly code?: string;
  readonly backupCode?: string;
  readonly reason?: string;
  readonly adminId?: string;                // If disabled by admin
}

// ============================================================
// MFA Recovery Request/Response
// ============================================================
export interface MFARecoveryRequest {
  readonly userId: string;
  readonly backupCode: string;
  readonly newPassword?: string;            // Optional password reset
  readonly trustDevice?: boolean;
}

export interface MFARecoveryResponse {
  readonly success: boolean;
  readonly recovered: boolean;
  readonly newSessionCreated: boolean;
  readonly sessionId?: string;
  readonly requiresPasswordReset: boolean;
  readonly remainingBackupCodes: number;
  readonly regenerateBackupCodesRequired: boolean;
}

// ============================================================
// MFA Challenge Request/Response (For step-up auth)
// ============================================================
export interface MFAChallengeRequest {
  readonly userId: string;
  readonly verificationType: ExtendedMFAVerificationType;
  readonly preferredMethod?: ExtendedMFAProvider;
  readonly forceMethod?: boolean;
  readonly metadata?: {
    readonly amount?: number;               // For payment verification
    readonly orderId?: string;
    readonly deviceId?: string;
    readonly ipAddress?: string;
  };
}

export interface MFAChallengeResponse {
  readonly challengeId: string;
  readonly requiredMethods: ReadonlyArray<ExtendedMFAProvider>;
  readonly expiresAt: Date;
  readonly remainingAttempts: number;
  readonly sessionRequired: boolean;
  readonly verificationType: ExtendedMFAVerificationType;
  readonly instructions?: string;
}

// ============================================================
// MFA Risk Assessment (Adaptive MFA)
// ============================================================
export interface MFARiskAssessment {
  readonly riskScore: number;               // 0-100
  readonly riskLevel: 'low' | 'medium' | 'high' | 'critical';
  readonly requiresMFA: boolean;
  readonly suggestedMFAProvider: ExtendedMFAProvider | null;
  readonly reason: string;
  readonly factors: ReadonlyArray<MFARiskFactor>;
}

export interface MFARiskFactor {
  readonly factor: string;
  readonly weight: number;
  readonly score: number;
  readonly description: string;
}

// ============================================================
// MFA Preset Configuration (Based on constants)
// ============================================================
export type MFAPreset = keyof typeof MFA_PRESETS;

export interface MFAPresetConfig {
  readonly name: MFAPreset;
  readonly requiredProviders: ReadonlyArray<ExtendedMFAProvider>;
  readonly verificationTypes: ReadonlyArray<ExtendedMFAVerificationType>;
  readonly codeValiditySeconds: number;
  readonly maxAttempts: number;
  readonly requireMfaForAllLogins: boolean;
  readonly requireReauthEveryHours?: number;
}

// ============================================================
// MFA Trusted Device
// ============================================================
export interface MFATrustedDevice {
  readonly deviceId: string;
  readonly userId: string;
  readonly trustedAt: Date;
  readonly expiresAt: Date;
  readonly verificationType: ExtendedMFAVerificationType;
  readonly mfaMethodUsed: ExtendedMFAProvider;
  readonly deviceInfo: {
    readonly userAgent: string;
    readonly ipAddress: string;
    readonly location?: string;
  };
}

// ============================================================
// MFA Event Types (For audit)
// ============================================================
export type MFAEventType = 
  | 'mfa_enabled'
  | 'mfa_disabled'
  | 'mfa_method_added'
  | 'mfa_method_removed'
  | 'mfa_method_set_primary'
  | 'mfa_verified'
  | 'mfa_failed'
  | 'mfa_backup_code_used'
  | 'mfa_recovery_used'
  | 'mfa_locked'
  | 'mfa_unlocked'
  | 'mfa_bypassed_admin';

export interface MFAEvent {
  readonly id: string;
  readonly userId: string;
  readonly eventType: MFAEventType;
  readonly mfaMethod?: ExtendedMFAProvider;
  readonly timestamp: Date;
  readonly ipAddress: string;
  readonly userAgent: string;
  readonly metadata: Record<string, unknown>;
}

// ============================================================
// MFA Settings (User preferences)
// ==========================================
export interface MFASettings {
  readonly userId: string;
  readonly defaultMethod: ExtendedMFAProvider | null;
  readonly rememberMeEnabled: boolean;
  readonly rememberMeDurationDays: number;
  readonly allowBackupCodes: boolean;
  readonly allowSMS: boolean;
  readonly allowEmail: boolean;
  readonly allowWhatsApp: boolean;          // Bangladesh specific
  readonly requireMFAForAllLogins: boolean;
  readonly requireMFAForPaymentsAbove: number | null;  // Amount in BDT
  readonly updatedAt: Date;
}

// ============================================================
// MFA Filter Options (For list APIs)
// ============================================================
export interface MFAFilterOptions {
  readonly userId?: string;
  readonly provider?: ExtendedMFAProvider;
  readonly isVerified?: boolean;
  readonly isPrimary?: boolean;
  readonly fromDate?: Date;
  readonly toDate?: Date;
  readonly limit?: number;
  readonly offset?: number;
}

// ============================================================
// MFA Statistics (For admin dashboard)
// ============================================================
export interface MFAStatistics {
  readonly totalUsers: number;
  readonly usersWithMFA: number;
  readonly mfaAdoptionRate: number;        // Percentage
  readonly methodsDistribution: Record<ExtendedMFAProvider, number>;
  readonly primaryMethodsDistribution: Record<ExtendedMFAProvider, number>;
  readonly verificationSuccessRate: number;
  readonly averageVerificationTimeMs: number;
  readonly topFailedReasons: ReadonlyArray<{ reason: string; count: number }>;
  
  readonly byTimeframe: {
    readonly enabledLastWeek: number;
    readonly enabledLastMonth: number;
    readonly verificationsLastWeek: number;
    readonly verificationsLastMonth: number;
  };
  
  // Bangladesh specific
  readonly mfsMfaUsers: number;            // bKash/Nagad/Rocket MFA
  readonly whatsappMfaUsers: number;
  readonly voiceCallMfaUsers: number;      // Feature phone users
}

// ============================================================
// MFA Webhook Events
// ============================================================
export type MFAWebhookEventType = 
  | 'mfa.method.added'
  | 'mfa.method.removed'
  | 'mfa.verification.succeeded'
  | 'mfa.verification.failed'
  | 'mfa.recovery.used'
  | 'mfa.locked'
  | 'mfa.unlocked';

export interface MFAWebhookPayload {
  readonly eventType: MFAWebhookEventType;
  readonly userId: string;
  readonly timestamp: Date;
  readonly methodUsed?: ExtendedMFAProvider;
  readonly success?: boolean;
  readonly metadata: Record<string, unknown>;
}
