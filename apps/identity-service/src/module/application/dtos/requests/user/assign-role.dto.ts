/**
 * Assign Role Request DTO
 * @module identity-service/application/dtos/requests/user
 */
import { z } from 'zod';
import { USER_ROLE } from '@vubon/shared-constants/user';

export const AssignRoleRequestSchema = z
  .object({
    userId: z.string().min(1).max(128),
    role: z.enum(Object.values(USER_ROLE) as [string, ...string[]]),
    expiresAt: z.string().datetime().optional(),
  })
  .strict();

export type AssignRoleRequestDTO = z.infer<typeof AssignRoleRequestSchema>;
