/**
 * Password Reset Schemas - Pure validation for password recovery
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module shared-schemas/auth/password-reset.schema
 * 
 * RULES:
 * ✅ ONLY Zod schemas - NO business logic
 * ✅ NO token generation, email sending, password update
 * ✅ NO side effects, NO async
 * ✅ Reusable primitives from constants
 * ✅ Strict mode enabled
 * ✅ Type exports with z.infer
 */

import { z } from 'zod';

// Import constants from shared-constants layer (Enterprise rule)
import { PASSWORD_POLICY, TOKEN_EXPIRY } from '@vubon/shared-constants';

// ==================== Primitives (Reusable) ====================

// Email Schema
export const EmailSchema = z
  .string()
  .min(1, 'Email is required')
  .max(255, 'Email too long')
  .email('Invalid email format. Example: user@example.com')
  .trim()
  .toLowerCase()
  .brand('Email');

// Phone Schema (Bangladesh specific)
export const PhoneSchema = z
  .string()
  .regex(/^(?:\+880|0)1[3-9]\d{8}$/, 'Invalid Bangladesh phone number format. Use format: 01XXXXXXXXX or +8801XXXXXXXXX')
  .transform((val) => {
    if (val.startsWith('0')) {
      return `+88${val}`;
    }
    if (val.startsWith('+880')) {
      return val;
    }
    return `+880${val}`;
  })
  .brand('Phone');

// Password Schema (Basic - no strength validation)
export const PasswordSchema = z
  .string()
  .min(PASSWORD_POLICY?.MIN_LENGTH || 8, `Password must be at least ${PASSWORD_POLICY?.MIN_LENGTH || 8} characters`)
  .max(PASSWORD_POLICY?.MAX_LENGTH || 128, `Password cannot exceed ${PASSWORD_POLICY?.MAX_LENGTH || 128} characters`)
  .brand('Password');

// Password strength validation with fallbacks
export const PasswordStrengthSchema = z
  .string()
  .min(PASSWORD_POLICY?.MIN_LENGTH || 8, `Password must be at least ${PASSWORD_POLICY?.MIN_LENGTH || 8} characters`)
  .max(PASSWORD_POLICY?.MAX_LENGTH || 128, `Password cannot exceed ${PASSWORD_POLICY?.MAX_LENGTH || 128} characters`)
  .superRefine((val, ctx) => {
    const requireUppercase = PASSWORD_POLICY?.REQUIRE_UPPERCASE ?? true;
    const requireLowercase = PASSWORD_POLICY?.REQUIRE_LOWERCASE ?? true;
    const requireNumbers = PASSWORD_POLICY?.REQUIRE_NUMBERS ?? true;
    const requireSpecialChars = (PASSWORD_POLICY as any)?.REQUIRE_SPECIAL_CHARS ?? true;
    
    if (requireUppercase && !/[A-Z]/.test(val)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Password must contain at least one uppercase letter',
        path: ['password'],
      });
    }
    if (requireLowercase && !/[a-z]/.test(val)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Password must contain at least one lowercase letter',
        path: ['password'],
      });
    }
    if (requireNumbers && !/\d/.test(val)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Password must contain at least one number',
        path: ['password'],
      });
    }
    if (requireSpecialChars && !/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(val)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Password must contain at least one special character',
        path: ['password'],
      });
    }
    if (/(.)\1{2,}/.test(val)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Password should not contain repeated characters (e.g., "aaa")',
        path: ['password'],
      });
    }
  })
  .brand('PasswordStrength');

// Verification Token Schema
export const VerificationTokenSchema = z
  .string()
  .min(32, 'Invalid token format')
  .max(512, 'Token too long')
  .regex(/^[a-zA-Z0-9\-_]+$/, 'Token contains invalid characters')
  .brand('VerificationToken');

// User ID Schema
export const UserIdSchema = z.string().uuid('Invalid user ID format').brand('UserId');

// Session ID Schema
export const SessionIdSchema = z.string().uuid('Invalid session ID format').brand('SessionId');

// CAPTCHA Token Schema
export const CaptchaTokenSchema = z
  .string()
  .min(1, 'CAPTCHA verification required')
  .optional()
  .brand('CaptchaToken');

// ==================== Constants with fallbacks ====================

const PASSWORD_RESET_TOKEN_EXPIRY = TOKEN_EXPIRY?.PASSWORD_RESET_TOKEN || 1800;
const RESEND_COOLDOWN_SECONDS = 60;
const OTP_EXPIRY_SECONDS = 300;

// ==================== Request Schemas ====================

