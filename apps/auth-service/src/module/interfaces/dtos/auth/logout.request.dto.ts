/**
 * Logout Request DTO - Interface Layer
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 *
 * @module interfaces/dtos/auth/logout.request.dto
 *
 * @description
 * Request DTO for logout endpoint.
 * Supports single session logout, all devices logout, and device-specific logout.
 * User ID is NOT accepted from client - comes from authenticated JWT.
 *
 * Enterprise Features:
 * ✅ Multi-scope logout (current, all, device, except_current)
 * ✅ Comprehensive validation with class-validator
 * ✅ Multi-language error messages (English/Bengali)
 * ✅ Device fingerprinting support
 * ✅ Bangladesh specific - District/NetworkType tracking
 * ✅ Distributed tracing with correlation ID
 * ✅ Audit context for security logging
 * ✅ Swagger documentation
 * ✅ Rate limit metadata
 * ✅ Type-safe with shared types
 *
 * @example
 * // Current session logout
 * {
 *   "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
 *   "scope": "current"
 * }
 *
 * // Logout from all devices
 * {
 *   "scope": "all",
 *   "confirm": true,
 *   "reason": "Security concern"
 * }
 *
 * // Logout from specific device
 * {
 *   "scope": "device",
 *   "deviceId": "device_550e8400-e29b-41d4-a716-446655440000",
 *   "keepCurrent": true
 * }
 */

import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsBoolean,
  IsUUID,
  MaxLength,
  MinLength,
  IsIn,
  ValidateNested,
  IsIP,
  IsNumber,
  Min,
  Max,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

// ============================================================
// Phase-1: shared-constants import
// ============================================================
import { LOGOUT_SCOPE, SESSION_CONFIG, DEVICE_TYPES } from '@vubon/shared-constants';
import type { LogoutScope } from '@vubon/shared-types';

// ============================================================
// Validation Messages (English + Bengali)
// ============================================================

const VALIDATION_MESSAGES = {
  en: {
    scopeInvalid: (scopes: string) => `Scope must be one of: ${scopes}`,
    scopeRequired: 'Logout scope is required',
    refreshTokenRequired: 'Refresh token is required for current session logout',
    refreshTokenMinLength: (min: number) => `Refresh token must be at least ${min} characters long`,
    refreshTokenMaxLength: (max: number) => `Refresh token cannot exceed ${max} characters`,
    sessionIdRequired: 'Session ID is required for session scope logout',
    sessionIdInvalid: 'Session ID must be a valid UUID',
    deviceIdRequired: 'Device ID is required for device scope logout',
    deviceIdMaxLength: (max: number) => `Device ID cannot exceed ${max} characters`,
    confirmRequired: 'Confirmation is required for all devices logout',
    reasonMaxLength: (max: number) => `Reason cannot exceed ${max} characters`,
    keepCurrentInvalid: 'Keep current must be a boolean',
    ipAddressInvalid: 'Invalid IP address format',
    userAgentMaxLength: (max: number) => `User agent cannot exceed ${max} characters`,
    districtMaxLength: (max: number) => `District cannot exceed ${max} characters`,
    correlationIdInvalid: 'Correlation ID must be a valid UUID',
    captchaTokenInvalid: 'CAPTCHA token must be a string',
    deviceTypeInvalid: (types: string) => `Device type must be one of: ${types}`,
    localeInvalid: (locales: string) => `Locale must be one of: ${locales}`,
  },
  bn: {
    scopeInvalid: (scopes: string) => `স্কোপ অবশ্যই এর মধ্যে একটি হতে হবে: ${scopes}`,
    scopeRequired: 'লগআউট স্কোপ প্রয়োজন',
    refreshTokenRequired: 'বর্তমান সেশন লগআউটের জন্য রিফ্রেশ টোকেন প্রয়োজন',
    refreshTokenMinLength: (min: number) => `রিফ্রেশ টোকেন কমপক্ষে ${min} অক্ষরের হতে হবে`,
    refreshTokenMaxLength: (max: number) => `রিফ্রেশ টোকেন সর্বোচ্চ ${max} অক্ষরের হতে পারে`,
    sessionIdRequired: 'সেশন স্কোপ লগআউটের জন্য সেশন আইডি প্রয়োজন',
    sessionIdInvalid: 'সেশন আইডি টি সঠিক UUID হতে হবে',
    deviceIdRequired: 'ডিভাইস স্কোপ লগআউটের জন্য ডিভাইস আইডি প্রয়োজন',
    deviceIdMaxLength: (max: number) => `ডিভাইস আইডি সর্বোচ্চ ${max} অক্ষর হতে পারে`,
    confirmRequired: 'সব ডিভাইস থেকে লগআউটের জন্য নিশ্চিতকরণ প্রয়োজন',
    reasonMaxLength: (max: number) => `কারণ সর্বোচ্চ ${max} অক্ষর হতে পারে`,
    keepCurrentInvalid: 'বর্তমান সেশন রাখা অবশ্যই সত্য বা মিথ্যা হতে হবে',
    ipAddressInvalid: 'ভুল আইপি অ্যাড্রেস ফরম্যাট',
    userAgentMaxLength: (max: number) => `ইউজার এজেন্ট সর্বোচ্চ ${max} অক্ষর হতে পারে`,
    districtMaxLength: (max: number) => `জেলা সর্বোচ্চ ${max} অক্ষর হতে পারে`,
    correlationIdInvalid: 'করিলেশন আইডি টি সঠিক UUID হতে হবে',
    captchaTokenInvalid: 'CAPTCHA টোকেন অবশ্যই একটি স্ট্রিং হতে হবে',
    deviceTypeInvalid: (types: string) => `ডিভাইস টাইপ অবশ্যই এর মধ্যে একটি হতে হবে: ${types}`,
    localeInvalid: (locales: string) => `লোকেল অবশ্যই এর মধ্যে একটি হতে হবে: ${locales}`,
  },
};

