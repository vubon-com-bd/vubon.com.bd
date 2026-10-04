/**
 * RefreshTokenRequest DTO
 * @module auth-service/application/dtos/requests/auth
 */
import {
  RefreshTokenRequestSchema,
  type RefreshTokenRequestSchemaType,
} from '@vubon/shared-schemas/auth';

export type RefreshTokenRequestDTO = RefreshTokenRequestSchemaType;

export function validateRefreshTokenRequest(
  input: unknown,
): RefreshTokenRequestDTO {
  return RefreshTokenRequestSchema.parse(input);
}
