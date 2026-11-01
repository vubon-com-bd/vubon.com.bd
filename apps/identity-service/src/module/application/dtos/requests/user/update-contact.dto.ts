/**
 * Update Contact Request DTO
 * @module identity-service/application/dtos/requests/user
 */
import { z } from 'zod';
import { AddContactRequestSchema } from '@vubon/shared-schemas/user';

export const UpdateContactRequestSchema = AddContactRequestSchema.partial().extend({
  contactId: z.string().uuid(),
});

export type UpdateContactRequestDTO = z.infer<typeof UpdateContactRequestSchema>;
