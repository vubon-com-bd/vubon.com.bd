/**
 * RevokeRoleRequest DTO — inline
 * @module auth-service/application/dtos/requests/user
 */
import { z } from 'zod';
import { UuidSchema } from '@vubon/shared-schemas/common';
import { AuthRoleSchema } from '@vubon/shared-schemas/auth';

export const RevokeRoleSchema = z
  .object({
    userId: UuidSchema,
    role: AuthRoleSchema,
    note: z.string().max(500).optional(),
  })
  .strict();

export type RevokeRoleRequestDTO = z.infer<typeof RevokeRoleSchema>;

export function validateRevokeRoleRequest(
  input: unknown,
): RevokeRoleRequestDTO {
  return RevokeRoleSchema.parse(input);
}
