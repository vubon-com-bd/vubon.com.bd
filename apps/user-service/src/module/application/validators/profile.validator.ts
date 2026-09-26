import { UpdateProfileRequestSchema } from '@vubon/shared-schemas/user';

export class ProfileValidator {
  static validateUpdate(input: unknown) {
    return UpdateProfileRequestSchema.parse(input);
  }
}
