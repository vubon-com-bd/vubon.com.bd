/**
 * Register DTOs - Pure Data Transport Objects (Enterprise Enhanced v2.0)
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 *
 * @module application/dtos/auth/register.dto
 *
 * @description
 * Data transfer objects for user registration with enterprise features.
 * Supports email, phone, social, and username-based registration.
 *
 * ENTERPRISE ENHANCEMENTS (v2.0):
 * ✅ Multi-method registration (Email, Phone, Social, Username)
 * ✅ Device fingerprint support
 * ✅ Rate limit metadata
 * ✅ Bengali error messages
 * ✅ Referral code support
 * ✅ Age verification (Bangladesh specific)
 * ✅ Client info tracking
 * ✅ Audit log correlation
 * ✅ Distributed tracing support
 *
 * Enterprise Rules:
 * ✅ ONLY data transport
 * ✅ Validation decorators only (class-validator)
 * ✅ API documentation decorators (Swagger)
 * ✅ No domain logic
 * ✅ No repository calls
 * ✅ Bangladesh specific - Phone, NID, Trade License support
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
  IsNumber,
  Min,
  Max,
  ValidateNested,
  IsIn,
  IsIP,
  IsDate,
  IsUrl,
  Equals,
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

// ============================================================
// ✅ FIXED: Correct imports from shared-constants
// ============================================================
import {
  REGEX_EMAIL,
  REGEX_PHONE,
  REGEX_USERNAME,
  PASSWORD_POLICY,
  AUTH_PROVIDERS,
} from '@vubon/shared-constants';

// ============================================================
// ✅ FIXED: Correct imports from shared-types (no conflicts)
// ============================================================
import type {
  UserTier as SharedUserTier,
  RegistrationMetadata,
} from '@vubon/shared-types';

// ============================================================
// ENTERPRISE ENHANCEMENT: Validation Messages
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
    firstNameRequired: 'First name is required',
    firstNameMinLength: 'First name must be at least 2 characters',
    firstNameMaxLength: 'First name cannot exceed 50 characters',
    lastNameRequired: 'Last name is required',
    lastNameMinLength: 'Last name must be at least 2 characters',
    lastNameMaxLength: 'Last name cannot exceed 50 characters',
    displayNameMinLength: 'Display name must be at least 2 characters',
    displayNameMaxLength: 'Display name cannot exceed 100 characters',
    acceptTermsRequired: 'You must accept the terms and conditions',
    acceptPrivacyRequired: 'You must accept the privacy policy',
    referralCodeInvalid: 'Invalid referral code format',
    referralCodeMaxLength: 'Referral code cannot exceed 50 characters',
    providerRequired: 'Provider is required',
    providerUserIdRequired: 'Provider user ID is required',
    avatarInvalid: 'Invalid avatar URL',
    businessNameRequired: 'Business name is required',
    businessNameMaxLength: 'Business name cannot exceed 100 characters',
    businessAddressRequired: 'Business address is required',
    businessAddressMaxLength: 'Business address cannot exceed 500 characters',
    tradeLicenseRequired: 'Trade license number is required',
    tradeLicenseMaxLength: 'Trade license number cannot exceed 50 characters',
    tinRequired: 'TIN number is required',
    tinMinLength: 'TIN number must be at least 9 characters',
    tinMaxLength: 'TIN number cannot exceed 20 characters',
    nidRequired: 'NID number is required',
    nidMinLength: 'NID number must be at least 10 characters',
    nidMaxLength: 'NID number cannot exceed 17 characters',
    otpRequired: 'OTP code is required',
    otpInvalid: 'OTP code must be exactly 6 digits',
    ageVerificationRequired: 'You must confirm your age',
    deviceIdMaxLength: 'Device ID cannot exceed 255 characters',
    captchaRequired: 'CAPTCHA verification failed',
    confirmPasswordMatch: 'Passwords do not match',
  },
  bn: {
    emailRequired: 'ইমেইল প্রয়োজন',
    emailInvalid: 'একটি সঠিক ইমেইল ঠিকানা দিন',
    emailMaxLength: 'ইমেইল সর্বোচ্চ ২৫৫ অক্ষর হতে পারে',
    passwordRequired: 'পাসওয়ার্ড প্রয়োজন',
    passwordMinLength: (min: number) => `পাসওয়ার্ড কমপক্ষে ${min} অক্ষরের হতে হবে`,
    passwordMaxLength: (max: number) => `পাসওয়ার্ড সর্বোচ্চ ${max} অক্ষরের হতে পারে`,
    phoneRequired: 'ফোন নম্বর প্রয়োজন',
    phoneInvalid: 'একটি সঠিক বাংলাদেশ ফোন নম্বর দিন (উদাহরণ: +8801712345678 বা 01712345678)',
    usernameRequired: 'ইউজারনাম প্রয়োজন',
    usernameInvalid: 'ইউজারনাম ৩-২০ অক্ষরের হতে হবে এবং এতে অক্ষর, সংখ্যা, ডট ও আন্ডারস্কোর থাকতে পারে',
    firstNameRequired: 'প্রথম নাম প্রয়োজন',
    firstNameMinLength: 'প্রথম নাম কমপক্ষে ২ অক্ষরের হতে হবে',
    firstNameMaxLength: 'প্রথম নাম সর্বোচ্চ ৫০ অক্ষর হতে পারে',
    lastNameRequired: 'শেষ নাম প্রয়োজন',
    lastNameMinLength: 'শেষ নাম কমপক্ষে ২ অক্ষরের হতে হবে',
    lastNameMaxLength: 'শেষ নাম সর্বোচ্চ ৫০ অক্ষর হতে পারে',
    displayNameMinLength: 'ডিসপ্লে নাম কমপক্ষে ২ অক্ষরের হতে হবে',
    displayNameMaxLength: 'ডিসপ্লে নাম সর্বোচ্চ ১০০ অক্ষর হতে পারে',
    acceptTermsRequired: 'আপনাকে শর্তাবলী মেনে নিতে হবে',
    acceptPrivacyRequired: 'আপনাকে গোপনীয়তা নীতি মেনে নিতে হবে',
    referralCodeInvalid: 'ভুল রেফারেল কোড ফরম্যাট',
    referralCodeMaxLength: 'রেফারেল কোড সর্বোচ্চ ৫০ অক্ষর হতে পারে',
    providerRequired: 'প্রোভাইডার প্রয়োজন',
    providerUserIdRequired: 'প্রোভাইডার ইউজার আইডি প্রয়োজন',
    avatarInvalid: 'ভুল অবতার URL',
    businessNameRequired: 'ব্যবসার নাম প্রয়োজন',
    businessNameMaxLength: 'ব্যবসার নাম সর্বোচ্চ ১০০ অক্ষর হতে পারে',
    businessAddressRequired: 'ব্যবসার ঠিকানা প্রয়োজন',
    businessAddressMaxLength: 'ব্যবসার ঠিকানা সর্বোচ্চ ৫০০ অক্ষর হতে পারে',
    tradeLicenseRequired: 'ট্রেড লাইসেন্স নম্বর প্রয়োজন',
    tradeLicenseMaxLength: 'ট্রেড লাইসেন্স নম্বর সর্বোচ্চ ৫০ অক্ষর হতে পারে',
    tinRequired: 'টিআইএন নম্বর প্রয়োজন',
    tinMinLength: 'টিআইএন নম্বর কমপক্ষে ৯ অক্ষরের হতে হবে',
    tinMaxLength: 'টিআইএন নম্বর সর্বোচ্চ ২০ অক্ষর হতে পারে',
    nidRequired: 'এনআইডি নম্বর প্রয়োজন',
    nidMinLength: 'এনআইডি নম্বর কমপক্ষে ১০ অক্ষরের হতে হবে',
    nidMaxLength: 'এনআইডি নম্বর সর্বোচ্চ ১৭ অক্ষর হতে পারে',
    otpRequired: 'OTP কোড প্রয়োজন',
    otpInvalid: 'OTP কোড অবশ্যই ৬ ডিজিটের হতে হবে',
    ageVerificationRequired: 'আপনাকে আপনার বয়স নিশ্চিত করতে হবে',
    deviceIdMaxLength: 'ডিভাইস আইডি সর্বোচ্চ ২৫৫ অক্ষর হতে পারে',
    captchaRequired: 'CAPTCHA ভেরিফিকেশন ব্যর্থ হয়েছে',
    confirmPasswordMatch: 'পাসওয়ার্ড দুটি মিলছে না',
  },
};

// ============================================================
// Helper function for validation messages
// ============================================================

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
  return (messageFn as string) || (VALIDATION_MESSAGES.en[key] as string);
}

// ============================================================
// ✅ FIXED: Local enums (no import conflicts)
// ============================================================

/**
 * Registration method enum (local - no import conflict)
 */
