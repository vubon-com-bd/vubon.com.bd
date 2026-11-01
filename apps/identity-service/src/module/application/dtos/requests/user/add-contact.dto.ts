/**
 * Add Contact Request DTO
 * @module identity-service/application/dtos/requests/user
 */
import type { z } from 'zod';
import type { AddContactRequestSchema } from '@vubon/shared-schemas/user';

export type AddContactRequestDTO = z.infer<typeof AddContactRequestSchema>;
