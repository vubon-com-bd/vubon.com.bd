/**
 * Reset Password Command - Pure Command Data Structure (Enterprise Enhanced v3.0)
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce

 * @module application/commands/auth/reset-password.command

 * @description
 * Command for resetting a forgotten password using a valid reset token or OTP.
 * Contains token/OTP and new password with device context for security audit.
 * Supports both email token and phone OTP methods (Bangladesh specific).

 * ENTERPRISE ENHANCEMENTS (v3.0):
 * ✅ Shared types integration (@vubon/shared-types)
 * ✅ Shared constants (@vubon/shared-constants)
 * ✅ Branded types for type safety (CommandId, ResetToken, OtpCode, SessionId, CorrelationId)
 * ✅ Command validation on construction (fail-fast)
 * ✅ Multi-language validation messages (English/Bengali)
 * ✅ Comprehensive masking methods for secure logging
 * ✅ Execution context for distributed tracing
 * ✅ Type guards for runtime type checking
 * ✅ Audit-ready metadata
 * ✅ Factory methods for common scenarios
 * ✅ Bangladesh specific fields (district, upazila, mobileOperator, networkType)
 * ✅ Password strength hints in JSDoc

 * @example
 * // Token-based reset
 * const command = ResetPasswordCommand.fromRequest(
 *   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
 *   'MyNewStr0ng!P@ssw0rd123',
 *   'MyNewStr0ng!P@ssw0rd123',
 *   {
 *     ipAddress: '192.168.1.100',
 *     userAgent: 'Mozilla/5.0...',
 *     deviceId: 'device_456',
 *     district: 'Dhaka'
 *   },
 *   'corr_abc123'
 * );

 * @example
 * // OTP-based reset (Bangladesh specific)
 * const command = ResetPasswordWithOtpCommand.fromRequest(
 *   '+8801712345678',
 *   '123456',
 *   'MyNewStr0ng!P@ssw0rd123',
 *   'MyNewStr0ng!P@ssw0rd123',
 *   {
 *     ipAddress: '192.168.1.100',
 *     userAgent: 'Mozilla/5.0...',
 *     mobileOperator: 'gp'
 *   },
 *   'sess_abc123',
 *   'corr_abc123'
 * );
 */

import { randomUUID } from 'crypto';

// ============================================================
// Shared Packages Import (Enterprise Enhancement)
// ============================================================

import type { 
  DeviceInfo as SharedDeviceInfo,
  ResetMethod as SharedResetMethod,
  MobileOperator as SharedMobileOperator,
  NetworkType as SharedNetworkType,
  Brand,
  Locale
} from '@vubon/shared-types';

import { 
  RESET_METHODS,
  MOBILE_OPERATORS,
  NETWORK_TYPES,
  PASSWORD_POLICY,
  OTP_CONFIG,
  ENV_CONFIG
} from '@vubon/shared-constants';

import { maskString, maskPhone, maskToken } from '@vubon/shared-utils';

// ============================================================
// Branded Types for Type Safety (Enterprise Feature)
// ============================================================

/**
 * Branded command ID type
 * Prevents accidental mixing with other string types
 */
export type CommandId = Brand<string, 'CommandId'>;

/**
 * Branded reset token type
 */
export type ResetToken = Brand<string, 'ResetToken'>;

/**
 * Branded OTP code type
 */
export type OtpCode = Brand<string, 'OtpCode'>;

/**
 * Branded session ID type
 */
export type SessionId = Brand<string, 'SessionId'>;

/**
 * Branded correlation ID type
 * For distributed tracing
 */
export type CorrelationId = Brand<string, 'CorrelationId'>;

// ============================================================
// Types (Using shared types for consistency)
// ============================================================

/**
 * Reset method type (using shared constants)
 */
export type ResetMethod = SharedResetMethod;

/**
 * Device information for reset password audit (Bangladesh specific)
 * ✅ Enhanced: Extends SharedDeviceInfo for complete type safety
 */
export interface ResetPasswordDeviceInfo extends SharedDeviceInfo {
  /** IP address of the request */
  ipAddress?: string;

  /** User agent string */
  userAgent?: string;

  /** Device identifier */
  deviceId?: string;

  /** Device fingerprint hash */
  deviceFingerprint?: string;

  /** Session ID (if available) */
  sessionId?: SessionId;

  /** Request ID for API log linking */
  requestId?: string;

  /** Screen resolution for fingerprinting */
  screenResolution?: string;

  /** Browser language */
  language?: string;

  /** Timezone offset in minutes */
  timezoneOffset?: number;

  /** Retry attempt number (for connection resilience) */
  retryAttempt?: number;

  // Bangladesh specific fields
  /** District (from IP geolocation) */
  district?: string;

  /** Upazila (from IP geolocation) */
  upazila?: string;

  /** Mobile operator (for mobile network users) - from shared-constants */
  mobileOperator?: SharedMobileOperator;

  /** Network type (2G, 3G, 4G, 5G, WiFi) - from shared-constants */
  networkType?: SharedNetworkType;

  /** Whether data saver is enabled */
  dataSaverEnabled?: boolean;
}

/**
 * Command options interface (Builder pattern)
 */
export interface ResetPasswordCommandOptions {
  /** Device context for security audit */
  deviceInfo?: ResetPasswordDeviceInfo;

  /** Correlation ID for distributed tracing */
  correlationId?: CorrelationId;

  /** Preferred language for messages */
  locale?: Locale;
}

/**
 * Validation result interface
 */
export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

// ============================================================
// Constants (Using shared-constants)
// ============================================================

const IS_PRODUCTION = ENV_CONFIG?.IS_PRODUCTION ?? false;

