import {
  VerifyMfaRequestSchema,
  EnableMfaRequestSchema,
  DisableMfaRequestSchema,
} from '@vubon/shared-schemas/auth';

export class MfaValidator {
  static validateVerify(input: unknown) {
    return VerifyMfaRequestSchema.parse(input);
  }

  static safeValidateVerify(input: unknown) {
    return VerifyMfaRequestSchema.safeParse(input);
  }

  static validateEnable(input: unknown) {
    return EnableMfaRequestSchema.parse(input);
  }

  static validateDisable(input: unknown) {
    return DisableMfaRequestSchema.parse(input);
  }
}
