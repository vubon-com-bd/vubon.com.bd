/**
 * Verify MFA Command - Pure Command Data Structure (Enterprise Enhanced)

 * @module application/commands/mfa/verify-mfa.command

 * @description
 * Command for verifying Multi-Factor Authentication code during login.
 * Note: userId is NOT accepted from client - comes from MFA session.

 * ENTERPRISE ENHANCEMENTS:
 * ✅ Shared-constants integration (Single Source of Truth)
 * ✅ Shared-types integration for DeviceInfo
 * ✅ MFA verification types enum (code, backup_code, mfs_pin, whatsapp, imo, voice)
 * ✅ Built-in validation with proper error messages
 * ✅ Factory functions for common use cases
 * ✅ Type guards for runtime checking
 * ✅ Command summary for logging
 * ✅ JSON serialization support
 * ✅ Masked code for logging (security)
 * ✅ Bangladesh-specific fields (district, networkType, mobileOperator)
 * ✅ Bengali error messages support (via validation)

 * Enterprise Rules:
 * ✅ Immutable command data
 * ✅ Self-contained use case data
 * ✅ No business logic
 * ✅ Security: userId from MFA session, not from client
 * ✅ Framework-free
 */

import { randomUUID } from 'crypto';

// ✅ ENTERPRISE: Import from shared packages (Single Source of Truth)
import { MFA_VERIFICATION_TYPES, MFA_CODE_PATTERN, BACKUP_CODE_PATTERN, MFS_PIN_PATTERN } from '@vubon/shared-constants';
import type { DeviceInfo as SharedDeviceInfo, MfaVerificationType as SharedMfaVerificationType } from '@vubon/shared-types';
import { isValidBdMobile, maskPhone } from '@vubon/shared-utils';

// ============================================================
// Re-export verification types from shared-constants for convenience
// ============================================================

/**
 * MFA verification type enum (from shared-constants)

 * @example
 * MfaVerificationType.CODE        // TOTP/SMS/Email OTP (6-8 digits)
 * MfaVerificationType.BACKUP_CODE // Backup code (XXXX-XXXX)
 * MfaVerificationType.MFS_PIN     // bKash/Nagad/Rocket PIN (4 digits)
 * MfaVerificationType.WHATSAPP    // WhatsApp OTP (6 digits)
 * MfaVerificationType.IMO         // Imo OTP (6 digits)
 * MfaVerificationType.VOICE       // Voice call OTP (6 digits)
 */
export const MfaVerificationType = MFA_VERIFICATION_TYPES;
export type MfaVerificationType = SharedMfaVerificationType;

// ============================================================
// Device Information (Using shared-types with Bangladesh fields)
// ============================================================

/**
 * Device information for security audit (Bangladesh enhanced)
 * Using shared-types for consistency across services
 */
export interface DeviceInfo extends SharedDeviceInfo {
  /** IP address of the client */
  ipAddress?: string;

  /** User agent string for device fingerprinting */
  userAgent?: string;

  /** Device identifier for tracking */
  deviceId?: string;

  /** Device fingerprint hash for fraud detection */
  deviceFingerprint?: string;

  /** District for geographic tracking (Bangladesh) */
  district?: string;

  /** Division for geographic tracking (Bangladesh) */
  division?: string;

  /** Network type (2G/3G/4G/5G/WiFi) - Bangladesh specific */
  networkType?: '2g' | '3g' | '4g' | '5g' | 'wifi' | 'unknown';

  /** Mobile operator (Bangladesh specific) */
  mobileOperator?: 'gp' | 'robi' | 'banglalink' | 'teletalk' | 'unknown';

  /** Upazila/Sub-district (Bangladesh specific) */
  upazila?: string;
}

// ============================================================
// MFS PIN Verification Data (Bangladesh specific)
// ============================================================

/**
 * MFS PIN verification data for bKash/Nagad/Rocket
 */
export interface MFSPinVerificationData {
  /** MFS provider (bkash, nagad, rocket) */
  provider: 'bkash' | 'nagad' | 'rocket';
  /** 4-digit PIN */
  pin: string;
  /** Account number (E.164 format) */
  accountNumber?: string;
}

// ============================================================
// Verification Data (Discriminated Union)
// ============================================================

/**
 * Verification data types (discriminated union for type safety)
 */
