/**
 * Login Command - Pure Command Data Structure (Enterprise Enhanced v3.0)
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module application/commands/auth/login.command
 * 
 * @description
 * Command for authenticating a user with email, phone, or username.
 * Contains all necessary data for login use case including device context.
 * 
 * ✅ Enterprise Features (v3.0):
 * - Shared types integration (@vubon/shared-types)
 * - Shared constants for patterns (@vubon/shared-constants)
 * - Shared utilities for phone normalization (@vubon/shared-utils)
 * - Bangladesh specific fields (district, upazila, mobileOperator, networkType)
 * - Privacy-friendly masking methods
 * - Immutable command data with readonly properties
 * - Factory methods for specialized commands
 * - Command validation on construction
 * - Execution context for tracing
 * - Type-safe toString() for logging
 * - Type guards for runtime type checking
 * - International phone number support
 * - Command handler interface contract
 * - ✅ ENTERPRISE ENHANCEMENT: Centralized error messages with Bengali support
 * - ✅ ENTERPRISE ENHANCEMENT: Validation result with detailed field info
 * - ✅ ENTERPRISE ENHANCEMENT: Command metadata for auditing
 * - ✅ ENTERPRISE ENHANCEMENT: Device fingerprint normalization
 * - ✅ ENTERPRISE ENHANCEMENT: Command versioning for backward compatibility
 * - ✅ ENTERPRISE ENHANCEMENT: Retry context for connection resilience
 */

import { randomUUID } from 'crypto';

// ✅ Phase-1: Shared packages import (Enterprise enhancement)
import type { 
  DeviceInfo as SharedDeviceInfo,
  LoginMethod as SharedLoginMethod,
  MobileOperator as SharedMobileOperator,
  NetworkType as SharedNetworkType
} from '@vubon/shared-types';

import { 
  PHONE_PATTERNS,
  LOGIN_METHODS,
  MOBILE_OPERATORS,
  NETWORK_TYPES,
  OTP_CONFIG,
} from '@vubon/shared-constants';

import { 
  normalizePhone, 
  maskPhone, 
  isValidBdMobile, 
  isValidEmail 
} from '@vubon/shared-utils';

// ============================================================
// ✅ ENTERPRISE ENHANCEMENT: Centralized Validation Messages
// ============================================================

export const VALIDATION_MESSAGES = {
  en: {
    identifierRequired: 'Identifier is required',
    passwordRequired: 'Password is required for password-based login',
    invalidEmail: 'Invalid email format',
    invalidPhone: 'Invalid phone number format. Use Bangladesh format (01XXXXXXXXX) or international format (+8801XXXXXXXXX)',
    invalidUsername: (min: number, max: number) => `Username must be between ${min} and ${max} characters`,
    usernameInvalidChars: 'Username can only contain letters, numbers, dots, and underscores',
    otpRequired: 'OTP code is required',
    invalidOtpFormat: (length: number) => `OTP code must be exactly ${length} digits`,
    invalidIp: 'Invalid IP address format',
    userAgentTooLong: (max: number) => `User agent too long (max ${max} characters)`,
  },
  bn: {
    identifierRequired: 'আইডেন্টিফায়ার প্রয়োজন',
    passwordRequired: 'পাসওয়ার্ড ভিত্তিক লগইনের জন্য পাসওয়ার্ড প্রয়োজন',
    invalidEmail: 'ভুল ইমেইল ফরম্যাট',
    invalidPhone: 'ভুল ফোন নম্বর ফরম্যাট। বাংলাদেশ ফরম্যাট (01XXXXXXXXX) অথবা আন্তর্জাতিক ফরম্যাট (+8801XXXXXXXXX) ব্যবহার করুন',
    invalidUsername: (min: number, max: number) => `ইউজারনাম ${min} থেকে ${max} অক্ষরের মধ্যে হতে হবে`,
    usernameInvalidChars: 'ইউজারনামে শুধু অক্ষর, সংখ্যা, ডট এবং আন্ডারস্কোর থাকতে পারে',
    otpRequired: 'OTP কোড প্রয়োজন',
    invalidOtpFormat: (length: number) => `OTP কোড অবশ্যই ${length} ডিজিটের হতে হবে`,
    invalidIp: 'ভুল আইপি অ্যাড্রেস ফরম্যাট',
    userAgentTooLong: (max: number) => `ইউজার এজেন্ট সর্বোচ্চ ${max} অক্ষর হতে পারে`,
  },
};

// ============================================================
// Constants with Fallbacks (Enterprise Enhancement)
// ============================================================

/** OTP length from shared-config (with fallback) */
const OTP_LENGTH = OTP_CONFIG?.LENGTHS?.OTP?.max ?? 6;

/** OTP pattern for validation */
const OTP_PATTERN = new RegExp(`^\\d{${OTP_LENGTH}}$`);

/** International phone pattern (E.164 format) */
const INTERNATIONAL_PHONE_PATTERN = /^\+[1-9]\d{1,14}$/;

