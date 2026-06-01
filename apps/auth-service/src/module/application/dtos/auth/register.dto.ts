/**
 * Register DTOs - Pure Data Transport Objects
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module application/dtos/auth/register.dto
 * 
 * @description
 * Data transfer objects for user registration.
 * NO business logic, NO database queries, NO infrastructure imports.
 * 
 * Enterprise Rules:
 * ✅ ONLY data transport
 * ✅ Validation decorators only (class-validator)
 * ✅ API documentation decorators (Swagger)
 * ✅ Password rules documentation
 * ✅ Phone number validation for Bangladesh
 * ✅ Support for phone-only and OTP registration
 * ✅ Cross-field validation (password & confirmPassword match)
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
  ValidateIf,
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

// ============================================================
// Custom Validator: Match (for password & confirmPassword)
// ============================================================

/**
 * Custom validation decorator to check if two fields match
 * 
 * @param property - Name of the property to compare with
 * @param validationOptions - Class-validator options
 * @returns Decorator function
 * 
 * @example
 * @Match('password', { message: 'Passwords do not match' })
 * confirmPassword: string;
 */
export function Match(property: string, validationOptions?: ValidationOptions) {
  return (object: object, propertyName: string) => {
    registerDecorator({
      name: 'match',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [property],
      validator: {
        validate(value: any, args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints;
          const relatedValue = (args.object as any)[relatedPropertyName];
          return value === relatedValue;
        },
        defaultMessage(args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints;
          return `${args.property} must match ${relatedPropertyName}`;
        },
      },
    });
  };
}

// ============================================================
// Enums
// ============================================================

/**
 * Registration method types
 */
export enum RegistrationMethod {
  EMAIL = 'EMAIL',
  PHONE = 'PHONE',
  OTP = 'OTP',
  SOCIAL = 'SOCIAL',
}

// ============================================================
// Constants
// ============================================================

/**
 * Password validation hints (for API documentation)
 */
const PASSWORD_HINTS = {
  minLength: 8,
  maxLength: 128,
  requireUppercase: true,
  requireLowercase: true,
  requireNumbers: true,
  requireSpecial: true,
  specialChars: '!@#$%^&*()_+-=[]{}|;:,.<>?',
};

// ============================================================
// Request DTOs
// ============================================================

/**
 * User Registration Request DTO (Email based)
 * 
 * @example
 * {
 *   "email": "user@vubon.com.bd",
 *   "password": "MyStr0ng!P@ssw0rd123",
 *   "confirmPassword": "MyStr0ng!P@ssw0rd123",
 *   "fullName": "John Doe",
 *   "phone": "+8801712345678",
 *   "acceptTerms": true,
 *   "marketingConsent": false
 * }
 */
export class RegisterDto {
  @ApiProperty({
    description: 'User email address (must be unique)',
    example: 'user@vubon.com.bd',
    required: true,
    format: 'email',
    maxLength: 255,
    pattern: '^[^\\s@]+@([^\\s@.,]+\\.)+[^\\s@.,]{2,}$',
  })
  @IsEmail({}, { message: 'Please provide a valid email address' })
  @IsNotEmpty({ message: 'Email is required' })
  @MaxLength(255, { message: 'Email cannot exceed 255 characters' })
  email: string;

  @ApiProperty({
    description: 'User password',
    example: 'MyStr0ng!P@ssw0rd123',
    required: true,
    minLength: PASSWORD_HINTS.minLength,
    maxLength: PASSWORD_HINTS.maxLength,
    format: 'password',
    writeOnly: true,
    pattern: '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$',
  })
  @IsString({ message: 'Password must be a string' })
  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(PASSWORD_HINTS.minLength, { 
    message: `Password must be at least ${PASSWORD_HINTS.minLength} characters long` 
  })
  @MaxLength(PASSWORD_HINTS.maxLength, { 
    message: `Password cannot exceed ${PASSWORD_HINTS.maxLength} characters` 
  })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
    message: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
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
  @Match('password', { message: 'Password and confirm password do not match' })
  confirmPassword: string;

