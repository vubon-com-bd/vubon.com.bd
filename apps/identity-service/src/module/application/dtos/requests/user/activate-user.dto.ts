/**
 * Activate User Request DTO
 * @module identity-service/application/dtos/requests/user
 */
import { z } from 'zod';

export const ActivateUserRequestSchema = z
  .object({
    userId: z.string().min(1).max(128),
    reason: z.string().max(500).optional(),
  })
  .strict();

export type ActivateUserRequestDTO = z.infer<typeof ActivateUserRequestSchema>;
