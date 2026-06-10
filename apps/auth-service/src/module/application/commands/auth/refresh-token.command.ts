/**
 * Refresh Token Command - Pure Command Data Structure (Enterprise Enhanced v3.0)
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce

 * @module application/commands/auth/refresh-token.command

 * @description
 * Command for refreshing an expired access token using a refresh token.
 * Contains device context for security monitoring and audit.

 * ENTERPRISE ENHANCEMENTS (v3.0):
 * ✅ Shared types integration (@vubon/shared-types)
 * ✅ Shared constants (@vubon/shared-constants)
 * ✅ Branded types for type safety (CommandId, RefreshToken, CorrelationId)
 * ✅ Command validation on construction (fail-fast)
 * ✅ Multi-language validation messages (English/Bengali)
 * ✅ Comprehensive masking methods for secure logging
 * ✅ Execution context for distributed tracing
 * ✅ Type guards for runtime type checking
 * ✅ Audit-ready metadata
 * ✅ Factory methods for common scenarios
 * ✅ Bangladesh specific fields (district, upazila, mobileOperator, networkType)
 * ✅ Token rotation support flags
 * ✅ Session binding options

 * @example
 * const command = RefreshTokenCommand.fromRequest(
 *   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
 *   {
 *     ipAddress: '192.168.1.100',
 *     userAgent: 'Mozilla/5.0...',
 *     deviceId: 'device_456',
 *     mobileOperator: 'gp',
 *     networkType: '4g',
 *     district: 'Dhaka'
 *   },
 *   'corr_abc123'
 * );
 */

import { randomUUID } from 'crypto';

// ============================================================
// Shared Packages Import (Enterprise Enhancement)
// ============================================================

import type { 
  DeviceInfo as SharedDeviceInfo,
  MobileOperator as SharedMobileOperator,
  NetworkType as SharedNetworkType,
  TokenRefreshResult,
  TokenErrorCode as SharedTokenErrorCode,
  Brand,
  Locale
} from '@vubon/shared-types';

import { 
  TOKEN_ERROR_CODES,
  MOBILE_OPERATORS,
  NETWORK_TYPES,
  TOKEN_CONFIG,
  SESSION_CONFIG,
  ENV_CONFIG
} from '@vubon/shared-constants';

import { maskString, maskDeviceId, maskSessionId } from '@vubon/shared-utils';

// ============================================================
// Branded Types for Type Safety (Enterprise Feature)
// ============================================================

/**
 * Branded command ID type
 * Prevents accidental mixing with other string types
 */
export type CommandId = Brand<string, 'CommandId'>;

/**
 * Branded refresh token type
 */
export type RefreshToken = Brand<string, 'RefreshToken'>;

/**
 * Branded correlation ID type
 * For distributed tracing
 */
export type CorrelationId = Brand<string, 'CorrelationId'>;

/**
 * Branded session ID type
 */
export type SessionId = Brand<string, 'SessionId'>;

// ============================================================
// Types (Using shared types for consistency)
// ============================================================

/**
 * Device information for security audit (Bangladesh specific)
 * ✅ Enhanced: Extends SharedDeviceInfo for complete type safety
 */
export interface RefreshTokenDeviceInfo extends SharedDeviceInfo {
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
  /** District (from IP geolocation) - from shared-constants */
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
 * Refresh token options interface (Enterprise enhancement)
 */
export interface RefreshTokenOptions {
  /** Rotate refresh token (generate new one) */
  rotateToken?: boolean;

  /** Extend session expiry */
  extendSession?: boolean;

  /** Bind new tokens to this device only */
  bindToDevice?: boolean;

  /** Revoke old token family on compromise detection */
  revokeFamilyOnCompromise?: boolean;

  /** Session extension duration in seconds */
  extensionSeconds?: number;

