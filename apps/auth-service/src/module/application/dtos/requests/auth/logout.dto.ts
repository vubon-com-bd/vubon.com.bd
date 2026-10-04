/**
 * LogoutRequest DTO
 * @module auth-service/application/dtos/requests/auth
 */
import {
  LogoutRequestSchema,
  type LogoutRequestSchemaType,
} from '@vubon/shared-schemas/auth';

export type LogoutRequestDTO = LogoutRequestSchemaType;

export function validateLogoutRequest(input: unknown): LogoutRequestDTO {
  return LogoutRequestSchema.parse(input);
}