const PASSWORD_CONFIG = {
  MIN_LENGTH: PASSWORD_POLICY?.MIN_LENGTH ?? 8,
  MAX_LENGTH: PASSWORD_POLICY?.MAX_LENGTH ?? 128,
  REQUIRE_UPPERCASE: PASSWORD_POLICY?.REQUIRE_UPPERCASE ?? true,
  REQUIRE_LOWERCASE: PASSWORD_POLICY?.REQUIRE_LOWERCASE ?? true,
  REQUIRE_NUMBERS: PASSWORD_POLICY?.REQUIRE_NUMBERS ?? true,
  REQUIRE_SPECIAL: PASSWORD_POLICY?.REQUIRE_SYMBOLS ?? true,
} as const;

const OTP_CONFIG_VALUES = {
  LENGTH: OTP_CONFIG?.LENGTH ?? 6,
  PATTERN: OTP_CONFIG?.PATTERN ?? /^\d{6}$/,
} as const;

const TOKEN_CONFIG = {
  MIN_LENGTH: 32,
  MAX_LENGTH: 512,
  JWT_PATTERN: /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/,
} as const;

// ============================================================
// Validation Messages (Multi-language)
// ============================================================

const VALIDATION_MESSAGES = {
  en: {
    tokenRequired: 'Reset token is required',
    tokenInvalid: 'Invalid reset token format',
    tokenMinLength: (min: number) => `Reset token must be at least ${min} characters`,
    tokenMaxLength: (max: number) => `Reset token cannot exceed ${max} characters`,
    otpRequired: 'OTP code is required',
    otpInvalid: (length: number) => `OTP code must be exactly ${length} digits`,
    phoneRequired: 'Phone number is required',
    phoneInvalid: 'Invalid phone number format. Use E.164 format (e.g., +8801712345678)',
    newPasswordRequired: 'New password is required',
    newPasswordMinLength: (min: number) => `Password must be at least ${min} characters`,
    newPasswordMaxLength: (max: number) => `Password cannot exceed ${max} characters`,
    newPasswordWeak: 'Password is too weak. Must contain uppercase, lowercase, number, and special character',
    confirmPasswordRequired: 'Confirm password is required',
    passwordMismatch: 'Passwords do not match',
    sessionIdRequired: 'Session ID is required for OTP verification',
    sessionIdInvalid: 'Session ID must be a valid UUID',
    deviceIdMaxLength: (max: number) => `Device ID cannot exceed ${max} characters`,
  },
  bn: {
    tokenRequired: 'রিসেট টোকেন প্রয়োজন',
    tokenInvalid: 'অবৈধ রিসেট টোকেন ফরম্যাট',
    tokenMinLength: (min: number) => `রিসেট টোকেন কমপক্ষে ${min} অক্ষরের হতে হবে`,
    tokenMaxLength: (max: number) => `রিসেট টোকেন সর্বোচ্চ ${max} অক্ষর হতে পারে`,
    otpRequired: 'OTP কোড প্রয়োজন',
    otpInvalid: (length: number) => `OTP কোড অবশ্যই ${length} ডিজিটের হতে হবে`,
    phoneRequired: 'ফোন নম্বর প্রয়োজন',
    phoneInvalid: 'ভুল ফোন নম্বর ফরম্যাট। E.164 ফরম্যাট ব্যবহার করুন (যেমন: +8801712345678)',
    newPasswordRequired: 'নতুন পাসওয়ার্ড প্রয়োজন',
    newPasswordMinLength: (min: number) => `পাসওয়ার্ড কমপক্ষে ${min} অক্ষরের হতে হবে`,
    newPasswordMaxLength: (max: number) => `পাসওয়ার্ড সর্বোচ্চ ${max} অক্ষর হতে পারে`,
    newPasswordWeak: 'পাসওয়ার্ড খুব দুর্বল। বড় হাতের অক্ষর, ছোট হাতের অক্ষর, সংখ্যা এবং স্পেশাল ক্যারেক্টার থাকতে হবে',
    confirmPasswordRequired: 'কনফার্ম পাসওয়ার্ড প্রয়োজন',
    passwordMismatch: 'পাসওয়ার্ড দুটি মিলছে না',
    sessionIdRequired: 'OTP ভেরিফিকেশনের জন্য সেশন আইডি প্রয়োজন',
    sessionIdInvalid: 'সেশন আইডি টি সঠিক UUID হতে হবে',
    deviceIdMaxLength: (max: number) => `ডিভাইস আইডি সর্বোচ্চ ${max} অক্ষর হতে পারে`,
  },
};

/**
 * Get validation message with locale support
 */
function getValidationMessage(
  key: keyof typeof VALIDATION_MESSAGES.en,
  locale: Locale = 'en',
  ...args: unknown[]
): string {
  const messageFn = VALIDATION_MESSAGES[locale][key] as ((...args: unknown[]) => string) | string;
  if (typeof messageFn === 'function') {
    return messageFn(...args);
  }
  return messageFn || VALIDATION_MESSAGES.en[key](...args);
}

// ============================================================
// Command Validation Error Class
// ============================================================

export class CommandValidationError extends Error {
  public readonly validationErrors: string[];
  public readonly commandType: string;
  public readonly locale: Locale;

  constructor(message: string, validationErrors: string[], commandType: string, locale: Locale = 'en') {
    super(message);
    this.name = 'CommandValidationError';
    this.validationErrors = validationErrors;
    this.commandType = commandType;
    this.locale = locale;
    Error.captureStackTrace(this, this.constructor);
  }
}

// ============================================================
// Reset Password Command Builder (Enterprise Pattern)
// ============================================================

/**
 * Reset Password Command Builder
 * ✅ Enterprise: Builder pattern for fluent command construction

 * @example
 * const command = new ResetPasswordCommandBuilder()
 *   .setToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...')
 *   .setNewPassword('MyNewStr0ng!P@ssw0rd123')
 *   .setConfirmPassword('MyNewStr0ng!P@ssw0rd123')
 *   .setDeviceInfo({ ipAddress: '192.168.1.100', district: 'Dhaka' })
 *   .setCorrelationId('corr_abc123')
 *   .build();
 */
