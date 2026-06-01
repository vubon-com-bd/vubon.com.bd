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
 */

// ============================================================
// MFA Type Enum (Bangladesh specific)
// ============================================================

export enum MfaGeneratorType {
  TOTP = 'TOTP',
  SMS = 'SMS',
  EMAIL = 'EMAIL',
  WEBAUTHN = 'WEBAUTHN',
  WHATSAPP = 'WHATSAPP',      // Bangladesh specific
  IMO = 'IMO',                // Bangladesh specific
  BKASH_PIN = 'BKASH_PIN',    // Bangladesh specific
  NAGAD_PIN = 'NAGAD_PIN',    // Bangladesh specific
  ROCKET_PIN = 'ROCKET_PIN',  // Bangladesh specific
  VOICE_CALL = 'VOICE_CALL',  // For feature phones
}

// ============================================================
// MFA Provider Info
// ============================================================

export interface MfaProviderInfo {
  type: MfaGeneratorType;
  displayName: string;
  displayNameBn?: string;     // Bengali name
  description: string;
  descriptionBn?: string;     // Bengali description
  icon?: string;
  isEnabled: boolean;
  priority: number;           // Display priority
}

// ============================================================
// MFA Setup Result
// ============================================================

export interface MfaSetupResult {
  /** Method ID for reference */
  methodId: string;
  
  /** Secret key for TOTP (base32 encoded) - for TOTP only */
  secret?: string;
  
  /** QR code URI for authenticator app - for TOTP only */
  qrCodeUri?: string;
  
  /** Provisioning URI for manual entry - for TOTP only */
  provisioningUri?: string;
  
  /** Recovery codes for account recovery */
  recoveryCodes: string[];
  
  /** Masked phone number - for SMS/WhatsApp */
  maskedPhone?: string;
  
  /** Masked email - for Email */
  maskedEmail?: string;
  
  /** Masked account number - for bKash/Nagad/Rocket */
  maskedAccount?: string;
  
  /** Provider name - for MFS */
  providerName?: string;
  
  /** WebAuthn challenge - for WebAuthn */
  challenge?: string;
  
  /** RP ID - for WebAuthn */
  rpId?: string;
  
  /** RP Name - for WebAuthn */
  rpName?: string;
  
  /** User ID - for WebAuthn */
  userId?: string;
  
  /** User Name - for WebAuthn */
  userName?: string;
  
  /** User Display Name - for WebAuthn */
  userDisplayName?: string;
  
  /** Timeout in milliseconds */
  timeout?: number;
  
  /** Attestation type - for WebAuthn */
  attestation?: string;
  
  /** Authenticator selection - for WebAuthn */
  authenticatorSelection?: {
    authenticatorAttachment?: 'platform' | 'cross-platform';
    residentKey?: 'discouraged' | 'preferred' | 'required';
    userVerification?: 'discouraged' | 'preferred' | 'required';
  };
}

// ============================================================
// TOTP Verification Result
// ============================================================

export interface TotpVerificationResult {
  /** Whether the code is valid */
  isValid: boolean;
  /** Remaining attempts before lockout */
  remainingAttempts?: number;
  /** Whether the account is locked due to too many failures */
  isLocked?: boolean;
  /** Lockout expiry time */
  lockoutExpiresAt?: Date;
}

// ============================================================
// Backup Code Result
// ============================================================

export interface BackupCodeResult {
  /** Whether the backup code is valid */
  isValid: boolean;
  /** Index of the used backup code */
  usedIndex?: number;
  /** Remaining backup codes count */
  remainingCodes: number;
  /** Whether backup codes are low (<=3) */
  areCodesLow: boolean;
}

// ============================================================
// MFS PIN Verification Result (Bangladesh specific)
// ============================================================

export interface MFSPinVerificationResult {
  /** Whether the PIN is valid */
  isValid: boolean;
  /** Remaining attempts before lockout */
  remainingAttempts?: number;
  /** Whether the account is locked */
  isLocked?: boolean;
  /** Provider type */
  provider: 'bkash' | 'nagad' | 'rocket';
}

// ============================================================
// SMS/WhatsApp OTP Result
// ============================================================

export interface OtpResult {
  /** Whether OTP was sent successfully */
  sent: boolean;
  /** Masked phone number */
  maskedPhone: string;
  /** OTP expiry in seconds */
  expiresInSeconds: number;
  /** Resend cooldown in seconds */
  resendCooldownSeconds: number;
  /** Session ID for tracking */
  sessionId?: string;
  /** Remaining attempts */
  remainingAttempts: number;
}

// ============================================================
// MFA Generator Interface
// ============================================================

export interface MfaGenerator {
  /**
   * Generate TOTP secret for MFA setup
   * 
   * @param email - User email for QR code generation
   * @param issuer - Issuer name (default: 'vubon.com.bd')
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
   * @param window - Optional time window (default: 1)
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
   * @param count - Number of backup codes to generate (default: 10)
   * @param length - Length of each backup code (default: 8)
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
   * @param issuer - Issuer name
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
   * @param issuer - Issuer name
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
   * @returns List of available MFA providers
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
// Type Exports
// ============================================================

export type { MfaProviderInfo as MfaProviderInfoType };
