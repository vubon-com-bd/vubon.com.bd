/**
 * CreateUserRequest DTO
 * @module auth-service/application/dtos/requests/user
 */
import {
  CreateUserRequestSchema,
  type CreateUserRequestSchemaType,
} from '@vubon/shared-schemas/user';

export type CreateUserRequestDTO = CreateUserRequestSchemaType;

export function validateCreateUserRequest(
  input: unknown,
): CreateUserRequestDTO {
  return CreateUserRequestSchema.parse(input);
}
