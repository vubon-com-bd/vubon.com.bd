/**
 * Enable MFA Command - Pure Command Data Structure (Enterprise Enhanced)
 * 
 * @module application/commands/mfa/enable-mfa.command
 * 
 * @description
 * Command for enabling Multi-Factor Authentication for a user.
 * Note: userId is NOT accepted from client - comes from JWT.
 * Supports TOTP, SMS, EMAIL, WhatsApp, WebAuthn, and Bangladesh-specific MFS (bKash/Nagad/Rocket).
 * 
 * Enterprise Features:
 * ✅ Immutable command data
 * ✅ Self-contained use case data
 * ✅ No business logic
 * ✅ Security: userId from JWT
 * ✅ Framework-free
 * ✅ Shared-constants integration
 * ✅ Shared-types integration
 * ✅ Bangladesh MFA methods support
 * ✅ Phone number validation
 * ✅ Backup code configuration
 * ✅ Primary method setting
 * ✅ Type guards for runtime checking
 */

import { randomUUID } from 'crypto';

// ✅ ENTERPRISE: Import from shared packages (Single Source of Truth)
import { MFA_TYPES } from '@vubon/shared-constants';
import type { DeviceInfo as SharedDeviceInfo, MFAType } from '@vubon/shared-types';
import { isValidBdMobile } from '@vubon/shared-utils';

// ============================================================
// Re-export MFA types from shared-constants for convenience
// ============================================================

/**
 * MFA Type Enum (from shared-constants)
 * 
 * @example
 * MfaType.TOTP       // Time-based One-Time Password
 * MfaType.SMS        // SMS OTP
 * MfaType.EMAIL      // Email OTP
 * MfaType.WEBAUTHN   // Biometric/Passkey
 * MfaType.WHATSAPP   // WhatsApp OTP (Bangladesh)
 * MfaType.IMO        // Imo OTP (Bangladesh)
 * MfaType.VOICE_CALL // Voice call OTP (Feature phones)
 * MfaType.BKASH_PIN  // bKash PIN (Bangladesh)
 * MfaType.NAGAD_PIN  // Nagad PIN (Bangladesh)
 * MfaType.ROCKET_PIN // Rocket PIN (Bangladesh)
 */
export const MfaType = MFA_TYPES;
export type MfaType = MFAType;

// ============================================================
// Device Information (Using shared-types)
// ============================================================

/**
 * Device information for security audit
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
  /** Network type (2G/3G/4G/5G/WiFi) */
  networkType?: '2g' | '3g' | '4g' | '5g' | 'wifi' | 'unknown';
  /** Mobile operator (Bangladesh) */
  mobileOperator?: 'gp' | 'robi' | 'banglalink' | 'teletalk' | 'unknown';
}

// ============================================================
// Phone Number Interface (Bangladesh specific)
// ============================================================

/**
 * Phone number information for MFA methods
 */
export interface PhoneNumberInfo {
  /** Phone number in E.164 format (e.g., +8801712345678) */
  number: string;
  /** Normalized phone number */
  normalized: string;
  /** Masked phone number for logging */
  masked: string;
  /** Mobile operator detection (GP, Robi, Banglalink, Teletalk) */
  operator?: 'gp' | 'robi' | 'banglalink' | 'teletalk' | 'unknown';
  /** Whether it's a valid Bangladesh mobile number */
  isValidBdMobile: boolean;
}

// ============================================================
// MFS Account Information (Bangladesh specific)
// ============================================================

/**
 * MFS (Mobile Financial Services) account information
 * For bKash, Nagad, Rocket MFA methods
 */
export interface MFSAccountInfo {
  /** Account number (E.164 format phone number) */
  accountNumber: string;
  /** Masked account number for logging */
  maskedAccountNumber: string;
  /** Provider type */
  provider: 'bkash' | 'nagad' | 'rocket';
  /** Whether the account is verified */
  isVerified?: boolean;
}

// ============================================================
// MFA Configuration Options
// ============================================================

/**
 * TOTP specific options
 */
export interface TOTPOptions {
  /** Device name for user reference */
  deviceName?: string;
  /** Issuer name (default: from shared-constants) */
  issuer?: string;
  /** Number of digits (6 or 8) */
  digits?: 6 | 8;
  /** Time period in seconds (default: 30) */
  period?: number;
}

