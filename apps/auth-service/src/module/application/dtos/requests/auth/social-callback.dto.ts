/**
 * SocialCallbackRequest DTO — inline (no dedicated shared schema)
 * @module auth-service/application/dtos/requests/auth
 */
import { z } from 'zod';
import { AuthProviderSchema } from '@vubon/shared-schemas/auth';

export const SocialCallbackSchema = z
  .object({
    provider: AuthProviderSchema,
    code: z.string().min(1).max(4096),
    state: z.string().min(1).max(512),
    deviceId: z.string().max(128).optional(),
  })
  .strict();

export type SocialCallbackRequestDTO = z.infer<typeof SocialCallbackSchema>;

export function validateSocialCallbackRequest(
  input: unknown,
): SocialCallbackRequestDTO {
  return SocialCallbackSchema.parse(input);
}
