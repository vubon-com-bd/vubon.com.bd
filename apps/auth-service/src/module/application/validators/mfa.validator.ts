/**
 * MfaValidator
 * @module auth-service/application/validators
 */
import {
  VerifyMfaRequestSchema,
  VerifyBackupCodeRequestSchema,
  EnableMfaRequestSchema,
  DisableMfaRequestSchema,
} from '@vubon/shared-schemas/auth';
import type { z } from 'zod';

export class MfaValidator {
  static verify(input: unknown): z.infer<typeof VerifyMfaRequestSchema> {
    return VerifyMfaRequestSchema.parse(input);
  }

  static verifyBackupCode(
    input: unknown,
  ): z.infer<typeof VerifyBackupCodeRequestSchema> {
    return VerifyBackupCodeRequestSchema.parse(input);
  }

  static enable(input: unknown): z.infer<typeof EnableMfaRequestSchema> {
    return EnableMfaRequestSchema.parse(input);
  }

  static disable(input: unknown): z.infer<typeof DisableMfaRequestSchema> {
    return DisableMfaRequestSchema.parse(input);
  }
}
