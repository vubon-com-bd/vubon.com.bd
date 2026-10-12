/**
 * Update Visibility Request DTO
 * @module identity-service/application/dtos/requests/profile
 */
import { z } from 'zod';
import { USER_PROFILE_VISIBILITY } from '@vubon/shared-constants/user';

export const UpdateVisibilityRequestSchema = z
  .object({
    visibility: z.enum(
      Object.values(USER_PROFILE_VISIBILITY) as [string, ...string[]],
    ),
  })
  .strict();

export type UpdateVisibilityRequestDTO = z.infer<typeof UpdateVisibilityRequestSchema>;
