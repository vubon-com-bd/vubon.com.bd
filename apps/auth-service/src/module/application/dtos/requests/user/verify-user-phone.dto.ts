/**
 * VerifyUserPhoneRequest DTO — admin-initiated
 * @module auth-service/application/dtos/requests/user
 */
import { z } from 'zod';
import { UuidSchema } from '@vubon/shared-schemas/common';

export const VerifyUserPhoneSchema = z
  .object({
    userId: UuidSchema,
    note: z.string().max(500).optional(),
  })
  .strict();

export type VerifyUserPhoneRequestDTO = z.infer<typeof VerifyUserPhoneSchema>;

export function validateVerifyUserPhoneRequest(
  input: unknown,
): VerifyUserPhoneRequestDTO {
  return VerifyUserPhoneSchema.parse(input);
}
