/**
 * UpdatePreferencesRequest DTO
 * @module auth-service/application/dtos/requests/user
 */
import {
  UpdatePreferencesRequestSchema,
  type UpdatePreferencesRequestSchemaType,
} from '@vubon/shared-schemas/user';

export type UpdatePreferencesRequestDTO = UpdatePreferencesRequestSchemaType;

export function validateUpdatePreferencesRequest(
  input: unknown,
): UpdatePreferencesRequestDTO {
  return UpdatePreferencesRequestSchema.parse(input);
}
