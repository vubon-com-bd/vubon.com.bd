/**
 * UpdateAuthSettingsRequest DTO — inline
 * @module auth-service/application/dtos/requests/settings
 */
import { z } from 'zod';

export const UpdateAuthSettingsSchema = z
  .object({
    sessionTimeoutMinutes: z.number().int().min(5).max(60 * 24 * 30).optional(),
    maxConcurrentSessions: z.number().int().min(1).max(50).optional(),
    mfaRequired: z.boolean().optional(),
    allowedProviders: z
      .array(z.string().min(1).max(64))
      .max(20)
      .optional(),
  })
  .strict();

export type UpdateAuthSettingsRequestDTO = z.infer<
  typeof UpdateAuthSettingsSchema
>;

export function validateUpdateAuthSettingsRequest(
  input: unknown,
): UpdateAuthSettingsRequestDTO {
  return UpdateAuthSettingsSchema.parse(input);
}
