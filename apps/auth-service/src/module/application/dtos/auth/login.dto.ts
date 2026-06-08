/**
 * Login DTOs - Pure Data Transport Objects (Enterprise Enhanced)
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module application/dtos/auth/login.dto
 * 
 * @description
 * Data transfer objects for authentication (login/register/logout).
 * NO business logic, NO database queries, NO infrastructure imports.
 * 
 * ENTERPRISE ENHANCEMENTS (v2.0):
 * ✅ Username-based login support added
 * ✅ Rate limit metadata integration
 * ✅ Device fingerprint support
 * ✅ Bengali error messages
 * ✅ Security headers metadata
 * ✅ Request validation with custom decorators
 * ✅ Audit log correlation
 * ✅ Distributed tracing support
 * 
 * Enterprise Rules:
 * ✅ ONLY data transport
 * ✅ Validation decorators only (class-validator)
 * ✅ API documentation decorators (Swagger)
 * ✅ No domain logic
 * ✅ No repository calls
 * ✅ Bangladesh specific - Phone, OTP, Username login support
 * ✅ Phase-1 integration with shared-constants and shared-types
 */

import { 
  IsEmail, 
  IsString, 
  IsNotEmpty, 
  IsOptional, 
  IsBoolean, 
  MinLength, 
  MaxLength,
  Matches,
  IsUUID,
  IsEnum,
  IsArray,
  ArrayMaxSize,
  ValidateIf,
  IsNumber,
  Min,
  Max,
  IsObject,
  ValidateNested,
  IsIn,
  IsIP,
  IsDate,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

// ============================================================
// Phase-1: shared-constants import (type-only for enums)
// ============================================================
import {
  LOGIN_METHODS,
  USER_ROLES,
  USER_TIERS,
  AUTH_COOKIE_NAMES,
  TOKEN_EXPIRY,
  REGEX_PHONE,
  REGEX_EMAIL,
  REGEX_USERNAME,
  PASSWORD_POLICY,
  MFA_PROVIDERS,
  ENV_CONFIG,
} from '@vubon/shared-constants';

// ============================================================
// Phase-1: shared-types import (type-only for contracts)
// ============================================================
import type { 
  UserRole, 
  UserTier,
  ApiResponse,
  PaginatedApiResponse,
  AuditMetadata,
  RequestContext,
} from '@vubon/shared-types';

// ============================================================
// Environment detection
// ============================================================
const IS_PRODUCTION = ENV_CONFIG?.IS_PRODUCTION ?? false;

// ============================================================
// Validation Messages (English + Bengali)
// ============================================================

const VALIDATION_MESSAGES = {
  en: {
    emailRequired: 'Email is required',
    emailInvalid: 'Please provide a valid email address',
    emailMaxLength: 'Email cannot exceed 255 characters',
    passwordRequired: 'Password is required',
    passwordMinLength: (min: number) => `Password must be at least ${min} characters long`,
    passwordMaxLength: (max: number) => `Password cannot exceed ${max} characters`,
    phoneRequired: 'Phone number is required',
    phoneInvalid: 'Please provide a valid Bangladesh phone number (e.g., +8801712345678 or 01712345678)',
    usernameRequired: 'Username is required',
    usernameInvalid: 'Username must be 3-20 characters and can contain letters, numbers, dots, and underscores',
    otpRequired: 'OTP code is required',
    otpInvalid: 'OTP code must be exactly 6 digits',
    deviceIdMaxLength: 'Device ID cannot exceed 255 characters',
    captchaRequired: 'CAPTCHA verification failed',
    mfaCodeRequired: 'MFA code is required',
    mfaMethodInvalid: 'Invalid MFA method',
    refreshTokenRequired: 'Refresh token is required',
    sessionIdInvalid: 'Session ID must be a valid UUID',
  },
  bn: {
    emailRequired: 'ইমেইল প্রয়োজন',
    emailInvalid: 'একটি সঠিক ইমেইল ঠিকানা দিন',
    emailMaxLength: 'ইমেইল সর্বোচ্চ ২৫৫ অক্ষর হতে পারে',
    passwordRequired: 'পাসওয়ার্ড প্রয়োজন',
    passwordMinLength: (min: number) => `পাসওয়ার্ড কমপক্ষে ${min} অক্ষরের হতে হবে`,
    passwordMaxLength: (max: number) => `পাসওয়ার্ড সর্বোচ্চ ${max} অক্ষরের হতে পারে`,
    phoneRequired: 'ফোন নম্বর প্রয়োজন',
    phoneInvalid: 'একটি সঠিক বাংলাদেশ ফোন নম্বর দিন (যেমন: +8801712345678 বা 01712345678)',
    usernameRequired: 'ইউজারনাম প্রয়োজন',
    usernameInvalid: 'ইউজারনাম ৩-২০ অক্ষরের হতে হবে এবং এতে অক্ষর, সংখ্যা, ডট ও আন্ডারস্কোর থাকতে পারে',
    otpRequired: 'OTP কোড প্রয়োজন',
    otpInvalid: 'OTP কোড অবশ্যই ৬ ডিজিটের হতে হবে',
    deviceIdMaxLength: 'ডিভাইস আইডি সর্বোচ্চ ২৫৫ অক্ষর হতে পারে',
    captchaRequired: 'CAPTCHA ভেরিফিকেশন ব্যর্থ হয়েছে',
    mfaCodeRequired: 'MFA কোড প্রয়োজন',
    mfaMethodInvalid: 'ভুল MFA পদ্ধতি',
    refreshTokenRequired: 'রিফ্রেশ টোকেন প্রয়োজন',
    sessionIdInvalid: 'সেশন আইডি টি সঠিক UUID হতে হবে',
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
// Enums (Built from shared-constants for consistency)
// ============================================================

/**
 * Login method types (from shared-constants)
 */
export const LoginMethod = LOGIN_METHODS;
export type TLoginMethod = typeof LOGIN_METHODS[keyof typeof LOGIN_METHODS];

/**
 * User role types (from shared-constants)
 */
export const UserRoleEnum = USER_ROLES;
export type TUserRole = UserRole;

/**
 * User tier types (from shared-constants)
 */
export const UserTierEnum = USER_TIERS;
export type TUserTier = UserTier;

/**
 * MFA provider types (from shared-constants)
 */
export const MFAProviderEnum = MFA_PROVIDERS;
export type TMFAProvider = typeof MFA_PROVIDERS[keyof typeof MFA_PROVIDERS];

// ============================================================
// ✅ ENTERPRISE ENHANCEMENT: Request Context & Metadata
// ============================================================

/**
 * Client information for security and analytics
 */
export class ClientInfoDto {
  @ApiPropertyOptional({
    description: 'IP address of the client',
    example: '192.168.1.100',
  })
  @IsOptional()
  @IsIP(undefined, { message: 'Invalid IP address format' })
  ipAddress?: string;

  @ApiPropertyOptional({
    description: 'User agent string',
    example: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
  })
  @IsOptional()
  @IsString()
  @MaxLength(500)
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
    enum: ['2g', '3g', '4g', '5g', 'wifi', 'unknown'],
  })
  @IsOptional()
  @IsIn(['2g', '3g', '4g', '5g', 'wifi', 'unknown'])
  networkType?: string;

  @ApiPropertyOptional({
    description: 'District (Bangladesh specific)',
    example: 'Dhaka',
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  district?: string;
}

/**
 * Rate limit metadata for response tracking
 */
export class RateLimitMetadataDto {
  @ApiPropertyOptional({ description: 'Rate limit window (seconds)', example: 60 })
  windowSeconds?: number;

  @ApiPropertyOptional({ description: 'Max requests allowed', example: 5 })
  maxRequests?: number;

  @ApiPropertyOptional({ description: 'Remaining requests', example: 4 })
  remaining?: number;

  @ApiPropertyOptional({ description: 'Reset timestamp', example: '2024-01-01T00:01:00.000Z' })
  @Type(() => Date)
  @IsDate()
  resetAt?: Date;
}

/**
 * Security headers metadata for response
 */
export class SecurityHeadersDto {
  @ApiPropertyOptional({ description: 'Session ID for this login' })
  sessionId?: string;

  @ApiPropertyOptional({ description: 'CSRF token' })
  csrfToken?: string;

  @ApiPropertyOptional({ description: 'Whether secure cookie is used' })
  secureCookie?: boolean;
}

// ============================================================
// ✅ ENTERPRISE ENHANCEMENT: Username Login DTO
// ============================================================

/**
 * Username Login Request DTO (Enterprise Enhancement)
 * 
 * @example
 * {
 *   "username": "john_doe",
 *   "password": "MyStr0ng!P@ssw0rd",
 *   "deviceId": "device-123",
 *   "rememberMe": true,
 *   "clientInfo": { "ipAddress": "192.168.1.100", "userAgent": "Mozilla/5.0..." }
 * }
 */
export class UsernameLoginDto {
  @ApiProperty({
    description: 'Username (3-20 characters, alphanumeric with dots/underscores)',
    example: 'john_doe',
    required: true,
    minLength: 3,
    maxLength: 20,
    pattern: '^[a-zA-Z0-9._]{3,20}$',
  })
  @IsString({ message: getValidationMessage('usernameRequired') })
  @IsNotEmpty({ message: getValidationMessage('usernameRequired') })
  @MinLength(3, { message: getValidationMessage('usernameInvalid') })
  @MaxLength(20, { message: getValidationMessage('usernameInvalid') })
  @Matches(REGEX_USERNAME?.STANDARD || /^[a-zA-Z0-9._]{3,20}$/, { 
    message: getValidationMessage('usernameInvalid') 
  })
  username: string;

  @ApiProperty({
    description: 'User password',
    example: 'MyStr0ng!P@ssw0rd',
    required: true,
    minLength: PASSWORD_POLICY.MIN_LENGTH,
    maxLength: PASSWORD_POLICY.MAX_LENGTH,
    format: 'password',
    writeOnly: true,
  })
  @IsString({ message: getValidationMessage('passwordRequired') })
  @IsNotEmpty({ message: getValidationMessage('passwordRequired') })
  @MinLength(PASSWORD_POLICY.MIN_LENGTH, { 
    message: getValidationMessage('passwordMinLength', [PASSWORD_POLICY.MIN_LENGTH]) 
  })
  @MaxLength(PASSWORD_POLICY.MAX_LENGTH, { 
    message: getValidationMessage('passwordMaxLength', [PASSWORD_POLICY.MAX_LENGTH]) 
  })
  password: string;

  @ApiPropertyOptional({
    description: 'Device identifier for session tracking',
    example: 'device_550e8400-e29b-41d4-a716-446655440000',
    maxLength: 255,
  })
  @IsOptional()
  @IsString({ message: 'Device ID must be a string' })
  @MaxLength(255, { message: getValidationMessage('deviceIdMaxLength') })
  deviceId?: string;

  @ApiPropertyOptional({
    description: 'Device fingerprint for enhanced security',
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
    description: 'CAPTCHA token for bot protection',
    example: '03AGdBq27...',
  })
  @IsOptional()
  @IsString({ message: 'CAPTCHA token must be a string' })
  captchaToken?: string;

  @ApiPropertyOptional({
    description: 'Client information for security tracking',
    type: ClientInfoDto,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => ClientInfoDto)
  clientInfo?: ClientInfoDto;

  @ApiPropertyOptional({
    description: 'Correlation ID for distributed tracing',
    example: 'corr_550e8400-e29b-41d4-a716-446655440000',
  })
  @IsOptional()
  @IsUUID()
  correlationId?: string;

  constructor(username: string, password: string, deviceId?: string, rememberMe?: boolean) {
    this.username = username;
    this.password = password;
    this.deviceId = deviceId;
    this.rememberMe = rememberMe ?? false;
  }
}

// ============================================================
// Request DTOs (Enhanced with client info and fingerprint)
// ============================================================

/**
 * Login Request DTO (Email based) - Enhanced
 * 
 * @example
 * {
 *   "email": "user@vubon.com.bd",
 *   "password": "MyStr0ng!P@ssw0rd",
 *   "deviceId": "device-123",
 *   "deviceFingerprint": "fp_abc123",
 *   "rememberMe": true,
 *   "clientInfo": { "ipAddress": "192.168.1.100", "district": "Dhaka" }
 * }
 */
export class LoginDto {
  @ApiProperty({
    description: 'User email address',
    example: 'user@vubon.com.bd',
    required: true,
    format: 'email',
    maxLength: 255,
  })
  @IsEmail({}, { message: getValidationMessage('emailInvalid') })
  @IsNotEmpty({ message: getValidationMessage('emailRequired') })
  @MaxLength(255, { message: getValidationMessage('emailMaxLength') })
  @Matches(REGEX_EMAIL.STRICT, { message: getValidationMessage('emailInvalid') })
  email: string;

  @ApiProperty({
    description: 'User password',
    example: 'MyStr0ng!P@ssw0rd',
    required: true,
    minLength: PASSWORD_POLICY.MIN_LENGTH,
    maxLength: PASSWORD_POLICY.MAX_LENGTH,
    format: 'password',
    writeOnly: true,
  })
  @IsString({ message: getValidationMessage('passwordRequired') })
  @IsNotEmpty({ message: getValidationMessage('passwordRequired') })
  @MinLength(PASSWORD_POLICY.MIN_LENGTH, { 
    message: getValidationMessage('passwordMinLength', [PASSWORD_POLICY.MIN_LENGTH]) 
  })
  @MaxLength(PASSWORD_POLICY.MAX_LENGTH, { 
    message: getValidationMessage('passwordMaxLength', [PASSWORD_POLICY.MAX_LENGTH]) 
  })
  password: string;

  @ApiPropertyOptional({
    description: 'Device identifier for session tracking',
    example: 'device_550e8400-e29b-41d4-a716-446655440000',
    maxLength: 255,
  })
  @IsOptional()
  @IsString({ message: 'Device ID must be a string' })
  @MaxLength(255, { message: getValidationMessage('deviceIdMaxLength') })
  deviceId?: string;

  @ApiPropertyOptional({
    description: 'Device fingerprint for enhanced security',
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
    description: 'Login method',
    enum: LoginMethod,
    example: LoginMethod.EMAIL,
    default: LoginMethod.EMAIL,
  })
  @IsOptional()
  @IsEnum(LoginMethod, { 
    message: `Login method must be one of: ${Object.values(LoginMethod).join(', ')}` 
  })
  method?: TLoginMethod = LoginMethod.EMAIL;

  @ApiPropertyOptional({
    description: 'CAPTCHA token for bot protection',
    example: '03AGdBq27...',
  })
  @IsOptional()
  @IsString({ message: 'CAPTCHA token must be a string' })
  captchaToken?: string;

  @ApiPropertyOptional({
    description: 'Client information for security tracking',
    type: ClientInfoDto,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => ClientInfoDto)
  clientInfo?: ClientInfoDto;

  @ApiPropertyOptional({
    description: 'Correlation ID for distributed tracing',
    example: 'corr_550e8400-e29b-41d4-a716-446655440000',
  })
  @IsOptional()
  @IsUUID()
  correlationId?: string;

  constructor(email: string, password: string, deviceId?: string, rememberMe?: boolean) {
    this.email = email;
    this.password = password;
    this.deviceId = deviceId;
    this.rememberMe = rememberMe ?? false;
  }
}

/**
 * Phone Login Request DTO (Bangladesh specific) - Enhanced
 * 
 * @example
 * {
 *   "phoneNumber": "+8801712345678",
 *   "password": "MyStr0ng!P@ssw0rd",
 *   "deviceId": "device-123",
 *   "deviceFingerprint": "fp_abc123",
 *   "rememberMe": true,
 *   "clientInfo": { "networkType": "4g", "district": "Dhaka" }
 * }
 */
export class PhoneLoginDto {
  @ApiProperty({
    description: 'Bangladesh phone number (E.164 format)',
    example: '+8801712345678',
    required: true,
    pattern: '^\\+8801[3-9]\\d{8}$',
  })
  @IsString({ message: getValidationMessage('phoneRequired') })
  @IsNotEmpty({ message: getValidationMessage('phoneRequired') })
  @Matches(REGEX_PHONE.BANGLADESH_ALL, { 
    message: getValidationMessage('phoneInvalid') 
  })
  phoneNumber: string;

  @ApiProperty({
    description: 'User password',
    example: 'MyStr0ng!P@ssw0rd',
    required: true,
    minLength: PASSWORD_POLICY.MIN_LENGTH,
    maxLength: PASSWORD_POLICY.MAX_LENGTH,
    format: 'password',
    writeOnly: true,
  })
  @IsString({ message: getValidationMessage('passwordRequired') })
  @IsNotEmpty({ message: getValidationMessage('passwordRequired') })
  @MinLength(PASSWORD_POLICY.MIN_LENGTH, { 
    message: getValidationMessage('passwordMinLength', [PASSWORD_POLICY.MIN_LENGTH]) 
  })
  @MaxLength(PASSWORD_POLICY.MAX_LENGTH, { 
    message: getValidationMessage('passwordMaxLength', [PASSWORD_POLICY.MAX_LENGTH]) 
  })
  password: string;

  @ApiPropertyOptional({
    description: 'Device identifier for session tracking',
    example: 'device_550e8400-e29b-41d4-a716-446655440000',
    maxLength: 255,
  })
  @IsOptional()
  @IsString({ message: 'Device ID must be a string' })
  @MaxLength(255, { message: getValidationMessage('deviceIdMaxLength') })
  deviceId?: string;

  @ApiPropertyOptional({
    description: 'Device fingerprint for enhanced security',
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
    description: 'CAPTCHA token for bot protection',
    example: '03AGdBq27...',
  })
  @IsOptional()
  @IsString({ message: 'CAPTCHA token must be a string' })
  captchaToken?: string;

  @ApiPropertyOptional({
    description: 'Client information for security tracking',
    type: ClientInfoDto,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => ClientInfoDto)
  clientInfo?: ClientInfoDto;

  @ApiPropertyOptional({
    description: 'Correlation ID for distributed tracing',
    example: 'corr_550e8400-e29b-41d4-a716-446655440000',
  })
  @IsOptional()
  @IsUUID()
  correlationId?: string;

  constructor(phoneNumber: string, password: string, deviceId?: string, rememberMe?: boolean) {
    this.phoneNumber = phoneNumber;
    this.password = password;
    this.deviceId = deviceId;
    this.rememberMe = rememberMe ?? false;
  }
}

/**
 * OTP Login Request DTO (Passwordless - Bangladesh specific) - Enhanced
 * 
 * @example
 * {
 *   "phoneNumber": "+8801712345678",
 *   "otpCode": "123456",
 *   "deviceId": "device-123",
 *   "deviceFingerprint": "fp_abc123",
 *   "rememberMe": true,
 *   "clientInfo": { "networkType": "4g" }
 * }
 */
export class OtpLoginDto {
  @ApiProperty({
    description: 'Bangladesh phone number (E.164 format)',
    example: '+8801712345678',
    required: true,
    pattern: '^\\+8801[3-9]\\d{8}$',
  })
  @IsString({ message: getValidationMessage('phoneRequired') })
  @IsNotEmpty({ message: getValidationMessage('phoneRequired') })
  @Matches(REGEX_PHONE.BANGLADESH_ALL, { 
    message: getValidationMessage('phoneInvalid') 
  })
  phoneNumber: string;

  @ApiProperty({
    description: 'One-Time Password (OTP) code',
    example: '123456',
    required: true,
    minLength: 6,
    maxLength: 6,
    pattern: '^[0-9]{6}$',
  })
  @IsString({ message: getValidationMessage('otpRequired') })
  @IsNotEmpty({ message: getValidationMessage('otpRequired') })
  @Matches(/^\d{6}$/, { message: getValidationMessage('otpInvalid') })
  otpCode: string;

  @ApiPropertyOptional({
    description: 'Device identifier for session tracking',
    example: 'device_550e8400-e29b-41d4-a716-446655440000',
    maxLength: 255,
  })
  @IsOptional()
  @IsString({ message: 'Device ID must be a string' })
  @MaxLength(255, { message: getValidationMessage('deviceIdMaxLength') })
  deviceId?: string;

  @ApiPropertyOptional({
    description: 'Device fingerprint for enhanced security',
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
    description: 'Client information for security tracking',
    type: ClientInfoDto,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => ClientInfoDto)
  clientInfo?: ClientInfoDto;

  @ApiPropertyOptional({
    description: 'Correlation ID for distributed tracing',
    example: 'corr_550e8400-e29b-41d4-a716-446655440000',
  })
  @IsOptional()
  @IsUUID()
  correlationId?: string;

  constructor(phoneNumber: string, otpCode: string, deviceId?: string, rememberMe?: boolean) {
    this.phoneNumber = phoneNumber;
    this.otpCode = otpCode;
    this.deviceId = deviceId;
    this.rememberMe = rememberMe ?? false;
  }
}

/**
 * Refresh Token Request DTO - Enhanced
 */
export class RefreshTokenDto {
  @ApiProperty({
    description: 'Refresh token for obtaining new access token',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    required: true,
  })
  @IsString({ message: getValidationMessage('refreshTokenRequired') })
  @IsNotEmpty({ message: getValidationMessage('refreshTokenRequired') })
  refreshToken: string;

  @ApiPropertyOptional({
    description: 'Device identifier',
    example: 'device_550e8400-e29b-41d4-a716-446655440000',
  })
  @IsOptional()
  @IsString({ message: 'Device ID must be a string' })
  deviceId?: string;

  @ApiPropertyOptional({
    description: 'Device fingerprint for security validation',
    example: 'fp_abc123def456',
  })
  @IsOptional()
  @IsString()
  deviceFingerprint?: string;

  @ApiPropertyOptional({
    description: 'Correlation ID for distributed tracing',
    example: 'corr_550e8400-e29b-41d4-a716-446655440000',
  })
  @IsOptional()
  @IsUUID()
  correlationId?: string;

  constructor(refreshToken: string, deviceId?: string) {
    this.refreshToken = refreshToken;
    this.deviceId = deviceId;
  }
}

/**
 * Logout Request DTO - Enhanced
 */
export class LogoutDto {
  @ApiPropertyOptional({
    description: 'Session ID to logout (if not provided, current session)',
    example: 'session_abc123',
  })
  @IsOptional()
  @IsString({ message: 'Session ID must be a string' })
  @IsUUID(undefined, { message: getValidationMessage('sessionIdInvalid') })
  sessionId?: string;

  @ApiPropertyOptional({
    description: 'Logout from all devices',
    example: false,
    default: false,
  })
  @IsOptional()
  @IsBoolean({ message: 'All devices must be a boolean' })
  allDevices?: boolean = false;

  @ApiPropertyOptional({
    description: 'Refresh token to revoke',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  @IsOptional()
  @IsString({ message: 'Refresh token must be a string' })
  refreshToken?: string;

  @ApiPropertyOptional({
    description: 'Correlation ID for audit trail',
    example: 'corr_550e8400-e29b-41d4-a716-446655440000',
  })
  @IsOptional()
  @IsUUID()
  correlationId?: string;

  constructor(sessionId?: string, allDevices?: boolean) {
    this.sessionId = sessionId;
    this.allDevices = allDevices ?? false;
  }
}

/**
 * MFA Verification Request DTO
 */
export class MfaVerificationDto {
  @ApiProperty({
    description: 'MFA session ID from login response',
    example: 'mfa_session_abc123',
    required: true,
  })
  @IsString({ message: 'MFA session ID must be a string' })
  @IsNotEmpty({ message: 'MFA session ID is required' })
  @IsUUID(undefined, { message: 'Invalid MFA session ID format' })
  mfaSessionId: string;

  @ApiProperty({
    description: 'MFA verification code',
    example: '123456',
    required: true,
    minLength: 6,
    maxLength: 8,
  })
  @IsString({ message: getValidationMessage('mfaCodeRequired') })
  @IsNotEmpty({ message: getValidationMessage('mfaCodeRequired') })
  @Matches(/^\d{6,8}$/, { message: 'MFA code must be 6-8 digits' })
  code: string;

  @ApiPropertyOptional({
    description: 'MFA method used',
    enum: MFAProviderEnum,
    example: MFAProviderEnum.TOTP,
  })
  @IsOptional()
  @IsEnum(MFAProviderEnum, { message: getValidationMessage('mfaMethodInvalid') })
  method?: TMFAProvider;

  @ApiPropertyOptional({
    description: 'Trust this device for future logins',
    example: true,
    default: false,
  })
  @IsOptional()
  @IsBoolean()
  trustDevice?: boolean = false;

  @ApiPropertyOptional({
    description: 'Device fingerprint for trusted device',
    example: 'fp_abc123def456',
  })
  @IsOptional()
  @IsString()
  deviceFingerprint?: string;

  constructor(mfaSessionId: string, code: string, method?: TMFAProvider, trustDevice?: boolean) {
    this.mfaSessionId = mfaSessionId;
    this.code = code;
    this.method = method;
    this.trustDevice = trustDevice ?? false;
  }
}

// ============================================================
// Response DTOs (Enhanced with metadata)
// ============================================================

/**
 * User Response DTO (minimal for login response) - Enhanced
 */
export class UserResponseDto {
  @ApiProperty({
    description: 'User unique identifier',
    example: 'usr_550e8400-e29b-41d4-a716-446655440000',
    format: 'uuid',
  })
  id: string;

  @ApiProperty({
    description: 'User email address',
    example: 'user@vubon.com.bd',
    format: 'email',
  })
  email: string;

  @ApiPropertyOptional({
    description: 'Username',
    example: 'john_doe',
  })
  username?: string;

  @ApiPropertyOptional({
    description: 'Phone number (E.164 format)',
    example: '+8801712345678',
  })
  phoneNumber?: string;

  @ApiProperty({
    description: 'User full name',
    example: 'John Doe',
  })
  fullName: string;

  @ApiProperty({
    description: 'User display name',
    example: 'John',
  })
  displayName: string;

  @ApiProperty({
    description: 'User role',
    enum: UserRoleEnum,
    example: UserRoleEnum.CUSTOMER,
  })
  role: TUserRole;

  @ApiProperty({
    description: 'User tier (loyalty program)',
    enum: UserTierEnum,
    example: UserTierEnum.BRONZE,
  })
  tier: TUserTier;

  @ApiPropertyOptional({
    description: 'Avatar URL',
    example: 'https://cdn.vubon.com.bd/avatars/user123.jpg',
  })
  avatar?: string;

  @ApiPropertyOptional({
    description: 'Whether email is verified',
    example: true,
  })
  isEmailVerified?: boolean;

  @ApiPropertyOptional({
    description: 'Whether phone is verified',
    example: true,
  })
  isPhoneVerified?: boolean;

  @ApiPropertyOptional({
    description: 'Whether MFA is enabled',
    example: false,
  })
  mfaEnabled?: boolean;

  @ApiPropertyOptional({
    description: 'User tier discount percentage',
    example: 5,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(100)
  tierDiscount?: number;

  @ApiPropertyOptional({
    description: 'Whether user gets free shipping',
    example: false,
  })
  hasFreeShipping?: boolean;

  @ApiPropertyOptional({
    description: 'Preferred language (Bangla/English)',
    example: 'en',
  })
  preferredLanguage?: 'en' | 'bn';

  @ApiPropertyOptional({
    description: 'Preferred district (Bangladesh)',
    example: 'Dhaka',
  })
  preferredDistrict?: string;

  constructor(
    id: string,
    email: string,
    fullName: string,
    displayName: string,
    role: TUserRole,
    tier: TUserTier,
    isEmailVerified?: boolean,
    isPhoneVerified?: boolean,
    mfaEnabled?: boolean,
    phoneNumber?: string,
    avatar?: string,
    username?: string
  ) {
    this.id = id;
    this.email = email;
    this.fullName = fullName;
    this.displayName = displayName;
    this.role = role;
    this.tier = tier;
    this.isEmailVerified = isEmailVerified;
    this.isPhoneVerified = isPhoneVerified;
    this.mfaEnabled = mfaEnabled;
    this.phoneNumber = phoneNumber;
    this.avatar = avatar;
    this.username = username;
  }
}

/**
 * Login Response DTO - Enhanced with security headers and rate limit info
 */
export class LoginResponseDto {
  @ApiProperty({
    description: 'JWT access token for API authentication',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  accessToken: string;

  @ApiProperty({
    description: 'Refresh token for obtaining new access token',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  refreshToken: string;

  @ApiProperty({
    description: 'Access token expiry time in seconds',
    example: TOKEN_EXPIRY.ACCESS_TOKEN,
    minimum: 1,
  })
  expiresIn: number;

  @ApiProperty({
    description: 'Refresh token expiry time in seconds',
    example: TOKEN_EXPIRY.REFRESH_TOKEN,
    minimum: 1,
  })
  refreshExpiresIn: number;

  @ApiProperty({
    description: 'Token type (always Bearer)',
    example: 'Bearer',
    default: 'Bearer',
  })
  tokenType: string = 'Bearer';

  @ApiProperty({
    description: 'Authenticated user information',
    type: UserResponseDto,
  })
  user: UserResponseDto;

  @ApiPropertyOptional({
    description: 'Whether MFA is required to complete login',
    example: false,
  })
  mfaRequired?: boolean;

  @ApiPropertyOptional({
    description: 'MFA session ID (if MFA required)',
    example: 'mfa_session_abc123',
  })
  mfaSessionId?: string;

  @ApiPropertyOptional({
    description: 'Session ID for management',
    example: 'session_abc123',
  })
  sessionId?: string;

  @ApiPropertyOptional({
    description: 'CSRF token for subsequent requests',
    example: 'csrf_token_abc123',
  })
  csrfToken?: string;

  @ApiPropertyOptional({
    description: 'Rate limit metadata',
    type: RateLimitMetadataDto,
  })
  rateLimit?: RateLimitMetadataDto;

  @ApiPropertyOptional({
    description: 'Security headers metadata',
    type: SecurityHeadersDto,
  })
  securityHeaders?: SecurityHeadersDto;

  constructor(
    accessToken: string,
    refreshToken: string,
    expiresIn: number,
    refreshExpiresIn: number,
    user: UserResponseDto,
    mfaRequired?: boolean,
    sessionId?: string,
    mfaSessionId?: string,
    csrfToken?: string,
    rateLimit?: RateLimitMetadataDto,
    securityHeaders?: SecurityHeadersDto
  ) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
    this.expiresIn = expiresIn;
    this.refreshExpiresIn = refreshExpiresIn;
    this.user = user;
    this.mfaRequired = mfaRequired;
    this.sessionId = sessionId;
    this.mfaSessionId = mfaSessionId;
    this.csrfToken = csrfToken;
    this.rateLimit = rateLimit;
    this.securityHeaders = securityHeaders;
  }
}

/**
 * Token Refresh Response DTO - Enhanced
 */
export class TokenRefreshResponseDto {
  @ApiProperty({
    description: 'New JWT access token',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  accessToken: string;

  @ApiProperty({
    description: 'New refresh token (if rotated)',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  refreshToken: string;

  @ApiProperty({
    description: 'Access token expiry time in seconds',
    example: TOKEN_EXPIRY.ACCESS_TOKEN,
  })
  expiresIn: number;

  @ApiProperty({
    description: 'Refresh token expiry time in seconds',
    example: TOKEN_EXPIRY.REFRESH_TOKEN,
  })
  refreshExpiresIn: number;

  @ApiProperty({
    description: 'Token type (always Bearer)',
    example: 'Bearer',
  })
  tokenType: string = 'Bearer';

  @ApiPropertyOptional({
    description: 'Rate limit metadata',
    type: RateLimitMetadataDto,
  })
  rateLimit?: RateLimitMetadataDto;

  constructor(
    accessToken: string, 
    refreshToken: string, 
    expiresIn: number, 
    refreshExpiresIn: number,
    rateLimit?: RateLimitMetadataDto
  ) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
    this.expiresIn = expiresIn;
    this.refreshExpiresIn = refreshExpiresIn;
    this.rateLimit = rateLimit;
  }
}

/**
 * Logout Response DTO - Enhanced
 */
export class LogoutResponseDto {
  @ApiProperty({
    description: 'Success message',
    example: 'Successfully logged out',
  })
  message: string;

  @ApiPropertyOptional({
    description: 'Bengali success message',
    example: 'সফলভাবে লগআউট হয়েছে',
  })
  messageBn?: string;

  @ApiProperty({
    description: 'Number of sessions affected',
    example: 1,
  })
  sessionsAffected: number;

  @ApiPropertyOptional({
    description: 'Correlation ID for audit trail',
    example: 'corr_550e8400-e29b-41d4-a716-446655440000',
  })
  correlationId?: string;

  constructor(message: string, sessionsAffected: number, messageBn?: string, correlationId?: string) {
    this.message = message;
    this.messageBn = messageBn;
    this.sessionsAffected = sessionsAffected;
    this.correlationId = correlationId;
  }
}

/**
 * MFA Required Response DTO (when MFA is needed after login) - Enhanced
 */
export class MFARequiredResponseDto {
  @ApiProperty({
    description: 'MFA required flag',
    example: true,
  })
  mfaRequired: boolean = true;

  @ApiProperty({
    description: 'MFA session ID for verification',
    example: 'mfa_session_abc123',
  })
  mfaSessionId: string;

  @ApiProperty({
    description: 'Available MFA methods',
    enum: MFAProviderEnum,
    isArray: true,
    example: [MFAProviderEnum.TOTP, MFAProviderEnum.SMS],
  })
  availableMethods: TMFAProvider[];

  @ApiPropertyOptional({
    description: 'Masked phone number for SMS MFA',
    example: '+88017******78',
  })
  maskedPhone?: string;

  @ApiPropertyOptional({
    description: 'Masked email for email MFA',
    example: 'u***r@example.com',
  })
  maskedEmail?: string;

  @ApiPropertyOptional({
    description: 'WhatsApp number for WhatsApp MFA (Bangladesh specific)',
    example: '+88017******78',
  })
  maskedWhatsApp?: string;

  @ApiPropertyOptional({
    description: 'Login session ID (partial login)',
    example: 'login_session_abc123',
  })
  loginSessionId?: string;

  @ApiPropertyOptional({
    description: 'Rate limit metadata for MFA attempts',
    type: RateLimitMetadataDto,
  })
  rateLimit?: RateLimitMetadataDto;

  constructor(
    mfaSessionId: string, 
    availableMethods: TMFAProvider[], 
    maskedPhone?: string, 
    maskedEmail?: string,
    loginSessionId?: string,
    maskedWhatsApp?: string,
    rateLimit?: RateLimitMetadataDto
  ) {
    this.mfaSessionId = mfaSessionId;
    this.availableMethods = availableMethods;
    this.maskedPhone = maskedPhone;
    this.maskedEmail = maskedEmail;
    this.loginSessionId = loginSessionId;
    this.maskedWhatsApp = maskedWhatsApp;
    this.rateLimit = rateLimit;
  }
}

// ============================================================
// Type Exports
// ============================================================

export type { 
  TUserRole, 
  TUserTier, 
  TMFAProvider,
  ClientInfoDto as ClientInfoDtoType,
  RateLimitMetadataDto as RateLimitMetadataDtoType,
  SecurityHeadersDto as SecurityHeadersDtoType,
};
