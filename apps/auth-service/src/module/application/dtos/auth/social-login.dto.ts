/**
 * Social Login DTOs - Pure Data Transport Objects (Enterprise Enhanced v2.0)
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module application/dtos/auth/social-login.dto
 * 
 * @description
 * Data transfer objects for social authentication (OAuth) with enterprise features.
 * ENTERPRISE ENHANCEMENTS (v2.0):
 * ✅ Multi-language validation messages (English/Bengali)
 * ✅ Rate limit metadata support
 * ✅ Distributed tracing with correlationId
 * ✅ Device fingerprint for fraud prevention
 * ✅ PKCE (Proof Key for Code Exchange) support
 * ✅ Centralized token configuration from shared-constants
 * ✅ Reusable Match decorator from shared-utils
 * 
 * Enterprise Rules:
 * ✅ ONLY data transport
 * ✅ Validation decorators only (class-validator)
 * ✅ API documentation decorators (Swagger)
 * ✅ Bangladesh-specific providers included
 * ✅ Integrated with shared-constants, shared-types, and shared-utils
 */

import { 
  IsString, 
  IsNotEmpty, 
  IsOptional, 
  IsBoolean, 
  IsEnum,
  IsUUID,
  MaxLength,
  IsEmail,
  Matches,
  MinLength,
  IsNumber,
  Min,
  Max,
  IsDate,
  ValidateNested,
  IsObject,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

// ✅ Phase-1: Import from shared-constants (single source of truth)
import { 
  SOCIAL_PROVIDERS, 
  REGEX_PHONE, 
  TOKEN_CONFIG,
  ENV_CONFIG,
} from '@vubon/shared-constants';

// ✅ Phase-1: Import types from shared-types
import type { SocialProvider, TokenType, AuditMetadata } from '@vubon/shared-types';

// ✅ ENTERPRISE ENHANCEMENT: Import reusable Match decorator from shared-utils
import { Match } from '@vubon/shared-utils';

// ============================================================
// Environment detection
// ============================================================

const IS_PRODUCTION = ENV_CONFIG?.IS_PRODUCTION ?? false;

// ============================================================
// Constants (Re-export for convenience)
// ============================================================

/**
 * Social providers including Bangladesh-specific options
 * Re-exported from shared-constants for backward compatibility
 */
export const SocialProvider = SOCIAL_PROVIDERS;

// ============================================================
// ✅ ENTERPRISE ENHANCEMENT: Multi-language Validation Messages
// ============================================================

/**
 * Validation messages in English and Bengali
 */
const VALIDATION_MESSAGES = {
  en: {
    providerRequired: 'Provider is required',
    providerInvalid: 'Invalid social provider',
    accessTokenRequired: 'Access token is required',
    accessTokenMinLength: (min: number) => `Access token must be at least ${min} characters`,
    accessTokenMaxLength: (max: number) => `Access token cannot exceed ${max} characters`,
    deviceIdMaxLength: 'Device ID cannot exceed 255 characters',
    stateMaxLength: 'State cannot exceed 255 characters',
    codeVerifierMaxLength: 'Code verifier cannot exceed 128 characters',
    phoneRequired: 'Phone number is required',
    phoneInvalid: 'Please provide a valid Bangladesh phone number (e.g., +8801712345678)',
    otpRequired: 'OTP code is required',
    otpInvalid: 'OTP code must be exactly 6 digits',
    otpMismatch: 'OTP code and confirm OTP code do not match',
    emailInvalid: 'Please provide a valid email address',
    languageInvalid: 'Language must be en or bn',
    reasonMaxLength: 'Reason cannot exceed 500 characters',
  },
  bn: {
    providerRequired: 'প্রোভাইডার প্রয়োজন',
    providerInvalid: 'ভুল সোশ্যাল প্রোভাইডার',
    accessTokenRequired: 'অ্যাক্সেস টোকেন প্রয়োজন',
    accessTokenMinLength: (min: number) => `অ্যাক্সেস টোকেন কমপক্ষে ${min} অক্ষরের হতে হবে`,
    accessTokenMaxLength: (max: number) => `অ্যাক্সেস টোকেন সর্বোচ্চ ${max} অক্ষরের হতে পারে`,
    deviceIdMaxLength: 'ডিভাইস আইডি সর্বোচ্চ ২৫৫ অক্ষর হতে পারে',
    stateMaxLength: 'স্টেট সর্বোচ্চ ২৫৫ অক্ষর হতে পারে',
    codeVerifierMaxLength: 'কোড ভেরিফায়ার সর্বোচ্চ ১২৮ অক্ষর হতে পারে',
    phoneRequired: 'ফোন নম্বর প্রয়োজন',
    phoneInvalid: 'একটি সঠিক বাংলাদেশ ফোন নম্বর দিন (যেমন: +8801712345678)',
    otpRequired: 'OTP কোড প্রয়োজন',
    otpInvalid: 'OTP কোড অবশ্যই ৬ ডিজিটের হতে হবে',
    otpMismatch: 'OTP কোড এবং কনফার্ম OTP কোড মিলছে না',
    emailInvalid: 'একটি সঠিক ইমেইল ঠিকানা দিন',
    languageInvalid: 'ভাষা ইংরেজি (en) বা বাংলা (bn) হতে হবে',
    reasonMaxLength: 'কারণ সর্বোচ্চ ৫০০ অক্ষর হতে পারে',
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
// ✅ ENTERPRISE ENHANCEMENT: Rate Limit Metadata DTO
// ============================================================

/**
 * Rate limit metadata for social login attempts
 */
export class SocialLoginRateLimitDto {
  @ApiPropertyOptional({ description: 'Rate limit window (seconds)', example: 60 })
  @IsOptional()
  @IsNumber()
  @Min(1)
  windowSeconds?: number;

  @ApiPropertyOptional({ description: 'Max requests allowed', example: 10 })
  @IsOptional()
  @IsNumber()
  @Min(1)
  maxRequests?: number;

  @ApiPropertyOptional({ description: 'Remaining requests', example: 9 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  remaining?: number;

  @ApiPropertyOptional({ description: 'Reset timestamp', example: '2024-01-01T00:01:00.000Z' })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  resetAt?: Date;
}

// ============================================================
// ✅ ENTERPRISE ENHANCEMENT: Client Info for Security Audit
// ============================================================

/**
 * Client information for security audit and fraud detection
 */
export class SocialLoginClientInfoDto {
  @ApiPropertyOptional({
    description: 'Device fingerprint for fraud detection',
    example: 'fp_abc123def456',
    maxLength: 128,
  })
  @IsOptional()
  @IsString()
  @MaxLength(128)
  deviceFingerprint?: string;

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
    example: 'bn',
  })
  @IsOptional()
  @IsString()
  @MaxLength(10)
  language?: string;

  // Bangladesh specific
  @ApiPropertyOptional({
    description: 'District (Bangladesh specific)',
    example: 'Dhaka',
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  district?: string;

  @ApiPropertyOptional({
    description: 'Network type (Bangladesh specific)',
    example: '4g',
    enum: ['2g', '3g', '4g', '5g', 'wifi', 'unknown'],
  })
  @IsOptional()
  @IsEnum(['2g', '3g', '4g', '5g', 'wifi', 'unknown'])
  networkType?: string;
}

// ============================================================
// Request DTOs (Enterprise Enhanced)
// ============================================================

/**
 * Social Login Request DTO (Enhanced)
 * 
 * @example
 * {
 *   "provider": "google",
 *   "accessToken": "ya29.a0AfH6S...",
 *   "deviceId": "device_550e8400-e29b-41d4-a716-446655440000",
 *   "deviceFingerprint": "fp_abc123",
 *   "rememberMe": true,
 *   "correlationId": "corr_abc123"
 * }
 */
export class SocialLoginDto {
  @ApiProperty({
    description: 'Social provider name',
    enum: SocialProvider,
    example: SocialProvider.GOOGLE,
    required: true,
  })
  @IsEnum(SocialProvider, { 
    message: () => getValidationMessage('providerInvalid') 
  })
  @IsNotEmpty({ 
    message: () => getValidationMessage('providerRequired') 
  })
  provider: SocialProvider;

  @ApiProperty({
    description: 'OAuth access token from social provider',
    example: 'ya29.a0AfH6S...',
    required: true,
    minLength: TOKEN_CONFIG.MIN_LENGTH.ACCESS,
    maxLength: TOKEN_CONFIG.MAX_LENGTH.ACCESS,
  })
  @IsString({ message: 'Access token must be a string' })
  @IsNotEmpty({ 
    message: () => getValidationMessage('accessTokenRequired') 
  })
  @MinLength(TOKEN_CONFIG.MIN_LENGTH.ACCESS, { 
    message: () => getValidationMessage('accessTokenMinLength', [TOKEN_CONFIG.MIN_LENGTH.ACCESS]) 
  })
  @MaxLength(TOKEN_CONFIG.MAX_LENGTH.ACCESS, { 
    message: () => getValidationMessage('accessTokenMaxLength', [TOKEN_CONFIG.MAX_LENGTH.ACCESS]) 
  })
  accessToken: string;

  @ApiPropertyOptional({
    description: 'Device identifier for session tracking',
    example: 'device_550e8400-e29b-41d4-a716-446655440000',
    maxLength: 255,
  })
  @IsOptional()
  @IsString({ message: 'Device ID must be a string' })
  @MaxLength(255, { 
    message: () => getValidationMessage('deviceIdMaxLength') 
  })
  deviceId?: string;

  @ApiPropertyOptional({
    description: 'Device fingerprint for fraud prevention',
    example: 'fp_abc123def456',
    maxLength: 128,
  })
  @IsOptional()
  @IsString()
  @MaxLength(128)
  deviceFingerprint?: string;

  @ApiPropertyOptional({
    description: 'Remember me for extended session',
    example: true,
    default: false,
  })
  @IsOptional()
  @IsBoolean({ message: 'Remember me must be a boolean' })
  rememberMe?: boolean = false;

  @ApiPropertyOptional({
    description: 'State parameter for CSRF protection',
    example: 'random-state-string-123',
    maxLength: 255,
  })
  @IsOptional()
  @IsString({ message: 'State must be a string' })
  @MaxLength(255, { 
    message: () => getValidationMessage('stateMaxLength') 
  })
  state?: string;

  @ApiPropertyOptional({
    description: 'OAuth code verifier for PKCE',
    example: 'dBjftJeZ4CVP-mB92K27uhbUJU1p1r_wW1gFWFOEjXk',
    maxLength: 128,
  })
  @IsOptional()
  @IsString({ message: 'Code verifier must be a string' })
  @MaxLength(128, { 
    message: () => getValidationMessage('codeVerifierMaxLength') 
  })
  codeVerifier?: string;

  // ✅ ENTERPRISE ENHANCEMENT: Correlation ID for distributed tracing
  @ApiPropertyOptional({
    description: 'Correlation ID for distributed tracing',
    example: 'corr_550e8400-e29b-41d4-a716-446655440000',
  })
  @IsOptional()
  @IsUUID()
  correlationId?: string;

  // ✅ ENTERPRISE ENHANCEMENT: Client info for security
  @ApiPropertyOptional({
    description: 'Client information for security tracking',
    type: SocialLoginClientInfoDto,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => SocialLoginClientInfoDto)
  clientInfo?: SocialLoginClientInfoDto;

  // ✅ ENTERPRISE ENHANCEMENT: Rate limit metadata
  @ApiPropertyOptional({
    description: 'Rate limit metadata',
    type: SocialLoginRateLimitDto,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => SocialLoginRateLimitDto)
  rateLimit?: SocialLoginRateLimitDto;

  constructor(
    provider: SocialProvider,
    accessToken: string,
    deviceId?: string,
    rememberMe?: boolean,
    state?: string,
    codeVerifier?: string,
    correlationId?: string,
    deviceFingerprint?: string,
    clientInfo?: SocialLoginClientInfoDto
  ) {
    this.provider = provider;
    this.accessToken = accessToken;
    this.deviceId = deviceId;
    this.rememberMe = rememberMe ?? false;
    this.state = state;
    this.codeVerifier = codeVerifier;
    this.correlationId = correlationId;
    this.deviceFingerprint = deviceFingerprint;
    this.clientInfo = clientInfo;
  }

  /**
   * Helper method to get validation message in appropriate language
   */
  getMessage(key: keyof typeof VALIDATION_MESSAGES.en, ...args: unknown[]): string {
    const locale = this.clientInfo?.language === 'bn' ? 'bn' : 'en';
    return getValidationMessage(key, args, locale);
  }

  /**
   * Get user agent from client info
   */
  getUserAgent(): string | undefined {
    return this.clientInfo?.userAgent;
  }

  /**
   * Get IP address from client info
   */
  getIpAddress(): string | undefined {
    return this.clientInfo?.ipAddress;
  }
}

// ============================================================
// ✅ ENTERPRISE ENHANCEMENT: Social Phone Login DTO (Bangladesh specific)
// ============================================================

/**
 * Social Login with Phone Request DTO (Bangladesh specific - WhatsApp/Imo/Telegram)
 * 
 * @example
 * {
 *   "provider": "whatsapp",
 *   "phoneNumber": "+8801712345678",
 *   "otpCode": "123456",
 *   "confirmOtpCode": "123456",
 *   "deviceId": "device_550e8400-e29b-41d4-a716-446655440000",
 *   "rememberMe": true,
 *   "locale": "bn",
 *   "correlationId": "corr_abc123"
 * }
 */
export class SocialPhoneLoginDto {
  @ApiProperty({
    description: 'Social provider name (WhatsApp, Imo, Telegram)',
    enum: [SocialProvider.WHATSAPP, SocialProvider.IMO, SocialProvider.TELEGRAM],
    example: SocialProvider.WHATSAPP,
    required: true,
  })
  @IsEnum([SocialProvider.WHATSAPP, SocialProvider.IMO, SocialProvider.TELEGRAM], { 
    message: () => getValidationMessage('providerInvalid') 
  })
  @IsNotEmpty({ 
    message: () => getValidationMessage('providerRequired') 
  })
  provider: SocialProvider;

  @ApiProperty({
    description: 'Bangladesh phone number (E.164 format)',
    example: '+8801712345678',
    required: true,
  })
  @IsString({ message: 'Phone number must be a string' })
  @IsNotEmpty({ 
    message: () => getValidationMessage('phoneRequired') 
  })
  @Matches(REGEX_PHONE.BANGLADESH, { 
    message: () => getValidationMessage('phoneInvalid') 
  })
  phoneNumber: string;

  @ApiProperty({
    description: 'OTP code for verification',
    example: '123456',
    required: true,
    minLength: 6,
    maxLength: 6,
  })
  @IsString({ message: 'OTP code must be a string' })
  @IsNotEmpty({ 
    message: () => getValidationMessage('otpRequired') 
  })
  @Matches(/^\d{6}$/, { 
    message: () => getValidationMessage('otpInvalid') 
  })
  otpCode: string;

  @ApiPropertyOptional({
    description: 'Confirm OTP code (must match otpCode)',
    example: '123456',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Confirm OTP code must be a string' })
  @Match('otpCode', { 
    message: () => getValidationMessage('otpMismatch') 
  })
  confirmOtpCode?: string;

  @ApiPropertyOptional({
    description: 'Email address (optional, for account recovery)',
    example: 'user@vubon.com.bd',
  })
  @IsOptional()
  @IsEmail({}, { 
    message: () => getValidationMessage('emailInvalid') 
  })
  email?: string;

  @ApiPropertyOptional({
    description: 'Device identifier for session tracking',
    example: 'device_550e8400-e29b-41d4-a716-446655440000',
    maxLength: 255,
  })
  @IsOptional()
  @IsString({ message: 'Device ID must be a string' })
  @MaxLength(255, { 
    message: () => getValidationMessage('deviceIdMaxLength') 
  })
  deviceId?: string;

  @ApiPropertyOptional({
    description: 'Device fingerprint for fraud prevention',
    example: 'fp_abc123def456',
    maxLength: 128,
  })
  @IsOptional()
  @IsString()
  @MaxLength(128)
  deviceFingerprint?: string;

  @ApiPropertyOptional({
    description: 'Remember me for extended session',
    example: true,
    default: false,
  })
  @IsOptional()
  @IsBoolean({ message: 'Remember me must be a boolean' })
  rememberMe?: boolean = false;

  @ApiPropertyOptional({
    description: 'Preferred language for OTP message',
    example: 'bn',
    enum: ['en', 'bn'],
    default: 'en',
  })
  @IsOptional()
  @IsEnum(['en', 'bn'], { 
    message: () => getValidationMessage('languageInvalid') 
  })
  locale?: 'en' | 'bn' = 'en';

  // ✅ ENTERPRISE ENHANCEMENT: Correlation ID for distributed tracing
  @ApiPropertyOptional({
    description: 'Correlation ID for distributed tracing',
    example: 'corr_550e8400-e29b-41d4-a716-446655440000',
  })
  @IsOptional()
  @IsUUID()
  correlationId?: string;

  // ✅ ENTERPRISE ENHANCEMENT: Rate limit metadata
  @ApiPropertyOptional({
    description: 'Rate limit metadata',
    type: SocialLoginRateLimitDto,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => SocialLoginRateLimitDto)
  rateLimit?: SocialLoginRateLimitDto;

  constructor(
    provider: SocialProvider,
    phoneNumber: string,
    otpCode: string,
    deviceId?: string,
    rememberMe?: boolean,
    confirmOtpCode?: string,
    email?: string,
    locale?: 'en' | 'bn',
    correlationId?: string,
    deviceFingerprint?: string
  ) {
    this.provider = provider;
    this.phoneNumber = phoneNumber;
    this.otpCode = otpCode;
    this.deviceId = deviceId;
    this.rememberMe = rememberMe ?? false;
    this.confirmOtpCode = confirmOtpCode;
    this.email = email;
    this.locale = locale ?? 'en';
    this.correlationId = correlationId;
    this.deviceFingerprint = deviceFingerprint;
  }
}

// ============================================================
// Social Link Request DTO (Enhanced)
// ============================================================

/**
 * Social Link Request DTO
 * Note: userId is NOT accepted from client - comes from authenticated JWT
 */
export class SocialLinkDto {
  @ApiProperty({
    description: 'Social provider name',
    enum: SocialProvider,
    example: SocialProvider.GOOGLE,
    required: true,
  })
  @IsEnum(SocialProvider, { 
    message: () => getValidationMessage('providerInvalid') 
  })
  @IsNotEmpty({ 
    message: () => getValidationMessage('providerRequired') 
  })
  provider: SocialProvider;

  @ApiProperty({
    description: 'OAuth access token from social provider',
    example: 'ya29.a0AfH6S...',
    required: true,
    minLength: TOKEN_CONFIG.MIN_LENGTH.ACCESS,
    maxLength: TOKEN_CONFIG.MAX_LENGTH.ACCESS,
  })
  @IsString({ message: 'Access token must be a string' })
  @IsNotEmpty({ 
    message: () => getValidationMessage('accessTokenRequired') 
  })
  @MinLength(TOKEN_CONFIG.MIN_LENGTH.ACCESS, { 
    message: () => getValidationMessage('accessTokenMinLength', [TOKEN_CONFIG.MIN_LENGTH.ACCESS]) 
  })
  @MaxLength(TOKEN_CONFIG.MAX_LENGTH.ACCESS, { 
    message: () => getValidationMessage('accessTokenMaxLength', [TOKEN_CONFIG.MAX_LENGTH.ACCESS]) 
  })
  accessToken: string;

  @ApiPropertyOptional({
    description: 'Make this the primary social account',
    example: true,
    default: false,
  })
  @IsOptional()
  @IsBoolean({ message: 'Make primary must be a boolean' })
  makePrimary?: boolean = false;

  @ApiPropertyOptional({
    description: 'State parameter for CSRF protection',
    example: 'random-state-string-123',
    maxLength: 255,
  })
  @IsOptional()
  @IsString({ message: 'State must be a string' })
  @MaxLength(255, { 
    message: () => getValidationMessage('stateMaxLength') 
  })
  state?: string;

  @ApiPropertyOptional({
    description: 'OAuth code verifier for PKCE',
    example: 'dBjftJeZ4CVP-mB92K27uhbUJU1p1r_wW1gFWFOEjXk',
    maxLength: 128,
  })
  @IsOptional()
  @IsString({ message: 'Code verifier must be a string' })
  @MaxLength(128, { 
    message: () => getValidationMessage('codeVerifierMaxLength') 
  })
  codeVerifier?: string;

  // ✅ ENTERPRISE ENHANCEMENT: Correlation ID for distributed tracing
  @ApiPropertyOptional({
    description: 'Correlation ID for distributed tracing',
    example: 'corr_550e8400-e29b-41d4-a716-446655440000',
  })
  @IsOptional()
  @IsUUID()
  correlationId?: string;

  constructor(
    provider: SocialProvider, 
    accessToken: string, 
    makePrimary?: boolean,
    state?: string,
    codeVerifier?: string,
    correlationId?: string
  ) {
    this.provider = provider;
    this.accessToken = accessToken;
    this.makePrimary = makePrimary ?? false;
    this.state = state;
    this.codeVerifier = codeVerifier;
    this.correlationId = correlationId;
  }
}

// ============================================================
// Social Unlink Request DTO (Enhanced)
// ============================================================

/**
 * Social Unlink Request DTO
 * Note: userId is NOT accepted from client - comes from authenticated JWT
 */
export class SocialUnlinkDto {
  @ApiProperty({
    description: 'Social provider name to unlink',
    enum: SocialProvider,
    example: SocialProvider.GOOGLE,
    required: true,
  })
  @IsEnum(SocialProvider, { 
    message: () => getValidationMessage('providerInvalid') 
  })
  @IsNotEmpty({ 
    message: () => getValidationMessage('providerRequired') 
  })
  provider: SocialProvider;

  @ApiPropertyOptional({
    description: 'Whether to keep user data after unlinking',
    example: true,
    default: true,
  })
  @IsOptional()
  @IsBoolean({ message: 'Keep data must be a boolean' })
  keepData?: boolean = true;

  @ApiPropertyOptional({
    description: 'Reason for unlinking (for audit)',
    example: 'User requested removal',
    maxLength: 500,
  })
  @IsOptional()
  @IsString({ message: 'Reason must be a string' })
  @MaxLength(500, { 
    message: () => getValidationMessage('reasonMaxLength') 
  })
  reason?: string;

  // ✅ ENTERPRISE ENHANCEMENT: Correlation ID for distributed tracing
  @ApiPropertyOptional({
    description: 'Correlation ID for distributed tracing',
    example: 'corr_550e8400-e29b-41d4-a716-446655440000',
  })
  @IsOptional()
  @IsUUID()
  correlationId?: string;

  constructor(provider: SocialProvider, keepData?: boolean, reason?: string, correlationId?: string) {
    this.provider = provider;
    this.keepData = keepData ?? true;
    this.reason = reason;
    this.correlationId = correlationId;
  }
}

// ============================================================
// Social Auth Callback Query DTO (for OAuth redirect)
// ============================================================

/**
 * Social Auth Callback Query DTO (for OAuth redirect)
 */
export class SocialCallbackQueryDto {
  @ApiProperty({
    description: 'Authorization code from social provider',
    example: '4/0AY0e-g7...',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  code: string;

  @ApiProperty({
    description: 'State parameter for CSRF validation',
    example: 'random-state-string-123',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  state: string;

  @ApiPropertyOptional({
    description: 'Error from social provider',
    example: 'access_denied',
  })
  @IsOptional()
  @IsString()
  error?: string;

  @ApiPropertyOptional({
    description: 'Error description from social provider',
    example: 'User denied access',
  })
  @IsOptional()
  @IsString()
  error_description?: string;

  @ApiPropertyOptional({
    description: 'OAuth code verifier for PKCE',
    example: 'dBjftJeZ4CVP-mB92K27uhbUJU1p1r_wW1gFWFOEjXk',
  })
  @IsOptional()
  @IsString()
  code_verifier?: string;

  constructor(
    code: string, 
    state: string, 
    error?: string, 
    error_description?: string,
    code_verifier?: string
  ) {
    this.code = code;
    this.state = state;
    this.error = error;
    this.error_description = error_description;
    this.code_verifier = code_verifier;
  }
}

// ============================================================
// Response DTOs (Enterprise Enhanced)
// ============================================================

/**
 * Social User Info (from provider)
 */
export class SocialUserInfoDto {
  @ApiProperty({ description: 'User ID from provider' })
  id: string;

  @ApiProperty({ description: 'User email from provider' })
  email: string;

  @ApiProperty({ description: 'User full name from provider' })
  name: string;

  @ApiPropertyOptional({ description: 'First name from provider' })
  firstName?: string;

  @ApiPropertyOptional({ description: 'Last name from provider' })
  lastName?: string;

  @ApiPropertyOptional({ description: 'Profile picture URL' })
  picture?: string;

  @ApiPropertyOptional({ description: 'Is email verified by provider' })
  emailVerified?: boolean;

  @ApiPropertyOptional({ description: 'Phone number (for WhatsApp/Imo)' })
  phoneNumber?: string;

  @ApiPropertyOptional({ description: 'Is phone verified by provider' })
  phoneVerified?: boolean;

  @ApiPropertyOptional({ description: 'Provider display name' })
  providerDisplayName?: string;

  constructor(
    id: string,
    email: string,
    name: string,
    picture?: string,
    emailVerified?: boolean,
    firstName?: string,
    lastName?: string,
    phoneNumber?: string,
    phoneVerified?: boolean,
    providerDisplayName?: string
  ) {
    this.id = id;
    this.email = email;
    this.name = name;
    this.picture = picture;
    this.emailVerified = emailVerified;
    this.firstName = firstName;
    this.lastName = lastName;
    this.phoneNumber = phoneNumber;
    this.phoneVerified = phoneVerified;
    this.providerDisplayName = providerDisplayName;
  }
}

/**
 * Social Login Response DTO (Enhanced)
 */
export class SocialLoginResponseDto {
  @ApiProperty({
    description: 'JWT access token',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  accessToken: string;

  @ApiProperty({
    description: 'Refresh token',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  refreshToken: string;

  @ApiProperty({
    description: 'Access token expiry time in seconds',
    example: 900,
  })
  expiresIn: number;

  @ApiProperty({
    description: 'Refresh token expiry time in seconds',
    example: 604800,
  })
  refreshExpiresIn: number;

  @ApiProperty({
    description: 'Whether this is a new user (just registered)',
    example: false,
  })
  isNewUser: boolean;

  @ApiPropertyOptional({
    description: 'Whether this is a new connection (existing user linking new provider)',
    example: false,
  })
  isNewConnection?: boolean;

  @ApiProperty({
    description: 'Authenticated user information',
    type: 'object',
    properties: {
      id: { type: 'string', example: 'usr_550e8400-e29b-41d4-a716-446655440000' },
      email: { type: 'string', example: 'user@vubon.com.bd' },
      fullName: { type: 'string', example: 'John Doe' },
      role: { type: 'string', enum: ['USER', 'ADMIN', 'MODERATOR', 'SUPER_ADMIN'], example: 'USER' },
      isEmailVerified: { type: 'boolean', example: true },
      hasSocialLogin: { type: 'boolean', example: true },
    },
  })
  user: {
    id: string;
    email: string;
    fullName: string;
    role: string;
    isEmailVerified?: boolean;
    hasSocialLogin?: boolean;
  };

  @ApiPropertyOptional({
    description: 'Session ID for management',
    example: 'sess_550e8400-e29b-41d4-a716-446655440000',
  })
  sessionId?: string;

  @ApiPropertyOptional({
    description: 'Whether MFA is required',
    example: false,
  })
  mfaRequired?: boolean;

  // ✅ ENTERPRISE ENHANCEMENT: Correlation ID for distributed tracing
  @ApiPropertyOptional({
    description: 'Correlation ID for distributed tracing',
    example: 'corr_550e8400-e29b-41d4-a716-446655440000',
  })
  correlationId?: string;

  // ✅ ENTERPRISE ENHANCEMENT: Rate limit metadata
  @ApiPropertyOptional({
    description: 'Rate limit metadata',
    type: SocialLoginRateLimitDto,
  })
  rateLimit?: SocialLoginRateLimitDto;

  constructor(
    accessToken: string,
    refreshToken: string,
    expiresIn: number,
    refreshExpiresIn: number,
    isNewUser: boolean,
    user: {
      id: string;
      email: string;
      fullName: string;
      role: string;
      isEmailVerified?: boolean;
      hasSocialLogin?: boolean;
    },
    isNewConnection?: boolean,
    sessionId?: string,
    mfaRequired?: boolean,
    correlationId?: string,
    rateLimit?: SocialLoginRateLimitDto
  ) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
    this.expiresIn = expiresIn;
    this.refreshExpiresIn = refreshExpiresIn;
    this.isNewUser = isNewUser;
    this.isNewConnection = isNewConnection;
    this.user = user;
    this.sessionId = sessionId;
    this.mfaRequired = mfaRequired;
    this.correlationId = correlationId;
    this.rateLimit = rateLimit;
  }
}

/**
 * Social Link Response DTO (Enhanced)
 */
export class SocialLinkResponseDto {
  @ApiProperty({
    description: 'Success message',
    example: 'Social account linked successfully',
  })
  message: string;

  @ApiPropertyOptional({
    description: 'Bengali success message',
    example: 'সামাজিক অ্যাকাউন্ট সফলভাবে সংযুক্ত হয়েছে',
  })
  messageBn?: string;

  @ApiProperty({
    description: 'Linked provider',
    enum: SocialProvider,
  })
  provider: SocialProvider;

  @ApiProperty({
    description: 'Linked provider user email',
    example: 'user@gmail.com',
  })
  providerEmail: string;

  @ApiPropertyOptional({
    description: 'Linked provider phone number',
    example: '+8801712345678',
  })
  providerPhone?: string;

  @ApiProperty({
    description: 'Timestamp when linked',
    example: '2024-01-01T00:00:00.000Z',
    format: 'date-time',
  })
  linkedAt: string;

  @ApiPropertyOptional({
    description: 'Whether this is the primary social account',
    example: true,
  })
  isPrimary?: boolean;

  // ✅ ENTERPRISE ENHANCEMENT: Correlation ID for distributed tracing
  @ApiPropertyOptional({
    description: 'Correlation ID for distributed tracing',
    example: 'corr_550e8400-e29b-41d4-a716-446655440000',
  })
  correlationId?: string;

  constructor(
    provider: SocialProvider, 
    providerEmail: string, 
    linkedAt: Date, 
    message?: string,
    messageBn?: string,
    providerPhone?: string,
    isPrimary?: boolean,
    correlationId?: string
  ) {
    this.message = message || 'Social account linked successfully';
    this.messageBn = messageBn;
    this.provider = provider;
    this.providerEmail = providerEmail;
    this.providerPhone = providerPhone;
    this.linkedAt = linkedAt.toISOString();
    this.isPrimary = isPrimary;
    this.correlationId = correlationId;
  }
}

/**
 * Social Unlink Response DTO (Enhanced)
 */
export class SocialUnlinkResponseDto {
  @ApiProperty({
    description: 'Success message',
    example: 'Social account unlinked successfully',
  })
  message: string;

  @ApiPropertyOptional({
    description: 'Bengali success message',
    example: 'সামাজিক অ্যাকাউন্ট সফলভাবে বিচ্ছিন্ন করা হয়েছে',
  })
  messageBn?: string;

  @ApiProperty({
    description: 'Unlinked provider',
    enum: SocialProvider,
  })
  provider: SocialProvider;

  @ApiProperty({
    description: 'Timestamp when unlinked',
    example: '2024-01-01T00:00:00.000Z',
    format: 'date-time',
  })
  unlinkedAt: string;

  @ApiPropertyOptional({
    description: 'Whether user data was kept',
    example: true,
  })
  dataKept?: boolean;

  // ✅ ENTERPRISE ENHANCEMENT: Correlation ID for distributed tracing
  @ApiPropertyOptional({
    description: 'Correlation ID for distributed tracing',
    example: 'corr_550e8400-e29b-41d4-a716-446655440000',
  })
  correlationId?: string;

  constructor(
    provider: SocialProvider, 
    unlinkedAt: Date, 
    message?: string, 
    messageBn?: string,
    dataKept?: boolean,
    correlationId?: string
  ) {
    this.message = message || 'Social account unlinked successfully';
    this.messageBn = messageBn;
    this.provider = provider;
    this.unlinkedAt = unlinkedAt.toISOString();
    this.dataKept = dataKept;
    this.correlationId = correlationId;
  }
}

/**
 * List Linked Social Accounts Response DTO (Enhanced)
 */
export class LinkedSocialAccountDto {
  @ApiProperty({ description: 'Account ID', example: 'soc_550e8400-e29b-41d4-a716-446655440000' })
  id: string;

  @ApiProperty({ description: 'Provider name', enum: SocialProvider })
  provider: SocialProvider;

  @ApiProperty({ description: 'Provider display name', example: 'Google' })
  providerDisplayName: string;

  @ApiPropertyOptional({ description: 'Provider user email' })
  email?: string;

  @ApiPropertyOptional({ description: 'Provider phone number' })
  phoneNumber?: string;

  @ApiPropertyOptional({ description: 'Provider user name' })
  name?: string;

  @ApiPropertyOptional({ description: 'Profile picture URL' })
  picture?: string;

  @ApiProperty({ description: 'Whether this is the primary account' })
  isPrimary: boolean;

  @ApiProperty({ description: 'Timestamp when linked' })
  linkedAt: string;

  @ApiPropertyOptional({ description: 'Last used timestamp' })
  lastUsedAt?: string;

  constructor(
    id: string,
    provider: SocialProvider,
    providerDisplayName: string,
    isPrimary: boolean,
    linkedAt: Date,
    email?: string,
    phoneNumber?: string,
    name?: string,
    picture?: string,
    lastUsedAt?: Date
  ) {
    this.id = id;
    this.provider = provider;
    this.providerDisplayName = providerDisplayName;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.name = name;
    this.picture = picture;
    this.isPrimary = isPrimary;
    this.linkedAt = linkedAt.toISOString();
    this.lastUsedAt = lastUsedAt?.toISOString();
  }
}

export class ListLinkedAccountsResponseDto {
  @ApiProperty({ description: 'List of linked social accounts', type: [LinkedSocialAccountDto] })
  accounts: LinkedSocialAccountDto[];

  @ApiProperty({ description: 'Total number of linked accounts' })
  total: number;

  @ApiProperty({ description: 'Maximum number of accounts that can be linked' })
  maxAccounts: number = 10;

  @ApiProperty({ description: 'Whether user can add more accounts' })
  canAddMore: boolean;

  @ApiPropertyOptional({ description: 'Primary account provider' })
  primaryProvider?: SocialProvider;

  // ✅ ENTERPRISE ENHANCEMENT: Correlation ID for distributed tracing
  @ApiPropertyOptional({
    description: 'Correlation ID for distributed tracing',
    example: 'corr_550e8400-e29b-41d4-a716-446655440000',
  })
  correlationId?: string;

  constructor(accounts: LinkedSocialAccountDto[], maxAccounts: number = 10, primaryProvider?: SocialProvider, correlationId?: string) {
    this.accounts = accounts;
    this.total = accounts.length;
    this.maxAccounts = maxAccounts;
    this.canAddMore = accounts.length < maxAccounts;
    this.primaryProvider = primaryProvider;
    this.correlationId = correlationId;
  }
}

// ============================================================
// Helper Functions (Enterprise Enhanced)
// ============================================================

/**
 * Create audit metadata from social login request
 */
export function getSocialLoginAuditMetadata(
  dto: SocialLoginDto | SocialPhoneLoginDto,
  userId: string
): AuditMetadata {
  return {
    userId,
    source: 'api',
    timestamp: new Date(),
    requestId: dto.correlationId,
    metadata: {
      provider: dto.provider,
      deviceId: 'deviceId' in dto ? dto.deviceId : undefined,
      deviceFingerprint: 'deviceFingerprint' in dto ? dto.deviceFingerprint : undefined,
      ipAddress: 'clientInfo' in dto ? dto.clientInfo?.ipAddress : undefined,
      userAgent: 'clientInfo' in dto ? dto.clientInfo?.userAgent : undefined,
      district: 'clientInfo' in dto ? dto.clientInfo?.district : undefined,
      networkType: 'clientInfo' in dto ? dto.clientInfo?.networkType : undefined,
      phoneNumber: 'phoneNumber' in dto ? dto.phoneNumber : undefined,
      locale: 'locale' in dto ? dto.locale : undefined,
    },
  };
}

// ============================================================
// Type Exports
// ============================================================

export type { 
  SocialProvider as SocialProviderType,
  SocialLoginRateLimitDto as SocialLoginRateLimitDtoType,
  SocialLoginClientInfoDto as SocialLoginClientInfoDtoType,
};

// ============================================================
// ENTERPRISE SUMMARY v2.0
// ============================================================
// 
// Enterprise Enhancements Applied:
// 1. ✅ Multi-language validation messages (English/Bengali)
// 2. ✅ Rate limit metadata support
// 3. ✅ Distributed tracing with correlationId
// 4. ✅ Device fingerprint for fraud prevention
// 5. ✅ PKCE (Proof Key for Code Exchange) support
// 6. ✅ Centralized token configuration from shared-constants
// 7. ✅ Reusable Match decorator from shared-utils
// 8. ✅ Helper method for audit metadata extraction
// 9. ✅ Locale-aware validation message helper
// 10. ✅ Bangladesh specific - WhatsApp/Imo/Telegram OTP login
// 11. ✅ Client info tracking for security audit
// 12. ✅ Bengali language support (messageBn)
// 
// ============================================================
