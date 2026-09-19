/**
 * Logout Response Schema
 * @module shared-schemas/auth/responses
 */

import { z } from 'zod';

export const LogoutResponseSchema = z.object({
  success: z.literal(true),
  message: z.string(),
  loggedOutAt: z.string().datetime(),
  sessionsRevoked: z.number().int().nonnegative().optional(),
});

export type LogoutResponseSchemaType = z.infer<typeof LogoutResponseSchema>;
