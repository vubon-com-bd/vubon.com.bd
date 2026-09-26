/**
 * AddContactRequest DTO
 * @module auth-service/application/dtos/requests/user
 */
import {
  AddContactRequestSchema,
  type AddContactRequestSchemaType,
} from '@vubon/shared-schemas/user';

export type AddContactRequestDTO = AddContactRequestSchemaType;

export function validateAddContactRequest(
  input: unknown,
): AddContactRequestDTO {
  return AddContactRequestSchema.parse(input);
}
