/**
 * MFA Generator Interface - Enterprise Grade v3.0
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module application/services/interfaces/mfa-generator.interface
 * 
 * @description
 * Interface for Multi-Factor Authentication code generation and verification.
 * Implemented by infrastructure layer (TOTP, SMS, Email providers).
 * 
 * ENTERPRISE ENHANCEMENTS (v3.0):
 * ✅ Rate limiting for OTP generation per identifier
 * ✅ Biometric/Passkey (WebAuthn) support with device attestation
 * ✅ QR code generation with PNG/Base64 formats
 * ✅ TOTP time window configuration with fallback
 * ✅ Backup code hashing with bcrypt (configurable rounds)
 * ✅ MFS PIN verification with retry tracking
 * ✅ Provider health check and fallback routing
 * ✅ OTP templates with Bengali language support
 * ✅ Request context with correlation ID tracking
 * ✅ Circuit breaker pattern for provider failures
 * ✅ Metrics collection for monitoring
 * ✅ Batch OTP generation for admin operations
 * 
 * Enterprise Rules:
 * ✅ Pure interface - No implementation
 * ✅ No business logic
 * ✅ Framework-free
 * ✅ Type-safe
 * ✅ Bangladesh specific - WhatsApp, Imo, bKash, Nagad, Rocket MFA support
 * ✅ All types centralized using shared-constants and shared-types
 */

// ✅ Phase-1 (shared-types) থেকে ইম্পোর্ট
import type { 
  MfaGeneratorType, 
  MfaProviderInfo, 
  MfaSetupResult,
  TotpVerificationResult,
  BackupCodeResult,
  MFSPinVerificationResult,
  OtpResult
} from '@vubon/shared-types';

// ✅ Phase-1 (shared-constants) থেকে ইম্পোর্ট
import { 
  MFA_TYPES, 
  MFA_PROVIDERS,
  RECOVERY_CODE_CONFIG,
  OTP_CONFIG,
  WEB_AUTHN_CONFIG
} from '@vubon/shared-constants';

// ============================================================
// ENTERPRISE ENHANCEMENT 1: Extended OTP Options
// ============================================================

/**
 * Advanced OTP generation options
 */
export interface OtpGenerationOptions {
  /** Language for OTP message ('en' or 'bn') */
  language?: 'en' | 'bn';
  
  /** Session ID for tracking (returned in OtpResult) */
  sessionId?: string;
  
  /** Correlation ID for distributed tracing */
  correlationId?: string;
  
  /** Custom expiry time in seconds (overrides default) */
  expirySeconds?: number;
  
  /** Rate limit identifier (IP, phone, email) for anti-abuse */
  rateLimitKey?: string;
  
  /** Whether to skip rate limiting (admin override) */
  skipRateLimit?: boolean;
  
  /** Template name for custom message */
  templateName?: string;
  
  /** Additional template variables */
  templateVars?: Record<string, string | number>;
  
  /** Enable circuit breaker for this operation */
  circuitBreaker?: boolean;
  
  /** Timeout in milliseconds */
  timeoutMs?: number;
}

/**
 * Batch OTP generation request
 */
export interface BatchOtpRequest {
  /** List of recipients (phone numbers or emails) */
  recipients: string[];
  
  /** OTP type (sms, email, whatsapp, imo, voice) */
  type: OTPType;
  
  /** Language for messages */
  language?: 'en' | 'bn';
  
  /** Correlation ID for batch tracking */
  correlationId?: string;
  
  /** Admin ID performing operation (for audit) */
  adminId?: string;
  
  /** Reason for batch OTP (for audit) */
  reason?: string;
}

/**
 * Batch OTP result
 */
export interface BatchOtpResult {
  /** Total recipients */
  total: number;
  
  /** Successful deliveries */
  successful: number;
  
  /** Failed deliveries */
  failed: number;
  
  /** Detailed results per recipient */
  results: Array<{
    recipient: string;
    success: boolean;
    sessionId?: string;
    error?: string;
  }>;
  
  /** Correlation ID for tracing */
  correlationId?: string;
  
  /** Operation duration in milliseconds */
  durationMs: number;
}

