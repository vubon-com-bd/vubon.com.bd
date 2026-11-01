/**
 * Revoke Role Request DTO
 * @module identity-service/application/dtos/requests/user
 */
import { z } from 'zod';
import { USER_ROLE } from '@vubon/shared-constants/user';

export const RevokeRoleRequestSchema = z
  .object({
    userId: z.string().min(1).max(128),
    role: z.enum(Object.values(USER_ROLE) as [string, ...string[]]),
    reason: z.string().max(500).optional(),
  })
  .strict();

export type RevokeRoleRequestDTO = z.infer<typeof RevokeRoleRequestSchema>;
