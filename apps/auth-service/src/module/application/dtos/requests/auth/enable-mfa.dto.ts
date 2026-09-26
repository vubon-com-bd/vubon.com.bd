/**
 * EnableMfaRequest DTO
 * @module auth-service/application/dtos/requests/auth
 */
import {
  EnableMfaRequestSchema,
  type EnableMfaRequestSchemaType,
} from '@vubon/shared-schemas/auth';

export type EnableMfaRequestDTO = EnableMfaRequestSchemaType;

export function validateEnableMfaRequest(
  input: unknown,
): EnableMfaRequestDTO {
  return EnableMfaRequestSchema.parse(input);
}