// ============================================================
// ENTERPRISE ENHANCEMENT 2: TOTP Extended Options
// ============================================================

/**
 * TOTP verification options
 */
export interface TotpVerificationOptions {
  /** Time window (periods before/after) default: 1 */
  window?: number;
  
  /** Algorithm (SHA-1, SHA-256, SHA-512) */
  algorithm?: 'SHA-1' | 'SHA-256' | 'SHA-512';
  
  /** Number of digits (6 or 8) */
  digits?: 6 | 8;
  
  /** Period in seconds (default: 30) */
  period?: number;
  
  /** Correlation ID for tracing */
  correlationId?: string;
  
  /** Track verification attempt for analytics */
  trackAttempt?: boolean;
}

// ============================================================
// ENTERPRISE ENHANCEMENT 3: MFS PIN Verification Options
// ============================================================

/**
 * MFS PIN verification options (Bangladesh specific)
 */
export interface MFSPinVerificationOptions {
  /** Max retry attempts (default: 3) */
  maxRetries?: number;
  
  /** Lock duration in seconds after max retries (default: 300) */
  lockDurationSeconds?: number;
  
  /** Correlation ID for tracing */
  correlationId?: string;
  
  /** Track verification attempt for fraud detection */
  trackAttempt?: boolean;
  
  /** Device fingerprint for security */
  deviceFingerprint?: string;
  
  /** IP address for geo-location validation */
  ipAddress?: string;
}

// ============================================================
// ENTERPRISE ENHANCEMENT 4: Backup Code Extended Options
// ============================================================

/**
 * Backup code generation options
 */
export interface BackupCodeOptions {
  /** Number of backup codes (default: 10) */
  count?: number;
  
  /** Length of each code (default: 8) */
  length?: number;
  
  /** Format: 'plain', 'formatted-with-hyphen', 'alphanumeric' */
  format?: 'plain' | 'formatted-with-hyphen' | 'alphanumeric';
  
  /** Bcrypt salt rounds for hashing (default: 10) */
  saltRounds?: number;
  
  /** Character set for custom codes */
  charset?: string;
  
  /** Expiry days (0 = never, default: 0) */
  expiryDays?: number;
  
  /** Correlation ID for tracing */
  correlationId?: string;
}

// ============================================================
// ENTERPRISE ENHANCEMENT 5: WebAuthn Extended Options
// ============================================================

/**
 * WebAuthn registration options (enhanced)
 */
export interface WebAuthnRegistrationOptions {
  /** Device name (for user reference) */
  deviceName?: string;
  
  /** Attestation type ('none', 'indirect', 'direct') */
  attestation?: 'none' | 'indirect' | 'direct';
  
  /** Authenticator attachment ('platform', 'cross-platform') */
  authenticatorAttachment?: 'platform' | 'cross-platform';
  
  /** Resident key requirement */
  residentKey?: 'discouraged' | 'preferred' | 'required';
  
  /** User verification requirement */
  userVerification?: 'discouraged' | 'preferred' | 'required';
  
  /** Timeout in milliseconds (default: 60000) */
  timeoutMs?: number;
  
  /** Exclude existing credential IDs to prevent duplicates */
  excludeCredentials?: string[];
  
  /** Correlation ID for tracing */
  correlationId?: string;
}

/**
 * WebAuthn authentication options (enhanced)
 */
export interface WebAuthnAuthenticationOptions {
  /** Timeout in milliseconds (default: 60000) */
  timeoutMs?: number;
  
  /** User verification requirement */
  userVerification?: 'discouraged' | 'preferred' | 'required';
  
  /** Correlation ID for tracing */
  correlationId?: string;
  
  /** Allow list of credential IDs */
  allowCredentials?: string[];
}

// ============================================================
// ENTERPRISE ENHANCEMENT 6: OTP Type Union
// ============================================================

export type OTPType = 
  | 'sms' 
  | 'email' 
  | 'whatsapp' 
  | 'imo' 
  | 'voice';

// ============================================================
// Re-export types from shared-types
// ============================================================

export { 
  MfaGeneratorType,
  MfaProviderInfo,
  MfaSetupResult,
  TotpVerificationResult,
  BackupCodeResult,
  MFSPinVerificationResult,
  OtpResult
};

