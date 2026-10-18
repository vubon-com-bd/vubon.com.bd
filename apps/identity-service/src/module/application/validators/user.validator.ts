/**
 * User Validator — Zod schema validation wrappers
 * @module identity-service/application/validators
 */
import { CreateUserRequestSchema, UpdateUserRequestSchema } from '@vubon/shared-schemas/user';

export class UserValidator {
  static validateCreate(input: unknown) {
    return CreateUserRequestSchema.parse(input);
  }

  static validateUpdate(input: unknown) {
    return UpdateUserRequestSchema.parse(input);
  }

  static validateCreateSafe(input: unknown) {
    return CreateUserRequestSchema.safeParse(input);
  }

  static validateUpdateSafe(input: unknown) {
    return UpdateUserRequestSchema.safeParse(input);
  }
}