export type VerificationData =
  | { type: 'CODE'; code: string }
  | { type: 'BACKUP_CODE'; backupCode: string }
  | { type: 'MFS_PIN'; data: MFSPinVerificationData }
  | { type: 'WHATSAPP'; code: string; phoneNumber?: string }
  | { type: 'IMO'; code: string; phoneNumber?: string }
  | { type: 'VOICE'; code: string; phoneNumber?: string };

// ============================================================
// Verification Result Interface
// ============================================================

/**
 * Result of verification validation
 */
export interface VerificationValidationResult {
  /** Whether the verification is valid */
  isValid: boolean;

  /** Error message (if invalid) */
  error?: string;

  /** Bengali error message (if invalid) */
  errorBn?: string;

  /** Missing fields */
  missingFields?: string[];
}

// ============================================================
// Verify MFA Command (Enterprise Enhanced)
// ============================================================

/**
 * Verify MFA Command

 * @example
 * // Verify with TOTP/SMS/Email code
 * const command = VerifyMfaCommand.createWithCode(
 *   'mfa_sess_550e8400-e29b-41d4-a716-446655440000',
 *   '123456',
 *   {
 *     ipAddress: '192.168.1.100',
 *     userAgent: 'Mozilla/5.0...',
 *     deviceId: 'device_456',
 *     district: 'Dhaka',
 *     networkType: '4g'
 *   },
 *   true,
 *   'corr_abc123'
 * );

 * @example
 * // Verify with backup code
 * const command = VerifyMfaCommand.createWithBackupCode(
 *   'mfa_sess_550e8400-e29b-41d4-a716-446655440000',
 *   'AB3F-9K2M',
 *   deviceInfo,
 *   false,
 *   'corr_abc123'
 * );

 * @example
 * // Verify with bKash PIN (Bangladesh specific)
 * const command = VerifyMfaCommand.createWithMFSPin(
 *   'mfa_sess_550e8400-e29b-41d4-a716-446655440000',
 *   'bkash',
 *   '1234',
 *   deviceInfo,
 *   true,
 *   'corr_abc123'
 * );

 * @example
 * // Verify with WhatsApp OTP (Bangladesh specific)
 * const command = VerifyMfaCommand.createWithWhatsApp(
 *   'mfa_sess_550e8400-e29b-41d4-a716-446655440000',
 *   '123456',
 *   '+8801712345678',
 *   deviceInfo,
 *   false,
 *   'corr_abc123'
 * );
 */
export class VerifyMfaCommand {
  public readonly commandId: string;
  public readonly timestamp: Date;
  private readonly _validationResult?: VerificationValidationResult;

  constructor(
    /** MFA session ID from login response */
    public readonly mfaSessionId: string,

    /** Verification data (discriminated union) */
    public readonly verification: VerificationData,

    /** Device context for security audit */
    public readonly deviceInfo?: DeviceInfo,

    /** Trust this device for future logins (skip MFA) */
    public readonly trustDevice?: boolean,

    /** Correlation ID for distributed tracing */
    public readonly correlationId?: string
  ) {
    this.commandId = randomUUID();
    this.timestamp = new Date();

    // ✅ ENTERPRISE: Auto-validate on construction
    this._validationResult = this.validate();

    // ✅ ENTERPRISE: Throw on validation failure
    if (!this._validationResult.isValid) {
      throw new Error(this._validationResult.error || 'Invalid command parameters');
    }
  }

  // ============================================================
  // Validation Methods
  // ============================================================

  /**
   * Validate command parameters
   * @returns Validation result with error messages
   */
  private validate(): VerificationValidationResult {
    const missingFields: string[] = [];

    // Validate MFA session ID
    if (!this.mfaSessionId || this.mfaSessionId.trim().length === 0) {
      missingFields.push('mfaSessionId');
      return {
        isValid: false,
        error: 'MFA session ID is required',
        errorBn: 'MFA সেশন আইডি প্রয়োজন',
        missingFields
      };
    }

    // Validate based on verification type
    switch (this.verification.type) {
      case 'CODE':
        return this.validateCode();

      case 'BACKUP_CODE':
        return this.validateBackupCode();

      case 'MFS_PIN':
        return this.validateMFSPin();

      case 'WHATSAPP':
      case 'IMO':
      case 'VOICE':
        return this.validatePhoneOtp();

      default:
        return {
          isValid: false,
          error: `Unsupported verification type: ${(this.verification as VerificationData).type}`,
          errorBn: 'অসমর্থিত ভেরিফিকেশন টাইপ',
          missingFields: ['verification.type']
        };
    }
  }