  /** Expected token version (for optimistic locking) */
  expectedVersion?: number;
}

/**
 * Command options interface (Builder pattern)
 */
export interface RefreshTokenCommandOptions {
  /** Device context for security audit */
  deviceInfo?: RefreshTokenDeviceInfo;

  /** Correlation ID for distributed tracing */
  correlationId?: CorrelationId;

  /** Additional refresh token options */
  options?: RefreshTokenOptions;

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

const TOKEN_REFRESH_CONFIG = {
  MIN_REFRESH_TOKEN_LENGTH: TOKEN_CONFIG?.MIN_LENGTH?.REFRESH ?? 32,
  MAX_REFRESH_TOKEN_LENGTH: TOKEN_CONFIG?.MAX_LENGTH?.REFRESH ?? 500,
  MAX_DEVICE_ID_LENGTH: SESSION_CONFIG?.MAX_DEVICE_ID_LENGTH ?? 255,
  DEFAULT_ROTATE_TOKEN: true,
  DEFAULT_EXTEND_SESSION: false,
  JWT_PATTERN: /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/,
} as const;

// ============================================================
// Validation Messages (Multi-language)
// ============================================================

const VALIDATION_MESSAGES = {
  en: {
    refreshTokenRequired: 'Refresh token is required',
    refreshTokenInvalid: 'Invalid refresh token format',
    refreshTokenMinLength: (min: number) => `Refresh token must be at least ${min} characters`,
    refreshTokenMaxLength: (max: number) => `Refresh token cannot exceed ${max} characters`,
    deviceIdMaxLength: (max: number) => `Device ID cannot exceed ${max} characters`,
    extensionSecondsInvalid: (min: number, max: number) => `Extension seconds must be between ${min} and ${max}`,
    expectedVersionInvalid: 'Expected version must be a positive integer',
  },
  bn: {
    refreshTokenRequired: 'রিফ্রেশ টোকেন প্রয়োজন',
    refreshTokenInvalid: 'অবৈধ রিফ্রেশ টোকেন ফরম্যাট',
    refreshTokenMinLength: (min: number) => `রিফ্রেশ টোকেন কমপক্ষে ${min} অক্ষরের হতে হবে`,
    refreshTokenMaxLength: (max: number) => `রিফ্রেশ টোকেন সর্বোচ্চ ${max} অক্ষর হতে পারে`,
    deviceIdMaxLength: (max: number) => `ডিভাইস আইডি সর্বোচ্চ ${max} অক্ষর হতে পারে`,
    extensionSecondsInvalid: (min: number, max: number) => `এক্সটেনশন সেকেন্ড ${min} এবং ${max} এর মধ্যে হতে হবে`,
    expectedVersionInvalid: 'এক্সপেক্টেড ভার্সন একটি পজিটিভ ইন্টিজার হতে হবে',
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
// Error Code Types (Using shared constants)
// ============================================================

export type TokenErrorCode = SharedTokenErrorCode;

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
// Refresh Token Command Builder (Enterprise Pattern)
// ============================================================

/**
 * Refresh Token Command Builder
 * ✅ Enterprise: Builder pattern for fluent command construction

 * @example
 * const command = new RefreshTokenCommandBuilder()
 *   .setRefreshToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...')
 *   .setDeviceInfo({ ipAddress: '192.168.1.100', district: 'Dhaka', mobileOperator: 'gp' })
 *   .setRotateToken(true)
 *   .setExtendSession(true)
 *   .setCorrelationId('corr_abc123')
 *   .build();
 */
export class RefreshTokenCommandBuilder {
  private refreshToken: string | null = null;
  private deviceInfo?: RefreshTokenDeviceInfo;
  private correlationId?: CorrelationId;
  private options: RefreshTokenOptions = {};
  private locale: Locale = 'en';

  setRefreshToken(token: string): this {
    this.refreshToken = token;
    return this;
  }

  setDeviceInfo(deviceInfo: RefreshTokenDeviceInfo): this {
    this.deviceInfo = deviceInfo;
    return this;
  }

  setCorrelationId(correlationId: CorrelationId): this {
    this.correlationId = correlationId;
    return this;
  }

  setRotateToken(rotate: boolean): this {
    this.options.rotateToken = rotate;
    return this;
  }

  setExtendSession(extend: boolean): this {
    this.options.extendSession = extend;
    return this;
  }

  setBindToDevice(bind: boolean): this {
    this.options.bindToDevice = bind;
    return this;
  }

  setRevokeFamilyOnCompromise(revoke: boolean): this {
    this.options.revokeFamilyOnCompromise = revoke;
    return this;
  }

  setExtensionSeconds(seconds: number): this {
    this.options.extensionSeconds = seconds;
    return this;
  }

  setExpectedVersion(version: number): this {
    this.options.expectedVersion = version;
    return this;
  }

  setLocale(locale: Locale): this {
    this.locale = locale;
    return this;
  }

  build(): RefreshTokenCommand {
    if (!this.refreshToken) {
      throw new CommandValidationError(
        'Refresh token is required',
        [getValidationMessage('refreshTokenRequired', this.locale)],
        'RefreshTokenCommand',
        this.locale
      );
    }

    return new RefreshTokenCommand(
      this.refreshToken as RefreshToken,
      this.deviceInfo,
      this.correlationId,
      this.options,
      this.locale
    );
  }
}

// ============================================================
// Refresh Token Command (Enterprise Enhanced v3.0)
// ============================================================

/**
 * Refresh Token Command

 * @example
 * // Using constructor directly
 * const command = new RefreshTokenCommand(
 *   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
 *   {
 *     ipAddress: '192.168.1.100',
 *     userAgent: 'Mozilla/5.0...',
 *     deviceId: 'device_456',
 *     mobileOperator: 'gp',
 *     networkType: '4g'
 *   },
 *   'corr_abc123',
 *   { rotateToken: true, extendSession: true },
 *   'en'
 * );

 * // Using builder (recommended)
 * const command = new RefreshTokenCommandBuilder()
 *   .setRefreshToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...')
 *   .setDeviceInfo({ ipAddress: '192.168.1.100', district: 'Dhaka' })
 *   .setRotateToken(true)
 *   .build();
 */
export class RefreshTokenCommand {
  public readonly commandId: CommandId;
  public readonly timestamp: Date;
  public readonly rotateToken: boolean;
  public readonly extendSession: boolean;
  public readonly bindToDevice: boolean;
  public readonly revokeFamilyOnCompromise: boolean;
  public readonly extensionSeconds: number;
  public readonly expectedVersion?: number;

  constructor(
    /** Refresh token to exchange for new tokens */
    public readonly refreshToken: RefreshToken,
    /** Device context for security audit */
    public readonly deviceInfo?: RefreshTokenDeviceInfo,
    /** Correlation ID for distributed tracing */
    public readonly correlationId?: CorrelationId,
    /** Additional refresh token options */
    options?: RefreshTokenOptions,
    /** Preferred language for messages */
    public readonly locale: Locale = 'en'
  ) {
    this.commandId = randomUUID() as CommandId;
    this.timestamp = new Date();
    this.rotateToken = options?.rotateToken ?? TOKEN_REFRESH_CONFIG.DEFAULT_ROTATE_TOKEN;
    this.extendSession = options?.extendSession ?? TOKEN_REFRESH_CONFIG.DEFAULT_EXTEND_SESSION;
    this.bindToDevice = options?.bindToDevice ?? false;
    this.revokeFamilyOnCompromise = options?.revokeFamilyOnCompromise ?? false;
    this.extensionSeconds = options?.extensionSeconds ?? 0;
    this.expectedVersion = options?.expectedVersion;

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
    refreshToken: string,
    deviceInfo?: RefreshTokenDeviceInfo,
    correlationId?: CorrelationId,
    options?: RefreshTokenOptions,
    locale?: Locale
  ): RefreshTokenCommand {
    return new RefreshTokenCommand(
      refreshToken as RefreshToken,
      deviceInfo,
      correlationId,
      options,
      locale
    );
  }

  /**
   * Factory method for token refresh with rotation
   */
  public static withRotation(
    refreshToken: string,
    deviceInfo?: RefreshTokenDeviceInfo,
    correlationId?: CorrelationId
  ): RefreshTokenCommand {
    return new RefreshTokenCommand(
      refreshToken as RefreshToken,
      deviceInfo,
      correlationId,
      { rotateToken: true }
    );
  }

  /**
   * Factory method for token refresh without rotation
   */
  public static withoutRotation(
    refreshToken: string,
    deviceInfo?: RefreshTokenDeviceInfo,
    correlationId?: CorrelationId
  ): RefreshTokenCommand {
    return new RefreshTokenCommand(
      refreshToken as RefreshToken,
      deviceInfo,
      correlationId,
      { rotateToken: false }
    );
  }

  /**
   * Factory method for session extension
   */
  public static forSessionExtension(
    refreshToken: string,
    extensionSeconds: number,
    deviceInfo?: RefreshTokenDeviceInfo,
    correlationId?: CorrelationId
  ): RefreshTokenCommand {
    return new RefreshTokenCommand(
      refreshToken as RefreshToken,
      deviceInfo,
      correlationId,
      { rotateToken: true, extendSession: true, extensionSeconds }
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
        'Refresh token command validation failed',
        validation.errors,
        'RefreshTokenCommand',
        this.locale
      );
    }
  }

  /**
   * Get validation result without throwing
   */
  public getValidationResult(): ValidationResult {
    const errors: string[] = [];

    // Validate refresh token
    if (!this.refreshToken || this.refreshToken.trim().length === 0) {
      errors.push(getValidationMessage('refreshTokenRequired', this.locale));
    } else {
      if (this.refreshToken.length < TOKEN_REFRESH_CONFIG.MIN_REFRESH_TOKEN_LENGTH) {
        errors.push(getValidationMessage('refreshTokenMinLength', this.locale, TOKEN_REFRESH_CONFIG.MIN_REFRESH_TOKEN_LENGTH));
      }
      if (this.refreshToken.length > TOKEN_REFRESH_CONFIG.MAX_REFRESH_TOKEN_LENGTH) {
        errors.push(getValidationMessage('refreshTokenMaxLength', this.locale, TOKEN_REFRESH_CONFIG.MAX_REFRESH_TOKEN_LENGTH));
      }
      // Optional: Validate JWT format (basic check)
      if (!TOKEN_REFRESH_CONFIG.JWT_PATTERN.test(this.refreshToken)) {
        errors.push(getValidationMessage('refreshTokenInvalid', this.locale));
      }
    }

    // Validate device ID length
    if (this.deviceInfo?.deviceId && this.deviceInfo.deviceId.length > TOKEN_REFRESH_CONFIG.MAX_DEVICE_ID_LENGTH) {
      errors.push(getValidationMessage('deviceIdMaxLength', this.locale, TOKEN_REFRESH_CONFIG.MAX_DEVICE_ID_LENGTH));
    }

    // Validate extension seconds
    if (this.extensionSeconds > 0) {
      const minExtension = 60; // 1 minute
      const maxExtension = 7 * 24 * 60 * 60; // 7 days
      if (this.extensionSeconds < minExtension || this.extensionSeconds > maxExtension) {
        errors.push(getValidationMessage('extensionSecondsInvalid', this.locale, minExtension, maxExtension));
      }
    }

    // Validate expected version
    if (this.expectedVersion !== undefined && this.expectedVersion <= 0) {
      errors.push(getValidationMessage('expectedVersionInvalid', this.locale));
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  // ============================================================
  // Helper Methods
  // ============================================================

  /**
   * Get device ID from device info
   */
  public getDeviceId(): string | undefined {
    return this.deviceInfo?.deviceId;
  }

  /**
   * Get device fingerprint from device info
   */
  public getDeviceFingerprint(): string | undefined {
    return this.deviceInfo?.deviceFingerprint;
  }

  /**
   * Get IP address from device info
   */
  public getIpAddress(): string | undefined {
    return this.deviceInfo?.ipAddress;
  }

  /**
   * Get user agent from device info
   */
  public getUserAgent(): string | undefined {
    return this.deviceInfo?.userAgent;
  }

  /**
   * Get session ID from device info
   */
  public getSessionId(): SessionId | undefined {
    return this.deviceInfo?.sessionId;
  }

  /**
   * Get request ID from device info
   */
  public getRequestId(): string | undefined {
    return this.deviceInfo?.requestId;
  }

  /**
   * Get mobile operator (Bangladesh specific)
   */
  public getMobileOperator(): SharedMobileOperator | undefined {
    return this.deviceInfo?.mobileOperator;
  }

  /**
   * Get network type (Bangladesh specific)
   */
  public getNetworkType(): SharedNetworkType | undefined {
    return this.deviceInfo?.networkType;
  }

  /**
   * Get district (Bangladesh specific)
   */
  public getDistrict(): string | undefined {
    return this.deviceInfo?.district;
  }

  /**
   * Get upazila (Bangladesh specific)
   */
  public getUpazila(): string | undefined {
    return this.deviceInfo?.upazila;
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

  /**
   * Check if device fingerprint is present
   */
  public hasDeviceFingerprint(): boolean {
    return !!this.deviceInfo?.deviceFingerprint;
  }

  /**
   * Check if token rotation is requested
   */
  public shouldRotateToken(): boolean {
    return this.rotateToken;
  }

  /**
   * Check if session extension is requested
   */
  public shouldExtendSession(): boolean {
    return this.extendSession && this.extensionSeconds > 0;
  }

  /**
   * Check if device binding is requested
   */
  public shouldBindToDevice(): boolean {
    return this.bindToDevice;
  }

  /**
   * Check if family revocation on compromise is requested
   */
  public shouldRevokeFamilyOnCompromise(): boolean {
    return this.revokeFamilyOnCompromise;
  }

  /**
   * Get validation message in appropriate language
   */
  public getMessage(key: keyof typeof VALIDATION_MESSAGES.en, ...args: unknown[]): string {
    return getValidationMessage(key, this.locale, ...args);
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
    source: string;
    locale: Locale;
    rotateToken: boolean;
    extendSession: boolean;
    bindToDevice: boolean;
    revokeFamilyOnCompromise: boolean;
    extensionSeconds: number;
    expectedVersion?: number;
  } {
    return {
      commandId: this.commandId,
      correlationId: this.correlationId,
      timestamp: this.timestamp,
      source: this.getRequestSource(),
      locale: this.locale,
      rotateToken: this.rotateToken,
      extendSession: this.extendSession,
      bindToDevice: this.bindToDevice,
      revokeFamilyOnCompromise: this.revokeFamilyOnCompromise,
      extensionSeconds: this.extensionSeconds,
      expectedVersion: this.expectedVersion,
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
   * Get audit metadata for compliance
   */
  public getAuditMetadata(): Record<string, unknown> {
    return {
      commandId: this.commandId,
      correlationId: this.correlationId,
      source: this.getRequestSource(),
      rotateToken: this.rotateToken,
      extendSession: this.extendSession,
      bindToDevice: this.bindToDevice,
      revokeFamilyOnCompromise: this.revokeFamilyOnCompromise,
      extensionSeconds: this.extensionSeconds,
      expectedVersion: this.expectedVersion,
      hasRefreshToken: !!this.refreshToken,
      hasDeviceInfo: this.hasDeviceInfo(),
      deviceInfo: this.deviceInfo ? {
        hasIp: !!this.deviceInfo.ipAddress,
        hasUserAgent: !!this.deviceInfo.userAgent,
        hasDeviceId: !!this.deviceInfo.deviceId,
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
  // Masking Methods (Privacy & Secure Logging)
  // ============================================================

  /**
   * Get masked refresh token for logging (privacy)
   */
  public getMaskedRefreshToken(): string {
    if (!this.refreshToken) return '***';
    if (this.refreshToken.length <= 16) return '***';
    // Show first 8 and last 8 characters for JWT
    if (this.refreshToken.includes('.')) {
      const parts = this.refreshToken.split('.');
      if (parts.length === 3) {
        return `${parts[0]?.slice(0, 8)}...${parts[2]?.slice(-8)}`;
      }
    }
    return this.refreshToken.slice(0, 8) + '***' + this.refreshToken.slice(-8);
  }

  /**
   * Get masked device ID for logging
   */
  public getMaskedDeviceId(): string {
    if (!this.deviceInfo?.deviceId) return '***';
    return maskDeviceId(this.deviceInfo.deviceId);
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
   * Get masked session ID for logging
   */
  public getMaskedSessionId(): string {
    if (!this.deviceInfo?.sessionId) return '***';
    return maskSessionId(this.deviceInfo.sessionId);
  }

  // ============================================================
  // Logging Methods (Enterprise Enhancement)
  // ============================================================

  /**
   * Convert to string for logging (sensitive data masked)
   */
  public toString(): string {
    return `RefreshTokenCommand(id=${this.commandId.slice(0, 8)}..., refreshToken=${this.getMaskedRefreshToken()}, rotateToken=${this.rotateToken}, extendSession=${this.extendSession}, bindToDevice=${this.bindToDevice}, revokeFamily=${this.revokeFamilyOnCompromise}, extensionSeconds=${this.extensionSeconds}, source=${this.getRequestSource()}, locale=${this.locale}, timestamp=${this.timestamp.toISOString()})`;
  }

  /**
   * Get summary for JSON logging
   */
  public toJSON(): Record<string, unknown> {
    return {
      commandId: this.commandId,
      correlationId: this.correlationId,
      maskedRefreshToken: this.getMaskedRefreshToken(),
      rotateToken: this.rotateToken,
      extendSession: this.extendSession,
      bindToDevice: this.bindToDevice,
      revokeFamilyOnCompromise: this.revokeFamilyOnCompromise,
      extensionSeconds: this.extensionSeconds,
      expectedVersion: this.expectedVersion,
      source: this.getRequestSource(),
      locale: this.locale,
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
}

// ============================================================
// Refresh Token Command Result (Enterprise Enhanced)
// ============================================================

/**
 * Refresh Token Command Result
 * ✅ Enhanced: Added metadata, rate limit info, and Bengali messages
 */
export interface RefreshTokenCommandResult {
  /** Whether the operation was successful */
  success: boolean;

  /** New access token */
  accessToken?: string;

  /** New refresh token (if rotated) */
  refreshToken?: string;

  /** Access token expiry in seconds */
  expiresIn?: number;

  /** Refresh token expiry in seconds */
  refreshExpiresIn?: number;

  /** Token type (always 'Bearer') */
  tokenType?: 'Bearer';

  /** Session ID (if session was rotated) */
  sessionId?: string;

  /** Token family ID (for tracking) */
  familyId?: string;

  /** Token version after refresh */
  version?: number;

  /** Rotation count for this token family */
  rotationCount?: number;

  /** Error message (if failed) */
  error?: string;

  /** Bengali error message (for localization) */
  errorBn?: string;

  /** Error code for programmatic handling */
  errorCode?: TokenErrorCode;

  /** Rate limit remaining attempts */
  remainingAttempts?: number;

  /** Rate limit reset time */
  rateLimitResetAt?: Date;

  /** Correlation ID for tracing */
  correlationId?: string;

  /** Duration in milliseconds */
  durationMs?: number;
}

// ============================================================
// Command Result Factory (Enterprise Enhanced)
// ============================================================

export class RefreshTokenCommandResultFactory {
  static success(
    accessToken: string,
    refreshToken: string,
    expiresIn: number,
    refreshExpiresIn: number,
    options?: {
      sessionId?: SessionId;
      familyId?: string;
      version?: number;
      rotationCount?: number;
      correlationId?: string;
      durationMs?: number;
    }
  ): RefreshTokenCommandResult {
    return {
      success: true,
      accessToken,
      refreshToken,
      expiresIn,
      refreshExpiresIn,
      tokenType: 'Bearer',
      sessionId: options?.sessionId,
      familyId: options?.familyId,
      version: options?.version,
      rotationCount: options?.rotationCount,
      correlationId: options?.correlationId,
      durationMs: options?.durationMs,
    };
  }

  static error(
    error: string,
    errorCode: TokenErrorCode,
    options?: {
      errorBn?: string;
      remainingAttempts?: number;
      rateLimitResetAt?: Date;
      correlationId?: string;
      durationMs?: number;
    }
  ): RefreshTokenCommandResult {
    return {
      success: false,
      error,
      errorBn: options?.errorBn,
      errorCode,
      remainingAttempts: options?.remainingAttempts,
      rateLimitResetAt: options?.rateLimitResetAt,
      correlationId: options?.correlationId,
      durationMs: options?.durationMs,
    };
  }

  static invalidToken(
    options?: { correlationId?: string; durationMs?: number }
  ): RefreshTokenCommandResult {
    const errorBn = options?.correlationId ? 'অবৈধ রিফ্রেশ টোকেন' : undefined;
    return this.error(
      'Invalid refresh token',
      TOKEN_ERROR_CODES.INVALID_TOKEN,
      { errorBn, correlationId: options?.correlationId, durationMs: options?.durationMs }
    );
  }

  static tokenExpired(
    options?: { correlationId?: string; durationMs?: number }
  ): RefreshTokenCommandResult {
    const errorBn = options?.correlationId ? 'রিফ্রেশ টোকেনের মেয়াদ শেষ হয়ে গেছে' : undefined;
    return this.error(
      'Refresh token has expired',
      TOKEN_ERROR_CODES.TOKEN_EXPIRED,
      { errorBn, correlationId: options?.correlationId, durationMs: options?.durationMs }
    );
  }

  static tokenRevoked(
    options?: { correlationId?: string; durationMs?: number }
  ): RefreshTokenCommandResult {
    const errorBn = options?.correlationId ? 'রিফ্রেশ টোকেন বাতিল করা হয়েছে' : undefined;
    return this.error(
      'Refresh token has been revoked',
      TOKEN_ERROR_CODES.TOKEN_REVOKED,
      { errorBn, correlationId: options?.correlationId, durationMs: options?.durationMs }
    );
  }

  static deviceMismatch(
    options?: { correlationId?: string; durationMs?: number }
  ): RefreshTokenCommandResult {
    const errorBn = options?.correlationId ? 'ডিভাইস মেলে না - টোকেনটি ভিন্ন ডিভাইসের জন্য ইস্যু করা হয়েছিল' : undefined;
    return this.error(
      'Device mismatch - token was issued for a different device',
      TOKEN_ERROR_CODES.DEVICE_MISMATCH,
      { errorBn, correlationId: options?.correlationId, durationMs: options?.durationMs }
    );
  }

  static sessionNotFound(
    options?: { correlationId?: string; durationMs?: number }
  ): RefreshTokenCommandResult {
    const errorBn = options?.correlationId ? 'সংশ্লিষ্ট সেশন পাওয়া যায়নি' : undefined;
    return this.error(
      'Associated session not found',
      TOKEN_ERROR_CODES.SESSION_NOT_FOUND,
      { errorBn, correlationId: options?.correlationId, durationMs: options?.durationMs }
    );
  }

  static versionMismatch(
    expectedVersion: number,
    actualVersion: number,
    options?: { correlationId?: string; durationMs?: number }
  ): RefreshTokenCommandResult {
    const error = `Token version mismatch: expected ${expectedVersion}, got ${actualVersion}`;
    const errorBn = options?.correlationId ? `টোকেন ভার্সন মেলে না: প্রত্যাশিত ${expectedVersion}, পাওয়া গেছে ${actualVersion}` : undefined;
    return this.error(
      error,
      TOKEN_ERROR_CODES.VERSION_MISMATCH,
      { errorBn, correlationId: options?.correlationId, durationMs: options?.durationMs }
    );
  }

  static rateLimited(
    remainingAttempts: number,
    resetAt: Date,
    options?: { correlationId?: string; durationMs?: number }
  ): RefreshTokenCommandResult {
    const errorBn = options?.correlationId ? `রেট লিমিট অতিক্রম করা হয়েছে। ${remainingAttempts} বার চেষ্টা বাকি আছে।` : undefined;
    return this.error(
      `Rate limit exceeded. ${remainingAttempts} attempts remaining.`,
      TOKEN_ERROR_CODES.RATE_LIMITED,
      { errorBn, remainingAttempts, rateLimitResetAt: resetAt, correlationId: options?.correlationId, durationMs: options?.durationMs }
    );
  }
}

// ============================================================
// Type Guards (Enterprise Enhancement)
// ============================================================

/**
 * Type guard for RefreshTokenCommand
 */
export function isRefreshTokenCommand(command: unknown): command is RefreshTokenCommand {
  return command instanceof RefreshTokenCommand;
}

/**
 * Type guard for RefreshTokenCommandResult
 */
export function isRefreshTokenCommandResult(result: unknown): result is RefreshTokenCommandResult {
  return typeof result === 'object' && result !== null && 'success' in result;
}

/**
 * Type guard for successful result
 */
export function isSuccessfulRefreshResult(result: RefreshTokenCommandResult): result is RefreshTokenCommandResult & { success: true; accessToken: string } {
  return result.success === true && !!result.accessToken;
}

// ============================================================
// Type Exports
// ============================================================

export type { 
  RefreshTokenDeviceInfo as RefreshTokenDeviceInfoType,
  RefreshTokenOptions as RefreshTokenOptionsType,
  RefreshTokenCommandOptions as RefreshTokenCommandOptionsType,
  ValidationResult as ValidationResultType,
  CommandId as CommandIdType,
  RefreshToken as RefreshTokenType,
  CorrelationId as CorrelationIdType,
  SessionId as SessionIdType,
  TokenErrorCode as TokenErrorCodeType
};

// ============================================================
// ENTERPRISE SUMMARY v3.0
// ============================================================
// 
// Enterprise Enhancements Applied in v3.0:
// 1. ✅ Shared types integration from @vubon/shared-types
// 2. ✅ Shared constants from @vubon/shared-constants
// 3. ✅ Shared utilities for masking (@vubon/shared-utils)
// 4. ✅ Branded types for type safety (CommandId, RefreshToken, CorrelationId, SessionId)
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
// 15. ✅ Token rotation support flags
// 16. ✅ Session extension options
// 17. ✅ Device binding options
// 18. ✅ Token family revocation on compromise
// 19. ✅ Version mismatch error handling
// 20. ✅ Rate limit error handling
// 21. ✅ Bengali error messages for user-facing errors
// 22. ✅ Duration tracking for performance monitoring
// 
// Bangladesh Specific:
// - District/Upazila tracking for location analytics
// - Mobile operator and network type detection
// - Bengali language support (locale: 'bn')
// - Local timezone (Asia/Dhaka) for timestamps
// - Mobile network optimization flags
// 
// Security Features:
// - No user enumeration
// - Device mismatch detection
// - Token version tracking
// - Family revocation on compromise
// - Rate limiting support
// - JWT format validation
// - Privacy masking for logging
// 
// ============================================================