/** Username length constraints */
const USERNAME_MIN_LENGTH = 3;
const USERNAME_MAX_LENGTH = 50;

/** ✅ ENTERPRISE ENHANCEMENT: Command version */
const COMMAND_VERSION = '1.0.0';

// ============================================================
// Types (using shared types for consistency)
// ============================================================

/**
 * Device information for login tracking (Bangladesh specific)
 * ✅ Enhanced: Now extends SharedDeviceInfo for complete type safety
 */
export interface LoginDeviceInfo extends SharedDeviceInfo {
  /** Session ID (if resuming a session) */
  sessionId?: string;

  /** Correlation ID for distributed tracing */
  correlationId?: string;

  /** Detected district from IP (infrastructure will enrich) */
  district?: string;

  /** Detected upazila from IP (infrastructure will enrich) */
  upazila?: string;

  /** Screen resolution for fingerprinting */
  screenResolution?: string;

  /** Browser language */
  language?: string;

  /** Timezone */
  timezone?: string;

  /** Retry attempt number (for connection resilience) */
  retryAttempt?: number;
  
  /** ✅ ENTERPRISE ENHANCEMENT: Normalized device fingerprint */
  normalizedFingerprint?: string;
}

/**
 * Login method type (using shared constants)
 */
export type LoginMethod = SharedLoginMethod;

/**
 * ✅ ENTERPRISE ENHANCEMENT: Enhanced validation result with field info
 */
export interface ValidationResult {
  isValid: boolean;
  errors: ValidationErrorDetail[];
}

/**
 * ✅ ENTERPRISE ENHANCEMENT: Detailed validation error
 */
export interface ValidationErrorDetail {
  field: string;
  message: string;
  messageBn?: string;
  code: string;
}

/**
 * Execution context for tracing and monitoring
 */
export interface CommandExecutionContext {
  commandId: string;
  correlationId: string;
  timestamp: Date;
  method: LoginMethod;
  source: 'web' | 'mobile' | 'api' | 'admin';
  version: string;
}

/**
 * ✅ ENTERPRISE ENHANCEMENT: Command metadata for auditing
 */
export interface CommandMetadata {
  executedBy?: string;
  executedAt?: Date;
  durationMs?: number;
  retryCount?: number;
  environment?: 'development' | 'staging' | 'production';
}

/**
 * Command result interface for type-safe returns
 */
export interface CommandResult<T> {
  success: boolean;
  data?: T;
  error?: string;
  errorCode?: string;
  errorBn?: string;
  metadata?: CommandMetadata;
}

/**
 * Command handler interface (Enterprise pattern)
 */
export interface CommandHandler<TCommand, TResult> {
  /** Execute the command */
  execute(command: TCommand): Promise<TResult>;
  
  /** Command type identifier */
  readonly commandType: string;
  
  /** Validate command before execution */
  validate(command: TCommand): ValidationResult;
}

// ============================================================
// Validation Error Class
// ============================================================

export class CommandValidationError extends Error {
  public readonly validationErrors: ValidationErrorDetail[];
  public readonly commandType: string;
  public readonly commandVersion?: string;
  
  constructor(
    message: string, 
    validationErrors: ValidationErrorDetail[], 
    commandType: string,
    commandVersion?: string
  ) {
    super(message);
    this.name = 'CommandValidationError';
    this.validationErrors = validationErrors;
    this.commandType = commandType;
    this.commandVersion = commandVersion;
    Error.captureStackTrace(this, this.constructor);
  }
}

// ============================================================
// Type Guards (Enterprise Enhancement)
// ============================================================

/**
 * Type guard for LoginCommand
 */
export function isLoginCommand(command: unknown): command is LoginCommand {
  return command instanceof LoginCommand;
}

/**
 * Type guard for PhoneLoginCommand
 */
export function isPhoneLoginCommand(command: unknown): command is PhoneLoginCommand {
  return command instanceof PhoneLoginCommand;
}

/**
 * Type guard for OtpLoginCommand
 */
export function isOtpLoginCommand(command: unknown): command is OtpLoginCommand {
  return command instanceof OtpLoginCommand;
}

/**
 * Type guard for any login command
 */
export function isAnyLoginCommand(command: unknown): command is LoginCommand | PhoneLoginCommand | OtpLoginCommand {
  return isLoginCommand(command) || isPhoneLoginCommand(command) || isOtpLoginCommand(command);
}

// ============================================================
// Helper Functions
// ============================================================

/**
 * ✅ ENTERPRISE ENHANCEMENT: Create validation error detail
 */
function createValidationError(
  field: string, 
  code: string, 
  messageKey: keyof typeof VALIDATION_MESSAGES.en,
  args?: unknown[],
  locale: 'en' | 'bn' = 'en'
): ValidationErrorDetail {
  const messageFn = VALIDATION_MESSAGES[locale][messageKey];
  const message = typeof messageFn === 'function' 
    ? (messageFn as (...args: unknown[]) => string)(...(args || []))
    : messageFn as string;
  
  return {
    field,
    message,
    messageBn: locale === 'en' && VALIDATION_MESSAGES.bn[messageKey] 
      ? (typeof VALIDATION_MESSAGES.bn[messageKey] === 'function'
        ? (VALIDATION_MESSAGES.bn[messageKey] as (...args: unknown[]) => string)(...(args || []))
        : VALIDATION_MESSAGES.bn[messageKey] as string)
      : undefined,
    code,
  };
}

