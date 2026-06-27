/**
 * OTP Code Value Object - Pure Domain Core (Enterprise Grade)
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module domain/value-objects/otp-code.vo
 * 
 * @description
 * Represents a One-Time Password (OTP) code with validation, expiry, and usage tracking.
 * Used for MFA, password reset, email verification, and transaction confirmation.
 * 
 * Enterprise Features:
 * ✅ Shared configuration from @vubon/shared-config
 * ✅ Rate limiting for OTP requests
 * ✅ Multi-language template support (English/Bengali)
 * ✅ SMS/Email/WhatsApp format variations
 * ✅ Security event auditing support
 * 
 * @example
 * const otp = new OtpCode('123456', OtpType.SMS, OtpPurpose.LOGIN);
 * console.log(otp.isExpired()); // false
 * console.log(otp.verify('123456')); // true
 * console.log(otp.canResend()); // true
 */

import { ValueObject } from './base.vo';
import { OTP_CONFIG } from '@vubon/shared-config';

// ==================== Enums ====================

export enum OtpType {
  SMS = 'sms',
  EMAIL = 'email',
  TOTP = 'totp',
  BACKUP = 'backup',
  MAGIC_LINK = 'magic_link',
  TRANSACTION = 'transaction',
  DEVICE_VERIFICATION = 'device_verification',
  WHATSAPP = 'whatsapp',
  VOICE = 'voice',
}

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
  BKASH_PAYMENT = 'bkash_payment',
  NAGAD_PAYMENT = 'nagad_payment',
  ROCKET_PAYMENT = 'rocket_payment',
}

// ==================== Types ====================

export interface OtpValidation {
  isValid: boolean;
  normalized?: string;
  error?: string;
}

export interface OtpStatus {
  isValid: boolean;
  isExpired: boolean;
  isUsed: boolean;
  remainingAttempts: number;
  remainingSeconds: number;
}

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetAt: Date;
  reason?: string;
}

export interface OtpTemplateMessage {
  en: string;
  bn: string;
  smsFormat?: string;
  whatsappFormat?: string;
}

// ==================== Constants from Shared Config ====================

const {
  LENGTHS,
  EXPIRY_SECONDS,
  MAX_VERIFICATION_ATTEMPTS,
  MAX_RESEND_ATTEMPTS,
  RESEND_COOLDOWN_SECONDS,
  RATE_LIMITS,
  EXPIRY_BUFFER_SECONDS,
} = OTP_CONFIG;

const MAX_OTP_PER_PHONE_PER_HOUR = RATE_LIMITS.maxPerPhonePerHour;
const MAX_OTP_PER_EMAIL_PER_HOUR = RATE_LIMITS.maxPerEmailPerHour;
const MAX_OTP_PER_IP_PER_HOUR = RATE_LIMITS.maxPerIPPerHour;

// ==================== Secure Random Generator ====================

function secureRandomInt(min: number, max: number): number {
  const range = max - min;
  
  if (typeof globalThis.crypto !== 'undefined' && globalThis.crypto.getRandomValues) {
    const randomBuffer = new Uint32Array(1);
    globalThis.crypto.getRandomValues(randomBuffer);
   // সুরক্ষিত র্যান্ডম সংখ্যা
const randomNumber = (randomBuffer[0] ?? 0) / (0xffffffff + 1);
    return min + Math.floor(randomNumber * range);
  }
  
  if (typeof process !== 'undefined' && process.env.NODE_ENV !== 'production') {
    console.warn('[SecureRandom] Falling back to Math.random - not secure for production!');
  }
  return min + Math.floor(Math.random() * range);
}

// ==================== OTP Template Messages ====================

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

export class OtpCode extends ValueObject {
  private readonly _value: string;
  private readonly _type: OtpType;
  private readonly _purpose: OtpPurpose;
  private readonly _otpCreatedAt: number;
  private readonly _otpExpiresAt: number;
  private _otpVerifiedAt?: number;
  private _otpAttemptCount: number = 0;
  private _otpResendCount: number = 0;
  private _otpLastAttemptAt?: number;
  private _otpMetadata: Record<string, unknown>;

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
    this._otpCreatedAt = createdAt ? createdAt.getTime() : Date.now();
    this._otpMetadata = metadata ? { ...metadata } : {};

    const expiryKey = type.toUpperCase() as keyof typeof EXPIRY_SECONDS;
    const expirySeconds = EXPIRY_SECONDS[expiryKey] || EXPIRY_SECONDS.SMS;
    this._otpExpiresAt = this._otpCreatedAt + (expirySeconds * 1000);

