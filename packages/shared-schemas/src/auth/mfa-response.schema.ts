/**
 * MFA Response Schema
 * @module shared-schemas/auth/responses
 */

import { z } from 'zod';
import { UuidSchema } from '../common/primitives/uuid.schema';
import { MfaMethodSchema } from './auth-mfa.schema';

export const MfaSetupResponseSchema = z.object({
  success: z.literal(true),
  method: MfaMethodSchema,
  secret: z.string().min(16).max(255),
  qrCodeUrl: z.string().url(),
  otpauthUrl: z.string().url(),
  backupCodes: z.array(z.string().min(8).max(20)).min(5).max(20),
  setupAt: z.string().datetime(),
});

export const MfaVerifyResponseSchema = z.object({
  success: z.literal(true),
  verified: z.literal(true),
  method: MfaMethodSchema,
  usedBackupCode: z.boolean(),
  remainingBackupCodes: z.number().int().nonnegative(),
  verifiedAt: z.string().datetime(),
});

export const MfaDisableResponseSchema = z.object({
  success: z.literal(true),
  mfaEnabled: z.literal(false),
  disabledAt: z.string().datetime(),
});

export const MfaChallengeResponseSchema = z.object({
  challengeId: UuidSchema,
  methods: z.array(MfaMethodSchema).min(1),
  expiresAt: z.string().datetime(),
  attemptLimit: z.number().int().positive(),
});

export type MfaSetupResponseSchemaType = z.infer<typeof MfaSetupResponseSchema>;
export type MfaVerifyResponseSchemaType = z.infer<typeof MfaVerifyResponseSchema>;
export type MfaDisableResponseSchemaType = z.infer<typeof MfaDisableResponseSchema>;
export type MfaChallengeResponseSchemaType = z.infer<typeof MfaChallengeResponseSchema>;
