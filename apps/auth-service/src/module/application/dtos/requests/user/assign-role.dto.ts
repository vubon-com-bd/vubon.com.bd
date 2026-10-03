/**
 * AssignRoleRequest DTO — inline
 * @module auth-service/application/dtos/requests/user
 */
import { z } from 'zod';
import { UuidSchema } from '@vubon/shared-schemas/common';
import { AuthRoleSchema } from '@vubon/shared-schemas/auth';

export const AssignRoleSchema = z
  .object({
    userId: UuidSchema,
    role: AuthRoleSchema,
    expiresAt: z.string().datetime().optional(),
    note: z.string().max(500).optional(),
  })
  .strict();

export type AssignRoleRequestDTO = z.infer<typeof AssignRoleSchema>;

export function validateAssignRoleRequest(
  input: unknown,
): AssignRoleRequestDTO {
  return AssignRoleSchema.parse(input);
}