// ============================================================
// Login Command (Enhanced)
// ============================================================

/**
 * Login Command
 * 
 * ✅ Enterprise Enhancement: 
 * - Added validation on construction
 * - Added execution context
 * - Integrated shared utilities
 * - Type-safe toString() for logging
 * - International phone support
 * - ✅ Added command versioning
 * - ✅ Added retry context
 * - ✅ Enhanced error messages with Bengali support
 * 
 * @example
 * const command = LoginCommand.fromRequest(
 *   'user@vubon.com.bd',
 *   'MyP@ssw0rd123',
 *   { ipAddress: '192.168.1.100', userAgent: 'Mozilla/5.0...' }
 * );
 */
export class LoginCommand {
  public readonly commandId: string;
  public readonly timestamp: Date;
  public readonly method: LoginMethod;
  public readonly correlationId: string;
  public readonly source: CommandExecutionContext['source'];
  public readonly version: string;
  public readonly retryContext?: { attempt: number; maxRetries: number; previousError?: string };

  constructor(
    /** User identifier (email, phone, or username) */
    public readonly identifier: string,

    /** User password (optional for OTP login) */
    public readonly password?: string,

    /** Device information for security tracking */
    public readonly deviceInfo?: LoginDeviceInfo,

    /** Whether to remember the device for extended session */
    public readonly rememberMe: boolean = false,

    /** CAPTCHA token for rate limiting prevention */
    public readonly captchaToken?: string,

    /** Correlation ID for distributed tracing */
    correlationId?: string,

    /** Login method (default: auto-detect) */
    method?: LoginMethod,
    
    /** Request source */
    source?: CommandExecutionContext['source'],
    
    /** ✅ ENTERPRISE ENHANCEMENT: Retry context for connection resilience */
    retryContext?: { attempt: number; maxRetries: number; previousError?: string }
  ) {
    this.commandId = randomUUID();
    this.timestamp = new Date();
    this.correlationId = correlationId ?? deviceInfo?.correlationId ?? randomUUID();
    this.source = source ?? 'web';
    this.method = method ?? this.detectMethod(identifier);
    this.rememberMe = rememberMe ?? false;
    this.version = COMMAND_VERSION;
    this.retryContext = retryContext;
    
    // ✅ Enterprise: Validate command on construction
    this.validate();
    
    // ✅ Enterprise: Normalize device fingerprint if provided
    if (this.deviceInfo?.deviceFingerprint) {
      this.deviceInfo.normalizedFingerprint = this.normalizeFingerprint(this.deviceInfo.deviceFingerprint);
    }
  }

  // ============================================================
  // ✅ ENTERPRISE ENHANCEMENT: Normalization Methods
  // ============================================================

