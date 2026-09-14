/**
 * Session Response Schema
 * @module shared-schemas/auth/responses
 */

import { z } from 'zod';
import { AuthSessionPublicSchema } from './auth-session.schema';

export const SessionListResponseSchema = z.object({
  success: z.literal(true),
  sessions: z.array(AuthSessionPublicSchema).max(50),
  total: z.number().int().nonnegative(),
});

export const SessionRevokeResponseSchema = z.object({
  success: z.literal(true),
  revokedCount: z.number().int().nonnegative(),
  revokedAt: z.string().datetime(),
});

export const CurrentSessionResponseSchema = z.object({
  success: z.literal(true),
  session: AuthSessionPublicSchema,
});

export type SessionListResponseSchemaType = z.infer<typeof SessionListResponseSchema>;
export type SessionRevokeResponseSchemaType = z.infer<typeof SessionRevokeResponseSchema>;
export type CurrentSessionResponseSchemaType = z.infer<typeof CurrentSessionResponseSchema>;
