/**
 * Unlock Account Request DTO
 * @module identity-service/application/dtos/requests/auth
 */
import { z } from 'zod';

export const UnlockAccountRequestSchema = z
  .object({
    userId: z.string().min(1).max(128),
  })
  .strict();

export type UnlockAccountRequestDTO = z.infer<typeof UnlockAccountRequestSchema>;
