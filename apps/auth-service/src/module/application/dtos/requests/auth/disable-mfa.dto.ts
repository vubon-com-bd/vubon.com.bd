/**
 * DisableMfaRequest DTO
 * @module auth-service/application/dtos/requests/auth
 */
import {
  DisableMfaRequestSchema,
  type DisableMfaRequestSchemaType,
} from '@vubon/shared-schemas/auth';

export type DisableMfaRequestDTO = DisableMfaRequestSchemaType;

export function validateDisableMfaRequest(
  input: unknown,
): DisableMfaRequestDTO {
  return DisableMfaRequestSchema.parse(input);
}