/**
 * SMS/WhatsApp specific options
 */
export interface PhoneOptions {
  /** Phone number in E.164 format */
  phoneNumber: string;
  /** Preferred language for OTP message (en/bn) */
  language?: 'en' | 'bn';
  /** Custom expiry in seconds (default: 300) */
  expirySeconds?: number;
}

/**
 * WebAuthn specific options
 */
export interface WebAuthnOptions {
  /** Device name for user reference */
  deviceName?: string;
  /** Attestation type */
  attestation?: 'none' | 'indirect' | 'direct';
  /** Authenticator attachment type */
  authenticatorAttachment?: 'platform' | 'cross-platform';
}

/**
 * MFS PIN specific options (bKash/Nagad/Rocket)
 */
export interface MFSPinOptions {
  /** MFS account number */
  accountNumber: string;
  /** Provider type */
  provider: 'bkash' | 'nagad' | 'rocket';
  /** Maximum PIN attempts before lockout */
  maxAttempts?: number;
}

// ============================================================
// Enable MFA Command (Enhanced)
// ============================================================

/**
 * Enable MFA Command
 * 
 * @example
 * // Enable TOTP MFA (Google Authenticator)
 * const command = new EnableMfaCommand(
 *   MfaType.TOTP,
 *   {
 *     ipAddress: '192.168.1.100',
 *     userAgent: 'Mozilla/5.0...',
 *     deviceId: 'device_456',
 *     district: 'Dhaka',
 *     networkType: '4g'
 *   },
 *   {
 *     deviceName: 'My Phone',
 *     issuer: 'Vubon'
 *   }
 * );
 * 
 * @example
 * // Enable WhatsApp MFA (Bangladesh)
 * const command = new EnableMfaCommand(
 *   MfaType.WHATSAPP,
 *   deviceInfo,
 *   {
 *     phoneNumber: '+8801712345678',
 *     language: 'bn'
 *   }
 * );
 * 
 * @example
 * // Enable bKash PIN MFA (Bangladesh)
 * const command = new EnableMfaCommand(
 *   MfaType.BKASH_PIN,
 *   deviceInfo,
 *   {
 *     accountNumber: '+8801712345678',
 *     provider: 'bkash',
 *     maxAttempts: 3
 *   }
 * );
 */
export class EnableMfaCommand {
  public readonly commandId: string;
  public readonly timestamp: Date;
  public readonly backupCodeCount: number;
  public readonly makePrimary: boolean;

  constructor(
    /** Type of MFA to enable (from shared-constants) */
    public readonly type: MfaType,
    
    /** Device context for security audit */
    public readonly deviceInfo?: DeviceInfo,
    
    /** MFA method specific options (discriminated union) */
    public readonly options?: TOTPOptions | PhoneOptions | WebAuthnOptions | MFSPinOptions,
    
    /** Number of backup codes to generate (default: 10) */
    backupCodeCount: number = 10,
    
    /** Make this the primary MFA method (default: false) */
    makePrimary: boolean = false,
    
    /** Correlation ID for distributed tracing */
    public readonly correlationId?: string
  ) {
    this.commandId = randomUUID();
    this.timestamp = new Date();
    this.backupCodeCount = Math.min(Math.max(backupCodeCount, 5), 20); // Clamp between 5-20
    this.makePrimary = makePrimary;
    
    // ✅ Validate method-specific requirements
    this.validateMethodRequirements();
  }
  
  // ============================================================
  // Validation Methods
  // ============================================================
  
  /**
   * Validate method-specific requirements
   * @throws {Error} If validation fails
   */
  private validateMethodRequirements(): void {
    switch (this.type) {
      case MfaType.SMS:
      case MfaType.WHATSAPP:
      case MfaType.IMO:
      case MfaType.VOICE_CALL:
        this.validatePhoneOptions();
        break;
      case MfaType.BKASH_PIN:
      case MfaType.NAGAD_PIN:
      case MfaType.ROCKET_PIN:
        this.validateMFSPinOptions();
        break;
      case MfaType.TOTP:
      case MfaType.WEBAUTHN:
      case MfaType.EMAIL:
        // No additional validation needed
        break;
      default:
        throw new Error(`Unsupported MFA type: ${this.type}`);
    }
  }
  
