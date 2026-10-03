/**
 * UpdateSettingsRequest DTO
 * @module auth-service/application/dtos/requests/user
 */
import {
  UpdateSettingsRequestSchema,
  type UpdateSettingsRequestSchemaType,
} from '@vubon/shared-schemas/user';

export type UpdateSettingsRequestDTO = UpdateSettingsRequestSchemaType;

export function validateUpdateSettingsRequest(
  input: unknown,
): UpdateSettingsRequestDTO {
  return UpdateSettingsRequestSchema.parse(input);
}
