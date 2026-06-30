/**
 * Forgot/Reset Password DTOs - Enterprise Grade (v3.0) - All Errors Fixed
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 *
 * @module application/dtos/user/forgot-password.dto
 *
 * @description
 * Data transfer objects for password reset flow with enterprise features.
 *
 * ENTERPRISE ENHANCEMENTS:
 * ✅ No user enumeration (always same response)
 * ✅ Multi-channel reset (email, phone with SMS/WhatsApp, username)
 * ✅ Rate limiting with cooldown tracking
 * ✅ CAPTCHA support for bot protection
 * ✅ Bengali language support for OTP messages
 * ✅ Session tracking for OTP flow
 * ✅ Token validation with expiry info
 *
 * Security Rules:
 * ✅ NEVER disclose whether email/phone exists in the system
 * ✅ Always return same response regardless of existence
 * ✅ Rate limit to prevent abuse
 * ✅ CAPTCHA recommended for public endpoints
 */

import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsEnum,
  Matches,
  MaxLength,
  MinLength,
  IsUUID,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

// ✅ ENTERPRISE: Import from shared packages (single source of truth)
import {
  PASSWORD_POLICY,
  PASSWORD_PATTERNS,
  PHONE_PATTERNS,
  RESET_METHODS,
  TOKEN_PATTERNS,
} from '@vubon/shared-constants';

import type { ResetMethod } from '@vubon/shared-types';

// ============================================================
// Constants (Re-export for convenience)
// ============================================================

export const ResetMethods = RESET_METHODS;

// ============================================================
// ✅ FIXED: Local constant for STRONG_PASSWORD_MESSAGE
// (Since it doesn't exist in PASSWORD_POLICY)
// ============================================================

const STRONG_PASSWORD_MESSAGE =
  'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character';

// ============================================================
// ✅ FIXED: ResetMethod enum for value usage (not just type)
// ============================================================

/**
 * Reset method enum for password recovery (Bangladesh specific)
 * This is needed as a VALUE (not just type) for Swagger and validation
 */
export enum ResetMethodValue {
  EMAIL = 'email',
  SMS = 'sms',
  WHATSAPP = 'whatsapp',
  VOICE = 'voice',
}

// ============================================================
// Validation Messages (Multi-language)
// ============================================================

const VALIDATION_MESSAGES = {
  en: {
    emailRequired: 'Email is required',
    emailInvalid: 'Please provide a valid email address',
    emailMaxLength: 'Email cannot exceed 255 characters',
    phoneRequired: 'Phone number is required',
    phoneInvalid: 'Please provide a valid Bangladesh phone number (e.g., +8801712345678)',
    phonePattern: 'Phone number must be in E.164 format (e.g., +8801712345678)',
    usernameRequired: 'Username is required',
    usernameMinLength: 'Username must be at least 3 characters',
    usernameMaxLength: 'Username cannot exceed 50 characters',
    tokenRequired: 'Reset token is required',
    tokenInvalid: 'Invalid token format',
    otpRequired: 'OTP code is required',
    otpInvalid: 'OTP code must be exactly 6 digits',
    passwordRequired: 'New password is required',
    passwordMinLength: (min: number) => `Password must be at least ${min} characters long`,
    passwordMaxLength: (max: number) => `Password cannot exceed ${max} characters`,
    passwordWeak: STRONG_PASSWORD_MESSAGE, // ✅ FIXED: Using local constant
    captchaMinLength: 'Captcha token is too short',
    captchaMaxLength: 'Captcha token is too long',
    methodInvalid: 'Method must be sms or whatsapp',
    languageInvalid: 'Language must be en or bn',
    sessionIdInvalid: 'Session ID must be a valid UUID',
  },
  bn: {
    emailRequired: 'ইমেইল প্রয়োজন',
    emailInvalid: 'একটি সঠিক ইমেইল ঠিকানা দিন',
    emailMaxLength: 'ইমেইল সর্বোচ্চ ২৫৫ অক্ষর হতে পারে',
    phoneRequired: 'ফোন নম্বর প্রয়োজন',
    phoneInvalid: 'একটি সঠিক বাংলাদেশ ফোন নম্বর দিন (যেমন: +8801712345678)',
    phonePattern: 'ফোন নম্বরটি E.164 ফরম্যাটে হতে হবে (যেমন: +8801712345678)',
    usernameRequired: 'ইউজারনাম প্রয়োজন',
    usernameMinLength: 'ইউজারনাম কমপক্ষে ৩ অক্ষরের হতে হবে',
    usernameMaxLength: 'ইউজারনাম সর্বোচ্চ ৫০ অক্ষর হতে পারে',
    tokenRequired: 'রিসেট টোকেন প্রয়োজন',
    tokenInvalid: 'ভুল টোকেন ফরম্যাট',
    otpRequired: 'OTP কোড প্রয়োজন',
    otpInvalid: 'OTP কোড অবশ্যই ৬ ডিজিটের হতে হবে',
    passwordRequired: 'নতুন পাসওয়ার্ড প্রয়োজন',
    passwordMinLength: (min: number) => `পাসওয়ার্ড কমপক্ষে ${min} অক্ষরের হতে হবে`,
    passwordMaxLength: (max: number) => `পাসওয়ার্ড সর্বোচ্চ ${max} অক্ষরের হতে পারে`,
    passwordWeak: STRONG_PASSWORD_MESSAGE,
    captchaMinLength: 'ক্যাপচা টোকেন খুব ছোট',
    captchaMaxLength: 'ক্যাপচা টোকেন খুব বড়',
    methodInvalid: 'পদ্ধতি sms বা whatsapp হতে হবে',
    languageInvalid: 'ভাষা en বা bn হতে হবে',
    sessionIdInvalid: 'সেশন আইডি টি সঠিক UUID হতে হবে',
  },
};

