/**
 * SsoLoginRequest DTO
 * @module auth-service/application/dtos/requests/auth
 */
import {
  SsoLoginRequestSchema,
  type SsoLoginRequestSchemaType,
} from '@vubon/shared-schemas/auth';

export type SsoLoginRequestDTO = SsoLoginRequestSchemaType;

export function validateSsoLoginRequest(
  input: unknown,
): SsoLoginRequestDTO {
  return SsoLoginRequestSchema.parse(input);
}
