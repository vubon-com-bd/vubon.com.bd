/**
 * OTP Code Value Object - Pure Domain Core
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module domain/value-objects/otp-code.vo
 * 
 * @description
 * Represents a One-Time Password (OTP) code with validation, expiry, and usage tracking.
 * Used for MFA, password reset, email verification, and transaction confirmation.
 * 
 * Enterprise Rules:
 * ✅ Immutable - OTP value never changes after creation
 * ✅ Self-validating - Validates format based on type
 * ✅ Time-aware - Tracks creation and expiry
 * ✅ Usage-aware - Tracks attempts and usage status
 * ✅ Framework-free - No external dependencies
 * ✅ Bangladesh specific - Mobile operator optimization ready
 * 
 * @example
 * const otp = new OtpCode('123456', OtpType.SMS, OtpPurpose.LOGIN);
 * console.log(otp.isExpired()); // false
 * console.log(otp.verify('123456')); // true
 * console.log(otp.canResend()); // true
 */

import { ValueObject } from './base.vo';

// ==================== Enums ====================

/**
 * OTP type enumeration
 */
export enum OtpType {
  SMS = 'sms',                 // 6 digits, 5 min expiry
  EMAIL = 'email',             // 6-8 digits, 10 min expiry
  TOTP = 'totp',               // 6 digits, 30 sec window
  BACKUP = 'backup',           // 8-10 alphanumeric, one-time use
  MAGIC_LINK = 'magic_link',   // Token-based, 5 min expiry
  TRANSACTION = 'transaction', // For payment confirmation
  DEVICE_VERIFICATION = 'device_verification',
  WHATSAPP = 'whatsapp',       // Bangladesh specific
  VOICE = 'voice',             // Voice call OTP
}

/**
 * OTP purpose (business context)
 */
export enum OtpPurpose {
  LOGIN = 'login',
  REGISTRATION = 'registration',
  PASSWORD_RESET = 'password_reset',
  EMAIL_VERIFICATION = 'email_verification',
  PHONE_VERIFICATION = 'phone_verification',
  PAYMENT_CONFIRMATION = 'payment_confirmation',
  MFA_SETUP = 'mfa_setup',
  MFA_VERIFICATION = 'mfa_verification',
  DEVICE_TRUST = 'device_trust',
  WITHDRAWAL = 'withdrawal',
  SENSITIVE_ACTION = 'sensitive_action',
  /** Bangladesh specific: bKash payment confirmation */
  BKASH_PAYMENT = 'bkash_payment',
  /** Bangladesh specific: Nagad payment confirmation */
  NAGAD_PAYMENT = 'nagad_payment',
  /** Bangladesh specific: Rocket payment confirmation */
  ROCKET_PAYMENT = 'rocket_payment',
}

// ==================== Types ====================

/**
 * OTP validation result
 */
export interface OtpValidation {
  isValid: boolean;
  normalized?: string;
  error?: string;
}

/**
 * OTP status for domain events
 */
export interface OtpStatus {
  isValid: boolean;
  isExpired: boolean;
  isUsed: boolean;
  remainingAttempts: number;
  remainingSeconds: number;
}

// ==================== Constants ====================

/**
 * OTP configuration constants
 */
