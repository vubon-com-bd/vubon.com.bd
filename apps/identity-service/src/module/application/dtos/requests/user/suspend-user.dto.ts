/**
 * Suspend User Request DTO
 * @module identity-service/application/dtos/requests/user
 */
import { z } from 'zod';

export const SuspendUserRequestSchema = z
  .object({
    userId: z.string().min(1).max(128),
    reason: z.string().min(5).max(500),
    durationSeconds: z.number().int().min(60).max(365 * 24 * 3600).optional(),
  })
  .strict();

export type SuspendUserRequestDTO = z.infer<typeof SuspendUserRequestSchema>;
