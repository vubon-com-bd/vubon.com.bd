/**
 * Delete Contact Request DTO
 * @module identity-service/application/dtos/requests/user
 */
import { z } from 'zod';

export const DeleteContactRequestSchema = z
  .object({
    contactId: z.string().uuid(),
  })
  .strict();

export type DeleteContactRequestDTO = z.infer<typeof DeleteContactRequestSchema>;
