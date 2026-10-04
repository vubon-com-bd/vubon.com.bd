/**
 * ActivateUserRequest DTO — inline
 * @module auth-service/application/dtos/requests/user
 */
import { z } from 'zod';
import { UuidSchema } from '@vubon/shared-schemas/common';

export const ActivateUserSchema = z
  .object({
    userId: UuidSchema,
    note: z.string().max(500).optional(),
    notifyUser: z.boolean().optional().default(true),
  })
  .strict();

export type ActivateUserRequestDTO = z.infer<typeof ActivateUserSchema>;

export function validateActivateUserRequest(
  input: unknown,
): ActivateUserRequestDTO {
  return ActivateUserSchema.parse(input);
}
