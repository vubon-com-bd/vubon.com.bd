/**
 * DeleteUserRequest DTO — inline
 * @module auth-service/application/dtos/requests/user
 */
import { z } from 'zod';

export const DeleteUserSchema = z
  .object({
    reason: z.string().max(500).optional(),
    hardDelete: z.boolean().optional().default(false),
    password: z.string().min(1).max(128).optional(),
  })
  .strict();

export type DeleteUserRequestDTO = z.infer<typeof DeleteUserSchema>;

export function validateDeleteUserRequest(
  input: unknown,
): DeleteUserRequestDTO {
  return DeleteUserSchema.parse(input);
}