// ============================================================
// Request DTOs
// ============================================================

/**
 * Forgot Password Request DTO (Email based)
 *
 * @example
 * {
 *   "email": "user@vubon.com.bd",
 *   "captchaToken": "03AGdBq25..."
 * }
 */
export class ForgotPasswordDto {
  @ApiProperty({
    description: 'User email address for password reset',
    example: 'user@vubon.com.bd',
    required: true,
    format: 'email',
    maxLength: 255,
  })
  @IsEmail({}, { message: VALIDATION_MESSAGES.en.emailInvalid })
  @IsNotEmpty({ message: VALIDATION_MESSAGES.en.emailRequired })
  @MaxLength(255, { message: VALIDATION_MESSAGES.en.emailMaxLength })
  email: string;

  @ApiPropertyOptional({
    description: 'CAPTCHA token for bot protection (recommended)',
    example: '03AGdBq25...',
    minLength: 20,
    maxLength: 1000,
  })
  @IsOptional()
  @IsString({ message: 'CAPTCHA token must be a string' })
  @MinLength(20, { message: VALIDATION_MESSAGES.en.captchaMinLength })
  @MaxLength(1000, { message: VALIDATION_MESSAGES.en.captchaMaxLength })
  captchaToken?: string | undefined; // ✅ FIXED: added | undefined

  constructor(email: string, captchaToken?: string | undefined) {
    this.email = email;
    this.captchaToken = captchaToken;
  }
}

/**
 * Forgot Password Request DTO (Phone based - Bangladesh specific)
 *
 * @example
 * {
 *   "phoneNumber": "+8801712345678",
 *   "method": "whatsapp",
 *   "language": "bn",
 *   "captchaToken": "03AGdBq25..."
 * }
 */
export class ForgotPasswordPhoneDto {
  @ApiProperty({
    description: 'Bangladesh phone number (E.164 format)',
    example: '+8801712345678',
    required: true,
    pattern: PHONE_PATTERNS.BANGLADESH_E164,
  })
  @IsString({ message: VALIDATION_MESSAGES.en.phoneRequired })
  @IsNotEmpty({ message: VALIDATION_MESSAGES.en.phoneRequired })
  @Matches(PHONE_PATTERNS.BANGLADESH_E164, {
    message: VALIDATION_MESSAGES.en.phoneInvalid,
  })
  phoneNumber: string;

  @ApiPropertyOptional({
    description: 'Reset delivery method',
    enum: ResetMethodValue,
    example: ResetMethodValue.SMS,
    default: ResetMethodValue.SMS,
  })
  @IsOptional()
  @IsEnum(ResetMethodValue, { message: VALIDATION_MESSAGES.en.methodInvalid })
  method?: ResetMethodValue | undefined = ResetMethodValue.SMS; // ✅ FIXED: added | undefined

