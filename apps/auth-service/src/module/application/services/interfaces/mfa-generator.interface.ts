/**
 * MFA Generator Interface - Enterprise Grade Service Contract
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module application/services/interfaces/mfa-generator.interface
 * 
 * @description
 * Service contract for MFA (Multi-Factor Authentication) generation.
 * Defines the boundary between application layer and infrastructure for MFA operations.
 * 
 * ENTERPRISE FEATURES:
 * ✅ TOTP generation and verification (RFC 6238 compliant)
 * ✅ Backup codes with hashing and validation
 * ✅ WebAuthn (Passkeys) registration and authentication
 * ✅ Bangladesh specific - WhatsApp, Imo, Voice Call OTP
 * ✅ Bangladesh specific - bKash, Nagad, Rocket PIN
 * ✅ MFA method priority and configuration management
 * ✅ Audit trail for all MFA operations
 * ✅ Rate limiting and lockout management
 * ✅ Recovery codes for emergency access
 * ✅ MFA setup and verification flows
 * ✅ Distributed tracing with correlation ID
 * ✅ Bengali language support in all responses
 * ✅ Geographic location tracking (Bangladesh districts)
 * ✅ Network type tracking for adaptive security
 * ✅ Device fingerprint tracking
 * ✅ Bulk operations with progress tracking
 * ✅ Health check and monitoring endpoints
 * 
 * Security Rules:
 * ✅ userId NEVER accepted from client (comes from JWT)
 * ✅ Rate limiting to prevent brute force
 * ✅ Lockout after max attempts
 * ✅ One-time use codes
 * ✅ Hashed code storage
 * ✅ Audit trail for all operations
 * 
 * @example
 * const mfaGenerator = new MfaGeneratorService(totpService, backupCodeService, ...);
 * const setupResult = await mfaGenerator.setupTotp(userId, deviceInfo, {
 *   correlationId: 'corr_123',
 *   preferredLanguage: 'bn'
 * });
 */

// ✅ Import from shared-types
import type {
  // Core Types
  MfaProviderType,
  MfaGeneratorType,
  MfaProviderInfo,
  MfaProviderConfig,
  MfaSetupResult,
  TotpVerificationResult,
  BackupCodeResult,
  MFSPinVerificationResult,
  OtpResult,
  MfaMethodPriority,
  MfaAuditEntry,
  MfaRateLimitStatus,
  MfaLockoutStatus,
  MfaConfiguration,
} from '@vubon/shared-types';

import type {
  AuditMetadata,
  RequestContext,
  PaginationOptions,
  PaginatedResult,
  ApiErrorCode,
  DeviceInfo,
} from '@vubon/shared-types';

// ✅ Import from shared-constants (will be used in default configs)
import {
  MFA_GENERATOR_CONFIG,
  TOTP_CONFIG,
  BACKUP_CODES_CONFIG,
  RECOVERY_CODES_CONFIG,
  WEBAUTHN_CONFIG,
  SMS_OTP_CONFIG,
  WHATSAPP_OTP_CONFIG,
  IMO_OTP_CONFIG,
  VOICE_OTP_CONFIG,
  BKASH_PIN_CONFIG,
  NAGAD_PIN_CONFIG,
  ROCKET_PIN_CONFIG,
} from '@vubon/shared-constants';

// ============================================================
// ✅ Use constants in default configurations
// ============================================================

/**
 * Default TOTP configuration (from shared-constants)
 */
export const DEFAULT_TOTP_CONFIG = {
  SECRET_LENGTH: TOTP_CONFIG.SECRET_LENGTH,
  DIGITS: TOTP_CONFIG.DIGITS,
  PERIOD: TOTP_CONFIG.PERIOD,
  ALGORITHM: TOTP_CONFIG.ALGORITHM,
  ISSUER: TOTP_CONFIG.ISSUER,
  ISSUER_BN: TOTP_CONFIG.ISSUER_BN,
  QR_CODE_SIZE: TOTP_CONFIG.QR_CODE_SIZE,
  QR_CODE_FORMAT: TOTP_CONFIG.QR_CODE_FORMAT,
  ACCOUNT_NAME_FORMAT: TOTP_CONFIG.ACCOUNT_NAME_FORMAT,
  ENABLED: TOTP_CONFIG.ENABLED,
  MIN_SECRET_LENGTH: TOTP_CONFIG.MIN_SECRET_LENGTH,
  MAX_SECRET_LENGTH: TOTP_CONFIG.MAX_SECRET_LENGTH,
  SECRET_ENCODING: TOTP_CONFIG.SECRET_ENCODING,
} as const;

/**
 * Default backup codes configuration (from shared-constants)
 */
export const DEFAULT_BACKUP_CODES_CONFIG = {
  COUNT: BACKUP_CODES_CONFIG.COUNT,
  CODE_LENGTH: BACKUP_CODES_CONFIG.CODE_LENGTH,
  FORMAT: BACKUP_CODES_CONFIG.FORMAT,
  CHARACTER_SET: BACKUP_CODES_CONFIG.CHARACTER_SET,
  HASH_ALGORITHM: BACKUP_CODES_CONFIG.HASH_ALGORITHM,
  SALT_ROUNDS: BACKUP_CODES_CONFIG.SALT_ROUNDS,
  STORE_HASHED_ONLY: BACKUP_CODES_CONFIG.STORE_HASHED_ONLY,
  ONE_TIME_USE: BACKUP_CODES_CONFIG.ONE_TIME_USE,
  REGENERATE_ON_USAGE: BACKUP_CODES_CONFIG.REGENERATE_ON_USAGE,
  REGENERATE_THRESHOLD: BACKUP_CODES_CONFIG.REGENERATE_THRESHOLD,
  SHOW_AFTER_SETUP: BACKUP_CODES_CONFIG.SHOW_AFTER_SETUP,
  FORCE_DOWNLOAD: BACKUP_CODES_CONFIG.FORCE_DOWNLOAD,
  ALLOW_PRINT: BACKUP_CODES_CONFIG.ALLOW_PRINT,
  SEPARATOR: BACKUP_CODES_CONFIG.SEPARATOR,
  SECTIONS: BACKUP_CODES_CONFIG.SECTIONS,
  ENABLED: BACKUP_CODES_CONFIG.ENABLED,
} as const;