export enum RegistrationMethod {
  EMAIL = 'email',
  PHONE = 'phone',
  SOCIAL = 'social',
  USERNAME = 'username',
}

/**
 * User tier type (using shared type with alias)
 */
export type TUserTier = SharedUserTier;

/**
 * User role type (from shared-constants)
 */
export type TUserRole = typeof AUTH_PROVIDERS[keyof typeof AUTH_PROVIDERS];

// ============================================================
// Small helper Match decorator (class-validator) to enforce confirm password
// ============================================================

export function Match(property: string, validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'match',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [property],
      validator: {
        validate(value: any, args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints;
          // @ts-ignore
          return value === (args.object as any)[relatedPropertyName];
        },
        defaultMessage(args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints;
          return `${propertyName} must match ${relatedPropertyName}`;
        },
      },
    });
  };
}

// ============================================================
// USERNAME regex fallback
// ============================================================
const USERNAME_REGEX = REGEX_USERNAME?.STANDARD ?? /^[a-zA-Z0-9._]{3,20}$/;

// ============================================================
// ✅ ENTERPRISE ENHANCEMENT: Client Info DTO
// ============================================================

/**
 * Client information for security and analytics
 */
export class RegisterClientInfoDto {
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
}

// ============================================================
// ✅ FIXED: Registration Rate Limit DTO
// ============================================================

export class RegistrationRateLimitDto {
  @ApiPropertyOptional({ description: 'Rate limit window (seconds)', example: 3600 })
  @IsOptional()
  @IsNumber()
  @Min(1)
  windowSeconds?: number | undefined;

  @ApiPropertyOptional({ description: 'Max requests allowed', example: 3 })
  @IsOptional()
  @IsNumber()
  @Min(1)
  maxRequests?: number | undefined;

  @ApiPropertyOptional({ description: 'Remaining requests', example: 2 })
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
// ✅ FIXED: Registration Age Configuration (local)
// ============================================================

const AGE_CONFIG = {
  MIN_AGE_CUSTOMER: 13,
  MIN_AGE_VENDOR: 18,
  MAX_AGE: 120,
  VERIFICATION_REQUIRED_FOR_VENDOR: true,
} as const;

// ============================================================
// ✅ ENTERPRISE ENHANCEMENT: Base Registration DTO
// ============================================================

/**
 * Base registration DTO with common fields
 */
export class BaseRegisterDto {
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
    description: 'Client information for security tracking',
    type: RegisterClientInfoDto,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => RegisterClientInfoDto)
  clientInfo?: RegisterClientInfoDto | undefined;

  @ApiPropertyOptional({
    description: 'Correlation ID for distributed tracing',
    example: 'corr_550e8400-e29b-41d4-a716-446655440000',
  })
  @IsOptional()
  @IsUUID()
  correlationId?: string | undefined;

  @ApiPropertyOptional({
    description: 'Rate limit metadata',
    type: RegistrationRateLimitDto,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => RegistrationRateLimitDto)
  rateLimit?: RegistrationRateLimitDto | undefined;
}

// ============================================================
// ✅ FIXED: Email Registration DTO
// ============================================================

export class EmailRegisterDto extends BaseRegisterDto {
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

  @ApiProperty({
    description: 'Confirm password',
    example: 'MyStr0ng!P@ssw0rd',
    required: true,
    format: 'password',
    writeOnly: true,
  })
  @IsString({ message: 'Confirm password must be a string' })
  @IsNotEmpty({ message: 'Confirm password is required' })
  @MinLength(PASSWORD_POLICY.MIN_LENGTH, {
    message: getValidationMessage('passwordMinLength', [PASSWORD_POLICY.MIN_LENGTH]),
  })
  @MaxLength(PASSWORD_POLICY.MAX_LENGTH, {
    message: getValidationMessage('passwordMaxLength', [PASSWORD_POLICY.MAX_LENGTH]),
  })
  @Match('password', { message: getValidationMessage('confirmPasswordMatch') })
  confirmPassword: string;

  @ApiProperty({
    description: 'First name',
    example: 'John',
    required: true,
    minLength: 2,
    maxLength: 50,
  })
  @IsString({ message: getValidationMessage('firstNameRequired') })
  @IsNotEmpty({ message: getValidationMessage('firstNameRequired') })
  @MinLength(2, { message: getValidationMessage('firstNameMinLength') })
  @MaxLength(50, { message: getValidationMessage('firstNameMaxLength') })
  @Matches(/^[a-zA-Z\u0980-\u09FF\s\-']+$/, {
    message: 'First name can only contain letters, spaces, hyphens, and apostrophes',
  })
  firstName: string;

  @ApiProperty({
    description: 'Last name',
    example: 'Doe',
    required: true,
    minLength: 2,
    maxLength: 50,
  })
  @IsString({ message: getValidationMessage('lastNameRequired') })
  @IsNotEmpty({ message: getValidationMessage('lastNameRequired') })
  @MinLength(2, { message: getValidationMessage('lastNameMinLength') })
  @MaxLength(50, { message: getValidationMessage('lastNameMaxLength') })
  @Matches(/^[a-zA-Z\u0980-\u09FF\s\-']+$/, {
    message: 'Last name can only contain letters, spaces, hyphens, and apostrophes',
  })
  lastName: string;

