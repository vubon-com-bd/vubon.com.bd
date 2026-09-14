/**
 * Auth Verification Schema
 * @module shared-schemas/auth
 *
 * Values আসে shared-constants/auth/auth-verification.constants থেকে।
 */

import { z } from 'zod';
import { AUTH_VERIFICATION } from '@vubon/shared-constants/auth';
import { VERIFICATION_STATUS } from '@vubon/shared-constants/security';
import { UuidSchema } from '../common/primitives/uuid.schema';
import { EmailSchema } from '../common/primitives/email.schema';
import { PhoneSchema } from '../common/primitives/phone.schema';

export const AuthVerificationStatusSchema = z.enum(
  Object.values(VERIFICATION_STATUS) as [string, ...string[]]
);

export const AuthVerificationChannelSchema = z.enum(['email', 'sms', 'whatsapp', 'push']);

export const AuthVerificationPurposeSchema = z.enum([
  'email_verify',
  'phone_verify',
  'login',
  'password_reset',
]);

export const AuthVerificationDataSchema = z.object({
  id: z.string().min(1),
  userId: UuidSchema,
  status: AuthVerificationStatusSchema,
  target: z.union([EmailSchema, PhoneSchema]),
  channel: AuthVerificationChannelSchema,
  code: z
    .string()
    .regex(/^\d{4,8}$/)
    .optional(),
  token: z.string().min(1).max(255).optional(),
  attempts: z.number().int().nonnegative(),
  maxAttempts: z.number().int().positive(),
  resendCount: z.number().int().nonnegative(),
  createdAt: z.string().datetime(),
  expiresAt: z.string().datetime(),
  verifiedAt: z.string().datetime().optional(),
});

export const AuthVerificationRequestSchema = z.object({
  userId: UuidSchema,
  target: z.union([EmailSchema, PhoneSchema]),
  channel: AuthVerificationChannelSchema,
  purpose: AuthVerificationPurposeSchema,
});

export const AuthVerificationResultSchema = z.object({
  verified: z.boolean(),
  status: AuthVerificationStatusSchema,
  userId: UuidSchema.optional(),
  message: z.string().optional(),
  verifiedAt: z.string().datetime().optional(),
});

export const AuthVerifyInputSchema = z.object({
  userId: UuidSchema,
  code: z
    .string()
    .regex(/^\d{4,8}$/)
    .optional(),
  token: z.string().min(1).max(255).optional(),
});

export const AuthOtpLengthSchema = z
  .number()
  .int()
  .min(4)
  .max(8)
  .default(AUTH_VERIFICATION.OTP_LENGTH);

export type AuthVerificationDataSchemaType = z.infer<typeof AuthVerificationDataSchema>;
export type AuthVerificationRequestSchemaType = z.infer<typeof AuthVerificationRequestSchema>;
export type AuthVerificationResultSchemaType = z.infer<typeof AuthVerificationResultSchema>;
export type AuthVerifyInputSchemaType = z.infer<typeof AuthVerifyInputSchema>;