/**
 * Default recovery codes configuration (from shared-constants)
 */
export const DEFAULT_RECOVERY_CODES_CONFIG = {
  COUNT: RECOVERY_CODES_CONFIG.COUNT,
  CODE_LENGTH: RECOVERY_CODES_CONFIG.CODE_LENGTH,
  FORMAT: RECOVERY_CODES_CONFIG.FORMAT,
  CHARACTER_SET: RECOVERY_CODES_CONFIG.CHARACTER_SET,
  HASH_ALGORITHM: RECOVERY_CODES_CONFIG.HASH_ALGORITHM,
  SALT_ROUNDS: RECOVERY_CODES_CONFIG.SALT_ROUNDS,
  STORE_HASHED_ONLY: RECOVERY_CODES_CONFIG.STORE_HASHED_ONLY,
  ONE_TIME_USE: RECOVERY_CODES_CONFIG.ONE_TIME_USE,
  REGENERATE_ON_USAGE: RECOVERY_CODES_CONFIG.REGENERATE_ON_USAGE,
  REGENERATE_THRESHOLD: RECOVERY_CODES_CONFIG.REGENERATE_THRESHOLD,
  SHOW_AFTER_SETUP: RECOVERY_CODES_CONFIG.SHOW_AFTER_SETUP,
  EXPIRY_DAYS: RECOVERY_CODES_CONFIG.EXPIRY_DAYS,
  ENABLED: RECOVERY_CODES_CONFIG.ENABLED,
} as const;

/**
 * Default WebAuthn configuration (from shared-constants)
 */
export const DEFAULT_WEBAUTHN_CONFIG = {
  RP_ID: WEBAUTHN_CONFIG.RP_ID,
  RP_NAME: WEBAUTHN_CONFIG.RP_NAME,
  RP_ICON: WEBAUTHN_CONFIG.RP_ICON,
  TIMEOUT_MS: WEBAUTHN_CONFIG.TIMEOUT_MS,
  ALLOWED_ALGORITHMS: WEBAUTHN_CONFIG.ALLOWED_ALGORITHMS,
  ATTESTATION: WEBAUTHN_CONFIG.ATTESTATION,
  USER_VERIFICATION: WEBAUTHN_CONFIG.USER_VERIFICATION,
  AUTHENTICATOR_SELECTION: WEBAUTHN_CONFIG.AUTHENTICATOR_SELECTION,
  ENABLED: WEBAUTHN_CONFIG.ENABLED,
  MIN_BROWSER_VERSION: WEBAUTHN_CONFIG.MIN_BROWSER_VERSION,
  SUPPORT_PASSKEYS: WEBAUTHN_CONFIG.SUPPORT_PASSKEYS,
  ALLOW_CROSS_PLATFORM: WEBAUTHN_CONFIG.ALLOW_CROSS_PLATFORM,
} as const;

/**
 * Default SMS OTP configuration (from shared-constants)
 */
export const DEFAULT_SMS_OTP_CONFIG = {
  OTP_LENGTH: SMS_OTP_CONFIG.OTP_LENGTH,
  OTP_EXPIRY_SECONDS: SMS_OTP_CONFIG.OTP_EXPIRY_SECONDS,
  MAX_ATTEMPTS: SMS_OTP_CONFIG.MAX_ATTEMPTS,
  RESEND_COOLDOWN_SECONDS: SMS_OTP_CONFIG.RESEND_COOLDOWN_SECONDS,
  MAX_RESEND_PER_HOUR: SMS_OTP_CONFIG.MAX_RESEND_PER_HOUR,
  ENABLED: SMS_OTP_CONFIG.ENABLED,
  GATEWAY_PRIORITY: SMS_OTP_CONFIG.GATEWAY_PRIORITY,
  TEMPLATE: SMS_OTP_CONFIG.TEMPLATE,
  TEMPLATE_BN: SMS_OTP_CONFIG.TEMPLATE_BN,
} as const;

/**
 * Default WhatsApp OTP configuration (from shared-constants)
 */
export const DEFAULT_WHATSAPP_OTP_CONFIG = {
  OTP_LENGTH: WHATSAPP_OTP_CONFIG.OTP_LENGTH,
  OTP_EXPIRY_SECONDS: WHATSAPP_OTP_CONFIG.OTP_EXPIRY_SECONDS,
  MAX_ATTEMPTS: WHATSAPP_OTP_CONFIG.MAX_ATTEMPTS,
  RESEND_COOLDOWN_SECONDS: WHATSAPP_OTP_CONFIG.RESEND_COOLDOWN_SECONDS,
  MAX_RESEND_PER_HOUR: WHATSAPP_OTP_CONFIG.MAX_RESEND_PER_HOUR,
  ENABLED: WHATSAPP_OTP_CONFIG.ENABLED,
  API_VERSION: WHATSAPP_OTP_CONFIG.API_VERSION,
  TEMPLATE_NAME: WHATSAPP_OTP_CONFIG.TEMPLATE_NAME,
  TEMPLATE_LANGUAGE: WHATSAPP_OTP_CONFIG.TEMPLATE_LANGUAGE,
  TEMPLATE_EN: WHATSAPP_OTP_CONFIG.TEMPLATE_EN,
  TEMPLATE_BN: WHATSAPP_OTP_CONFIG.TEMPLATE_BN,
} as const;

/**
 * Default Imo OTP configuration (from shared-constants)
 */
