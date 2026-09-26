/**
 * DeactivateUserRequest DTO — inline
 * @module auth-service/application/dtos/requests/user
 */
import { z } from 'zod';
import { UuidSchema } from '@vubon/shared-schemas/common';

export const DeactivateUserSchema = z
  .object({
    userId: UuidSchema,
    reason: z.string().min(3).max(500),
    notifyUser: z.boolean().optional().default(true),
  })
  .strict();

export type DeactivateUserRequestDTO = z.infer<typeof DeactivateUserSchema>;

export function validateDeactivateUserRequest(
  input: unknown,
): DeactivateUserRequestDTO {
  return DeactivateUserSchema.parse(input);
}