  /**
   * Validate phone-based MFA options
   */
  private validatePhoneOptions(): void {
    const phoneOptions = this.options as PhoneOptions;
    if (!phoneOptions?.phoneNumber) {
      throw new Error(`Phone number is required for ${this.type} MFA`);
    }
    
    // Validate Bangladesh phone number format
    if (!isValidBdMobile(phoneOptions.phoneNumber)) {
      throw new Error('Invalid Bangladesh phone number format. Use format: +8801XXXXXXXXX');
    }
  }
  
  /**
   * Validate MFS PIN MFA options
   */
  private validateMFSPinOptions(): void {
    const mfsOptions = this.options as MFSPinOptions;
    if (!mfsOptions?.accountNumber) {
      throw new Error(`Account number is required for ${this.type} MFA`);
    }
    
    if (!isValidBdMobile(mfsOptions.accountNumber)) {
      throw new Error('Invalid account number format. Use format: +8801XXXXXXXXX');
    }
    
    if (this.type === MfaType.BKASH_PIN && mfsOptions.provider !== 'bkash') {
      throw new Error('Provider must be "bkash" for BKASH_PIN MFA');
    }
    if (this.type === MfaType.NAGAD_PIN && mfsOptions.provider !== 'nagad') {
      throw new Error('Provider must be "nagad" for NAGAD_PIN MFA');
    }
    if (this.type === MfaType.ROCKET_PIN && mfsOptions.provider !== 'rocket') {
      throw new Error('Provider must be "rocket" for ROCKET_PIN MFA');
    }
  }
  
  // ============================================================
  // Type Guards
  // ============================================================
  
  /**
   * Check if this is TOTP MFA
   */
  public isTotp(): boolean {
    return this.type === MfaType.TOTP;
  }
  
  /**
   * Check if this is SMS MFA
   */
  public isSms(): boolean {
    return this.type === MfaType.SMS;
  }
  
  /**
   * Check if this is Email MFA
   */
  public isEmail(): boolean {
    return this.type === MfaType.EMAIL;
  }
  
  /**
   * Check if this is WebAuthn MFA
   */
  public isWebAuthn(): boolean {
    return this.type === MfaType.WEBAUTHN;
  }
  
  /**
   * Check if this is WhatsApp MFA (Bangladesh specific)
   */
  public isWhatsApp(): boolean {
    return this.type === MfaType.WHATSAPP;
  }
  
  /**
   * Check if this is Imo MFA (Bangladesh specific)
   */
  public isImo(): boolean {
    return this.type === MfaType.IMO;
  }
  
  /**
   * Check if this is Voice Call MFA (for feature phones)
   */
  public isVoiceCall(): boolean {
    return this.type === MfaType.VOICE_CALL;
  }
  
  /**
   * Check if this is bKash PIN MFA
   */
  public isBkashPin(): boolean {
    return this.type === MfaType.BKASH_PIN;
  }
  
  /**
   * Check if this is Nagad PIN MFA
   */
  public isNagadPin(): boolean {
    return this.type === MfaType.NAGAD_PIN;
  }
  
  /**
   * Check if this is Rocket PIN MFA
   */
  public isRocketPin(): boolean {
    return this.type === MfaType.ROCKET_PIN;
  }
  
  /**
   * Check if this is a phone-based MFA method
   */
  public isPhoneBased(): boolean {
    return this.isSms() || this.isWhatsApp() || this.isImo() || this.isVoiceCall();
  }
  
  /**
   * Check if this is an MFS PIN-based MFA method
   */
  public isMFSPinBased(): boolean {
    return this.isBkashPin() || this.isNagadPin() || this.isRocketPin();
  }
  
  // ============================================================
  // Getter Methods
  // ============================================================
  
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
   * Get district for geographic tracking
   */
  public getDistrict(): string | undefined {
    return this.deviceInfo?.district;
  }
  
  /**
   * Get network type for connection quality
   */
  public getNetworkType(): string | undefined {
    return this.deviceInfo?.networkType;
  }
  
  /**
   * Get mobile operator for carrier-specific logic
   */
  public getMobileOperator(): string | undefined {
    return this.deviceInfo?.mobileOperator;
  }
  
