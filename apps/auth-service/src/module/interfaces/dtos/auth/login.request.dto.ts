/**
 * Login Request DTO - Interface Layer
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 *
 * @module interfaces/dtos/auth/login.request.dto
 *
 * @description
 * Request DTO for user login endpoint.
 * Supports email, phone, and username-based login with validation.
 *
 * Enterprise Features:
 * ✅ Multiple login methods (email, phone, username, OTP)
 * ✅ Comprehensive validation with class-validator
 * ✅ Multi-language error messages (English/Bengali)
 * ✅ Device fingerprinting support
 * ✅ Client information tracking
 * ✅ Bangladesh specific - Phone number validation
 * ✅ Rate limit metadata
 * ✅ Distributed tracing with correlation ID
 * ✅ Swagger documentation
 *
 * @example
 * // Email login
 * {
 *   "email": "user@vubon.com.bd",
 *   "password": "MyStr0ng!P@ssw0rd",
 *   "deviceId": "device-123",
 *   "rememberMe": true
 * }
 *
 * // Phone login
 * {
 *   "phoneNumber": "+8801712345678",
 *   "password": "MyStr0ng!P@ssw0rd",
 *   "deviceInfo": { "networkType": "4g" }
 * }
 *
 * // OTP login
 * {
 *   "phoneNumber": "+8801712345678",
 *   "otpCode": "123456",
 *   "deviceId": "device-123"
 * }
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
  IsNumber,
  Min,
  Max,
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
  LOGIN_TYPES,
  REGEX_PHONE,
  REGEX_EMAIL,
  REGEX_USERNAME,
  PASSWORD_POLICY,
  OTP_CONFIG,
} from '@vubon/shared-constants';
import type { LoginMethod } from '@vubon/shared-types';

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
    otpInvalid: `OTP code must be exactly ${OTP_CONFIG?.LENGTH || 6} digits`,
    deviceIdMaxLength: 'Device ID cannot exceed 255 characters',
    captchaRequired: 'CAPTCHA verification failed',
    rememberMeInvalid: 'Remember me must be a boolean',
    loginMethodInvalid: (methods: string) => `Login method must be one of: ${methods}`,
    correlationIdInvalid: 'Correlation ID must be a valid UUID',
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
    otpInvalid: `OTP কোড অবশ্যই ${OTP_CONFIG?.LENGTH || 6} ডিজিটের হতে হবে`,
    deviceIdMaxLength: 'ডিভাইস আইডি সর্বোচ্চ ২৫৫ অক্ষর হতে পারে',
    captchaRequired: 'CAPTCHA ভেরিফিকেশন ব্যর্থ হয়েছে',
    rememberMeInvalid: 'রিমেম্বার মি অবশ্যই সত্য বা মিথ্যা হতে হবে',
    loginMethodInvalid: (methods: string) => `লগইন পদ্ধতি অবশ্যই এর মধ্যে একটি হতে হবে: ${methods}`,
    correlationIdInvalid: 'করিলেশন আইডি টি সঠিক UUID হতে হবে',
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
export const LoginMethodEnum = LOGIN_TYPES;
export type TLoginMethod = typeof LOGIN_TYPES[keyof typeof LOGIN_TYPES];

// ============================================================
// Client Info DTO (Bangladesh specific)
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
  ipAddress?: string | undefined;

  @ApiPropertyOptional({
    description: 'User agent string',
    example: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
  })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  userAgent?: string | undefined;

  @ApiPropertyOptional({
    description: 'Screen resolution',
    example: '1920x1080',
  })
  @IsOptional()
  @IsString()
  @Matches(/^\d+x\d+$/, { message: 'Screen resolution must be in format WxH' })
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
  @Max(840)
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
  @MaxLength(100)
  district?: string | undefined;

  @ApiPropertyOptional({
    description: 'Mobile operator (Bangladesh specific)',
    example: 'gp',
    enum: ['gp', 'robi', 'banglalink', 'teletalk', 'unknown'],
  })
  @IsOptional()
  @IsIn(['gp', 'robi', 'banglalink', 'teletalk', 'unknown'])
  mobileOperator?: string | undefined;
}

// ============================================================
// Base Login Request DTO (Common fields)
// ============================================================

/**
 * Base login request with common fields
 */
