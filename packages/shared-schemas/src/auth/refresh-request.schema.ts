/**
 * Refresh Token Request Schema
 * @module shared-schemas/auth/requests
 */

import { z } from 'zod';

export const RefreshTokenRequestSchema = z
  .object({
    refreshToken: z.string().min(1, 'Refresh token is required').max(2000),
    deviceId: z.string().max(128).optional(),
  })
  .strict();

export type RefreshTokenRequestSchemaType = z.infer<typeof RefreshTokenRequestSchema>;
