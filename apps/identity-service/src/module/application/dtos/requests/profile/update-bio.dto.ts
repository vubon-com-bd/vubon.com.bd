/**
 * Update Bio Request DTO
 * @module identity-service/application/dtos/requests/profile
 */
import { z } from 'zod';
import { USER_PROFILE } from '@vubon/shared-constants/user';

export const UpdateBioRequestSchema = z
  .object({
    bio: z.string().trim().max(USER_PROFILE.BIO_MAX_LENGTH),
  })
  .strict();

export type UpdateBioRequestDTO = z.infer<typeof UpdateBioRequestSchema>;
