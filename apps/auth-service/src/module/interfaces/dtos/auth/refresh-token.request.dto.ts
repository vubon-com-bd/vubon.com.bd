/**
 * Refresh Token Request DTO - Interface Layer
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 *
 * @module interfaces/dtos/auth/refresh-token.request.dto
 *
 * @description
 * Request DTO for refresh token endpoint.
 * Supports both body-based and cookie-based refresh token submission.
 *
 * Enterprise Features:
 * ✅ Refresh token validation
 * ✅ Device fingerprinting support
 * ✅ Client information tracking
 * ✅ Distributed tracing with correlation ID
 * ✅ Multi-language error messages (English/Bengali)
 * ✅ Swagger documentation
 * ✅ Bangladesh specific - District/NetworkType tracking
 * ✅ Token rotation control (optional)
 * ✅ Session extension control (optional)
 *
 * @example
 * // Body-based request
 * {
 *   "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
 *   "deviceId": "device-123",
 *   "rotateToken": true,
 *   "extendSession": true,
 *   "clientInfo": { "networkType": "4g", "district": "Dhaka" }
 * }
 *
 * // Cookie-based request (refresh token in cookie)
 * // Cookie: refreshToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 * {
 *   "deviceId": "device-123",
 *   "rotateToken": false
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
  ValidateNested,
  IsIn,
  IsIP,
  IsNumber,
  Min,
  Max,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

// ============================================================
// Phase-1: shared-constants import (type-only for enums)
// ============================================================
import { TOKEN_CONFIG, REFRESH_TOKEN_CONFIG, SESSION_CONFIG } from '@vubon/shared-constants';
import type { DeviceInfo as SharedDeviceInfo } from '@vubon/shared-types';

// ============================================================
// Validation Messages (English + Bengali)
// ============================================================

const VALIDATION_MESSAGES = {
  en: {
    refreshTokenRequired: 'Refresh token is required',
    refreshTokenMinLength: (min: number) => `Refresh token must be at least ${min} characters long`,
    refreshTokenMaxLength: (max: number) => `Refresh token cannot exceed ${max} characters`,
    refreshTokenInvalid: 'Invalid refresh token format',
    deviceIdMaxLength: 'Device ID cannot exceed 255 characters',
    deviceFingerprintMaxLength: 'Device fingerprint cannot exceed 128 characters',
    correlationIdInvalid: 'Correlation ID must be a valid UUID',
    rotateTokenInvalid: 'Rotate token must be a boolean',
    extendSessionInvalid: 'Extend session must be a boolean',
    revokeFamilyOnCompromiseInvalid: 'Revoke family on compromise must be a boolean',
    extensionSecondsInvalid: (min: number, max: number) => `Extension seconds must be between ${min} and ${max}`,
    expectedVersionInvalid: 'Expected version must be a positive integer',
    localeInvalid: (locales: string) => `Locale must be one of: ${locales}`,
    ipAddressInvalid: 'Invalid IP address format',
    userAgentMaxLength: 'User agent cannot exceed 500 characters',
    districtMaxLength: 'District cannot exceed 100 characters',
    mobileOperatorInvalid: (operators: string) => `Mobile operator must be one of: ${operators}`,
    networkTypeInvalid: (types: string) => `Network type must be one of: ${types}`,
  },
  bn: {
    refreshTokenRequired: 'রিফ্রেশ টোকেন প্রয়োজন',
    refreshTokenMinLength: (min: number) => `রিফ্রেশ টোকেন কমপক্ষে ${min} অক্ষরের হতে হবে`,
    refreshTokenMaxLength: (max: number) => `রিফ্রেশ টোকেন সর্বোচ্চ ${max} অক্ষরের হতে পারে`,
    refreshTokenInvalid: 'ভুল রিফ্রেশ টোকেন ফরম্যাট',
    deviceIdMaxLength: 'ডিভাইস আইডি সর্বোচ্চ ২৫৫ অক্ষর হতে পারে',
    deviceFingerprintMaxLength: 'ডিভাইস ফিঙ্গারপ্রিন্ট সর্বোচ্চ ১২৮ অক্ষর হতে পারে',
    correlationIdInvalid: 'করিলেশন আইডি টি সঠিক UUID হতে হবে',
    rotateTokenInvalid: 'রোটেট টোকেন অবশ্যই সত্য বা মিথ্যা হতে হবে',
    extendSessionInvalid: 'এক্সটেন্ড সেশন অবশ্যই সত্য বা মিথ্যা হতে হবে',
    revokeFamilyOnCompromiseInvalid: 'রিভোক ফ্যামিলি অন কম্প্রোমাইস অবশ্যই সত্য বা মিথ্যা হতে হবে',
    extensionSecondsInvalid: (min: number, max: number) => `এক্সটেনশন সেকেন্ড ${min} থেকে ${max} এর মধ্যে হতে হবে`,
    expectedVersionInvalid: 'এক্সপেক্টেড ভার্সন অবশ্যই একটি ধনাত্মক পূর্ণসংখ্যা হতে হবে',
    localeInvalid: (locales: string) => `লোকেল অবশ্যই এর মধ্যে একটি হতে হবে: ${locales}`,
    ipAddressInvalid: 'ভুল আইপি অ্যাড্রেস ফরম্যাট',
    userAgentMaxLength: 'ইউজার এজেন্ট সর্বোচ্চ ৫০০ অক্ষর হতে পারে',
    districtMaxLength: 'জেলা সর্বোচ্চ ১০০ অক্ষর হতে পারে',
    mobileOperatorInvalid: (operators: string) => `মোবাইল অপারেটর অবশ্যই এর মধ্যে একটি হতে হবে: ${operators}`,
    networkTypeInvalid: (types: string) => `নেটওয়ার্ক টাইপ অবশ্যই এর মধ্যে একটি হতে হবে: ${types}`,
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

/**
 * Refresh token length constraints from shared-constants
 */