  /**
   * Normalize device fingerprint for consistent comparison
   */
  private normalizeFingerprint(fingerprint: string): string {
    return fingerprint.trim().toLowerCase().replace(/\s+/g, '');
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
        'Login command validation failed',
        validation.errors,
        'LoginCommand',
        this.version
      );
    }
  }

  /**
   * Get validation result without throwing
   * ✅ ENTERPRISE ENHANCEMENT: Returns detailed field errors with Bengali support
   */
  public getValidationResult(locale: 'en' | 'bn' = 'en'): ValidationResult {
    const errors: ValidationErrorDetail[] = [];

    // Validate identifier
    if (!this.identifier || this.identifier.trim().length === 0) {
      errors.push(createValidationError(
        'identifier', 
        'REQUIRED', 
        'identifierRequired', 
        undefined, 
        locale
      ));
    }

    // Validate password for password-based login
    if (this.isPasswordLogin() && (!this.password || this.password.length === 0)) {
      errors.push(createValidationError(
        'password', 
        'REQUIRED', 
        'passwordRequired', 
        undefined, 
        locale
      ));
    }

    // Validate based on login method
    switch (this.method) {
      case LOGIN_METHODS.EMAIL:
        if (!this.isValidEmail()) {
          errors.push(createValidationError(
            'identifier', 
            'INVALID_EMAIL', 
            'invalidEmail', 
            undefined, 
            locale
          ));
        }
        break;
      case LOGIN_METHODS.PHONE:
        if (!this.isValidBangladeshMobile() && !this.isValidInternationalPhone()) {
          errors.push(createValidationError(
            'identifier', 
            'INVALID_PHONE', 
            'invalidPhone', 
            undefined, 
            locale
          ));
        }
        break;
      case LOGIN_METHODS.USERNAME:
        if (this.identifier.length < USERNAME_MIN_LENGTH || this.identifier.length > USERNAME_MAX_LENGTH) {
          errors.push(createValidationError(
            'identifier', 
            'INVALID_USERNAME_LENGTH', 
            'invalidUsername', 
            [USERNAME_MIN_LENGTH, USERNAME_MAX_LENGTH], 
            locale
          ));
        }
        if (!/^[a-zA-Z0-9._]+$/.test(this.identifier)) {
          errors.push(createValidationError(
            'identifier', 
            'INVALID_USERNAME_CHARS', 
            'usernameInvalidChars', 
            undefined, 
            locale
          ));
        }
        break;
    }

    // Validate device info if provided
    if (this.deviceInfo) {
      if (this.deviceInfo.ipAddress && !this.isValidIpAddress(this.deviceInfo.ipAddress)) {
        errors.push(createValidationError(
          'deviceInfo.ipAddress', 
          'INVALID_IP', 
          'invalidIp', 
          undefined, 
          locale
        ));
      }
      if (this.deviceInfo.userAgent && this.deviceInfo.userAgent.length > 500) {
        errors.push(createValidationError(
          'deviceInfo.userAgent', 
          'TOO_LONG', 
          'userAgentTooLong', 
          [500], 
          locale
        ));
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  /**
   * Validate IP address format
   */
  private isValidIpAddress(ip: string): boolean {
    const ipv4Pattern = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    const ipv6Pattern = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4})$/;
    return ipv4Pattern.test(ip) || ipv6Pattern.test(ip);
  }

  // ============================================================
  // Factory Methods (Enterprise Enhancement)
  // ============================================================

  /**
   * Create LoginCommand from request data (convenience factory)
   */
  public static fromRequest(
    identifier: string,
    password: string,
    deviceInfo?: LoginDeviceInfo,
    rememberMe?: boolean,
    captchaToken?: string
  ): LoginCommand {
    return new LoginCommand(
      identifier,
      password,
      deviceInfo,
      rememberMe,
      captchaToken,
      deviceInfo?.correlationId
    );
  }

  /**
   * Create LoginCommand for email login
   */
  public static forEmail(
    email: string,
    password: string,
    deviceInfo?: LoginDeviceInfo,
    rememberMe?: boolean
  ): LoginCommand {
    return new LoginCommand(email, password, deviceInfo, rememberMe);
  }

  /**
   * Create LoginCommand for phone login
   */
  public static forPhone(
    phoneNumber: string,
    password: string,
    deviceInfo?: LoginDeviceInfo,
    rememberMe?: boolean
  ): LoginCommand {
    const normalizedPhone = normalizePhone(phoneNumber, 'BD') ?? phoneNumber;
    return new LoginCommand(normalizedPhone, password, deviceInfo, rememberMe);
  }

  /**
   * Create LoginCommand for username login
   */
  public static forUsername(
    username: string,
    password: string,
    deviceInfo?: LoginDeviceInfo,
    rememberMe?: boolean
  ): LoginCommand {
    return new LoginCommand(username.toLowerCase().trim(), password, deviceInfo, rememberMe);
  }

  /**
   * ✅ ENTERPRISE ENHANCEMENT: Create command with retry context
   */
  public static withRetry(
    identifier: string,
    password: string,
    retryAttempt: number,
    maxRetries: number = 3,
    previousError?: string,
    deviceInfo?: LoginDeviceInfo
  ): LoginCommand {
    return new LoginCommand(
      identifier,
      password,
      deviceInfo,
      false,
      undefined,
      deviceInfo?.correlationId,
      undefined,
      undefined,
      { attempt: retryAttempt, maxRetries, previousError }
    );
  }

  // ============================================================
  // Detection Methods
  // ============================================================

  /**
   * Detect login method from identifier format
   * ✅ Enhanced: Uses shared constants for patterns
   */
  private detectMethod(identifier: string): LoginMethod {
    if (!identifier) return LOGIN_METHODS.USERNAME;
    
    const trimmed = identifier.trim();
    
    // Check if it's an email
    if (trimmed.includes('@') && trimmed.includes('.')) {
      return LOGIN_METHODS.EMAIL;
    }

    // Check if it's a phone number (Bangladesh or international)
    if (PHONE_PATTERNS.BANGLADESH.test(trimmed) || 
        isValidBdMobile(trimmed) || 
        INTERNATIONAL_PHONE_PATTERN.test(trimmed)) {
      return LOGIN_METHODS.PHONE;
    }

    // Default to username
    return LOGIN_METHODS.USERNAME;
  }

  // ============================================================
  // Getters
  // ============================================================

  /**
   * Get the email from identifier if it's an email login
   */
  getEmail(): string | null {
    return this.method === LOGIN_METHODS.EMAIL ? this.identifier : null;
  }

  /**
   * Get the phone number from identifier if it's a phone login
   * ✅ Enhanced: Uses shared utility for normalization
   */
  getPhoneNumber(): string | null {
    if (this.method !== LOGIN_METHODS.PHONE) return null;
    return normalizePhone(this.identifier, 'BD') ?? this.identifier;
  }

  /**
   * Get the username from identifier if it's a username login
   */
  getUsername(): string | null {
    return this.method === LOGIN_METHODS.USERNAME ? this.identifier.toLowerCase() : null;
  }

  /**
   * Get execution context for tracing
   */
  getExecutionContext(): CommandExecutionContext {
    return {
      commandId: this.commandId,
      correlationId: this.correlationId,
      timestamp: this.timestamp,
      method: this.method,
      source: this.source,
      version: this.version,
    };
  }

  // ============================================================
  // Check Methods
  // ============================================================

  /**
   * Check if this is an OTP login
   */
  isOtpLogin(): boolean {
    return this.method === LOGIN_METHODS.OTP;
  }

  /**
   * Check if this is a password-based login
   */
  isPasswordLogin(): boolean {
    return this.method === LOGIN_METHODS.EMAIL || 
           this.method === LOGIN_METHODS.PHONE || 
           this.method === LOGIN_METHODS.USERNAME;
  }

  /**
   * Check if the identifier is a valid email format
   * ✅ Enhanced: Uses shared utility
   */
  isValidEmail(): boolean {
    if (this.method !== LOGIN_METHODS.EMAIL) return false;
    return isValidEmail(this.identifier);
  }

  /**
   * Check if the identifier is a valid Bangladesh mobile number
   */
  isValidBangladeshMobile(): boolean {
    if (this.method !== LOGIN_METHODS.PHONE) return false;
    return isValidBdMobile(this.identifier);
  }

  /**
   * ✅ Enterprise: Check if the identifier is a valid international phone number
   */
  isValidInternationalPhone(): boolean {
    if (this.method !== LOGIN_METHODS.PHONE) return false;
    return INTERNATIONAL_PHONE_PATTERN.test(this.identifier);
  }

  /**
   * Check if CAPTCHA is provided
   */
  hasCaptcha(): boolean {
    return !!this.captchaToken && this.captchaToken.length > 0;
  }

  /**
   * Check if device trust is requested
   */
  isDeviceTrustRequested(): boolean {
    return this.rememberMe === true;
  }
  
  /**
   * ✅ ENTERPRISE ENHANCEMENT: Check if this is a retry attempt
   */
  isRetry(): boolean {
    return !!this.retryContext && this.retryContext.attempt > 1;
  }

  // ============================================================
  // Masking Methods (Privacy)
  // ============================================================

  /**
   * Get masked identifier for logging (privacy)
   * ✅ Enhanced: Uses shared utility for phone masking
   */
  getMaskedIdentifier(): string {
    if (this.method === LOGIN_METHODS.EMAIL) {
      const [username, domain] = this.identifier.split('@');
      if (username && username.length > 2) {
        return `${username[0]}***${username[username.length - 1]}@${domain}`;
      }
      return `${username?.substring(0, 2)}***@${domain}`;
    }

    if (this.method === LOGIN_METHODS.PHONE) {
      return maskPhone(this.identifier);
    }

    // Username - mask partially
    if (this.identifier.length > 4) {
      return this.identifier.slice(0, 2) + '***' + this.identifier.slice(-2);
    }
    return '***';
  }

  /**
   * Get masked password (for logging - shows only length)
   */
  getMaskedPassword(): string {
    if (!this.password) return '***';
    return `[${this.password.length} chars]`;
  }

  // ============================================================
  // Logging Methods
  // ============================================================

  /**
   * Convert to string for logging (sensitive data masked)
   */
  public toString(): string {
    return `LoginCommand(id=${this.commandId.slice(0, 8)}..., identifier=${this.getMaskedIdentifier()}, method=${this.method}, source=${this.source}, rememberMe=${this.rememberMe}, hasCaptcha=${this.hasCaptcha()}, isRetry=${this.isRetry()}, version=${this.version}, timestamp=${this.timestamp.toISOString()})`;
  }

  /**
   * Get summary for logging
   */
  public toJSON(): Record<string, unknown> {
    return {
      commandId: this.commandId,
      correlationId: this.correlationId,
      method: this.method,
      source: this.source,
      maskedIdentifier: this.getMaskedIdentifier(),
      rememberMe: this.rememberMe,
      hasCaptcha: this.hasCaptcha(),
      isRetry: this.isRetry(),
      version: this.version,
      timestamp: this.timestamp.toISOString(),
      retryContext: this.retryContext,
      deviceInfo: this.deviceInfo ? {
        hasIp: !!this.deviceInfo.ipAddress,
        hasUserAgent: !!this.deviceInfo.userAgent,
        hasDeviceId: !!this.deviceInfo.deviceId,
        district: this.deviceInfo.district,
        mobileOperator: this.deviceInfo.mobileOperator,
        networkType: this.deviceInfo.networkType,
        hasNormalizedFingerprint: !!this.deviceInfo.normalizedFingerprint,
      } : undefined,
    };
  }
}