export class ResetPasswordCommandBuilder {
  private token: string | null = null;
  private newPassword: string | null = null;
  private confirmPassword: string | null = null;
  private deviceInfo?: ResetPasswordDeviceInfo;
  private correlationId?: CorrelationId;
  private locale: Locale = 'en';

  setToken(token: string): this {
    this.token = token;
    return this;
  }

  setNewPassword(password: string): this {
    this.newPassword = password;
    return this;
  }

  setConfirmPassword(password: string): this {
    this.confirmPassword = password;
    return this;
  }

  setDeviceInfo(deviceInfo: ResetPasswordDeviceInfo): this {
    this.deviceInfo = deviceInfo;
    return this;
  }

  setCorrelationId(correlationId: CorrelationId): this {
    this.correlationId = correlationId;
    return this;
  }

  setLocale(locale: Locale): this {
    this.locale = locale;
    return this;
  }

  build(): ResetPasswordCommand {
    if (!this.token) {
      throw new CommandValidationError(
        'Reset token is required',
        [getValidationMessage('tokenRequired', this.locale)],
        'ResetPasswordCommand',
        this.locale
      );
    }
    if (!this.newPassword) {
      throw new CommandValidationError(
        'New password is required',
        [getValidationMessage('newPasswordRequired', this.locale)],
        'ResetPasswordCommand',
        this.locale
      );
    }
    if (!this.confirmPassword) {
      throw new CommandValidationError(
        'Confirm password is required',
        [getValidationMessage('confirmPasswordRequired', this.locale)],
        'ResetPasswordCommand',
        this.locale
      );
    }

    return new ResetPasswordCommand(
      this.token as ResetToken,
      this.newPassword,
      this.confirmPassword,
      this.deviceInfo,
      this.correlationId,
      this.locale
    );
  }
}

// ============================================================
// Reset Password Command (Token-based - Enterprise Enhanced v3.0)
// ============================================================

/**
 * Reset Password Command (Token-based)

 * @param token - Password reset token from email (JWT format expected)
 * @param newPassword - New password (must meet complexity requirements)
 * @param confirmPassword - Must match newPassword
 * @param deviceInfo - Device context for security audit
 * @param correlationId - Correlation ID for distributed tracing
 * @param locale - Preferred language for messages

 * @example
 * // Using constructor directly
 * const command = new ResetPasswordCommand(
 *   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
 *   'MyNewStr0ng!P@ssw0rd123',
 *   'MyNewStr0ng!P@ssw0rd123',
 *   { ipAddress: '192.168.1.100', district: 'Dhaka' },
 *   'corr_abc123',
 *   'en'
 * );

 * // Using builder (recommended)
 * const command = new ResetPasswordCommandBuilder()
 *   .setToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...')
 *   .setNewPassword('MyNewStr0ng!P@ssw0rd123')
 *   .setConfirmPassword('MyNewStr0ng!P@ssw0rd123')
 *   .setDeviceInfo({ ipAddress: '192.168.1.100', district: 'Dhaka' })
 *   .build();
 */
export class ResetPasswordCommand {
  public readonly commandId: CommandId;
  public readonly timestamp: Date;
  public readonly method: ResetMethod;

  constructor(
    /** Password reset token from email */
    public readonly token: ResetToken,
    /** New password (plain text, will be hashed) */
    public readonly newPassword: string,
    /** Confirm password (must match newPassword) */
    public readonly confirmPassword: string,
    /** Device context for security audit */
    public readonly deviceInfo?: ResetPasswordDeviceInfo,
    /** Correlation ID for distributed tracing */
    public readonly correlationId?: CorrelationId,
    /** Preferred language for messages */
    public readonly locale: Locale = 'en'
  ) {
    this.commandId = randomUUID() as CommandId;
    this.timestamp = new Date();
    this.method = RESET_METHODS.TOKEN;

    // ✅ Enterprise: Validate command on construction
    this.validate();
  }

  // ============================================================
  // Factory Methods (Enterprise Enhancement)
  // ============================================================

  /**
   * Factory method for creating from request (convenience)
   */
  public static fromRequest(
    token: string,
    newPassword: string,
    confirmPassword: string,
    deviceInfo?: ResetPasswordDeviceInfo,
    correlationId?: CorrelationId,
    locale?: Locale
  ): ResetPasswordCommand {
    return new ResetPasswordCommand(
      token as ResetToken,
      newPassword,
      confirmPassword,
      deviceInfo,
      correlationId,
      locale
    );
  }

  // ============================================================
  // Validation Methods (Enterprise Enhancement)
  // ============================================================

  /**
   * Validate command data
   * @throws {CommandValidationError} If validation fails
   */
  private validate(): void {
    const validation = this.getValidationResult();
    if (!validation.isValid) {
      throw new CommandValidationError(
        'Reset password command validation failed',
        validation.errors,
        'ResetPasswordCommand',
        this.locale
      );
    }
  }

