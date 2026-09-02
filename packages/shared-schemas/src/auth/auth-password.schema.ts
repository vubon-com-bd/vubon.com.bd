/**
 * Auth Password Schema
 * প্রমাণীকরণ পাসওয়ার্ড সম্পর্কিত স্কিমা
 */

import { z } from 'zod';
import { REGEX } from '@vubon/shared-constants';

export const AuthPasswordSchema = z.object({
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(32, 'Password must be less than 32 characters')
    .regex(REGEX.PASSWORD, 'Password must contain uppercase, lowercase and number'),
});

export const AuthPasswordPolicySchema = z.object({
  minLength: z.number().int().min(4).max(64).default(8),
  maxLength: z.number().int().min(8).max(128).default(32),
  requireUppercase: z.boolean().default(true),
  requireLowercase: z.boolean().default(true),
  requireNumber: z.boolean().default(true),
  requireSpecialChar: z.boolean().default(true),
  allowWhitespace: z.boolean().default(false),
  disallowCommon: z.boolean().default(true),
  disallowRepeated: z.boolean().default(true),
  disallowSequential: z.boolean().default(true),
  disallowPersonalInfo: z.boolean().default(true),
  historyCount: z.number().int().min(0).max(10).default(5),
  maxAge: z.number().int().min(1).max(365).default(90),
  minAge: z.number().int().min(0).max(7).default(1),
});

export const AuthPasswordResetSchema = z
  .object({
    token: z.string().min(1, 'Token is required'),
    newPassword: AuthPasswordSchema.shape.password,
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export type AuthPasswordSchemaType = z.infer<typeof AuthPasswordSchema>;
export type AuthPasswordPolicySchemaType = z.infer<typeof AuthPasswordPolicySchema>;
export type AuthPasswordResetSchemaType = z.infer<typeof AuthPasswordResetSchema>;
