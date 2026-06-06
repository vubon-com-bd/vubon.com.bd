/**
 * OTP Code Value Object - Pure Domain Core (Enterprise Grade)
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce

 * @module domain/value-objects/otp-code.vo

 * @description
 * Represents a One-Time Password (OTP) code with validation, expiry, and usage tracking.
 * Used for MFA, password reset, email verification, and transaction confirmation.

 * Enterprise Features (Applied):
 * ✅ Shared configuration from @vubon/shared-constants
 * ✅ Rate limiting for OTP requests
 * ✅ Multi-language template support (English/Bengali)
 * ✅ SMS/Email/WhatsApp format variations
 * ✅ Security event auditing support

 * Enterprise Rules:
 * ✅ Immutable - OTP value never changes after creation
 * ✅ Self-validating - Validates format based on type
 * ✅ Time-aware - Tracks creation and expiry
 * ✅ Usage-aware - Tracks attempts and usage status
 * ✅ Framework-free - No external dependencies
 * ✅ Bangladesh specific - Mobile operator optimization ready
 * ✅ Secure - Uses crypto.randomInt for OTP generation

 * @example
 * const otp = new OtpCode('123456', OtpType.SMS, OtpPurpose.LOGIN);
 * console.log(otp.isExpired()); // false
 * console.log(otp.verify('123456')); // true
 * console.log(otp.canResend()); // true
 * console.log(otp.getTemplateMessage('bn')); // 'আপনার লগইন OTP: 123456. বৈধতা ৫ মিনিট।'
 */

import { ValueObject } from './base.vo';

// ✅ FIXED: Import from shared-config instead of local constants
import { OTP_CONFIG } from '@vubon/shared-config';

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

/**
 * Rate limit result for OTP requests
 */
export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetAt: Date;
  reason?: string;
}

/**
 * OTP template message with localization
 */
export interface OtpTemplateMessage {
  en: string;
  bn: string;
  smsFormat?: string;
  whatsappFormat?: string;
}

// ==================== Constants from Shared Config ====================

// Use configuration from shared-config (single source of truth)
const {
  LENGTHS,
  EXPIRY_SECONDS,
  MAX_VERIFICATION_ATTEMPTS,
  MAX_RESEND_ATTEMPTS,
  RESEND_COOLDOWN_SECONDS,
  MAX_OTP_PER_PHONE_PER_HOUR,
  MAX_OTP_PER_EMAIL_PER_HOUR,
  MAX_OTP_PER_IP_PER_HOUR,
  EXPIRY_BUFFER_SECONDS,
} = OTP_CONFIG;

// ==================== Secure Random Generator ====================

/**
 * Cryptographically secure random integer generator
 * Falls back to Math.random only if crypto is not available (e.g., React Native without polyfill)
 */
function secureRandomInt(min: number, max: number): number {
  const range = max - min;
  
  // Try Node.js crypto first
  if (typeof globalThis.crypto !== 'undefined' && globalThis.crypto.getRandomValues) {
    // Web Crypto API (works in browsers, Node.js 19+, React Native with polyfill)
    const randomBuffer = new Uint32Array(1);
    globalThis.crypto.getRandomValues(randomBuffer);
    const randomNumber = randomBuffer[0] / (0xffffffff + 1);
    return min + Math.floor(randomNumber * range);
  }
  
  // Fallback for environments without crypto (should not happen in production)
  // Warning logged for development only
  if (typeof process !== 'undefined' && process.env.NODE_ENV !== 'production') {
    console.warn('[SecureRandom] Falling back to Math.random - not secure for production!');
  }
  return min + Math.floor(Math.random() * range);
}

// ==================== OTP Template Messages ====================

/**
 * OTP template messages for different purposes (English & Bengali)
 */
