/**
 * Refresh Token Response Schema
 * @module shared-schemas/auth/responses
 */

import { z } from 'zod';

export const RefreshTokenResponseSchema = z.object({
  success: z.literal(true),
  accessToken: z.string().min(1),
  refreshToken: z.string().min(1),
  expiresAt: z.number().int().positive(),
  tokenType: z.literal('Bearer').default('Bearer'),
  refreshedAt: z.string().datetime(),
});

export type RefreshTokenResponseSchemaType = z.infer<typeof RefreshTokenResponseSchema>;