export class BaseLoginRequestDto {
  @ApiPropertyOptional({
    description: 'Device identifier for session tracking',
    example: 'device_550e8400-e29b-41d4-a716-446655440000',
    maxLength: 255,
  })
  @IsOptional()
  @IsString({ message: 'Device ID must be a string' })
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
    description: 'Remember me for extended session (default: false)',
    example: true,
    default: false,
  })
  @IsOptional()
  @IsBoolean({ message: getValidationMessage('rememberMeInvalid') })
  rememberMe?: boolean = false;

  @ApiPropertyOptional({
    description: 'CAPTCHA token for bot protection',
    example: '03AGdBq27...',
  })
  @IsOptional()
  @IsString({ message: 'CAPTCHA token must be a string' })
  captchaToken?: string | undefined;

  @ApiPropertyOptional({
    description: 'Client information for security tracking',
    type: ClientInfoDto,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => ClientInfoDto)
  clientInfo?: ClientInfoDto | undefined;

  @ApiPropertyOptional({
    description: 'Correlation ID for distributed tracing',
    example: 'corr_550e8400-e29b-41d4-a716-446655440000',
  })
  @IsOptional()
  @IsUUID(4, { message: getValidationMessage('correlationIdInvalid') })
  correlationId?: string | undefined;

  @ApiPropertyOptional({
    description: 'Login method (auto-detected if not provided)',
    enum: LoginMethodEnum,
    example: 'email_password',
  })
  @IsOptional()
  @IsEnum(LoginMethodEnum, {
    message: getValidationMessage('loginMethodInvalid', [Object.values(LoginMethodEnum).join(', ')]),
  })
  method?: TLoginMethod | undefined;
}

// ============================================================
// Email Login Request DTO
// ============================================================

/**
 * Email Login Request DTO
 *
 * @example
 * {
 *   "email": "user@vubon.com.bd",
 *   "password": "MyStr0ng!P@ssw0rd",
 *   "deviceId": "device-123",
 *   "rememberMe": true,
 *   "clientInfo": { "ipAddress": "192.168.1.100" }
 * }
 */
export class EmailLoginRequestDto extends BaseLoginRequestDto {
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
    message: getValidationMessage('passwordMinLength', [PASSWORD_POLICY.MIN_LENGTH]),
  })
  @MaxLength(PASSWORD_POLICY.MAX_LENGTH, {
    message: getValidationMessage('passwordMaxLength', [PASSWORD_POLICY.MAX_LENGTH]),
  })
  password: string;

  constructor(email: string, password: string) {
    super();
    this.email = email;
    this.password = password;
  }
}

// ============================================================
// Phone Login Request DTO (Bangladesh specific)
// ============================================================

/**
 * Phone Login Request DTO
 *
 * @example
 * {
 *   "phoneNumber": "+8801712345678",
 *   "password": "MyStr0ng!P@ssw0rd",
 *   "deviceId": "device-123",
 *   "clientInfo": { "networkType": "4g", "district": "Dhaka" }
 * }
 */
export class PhoneLoginRequestDto extends BaseLoginRequestDto {
  @ApiProperty({
    description: 'Bangladesh phone number (E.164 format)',
    example: '+8801712345678',
    required: true,
    pattern: '^\\+8801[3-9]\\d{8}$',
  })
  @IsString({ message: getValidationMessage('phoneRequired') })
  @IsNotEmpty({ message: getValidationMessage('phoneRequired') })
  @Matches(REGEX_PHONE.BANGLADESH_ALL, {
    message: getValidationMessage('phoneInvalid'),
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
    message: getValidationMessage('passwordMinLength', [PASSWORD_POLICY.MIN_LENGTH]),
  })
  @MaxLength(PASSWORD_POLICY.MAX_LENGTH, {
    message: getValidationMessage('passwordMaxLength', [PASSWORD_POLICY.MAX_LENGTH]),
  })
  password: string;

