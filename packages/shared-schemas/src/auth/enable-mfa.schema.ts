/**
 * Enable MFA Request Schema
 * @module shared-schemas/auth/requests
 */

import { z } from 'zod';
import { MfaMethodSchema } from './auth-mfa.schema';

export const EnableMfaRequestSchema = z
  .object({
    method: MfaMethodSchema,
    code: z.string().regex(/^\d{6}$/, 'MFA code must be 6 digits'),
  })
  .strict();

export const DisableMfaRequestSchema = z
  .object({
    password: z.string().min(1, 'Password is required').max(128),
    code: z
      .string()
      .regex(/^\d{6}$/)
      .optional(),
  })
  .strict();

export const SetupMfaRequestSchema = z
  .object({
    method: MfaMethodSchema,
    phone: z.string().max(20).optional(),
  })
  .strict();

export type EnableMfaRequestSchemaType = z.infer<typeof EnableMfaRequestSchema>;
export type DisableMfaRequestSchemaType = z.infer<typeof DisableMfaRequestSchema>;
export type SetupMfaRequestSchemaType = z.infer<typeof SetupMfaRequestSchema>;