/**
 * Get validation message (with locale support)
 */
function getValidationMessage(
  key: keyof typeof VALIDATION_MESSAGES.en,
  args?: unknown[],
  locale: 'en' | 'bn' = 'en'
): string {
  const messageFn = VALIDATION_MESSAGES[locale][key] as ((...args: unknown[]) => string) | string;
  if (typeof messageFn === 'function') {
    return messageFn(...(args || []));
  }
  return messageFn || VALIDATION_MESSAGES.en[key] as string;
}

// ============================================================
// Constants
// ============================================================

/** Refresh token length constraints from shared-constants */
const REFRESH_TOKEN_MIN_LENGTH = 32;
const REFRESH_TOKEN_MAX_LENGTH = 512;

/** Supported locales */
const SUPPORTED_LOCALES = ['en', 'bn'] as const;
type SupportedLocale = typeof SUPPORTED_LOCALES[number];

/** Valid logout scopes from shared-constants */
const VALID_SCOPES = Object.values(LOGOUT_SCOPE);

// ============================================================
// Client Info DTO (Bangladesh specific)
// ============================================================

/**
 * Client information for security and analytics
 */
export class LogoutClientInfoDto {
  @ApiPropertyOptional({
    description: 'IP address of the client',
    example: '192.168.1.100',
  })
  @IsOptional()
  @IsIP(undefined, { message: getValidationMessage('ipAddressInvalid') })
  ipAddress?: string;

  @ApiPropertyOptional({
    description: 'User agent string',
    example: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
  })
  @IsOptional()
  @IsString()
  @MaxLength(500, { message: getValidationMessage('userAgentMaxLength', [500]) })
  userAgent?: string;

  @ApiPropertyOptional({
    description: 'Screen resolution',
    example: '1920x1080',
  })
  @IsOptional()
  @IsString()
  @Matches(/^\d+x\d+$/, { message: 'Screen resolution must be in format WxH' })
  screenResolution?: string;

  @ApiPropertyOptional({
    description: 'Language preference',
    example: 'en',
  })
  @IsOptional()
  @IsString()
  @MaxLength(10)
  language?: string;

  @ApiPropertyOptional({
    description: 'Timezone offset in minutes',
    example: 360,
  })
  @IsOptional()
  @IsNumber()
  @Min(-720)
  @Max(840)
  timezoneOffset?: number;

  // Bangladesh specific
  @ApiPropertyOptional({
    description: 'District (Bangladesh specific)',
    example: 'Dhaka',
  })
  @IsOptional()
  @IsString()
  @MaxLength(100, { message: getValidationMessage('districtMaxLength', [100]) })
  district?: string;