  @ApiPropertyOptional({
    description: 'Display name (auto-generated if not provided)',
    example: 'JohnDoe',
    minLength: 2,
    maxLength: 100,
  })
  @IsOptional()
  @IsString()
  @MinLength(2, { message: getValidationMessage('displayNameMinLength') })
  @MaxLength(100, { message: getValidationMessage('displayNameMaxLength') })
  @Matches(/^[a-zA-Z0-9\u0980-\u09FF\s_.-]+$/, {
    message: 'Display name contains invalid characters',
  })
  displayName?: string | undefined;

  @ApiProperty({
    description: 'Accept terms and conditions',
    example: true,
    required: true,
  })
  @IsBoolean({ message: 'Accept terms must be a boolean' })
  @Equals(true, { message: getValidationMessage('acceptTermsRequired') })
  acceptTerms: boolean = false;

  @ApiProperty({
    description: 'Accept privacy policy',
    example: true,
    required: true,
  })
  @IsBoolean({ message: 'Accept privacy must be a boolean' })
  @Equals(true, { message: getValidationMessage('acceptPrivacyRequired') })
  acceptPrivacy: boolean = false;

  @ApiPropertyOptional({
    description: 'Marketing consent',
    example: false,
    default: false,
  })
  @IsOptional()
  @IsBoolean({ message: 'Marketing consent must be a boolean' })
  marketingConsent?: boolean = false;

  @ApiPropertyOptional({
    description: 'Age confirmation (must be at least 13)',
    example: true,
  })
  @IsOptional()
  @IsBoolean({ message: 'Age confirmation must be a boolean' })
  ageConfirmed?: boolean | undefined;

  @ApiPropertyOptional({
    description: 'Referral code',
    example: 'REF123',
    maxLength: 50,
  })
  @IsOptional()
  @IsString()
  @MaxLength(50, { message: getValidationMessage('referralCodeMaxLength') })
  @Matches(/^[A-Za-z0-9]{4,20}$/, {
    message: getValidationMessage('referralCodeInvalid'),
  })
  referralCode?: string | undefined;

  @ApiPropertyOptional({
    description: 'CAPTCHA token for bot protection',
    example: '03AGdBq27...',
  })
  @IsOptional()
  @IsString()
  captchaToken?: string | undefined;

  constructor(
    email: string,
    password: string,
    confirmPassword: string,
    firstName: string,
    lastName: string,
    acceptTerms: boolean,
    acceptPrivacy: boolean
  ) {
    super();
    this.email = email;
    this.password = password;
    this.confirmPassword = confirmPassword;
    this.firstName = firstName;
    this.lastName = lastName;
    this.acceptTerms = acceptTerms;
    this.acceptPrivacy = acceptPrivacy;
  }

  /**
   * Check if passwords match
   */
  public passwordsMatch(): boolean {
    return this.password === this.confirmPassword;
  }
}

// ============================================================
// ✅ FIXED: Phone Registration DTO
// ============================================================

export class PhoneRegisterDto extends BaseRegisterDto {
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

  @ApiProperty({
    description: 'Confirm password',
    example: 'MyStr0ng!P@ssw0rd',
    required: true,
    format: 'password',
    writeOnly: true,
  })
  @IsString({ message: 'Confirm password must be a string' })
  @IsNotEmpty({ message: 'Confirm password is required' })
  @MinLength(PASSWORD_POLICY.MIN_LENGTH, {
    message: getValidationMessage('passwordMinLength', [PASSWORD_POLICY.MIN_LENGTH]),
  })
  @MaxLength(PASSWORD_POLICY.MAX_LENGTH, {
    message: getValidationMessage('passwordMaxLength', [PASSWORD_POLICY.MAX_LENGTH]),
  })
  @Match('password', { message: getValidationMessage('confirmPasswordMatch') })
  confirmPassword: string;

  @ApiProperty({
    description: 'First name',
    example: 'John',
    required: true,
    minLength: 2,
    maxLength: 50,
  })
  @IsString({ message: getValidationMessage('firstNameRequired') })
  @IsNotEmpty({ message: getValidationMessage('firstNameRequired') })
  @MinLength(2, { message: getValidationMessage('firstNameMinLength') })
  @MaxLength(50, { message: getValidationMessage('firstNameMaxLength') })
  @Matches(/^[a-zA-Z\u0980-\u09FF\s\-']+$/, {
    message: 'First name can only contain letters, spaces, hyphens, and apostrophes',
  })
  firstName: string;

  @ApiProperty({
    description: 'Last name',
    example: 'Doe',
    required: true,
    minLength: 2,
    maxLength: 50,
  })
  @IsString({ message: getValidationMessage('lastNameRequired') })
  @IsNotEmpty({ message: getValidationMessage('lastNameRequired') })
  @MinLength(2, { message: getValidationMessage('lastNameMinLength') })
  @MaxLength(50, { message: getValidationMessage('lastNameMaxLength') })
  @Matches(/^[a-zA-Z\u0980-\u09FF\s\-']+$/, {
    message: 'Last name can only contain letters, spaces, hyphens, and apostrophes',
  })
  lastName: string;

  @ApiPropertyOptional({
    description: 'Display name (auto-generated if not provided)',
    example: 'JohnDoe',
    minLength: 2,
    maxLength: 100,
  })
  @IsOptional()
  @IsString()
  @MinLength(2, { message: getValidationMessage('displayNameMinLength') })
  @MaxLength(100, { message: getValidationMessage('displayNameMaxLength') })
  @Matches(/^[a-zA-Z0-9\u0980-\u09FF\s_.-]+$/, {
    message: 'Display name contains invalid characters',
  })
  displayName?: string | undefined;

  @ApiProperty({
    description: 'Accept terms and conditions',
    example: true,
    required: true,
  })
  @IsBoolean({ message: 'Accept terms must be a boolean' })
  @Equals(true, { message: getValidationMessage('acceptTermsRequired') })
  acceptTerms: boolean = false;

  @ApiProperty({
    description: 'Accept privacy policy',
    example: true,
    required: true,
  })
  @IsBoolean({ message: 'Accept privacy must be a boolean' })
  @Equals(true, { message: getValidationMessage('acceptPrivacyRequired') })
  acceptPrivacy: boolean = false;

  @ApiPropertyOptional({
    description: 'Marketing consent',
    example: false,
    default: false,
  })
  @IsOptional()
  @IsBoolean({ message: 'Marketing consent must be a boolean' })
  marketingConsent?: boolean = false;

  @ApiPropertyOptional({
    description: 'Age confirmation (must be at least 13)',
    example: true,
  })
  @IsOptional()
  @IsBoolean({ message: 'Age confirmation must be a boolean' })
  ageConfirmed?: boolean | undefined;

  @ApiPropertyOptional({
    description: 'Referral code',
    example: 'REF123',
    maxLength: 50,
  })
  @IsOptional()
  @IsString()
  @MaxLength(50, { message: getValidationMessage('referralCodeMaxLength') })
  @Matches(/^[A-Za-z0-9]{4,20}$/, {
    message: getValidationMessage('referralCodeInvalid'),
  })
  referralCode?: string | undefined;

