/**
 * SsoCallbackRequest DTO — inline (no dedicated shared schema)
 * @module auth-service/application/dtos/requests/auth
 */
import { z } from 'zod';
import { SsoProviderSchema } from '@vubon/shared-schemas/auth';

export const SsoCallbackSchema = z
  .object({
    provider: SsoProviderSchema,
    tenantId: z.string().min(1).max(255),
    samlResponse: z.string().min(8).max(8192).optional(),
    code: z.string().min(1).max(4096).optional(),
    state: z.string().min(1).max(512).optional(),
  })
  .strict()
  .refine((d) => d.samlResponse !== undefined || d.code !== undefined, {
    message: 'Either samlResponse or code is required',
  });

export type SsoCallbackRequestDTO = z.infer<typeof SsoCallbackSchema>;

export function validateSsoCallbackRequest(
  input: unknown,
): SsoCallbackRequestDTO {
  return SsoCallbackSchema.parse(input);
}
