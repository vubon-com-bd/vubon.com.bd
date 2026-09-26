import { SubmitKycRequestSchema } from '@vubon/shared-schemas/user';

export class KycInterfaceValidator {
  static validateSubmit(input: unknown) {
    return SubmitKycRequestSchema.parse(input);
  }
}
