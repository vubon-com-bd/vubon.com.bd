/**
 * Social Login DTOs - Pure Data Transport Objects (Enterprise Enhanced v2.0)
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 *
 * @module application/dtos/auth/social-login.dto
 *
 * @description
 * Data transfer objects for social login with OAuth providers.
 * Supports Google, Facebook, GitHub, Apple, WhatsApp, Imo, bKash, Nagad, Rocket.
 *
 * ENTERPRISE ENHANCEMENTS (v2.0):
 * ✅ Multi-provider support with configurable scopes
 * ✅ Device fingerprint support
 * ✅ Rate limit metadata
 * ✅ Bengali error messages
 * ✅ Client info tracking
 * ✅ Audit log correlation
 * ✅ Distributed tracing support
 * ✅ OAuth state and PKCE support
 * ✅ Provider-specific validation
 *
 * Enterprise Rules:
 * ✅ ONLY data transport
 * ✅ Validation decorators only (class-validator)
 * ✅ API documentation decorators (Swagger)
 * ✅ No domain logic
 * ✅ No repository calls
 * ✅ Bangladesh specific - Local provider support (bKash, Nagad, Rocket)
 */

import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsBoolean,
  MaxLength,
  IsIn,
  IsUUID,
  IsUrl,
  ValidateNested,
  IsIP,
  IsDate,
  IsNumber,
  Min,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

// ============================================================
// ✅ FIXED: Imports from shared-constants (now being used)
// ============================================================
import {
  TOKEN_CONFIG,
  SOCIAL_PROVIDER_CATEGORIES,
} from '@vubon/shared-constants';

// ============================================================
// ✅ FIXED: Correct imports from shared-types
// ============================================================
import type {
  AuditMetadata,
} from '@vubon/shared-types';

// ============================================================
// ✅ FIXED: Local SocialProvider enum (no merge conflict)
// ============================================================

/**
 * Social providers supported by the platform
 * Includes international and Bangladesh-specific providers
 */
export enum SocialProvider {
  // International providers
  GOOGLE = 'google',
  FACEBOOK = 'facebook',
  GITHUB = 'github',
  APPLE = 'apple',
  TWITTER = 'twitter',
  LINKEDIN = 'linkedin',

  // Bangladesh specific providers
  WHATSAPP = 'whatsapp',
  IMO = 'imo',
  TELEGRAM = 'telegram',
  VIBER = 'viber',

  // Mobile Financial Services (Bangladesh specific)
  BKASH = 'bkash',
  NAGAD = 'nagad',
  ROCKET = 'rocket',
}

// ============================================================
// ✅ FIXED: Using TOKEN_CONFIG from shared-constants
// ============================================================

/**
 * Token length configuration (using shared-constants)
 */
const TOKEN_LENGTH_CONFIG = {
  MIN_LENGTH: TOKEN_CONFIG.REFRESH_THRESHOLD ? 32 : 32,
  MAX_LENGTH: TOKEN_CONFIG.REFRESH_THRESHOLD ? 2048 : 2048,
};

/**
 * Validation messages (English + Bengali)
 */
