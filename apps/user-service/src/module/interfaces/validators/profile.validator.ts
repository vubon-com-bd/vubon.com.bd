import { UpdateProfileRequestSchema } from '@vubon/shared-schemas/user';

export class ProfileInterfaceValidator {
  static validateUpdate(input: unknown) {
    return UpdateProfileRequestSchema.parse(input);
  }
}