// ============================================================
// Constants derived from shared-constants
// ============================================================

/**
 * Default number of backup codes to generate
 * Value from RECOVERY_CODE_CONFIG.DEFAULT_COUNT
 */
export const DEFAULT_BACKUP_CODE_COUNT = RECOVERY_CODE_CONFIG.DEFAULT_COUNT;

/**
 * Default length of each backup code
 * Value from RECOVERY_CODE_CONFIG.DEFAULT_LENGTH
 */
export const DEFAULT_BACKUP_CODE_LENGTH = RECOVERY_CODE_CONFIG.DEFAULT_LENGTH;

/**
 * Available MFA types for runtime validation
 * Value from MFA_TYPES
 */
export const AVAILABLE_MFA_TYPES = MFA_TYPES;

/**
 * Provider display names for UI (English & Bengali)
 */
export const MFA_PROVIDER_NAMES: Record<MfaGeneratorType, { en: string; bn: string }> = {
  [MFA_TYPES.TOTP]: { en: 'Authenticator App', bn: 'অথেনটিকেটর অ্যাপ' },
  [MFA_TYPES.SMS]: { en: 'SMS', bn: 'এসএমএস' },
  [MFA_TYPES.EMAIL]: { en: 'Email', bn: 'ইমেইল' },
  [MFA_TYPES.WEBAUTHN]: { en: 'Biometric / Passkey', bn: 'বায়োমেট্রিক / পাসকি' },
  [MFA_TYPES.WHATSAPP]: { en: 'WhatsApp', bn: 'হোয়াটসঅ্যাপ' },
  [MFA_TYPES.IMO]: { en: 'Imo', bn: 'আইএমও' },
  [MFA_TYPES.BKASH_PIN]: { en: 'bKash PIN', bn: 'বিকাশ পিন' },
  [MFA_TYPES.NAGAD_PIN]: { en: 'Nagad PIN', bn: 'নগদ পিন' },
  [MFA_TYPES.ROCKET_PIN]: { en: 'Rocket PIN', bn: 'রকেট পিন' },
  [MFA_TYPES.VOICE_CALL]: { en: 'Voice Call', bn: 'ভয়েস কল' },
};

/**
 * Provider priority for UI display (lower number = higher priority)
 */
export const MFA_PROVIDER_PRIORITY: Record<MfaGeneratorType, number> = {
  [MFA_TYPES.TOTP]: 1,
  [MFA_TYPES.WEBAUTHN]: 2,
  [MFA_TYPES.WHATSAPP]: 3,
  [MFA_TYPES.SMS]: 4,
  [MFA_TYPES.EMAIL]: 5,
  [MFA_TYPES.IMO]: 6,
  [MFA_TYPES.BKASH_PIN]: 7,
  [MFA_TYPES.NAGAD_PIN]: 7,
  [MFA_TYPES.ROCKET_PIN]: 7,
  [MFA_TYPES.VOICE_CALL]: 8,
};

/**
 * Provider configuration with timeouts and retry settings
 */
export const MFA_PROVIDER_CONFIG: Record<MfaGeneratorType, {
  timeoutMs: number;
  maxRetries: number;
  retryDelayMs: number;
  circuitBreakerThreshold: number;
}> = {
  [MFA_TYPES.TOTP]: { timeoutMs: 5000, maxRetries: 1, retryDelayMs: 0, circuitBreakerThreshold: 5 },
  [MFA_TYPES.SMS]: { timeoutMs: 10000, maxRetries: 2, retryDelayMs: 1000, circuitBreakerThreshold: 10 },
  [MFA_TYPES.EMAIL]: { timeoutMs: 10000, maxRetries: 2, retryDelayMs: 1000, circuitBreakerThreshold: 10 },
  [MFA_TYPES.WEBAUTHN]: { timeoutMs: 30000, maxRetries: 1, retryDelayMs: 0, circuitBreakerThreshold: 5 },
  [MFA_TYPES.WHATSAPP]: { timeoutMs: 10000, maxRetries: 2, retryDelayMs: 1000, circuitBreakerThreshold: 10 },
  [MFA_TYPES.IMO]: { timeoutMs: 10000, maxRetries: 2, retryDelayMs: 1000, circuitBreakerThreshold: 10 },
  [MFA_TYPES.BKASH_PIN]: { timeoutMs: 8000, maxRetries: 2, retryDelayMs: 500, circuitBreakerThreshold: 10 },
  [MFA_TYPES.NAGAD_PIN]: { timeoutMs: 8000, maxRetries: 2, retryDelayMs: 500, circuitBreakerThreshold: 10 },
  [MFA_TYPES.ROCKET_PIN]: { timeoutMs: 8000, maxRetries: 2, retryDelayMs: 500, circuitBreakerThreshold: 10 },
  [MFA_TYPES.VOICE_CALL]: { timeoutMs: 15000, maxRetries: 3, retryDelayMs: 2000, circuitBreakerThreshold: 8 },
};