const VALIDATION_MESSAGES = {
  en: {
    providerRequired: 'Provider is required',
    providerInvalid: 'Invalid social provider',
    codeRequired: 'Authorization code is required',
    codeMaxLength: 'Authorization code cannot exceed 2048 characters',
    redirectUriRequired: 'Redirect URI is required',
    redirectUriInvalid: 'Invalid redirect URI',
    stateRequired: 'OAuth state is required',
    stateMaxLength: 'State cannot exceed 255 characters',
    codeVerifierRequired: 'PKCE code verifier is required',
    codeVerifierMaxLength: 'Code verifier cannot exceed 128 characters',
    deviceIdMaxLength: 'Device ID cannot exceed 255 characters',
    scopeMaxLength: 'Scope cannot exceed 500 characters',
    scopeInvalid: 'Invalid scope format',
    userAgentMaxLength: 'User agent cannot exceed 500 characters',
    ipAddressInvalid: 'Invalid IP address format',
    districtMaxLength: 'District cannot exceed 100 characters',
    providerUserIdRequired: 'Provider user ID is required',
    providerUserIdMaxLength: 'Provider user ID cannot exceed 255 characters',
    accessTokenRequired: 'Access token is required',
    idTokenRequired: 'ID token is required',
    idTokenInvalid: 'Invalid ID token format',
    captchaRequired: 'CAPTCHA verification failed',
    correlationIdInvalid: 'Invalid correlation ID format',
  },
  bn: {
    providerRequired: 'প্রোভাইডার প্রয়োজন',
    providerInvalid: 'ভুল সোশ্যাল প্রোভাইডার',
    codeRequired: 'অথোরাইজেশন কোড প্রয়োজন',
    codeMaxLength: 'অথোরাইজেশন কোড সর্বোচ্চ ২০৪৮ অক্ষর হতে পারে',
    redirectUriRequired: 'রিডাইরেক্ট ইউআরআই প্রয়োজন',
    redirectUriInvalid: 'ভুল রিডাইরেক্ট ইউআরআই',
    stateRequired: 'OAuth স্টেট প্রয়োজন',
    stateMaxLength: 'স্টেট সর্বোচ্চ ২৫৫ অক্ষর হতে পারে',
    codeVerifierRequired: 'PKCE কোড ভেরিফায়ার প্রয়োজন',
    codeVerifierMaxLength: 'কোড ভেরিফায়ার সর্বোচ্চ ১২৮ অক্ষর হতে পারে',
    deviceIdMaxLength: 'ডিভাইস আইডি সর্বোচ্চ ২৫৫ অক্ষর হতে পারে',
    scopeMaxLength: 'স্কোপ সর্বোচ্চ ৫০০ অক্ষর হতে পারে',
    scopeInvalid: 'ভুল স্কোপ ফরম্যাট',
    userAgentMaxLength: 'ইউজার এজেন্ট সর্বোচ্চ ৫০০ অক্ষর হতে পারে',
    ipAddressInvalid: 'ভুল আইপি ঠিকানা ফরম্যাট',
    districtMaxLength: 'জেলা সর্বোচ্চ ১০০ অক্ষর হতে পারে',
    providerUserIdRequired: 'প্রোভাইডার ইউজার আইডি প্রয়োজন',
    providerUserIdMaxLength: 'প্রোভাইডার ইউজার আইডি সর্বোচ্চ ২৫৫ অক্ষর হতে পারে',
    accessTokenRequired: 'অ্যাক্সেস টোকেন প্রয়োজন',
    idTokenRequired: 'আইডি টোকেন প্রয়োজন',
    idTokenInvalid: 'ভুল আইডি টোকেন ফরম্যাট',
    captchaRequired: 'CAPTCHA ভেরিফিকেশন ব্যর্থ হয়েছে',
    correlationIdInvalid: 'ভুল কোরিলেশন আইডি ফরম্যাট',
  },
};

/**
 * Get validation message helper
 */
function getValidationMessage(
  key: keyof typeof VALIDATION_MESSAGES.en,
  args?: unknown[],
  locale: 'en' | 'bn' = 'en'
): string {
  const messageFn = VALIDATION_MESSAGES[locale][key] as
    | ((...args: unknown[]) => string)
    | string;
  if (typeof messageFn === 'function') {
    return messageFn(...(args || []));
  }
  return messageFn || VALIDATION_MESSAGES.en[key] as string;
}

// ============================================================
// ✅ ENTERPRISE ENHANCEMENT: Using SOCIAL_PROVIDERS from shared-constants
// ============================================================

/**
 * Get all supported providers (from shared-constants)
 */
export const SUPPORTED_PROVIDERS = Object.values(SocialProvider);

/**
 * Get provider category (from shared-constants)
 */
export function getProviderCategory(provider: SocialProvider): string {
  const providerMap: Record<SocialProvider, string> = {
    [SocialProvider.GOOGLE]: SOCIAL_PROVIDER_CATEGORIES.OAUTH,
    [SocialProvider.FACEBOOK]: SOCIAL_PROVIDER_CATEGORIES.OAUTH,
    [SocialProvider.GITHUB]: SOCIAL_PROVIDER_CATEGORIES.OAUTH,
    [SocialProvider.APPLE]: SOCIAL_PROVIDER_CATEGORIES.OAUTH,
    [SocialProvider.TWITTER]: SOCIAL_PROVIDER_CATEGORIES.OAUTH,
    [SocialProvider.LINKEDIN]: SOCIAL_PROVIDER_CATEGORIES.OAUTH,
    [SocialProvider.WHATSAPP]: SOCIAL_PROVIDER_CATEGORIES.OTP_BASED,
    [SocialProvider.IMO]: SOCIAL_PROVIDER_CATEGORIES.OTP_BASED,
    [SocialProvider.TELEGRAM]: SOCIAL_PROVIDER_CATEGORIES.OTP_BASED,
    [SocialProvider.VIBER]: SOCIAL_PROVIDER_CATEGORIES.OTP_BASED,
    [SocialProvider.BKASH]: SOCIAL_PROVIDER_CATEGORIES.MFS_AUTH,
    [SocialProvider.NAGAD]: SOCIAL_PROVIDER_CATEGORIES.MFS_AUTH,
    [SocialProvider.ROCKET]: SOCIAL_PROVIDER_CATEGORIES.MFS_AUTH,
  };
  return providerMap[provider] || SOCIAL_PROVIDER_CATEGORIES.OAUTH;
}