// ============================================================
// Phone Login Command (Specialized - Bangladesh specific)
// ============================================================

/**
 * Phone Login Command
 * Specialized command for phone-based authentication
 * 
 * ✅ Enterprise Enhancement: Added validation, factory method, and tracing
 * 
 * @example
 * const command = PhoneLoginCommand.fromRequest(
 *   '+8801712345678',
 *   'MyP@ssw0rd123',
 *   { ipAddress: '192.168.1.100' }
 * );
 */
export class PhoneLoginCommand {
  public readonly commandId: string;
  public readonly timestamp: Date;
  public readonly correlationId: string;
  public readonly method: LoginMethod = LOGIN_METHODS.PHONE;
  public readonly normalizedPhone: string;
  public readonly source: CommandExecutionContext['source'];
  public readonly version: string;

  constructor(
    public readonly phoneNumber: string,
    public readonly password: string,
    public readonly deviceInfo?: LoginDeviceInfo,
    public readonly rememberMe: boolean = false,
    public readonly captchaToken?: string,
    correlationId?: string,
    source?: CommandExecutionContext['source']
  ) {
    this.commandId = randomUUID();
    this.timestamp = new Date();
    this.correlationId = correlationId ?? deviceInfo?.correlationId ?? randomUUID();
    this.source = source ?? 'web';
    this.rememberMe = rememberMe ?? false;
    this.version = COMMAND_VERSION;
    this.normalizedPhone = normalizePhone(phoneNumber, 'BD') ?? phoneNumber;
    
    // ✅ Validate on construction
    this.validate();
  }

