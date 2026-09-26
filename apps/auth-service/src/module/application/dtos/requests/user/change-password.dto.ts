/**
 * ChangePasswordRequest DTO
 * @module auth-service/application/dtos/requests/user
 */
import {
  PasswordChangeInputSchema,
  type PasswordChangeInputSchemaType,
} from '@vubon/shared-schemas/auth';

export type ChangePasswordRequestDTO = PasswordChangeInputSchemaType;

export function validateChangePasswordRequest(
  input: unknown,
): ChangePasswordRequestDTO {
  return PasswordChangeInputSchema.parse(input);
}