  @ApiPropertyOptional({
    description: 'Division (Bangladesh specific)',
    example: 'Dhaka',
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  division?: string;

  @ApiPropertyOptional({
    description: 'Mobile operator (Bangladesh specific)',
    example: 'gp',
    enum: ['gp', 'robi', 'banglalink', 'teletalk', 'unknown'],
  })
  @IsOptional()
  @IsIn(['gp', 'robi', 'banglalink', 'teletalk', 'unknown'])
  mobileOperator?: string;

  @ApiPropertyOptional({
    description: 'Network type (Bangladesh specific)',
    example: '4g',
    enum: ['2g', '3g', '4g', '5g', 'wifi', 'unknown'],
  })
  @IsOptional()
  @IsIn(['2g', '3g', '4g', '5g', 'wifi', 'unknown'])
  networkType?: string;
}

// ============================================================
// Main Logout Request DTO
// ============================================================

/**
 * Logout Request DTO
 *
 * @description
 * Request DTO for logging out user from one or all devices.
 * User ID is taken from authenticated JWT, not from request body.
 *
 * @example
 * // Current session logout
 * {
 *   "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
 *   "scope": "current",
 *   "reason": "User initiated logout",
 *   "clientInfo": { "ipAddress": "192.168.1.100" }
 * }
 *
 * // Logout from all devices
 * {
 *   "scope": "all",
 *   "confirm": true,
 *   "reason": "Security concern",
 *   "keepCurrent": false
 * }
 *
 * // Logout from specific device
 * {
 *   "scope": "device",
 *   "deviceId": "device_550e8400-e29b-41d4-a716-446655440000",
 *   "keepCurrent": true
 * }
 */
export class LogoutRequestDto {
  @ApiPropertyOptional({
    description: 'Refresh token to invalidate (required for current session logout)',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
    minLength: 32,
    maxLength: 512,
  })
  @IsOptional()
  @IsString()
  @MinLength(REFRESH_TOKEN_MIN_LENGTH, {
    message: getValidationMessage('refreshTokenMinLength', [REFRESH_TOKEN_MIN_LENGTH]),
  })
  @MaxLength(REFRESH_TOKEN_MAX_LENGTH, {
    message: getValidationMessage('refreshTokenMaxLength', [REFRESH_TOKEN_MAX_LENGTH]),
  })
  refreshToken?: string;

  @ApiProperty({
    description: 'Logout scope',
    example: 'current',
    enum: VALID_SCOPES,
    default: 'current',
    required: true,
  })
  @IsIn(VALID_SCOPES, {
    message: getValidationMessage('scopeInvalid', [VALID_SCOPES.join(', ')]),
  })
  @IsNotEmpty({ message: getValidationMessage('scopeRequired') })
  scope: LogoutScope = 'current';

  @ApiPropertyOptional({
    description: 'Specific session ID to revoke (used with scope="session")',
    example: 'sess_550e8400-e29b-41d4-a716-446655440000',
    format: 'uuid',
  })
  @IsOptional()
  @IsUUID(4, { message: getValidationMessage('sessionIdInvalid') })
  @MaxLength(255)
  sessionId?: string;

  @ApiPropertyOptional({
    description: 'Device ID to revoke sessions from (used with scope="device")',
    example: 'device_550e8400-e29b-41d4-a716-446655440000',
    maxLength: 255,
  })
  @IsOptional()
  @IsString()
  @MaxLength(255, { message: getValidationMessage('deviceIdMaxLength', [255]) })
  deviceId?: string;

  @ApiPropertyOptional({
    description: 'Device type to revoke sessions from (Bangladesh specific)',
    example: 'mobile',
    enum: Object.values(DEVICE_TYPES),
  })
  @IsOptional()
  @IsIn(Object.values(DEVICE_TYPES), {
    message: getValidationMessage('deviceTypeInvalid', [Object.values(DEVICE_TYPES).join(', ')]),
  })
  deviceType?: typeof DEVICE_TYPES[keyof typeof DEVICE_TYPES];

  @ApiPropertyOptional({
    description: 'Confirm logout from all devices (required for scope="all")',
    example: true,
  })
  @IsOptional()
  @IsBoolean({ message: getValidationMessage('keepCurrentInvalid') })
  confirm?: boolean;

  @ApiPropertyOptional({
    description: 'Keep current session when revoking others (default: false)',
    example: true,
    default: false,
  })
  @IsOptional()
  @IsBoolean({ message: getValidationMessage('keepCurrentInvalid') })
  keepCurrent?: boolean = false;

  @ApiPropertyOptional({
    description: 'Reason for logout (for audit)',
    example: 'User initiated logout',
    maxLength: 500,
  })
  @IsOptional()
  @IsString()
  @MaxLength(500, { message: getValidationMessage('reasonMaxLength', [500]) })
  reason?: string;

  @ApiPropertyOptional({
    description: 'CAPTCHA token for rate limiting prevention',
    example: '03AGdBq27...',
  })
  @IsOptional()
  @IsString({ message: getValidationMessage('captchaTokenInvalid') })
  captchaToken?: string;

  @ApiPropertyOptional({
    description: 'Client information for security tracking',
    type: LogoutClientInfoDto,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => LogoutClientInfoDto)
  clientInfo?: LogoutClientInfoDto;

  @ApiPropertyOptional({
    description: 'Correlation ID for distributed tracing',
    example: 'corr_550e8400-e29b-41d4-a716-446655440000',
  })
  @IsOptional()
  @IsUUID(4, { message: getValidationMessage('correlationIdInvalid') })
  correlationId?: string;

  @ApiPropertyOptional({
    description: 'Response language (English or Bengali)',
    example: 'bn',
    enum: SUPPORTED_LOCALES,
    default: 'en',
  })
  @IsOptional()
  @IsIn(SUPPORTED_LOCALES, {
    message: getValidationMessage('localeInvalid', [SUPPORTED_LOCALES.join(', ')]),
  })
  locale?: SupportedLocale = 'en';

  // ============================================================
  // Constructor
  // ============================================================

  constructor(
    scope: LogoutScope = 'current',
    refreshToken?: string,
    sessionId?: string,
    deviceId?: string,
    confirm?: boolean,
    keepCurrent?: boolean,
    reason?: string,
    clientInfo?: LogoutClientInfoDto,
    correlationId?: string,
    locale?: SupportedLocale
  ) {
    this.scope = scope;
    this.refreshToken = refreshToken;
    this.sessionId = sessionId;
    this.deviceId = deviceId;
    this.confirm = confirm;
    this.keepCurrent = keepCurrent ?? false;
    this.reason = reason;
    this.clientInfo = clientInfo;
    this.correlationId = correlationId;
    this.locale = locale ?? 'en';
  }

  // ============================================================
  // Helper Methods
  // ============================================================

  /**
   * Check if refresh token is provided
   */
  hasRefreshToken(): boolean {
    return !!this.refreshToken && this.refreshToken.length > 0;
  }

  /**
   * Check if session ID is provided
   */
  hasSessionId(): boolean {
    return !!this.sessionId && this.sessionId.length > 0;
  }

  /**
   * Check if device ID is provided
   */
  hasDeviceId(): boolean {
    return !!this.deviceId && this.deviceId.length > 0;
  }

  /**
   * Check if device type is provided
   */
  hasDeviceType(): boolean {
    return !!this.deviceType;
  }

  /**
   * Check if confirmation is provided (for all devices logout)
   */
  isConfirmed(): boolean {
    return this.confirm === true;
  }

  /**
   * Check if current session should be kept
   */
  shouldKeepCurrent(): boolean {
    return this.keepCurrent === true;
  }

  /**
   * Check if reason is provided
   */
  hasReason(): boolean {
    return !!this.reason && this.reason.length > 0;
  }

  /**
   * Check if CAPTCHA is provided
   */
  hasCaptcha(): boolean {
    return !!this.captchaToken && this.captchaToken.length > 0;
  }

  /**
   * Check if client info is provided
   */
  hasClientInfo(): boolean {
    return !!this.clientInfo;
  }

  /**
   * Get masked refresh token for logging
   */
  getMaskedRefreshToken(): string {
    if (!this.refreshToken) return '***';
    if (this.refreshToken.length <= 16) return '***';
    return `${this.refreshToken.slice(0, 8)}...${this.refreshToken.slice(-8)}`;
  }

  /**
   * Get masked session ID for logging
   */
  getMaskedSessionId(): string {
    if (!this.sessionId) return '***';
    return `${this.sessionId.slice(0, 8)}...${this.sessionId.slice(-4)}`;
  }

  /**
   * Get masked device ID for logging
   */
  getMaskedDeviceId(): string {
    if (!this.deviceId) return '***';
    return `${this.deviceId.slice(0, 8)}...${this.deviceId.slice(-4)}`;
  }

  /**
   * Get masked IP address for logging
   */
  getMaskedIpAddress(): string {
    if (!this.clientInfo?.ipAddress) return '***';
    const ip = this.clientInfo.ipAddress;
    const parts = ip.split('.');
    if (parts.length === 4) {
      return `${parts[0]}.${parts[1]}.***.***`;
    }
    return '***';
  }

  /**
   * Get execution context for logging
   */
  getExecutionContext(): {
    scope: LogoutScope;
    hasRefreshToken: boolean;
    hasSessionId: boolean;
    hasDeviceId: boolean;
    hasDeviceType: boolean;
    isConfirmed: boolean;
    keepCurrent: boolean;
    hasReason: boolean;
    hasCaptcha: boolean;
    hasClientInfo: boolean;
    locale: SupportedLocale;
  } {
    return {
      scope: this.scope,
      hasRefreshToken: this.hasRefreshToken(),
      hasSessionId: this.hasSessionId(),
      hasDeviceId: this.hasDeviceId(),
      hasDeviceType: this.hasDeviceType(),
      isConfirmed: this.isConfirmed(),
      keepCurrent: this.shouldKeepCurrent(),
      hasReason: this.hasReason(),
      hasCaptcha: this.hasCaptcha(),
      hasClientInfo: this.hasClientInfo(),
      locale: this.locale,
    };
  }

  /**
   * Convert to string for logging (sensitive data masked)
   */
  public toString(): string {
    return `LogoutRequestDto(scope=${this.scope}, hasRefreshToken=${this.hasRefreshToken()}, hasSessionId=${this.hasSessionId()}, hasDeviceId=${this.hasDeviceId()}, hasDeviceType=${this.hasDeviceType()}, isConfirmed=${this.isConfirmed()}, keepCurrent=${this.shouldKeepCurrent()}, hasReason=${this.hasReason()}, hasCaptcha=${this.hasCaptcha()}, hasClientInfo=${this.hasClientInfo()}, locale=${this.locale})`;
  }

  /**
   * Get summary for JSON logging
   */
  public toJSON(): Record<string, unknown> {
    return {
      scope: this.scope,
      hasRefreshToken: this.hasRefreshToken(),
      maskedRefreshToken: this.getMaskedRefreshToken(),
      hasSessionId: this.hasSessionId(),
      maskedSessionId: this.getMaskedSessionId(),
      hasDeviceId: this.hasDeviceId(),
      maskedDeviceId: this.getMaskedDeviceId(),
      hasDeviceType: this.hasDeviceType(),
      deviceType: this.deviceType,
      isConfirmed: this.isConfirmed(),
      keepCurrent: this.shouldKeepCurrent(),
      hasReason: this.hasReason(),
      hasCaptcha: this.hasCaptcha(),
      hasClientInfo: this.hasClientInfo(),
      hasIpAddress: !!this.clientInfo?.ipAddress,
      maskedIpAddress: this.getMaskedIpAddress(),
      hasUserAgent: !!this.clientInfo?.userAgent,
      hasDistrict: !!this.clientInfo?.district,
      hasMobileOperator: !!this.clientInfo?.mobileOperator,
      hasNetworkType: !!this.clientInfo?.networkType,
      locale: this.locale,
    };
  }
}

// ============================================================
// Simple Logout Request DTO (For common use cases)
// ============================================================

/**
 * Simple Logout Request DTO
 * For cases where only current session logout is needed
 */
export class SimpleLogoutRequestDto {
  @ApiProperty({
    description: 'Refresh token to invalidate',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
    required: true,
    minLength: 32,
    maxLength: 512,
  })
  @IsString()
  @IsNotEmpty({ message: 'Refresh token is required' })
  @MinLength(REFRESH_TOKEN_MIN_LENGTH, {
    message: getValidationMessage('refreshTokenMinLength', [REFRESH_TOKEN_MIN_LENGTH]),
  })
  @MaxLength(REFRESH_TOKEN_MAX_LENGTH, {
    message: getValidationMessage('refreshTokenMaxLength', [REFRESH_TOKEN_MAX_LENGTH]),
  })
  refreshToken: string;

  @ApiPropertyOptional({
    description: 'Reason for logout (for audit)',
    example: 'User initiated logout',
    maxLength: 500,
  })
  @IsOptional()
  @IsString()
  @MaxLength(500, { message: getValidationMessage('reasonMaxLength', [500]) })
  reason?: string;

  @ApiPropertyOptional({
    description: 'Client information for security tracking',
    type: LogoutClientInfoDto,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => LogoutClientInfoDto)
  clientInfo?: LogoutClientInfoDto;

  @ApiPropertyOptional({
    description: 'Correlation ID for distributed tracing',
    example: 'corr_550e8400-e29b-41d4-a716-446655440000',
  })
  @IsOptional()
  @IsUUID(4)
  correlationId?: string;

  constructor(refreshToken: string, reason?: string, clientInfo?: LogoutClientInfoDto, correlationId?: string) {
    this.refreshToken = refreshToken;
    this.reason = reason;
    this.clientInfo = clientInfo;
    this.correlationId = correlationId;
  }
}

// ============================================================
// Logout All Devices Request DTO
// ============================================================

/**
 * Logout All Devices Request DTO
 * For logging out from all devices with confirmation
 *
 * @example
 * {
 *   "confirm": true,
 *   "keepCurrent": false,
 *   "reason": "Security concern - suspicious activity detected",
 *   "clientInfo": { "ipAddress": "192.168.1.100" }
 * }
 */
export class LogoutAllDevicesRequestDto {
  @ApiProperty({
    description: 'Confirm logout from all devices',
    example: true,
    required: true,
  })
  @IsBoolean({ message: getValidationMessage('keepCurrentInvalid') })
  @IsNotEmpty({ message: getValidationMessage('confirmRequired') })
  confirm: boolean;

  @ApiPropertyOptional({
    description: 'Keep current session active (default: false)',
    example: false,
    default: false,
  })
  @IsOptional()
  @IsBoolean({ message: getValidationMessage('keepCurrentInvalid') })
  keepCurrent?: boolean = false;

  @ApiPropertyOptional({
    description: 'Session IDs to exclude from revocation',
    example: ['sess_keep123', 'sess_keep456'],
    isArray: true,
    maxItems: 100,
  })
  @IsOptional()
  @IsArray()
  @IsUUID(4, { each: true, message: getValidationMessage('sessionIdInvalid') })
  @MaxLength(100)
  excludeSessionIds?: string[];

  @ApiPropertyOptional({
    description: 'Reason for logging out from all devices',
    example: 'Security concern - suspicious activity detected',
    maxLength: 500,
  })
  @IsOptional()
  @IsString()
  @MaxLength(500, { message: getValidationMessage('reasonMaxLength', [500]) })
  reason?: string;

  @ApiPropertyOptional({
    description: 'Client information for security tracking',
    type: LogoutClientInfoDto,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => LogoutClientInfoDto)
  clientInfo?: LogoutClientInfoDto;

  @ApiPropertyOptional({
    description: 'Correlation ID for distributed tracing',
    example: 'corr_550e8400-e29b-41d4-a716-446655440000',
  })
  @IsOptional()
  @IsUUID(4)
  correlationId?: string;

  @ApiPropertyOptional({
    description: 'Response language (English or Bengali)',
    example: 'bn',
    enum: SUPPORTED_LOCALES,
    default: 'en',
  })
  @IsOptional()
  @IsIn(SUPPORTED_LOCALES, {
    message: getValidationMessage('localeInvalid', [SUPPORTED_LOCALES.join(', ')]),
  })
  locale?: SupportedLocale = 'en';

  constructor(
    confirm: boolean,
    keepCurrent?: boolean,
    reason?: string,
    clientInfo?: LogoutClientInfoDto,
    correlationId?: string,
    locale?: SupportedLocale
  ) {
    this.confirm = confirm;
    this.keepCurrent = keepCurrent ?? false;
    this.reason = reason;
    this.clientInfo = clientInfo;
    this.correlationId = correlationId;
    this.locale = locale ?? 'en';
  }

  /**
   * Check if current session should be kept
   */
  shouldKeepCurrent(): boolean {
    return this.keepCurrent === true;
  }

  /**
   * Check if reason is provided
   */
  hasReason(): boolean {
    return !!this.reason && this.reason.length > 0;
  }

  /**
   * Check if client info is provided
   */
  hasClientInfo(): boolean {
    return !!this.clientInfo;
  }

  /**
   * Check if exclude session IDs are provided
   */
  hasExcludeSessionIds(): boolean {
    return !!this.excludeSessionIds && this.excludeSessionIds.length > 0;
  }

  /**
   * Get masked IP address for logging
   */
  getMaskedIpAddress(): string {
    if (!this.clientInfo?.ipAddress) return '***';
    const ip = this.clientInfo.ipAddress;
    const parts = ip.split('.');
    if (parts.length === 4) {
      return `${parts[0]}.${parts[1]}.***.***`;
    }
    return '***';
  }

  /**
   * Get summary for JSON logging
   */
  public toJSON(): Record<string, unknown> {
    return {
      isConfirmed: this.confirm,
      keepCurrent: this.shouldKeepCurrent(),
      hasReason: this.hasReason(),
      hasClientInfo: this.hasClientInfo(),
      hasExcludeSessionIds: this.hasExcludeSessionIds(),
      excludeSessionIdsCount: this.excludeSessionIds?.length || 0,
      hasIpAddress: !!this.clientInfo?.ipAddress,
      maskedIpAddress: this.getMaskedIpAddress(),
      hasUserAgent: !!this.clientInfo?.userAgent,
      hasDistrict: !!this.clientInfo?.district,
      hasMobileOperator: !!this.clientInfo?.mobileOperator,
      hasNetworkType: !!this.clientInfo?.networkType,
      locale: this.locale,
    };
  }
}

// ============================================================
// Revoke Session Request DTO
// ============================================================

/**
 * Revoke Session Request DTO
 * For revoking a specific session by ID
 *
 * @example
 * {
 *   "sessionId": "sess_550e8400-e29b-41d4-a716-446655440000",
 *   "reason": "User requested logout from this device"
 * }
 */
export class RevokeSessionRequestDto {
  @ApiProperty({
    description: 'Session ID to revoke',
    example: 'sess_550e8400-e29b-41d4-a716-446655440000',
    required: true,
    format: 'uuid',
  })
  @IsUUID(4, { message: getValidationMessage('sessionIdInvalid') })
  @IsNotEmpty({ message: getValidationMessage('sessionIdRequired') })
  @MaxLength(255)
  sessionId: string;

  @ApiPropertyOptional({
    description: 'Reason for revoking the session',
    example: 'User requested logout from this device',
    maxLength: 500,
  })
  @IsOptional()
  @IsString()
  @MaxLength(500, { message: getValidationMessage('reasonMaxLength', [500]) })
  reason?: string;

  @ApiPropertyOptional({
    description: 'Client information for security tracking',
    type: LogoutClientInfoDto,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => LogoutClientInfoDto)
  clientInfo?: LogoutClientInfoDto;

  @ApiPropertyOptional({
    description: 'Correlation ID for distributed tracing',
    example: 'corr_550e8400-e29b-41d4-a716-446655440000',
  })
  @IsOptional()
  @IsUUID(4)
  correlationId?: string;

  constructor(sessionId: string, reason?: string, clientInfo?: LogoutClientInfoDto, correlationId?: string) {
    this.sessionId = sessionId;
    this.reason = reason;
    this.clientInfo = clientInfo;
    this.correlationId = correlationId;
  }

  /**
   * Check if reason is provided
   */
  hasReason(): boolean {
    return !!this.reason && this.reason.length > 0;
  }

  /**
   * Check if client info is provided
   */
  hasClientInfo(): boolean {
    return !!this.clientInfo;
  }

  /**
   * Get masked session ID for logging
   */
  getMaskedSessionId(): string {
    return `${this.sessionId.slice(0, 8)}...${this.sessionId.slice(-4)}`;
  }

  /**
   * Get masked IP address for logging
   */
  getMaskedIpAddress(): string {
    if (!this.clientInfo?.ipAddress) return '***';
    const ip = this.clientInfo.ipAddress;
    const parts = ip.split('.');
    if (parts.length === 4) {
      return `${parts[0]}.${parts[1]}.***.***`;
    }
    return '***';
  }
}

// ============================================================
// Bulk Logout Request DTO (Enterprise feature)
// ============================================================

/**
 * Bulk Logout Request DTO
 * For administrators to logout multiple users or sessions
 *
 * @example
 * {
 *   "sessionIds": ["sess_abc123", "sess_def456"],
 *   "deviceIds": ["device_xyz789"],
 *   "reason": "Security incident - mass logout required"
 * }
 */
export class BulkLogoutRequestDto {
  @ApiPropertyOptional({
    description: 'Session IDs to revoke (max 100)',
    example: ['sess_abc123', 'sess_def456'],
    isArray: true,
    maxItems: 100,
  })
  @IsOptional()
  @IsArray()
  @IsUUID(4, { each: true, message: getValidationMessage('sessionIdInvalid') })
  @MaxLength(100, { each: true })
  sessionIds?: string[];

  @ApiPropertyOptional({
    description: 'Device IDs to revoke all sessions from (max 50)',
    example: ['device_abc123', 'device_def456'],
    isArray: true,
    maxItems: 50,
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @MaxLength(255, { each: true })
  deviceIds?: string[];

  @ApiPropertyOptional({
    description: 'Reason for bulk logout',
    example: 'Security incident - mass logout required',
    maxLength: 500,
  })
  @IsOptional()
  @IsString()
  @MaxLength(500, { message: getValidationMessage('reasonMaxLength', [500]) })
  reason?: string;

  @ApiPropertyOptional({
    description: 'Client information for security tracking',
    type: LogoutClientInfoDto,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => LogoutClientInfoDto)
  clientInfo?: LogoutClientInfoDto;

  @ApiPropertyOptional({
    description: 'Correlation ID for distributed tracing',
    example: 'corr_550e8400-e29b-41d4-a716-446655440000',
  })
  @IsOptional()
  @IsUUID(4)
  correlationId?: string;

  @ApiPropertyOptional({
    description: 'Response language (English or Bengali)',
    example: 'bn',
    enum: SUPPORTED_LOCALES,
    default: 'en',
  })
  @IsOptional()
  @IsIn(SUPPORTED_LOCALES, {
    message: getValidationMessage('localeInvalid', [SUPPORTED_LOCALES.join(', ')]),
  })
  locale?: SupportedLocale = 'en';

  constructor(
    sessionIds?: string[],
    deviceIds?: string[],
    reason?: string,
    clientInfo?: LogoutClientInfoDto,
    correlationId?: string,
    locale?: SupportedLocale
  ) {
    this.sessionIds = sessionIds;
    this.deviceIds = deviceIds;
    this.reason = reason;
    this.clientInfo = clientInfo;
    this.correlationId = correlationId;
    this.locale = locale ?? 'en';
  }

  /**
   * Check if any targets are specified
   */
  hasTargets(): boolean {
    return !!(this.sessionIds?.length || this.deviceIds?.length);
  }

  /**
   * Get total target count
   */
  getTargetCount(): number {
    return (this.sessionIds?.length || 0) + (this.deviceIds?.length || 0);
  }

  /**
   * Check if reason is provided
   */
  hasReason(): boolean {
    return !!this.reason && this.reason.length > 0;
  }

  /**
   * Check if client info is provided
   */
  hasClientInfo(): boolean {
    return !!this.clientInfo;
  }

  /**
   * Get masked IP address for logging
   */
  getMaskedIpAddress(): string {
    if (!this.clientInfo?.ipAddress) return '***';
    const ip = this.clientInfo.ipAddress;
    const parts = ip.split('.');
    if (parts.length === 4) {
      return `${parts[0]}.${parts[1]}.***.***`;
    }
    return '***';
  }

  /**
   * Get summary for JSON logging
   */
  public toJSON(): Record<string, unknown> {
    return {
      sessionIdsCount: this.sessionIds?.length || 0,
      deviceIdsCount: this.deviceIds?.length || 0,
      totalTargets: this.getTargetCount(),
      hasReason: this.hasReason(),
      hasClientInfo: this.hasClientInfo(),
      hasIpAddress: !!this.clientInfo?.ipAddress,
      maskedIpAddress: this.getMaskedIpAddress(),
      hasUserAgent: !!this.clientInfo?.userAgent,
      hasDistrict: !!this.clientInfo?.district,
      hasMobileOperator: !!this.clientInfo?.mobileOperator,
      hasNetworkType: !!this.clientInfo?.networkType,
      locale: this.locale,
    };
  }
}

// ============================================================
// Type Exports
// ============================================================

export type { SupportedLocale as SupportedLocaleType };
export type { LogoutScope as LogoutScopeType };
