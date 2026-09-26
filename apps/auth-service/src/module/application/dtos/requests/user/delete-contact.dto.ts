/**
 * DeleteContactRequest DTO — inline
 * @module auth-service/application/dtos/requests/user
 */
import { z } from 'zod';
import { UuidSchema } from '@vubon/shared-schemas/common';

export const DeleteContactSchema = z
  .object({
    contactId: UuidSchema,
  })
  .strict();

export type DeleteContactRequestDTO = z.infer<typeof DeleteContactSchema>;

export function validateDeleteContactRequest(
  input: unknown,
): DeleteContactRequestDTO {
  return DeleteContactSchema.parse(input);
}
