/**
 * Update User Request DTO
 * @module identity-service/application/dtos/requests/user
 */
import type { z } from 'zod';
import type { UpdateUserRequestSchema } from '@vubon/shared-schemas/user';

export type UpdateUserRequestDTO = z.infer<typeof UpdateUserRequestSchema>;
