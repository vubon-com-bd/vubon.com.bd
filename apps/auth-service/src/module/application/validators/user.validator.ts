import {
  CreateUserRequestSchema,
  UpdateUserRequestSchema,
  UpdateProfileRequestSchema,
} from '@vubon/shared-schemas/user';

export class UserValidator {
  static validateCreate(input: unknown) {
    return CreateUserRequestSchema.parse(input);
  }

  static safeValidateCreate(input: unknown) {
    return CreateUserRequestSchema.safeParse(input);
  }

  static validateUpdate(input: unknown) {
    return UpdateUserRequestSchema.parse(input);
  }

  static validateUpdateProfile(input: unknown) {
    return UpdateProfileRequestSchema.parse(input);
  }
}
