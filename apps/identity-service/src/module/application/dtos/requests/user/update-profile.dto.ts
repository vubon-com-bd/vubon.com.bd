/**
 * Update Profile Request DTO
 * @module identity-service/application/dtos/requests/user
 */
import type { z } from 'zod';
import type { UpdateProfileRequestSchema } from '@vubon/shared-schemas/user';

export type UpdateProfileRequestDTO = z.infer<typeof UpdateProfileRequestSchema>;