export const OTP_CONFIG = {
  // Length configurations by type
  LENGTHS: {
    [OtpType.SMS]: { min: 6, max: 6, pattern: /^\d{6}$/ },
    [OtpType.EMAIL]: { min: 6, max: 8, pattern: /^\d{6,8}$/ },
    [OtpType.TOTP]: { min: 6, max: 6, pattern: /^\d{6}$/ },
    [OtpType.BACKUP]: { min: 8, max: 10, pattern: /^[A-Z0-9]{8,10}$/ },
    [OtpType.TRANSACTION]: { min: 6, max: 6, pattern: /^\d{6}$/ },
    [OtpType.DEVICE_VERIFICATION]: { min: 6, max: 6, pattern: /^\d{6}$/ },
    [OtpType.WHATSAPP]: { min: 6, max: 6, pattern: /^\d{6}$/ },
    [OtpType.VOICE]: { min: 6, max: 6, pattern: /^\d{6}$/ },
  },
  
  // Expiry times in seconds by type
  EXPIRY_SECONDS: {
    [OtpType.SMS]: 300,           // 5 minutes
    [OtpType.EMAIL]: 600,         // 10 minutes
    [OtpType.TOTP]: 30,           // 30 seconds
    [OtpType.BACKUP]: 0,          // No expiry (one-time use)
    [OtpType.MAGIC_LINK]: 300,    // 5 minutes
    [OtpType.TRANSACTION]: 180,   // 3 minutes
    [OtpType.DEVICE_VERIFICATION]: 600, // 10 minutes
    [OtpType.WHATSAPP]: 300,      // 5 minutes
    [OtpType.VOICE]: 300,         // 5 minutes
  },
  
  // Attempt limits
  MAX_VERIFICATION_ATTEMPTS: 3,
  MAX_RESEND_ATTEMPTS: 5,
  RESEND_COOLDOWN_SECONDS: 30,
  
  // Rate limits
  MAX_OTP_PER_PHONE_PER_HOUR: 5,
  MAX_OTP_PER_EMAIL_PER_HOUR: 10,
  MAX_OTP_PER_IP_PER_HOUR: 20,
  
  // Security buffer (seconds before expiry to treat as expired)
  EXPIRY_BUFFER_SECONDS: 5,
} as const;

// ==================== OTP Code Value Object ====================

/**
 * OTP Code Value Object
 * 
 * Represents a validated OTP with lifecycle tracking
 */
export class OtpCode extends ValueObject {
  private readonly _value: string;
  private readonly _type: OtpType;
  private readonly _purpose: OtpPurpose;
  private readonly _createdAt: Date;
  private readonly _expiresAt: Date;
  private _verifiedAt?: Date;
  private _attemptCount: number;
  private _resendCount: number;
  private _lastAttemptAt?: Date;

  /**
   * Creates a new OTP Code value object
   * 
   * @param code - Raw OTP code string
   * @param type - Type of OTP
   * @param purpose - Business purpose
   * @param createdAt - Optional creation time (defaults to now)
   * @throws {Error} If OTP format is invalid for the type
   */
  constructor(
    code: string,
    type: OtpType,
    purpose: OtpPurpose,
    createdAt?: Date
  ) {
    super();
    
    const validation = OtpCode.validate(code, type);
    if (!validation.isValid) {
      throw new Error(`Invalid OTP: ${validation.error}`);
    }
    
    this._value = validation.normalized!;
    this._type = type;
    this._purpose = purpose;
    this._createdAt = createdAt || new Date();
    
    const expirySeconds = OTP_CONFIG.EXPIRY_SECONDS[type];
    this._expiresAt = expirySeconds > 0 
      ? new Date(this._createdAt.getTime() + expirySeconds * 1000)
      : new Date(8640000000000000); // Far future for backup codes
    
    this._attemptCount = 0;
    this._resendCount = 0;
    
    this.validate();
  }

  /**
   * Protected validation method
   */
  protected validate(): void {
    if (this.isEmpty()) {
      throw new Error('OTP code cannot be empty');
    }
    
    if (this._createdAt > this._expiresAt) {
      throw new Error('CreatedAt cannot be after ExpiresAt');
    }
  }

  // ============================================================
  // Factory Methods
  // ============================================================

  /**
   * Static factory method for creating OtpCode from known valid value
   */
  public static fromValid(
    code: string,
    type: OtpType,
    purpose: OtpPurpose,
    createdAt?: Date
  ): OtpCode {
    return new OtpCode(code, type, purpose, createdAt);
  }

