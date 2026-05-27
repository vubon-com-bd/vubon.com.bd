/**
 * Password Reset Schemas - Pure validation for password recovery
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module shared-schemas/auth-schemas/src/auth/password-reset.schema
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
import {
  PASSWORD_POLICY,
  TOKEN_EXPIRY,
} from '@vubon/auth-constants';

// ==================== Primitives (Reusable) ====================

// Email Schema (Reused from user.schema - will be imported when created)
// For now, define locally following enterprise best practices
const EmailSchema = z
  .string()
  .min(1, 'Email is required')
  .max(255, 'Email too long')
  .email('Invalid email format')
  .trim()
  .toLowerCase();

// Password Schema (Reused from user.schema)
const PasswordSchema = z
  .string()
  .min(PASSWORD_POLICY.MIN_LENGTH, `Password must be at least ${PASSWORD_POLICY.MIN_LENGTH} characters`)
  .max(PASSWORD_POLICY.MAX_LENGTH, `Password cannot exceed ${PASSWORD_POLICY.MAX_LENGTH} characters`);

// Password strength validation
const PasswordStrengthSchema = z
  .string()
  .superRefine((val, ctx) => {
    if (PASSWORD_POLICY.REQUIRE_UPPERCASE && !/[A-Z]/.test(val)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Password must contain at least one uppercase letter',
        path: ['password'],
      });
    }
    if (PASSWORD_POLICY.REQUIRE_LOWERCASE && !/[a-z]/.test(val)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Password must contain at least one lowercase letter',
        path: ['password'],
      });
    }
    if (PASSWORD_POLICY.REQUIRE_NUMBERS && !/\d/.test(val)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Password must contain at least one number',
        path: ['password'],
      });
    }
    if (PASSWORD_POLICY.REQUIRE_SPECIAL_CHARS && !/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(val)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Password must contain at least one special character',
        path: ['password'],
      });
    }
  });

// Verification Token Schema
export const VerificationTokenSchema = z
  .string()
  .min(32, 'Invalid token format')
  .max(512, 'Token too long')
  .regex(/^[a-zA-Z0-9\-_]+$/, 'Token contains invalid characters')
  .brand('VerificationToken');

// User ID Schema
export const UserIdSchema = z.string().uuid('Invalid user ID format').brand('UserId');

// ==================== Request Schemas ====================

// Forgot Password Request (Step 1)
export const ForgotPasswordSchema = z
  .object({
    email: EmailSchema,
    captchaToken: z.string().min(1, 'CAPTCHA token required').optional(),
  })
  .strict()
  .brand('ForgotPasswordRequest');

// Forgot Password with Phone (Bangladesh specific)
export const ForgotPasswordPhoneSchema = z
  .object({
    phoneNumber: z
      .string()
      .regex(/^(?:\+880|0)1[3-9]\d{8}$/, 'Invalid Bangladesh phone number format')
      .transform((val) => {
        if (val.startsWith('0')) {
          return `+88${val}`;
        }
        if (val.startsWith('+880')) {
          return val;
        }
        return `+880${val}`;
      }),
    method: z.enum(['sms', 'whatsapp']).default('sms'),
    captchaToken: z.string().min(1, 'CAPTCHA token required').optional(),
  })
  .strict()
  .brand('ForgotPasswordPhoneRequest');

// Reset Password Request (Step 2)
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
      // Additional check: password should not be same as common passwords
      const commonPasswords = [
        'password123', '12345678', 'qwerty123', 'admin123',
        'bangladesh123', 'dhaka123', 'vubon123',
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
export const StrongResetPasswordSchema = z
  .object({
    token: VerificationTokenSchema,
    newPassword: PasswordStrengthSchema,
    confirmPassword: PasswordSchema,
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
    phoneNumber: z
      .string()
      .regex(/^(?:\+880|0)1[3-9]\d{8}$/, 'Invalid Bangladesh phone number format'),
    method: z.enum(['sms', 'whatsapp', 'voice']).default('sms'),
  })
  .strict()
  .brand('RequestResetOTPRequest');

// Verify OTP for Password Reset
export const VerifyResetOTPSchema = z
  .object({
    phoneNumber: z
      .string()
      .regex(/^(?:\+880|0)1[3-9]\d{8}$/, 'Invalid Bangladesh phone number format'),
    otpCode: z.string().length(6, 'OTP must be 6 digits').regex(/^\d{6}$/, 'OTP must contain only digits'),
    sessionId: z.string().uuid().optional(),
  })
  .strict()
  .brand('VerifyResetOTPRequest');

// ==================== Response Schemas ====================

// Forgot Password Response
export const ForgotPasswordResponseSchema = z
  .object({
    success: z.boolean(),
    message: z.string(),
    messageBn: z.string().optional(), // Bengali message (Bangladesh specific)
    resetTokenSent: z.boolean(),
    email: z.string().email().optional(),
    maskedEmail: z.string().optional(), // e.g., "u***@example.com"
    expiresInSeconds: z.number().int().positive().default(TOKEN_EXPIRY.PASSWORD_RESET_TOKEN),
    resendCooldownSeconds: z.number().int().default(60),
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
    maskedPhone: z.string(), // e.g., "017*****123"
    method: z.enum(['sms', 'whatsapp']),
    expiresInSeconds: z.number().int().positive().default(300),
    resendCooldownSeconds: z.number().int().default(30),
    sessionId: z.string().uuid().optional(),
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
    expiresInSeconds: z.number().int().positive().default(300),
    resendCooldownSeconds: z.number().int().default(30),
    sessionId: z.string().uuid(),
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
  })
  .strict()
  .brand('VerifyResetOTPResponse');

// Password Reset Error Response
export const PasswordResetErrorSchema = z
  .object({
    error: z.string(),
    errorCode: z.enum([
      'invalid_email',
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
    ]),
    remainingAttempts: z.number().int().min(0).optional(),
    retryAfterSeconds: z.number().int().optional(),
  })
  .strict()
  .brand('PasswordResetError');

// ==================== Type Exports ====================

export type VerificationToken = z.infer<typeof VerificationTokenSchema>;
export type UserId = z.infer<typeof UserIdSchema>;

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

// ==================== Helper Types ====================

export type ResetPasswordFormData = ResetPasswordRequest;
export type ForgotPasswordFormData = ForgotPasswordRequest;
export type ForgotPasswordPhoneFormData = ForgotPasswordPhoneRequest;