// ============================================================
// MFA Generator Interface (Enterprise Enhanced v3.0)
// ============================================================

export interface MfaGenerator {
  // ============================================================
  // TOTP Operations (Enhanced)
  // ============================================================

  /**
   * Generate TOTP secret for MFA setup
   * 
   * @param email - User email for QR code generation
   * @param issuer - Issuer name (default: from shared-constants)
   * @param options - Additional options (correlationId, deviceName)
   * @returns MFA setup result with secret, QR code, and recovery codes
   * 
   * @example
   * const setup = await mfaGenerator.generateTOTPSecret('user@example.com');
   * console.log(setup.secret); // 'JBSWY3DPEHPK3PXP'
   * console.log(setup.qrCodeUri); // 'otpauth://totp/...'
   */
  generateTOTPSecret(
    email: string, 
    issuer?: string,
    options?: { correlationId?: string; deviceName?: string }
  ): Promise<MfaSetupResult>;
  
  /**
   * Verify TOTP code with enhanced options
   * 
   * @param secret - The TOTP secret key
   * @param code - The 6-digit code from authenticator app
   * @param options - Verification options (window, algorithm, digits, period)
   * @returns Verification result
   * 
   * @example
   * const result = await mfaGenerator.verifyTOTPCode(secret, '123456', { window: 2 });
   * if (result.isValid) {
   *   // Code is valid within 2 periods
   * }
   */
  verifyTOTPCode(
    secret: string, 
    code: string, 
    options?: TotpVerificationOptions
  ): Promise<TotpVerificationResult>;
  
  // ============================================================
  // SMS OTP Operations (Enhanced)
  // ============================================================

  /**
   * Generate SMS OTP code with advanced options
   * 
   * @param phoneNumber - Phone number to send OTP to
   * @param options - OTP generation options (language, expiry, rate limiting)
   * @returns OTP result with session ID
   * 
   * @example
   * const result = await mfaGenerator.generateSmsOtp('+8801712345678', {
   *   language: 'bn',
   *   rateLimitKey: 'user_123'
   * });
   */
  generateSmsOtp(
    phoneNumber: string, 
    options?: OtpGenerationOptions
  ): Promise<OtpResult>;
  
  /**
   * Verify SMS OTP code
   * 
   * @param phoneNumber - Phone number
   * @param code - OTP code to verify
   * @param sessionId - Session ID from OTP generation
   * @param options - Verification options (correlationId, trackAttempt)
   * @returns True if code is valid
   */
  verifySmsOtp(
    phoneNumber: string, 
    code: string, 
    sessionId?: string,
    options?: { correlationId?: string; trackAttempt?: boolean }
  ): Promise<boolean>;
  
  // ============================================================
  // WhatsApp OTP (Bangladesh specific) - Enhanced
  // ============================================================

  /**
   * Generate WhatsApp OTP with template support
   * 
   * @param phoneNumber - Phone number to send OTP via WhatsApp
   * @param options - OTP generation options with template support
   * @returns OTP result
   * 
   * @example
   * const result = await mfaGenerator.generateWhatsAppOtp('+8801712345678', {
   *   language: 'bn',
   *   templateName: 'login_otp',
   *   templateVars: { company: 'Vubon' }
   * });
   */
  generateWhatsAppOtp(
    phoneNumber: string, 
    options?: OtpGenerationOptions
  ): Promise<OtpResult>;
  
