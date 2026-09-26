/**
 * Login Response Schema
 * @module shared-schemas/auth/responses
 */

import { z } from 'zod';
import { UuidSchema } from '../common/primitives/uuid.schema';
import { AuthPublicSchema } from './auth.schema';
import { AuthSessionPublicSchema } from './auth-session.schema';

export const LoginResponseSchema = z.object({
  success: z.literal(true),
  user: AuthPublicSchema,
  session: AuthSessionPublicSchema,
  accessToken: z.string().min(1),
  refreshToken: z.string().min(1),
  expiresAt: z.number().int().positive(),
  tokenType: z.literal('Bearer').default('Bearer'),
  requiresMfa: z.boolean().optional(),
  requiresVerification: z.boolean().optional(),
  challengeId: UuidSchema.optional(),
});

export const LoginMfaRequiredResponseSchema = z.object({
  success: z.literal(true),
  requiresMfa: z.literal(true),
  challengeId: UuidSchema,
  mfaMethods: z.array(z.string()).min(1),
  expiresAt: z.string().datetime(),
});

export type LoginResponseSchemaType = z.infer<typeof LoginResponseSchema>;
export type LoginMfaRequiredResponseSchemaType = z.infer<typeof LoginMfaRequiredResponseSchema>;