  /**
   * Validate command data
   * ✅ ENTERPRISE ENHANCEMENT: Returns detailed field errors with Bengali support
   */
  private validate(locale: 'en' | 'bn' = 'en'): void {
    const errors: ValidationErrorDetail[] = [];

    if (!this.phoneNumber || this.phoneNumber.trim().length === 0) {
      errors.push(createValidationError(
        'phoneNumber', 
        'REQUIRED', 
        'identifierRequired', 
        undefined, 
        locale
      ));
    }

    if (!this.password || this.password.length === 0) {
      errors.push(createValidationError(
        'password', 
        'REQUIRED', 
        'passwordRequired', 
        undefined, 
        locale
      ));
    }

    if (!this.isValidBangladeshMobile() && !this.isValidInternationalPhone()) {
      errors.push(createValidationError(
        'phoneNumber', 
        'INVALID_PHONE', 
        'invalidPhone', 
        undefined, 
        locale
      ));
    }

    if (errors.length > 0) {
      throw new CommandValidationError(
        'Phone login command validation failed', 
        errors, 
        'PhoneLoginCommand',
        this.version
      );
    }
  }

  /**
   * Factory method for creating from request
   */
  public static fromRequest(
    phoneNumber: string,
    password: string,
    deviceInfo?: LoginDeviceInfo,
    rememberMe?: boolean
  ): PhoneLoginCommand {
    return new PhoneLoginCommand(
      phoneNumber,
      password,
      deviceInfo,
      rememberMe,
      undefined,
      deviceInfo?.correlationId
    );
  }

  /**
   * Get execution context
   */
  getExecutionContext(): CommandExecutionContext {
    return {
      commandId: this.commandId,
      correlationId: this.correlationId,
      timestamp: this.timestamp,
      method: this.method,
      source: this.source,
      version: this.version,
    };
  }

  /**
   * Get normalized phone number in E.164 format
   */
  getNormalizedPhone(): string {
    return this.normalizedPhone;
  }

  /**
   * Get masked phone number for logging
   */
  getMaskedPhone(): string {
    return maskPhone(this.normalizedPhone);
  }

  /**
   * Check if phone number is valid Bangladesh mobile
   */
  isValidBangladeshMobile(): boolean {
    return isValidBdMobile(this.phoneNumber);
  }

  /**
   * ✅ Enterprise: Check if phone number is valid international format
   */
  isValidInternationalPhone(): boolean {
    return INTERNATIONAL_PHONE_PATTERN.test(this.phoneNumber);
  }

  /**
   * Check if CAPTCHA is provided
   */
  hasCaptcha(): boolean {
    return !!this.captchaToken && this.captchaToken.length > 0;
  }

  /**
   * Convert to string for logging
   */
  public toString(): string {
    return `PhoneLoginCommand(id=${this.commandId.slice(0, 8)}..., phone=${this.getMaskedPhone()}, rememberMe=${this.rememberMe}, hasCaptcha=${this.hasCaptcha()}, version=${this.version}, timestamp=${this.timestamp.toISOString()})`;
  }

  /**
   * Get summary for logging
   */
  public toJSON(): Record<string, unknown> {
    return {
      commandId: this.commandId,
      correlationId: this.correlationId,
      method: this.method,
      source: this.source,
      maskedPhone: this.getMaskedPhone(),
      rememberMe: this.rememberMe,
      hasCaptcha: this.hasCaptcha(),
      version: this.version,
      timestamp: this.timestamp.toISOString(),
      deviceInfo: this.deviceInfo ? {
        hasIp: !!this.deviceInfo.ipAddress,
        hasUserAgent: !!this.deviceInfo.userAgent,
        district: this.deviceInfo.district,
        mobileOperator: this.deviceInfo.mobileOperator,
        networkType: this.deviceInfo.networkType,
      } : undefined,
    };
  }
}

