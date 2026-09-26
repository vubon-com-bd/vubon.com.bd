/**
 * RevokePermissionRequest DTO — inline
 * @module auth-service/application/dtos/requests/user
 */
import { z } from 'zod';
import { UuidSchema } from '@vubon/shared-schemas/common';

export const RevokePermissionSchema = z
  .object({
    roleId: UuidSchema,
    permission: z.string().min(1).max(128),
    note: z.string().max(500).optional(),
  })
  .strict();

export type RevokePermissionRequestDTO = z.infer<typeof RevokePermissionSchema>;

export function validateRevokePermissionRequest(
  input: unknown,
): RevokePermissionRequestDTO {
  return RevokePermissionSchema.parse(input);
}