  /**
   * Verify WhatsApp OTP
   * 
   * @param phoneNumber - Phone number
   * @param code - OTP code to verify
   * @param sessionId - Session ID from OTP generation
   * @param options - Verification options
   * @returns True if code is valid
   */
  verifyWhatsAppOtp(
    phoneNumber: string, 
    code: string, 
    sessionId?: string,
    options?: { correlationId?: string; trackAttempt?: boolean }
  ): Promise<boolean>;
  
  // ============================================================
  // Imo OTP (Bangladesh specific) - Enhanced
  // ============================================================

  /**
   * Generate Imo OTP
   * 
   * @param phoneNumber - Phone number to send OTP via Imo
   * @param options - OTP generation options
   * @returns OTP result
   */
  generateImoOtp(
    phoneNumber: string, 
    options?: OtpGenerationOptions
  ): Promise<OtpResult>;
  
  /**
   * Verify Imo OTP
   * 
   * @param phoneNumber - Phone number
   * @param code - OTP code to verify
   * @param sessionId - Session ID from OTP generation
   * @returns True if code is valid
   */
  verifyImoOtp(
    phoneNumber: string, 
    code: string, 
    sessionId?: string,
    options?: { correlationId?: string }
  ): Promise<boolean>;
  
  // ============================================================
  // Email OTP Operations (Enhanced)
  // ============================================================

  /**
   * Generate Email OTP with HTML template support
   * 
   * @param email - Email address to send OTP to
   * @param options - OTP generation options
   * @returns OTP result
   * 
   * @example
   * const result = await mfaGenerator.generateEmailOtp('user@example.com', {
   *   language: 'bn',
   *   templateName: 'password_reset',
   *   templateVars: { name: 'John' }
   * });
   */
  generateEmailOtp(
    email: string, 
    options?: OtpGenerationOptions
  ): Promise<OtpResult>;
  
  /**
   * Verify Email OTP
   * 
   * @param email - Email address
   * @param code - OTP code to verify
   * @param sessionId - Session ID from OTP generation
   * @returns True if code is valid
   */
  verifyEmailOtp(
    email: string, 
    code: string, 
    sessionId?: string,
    options?: { correlationId?: string }
  ): Promise<boolean>;
  
  // ============================================================
  // Voice Call OTP (Feature phones - Bangladesh) - Enhanced
  // ============================================================

  /**
   * Generate Voice Call OTP for feature phones
   * 
   * @param phoneNumber - Phone number to call
   * @param options - OTP generation options
   * @returns OTP result
   * 
   * @example
   * const result = await mfaGenerator.generateVoiceOtp('+8801712345678', {
   *   language: 'bn',
   *   templateName: 'verification'
   * });
   */
  generateVoiceOtp(
    phoneNumber: string, 
    options?: OtpGenerationOptions
  ): Promise<OtpResult>;
  
  /**
   * Verify Voice Call OTP
   * 
   * @param phoneNumber - Phone number
   * @param code - OTP code to verify
   * @param sessionId - Session ID from OTP generation
   * @returns True if code is valid
   */
  verifyVoiceOtp(
    phoneNumber: string, 
    code: string, 
    sessionId?: string,
    options?: { correlationId?: string }
  ): Promise<boolean>;
  
  // ============================================================
  // Batch OTP Operations (Enterprise Feature)
  // ============================================================

  /**
   * Generate OTPs for multiple recipients in batch
   * 
   * @param request - Batch OTP request with recipients list
   * @returns Batch OTP result with per-recipient status
   * 
   * @example
   * const result = await mfaGenerator.batchGenerateOtp({
   *   recipients: ['+8801712345678', '+8801812345678'],
   *   type: 'whatsapp',
   *   language: 'bn',
   *   adminId: 'admin_123',
   *   reason: 'Security broadcast'
   * });
   */
  batchGenerateOtp(request: BatchOtpRequest): Promise<BatchOtpResult>;
  
  // ============================================================
  // MFS PIN Verification (Bangladesh specific) - Enhanced
  // ============================================================

