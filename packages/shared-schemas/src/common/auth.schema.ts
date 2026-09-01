import { z } from 'zod';
import { REGEX } from '@vubon/shared-constants';

/**
 * Login Schema
 * লগইন স্কিমা
 */
export const LoginSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(1, 'Password is required'),
});

/**
 * Register Schema
 * রেজিস্টার স্কিমা
 */
export const RegisterSchema = z
  .object({
    email: z.string().email('Invalid email format'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(REGEX.PASSWORD, 'Password must contain uppercase, lowercase and number'),
    confirmPassword: z.string(),
    name: z.string().min(2, 'Name must be at least 2 characters'),
    phone: z.string().regex(REGEX.PHONE, 'Invalid Bangladesh phone number'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

/**
 * Forgot Password Schema
 * পাসওয়ার্ড ভুলে গেছেন স্কিমা
 */
export const ForgotPasswordSchema = z.object({
  email: z.string().email('Invalid email format'),
});

/**
 * Reset Password Schema
 * পাসওয়ার্ড রিসেট স্কিমা
 */
export const ResetPasswordSchema = z
  .object({
    token: z.string().min(1, 'Token is required'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(REGEX.PASSWORD, 'Password must contain uppercase, lowercase and number'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

/**
 * Change Password Schema
 * পাসওয়ার্ড পরিবর্তন স্কিমা
 */
export const ChangePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, 'Current password is required'),
    newPassword: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(REGEX.PASSWORD, 'Password must contain uppercase, lowercase and number'),
    confirmNewPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Passwords don't match",
    path: ['confirmNewPassword'],
  });

/**
 * Refresh Token Schema
 * রিফ্রেশ টোকেন স্কিমা
 */
export const RefreshTokenSchema = z.object({
  refreshToken: z.string().min(1, 'Refresh token is required'),
});

/**
 * Verify Email Schema
 * ইমেইল ভেরিফাই স্কিমা
 */
export const VerifyEmailSchema = z.object({
  token: z.string().min(1, 'Verification token is required'),
});

/**
 * Resend Verification Schema
 * ভেরিফিকেশন পুনরায় পাঠান স্কিমা
 */
export const ResendVerificationSchema = z.object({
  email: z.string().email('Invalid email format'),
});

export type LoginSchemaType = z.infer<typeof LoginSchema>;
export type RegisterSchemaType = z.infer<typeof RegisterSchema>;
export type ForgotPasswordSchemaType = z.infer<typeof ForgotPasswordSchema>;
export type ResetPasswordSchemaType = z.infer<typeof ResetPasswordSchema>;
export type ChangePasswordSchemaType = z.infer<typeof ChangePasswordSchema>;
export type RefreshTokenSchemaType = z.infer<typeof RefreshTokenSchema>;
export type VerifyEmailSchemaType = z.infer<typeof VerifyEmailSchema>;
export type ResendVerificationSchemaType = z.infer<typeof ResendVerificationSchema>;
