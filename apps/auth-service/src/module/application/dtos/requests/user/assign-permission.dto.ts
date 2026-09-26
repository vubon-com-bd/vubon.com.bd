/**
 * AssignPermissionRequest DTO — inline
 * @module auth-service/application/dtos/requests/user
 */
import { z } from 'zod';
import { UuidSchema } from '@vubon/shared-schemas/common';

export const AssignPermissionSchema = z
  .object({
    roleId: UuidSchema,
    permission: z.string().min(1).max(128),
    note: z.string().max(500).optional(),
  })
  .strict();

export type AssignPermissionRequestDTO = z.infer<typeof AssignPermissionSchema>;

export function validateAssignPermissionRequest(
  input: unknown,
): AssignPermissionRequestDTO {
  return AssignPermissionSchema.parse(input);
}