  constructor(phoneNumber: string, password: string) {
    super();
    this.phoneNumber = phoneNumber;
    this.password = password;
  }
}

// ============================================================
// Username Login Request DTO
// ============================================================

/**
 * Username Login Request DTO
 *
 * @example
 * {
 *   "username": "john_doe",
 *   "password": "MyStr0ng!P@ssw0rd",
 *   "deviceId": "device-123"
 * }
 */
export class UsernameLoginRequestDto extends BaseLoginRequestDto {
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
    message: getValidationMessage('usernameInvalid'),
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
    message: getValidationMessage('passwordMinLength', [PASSWORD_POLICY.MIN_LENGTH]),
  })
  @MaxLength(PASSWORD_POLICY.MAX_LENGTH, {
    message: getValidationMessage('passwordMaxLength', [PASSWORD_POLICY.MAX_LENGTH]),
  })
  password: string;

  constructor(username: string, password: string) {
    super();
    this.username = username;
    this.password = password;
  }
}

// ============================================================
// OTP Login Request DTO (Passwordless - Bangladesh specific)
// ============================================================

/**
 * OTP Login Request DTO
 *
 * @example
 * {
 *   "phoneNumber": "+8801712345678",
 *   "otpCode": "123456",
 *   "deviceId": "device-123",
 *   "clientInfo": { "networkType": "4g" }
 * }
 */
export class OtpLoginRequestDto extends BaseLoginRequestDto {
  @ApiProperty({
    description: 'Bangladesh phone number (E.164 format)',
    example: '+8801712345678',
    required: true,
    pattern: '^\\+8801[3-9]\\d{8}$',
  })
  @IsString({ message: getValidationMessage('phoneRequired') })
  @IsNotEmpty({ message: getValidationMessage('phoneRequired') })
  @Matches(REGEX_PHONE.BANGLADESH_ALL, {
    message: getValidationMessage('phoneInvalid'),
  })
  phoneNumber: string;

  @ApiProperty({
    description: 'One-Time Password (OTP) code',
    example: '123456',
    required: true,
    minLength: OTP_CONFIG?.LENGTH || 6,
    maxLength: OTP_CONFIG?.LENGTH || 6,
    pattern: '^[0-9]{6}$',
  })
  @IsString({ message: getValidationMessage('otpRequired') })
  @IsNotEmpty({ message: getValidationMessage('otpRequired') })
  @Matches(new RegExp(`^\\d{${OTP_CONFIG?.LENGTH || 6}}$`), {
    message: getValidationMessage('otpInvalid'),
  })
  otpCode: string;

  constructor(phoneNumber: string, otpCode: string) {
    super();
    this.phoneNumber = phoneNumber;
    this.otpCode = otpCode;
  }
}

// ============================================================
// Unified Login Request DTO (Auto-detects login method)
// ============================================================

/**
 * Unified Login Request DTO
 * Automatically detects login method based on provided fields
 *
 * @example
 * // Email login
 * {
 *   "identifier": "user@vubon.com.bd",
 *   "password": "MyStr0ng!P@ssw0rd"
 * }
 *
 * // Phone login
 * {
 *   "identifier": "+8801712345678",
 *   "password": "MyStr0ng!P@ssw0rd"
 * }
 *
 * // OTP login
 * {
 *   "identifier": "+8801712345678",
 *   "otpCode": "123456"
 * }
 */
export class UnifiedLoginRequestDto {
  @ApiProperty({
    description: 'User identifier (email, phone, or username)',
    example: 'user@vubon.com.bd',
    required: true,
  })
  @IsString({ message: 'Identifier must be a string' })
  @IsNotEmpty({ message: 'Identifier is required' })
  identifier: string;