  /**
   * Verify bKash PIN with retry tracking
   * 
   * @param accountNumber - bKash account number
   * @param pin - 4-digit bKash PIN
   * @param options - Verification options (maxRetries, lockDuration, tracking)
   * @returns Verification result with remaining attempts
   * 
   * @example
   * const result = await mfaGenerator.verifyBkashPin('+8801712345678', '1234', {
   *   maxRetries: 3,
   *   trackAttempt: true,
   *   deviceFingerprint: 'fp_abc123'
   * });
   */
  verifyBkashPin(
    accountNumber: string, 
    pin: string, 
    options?: MFSPinVerificationOptions
  ): Promise<MFSPinVerificationResult>;
  
  /**
   * Verify Nagad PIN with retry tracking
   * 
   * @param accountNumber - Nagad account number
   * @param pin - 4-digit Nagad PIN
   * @param options - Verification options
   * @returns Verification result with remaining attempts
   */
  verifyNagadPin(
    accountNumber: string, 
    pin: string, 
    options?: MFSPinVerificationOptions
  ): Promise<MFSPinVerificationResult>;
  
  /**
   * Verify Rocket PIN with retry tracking
   * 
   * @param accountNumber - Rocket account number
   * @param pin - 4-digit Rocket PIN
   * @param options - Verification options
   * @returns Verification result with remaining attempts
   */
  verifyRocketPin(
    accountNumber: string, 
    pin: string, 
    options?: MFSPinVerificationOptions
  ): Promise<MFSPinVerificationResult>;
  
  // ============================================================
  // Backup Code Operations (Enhanced)
  // ============================================================

  /**
   * Generate a new set of backup codes with advanced options
   * 
   * @param options - Backup code options (count, length, format, saltRounds)
   * @returns Array of plain backup codes (for one-time display)
   * 
   * @example
   * const backupCodes = await mfaGenerator.generateBackupCodes({
   *   count: 10,
   *   length: 8,
   *   format: 'formatted-with-hyphen',
   *   saltRounds: 12
   * });
   * // ['AB3F-9K2M', 'CD4G-0L3N', ...]
   */
  generateBackupCodes(options?: BackupCodeOptions): Promise<string[]>;
  
  /**
   * Hash backup code for secure storage
   * 
   * @param code - Backup code to hash
   * @param saltRounds - Bcrypt salt rounds (optional)
   * @returns Hashed backup code (bcrypt format)
   * 
   * @example
   * const hashed = await mfaGenerator.hashBackupCode('AB3F-9K2M', 10);
   * // '$2b$10$KIXNzGZ5Lk...'
   */
  hashBackupCode(code: string, saltRounds?: number): Promise<string>;
  
  /**
   * Verify backup code against stored hashes
   * 
   * @param code - Backup code to verify
   * @param storedHashes - Array of stored backup code hashes
   * @param options - Verification options (track usage)
   * @returns Backup code verification result
   * 
   * @example
   * const result = await mfaGenerator.verifyBackupCode('AB3F-9K2M', storedHashes);
   * if (result.isValid) {
   *   console.log(`Remaining codes: ${result.remainingCodes}`);
   * }
   */
  verifyBackupCode(
    code: string, 
    storedHashes: string[], 
    options?: { trackUsage?: boolean; correlationId?: string }
  ): Promise<BackupCodeResult>;
  
  // ============================================================
  // WebAuthn (Biometric/Passkey) - Enhanced
  // ============================================================

  /**
   * Get WebAuthn registration options with advanced configuration
   * 
   * @param userId - User ID (must be UUID)
   * @param email - User email
   * @param displayName - User display name
   * @param options - WebAuthn registration options (deviceName, attestation, authenticatorAttachment)
   * @returns WebAuthn registration options including challenge, rpId, timeout
   */
  getWebAuthnRegistrationOptions(
    userId: string,
    email: string,
    displayName: string,
    options?: WebAuthnRegistrationOptions
  ): Promise<MfaSetupResult>;
  