  @ApiProperty({
    description: 'User full name',
    example: 'John Doe',
    required: true,
    minLength: 2,
    maxLength: 100,
  })
  @IsString({ message: 'Full name must be a string' })
  @IsNotEmpty({ message: 'Full name is required' })
  @MinLength(2, { message: 'Full name must be at least 2 characters long' })
  @MaxLength(100, { message: 'Full name cannot exceed 100 characters' })
  @Matches(/^[a-zA-Z\u0980-\u09FF\s.'-]+$/, {
    message: 'Full name can only contain letters, spaces, dots, hyphens, and apostrophes',
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
    pattern: '^\\+8801[3-9]\\d{8}$',
    maxLength: 15,
  })
  @IsOptional()
  @IsString({ message: 'Phone number must be a string' })
  @Matches(/^\+8801[3-9]\d{8}$/, {
    message: 'Phone number must be in E.164 format (e.g., +8801712345678)',
  })
  phone?: string;

  @ApiPropertyOptional({
    description: 'Device identifier for session tracking',
    example: 'device_550e8400-e29b-41d4-a716-446655440000',
    maxLength: 255,
  })
  @IsOptional()
  @IsString({ message: 'Device ID must be a string' })
  @MaxLength(255, { message: 'Device ID cannot exceed 255 characters' })
  deviceId?: string;

  @ApiProperty({
    description: 'Accept terms and conditions',
    example: true,
    required: true,
  })
  @IsBoolean({ message: 'Accept terms must be a boolean' })
  acceptTerms: boolean;

  @ApiPropertyOptional({
    description: 'Consent to marketing emails',
    example: false,
    default: false,
  })
  @IsOptional()
  @IsBoolean({ message: 'Marketing consent must be a boolean' })
  marketingConsent?: boolean = false;

  @ApiPropertyOptional({
    description: 'Referral code (if applicable)',
    example: 'REF123456',
    maxLength: 50,
  })
  @IsOptional()
  @IsString({ message: 'Referral code must be a string' })
  @MaxLength(50, { message: 'Referral code cannot exceed 50 characters' })
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

  constructor(
    email: string, 
    password: string, 
    confirmPassword: string,
    fullName: string, 
    acceptTerms: boolean,
    phone?: string,
    deviceId?: string,
    displayName?: string,
    marketingConsent?: boolean,
    referralCode?: string,
    preferredLanguage?: 'en' | 'bn'
  ) {
    this.email = email;
    this.password = password;
    this.confirmPassword = confirmPassword;
    this.fullName = fullName;
    this.acceptTerms = acceptTerms;
    this.phone = phone;
    this.deviceId = deviceId;
    this.displayName = displayName;
    this.marketingConsent = marketingConsent ?? false;
    this.referralCode = referralCode;
    this.preferredLanguage = preferredLanguage ?? 'en';
  }
}

/**
 * Phone Registration Request DTO (Bangladesh specific)
 * 
 * @example
 * {
 *   "phoneNumber": "+8801712345678",
 *   "otpCode": "123456",
 *   "fullName": "John Doe",
 *   "deviceId": "device-123",
 *   "acceptTerms": true
 * }
 */
