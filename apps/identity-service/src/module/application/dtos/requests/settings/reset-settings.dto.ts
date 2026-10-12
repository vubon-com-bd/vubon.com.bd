/**
 * Reset Settings Request DTO
 * @module identity-service/application/dtos/requests/settings
 */
import { z } from 'zod';

export const ResetSettingsRequestSchema = z
  .object({
    keys: z.array(z.string().min(1).max(64)).optional(),
  })
  .strict();

export type ResetSettingsRequestDTO = z.infer<typeof ResetSettingsRequestSchema>;
