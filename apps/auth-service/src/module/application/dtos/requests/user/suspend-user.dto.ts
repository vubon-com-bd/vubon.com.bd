/**
 * SuspendUserRequest DTO — inline
 * @module auth-service/application/dtos/requests/user
 */
import { z } from 'zod';
import { UuidSchema } from '@vubon/shared-schemas/common';

export const SuspendUserSchema = z
  .object({
    userId: UuidSchema,
    reason: z.string().min(3).max(500),
    until: z.string().datetime().optional(),
    notifyUser: z.boolean().optional().default(true),
  })
  .strict();

export type SuspendUserRequestDTO = z.infer<typeof SuspendUserSchema>;

export function validateSuspendUserRequest(
  input: unknown,
): SuspendUserRequestDTO {
  return SuspendUserSchema.parse(input);
}
