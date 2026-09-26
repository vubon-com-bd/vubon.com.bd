/**
 * VerifyEmailRequest DTO
 * @module auth-service/application/dtos/requests/auth
 */
import {
  VerifyEmailRequestSchema,
  type VerifyEmailRequestSchemaType,
} from '@vubon/shared-schemas/auth';

export type VerifyEmailRequestDTO = VerifyEmailRequestSchemaType;

export function validateVerifyEmailRequest(
  input: unknown,
): VerifyEmailRequestDTO {
  return VerifyEmailRequestSchema.parse(input);
}
