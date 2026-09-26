/**
 * VerifyMfaRequest DTO
 * @module auth-service/application/dtos/requests/auth
 */
import {
  VerifyMfaRequestSchema,
  type VerifyMfaRequestSchemaType,
  VerifyBackupCodeRequestSchema,
  type VerifyBackupCodeRequestSchemaType,
} from '@vubon/shared-schemas/auth';

export type VerifyMfaRequestDTO = VerifyMfaRequestSchemaType;
export type VerifyBackupCodeRequestDTO = VerifyBackupCodeRequestSchemaType;

export function validateVerifyMfaRequest(
  input: unknown,
): VerifyMfaRequestDTO {
  return VerifyMfaRequestSchema.parse(input);
}

export function validateVerifyBackupCodeRequest(
  input: unknown,
): VerifyBackupCodeRequestDTO {
  return VerifyBackupCodeRequestSchema.parse(input);
}
