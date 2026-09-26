/**
 * UpdateContactRequest DTO — inline
 * @module auth-service/application/dtos/requests/user
 */
import { z } from 'zod';
import { UuidSchema } from '@vubon/shared-schemas/common';
import {
  OptionalEmailSchema,
  OptionalPhoneSchema,
} from '@vubon/shared-schemas/common';

export const UpdateContactSchema = z
  .object({
    contactId: UuidSchema,
    email: OptionalEmailSchema,
    phone: OptionalPhoneSchema,
    primary: z.boolean().optional(),
  })
  .strict();

export type UpdateContactRequestDTO = z.infer<typeof UpdateContactSchema>;

export function validateUpdateContactRequest(
  input: unknown,
): UpdateContactRequestDTO {
  return UpdateContactSchema.parse(input);
}