  /**
   * Creates an OtpCode from stored data (for persistence reconstruction)
   */
  public static reconstitute(data: {
    value: string;
    type: OtpType;
    purpose: OtpPurpose;
    createdAt: Date;
    expiresAt: Date;
    verifiedAt?: Date;
    attemptCount: number;
    resendCount: number;
    lastAttemptAt?: Date;
  }): OtpCode {
    const otp = new OtpCode(data.value, data.type, data.purpose, data.createdAt);
    // Override expiry if needed (not recomputed)
    Object.defineProperty(otp, '_expiresAt', { value: data.expiresAt });
    otp._verifiedAt = data.verifiedAt;
    otp._attemptCount = data.attemptCount;
    otp._resendCount = data.resendCount;
    otp._lastAttemptAt = data.lastAttemptAt;
    return otp;
  }

  // ============================================================
  // Validation Methods
  // ============================================================

  /**
   * Validates an OTP code for a specific type
   */
  public static validate(code: string, type: OtpType): OtpValidation {
    // Check type and emptiness
    if (!code || typeof code !== 'string') {
      return {
        isValid: false,
        error: 'OTP cannot be null or undefined',
      };
    }

    const trimmed = code.trim();
    
    if (trimmed.length === 0) {
      return {
        isValid: false,
        error: 'OTP cannot be empty',
      };
    }

    const config = OTP_CONFIG.LENGTHS[type];
    if (!config) {
      return {
        isValid: false,
        error: `Unknown OTP type: ${type}`,
      };
    }

    // Check length
    if (trimmed.length < config.min || trimmed.length > config.max) {
      return {
        isValid: false,
        error: `OTP must be ${config.min}${config.min !== config.max ? `-${config.max}` : ''} characters`,
      };
    }

    // Check pattern
    if (!config.pattern.test(trimmed)) {
      const expectedFormat = type === OtpType.BACKUP ? 'alphanumeric' : 'numeric';
      return {
        isValid: false,
        error: `OTP must contain only ${expectedFormat} characters`,
      };
    }

    return {
      isValid: true,
      normalized: trimmed,
      error: undefined,
    };
  }

  /**
   * Generate a cryptographically-inspired random OTP code
   * Note: For true crypto, use infrastructure layer
   */
  public static generate(type: OtpType): string {
    const config = OTP_CONFIG.LENGTHS[type];
    const length = config.max;
    
    if (type === OtpType.BACKUP) {
      // Generate alphanumeric backup code (no ambiguous characters)
      const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
      let result = '';
      for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      // Format with hyphen for readability (e.g., "AB3F-9K2M")
      if (length === 8) {
        return result.slice(0, 4) + '-' + result.slice(4);
      }
      return result;
    } else {
      // Generate numeric OTP with leading zeros preserved
      let result = '';
      for (let i = 0; i < length; i++) {
        result += Math.floor(Math.random() * 10);
      }
      return result;
    }
  }

  // ============================================================
  // Getters
  // ============================================================

  /**
   * Get the raw OTP value
   */
  public getValue(): string {
    return this._value;
  }

  /**
   * Get OTP type
   */
  public getType(): OtpType {
    return this._type;
  }

  /**
   * Get OTP purpose
   */
  public getPurpose(): OtpPurpose {
    return this._purpose;
  }

  /**
   * Get creation timestamp
   */
  public getCreatedAt(): Date {
    return new Date(this._createdAt);
  }

  /**
   * Get expiry timestamp
   */
  public getExpiresAt(): Date {
    return new Date(this._expiresAt);
  }

  /**
   * Get verification timestamp (if verified)
   */
  public getVerifiedAt(): Date | undefined {
    return this._verifiedAt ? new Date(this._verifiedAt) : undefined;
  }

  /**
   * Get attempt count
   */
  public getAttemptCount(): number {
    return this._attemptCount;
  }

  /**
   * Get resend count
   */
  public getResendCount(): number {
    return this._resendCount;
  }

  /**
   * Get last attempt timestamp
   */
  public getLastAttemptAt(): Date | undefined {
    return this._lastAttemptAt ? new Date(this._lastAttemptAt) : undefined;
  }

  // ============================================================
  // Status Methods
  // ============================================================

