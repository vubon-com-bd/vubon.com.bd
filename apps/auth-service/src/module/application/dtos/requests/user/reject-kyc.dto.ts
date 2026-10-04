/**
 * RejectKycRequest DTO — inline
 * @module auth-service/application/dtos/requests/user
 */
import { z } from 'zod';
import { UuidSchema } from '@vubon/shared-schemas/common';

export const RejectKycSchema = z
  .object({
    userId: UuidSchema,
    reason: z.string().min(3).max(500),
  })
  .strict();

export type RejectKycRequestDTO = z.infer<typeof RejectKycSchema>;

export function validateRejectKycRequest(
  input: unknown,
): RejectKycRequestDTO {
  return RejectKycSchema.parse(input);
}
