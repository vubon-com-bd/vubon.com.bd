/**
 * Unsuspend User Request DTO
 * @module identity-service/application/dtos/requests/user
 */
import { z } from 'zod';

export const UnsuspendUserRequestSchema = z
  .object({
    userId: z.string().min(1).max(128),
  })
  .strict();

export type UnsuspendUserRequestDTO = z.infer<typeof UnsuspendUserRequestSchema>;
