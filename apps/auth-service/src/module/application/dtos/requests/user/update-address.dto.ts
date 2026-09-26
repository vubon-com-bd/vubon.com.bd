/**
 * UpdateAddressRequest DTO
 * @module auth-service/application/dtos/requests/user
 */
import {
  UpdateAddressRequestSchema,
  type UpdateAddressRequestSchemaType,
} from '@vubon/shared-schemas/user';

export type UpdateAddressRequestDTO = UpdateAddressRequestSchemaType;

export function validateUpdateAddressRequest(
  input: unknown,
): UpdateAddressRequestDTO {
  return UpdateAddressRequestSchema.parse(input);
}
