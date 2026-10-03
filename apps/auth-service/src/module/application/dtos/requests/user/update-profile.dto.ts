/**
 * UpdateProfileRequest DTO
 * @module auth-service/application/dtos/requests/user
 */
import {
  UpdateProfileRequestSchema,
  type UpdateProfileRequestSchemaType,
} from '@vubon/shared-schemas/user';

export type UpdateProfileRequestDTO = UpdateProfileRequestSchemaType;

export function validateUpdateProfileRequest(
  input: unknown,
): UpdateProfileRequestDTO {
  return UpdateProfileRequestSchema.parse(input);
}
