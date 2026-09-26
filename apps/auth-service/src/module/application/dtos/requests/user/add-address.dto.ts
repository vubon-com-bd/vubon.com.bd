/**
 * AddAddressRequest DTO
 * @module auth-service/application/dtos/requests/user
 */
import {
  AddAddressRequestSchema,
  type AddAddressRequestSchemaType,
} from '@vubon/shared-schemas/user';

export type AddAddressRequestDTO = AddAddressRequestSchemaType;

export function validateAddAddressRequest(
  input: unknown,
): AddAddressRequestDTO {
  return AddAddressRequestSchema.parse(input);
}