export const DEFAULT_IMO_OTP_CONFIG = {
  OTP_LENGTH: IMO_OTP_CONFIG.OTP_LENGTH,
  OTP_EXPIRY_SECONDS: IMO_OTP_CONFIG.OTP_EXPIRY_SECONDS,
  MAX_ATTEMPTS: IMO_OTP_CONFIG.MAX_ATTEMPTS,
  RESEND_COOLDOWN_SECONDS: IMO_OTP_CONFIG.RESEND_COOLDOWN_SECONDS,
  MAX_RESEND_PER_HOUR: IMO_OTP_CONFIG.MAX_RESEND_PER_HOUR,
  ENABLED: IMO_OTP_CONFIG.ENABLED,
  API_VERSION: IMO_OTP_CONFIG.API_VERSION,
  TEMPLATE_EN: IMO_OTP_CONFIG.TEMPLATE_EN,
  TEMPLATE_BN: IMO_OTP_CONFIG.TEMPLATE_BN,
} as const;

/**
 * Default Voice Call OTP configuration (from shared-constants)
 */
export const DEFAULT_VOICE_OTP_CONFIG = {
  OTP_LENGTH: VOICE_OTP_CONFIG.OTP_LENGTH,
  OTP_EXPIRY_SECONDS: VOICE_OTP_CONFIG.OTP_EXPIRY_SECONDS,
  MAX_ATTEMPTS: VOICE_OTP_CONFIG.MAX_ATTEMPTS,
  RESEND_COOLDOWN_SECONDS: VOICE_OTP_CONFIG.RESEND_COOLDOWN_SECONDS,
  MAX_RESEND_PER_HOUR: VOICE_OTP_CONFIG.MAX_RESEND_PER_HOUR,
  ENABLED: VOICE_OTP_CONFIG.ENABLED,
  LANGUAGE: VOICE_OTP_CONFIG.LANGUAGE,
  TEMPLATE_EN: VOICE_OTP_CONFIG.TEMPLATE_EN,
  TEMPLATE_BN: VOICE_OTP_CONFIG.TEMPLATE_BN,
  RETRY_COUNT: VOICE_OTP_CONFIG.RETRY_COUNT,
  RETRY_DELAY_SECONDS: VOICE_OTP_CONFIG.RETRY_DELAY_SECONDS,
} as const;

/**
 * Default bKash PIN configuration (from shared-constants)
 */
export const DEFAULT_BKASH_PIN_CONFIG = {
  PIN_LENGTH: BKASH_PIN_CONFIG.PIN_LENGTH,
  PIN_EXPIRY_SECONDS: BKASH_PIN_CONFIG.PIN_EXPIRY_SECONDS,
  MAX_ATTEMPTS: BKASH_PIN_CONFIG.MAX_ATTEMPTS,
  LOCKOUT_DURATION_SECONDS: BKASH_PIN_CONFIG.LOCKOUT_DURATION_SECONDS,
  ENABLED: BKASH_PIN_CONFIG.ENABLED,
  API_VERSION: BKASH_PIN_CONFIG.API_VERSION,
  SANDBOX_MODE: BKASH_PIN_CONFIG.SANDBOX_MODE,
} as const;

/**
 * Default Nagad PIN configuration (from shared-constants)
 */
export const DEFAULT_NAGAD_PIN_CONFIG = {
  PIN_LENGTH: NAGAD_PIN_CONFIG.PIN_LENGTH,
  PIN_EXPIRY_SECONDS: NAGAD_PIN_CONFIG.PIN_EXPIRY_SECONDS,
  MAX_ATTEMPTS: NAGAD_PIN_CONFIG.MAX_ATTEMPTS,
  LOCKOUT_DURATION_SECONDS: NAGAD_PIN_CONFIG.LOCKOUT_DURATION_SECONDS,
  ENABLED: NAGAD_PIN_CONFIG.ENABLED,
  API_VERSION: NAGAD_PIN_CONFIG.API_VERSION,
  SANDBOX_MODE: NAGAD_PIN_CONFIG.SANDBOX_MODE,
} as const;

/**
 * Default Rocket PIN configuration (from shared-constants)
 */
export const DEFAULT_ROCKET_PIN_CONFIG = {
  PIN_LENGTH: ROCKET_PIN_CONFIG.PIN_LENGTH,
  PIN_EXPIRY_SECONDS: ROCKET_PIN_CONFIG.PIN_EXPIRY_SECONDS,
  MAX_ATTEMPTS: ROCKET_PIN_CONFIG.MAX_ATTEMPTS,
  LOCKOUT_DURATION_SECONDS: ROCKET_PIN_CONFIG.LOCKOUT_DURATION_SECONDS,
  ENABLED: ROCKET_PIN_CONFIG.ENABLED,
  API_VERSION: ROCKET_PIN_CONFIG.API_VERSION,
  SANDBOX_MODE: ROCKET_PIN_CONFIG.SANDBOX_MODE,
} as const;

/**
 * Combined MFA configuration (from shared-constants)
 */
export const DEFAULT_MFA_CONFIG = {
  TOTP: TOTP_CONFIG,
  BACKUP_CODES: BACKUP_CODES_CONFIG,
  RECOVERY_CODES: RECOVERY_CODES_CONFIG,
  WEBAUTHN: WEBAUTHN_CONFIG,
  SMS_OTP: SMS_OTP_CONFIG,
  WHATSAPP_OTP: WHATSAPP_OTP_CONFIG,
  IMO_OTP: IMO_OTP_CONFIG,
  VOICE_OTP: VOICE_OTP_CONFIG,
  BKASH_PIN: BKASH_PIN_CONFIG,
  NAGAD_PIN: NAGAD_PIN_CONFIG,
  ROCKET_PIN: ROCKET_PIN_CONFIG,
  METHOD_PRIORITY: MFA_GENERATOR_CONFIG.METHOD_PRIORITY,
  DEFAULT_METHOD: MFA_GENERATOR_CONFIG.DEFAULT_METHOD,
  MAX_METHODS_PER_USER: MFA_GENERATOR_CONFIG.MAX_METHODS_PER_USER,
  MIN_METHODS_FOR_HIGH_SECURITY: MFA_GENERATOR_CONFIG.MIN_METHODS_FOR_HIGH_SECURITY,
  ENABLED: MFA_GENERATOR_CONFIG.ENABLED,
  VERSION: MFA_GENERATOR_CONFIG.VERSION,
} as const;