  /**
   * Validate code verification (TOTP/SMS/Email)
   */
  private validateCode(): VerificationValidationResult {
    const verification = this.verification as { type: 'CODE'; code: string };

    if (!verification.code || verification.code.trim().length === 0) {
      return {
        isValid: false,
        error: 'Verification code is required',
        errorBn: 'ভেরিফিকেশন কোড প্রয়োজন',
        missingFields: ['code']
      };
    }

    if (!MFA_CODE_PATTERN.test(verification.code)) {
      return {
        isValid: false,
        error: 'MFA code must be 6-8 digits',
        errorBn: 'MFA কোড ৬-৮ ডিজিটের হতে হবে',
        missingFields: ['code']
      };
    }

    return { isValid: true };
  }

  /**
   * Validate backup code verification
   */
  private validateBackupCode(): VerificationValidationResult {
    const verification = this.verification as { type: 'BACKUP_CODE'; backupCode: string };

    if (!verification.backupCode || verification.backupCode.trim().length === 0) {
      return {
        isValid: false,
        error: 'Backup code is required',
        errorBn: 'ব্যাকআপ কোড প্রয়োজন',
        missingFields: ['backupCode']
      };
    }

    if (!BACKUP_CODE_PATTERN.test(verification.backupCode)) {
      return {
        isValid: false,
        error: 'Backup code must be in format XXXX-XXXX or XXXXX-XXXXX',
        errorBn: 'ব্যাকআপ কোডের ফরম্যাট XXXX-XXXX বা XXXXX-XXXXX হতে হবে',
        missingFields: ['backupCode']
      };
    }

    return { isValid: true };
  }

  /**
   * Validate MFS PIN verification (Bangladesh specific)
   */
  private validateMFSPin(): VerificationValidationResult {
    const verification = this.verification as {
      type: 'MFS_PIN';
      data: MFSPinVerificationData;
    };

    if (!verification.data) {
      return {
        isValid: false,
        error: 'MFS PIN verification data is required',
        errorBn: 'MFS পিন ভেরিফিকেশন ডাটা প্রয়োজন',
        missingFields: ['data']
      };
    }

    if (!verification.data.pin || verification.data.pin.trim().length === 0) {
      return {
        isValid: false,
        error: 'MFS PIN is required',
        errorBn: 'MFS পিন প্রয়োজন',
        missingFields: ['pin']
      };
    }

    if (!MFS_PIN_PATTERN.test(verification.data.pin)) {
      return {
        isValid: false,
        error: 'MFS PIN must be exactly 4 digits',
        errorBn: 'MFS পিন অবশ্যই ৪ ডিজিটের হতে হবে',
        missingFields: ['pin']
      };
    }

    const validProviders = ['bkash', 'nagad', 'rocket'];
    if (!validProviders.includes(verification.data.provider)) {
      return {
        isValid: false,
        error: `Invalid MFS provider. Must be one of: ${validProviders.join(', ')}`,
        errorBn: `ভুল MFS প্রোভাইডার। অবশ্যই এর মধ্যে একটি হতে হবে: ${validProviders.join(', ')}`,
        missingFields: ['provider']
      };
    }

    return { isValid: true };
  }

  /**
   * Validate phone OTP verification (WhatsApp/Imo/Voice)
   */
  private validatePhoneOtp(): VerificationValidationResult {
    const verification = this.verification as {
      type: 'WHATSAPP' | 'IMO' | 'VOICE';
      code: string;
      phoneNumber?: string;
    };

    if (!verification.code || verification.code.trim().length === 0) {
      return {
        isValid: false,
        error: `${verification.type} OTP code is required`,
        errorBn: `${this.getProviderNameBn(verification.type)} OTP কোড প্রয়োজন`,
        missingFields: ['code']
      };
    }

    if (!MFA_CODE_PATTERN.test(verification.code)) {
      return {
        isValid: false,
        error: `${verification.type} OTP code must be 6-8 digits`,
        errorBn: `${this.getProviderNameBn(verification.type)} OTP কোড ৬-৮ ডিজিটের হতে হবে`,
        missingFields: ['code']
      };
    }

    if (verification.phoneNumber && !isValidBdMobile(verification.phoneNumber)) {
      return {
        isValid: false,
        error: 'Invalid Bangladesh phone number format',
        errorBn: 'ভুল বাংলাদেশ ফোন নম্বর ফরম্যাট',
        missingFields: ['phoneNumber']
      };
    }

    return { isValid: true };
  }