    this._otpAttemptCount = 0;
    this._otpResendCount = 0;

    this.validate();
  }

  protected validate(): void {
    if (this.isEmpty()) {
      throw new Error('OTP code cannot be empty');
    }

    if (this._otpCreatedAt > this._otpExpiresAt) {
      throw new Error('CreatedAt cannot be after ExpiresAt');
    }
  }

  // ============================================================
  // Factory Methods
  // ============================================================

  public static fromValid(
    code: string,
    type: OtpType,
    purpose: OtpPurpose,
    createdAt?: Date,
    metadata?: Record<string, unknown>
  ): OtpCode {
    return new OtpCode(code, type, purpose, createdAt, metadata);
  }

  public static reconstitute(data: {
    value: string;
    type: OtpType;
    purpose: OtpPurpose;
    createdAt: number;
    expiresAt: number;
    verifiedAt?: number;
    attemptCount: number;
    resendCount: number;
    lastAttemptAt?: number;
    metadata?: Record<string, unknown>;
  }): OtpCode {
    const otp = new OtpCode(
      data.value,
      data.type,
      data.purpose,
      new Date(data.createdAt),
      data.metadata
    );
    (otp as any)._otpExpiresAt = data.expiresAt;
    (otp as any)._otpVerifiedAt = data.verifiedAt;
    (otp as any)._otpAttemptCount = data.attemptCount;
    (otp as any)._otpResendCount = data.resendCount;
    (otp as any)._otpLastAttemptAt = data.lastAttemptAt;
    return otp;
  }

  // ============================================================
  // Rate Limit Methods
  // ============================================================

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
      ...(currentCount >= maxPerHour ? {
        reason: `Rate limit exceeded for ${targetType}. Max ${maxPerHour} per hour.`
      } : {}),
    };
  }

  // ============================================================
  // Template Message Methods
  // ============================================================

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
    
    const expiryKey = this._type.toUpperCase() as keyof typeof EXPIRY_SECONDS;
    const expirySeconds = EXPIRY_SECONDS[expiryKey] || EXPIRY_SECONDS.SMS;
    const expiryMinutes = Math.floor(expirySeconds / 60);
    
    message = message
      .replace(/\{code\}/g, this.formatForSMS())
      .replace(/\{expiry\}/g, expiryMinutes.toString());
    
    if (variables) {
      for (const [key, value] of Object.entries(variables)) {
        message = message.replace(new RegExp(`\\{${key}\\}`, 'g'), String(value));
      }
    }
    
    return message;
  }

  public getAvailableTemplates(): OtpTemplateMessage {
    return OTP_TEMPLATES[this._purpose];
  }

  public getSecurityEventData(): Record<string, unknown> {
    return {
      otpId: this.generateEventId(),
      type: this._type,
      purpose: this._purpose,
      createdAt: new Date(this._otpCreatedAt).toISOString(),
      expiresAt: new Date(this._otpExpiresAt).toISOString(),
      attemptCount: this._otpAttemptCount,
      resendCount: this._otpResendCount,
      isExpired: this.isExpired(),
      isUsed: this.isUsed(),
      metadata: this._otpMetadata,
    };
  }

  private generateEventId(): string {
    return `otp_${this._otpCreatedAt}_${this._value.slice(-4)}`;
  }

  // ============================================================
  // Validation Methods
  // ============================================================

  public static validate(code: string, type: OtpType): OtpValidation {
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

    const typeKey = type.toUpperCase() as keyof typeof LENGTHS;
    // ✅ FIXED: Safely access config with null check
    const config = LENGTHS[typeKey] ?? LENGTHS.SMS;
    
    // Type guard to ensure config exists
    if (!config) {
      return {
        isValid: false,
        error: `Unknown OTP type: ${type}`,
      };
    }

    if (trimmed.length < config.min || trimmed.length > config.max) {
      return {
        isValid: false,
        error: `OTP must be ${config.min}${config.min !== config.max ? `-${config.max}` : ''} characters`,
      };
    }

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
    };
  }

  public static generate(type: OtpType): string {
    const typeKey = type.toUpperCase() as keyof typeof LENGTHS;
    // ✅ FIXED: Safely access config with null check
    const config = LENGTHS[typeKey] ?? LENGTHS.SMS;
    const length = config?.max ?? 6;

    if (type === OtpType.BACKUP) {
      const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
      let result = '';
      for (let i = 0; i < length; i++) {
        const randomIndex = secureRandomInt(0, chars.length);
        result += chars[randomIndex];
      }
      if (length === 8) {
        return result.slice(0, 4) + '-' + result.slice(4);
      }
      return result;
    } else {
      let result = '';
      for (let i = 0; i < length; i++) {
        const digit = secureRandomInt(0, 10);
        result += digit.toString();
      }
      return result;
    }
  }

  public static generateWithRandom(type: OtpType, randomInt: (min: number, max: number) => number): string {
    const typeKey = type.toUpperCase() as keyof typeof LENGTHS;
    // ✅ FIXED: Safely access config with null check
    const config = LENGTHS[typeKey] ?? LENGTHS.SMS;
    const length = config?.max ?? 6;

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

  public getValue(): string { return this._value; }
  public getType(): OtpType { return this._type; }
  public getPurpose(): OtpPurpose { return this._purpose; }
  public getCreatedAt(): Date { return new Date(this._otpCreatedAt); }
  public getExpiresAt(): Date { return new Date(this._otpExpiresAt); }
  public getVerifiedAt(): Date | undefined {
    return this._otpVerifiedAt ? new Date(this._otpVerifiedAt) : undefined;
  }
  public getAttemptCount(): number { return this._otpAttemptCount; }
  public getResendCount(): number { return this._otpResendCount; }
  public getLastAttemptAt(): Date | undefined {
    return this._otpLastAttemptAt ? new Date(this._otpLastAttemptAt) : undefined;
  }
  public getMetadata(): Record<string, unknown> {
    return { ...this._otpMetadata };
  }

  // ============================================================
  // Status Methods
  // ============================================================

  public isExpired(): boolean {
    if (this._type === OtpType.BACKUP) {
      return false;
    }
    if (this._otpVerifiedAt) {
      return true;
    }

    const bufferMs = EXPIRY_BUFFER_SECONDS * 1000;
    const effectiveExpiry = this._otpExpiresAt - bufferMs;
    return Date.now() > effectiveExpiry;
  }

  public isUsed(): boolean {
    return !!this._otpVerifiedAt;
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

    const remaining = Math.max(0, (this._otpExpiresAt - Date.now()) / 1000);
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
    this._otpAttemptCount++;
    this._otpLastAttemptAt = Date.now();

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
      this._otpVerifiedAt = Date.now();
    }

    return isMatch;
  }

  public isMaxAttemptsExceeded(): boolean {
    return this._otpAttemptCount >= MAX_VERIFICATION_ATTEMPTS;
  }

  public getRemainingAttempts(): number {
    return Math.max(0, MAX_VERIFICATION_ATTEMPTS - this._otpAttemptCount);
  }

  public incrementResend(): void {
    this._otpResendCount++;
  }

  public canResend(): boolean {
    if (this._otpResendCount >= MAX_RESEND_ATTEMPTS) {
      return false;
    }

    if (this.isUsed()) {
      return false;
    }

    const cooldownMs = RESEND_COOLDOWN_SECONDS * 1000;
    const timeSinceCreation = Date.now() - this._otpCreatedAt;

    return timeSinceCreation >= cooldownMs;
  }

  public createResend(): OtpCode {
    const newCode = OtpCode.generate(this._type);
    const newOtp = new OtpCode(newCode, this._type, this._purpose, undefined, this._otpMetadata);
    newOtp._otpResendCount = this._otpResendCount + 1;
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
      const firstPart = parts[0] ?? '';
      const secondPart = parts[1] ?? '';
      return `${'*'.repeat(firstPart.length)}-${'*'.repeat(secondPart.length)}`;
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
    return [this._value, this._type, this._purpose, this._otpCreatedAt];
  }

  public override toJSON(): Record<string, unknown> {
    return {
      value: this._value,
      type: this._type,
      purpose: this._purpose,
      createdAt: new Date(this._otpCreatedAt).toISOString(),
      expiresAt: new Date(this._otpExpiresAt).toISOString(),
      verifiedAt: this._otpVerifiedAt ? new Date(this._otpVerifiedAt).toISOString() : undefined,
      attemptCount: this._otpAttemptCount,
      resendCount: this._otpResendCount,
      remainingAttempts: this.getRemainingAttempts(),
      remainingSeconds: this.getRemainingSeconds(),
      isValid: this.isValid(),
      isExpired: this.isExpired(),
      isUsed: this.isUsed(),
      metadata: this._otpMetadata,
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


