/**
 * MFA Generator Interface
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module application/services/interfaces/mfa-generator.interface
 * 
 * @description
 * Interface for Multi-Factor Authentication code generation and verification.
 * Implemented by infrastructure layer (TOTP, SMS, Email providers).
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
// Re-export types from shared-types (no local duplication)
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
 * Provider display names for UI
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

// ============================================================
// MFA Generator Interface
// ============================================================

export interface MfaGenerator {
  /**
   * Generate TOTP secret for MFA setup
   * 
   * @param email - User email for QR code generation
   * @param issuer - Issuer name (default: from shared-constants)
   * @returns MFA setup result with secret, QR code, and recovery codes
   * 
   * @example
   * const setup = await mfaGenerator.generateTOTPSecret('user@example.com');
   * console.log(setup.secret); // 'JBSWY3DPEHPK3PXP'
   * console.log(setup.qrCodeUri); // 'otpauth://totp/...'
   */
  generateTOTPSecret(email: string, issuer?: string): Promise<MfaSetupResult>;
  
  /**
   * Verify TOTP code
   * 
   * @param secret - The TOTP secret key
   * @param code - The 6-digit code from authenticator app
   * @param window - Optional time window (default: from shared-constants)
   * @returns Verification result
   * 
   * @example
   * const result = await mfaGenerator.verifyTOTPCode(secret, '123456');
   * if (result.isValid) {
   *   // Code is valid
   * }
   */
  verifyTOTPCode(secret: string, code: string, window?: number): Promise<TotpVerificationResult>;
  
  /**
   * Generate SMS OTP code
   * 
   * @param phoneNumber - Phone number to send OTP to
   * @param language - Language for OTP message ('en' or 'bn')
   * @returns OTP result
   * 
   * @example
   * const result = await mfaGenerator.generateSmsOtp('+8801712345678', 'bn');
   * // OTP sent to phone
   */
  generateSmsOtp(phoneNumber: string, language?: 'en' | 'bn'): Promise<OtpResult>;
  
  /**
   * Verify SMS OTP code
   * 
   * @param phoneNumber - Phone number
   * @param code - OTP code to verify
   * @param sessionId - Session ID from OTP generation
   * @returns True if code is valid
   */
  verifySmsOtp(phoneNumber: string, code: string, sessionId?: string): Promise<boolean>;
  
  /**
   * Generate WhatsApp OTP (Bangladesh specific)
   * 
   * @param phoneNumber - Phone number to send OTP via WhatsApp
   * @param language - Language for OTP message ('en' or 'bn')
   * @returns OTP result
   * 
   * @example
   * const result = await mfaGenerator.generateWhatsAppOtp('+8801712345678', 'bn');
   * // OTP sent via WhatsApp
   */
  generateWhatsAppOtp(phoneNumber: string, language?: 'en' | 'bn'): Promise<OtpResult>;
  
  /**
   * Verify WhatsApp OTP
   * 
   * @param phoneNumber - Phone number
   * @param code - OTP code to verify
   * @param sessionId - Session ID from OTP generation
   * @returns True if code is valid
   */
  verifyWhatsAppOtp(phoneNumber: string, code: string, sessionId?: string): Promise<boolean>;
  
  /**
   * Generate Imo OTP (Bangladesh specific)
   * 
   * @param phoneNumber - Phone number to send OTP via Imo
   * @param language - Language for OTP message ('en' or 'bn')
   * @returns OTP result
   */
  generateImoOtp(phoneNumber: string, language?: 'en' | 'bn'): Promise<OtpResult>;
  
  /**
   * Verify Imo OTP
   * 
   * @param phoneNumber - Phone number
   * @param code - OTP code to verify
   * @param sessionId - Session ID from OTP generation
   * @returns True if code is valid
   */
  verifyImoOtp(phoneNumber: string, code: string, sessionId?: string): Promise<boolean>;
  
  /**
   * Generate Email OTP code
   * 
   * @param email - Email address to send OTP to
   * @param language - Language for OTP message ('en' or 'bn')
   * @returns OTP result
   * 
   * @example
   * const result = await mfaGenerator.generateEmailOtp('user@example.com');
   * // OTP sent to email
   */
  generateEmailOtp(email: string, language?: 'en' | 'bn'): Promise<OtpResult>;
  
  /**
   * Verify Email OTP code
   * 
   * @param email - Email address
   * @param code - OTP code to verify
   * @param sessionId - Session ID from OTP generation
   * @returns True if code is valid
   */
  verifyEmailOtp(email: string, code: string, sessionId?: string): Promise<boolean>;
  
  /**
   * Generate Voice Call OTP (for feature phones - Bangladesh specific)
   * 
   * @param phoneNumber - Phone number to call
   * @param language - Language for voice message ('en' or 'bn')
   * @returns OTP result
   */
  generateVoiceOtp(phoneNumber: string, language?: 'en' | 'bn'): Promise<OtpResult>;
  
  /**
   * Verify bKash PIN (Bangladesh specific)
   * 
   * @param accountNumber - bKash account number
   * @param pin - 4-digit bKash PIN
   * @returns Verification result
   */
  verifyBkashPin(accountNumber: string, pin: string): Promise<MFSPinVerificationResult>;
  
  /**
   * Verify Nagad PIN (Bangladesh specific)
   * 
   * @param accountNumber - Nagad account number
   * @param pin - 4-digit Nagad PIN
   * @returns Verification result
   */
  verifyNagadPin(accountNumber: string, pin: string): Promise<MFSPinVerificationResult>;
  
  /**
   * Verify Rocket PIN (Bangladesh specific)
   * 
   * @param accountNumber - Rocket account number
   * @param pin - 4-digit Rocket PIN
   * @returns Verification result
   */
  verifyRocketPin(accountNumber: string, pin: string): Promise<MFSPinVerificationResult>;
  
  /**
   * Generate a new set of backup codes
   * 
   * @param count - Number of backup codes to generate (default: from shared-constants)
   * @param length - Length of each backup code (default: from shared-constants)
   * @param format - Format of backup codes ('plain' or 'formatted-with-hyphen')
   * @returns Array of backup codes
   * 
   * @example
   * const backupCodes = await mfaGenerator.generateBackupCodes();
   * // ['AB3F9K2M', 'CD4G0L3N', ...]
   * 
   * const formatted = await mfaGenerator.generateBackupCodes(10, 8, 'formatted-with-hyphen');
   * // ['AB3F-9K2M', 'CD4G-0L3N', ...]
   */
  generateBackupCodes(
    count?: number, 
    length?: number, 
    format?: 'plain' | 'formatted-with-hyphen'
  ): Promise<string[]>;
  
  /**
   * Hash backup code for secure storage
   * 
   * @param code - Backup code to hash
   * @returns Hashed backup code
   * 
   * @example
   * const hashed = await mfaGenerator.hashBackupCode('AB3F-9K2M');
   * // '$2b$10$...'
   */
  hashBackupCode(code: string): Promise<string>;
  
  /**
   * Verify backup code
   * 
   * @param code - Backup code to verify
   * @param storedHashes - Array of stored backup code hashes
   * @returns Backup code verification result
   * 
   * @example
   * const result = await mfaGenerator.verifyBackupCode('AB3F-9K2M', storedHashes);
   * if (result.isValid) {
   *   // Backup code is valid
   *   console.log(`Remaining codes: ${result.remainingCodes}`);
   * }
   */
  verifyBackupCode(code: string, storedHashes: string[]): Promise<BackupCodeResult>;
  
  /**
   * Get WebAuthn registration options
   * 
   * @param userId - User ID
   * @param email - User email
   * @param displayName - User display name
   * @returns WebAuthn registration options
   */
  getWebAuthnRegistrationOptions(
    userId: string,
    email: string,
    displayName: string
  ): Promise<MfaSetupResult>;
  
  /**
   * Verify WebAuthn registration
   * 
   * @param credential - WebAuthn credential
   * @param challenge - Original challenge
   * @returns True if registration is valid
   */
  verifyWebAuthnRegistration(credential: unknown, challenge: string): Promise<boolean>;
  
  /**
   * Get WebAuthn authentication options
   * 
   * @param credentials - Array of credential IDs
   * @returns WebAuthn authentication options
   */
  getWebAuthnAuthenticationOptions(credentials: string[]): Promise<MfaSetupResult>;
  
  /**
   * Verify WebAuthn authentication
   * 
   * @param credential - WebAuthn credential
   * @param challenge - Original challenge
   * @returns True if authentication is valid
   */
  verifyWebAuthnAuthentication(credential: unknown, challenge: string): Promise<boolean>;
  
  /**
   * Get provisioning URI for manual TOTP setup
   * 
   * @param secret - TOTP secret key
   * @param email - User email
   * @param issuer - Issuer name (default: from shared-constants)
   * @returns Provisioning URI
   * 
   * @example
   * const uri = mfaGenerator.getProvisioningUri(secret, 'user@example.com', 'Vubon');
   * // 'otpauth://totp/Vubon:user@example.com?secret=JBSWY3DPEHPK3PXP&issuer=Vubon'
   */
  getProvisioningUri(secret: string, email: string, issuer?: string): string;
  
  /**
   * Generate QR code as data URL for authenticator app
   * 
   * @param secret - TOTP secret key
   * @param email - User email
   * @param issuer - Issuer name (default: from shared-constants)
   * @returns QR code as data URL (base64)
   * 
   * @example
   * const qrCode = await mfaGenerator.generateQrCode(secret, 'user@example.com');
   * // 'data:image/png;base64,iVBORw0KG...'
   */
  generateQrCode(secret: string, email: string, issuer?: string): Promise<string>;
  
  /**
   * Get MFA provider information
   * 
   * @returns List of available MFA providers with Bengali names
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
   * Check if MFA type is available
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
   * Get list of available MFA types
   * 
   * @returns Array of available MFA types
   * 
   * @example
   * const types = await mfaGenerator.getAvailableTypes();
   * // [MfaGeneratorType.TOTP, MfaGeneratorType.SMS, MfaGeneratorType.WHATSAPP]
   */
  getAvailableTypes(): Promise<MfaGeneratorType[]>;
}

// ============================================================
// Dependency Injection Token
// ============================================================

export const MFA_GENERATOR_SERVICE = 'MFA_GENERATOR_SERVICE';

// ============================================================
// Type Exports
// ============================================================

export type { 
  MfaProviderInfo as MfaProviderInfoType,
  MfaSetupResult as MfaSetupResultType,
  TotpVerificationResult as TotpVerificationResultType,
  BackupCodeResult as BackupCodeResultType,
  MFSPinVerificationResult as MFSPinVerificationResultType,
  OtpResult as OtpResultType
};