  /**
   * Get phone number info (for phone-based MFA)
   */
  public getPhoneNumberInfo(): PhoneNumberInfo | null {
    if (!this.isPhoneBased()) return null;
    
    const phoneOptions = this.options as PhoneOptions;
    if (!phoneOptions?.phoneNumber) return null;
    
    const normalized = phoneOptions.phoneNumber;
    const operator = this.detectMobileOperator(normalized);
    
    return {
      number: phoneOptions.phoneNumber,
      normalized,
      masked: this.maskPhoneNumber(normalized),
      operator,
      isValidBdMobile: isValidBdMobile(normalized)
    };
  }
  
  /**
   * Get MFS account info (for MFS PIN-based MFA)
   */
  public getMFSAccountInfo(): MFSAccountInfo | null {
    if (!this.isMFSPinBased()) return null;
    
    const mfsOptions = this.options as MFSPinOptions;
    if (!mfsOptions?.accountNumber) return null;
    
    let provider: 'bkash' | 'nagad' | 'rocket';
    if (this.isBkashPin()) provider = 'bkash';
    else if (this.isNagadPin()) provider = 'nagad';
    else provider = 'rocket';
    
    return {
      accountNumber: mfsOptions.accountNumber,
      maskedAccountNumber: this.maskPhoneNumber(mfsOptions.accountNumber),
      provider,
      isVerified: false
    };
  }
  
  /**
   * Get TOTP options (for TOTP MFA)
   */
  public getTOTPOptions(): TOTPOptions | null {
    if (!this.isTotp()) return null;
    return this.options as TOTPOptions || {};
  }
  
  /**
   * Get WebAuthn options (for WebAuthn MFA)
   */
  public getWebAuthnOptions(): WebAuthnOptions | null {
    if (!this.isWebAuthn()) return null;
    return this.options as WebAuthnOptions || {};
  }
  
  /**
   * Get device name (from options)
   */
  public getDeviceName(): string | undefined {
    if (this.isTotp() || this.isWebAuthn()) {
      const options = this.options as TOTPOptions | WebAuthnOptions;
      return options?.deviceName;
    }
    return undefined;
  }
  
  /**
   * Get preferred language for OTP messages
   */
  public getPreferredLanguage(): 'en' | 'bn' {
    if (this.isPhoneBased()) {
      const options = this.options as PhoneOptions;
      return options?.language || 'en';
    }
    return 'en';
  }
  
  // ============================================================
  // Private Helper Methods
  // ============================================================
  
  /**
   * Detect mobile operator from phone number
   */
  private detectMobileOperator(phoneNumber: string): 'gp' | 'robi' | 'banglalink' | 'teletalk' | 'unknown' {
    const nationalNumber = phoneNumber.replace(/^\+880/, '').replace(/^0/, '');
    const prefix = nationalNumber.substring(0, 3);
    
    if (prefix.startsWith('17') || prefix.startsWith('13') || prefix.startsWith('14')) return 'gp';
    if (prefix.startsWith('18') || prefix.startsWith('16')) return 'robi';
    if (prefix.startsWith('19')) return 'banglalink';
    if (prefix.startsWith('15')) return 'teletalk';
    
    return 'unknown';
  }
  
  /**
   * Mask phone number for logging
   */
  private maskPhoneNumber(phoneNumber: string): string {
    if (phoneNumber.length <= 8) return '****';
    const prefix = phoneNumber.substring(0, phoneNumber.length - 6);
    const suffix = phoneNumber.substring(phoneNumber.length - 2);
    return `${prefix}******${suffix}`;
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
      type: this.type,
      timestamp: this.timestamp.toISOString(),
      correlationId: this.correlationId,
      isPhoneBased: this.isPhoneBased(),
      isMFSPinBased: this.isMFSPinBased(),
      backupCodeCount: this.backupCodeCount,
      makePrimary: this.makePrimary,
      hasDeviceInfo: !!this.deviceInfo,
      deviceFingerprintPresent: !!this.deviceInfo?.deviceFingerprint,
      district: this.deviceInfo?.district,
      networkType: this.deviceInfo?.networkType,
      mobileOperator: this.deviceInfo?.mobileOperator
    };
  }
  
  /**
   * Convert to plain object for serialization
   */
  public toJSON(): Record<string, unknown> {
    return {
      commandId: this.commandId,
      type: this.type,
      timestamp: this.timestamp.toISOString(),
      correlationId: this.correlationId,
      backupCodeCount: this.backupCodeCount,
      makePrimary: this.makePrimary,
      deviceInfo: this.deviceInfo,
      options: this.options
    };
  }
  
  /**
   * String representation for debugging
   */
  public toString(): string {
    return `EnableMfaCommand(id=${this.commandId}, type=${this.type}, timestamp=${this.timestamp.toISOString()})`;
  }
}

