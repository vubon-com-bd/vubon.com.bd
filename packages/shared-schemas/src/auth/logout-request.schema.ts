/**
 * Logout Request Schema
 * @module shared-schemas/auth/requests
 */

import { z } from 'zod';
import { UuidSchema } from '../common/primitives/uuid.schema';

export const LogoutRequestSchema = z
  .object({
    sessionId: UuidSchema.optional(),
    allDevices: z.boolean().optional().default(false),
    refreshToken: z.string().max(2000).optional(),
  })
  .strict();

export type LogoutRequestSchemaType = z.infer<typeof LogoutRequestSchema>;
