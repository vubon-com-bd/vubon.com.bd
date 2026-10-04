/**
 * VerifyKycRequest DTO — inline
 * @module auth-service/application/dtos/requests/user
 */
import { z } from 'zod';
import { UuidSchema } from '@vubon/shared-schemas/common';

export const VerifyKycSchema = z
  .object({
    userId: UuidSchema,
    note: z.string().max(500).optional(),
  })
  .strict();

export type VerifyKycRequestDTO = z.infer<typeof VerifyKycSchema>;

export function validateVerifyKycRequest(
  input: unknown,
): VerifyKycRequestDTO {
  return VerifyKycSchema.parse(input);
}
