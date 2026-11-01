/**
 * Update Avatar Request DTO
 * @module identity-service/application/dtos/requests/profile
 */
import { z } from 'zod';

export const UpdateAvatarRequestSchema = z
  .object({
    avatarUrl: z.string().url().max(2048),
  })
  .strict();

export type UpdateAvatarRequestDTO = z.infer<typeof UpdateAvatarRequestSchema>;