// ============================================================
// OTP Login Command (Passwordless - Bangladesh specific)
// ============================================================

/**
 * OTP Login Command
 * For passwordless authentication via SMS/WhatsApp OTP
 * 
 * ✅ Enterprise Enhancement: Added OTP validation using shared constants
 * 
 * @example
 * const command = OtpLoginCommand.fromRequest(
 *   '+8801712345678',
 *   '123456',
 *   { ipAddress: '192.168.1.100' }
 * );
 */
export class OtpLoginCommand {
  public readonly commandId: string;
  public readonly timestamp: Date;
  public readonly correlationId: string;
  public readonly method: LoginMethod = LOGIN_METHODS.OTP;
  public readonly normalizedPhone: string;
  public readonly source: CommandExecutionContext['source'];
  public readonly version: string;

  constructor(
    public readonly phoneNumber: string,
    public readonly otpCode: string,
    public readonly deviceInfo?: LoginDeviceInfo,
    public readonly rememberMe: boolean = false,
    public readonly sessionId?: string,
    correlationId?: string,
    source?: CommandExecutionContext['source']
  ) {
    this.commandId = randomUUID();
    this.timestamp = new Date();
    this.correlationId = correlationId ?? deviceInfo?.correlationId ?? randomUUID();
    this.source = source ?? 'web';
    this.rememberMe = rememberMe ?? false;
    this.version = COMMAND_VERSION;
    this.normalizedPhone = normalizePhone(phoneNumber, 'BD') ?? phoneNumber;
    
    // ✅ Validate on construction
    this.validate();
  }

  /**
   * Validate command data
   * ✅ ENTERPRISE ENHANCEMENT: Returns detailed field errors with Bengali support
   */
  private validate(locale: 'en' | 'bn' = 'en'): void {
    const errors: ValidationErrorDetail[] = [];

    if (!this.phoneNumber || this.phoneNumber.trim().length === 0) {
      errors.push(createValidationError(
        'phoneNumber', 
        'REQUIRED', 
        'identifierRequired', 
        undefined, 
        locale
      ));
    }

    if (!this.otpCode || this.otpCode.length === 0) {
      errors.push(createValidationError(
        'otpCode', 
        'REQUIRED', 
        'otpRequired', 
        undefined, 
        locale
      ));
    }

    if (!this.isValidBangladeshMobile() && !this.isValidInternationalPhone()) {
      errors.push(createValidationError(
        'phoneNumber', 
        'INVALID_PHONE', 
        'invalidPhone', 
        undefined, 
        locale
      ));
    }

    if (!this.hasValidOtpFormat()) {
      errors.push(createValidationError(
        'otpCode', 
        'INVALID_OTP_FORMAT', 
        'invalidOtpFormat', 
        [OTP_LENGTH], 
        locale
      ));
    }

    if (errors.length > 0) {
      throw new CommandValidationError(
        'OTP login command validation failed', 
        errors, 
        'OtpLoginCommand',
        this.version
      );
    }
  }

  /**
   * Factory method for creating from request
   */
  public static fromRequest(
    phoneNumber: string,
    otpCode: string,
    deviceInfo?: LoginDeviceInfo,
    rememberMe?: boolean
  ): OtpLoginCommand {
    return new OtpLoginCommand(
      phoneNumber,
      otpCode,
      deviceInfo,
      rememberMe,
      undefined,
      deviceInfo?.correlationId
    );
  }

  /**
   * Get execution context
   */
  getExecutionContext(): CommandExecutionContext {
    return {
      commandId: this.commandId,
      correlationId: this.correlationId,
      timestamp: this.timestamp,
      method: this.method,
      source: this.source,
      version: this.version,
    };
  }

  /**
   * Get normalized phone number in E.164 format
   */
  getNormalizedPhone(): string {
    return this.normalizedPhone;
  }

  /**
   * Get masked phone number for logging
   */
  getMaskedPhone(): string {
    return maskPhone(this.normalizedPhone);
  }

  /**
   * Check if OTP code is valid format
   * ✅ Enhanced: Uses shared constants for OTP length
   */
  hasValidOtpFormat(): boolean {
    return OTP_PATTERN.test(this.otpCode);
  }

  /**
   * Check if phone number is valid Bangladesh mobile
   */
  isValidBangladeshMobile(): boolean {
    return isValidBdMobile(this.phoneNumber);
  }

  /**
   * ✅ Enterprise: Check if phone number is valid international format
   */
  isValidInternationalPhone(): boolean {
    return INTERNATIONAL_PHONE_PATTERN.test(this.phoneNumber);
  }

  /**
   * Get OTP expiry in seconds (for reference)
   */
  getOtpExpirySeconds(): number {
    return OTP_CONFIG?.EXPIRY_SECONDS ?? 300;
  }