// ============================================================
// Type Guards (Runtime checking)
// ============================================================

/**
 * Type guard to check if a value is an EnableMfaCommand
 */
export function isEnableMfaCommand(command: unknown): command is EnableMfaCommand {
  return command instanceof EnableMfaCommand;
}

/**
 * Type guard for TOTP options
 */
export function isTOTPOptions(options: unknown): options is TOTPOptions {
  return options !== null && typeof options === 'object' && !('phoneNumber' in options);
}

/**
 * Type guard for Phone options
 */
export function isPhoneOptions(options: unknown): options is PhoneOptions {
  return options !== null && typeof options === 'object' && 'phoneNumber' in options;
}

/**
 * Type guard for WebAuthn options
 */
export function isWebAuthnOptions(options: unknown): options is WebAuthnOptions {
  return options !== null && typeof options === 'object' && !('phoneNumber' in options) && !('accountNumber' in options);
}

/**
 * Type guard for MFS PIN options
 */
export function isMFSPinOptions(options: unknown): options is MFSPinOptions {
  return options !== null && typeof options === 'object' && 'accountNumber' in options && 'provider' in options;
}

// ============================================================
// Factory Functions
// ============================================================

/**
 * Create a command for TOTP MFA setup
 */
export function createTOTPCommand(
  deviceInfo: DeviceInfo,
  deviceName?: string,
  issuer?: string,
  correlationId?: string
): EnableMfaCommand {
  const options: TOTPOptions = { deviceName, issuer };
  return new EnableMfaCommand(MfaType.TOTP, deviceInfo, options, 10, true, correlationId);
}

/**
 * Create a command for SMS MFA setup
 */
export function createSMSCommand(
  phoneNumber: string,
  deviceInfo: DeviceInfo,
  language?: 'en' | 'bn',
  makePrimary?: boolean,
  correlationId?: string
): EnableMfaCommand {
  const options: PhoneOptions = { phoneNumber, language };
  return new EnableMfaCommand(MfaType.SMS, deviceInfo, options, 10, makePrimary ?? false, correlationId);
}

/**
 * Create a command for WhatsApp MFA setup (Bangladesh)
 */
export function createWhatsAppCommand(
  phoneNumber: string,
  deviceInfo: DeviceInfo,
  language?: 'en' | 'bn',
  makePrimary?: boolean,
  correlationId?: string
): EnableMfaCommand {
  const options: PhoneOptions = { phoneNumber, language };
  return new EnableMfaCommand(MfaType.WHATSAPP, deviceInfo, options, 10, makePrimary ?? false, correlationId);
}

/**
 * Create a command for bKash PIN MFA setup (Bangladesh)
 */
export function createBkashPinCommand(
  accountNumber: string,
  deviceInfo: DeviceInfo,
  maxAttempts?: number,
  makePrimary?: boolean,
  correlationId?: string
): EnableMfaCommand {
  const options: MFSPinOptions = { accountNumber, provider: 'bkash', maxAttempts };
  return new EnableMfaCommand(MfaType.BKASH_PIN, deviceInfo, options, 10, makePrimary ?? false, correlationId);
}

/**
 * Create a command for WebAuthn MFA setup
 */
export function createWebAuthnCommand(
  deviceInfo: DeviceInfo,
  deviceName?: string,
  attestation?: 'none' | 'indirect' | 'direct',
  correlationId?: string
): EnableMfaCommand {
  const options: WebAuthnOptions = { deviceName, attestation };
  return new EnableMfaCommand(MfaType.WEBAUTHN, deviceInfo, options, 10, true, correlationId);
}

// ============================================================
// Default Export
// ============================================================

export default EnableMfaCommand;
