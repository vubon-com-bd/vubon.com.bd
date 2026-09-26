/**
 * Verify MFA Request Schema
 * @module shared-schemas/auth/requests
 */

import { z } from 'zod';
import { MfaMethodSchema } from './auth-mfa.schema';
import { UuidSchema } from '../common/primitives/uuid.schema';

export const VerifyMfaRequestSchema = z
  .object({
    challengeId: UuidSchema,
    code: z.string().regex(/^\d{6}$/, 'MFA code must be 6 digits'),
    method: MfaMethodSchema,
    rememberDevice: z.boolean().optional().default(false),
  })
  .strict();

export const VerifyBackupCodeRequestSchema = z
  .object({
    challengeId: UuidSchema,
    backupCode: z.string().min(8).max(20),
  })
  .strict();

export type VerifyMfaRequestSchemaType = z.infer<typeof VerifyMfaRequestSchema>;
export type VerifyBackupCodeRequestSchemaType = z.infer<typeof VerifyBackupCodeRequestSchema>;