  /**
   * Convert to string for logging
   */
  public toString(): string {
    return `OtpLoginCommand(id=${this.commandId.slice(0, 8)}..., phone=${this.getMaskedPhone()}, otpLength=${this.otpCode?.length ?? 0}, rememberMe=${this.rememberMe}, version=${this.version}, timestamp=${this.timestamp.toISOString()})`;
  }

  /**
   * Get summary for logging
   */
  public toJSON(): Record<string, unknown> {
    return {
      commandId: this.commandId,
      correlationId: this.correlationId,
      method: this.method,
      source: this.source,
      maskedPhone: this.getMaskedPhone(),
      otpLength: this.otpCode?.length,
      rememberMe: this.rememberMe,
      hasSessionId: !!this.sessionId,
      version: this.version,
      timestamp: this.timestamp.toISOString(),
      deviceInfo: this.deviceInfo ? {
        hasIp: !!this.deviceInfo.ipAddress,
        hasUserAgent: !!this.deviceInfo.userAgent,
        district: this.deviceInfo.district,
        mobileOperator: this.deviceInfo.mobileOperator,
        networkType: this.deviceInfo.networkType,
      } : undefined,
    };
  }
}

// ============================================================
// Command Handler Interface (Enterprise Pattern)
// ============================================================

/**
 * Generic command handler interface
 */
export interface ICommandHandler<TCommand, TResult> {
  /** Execute the command */
  execute(command: TCommand): Promise<TResult>;
  
  /** Command type identifier */
  readonly commandType: string;
  
  /** Validate command before execution */
  validate(command: TCommand): ValidationResult;
}

/**
 * Login command handler interface
 */
export interface ILoginCommandHandler extends ICommandHandler<LoginCommand, CommandResult<{ accessToken: string; refreshToken: string }>> {
  commandType: 'LoginCommand';
}

/**
 * Phone login command handler interface
 */
export interface IPhoneLoginCommandHandler extends ICommandHandler<PhoneLoginCommand, CommandResult<{ accessToken: string; refreshToken: string }>> {
  commandType: 'PhoneLoginCommand';
}

/**
 * OTP login command handler interface
 */
export interface IOtpLoginCommandHandler extends ICommandHandler<OtpLoginCommand, CommandResult<{ accessToken: string; refreshToken: string }>> {
  commandType: 'OtpLoginCommand';
}

// ============================================================
// Type Exports
// ============================================================

export type { 
  LoginDeviceInfo as LoginDeviceInfoType, 
  LoginMethod as LoginMethodType,
  ValidationResult as ValidationResultType,
  ValidationErrorDetail as ValidationErrorDetailType,
  CommandExecutionContext as CommandExecutionContextType,
  CommandResult as CommandResultType,
  CommandMetadata as CommandMetadataType,
  ICommandHandler as ICommandHandlerType,
  ILoginCommandHandler as ILoginCommandHandlerType,
  IPhoneLoginCommandHandler as IPhoneLoginCommandHandlerType,
  IOtpLoginCommandHandler as IOtpLoginCommandHandlerType
};

// ============================================================
// ENTERPRISE SUMMARY v3.0
// ============================================================
// 
// Enterprise Enhancements Applied in v3.0:
// 1. ✅ Command validation on construction (fail-fast)
// 2. ✅ Shared types integration (@vubon/shared-types)
// 3. ✅ Shared constants for OTP pattern (@vubon/shared-constants)
// 4. ✅ Shared utilities for phone/email validation (@vubon/shared-utils)
// 5. ✅ Execution context for distributed tracing
// 6. ✅ Type-safe toString() and toJSON() methods
// 7. ✅ Custom CommandValidationError class
// 8. ✅ Factory methods for specialized commands
// 9. ✅ Bangladesh specific fields (district, upazila, mobileOperator, networkType)
// 10. ✅ Privacy-friendly masking methods
// 11. ✅ Correlation ID propagation
// 12. ✅ Source tracking (web/mobile/api/admin)
// 13. ✅ Immutable command data with readonly properties
// 14. ✅ Type guards for runtime type checking
// 15. ✅ International phone number support
// 16. ✅ Command handler interface contract
// 17. ✅ IP address validation
// 18. ✅ Username pattern validation
// 19. ✅ Device info validation
// 20. ✅ OTP length from shared-config with fallback
// 21. ✅ ENTERPRISE ENHANCEMENT: Centralized error messages with Bengali support
// 22. ✅ ENTERPRISE ENHANCEMENT: Validation result with detailed field info
// 23. ✅ ENTERPRISE ENHANCEMENT: Command metadata for auditing
// 24. ✅ ENTERPRISE ENHANCEMENT: Device fingerprint normalization
// 25. ✅ ENTERPRISE ENHANCEMENT: Command versioning for backward compatibility
// 26. ✅ ENTERPRISE ENHANCEMENT: Retry context for connection resilience
// 27. ✅ ENTERPRISE ENHANCEMENT: Is retry helper method
// 28. ✅ ENTERPRISE ENHANCEMENT: createValidationError helper function
// 
// ============================================================
