/**
 * ResendVerificationRequest DTO — wraps ResendVerifyEmailRequestSchema
 * @module auth-service/application/dtos/requests/auth
 */
import {
  ResendVerifyEmailRequestSchema,
  type ResendVerifyEmailRequestSchemaType,
} from '@vubon/shared-schemas/auth';

export type ResendVerificationRequestDTO = ResendVerifyEmailRequestSchemaType;

export function validateResendVerificationRequest(
  input: unknown,
): ResendVerificationRequestDTO {
  return ResendVerifyEmailRequestSchema.parse(input);
}
