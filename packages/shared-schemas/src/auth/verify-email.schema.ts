/**
 * Verify Email Request Schema
 * @module shared-schemas/auth/requests
 */

import { z } from 'zod';
import { EmailSchema } from '../common/primitives/email.schema';

export const VerifyEmailRequestSchema = z
  .object({
    email: EmailSchema,
    token: z.string().min(1).max(500),
  })
  .strict();

export const ResendVerifyEmailRequestSchema = z
  .object({
    email: EmailSchema,
  })
  .strict();

export type VerifyEmailRequestSchemaType = z.infer<typeof VerifyEmailRequestSchema>;
export type ResendVerifyEmailRequestSchemaType = z.infer<typeof ResendVerifyEmailRequestSchema>;
