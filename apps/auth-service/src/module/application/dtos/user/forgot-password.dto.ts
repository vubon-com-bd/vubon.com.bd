/**
 * Forgot Password DTOs - Pure Data Transport Objects
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module application/dtos/user/forgot-password.dto
 * 
 * @description
 * Data transfer objects for password reset request (forgot password).
 * NO business logic, NO database queries, NO infrastructure imports.
 * 
 * Security Rules:
 * ✅ Email validation only - no user existence check in DTO
 * ✅ Rate limiting handled in application layer
 * ✅ Captcha support for preventing abuse
 * ✅ No user enumeration vulnerability
 * ✅ Bangladesh specific - Phone-based reset support
 * 
 * IMPORTANT: 
 * - Never disclose whether email exists in the system
 * - Always return same response regardless of email existence
 * - Rate limit to prevent abuse
 * 
 * Flow:
 * 1. User submits email or phone for password reset
 * 2. System validates email/phone format
 * 3. System checks rate limits
 * 4. System sends reset link/OTP if user exists (silently ignores if not)
 * 5. Always returns success response (no user enumeration)
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
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

// ✅ Phase-1 (shared-constants) থেকে ইম্পোর্ট - কেন্দ্রীভূত কনফিগারেশন
import { 
  PASSWORD_POLICY, 
  PASSWORD_PATTERNS, 
  PHONE_PATTERNS, 
  RESET_METHODS,
  TOKEN_PATTERNS,
  RATE_LIMIT_CONFIG,
} from '@vubon/shared-constants';

// ✅ Phase-1 (shared-types) থেকে টাইপ ইম্পোর্ট
import type { ResetMethod } from '@vubon/shared-types';

// ============================================================
// Enums (কনস্ট্যান্ট থেকে ইম্পোর্ট করা)
// ============================================================

// লোকাল এনামের বদলে কনস্ট্যান্ট ব্যবহার
export const ResetMethod = RESET_METHODS;

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
  @IsEmail({}, { message: 'Please provide a valid email address' })
  @IsNotEmpty({ message: 'Email is required' })
  @MaxLength(255, { message: 'Email cannot exceed 255 characters' })
  email: string;
  
  @ApiPropertyOptional({
    description: 'Captcha token for rate limiting (recommended)',
    example: '03AGdBq25...',
    minLength: 20,
    maxLength: 1000,
  })
  @IsOptional()
  @IsString({ message: 'Captcha token must be a string' })
  @MinLength(20, { message: 'Captcha token is too short' })
  @MaxLength(1000, { message: 'Captcha token is too long' })
  captchaToken?: string;
  
  constructor(email: string, captchaToken?: string) {
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
 *   "method": "sms",
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
  @IsString({ message: 'Phone number must be a string' })
  @IsNotEmpty({ message: 'Phone number is required' })
  @Matches(PHONE_PATTERNS.BANGLADESH_E164, { 
    message: 'Please provide a valid Bangladesh phone number (e.g., +8801712345678)' 
  })
  phoneNumber: string;

  @ApiPropertyOptional({
    description: 'Reset method (sms, whatsapp)',
    enum: ResetMethod,
    example: ResetMethod.SMS,
    default: ResetMethod.SMS,
  })
  @IsOptional()
  @IsEnum(ResetMethod, { message: 'Method must be sms or whatsapp' })
  method?: ResetMethod = ResetMethod.SMS;

  @ApiPropertyOptional({
    description: 'Preferred language for OTP message',
    example: 'bn',
    enum: ['en', 'bn'],
    default: 'en',
  })
  @IsOptional()
  @IsEnum(['en', 'bn'], { message: 'Language must be en or bn' })
  language?: 'en' | 'bn' = 'en';

  @ApiPropertyOptional({
    description: 'Captcha token for rate limiting (recommended)',
    example: '03AGdBq25...',
    minLength: 20,
    maxLength: 1000,
  })
  @IsOptional()
  @IsString({ message: 'Captcha token must be a string' })
  @MinLength(20, { message: 'Captcha token is too short' })
  @MaxLength(1000, { message: 'Captcha token is too long' })
  captchaToken?: string;

  constructor(
    phoneNumber: string, 
    method?: ResetMethod, 
    language?: 'en' | 'bn', 
    captchaToken?: string
  ) {
    this.phoneNumber = phoneNumber;
    this.method = method ?? ResetMethod.SMS;
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
  @IsString({ message: 'Username must be a string' })
  @IsNotEmpty({ message: 'Username is required' })
  @MinLength(3, { message: 'Username must be at least 3 characters' })
  @MaxLength(50, { message: 'Username cannot exceed 50 characters' })
  username: string;

  @ApiPropertyOptional({
    description: 'Captcha token for rate limiting (recommended)',
    example: '03AGdBq25...',
    minLength: 20,
    maxLength: 1000,
  })
  @IsOptional()
  @IsString({ message: 'Captcha token must be a string' })
  @MinLength(20, { message: 'Captcha token is too short' })
  @MaxLength(1000, { message: 'Captcha token is too long' })
  captchaToken?: string;

  constructor(username: string, captchaToken?: string) {
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
  @IsString({ message: 'Token must be a string' })
  @IsNotEmpty({ message: 'Reset token is required' })
  @Matches(TOKEN_PATTERNS.JWT, { message: 'Invalid token format' })
  token: string;
  
  @ApiProperty({
    description: 'New password',
    example: 'MyNewStr0ng!P@ssw0rd123',
    required: true,
    format: 'password',
    writeOnly: true,
    minLength: PASSWORD_POLICY.MIN_LENGTH,
    maxLength: PASSWORD_POLICY.MAX_LENGTH,
  })
  @IsString({ message: 'New password must be a string' })
  @IsNotEmpty({ message: 'New password is required' })
  @MinLength(PASSWORD_POLICY.MIN_LENGTH, { 
    message: `Password must be at least ${PASSWORD_POLICY.MIN_LENGTH} characters long` 
  })
  @MaxLength(PASSWORD_POLICY.MAX_LENGTH, { 
    message: `Password cannot exceed ${PASSWORD_POLICY.MAX_LENGTH} characters` 
  })
  @Matches(PASSWORD_PATTERNS.STRONG, {
    message: PASSWORD_POLICY.STRONG_PASSWORD_MESSAGE,
  })
  newPassword: string;

  @ApiPropertyOptional({
    description: 'Confirm password (optional, should match newPassword)',
    example: 'MyNewStr0ng!P@ssw0rd123',
    format: 'password',
    writeOnly: true,
  })
  @IsOptional()
  @IsString({ message: 'Confirm password must be a string' })
  confirmPassword?: string;
  
  constructor(token: string, newPassword: string, confirmPassword?: string) {
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
 *   "newPassword": "MyNewStr0ng!P@ssw0rd123",
 *   "confirmPassword": "MyNewStr0ng!P@ssw0rd123"
 * }
 */