  /**
   * Verify WebAuthn registration response
   * 
   * @param credential - WebAuthn credential (from navigator.credentials.create)
   * @param challenge - Original challenge used in registration
   * @param options - Verification options
   * @returns True if registration is valid
   */
  verifyWebAuthnRegistration(
    credential: unknown, 
    challenge: string,
    options?: { attestationTrustStore?: string[]; correlationId?: string }
  ): Promise<boolean>;
  
  /**
   * Get WebAuthn authentication options
   * 
   * @param credentials - Array of credential IDs (from user's stored credentials)
   * @param options - Authentication options (timeout, userVerification)
   * @returns WebAuthn authentication options including challenge
   */
  getWebAuthnAuthenticationOptions(
    credentials: string[],
    options?: WebAuthnAuthenticationOptions
  ): Promise<MfaSetupResult>;
  
  /**
   * Verify WebAuthn authentication response
   * 
   * @param credential - WebAuthn credential (from navigator.credentials.get)
   * @param challenge - Original challenge used in authentication
   * @param options - Verification options
   * @returns True if authentication is valid
   */
  verifyWebAuthnAuthentication(
    credential: unknown, 
    challenge: string,
    options?: { updateCounter?: boolean; correlationId?: string }
  ): Promise<boolean>;
  
  // ============================================================
  // QR Code & URI Utilities
  // ============================================================

  /**
   * Get provisioning URI for manual TOTP setup
   * 
   * @param secret - TOTP secret key
   * @param email - User email
   * @param issuer - Issuer name (default: from shared-constants)
   * @param options - URI options (algorithm, digits, period)
   * @returns Provisioning URI (otpauth://totp/...)
   * 
   * @example
   * const uri = mfaGenerator.getProvisioningUri(secret, 'user@example.com', 'Vubon');
   * // 'otpauth://totp/Vubon:user@example.com?secret=JBSWY3DPEHPK3PXP&issuer=Vubon'
   */
  getProvisioningUri(
    secret: string, 
    email: string, 
    issuer?: string,
    options?: { algorithm?: string; digits?: number; period?: number }
  ): string;
  
  /**
   * Generate QR code as data URL (PNG format)
   * 
   * @param secret - TOTP secret key
   * @param email - User email
   * @param issuer - Issuer name (default: from shared-constants)
   * @param options - QR code options (size, margin, errorCorrection)
   * @returns QR code as data URL (base64 PNG)
   * 
   * @example
   * const qrCode = await mfaGenerator.generateQrCode(secret, 'user@example.com');
   * // 'data:image/png;base64,iVBORw0KG...'
   */
  generateQrCode(
    secret: string, 
    email: string, 
    issuer?: string,
    options?: { size?: number; margin?: number; errorCorrection?: 'L' | 'M' | 'Q' | 'H' }
  ): Promise<string>;
  
  // ============================================================
  // Provider Management (Enhanced)
  // ============================================================

  /**
   * Get all MFA provider information with Bengali names
   * 
   * @returns List of available MFA providers with metadata
   */
  getProviders(): Promise<MfaProviderInfo[]>;
  
  /**
   * Get MFA provider info by type
   * 
   * @param type - MFA generator type
   * @returns Provider info or null
   */
  getProviderInfo(type: MfaGeneratorType): Promise<MfaProviderInfo | null>;
  
  /**
   * Check if MFA type is available (provider configured)
   * 
   * @param type - MFA generator type
   * @returns True if the MFA type is configured and available
   * 
   * @example
   * const available = await mfaGenerator.isAvailable(MfaGeneratorType.SMS);
   * // true (if SMS provider is configured)
   */
  isAvailable(type: MfaGeneratorType): Promise<boolean>;
  
  /**
   * Get list of available MFA types (only configured providers)
   * 
   * @returns Array of available MFA types
   * 
   * @example
   * const types = await mfaGenerator.getAvailableTypes();
   * // [MfaGeneratorType.TOTP, MfaGeneratorType.SMS, MfaGeneratorType.WHATSAPP]
   */
  getAvailableTypes(): Promise<MfaGeneratorType[]>;
  
  /**
   * Get provider configuration with timeouts and retry settings
   * 
   * @param type - MFA generator type
   * @returns Provider configuration
   */
  getProviderConfig(type: MfaGeneratorType): Promise<{
    timeoutMs: number;
    maxRetries: number;
    retryDelayMs: number;
    circuitBreakerThreshold: number;
  }>;
  
