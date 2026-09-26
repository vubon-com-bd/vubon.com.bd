import { SubmitKycRequestSchema } from '@vubon/shared-schemas/user';

export class KycValidator {
  static validateSubmit(input: unknown) {
    return SubmitKycRequestSchema.parse(input);
  }
}