const REFRESH_TOKEN_MIN_LENGTH = TOKEN_CONFIG?.REFRESH_TOKEN_MIN_LENGTH ?? 32;
const REFRESH_TOKEN_MAX_LENGTH = TOKEN_CONFIG?.REFRESH_TOKEN_MAX_LENGTH ?? 512;

/**
 * Supported locales
 */
const SUPPORTED_LOCALES = ['en', 'bn'] as const;
type SupportedLocale = typeof SUPPORTED_LOCALES[number];

/**
 * Mobile operators (Bangladesh specific)
 */
const MOBILE_OPERATORS = ['gp', 'robi', 'banglalink', 'teletalk', 'unknown'] as const;
type MobileOperator = typeof MOBILE_OPERATORS[number];

/**
 * Network types (Bangladesh specific)
 */
const NETWORK_TYPES = ['2g', '3g', '4g', '5g', 'wifi', 'unknown'] as const;
type NetworkType = typeof NETWORK_TYPES[number];

// ============================================================
// Client Info DTO (Bangladesh specific)
// ============================================================

/**
 * Client information for security and analytics
 */
export class RefreshClientInfoDto {
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
  @MaxLength(500, { message: getValidationMessage('userAgentMaxLength') })
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
    description: 'Network type (Bangladesh specific)',
    example: '4g',
    enum: NETWORK_TYPES,
  })
  @IsOptional()
  @IsIn(NETWORK_TYPES, {
    message: getValidationMessage('networkTypeInvalid', [NETWORK_TYPES.join(', ')]),
  })
  networkType?: NetworkType;

  @ApiPropertyOptional({
    description: 'District (Bangladesh specific)',
    example: 'Dhaka',
  })
  @IsOptional()
  @IsString()
  @MaxLength(100, { message: getValidationMessage('districtMaxLength') })
  district?: string;

  @ApiPropertyOptional({
    description: 'Mobile operator (Bangladesh specific)',
    example: 'gp',
    enum: MOBILE_OPERATORS,
  })
  @IsOptional()
  @IsIn(MOBILE_OPERATORS, {
    message: getValidationMessage('mobileOperatorInvalid', [MOBILE_OPERATORS.join(', ')]),
  })
  mobileOperator?: MobileOperator;
}

// ============================================================
// Main Refresh Token Request DTO
// ============================================================