export class ResetPasswordWithOtpDto {
  @ApiProperty({
    description: 'Bangladesh phone number (E.164 format)',
    example: '+8801712345678',
    required: true,
    pattern: PHONE_PATTERNS.BANGLADESH_E164,
  })
  @IsString({ message: 'Phone number must be a string' })
  @IsNotEmpty({ message: 'Phone number is required' })
  @Matches(PHONE_PATTERNS.BANGLADESH_E164, { 
    message: 'Please provide a valid Bangladesh phone number (e.g., +8801712345678)' 
  })
  phoneNumber: string;

  @ApiProperty({
    description: 'OTP code received via SMS/WhatsApp',
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
    description: 'New password',
    example: 'MyNewStr0ng!P@ssw0rd123',
    required: true,
    format: 'password',
    writeOnly: true,
    minLength: PASSWORD_POLICY.MIN_LENGTH,
    maxLength: PASSWORD_POLICY.MAX_LENGTH,
  })
  @IsString({ message: 'New password must be a string' })
  @IsNotEmpty({ message: 'New password is required' })
  @MinLength(PASSWORD_POLICY.MIN_LENGTH, { 
    message: `Password must be at least ${PASSWORD_POLICY.MIN_LENGTH} characters long` 
  })
  @MaxLength(PASSWORD_POLICY.MAX_LENGTH, { 
    message: `Password cannot exceed ${PASSWORD_POLICY.MAX_LENGTH} characters` 
  })
  @Matches(PASSWORD_PATTERNS.STRONG, {
    message: PASSWORD_POLICY.STRONG_PASSWORD_MESSAGE,
  })
  newPassword: string;