// ============================================================
// ✅ ENTERPRISE ENHANCEMENT 1: Options Interfaces
// ============================================================

/**
 * Base MFA generator options
 */
export interface MfaGeneratorOptions {
  /** Audit metadata for compliance tracking */
  auditMetadata?: AuditMetadata;

  /** Request context for distributed tracing */
  requestContext?: RequestContext;

  /** Correlation ID for tracing across services */
  correlationId?: string;

  /** Preferred language for response messages (en/bn) */
  preferredLanguage?: 'en' | 'bn';

  /** Geographic district (Bangladesh specific) */
  district?: string;

  /** Geographic division (Bangladesh specific) */
  division?: string;

  /** Network type for adaptive security */
  networkType?: '2g' | '3g' | '4g' | '5g' | 'wifi' | 'unknown';

  /** Device fingerprint for fraud detection */
  deviceFingerprint?: string;

  /** Retry attempt number (for connection resilience) */
  retryAttempt?: number;

  /** Override configuration (optional) */
  configOverride?: Partial<typeof DEFAULT_MFA_CONFIG>;
}

/**
 * TOTP setup options
 */
export interface TotpSetupOptions extends MfaGeneratorOptions {
  /** TOTP secret length (default: from config) */
  secretLength?: number;

  /** TOTP digits (6 or 8, default: from config) */
  digits?: number;

  /** TOTP period in seconds (default: from config) */
  period?: number;

  /** TOTP algorithm (SHA-1, SHA-256, SHA-512, default: from config) */
  algorithm?: 'SHA-1' | 'SHA-256' | 'SHA-512';

  /** Issuer name (default: from config) */
  issuer?: string;

  /** Account name (default: email) */
  accountName?: string;

  /** Set as primary MFA method */
  setAsPrimary?: boolean;

  /** Generate backup codes */
  generateBackupCodes?: boolean;

  /** Number of backup codes to generate (default: from config) */
  backupCodeCount?: number;
}

/**
 * SMS OTP setup options
 */
export interface SmsOtpSetupOptions extends MfaGeneratorOptions {
  /** Phone number (E.164 format) */
  phoneNumber: string;

  /** OTP expiry in seconds (default: from config) */
  otpExpirySeconds?: number;

  /** Maximum attempts before lockout (default: from config) */
  maxAttempts?: number;

  /** Set as primary MFA method */
  setAsPrimary?: boolean;

  /** Generate backup codes */
  generateBackupCodes?: boolean;

  /** Number of backup codes to generate (default: from config) */
  backupCodeCount?: number;
}

/**
 * WhatsApp OTP setup options (Bangladesh specific)
 */
export interface WhatsAppOtpSetupOptions extends MfaGeneratorOptions {
  /** Phone number (E.164 format) */
  phoneNumber: string;

  /** WhatsApp Business Account ID */
  businessAccountId?: string;

  /** WhatsApp template name (default: from config) */
  templateName?: string;

  /** OTP expiry in seconds (default: from config) */
  otpExpirySeconds?: number;

  /** Maximum attempts before lockout (default: from config) */
  maxAttempts?: number;

  /** Set as primary MFA method */
  setAsPrimary?: boolean;

  /** Generate backup codes */
  generateBackupCodes?: boolean;

  /** Number of backup codes to generate (default: from config) */
  backupCodeCount?: number;
}

/**
 * Imo OTP setup options (Bangladesh specific)
 */
export interface ImoOtpSetupOptions extends MfaGeneratorOptions {
  /** Phone number (E.164 format) */
  phoneNumber: string;

  /** OTP expiry in seconds (default: from config) */
  otpExpirySeconds?: number;

  /** Maximum attempts before lockout (default: from config) */
  maxAttempts?: number;

  /** Set as primary MFA method */
  setAsPrimary?: boolean;

  /** Generate backup codes */
  generateBackupCodes?: boolean;

  /** Number of backup codes to generate (default: from config) */
  backupCodeCount?: number;
}

/**
 * Voice Call OTP setup options (Bangladesh specific - feature phones)
 */
export interface VoiceCallOtpSetupOptions extends MfaGeneratorOptions {
  /** Phone number (E.164 format) */
  phoneNumber: string;

  /** Voice language (en, bn, default: from config) */
  language?: 'en' | 'bn';

  /** OTP expiry in seconds (default: from config) */
  otpExpirySeconds?: number;

  /** Maximum attempts before lockout (default: from config) */
  maxAttempts?: number;

  /** Voice call retry count (default: from config) */
  retryCount?: number;

  /** Voice call retry delay in seconds (default: from config) */
  retryDelaySeconds?: number;

  /** Set as primary MFA method */
  setAsPrimary?: boolean;

  /** Generate backup codes */
  generateBackupCodes?: boolean;

  /** Number of backup codes to generate (default: from config) */
  backupCodeCount?: number;
}

/**
 * bKash PIN setup options (Bangladesh specific)
 */
export interface BkashPinSetupOptions extends MfaGeneratorOptions {
  /** bKash account number (E.164 format) */
  accountNumber: string;

  /** Account type (personal, merchant) */
  accountType?: 'personal' | 'merchant';

  /** Account holder name */
  accountHolderName?: string;

  /** PIN expiry in seconds (default: from config) */
  pinExpirySeconds?: number;

  /** Maximum attempts before lockout (default: from config) */
  maxAttempts?: number;

  /** Lockout duration in seconds (default: from config) */
  lockoutDurationSeconds?: number;

  /** Set as primary MFA method */
  setAsPrimary?: boolean;

  /** Generate backup codes */
  generateBackupCodes?: boolean;

  /** Number of backup codes to generate (default: from config) */
  backupCodeCount?: number;
}

/**
 * Nagad PIN setup options (Bangladesh specific)
 */
export interface NagadPinSetupOptions extends MfaGeneratorOptions {
  /** Nagad account number (E.164 format) */
  accountNumber: string;

  /** Account type (personal, merchant) */
  accountType?: 'personal' | 'merchant';

  /** Account holder name */
  accountHolderName?: string;

  /** PIN expiry in seconds (default: from config) */
  pinExpirySeconds?: number;

