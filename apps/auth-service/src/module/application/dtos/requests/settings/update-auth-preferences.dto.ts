/**
 * UpdateAuthPreferencesRequest DTO — inline
 * @module auth-service/application/dtos/requests/settings
 */
import { z } from 'zod';

export const UpdateAuthPreferencesSchema = z
  .object({
    theme: z.enum(['light', 'dark', 'system']).optional(),
    currency: z.string().length(3).optional(),
    dateFormat: z.string().min(3).max(32).optional(),
    reduceMotion: z.boolean().optional(),
    language: z.string().min(2).max(10).optional(),
    timezone: z.string().min(1).max(64).optional(),
  })
  .strict();

export type UpdateAuthPreferencesRequestDTO = z.infer<
  typeof UpdateAuthPreferencesSchema
>;

export function validateUpdateAuthPreferencesRequest(
  input: unknown,
): UpdateAuthPreferencesRequestDTO {
  return UpdateAuthPreferencesSchema.parse(input);
}