  @ApiPropertyOptional({
    description: 'Preferred language for OTP message',
    example: 'bn',
    enum: ['en', 'bn'],
    default: 'en',
  })
  @IsOptional()
  @IsEnum(['en', 'bn'], { message: VALIDATION_MESSAGES.en.languageInvalid })
  language?: 'en' | 'bn' | undefined = 'en'; // ✅ FIXED: added | undefined

  @ApiPropertyOptional({
    description: 'CAPTCHA token for bot protection',
    example: '03AGdBq25...',
    minLength: 20,
    maxLength: 1000,
  })
  @IsOptional()
  @IsString({ message: 'CAPTCHA token must be a string' })
  @MinLength(20, { message: VALIDATION_MESSAGES.en.captchaMinLength })
  @MaxLength(1000, { message: VALIDATION_MESSAGES.en.captchaMaxLength })
  captchaToken?: string | undefined; // ✅ FIXED: added | undefined

  constructor(
    phoneNumber: string,
    method?: ResetMethodValue | undefined,
    language?: 'en' | 'bn' | undefined,
    captchaToken?: string | undefined,
  ) {
    this.phoneNumber = phoneNumber;
    this.method = method ?? ResetMethodValue.SMS;
    this.language = language ?? 'en';
    this.captchaToken = captchaToken;
  }
}

/**
 * Forgot Password Request DTO (Username based)
 *
 * @example
 * {
 *   "username": "john_doe",
 *   "captchaToken": "03AGdBq25..."
 * }
 */
export class ForgotPasswordUsernameDto {
  @ApiProperty({
    description: 'Username for password reset',
    example: 'john_doe',
    required: true,
    minLength: 3,
    maxLength: 50,
  })
  @IsString({ message: VALIDATION_MESSAGES.en.usernameRequired })
  @IsNotEmpty({ message: VALIDATION_MESSAGES.en.usernameRequired })
  @MinLength(3, { message: VALIDATION_MESSAGES.en.usernameMinLength })
  @MaxLength(50, { message: VALIDATION_MESSAGES.en.usernameMaxLength })
  username: string;

  @ApiPropertyOptional({
    description: 'CAPTCHA token for bot protection',
    example: '03AGdBq25...',
    minLength: 20,
    maxLength: 1000,
  })
  @IsOptional()
  @IsString({ message: 'CAPTCHA token must be a string' })
  @MinLength(20, { message: VALIDATION_MESSAGES.en.captchaMinLength })
  @MaxLength(1000, { message: VALIDATION_MESSAGES.en.captchaMaxLength })
  captchaToken?: string | undefined; // ✅ FIXED: added | undefined

  constructor(username: string, captchaToken?: string | undefined) {
    this.username = username;
    this.captchaToken = captchaToken;
  }
}

/**
 * Reset Password Request DTO (Token based)
 *
 * @example
 * {
 *   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
 *   "newPassword": "MyNewStr0ng!P@ssw0rd123",
 *   "confirmPassword": "MyNewStr0ng!P@ssw0rd123"
 * }
 */
export class ResetPasswordDto {
  @ApiProperty({
    description: 'Password reset token (from email link)',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    required: true,
  })
  @IsString({ message: VALIDATION_MESSAGES.en.tokenRequired })
  @IsNotEmpty({ message: VALIDATION_MESSAGES.en.tokenRequired })
  @Matches(TOKEN_PATTERNS.JWT, { message: VALIDATION_MESSAGES.en.tokenInvalid })
  token: string;

  @ApiProperty({
    description: 'New password',
    example: 'MyNewStr0ng!P@ssw0rd123',
    required: true,
    format: 'password',
    writeOnly: true,
  })
  @IsString({ message: VALIDATION_MESSAGES.en.passwordRequired })
  @IsNotEmpty({ message: VALIDATION_MESSAGES.en.passwordRequired })
  @MinLength(PASSWORD_POLICY.MIN_LENGTH, {
    message: () =>
      VALIDATION_MESSAGES.en.passwordMinLength(PASSWORD_POLICY.MIN_LENGTH),
  })
  @MaxLength(PASSWORD_POLICY.MAX_LENGTH, {
    message: () =>
      VALIDATION_MESSAGES.en.passwordMaxLength(PASSWORD_POLICY.MAX_LENGTH),
  })
  @Matches(PASSWORD_PATTERNS.STRONG, {
    message: VALIDATION_MESSAGES.en.passwordWeak,
  })
  newPassword: string;