  /**
   * Check if OTP has expired (with buffer)
   */
  public isExpired(): boolean {
    if (this._type === OtpType.BACKUP) {
      return false; // Backup codes don't expire
    }
    if (this._verifiedAt) {
      return true; // Already used
    }
    
    const bufferMs = OTP_CONFIG.EXPIRY_BUFFER_SECONDS * 1000;
    const effectiveExpiry = new Date(this._expiresAt.getTime() - bufferMs);
    return new Date() > effectiveExpiry;
  }

  /**
   * Check if OTP has been used
   */
  public isUsed(): boolean {
    return !!this._verifiedAt;
  }

  /**
   * Check if OTP is still valid (not expired, not used)
   */
  public isValid(): boolean {
    return !this.isExpired() && !this.isUsed();
  }

  /**
   * Get detailed OTP status
   */
  public getStatus(): OtpStatus {
    return {
      isValid: this.isValid(),
      isExpired: this.isExpired(),
      isUsed: this.isUsed(),
      remainingAttempts: this.getRemainingAttempts(),
      remainingSeconds: this.getRemainingSeconds(),
    };
  }

  /**
   * Get remaining time in seconds (for UI countdown)
   */
  public getRemainingSeconds(): number {
    if (this.isExpired()) return 0;
    if (this._type === OtpType.BACKUP) return -1; // No expiry
    
    const remaining = Math.max(0, (this._expiresAt.getTime() - new Date().getTime()) / 1000);
    return Math.ceil(remaining);
  }

  /**
   * Get formatted remaining time (MM:SS)
   */
  public getFormattedRemainingTime(): string {
    const seconds = this.getRemainingSeconds();
    if (seconds <= 0) return '00:00';
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }

  // ============================================================
  // Business Methods
  // ============================================================

  /**
   * Verify the OTP code
   * 
   * @param inputCode - The code to verify
   * @returns True if code matches and is valid
   */
  public verify(inputCode: string): boolean {
    this._attemptCount++;
    this._lastAttemptAt = new Date();
    
    if (this.isUsed()) {
      return false;
    }
    
    if (this.isExpired()) {
      return false;
    }
    
    const normalizedInput = inputCode.trim().replace(/-/g, '');
    const normalizedValue = this._value.replace(/-/g, '');
    const isMatch = normalizedValue === normalizedInput;
    
    if (isMatch) {
      this._verifiedAt = new Date();
    }
    
    return isMatch;
  }

  /**
   * Check if max attempts have been exceeded
   */
  public isMaxAttemptsExceeded(): boolean {
    return this._attemptCount >= OTP_CONFIG.MAX_VERIFICATION_ATTEMPTS;
  }

  /**
   * Get remaining attempts
   */
  public getRemainingAttempts(): number {
    return Math.max(0, OTP_CONFIG.MAX_VERIFICATION_ATTEMPTS - this._attemptCount);
  }

  /**
   * Increment resend counter
   */
  public incrementResend(): void {
    this._resendCount++;
  }

  /**
   * Check if resend is allowed
   */
  public canResend(): boolean {
    if (this._resendCount >= OTP_CONFIG.MAX_RESEND_ATTEMPTS) {
      return false;
    }
    
    if (this.isUsed()) {
      return false;
    }
    
    // Check cooldown
    const cooldownMs = OTP_CONFIG.RESEND_COOLDOWN_SECONDS * 1000;
    const timeSinceCreation = new Date().getTime() - this._createdAt.getTime();
    
    return timeSinceCreation >= cooldownMs;
  }

  /**
   * Create a new OTP for resend (preserves type and purpose)
   */
  public createResend(): OtpCode {
    const newCode = OtpCode.generate(this._type);
    const newOtp = new OtpCode(newCode, this._type, this._purpose);
    newOtp._resendCount = this._resendCount + 1;
    return newOtp;
  }

  // ============================================================
  // Formatting Methods
  // ============================================================