  /**
   * Get provider name in Bengali
   */
  private getProviderNameBn(provider: 'WHATSAPP' | 'IMO' | 'VOICE'): string {
    const names: Record<string, string> = {
      WHATSAPP: 'হোয়াটসঅ্যাপ',
      IMO: 'আইএমও',
      VOICE: 'ভয়েস কল'
    };
    return names[provider] || provider;
  }

  // ============================================================
  // Type Guards
  // ============================================================

  /**
   * Check if verification is with code (TOTP/SMS/Email)
   */
  public isCodeVerification(): boolean {
    return this.verification.type === 'CODE';
  }

  /**
   * Check if verification is with backup code
   */
  public isBackupCodeVerification(): boolean {
    return this.verification.type === 'BACKUP_CODE';
  }

  /**
   * Check if verification is with MFS PIN (Bangladesh specific)
   */
  public isMFSPinVerification(): boolean {
    return this.verification.type === 'MFS_PIN';
  }

  /**
   * Check if verification is with WhatsApp OTP (Bangladesh specific)
   */
  public isWhatsAppVerification(): boolean {
    return this.verification.type === 'WHATSAPP';
  }

  /**
   * Check if verification is with Imo OTP (Bangladesh specific)
   */
  public isImoVerification(): boolean {
    return this.verification.type === 'IMO';
  }

  /**
   * Check if verification is with Voice call OTP (Bangladesh specific)
   */
  public isVoiceVerification(): boolean {
    return this.verification.type === 'VOICE';
  }

  /**
   * Check if verification is phone-based (WhatsApp/Imo/Voice)
   */
  public isPhoneBasedVerification(): boolean {
    return this.isWhatsAppVerification() || this.isImoVerification() || this.isVoiceVerification();
  }

  /**
   * Get the verification type
   */
  public getVerificationType(): string {
    return this.verification.type;
  }

  /**
   * Check if device should be trusted
   */
  public shouldTrustDevice(): boolean {
    return this.trustDevice === true && !!this.deviceInfo?.deviceId;
  }

  // ============================================================
  // Getter Methods
  // ============================================================

  /**
   * Get the verification code (for CODE type)
   */
  public getCode(): string | undefined {
    if (this.verification.type === 'CODE') {
      return (this.verification as { type: 'CODE'; code: string }).code;
    }
    return undefined;
  }

  /**
   * Get the backup code (for BACKUP_CODE type)
   */
  public getBackupCode(): string | undefined {
    if (this.verification.type === 'BACKUP_CODE') {
      return (this.verification as { type: 'BACKUP_CODE'; backupCode: string }).backupCode;
    }
    return undefined;
  }

  /**
   * Get MFS PIN verification data (for MFS_PIN type)
   */
  public getMFSPinData(): MFSPinVerificationData | undefined {
    if (this.verification.type === 'MFS_PIN') {
      return (this.verification as { type: 'MFS_PIN'; data: MFSPinVerificationData }).data;
    }
    return undefined;
  }

  /**
   * Get MFS provider (bkash/nagad/rocket)
   */
  public getMFSProvider(): 'bkash' | 'nagad' | 'rocket' | undefined {
    return this.getMFSPinData()?.provider;
  }

  /**
   * Get MFS PIN
   */
  public getMFSPin(): string | undefined {
    return this.getMFSPinData()?.pin;
  }

  /**
   * Get phone OTP code (for WhatsApp/Imo/Voice)
   */
  public getPhoneOtpCode(): string | undefined {
    if (this.isPhoneBasedVerification()) {
      return (this.verification as { type: string; code: string }).code;
    }
    return undefined;
  }

  /**
   * Get phone number (for WhatsApp/Imo/Voice)
   */
  public getPhoneNumber(): string | undefined {
    if (this.isPhoneBasedVerification()) {
      return (this.verification as { type: string; code: string; phoneNumber?: string }).phoneNumber;
    }
    return undefined;
  }

  /**
   * Get IP address for audit
   */
  public getIpAddress(): string | undefined {
    return this.deviceInfo?.ipAddress;
  }