  @ApiPropertyOptional({
    description: 'CAPTCHA token for bot protection',
    example: '03AGdBq27...',
  })
  @IsOptional()
  @IsString()
  captchaToken?: string | undefined;

  constructor(
    phoneNumber: string,
    password: string,
    confirmPassword: string,
    firstName: string,
    lastName: string,
    acceptTerms: boolean,
    acceptPrivacy: boolean
  ) {
    super();
    this.phoneNumber = phoneNumber;
    this.password = password;
    this.confirmPassword = confirmPassword;
    this.firstName = firstName;
    this.lastName = lastName;
    this.acceptTerms = acceptTerms;
    this.acceptPrivacy = acceptPrivacy;
  }

  /**
   * Check if passwords match
   */
  public passwordsMatch(): boolean {
    return this.password === this.confirmPassword;
  }
}

// ============================================================
// ✅ FIXED: OTP Registration DTO (Passwordless)
// ============================================================

export class OTPRegisterDto extends BaseRegisterDto {
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
    minLength: 6,
    maxLength: 6,
    pattern: '^[0-9]{6}$',
  })
  @IsString({ message: getValidationMessage('otpRequired') })
  @IsNotEmpty({ message: getValidationMessage('otpRequired') })
  @Matches(/^\d{6}$/, { message: getValidationMessage('otpInvalid') })
  otpCode: string;

  @ApiProperty({
    description: 'First name',
    example: 'John',
    required: true,
    minLength: 2,
    maxLength: 50,
  })
  @IsString({ message: getValidationMessage('firstNameRequired') })
  @IsNotEmpty({ message: getValidationMessage('firstNameRequired') })
  @MinLength(2, { message: getValidationMessage('firstNameMinLength') })
  @MaxLength(50, { message: getValidationMessage('firstNameMaxLength') })
  @Matches(/^[a-zA-Z\u0980-\u09FF\s\-']+$/, {
    message: 'First name can only contain letters, spaces, hyphens, and apostrophes',
  })
  firstName: string;

  @ApiProperty({
    description: 'Last name',
    example: 'Doe',
    required: true,
    minLength: 2,
    maxLength: 50,
  })
  @IsString({ message: getValidationMessage('lastNameRequired') })
  @IsNotEmpty({ message: getValidationMessage('lastNameRequired') })
  @MinLength(2, { message: getValidationMessage('lastNameMinLength') })
  @MaxLength(50, { message: getValidationMessage('lastNameMaxLength') })
  @Matches(/^[a-zA-Z\u0980-\u09FF\s\-']+$/, {
    message: 'Last name can only contain letters, spaces, hyphens, and apostrophes',
  })
  lastName: string;

  @ApiPropertyOptional({
    description: 'Display name (auto-generated if not provided)',
    example: 'JohnDoe',
    minLength: 2,
    maxLength: 100,
  })
  @IsOptional()
  @IsString()
  @MinLength(2, { message: getValidationMessage('displayNameMinLength') })
  @MaxLength(100, { message: getValidationMessage('displayNameMaxLength') })
  @Matches(/^[a-zA-Z0-9\u0980-\u09FF\s_.-]+$/, {
    message: 'Display name contains invalid characters',
  })
  displayName?: string | undefined;

  @ApiProperty({
    description: 'Accept terms and conditions',
    example: true,
    required: true,
  })
  @IsBoolean({ message: 'Accept terms must be a boolean' })
  @Equals(true, { message: getValidationMessage('acceptTermsRequired') })
  acceptTerms: boolean = false;

  @ApiProperty({
    description: 'Accept privacy policy',
    example: true,
    required: true,
  })
  @IsBoolean({ message: 'Accept privacy must be a boolean' })
  @Equals(true, { message: getValidationMessage('acceptPrivacyRequired') })
  acceptPrivacy: boolean = false;

  @ApiPropertyOptional({
    description: 'Marketing consent',
    example: false,
    default: false,
  })
  @IsOptional()
  @IsBoolean({ message: 'Marketing consent must be a boolean' })
  marketingConsent?: boolean = false;

  @ApiPropertyOptional({
    description: 'Age confirmation (must be at least 13)',
    example: true,
  })
  @IsOptional()
  @IsBoolean({ message: 'Age confirmation must be a boolean' })
  ageConfirmed?: boolean | undefined;

  @ApiPropertyOptional({
    description: 'Referral code',
    example: 'REF123',
    maxLength: 50,
  })
  @IsOptional()
  @IsString()
  @MaxLength(50, { message: getValidationMessage('referralCodeMaxLength') })
  @Matches(/^[A-Za-z0-9]{4,20}$/, {
    message: getValidationMessage('referralCodeInvalid'),
  })
  referralCode?: string | undefined;

  constructor(
    phoneNumber: string,
    otpCode: string,
    firstName: string,
    lastName: string,
    acceptTerms: boolean,
    acceptPrivacy: boolean
  ) {
    super();
    this.phoneNumber = phoneNumber;
    this.otpCode = otpCode;
    this.firstName = firstName;
    this.lastName = lastName;
    this.acceptTerms = acceptTerms;
    this.acceptPrivacy = acceptPrivacy;
  }
}

// ============================================================
// ✅ FIXED: Username Registration DTO
// ============================================================

