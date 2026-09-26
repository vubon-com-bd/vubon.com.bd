import {
  CreateUserRequestSchema,
  UpdateUserRequestSchema,
} from '@vubon/shared-schemas/user';

export class UserInterfaceValidator {
  static validateCreate(input: unknown) {
    return CreateUserRequestSchema.parse(input);
  }

  static safeValidateCreate(input: unknown) {
    return CreateUserRequestSchema.safeParse(input);
  }

  static validateUpdate(input: unknown) {
    return UpdateUserRequestSchema.parse(input);
  }
}
