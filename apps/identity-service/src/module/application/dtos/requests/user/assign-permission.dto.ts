/**
 * Assign Permission Request DTO
 * @module identity-service/application/dtos/requests/user
 */
import { z } from 'zod';

export const AssignPermissionRequestSchema = z
  .object({
    userId: z.string().min(1).max(128),
    permission: z.string().min(3).max(128).regex(/^[a-z_]+:[a-z_]+$|^\*$/),
    expiresAt: z.string().datetime().optional(),
    reason: z.string().max(500).optional(),
  })
  .strict();

export type AssignPermissionRequestDTO = z.infer<typeof AssignPermissionRequestSchema>;