/**
 * Refresh Token Request DTO
 *
 * @description
 * Request DTO for refreshing access token using refresh token.
 * Supports both body-based and cookie-based token submission.
 *
 * @example
 * // Body-based request
 * {
 *   "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
 *   "deviceId": "device-123",
 *   "rotateToken": true,
 *   "extendSession": true,
 *   "clientInfo": { "networkType": "4g" }
 * }
 *
 * // Cookie-based request (refresh token in cookie)
 * // Cookie: refreshToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 * {
 *   "deviceId": "device-123",
 *   "rotateToken": false
 * }
 */
export class RefreshTokenRequestDto {
  @ApiPropertyOptional({
    description: 'Refresh token (JWT). Can be provided in body or cookie.',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
    minLength: 32,
    maxLength: 512,
  })
  @IsOptional()
  @IsString({ message: getValidationMessage('refreshTokenInvalid') })
  @MinLength(REFRESH_TOKEN_MIN_LENGTH, {
    message: getValidationMessage('refreshTokenMinLength', [REFRESH_TOKEN_MIN_LENGTH]),
  })
  @MaxLength(REFRESH_TOKEN_MAX_LENGTH, {
    message: getValidationMessage('refreshTokenMaxLength', [REFRESH_TOKEN_MAX_LENGTH]),
  })
  refreshToken?: string;

  @ApiPropertyOptional({
    description: 'Device identifier for session tracking',
    example: 'device_550e8400-e29b-41d4-a716-446655440000',
    maxLength: 255,
  })
  @IsOptional()
  @IsString()
  @MaxLength(255, { message: getValidationMessage('deviceIdMaxLength') })
  deviceId?: string;

  @ApiPropertyOptional({
    description: 'Device fingerprint for enhanced security',
    example: 'fp_abc123def456',
    maxLength: 128,
  })
  @IsOptional()
  @IsString()
  @MaxLength(128, { message: getValidationMessage('deviceFingerprintMaxLength') })
  deviceFingerprint?: string;

  @ApiPropertyOptional({
    description: 'Whether to rotate refresh token (default: true)',
    example: true,
    default: true,
  })
  @IsOptional()
  @IsBoolean({ message: getValidationMessage('rotateTokenInvalid') })
  rotateToken?: boolean = true;

  @ApiPropertyOptional({
    description: 'Whether to extend session (default: false)',
    example: false,
    default: false,
  })
  @IsOptional()
  @IsBoolean({ message: getValidationMessage('extendSessionInvalid') })
  extendSession?: boolean = false;

  @ApiPropertyOptional({
    description: 'Whether to revoke entire token family on compromise (default: true)',
    example: true,
    default: true,
  })
  @IsOptional()
  @IsBoolean({ message: getValidationMessage('revokeFamilyOnCompromiseInvalid') })
  revokeFamilyOnCompromise?: boolean = true;

  @ApiPropertyOptional({
    description: 'Session extension in seconds (if extendSession is true)',
    example: 3600,
    minimum: SESSION_CONFIG?.MAX_EXTENSION_MINUTES ? SESSION_CONFIG.MAX_EXTENSION_MINUTES * 60 : 60,
    maximum: 86400,
  })
  @IsOptional()
  @IsNumber()
  @Min(SESSION_CONFIG?.MAX_EXTENSION_MINUTES ? SESSION_CONFIG.MAX_EXTENSION_MINUTES * 60 : 60, {
    message: getValidationMessage('extensionSecondsInvalid', [
      SESSION_CONFIG?.MAX_EXTENSION_MINUTES ? SESSION_CONFIG.MAX_EXTENSION_MINUTES * 60 : 60,
      86400,
    ]),
  })
  @Max(86400, {
    message: getValidationMessage('extensionSecondsInvalid', [
      SESSION_CONFIG?.MAX_EXTENSION_MINUTES ? SESSION_CONFIG.MAX_EXTENSION_MINUTES * 60 : 60,
      86400,
    ]),
  })
  extensionSeconds?: number;

  @ApiPropertyOptional({
    description: 'Expected token version (for optimistic locking)',
    example: 5,
    minimum: 1,
  })
  @IsOptional()
  @IsNumber()
  @Min(1, { message: getValidationMessage('expectedVersionInvalid') })
  expectedVersion?: number;

