/**
 * Reset Preferences Request DTO
 * @module identity-service/application/dtos/requests/preferences
 */
import { z } from 'zod';

export const ResetPreferencesRequestSchema = z
  .object({
    scope: z.enum(['all', 'marketing', 'promotions']).default('marketing'),
  })
  .strict();

export type ResetPreferencesRequestDTO = z.infer<typeof ResetPreferencesRequestSchema>;