// Forgot Password Request (Step 1 - Email)
export const ForgotPasswordSchema = z
  .object({
    email: EmailSchema,
    captchaToken: CaptchaTokenSchema,
  })
  .strict()
  .brand('ForgotPasswordRequest');

// Forgot Password with Phone (Bangladesh specific)
export const ForgotPasswordPhoneSchema = z
  .object({
    phoneNumber: PhoneSchema,
    method: z.enum(['sms', 'whatsapp']).default('sms'),
    captchaToken: CaptchaTokenSchema,
  })
  .strict()
  .brand('ForgotPasswordPhoneRequest');

// Reset Password Request (Step 2 - Token based)
export const ResetPasswordSchema = z
  .object({
    token: VerificationTokenSchema,
    newPassword: PasswordSchema,
    confirmPassword: PasswordSchema,
  })
  .strict()
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })
  .refine(
    (data) => {
      const commonPasswords = [
        'password123', '12345678', 'qwerty123', 'admin123',
        'bangladesh123', 'dhaka123', 'vubon123', 'chittagong123',
        '123456789', 'password', '123456', 'qwerty', 'abc123',
      ];
      return !commonPasswords.includes(data.newPassword.toLowerCase());
    },
    {
      message: 'Password is too common. Please choose a stronger password',
      path: ['newPassword'],
    }
  )
  .brand('ResetPasswordRequest');

// Strong Password Reset Request (For enhanced security)
// ✅ FIXED: Both passwords use same schema (PasswordStrengthSchema)
export const StrongResetPasswordSchema = z
  .object({
    token: VerificationTokenSchema,
    newPassword: PasswordStrengthSchema,
    confirmPassword: PasswordStrengthSchema,  // ✅ Changed from PasswordSchema to PasswordStrengthSchema
  })
  .strict()
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })
  .brand('StrongResetPasswordRequest');

// Validate Reset Token Request
export const ValidateResetTokenSchema = z
  .object({
    token: VerificationTokenSchema,
  })
  .strict()
  .brand('ValidateResetTokenRequest');

// Request OTP for Password Reset (Bangladesh specific)
export const RequestResetOTPSchema = z
  .object({
    phoneNumber: PhoneSchema,
    method: z.enum(['sms', 'whatsapp', 'voice']).default('sms'),
    locale: z.enum(['en', 'bn']).default('en'),
  })
  .strict()
  .brand('RequestResetOTPRequest');

// Verify OTP for Password Reset
export const VerifyResetOTPSchema = z
  .object({
    phoneNumber: PhoneSchema,
    otpCode: z.string().length(6, 'OTP must be 6 digits').regex(/^\d{6}$/, 'OTP must contain only digits'),
    sessionId: SessionIdSchema.optional(),
  })
  .strict()
  .brand('VerifyResetOTPRequest');

// ==================== Response Schemas ====================

// Forgot Password Response (Email)
export const ForgotPasswordResponseSchema = z
  .object({
    success: z.boolean(),
    message: z.string(),
    messageBn: z.string().optional(),
    resetTokenSent: z.boolean(),
    email: z.string().email().optional(),
    maskedEmail: z.string().optional(),
    expiresInSeconds: z.number().int().positive().default(PASSWORD_RESET_TOKEN_EXPIRY),
    resendCooldownSeconds: z.number().int().default(RESEND_COOLDOWN_SECONDS),
    requiresCaptcha: z.boolean().optional(),
  })
  .strict()
  .brand('ForgotPasswordResponse');

// Forgot Password Phone Response (Bangladesh specific)
export const ForgotPasswordPhoneResponseSchema = z
  .object({
    success: z.boolean(),
    message: z.string(),
    messageBn: z.string().optional(),
    otpSent: z.boolean(),
    maskedPhone: z.string(),
    method: z.enum(['sms', 'whatsapp']),
    expiresInSeconds: z.number().int().positive().default(OTP_EXPIRY_SECONDS),
    resendCooldownSeconds: z.number().int().default(30),
    sessionId: SessionIdSchema.optional(),
    remainingAttempts: z.number().int().default(3),
  })
  .strict()
  .brand('ForgotPasswordPhoneResponse');

// Reset Password Response
export const ResetPasswordResponseSchema = z
  .object({
    success: z.boolean(),
    message: z.string(),
    messageBn: z.string().optional(),
    requiresLogin: z.boolean().default(true),
    redirectUrl: z.string().url().optional(),
    sessionCreated: z.boolean().optional(),
  })
  .strict()
  .brand('ResetPasswordResponse');

