/**
 * LoginRequest DTO — wraps LoginRequestSchema
 * @module auth-service/application/dtos/requests/auth
 */
import {
  LoginRequestSchema,
  type LoginRequestSchemaType,
} from '@vubon/shared-schemas/auth';

export type LoginRequestDTO = LoginRequestSchemaType;

export function validateLoginRequest(input: unknown): LoginRequestDTO {
  return LoginRequestSchema.parse(input);
}
