/**
 * Register DTOs - Pure Data Transport Objects (Enterprise Enhanced v3.0)
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module application/dtos/auth/register.dto
 * 
 * @description
 * Data transfer objects for user registration with enterprise features.
 * 
 * ENTERPRISE ENHANCEMENTS (v3.0):
 * ✅ Shared decorators for reusability (match.decorator.ts extracted)
 * ✅ Device fingerprint support for fraud prevention
 * ✅ Client info tracking (IP, userAgent, location)
 * ✅ Rate limit metadata integration
 * ✅ CAPTCHA support for bot protection
 * ✅ Referral system with validation
 * ✅ Welcome email preferences
 * ✅ Multi-language support (en/bn)
 * ✅ Age verification for compliance
 * ✅ GDPR consent management
 * 
 * Enterprise Rules:
 * ✅ ONLY data transport
 * ✅ Validation decorators only (class-validator)
 * ✅ API documentation decorators (Swagger)
 * ✅ Cross-field validation (password & confirmPassword match)
 * ✅ Phone number validation for Bangladesh
 * ✅ Phase-3 integration: shared-constants, shared-types, shared-utils
 */

import { 
  IsEmail, 
  IsString, 
  IsNotEmpty, 
  IsOptional, 
  MinLength, 
  MaxLength,
  Matches,
  IsBoolean,
  IsEnum,
  IsUUID,
  IsNumber,
  Min,
  Max,
  IsObject,
  ValidateNested,
  IsIn,
  IsDate,
  ValidateIf,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

// ✅ Phase-3: Import from shared packages
import {
  PASSWORD_POLICY,
  REGEX_PASSWORD,
  REGEX_EMAIL,
  REGEX_PHONE,
  REGEX_USERNAME,
  USER_TIERS,
  REGISTRATION_METHODS,
  REFERRAL_CONFIG,
  AGE_REQUIREMENTS,
  ENV_CONFIG,
} from '@vubon/shared-constants';

import type { 
  UserTier, 
  RegistrationMethod,
  AuditMetadata,
  RequestContext,
} from '@vubon/shared-types';

import { normalizePhone, isValidBdMobile } from '@vubon/shared-utils';

// ============================================================
// ✅ ENTERPRISE ENHANCEMENT: Import from shared decorators
// ============================================================

/**
 * Custom validation decorator to check if two fields match
 * ✅ MOVED TO: shared/decorators/match.decorator.ts for reusability
 * 
 * @example
 * @Match('password', { message: 'Passwords do not match' })
 * confirmPassword: string;
 * 
 * @see shared/decorators/match.decorator.ts
 */
import { Match } from '../../../../../shared/decorators/match.decorator';

// ============================================================
// Constants
// ============================================================

const IS_PRODUCTION = ENV_CONFIG?.IS_PRODUCTION ?? false;

/**
 * Password validation hints (for API documentation)
 */
export const PASSWORD_HINTS = {
  minLength: PASSWORD_POLICY.MIN_LENGTH,
  maxLength: PASSWORD_POLICY.MAX_LENGTH,
  requireUppercase: PASSWORD_POLICY.REQUIRE_UPPERCASE,
  requireLowercase: PASSWORD_POLICY.REQUIRE_LOWERCASE,
  requireNumbers: PASSWORD_POLICY.REQUIRE_NUMBERS,
  requireSpecial: PASSWORD_POLICY.REQUIRE_SPECIAL_CHARS,
  specialChars: PASSWORD_POLICY.SPECIAL_CHARS,
};

/**
 * Registration method types (from shared-constants)
 */
export const RegistrationMethod = REGISTRATION_METHODS;
export type RegistrationMethod = typeof REGISTRATION_METHODS[keyof typeof REGISTRATION_METHODS];

/**
 * User tier types (from shared-constants)
 */
export const UserTierEnum = USER_TIERS;
export type UserTier = typeof USER_TIERS[keyof typeof USER_TIERS];

// ============================================================
// ✅ ENTERPRISE ENHANCEMENT: Validation Messages (Multi-language)
// ============================================================

const VALIDATION_MESSAGES = {
  en: {
    emailRequired: 'Email is required',
    emailInvalid: 'Please provide a valid email address',
    emailMaxLength: 'Email cannot exceed 255 characters',
    emailExists: 'Email already exists',
    passwordRequired: 'Password is required',
    passwordMinLength: (min: number) => `Password must be at least ${min} characters long`,
    passwordMaxLength: (max: number) => `Password cannot exceed ${max} characters`,
    passwordWeak: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
    passwordMismatch: 'Password and confirm password do not match',
    fullNameRequired: 'Full name is required',
    fullNameMinLength: 'Full name must be at least 2 characters long',
    fullNameMaxLength: 'Full name cannot exceed 100 characters',
    fullNameInvalid: 'Full name can only contain letters, numbers, spaces, dots, hyphens, and underscores',
    phoneRequired: 'Phone number is required',
    phoneInvalid: 'Please provide a valid Bangladesh phone number (e.g., +8801712345678)',
    phoneExists: 'Phone number already exists',
    acceptTermsRequired: 'You must accept the terms and conditions',
    ageMin: (age: number) => `You must be at least ${age} years old to register`,
    deviceIdMaxLength: 'Device ID cannot exceed 255 characters',
    referralInvalid: 'Invalid referral code',
    captchaRequired: 'CAPTCHA verification failed',
  },
  bn: {
    emailRequired: 'ইমেইল প্রয়োজন',
    emailInvalid: 'একটি সঠিক ইমেইল ঠিকানা দিন',
    emailMaxLength: 'ইমেইল সর্বোচ্চ ২৫৫ অক্ষর হতে পারে',
    emailExists: 'ইমেইলটি already ব্যবহৃত হচ্ছে',
    passwordRequired: 'পাসওয়ার্ড প্রয়োজন',
    passwordMinLength: (min: number) => `পাসওয়ার্ড কমপক্ষে ${min} অক্ষরের হতে হবে`,
    passwordMaxLength: (max: number) => `পাসওয়ার্ড সর্বোচ্চ ${max} অক্ষরের হতে পারে`,
    passwordWeak: 'পাসওয়ার্ডে কমপক্ষে একটি বড় হাতের অক্ষর, একটি ছোট হাতের অক্ষর, একটি সংখ্যা এবং একটি স্পেশাল ক্যারেক্টার থাকতে হবে',
    passwordMismatch: 'পাসওয়ার্ড এবং কনফার্ম পাসওয়ার্ড মিলছে না',
    fullNameRequired: 'পূর্ণ নাম প্রয়োজন',
    fullNameMinLength: 'পূর্ণ নাম কমপক্ষে ২ অক্ষরের হতে হবে',
    fullNameMaxLength: 'পূর্ণ নাম সর্বোচ্চ ১০০ অক্ষরের হতে পারে',
    fullNameInvalid: 'পূর্ণ নামে শুধু অক্ষর, সংখ্যা, স্পেস, ডট, হাইফেন এবং আন্ডারস্কোর থাকতে পারে',
    phoneRequired: 'ফোন নম্বর প্রয়োজন',
    phoneInvalid: 'একটি সঠিক বাংলাদেশ ফোন নম্বর দিন (যেমন: +8801712345678)',
    phoneExists: 'ফোন নম্বরটি already ব্যবহৃত হচ্ছে',
    acceptTermsRequired: 'আপনাকে শর্তাবলী মেনে নিতে হবে',
    ageMin: (age: number) => `রেজিস্ট্রেশনের জন্য আপনার বয়স কমপক্ষে ${age} বছর হতে হবে`,
    deviceIdMaxLength: 'ডিভাইস আইডি সর্বোচ্চ ২৫৫ অক্ষর হতে পারে',
    referralInvalid: 'ভুল রেফারেল কোড',
    captchaRequired: 'CAPTCHA ভেরিফিকেশন ব্যর্থ হয়েছে',
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
// ✅ ENTERPRISE ENHANCEMENT: Client Info DTO
// ============================================================

/**
 * Client information for security and fraud prevention
 */
export class ClientInfoDto {
  @ApiPropertyOptional({
    description: 'IP address of the client',
    example: '192.168.1.100',
  })
  @IsOptional()
  @IsString()
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
    description: 'Device fingerprint for fraud detection',
    example: 'fp_abc123def456',
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

// ============================================================
// ✅ ENTERPRISE ENHANCEMENT: Consent Management DTO
// ============================================================

/**
 * Consent management for GDPR compliance
 */
export class ConsentDto {
  @ApiProperty({
    description: 'Accept terms and conditions',
    example: true,
  })
  @IsBoolean({ message: 'Accept terms must be a boolean' })
  acceptTerms: boolean;

  @ApiPropertyOptional({
    description: 'Accept privacy policy',
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  acceptPrivacy?: boolean;

  @ApiPropertyOptional({
    description: 'Consent to marketing emails',
    example: false,
    default: false,
  })
  @IsOptional()
  @IsBoolean()
  marketingConsent?: boolean = false;

  @ApiPropertyOptional({
    description: 'Consent to SMS notifications',
    example: false,
    default: false,
  })
  @IsOptional()
  @IsBoolean()
  smsConsent?: boolean = false;

  @ApiPropertyOptional({
    description: 'Consent to WhatsApp notifications (Bangladesh specific)',
    example: false,
    default: false,
  })
  @IsOptional()
  @IsBoolean()
  whatsappConsent?: boolean = false;

  @ApiPropertyOptional({
    description: 'Data retention consent',
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  dataRetentionConsent?: boolean = true;

  @ApiPropertyOptional({
    description: 'Age confirmation (13+ for standard, 18+ for vendor)',
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  ageConfirmation?: boolean;
}

// ============================================================
// ✅ ENTERPRISE ENHANCEMENT: Rate Limit Metadata
// ============================================================

/**
 * Rate limit metadata for registration attempts
 */
export class RegistrationRateLimitDto {
  @ApiPropertyOptional({ description: 'Rate limit window (seconds)', example: 3600 })
  @IsOptional()
  @IsNumber()
  @Min(1)
  windowSeconds?: number;

  @ApiPropertyOptional({ description: 'Max requests allowed', example: 3 })
  @IsOptional()
  @IsNumber()
  @Min(1)
  maxRequests?: number;

  @ApiPropertyOptional({ description: 'Remaining requests', example: 2 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  remaining?: number;

  @ApiPropertyOptional({ description: 'Reset timestamp', example: '2024-01-01T01:00:00.000Z' })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  resetAt?: Date;
}

// ============================================================
// ✅ ENTERPRISE ENHANCEMENT: Enhanced Register DTO
// ============================================================

/**
 * User Registration Request DTO (Email based) - Enterprise Enhanced
 * 
 * @example
 * {
 *   "email": "user@vubon.com.bd",
 *   "password": "MyStr0ng!P@ssw0rd123",
 *   "confirmPassword": "MyStr0ng!P@ssw0rd123",
 *   "fullName": "John Doe",
 *   "displayName": "John",
 *   "phone": "+8801712345678",
 *   "deviceId": "device_550e8400-e29b-41d4-a716-446655440000",
 *   "consent": { "acceptTerms": true, "marketingConsent": false },
 *   "referralCode": "REF123456",
 *   "preferredLanguage": "en",
 *   "age": 25,
 *   "clientInfo": { "ipAddress": "192.168.1.100", "district": "Dhaka" },
 *   "captchaToken": "03AGdBq27..."
 * }
 */
export class RegisterDto {
  @ApiProperty({
    description: 'User email address (must be unique)',
    example: 'user@vubon.com.bd',
    required: true,
    format: 'email',
    maxLength: 255,
  })
  @IsEmail({}, { message: () => getValidationMessage('emailInvalid') })
  @IsNotEmpty({ message: () => getValidationMessage('emailRequired') })
  @MaxLength(255, { message: () => getValidationMessage('emailMaxLength') })
  @Matches(REGEX_EMAIL.STRICT, { message: () => getValidationMessage('emailInvalid') })
  email: string;

  @ApiProperty({
    description: 'User password',
    example: 'MyStr0ng!P@ssw0rd123',
    required: true,
    minLength: PASSWORD_HINTS.minLength,
    maxLength: PASSWORD_HINTS.maxLength,
    format: 'password',
    writeOnly: true,
  })
  @IsString({ message: 'Password must be a string' })
  @IsNotEmpty({ message: () => getValidationMessage('passwordRequired') })
  @MinLength(PASSWORD_POLICY.MIN_LENGTH, { 
    message: () => getValidationMessage('passwordMinLength', [PASSWORD_POLICY.MIN_LENGTH]) 
  })
  @MaxLength(PASSWORD_POLICY.MAX_LENGTH, { 
    message: () => getValidationMessage('passwordMaxLength', [PASSWORD_POLICY.MAX_LENGTH]) 
  })
  @Matches(REGEX_PASSWORD.STRONG, {
    message: () => getValidationMessage('passwordWeak'),
  })
  password: string;

  @ApiProperty({
    description: 'Confirm password (must match password)',
    example: 'MyStr0ng!P@ssw0rd123',
    required: true,
    format: 'password',
    writeOnly: true,
  })
  @IsString({ message: 'Confirm password must be a string' })
  @IsNotEmpty({ message: 'Confirm password is required' })
  @Match('password', { message: () => getValidationMessage('passwordMismatch') })
  confirmPassword: string;

  @ApiProperty({
    description: 'User full name',
    example: 'John Doe',
    required: true,
    minLength: 2,
    maxLength: 100,
  })
  @IsString({ message: 'Full name must be a string' })
  @IsNotEmpty({ message: () => getValidationMessage('fullNameRequired') })
  @MinLength(2, { message: () => getValidationMessage('fullNameMinLength') })
  @MaxLength(100, { message: () => getValidationMessage('fullNameMaxLength') })
  @Matches(REGEX_USERNAME.STANDARD, {
    message: () => getValidationMessage('fullNameInvalid'),
  })
  fullName: string;

  @ApiPropertyOptional({
    description: 'Display name (if not provided, derived from full name)',
    example: 'John',
    maxLength: 50,
  })
  @IsOptional()
  @IsString({ message: 'Display name must be a string' })
  @MaxLength(50, { message: 'Display name cannot exceed 50 characters' })
  displayName?: string;

  @ApiPropertyOptional({
    description: 'Phone number (E.164 format, Bangladesh numbers start with +880)',
    example: '+8801712345678',
    maxLength: 15,
  })
  @IsOptional()
  @IsString({ message: 'Phone number must be a string' })
  @Matches(REGEX_PHONE.BANGLADESH, {
    message: () => getValidationMessage('phoneInvalid'),
  })
  @ValidateIf((o) => o.phone)
  phone?: string;

  @ApiPropertyOptional({
    description: 'Device identifier for session tracking',
    example: 'device_550e8400-e29b-41d4-a716-446655440000',
    maxLength: 255,
  })
  @IsOptional()
  @IsString({ message: 'Device ID must be a string' })
  @MaxLength(255, { message: () => getValidationMessage('deviceIdMaxLength') })
  deviceId?: string;

  // ✅ ENTERPRISE ENHANCEMENT: Consent management
  @ApiPropertyOptional({
    description: 'Consent management for GDPR compliance',
    type: ConsentDto,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => ConsentDto)
  consent?: ConsentDto;

  @ApiPropertyOptional({
    description: 'Referral code (if applicable)',
    example: 'REF123456',
    maxLength: 50,
  })
  @IsOptional()
  @IsString({ message: 'Referral code must be a string' })
  @MaxLength(50, { message: 'Referral code cannot exceed 50 characters' })
  @Matches(/^[A-Za-z0-9]{6,20}$/, { message: () => getValidationMessage('referralInvalid') })
  referralCode?: string;

  @ApiPropertyOptional({
    description: 'Preferred language',
    example: 'en',
    enum: ['en', 'bn'],
    default: 'en',
  })
  @IsOptional()
  @IsEnum(['en', 'bn'], { message: 'Preferred language must be en or bn' })
  preferredLanguage?: 'en' | 'bn' = 'en';

  // ✅ ENTERPRISE ENHANCEMENT: Age verification
  @ApiPropertyOptional({
    description: 'User age (for age verification)',
    example: 25,
    minimum: AGE_REQUIREMENTS.MIN_AGE,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber({}, { message: 'Age must be a number' })
  @Min(AGE_REQUIREMENTS.MIN_AGE, { 
    message: () => getValidationMessage('ageMin', [AGE_REQUIREMENTS.MIN_AGE]) 
  })
  @Max(120, { message: 'Age cannot exceed 120' })
  age?: number;

  // ✅ ENTERPRISE ENHANCEMENT: Registration method
  @ApiPropertyOptional({
    description: 'Registration method',
    enum: RegistrationMethod,
    example: RegistrationMethod.EMAIL,
    default: RegistrationMethod.EMAIL,
  })
  @IsOptional()
  @IsEnum(RegistrationMethod, { 
    message: `Registration method must be one of: ${Object.values(RegistrationMethod).join(', ')}` 
  })
  method?: RegistrationMethod = RegistrationMethod.EMAIL;

  // ✅ ENTERPRISE ENHANCEMENT: Client info for fraud detection
  @ApiPropertyOptional({
    description: 'Client information for security tracking',
    type: ClientInfoDto,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => ClientInfoDto)
  clientInfo?: ClientInfoDto;

  // ✅ ENTERPRISE ENHANCEMENT: CAPTCHA support
  @ApiPropertyOptional({
    description: 'CAPTCHA token for bot protection',
    example: '03AGdBq27...',
  })
  @IsOptional()
  @IsString({ message: 'CAPTCHA token must be a string' })
  captchaToken?: string;

  // ✅ ENTERPRISE ENHANCEMENT: Correlation ID for tracing
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
    type: RegistrationRateLimitDto,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => RegistrationRateLimitDto)
  rateLimit?: RegistrationRateLimitDto;

  constructor(
    email: string, 
    password: string, 
    confirmPassword: string,
    fullName: string, 
    consent?: ConsentDto,
    phone?: string,
    deviceId?: string,
    displayName?: string,
    referralCode?: string,
    preferredLanguage?: 'en' | 'bn',
    age?: number,
    clientInfo?: ClientInfoDto,
    captchaToken?: string,
    correlationId?: string
  ) {
    this.email = email;
    this.password = password;
    this.confirmPassword = confirmPassword;
    this.fullName = fullName;
    this.consent = consent || { acceptTerms: true };
    this.phone = phone;
    this.deviceId = deviceId;
    this.displayName = displayName;
    this.referralCode = referralCode;
    this.preferredLanguage = preferredLanguage ?? 'en';
    this.age = age;
    this.clientInfo = clientInfo;
    this.captchaToken = captchaToken;
    this.correlationId = correlationId;
  }

  /**
   * ✅ ENTERPRISE ENHANCEMENT: Helper to check if terms are accepted
   */
  get hasAcceptedTerms(): boolean {
    return this.consent?.acceptTerms === true;
  }

  /**
   * ✅ ENTERPRISE ENHANCEMENT: Helper to check if phone is provided
   */
  get hasPhone(): boolean {
    return !!this.phone;
  }

  /**
   * ✅ ENTERPRISE ENHANCEMENT: Helper to normalize phone number
   */
  getNormalizedPhone(): string | null {
    if (!this.phone) return null;
    return normalizePhone(this.phone, 'BD');
  }

  /**
   * ✅ ENTERPRISE ENHANCEMENT: Helper to check if phone is valid BD mobile
   */
  get isValidBdMobile(): boolean {
    return this.phone ? isValidBdMobile(this.phone) : false;
  }

  /**
   * ✅ ENTERPRISE ENHANCEMENT: Get validation message in appropriate language
   */
  getMessage(key: keyof typeof VALIDATION_MESSAGES.en, ...args: unknown[]): string {
    const locale = this.preferredLanguage === 'bn' ? 'bn' : 'en';
    return getValidationMessage(key, args, locale);
  }
}

// ============================================================
// ✅ ENTERPRISE ENHANCEMENT: Phone Registration DTO (Bangladesh specific)
// ============================================================

/**
 * Phone Registration Request DTO (Bangladesh specific) - Enhanced
 * 
 * @example
 * {
 *   "phoneNumber": "+8801712345678",
 *   "otpCode": "123456",
 *   "fullName": "John Doe",
 *   "displayName": "John",
 *   "email": "user@vubon.com.bd",
 *   "deviceId": "device-123",
 *   "consent": { "acceptTerms": true },
 *   "referralCode": "REF123456",
 *   "clientInfo": { "networkType": "4g", "district": "Dhaka" }
 * }
 */
export class PhoneRegisterDto {
  @ApiProperty({
    description: 'Bangladesh phone number (E.164 format)',
    example: '+8801712345678',
    required: true,
  })
  @IsString({ message: 'Phone number must be a string' })
  @IsNotEmpty({ message: () => getValidationMessage('phoneRequired') })
  @Matches(REGEX_PHONE.BANGLADESH, { 
    message: () => getValidationMessage('phoneInvalid') 
  })
  phoneNumber: string;

  @ApiProperty({
    description: 'One-Time Password (OTP) for verification',
    example: '123456',
    required: true,
    minLength: 6,
    maxLength: 6,
    pattern: '^[0-9]{6}$',
  })
  @IsString({ message: 'OTP code must be a string' })
  @IsNotEmpty({ message: 'OTP code is required' })
  @Matches(/^\d{6}$/, { message: 'OTP code must be exactly 6 digits' })
  otpCode: string;

  @ApiProperty({
    description: 'User full name',
    example: 'John Doe',
    required: true,
    minLength: 2,
    maxLength: 100,
  })
  @IsString({ message: 'Full name must be a string' })
  @IsNotEmpty({ message: () => getValidationMessage('fullNameRequired') })
  @MinLength(2, { message: () => getValidationMessage('fullNameMinLength') })
  @MaxLength(100, { message: () => getValidationMessage('fullNameMaxLength') })
  @Matches(REGEX_USERNAME.STANDARD, {
    message: () => getValidationMessage('fullNameInvalid'),
  })
  fullName: string;

  @ApiPropertyOptional({
    description: 'Display name (if not provided, derived from full name)',
    example: 'John',
    maxLength: 50,
  })
  @IsOptional()
  @IsString({ message: 'Display name must be a string' })
  @MaxLength(50, { message: 'Display name cannot exceed 50 characters' })
  displayName?: string;

  @ApiPropertyOptional({
    description: 'Email address (optional)',
    example: 'user@vubon.com.bd',
    format: 'email',
  })
  @IsOptional()
  @IsEmail({}, { message: () => getValidationMessage('emailInvalid') })
  email?: string;

  @ApiPropertyOptional({
    description: 'Device identifier for session tracking',
    example: 'device_550e8400-e29b-41d4-a716-446655440000',
    maxLength: 255,
  })
  @IsOptional()
  @IsString({ message: 'Device ID must be a string' })
  @MaxLength(255, { message: () => getValidationMessage('deviceIdMaxLength') })
  deviceId?: string;

  @ApiPropertyOptional({
    description: 'Consent management',
    type: ConsentDto,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => ConsentDto)
  consent?: ConsentDto;

  @ApiPropertyOptional({
    description: 'Referral code (if applicable)',
    example: 'REF123456',
    maxLength: 50,
  })
  @IsOptional()
  @IsString({ message: 'Referral code must be a string' })
  @MaxLength(50, { message: 'Referral code cannot exceed 50 characters' })
  @Matches(/^[A-Za-z0-9]{6,20}$/, { message: () => getValidationMessage('referralInvalid') })
  referralCode?: string;

  @ApiPropertyOptional({
    description: 'Preferred language',
    example: 'bn',
    enum: ['en', 'bn'],
    default: 'en',
  })
  @IsOptional()
  @IsEnum(['en', 'bn'], { message: 'Preferred language must be en or bn' })
  preferredLanguage?: 'en' | 'bn' = 'en';

  @ApiPropertyOptional({
    description: 'User age (for age verification)',
    example: 25,
    minimum: AGE_REQUIREMENTS.MIN_AGE,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber({}, { message: 'Age must be a number' })
  @Min(AGE_REQUIREMENTS.MIN_AGE, { 
    message: () => getValidationMessage('ageMin', [AGE_REQUIREMENTS.MIN_AGE]) 
  })
  @Max(120, { message: 'Age cannot exceed 120' })
  age?: number;

  @ApiPropertyOptional({
    description: 'Client information for security tracking',
    type: ClientInfoDto,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => ClientInfoDto)
  clientInfo?: ClientInfoDto;

  @ApiPropertyOptional({
    description: 'CAPTCHA token for bot protection',
    example: '03AGdBq27...',
  })
  @IsOptional()
  @IsString()
  captchaToken?: string;

  @ApiPropertyOptional({
    description: 'Correlation ID for tracing',
    example: 'corr_550e8400-e29b-41d4-a716-446655440000',
  })
  @IsOptional()
  @IsUUID()
  correlationId?: string;

  constructor(
    phoneNumber: string,
    otpCode: string,
    fullName: string,
    consent?: ConsentDto,
    email?: string,
    deviceId?: string,
    displayName?: string,
    referralCode?: string,
    preferredLanguage?: 'en' | 'bn',
    age?: number,
    clientInfo?: ClientInfoDto,
    captchaToken?: string,
    correlationId?: string
  ) {
    this.phoneNumber = phoneNumber;
    this.otpCode = otpCode;
    this.fullName = fullName;
    this.consent = consent || { acceptTerms: true };
    this.email = email;
    this.deviceId = deviceId;
    this.displayName = displayName;
    this.referralCode = referralCode;
    this.preferredLanguage = preferredLanguage ?? 'en';
    this.age = age;
    this.clientInfo = clientInfo;
    this.captchaToken = captchaToken;
    this.correlationId = correlationId;
  }

  get hasAcceptedTerms(): boolean {
    return this.consent?.acceptTerms === true;
  }

  getNormalizedPhone(): string | null {
    return normalizePhone(this.phoneNumber, 'BD');
  }
}

// ============================================================
// Response DTOs (Enterprise Enhanced)
// ============================================================

/**
 * User Registration Response DTO - Enhanced
 */
export class RegisterResponseDto {
  @ApiProperty({
    description: 'User unique identifier',
    example: 'usr_550e8400-e29b-41d4-a716-446655440000',
  })
  userId: string;

  @ApiPropertyOptional({
    description: 'User email address',
    example: 'user@vubon.com.bd',
    format: 'email',
  })
  email?: string;

  @ApiPropertyOptional({
    description: 'Phone number (E.164 format)',
    example: '+8801712345678',
  })
  phoneNumber?: string;

  @ApiProperty({
    description: 'Success message in English',
    example: 'User registered successfully. Please verify your email.',
  })
  message: string;

  @ApiPropertyOptional({
    description: 'Success message in Bengali',
    example: 'ইউজার সফলভাবে নিবন্ধিত হয়েছে। অনুগ্রহ করে আপনার ইমেইল ভেরিফাই করুন।',
  })
  messageBn?: string;

  @ApiProperty({
    description: 'Whether email verification is required',
    example: true,
  })
  requiresEmailVerification: boolean;

  @ApiProperty({
    description: 'Whether phone verification is required',
    example: false,
  })
  requiresPhoneVerification: boolean;

  @ApiPropertyOptional({
    description: 'Timestamp when user was created',
    example: '2024-01-01T00:00:00.000Z',
    format: 'date-time',
  })
  createdAt?: string;

  @ApiPropertyOptional({
    description: 'Initial session ID (if auto-login after registration)',
    example: 'sess_abc123',
  })
  sessionId?: string;

  @ApiPropertyOptional({
    description: 'Access token (if auto-login is enabled)',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  accessToken?: string;

  @ApiPropertyOptional({
    description: 'User tier after registration',
    enum: Object.values(USER_TIERS),
    example: USER_TIERS.BRONZE,
  })
  userTier?: UserTier;

  @ApiPropertyOptional({
    description: 'Correlation ID for tracing',
    example: 'corr_550e8400-e29b-41d4-a716-446655440000',
  })
  correlationId?: string;

  // ✅ ENTERPRISE ENHANCEMENT: Rate limit metadata
  @ApiPropertyOptional({
    description: 'Rate limit metadata',
    type: RegistrationRateLimitDto,
  })
  rateLimit?: RegistrationRateLimitDto;

  constructor(
    userId: string, 
    requiresEmailVerification: boolean = true,
    requiresPhoneVerification: boolean = false,
    createdAt?: Date,
    sessionId?: string,
    accessToken?: string,
    email?: string,
    phoneNumber?: string,
    message?: string,
    messageBn?: string,
    userTier?: UserTier,
    correlationId?: string,
    rateLimit?: RegistrationRateLimitDto
  ) {
    this.userId = userId;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.message = message || (requiresEmailVerification 
      ? 'User registered successfully. Please verify your email.' 
      : 'User registered successfully. You can now log in.');
    this.messageBn = messageBn;
    this.requiresEmailVerification = requiresEmailVerification;
    this.requiresPhoneVerification = requiresPhoneVerification;
    if (createdAt) {
      this.createdAt = createdAt.toISOString();
    }
    if (sessionId) {
      this.sessionId = sessionId;
    }
    if (accessToken) {
      this.accessToken = accessToken;
    }
    this.userTier = userTier;
    this.correlationId = correlationId;
    this.rateLimit = rateLimit;
  }
}

// ============================================================
// ✅ ENTERPRISE ENHANCEMENT: Welcome Email Preferences DTO
// ============================================================

/**
 * Welcome email preferences
 */
export class WelcomeEmailPreferencesDto {
  @ApiPropertyOptional({
    description: 'Send welcome email',
    example: true,
    default: true,
  })
  @IsOptional()
  @IsBoolean()
  sendWelcomeEmail?: boolean = true;

  @ApiPropertyOptional({
    description: 'Welcome email language',
    example: 'bn',
    enum: ['en', 'bn'],
    default: 'en',
  })
  @IsOptional()
  @IsEnum(['en', 'bn'])
  welcomeEmailLanguage?: 'en' | 'bn' = 'en';

  @ApiPropertyOptional({
    description: 'Include getting started guide',
    example: true,
    default: false,
  })
  @IsOptional()
  @IsBoolean()
  includeGettingStarted?: boolean = false;
}

// ============================================================
// Type Exports
// ============================================================

export type { 
  PASSWORD_HINTS as PasswordHints,
  ClientInfoDto as ClientInfoDtoType,
  ConsentDto as ConsentDtoType,
  RegistrationRateLimitDto as RegistrationRateLimitDtoType,
  WelcomeEmailPreferencesDto as WelcomeEmailPreferencesDtoType,
};

// ============================================================
// ENTERPRISE SUMMARY v3.0
// ============================================================
// 
// Enterprise Enhancements Applied:
// 1. ✅ Shared decorators (Match validator moved to shared/decorators)
// 2. ✅ Device fingerprint support for fraud prevention
// 3. ✅ Client info tracking (IP, userAgent, location, networkType)
// 4. ✅ Rate limit metadata integration
// 5. ✅ CAPTCHA support for bot protection
// 6. ✅ Referral system with validation
// 7. ✅ Welcome email preferences
// 8. ✅ Multi-language support (en/bn) throughout
// 9. ✅ Age verification for compliance
// 10. ✅ GDPR consent management
// 11. ✅ Correlation ID for distributed tracing
// 12. ✅ Helper methods for common operations
// 13. ✅ Phone number normalization utility
// 14. ✅ Locale-based validation messages
// 
// Bangladesh Specific:
// - Phone number validation with +880 format
// - WhatsApp consent option
// - Network type tracking (2g/3g/4g/5g/wifi)
// - District tracking for location-based services
// - Bengali language support (messageBn)
// - SMS/WhatsApp/Voice verification methods
// 
// ============================================================