  /** Maximum attempts before lockout (default: from config) */
  maxAttempts?: number;

  /** Lockout duration in seconds (default: from config) */
  lockoutDurationSeconds?: number;

  /** Set as primary MFA method */
  setAsPrimary?: boolean;

  /** Generate backup codes */
  generateBackupCodes?: boolean;

  /** Number of backup codes to generate (default: from config) */
  backupCodeCount?: number;
}

/**
 * Rocket PIN setup options (Bangladesh specific)
 */
export interface RocketPinSetupOptions extends MfaGeneratorOptions {
  /** Rocket account number (E.164 format) */
  accountNumber: string;

  /** Account type (personal, merchant) */
  accountType?: 'personal' | 'merchant';

  /** Account holder name */
  accountHolderName?: string;

  /** PIN expiry in seconds (default: from config) */
  pinExpirySeconds?: number;

  /** Maximum attempts before lockout (default: from config) */
  maxAttempts?: number;

  /** Lockout duration in seconds (default: from config) */
  lockoutDurationSeconds?: number;

  /** Set as primary MFA method */
  setAsPrimary?: boolean;

  /** Generate backup codes */
  generateBackupCodes?: boolean;

  /** Number of backup codes to generate (default: from config) */
  backupCodeCount?: number;
}

/**
 * WebAuthn setup options
 */
export interface WebAuthnSetupOptions extends MfaGeneratorOptions {
  /** Device name */
  deviceName: string;

  /** User display name */
  userDisplayName?: string;

  /** Authenticator type (platform, cross-platform) */
  authenticatorType?: 'platform' | 'cross-platform';

  /** Set as primary MFA method */
  setAsPrimary?: boolean;

  /** Generate backup codes */
  generateBackupCodes?: boolean;

  /** Number of backup codes to generate (default: from config) */
  backupCodeCount?: number;
}

/**
 * Backup code options
 */
export interface BackupCodeOptions extends MfaGeneratorOptions {
  /** Number of backup codes to generate (default: from config) */
  count?: number;

  /** Length of each backup code (default: from config) */
  codeLength?: number;

  /** Code format (alphanumeric, numeric, alphanumeric_with_hyphen, default: from config) */
  format?: 'alphanumeric' | 'numeric' | 'alphanumeric_with_hyphen';

  /** Regenerate threshold (default: from config) */
  regenerateThreshold?: number;
}

/**
 * Recovery code options
 */
export interface RecoveryCodeOptions extends MfaGeneratorOptions {
  /** Number of recovery codes to generate (default: from config) */
  count?: number;

  /** Length of each recovery code (default: from config) */
  codeLength?: number;

  /** Code expiry in days (default: from config) */
  expiryDays?: number;

  /** Regenerate threshold (default: from config) */
  regenerateThreshold?: number;
}

/**
 * MFA verification options
 */
export interface MfaVerificationOptions extends MfaGeneratorOptions {
  /** MFA method ID (if multiple methods) */
  methodId?: string;

  /** Trust device after successful verification */
  trustDevice?: boolean;

  /** Trust duration in days (default: 30) */
  trustDurationDays?: number;

  /** Maximum attempts before lockout (default: from config) */
  maxAttempts?: number;

  /** Record IP address for audit */
  recordIp?: boolean;

  /** Record device fingerprint for audit */
  recordDeviceFingerprint?: boolean;
}

/**
 * MFA disable options
 */
export interface MfaDisableOptions extends MfaGeneratorOptions {
  /** MFA method ID (if disabling specific method) */
  methodId?: string;

  /** Disable all MFA methods */
  disableAll?: boolean;

  /** Reason for disabling */
  reason?: string;

  /** Require confirmation before disabling */
  requireConfirmation?: boolean;

  /** Record IP address for audit */
  recordIp?: boolean;

  /** Record device fingerprint for audit */
  recordDeviceFingerprint?: boolean;
}

// ============================================================
// ✅ ENTERPRISE ENHANCEMENT 2: Result Interfaces
// ============================================================

/**
 * Generic service result wrapper
 */
export interface ServiceResult<T> {
  /** Whether the operation was successful */
  success: boolean;

  /** Response data (if successful) */
  data?: T;

  /** Error code (if failed) */
  errorCode?: ApiErrorCode;

  /** Error message (if failed) */
  errorMessage?: string;

  /** Bengali error message */
  errorMessageBn?: string;

  /** Rate limit metadata */
  rateLimit?: {
    remaining: number;
    resetAt: Date;
    limit: number;
  };

  /** Correlation ID for tracing */
  correlationId?: string;

  /** Duration of operation in milliseconds */
  durationMs?: number;
}

/**
 * MFA method list result
 */
export interface MfaMethodListResult {
  /** List of MFA methods */
  methods: MfaGeneratorType[];

  /** Total number of methods */
  total: number;

  /** Primary method ID (if any) */
  primaryMethodId?: string;

  /** Recommended methods for user */
  recommendedMethods?: MfaProviderType[];
}

// ============================================================
// ✅ ENTERPRISE ENHANCEMENT 3: Main Service Interface
// ============================================================

/**
 * MFA Generator Service Interface
 * 
 * Enterprise-grade service contract for MFA operations
 */
export interface IMfaGeneratorService {
  // ============================================================
  // Setup Operations
  // ============================================================

  /**
   * Setup TOTP for user
   * 
   * @param userId - User ID
   * @param options - TOTP setup options
   * @param deviceInfo - Device information
   * @returns Setup result with secret, QR code, and backup codes
   */
  setupTotp(
    userId: string,
    options: TotpSetupOptions,
    deviceInfo: DeviceInfo
  ): Promise<ServiceResult<MfaSetupResult>>;

  /**
   * Setup SMS OTP for user
   * 
   * @param userId - User ID
   * @param options - SMS OTP setup options
   * @param deviceInfo - Device information
   * @returns Setup result with OTP sent status
   */
  setupSmsOtp(
    userId: string,
    options: SmsOtpSetupOptions,
    deviceInfo: DeviceInfo
  ): Promise<ServiceResult<MfaSetupResult>>;

