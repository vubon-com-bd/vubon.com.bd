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

// Email Schema for Password Reset
export const ResetEmailSchema = z
  .string()
  .min(1, 'Email is required')
  .max(255, 'Email too long')
  .email('Invalid email format. Example: user@example.com')
  .trim()
  .toLowerCase()
  .brand('ResetEmail');

// Phone Schema for Password Reset (Bangladesh specific)
// ✅ FIXED: Renamed to avoid conflict
export const ResetPhoneSchema = z
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
  .brand('ResetPhone');

// Password Schema for Reset
export const ResetPasswordSchema = z
  .string()
  .min(PASSWORD_POLICY?.MIN_LENGTH || 8, `Password must be at least ${PASSWORD_POLICY?.MIN_LENGTH || 8} characters`)
  .max(PASSWORD_POLICY?.MAX_LENGTH || 128, `Password cannot exceed ${PASSWORD_POLICY?.MAX_LENGTH || 128} characters`)
  .brand('ResetPassword');

// Password strength validation with fallbacks
export const ResetPasswordStrengthSchema = z
  .string()
  .min(PASSWORD_POLICY?.MIN_LENGTH || 8, `Password must be at least ${PASSWORD_POLICY?.MIN_LENGTH || 8} characters`)
  .max(PASSWORD_POLICY?.MAX_LENGTH || 128, `Password cannot exceed ${PASSWORD_POLICY?.MAX_LENGTH || 128} characters`)
  .superRefine((val, ctx) => {
    const requireUppercase = PASSWORD_POLICY?.REQUIRE_UPPERCASE ?? true;
    const requireLowercase = PASSWORD_POLICY?.REQUIRE_LOWERCASE ?? true;
    const requireNumbers = PASSWORD_POLICY?.REQUIRE_NUMBERS ?? true;
    const requireSpecialChars = (PASSWORD_POLICY as any)?.REQUIRE_SYMBOLS ?? true;
    
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
  .brand('ResetPasswordStrength');

// Verification Token Schema for Password Reset
export const ResetVerificationTokenSchema = z
  .string()
  .min(32, 'Invalid token format')
  .max(512, 'Token too long')
  .regex(/^[a-zA-Z0-9\-_]+$/, 'Token contains invalid characters')
  .brand('ResetVerificationToken');

// User ID Schema for Password Reset
export const ResetUserIdSchema = z.string().uuid('Invalid user ID format').brand('ResetUserId');

// Session ID Schema for Password Reset
export const ResetSessionIdSchema = z.string().uuid('Invalid session ID format').brand('ResetSessionId');

// CAPTCHA Token Schema for Password Reset
export const ResetCaptchaTokenSchema = z
  .string()
  .min(1, 'CAPTCHA verification required')
  .optional()
  .brand('ResetCaptchaToken');

// ==================== Constants with fallbacks ====================

const PASSWORD_RESET_TOKEN_EXPIRY = TOKEN_EXPIRY?.PASSWORD_RESET_TOKEN || 1800;
const RESEND_COOLDOWN_SECONDS = 60;
const OTP_EXPIRY_SECONDS = 300;

// ==================== Request Schemas ====================

// Forgot Password Request (Step 1 - Email)
export const ForgotPasswordSchema = z
  .object({
    email: ResetEmailSchema,
    captchaToken: ResetCaptchaTokenSchema,
  })
  .strict()
  .brand('ForgotPasswordRequest');

// Forgot Password with Phone (Bangladesh specific)
export const ForgotPasswordPhoneSchema = z
  .object({
    phoneNumber: ResetPhoneSchema,
    method: z.enum(['sms', 'whatsapp']).default('sms'),
    captchaToken: ResetCaptchaTokenSchema,
  })
  .strict()
  .brand('ForgotPasswordPhoneRequest');

// Reset Password Request (Step 2 - Token based)
export const ResetPasswordRequestSchema = z
  .object({
    token: ResetVerificationTokenSchema,
    newPassword: ResetPasswordSchema,
    confirmPassword: ResetPasswordSchema,
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
export const StrongResetPasswordRequestSchema = z
  .object({
    token: ResetVerificationTokenSchema,
    newPassword: ResetPasswordStrengthSchema,
    confirmPassword: ResetPasswordStrengthSchema,
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
    token: ResetVerificationTokenSchema,
  })
  .strict()
  .brand('ValidateResetTokenRequest');

// Request OTP for Password Reset (Bangladesh specific)
export const RequestResetOTPSchema = z
  .object({
    phoneNumber: ResetPhoneSchema,
    method: z.enum(['sms', 'whatsapp', 'voice']).default('sms'),
    locale: z.enum(['en', 'bn']).default('en'),
  })
  .strict()
  .brand('RequestResetOTPRequest');

// Verify OTP for Password Reset
export const VerifyResetOTPSchema = z
  .object({
    phoneNumber: ResetPhoneSchema,
    otpCode: z.string().length(6, 'OTP must be 6 digits').regex(/^\d{6}$/, 'OTP must contain only digits'),
    sessionId: ResetSessionIdSchema.optional(),
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
    sessionId: ResetSessionIdSchema.optional(),
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
    userId: ResetUserIdSchema.optional(),
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
    sessionId: ResetSessionIdSchema,
    remainingAttempts: z.number().int().default(3),
  })
  .strict()
  .brand('RequestResetOTPResponse');

// Verify Reset OTP Response
export const VerifyResetOTPResponseSchema = z
  .object({
    success: z.boolean(),
    verified: z.boolean(),
    resetToken: ResetVerificationTokenSchema.optional(),
    expiresInSeconds: z.number().int().positive().optional(),
    message: z.string().optional(),
    remainingAttempts: z.number().int().optional(),
    userId: ResetUserIdSchema.optional(),
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

export type ResetPasswordFormData = ResetPasswordRequestSchema;
export type ForgotPasswordFormData = ForgotPasswordSchema;
export type ForgotPasswordPhoneFormData = ForgotPasswordPhoneSchema;
export type StrongResetPasswordFormData = StrongResetPasswordRequestSchema;
export type RequestResetOTPFormData = RequestResetOTPSchema;
export type VerifyResetOTPFormData = VerifyResetOTPSchema;

// ==================== Type Exports ====================

export type ResetEmail = z.infer<typeof ResetEmailSchema>;
export type ResetPhone = z.infer<typeof ResetPhoneSchema>;
export type ResetPassword = z.infer<typeof ResetPasswordSchema>;
export type ResetPasswordStrength = z.infer<typeof ResetPasswordStrengthSchema>;
export type ResetVerificationToken = z.infer<typeof ResetVerificationTokenSchema>;
export type ResetUserId = z.infer<typeof ResetUserIdSchema>;
export type ResetSessionId = z.infer<typeof ResetSessionIdSchema>;
export type ResetCaptchaToken = z.infer<typeof ResetCaptchaTokenSchema>;

export type ForgotPasswordRequest = z.infer<typeof ForgotPasswordSchema>;
export type ForgotPasswordPhoneRequest = z.infer<typeof ForgotPasswordPhoneSchema>;
export type ResetPasswordRequest = z.infer<typeof ResetPasswordRequestSchema>;
export type StrongResetPasswordRequest = z.infer<typeof StrongResetPasswordRequestSchema>;
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