  /**
   * Format OTP for display (with masking)
   */
  public formatForDisplay(mask: boolean = false): string {
    if (!mask) {
      return this._value;
    }
    
    // Mask all but last 2 digits/characters
    const visibleChars = 2;
    const maskedLength = this._value.length - visibleChars;
    if (maskedLength <= 0) return this._value;
    
    const maskedPart = '*'.repeat(maskedLength);
    const visiblePart = this._value.slice(-visibleChars);
    
    // If backup code with hyphen, preserve hyphen position
    if (this._type === OtpType.BACKUP && this._value.includes('-')) {
      const parts = this._value.split('-');
      if (parts.length === 2) {
        return `${'*'.repeat(parts[0].length)}-${'*'.repeat(parts[1].length)}`;
      }
    }
    
    return maskedPart + visiblePart;
  }

  /**
   * Get OTP for sending (raw value, no formatting)
   */
  public getForSending(): string {
    return this._value;
  }

  /**
   * Get formatted OTP for SMS (with spaces for readability)
   */
  public formatForSMS(): string {
    if (this._type === OtpType.BACKUP && this._value.includes('-')) {
      return this._value;
    }
    
    // Add space every 3 digits for readability
    if (this._value.length === 6) {
      return `${this._value.slice(0, 3)} ${this._value.slice(3)}`;
    }
    
    return this._value;
  }

  // ============================================================
  // ValueObject Implementation
  // ============================================================

  /**
   * Check if OTP is empty/placeholder
   */
  public override isEmpty(): boolean {
    return this._value === '' || this._value === '000000';
  }

  /**
   * Get equality components
   */
  protected getEqualityComponents(): readonly unknown[] {
    return [this._value, this._type, this._purpose, this._createdAt.getTime()];
  }

  /**
   * Convert to JSON serializable object
   */
  public override toJSON(): Record<string, unknown> {
    return {
      value: this._value,
      type: this._type,
      purpose: this._purpose,
      createdAt: this._createdAt.toISOString(),
      expiresAt: this._expiresAt.toISOString(),
      verifiedAt: this._verifiedAt?.toISOString(),
      attemptCount: this._attemptCount,
      resendCount: this._resendCount,
      remainingAttempts: this.getRemainingAttempts(),
      remainingSeconds: this.getRemainingSeconds(),
      isValid: this.isValid(),
      isExpired: this.isExpired(),
      isUsed: this.isUsed(),
    };
  }

  /**
   * String representation for debugging
   */
  public override toString(): string {
    return `OtpCode(${this.formatForDisplay(true)}, type=${this._type}, purpose=${this._purpose}, remaining=${this.getRemainingSeconds()}s)`;
  }
}

// ============================================================
// Utility Functions
// ============================================================

/**
 * Type guard to check if a value is an OtpCode
 */
export function isOtpCode(value: unknown): value is OtpCode {
  return value instanceof OtpCode;
}

/**
 * OTP request configuration (for application layer)
 */
export interface OtpRequestConfig {
  phoneNumber?: string;
  email?: string;
  userId?: string;
  ipAddress?: string;
}

/**
 * Create OTP for specific purpose (factory method)
 */
export function createOtpForPurpose(
  purpose: OtpPurpose,
  type?: OtpType
): OtpCode {
  // Map purpose to default OTP type
  let defaultType: OtpType;
  
  switch (purpose) {
    case OtpPurpose.LOGIN:
    case OtpPurpose.REGISTRATION:
      defaultType = OtpType.SMS;
      break;
    case OtpPurpose.EMAIL_VERIFICATION:
    case OtpPurpose.PASSWORD_RESET:
      defaultType = OtpType.EMAIL;
      break;
    case OtpPurpose.MFA_VERIFICATION:
    case OtpPurpose.MFA_SETUP:
      defaultType = OtpType.TOTP;
      break;
    case OtpPurpose.PAYMENT_CONFIRMATION:
    case OtpPurpose.WITHDRAWAL:
      defaultType = OtpType.TRANSACTION;
      break;
    case OtpPurpose.BKASH_PAYMENT:
      defaultType = OtpType.SMS;
      break;
    default:
      defaultType = OtpType.SMS;
  }
  
  const finalType = type || defaultType;
  const code = OtpCode.generate(finalType);
  
  return new OtpCode(code, finalType, purpose);
}

// ============================================================
// Type Exports
// ============================================================

export type { OtpStatus, OtpRequestConfig };
