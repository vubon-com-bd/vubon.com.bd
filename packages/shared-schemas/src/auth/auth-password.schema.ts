/**
 * Auth Password Schema
 * @module shared-schemas/auth
 *
 * Values আসে shared-constants/auth/auth-password.constants থেকে।
 */

import { z } from 'zod';
import { AUTH_PASSWORD } from '@vubon/shared-constants/auth';
import { REGEX } from '@vubon/shared-constants/common';

export const AuthPasswordSchema = z
  .string()
  .min(AUTH_PASSWORD.MIN_LENGTH, `Password must be at least ${AUTH_PASSWORD.MIN_LENGTH} characters`)
  .max(AUTH_PASSWORD.MAX_LENGTH, `Password must be at most ${AUTH_PASSWORD.MAX_LENGTH} characters`)
  .regex(
    REGEX.PASSWORD_STRONG,
    'Password must contain uppercase, lowercase, number, and special character'
  );

export const AuthPasswordPolicySchema = z.object({
  minLength: z.number().int().min(8).max(128),
  maxLength: z.number().int().min(8).max(256),
  requireUppercase: z.boolean(),
  requireLowercase: z.boolean(),
  requireNumber: z.boolean(),
  requireSymbol: z.boolean(),
  historyCount: z.number().int().nonnegative().max(50),
  expiryDays: z.number().int().nonnegative().max(3650),
  bcryptRounds: z
    .number()
    .int()
    .min(10)
    .max(AUTH_PASSWORD.BCRYPT_ROUNDS + 3),
});

export const PasswordChangeInputSchema = z
  .object({
    currentPassword: z.string().min(1, 'Current password is required'),
    newPassword: AuthPasswordSchema,
  })
  .refine((data) => data.currentPassword !== data.newPassword, {
    message: 'New password must be different from current password',
    path: ['newPassword'],
  });

export const PasswordResetInputSchema = z.object({
  token: z.string().min(1, 'Token is required'),
  newPassword: AuthPasswordSchema,
});

export const PasswordStrengthResultSchema = z.object({
  score: z.number().int().min(0).max(100),
  strength: z.enum(['weak', 'fair', 'good', 'strong', 'very_strong']),
  feedback: z.array(z.string()).max(20),
  isValid: z.boolean(),
});

export const PasswordHistoryEntrySchema = z.object({
  userId: z.string().min(1),
  hash: z.string().min(20).max(255),
  changedAt: z.string().datetime(),
  changedBy: z.string().optional(),
});

export type AuthPasswordSchemaType = z.infer<typeof AuthPasswordSchema>;
export type AuthPasswordPolicySchemaType = z.infer<typeof AuthPasswordPolicySchema>;
export type PasswordChangeInputSchemaType = z.infer<typeof PasswordChangeInputSchema>;
export type PasswordResetInputSchemaType = z.infer<typeof PasswordResetInputSchema>;
export type PasswordStrengthResultSchemaType = z.infer<typeof PasswordStrengthResultSchema>;
export type PasswordHistoryEntrySchemaType = z.infer<typeof PasswordHistoryEntrySchema>;
