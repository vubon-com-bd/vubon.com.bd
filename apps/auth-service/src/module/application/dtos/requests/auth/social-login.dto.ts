/**
 * SocialLoginRequest DTO
 * @module auth-service/application/dtos/requests/auth
 */
import {
  SocialLoginRequestSchema,
  type SocialLoginRequestSchemaType,
} from '@vubon/shared-schemas/auth';

export type SocialLoginRequestDTO = SocialLoginRequestSchemaType;

export function validateSocialLoginRequest(
  input: unknown,
): SocialLoginRequestDTO {
  return SocialLoginRequestSchema.parse(input);
}