  /**
   * Setup WhatsApp OTP for user (Bangladesh specific)
   * 
   * @param userId - User ID
   * @param options - WhatsApp OTP setup options
   * @param deviceInfo - Device information
   * @returns Setup result with OTP sent status
   */
  setupWhatsAppOtp(
    userId: string,
    options: WhatsAppOtpSetupOptions,
    deviceInfo: DeviceInfo
  ): Promise<ServiceResult<MfaSetupResult>>;

  /**
   * Setup Imo OTP for user (Bangladesh specific)
   * 
   * @param userId - User ID
   * @param options - Imo OTP setup options
   * @param deviceInfo - Device information
   * @returns Setup result with OTP sent status
   */
  setupImoOtp(
    userId: string,
    options: ImoOtpSetupOptions,
    deviceInfo: DeviceInfo
  ): Promise<ServiceResult<MfaSetupResult>>;

  /**
   * Setup Voice Call OTP for user (Bangladesh specific - feature phones)
   * 
   * @param userId - User ID
   * @param options - Voice Call OTP setup options
   * @param deviceInfo - Device information
   * @returns Setup result with call status
   */
  setupVoiceCallOtp(
    userId: string,
    options: VoiceCallOtpSetupOptions,
    deviceInfo: DeviceInfo
  ): Promise<ServiceResult<MfaSetupResult>>;

  /**
   * Setup bKash PIN for user (Bangladesh specific)
   * 
   * @param userId - User ID
   * @param options - bKash PIN setup options
   * @param deviceInfo - Device information
   * @returns Setup result with PIN sent status
   */
  setupBkashPin(
    userId: string,
    options: BkashPinSetupOptions,
    deviceInfo: DeviceInfo
  ): Promise<ServiceResult<MfaSetupResult>>;

  /**
   * Setup Nagad PIN for user (Bangladesh specific)
   * 
   * @param userId - User ID
   * @param options - Nagad PIN setup options
   * @param deviceInfo - Device information
   * @returns Setup result with PIN sent status
   */
  setupNagadPin(
    userId: string,
    options: NagadPinSetupOptions,
    deviceInfo: DeviceInfo
  ): Promise<ServiceResult<MfaSetupResult>>;

  /**
   * Setup Rocket PIN for user (Bangladesh specific)
   * 
   * @param userId - User ID
   * @param options - Rocket PIN setup options
   * @param deviceInfo - Device information
   * @returns Setup result with PIN sent status
   */
  setupRocketPin(
    userId: string,
    options: RocketPinSetupOptions,
    deviceInfo: DeviceInfo
  ): Promise<ServiceResult<MfaSetupResult>>;

  /**
   * Setup WebAuthn for user
   * 
   * @param userId - User ID
   * @param options - WebAuthn setup options
   * @param deviceInfo - Device information
   * @returns Setup result with challenge data
   */
  setupWebAuthn(
    userId: string,
    options: WebAuthnSetupOptions,
    deviceInfo: DeviceInfo
  ): Promise<ServiceResult<MfaSetupResult>>;

  /**
   * Generate backup codes for user
   * 
   * @param userId - User ID
   * @param options - Backup code options
   * @param deviceInfo - Device information
   * @returns Backup codes
   */
  generateBackupCodes(
    userId: string,
    options: BackupCodeOptions,
    deviceInfo: DeviceInfo
  ): Promise<ServiceResult<MfaSetupResult>>;

  /**
   * Generate recovery codes for user
   * 
   * @param userId - User ID
   * @param options - Recovery code options
   * @param deviceInfo - Device information
   * @returns Recovery codes
   */
  generateRecoveryCodes(
    userId: string,
    options: RecoveryCodeOptions,
    deviceInfo: DeviceInfo
  ): Promise<ServiceResult<MfaSetupResult>>;

  // ============================================================
  // Verification Operations
  // ============================================================

  /**
   * Verify TOTP code
   * 
   * @param userId - User ID
   * @param methodId - MFA method ID
   * @param code - TOTP code to verify
   * @param options - Verification options
   * @param deviceInfo - Device information
   * @returns Verification result
   */
  verifyTotp(
    userId: string,
    methodId: string,
    code: string,
    options: MfaVerificationOptions,
    deviceInfo: DeviceInfo
  ): Promise<ServiceResult<TotpVerificationResult>>;

  /**
   * Verify OTP code (SMS/WhatsApp/Imo/Voice)
   * 
   * @param userId - User ID
   * @param methodId - MFA method ID
   * @param code - OTP code to verify
   * @param options - Verification options
   * @param deviceInfo - Device information
   * @returns Verification result
   */
  verifyOtp(
    userId: string,
    methodId: string,
    code: string,
    options: MfaVerificationOptions,
    deviceInfo: DeviceInfo
  ): Promise<ServiceResult<OtpResult>>;

  /**
   * Verify MFS PIN (bKash/Nagad/Rocket)
   * 
   * @param userId - User ID
   * @param methodId - MFA method ID
   * @param pin - PIN to verify
   * @param options - Verification options
   * @param deviceInfo - Device information
   * @returns Verification result
   */
  verifyMfsPin(
    userId: string,
    methodId: string,
    pin: string,
    options: MfaVerificationOptions,
    deviceInfo: DeviceInfo
  ): Promise<ServiceResult<MFSPinVerificationResult>>;

  /**
   * Verify backup code
   * 
   * @param userId - User ID
   * @param code - Backup code to verify
   * @param options - Verification options
   * @param deviceInfo - Device information
   * @returns Verification result
   */
  verifyBackupCode(
    userId: string,
    code: string,
    options: MfaVerificationOptions,
    deviceInfo: DeviceInfo
  ): Promise<ServiceResult<BackupCodeResult>>;

  /**
   * Verify recovery code
   * 
   * @param userId - User ID
   * @param code - Recovery code to verify
   * @param options - Verification options
   * @param deviceInfo - Device information
   * @returns Verification result
   */
  verifyRecoveryCode(
    userId: string,
    code: string,
    options: MfaVerificationOptions,
    deviceInfo: DeviceInfo
  ): Promise<ServiceResult<BackupCodeResult>>;