  /**
   * Get user agent for device fingerprinting
   */
  public getUserAgent(): string | undefined {
    return this.deviceInfo?.userAgent;
  }

  /**
   * Get device ID for tracking
   */
  public getDeviceId(): string | undefined {
    return this.deviceInfo?.deviceId;
  }

  /**
   * Get device fingerprint for fraud detection
   */
  public getDeviceFingerprint(): string | undefined {
    return this.deviceInfo?.deviceFingerprint;
  }

  /**
   * Get district for geographic tracking (Bangladesh)
   */
  public getDistrict(): string | undefined {
    return this.deviceInfo?.district;
  }

  /**
   * Get division for geographic tracking (Bangladesh)
   */
  public getDivision(): string | undefined {
    return this.deviceInfo?.division;
  }

  /**
   * Get network type for connection quality (Bangladesh)
   */
  public getNetworkType(): string | undefined {
    return this.deviceInfo?.networkType;
  }

  /**
   * Get mobile operator (Bangladesh specific)
   */
  public getMobileOperator(): string | undefined {
    return this.deviceInfo?.mobileOperator;
  }

  /**
   * Get upazila for detailed location (Bangladesh)
   */
  public getUpazila(): string | undefined {
    return this.deviceInfo?.upazila;
  }

  /**
   * Get masked verification code for logging (hides actual value)
   */
  public getMaskedVerificationValue(): string | undefined {
    if (this.isCodeVerification()) {
      const code = this.getCode();
      if (!code) return undefined;
      return code.substring(0, 2) + '****' + code.substring(code.length - 2);
    }

    if (this.isBackupCodeVerification()) {
      const backupCode = this.getBackupCode();
      if (!backupCode) return undefined;
      const parts = backupCode.split('-');
      if (parts.length === 2) {
        return `${parts[0]?.substring(0, 2)}****-****${parts[1]?.substring(parts[1].length - 2)}`;
      }
      return backupCode.substring(0, 2) + '****' + backupCode.substring(backupCode.length - 2);
    }

    if (this.isMFSPinVerification()) {
      return '****';
    }

    if (this.isPhoneBasedVerification()) {
      const code = this.getPhoneOtpCode();
      if (!code) return undefined;
      return code.substring(0, 2) + '****' + code.substring(code.length - 2);
    }

    return undefined;
  }

  /**
   * Get masked phone number for logging
   */
  public getMaskedPhoneNumber(): string | undefined {
    const phoneNumber = this.getPhoneNumber();
    if (!phoneNumber) return undefined;
    return maskPhone(phoneNumber);
  }

  /**
   * Get validation result (for debugging)
   */
  public getValidationResult(): VerificationValidationResult | undefined {
    return this._validationResult;
  }

  // ============================================================
  // Utility Methods
  // ============================================================

  /**
   * Get command summary for logging
   */
  public getSummary(): Record<string, unknown> {
    return {
      commandId: this.commandId,
      verificationType: this.verification.type,
      timestamp: this.timestamp.toISOString(),
      correlationId: this.correlationId,
      trustDevice: this.shouldTrustDevice(),
      hasDeviceInfo: !!this.deviceInfo,
      maskedVerificationValue: this.getMaskedVerificationValue(),
      deviceFingerprintPresent: !!this.deviceInfo?.deviceFingerprint,
      district: this.deviceInfo?.district,
      division: this.deviceInfo?.division,
      networkType: this.deviceInfo?.networkType,
      mobileOperator: this.deviceInfo?.mobileOperator,
      upazila: this.deviceInfo?.upazila,
      isValid: this._validationResult?.isValid ?? true,
      // Additional for specific verification types
      ...(this.isMFSPinVerification() && {
        mfsProvider: this.getMFSProvider()
      }),
      ...(this.isPhoneBasedVerification() && {
        hasPhoneNumber: !!this.getPhoneNumber(),
        maskedPhoneNumber: this.getMaskedPhoneNumber()
      })
    };
  }

  /**
   * Get validation error message in Bengali (if validation failed)
   */
  public getBengaliErrorMessage(): string | undefined {
    return this._validationResult?.errorBn;
  }