  @ApiPropertyOptional({
    description: 'User password (required for password-based login)',
    example: 'MyStr0ng!P@ssw0rd',
    minLength: PASSWORD_POLICY.MIN_LENGTH,
    maxLength: PASSWORD_POLICY.MAX_LENGTH,
    format: 'password',
    writeOnly: true,
  })
  @IsOptional()
  @IsString()
  @MinLength(PASSWORD_POLICY.MIN_LENGTH, {
    message: getValidationMessage('passwordMinLength', [PASSWORD_POLICY.MIN_LENGTH]),
  })
  @MaxLength(PASSWORD_POLICY.MAX_LENGTH, {
    message: getValidationMessage('passwordMaxLength', [PASSWORD_POLICY.MAX_LENGTH]),
  })
  password?: string | undefined;

  @ApiPropertyOptional({
    description: 'OTP code (required for OTP login)',
    example: '123456',
    minLength: OTP_CONFIG?.LENGTH || 6,
    maxLength: OTP_CONFIG?.LENGTH || 6,
    pattern: '^[0-9]{6}$',
  })
  @IsOptional()
  @IsString()
  @Matches(new RegExp(`^\\d{${OTP_CONFIG?.LENGTH || 6}}$`), {
    message: getValidationMessage('otpInvalid'),
  })
  otpCode?: string | undefined;

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
    description: 'Remember me for extended session (default: false)',
    example: true,
    default: false,
  })
  @IsOptional()
  @IsBoolean({ message: getValidationMessage('rememberMeInvalid') })
  rememberMe?: boolean = false;

  @ApiPropertyOptional({
    description: 'CAPTCHA token for bot protection',
    example: '03AGdBq27...',
  })
  @IsOptional()
  @IsString()
  captchaToken?: string | undefined;

  @ApiPropertyOptional({
    description: 'Client information for security tracking',
    type: ClientInfoDto,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => ClientInfoDto)
  clientInfo?: ClientInfoDto | undefined;

  @ApiPropertyOptional({
    description: 'Correlation ID for distributed tracing',
    example: 'corr_550e8400-e29b-41d4-a716-446655440000',
  })
  @IsOptional()
  @IsUUID(4, { message: getValidationMessage('correlationIdInvalid') })
  correlationId?: string | undefined;

  /**
   * Detect login method based on provided fields
   */
  detectLoginMethod(): 'email' | 'phone' | 'username' | 'otp' | 'unknown' {
    const trimmed = this.identifier.trim();

    // Check if it's an email
    if (trimmed.includes('@') && trimmed.includes('.')) {
      return 'email';
    }

    // Check if it's an OTP login
    if (this.otpCode) {
      return 'otp';
    }

    // Check if it's a phone number (Bangladesh or international)
    const phoneRegex = /^(?:\+880|0)1[3-9]\d{8}$/;
    if (phoneRegex.test(trimmed) || /^\+[1-9]\d{1,14}$/.test(trimmed)) {
      return 'phone';
    }

    // Default to username
    return 'username';
  }

  /**
   * Check if this is a password-based login
   */
  isPasswordLogin(): boolean {
    const method = this.detectLoginMethod();
    return method === 'email' || method === 'phone' || method === 'username';
  }

  /**
   * Check if this is an OTP login
   */
  isOtpLogin(): boolean {
    return this.detectLoginMethod() === 'otp';
  }

  /**
   * Check if password is provided
   */
  hasPassword(): boolean {
    return !!this.password && this.password.length > 0;
  }

  /**
   * Check if OTP is provided
   */
  hasOtp(): boolean {
    return !!this.otpCode && this.otpCode.length > 0;
  }

  /**
   * Check if CAPTCHA is provided
   */
  hasCaptcha(): boolean {
    return !!this.captchaToken && this.captchaToken.length > 0;
  }
}

// ============================================================
// Type Exports
// ============================================================

export type { TLoginMethod as LoginMethodType };
export type { ClientInfoDto as ClientInfoType };
