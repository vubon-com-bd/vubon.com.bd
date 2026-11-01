/**
 * MfaHttpValidator
 * @module identity-service/interfaces/validators
 */
import { BadRequestException } from '@nestjs/common';
import {
  EnableMfaRequestSchema,
  DisableMfaRequestSchema,
  VerifyMfaRequestSchema,
  VerifyBackupCodeRequestSchema,
  SetupMfaRequestSchema,
} from '@vubon/shared-schemas/auth';

function throwBadRequest(
  schemaName: string,
  issues: readonly { path: readonly (string | number)[]; message: string }[],
): never {
  throw new BadRequestException({
    statusCode: 400,
    code: 'VAL_REQUIRED',
    message: `${schemaName} validation failed`,
    details: issues.map((i) => ({
      field: i.path.join('.'),
      message: i.message,
    })),
  });
}

export class MfaHttpValidator {
  static validateEnable(body: unknown): void {
    const result = EnableMfaRequestSchema.safeParse(body);
    if (!result.success) throwBadRequest('Enable MFA', result.error.issues);
  }

  static validateDisable(body: unknown): void {
    const result = DisableMfaRequestSchema.safeParse(body);
    if (!result.success) throwBadRequest('Disable MFA', result.error.issues);
  }

  static validateVerify(body: unknown): void {
    const result = VerifyMfaRequestSchema.safeParse(body);
    if (!result.success) throwBadRequest('Verify MFA', result.error.issues);
  }

  static validateBackupCode(body: unknown): void {
    const result = VerifyBackupCodeRequestSchema.safeParse(body);
    if (!result.success) throwBadRequest('Verify Backup Code', result.error.issues);
  }

  static validateSetup(body: unknown): void {
    const result = SetupMfaRequestSchema.safeParse(body);
    if (!result.success) throwBadRequest('Setup MFA', result.error.issues);
  }
}