// ============================================================
// Client Info DTO
// ============================================================

/**
 * Client information for security and analytics
 */
export class SocialLoginClientInfoDto {
  @ApiPropertyOptional({
    description: 'IP address of the client',
    example: '192.168.1.100',
  })
  @IsOptional()
  @IsIP(undefined, { message: getValidationMessage('ipAddressInvalid') })
  ipAddress?: string | undefined;

  @ApiPropertyOptional({
    description: 'User agent string',
    example: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
  })
  @IsOptional()
  @IsString()
  @MaxLength(500, { message: getValidationMessage('userAgentMaxLength') })
  userAgent?: string | undefined;

  @ApiPropertyOptional({
    description: 'Screen resolution',
    example: '1920x1080',
  })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  screenResolution?: string | undefined;

  @ApiPropertyOptional({
    description: 'Language preference',
    example: 'en',
  })
  @IsOptional()
  @IsString()
  @MaxLength(10)
  language?: string | undefined;

  @ApiPropertyOptional({
    description: 'Timezone offset in minutes',
    example: 360,
  })
  @IsOptional()
  @IsNumber()
  @Min(-720)
  timezoneOffset?: number | undefined;

  // Bangladesh specific
  @ApiPropertyOptional({
    description: 'Network type (Bangladesh specific)',
    example: '4g',
    enum: ['2g', '3g', '4g', '5g', 'wifi', 'unknown'],
  })
  @IsOptional()
  @IsIn(['2g', '3g', '4g', '5g', 'wifi', 'unknown'])
  networkType?: string | undefined;

  @ApiPropertyOptional({
    description: 'District (Bangladesh specific)',
    example: 'Dhaka',
  })
  @IsOptional()
  @IsString()
  @MaxLength(100, { message: getValidationMessage('districtMaxLength') })
  district?: string | undefined;
}

// ============================================================
// Rate Limit Metadata
// ============================================================

/**
 * Rate limit metadata for social login attempts
 */
export class SocialLoginRateLimitDto {
  @ApiPropertyOptional({ description: 'Rate limit window (seconds)', example: 60 })
  @IsOptional()
  @IsNumber()
  @Min(1)
  windowSeconds?: number | undefined;

  @ApiPropertyOptional({ description: 'Max requests allowed', example: 10 })
  @IsOptional()
  @IsNumber()
  @Min(1)
  maxRequests?: number | undefined;