  @ApiPropertyOptional({
    description: 'Confirm password (optional, should match newPassword)',
    example: 'MyNewStr0ng!P@ssw0rd123',
    format: 'password',
    writeOnly: true,
  })
  @IsOptional()
  @IsString({ message: 'Confirm password must be a string' })
  confirmPassword?: string;

  constructor(
    phoneNumber: string, 
    otpCode: string, 
    newPassword: string, 
    confirmPassword?: string
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
 *   "sessionId": "sess_123"
 * }
 */
export class VerifyResetOtpDto {
  @ApiProperty({
    description: 'Bangladesh phone number (E.164 format)',
    example: '+8801712345678',
    required: true,
    pattern: PHONE_PATTERNS.BANGLADESH_E164,
  })
  @IsString({ message: 'Phone number must be a string' })
  @IsNotEmpty({ message: 'Phone number is required' })
  @Matches(PHONE_PATTERNS.BANGLADESH_E164, { 
    message: 'Please provide a valid Bangladesh phone number (e.g., +8801712345678)' 
  })
  phoneNumber: string;

  @ApiProperty({
    description: 'OTP code to verify',
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

  @ApiPropertyOptional({
    description: 'Session ID (returned from request)',
    example: 'sess_550e8400-e29b-41d4-a716-446655440000',
  })
  @IsOptional()
  @IsString({ message: 'Session ID must be a string' })
  sessionId?: string;

  constructor(phoneNumber: string, otpCode: string, sessionId?: string) {
    this.phoneNumber = phoneNumber;
    this.otpCode = otpCode;
    this.sessionId = sessionId;
  }
}

// ============================================================
// Response DTOs
// ============================================================

/**
 * Forgot Password Response DTO
 * Note: Always returns same message regardless of email existence
 * This prevents user enumeration attacks
 */
export class ForgotPasswordResponseDto {
  @ApiProperty({
    description: 'Success message',
    example: 'If an account exists with this email, you will receive password reset instructions',
  })
  message: string;

  @ApiPropertyOptional({
    description: 'Bengali success message',
    example: 'যদি এই ইমেইলে একটি অ্যাকাউন্ট বিদ্যমান থাকে, তাহলে আপনি পাসওয়ার্ড রিসেট নির্দেশাবলী পাবেন',
  })
  messageBn?: string;
  
  @ApiProperty({
    description: 'Whether the request was rate limited',
    example: false,
  })
  rateLimited: boolean;
  
  @ApiPropertyOptional({
    description: 'Seconds to wait before retrying (if rate limited)',
    example: 300,
  })
  retryAfterSeconds?: number;

  @ApiPropertyOptional({
    description: 'Masked email or phone (for user feedback)',
    example: 'u***r@example.com',
  })
  maskedIdentifier?: string;

  @ApiPropertyOptional({
    description: 'Session ID (for OTP flow)',
    example: 'sess_550e8400-e29b-41d4-a716-446655440000',
  })
  sessionId?: string;

  @ApiPropertyOptional({
    description: 'OTP expiry in seconds',
    example: 300,
  })
  otpExpirySeconds?: number;

  constructor(
    rateLimited: boolean = false, 
    retryAfterSeconds?: number,
    message?: string,
    messageBn?: string,
    maskedIdentifier?: string,
    sessionId?: string,
    otpExpirySeconds?: number
  ) {
    this.message = message || 'If an account exists with this email, you will receive password reset instructions';
    this.messageBn = messageBn;
    this.rateLimited = rateLimited;
    this.retryAfterSeconds = retryAfterSeconds;
    this.maskedIdentifier = maskedIdentifier;
    this.sessionId = sessionId;
    this.otpExpirySeconds = otpExpirySeconds;
  }
  
  /**
   * Create success response (always the same)
   */
  static success(
    maskedIdentifier?: string,
    sessionId?: string,
    otpExpirySeconds?: number,
    message?: string,
    messageBn?: string
  ): ForgotPasswordResponseDto {
    return new ForgotPasswordResponseDto(
      false, 
      undefined, 
      message, 
      messageBn, 
      maskedIdentifier, 
      sessionId, 
      otpExpirySeconds
    );
  }
  
  /**
   * Create rate limited response
   */
  static rateLimited(
    retryAfterSeconds: number, 
    message?: string, 
    messageBn?: string
  ): ForgotPasswordResponseDto {
    return new ForgotPasswordResponseDto(true, retryAfterSeconds, message, messageBn);
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
    example: 'Password reset successful. You can now log in with your new password.',
  })
  message: string;

  @ApiPropertyOptional({
    description: 'Bengali response message',
    example: 'পাসওয়ার্ড রিসেট সফল হয়েছে। আপনি এখন আপনার নতুন পাসওয়ার্ড দিয়ে লগইন করতে পারেন।',
  })
  messageBn?: string;
  
  @ApiPropertyOptional({
    description: 'Number of sessions revoked',
    example: 3,
  })
  sessionsRevoked?: number;
  
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
  requiresLogin?: boolean;

  @ApiPropertyOptional({
    description: 'Redirect URL (for magic link flow)',
    example: 'https://vubon.com.bd/login',
  })
  redirectUrl?: string;
  
  constructor(
    success: boolean, 
    message: string, 
    sessionsRevoked?: number,
    messageBn?: string,
    requiresLogin?: boolean,
    redirectUrl?: string
  ) {
    this.success = success;
    this.message = message;
    this.messageBn = messageBn;
    this.sessionsRevoked = sessionsRevoked;
    this.resetAt = new Date().toISOString();
    this.requiresLogin = requiresLogin ?? true;
    this.redirectUrl = redirectUrl;
  }
  
  /**
   * Create success response
   */
  static success(
    sessionsRevoked?: number,
    messageBn?: string,
    requiresLogin?: boolean,
    redirectUrl?: string
  ): ResetPasswordResponseDto {
    return new ResetPasswordResponseDto(
      true,
      'Password reset successful. You can now log in with your new password.',
      sessionsRevoked,
      messageBn,
      requiresLogin,
      redirectUrl
    );
  }
  
  /**
   * Create error response
   */
  static error(message: string, messageBn?: string): ResetPasswordResponseDto {
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
  email?: string;
  
  @ApiPropertyOptional({
    description: 'Phone number associated with the token (only if valid)',
    example: '+8801712345678',
  })
  phoneNumber?: string;
  
  @ApiPropertyOptional({
    description: 'Token expiry timestamp',
    example: '2024-01-01T01:00:00.000Z',
    format: 'date-time',
  })
  expiresAt?: string;

  @ApiPropertyOptional({
    description: 'Remaining time in seconds',
    example: 3599,
  })
  remainingSeconds?: number;

  @ApiPropertyOptional({
    description: 'User ID (if token is valid)',
    example: 'usr_550e8400-e29b-41d4-a716-446655440000',
  })
  userId?: string;

  @ApiPropertyOptional({
    description: 'Bengali validation message',
    example: 'টোকেনটি বৈধ',
  })
  messageBn?: string;

  constructor(
    isValid: boolean, 
    email?: string, 
    expiresAt?: Date,
    remainingSeconds?: number,
    userId?: string,
    phoneNumber?: string,
    messageBn?: string
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

/**
 * Reset Request Rate Limit Response DTO
 */
export class ResetRateLimitResponseDto {
  @ApiProperty({
    description: 'Whether rate limited',
    example: true,
  })
  limited: boolean;

  @ApiProperty({
    description: 'Remaining requests in current window',
    example: 2,
  })
  remainingRequests: number;

  @ApiProperty({
    description: 'Reset time for rate limit',
    example: '2024-01-01T01:00:00.000Z',
    format: 'date-time',
  })
  resetAt: string;

  @ApiProperty({
    description: 'Seconds until rate limit resets',
    example: 3600,
  })
  resetInSeconds: number;

  @ApiPropertyOptional({
    description: 'Bengali message',
    example: 'আপনি অনেক বেশি রিকোয়েস্ট করেছেন। অনুগ্রহ করে কিছুক্ষণ পরে আবার চেষ্টা করুন।',
  })
  messageBn?: string;

  constructor(
    limited: boolean,
    remainingRequests: number,
    resetAt: Date,
    resetInSeconds: number,
    messageBn?: string
  ) {
    this.limited = limited;
    this.remainingRequests = remainingRequests;
    this.resetAt = resetAt.toISOString();
    this.resetInSeconds = resetInSeconds;
    this.messageBn = messageBn;
  }
}

// ============================================================
// Type Exports
// ============================================================

export type { ResetMethod as ResetMethodType };
