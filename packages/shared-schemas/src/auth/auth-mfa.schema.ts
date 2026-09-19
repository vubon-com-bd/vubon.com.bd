/**
 * Auth MFA Schema
 * @module shared-schemas/auth
 *
 * Values আসে shared-constants/auth/auth-mfa.constants থেকে।
 */

import { z } from 'zod';
import { AUTH_MFA, AUTH_MFA_METHOD } from '@vubon/shared-constants/auth';

export const MfaMethodSchema = z.enum(Object.values(AUTH_MFA_METHOD) as [string, ...string[]]);

export const MfaConfigSchema = z.object({
  userId: z.string().min(1),
  enabled: z.boolean(),
  primaryMethod: MfaMethodSchema,
  backupMethods: z.array(MfaMethodSchema).max(5),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const MfaSecretSchema = z.object({
  userId: z.string().min(1),
  secret: z.string().min(16).max(255),
  method: MfaMethodSchema,
  verified: z.boolean(),
  createdAt: z.string().datetime(),
  verifiedAt: z.string().datetime().optional(),
});

export const MfaSetupResultSchema = z.object({
  secret: z.string().min(16),
  qrCodeUrl: z.string().url(),
  otpauthUrl: z.string().url(),
  backupCodes: z
    .array(z.string().min(8).max(20))
    .length(
      AUTH_MFA.BACKUP_CODES_COUNT,
      `Exactly ${AUTH_MFA.BACKUP_CODES_COUNT} backup codes required`
    ),
});

export const MfaVerifyInputSchema = z.object({
  userId: z.string().min(1),
  code: z
    .string()
    .regex(
      new RegExp(`^\\d{${AUTH_MFA.OTP_LENGTH}}$`),
      `MFA code must be ${AUTH_MFA.OTP_LENGTH} digits`
    ),
  method: MfaMethodSchema,
});

export const MfaVerifyResultSchema = z.object({
  verified: z.boolean(),
  method: MfaMethodSchema,
  usedBackupCode: z.boolean(),
  remainingBackupCodes: z.number().int().nonnegative(),
  verifiedAt: z.string().datetime(),
});

export const MfaBackupCodeSchema = z.object({
  userId: z.string().min(1),
  code: z.string().min(8).max(20),
  used: z.boolean(),
  usedAt: z.string().datetime().optional(),
  createdAt: z.string().datetime(),
});

export const MfaChallengeSchema = z.object({
  challengeId: z.string().min(1),
  userId: z.string().min(1),
  method: MfaMethodSchema,
  createdAt: z.string().datetime(),
  expiresAt: z.string().datetime(),
  attempts: z.number().int().nonnegative(),
});

export type MfaMethodSchemaType = z.infer<typeof MfaMethodSchema>;
export type MfaConfigSchemaType = z.infer<typeof MfaConfigSchema>;
export type MfaSecretSchemaType = z.infer<typeof MfaSecretSchema>;
export type MfaSetupResultSchemaType = z.infer<typeof MfaSetupResultSchema>;
export type MfaVerifyInputSchemaType = z.infer<typeof MfaVerifyInputSchema>;
export type MfaVerifyResultSchemaType = z.infer<typeof MfaVerifyResultSchema>;
export type MfaBackupCodeSchemaType = z.infer<typeof MfaBackupCodeSchema>;
export type MfaChallengeSchemaType = z.infer<typeof MfaChallengeSchema>;
