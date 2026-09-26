/**
 * UnsuspendUserRequest DTO — inline
 * @module auth-service/application/dtos/requests/user
 */
import { z } from 'zod';
import { UuidSchema } from '@vubon/shared-schemas/common';

export const UnsuspendUserSchema = z
  .object({
    userId: UuidSchema,
    note: z.string().max(500).optional(),
  })
  .strict();

export type UnsuspendUserRequestDTO = z.infer<typeof UnsuspendUserSchema>;

export function validateUnsuspendUserRequest(
  input: unknown,
): UnsuspendUserRequestDTO {
  return UnsuspendUserSchema.parse(input);
}
