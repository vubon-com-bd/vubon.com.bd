/**
 * MFA Validator — Zod schema validation wrappers
 * @module identity-service/application/validators
 */
import { VerifyMfaRequestSchema, EnableMfaRequestSchema } from '@vubon/shared-schemas/auth';

export class MfaValidator {
  static validateVerify(input: unknown) {
    return VerifyMfaRequestSchema.parse(input);
  }

  static validateEnable(input: unknown) {
    return EnableMfaRequestSchema.parse(input);
  }

  static validateVerifySafe(input: unknown) {
    return VerifyMfaRequestSchema.safeParse(input);
  }

  static validateEnableSafe(input: unknown) {
    return EnableMfaRequestSchema.safeParse(input);
  }
}
