/**
 * UnlockAccountRequest DTO — inline
 * @module auth-service/application/dtos/requests/auth
 */
import { z } from 'zod';
import { UuidSchema } from '@vubon/shared-schemas/common';

export const UnlockAccountSchema = z
  .object({
    userId: UuidSchema,
    note: z.string().max(500).optional(),
  })
  .strict();

export type UnlockAccountRequestDTO = z.infer<typeof UnlockAccountSchema>;

export function validateUnlockAccountRequest(
  input: unknown,
): UnlockAccountRequestDTO {
  return UnlockAccountSchema.parse(input);
}
