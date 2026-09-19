import {
  LoginRequestSchema,
  RegisterRequestSchema,
  ResetPasswordRequestSchema,
} from '@vubon/shared-schemas/auth';

export class AuthValidator {
  static validateLogin(input: unknown) {
    return LoginRequestSchema.parse(input);
  }

  static safeValidateLogin(input: unknown) {
    return LoginRequestSchema.safeParse(input);
  }

  static validateRegister(input: unknown) {
    return RegisterRequestSchema.parse(input);
  }

  static safeValidateRegister(input: unknown) {
    return RegisterRequestSchema.safeParse(input);
  }

  static validateResetPassword(input: unknown) {
    return ResetPasswordRequestSchema.parse(input);
  }
}