  @ApiPropertyOptional({
    description: 'Confirm password (should match newPassword)',
    example: 'MyNewStr0ng!P@ssw0rd123',
    format: 'password',
    writeOnly: true,
  })
  @IsOptional()
  @IsString({ message: 'Confirm password must be a string' })
  confirmPassword?: string | undefined; // ✅ FIXED: added | undefined

  constructor(token: string, newPassword: string, confirmPassword?: string | undefined) {
    this.token = token;
    this.newPassword = newPassword;
    this.confirmPassword = confirmPassword;
  }
}

/**
 * Reset Password with OTP Request DTO (Bangladesh specific)
 *
 * @example
 * {
 *   "phoneNumber": "+8801712345678",
 *   "otpCode": "123456",
 *   "newPassword": "MyNewStr0ng!P@ssw0rd123"
 * }
 */
export class ResetPasswordWithOtpDto {
  @ApiProperty({
    description: 'Bangladesh phone number (E.164 format)',
    example: '+8801712345678',
    required: true,
  })
  @IsString({ message: VALIDATION_MESSAGES.en.phoneRequired })
  @IsNotEmpty({ message: VALIDATION_MESSAGES.en.phoneRequired })
  @Matches(PHONE_PATTERNS.BANGLADESH_E164, {
    message: VALIDATION_MESSAGES.en.phoneInvalid,
  })
  phoneNumber: string;

  @ApiProperty({
    description: 'OTP code received via SMS/WhatsApp',
    example: '123456',
    required: true,
    minLength: 6,
    maxLength: 6,
  })
  @IsString({ message: VALIDATION_MESSAGES.en.otpRequired })
  @IsNotEmpty({ message: VALIDATION_MESSAGES.en.otpRequired })
  @Matches(/^\d{6}$/, { message: VALIDATION_MESSAGES.en.otpInvalid })
  otpCode: string;

  @ApiProperty({
    description: 'New password',
    example: 'MyNewStr0ng!P@ssw0rd123',
    required: true,
    format: 'password',
    writeOnly: true,
  })
  @IsString({ message: VALIDATION_MESSAGES.en.passwordRequired })
  @IsNotEmpty({ message: VALIDATION_MESSAGES.en.passwordRequired })
  @MinLength(PASSWORD_POLICY.MIN_LENGTH, {
    message: () =>
      VALIDATION_MESSAGES.en.passwordMinLength(PASSWORD_POLICY.MIN_LENGTH),
  })
  @MaxLength(PASSWORD_POLICY.MAX_LENGTH, {
    message: () =>
      VALIDATION_MESSAGES.en.passwordMaxLength(PASSWORD_POLICY.MAX_LENGTH),
  })
  @Matches(PASSWORD_PATTERNS.STRONG, {
    message: VALIDATION_MESSAGES.en.passwordWeak,
  })
  newPassword: string;

  @ApiPropertyOptional({
    description: 'Confirm password (should match newPassword)',
    example: 'MyNewStr0ng!P@ssw0rd123',
    format: 'password',
    writeOnly: true,
  })
  @IsOptional()
  @IsString({ message: 'Confirm password must be a string' })
  confirmPassword?: string | undefined; // ✅ FIXED: added | undefined

  constructor(
    phoneNumber: string,
    otpCode: string,
    newPassword: string,
    confirmPassword?: string | undefined,
  ) {
    this.phoneNumber = phoneNumber;
    this.otpCode = otpCode;
    this.newPassword = newPassword;
    this.confirmPassword = confirmPassword;
  }
}

/**
 * Verify Reset OTP Request DTO
 *
 * @example
 * {
 *   "phoneNumber": "+8801712345678",
 *   "otpCode": "123456",
 *   "sessionId": "sess_550e8400-e29b-41d4-a716-446655440000"
 * }
 */
export class VerifyResetOtpDto {
  @ApiProperty({
    description: 'Bangladesh phone number (E.164 format)',
    example: '+8801712345678',
    required: true,
  })
  @IsString({ message: VALIDATION_MESSAGES.en.phoneRequired })
  @IsNotEmpty({ message: VALIDATION_MESSAGES.en.phoneRequired })
  @Matches(PHONE_PATTERNS.BANGLADESH_E164, {
    message: VALIDATION_MESSAGES.en.phoneInvalid,
  })
  phoneNumber: string;