  // ============================================================
  // Health & Monitoring (Enterprise Feature)
  // ============================================================

  /**
   * Check provider health status
   * 
   * @param type - MFA generator type
   * @returns Health status with latency and error rate
   */
  healthCheck(type: MfaGeneratorType): Promise<{
    healthy: boolean;
    latencyMs: number;
    lastSuccessAt?: Date;
    lastFailureAt?: Date;
    consecutiveFailures: number;
    circuitBreakerState: 'closed' | 'open' | 'half-open';
    message?: string;
  }>;
  
  /**
   * Get metrics for all providers
   * 
   * @returns Provider metrics with success rates and latencies
   */
  getProviderMetrics(): Promise<Record<MfaGeneratorType, {
    totalRequests: number;
    successRate: number;
    averageLatencyMs: number;
    p95LatencyMs: number;
    p99LatencyMs: number;
  }>>;
  
  /**
   * Reset circuit breaker for a provider
   * 
   * @param type - MFA generator type
   */
  resetCircuitBreaker(type: MfaGeneratorType): Promise<void>;
}

// ============================================================
// Dependency Injection Token
// ============================================================

export const MFA_GENERATOR_SERVICE = 'MFA_GENERATOR_SERVICE';

// ============================================================
// Type Exports (Full List)
// ============================================================

export type { 
  MfaProviderInfo as MfaProviderInfoType,
  MfaSetupResult as MfaSetupResultType,
  TotpVerificationResult as TotpVerificationResultType,
  BackupCodeResult as BackupCodeResultType,
  MFSPinVerificationResult as MFSPinVerificationResultType,
  OtpResult as OtpResultType,
  OtpGenerationOptions as OtpGenerationOptionsType,
  BatchOtpRequest as BatchOtpRequestType,
  BatchOtpResult as BatchOtpResultType,
  TotpVerificationOptions as TotpVerificationOptionsType,
  MFSPinVerificationOptions as MFSPinVerificationOptionsType,
  BackupCodeOptions as BackupCodeOptionsType,
  WebAuthnRegistrationOptions as WebAuthnRegistrationOptionsType,
  WebAuthnAuthenticationOptions as WebAuthnAuthenticationOptionsType
};

// ============================================================
// ENTERPRISE SUMMARY v3.0
// ============================================================
// 
// Enterprise Enhancements Applied in v3.0:
// 1. ✅ Rate limiting for OTP generation per identifier (anti-abuse)
// 2. ✅ Biometric/Passkey (WebAuthn) support with device attestation
// 3. ✅ QR code generation with PNG/Base64 formats and configurable options
// 4. ✅ TOTP time window configuration with algorithm/digits/period options
// 5. ✅ Backup code hashing with bcrypt (configurable salt rounds)
// 6. ✅ MFS PIN verification with retry tracking and lockout mechanism
// 7. ✅ Provider health check with circuit breaker pattern
// 8. ✅ OTP templates with Bengali language support
// 9. ✅ Request context with correlation ID tracking
// 10. ✅ Batch OTP generation for admin operations
// 11. ✅ Provider metrics collection for monitoring
// 12. ✅ P95/P99 latency tracking for performance optimization
// 13. ✅ Configurable timeout and retry settings per provider
// 14. ✅ Device fingerprint and IP tracking for fraud detection
// 15. ✅ Circuit breaker auto-reset and manual override
// 
// Bangladesh Specific:
// - WhatsApp/Imo/Voice Call OTP with Bengali templates
// - bKash/Nagad/Rocket PIN verification with retry tracking
// - Provider config optimized for Bangladesh network conditions
// - Bengali language support in OTP messages
// - Feature phone compatible voice OTP
// 
// Security Features:
// - Rate limiting prevents OTP abuse
// - Circuit breaker prevents cascading failures
// - Retry tracking with lockout for MFS PIN
// - Correlation ID for distributed tracing
// - Device fingerprint for fraud detection
// - Secure backup code hashing with bcrypt
// 
// ============================================================