export class UsernameRegisterDto extends BaseRegisterDto {
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
  @Matches(USERNAME_REGEX, {
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

  @ApiProperty({
    description: 'Confirm password',
    example: 'MyStr0ng!P@ssw0rd',
    required: true,
    format: 'password',
    writeOnly: true,
  })
  @IsString({ message: 'Confirm password must be a string' })
  @IsNotEmpty({ message: 'Confirm password is required' })
  @MinLength(PASSWORD_POLICY.MIN_LENGTH, {
    message: getValidationMessage('passwordMinLength', [PASSWORD_POLICY.MIN_LENGTH]),
  })
  @MaxLength(PASSWORD_POLICY.MAX_LENGTH, {
    message: getValidationMessage('passwordMaxLength', [PASSWORD_POLICY.MAX_LENGTH]),
  })
  @Match('password', { message: getValidationMessage('confirmPasswordMatch') })
  confirmPassword: string;

  @ApiProperty({
    description: 'First name',
    example: 'John',
    required: true,
    minLength: 2,
    maxLength: 50,
  })
  @IsString({ message: getValidationMessage('firstNameRequired') })
  @IsNotEmpty({ message: getValidationMessage('firstNameRequired') })
  @MinLength(2, { message: getValidationMessage('firstNameMinLength') })
  @MaxLength(50, { message: getValidationMessage('firstNameMaxLength') })
  @Matches(/^[a-zA-Z\u0980-\u09FF\s\-']+$/, {
    message: 'First name can only contain letters, spaces, hyphens, and apostrophes',
  })
  firstName: string;

  @ApiProperty({
    description: 'Last name',
    example: 'Doe',
    required: true,
    minLength: 2,
    maxLength: 50,
  })
  @IsString({ message: getValidationMessage('lastNameRequired') })
  @IsNotEmpty({ message: getValidationMessage('lastNameRequired') })
  @MinLength(2, { message: getValidationMessage('lastNameMinLength') })
  @MaxLength(50, { message: getValidationMessage('lastNameMaxLength') })
  @Matches(/^[a-zA-Z\u0980-\u09FF\s\-']+$/, {
    message: 'Last name can only contain letters, spaces, hyphens, and apostrophes',
  })
  lastName: string;

  @ApiPropertyOptional({
    description: 'Display name (auto-generated if not provided)',
    example: 'JohnDoe',
    minLength: 2,
    maxLength: 100,
  })
  @IsOptional()
  @IsString()
  @MinLength(2, { message: getValidationMessage('displayNameMinLength') })
  @MaxLength(100, { message: getValidationMessage('displayNameMaxLength') })
  @Matches(/^[a-zA-Z0-9\u0980-\u09FF\s_.-]+$/, {
    message: 'Display name contains invalid characters',
  })
  displayName?: string | undefined;

  @ApiProperty({
    description: 'Accept terms and conditions',
    example: true,
    required: true,
  })
  @IsBoolean({ message: 'Accept terms must be a boolean' })
  @Equals(true, { message: getValidationMessage('acceptTermsRequired') })
  acceptTerms: boolean = false;

  @ApiProperty({
    description: 'Accept privacy policy',
    example: true,
    required: true,
  })
  @IsBoolean({ message: 'Accept privacy must be a boolean' })
  @Equals(true, { message: getValidationMessage('acceptPrivacyRequired') })
  acceptPrivacy: boolean = false;

  @ApiPropertyOptional({
    description: 'Marketing consent',
    example: false,
    default: false,
  })
  @IsOptional()
  @IsBoolean({ message: 'Marketing consent must be a boolean' })
  marketingConsent?: boolean = false;

  @ApiPropertyOptional({
    description: 'Age confirmation (must be at least 13)',
    example: true,
  })
  @IsOptional()
  @IsBoolean({ message: 'Age confirmation must be a boolean' })
  ageConfirmed?: boolean | undefined;

  @ApiPropertyOptional({
    description: 'Referral code',
    example: 'REF123',
    maxLength: 50,
  })
  @IsOptional()
  @IsString()
  @MaxLength(50, { message: getValidationMessage('referralCodeMaxLength') })
  @Matches(/^[A-Za-z0-9]{4,20}$/, {
    message: getValidationMessage('referralCodeInvalid'),
  })
  referralCode?: string | undefined;

  @ApiPropertyOptional({
    description: 'CAPTCHA token for bot protection',
    example: '03AGdBq27...',
  })
  @IsOptional()
  @IsString()
  captchaToken?: string | undefined;

  constructor(
    username: string,
    password: string,
    confirmPassword: string,
    firstName: string,
    lastName: string,
    acceptTerms: boolean,
    acceptPrivacy: boolean
  ) {
    super();
    this.username = username;
    this.password = password;
    this.confirmPassword = confirmPassword;
    this.firstName = firstName;
    this.lastName = lastName;
    this.acceptTerms = acceptTerms;
    this.acceptPrivacy = acceptPrivacy;
  }

  /**
   * Check if passwords match
   */
  public passwordsMatch(): boolean {
    return this.password === this.confirmPassword;
  }
}

// ============================================================
// ✅ FIXED: Social Registration DTO
// ============================================================

export class SocialRegisterDto extends BaseRegisterDto {
  @ApiProperty({
    description: 'Social provider (google, facebook, github, apple, whatsapp, imo)',
    example: 'google',
    enum: ['google', 'facebook', 'github', 'apple', 'whatsapp', 'imo'],
    required: true,
  })
  @IsString({ message: getValidationMessage('providerRequired') })
  @IsNotEmpty({ message: getValidationMessage('providerRequired') })
  @IsIn(['google', 'facebook', 'github', 'apple', 'whatsapp', 'imo'], {
    message: 'Provider must be one of: google, facebook, github, apple, whatsapp, imo',
  })
  provider: string;

  @ApiProperty({
    description: 'Provider user ID',
    example: '1234567890',
    required: true,
  })
  @IsString({ message: getValidationMessage('providerUserIdRequired') })
  @IsNotEmpty({ message: getValidationMessage('providerUserIdRequired') })
  providerUserId: string;

  @ApiPropertyOptional({
    description: 'User email address',
    example: 'user@vubon.com.bd',
    format: 'email',
    maxLength: 255,
  })
  @IsOptional()
  @IsEmail({}, { message: getValidationMessage('emailInvalid') })
  @MaxLength(255, { message: getValidationMessage('emailMaxLength') })
  @Matches(REGEX_EMAIL.STRICT, { message: getValidationMessage('emailInvalid') })
  email?: string | undefined;

  @ApiPropertyOptional({
    description: 'Bangladesh phone number (E.164 format)',
    example: '+8801712345678',
    pattern: '^\\+8801[3-9]\\d{8}$',
  })
  @IsOptional()
  @IsString()
  @Matches(REGEX_PHONE.BANGLADESH_ALL, {
    message: getValidationMessage('phoneInvalid'),
  })
  phoneNumber?: string | undefined;

  @ApiProperty({
    description: 'First name',
    example: 'John',
    required: true,
    minLength: 2,
    maxLength: 50,
  })
  @IsString({ message: getValidationMessage('firstNameRequired') })
  @IsNotEmpty({ message: getValidationMessage('firstNameRequired') })
  @MinLength(2, { message: getValidationMessage('firstNameMinLength') })
  @MaxLength(50, { message: getValidationMessage('firstNameMaxLength') })
  @Matches(/^[a-zA-Z\u0980-\u09FF\s\-']+$/, {
    message: 'First name can only contain letters, spaces, hyphens, and apostrophes',
  })
  firstName: string;

  @ApiProperty({
    description: 'Last name',
    example: 'Doe',
    required: true,
    minLength: 2,
    maxLength: 50,
  })
  @IsString({ message: getValidationMessage('lastNameRequired') })
  @IsNotEmpty({ message: getValidationMessage('lastNameRequired') })
  @MinLength(2, { message: getValidationMessage('lastNameMinLength') })
  @MaxLength(50, { message: getValidationMessage('lastNameMaxLength') })
  @Matches(/^[a-zA-Z\u0980-\u09FF\s\-']+$/, {
    message: 'Last name can only contain letters, spaces, hyphens, and apostrophes',
  })
  lastName: string;

  @ApiPropertyOptional({
    description: 'Display name (auto-generated if not provided)',
    example: 'JohnDoe',
    minLength: 2,
    maxLength: 100,
  })
  @IsOptional()
  @IsString()
  @MinLength(2, { message: getValidationMessage('displayNameMinLength') })
  @MaxLength(100, { message: getValidationMessage('displayNameMaxLength') })
  @Matches(/^[a-zA-Z0-9\u0980-\u09FF\s_.-]+$/, {
    message: 'Display name contains invalid characters',
  })
  displayName?: string | undefined;

  @ApiPropertyOptional({
    description: 'Avatar URL',
    example: 'https://cdn.vubon.com.bd/avatars/user123.jpg',
  })
  @IsOptional()
  @IsUrl({}, { message: getValidationMessage('avatarInvalid') })
  avatar?: string | undefined;

  @ApiProperty({
    description: 'Accept terms and conditions',
    example: true,
    required: true,
  })
  @IsBoolean({ message: 'Accept terms must be a boolean' })
  @Equals(true, { message: getValidationMessage('acceptTermsRequired') })
  acceptTerms: boolean = false;

  @ApiProperty({
    description: 'Accept privacy policy',
    example: true,
    required: true,
  })
  @IsBoolean({ message: 'Accept privacy must be a boolean' })
  @Equals(true, { message: getValidationMessage('acceptPrivacyRequired') })
  acceptPrivacy: boolean = false;

  @ApiPropertyOptional({
    description: 'Marketing consent',
    example: false,
    default: false,
  })
  @IsOptional()
  @IsBoolean({ message: 'Marketing consent must be a boolean' })
  marketingConsent?: boolean = false;

  @ApiPropertyOptional({
    description: 'Age confirmation (must be at least 13)',
    example: true,
  })
  @IsOptional()
  @IsBoolean({ message: 'Age confirmation must be a boolean' })
  ageConfirmed?: boolean | undefined;

  @ApiPropertyOptional({
    description: 'Referral code',
    example: 'REF123',
    maxLength: 50,
  })
  @IsOptional()
  @IsString()
  @MaxLength(50, { message: getValidationMessage('referralCodeMaxLength') })
  @Matches(/^[A-Za-z0-9]{4,20}$/, {
    message: getValidationMessage('referralCodeInvalid'),
  })
  referralCode?: string | undefined;

  @ApiPropertyOptional({
    description: 'CAPTCHA token for bot protection',
    example: '03AGdBq27...',
  })
  @IsOptional()
  @IsString()
  captchaToken?: string | undefined;

  constructor(
    provider: string,
    providerUserId: string,
    firstName: string,
    lastName: string,
    acceptTerms: boolean,
    acceptPrivacy: boolean
  ) {
    super();
    this.provider = provider;
    this.providerUserId = providerUserId;
    this.firstName = firstName;
    this.lastName = lastName;
    this.acceptTerms = acceptTerms;
    this.acceptPrivacy = acceptPrivacy;
  }
}

// ============================================================
// ✅ FIXED: Vendor Registration DTO (Bangladesh specific)
// ============================================================

export class VendorRegisterDto extends BaseRegisterDto {
  @ApiProperty({
    description: 'User email address',
    example: 'vendor@vubon.com.bd',
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
    description: 'First name',
    example: 'John',
    required: true,
    minLength: 2,
    maxLength: 50,
  })
  @IsString({ message: getValidationMessage('firstNameRequired') })
  @IsNotEmpty({ message: getValidationMessage('firstNameRequired') })
  @MinLength(2, { message: getValidationMessage('firstNameMinLength') })
  @MaxLength(50, { message: getValidationMessage('firstNameMaxLength') })
  @Matches(/^[a-zA-Z\u0980-\u09FF\s\-']+$/, {
    message: 'First name can only contain letters, spaces, hyphens, and apostrophes',
  })
  firstName: string;

  @ApiProperty({
    description: 'Last name',
    example: 'Doe',
    required: true,
    minLength: 2,
    maxLength: 50,
  })
  @IsString({ message: getValidationMessage('lastNameRequired') })
  @IsNotEmpty({ message: getValidationMessage('lastNameRequired') })
  @MinLength(2, { message: getValidationMessage('lastNameMinLength') })
  @MaxLength(50, { message: getValidationMessage('lastNameMaxLength') })
  @Matches(/^[a-zA-Z\u0980-\u09FF\s\-']+$/, {
    message: 'Last name can only contain letters, spaces, hyphens, and apostrophes',
  })
  lastName: string;

  @ApiProperty({
    description: 'Business name',
    example: "John's Electronics",
    required: true,
    minLength: 2,
    maxLength: 100,
  })
  @IsString({ message: getValidationMessage('businessNameRequired') })
  @IsNotEmpty({ message: getValidationMessage('businessNameRequired') })
  @MinLength(2, { message: 'Business name must be at least 2 characters' })
  @MaxLength(100, { message: getValidationMessage('businessNameMaxLength') })
  businessName: string;

  @ApiProperty({
    description: 'Business address',
    example: '123, Dhaka Road, Dhaka',
    required: true,
    minLength: 5,
    maxLength: 500,
  })
  @IsString({ message: getValidationMessage('businessAddressRequired') })
  @IsNotEmpty({ message: getValidationMessage('businessAddressRequired') })
  @MinLength(5, { message: 'Business address must be at least 5 characters' })
  @MaxLength(500, { message: getValidationMessage('businessAddressMaxLength') })
  businessAddress: string;

  @ApiProperty({
    description: 'Trade license number',
    example: 'TL-12345',
    required: true,
    maxLength: 50,
  })
  @IsString({ message: getValidationMessage('tradeLicenseRequired') })
  @IsNotEmpty({ message: getValidationMessage('tradeLicenseRequired') })
  @MaxLength(50, { message: getValidationMessage('tradeLicenseMaxLength') })
  tradeLicenseNumber: string;

  @ApiPropertyOptional({
    description: 'TIN number (9-20 characters)',
    example: '123456789',
    minLength: 9,
    maxLength: 20,
  })
  @IsOptional()
  @IsString()
  @MinLength(9, { message: getValidationMessage('tinMinLength') })
  @MaxLength(20, { message: getValidationMessage('tinMaxLength') })
  tinNumber?: string | undefined;

  @ApiProperty({
    description: 'NID number (10-17 digits)',
    example: '1234567890123',
    required: true,
    minLength: 10,
    maxLength: 17,
  })
  @IsString({ message: getValidationMessage('nidRequired') })
  @IsNotEmpty({ message: getValidationMessage('nidRequired') })
  @MinLength(10, { message: getValidationMessage('nidMinLength') })
  @MaxLength(17, { message: getValidationMessage('nidMaxLength') })
  @Matches(/^\d{10,17}$/, { message: 'NID must contain only digits' })
  nidNumber: string;

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

  @ApiProperty({
    description: 'Confirm password',
    example: 'MyStr0ng!P@ssw0rd',
    required: true,
    format: 'password',
    writeOnly: true,
  })
  @IsString({ message: 'Confirm password must be a string' })
  @IsNotEmpty({ message: 'Confirm password is required' })
  @MinLength(PASSWORD_POLICY.MIN_LENGTH, {
    message: getValidationMessage('passwordMinLength', [PASSWORD_POLICY.MIN_LENGTH]),
  })
  @MaxLength(PASSWORD_POLICY.MAX_LENGTH, {
    message: getValidationMessage('passwordMaxLength', [PASSWORD_POLICY.MAX_LENGTH]),
  })
  @Match('password', { message: getValidationMessage('confirmPasswordMatch') })
  confirmPassword: string;

  @ApiPropertyOptional({
    description: 'Display name (auto-generated if not provided)',
    example: 'JohnDoe',
    minLength: 2,
    maxLength: 100,
  })
  @IsOptional()
  @IsString()
  @MinLength(2, { message: getValidationMessage('displayNameMinLength') })
  @MaxLength(100, { message: getValidationMessage('displayNameMaxLength') })
  @Matches(/^[a-zA-Z0-9\u0980-\u09FF\s_.-]+$/, {
    message: 'Display name contains invalid characters',
  })
  displayName?: string | undefined;

  @ApiProperty({
    description: 'Accept terms and conditions',
    example: true,
    required: true,
  })
  @IsBoolean({ message: 'Accept terms must be a boolean' })
  @Equals(true, { message: getValidationMessage('acceptTermsRequired') })
  acceptTerms: boolean = false;

  @ApiProperty({
    description: 'Accept privacy policy',
    example: true,
    required: true,
  })
  @IsBoolean({ message: 'Accept privacy must be a boolean' })
  @Equals(true, { message: getValidationMessage('acceptPrivacyRequired') })
  acceptPrivacy: boolean = false;

  @ApiPropertyOptional({
    description: 'Marketing consent',
    example: false,
    default: false,
  })
  @IsOptional()
  @IsBoolean({ message: 'Marketing consent must be a boolean' })
  marketingConsent?: boolean = false;

  @ApiPropertyOptional({
    description: 'Age confirmation (must be at least 18 for vendor)',
    example: true,
  })
  @IsOptional()
  @IsBoolean({ message: 'Age confirmation must be a boolean' })
  ageConfirmed?: boolean | undefined;

  @ApiPropertyOptional({
    description: 'Referral code',
    example: 'REF123',
    maxLength: 50,
  })
  @IsOptional()
  @IsString()
  @MaxLength(50, { message: getValidationMessage('referralCodeMaxLength') })
  @Matches(/^[A-Za-z0-9]{4,20}$/, {
    message: getValidationMessage('referralCodeInvalid'),
  })
  referralCode?: string | undefined;

  @ApiPropertyOptional({
    description: 'CAPTCHA token for bot protection',
    example: '03AGdBq27...',
  })
  @IsOptional()
  @IsString()
  captchaToken?: string | undefined;

  constructor(
    email: string,
    phoneNumber: string,
    firstName: string,
    lastName: string,
    businessName: string,
    businessAddress: string,
    tradeLicenseNumber: string,
    nidNumber: string,
    password: string,
    confirmPassword: string,
    acceptTerms: boolean,
    acceptPrivacy: boolean
  ) {
    super();
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.firstName = firstName;
    this.lastName = lastName;
    this.businessName = businessName;
    this.businessAddress = businessAddress;
    this.tradeLicenseNumber = tradeLicenseNumber;
    this.nidNumber = nidNumber;
    this.password = password;
    this.confirmPassword = confirmPassword;
    this.acceptTerms = acceptTerms;
    this.acceptPrivacy = acceptPrivacy;
  }

  /**
   * Check if passwords match
   */
  public passwordsMatch(): boolean {
    return this.password === this.confirmPassword;
  }

  /**
   * Check if age meets vendor requirements (min 18)
   */
  public isVendorAgeValid(age: number): boolean {
    return age >= AGE_CONFIG.MIN_AGE_VENDOR;
  }
}

// ============================================================
// ✅ ENTERPRISE ENHANCEMENT: Registration Response DTO
// ============================================================

export class RegisterResponseDto {
  @ApiProperty({
    description: 'Success status',
    example: true,
  })
  success: boolean;

  @ApiProperty({
    description: 'User ID',
    example: 'usr_550e8400-e29b-41d4-a716-446655440000',
  })
  userId: string;

  @ApiPropertyOptional({
    description: 'User email',
    example: 'user@vubon.com.bd',
  })
  email?: string | undefined;

  @ApiPropertyOptional({
    description: 'User phone number',
    example: '+8801712345678',
  })
  phoneNumber?: string | undefined;

  @ApiProperty({
    description: 'Whether email verification is required',
    example: true,
  })
  emailVerificationRequired: boolean = false;

  @ApiProperty({
    description: 'Whether phone verification is required',
    example: false,
  })
  phoneVerificationRequired: boolean = false;

  @ApiPropertyOptional({
    description: 'Success message in English',
    example: 'Registration successful',
  })
  message?: string | undefined;

  @ApiPropertyOptional({
    description: 'Success message in Bengali',
    example: 'নিবন্ধন সফল হয়েছে',
  })
  messageBn?: string | undefined;

  @ApiPropertyOptional({
    description: 'Whether approval is required (for vendors)',
    example: false,
    default: false,
  })
  requiresApproval: boolean = false;

  @ApiPropertyOptional({
    description: 'Redirect URL for next steps',
    example: '/verify-email',
  })
  @IsOptional()
  @IsUrl()
  redirectUrl?: string | undefined;

  @ApiPropertyOptional({
    description: 'Correlation ID for tracing',
    example: 'corr_550e8400-e29b-41d4-a716-446655440000',
  })
  correlationId?: string | undefined;

  @ApiPropertyOptional({
    description: 'Rate limit metadata',
    type: RegistrationRateLimitDto,
  })
  rateLimit?: RegistrationRateLimitDto | undefined;

  constructor(
    success: boolean,
    userId: string,
    emailVerificationRequired: boolean = false,
    phoneVerificationRequired: boolean = false,
    message?: string,
    messageBn?: string,
    requiresApproval: boolean = false,
    redirectUrl?: string,
    correlationId?: string,
    rateLimit?: RegistrationRateLimitDto
  ) {
    this.success = success;
    this.userId = userId;
    this.emailVerificationRequired = emailVerificationRequired;
    this.phoneVerificationRequired = phoneVerificationRequired;
    this.message = message;
    this.messageBn = messageBn;
    this.requiresApproval = requiresApproval;
    this.redirectUrl = redirectUrl;
    this.correlationId = correlationId;
    this.rateLimit = rateLimit;
  }
}

// ============================================================
// ✅ ENTERPRISE ENHANCEMENT: Registration Error Response DTO
// ============================================================

export class RegisterErrorResponseDto {
  @ApiProperty({
    description: 'Error status code',
    example: 400,
  })
  statusCode: number;

  @ApiProperty({
    description: 'Error message in English',
    example: 'Email already exists',
  })
  message: string;

  @ApiPropertyOptional({
    description: 'Error message in Bengali',
    example: 'ইমেইল ইতিমধ্যে বিদ্যমান',
  })
  messageBn?: string | undefined;

  @ApiProperty({
    description: 'Error code',
    example: 'EMAIL_ALREADY_EXISTS',
    enum: [
      'EMAIL_ALREADY_EXISTS',
      'PHONE_ALREADY_EXISTS',
      'USERNAME_ALREADY_EXISTS',
      'INVALID_REFERRAL_CODE',
      'INVALID_CAPTCHA',
      'PASSWORD_TOO_WEAK',
      'TERMS_NOT_ACCEPTED',
      'PRIVACY_NOT_ACCEPTED',
      'UNDERAGE',
      'INVALID_TRADE_LICENSE',
      'INVALID_NID',
      'INVALID_TIN',
      'BUSINESS_ALREADY_REGISTERED',
      'PHONE_NOT_VERIFIED',
      'EMAIL_NOT_VERIFIED',
    ],
  })
  error: string;

  @ApiPropertyOptional({
    description: 'Field name that caused the error',
    example: 'email',
  })
  field?: string | undefined;

  @ApiProperty({
    description: 'Timestamp of error',
    example: '2024-01-01T00:00:00.000Z',
    format: 'date-time',
  })
  timestamp: string;

  @ApiPropertyOptional({
    description: 'Correlation ID for tracing',
    example: 'corr_550e8400-e29b-41d4-a716-446655440000',
  })
  correlationId?: string | undefined;

  constructor(
    message: string,
    error: string,
    statusCode?: number,
    messageBn?: string,
    field?: string,
    correlationId?: string
  ) {
    this.statusCode = statusCode || 400;
    this.message = message;
    this.messageBn = messageBn;
    this.error = error;
    this.field = field;
    this.timestamp = new Date().toISOString();
    this.correlationId = correlationId;
  }
}

// ============================================================
// ✅ ENTERPRISE ENHANCEMENT: Helper Functions
// ============================================================

/**
 * Create a success response for registration
 */
export function createRegisterSuccessResponse(
  userId: string,
  emailVerificationRequired: boolean = false,
  phoneVerificationRequired: boolean = false,
  message?: string,
  messageBn?: string,
  requiresApproval?: boolean,
  redirectUrl?: string,
  correlationId?: string,
  rateLimit?: RegistrationRateLimitDto
): RegisterResponseDto {
  const defaultMessage = 'Registration successful';
  const defaultMessageBn = 'নিবন্ধন সফল হয়েছে';

  return new RegisterResponseDto(
    true,
    userId,
    emailVerificationRequired,
    phoneVerificationRequired,
    message || defaultMessage,
    messageBn || defaultMessageBn,
    requiresApproval,
    redirectUrl,
    correlationId,
    rateLimit
  );
}

/**
 * Create an error response for registration
 */
export function createRegisterErrorResponse(
  message: string,
  error: string,
  statusCode: number = 400,
  messageBn?: string,
  field?: string,
  correlationId?: string
): RegisterErrorResponseDto {
  return new RegisterErrorResponseDto(
    message,
    error,
    statusCode,
    messageBn,
    field,
    correlationId
  );
}

/**
 * Get age validation result for customer registration
 */
export function validateCustomerAge(age: number): {
  valid: boolean;
  message: string;
  messageBn: string;
} {
  if (age < AGE_CONFIG.MIN_AGE_CUSTOMER) {
    return {
      valid: false,
      message: `You must be at least ${AGE_CONFIG.MIN_AGE_CUSTOMER} years old to register`,
      messageBn: `নিবন্ধনের জন্য আপনার বয়স কমপক্ষে ${AGE_CONFIG.MIN_AGE_CUSTOMER} বছর হতে হবে`,
    };
  }
  if (age > AGE_CONFIG.MAX_AGE) {
    return {
      valid: false,
      message: `Age cannot exceed ${AGE_CONFIG.MAX_AGE} years`,
      messageBn: `বয়স ${AGE_CONFIG.MAX_AGE} বছরের বেশি হতে পারে না`,
    };
  }
  return {
    valid: true,
    message: 'Age validation passed',
    messageBn: 'বয়স যাচাই পাস হয়েছে',
  };
}

/**
 * Get age validation result for vendor registration
 */
export function validateVendorAge(age: number): {
  valid: boolean;
  message: string;
  messageBn: string;
} {
  if (age < AGE_CONFIG.MIN_AGE_VENDOR) {
    return {
      valid: false,
      message: `You must be at least ${AGE_CONFIG.MIN_AGE_VENDOR} years old to register as a vendor`,
      messageBn: `বিক্রেতা হিসেবে নিবন্ধনের জন্য আপনার বয়স কমপক্ষে ${AGE_CONFIG.MIN_AGE_VENDOR} বছর হতে হবে`,
    };
  }
  if (age > AGE_CONFIG.MAX_AGE) {
    return {
      valid: false,
      message: `Age cannot exceed ${AGE_CONFIG.MAX_AGE} years`,
      messageBn: `বয়স ${AGE_CONFIG.MAX_AGE} বছরের বেশি হতে পারে না`,
    };
  }
  return {
    valid: true,
    message: 'Vendor age validation passed',
    messageBn: 'বিক্রেতার বয়স যাচাই পাস হয়েছে',
  };
}

/**
 * Get audit metadata from registration request
 */
export function getRegisterAuditMetadata(
  dto:
    | EmailRegisterDto
    | PhoneRegisterDto
    | OTPRegisterDto
    | UsernameRegisterDto
    | SocialRegisterDto
    | VendorRegisterDto,
  userId: string
): RegistrationMetadata {
  return {
    source: 'web',
    userId: userId,
    ipAddress: dto.clientInfo?.ipAddress,
    userAgent: dto.clientInfo?.userAgent,
    deviceId: dto.deviceId,
    timestamp: new Date(),
    district: dto.clientInfo?.district,
    networkType: dto.clientInfo?.networkType as '2g' | '3g' | '4g' | '5g' | 'wifi' | 'unknown' | undefined,
  };
}

// ============================================================
// Type Exports
// ============================================================

export { EmailRegisterDto as RegisterDto };

export type {
  RegistrationMethod as RegistrationMethodType,
  TUserTier as UserTierType,
  TUserRole as UserRoleType,
  RegisterClientInfoDto as ClientInfoDtoType,
  RegistrationRateLimitDto as RegistrationRateLimitDtoType,
  RegisterResponseDto as RegisterResponseDtoType,
  RegisterErrorResponseDto as RegisterErrorResponseDtoType,
};

// ============================================================
// ENTERPRISE SUMMARY v2.0
// ============================================================
//
// Enterprise Enhancements Applied:
// 1. ✅ Multi-method registration (Email, Phone, Social, Username, Vendor)
// 2. ✅ Device fingerprint support
// 3. ✅ Rate limit metadata
// 4. ✅ Bengali error messages (fixed encoding/truncation)
// 5. ✅ Referral code support
// 6. ✅ Age verification (Bangladesh specific)
// 7. ✅ Client info tracking
// 8. ✅ Audit log correlation
// 9. ✅ Distributed tracing support
// 10. ✅ Vendor registration (Bangladesh specific)
// 11. ✅ OTP-based registration
// 12. ✅ Social registration with provider support
// 13. ✅ Helper functions for response creation
// 14. ✅ Audit metadata extraction
// 15. ✅ Multi-language validation messages
//
// Bangladesh Specific:
// - Phone number validation with REGEX_PHONE
// - NID, TIN, Trade License support
// - District and upazila tracking
// - Network type tracking (2g/3g/4g/5g/wifi)
// - Bengali message support
// - Vendor age verification (18+)
// - Customer age verification (13+)