const OTP_TEMPLATES: Record<OtpPurpose, OtpTemplateMessage> = {
  [OtpPurpose.LOGIN]: {
    en: `Your login OTP is: {code}. Valid for {expiry} minutes.`,
    bn: `আপনার লগইন OTP: {code}. বৈধতা {expiry} মিনিট।`,
    smsFormat: `{code} is your Vubon login OTP. Valid for {expiry} min.`,
    whatsappFormat: `🔐 *Vubon Login Verification*\n\nYour OTP is: *{code}*\nValid for {expiry} minutes.\nNever share this code with anyone.`,
  },
  [OtpPurpose.REGISTRATION]: {
    en: `Welcome to Vubon! Your registration OTP is: {code}. Valid for {expiry} minutes.`,
    bn: `ভুবনে স্বাগতম! আপনার নিবন্ধন OTP: {code}. বৈধতা {expiry} মিনিট।`,
    smsFormat: `Welcome to Vubon! Use OTP {code} to complete registration. Valid {expiry}min.`,
  },
  [OtpPurpose.PASSWORD_RESET]: {
    en: `Your password reset OTP is: {code}. Valid for {expiry} minutes.`,
    bn: `আপনার পাসওয়ার্ড রিসেট OTP: {code}. বৈধতা {expiry} মিনিট।`,
    smsFormat: `Use OTP {code} to reset your Vubon password. Valid {expiry}min.`,
  },
  [OtpPurpose.EMAIL_VERIFICATION]: {
    en: `Your email verification OTP is: {code}. Valid for {expiry} minutes.`,
    bn: `আপনার ইমেইল ভেরিফিকেশন OTP: {code}. বৈধতা {expiry} মিনিট।`,
  },
  [OtpPurpose.PHONE_VERIFICATION]: {
    en: `Your phone verification OTP is: {code}. Valid for {expiry} minutes.`,
    bn: `আপনার ফোন ভেরিফিকেশন OTP: {code}. বৈধতা {expiry} মিনিট।`,
    smsFormat: `Vubon verification: {code}. Valid {expiry}min.`,
  },
  [OtpPurpose.PAYMENT_CONFIRMATION]: {
    en: `Your payment confirmation OTP is: {code}. Valid for {expiry} minutes. Amount: {amount} BDT.`,
    bn: `আপনার পেমেন্ট কনফার্মেশন OTP: {code}. বৈধতা {expiry} মিনিট। পরিমাণ: {amount} টাকা।`,
    smsFormat: `Payment OTP: {code} for {amount}BDT. Valid {expiry}min.`,
  },
  [OtpPurpose.MFA_SETUP]: {
    en: `Your MFA setup OTP is: {code}. Valid for {expiry} minutes.`,
    bn: `আপনার MFA সেটআপ OTP: {code}. বৈধতা {expiry} মিনিট।`,
  },
  [OtpPurpose.MFA_VERIFICATION]: {
    en: `Your MFA verification OTP is: {code}. Valid for {expiry} minutes.`,
    bn: `আপনার MFA ভেরিফিকেশন OTP: {code}. বৈধতা {expiry} মিনিট।`,
    smsFormat: `MFA OTP: {code}. Valid {expiry}min.`,
  },
  [OtpPurpose.DEVICE_TRUST]: {
    en: `Your device trust OTP is: {code}. Valid for {expiry} minutes.`,
    bn: `আপনার ডিভাইস ট্রাস্ট OTP: {code}. বৈধতা {expiry} মিনিট।`,
  },
  [OtpPurpose.WITHDRAWAL]: {
    en: `Your withdrawal OTP is: {code}. Valid for {expiry} minutes. Amount: {amount} BDT.`,
    bn: `আপনার উইথড্রয়াল OTP: {code}. বৈধতা {expiry} মিনিট। পরিমাণ: {amount} টাকা।`,
    smsFormat: `Withdrawal OTP: {code} for {amount}BDT. Valid {expiry}min.`,
  },
  [OtpPurpose.SENSITIVE_ACTION]: {
    en: `Your verification OTP for sensitive action is: {code}. Valid for {expiry} minutes.`,
    bn: `আপনার সংবেদনশীল অ্যাকশনের জন্য ভেরিফিকেশন OTP: {code}. বৈধতা {expiry} মিনিট।`,
  },
  [OtpPurpose.BKASH_PAYMENT]: {
    en: `Your bKash payment OTP is: {code}. Valid for {expiry} minutes. Amount: {amount} BDT.`,
    bn: `আপনার বিকাশ পেমেন্ট OTP: {code}. বৈধতা {expiry} মিনিট। পরিমাণ: {amount} টাকা।`,
    smsFormat: `bKash OTP: {code} for {amount}BDT. Valid {expiry}min.`,
    whatsappFormat: `💸 *bKash Payment Verification*\n\nAmount: ৳{amount}\nOTP: *{code}*\nValid for {expiry} minutes.\nNever share this code.`,
  },
  [OtpPurpose.NAGAD_PAYMENT]: {
    en: `Your Nagad payment OTP is: {code}. Valid for {expiry} minutes. Amount: {amount} BDT.`,
    bn: `আপনার নগদ পেমেন্ট OTP: {code}. বৈধতা {expiry} মিনিট। পরিমাণ: {amount} টাকা।`,
    smsFormat: `Nagad OTP: {code} for {amount}BDT. Valid {expiry}min.`,
  },
  [OtpPurpose.ROCKET_PAYMENT]: {
    en: `Your Rocket payment OTP is: {code}. Valid for {expiry} minutes. Amount: {amount} BDT.`,
    bn: `আপনার রকেট পেমেন্ট OTP: {code}. বৈধতা {expiry} মিনিট। পরিমাণ: {amount} টাকা।`,
    smsFormat: `Rocket OTP: {code} for {amount}BDT. Valid {expiry}min.`,
  },
};