  @ApiProperty({
    description: 'OTP code to verify',
    example: '123456',
    required: true,
    minLength: 6,
    maxLength: 6,
  })
  @IsString({ message: VALIDATION_MESSAGES.en.otpRequired })
  @IsNotEmpty({ message: VALIDATION_MESSAGES.en.otpRequired })
  @Matches(/^\d{6}$/, { message: VALIDATION_MESSAGES.en.otpInvalid })
  otpCode: string;

  @ApiPropertyOptional({
    description: 'Session ID from forgot password response',
    example: 'sess_550e8400-e29b-41d4-a716-446655440000',
  })
  @IsOptional()
  @IsUUID(4, { message: VALIDATION_MESSAGES.en.sessionIdInvalid })
  sessionId?: string | undefined; // ✅ FIXED: added | undefined

  constructor(phoneNumber: string, otpCode: string, sessionId?: string | undefined) {
    this.phoneNumber = phoneNumber;
    this.otpCode = otpCode;
    this.sessionId = sessionId;
  }
}

// ============================================================
// Response DTOs (Enterprise Enhanced)
// ============================================================

/**
 * Forgot Password Response DTO
 *
 * ✅ SECURITY: Always returns same message regardless of email existence
 * This prevents user enumeration attacks
 */
export class ForgotPasswordResponseDto {
  @ApiProperty({
    description: 'Success message (same for all responses)',
    example:
      'If an account exists with this email, you will receive password reset instructions',
  })
  message: string;

  @ApiPropertyOptional({
    description: 'Bengali success message',
    example:
      'যদি এই ইমেইলে একটি অ্যাকাউন্ট বিদ্যমান থাকে, তাহলে আপনি পাসওয়ার্ড রিসেট নির্দেশাবলী পাবেন',
  })
  messageBn?: string | undefined; // ✅ FIXED: added | undefined

  @ApiProperty({
    description: 'Whether the request was rate limited',
    example: false,
  })
  rateLimited: boolean;

  @ApiPropertyOptional({
    description: 'Seconds to wait before retrying (if rate limited)',
    example: 300,
  })
  retryAfterSeconds?: number | undefined; // ✅ FIXED: added | undefined

  @ApiPropertyOptional({
    description: 'Masked email or phone for user feedback',
    example: 'u***r@example.com',
  })
  maskedIdentifier?: string | undefined; // ✅ FIXED: added | undefined

  @ApiPropertyOptional({
    description: 'Session ID (for OTP flow)',
    example: 'sess_550e8400-e29b-41d4-a716-446655440000',
  })
  sessionId?: string | undefined; // ✅ FIXED: added | undefined

  @ApiPropertyOptional({
    description: 'OTP expiry in seconds',
    example: 300,
  })
  otpExpirySeconds?: number | undefined; // ✅ FIXED: added | undefined

  constructor(
    rateLimited: boolean = false,
    retryAfterSeconds?: number | undefined,
    message?: string | undefined,
    messageBn?: string | undefined,
    maskedIdentifier?: string | undefined,
    sessionId?: string | undefined,
    otpExpirySeconds?: number | undefined,
  ) {
    this.message =
      message ||
      'If an account exists with this email, you will receive password reset instructions';
    this.messageBn = messageBn;
    this.rateLimited = rateLimited;
    this.retryAfterSeconds = retryAfterSeconds;
    this.maskedIdentifier = maskedIdentifier;
    this.sessionId = sessionId;
    this.otpExpirySeconds = otpExpirySeconds;
  }

  static success(
    maskedIdentifier?: string | undefined,
    sessionId?: string | undefined,
    otpExpirySeconds?: number | undefined,
    message?: string | undefined,
    messageBn?: string | undefined,
  ): ForgotPasswordResponseDto {
    return new ForgotPasswordResponseDto(
      false,
      undefined,
      message,
      messageBn,
      maskedIdentifier,
      sessionId,
      otpExpirySeconds,
    );
  }

  static rateLimited(
    retryAfterSeconds: number,
    message?: string | undefined,
    messageBn?: string | undefined,
  ): ForgotPasswordResponseDto {
    return new ForgotPasswordResponseDto(
      true,
      retryAfterSeconds,
      message,
      messageBn,
    );
  }
}

/**
 * Reset Password Response DTO
 */
export class ResetPasswordResponseDto {
  @ApiProperty({
    description: 'Whether the operation was successful',
    example: true,
  })
  success: boolean;

  @ApiProperty({
    description: 'Response message',
    example:
      'Password reset successful. You can now log in with your new password.',
  })
  message: string;

