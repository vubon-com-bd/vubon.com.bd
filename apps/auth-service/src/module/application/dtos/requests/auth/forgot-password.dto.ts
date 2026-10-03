/**
 * ForgotPasswordRequest DTO
 * @module auth-service/application/dtos/requests/auth
 */
import {
  ForgotPasswordRequestSchema,
  type ForgotPasswordRequestSchemaType,
} from '@vubon/shared-schemas/auth';

export type ForgotPasswordRequestDTO = ForgotPasswordRequestSchemaType;

export function validateForgotPasswordRequest(
  input: unknown,
): ForgotPasswordRequestDTO {
  return ForgotPasswordRequestSchema.parse(input);
}