export class PhoneRegisterDto {
  @ApiProperty({
    description: 'Bangladesh phone number (E.164 format)',
    example: '+8801712345678',
    required: true,
    pattern: '^\\+8801[3-9]\\d{8}$',
  })
  @IsString({ message: 'Phone number must be a string' })
  @IsNotEmpty({ message: 'Phone number is required' })
  @Matches(/^\+8801[3-9]\d{8}$/, { 
    message: 'Please provide a valid Bangladesh phone number (e.g., +8801712345678)' 
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
  @IsNotEmpty({ message: 'Full name is required' })
  @MinLength(2, { message: 'Full name must be at least 2 characters long' })
  @MaxLength(100, { message: 'Full name cannot exceed 100 characters' })
  @Matches(/^[a-zA-Z\u0980-\u09FF\s.'-]+$/, {
    message: 'Full name can only contain letters, spaces, dots, hyphens, and apostrophes',
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
  @IsEmail({}, { message: 'Please provide a valid email address' })
  email?: string;

  @ApiPropertyOptional({
    description: 'Device identifier for session tracking',
    example: 'device_550e8400-e29b-41d4-a716-446655440000',
    maxLength: 255,
  })
  @IsOptional()
  @IsString({ message: 'Device ID must be a string' })
  @MaxLength(255, { message: 'Device ID cannot exceed 255 characters' })
  deviceId?: string;

  @ApiProperty({
    description: 'Accept terms and conditions',
    example: true,
    required: true,
  })
  @IsBoolean({ message: 'Accept terms must be a boolean' })
  acceptTerms: boolean;

  @ApiPropertyOptional({
    description: 'Consent to marketing messages',
    example: false,
    default: false,
  })
  @IsOptional()
  @IsBoolean({ message: 'Marketing consent must be a boolean' })
  marketingConsent?: boolean = false;

  @ApiPropertyOptional({
    description: 'Referral code (if applicable)',
    example: 'REF123456',
    maxLength: 50,
  })
  @IsOptional()
  @IsString({ message: 'Referral code must be a string' })
  @MaxLength(50, { message: 'Referral code cannot exceed 50 characters' })
  referralCode?: string;

  constructor(
    phoneNumber: string,
    otpCode: string,
    fullName: string,
    acceptTerms: boolean,
    email?: string,
    deviceId?: string,
    displayName?: string,
    marketingConsent?: boolean,
    referralCode?: string
  ) {
    this.phoneNumber = phoneNumber;
    this.otpCode = otpCode;
    this.fullName = fullName;
    this.acceptTerms = acceptTerms;
    this.email = email;
    this.deviceId = deviceId;
    this.displayName = displayName;
    this.marketingConsent = marketingConsent ?? false;
    this.referralCode = referralCode;
  }
}

// ============================================================
// Response DTOs
// ============================================================

/**
 * User Registration Response DTO
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
    description: 'Success message',
    example: 'User registered successfully. Please verify your email.',
  })
  message: string;

  @ApiPropertyOptional({
    description: 'Bengali success message',
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
    enum: ['BRONZE', 'SILVER', 'GOLD', 'PLATINUM', 'DIAMOND'],
    example: 'BRONZE',
  })
  userTier?: string;

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
    userTier?: string
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
  }
}

/**
 * Email Verification Required Response DTO
 */
export class EmailVerificationRequiredResponseDto {
  @ApiProperty({
    description: 'User email address',
    example: 'user@vubon.com.bd',
  })
  email: string;

  @ApiProperty({
    description: 'Verification status',
    example: 'pending',
    enum: ['pending', 'already_verified', 'expired'],
  })
  status: string;

  @ApiProperty({
    description: 'Message for user',
    example: 'Please check your email for verification link',
  })
  message: string;

  @ApiPropertyOptional({
    description: 'Bengali message',
    example: 'অনুগ্রহ করে আপনার ইমেইলে ভেরিফিকেশন লিংক চেক করুন',
  })
  messageBn?: string;

  @ApiPropertyOptional({
    description: 'Time when verification code expires',
    example: '2024-01-01T00:24:00.000Z',
    format: 'date-time',
  })
  expiresAt?: string;

  @ApiPropertyOptional({
    description: 'Whether resend is allowed',
    example: true,
  })
  canResend?: boolean;

  @ApiPropertyOptional({
    description: 'Seconds until resend is allowed',
    example: 60,
  })
  resendCooldownSeconds?: number;

  constructor(
    email: string, 
    status: string, 
    message: string, 
    expiresAt?: Date,
    canResend?: boolean,
    resendCooldownSeconds?: number,
    messageBn?: string
  ) {
    this.email = email;
    this.status = status;
    this.message = message;
    this.messageBn = messageBn;
    if (expiresAt) {
      this.expiresAt = expiresAt.toISOString();
    }
    this.canResend = canResend;
    this.resendCooldownSeconds = resendCooldownSeconds;
  }
}

/**
 * Phone Verification Required Response DTO (Bangladesh specific)
 */
export class PhoneVerificationRequiredResponseDto {
  @ApiProperty({
    description: 'Masked phone number',
    example: '+88017******78',
  })
  maskedPhone: string;

  @ApiProperty({
    description: 'Verification status',
    example: 'pending',
    enum: ['pending', 'already_verified', 'expired'],
  })
  status: string;

  @ApiProperty({
    description: 'Message for user',
    example: 'Please check your phone for OTP',
  })
  message: string;

  @ApiPropertyOptional({
    description: 'Bengali message',
    example: 'অনুগ্রহ করে আপনার ফোনে ওটিপি চেক করুন',
  })
  messageBn?: string;

  @ApiPropertyOptional({
    description: 'Verification method (SMS, WhatsApp)',
    example: 'SMS',
    enum: ['SMS', 'WHATSAPP', 'VOICE'],
  })
  method?: string;

  @ApiPropertyOptional({
    description: 'Time when OTP expires',
    example: '2024-01-01T00:05:00.000Z',
    format: 'date-time',
  })
  expiresAt?: string;

  @ApiPropertyOptional({
    description: 'Whether resend is allowed',
    example: true,
  })
  canResend?: boolean;

  @ApiPropertyOptional({
    description: 'Seconds until resend is allowed',
    example: 30,
  })
  resendCooldownSeconds?: number;

  constructor(
    maskedPhone: string,
    status: string,
    message: string,
    expiresAt?: Date,
    canResend?: boolean,
    resendCooldownSeconds?: number,
    method?: string,
    messageBn?: string
  ) {
    this.maskedPhone = maskedPhone;
    this.status = status;
    this.message = message;
    this.messageBn = messageBn;
    this.method = method;
    if (expiresAt) {
      this.expiresAt = expiresAt.toISOString();
    }
    this.canResend = canResend;
    this.resendCooldownSeconds = resendCooldownSeconds;
  }
}

/**
 * Resend Verification Request DTO
 */
export class ResendVerificationDto {
  @ApiProperty({
    description: 'User email address',
    example: 'user@vubon.com.bd',
    required: true,
    format: 'email',
  })
  @IsEmail({}, { message: 'Please provide a valid email address' })
  @IsNotEmpty({ message: 'Email is required' })
  email: string;

  @ApiPropertyOptional({
    description: 'Verification type',
    example: 'email',
    enum: ['email', 'phone'],
    default: 'email',
  })
  @IsOptional()
  @IsEnum(['email', 'phone'], { message: 'Type must be email or phone' })
  type?: 'email' | 'phone' = 'email';

  constructor(email: string, type?: 'email' | 'phone') {
    this.email = email;
    this.type = type;
  }
}

/**
 * Resend Verification Response DTO
 */
export class ResendVerificationResponseDto {
  @ApiProperty({
    description: 'Success message',
    example: 'Verification email resent successfully',
  })
  message: string;

  @ApiPropertyOptional({
    description: 'Bengali success message',
    example: 'ভেরিফিকেশন ইমেইল সফলভাবে পুনরায় পাঠানো হয়েছে',
  })
  messageBn?: string;

  @ApiProperty({
    description: 'Time when new verification code expires',
    example: '2024-01-01T00:24:00.000Z',
    format: 'date-time',
  })
  expiresAt: string;

  @ApiProperty({
    description: 'Seconds until next resend is allowed',
    example: 60,
  })
  resendCooldownSeconds: number;

  constructor(expiresAt: Date, resendCooldownSeconds: number, message?: string, messageBn?: string) {
    this.message = message || 'Verification resent successfully';
    this.messageBn = messageBn;
    this.expiresAt = expiresAt.toISOString();
    this.resendCooldownSeconds = resendCooldownSeconds;
  }
}

// ============================================================
// Type Exports
// ============================================================

export type { PASSWORD_HINTS as PasswordHints };
export { Match };
