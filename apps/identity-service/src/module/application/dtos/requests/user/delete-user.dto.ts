/**
 * Delete User Request DTO
 * @module identity-service/application/dtos/requests/user
 */
import { z } from 'zod';

export const DeleteUserRequestSchema = z
  .object({
    userId: z.string().min(1).max(128),
    reason: z.string().max(500).optional(),
    hardDelete: z.boolean().optional().default(false),
  })
  .strict();

export type DeleteUserRequestDTO = z.infer<typeof DeleteUserRequestSchema>;
