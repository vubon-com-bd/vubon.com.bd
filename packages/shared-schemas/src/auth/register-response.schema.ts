/**
 * Register Response Schema
 * @module shared-schemas/auth/responses
 */

import { z } from 'zod';
import { AuthPublicSchema } from './auth.schema';
import { AuthSessionPublicSchema } from './auth-session.schema';

export const RegisterResponseSchema = z.object({
  success: z.literal(true),
  user: AuthPublicSchema,
  session: AuthSessionPublicSchema.optional(),
  accessToken: z.string().min(1).optional(),
  refreshToken: z.string().min(1).optional(),
  expiresAt: z.number().int().positive().optional(),
  requiresVerification: z.boolean(),
  verificationChannel: z.enum(['email', 'phone', 'both']).optional(),
  message: z.string(),
});

export type RegisterResponseSchemaType = z.infer<typeof RegisterResponseSchema>;
