/**
 * Social Login Request Schema
 * @module shared-schemas/auth/requests
 */

import { z } from 'zod';
import { SocialProviderSchema } from './auth-social.schema';

export const SocialLoginRequestSchema = z
  .object({
    provider: SocialProviderSchema,
    code: z.string().min(1, 'Authorization code is required').max(2000),
    redirectUri: z.string().url(),
    state: z.string().max(255).optional(),
    deviceId: z.string().max(128).optional(),
  })
  .strict();

export type SocialLoginRequestSchemaType = z.infer<typeof SocialLoginRequestSchema>;