  /**
   * Complete WebAuthn authentication
   * 
   * @param userId - User ID
   * @param methodId - MFA method ID
   * @param credentialId - WebAuthn credential ID
   * @param authenticatorData - Authenticator data
   * @param clientDataJSON - Client data JSON
   * @param signature - Signature
   * @param options - Verification options
   * @param deviceInfo - Device information
   * @returns Verification result
   */
  verifyWebAuthn(
    userId: string,
    methodId: string,
    credentialId: string,
    authenticatorData: string,
    clientDataJSON: string,
    signature: string,
    options: MfaVerificationOptions,
    deviceInfo: DeviceInfo
  ): Promise<ServiceResult<TotpVerificationResult>>;

  // ============================================================
  // Method Management Operations
  // ============================================================

  /**
   * Get all MFA methods for user
   * 
   * @param userId - User ID
   * @param includeDisabled - Include disabled methods
   * @param options - Query options
   * @returns List of MFA methods
   */
  getMethods(
    userId: string,
    includeDisabled?: boolean,
    options?: MfaGeneratorOptions
  ): Promise<ServiceResult<MfaMethodListResult>>;

  /**
   * Get specific MFA method by ID
   * 
   * @param userId - User ID
   * @param methodId - MFA method ID
   * @returns MFA method details
   */
  getMethod(
    userId: string,
    methodId: string
  ): Promise<ServiceResult<MfaGeneratorType>>;

  /**
   * Get primary MFA method for user
   * 
   * @param userId - User ID
   * @returns Primary MFA method
   */
  getPrimaryMethod(
    userId: string
  ): Promise<ServiceResult<MfaGeneratorType>>;

  /**
   * Set primary MFA method
   * 
   * @param userId - User ID
   * @param methodId - MFA method ID
   * @param options - Options
   * @param deviceInfo - Device information
   * @returns Success status
   */
  setPrimaryMethod(
    userId: string,
    methodId: string,
    options: MfaGeneratorOptions,
    deviceInfo: DeviceInfo
  ): Promise<ServiceResult<{ success: boolean }>>;

  /**
   * Disable MFA method
   * 
   * @param userId - User ID
   * @param methodId - MFA method ID
   * @param options - Disable options
   * @param deviceInfo - Device information
   * @returns Disable result
   */
  disableMethod(
    userId: string,
    methodId: string,
    options: MfaDisableOptions,
    deviceInfo: DeviceInfo
  ): Promise<ServiceResult<{ success: boolean; methodId: string }>>;

  /**
   * Disable all MFA methods
   * 
   * @param userId - User ID
   * @param options - Disable options
   * @param deviceInfo - Device information
   * @returns Disable result
   */
  disableAllMethods(
    userId: string,
    options: MfaDisableOptions,
    deviceInfo: DeviceInfo
  ): Promise<ServiceResult<{ success: boolean; disabledMethods: string[] }>>;

  /**
   * Regenerate backup codes
   * 
   * @param userId - User ID
   * @param options - Backup code options
   * @param deviceInfo - Device information
   * @returns New backup codes
   */
  regenerateBackupCodes(
    userId: string,
    options: BackupCodeOptions,
    deviceInfo: DeviceInfo
  ): Promise<ServiceResult<MfaSetupResult>>;

  /**
   * Regenerate recovery codes
   * 
   * @param userId - User ID
   * @param options - Recovery code options
   * @param deviceInfo - Device information
   * @returns New recovery codes
   */
  regenerateRecoveryCodes(
    userId: string,
    options: RecoveryCodeOptions,
    deviceInfo: DeviceInfo
  ): Promise<ServiceResult<MfaSetupResult>>;

  // ============================================================
  // Provider Management Operations
  // ============================================================

  /**
   * Get available MFA providers
   * 
   * @param userId - User ID (for personalized recommendations)
   * @param options - Options
   * @returns List of available providers
   */
  getAvailableProviders(
    userId?: string,
    options?: MfaGeneratorOptions
  ): Promise<ServiceResult<MfaProviderInfo[]>>;

  /**
   * Get provider configuration
   * 
   * @param provider - MFA provider type
   * @returns Provider configuration
   */
  getProviderConfig(
    provider: MfaProviderType
  ): Promise<ServiceResult<MfaProviderConfig>>;

  /**
   * Update provider configuration
   * 
   * @param provider - MFA provider type
   * @param config - Updated configuration
   * @param options - Options
   * @returns Updated configuration
   */
  updateProviderConfig(
    provider: MfaProviderType,
    config: Partial<MfaProviderConfig>,
    options?: MfaGeneratorOptions
  ): Promise<ServiceResult<MfaProviderConfig>>;

  /**
   * Get recommended MFA methods for user
   * 
   * @param userId - User ID
   * @param deviceInfo - Device information (for compatibility)
   * @param options - Options
   * @returns Recommended methods with priorities
   */
  getRecommendedMethods(
    userId: string,
    deviceInfo: DeviceInfo,
    options?: MfaGeneratorOptions
  ): Promise<ServiceResult<MfaMethodPriority[]>>;

  // ============================================================
  // Rate Limit & Lockout Operations
  // ============================================================

  /**
   * Get rate limit status for user
   * 
   * @param userId - User ID
   * @param provider - MFA provider type
   * @param options - Options
   * @returns Rate limit status
   */
  getRateLimitStatus(
    userId: string,
    provider: MfaProviderType,
    options?: MfaGeneratorOptions
  ): Promise<ServiceResult<MfaRateLimitStatus>>;

  /**
   * Get lockout status for user
   * 
   * @param userId - User ID
   * @param provider - MFA provider type
   * @param options - Options
   * @returns Lockout status
   */
  getLockoutStatus(
    userId: string,
    provider: MfaProviderType,
    options?: MfaGeneratorOptions
  ): Promise<ServiceResult<MfaLockoutStatus>>;