  @ApiPropertyOptional({
    description: 'Client information for security tracking',
    type: RefreshClientInfoDto,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => RefreshClientInfoDto)
  clientInfo?: RefreshClientInfoDto;

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

  /**
   * Create a new refresh token request DTO
   */
  constructor(
    refreshToken?: string,
    deviceId?: string,
    rotateToken?: boolean,
    extendSession?: boolean,
    clientInfo?: RefreshClientInfoDto,
    correlationId?: string,
    locale?: SupportedLocale
  ) {
    this.refreshToken = refreshToken;
    this.deviceId = deviceId;
    this.rotateToken = rotateToken ?? true;
    this.extendSession = extendSession ?? false;
    this.clientInfo = clientInfo;
    this.correlationId = correlationId;
    this.locale = locale ?? 'en';
  }

  // ============================================================
  // Helper Methods
  // ============================================================

  /**
   * Check if refresh token is provided in body
   */
  hasRefreshToken(): boolean {
    return !!this.refreshToken && this.refreshToken.length > 0;
  }

  /**
   * Check if device ID is provided
   */
  hasDeviceId(): boolean {
    return !!this.deviceId && this.deviceId.length > 0;
  }

  /**
   * Check if device fingerprint is provided
   */
  hasDeviceFingerprint(): boolean {
    return !!this.deviceFingerprint && this.deviceFingerprint.length > 0;
  }

  /**
   * Check if should rotate token
   */
  shouldRotateToken(): boolean {
    return this.rotateToken !== false; // Default true
  }

  /**
   * Check if should extend session
   */
  shouldExtendSession(): boolean {
    return this.extendSession === true;
  }

  /**
   * Check if should revoke family on compromise
   */
  shouldRevokeFamilyOnCompromise(): boolean {
    return this.revokeFamilyOnCompromise !== false; // Default true
  }

  /**
   * Get extension seconds (with fallback to default)
   */
  getExtensionSeconds(): number {
    return this.extensionSeconds || SESSION_CONFIG?.MAX_EXTENSION_MINUTES ? SESSION_CONFIG.MAX_EXTENSION_MINUTES * 60 : 3600;
  }

  /**
   * Check if IP address is provided in client info
   */
  hasIpAddress(): boolean {
    return !!this.clientInfo?.ipAddress && this.clientInfo.ipAddress.length > 0;
  }

  /**
   * Check if user agent is provided in client info
   */
  hasUserAgent(): boolean {
    return !!this.clientInfo?.userAgent && this.clientInfo.userAgent.length > 0;
  }

  /**
   * Check if district is provided (Bangladesh specific)
   */
  hasDistrict(): boolean {
    return !!this.clientInfo?.district && this.clientInfo.district.length > 0;
  }

  /**
   * Check if mobile operator is provided (Bangladesh specific)
   */
  hasMobileOperator(): boolean {
    return !!this.clientInfo?.mobileOperator && this.clientInfo.mobileOperator.length > 0;
  }

  /**
   * Check if network type is provided (Bangladesh specific)
   */
  hasNetworkType(): boolean {
    return !!this.clientInfo?.networkType && this.clientInfo.networkType.length > 0;
  }

  /**
   * Get masked refresh token for logging
   */
  getMaskedRefreshToken(): string {
    if (!this.refreshToken) return '***';
    if (this.refreshToken.length <= 20) return '***';
    const prefix = this.refreshToken.substring(0, 8);
    const suffix = this.refreshToken.substring(this.refreshToken.length - 4);
    return `${prefix}...${suffix}`;
  }

  /**
   * Get masked device ID for logging
   */
  getMaskedDeviceId(): string {
    if (!this.deviceId) return '***';
    if (this.deviceId.length <= 8) return '***';
    const prefix = this.deviceId.substring(0, 4);
    const suffix = this.deviceId.substring(this.deviceId.length - 4);
    return `${prefix}...${suffix}`;
  }

  /**
   * Convert to string for logging
   */
  public toString(): string {
    return `RefreshTokenRequestDto(
      hasRefreshToken=${this.hasRefreshToken()}, 
      hasDeviceId=${this.hasDeviceId()}, 
      rotateToken=${this.shouldRotateToken()}, 
      extendSession=${this.shouldExtendSession()}, 
      hasClientInfo=${!!this.clientInfo}, 
      hasDistrict=${this.hasDistrict()}, 
      hasNetworkType=${this.hasNetworkType()}, 
      locale=${this.locale}
    )`;
  }

  /**
   * Get summary for logging
   */
  public toJSON(): Record<string, unknown> {
    return {
      hasRefreshToken: this.hasRefreshToken(),
      maskedRefreshToken: this.getMaskedRefreshToken(),
      hasDeviceId: this.hasDeviceId(),
      maskedDeviceId: this.getMaskedDeviceId(),
      hasDeviceFingerprint: this.hasDeviceFingerprint(),
      rotateToken: this.shouldRotateToken(),
      extendSession: this.shouldExtendSession(),
      revokeFamilyOnCompromise: this.shouldRevokeFamilyOnCompromise(),
      extensionSeconds: this.getExtensionSeconds(),
      expectedVersion: this.expectedVersion,
      hasCorrelationId: !!this.correlationId,
      hasClientInfo: !!this.clientInfo,
      hasIpAddress: this.hasIpAddress(),
      hasUserAgent: this.hasUserAgent(),
      hasDistrict: this.hasDistrict(),
      hasMobileOperator: this.hasMobileOperator(),
      hasNetworkType: this.hasNetworkType(),
      locale: this.locale,
    };
  }
}

// ============================================================
// Simplified Refresh Token Request DTO (For common use cases)
// ============================================================

/**
 * Simplified Refresh Token Request DTO
 * For cases where only the refresh token is needed
 */
export class SimpleRefreshTokenRequestDto {
  @ApiProperty({
    description: 'Refresh token (JWT)',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
    required: true,
    minLength: 32,
    maxLength: 512,
  })
  @IsString({ message: getValidationMessage('refreshTokenInvalid') })
  @IsNotEmpty({ message: getValidationMessage('refreshTokenRequired') })
  @MinLength(REFRESH_TOKEN_MIN_LENGTH, {
    message: getValidationMessage('refreshTokenMinLength', [REFRESH_TOKEN_MIN_LENGTH]),
  })
  @MaxLength(REFRESH_TOKEN_MAX_LENGTH, {
    message: getValidationMessage('refreshTokenMaxLength', [REFRESH_TOKEN_MAX_LENGTH]),
  })
  refreshToken: string;

