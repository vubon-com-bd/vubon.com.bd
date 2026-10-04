/**
 * VerifyUserEmailRequest DTO — admin-initiated
 * @module auth-service/application/dtos/requests/user
 */
import { z } from 'zod';
import { UuidSchema } from '@vubon/shared-schemas/common';

export const VerifyUserEmailSchema = z
  .object({
    userId: UuidSchema,
    note: z.string().max(500).optional(),
  })
  .strict();

export type VerifyUserEmailRequestDTO = z.infer<typeof VerifyUserEmailSchema>;

export function validateVerifyUserEmailRequest(
  input: unknown,
): VerifyUserEmailRequestDTO {
  return VerifyUserEmailSchema.parse(input);
}
