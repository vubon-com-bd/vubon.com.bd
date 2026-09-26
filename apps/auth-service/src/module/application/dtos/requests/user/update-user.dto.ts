/**
 * UpdateUserRequest DTO
 * @module auth-service/application/dtos/requests/user
 */
import {
  UpdateUserRequestSchema,
  type UpdateUserRequestSchemaType,
} from '@vubon/shared-schemas/user';

export type UpdateUserRequestDTO = UpdateUserRequestSchemaType;

export function validateUpdateUserRequest(
  input: unknown,
): UpdateUserRequestDTO {
  return UpdateUserRequestSchema.parse(input);
}
