/**
 * Auth Validator — Zod schema validation wrappers
 * @module identity-service/application/validators
 */
import {
  LoginRequestSchema,
  RegisterRequestSchema,
  ResetPasswordRequestSchema,
} from '@vubon/shared-schemas/auth';

export class AuthValidator {
  static validateLogin(input: unknown) {
    return LoginRequestSchema.parse(input);
  }

  static validateRegister(input: unknown) {
    return RegisterRequestSchema.parse(input);
  }

  static validateResetPassword(input: unknown) {
    return ResetPasswordRequestSchema.parse(input);
  }

  static validateLoginSafe(input: unknown) {
    return LoginRequestSchema.safeParse(input);
  }

  static validateRegisterSafe(input: unknown) {
    return RegisterRequestSchema.safeParse(input);
  }
}
