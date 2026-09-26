/**
 * SubmitKycRequest DTO
 * @module auth-service/application/dtos/requests/user
 */
import {
  SubmitKycRequestSchema,
  type SubmitKycRequestSchemaType,
} from '@vubon/shared-schemas/user';

export type SubmitKycRequestDTO = SubmitKycRequestSchemaType;

export function validateSubmitKycRequest(
  input: unknown,
): SubmitKycRequestDTO {
  return SubmitKycRequestSchema.parse(input);
}