  constructor(refreshToken: string) {
    this.refreshToken = refreshToken;
  }
}

// ============================================================
// Cookie-based Refresh Token Request DTO
// ============================================================

/**
 * Cookie-based Refresh Token Request DTO
 * For cases where refresh token is provided in cookie
 */
export class CookieRefreshTokenRequestDto {
  @ApiPropertyOptional({
    description: 'Device identifier for session tracking',
    example: 'device_550e8400-e29b-41d4-a716-446655440000',
    maxLength: 255,
  })
  @IsOptional()
  @IsString()
  @MaxLength(255, { message: getValidationMessage('deviceIdMaxLength') })
  deviceId?: string;

  @ApiPropertyOptional({
    description: 'Device fingerprint for enhanced security',
    example: 'fp_abc123def456',
    maxLength: 128,
  })
  @IsOptional()
  @IsString()
  @MaxLength(128, { message: getValidationMessage('deviceFingerprintMaxLength') })
  deviceFingerprint?: string;

  @ApiPropertyOptional({
    description: 'Whether to rotate refresh token (default: true)',
    example: true,
    default: true,
  })
  @IsOptional()
  @IsBoolean({ message: getValidationMessage('rotateTokenInvalid') })
  rotateToken?: boolean = true;

  @ApiPropertyOptional({
    description: 'Whether to extend session (default: false)',
    example: false,
    default: false,
  })
  @IsOptional()
  @IsBoolean({ message: getValidationMessage('extendSessionInvalid') })
  extendSession?: boolean = false;

  @ApiPropertyOptional({
    description: 'Client information for security tracking',
    type: RefreshClientInfoDto,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => RefreshClientInfoDto)
  clientInfo?: RefreshClientInfoDto;

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
}

// ============================================================
// Type Exports
// ============================================================

export type { SupportedLocale as SupportedLocaleType };
export type { MobileOperator as MobileOperatorType };
export type { NetworkType as NetworkTypeType };