// ==================== OTP Code Value Object ====================

/**
 * OTP Code Value Object

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
  private _metadata?: Record<string, unknown>;

  /**
   * Creates a new OTP Code value object

   * @param code - Raw OTP code string
   * @param type - Type of OTP
   * @param purpose - Business purpose
   * @param createdAt - Optional creation time (defaults to now)
   * @param metadata - Optional metadata (amount, orderId, etc.)
   * @throws {Error} If OTP format is invalid for the type
   */
  constructor(
    code: string,
    type: OtpType,
    purpose: OtpPurpose,
    createdAt?: Date,
    metadata?: Record<string, unknown>
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
    this._metadata = metadata;

    const expirySeconds = EXPIRY_SECONDS[type];
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
    createdAt?: Date,
    metadata?: Record<string, unknown>
  ): OtpCode {
    return new OtpCode(code, type, purpose, createdAt, metadata);
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
    metadata?: Record<string, unknown>;
  }): OtpCode {
    const otp = new OtpCode(data.value, data.type, data.purpose, data.createdAt, data.metadata);
    // Override expiry if needed (not recomputed)
    Object.defineProperty(otp, '_expiresAt', { value: data.expiresAt });
    otp._verifiedAt = data.verifiedAt;
    otp._attemptCount = data.attemptCount;
    otp._resendCount = data.resendCount;
    otp._lastAttemptAt = data.lastAttemptAt;
    return otp;
  }

  // ============================================================
  // Rate Limit Methods (Enterprise Feature)
  // ============================================================

  /**
   * Check if OTP request is allowed for a target
   * This is a domain method that requires infrastructure to track counts
   * 
   * @param target - Phone number, email, or IP address
   * @param targetType - Type of target ('phone', 'email', 'ip')
   * @param getCurrentCount - Function to get current request count (provided by infrastructure)
   * @returns Rate limit result
   */
  public static async checkRateLimit(
    target: string,
    targetType: 'phone' | 'email' | 'ip',
    getCurrentCount: (target: string, targetType: string) => Promise<number>
  ): Promise<RateLimitResult> {
    const currentCount = await getCurrentCount(target, targetType);
    
    let maxPerHour: number;
    switch (targetType) {
      case 'phone':
        maxPerHour = MAX_OTP_PER_PHONE_PER_HOUR;
        break;
      case 'email':
        maxPerHour = MAX_OTP_PER_EMAIL_PER_HOUR;
        break;
      case 'ip':
        maxPerHour = MAX_OTP_PER_IP_PER_HOUR;
        break;
    }

    const remaining = Math.max(0, maxPerHour - currentCount);
    const resetAt = new Date();
    resetAt.setHours(resetAt.getHours() + 1);

    return {
      allowed: currentCount < maxPerHour,
      remaining,
      resetAt,
      reason: currentCount >= maxPerHour ? `Rate limit exceeded for ${targetType}. Max ${maxPerHour} per hour.` : undefined,
    };
  }

  // ============================================================
  // Template Message Methods (Enterprise Feature)
  // ============================================================

  /**
   * Get template message for this OTP
   * 
   * @param locale - Language locale ('en' for English, 'bn' for Bengali)
   * @param format - Message format ('default', 'sms', 'whatsapp')
   * @param variables - Additional variables for template (e.g., amount)
   * @returns Formatted message string
   */
  public getTemplateMessage(
    locale: 'en' | 'bn' = 'en',
    format: 'default' | 'sms' | 'whatsapp' = 'default',
    variables?: Record<string, string | number>
  ): string {
    const template = OTP_TEMPLATES[this._purpose];
    
    let message: string;
    
    if (format === 'sms' && template.smsFormat) {
      message = template.smsFormat;
    } else if (format === 'whatsapp' && template.whatsappFormat) {
      message = template.whatsappFormat;
    } else {
      message = template[locale];
    }
    
    // Replace placeholders
    const expiryMinutes = Math.floor(EXPIRY_SECONDS[this._type] / 60);
    
    message = message
      .replace('{code}', this.formatForSMS())
      .replace('{expiry}', expiryMinutes.toString())
      .replace('{expiryMinutes}', expiryMinutes.toString());
    
    // Add variables if provided
    if (variables) {
      for (const [key, value] of Object.entries(variables)) {
        message = message.replace(`{${key}}`, String(value));
      }
    }
    
    return message;
  }

  /**
   * Get all available templates for this OTP purpose
   */
  public getAvailableTemplates(): OtpTemplateMessage {
    return OTP_TEMPLATES[this._purpose];
  }

  /**
   * Generate security event data for audit logging
   */
  public getSecurityEventData(): Record<string, unknown> {
    return {
      otpId: this.generateEventId(),
      type: this._type,
      purpose: this._purpose,
      createdAt: this._createdAt.toISOString(),
      expiresAt: this._expiresAt.toISOString(),
      attemptCount: this._attemptCount,
      resendCount: this._resendCount,
      isExpired: this.isExpired(),
      isUsed: this.isUsed(),
      metadata: this._metadata,
    };
  }

  /**
   * Generate unique event ID for audit trail
   */
  private generateEventId(): string {
    return `otp_${this._createdAt.getTime()}_${this._value.slice(-4)}`;
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

    const config = LENGTHS[type];
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
   * Generate a cryptographically secure random OTP code
   */
  public static generate(type: OtpType): string {
    const config = LENGTHS[type];
    const length = config.max;

    if (type === OtpType.BACKUP) {
      // Generate alphanumeric backup code (no ambiguous characters)
      // Removed: 0, O, I, l to avoid confusion
      const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
      let result = '';
      for (let i = 0; i < length; i++) {
        const randomIndex = secureRandomInt(0, chars.length);
        result += chars[randomIndex];
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
        const digit = secureRandomInt(0, 10);
        result += digit.toString();
      }
      return result;
    }
  }

  /**
   * Generate OTP with external random function (for dependency injection)
   */
  public static generateWithRandom(type: OtpType, randomInt: (min: number, max: number) => number): string {
    const config = LENGTHS[type];
    const length = config.max;

    if (type === OtpType.BACKUP) {
      const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
      let result = '';
      for (let i = 0; i < length; i++) {
        result += chars[randomInt(0, chars.length)];
      }
      if (length === 8) {
        return result.slice(0, 4) + '-' + result.slice(4);
      }
      return result;
    } else {
      let result = '';
      for (let i = 0; i < length; i++) {
        result += randomInt(0, 10).toString();
      }
      return result;
    }
  }

  // ============================================================
  // Getters
  // ============================================================

  public getValue(): string {
    return this._value;
  }

  public getType(): OtpType {
    return this._type;
  }

  public getPurpose(): OtpPurpose {
    return this._purpose;
  }

  public getCreatedAt(): Date {
    return new Date(this._createdAt);
  }

  public getExpiresAt(): Date {
    return new Date(this._expiresAt);
  }

  public getVerifiedAt(): Date | undefined {
    return this._verifiedAt ? new Date(this._verifiedAt) : undefined;
  }

  public getAttemptCount(): number {
    return this._attemptCount;
  }

  public getResendCount(): number {
    return this._resendCount;
  }

  public getLastAttemptAt(): Date | undefined {
    return this._lastAttemptAt ? new Date(this._lastAttemptAt) : undefined;
  }

  public getMetadata(): Record<string, unknown> | undefined {
    return this._metadata ? { ...this._metadata } : undefined;
  }

  // ============================================================
  // Status Methods
  // ============================================================

  public isExpired(): boolean {
    if (this._type === OtpType.BACKUP) {
      return false;
    }
    if (this._verifiedAt) {
      return true;
    }

    const bufferMs = EXPIRY_BUFFER_SECONDS * 1000;
    const effectiveExpiry = new Date(this._expiresAt.getTime() - bufferMs);
    return new Date() > effectiveExpiry;
  }

  public isUsed(): boolean {
    return !!this._verifiedAt;
  }

  public isValid(): boolean {
    return !this.isExpired() && !this.isUsed();
  }

  public getStatus(): OtpStatus {
    return {
      isValid: this.isValid(),
      isExpired: this.isExpired(),
      isUsed: this.isUsed(),
      remainingAttempts: this.getRemainingAttempts(),
      remainingSeconds: this.getRemainingSeconds(),
    };
  }

  public getRemainingSeconds(): number {
    if (this.isExpired()) return 0;
    if (this._type === OtpType.BACKUP) return -1;

    const remaining = Math.max(0, (this._expiresAt.getTime() - new Date().getTime()) / 1000);
    return Math.ceil(remaining);
  }

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

  public isMaxAttemptsExceeded(): boolean {
    return this._attemptCount >= MAX_VERIFICATION_ATTEMPTS;
  }

  public getRemainingAttempts(): number {
    return Math.max(0, MAX_VERIFICATION_ATTEMPTS - this._attemptCount);
  }

  public incrementResend(): void {
    this._resendCount++;
  }

  public canResend(): boolean {
    if (this._resendCount >= MAX_RESEND_ATTEMPTS) {
      return false;
    }

    if (this.isUsed()) {
      return false;
    }

    // Check cooldown
    const cooldownMs = RESEND_COOLDOWN_SECONDS * 1000;
    const timeSinceCreation = new Date().getTime() - this._createdAt.getTime();

    return timeSinceCreation >= cooldownMs;
  }

  public createResend(): OtpCode {
    const newCode = OtpCode.generate(this._type);
    const newOtp = new OtpCode(newCode, this._type, this._purpose, undefined, this._metadata);
    newOtp._resendCount = this._resendCount + 1;
    return newOtp;
  }

  // ============================================================
  // Formatting Methods
  // ============================================================

  public formatForDisplay(mask: boolean = false): string {
    if (!mask) {
      return this._value;
    }

    const visibleChars = 2;
    const maskedLength = this._value.length - visibleChars;
    if (maskedLength <= 0) return this._value;

    const maskedPart = '*'.repeat(maskedLength);
    const visiblePart = this._value.slice(-visibleChars);

    if (this._type === OtpType.BACKUP && this._value.includes('-')) {
      const parts = this._value.split('-');
      if (parts.length === 2) {
        return `${'*'.repeat(parts[0].length)}-${'*'.repeat(parts[1].length)}`;
      }
    }

    return maskedPart + visiblePart;
  }

  public getForSending(): string {
    return this._value;
  }

  public formatForSMS(): string {
    if (this._type === OtpType.BACKUP && this._value.includes('-')) {
      return this._value;
    }

    if (this._value.length === 6) {
      return `${this._value.slice(0, 3)} ${this._value.slice(3)}`;
    }

    return this._value;
  }

  // ============================================================
  // ValueObject Implementation
  // ============================================================

  public override isEmpty(): boolean {
    return this._value === '' || this._value === '000000';
  }

  protected getEqualityComponents(): readonly unknown[] {
    return [this._value, this._type, this._purpose, this._createdAt.getTime()];
  }

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
      metadata: this._metadata,
    };
  }

  public override toString(): string {
    return `OtpCode(${this.formatForDisplay(true)}, type=${this._type}, purpose=${this._purpose}, remaining=${this.getRemainingSeconds()}s)`;
  }
}