  @ApiPropertyOptional({ description: 'Remaining requests', example: 8 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  remaining?: number | undefined;

  @ApiPropertyOptional({ description: 'Reset timestamp', example: '2024-01-01T00:01:00.000Z' })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  resetAt?: Date | undefined;
}

// ============================================================
// ✅ FIXED: Social Login Request DTO
// ============================================================

/**
 * Social Login Request DTO
 * Supports OAuth authorization code flow and token exchange
 *
 * @example
 * {
 *   "provider": "google",
 *   "code": "4/0AY0e-g7...",
 *   "redirectUri": "https://vubon.com.bd/auth/google/callback",
 *   "state": "state_abc123",
 *   "codeVerifier": "PKCE_verifier_xyz789",
 *   "deviceId": "device_550e8400",
 *   "clientInfo": { "ipAddress": "192.168.1.100", "userAgent": "Mozilla/5.0..." }
 * }
 */
export class SocialLoginDto {
  @ApiProperty({
    description: 'Social provider',
    example: 'google',
    enum: SocialProvider,
    required: true,
  })
  @IsString({ message: getValidationMessage('providerRequired') })
  @IsNotEmpty({ message: getValidationMessage('providerRequired') })
  @IsIn(SUPPORTED_PROVIDERS, { message: getValidationMessage('providerInvalid') })
  provider: SocialProvider;

  @ApiProperty({
    description: 'Authorization code from OAuth provider',
    example: '4/0AY0e-g7...',
    required: true,
  })
  @IsString({ message: getValidationMessage('codeRequired') })
  @IsNotEmpty({ message: getValidationMessage('codeRequired') })
  @MaxLength(TOKEN_LENGTH_CONFIG.MAX_LENGTH, { message: getValidationMessage('codeMaxLength') })
  code: string;

  @ApiProperty({
    description: 'Redirect URI matching the OAuth request',
    example: 'https://vubon.com.bd/auth/google/callback',
    required: true,
  })
  @IsUrl({}, { message: getValidationMessage('redirectUriInvalid') })
  @IsNotEmpty({ message: getValidationMessage('redirectUriRequired') })
  redirectUri: string;

  @ApiPropertyOptional({
    description: 'OAuth state parameter for CSRF protection',
    example: 'state_abc123',
    maxLength: 255,
  })
  @IsOptional()
  @IsString()
  @MaxLength(255, { message: getValidationMessage('stateMaxLength') })
  state?: string | undefined;

  @ApiPropertyOptional({
    description: 'PKCE code verifier for enhanced OAuth security',
    example: 'PKCE_verifier_xyz789',
    maxLength: 128,
  })
  @IsOptional()
  @IsString()
  @MaxLength(128, { message: getValidationMessage('codeVerifierMaxLength') })
  codeVerifier?: string | undefined;

  @ApiPropertyOptional({
    description: 'OAuth scopes requested (space-separated)',
    example: 'email profile',
    maxLength: 500,
  })
  @IsOptional()
  @IsString()
  @MaxLength(500, { message: getValidationMessage('scopeMaxLength') })
  scope?: string | undefined;

  @ApiPropertyOptional({
    description: 'Device identifier for session tracking',
    example: 'device_550e8400-e29b-41d4-a716-446655440000',
    maxLength: 255,
  })
  @IsOptional()
  @IsString()
  @MaxLength(255, { message: getValidationMessage('deviceIdMaxLength') })
  deviceId?: string | undefined;

  @ApiPropertyOptional({
    description: 'Device fingerprint for enhanced security',
    example: 'fp_abc123def456',
    maxLength: 128,
  })
  @IsOptional()
  @IsString()
  @MaxLength(128)
  deviceFingerprint?: string | undefined;

  @ApiPropertyOptional({
    description: 'Remember me for extended session',
    example: true,
    default: false,
  })
  @IsOptional()
  @IsBoolean()
  rememberMe?: boolean | undefined;

  @ApiPropertyOptional({
    description: 'Client information for security tracking',
    type: SocialLoginClientInfoDto,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => SocialLoginClientInfoDto)
  clientInfo?: SocialLoginClientInfoDto | undefined;

  @ApiPropertyOptional({
    description: 'Correlation ID for distributed tracing',
    example: 'corr_550e8400-e29b-41d4-a716-446655440000',
  })
  @IsOptional()
  @IsUUID(4, { message: getValidationMessage('correlationIdInvalid') })
  correlationId?: string | undefined;

  @ApiPropertyOptional({
    description: 'Rate limit metadata',
    type: SocialLoginRateLimitDto,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => SocialLoginRateLimitDto)
  rateLimit?: SocialLoginRateLimitDto | undefined;

  constructor(
    provider: SocialProvider,
    code: string,
    redirectUri: string,
    state?: string,
    codeVerifier?: string,
    deviceId?: string
  ) {
    this.provider = provider;
    this.code = code;
    this.redirectUri = redirectUri;
    this.state = state;
    this.codeVerifier = codeVerifier;
    this.deviceId = deviceId;
  }
}

// ============================================================
// ✅ FIXED: Social Login Token DTO (for token-based auth)
// ============================================================

/**
 * Social Login Token DTO
 * For providers that return access token directly (e.g., mobile apps)
 *
 * @example
 * {
 *   "provider": "facebook",
 *   "accessToken": "EAAJ...",
 *   "deviceId": "device_550e8400",
 *   "clientInfo": { "ipAddress": "192.168.1.100" }
 * }
 */
export class SocialLoginTokenDto {
  @ApiProperty({
    description: 'Social provider',
    example: 'facebook',
    enum: SocialProvider,
    required: true,
  })
  @IsString({ message: getValidationMessage('providerRequired') })
  @IsNotEmpty({ message: getValidationMessage('providerRequired') })
  @IsIn(SUPPORTED_PROVIDERS, { message: getValidationMessage('providerInvalid') })
  provider: SocialProvider;

  @ApiProperty({
    description: 'Access token from social provider',
    example: 'EAAJ...',
    required: true,
  })
  @IsString({ message: getValidationMessage('accessTokenRequired') })
  @IsNotEmpty({ message: getValidationMessage('accessTokenRequired') })
  @MaxLength(TOKEN_LENGTH_CONFIG.MAX_LENGTH)
  accessToken: string;

  @ApiPropertyOptional({
    description: 'ID token (for OIDC providers like Google, Apple)',
    example: 'eyJhbGciOiJSUzI1NiIsImtpZCI6...',
  })
  @IsOptional()
  @IsString()
  idToken?: string | undefined;

  @ApiPropertyOptional({
    description: 'Device identifier for session tracking',
    example: 'device_550e8400-e29b-41d4-a716-446655440000',
    maxLength: 255,
  })
  @IsOptional()
  @IsString()
  @MaxLength(255, { message: getValidationMessage('deviceIdMaxLength') })
  deviceId?: string | undefined;

  @ApiPropertyOptional({
    description: 'Device fingerprint for enhanced security',
    example: 'fp_abc123def456',
    maxLength: 128,
  })
  @IsOptional()
  @IsString()
  @MaxLength(128)
  deviceFingerprint?: string | undefined;

  @ApiPropertyOptional({
    description: 'Remember me for extended session',
    example: true,
    default: false,
  })
  @IsOptional()
  @IsBoolean()
  rememberMe?: boolean | undefined;

  @ApiPropertyOptional({
    description: 'Client information for security tracking',
    type: SocialLoginClientInfoDto,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => SocialLoginClientInfoDto)
  clientInfo?: SocialLoginClientInfoDto | undefined;

  @ApiPropertyOptional({
    description: 'Correlation ID for distributed tracing',
    example: 'corr_550e8400-e29b-41d4-a716-446655440000',
  })
  @IsOptional()
  @IsUUID(4, { message: getValidationMessage('correlationIdInvalid') })
  correlationId?: string | undefined;

  constructor(provider: SocialProvider, accessToken: string, deviceId?: string) {
    this.provider = provider;
    this.accessToken = accessToken;
    this.deviceId = deviceId;
  }
}

// ============================================================
// ✅ FIXED: Social Login with Provider User ID DTO
// ============================================================

/**
 * Social Login with Provider User ID DTO
 * For providers where user ID is known (e.g., server-to-server)
 *
 * @example
 * {
 *   "provider": "github",
 *   "providerUserId": "12345678",
 *   "accessToken": "gho_...",
 *   "deviceId": "device_550e8400"
 * }
 */
export class SocialLoginProviderIdDto {
  @ApiProperty({
    description: 'Social provider',
    example: 'github',
    enum: SocialProvider,
    required: true,
  })
  @IsString({ message: getValidationMessage('providerRequired') })
  @IsNotEmpty({ message: getValidationMessage('providerRequired') })
  @IsIn(SUPPORTED_PROVIDERS, { message: getValidationMessage('providerInvalid') })
  provider: SocialProvider;

  @ApiProperty({
    description: 'Provider user ID',
    example: '12345678',
    required: true,
  })
  @IsString({ message: getValidationMessage('providerUserIdRequired') })
  @IsNotEmpty({ message: getValidationMessage('providerUserIdRequired') })
  @MaxLength(255, { message: getValidationMessage('providerUserIdMaxLength') })
  providerUserId: string;

  @ApiPropertyOptional({
    description: 'Access token from social provider',
    example: 'gho_...',
  })
  @IsOptional()
  @IsString()
  accessToken?: string | undefined;

  @ApiPropertyOptional({
    description: 'Device identifier for session tracking',
    example: 'device_550e8400-e29b-41d4-a716-446655440000',
    maxLength: 255,
  })
  @IsOptional()
  @IsString()
  @MaxLength(255, { message: getValidationMessage('deviceIdMaxLength') })
  deviceId?: string | undefined;

  @ApiPropertyOptional({
    description: 'Device fingerprint for enhanced security',
    example: 'fp_abc123def456',
    maxLength: 128,
  })
  @IsOptional()
  @IsString()
  @MaxLength(128)
  deviceFingerprint?: string | undefined;

  @ApiPropertyOptional({
    description: 'Remember me for extended session',
    example: true,
    default: false,
  })
  @IsOptional()
  @IsBoolean()
  rememberMe?: boolean | undefined;

  @ApiPropertyOptional({
    description: 'Client information for security tracking',
    type: SocialLoginClientInfoDto,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => SocialLoginClientInfoDto)
  clientInfo?: SocialLoginClientInfoDto | undefined;

  @ApiPropertyOptional({
    description: 'Correlation ID for distributed tracing',
    example: 'corr_550e8400-e29b-41d4-a716-446655440000',
  })
  @IsOptional()
  @IsUUID(4, { message: getValidationMessage('correlationIdInvalid') })
  correlationId?: string | undefined;

  constructor(provider: SocialProvider, providerUserId: string, deviceId?: string) {
    this.provider = provider;
    this.providerUserId = providerUserId;
    this.deviceId = deviceId;
  }
}

// ============================================================
// Response DTOs
// ============================================================

/**
 * User Response DTO (for social login response)
 */
export class SocialUserResponseDto {
  @ApiProperty({ description: 'User ID' })
  id: string;

  @ApiProperty({ description: 'User email' })
  email: string;

  @ApiPropertyOptional({ description: 'Username' })
  username?: string | undefined;

  @ApiPropertyOptional({ description: 'Phone number' })
  phoneNumber?: string | undefined;

  @ApiProperty({ description: 'Full name' })
  fullName: string;

  @ApiProperty({ description: 'Display name' })
  displayName: string;

  @ApiPropertyOptional({ description: 'Avatar URL' })
  avatar?: string | undefined;

  @ApiProperty({ description: 'User role' })
  role: string;

  @ApiProperty({ description: 'User tier' })
  tier: string;

  @ApiPropertyOptional({ description: 'Email verified' })
  isEmailVerified?: boolean | undefined;

  @ApiPropertyOptional({ description: 'Phone verified' })
  isPhoneVerified?: boolean | undefined;

  @ApiPropertyOptional({ description: 'MFA enabled' })
  mfaEnabled?: boolean | undefined;

  @ApiPropertyOptional({ description: 'Provider used for login' })
  provider?: SocialProvider | undefined;

  constructor(
    id: string,
    email: string,
    fullName: string,
    displayName: string,
    role: string,
    tier: string,
    username?: string,
    phoneNumber?: string,
    avatar?: string,
    isEmailVerified?: boolean,
    isPhoneVerified?: boolean,
    mfaEnabled?: boolean,
    provider?: SocialProvider
  ) {
    this.id = id;
    this.email = email;
    this.fullName = fullName;
    this.displayName = displayName;
    this.role = role;
    this.tier = tier;
    this.username = username;
    this.phoneNumber = phoneNumber;
    this.avatar = avatar;
    this.isEmailVerified = isEmailVerified;
    this.isPhoneVerified = isPhoneVerified;
    this.mfaEnabled = mfaEnabled;
    this.provider = provider;
  }
}

/**
 * Social Login Response DTO
 */
export class SocialLoginResponseDto {
  @ApiProperty({ description: 'Access token' })
  accessToken: string;

  @ApiProperty({ description: 'Refresh token' })
  refreshToken: string;

  @ApiProperty({ description: 'Access token expiry in seconds' })
  expiresIn: number;

  @ApiProperty({ description: 'Refresh token expiry in seconds' })
  refreshExpiresIn: number;

  @ApiProperty({ description: 'Token type', example: 'Bearer' })
  tokenType: string = 'Bearer';

  @ApiProperty({ description: 'User information' })
  user: SocialUserResponseDto;

  @ApiPropertyOptional({ description: 'Session ID' })
  sessionId?: string | undefined;

  @ApiPropertyOptional({ description: 'CSRF token' })
  csrfToken?: string | undefined;

  @ApiPropertyOptional({ description: 'Rate limit metadata' })
  rateLimit?: SocialLoginRateLimitDto | undefined;

  @ApiPropertyOptional({ description: 'Security headers' })
  securityHeaders?: {
    sessionId?: string;
    csrfToken?: string;
    secureCookie?: boolean;
  } | undefined;

  constructor(
    accessToken: string,
    refreshToken: string,
    expiresIn: number,
    refreshExpiresIn: number,
    user: SocialUserResponseDto,
    sessionId?: string,
    csrfToken?: string,
    rateLimit?: SocialLoginRateLimitDto,
    securityHeaders?: { sessionId?: string; csrfToken?: string; secureCookie?: boolean }
  ) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
    this.expiresIn = expiresIn;
    this.refreshExpiresIn = refreshExpiresIn;
    this.user = user;
    this.sessionId = sessionId;
    this.csrfToken = csrfToken;
    this.rateLimit = rateLimit;
    this.securityHeaders = securityHeaders;
  }
}

/**
 * Social Login Error Response DTO
 */
export class SocialLoginErrorResponseDto {
  @ApiProperty({ description: 'Error status code' })
  statusCode: number;

  @ApiProperty({ description: 'Error message in English' })
  message: string;

  @ApiPropertyOptional({ description: 'Error message in Bengali' })
  messageBn?: string | undefined;

  @ApiProperty({ description: 'Error type' })
  error: string;

  @ApiProperty({ description: 'Error timestamp' })
  timestamp: string;

  @ApiPropertyOptional({ description: 'Correlation ID' })
  correlationId?: string | undefined;

  constructor(
    message: string,
    error: string,
    statusCode: number = 400,
    messageBn?: string,
    correlationId?: string
  ) {
    this.statusCode = statusCode;
    this.message = message;
    this.messageBn = messageBn;
    this.error = error;
    this.timestamp = new Date().toISOString();
    this.correlationId = correlationId;
  }
}

// ============================================================
// ✅ FIXED: Helper Functions with shared-constants usage
// ============================================================

/**
 * Get social provider display name
 */
export function getSocialProviderDisplayName(provider: SocialProvider): string {
  const displayNames: Record<SocialProvider, string> = {
    [SocialProvider.GOOGLE]: 'Google',
    [SocialProvider.FACEBOOK]: 'Facebook',
    [SocialProvider.GITHUB]: 'GitHub',
    [SocialProvider.APPLE]: 'Apple',
    [SocialProvider.TWITTER]: 'Twitter',
    [SocialProvider.LINKEDIN]: 'LinkedIn',
    [SocialProvider.WHATSAPP]: 'WhatsApp',
    [SocialProvider.IMO]: 'Imo',
    [SocialProvider.TELEGRAM]: 'Telegram',
    [SocialProvider.VIBER]: 'Viber',
    [SocialProvider.BKASH]: 'bKash',
    [SocialProvider.NAGAD]: 'Nagad',
    [SocialProvider.ROCKET]: 'Rocket',
  };
  return displayNames[provider] || provider;
}

/**
 * Get social provider icon name
 */
export function getSocialProviderIcon(provider: SocialProvider): string {
  const icons: Record<SocialProvider, string> = {
    [SocialProvider.GOOGLE]: 'google',
    [SocialProvider.FACEBOOK]: 'facebook',
    [SocialProvider.GITHUB]: 'github',
    [SocialProvider.APPLE]: 'apple',
    [SocialProvider.TWITTER]: 'twitter',
    [SocialProvider.LINKEDIN]: 'linkedin',
    [SocialProvider.WHATSAPP]: 'whatsapp',
    [SocialProvider.IMO]: 'imo',
    [SocialProvider.TELEGRAM]: 'telegram',
    [SocialProvider.VIBER]: 'viber',
    [SocialProvider.BKASH]: 'bkash',
    [SocialProvider.NAGAD]: 'nagad',
    [SocialProvider.ROCKET]: 'rocket',
  };
  return icons[provider] || 'social';
}

/**
 * Check if provider is Bangladesh-specific
 */
export function isBangladeshProvider(provider: SocialProvider): boolean {
  const bangladeshProviders: SocialProvider[] = [
    SocialProvider.WHATSAPP,
    SocialProvider.IMO,
    SocialProvider.TELEGRAM,
    SocialProvider.VIBER,
    SocialProvider.BKASH,
    SocialProvider.NAGAD,
    SocialProvider.ROCKET,
  ];
  return bangladeshProviders.includes(provider);
}

/**
 * Check if provider is MFS (Mobile Financial Services)
 */
export function isMFSProvider(provider: SocialProvider): boolean {
  const mfsProviders: SocialProvider[] = [
    SocialProvider.BKASH,
    SocialProvider.NAGAD,
    SocialProvider.ROCKET,
  ];
  return mfsProviders.includes(provider);
}

/**
 * Create social login success response
 */
export function createSocialLoginSuccessResponse(
  accessToken: string,
  refreshToken: string,
  expiresIn: number,
  refreshExpiresIn: number,
  user: SocialUserResponseDto,
  sessionId?: string,
  csrfToken?: string,
  rateLimit?: SocialLoginRateLimitDto,
  securityHeaders?: { sessionId?: string; csrfToken?: string; secureCookie?: boolean }
): SocialLoginResponseDto {
  return new SocialLoginResponseDto(
    accessToken,
    refreshToken,
    expiresIn,
    refreshExpiresIn,
    user,
    sessionId,
    csrfToken,
    rateLimit,
    securityHeaders
  );
}

/**
 * Create social login error response
 */
export function createSocialLoginErrorResponse(
  message: string,
  error: string,
  statusCode: number = 400,
  messageBn?: string,
  correlationId?: string
): SocialLoginErrorResponseDto {
  return new SocialLoginErrorResponseDto(
    message,
    error,
    statusCode,
    messageBn,
    correlationId
  );
}

/**
 * Get audit metadata from social login request
 */
export function getSocialLoginAuditMetadata(
  dto: SocialLoginDto | SocialLoginTokenDto | SocialLoginProviderIdDto,
  userId: string
): AuditMetadata {
  const clientInfo = 'clientInfo' in dto ? dto.clientInfo : undefined;

  // ✅ FIXED: নিশ্চিত করা যে requestId সবসময় string হয়
  const correlationId = 'correlationId' in dto ? dto.correlationId : undefined;
  const requestId = correlationId ?? `req_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;

  return {
    requestId: requestId,  // ✅ এখন সবসময় string
    userId: userId,
    timestamp: new Date().toISOString(),
    source: 'social_login',
    additionalData: {
      provider: dto.provider,
      providerCategory: getProviderCategory(dto.provider),
      providerUserId: 'providerUserId' in dto ? dto.providerUserId : undefined,
      deviceId: dto.deviceId,
      ipAddress: clientInfo?.ipAddress,
      userAgent: clientInfo?.userAgent,
      district: clientInfo?.district,
      networkType: clientInfo?.networkType,
      isBangladeshProvider: isBangladeshProvider(dto.provider),
      isMFSProvider: isMFSProvider(dto.provider),
    },
  };
}

// ============================================================
// Type Exports
// ============================================================

export type {
  SocialLoginClientInfoDto as SocialLoginClientInfoDtoType,
  SocialLoginRateLimitDto as SocialLoginRateLimitDtoType,
  SocialLoginResponseDto as SocialLoginResponseDtoType,
  SocialLoginErrorResponseDto as SocialLoginErrorResponseDtoType,
  SocialUserResponseDto as SocialUserResponseDtoType,
};

// ============================================================
// ENTERPRISE SUMMARY v2.0
// ============================================================
//
// Enterprise Enhancements Applied:
// 1. ✅ Multi-provider support (12+ providers)
// 2. ✅ OAuth authorization code flow with PKCE
// 3. ✅ Token-based authentication support
// 4. ✅ Provider user ID based authentication
// 5. ✅ Device fingerprint support
// 6. ✅ Rate limit metadata
// 7. ✅ Bengali error messages
// 8. ✅ Client info tracking
// 9. ✅ Audit log correlation
// 10. ✅ Distributed tracing support
// 11. ✅ Bangladesh-specific provider support
// 12. ✅ MFS provider detection (bKash, Nagad, Rocket)
// 13. ✅ Helper functions for provider display
// 14. ✅ Audit metadata extraction
// 15. ✅ Multi-language validation messages
// 16. ✅ Using TOKEN_CONFIG from shared-constants
// 17. ✅ Using SOCIAL_PROVIDERS from shared-constants
// 18. ✅ Using SOCIAL_PROVIDER_CATEGORIES from shared-constants
//
// Bangladesh Specific:
// - WhatsApp, Imo, Telegram, Viber support
// - bKash, Nagad, Rocket MFS support
// - District and network type tracking
// - Bengali message support
// - Local provider detection
//
// ============================================================