  /**
   * Convert to plain object for serialization
   */
  public toJSON(): Record<string, unknown> {
    return {
      commandId: this.commandId,
      verificationType: this.verification.type,
      timestamp: this.timestamp.toISOString(),
      correlationId: this.correlationId,
      trustDevice: this.shouldTrustDevice(),
      deviceInfo: this.deviceInfo,
      // ⚠️ verification value intentionally excluded for security
      // Only masked version is included for debugging
      maskedVerificationValue: this.getMaskedVerificationValue()
    };
  }

  /**
   * String representation for debugging
   */
  public toString(): string {
    return `VerifyMfaCommand(id=${this.commandId}, type=${this.verification.type}, trustDevice=${this.shouldTrustDevice()}, timestamp=${this.timestamp.toISOString()})`;
  }
}

// ============================================================
// Factory Functions (Enterprise Enhancement)
// ============================================================

/**
 * Create a command for code verification (TOTP/SMS/Email)

 * @param mfaSessionId - MFA session ID
 * @param code - Verification code (6-8 digits)
 * @param deviceInfo - Device context for audit
 * @param trustDevice - Trust this device for future logins
 * @param correlationId - Correlation ID for tracing
 * @returns VerifyMfaCommand instance
 */
export function createCodeVerificationCommand(
  mfaSessionId: string,
  code: string,
  deviceInfo?: DeviceInfo,
  trustDevice?: boolean,
  correlationId?: string
): VerifyMfaCommand {
  return new VerifyMfaCommand(
    mfaSessionId,
    { type: 'CODE', code },
    deviceInfo,
    trustDevice,
    correlationId
  );
}

/**
 * Create a command for backup code verification

 * @param mfaSessionId - MFA session ID
 * @param backupCode - Backup code (XXXX-XXXX or XXXXX-XXXXX)
 * @param deviceInfo - Device context for audit
 * @param trustDevice - Trust this device for future logins
 * @param correlationId - Correlation ID for tracing
 * @returns VerifyMfaCommand instance
 */
export function createBackupCodeVerificationCommand(
  mfaSessionId: string,
  backupCode: string,
  deviceInfo?: DeviceInfo,
  trustDevice?: boolean,
  correlationId?: string
): VerifyMfaCommand {
  return new VerifyMfaCommand(
    mfaSessionId,
    { type: 'BACKUP_CODE', backupCode },
    deviceInfo,
    trustDevice,
    correlationId
  );
}

/**
 * Create a command for MFS PIN verification (Bangladesh specific)

 * @param mfaSessionId - MFA session ID
 * @param provider - MFS provider (bkash, nagad, rocket)
 * @param pin - 4-digit PIN
 * @param deviceInfo - Device context for audit
 * @param trustDevice - Trust this device for future logins
 * @param correlationId - Correlation ID for tracing
 * @param accountNumber - Optional account number (E.164 format)
 * @returns VerifyMfaCommand instance
 */
export function createMFSPinVerificationCommand(
  mfaSessionId: string,
  provider: 'bkash' | 'nagad' | 'rocket',
  pin: string,
  deviceInfo?: DeviceInfo,
  trustDevice?: boolean,
  correlationId?: string,
  accountNumber?: string
): VerifyMfaCommand {
  return new VerifyMfaCommand(
    mfaSessionId,
    {
      type: 'MFS_PIN',
      data: { provider, pin, accountNumber }
    },
    deviceInfo,
    trustDevice,
    correlationId
  );
}

/**
 * Create a command for WhatsApp OTP verification (Bangladesh specific)

 * @param mfaSessionId - MFA session ID
 * @param code - WhatsApp OTP code (6-8 digits)
 * @param phoneNumber - Phone number (E.164 format)
 * @param deviceInfo - Device context for audit
 * @param trustDevice - Trust this device for future logins
 * @param correlationId - Correlation ID for tracing
 * @returns VerifyMfaCommand instance
 */
export function createWhatsAppVerificationCommand(
  mfaSessionId: string,
  code: string,
  phoneNumber?: string,
  deviceInfo?: DeviceInfo,
  trustDevice?: boolean,
  correlationId?: string
): VerifyMfaCommand {
  return new VerifyMfaCommand(
    mfaSessionId,
    { type: 'WHATSAPP', code, phoneNumber },
    deviceInfo,
    trustDevice,
    correlationId
  );
}

/**
 * Create a command for Imo OTP verification (Bangladesh specific)

 * @param mfaSessionId - MFA session ID
 * @param code - Imo OTP code (6-8 digits)
 * @param phoneNumber - Phone number (E.164 format)
 * @param deviceInfo - Device context for audit
 * @param trustDevice - Trust this device for future logins
 * @param correlationId - Correlation ID for tracing
 * @returns VerifyMfaCommand instance
 */
