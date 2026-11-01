/**
 * Revoke Permission Request DTO
 * @module identity-service/application/dtos/requests/user
 */
import { z } from 'zod';

export const RevokePermissionRequestSchema = z
  .object({
    userId: z.string().min(1).max(128),
    permission: z.string().min(3).max(128),
    reason: z.string().max(500).optional(),
  })
  .strict();

export type RevokePermissionRequestDTO = z.infer<typeof RevokePermissionRequestSchema>;
