/**
 * Create User Request DTO
 * @module identity-service/application/dtos/requests/user
 */
import type { z } from 'zod';
import type { CreateUserRequestSchema } from '@vubon/shared-schemas/user';

export type CreateUserRequestDTO = z.infer<typeof CreateUserRequestSchema>;