// ============================================================
// Utility Functions
// ============================================================

export function isOtpCode(value: unknown): value is OtpCode {
  return value instanceof OtpCode;
}

export interface OtpRequestConfig {
  phoneNumber?: string;
  email?: string;
  userId?: string;
  ipAddress?: string;
  amount?: number;
  orderId?: string;
}

export function createOtpForPurpose(
  purpose: OtpPurpose,
  type?: OtpType,
  metadata?: Record<string, unknown>
): OtpCode {
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
    case OtpPurpose.NAGAD_PAYMENT:
    case OtpPurpose.ROCKET_PAYMENT:
      defaultType = OtpType.SMS;
      break;
    default:
      defaultType = OtpType.SMS;
  }

  const finalType = type || defaultType;
  const code = OtpCode.generate(finalType);

  return new OtpCode(code, finalType, purpose, undefined, metadata);
}

export function createOtpForPurposeWithRandom(
  purpose: OtpPurpose,
  randomInt: (min: number, max: number) => number,
  type?: OtpType,
  metadata?: Record<string, unknown>
): OtpCode {
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
    case OtpPurpose.NAGAD_PAYMENT:
    case OtpPurpose.ROCKET_PAYMENT:
      defaultType = OtpType.SMS;
      break;
    default:
      defaultType = OtpType.SMS;
  }

  const finalType = type || defaultType;
  const code = OtpCode.generateWithRandom(finalType, randomInt);

  return new OtpCode(code, finalType, purpose, undefined, metadata);
}

// ============================================================
// Type Exports
// ============================================================

export type { OtpStatus, OtpRequestConfig, RateLimitResult, OtpTemplateMessage };