// Token Validation Response
export const TokenValidationResponseSchema = z
  .object({
    valid: z.boolean(),
    expiresAt: z.date().optional(),
    userId: UserIdSchema.optional(),
    email: z.string().email().optional(),
    phoneNumber: z.string().optional(),
    remainingSeconds: z.number().int().min(0).optional(),
    isExpired: z.boolean().optional(),
    isValidFormat: z.boolean().optional(),
  })
  .strict()
  .brand('TokenValidationResponse');

// Request Reset OTP Response
export const RequestResetOTPResponseSchema = z
  .object({
    success: z.boolean(),
    message: z.string(),
    messageBn: z.string().optional(),
    otpSent: z.boolean(),
    maskedPhone: z.string(),
    method: z.enum(['sms', 'whatsapp', 'voice']),
    expiresInSeconds: z.number().int().positive().default(OTP_EXPIRY_SECONDS),
    resendCooldownSeconds: z.number().int().default(30),
    sessionId: SessionIdSchema,
    remainingAttempts: z.number().int().default(3),
  })
  .strict()
  .brand('RequestResetOTPResponse');

// Verify Reset OTP Response
export const VerifyResetOTPResponseSchema = z
  .object({
    success: z.boolean(),
    verified: z.boolean(),
    resetToken: VerificationTokenSchema.optional(),
    expiresInSeconds: z.number().int().positive().optional(),
    message: z.string().optional(),
    remainingAttempts: z.number().int().optional(),
    userId: UserIdSchema.optional(),
  })
  .strict()
  .brand('VerifyResetOTPResponse');

// ==================== Error Response Schemas ====================

export const PasswordResetErrorSchema = z
  .object({
    error: z.string(),
    errorCode: z.enum([
      'invalid_email',
      'invalid_phone',
      'user_not_found',
      'invalid_token',
      'token_expired',
      'token_already_used',
      'rate_limited',
      'too_many_attempts',
      'password_too_weak',
      'password_reused',
      'account_locked',
      'account_suspended',
      'invalid_otp',
      'otp_expired',
      'max_otp_attempts_exceeded',
      'session_expired',
      'invalid_captcha',
    ]),
    remainingAttempts: z.number().int().min(0).optional(),
    retryAfterSeconds: z.number().int().optional(),
  })
  .strict()
  .brand('PasswordResetError');

// ==================== Helper Types (For frontend) ====================

export type ResetPasswordFormData = ResetPasswordRequest;
export type ForgotPasswordFormData = ForgotPasswordRequest;
export type ForgotPasswordPhoneFormData = ForgotPasswordPhoneRequest;
export type StrongResetPasswordFormData = StrongResetPasswordRequest;
export type RequestResetOTPFormData = RequestResetOTPRequest;
export type VerifyResetOTPFormData = VerifyResetOTPRequest;

// ==================== Type Exports ====================

export type Email = z.infer<typeof EmailSchema>;
export type Phone = z.infer<typeof PhoneSchema>;
export type Password = z.infer<typeof PasswordSchema>;
export type PasswordStrength = z.infer<typeof PasswordStrengthSchema>;
export type VerificationToken = z.infer<typeof VerificationTokenSchema>;
export type UserId = z.infer<typeof UserIdSchema>;
export type SessionId = z.infer<typeof SessionIdSchema>;
export type CaptchaToken = z.infer<typeof CaptchaTokenSchema>;

export type ForgotPasswordRequest = z.infer<typeof ForgotPasswordSchema>;
export type ForgotPasswordPhoneRequest = z.infer<typeof ForgotPasswordPhoneSchema>;
export type ResetPasswordRequest = z.infer<typeof ResetPasswordSchema>;
export type StrongResetPasswordRequest = z.infer<typeof StrongResetPasswordSchema>;
export type ValidateResetTokenRequest = z.infer<typeof ValidateResetTokenSchema>;
export type RequestResetOTPRequest = z.infer<typeof RequestResetOTPSchema>;
export type VerifyResetOTPRequest = z.infer<typeof VerifyResetOTPSchema>;

export type ForgotPasswordResponse = z.infer<typeof ForgotPasswordResponseSchema>;
export type ForgotPasswordPhoneResponse = z.infer<typeof ForgotPasswordPhoneResponseSchema>;
export type ResetPasswordResponse = z.infer<typeof ResetPasswordResponseSchema>;
export type TokenValidationResponse = z.infer<typeof TokenValidationResponseSchema>;
export type RequestResetOTPResponse = z.infer<typeof RequestResetOTPResponseSchema>;
export type VerifyResetOTPResponse = z.infer<typeof VerifyResetOTPResponseSchema>;
export type PasswordResetError = z.infer<typeof PasswordResetErrorSchema>;