  @ApiPropertyOptional({
    description: 'Bengali response message',
    example:
      'পাসওয়ার্ড রিসেট সফল হয়েছে। আপনি এখন আপনার নতুন পাসওয়ার্ড দিয়ে লগইন করতে পারেন।',
  })
  messageBn?: string | undefined; // ✅ FIXED: added | undefined

  @ApiPropertyOptional({
    description: 'Number of sessions revoked',
    example: 3,
  })
  sessionsRevoked?: number | undefined; // ✅ FIXED: added | undefined

  @ApiProperty({
    description: 'Timestamp when password was reset',
    example: '2024-01-01T00:00:00.000Z',
    format: 'date-time',
  })
  resetAt: string;

  @ApiPropertyOptional({
    description: 'Requires login after reset',
    example: true,
  })
  requiresLogin?: boolean | undefined; // ✅ FIXED: added | undefined

  @ApiPropertyOptional({
    description: 'Redirect URL (for magic link flow)',
    example: 'https://vubon.com.bd/login',
  })
  redirectUrl?: string | undefined; // ✅ FIXED: added | undefined

  constructor(
    success: boolean,
    message: string,
    sessionsRevoked?: number | undefined,
    messageBn?: string | undefined,
    requiresLogin?: boolean | undefined,
    redirectUrl?: string | undefined,
  ) {
    this.success = success;
    this.message = message;
    this.messageBn = messageBn;
    this.sessionsRevoked = sessionsRevoked;
    this.resetAt = new Date().toISOString();
    this.requiresLogin = requiresLogin ?? true;
    this.redirectUrl = redirectUrl;
  }

  static success(
    sessionsRevoked?: number | undefined,
    messageBn?: string | undefined,
    requiresLogin?: boolean | undefined,
    redirectUrl?: string | undefined,
  ): ResetPasswordResponseDto {
    return new ResetPasswordResponseDto(
      true,
      'Password reset successful. You can now log in with your new password.',
      sessionsRevoked,
      messageBn,
      requiresLogin,
      redirectUrl,
    );
  }

  static error(message: string, messageBn?: string | undefined): ResetPasswordResponseDto {
    return new ResetPasswordResponseDto(false, message, undefined, messageBn);
  }
}

/**
 * Validate Reset Token Response DTO
 */
export class ValidateResetTokenResponseDto {
  @ApiProperty({
    description: 'Whether the reset token is valid',
    example: true,
  })
  isValid: boolean;

  @ApiPropertyOptional({
    description: 'Email associated with the token (only if valid)',
    example: 'user@vubon.com.bd',
  })
  email?: string | undefined; // ✅ FIXED: added | undefined

  @ApiPropertyOptional({
    description: 'Phone number associated with the token',
    example: '+8801712345678',
  })
  phoneNumber?: string | undefined; // ✅ FIXED: added | undefined

  @ApiPropertyOptional({
    description: 'Token expiry timestamp',
    example: '2024-01-01T01:00:00.000Z',
    format: 'date-time',
  })
  expiresAt?: string | undefined; // ✅ FIXED: added | undefined

  @ApiPropertyOptional({
    description: 'Remaining time in seconds',
    example: 3599,
  })
  remainingSeconds?: number | undefined; // ✅ FIXED: added | undefined

  @ApiPropertyOptional({
    description: 'User ID (if token is valid)',
    example: 'usr_550e8400-e29b-41d4-a716-446655440000',
  })
  userId?: string | undefined; // ✅ FIXED: added | undefined

  @ApiPropertyOptional({
    description: 'Bengali validation message',
    example: 'টোকেনটি বৈধ',
  })
  messageBn?: string | undefined; // ✅ FIXED: added | undefined

  constructor(
    isValid: boolean,
    email?: string | undefined,
    expiresAt?: Date | undefined,
    remainingSeconds?: number | undefined,
    userId?: string | undefined,
    phoneNumber?: string | undefined,
    messageBn?: string | undefined,
  ) {
    this.isValid = isValid;
    this.email = email;
    this.phoneNumber = phoneNumber;
    if (expiresAt) {
      this.expiresAt = expiresAt.toISOString();
    }
    this.remainingSeconds = remainingSeconds;
    this.userId = userId;
    this.messageBn = messageBn;
  }
}

// ============================================================
// Type Exports
// ============================================================

export type { ResetMethod as ResetMethodType };
export type { ResetMethodValue as ResetMethodValueType };