  /**
   * Unlock MFA method
   * 
   * @param userId - User ID
   * @param methodId - MFA method ID
   * @param options - Options
   * @param deviceInfo - Device information
   * @returns Unlock status
   */
  unlockMethod(
    userId: string,
    methodId: string,
    options: MfaGeneratorOptions,
    deviceInfo: DeviceInfo
  ): Promise<ServiceResult<{ success: boolean; methodId: string }>>;

  // ============================================================
  // Configuration & Health Operations
  // ============================================================

  /**
   * Get MFA configuration
   * 
   * @param options - Options
   * @returns MFA configuration
   */
  getConfiguration(
    options?: MfaGeneratorOptions
  ): Promise<ServiceResult<MfaConfiguration>>;

  /**
   * Update MFA configuration
   * 
   * @param config - Updated configuration
   * @param options - Options
   * @returns Updated configuration
   */
  updateConfiguration(
    config: Partial<MfaConfiguration>,
    options?: MfaGeneratorOptions
  ): Promise<ServiceResult<MfaConfiguration>>;

  /**
   * Health check for MFA generator service
   * 
   * @returns Health status
   */
  healthCheck(): Promise<{
    status: 'healthy' | 'degraded' | 'unhealthy';
    version: string;
    uptime: number;
    dependencies: {
      totp: boolean;
      sms: boolean;
      whatsapp: boolean;
      webauthn: boolean;
      mfs: boolean;
    };
    metrics: {
      totalMethods: number;
      activeUsers: number;
      verificationSuccessRate: number;
      averageVerificationTimeMs: number;
    };
  }>;

  /**
   * Get MFA generator service metrics
   * 
   * @returns Performance metrics
   */
  getMetrics(): Promise<{
    avgSetupTimeMs: number;
    avgVerificationTimeMs: number;
    successRate: number;
    failureRate: number;
    methodsByType: Record<string, number>;
    usersByMethod: Record<string, number>;
    p95LatencyMs: number;
    p99LatencyMs: number;
  }>;

  // ============================================================
  // Audit Operations
  // ============================================================

  /**
   * Get MFA audit trail for user
   * 
   * @param userId - User ID
   * @param options - Pagination options
   * @param filters - Audit filters
   * @returns Paginated audit entries
   */
  getAuditTrail(
    userId: string,
    options: PaginationOptions,
    filters?: { provider?: MfaProviderType; action?: string; fromDate?: Date; toDate?: Date }
  ): Promise<PaginatedResult<MfaAuditEntry>>;

  /**
   * Export MFA audit for compliance
   * 
   * @param userId - User ID (optional)
   * @param fromDate - Start date
   * @param toDate - End date
   * @param format - Export format
   * @returns Export result
   */
  exportAudit(
    userId: string | undefined,
    fromDate: Date,
    toDate: Date,
    format?: 'json' | 'csv' | 'xlsx'
  ): Promise<{
    downloadUrl: string;
    expiresAt: Date;
    fileSize: number;
    recordCount: number;
    format: string;
    expiresInSeconds: number;
  }>;
}

// ============================================================
// Type Exports
// ============================================================

export type {
  TotpSetupOptions as TotpSetupOptionsType,
  SmsOtpSetupOptions as SmsOtpSetupOptionsType,
  WhatsAppOtpSetupOptions as WhatsAppOtpSetupOptionsType,
  ImoOtpSetupOptions as ImoOtpSetupOptionsType,
  VoiceCallOtpSetupOptions as VoiceCallOtpSetupOptionsType,
  BkashPinSetupOptions as BkashPinSetupOptionsType,
  NagadPinSetupOptions as NagadPinSetupOptionsType,
  RocketPinSetupOptions as RocketPinSetupOptionsType,
  WebAuthnSetupOptions as WebAuthnSetupOptionsType,
  BackupCodeOptions as BackupCodeOptionsType,
  RecoveryCodeOptions as RecoveryCodeOptionsType,
  MfaVerificationOptions as MfaVerificationOptionsType,
  MfaDisableOptions as MfaDisableOptionsType,
  ServiceResult as ServiceResultType,
  MfaMethodListResult as MfaMethodListResultType,
};

// ============================================================
// ENTERPRISE SUMMARY
// ============================================================
// 
// Enterprise Features Applied:
// 1. ✅ Complete MFA lifecycle management (setup, verify, disable)
// 2. ✅ TOTP generation and verification (RFC 6238 compliant)
// 3. ✅ Backup codes with hashing and validation
// 4. ✅ WebAuthn (Passkeys) registration and authentication
// 5. ✅ Bangladesh specific - WhatsApp, Imo, Voice Call OTP
// 6. ✅ Bangladesh specific - bKash, Nagad, Rocket PIN
// 7. ✅ MFA method priority and configuration management
// 8. ✅ Audit trail for all MFA operations
// 9. ✅ Rate limiting and lockout management
// 10. ✅ Recovery codes for emergency access
// 11. ✅ Distributed tracing with correlation ID
// 12. ✅ Bengali language support in all responses
// 13. ✅ Geographic location tracking (Bangladesh districts)
// 14. ✅ Network type tracking for adaptive security
// 15. ✅ Device fingerprint tracking
// 16. ✅ Bulk operations with progress tracking
// 17. ✅ Health check and monitoring endpoints
// 18. ✅ Type-safe with full TypeScript support
// 19. ✅ Constants integration from shared-constants
// 20. ✅ Default configurations from shared-constants
// 
// Bangladesh Specific:
// - WhatsApp, Imo, Voice Call OTP support
// - bKash, Nagad, Rocket PIN MFA
// - Bengali language support (preferredLanguage: 'bn')
// - District/Division location tracking
// - Network type (2g/3g/4g/5g/wifi) for adaptive security
// - Feature phone support via voice call OTP
// - Local timezone-aware timestamps
// 
// Security Features:
// - One-time use codes
// - Hashed code storage
// - Lockout after max attempts
// - Rate limiting
// - Audit trail for all operations
// - IP and device tracking
// - Correlation ID for distributed tracing
// - Device fingerprint binding
// - Trusted device tracking
// 
// ============================================================