export function createImoVerificationCommand(
  mfaSessionId: string,
  code: string,
  phoneNumber?: string,
  deviceInfo?: DeviceInfo,
  trustDevice?: boolean,
  correlationId?: string
): VerifyMfaCommand {
  return new VerifyMfaCommand(
    mfaSessionId,
    { type: 'IMO', code, phoneNumber },
    deviceInfo,
    trustDevice,
    correlationId
  );
}

/**
 * Create a command for Voice call OTP verification (Bangladesh specific - feature phones)

 * @param mfaSessionId - MFA session ID
 * @param code - Voice OTP code (6-8 digits)
 * @param phoneNumber - Phone number (E.164 format)
 * @param deviceInfo - Device context for audit
 * @param trustDevice - Trust this device for future logins
 * @param correlationId - Correlation ID for tracing
 * @returns VerifyMfaCommand instance
 */
export function createVoiceVerificationCommand(
  mfaSessionId: string,
  code: string,
  phoneNumber?: string,
  deviceInfo?: DeviceInfo,
  trustDevice?: boolean,
  correlationId?: string
): VerifyMfaCommand {
  return new VerifyMfaCommand(
    mfaSessionId,
    { type: 'VOICE', code, phoneNumber },
    deviceInfo,
    trustDevice,
    correlationId
  );
}

// ============================================================
// Type Guards (Runtime Checking)
// ============================================================

/**
 * Type guard to check if a value is a VerifyMfaCommand

 * @param command - Value to check
 * @returns True if value is a VerifyMfaCommand instance
 */
export function isVerifyMfaCommand(command: unknown): command is VerifyMfaCommand {
  return command instanceof VerifyMfaCommand;
}

/**
 * Type guard to check if command is a code verification

 * @param command - VerifyMfaCommand to check
 * @returns True if command is code verification
 */
export function isCodeVerificationCommand(command: VerifyMfaCommand): boolean {
  return command.isCodeVerification();
}

/**
 * Type guard to check if command is a backup code verification

 * @param command - VerifyMfaCommand to check
 * @returns True if command is backup code verification
 */
export function isBackupCodeVerificationCommand(command: VerifyMfaCommand): boolean {
  return command.isBackupCodeVerification();
}

/**
 * Type guard to check if command is an MFS PIN verification

 * @param command - VerifyMfaCommand to check
 * @returns True if command is MFS PIN verification
 */
export function isMFSPinVerificationCommand(command: VerifyMfaCommand): boolean {
  return command.isMFSPinVerification();
}

/**
 * Type guard to check if command is a WhatsApp verification

 * @param command - VerifyMfaCommand to check
 * @returns True if command is WhatsApp verification
 */
export function isWhatsAppVerificationCommand(command: VerifyMfaCommand): boolean {
  return command.isWhatsAppVerification();
}

// ============================================================
// Validation Helper Functions
// ============================================================

/**
 * Validate MFA code format

 * @param code - MFA code to validate
 * @returns True if code is valid
 */
export function isValidMfaCode(code: string): boolean {
  return MFA_CODE_PATTERN.test(code);
}

/**
 * Validate backup code format

 * @param code - Backup code to validate
 * @returns True if backup code format is valid
 */
export function isValidBackupCode(code: string): boolean {
  return BACKUP_CODE_PATTERN.test(code);
}

/**
 * Validate MFS PIN format

 * @param pin - PIN to validate
 * @returns True if PIN format is valid
 */
export function isValidMFSPin(pin: string): boolean {
  return MFS_PIN_PATTERN.test(pin);
}

/**
 * Normalize backup code (remove spaces, convert to uppercase)

 * @param code - Backup code to normalize
 * @returns Normalized backup code
 */
export function normalizeBackupCode(code: string): string {
  return code.trim().toUpperCase().replace(/\s/g, '');
}

/**
 * Normalize MFA code (remove spaces, trim)

 * @param code - MFA code to normalize
 * @returns Normalized MFA code
 */
export function normalizeMfaCode(code: string): string {
  return code.trim().replace(/\s/g, '');
}

// ============================================================
// Default Export
// ============================================================

export default VerifyMfaCommand;
