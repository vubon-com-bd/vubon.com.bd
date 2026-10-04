/**
 * RegisterRequest DTO
 * @module auth-service/application/dtos/requests/auth
 */
import {
  RegisterRequestSchema,
  type RegisterRequestSchemaType,
} from '@vubon/shared-schemas/auth';

export type RegisterRequestDTO = RegisterRequestSchemaType;

export function validateRegisterRequest(input: unknown): RegisterRequestDTO {
  return RegisterRequestSchema.parse(input);
}
