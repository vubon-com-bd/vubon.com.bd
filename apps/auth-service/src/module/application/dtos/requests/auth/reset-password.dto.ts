/**
 * ResetPasswordRequest DTO
 * @module auth-service/application/dtos/requests/auth
 */
import {
  ResetPasswordRequestSchema,
  type ResetPasswordRequestSchemaType,
} from '@vubon/shared-schemas/auth';

export type ResetPasswordRequestDTO = ResetPasswordRequestSchemaType;

export function validateResetPasswordRequest(
  input: unknown,
): ResetPasswordRequestDTO {
  return ResetPasswordRequestSchema.parse(input);
}