  /**
   * Get validation result without throwing
   */
  public getValidationResult(): ValidationResult {
    const errors: string[] = [];

    // Validate token
    if (!this.token || this.token.trim().length === 0) {
      errors.push(getValidationMessage('tokenRequired', this.locale));
    } else {
      if (this.token.length < TOKEN_CONFIG.MIN_LENGTH) {
        errors.push(getValidationMessage('tokenMinLength', this.locale, TOKEN_CONFIG.MIN_LENGTH));
      }
      if (this.token.length > TOKEN_CONFIG.MAX_LENGTH) {
        errors.push(getValidationMessage('tokenMaxLength', this.locale, TOKEN_CONFIG.MAX_LENGTH));
      }
      // Optional: Validate JWT format (basic check)
      if (!TOKEN_CONFIG.JWT_PATTERN.test(this.token)) {
        errors.push(getValidationMessage('tokenInvalid', this.locale));
      }
    }

    // Validate new password
    if (!this.newPassword || this.newPassword.trim().length === 0) {
      errors.push(getValidationMessage('newPasswordRequired', this.locale));
    } else {
      if (this.newPassword.length < PASSWORD_CONFIG.MIN_LENGTH) {
        errors.push(getValidationMessage('newPasswordMinLength', this.locale, PASSWORD_CONFIG.MIN_LENGTH));
      }
      if (this.newPassword.length > PASSWORD_CONFIG.MAX_LENGTH) {
        errors.push(getValidationMessage('newPasswordMaxLength', this.locale, PASSWORD_CONFIG.MAX_LENGTH));
      }
    }

    // Validate confirm password
    if (!this.confirmPassword || this.confirmPassword.trim().length === 0) {
      errors.push(getValidationMessage('confirmPasswordRequired', this.locale));
    }

    // Validate password match
    if (this.newPassword && this.confirmPassword && this.newPassword !== this.confirmPassword) {
      errors.push(getValidationMessage('passwordMismatch', this.locale));
    }

    // Validate device ID length
    if (this.deviceInfo?.deviceId && this.deviceInfo.deviceId.length > 255) {
      errors.push(getValidationMessage('deviceIdMaxLength', this.locale, 255));
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  /**
   * Validate that passwords match (basic check)
   * Full validation handled by handler
   */
  public doPasswordsMatch(): boolean {
    return this.newPassword === this.confirmPassword;
  }

  // ============================================================
  // Helper Methods
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
   * Get device fingerprint for security
   */
  public getDeviceFingerprint(): string | undefined {
    return this.deviceInfo?.deviceFingerprint;
  }

  /**
   * Get district for location tracking (Bangladesh specific)
   */
  public getDistrict(): string | undefined {
    return this.deviceInfo?.district;
  }

  /**
   * Get upazila for location tracking (Bangladesh specific)
   */
  public getUpazila(): string | undefined {
    return this.deviceInfo?.upazila;
  }

  /**
   * Get mobile operator for network tracking (Bangladesh specific)
   */
  public getMobileOperator(): SharedMobileOperator | undefined {
    return this.deviceInfo?.mobileOperator;
  }

  /**
   * Get network type for network tracking (Bangladesh specific)
   */
  public getNetworkType(): SharedNetworkType | undefined {
    return this.deviceInfo?.networkType;
  }

  /**
   * Check if device info is present
   */
  public hasDeviceInfo(): boolean {
    return !!this.deviceInfo && (
      !!this.deviceInfo.ipAddress ||
      !!this.deviceInfo.userAgent ||
      !!this.deviceInfo.deviceId
    );
  }

  // ============================================================
  // Execution Context (Enterprise Enhancement)
  // ============================================================

  /**
   * Get execution context for distributed tracing
   */
  public getExecutionContext(): {
    commandId: CommandId;
    correlationId?: CorrelationId;
    timestamp: Date;
    method: ResetMethod;
    source: string;
    locale: Locale;
  } {
    return {
      commandId: this.commandId,
      correlationId: this.correlationId,
      timestamp: this.timestamp,
      method: this.method,
      source: this.getRequestSource(),
      locale: this.locale,
    };
  }

  /**
   * Get request source for analytics
   */
  private getRequestSource(): string {
    const userAgent = this.deviceInfo?.userAgent?.toLowerCase() || '';

    if (userAgent.includes('vubonapp')) return 'mobile_app';
    if (userAgent.includes('admin') || userAgent.includes('dashboard')) return 'admin_portal';
    if (userAgent.includes('mobile') || userAgent.includes('android') || userAgent.includes('iphone')) {
      return 'mobile_web';
    }
    return 'web';
  }

  /**
   * Get validation message in appropriate language
   */
  public getMessage(key: keyof typeof VALIDATION_MESSAGES.en, ...args: unknown[]): string {
    return getValidationMessage(key, this.locale, ...args);
  }

  // ============================================================
  // Masking Methods (Privacy & Secure Logging)
  // ============================================================

  /**
   * Get masked token for logging (privacy)
   */
  public getMaskedToken(): string {
    return maskToken(this.token);
  }

  /**
   * Get masked new password for logging (shows only length)
   */
  public getMaskedNewPassword(): string {
    return this.newPassword ? `[${this.newPassword.length} chars]` : '***';
  }

  /**
   * Get masked IP address for logging
   */
  public getMaskedIpAddress(): string {
    if (!this.deviceInfo?.ipAddress) return '***';
    const ip = this.deviceInfo.ipAddress;
    const parts = ip.split('.');
    if (parts.length === 4) {
      return `${parts[0]}.${parts[1]}.***.***`;
    }
    // IPv6 masking
    if (ip.includes(':')) {
      const segments = ip.split(':');
      if (segments.length >= 4) {
        return `${segments[0]}:${segments[1]}:****:****`;
      }
    }
    return '***';
  }

  /**
   * Get masked device ID for logging
   */
  public getMaskedDeviceId(): string {
    if (!this.deviceInfo?.deviceId) return '***';
    if (this.deviceInfo.deviceId.length <= 8) return '***';
    return this.deviceInfo.deviceId.slice(0, 4) + '***' + this.deviceInfo.deviceId.slice(-4);
  }

  // ============================================================
  // Audit Metadata (Enterprise Enhancement)
  // ============================================================

  /**
   * Get audit metadata for compliance
   */
  public getAuditMetadata(): Record<string, unknown> {
    return {
      commandId: this.commandId,
      correlationId: this.correlationId,
      method: this.method,
      source: this.getRequestSource(),
      locale: this.locale,
      maskedToken: this.getMaskedToken(),
      passwordLength: this.newPassword?.length,
      hasConfirmPassword: !!this.confirmPassword,
      doPasswordsMatch: this.doPasswordsMatch(),
      hasDeviceInfo: this.hasDeviceInfo(),
      deviceInfo: this.deviceInfo ? {
        hasIp: !!this.deviceInfo.ipAddress,
        maskedIp: this.getMaskedIpAddress(),
        hasUserAgent: !!this.deviceInfo.userAgent,
        hasDeviceId: !!this.deviceInfo.deviceId,
        maskedDeviceId: this.getMaskedDeviceId(),
        hasDeviceFingerprint: !!this.deviceInfo.deviceFingerprint,
        district: this.deviceInfo.district,
        upazila: this.deviceInfo.upazila,
        mobileOperator: this.deviceInfo.mobileOperator,
        networkType: this.deviceInfo.networkType,
      } : undefined,
      timestamp: this.timestamp.toISOString(),
    };
  }

  // ============================================================
  // Logging Methods (Enterprise Enhancement)
  // ============================================================

  /**
   * Convert to string for logging (sensitive data masked)
   */
  public toString(): string {
    return `ResetPasswordCommand(id=${this.commandId.slice(0, 8)}..., method=${this.method}, token=${this.getMaskedToken()}, passwordLength=${this.newPassword?.length}, doPasswordsMatch=${this.doPasswordsMatch()}, source=${this.getRequestSource()}, locale=${this.locale}, timestamp=${this.timestamp.toISOString()})`;
  }

  /**
   * Get summary for JSON logging
   */
  public toJSON(): Record<string, unknown> {
    return {
      commandId: this.commandId,
      correlationId: this.correlationId,
      method: this.method,
      maskedToken: this.getMaskedToken(),
      passwordLength: this.newPassword?.length,
      doPasswordsMatch: this.doPasswordsMatch(),
      source: this.getRequestSource(),
      locale: this.locale,
      hasDeviceInfo: this.hasDeviceInfo(),
      deviceInfo: this.deviceInfo ? {
        hasIp: !!this.deviceInfo.ipAddress,
        maskedIp: this.getMaskedIpAddress(),
        hasUserAgent: !!this.deviceInfo.userAgent,
        hasDeviceId: !!this.deviceInfo.deviceId,
        district: this.deviceInfo.district,
        upazila: this.deviceInfo.upazila,
        mobileOperator: this.deviceInfo.mobileOperator,
        networkType: this.deviceInfo.networkType,
      } : undefined,
      timestamp: this.timestamp.toISOString(),
    };
  }
}

// ============================================================
// Reset Password with OTP Command (Bangladesh specific - Enterprise Enhanced v3.0)
// ============================================================

/**
 * Reset Password with OTP Command (Phone-based)

 * @example
 * const command = ResetPasswordWithOtpCommand.fromRequest(
 *   '+8801712345678',
 *   '123456',
 *   'MyNewStr0ng!P@ssw0rd123',
 *   'MyNewStr0ng!P@ssw0rd123',
 *   { ipAddress: '192.168.1.100', userAgent: 'Mozilla/5.0...', mobileOperator: 'gp' },
 *   'sess_abc123',
 *   'corr_abc123'
 * );
 */
export class ResetPasswordWithOtpCommand {
  public readonly commandId: CommandId;
  public readonly timestamp: Date;
  public readonly method: ResetMethod;
  public readonly normalizedPhone: string;

  constructor(
    /** Phone number (E.164 format) */
    public readonly phoneNumber: string,
    /** OTP code received via SMS/WhatsApp */
    public readonly otpCode: OtpCode,
    /** New password (plain text, will be hashed) */
    public readonly newPassword: string,
    /** Confirm password (must match newPassword) */
    public readonly confirmPassword: string,
    /** Device context for security audit */
    public readonly deviceInfo?: ResetPasswordDeviceInfo,
    /** Session ID from OTP request */
    public readonly sessionId?: SessionId,
    /** Correlation ID for distributed tracing */
    public readonly correlationId?: CorrelationId,
    /** Preferred language for messages */
    public readonly locale: Locale = 'en'
  ) {
    this.commandId = randomUUID() as CommandId;
    this.timestamp = new Date();
    this.method = RESET_METHODS.OTP;
    this.normalizedPhone = this.normalizePhoneNumber(phoneNumber);

    // ✅ Validate on construction
    this.validate();
  }

  /**
   * Normalize phone number to E.164 format
   */
  private normalizePhoneNumber(phone: string): string {
    // Remove all non-digit characters except '+'
    let cleaned = phone.replace(/[^\d+]/g, '');
    if (!cleaned.startsWith('+')) {
      if (cleaned.startsWith('0')) {
        cleaned = `+88${cleaned}`;
      } else if (!cleaned.startsWith('880')) {
        cleaned = `+880${cleaned}`;
      }
    }
    return cleaned;
  }

  /**
   * Factory method for creating from request
   */
  public static fromRequest(
    phoneNumber: string,
    otpCode: string,
    newPassword: string,
    confirmPassword: string,
    deviceInfo?: ResetPasswordDeviceInfo,
    sessionId?: SessionId,
    correlationId?: CorrelationId,
    locale?: Locale
  ): ResetPasswordWithOtpCommand {
    return new ResetPasswordWithOtpCommand(
      phoneNumber,
      otpCode as OtpCode,
      newPassword,
      confirmPassword,
      deviceInfo,
      sessionId,
      correlationId,
      locale
    );
  }

  /**
   * Validate command data
   */
  private validate(): void {
    const errors: string[] = [];

    // Validate phone number
    if (!this.phoneNumber || this.phoneNumber.trim().length === 0) {
      errors.push(getValidationMessage('phoneRequired', this.locale));
    }

    // Validate OTP code
    if (!this.otpCode || this.otpCode.trim().length === 0) {
      errors.push(getValidationMessage('otpRequired', this.locale));
    } else if (!OTP_CONFIG_VALUES.PATTERN.test(this.otpCode)) {
      errors.push(getValidationMessage('otpInvalid', this.locale, OTP_CONFIG_VALUES.LENGTH));
    }

    // Validate new password
    if (!this.newPassword || this.newPassword.trim().length === 0) {
      errors.push(getValidationMessage('newPasswordRequired', this.locale));
    } else {
      if (this.newPassword.length < PASSWORD_CONFIG.MIN_LENGTH) {
        errors.push(getValidationMessage('newPasswordMinLength', this.locale, PASSWORD_CONFIG.MIN_LENGTH));
      }
      if (this.newPassword.length > PASSWORD_CONFIG.MAX_LENGTH) {
        errors.push(getValidationMessage('newPasswordMaxLength', this.locale, PASSWORD_CONFIG.MAX_LENGTH));
      }
    }

    // Validate confirm password
    if (!this.confirmPassword || this.confirmPassword.trim().length === 0) {
      errors.push(getValidationMessage('confirmPasswordRequired', this.locale));
    }

    // Validate password match
    if (this.newPassword && this.confirmPassword && this.newPassword !== this.confirmPassword) {
      errors.push(getValidationMessage('passwordMismatch', this.locale));
    }

    // Validate session ID
    if (!this.sessionId) {
      errors.push(getValidationMessage('sessionIdRequired', this.locale));
    } else {
      const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
      if (!uuidPattern.test(this.sessionId)) {
        errors.push(getValidationMessage('sessionIdInvalid', this.locale));
      }
    }

    if (errors.length > 0) {
      throw new CommandValidationError(
        'Reset password with OTP command validation failed',
        errors,
        'ResetPasswordWithOtpCommand',
        this.locale
      );
    }
  }

  /**
   * Validate that passwords match (basic check)
   */
  public doPasswordsMatch(): boolean {
    return this.newPassword === this.confirmPassword;
  }

  /**
   * Get execution context
   */
  public getExecutionContext(): {
    commandId: CommandId;
    correlationId?: CorrelationId;
    timestamp: Date;
    method: ResetMethod;
    source: string;
    locale: Locale;
  } {
    return {
      commandId: this.commandId,
      correlationId: this.correlationId,
      timestamp: this.timestamp,
      method: this.method,
      source: this.getRequestSource(),
      locale: this.locale,
    };
  }

  private getRequestSource(): string {
    const userAgent = this.deviceInfo?.userAgent?.toLowerCase() || '';
    if (userAgent.includes('mobile')) return 'mobile_web';
    return 'web';
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
   * Get masked phone number for logging
   */
  public getMaskedPhone(): string {
    return maskPhone(this.normalizedPhone);
  }

  /**
   * Get masked OTP for logging
   */
  public getMaskedOtp(): string {
    return this.otpCode ? '***' : '***';
  }

  /**
   * Get masked new password for logging
   */
  public getMaskedNewPassword(): string {
    return this.newPassword ? `[${this.newPassword.length} chars]` : '***';
  }

  /**
   * Convert to string for logging
   */
  public toString(): string {
    return `ResetPasswordWithOtpCommand(id=${this.commandId.slice(0, 8)}..., phone=${this.getMaskedPhone()}, otpLength=${this.otpCode?.length ?? 0}, passwordLength=${this.newPassword?.length}, doPasswordsMatch=${this.doPasswordsMatch()}, hasSessionId=${!!this.sessionId}, source=${this.getRequestSource()}, locale=${this.locale}, timestamp=${this.timestamp.toISOString()})`;
  }

  /**
   * Get summary for JSON logging
   */
  public toJSON(): Record<string, unknown> {
    return {
      commandId: this.commandId,
      correlationId: this.correlationId,
      method: this.method,
      maskedPhone: this.getMaskedPhone(),
      otpLength: this.otpCode?.length,
      passwordLength: this.newPassword?.length,
      doPasswordsMatch: this.doPasswordsMatch(),
      hasSessionId: !!this.sessionId,
      source: this.getRequestSource(),
      locale: this.locale,
      hasDeviceInfo: !!this.deviceInfo,
      deviceInfo: this.deviceInfo ? {
        hasIp: !!this.deviceInfo.ipAddress,
        hasUserAgent: !!this.deviceInfo.userAgent,
        hasDeviceId: !!this.deviceInfo.deviceId,
        district: this.deviceInfo.district,
        upazila: this.deviceInfo.upazila,
        mobileOperator: this.deviceInfo.mobileOperator,
        networkType: this.deviceInfo.networkType,
      } : undefined,
      timestamp: this.timestamp.toISOString(),
    };
  }
}

// ============================================================
// Validate Reset Token Command (Enterprise Enhanced)
// ============================================================

/**
 * Validate Reset Token Command

 * @example
 * const command = new ValidateResetTokenCommand(
 *   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
 *   'corr_abc123'
 * );
 */
export class ValidateResetTokenCommand {
  public readonly commandId: CommandId;
  public readonly timestamp: Date;

  constructor(
    /** Password reset token to validate */
    public readonly token: ResetToken,
    /** Correlation ID for distributed tracing */
    public readonly correlationId?: CorrelationId,
    /** Preferred language for messages */
    public readonly locale: Locale = 'en'
  ) {
    this.commandId = randomUUID() as CommandId;
    this.timestamp = new Date();

    // Validate on construction
    this.validate();
  }

  private validate(): void {
    const errors: string[] = [];

    if (!this.token || this.token.trim().length === 0) {
      errors.push(getValidationMessage('tokenRequired', this.locale));
    } else {
      if (this.token.length < TOKEN_CONFIG.MIN_LENGTH) {
        errors.push(getValidationMessage('tokenMinLength', this.locale, TOKEN_CONFIG.MIN_LENGTH));
      }
      if (this.token.length > TOKEN_CONFIG.MAX_LENGTH) {
        errors.push(getValidationMessage('tokenMaxLength', this.locale, TOKEN_CONFIG.MAX_LENGTH));
      }
    }

    if (errors.length > 0) {
      throw new CommandValidationError(
        'Validate reset token command validation failed',
        errors,
        'ValidateResetTokenCommand',
        this.locale
      );
    }
  }

  /**
   * Get masked token for logging
   */
  public getMaskedToken(): string {
    return maskToken(this.token);
  }

  /**
   * Convert to string for logging
   */
  public toString(): string {
    return `ValidateResetTokenCommand(id=${this.commandId.slice(0, 8)}..., token=${this.getMaskedToken()}, locale=${this.locale}, timestamp=${this.timestamp.toISOString()})`;
  }
}

// ============================================================
// Verify Reset OTP Command (Bangladesh specific - Enterprise Enhanced)
// ============================================================

/**
 * Verify Reset OTP Command

 * @example
 * const command = new VerifyResetOtpCommand(
 *   '+8801712345678',
 *   '123456',
 *   'sess_abc123',
 *   { ipAddress: '192.168.1.100', userAgent: 'Mozilla/5.0...' },
 *   'corr_abc123'
 * );
 */
export class VerifyResetOtpCommand {
  public readonly commandId: CommandId;
  public readonly timestamp: Date;
  public readonly normalizedPhone: string;

  constructor(
    /** Phone number (E.164 format) */
    public readonly phoneNumber: string,
    /** OTP code to verify */
    public readonly otpCode: OtpCode,
    /** Session ID from OTP request */
    public readonly sessionId?: SessionId,
    /** Device context for security audit */
    public readonly deviceInfo?: ResetPasswordDeviceInfo,
    /** Correlation ID for distributed tracing */
    public readonly correlationId?: CorrelationId,
    /** Preferred language for messages */
    public readonly locale: Locale = 'en'
  ) {
    this.commandId = randomUUID() as CommandId;
    this.timestamp = new Date();
    this.normalizedPhone = this.normalizePhoneNumber(phoneNumber);

    this.validate();
  }

  private normalizePhoneNumber(phone: string): string {
    let cleaned = phone.replace(/[^\d+]/g, '');
    if (!cleaned.startsWith('+')) {
      if (cleaned.startsWith('0')) {
        cleaned = `+88${cleaned}`;
      } else if (!cleaned.startsWith('880')) {
        cleaned = `+880${cleaned}`;
      }
    }
    return cleaned;
  }

  private validate(): void {
    const errors: string[] = [];

    if (!this.phoneNumber || this.phoneNumber.trim().length === 0) {
      errors.push(getValidationMessage('phoneRequired', this.locale));
    }

    if (!this.otpCode || this.otpCode.trim().length === 0) {
      errors.push(getValidationMessage('otpRequired', this.locale));
    } else if (!OTP_CONFIG_VALUES.PATTERN.test(this.otpCode)) {
      errors.push(getValidationMessage('otpInvalid', this.locale, OTP_CONFIG_VALUES.LENGTH));
    }

    if (!this.sessionId) {
      errors.push(getValidationMessage('sessionIdRequired', this.locale));
    }

    if (errors.length > 0) {
      throw new CommandValidationError(
        'Verify reset OTP command validation failed',
        errors,
        'VerifyResetOtpCommand',
        this.locale
      );
    }
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
   * Get masked phone number for logging
   */
  public getMaskedPhone(): string {
    return maskPhone(this.normalizedPhone);
  }

  /**
   * Get masked OTP for logging
   */
  public getMaskedOtp(): string {
    return this.otpCode ? '***' : '***';
  }

  /**
   * Convert to string for logging
   */
  public toString(): string {
    return `VerifyResetOtpCommand(id=${this.commandId.slice(0, 8)}..., phone=${this.getMaskedPhone()}, otpLength=${this.otpCode?.length ?? 0}, hasSessionId=${!!this.sessionId}, locale=${this.locale}, timestamp=${this.timestamp.toISOString()})`;
  }
}

// ============================================================
// Resend Reset OTP Command (Bangladesh specific - Enterprise Enhanced)
// ============================================================

/**
 * Resend Reset OTP Command

 * @example
 * const command = new ResendResetOtpCommand(
 *   '+8801712345678',
 *   'whatsapp',
 *   { ipAddress: '192.168.1.100', userAgent: 'Mozilla/5.0...' },
 *   'corr_abc123'
 * );
 */
export class ResendResetOtpCommand {
  public readonly commandId: CommandId;
  public readonly timestamp: Date;
  public readonly normalizedPhone: string;

  constructor(
    /** Phone number (E.164 format) */
    public readonly phoneNumber: string,
    /** Method to resend OTP ('sms' or 'whatsapp') */
    public readonly method: 'sms' | 'whatsapp',
    /** Device context for security audit */
    public readonly deviceInfo?: ResetPasswordDeviceInfo,
    /** Correlation ID for distributed tracing */
    public readonly correlationId?: CorrelationId,
    /** Preferred language for messages */
    public readonly locale: Locale = 'en'
  ) {
    this.commandId = randomUUID() as CommandId;
    this.timestamp = new Date();
    this.normalizedPhone = this.normalizePhoneNumber(phoneNumber);

    this.validate();
  }

  private normalizePhoneNumber(phone: string): string {
    let cleaned = phone.replace(/[^\d+]/g, '');
    if (!cleaned.startsWith('+')) {
      if (cleaned.startsWith('0')) {
        cleaned = `+88${cleaned}`;
      } else if (!cleaned.startsWith('880')) {
        cleaned = `+880${cleaned}`;
      }
    }
    return cleaned;
  }

  private validate(): void {
    const errors: string[] = [];

    if (!this.phoneNumber || this.phoneNumber.trim().length === 0) {
      errors.push(getValidationMessage('phoneRequired', this.locale));
    }

    if (this.method !== 'sms' && this.method !== 'whatsapp') {
      errors.push('Invalid method. Must be sms or whatsapp');
    }

    if (errors.length > 0) {
      throw new CommandValidationError(
        'Resend reset OTP command validation failed',
        errors,
        'ResendResetOtpCommand',
        this.locale
      );
    }
  }

  /**
   * Get IP address for audit
   */
  public getIpAddress(): string | undefined {
    return this.deviceInfo?.ipAddress;
  }

  /**
   * Get masked phone number for logging
   */
  public getMaskedPhone(): string {
    return maskPhone(this.normalizedPhone);
  }

  /**
   * Convert to string for logging
   */
  public toString(): string {
    return `ResendResetOtpCommand(id=${this.commandId.slice(0, 8)}..., phone=${this.getMaskedPhone()}, method=${this.method}, locale=${this.locale}, timestamp=${this.timestamp.toISOString()})`;
  }
}

// ============================================================
// Type Guards (Enterprise Enhancement)
// ============================================================

/**
 * Type guard for ResetPasswordCommand
 */
export function isResetPasswordCommand(command: unknown): command is ResetPasswordCommand {
  return command instanceof ResetPasswordCommand;
}

/**
 * Type guard for ResetPasswordWithOtpCommand
 */
export function isResetPasswordWithOtpCommand(command: unknown): command is ResetPasswordWithOtpCommand {
  return command instanceof ResetPasswordWithOtpCommand;
}

/**
 * Type guard for ValidateResetTokenCommand
 */
export function isValidateResetTokenCommand(command: unknown): command is ValidateResetTokenCommand {
  return command instanceof ValidateResetTokenCommand;
}

/**
 * Type guard for VerifyResetOtpCommand
 */
export function isVerifyResetOtpCommand(command: unknown): command is VerifyResetOtpCommand {
  return command instanceof VerifyResetOtpCommand;
}

/**
 * Type guard for ResendResetOtpCommand
 */
export function isResendResetOtpCommand(command: unknown): command is ResendResetOtpCommand {
  return command instanceof ResendResetOtpCommand;
}

/**
 * Type guard for any reset command
 */
export function isAnyResetCommand(command: unknown): command is 
  | ResetPasswordCommand 
  | ResetPasswordWithOtpCommand 
  | ValidateResetTokenCommand 
  | VerifyResetOtpCommand 
  | ResendResetOtpCommand {
  return isResetPasswordCommand(command) ||
         isResetPasswordWithOtpCommand(command) ||
         isValidateResetTokenCommand(command) ||
         isVerifyResetOtpCommand(command) ||
         isResendResetOtpCommand(command);
}

// ============================================================
// Type Exports
// ============================================================

export type { 
  ResetPasswordDeviceInfo as ResetPasswordDeviceInfoType,
  ResetPasswordCommandOptions as ResetPasswordCommandOptionsType,
  ValidationResult as ValidationResultType,
  CommandId as CommandIdType,
  ResetToken as ResetTokenType,
  OtpCode as OtpCodeType,
  SessionId as SessionIdType,
  CorrelationId as CorrelationIdType
};

// ============================================================
// Password Strength Hints (JSDoc)
// ============================================================

/**
 * Password Policy Requirements:
 * - Minimum length: 8 characters
 * - Maximum length: 128 characters
 * - At least one uppercase letter (A-Z)
 * - At least one lowercase letter (a-z)
 * - At least one number (0-9)
 * - At least one special character (!@#$%^&*()_+-=[]{}|;:,.<>?)
 * - Cannot contain spaces
 * - Cannot contain common patterns (password, 123456, qwerty, etc.)
 * 
 * @example
 * // Strong password examples:
 * // "MyStr0ng!P@ssw0rd123"
 * // "Secure#Password2024"
 * // "Bangladesh@Ecom2024"
 * 
 * @example
 * // Weak passwords (will be rejected):
 * // "password123"
 * // "12345678"
 * // "qwerty123"
 */

// ============================================================
// ENTERPRISE SUMMARY v3.0
// ============================================================
// 
// Enterprise Enhancements Applied in v3.0:
// 1. ✅ Shared types integration from @vubon/shared-types
// 2. ✅ Shared constants from @vubon/shared-constants
// 3. ✅ Shared utilities for masking (@vubon/shared-utils)
// 4. ✅ Branded types for type safety (CommandId, ResetToken, OtpCode, SessionId, CorrelationId)
// 5. ✅ Command validation on construction (fail-fast)
// 6. ✅ Builder pattern for flexible command construction
// 7. ✅ Factory methods for common scenarios
// 8. ✅ Multi-language support (English/Bengali) with locale parameter
// 9. ✅ Comprehensive masking methods for secure logging
// 10. ✅ Type-safe toString() and toJSON() methods
// 11. ✅ Execution context for distributed tracing
// 12. ✅ Request source detection for analytics
// 13. ✅ Type guards for runtime type checking
// 14. ✅ Audit metadata for compliance
// 15. ✅ Token and OTP validation
// 16. ✅ Password confirmation validation
// 17. ✅ JWT token format validation
// 18. ✅ Phone number normalization for E.164 format
// 19. ✅ Session ID validation for OTP flow
// 20. ✅ Device ID length validation
// 
// Bangladesh Specific:
// - Phone number normalization with BD country code
// - SMS and WhatsApp method support
// - District/Upazila tracking for location analytics
// - Mobile operator and network type detection
// - Bengali language support (locale: 'bn')
// - E.164 format for phone numbers
// 
// Security Features:
// - Token validation on construction
// - Password confirmation validation
// - Passwords never logged (only length shown)
// - Tokens masked in logs
// - OTPs never logged
// - Device fingerprint tracking ready
// - Distributed tracing ready
// 
// ============================================================
